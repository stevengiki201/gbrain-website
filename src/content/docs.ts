import type { Locale } from "@/config/i18n";

export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type DocPage = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  topics: LocalizedList;
  commands?: LocalizedList;
};

export const productKeys = ["media", "sms", "phonelink", "neural"] as const;
export type ProductKey = (typeof productKeys)[number];

export const productPaths = {
  media: "/products/media",
  sms: "/products/sms",
  phonelink: "/products/phonelink",
  neural: "/products/neural",
} as const;

export const docs: Record<ProductKey, DocPage[]> = {
  media: [
    {
      slug: "getting-started",
      title: { en: "Getting started", sw: "Kuanza kutumia" },
      description: {
        en: "Install GBrain Media Player, grant media access and build your offline library.",
        sw: "Sakinisha GBrain Media Player, ruhusu ufikiaji wa midia na jenga maktaba yako ya nje ya mtandao.",
      },
      topics: {
        en: [
          "Install the Android build or run the Expo development build.",
          "Grant media library permissions on first launch so the app can scan local files.",
          "Wait for the initial scan to finish, then use Search to find songs or videos.",
          "Create a playlist from the library and add it to your home screen shortcuts.",
        ],
        sw: [
          "Sakinisha toleo la Android au endesha toleo la maendeleo la Expo.",
          "Ruhusu ufikiaji wa maktaba ya midia wakati wa kuzindua kwa mara ya kwanza.",
          "Subiri skani ya awali ikamilike, kisha tumia Utafutaji kupata nyimbo au video.",
          "Unda orodha ya kucheza kutoka kwenye maktaba na uiweke kwenye skrini ya nyumbani.",
        ],
      },
      commands: {
        en: ["npm install", "npx expo start", "npx expo run:android"],
        sw: ["npm install", "npx expo start", "npx expo run:android"],
      },
    },
    {
      slug: "architecture",
      title: { en: "Architecture", sw: "Usanifu" },
      description: {
        en: "How scanning, metadata caching, playback engines and UI state fit together.",
        sw: "Jinsi skani, uhifadhi wa metadata, injini za kucheza na hali ya kiolesura vinavyofanya kazi pamoja.",
      },
      topics: {
        en: [
          "expo-media-library supplies device media; a SQLite cache stores metadata for fast startup.",
          "expo-audio handles music and expo-video handles video, with mutual exclusivity between them.",
          "MobX stores own library, playlist, favorites, history and playback state.",
          "The persistent mini-player stays above tab navigation across screens.",
        ],
        sw: [
          "expo-media-library hupata midia ya kifaa; SQLite huhifadhi metadata kwa kuanza haraka.",
          "expo-audio hucheza muziki na expo-video hucheza video, bila kucheza zote kwa wakati mmoja.",
          "MobX huhifadhi maktaba, orodha za kucheza, vipendwa, historia na hali ya kucheza.",
          "Kidogo-cheza kinachodumu kiko juu ya urambazaji kwenye skrini zote.",
        ],
      },
    },
    {
      slug: "web",
      title: { en: "Web support", sw: "Msaada wa wavuti" },
      description: {
        en: "Browser fallbacks and known limitations of the web build.",
        sw: "Mbadala wa kivinjari na mapungufu yanayojulikana ya toleo la wavuti.",
      },
      topics: {
        en: [
          "The web build uses localStorage instead of SQLite for library metadata.",
          "Background audio and native media scanning are not available in a browser.",
          "Use a development build for full functionality on a physical device.",
        ],
        sw: [
          "Toleo la wavuti hutumia localStorage badala ya SQLite kwa metadata.",
          "Sauti ya chinichini na skani ya asili ya midia havipatikani kwenye kivinjari.",
          "Tumia toleo la maendeleo kwa utendaji kamili kwenye kifaa halisi.",
        ],
      },
    },
    {
      slug: "api",
      title: { en: "API reference", sw: "Rejea ya API" },
      description: {
        en: "The stores, contexts and engines exposed to app code.",
        sw: "Hifadhi, miktadha na injini zinazotolewa kwa kanuni za programu.",
      },
      topics: {
        en: [
          "Library store: scan, search, recently added and recently played selectors.",
          "Playback engine: play, pause, seek, shuffle, repeat and queue management.",
          "Playlist store: create, rename, reorder, add or remove tracks, delete.",
          "Theme context: light, dark and system modes with custom palettes.",
        ],
        sw: [
          "Hifadhi ya maktaba: skani, utafutaji, vilivyoongezwa hivi karibuni na vilivyochezwa.",
          "Injini ya kucheza: kucheza, kusimamisha, kusogea, kuchanganya, kurudia na foleni.",
          "Hifadhi ya orodha: kunda, kubadilisha jina, kupanga, kuongeza au kuondoa nyimbo, kufuta.",
          "Muktadha wa mandhari: mwanga, giza na mfumo na rangi maalum.",
        ],
      },
    },
  ],
  sms: [
    {
      slug: "setup",
      title: { en: "Setup guide", sw: "Mwongozo wa kusakinisha" },
      description: {
        en: "Prepare Linux, Android, ADB and the adbsms companion app.",
        sw: "Andaa Linux, Android, ADB na programu ndogo ya adbsms.",
      },
      topics: {
        en: [
          "Install Python 3.10+, enable USB debugging and connect the phone via ADB.",
          "Install the adbsms companion app to expose SMS content on modern Android.",
          "Create a virtual environment, install requirements and copy config.example.yaml.",
          "Run the bot and verify that inbound messages appear in the logs.",
        ],
        sw: [
          "Sakinisha Python 3.10+, wezesha urekebishaji wa USB na unganisha simu kupitia ADB.",
          "Sakinisha programu ya adbsms kufikia SMS kwenye Android ya kisasa.",
          "Unda mazingira pepe, sakinisha mahitaji na nakili config.example.yaml.",
          "Endesha bot na uhakikishe ujumbe unaoingia unaonekana kwenye kumbukumbu.",
        ],
      },
      commands: {
        en: [
          "python3 -m venv .venv",
          "pip install -r requirements.txt",
          "python -m bot.main run",
        ],
        sw: [
          "python3 -m venv .venv",
          "pip install -r requirements.txt",
          "python -m bot.main run",
        ],
      },
    },
    {
      slug: "config",
      title: { en: "Configuration", sw: "Usanidi" },
      description: {
        en: "A reference for config.yaml, models, reply rules and safety limits.",
        sw: "Rejea ya config.yaml, miundo, sheria za majibu na mipaka ya usalama.",
      },
      topics: {
        en: [
          "Set the Ollama model and fallback mode for replies when the model is unavailable.",
          "Configure allowed contacts, reply cooldowns and do-not-disturb windows.",
          "Enable scheduling to interpret phrases such as 'reply at 7pm'.",
          "Keep webhooks disabled unless you explicitly want data to leave the machine.",
        ],
        sw: [
          "Weka mfano wa Ollama na hali ya mbadala wakati mfano haupatikani.",
          "Sanidi anwani zinazoruhusiwa, muda wa kusubiri na vipindi vya kutokusumbua.",
          "Wezesha ratiba kutafsiri maneno kama 'jibu saa 7 jioni'.",
          "Usiwezesha webhooks isipokuwa unataka data iache mashine yako.",
        ],
      },
    },
    {
      slug: "voice",
      title: { en: "Voice bridge", sw: "Daraja la sauti" },
      description: {
        en: "Whisper speech-to-text and Piper text-to-speech over an acoustic call bridge.",
        sw: "Whisper kwa kusoma sauti na Piper kwa kuzalisha sauti kupitia daraja la akustika.",
      },
      topics: {
        en: [
          "The bridge uses the speakerphone and microphone; it does not access cellular call audio.",
          "faster-whisper performs local speech recognition with a configurable model size.",
          "Piper provides natural Swahili voices and half-duplex playback with echo cancellation.",
          "Voice activity detection pauses capture while the reply is played back.",
        ],
        sw: [
          "Daraja hutumia spika na maikrofoni; halifikii sauti ya simu ya rununu.",
          "faster-whisper hutambua sauti kwenye kifaa na ukubwa wa mfano unaoweza kusanidiwa.",
          "Piper hutoa sauti za Kiswahili na uchezaji wa nusu-duplex na kufuta mwangwi.",
          "Kugundua shughuli za sauti husimamisha kurekodi wakati jibu linachezwa.",
        ],
      },
    },
    {
      slug: "cli",
      title: { en: "CLI reference", sw: "Rejea ya CLI" },
      description: {
        en: "Commands for running, inspecting and maintaining the SMS bot.",
        sw: "Amri za kuendesha, kukagua na kutunza bot ya SMS.",
      },
      topics: {
        en: [
          "python -m bot.main run starts the foreground service.",
          "Use the status command to inspect ADB connection and model health.",
          "Log rotation keeps disk usage bounded during long-running deployments.",
          "Deduplication by SMS id prevents replying twice to the same message.",
        ],
        sw: [
          "python -m bot.main run huanzisha huduma ya mbele.",
          "Tumia amri ya status kukagua muunganisho wa ADB na afya ya mfano.",
          "Kuzungusha kumbukumbu huweka matumizi ya diski chini wakati wa uendeshaji mrefu.",
          "Kuondoa nakala kwa kutumia kitambulisho cha SMS huzuia kujibu mara mbili.",
        ],
      },
    },
  ],
  phonelink: [
    {
      slug: "install",
      title: { en: "Installation", sw: "Usakinishaji" },
      description: {
        en: "Set up the Node.js desktop relay and install the Android client.",
        sw: "Sanidi relay ya Node.js kwenye kompyuta na sakinisha programu ya Android.",
      },
      topics: {
        en: [
          "Install Node.js 18+ and start the desktop relay on your computer.",
          "Install the PhoneLink APK on Android 9+ and allow the requested permissions.",
          "Connect both devices to the same trusted Wi-Fi network.",
          "Open the web dashboard to confirm the device is online.",
        ],
        sw: [
          "Sakinisha Node.js 18+ na uanzishe relay kwenye kompyuta yako.",
          "Sakinisha APK ya PhoneLink kwenye Android 9+ na ruhusu ruhusa zinazoombwa.",
          "Unganisha vifaa vyote kwenye mtandao mmoja wa Wi-Fi unaoaminika.",
          "Fungua dashibodi ya wavuti kuthibitisha kifaa kiko mtandaoni.",
        ],
      },
    },
    {
      slug: "cli",
      title: { en: "CLI reference", sw: "Rejea ya CLI" },
      description: {
        en: "Manage devices and transfer files from the terminal.",
        sw: "Simamia vifaa na uhamishe faili kutoka kwenye terminal.",
      },
      topics: {
        en: [
          "Use phonelink devices to list devices visible on the local network.",
          "Use phonelink pair to attach a device before running remote commands.",
          "File commands support browse, upload, download, rename and delete.",
          "The dashboard is available on the relay host at port 7842.",
        ],
        sw: [
          "Tumia phonelink devices kuorodhesha vifaa vinavyoonekana kwenye mtandao wa eneo.",
          "Tumia phonelink pair kuunganisha kifaa kabla ya amri za mbali.",
          "Amri za faili zinasaidia kuvinjari, kupakia, kupakua, kubadilisha jina na kufuta.",
          "Dashibodi inapatikana kwenye relay bandari 7842.",
        ],
      },
    },
    {
      slug: "dashboard",
      title: { en: "Dashboard", sw: "Dashibodi" },
      description: {
        en: "A tour of the local web interface and its live device tools.",
        sw: "Utangulizi wa kiolesura cha wavuti cha eneo na zana za kifaa za moja kwa moja.",
      },
      topics: {
        en: [
          "Screen mirroring streams JPEG frames over a dedicated WebSocket connection.",
          "Tap, swipe, scroll, key and text input are simulated through AccessibilityService.",
          "Device tools include lock, wake, ring, clipboard, location and system stats.",
          "Resolution, frame rate and image quality are configurable from the settings panel.",
        ],
        sw: [
          "Kuakisi skrini hutuma picha za JPEG kupitia muunganisho maalum wa WebSocket.",
          "Kugusa, kuteleza, kusogeza na kuandika huigwa kupitia AccessibilityService.",
          "Zana za kifaa ni pamoja na kufunga, kuamsha, kulia, klipubodi, eneo na takwimu za mfumo.",
          "Azimio, kasi ya fremu na ubora wa picha vinasanidiwa kutoka kwenye mipangilio.",
        ],
      },
    },
    {
      slug: "security",
      title: { en: "Security", sw: "Usalama" },
      description: {
        en: "Network boundaries, current limitations and safer deployment advice.",
        sw: "Mipaka ya mtandao, mapungufu ya sasa na ushauri wa usakinishaji salama.",
      },
      topics: {
        en: [
          "PhoneLink is designed for a trusted LAN; it does not expose a public endpoint.",
          "For remote access, put the relay behind a VPN such as Tailscale or WireGuard.",
          "Pairing codes, device authentication and TLS are planned but not yet implemented.",
          "Only connect devices you control and keep the relay host updated.",
        ],
        sw: [
          "PhoneLink imeundwa kwa mtandao wa eneo unaoaminika; haifichui mlango wa umma.",
          "Kwa ufikiaji wa mbali, weka relay nyuma ya VPN kama Tailscale au WireGuard.",
          "Kanuni za kuoanisha, uthibitisho wa kifaa na TLS vimepangwa lakini bado.",
          "Unganisha tu vifaa unavyodhibiti na usasisisha kompyuta inayoendesha relay.",
        ],
      },
    },
  ],
  neural: [
    {
      slug: "quickstart",
      title: { en: "Quick start", sw: "Kuanza haraka" },
      description: {
        en: "Run the API, start the dashboard and connect a local Ollama model.",
        sw: "Endesha API, anza dashibodi na unganisha mfano wa Ollama wa eneo.",
      },
      topics: {
        en: [
          "Run the setup script to create the environment and install dependencies.",
          "Start the API and open the generated documentation at 127.0.0.1:8000/api/docs.",
          "Start the web dashboard and open it at localhost:5173.",
          "Pull a local Ollama model and confirm capability detection in the dashboard.",
        ],
        sw: [
          "Endesha script ya kusanidi kuunda mazingira na kusakinisha mahitaji.",
          "Anzisha API na ufungue nyaraka kwenye 127.0.0.1:8000/api/docs.",
          "Anzisha dashibodi ya wavuti na uifungue kwenye localhost:5173.",
          "Pakua mfano wa Ollama wa eneo na uthibitishe ugunduzi wa uwezo kwenye dashibodi.",
        ],
      },
      commands: {
        en: [
          "./scripts/setup.sh",
          "./scripts/development/api.sh",
          "./scripts/development/web.sh",
        ],
        sw: [
          "./scripts/setup.sh",
          "./scripts/development/api.sh",
          "./scripts/development/web.sh",
        ],
      },
    },
    {
      slug: "architecture",
      title: { en: "Architecture", sw: "Usanifu" },
      description: {
        en: "Core, engines, providers, agents and the approval boundary.",
        sw: "Kiini, injini, watoa huduma, mawakala na mpaka wa idhini.",
      },
      topics: {
        en: [
          "Neural Core coordinates context, reasoning and action engines.",
          "The AIProvider interface is neutral; Ollama is the default local implementation.",
          "Agents, skills and tools are permission-scoped and audited.",
          "Consequential actions pass through approval gates before execution.",
        ],
        sw: [
          "Kiini cha Neural huratibu miktadha, hoja na injini za hatua.",
          "Kiolezo cha AIProvider ni huru; Ollama ndiye utekelezaji wa eneo.",
          "Mawakala, ujuzi na zana vina ruhusa maalum na hukaguliwa.",
          "Hatua muhimu hupitia idhini kabla ya kutekelezwa.",
        ],
      },
    },
    {
      slug: "api",
      title: { en: "API reference", sw: "Rejea ya API" },
      description: {
        en: "Where to find generated OpenAPI docs and the main endpoint groups.",
        sw: "Mahali pa kupata nyaraka za OpenAPI na makundi makuu ya vituo.",
      },
      topics: {
        en: [
          "Interactive OpenAPI documentation is served at /api/docs on the backend.",
          "Endpoints cover chat, agents, tasks, automations, integrations and devices.",
          "The security engine exposes authentication, approvals and audit history.",
          "All endpoints run locally; no GBrain account is required.",
        ],
        sw: [
          "Nyaraka za OpenAPI zinazofanya kazi ziko /api/docs kwenye seva.",
          "Vituo vinajumuisha mazungumzo, mawakala, kazi, otomatiki, muunganisho na vifaa.",
          "Injini ya usalama ina uthibitisho, idhini na historia ya ukaguzi.",
          "Vituo vyote hufanya kazi kwenye eneo; akaunti ya GBrain haihitajiki.",
        ],
      },
    },
    {
      slug: "subsystems",
      title: { en: "Subsystems", sw: "Mifumo ndogo" },
      description: {
        en: "How MrX, SMS, PhoneLink and AudioLink plug into the platform.",
        sw: "Jinsi MrX, SMS, PhoneLink na AudioLink vinavyoungana na jukwaa.",
      },
      topics: {
        en: [
          "MrX is a local coding agent that asks clarifying questions and verifies results.",
          "The SMS subsystem simulates inbound messages and sends replies over ADB.",
          "The PhoneLink subsystem performs device operations such as wake, alarm and location.",
          "The AudioLink subsystem provides a loopback client for PC-to-phone audio.",
        ],
        sw: [
          "MrX ni wakala wa programu wa eneo anayeuliza maswali na kuthibitisha matokeo.",
          "Mfumo wa SMS huiga ujumbe unaoingia na kutuma majibu kupitia ADB.",
          "Mfumo wa PhoneLink hufanya shughuli za kifaa kama kuamsha, kengele na eneo.",
          "Mfumo wa AudioLink hutoa klayenti ya kitanzi kwa sauti kutoka PC kwenda simu.",
        ],
      },
    },
    {
      slug: "development",
      title: { en: "Development", sw: "Maendeleo" },
      description: {
        en: "Testing, contributions and the release lifecycle.",
        sw: "Upimaji, michango na mzunguko wa kutolewa kwa toleo.",
      },
      topics: {
        en: [
          "Run the documented test suite before proposing a change.",
          "Keep new providers behind the existing interfaces so local-first defaults remain intact.",
          "Use the security engine audit trail when reviewing agent or automation changes.",
          "Release notes are summarized on the product changelog.",
        ],
        sw: [
          "Endesha majaribio yaliyoandikwa kabla ya kupendekeza mabadiliko.",
          "Weka watoa huduma wapya ndani ya kiolesura kilichopo ili kudumisha kanuni ya kwanza-kidevaisi.",
          "Tumia kumbukumbu ya ukaguzi ya injini ya usalama wakati wa kukagua mawakala na otomatiki.",
          "Maelezo ya toleo yanafupishwa kwenye rekodi ya mabadiliko ya bidhaa.",
        ],
      },
    },
  ],
};

export const productNames: Record<ProductKey, LocalizedText> = {
  media: { en: "GBrain Media Player", sw: "GBrain Media Player" },
  sms: { en: "GBrain SMS + AudioLink", sw: "GBrain SMS + AudioLink" },
  phonelink: { en: "PhoneLink", sw: "PhoneLink" },
  neural: { en: "GBrain Neural System", sw: "Mfumo wa GBrain Neural" },
};

export function isProductKey(value: string): value is ProductKey {
  return productKeys.includes(value as ProductKey);
}

export function findDoc(product: ProductKey, slug: string) {
  return docs[product].find((doc) => doc.slug === slug);
}
