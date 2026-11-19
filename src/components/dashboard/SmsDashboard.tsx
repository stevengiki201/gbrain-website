"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

interface Device {
  id: string;
  name: string;
  fingerprint: string;
  status: Record<string, unknown>;
  lastSeen: string;
  pairingCode: string | null;
  pairingCodeExpiresAt: string | null;
  createdAt: string;
}

interface SmsMessage {
  smsId: string;
  folder: string;
  address: string;
  body: string;
  dateMs: number;
  status: string;
}

interface User {
  id: string;
  email: string;
  name: string;
}

export function SmsDashboard({ user }: { user: User }) {
  const router = useRouter();
  const [devices, setDevices] = useState<Device[]>([]);
  const [messages, setMessages] = useState<SmsMessage[]>([]);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [deviceResponse, messageResponse] = await Promise.all([
        fetch("/api/devices", { cache: "no-store" }),
        fetch("/api/sms/messages", { cache: "no-store" }),
      ]);
      if (!deviceResponse.ok || !messageResponse.ok) throw new Error("Unable to load dashboard data.");
      const deviceData = (await deviceResponse.json()) as { devices: Device[] };
      const messageData = (await messageResponse.json()) as { messages: SmsMessage[] };
      setDevices(deviceData.devices);
      setMessages(messageData.messages);
      setSelectedDevice((current) => current || deviceData.devices[0]?.id || "");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/dashboard/sms/login");
    router.refresh();
  }

  async function sendSms(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch("/api/sms/send", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ deviceId: selectedDevice, to, message }),
      });
      const data = (await response.json()) as { error?: string; command?: { id: string } };
      if (!response.ok || !data.command) throw new Error(data.error || "Unable to queue SMS.");
      setNotice("SMS queued. It will be sent by the selected PC.");
      setMessage("");
      const commandId = data.command.id;
      for (let attempt = 0; attempt < 30; attempt += 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const statusResponse = await fetch(`/api/sms/commands/${commandId}`, { cache: "no-store" });
        const statusData = (await statusResponse.json()) as {
          command?: { status: string; result?: { error?: string } };
        };
        if (statusData.command?.status === "done") {
          setNotice("SMS dispatched to the phone.");
          break;
        }
        if (statusData.command?.status === "failed") {
          throw new Error(statusData.command.result?.error || "SMS failed on the PC.");
        }
      }
      await load();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to queue SMS.");
    } finally {
      setSending(false);
    }
  }

  async function removeDevice(id: string) {
    await fetch(`/api/devices/${id}`, { method: "DELETE" });
    if (selectedDevice === id) setSelectedDevice("");
    await load();
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">GBrain SMS</p>
          <h1 className="font-heading text-3xl font-bold">Remote dashboard</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => void load()} disabled={loading}>
            Refresh
          </Button>
          <Button variant="ghost" onClick={() => void logout()}>
            Sign out
          </Button>
        </div>
      </header>

      {error && <p className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{error}</p>}
      {notice && <p className="rounded-xl border border-primary/30 bg-primary/10 p-4 text-sm text-primary">{notice}</p>}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Connected PCs</CardTitle>
            <CardDescription>
              Sign in with <code>gbrain-cli sign-in</code> on each PC. Each PC appears here separately.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
            {!loading && devices.length === 0 && (
              <p className="text-sm text-muted-foreground">No PCs yet. Run gbrain-cli sign-in on your computer.</p>
            )}
            {devices.map((device) => (
              <div key={device.id} className="rounded-xl border p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{device.name}</p>
                    <p className="text-xs text-muted-foreground">{device.fingerprint || device.id}</p>
                    <p className="text-xs text-muted-foreground">
                      Last seen {new Date(device.lastSeen).toLocaleString()}
                    </p>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => void removeDevice(device.id)}>
                    Remove
                  </Button>
                </div>
                <p className="mt-3 text-sm">
                  Bridge:{" "}
                  <span className="font-medium">
                    {String(device.status.bridge || device.status.state || "unknown")}
                  </span>
                </p>
                {device.pairingCode && (
                  <div className="mt-3 rounded-lg bg-primary/10 p-3">
                    <p className="text-xs text-muted-foreground">AudioLink phone pairing code</p>
                    <p className="font-mono text-2xl font-bold tracking-widest text-primary">
                      {device.pairingCode}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Enter this code in the AudioLink phone app to pair the phone with this PC.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compose SMS</CardTitle>
            <CardDescription>Send through any connected PC and its paired phone.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={sendSms}>
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="device">
                  PC
                </label>
                <select
                  id="device"
                  className="flex h-11 w-full rounded-xl border border-input bg-background px-4 text-sm"
                  value={selectedDevice}
                  onChange={(event) => setSelectedDevice(event.target.value)}
                  required
                >
                  <option value="">Select a PC</option>
                  {devices.map((device) => (
                    <option key={device.id} value={device.id}>
                      {device.name}
                    </option>
                  ))}
                </select>
              </div>
              <Input
                label="Recipient"
                value={to}
                onChange={(event) => setTo(event.target.value)}
                placeholder="+255712345678"
                required
              />
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  className="min-h-32 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  required
                />
              </div>
              <Button type="submit" variant="brand" className="w-full" loading={sending} disabled={!selectedDevice}>
                Send SMS
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cached messages</CardTitle>
          <CardDescription>Messages synced from the selected PCs through gbrain-cli.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {messages.length === 0 && <p className="text-sm text-muted-foreground">No messages cached yet.</p>}
          {messages.map((item) => (
            <div key={item.smsId} className="rounded-xl border p-4">
              <div className="flex flex-wrap justify-between gap-2 text-xs text-muted-foreground">
                <span>{item.address}</span>
                <span>
                  {item.folder} · {item.status} · {new Date(item.dateMs).toLocaleString()}
                </span>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-sm">{item.body}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
