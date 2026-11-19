import type { Locale } from "@/config/i18n";

export type BlogPost = {
  slug: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  content: Record<Locale, string[]>;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "introducing-gbrain-neural",
    title: {
      en: "Introducing GBrain Neural System: Phases 1-12 Complete",
      sw: "Kutangaza Mfumo wa GBrain Neural: Awamu 1-12 Zimekamilika",
    },
    excerpt: {
      en: "Our modular AI execution platform is ready: MrX coding agent, desktop and browser control, and unified subsystems.",
      sw: "Jukwaa letu la utekelezaji wa AI liko tayari: wakala wa MrX, udhibiti wa eneo-kazi na kivinjari, na mifumo ndogo iliyounganishwa.",
    },
    date: "2026-11-16",
    readTime: "8 min",
    category: "Release",
    tags: ["AI", "Platform", "MrX", "Automation"],
    content: {
      en: [
        "GBrain Neural System has reached the end of its twelve planned phases. What started as a local model runner is now a platform with context, reasoning, action, memory, knowledge, security and device engines.",
        "MrX, the local coding agent, can ask clarifying questions, write scoped files, install dependencies and run builds before it reports completion. Consequential actions pass through approval gates and are recorded in the audit trail.",
        "The SMS, PhoneLink and AudioLink subsystems are integrated as first-class modules, and the API is available for teams that want to build their own interfaces on top.",
      ],
      sw: [
        "Mfumo wa GBrain Neural umefikia mwisho wa awamu zake kumi na mbili. Kilichoanza kama kiendesha mfano wa eneo sasa ni jukwaa lenye miktadha, hoja, hatua, kumbukumbu, maarifa, usalama na injini za kifaa.",
        "MrX, wakala wa programu wa eneo, huuliza maswali ya ufafanuzi, huandika faili maalum, husakinisha mahitaji na huendesha majaribio kabla ya kuripoti kukamilika. Hatua muhimu hupitia idhini na kurekodiwa.",
        "Mifumo ndogo ya SMS, PhoneLink na AudioLink imeunganishwa kama moduli kuu, na API inapatikana kwa timu zinazotaka kujenga kiolesura chao.",
      ],
    },
  },
  {
    slug: "gbrain-media-player-1-0",
    title: {
      en: "GBrain Media Player 1.0: Offline-First Media for Android",
      sw: "GBrain Media Player 1.0: Midia ya Kwanza-Nje ya Mtandao kwa Android",
    },
    excerpt: {
      en: "Our Expo-based music and video player hits 1.0 with playlists, a mini-player, themes and no cloud dependencies.",
      sw: "Kicheza muziki na video chetu kilichojengwa kwa Expo kinafikia 1.0 na orodha za kucheza, kidogo-cheza, mandhari na bila wingu.",
    },
    date: "2026-11-15",
    readTime: "5 min",
    category: "Release",
    tags: ["Android", "Expo", "Media", "Offline"],
    content: {
      en: [
        "GBrain Media Player 1.0 is out. It scans local media, caches metadata in SQLite and gives you playlists, favorites, history and search without a network connection.",
        "A persistent mini-player stays above tab navigation, while a full-screen player handles queues, shuffle, repeat and video playback. Light, dark and system themes are supported.",
        "The web build uses localStorage as a fallback, but the full experience lives on Android where native media access is available.",
      ],
      sw: [
        "GBrain Media Player 1.0 umetoka. Huskani midia ya eneo, huhifadhi metadata kwenye SQLite na hukupa orodha, vipendwa, historia na utafutaji bila muunganisho wa mtandao.",
        "Kidogo-cheza kinachodumu kiko juu ya urambazaji, wakati kicheza skrini kamili kinashughulikia foleni, kuchanganya, kurudia na video. Mandhari ya mwanga, giza na mfumo yanapatikana.",
        "Toleo la wavuti hutumia localStorage kama mbadala, lakini uzoefu kamili uko kwenye Android ambapo ufikiaji wa asili wa midia unapatikana.",
      ],
    },
  },
  {
    slug: "building-local-first-ai",
    title: {
      en: "Building Local-First AI: Lessons from GBrain SMS",
      sw: "Kujenga AI ya Kwanza-Kidevaisi: Masomo kutoka GBrain SMS",
    },
    excerpt: {
      en: "Why we chose Ollama over cloud APIs, how we handle offline fallbacks, and what we learned about on-device inference.",
      sw: "Kwa nini tulichagua Ollama badala ya API za wingu, jinsi tunavyoshughulikia mbadala wa nje ya mtandao, na tuliyojifunza kuhusu ufahamu kwenye kifaa.",
    },
    date: "2026-11-10",
    readTime: "12 min",
    category: "Engineering",
    tags: ["AI", "Ollama", "Privacy", "Architecture"],
    content: {
      en: [
        "Cloud APIs are convenient but they make privacy and offline operation promises hard to keep. We chose Ollama so replies are generated on the machine that owns the data.",
        "Models are not always available. GBrain SMS falls back to deterministic rules when Ollama is down, which keeps the product useful during power cuts and network outages.",
        "The biggest lesson is that local-first is an architecture decision, not a feature flag: storage, scheduling, logging and testing all have to assume the network may disappear.",
      ],
      sw: [
        "API za wingu ni rahisi lakini hufanya ahadi za faragha na uendeshaji nje ya mtandao kuwa ngumu. Tulichagua Ollama ili majibu yatolewe kwenye mashine iliyo na data.",
        "Miundo si daima inapatikana. GBrain SMS hurudia sheria zilizowekwa wakati Ollama haifanyi kazi, hivyo bidhaa inabaki muhimu wakati wa kukatika kwa umeme au mtandao.",
        "Somo kubwa ni kwamba kwanza-kidevaisi ni uamuzi wa usanifu, si kipengele: hifadhi, ratiba, kumbukumbu na upimaji vyote vinapaswa kudhani mtandao unaweza kutoweka.",
      ],
    },
  },
  {
    slug: "phonelink-v1-1-screen-mirroring",
    title: {
      en: "PhoneLink v1.1: Real Screen Mirroring via MediaProjection",
      sw: "PhoneLink v1.1: Kuakisi Skrini Halisi kupitia MediaProjection",
    },
    excerpt: {
      en: "Foreground service capture, JPEG streaming and remote control through AccessibilityService — all on the local network.",
      sw: "Unasaji kupitia huduma ya mbele, utiririshaji wa JPEG na udhibiti wa mbali kupitia AccessibilityService — vyote kwenye mtandao wa eneo.",
    },
    date: "2026-11-08",
    readTime: "7 min",
    category: "Release",
    tags: ["Android", "Remote Control", "MediaProjection"],
    content: {
      en: [
        "PhoneLink 1.1 adds real screen mirroring. A foreground service captures frames with MediaProjection and streams JPEG images over a dedicated WebSocket.",
        "Input is simulated through AccessibilityService: taps, swipes, scrolling, system keys and text. Resolution, frame rate and quality are adjustable from the dashboard.",
        "Everything stays on the trusted LAN. For access away from home, put the relay behind a VPN rather than exposing it to the public internet.",
      ],
      sw: [
        "PhoneLink 1.1 unaongeza uakisi halisi wa skrini. Huduma ya mbele hunasa fremu kwa MediaProjection na kutiririsha picha za JPEG kupitia WebSocket maalum.",
        "Ingizo huigwa kupitia AccessibilityService: kugusa, kuteleza, kusogeza, vitufe vya mfumo na maandishi. Azimio, kasi na ubora vinarekebishwa kwenye dashibodi.",
        "Kila kitu kinabaki kwenye mtandao unaoaminika. Kwa ufikiaji wa mbali, weka relay nyuma ya VPN badala ya kuifichua kwenye mtandao wa umma.",
      ],
    },
  },
  {
    slug: "why-offline-first-matters-africa",
    title: {
      en: "Why Offline-First Matters for African Users",
      sw: "Kwa Nini Kwanza-Nje ya Mtandao Ni Muhimu kwa Watumiaji wa Afrika",
    },
    excerpt: {
      en: "Intermittent connectivity, expensive data and power cuts are not edge cases — they are daily reality.",
      sw: "Muunganisho usio imara, gharama ya data na kukatika kwa umeme si hali za kipekee — ni ukweli wa kila siku.",
    },
    date: "2026-11-01",
    readTime: "10 min",
    category: "Perspective",
    tags: ["Africa", "Design", "Offline", "Connectivity"],
    content: {
      en: [
        "Designing for African users means treating the network as optional. A feature that needs a round trip to a cloud server will fail on a bus, in a village, or during a power cut.",
        "Local-first software changes the economics too: no mandatory subscriptions, smaller data bills, and devices that remain useful for years.",
        "We build for those conditions from the first line of code, not as a degraded mode added at the end.",
      ],
      sw: [
        "Kubuni kwa watumiaji wa Afrika kunamaanisha kudhani mtandao ni hiari. Kipengele kinachohitaji safari kwenda kwenye seva ya wingu kitashindwa kwenye basi, kijijini, au wakati wa kukatika kwa umeme.",
        "Programu ya kwanza-kidevaisi pia hubadilisha gharama: hakuna usajili wa lazima, bili ndogo za data, na vifaa vinavyobaki muhimu kwa miaka.",
        "Tunajenga kwa hali hizo tangu mstari wa kwanza wa kanuni, si kama hali duni iliyoongezwa mwishoni.",
      ],
    },
  },
  {
    slug: "voice-bridge-architecture",
    title: {
      en: "Acoustic Voice Bridge Architecture: Whisper + Piper",
      sw: "Usanifu wa Daraja la Sauti: Whisper + Piper",
    },
    excerpt: {
      en: "How we built real-time voice calls without cellular audio access — speakerphone, microphone and local STT/TTS.",
      sw: "Jinsi tulivyojenga simu za sauti za wakati halisi bila ufikiaji wa sauti ya rununu — spika, maikrofoni na STT/TTS ya eneo.",
    },
    date: "2026-10-25",
    readTime: "15 min",
    category: "Engineering",
    tags: ["Voice", "Whisper", "Piper", "STT", "TTS"],
    content: {
      en: [
        "Android does not give ordinary apps access to cellular call audio. Our bridge works acoustically: it listens through the microphone and plays replies through the speakerphone.",
        "faster-whisper performs speech recognition locally, while Piper synthesizes natural Swahili voices. Echo cancellation and voice activity detection keep the two directions from overlapping.",
        "The result is a half-duplex voice assistant that works without a cloud speech service and keeps conversations on the device.",
      ],
      sw: [
        "Android hairuhusu programu za kawaida kufikia sauti ya simu ya rununu. Daraja letu hufanya kazi kwa akustika: husikia kupitia maikrofoni na kucheza majibu kupitia spika.",
        "faster-whisper hutambua sauti kwenye kifaa, na Piper huzalisha sauti asilia za Kiswahili. Kufuta mwangwi na kugundua shughuli za sauti huzuia pande mbili kuingiliana.",
        "Matokeo yake ni msaidizi wa sauti wa nusu-duplex anayefanya kazi bila huduma ya wingu na kuweka mazungumzo kwenye kifaa.",
      ],
    },
  },
];

export function findPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
