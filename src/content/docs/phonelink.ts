import {
  localized,
  localizedList,
  image,
  callout,
  type ProductDocBundle,
} from "./types";

export const phonelinkDocs: ProductDocBundle = {
  sections: [
    {
      id: "getting-started",
      title: localized("Getting started", "Kuanza kutumia"),
      slugs: ["install", "pairing", "dashboard"],
    },
    {
      id: "features",
      title: localized("Features", "Vipengele"),
      slugs: ["screen-mirroring", "file-manager", "device-tools"],
    },
    {
      id: "reference",
      title: localized("Reference", "Rejea"),
      slugs: ["cli", "security", "architecture", "troubleshooting"],
    },
  ],
  pages: [
    {
      slug: "install",
      title: localized("Installation", "Usakinishaji"),
      description: localized(
        "Set up the Node.js desktop relay, install the Android client and confirm a healthy connection.",
        "Sanidi relay ya Node.js kwenye kompyuta, sakinisha klayenti ya Android na uhakikishe muunganisho uko sawa.",
      ),
      topics: localizedList(
        [
          "Install Node.js 18 or newer, then install the desktop relay dependencies.",
          "Start the relay with npm start; the web dashboard listens on port 7842.",
          "Install the PhoneLink APK on Android 9 or newer; the build was verified on a Samsung S9.",
          "Put the phone and computer on the same trusted Wi-Fi before pairing.",
          "Open the dashboard from the computer to confirm the relay is running.",
        ],
        [
          "Sakinisha Node.js 18 au zaidi, kisha sakinisha mahitaji ya relay ya kompyuta.",
          "Anzisha relay kwa npm start; dashibodi ya wavuti husikiliza kwenye bandari 7842.",
          "Sakinisha APK ya PhoneLink kwenye Android 9 au zaidi; toleo lilijaribiwa kwenye Samsung S9.",
          "Weka simu na kompyuta kwenye Wi-Fi moja inayoaminika kabla ya kuoanisha.",
          "Fungua dashibodi kutoka kompyutani kuthibitisha relay inafanya kazi.",
        ],
      ),
      commands: localizedList(
        [
          "cd desktop && npm install",
          "npm start",
          "npx expo prebuild --platform android",
          "cd android && NODE_ENV=production ./gradlew :app:assembleRelease",
        ],
        [
          "cd desktop && npm install",
          "npm start",
          "npx expo prebuild --platform android",
          "cd android && NODE_ENV=production ./gradlew :app:assembleRelease",
        ],
      ),
    },
    {
      slug: "pairing",
      title: localized("Pairing", "Kuoanisha"),
      description: localized(
        "Link the Android client to the relay by LAN IP address or QR code over your trusted network.",
        "Unganisha klayenti ya Android na relay kwa kutumia anwani ya IP ya eneo au msimbo wa QR kwenye mtandao wako unaoaminika.",
      ),
      topics: localizedList(
        [
          "The relay publishes its LAN IP, port and a connect QR code at /api/info.",
          "Enter the relay IP and port 7842 in the app, or scan the QR code shown in the dashboard.",
          "A successful link opens the /phone WebSocket and the device appears as online.",
          "Heartbeats monitor the session and the app reconnects automatically after a brief drop.",
          "Repeat pairing from the phone if you move the relay to another computer.",
        ],
        [
          "Relay huchapisha anwani yake ya LAN, bandari na msimbo wa QR wa kuunganisha kwenye /api/info.",
          "Weka anwani ya relay na bandari 7842 kwenye programu, au skana msimbo wa QR unaoonyeshwa kwenye dashibodi.",
          "Muunganisho ukifaulu hufungua WebSocket ya /phone na kifaa kinaonekana mtandaoni.",
          "Mapigo ya moyo hufuatilia kikao na programu huungana tena yenyewe baada ya kukatika kwa muda mfupi.",
          "Rudia kuoanisha kutoka kwenye simu ukihamisha relay kwenye kompyuta nyingine.",
        ],
      ),
    },
    {
      slug: "dashboard",
      title: localized("Dashboard", "Dashibodi"),
      description: localized(
        "A tour of the local web interface, its live device view and quick controls.",
        "Utangulizi wa kiolesura cha wavuti cha eneo, mwonekano wa kifaa wa moja kwa moja na vidhibiti vya haraka.",
      ),
      topics: localizedList(
        [
          "Open the dashboard at http://phonelink.localhost:7842 during local testing, or click Open web dashboard on the product page.",
          "Click QR in the dashboard header, then scan the code with your phone to pre-fill the relay address and connect automatically.",
          "The live screen, gestures, file browser and quick device tools share a single view.",
          "Tap, swipe, scroll, navigation keys and typing are delivered through AccessibilityService.",
          "Adjust resolution, frame rate and JPEG quality while mirroring.",
          "Connection status and the log panel show heartbeats and automatic reconnects.",
        ],
        [
          "Fungua dashibodi kwenye http://phonelink.localhost:7842 wakati wa jaribio la ndani, au bofya Fungua dashibodi ya wavuti kwenye ukurasa wa bidhaa.",
          "Bofya QR kwenye kichwa cha dashibodi, kisha skana msimbo kwa simu ili kujaza anwani ya relay na kuungana kiotomatiki.",
          "Skrini ya moja kwa moja, ishara, kivinjari cha faili na zana za haraka za kifaa viko kwenye mwonekano mmoja.",
          "Kugusa, kuteleza, kusogeza, funguo za urambazaji na kuandika hufikishwa kupitia AccessibilityService.",
          "Rekebisha azimio, kasi ya fremu na ubora wa JPEG wakati wa kuakisi.",
          "Hali ya muunganisho na paneli ya kumbukumbu huonyesha mapigo ya moyo na kuungana tena kiotomatiki.",
        ],
      ),
    },
    {
      slug: "screen-mirroring",
      title: localized("Screen mirroring", "Kuakisi skrini"),
      description: localized(
        "Real MediaProjection capture streamed as JPEG frames to the browser or CLI.",
        "Unasaji halisi wa MediaProjection unaotumwa kama fremu za JPEG kwenye kivinjari au CLI.",
      ),
      topics: localizedList(
        [
          "A foreground service uses MediaProjection to capture the real screen.",
          "Frames are encoded as JPEG and sent over the /screen WebSocket to the relay.",
          "The relay keeps the newest frame cached for the dashboard and CLI screenshots.",
          "Capture width, frames per second and JPEG quality are adjustable at runtime.",
          "Stopping mirroring releases the capture session until you start it again.",
        ],
        [
          "Huduma ya mbele hutumia MediaProjection kunasa skrini halisi.",
          "Fremu husimbwa kama JPEG na kutumwa kupitia WebSocket ya /screen kwenda kwenye relay.",
          "Relay huhifadhi fremu ya hivi karibuni kwa dashibodi na picha za CLI.",
          "Upana wa unasaji, idadi ya fremu kwa sekunde na ubora wa JPEG vinabadilishwa wakati wa uendeshaji.",
          "Kusimamisha kuakisi huachilia kikao cha unasaji hadi ukiwashe tena.",
        ],
      ),
    },
    {
      slug: "file-manager",
      title: localized("File manager", "Meneja wa faili"),
      description: localized(
        "Browse phone storage and upload, download, rename, delete or create folders with previews.",
        "Vinjari hifadhi ya simu na pakia, pakua, badilisha jina, futa au unda folda ukiwa na muonekano wa faili.",
      ),
      topics: localizedList(
        [
          "Browse internal and shared storage from the dashboard or with ls, cd and pwd in the CLI.",
          "Upload files from the computer and download files from the phone.",
          "Rename with mv, create folders with mkdir and delete with rm.",
          "Preview text with cat and images in the dashboard before downloading.",
          "Full access depends on the MANAGE_EXTERNAL_STORAGE grant on Android.",
        ],
        [
          "Vinjari hifadhi ya ndani na ya pamoja kutoka dashibodi au kwa ls, cd na pwd kwenye CLI.",
          "Pakia faili kutoka kompyuta na upakue faili kutoka kwenye simu.",
          "Badilisha jina kwa mv, unda folda kwa mkdir na futa kwa rm.",
          "Angalia maandishi kwa cat na picha kwenye dashibodi kabla ya kupakua.",
          "Ufikiaji kamili unategemea ruhusa ya MANAGE_EXTERNAL_STORAGE kwenye Android.",
        ],
      ),
    },
    {
      slug: "device-tools",
      title: localized("Device tools", "Zana za kifaa"),
      description: localized(
        "Lock, wake, ring, clip, toast, open URLs, read location and inspect system stats.",
        "Funga, amsha, lilia, tumia klipubodi, onyesha toast, fungua URL, soma eneo na kagua takwimu za mfumo.",
      ),
      topics: localizedList(
        [
          "Lock or wake the screen; remote lock relies on device administrator access.",
          "Ring or find-phone vibrates the device, and stop cancels the alert.",
          "Read or set the clipboard and show a temporary toast message.",
          "Open a URL on the phone and view its location on an OpenStreetMap link.",
          "System stats cover storage, memory, display, network, battery and uptime.",
        ],
        [
          "Funga au amsha skrini; kufunga kwa mbali kunategemea ufikiaji wa msimamizi wa kifaa.",
          "Amri ya ring au find-phone hufanya kifaa kiotetema, na stop huhuisha kengele.",
          "Soma au weka klipubodi na uonyeshe ujumbe wa muda mfupi unaoitwa toast.",
          "Fungua URL kwenye simu na uone eneo lake kupitia kiungo cha OpenStreetMap.",
          "Takwimu za mfumo zinajumuisha hifadhi, kumbukumbu, onyesho, mtandao, betri na muda wa kuwasha.",
        ],
      ),
    },
    {
      slug: "cli",
      title: localized("CLI reference", "Rejea ya CLI"),
      description: localized(
        "Discover the linked phone and run file, screen and device commands from a terminal.",
        "Gundua simu iliyounganishwa na endesha amri za faili, skrini na kifaa kutoka kwenye terminal.",
      ),
      topics: localizedList(
        [
          "Run phonelink for an interactive shell or phonelink <command> for a single command.",
          "Check the link with devices, status, ping, info and battery.",
          "File work uses ls, cd, pwd, cat, upload, download, mkdir, mv and rm.",
          "Screen control includes screen start/stop, screenshot, tap, swipe, type and key.",
          "Device tools include lock, wake, ring, clip, toast, open, locate and system.",
        ],
        [
          "Endesha phonelink kwa ganda la mwingiliano au phonelink <amri> kwa amri moja tu.",
          "Kagua muunganisho kwa devices, status, ping, info na battery.",
          "Kazi za faili hutumia ls, cd, pwd, cat, upload, download, mkdir, mv na rm.",
          "Udhibiti wa skrini ni pamoja na screen start/stop, screenshot, tap, swipe, type na key.",
          "Zana za kifaa ni pamoja na lock, wake, ring, clip, toast, open, locate na system.",
        ],
      ),
      commands: localizedList(
        [
          "phonelink --help",
          "phonelink devices",
          "phonelink status",
          "phonelink ping",
          "phonelink ls",
          "phonelink screen screenshot",
        ],
        [
          "phonelink --help",
          "phonelink devices",
          "phonelink status",
          "phonelink ping",
          "phonelink ls",
          "phonelink screen screenshot",
        ],
      ),
    },
    {
      slug: "security",
      title: localized("Security", "Usalama"),
      description: localized(
        "Trusted-LAN boundaries, current authentication gaps and safer remote access.",
        "Mipaka ya mtandao unaoaminika, mapungufu ya uthibitisho yaliyopo na ufikiaji salama wa mbali.",
      ),
      topics: localizedList(
        [
          "PhoneLink is built for a trusted LAN and does not publish a public endpoint.",
          "Pairing codes, device authentication and TLS are not implemented yet; WebSocket traffic is plain.",
          "Use Tailscale or WireGuard for remote access instead of exposing port 7842.",
          "Pair only phones you control and review MediaProjection, accessibility, storage and location prompts.",
          "Keep the relay host updated and disable tools you are not using.",
        ],
        [
          "PhoneLink imejengwa kwa mtandao wa eneo unaoaminika na haichapishi mlango wa umma.",
          "Kanuni za kuoanisha, uthibitisho wa kifaa na TLS bado hazijatekelezwa; trafiki ya WebSocket iko wazi.",
          "Tumia Tailscale au WireGuard kwa ufikiaji wa mbali badala ya kufungua bandari 7842.",
          "Oanisha tu simu unazodhibiti na usome kwa makini maombi ya MediaProjection, ufikiaji, hifadhi na eneo.",
          "Endelea kusasisha kompyuta inayoendesha relay na uzime zana usizozitumia.",
        ],
      ),
    },
    {
      slug: "architecture",
      title: localized("Architecture", "Usanifu"),
      description: localized(
        "How the Expo/Kotlin Android client, Node.js relay and browser dashboard communicate.",
        "Jinsi klayenti ya Android ya Expo/Kotlin, relay ya Node.js na dashibodi ya kivinjari vinavyowasiliana.",
      ),
      topics: localizedList(
        [
          "The Android client combines Expo with Kotlin modules for native device operations.",
          "The phone talks to the Node.js relay over the /phone WebSocket.",
          "The relay forwards events to browser dashboards over /dashboard and serves the web UI on port 7842.",
          "Mirroring uses a separate /screen WebSocket for JPEG frames, with the latest frame cached.",
          "Heartbeats and auto-reconnect keep the CLI, browser and phone in sync.",
        ],
        [
          "Klayenti ya Android inachanganya Expo na moduli za Kotlin kwa shughuli za asili za kifaa.",
          "Simu huwasiliana na relay ya Node.js kupitia WebSocket ya /phone.",
          "Relay husambaza matukio kwa dashibodi za kivinjari kupitia /dashboard na hutumikia kiolesura cha wavuti kwenye bandari 7842.",
          "Kuakisi hutumia WebSocket tofauti ya /screen kwa fremu za JPEG, na fremu ya hivi karibuni huhifadhiwa.",
          "Mapigo ya moyo na kuungana tena kiotomatiki huweka CLI, kivinjari na simu katika hali sawa.",
        ],
      ),
    },
    {
      slug: "troubleshooting",
      title: localized("Troubleshooting", "Utatuzi wa matatizo"),
      description: localized(
        "Fix discovery, pairing, mirroring and reconnect problems with quick checks.",
        "Tatua matatizo ya ugunduzi, kuoanisha, kuakisi na kuungana tena kwa ukaguzi wa haraka.",
      ),
      topics: localizedList(
        [
          "If no device is listed, confirm both devices share the same trusted LAN and the relay is on port 7842.",
          "Use /api/info to check the LAN IPs and QR code advertised by the relay.",
          "Check the relay console and dashboard log for heartbeat and disconnect messages.",
          "If mirroring stays blank, confirm MediaProjection consent and the foreground service.",
          "If gestures fail, re-enable the AccessibilityService, then run the smoke test.",
        ],
        [
          "Ikiwa hakuna kifaa kinachoorodheshwa, hakikisha vifaa vyote viko kwenye LAN moja inayoaminika na relay iko kwenye bandari 7842.",
          "Tumia /api/info kukagua anwani za LAN na msimbo wa QR unaotolewa na relay.",
          "Kagua konsole ya relay na kumbukumbu ya dashibodi kwa ujumbe wa mapigo ya moyo na kukatika.",
          "Iwapo kuakisi kunaendelea kuwa tupu, thibitisha idhini ya MediaProjection na huduma ya mbele.",
          "Iwapo ishara zinashindwa, wezesha tena AccessibilityService, kisha endesha jaribio la smoke.",
        ],
      ),
      commands: localizedList(
        [
          "curl http://127.0.0.1:7842/api/info",
          "npm test",
          "npm run cli -- status",
          "npm run cli -- devices",
        ],
        [
          "curl http://127.0.0.1:7842/api/info",
          "npm test",
          "npm run cli -- status",
          "npm run cli -- devices",
        ],
      ),
    },
  ],
  details: {
    install: {
      intro: localized(
        "PhoneLink has two halves: a Node.js relay on your computer and an Expo/Kotlin Android client. Both must reach the same trusted LAN before pairing.",
        "PhoneLink ina sehemu mbili: relay ya Node.js kwenye kompyuta na klayenti ya Android ya Expo/Kotlin. Zote mbili zinahitaji kufikia LAN moja inayoaminika kabla ya kuoanisha.",
      ),
      prerequisites: localizedList(
        [
          "Node.js 18 or newer on the relay computer",
          "Android 9 or newer; verified on a Samsung S9",
          "Both devices on the same trusted LAN",
        ],
        [
          "Node.js 18 au zaidi kwenye kompyuta inayoendesha relay",
          "Android 9 au zaidi; ilijaribiwa kwenye Samsung S9",
          "Vifaa vyote kwenye LAN moja inayoaminika",
        ],
      ),
      callout: callout(
        "warning",
        "Grant permissions deliberately",
        "Screen capture uses MediaProjection and remote input uses AccessibilityService. Review each prompt before accepting it.",
        "Ruhusu kwa uangalifu",
        "Unasaji wa skrini hutumia MediaProjection na udhibiti wa mbali hutumia AccessibilityService. Soma kila ujumbe kabla ya kukubali.",
      ),
      image: image(
        "Dashboard after pairing",
        "Relay running with one device online",
        "Dashibodi baada ya kuoanisha",
        "Relay ikifanya kazi na kifaa kimoja mtandaoni",
      ),
    },
    pairing: {
      intro: localized(
        "Pairing simply points the Android app at the relay: enter its LAN IP and port 7842, or scan the QR code generated by the dashboard.",
        "Kuoanisha kuelekeza tu programu ya Android kwenye relay: weka anwani ya LAN na bandari 7842, au skana msimbo wa QR unaotengenezwa na dashibodi.",
      ),
      prerequisites: localizedList(
        [
          "The relay is running and the dashboard is open",
          "The phone is connected to the same trusted network",
        ],
        [
          "Relay inafanya kazi na dashibodi imefunguliwa",
          "Simu imeungana na mtandao mmoja unaoaminika",
        ],
      ),
      callout: callout(
        "info",
        "Heartbeat keeps the link alive",
        "The app sends periodic heartbeats and reconnects automatically after a short interruption; no manual re-pair is normally needed.",
        "Mapigo ya moyo hudumisha muunganisho",
        "Programu hutuma mapigo ya moyo mara kwa mara na huungana tena baada ya kukatika kwa muda mfupi; kwa kawaida huhitaji kuoanisha upya.",
      ),
      image: image(
        "Pairing panel",
        "QR code and LAN IP shown in the dashboard",
        "Paneli ya kuoanisha",
        "Msimbo wa QR na anwani ya LAN kwenye dashibodi",
      ),
    },
    dashboard: {
      intro: localized(
        "The web dashboard on port 7842 is the main control surface: live screen, gestures, file browser and quick device tools in one view. The company website's PhoneLink page opens it directly; locally it is http://phonelink.localhost:7842, and in production set NEXT_PUBLIC_PHONELINK_DASHBOARD_URL to https://phonelink.gbrain.tech.",
        "Dashibodi ya wavuti kwenye bandari 7842 ndio uso mkuu wa udhibiti: skrini ya moja kwa moja, ishara, kivinjari cha faili na zana za haraka za kifaa. Ukurasa wa PhoneLink kwenye tovuti ya kampuni huifungua moja kwa moja; ndani ni http://phonelink.localhost:7842, na uzalishaji weka NEXT_PUBLIC_PHONELINK_DASHBOARD_URL kuwa https://phonelink.gbrain.tech.",
      ),
      prerequisites: localizedList(
        [
          "Node.js relay running from demo-app/desktop",
          "A browser that resolves phonelink.localhost, or the relay's LAN IP",
          "PhoneLink installed on the Android device",
        ],
        [
          "Relay ya Node.js inayoendesha kutoka demo-app/desktop",
          "Kivinjari kinachotatua phonelink.localhost, au anwani ya LAN ya relay",
          "PhoneLink imesakinishwa kwenye kifaa cha Android",
        ],
      ),
      callout: callout(
        "tip",
        "Tune the stream",
        "Lower the frame rate or JPEG quality if mirroring feels laggy on a crowded Wi-Fi network.",
        "Rekebisha mtiririko",
        "Punguza kasi ya fremu au ubora wa JPEG ikiwa kuakisi kunachelewesha kwenye Wi-Fi yenye watu wengi.",
      ),
      image: image(
        "Live dashboard",
        "Mirrored screen with the tool rail visible",
        "Dashibodi ya moja kwa moja",
        "Skrini iliyoakisiwa ikiwa na zana upande",
      ),
    },
    "screen-mirroring": {
      intro: localized(
        "Mirroring streams the phone's real screen as JPEG frames over a dedicated WebSocket, so the browser and CLI see the same picture.",
        "Kuakisi hutuma skrini halisi ya simu kama fremu za JPEG kupitia WebSocket maalum, ili kivinjari na CLI visione picha ile ile.",
      ),
      prerequisites: localizedList(
        [
          "A paired device that is currently online",
          "MediaProjection consent for the capture session",
          "The relay reachable on port 7842",
        ],
        [
          "Kifaa kilichounganishwa na kilicho mtandaoni kwa sasa",
          "Idhini ya MediaProjection kwa kikao cha unasaji",
          "Relay inayofikiwa kwenye bandari 7842",
        ],
      ),
      callout: callout(
        "tip",
        "Lower the load if frames lag",
        "Reduce capture width, frames per second or JPEG quality on a crowded Wi-Fi network.",
        "Punguza mzigo ikiwa fremu zinachelewa",
        "Punguza upana wa unasaji, idadi ya fremu kwa sekunde au ubora wa JPEG kwenye Wi-Fi yenye watu wengi.",
      ),
      image: image(
        "Mirrored screen",
        "Live JPEG frames with the tool rail visible",
        "Skrini iliyoakisiwa",
        "Fremu za JPEG za moja kwa moja zikiwa na zana upande",
      ),
    },
    "file-manager": {
      intro: localized(
        "File operations run through the relay so the dashboard and the CLI browse the same phone storage.",
        "Shughuli za faili hupitia relay, hivyo dashibodi na CLI huvinjari hifadhi ile ile ya simu.",
      ),
      prerequisites: localizedList(
        [
          "A paired, online device",
          "MANAGE_EXTERNAL_STORAGE granted for full file access",
        ],
        [
          "Kifaa kilichounganishwa na kilicho mtandaoni",
          "MANAGE_EXTERNAL_STORAGE imeruhusiwa kwa ufikiaji kamili wa faili",
        ],
      ),
      callout: callout(
        "warning",
        "Deletes are recursive",
        "rm removes folders and everything inside them. Check the path before deleting anything from the phone.",
        "Kufuta ni kwa mtiririko wote",
        "rm huondoa folda na yaliyomo yote. Angalia njia kabla ya kufuta chochote kwenye simu.",
      ),
      image: image(
        "File browser",
        "Storage folders with upload and preview controls",
        "Kivinjari cha faili",
        "Folda za hifadhi zikiwa na kupakia na muonekano wa faili",
      ),
    },
    "device-tools": {
      intro: localized(
        "Quick device tools expose everyday actions such as lock, wake, ring, clipboard, toast, open URL, location and system stats without ADB or a Google API key.",
        "Zana za haraka za kifaa hutoa vitendo vya kila siku kama kufunga, kuamsha, kulia, klipubodi, toast, kufungua URL, eneo na takwimu za mfumo bila ADB wala ufunguo wa API wa Google.",
      ),
      prerequisites: localizedList(
        [
          "Device administrator access for remote lock",
          "Foreground location permission for location requests",
        ],
        [
          "Ufikiaji wa msimamizi wa kifaa kwa kufunga kwa mbali",
          "Ruhusa ya eneo la mbele kwa maombi ya eneo",
        ],
      ),
      callout: callout(
        "info",
        "Statistics are read-only",
        "Storage, memory, battery, display and network readings are diagnostics; only the explicit actions change device state.",
        "Takwimu ni za kusoma tu",
        "Visomo vya hifadhi, kumbukumbu, betri, onyesho na mtandao ni vya uchunguzi; vitendo vilivyochaguliwa tu vinabadilisha hali ya kifaa.",
      ),
      image: image(
        "Device tools panel",
        "Quick actions beside system statistics",
        "Paneli ya zana za kifaa",
        "Vitendo vya haraka karibu na takwimu za mfumo",
      ),
    },
    cli: {
      intro: localized(
        "The phonelink command connects to the same relay as the dashboard. Use it interactively or append a command for scripts.",
        "Amri ya phonelink huungana na relay ile ile inayotumika na dashibodi. Itumie kwa mwingiliano au ongeza amri kwa ajili ya script.",
      ),
      prerequisites: localizedList(
        [
          "The relay running on the host",
          "npm install completed in the desktop folder",
        ],
        [
          "Relay inafanya kazi kwenye kompyuta",
          "npm install imekamilika kwenye folda ya desktop",
        ],
      ),
      callout: callout(
        "info",
        "One linked phone at a time",
        "The current build focuses on a single phone. Run phonelink devices to see which device is linked.",
        "Simu moja kwa wakati",
        "Toleo la sasa hulenga simu moja. Endesha phonelink devices ili kuona kifaa kilichounganishwa.",
      ),
      image: image(
        "CLI session",
        "Device status and file transfer commands",
        "Kikao cha CLI",
        "Hali ya kifaa na amri za kuhamisha faili",
      ),
    },
    security: {
      intro: localized(
        "PhoneLink is a trusted-LAN tool. Its threat model assumes the network around the relay is controlled by you.",
        "PhoneLink ni chombo cha mtandao wa eneo unaoaminika. Muundo wake unadhani mtandao unaozunguka relay uko chini yako.",
      ),
      callout: callout(
        "warning",
        "Do not expose port 7842",
        "There is no built-in authentication or TLS yet. Use a VPN such as Tailscale or WireGuard for any access outside your LAN.",
        "Usifungue bandari 7842",
        "Hakuna uthibitisho au TLS bado. Tumia VPN kama Tailscale au WireGuard kwa ufikiaji wowote nje ya mtandao wa eneo.",
      ),
      image: image(
        "Network topology",
        "Phone and relay behind a VPN boundary",
        "Muundo wa mtandao",
        "Simu na relay nyuma ya mpaka wa VPN",
      ),
    },
    architecture: {
      intro: localized(
        "Three processes cooperate: the Expo/Kotlin Android client, the Node.js relay with its web dashboard, and the phonelink CLI that shares the relay's state.",
        "Vichakata vitatu hufanya kazi pamoja: klayenti ya Android ya Expo/Kotlin, relay ya Node.js yenye dashibodi ya wavuti, na CLI ya phonelink inayoshiriki hali ya relay.",
      ),
      callout: callout(
        "info",
        "Separate channels per job",
        "Control uses /phone and /dashboard, while JPEG screen frames use /screen so a busy stream does not block commands.",
        "Njia tofauti kwa kazi tofauti",
        "Udhibiti hutumia /phone na /dashboard, wakati fremu za JPEG hutumia /screen ili mtiririko mzito usizuiye amri.",
      ),
      image: image(
        "Architecture diagram",
        "Phone, relay, dashboard and CLI connections",
        "Mchoro wa usanifu",
        "Miunganisho ya simu, relay, dashibodi na CLI",
      ),
    },
    troubleshooting: {
      intro: localized(
        "Most PhoneLink failures come from network reachability or a missing permission. Work through the relay, pairing and permission checks in that order.",
        "Matatizo mengi ya PhoneLink hutokana na kufikiwa kwa mtandao au ruhusa isiyopo. Angalia relay, kuoanisha na ruhusa kwa mpangilio huo.",
      ),
      prerequisites: localizedList(
        [
          "Access to the relay host terminal",
          "The phone available for a quick retest",
        ],
        [
          "Ufikiaji wa terminal ya kompyuta inayoendesha relay",
          "Simu inapatikana kwa majaribio ya haraka tena",
        ],
      ),
      callout: callout(
        "tip",
        "Read the logs first",
        "The relay console and dashboard log show heartbeats, disconnects and command errors before you change configuration.",
        "Soma kumbukumbu kwanza",
        "Konsole ya relay na kumbukumbu ya dashibodi huonyesha mapigo ya moyo, kukatika na makosa ya amri kabla ya kubadilisha usanidi.",
      ),
      image: image(
        "Diagnostics view",
        "Relay log with connection and heartbeat events",
        "Mwonekano wa uchunguzi",
        "Kumbukumbu ya relay yenye matukio ya muunganisho na mapigo ya moyo",
      ),
    },
  },
};
