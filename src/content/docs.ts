import type { Locale } from "@/config/i18n";

export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type DocLink = {
  label: LocalizedText;
  url: string;
};

export type DocPage = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  topics: LocalizedList;
  commands?: LocalizedList;
  links?: DocLink[];
};

export const productKeys = [
  "media",
  "sms",
  "phonelink",
  "neural",
  "shulebomba",
] as const;
export type ProductKey = (typeof productKeys)[number];

export const productPaths = {
  media: "/products/media",
  sms: "/products/sms",
  phonelink: "/products/phonelink",
  neural: "/products/neural",
  shulebomba: "/products/shulebomba",
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
  shulebomba: [
    {
      slug: "overview",
      title: { en: "Overview", sw: "Muhtasari" },
      description: {
        en: "What ShuleBomba is, who it is for and why teachers use it.",
        sw: "ShuleBomba ni nini, ni kwa ajili ya nani na kwa nini walimu wanaikitumia.",
      },
      topics: {
        en: [
          "ShuleBomba is an Android-first class management app for primary and secondary school teachers.",
          "One teacher can manage multiple classes, each with its own students, subjects, tests and attendance records.",
          "Daily work is offline-first: register students, take roll call, record marks and review saved records without a network connection.",
          "Internet is only needed to install or update the app and for uploading, viewing or syncing records.",
          "The app is designed around classroom reality: fast entry, clear records and minimal setup.",
        ],
        sw: [
          "ShuleBomba ni programu ya usimamizi wa darasa inayotumia Android kwanza, kwa walimu wa shule za msingi na sekondari.",
          "Mwalimu mmoja anaweza kusimamia madarasa mengi, kila moja ikiwa na wanafunzi, masomo, mitihani na rekodi za mahudhurio.",
          "Kazi ya kila siku hufanya kazi bila mtandao: sajili wanafunzi, chukua roll call, weka alama na angalia rekodi bila intaneti.",
          "Mtandao unahitajika tu kusakinisha au kusasisha programu na kupakia, kutazama au kusawazisha rekodi.",
          "Programu imeundwa kwa hali halisi ya darasa: kuingiza data haraka, rekodi wazi na usanidi mdogo.",
        ],
      },
      links: [
        {
          label: {
            en: "Get ShuleBomba on Google Play",
            sw: "Pata ShuleBomba kwenye Google Play",
          },
          url: "https://play.google.com/store/apps/details?id=app.ShuleBomba.com&hl=en",
        },
      ],
    },
    {
      slug: "getting-started",
      title: { en: "Getting started", sw: "Kuanza kutumia" },
      description: {
        en: "Install from Google Play and set up your school, profile and first class.",
        sw: "Sakinisha kutoka Google Play na sanidi shule, wasifu na darasa lako la kwanza.",
      },
      topics: {
        en: [
          "Install ShuleBomba from Google Play on an Android phone, or open the web build for a limited preview.",
          "Open the app and go to Settings → My Profile to add your username, school name and optional profile picture.",
          "From Home, tap Add Your First Class and give the class a clear name such as Form 3 A.",
          "Open the class, choose Add Student, then enter each learner's full name, registration number and sex.",
          "In Settings → Manage Classes, add subjects for the class before recording test scores.",
          "You are ready to take attendance; saved records can be exported as PDF, Excel or Word.",
        ],
        sw: [
          "Sakinisha ShuleBomba kutoka Google Play kwenye simu ya Android, au fungua toleo la wavuti kwa muonekano mdogo.",
          "Fungua programu na nenda Mipangilio → Wasifu Wangu ili kuongeza jina lako, jina la shule na picha ya hiari.",
          "Kutoka Nyumbani, gonga Ongeza Darasa Lako la Kwanza na liite kwa jina wazi kama Form 3 A.",
          "Fungua darasa, chagua Ongeza Mwanafunzi, kisha weka jina kamili, namba ya usajili na jinsia ya kila mwanafunzi.",
          "Kwenye Mipangilio → Simamia Madarasa, ongeza masomo ya darasa kabla ya kuweka alama za mitihani.",
          "Uko tayari kuchukua mahudhurio; rekodi zilizohifadhiwa zinaweza kutolewa kama PDF, Excel au Word.",
        ],
      },
      links: [
        {
          label: {
            en: "Download from Google Play",
            sw: "Pakua kutoka Google Play",
          },
          url: "https://play.google.com/store/apps/details?id=app.ShuleBomba.com&hl=en",
        },
      ],
    },
    {
      slug: "how-to-use",
      title: { en: "How to use ShuleBomba", sw: "Jinsi ya kutumia ShuleBomba" },
      description: {
        en: "The daily workflow from class selection to saved records and reports.",
        sw: "Mtiririko wa kila siku kutoka kuchagua darasa hadi rekodi zilizohifadhiwa na ripoti.",
      },
      topics: {
        en: [
          "Open Home and select a class to see its student count and quick actions.",
          "Use Add Student, Attendance, Add Test and Test Scores from the class screen.",
          "Edit or delete students from the class roster; deleting a student also removes that student's attendance records.",
          "Use Settings → Manage Classes to rename classes, add subjects, rename subjects or remove a class.",
          "Use the theme control in App Preference to switch between light, dark and system appearance.",
          "Share or rate the app from Settings when you want to recommend it to another teacher.",
        ],
        sw: [
          "Fungua Nyumbani na uchague darasa ili kuona idadi ya wanafunzi na vitendo vya haraka.",
          "Tumia Ongeza Mwanafunzi, Mahudhurio, Ongeza Mtihani na Alama za Mtihani kutoka skrini ya darasa.",
          "Hariri au futa wanafunzi kutoka orodha ya darasa; kufuta mwanafunzi pia huondoa rekodi zake za mahudhurio.",
          "Tumia Mipangilio → Simamia Madarasa kubadilisha jina la darasa, kuongeza masomo, kubadilisha jina la somo au kufuta darasa.",
          "Tumia kidhibiti cha mandhari kwenye Mapendeleo ya Programu kubadilisha mwanga, giza au mfumo.",
          "Shiriki au kadiria programu kutoka Mipangilio unapotaka kuipendekeza kwa mwalimu mwingine.",
        ],
      },
    },
    {
      slug: "why-choose",
      title: { en: "Why choose ShuleBomba", sw: "Kwa nini uchague ShuleBomba" },
      description: {
        en: "The practical reasons teachers choose this class management app.",
        sw: "Sababu za vitendo zinazowafanya walimu wachague programu hii ya usimamizi wa darasa.",
      },
      topics: {
        en: [
          "Teacher-focused: built around attendance, tests and class records instead of generic office work.",
          "Simple and intuitive: no training programme is needed to start taking roll call.",
          "Fast and reliable: mark a whole class present, absent or sick in seconds.",
          "Offline-first: classroom work continues during network outages and in areas with expensive data.",
          "Multi-class ready: one teacher can keep several classes separate but accessible in one place.",
          "Private by design: learner records stay on the device unless you choose to upload or sync them.",
        ],
        sw: [
          "Inayolenga mwalimu: imejengwa kwa mahudhurio, mitihani na rekodi za darasa badala ya kazi za ofisi za jumla.",
          "Rahisi na inayoeleweka: huhitaji mafunzo ili kuanza kuchukua roll call.",
          "Haraka na ya kuaminika: weka darasa lote kama liko, halipo au limeugua katika sekunde chache.",
          "Kwanza-nje-ya-mtandao: kazi ya darasa inaendelea wakati mtandao umezima au data ni ghali.",
          "Inayatuma madarasa mengi: mwalimu mmoja anaweza kuweka madarasa kadhaa tofauti lakini yanayopatikana mahali pamoja.",
          "Inayotunza faragha: rekodi za wanafunzi zinabaki kwenye kifaa isipokuwa utakaza kupakia au kusawazisha.",
        ],
      },
    },
    {
      slug: "attendance",
      title: {
        en: "Attendance and saved roll calls",
        sw: "Mahudhurio na roll call zilizohifadhiwa",
      },
      description: {
        en: "Take daily roll call, save it and review records by class and date.",
        sw: "Chukua roll call ya kila siku, ihifadhi na uitazame kwa darasa na tarehe.",
      },
      topics: {
        en: [
          "Open a class and tap Attendance, then pick or confirm the date.",
          "For each learner choose Present, Absent or Sick; review the table before saving.",
          "Tap Save Attendance and confirm the prompt. Saved entries are locked in the app, so check carefully first.",
          "Open Saved Rollcall to browse dates with attendance for the selected class.",
          "The date list shows counts for present, absent and sick learners, and you can select a saved date to inspect the full row.",
          "Use the class screen to fix roster problems before taking a new roll call.",
        ],
        sw: [
          "Fungua darasa na gonga Mahudhurio, kisha chagua au thibitisha tarehe.",
          "Kwa kila mwanafunzi chagua Aliyepo, Hayupo au Ameugua; angalia jedwali kabla ya kuhifadhi.",
          "Gonga Hifadhi Mahudhurio na uthibitishe ujumbe. Rekodi zilizohifadhiwa zimefungwa kwenye programu, hivyo angalia kwa makini kwanza.",
          "Fungua Rollcall Iliyohifadhiwa kuona tarehe zilizo na mahudhurio kwa darasa lililochaguliwa.",
          "Orodha ya tarehe inaonyesha idadi ya waliohudhuria, wasiohudhuria na walio ugua, na unaweza kuchagua tarehe iliyohifadhiwa kuona safu kamili.",
          "Tumia skrini ya darasa kurekebisha matatizo ya orodha kabla ya kuchukua roll call mpya.",
        ],
      },
    },
    {
      slug: "tests-and-scores",
      title: { en: "Tests and scores", sw: "Mitihani na alama" },
      description: {
        en: "Create subjects, record marks and review scores across a class.",
        sw: "Unda masomo, weka alama na angalia alama za darasa lote.",
      },
      topics: {
        en: [
          "Add subjects under Settings → Manage Classes so tests can be grouped by subject.",
          "From a class, tap Add Test, choose a test name and subject, then enter a mark for each learner.",
          "Save the test to append it to the class; a class can hold any number of tests.",
          "Open Test Scores to review a table of learners and tests, and filter by subject.",
          "Use the menu on a test to edit its name, subject or marks without creating a duplicate.",
          "Export attendance reports separately from the class quick actions; test records remain with the class.",
        ],
        sw: [
          "Ongeza masomo chini ya Mipangilio → Simamia Madarasa ili mitihani ipangwe kwa somo.",
          "Kutoka darasa, gonga Ongeza Mtihani, chagua jina la mtihani na somo, kisha weka alama kwa kila mwanafunzi.",
          "Hifadhi mtihani ili uongeze kwenye darasa; darasa linaweza kuwa na mitihani mingi.",
          "Fungua Alama za Mtihani kuona jedwali la wanafunzi na mitihani, na kuchuja kwa somo.",
          "Tumia menyu kwenye mtihani kuhariri jina, somo au alama bila kuunda nakala mpya.",
          "Tolea ripoti za mahudhurio kando kutoka vitendo vya haraka vya darasa; rekodi za mitihani zinabaki na darasa.",
        ],
      },
    },
    {
      slug: "reports",
      title: { en: "Reports and exports", sw: "Ripoti na uhamishaji wa data" },
      description: {
        en: "Export saved attendance for a class and a date range.",
        sw: "Toa mahudhurio yaliyohifadhiwa kwa darasa na kipindi maalum.",
      },
      topics: {
        en: [
          "Open the Export screen from the class workflow and choose the class to export.",
          "Select a date range; the default is the last 30 days including today.",
          "Check the saved-record count shown for the range before exporting.",
          "Choose PDF for a print-ready report, Excel for a spreadsheet with per-date columns, or Word for an editable document.",
          "If the range has no saved attendance, choose another class or widen the date range.",
          "Generated files include the school name from your profile and the selected reporting period.",
        ],
        sw: [
          "Fungua skrini ya Uhamishaji kutoka mtiririko wa darasa na uchague darasa la kuhamisha.",
          "Chagua kipindi cha tarehe; chaguo-msingi ni siku 30 zilizopita pamoja na leo.",
          "Angalia idadi ya rekodi zilizohifadhiwa inayoonyeshwa kwa kipindi kabla ya kuhamisha.",
          "Chagua PDF kwa ripoti ya kuchapisha, Excel kwa jedwali lenye safu kwa kila tarehe, au Word kwa hati inayoweza kuhaririwa.",
          "Ikiwa hakuna mahudhurio yaliyohifadhiwa kwenye kipindi, chagua darasa lingine au panua kipindi.",
          "Faili zinazotolewa zinajumuisha jina la shule kutoka wasifu wako na kipindi kilichochaguliwa.",
        ],
      },
    },
    {
      slug: "privacy-security",
      title: { en: "Privacy and security", sw: "Faragha na usalama" },
      description: {
        en: "Where ShuleBomba stores data and how saved attendance is protected.",
        sw: "ShuleBomba inahifadhiwaje data na jinsi mahudhurio yaliyohifadhiwa yanavyolindwa.",
      },
      topics: {
        en: [
          "Teacher profiles, classes, learners and attendance are stored locally on the device using AsyncStorage.",
          "The app states that it does not share information with third parties; uploading or syncing is a separate action you initiate.",
          "Saved roll calls are locked from further editing in the app, which protects the daily attendance record.",
          "Use your device screen lock and keep the app updated to protect access to the phone itself.",
          "Deleting a class or account removes local data, so export reports first if you need a copy.",
          "Internet access is not required for daily class management, which reduces exposure and data costs.",
        ],
        sw: [
          "Wasifu wa mwalimu, madarasa, wanafunzi na mahudhurio vinahifadhiwa kwenye kifaa kwa kutumia AsyncStorage.",
          "Programu inasema haishiriki taarifa na wahusika wengine; kupakia au kusawazisha ni kitendo tofauti unachofanya wewe.",
          "Roll call zilizohifadhiwa zimefungwa kusiweze kuhaririwa tena kwenye programu, hivyo zinalinda rekodi ya kila siku.",
          "Tumia kifungo cha skrini cha kifaa chako na endelea kusasisha programu ili kulinda ufikiaji wa simu yenyewe.",
          "Kufuta darasa au akaunti huondoa data ya eneo, hivyo toa ripoti kwanza ukihitaji nakala.",
          "Mtandao hauhitajiki kwa usimamizi wa darasa la kila siku, hivyo hupunguza hatari na gharama za data.",
        ],
      },
      links: [
        {
          label: {
            en: "Read the platform security policy",
            sw: "Soma sera ya usalama ya jukwaa",
          },
          url: "https://gbrain.tech/security",
        },
      ],
    },
  ],
};

export const productNames: Record<ProductKey, LocalizedText> = {
  media: { en: "GBrain Media Player", sw: "GBrain Media Player" },
  sms: { en: "GBrain SMS + AudioLink", sw: "GBrain SMS + AudioLink" },
  phonelink: { en: "PhoneLink", sw: "PhoneLink" },
  neural: { en: "GBrain Neural System", sw: "Mfumo wa GBrain Neural" },
  shulebomba: { en: "ShuleBomba", sw: "ShuleBomba" },
};

export function isProductKey(value: string): value is ProductKey {
  return productKeys.includes(value as ProductKey);
}

export function findDoc(product: ProductKey, slug: string) {
  return docs[product].find((doc) => doc.slug === slug);
}
