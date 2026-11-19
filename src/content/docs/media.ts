import {
  localized,
  localizedList,
  image,
  callout,
  type ProductDocBundle,
} from "./types";

export const mediaDocs: ProductDocBundle = {
  sections: [
    {
      id: "getting-started",
      title: localized("Getting started", "Kuanza kutumia"),
      slugs: ["getting-started", "scanning-library", "playback"],
    },
    {
      id: "using-app",
      title: localized("Using the app", "Kutumia programu"),
      slugs: ["playlists", "favorites-history", "themes"],
    },
    {
      id: "reference",
      title: localized("Reference", "Rejea"),
      slugs: ["architecture", "api", "web", "troubleshooting"],
    },
  ],
  pages: [
    {
      slug: "getting-started",
      title: localized("Getting started", "Kuanza kutumia"),
      description: localized(
        "Install GBrain Media Player, allow media access and turn local files into an offline library.",
        "Sakinisha GBrain Media Player, ruhusu ufikiaji wa midia na ugeuze faili za kifaa kuwa maktaba ya nje ya mtandao.",
      ),
      topics: localizedList(
        [
          "Install dependencies and start the Expo SDK 54 app; Expo Go works without custom native modules.",
          "Allow media library access on first launch so the scanner can read songs and videos.",
          "Wait for the first scan to finish; metadata is cached in expo-sqlite for fast later starts.",
          "Use Search to find a track, then play it from the library or a playlist.",
          "Keep controlling playback from the persistent mini-player above the tab bar.",
          "Open Settings to adjust theme, volume, scan-on-launch and repeat defaults.",
        ],
        [
          "Sakinisha mahitaji na uanzishe programu ya Expo SDK 54; Expo Go hufanya kazi bila moduli maalum za asili.",
          "Ruhusu ufikiaji wa maktaba ya midia wakati wa kuzindua kwa mara ya kwanza.",
          "Subiri skani ya kwanza ikamilike; metadata ihifadhiwa kwenye expo-sqlite kwa uanzishaji wa haraka.",
          "Tumia Utafutaji kupata wimbo, kisha ucheze kutoka maktaba au orodha ya kucheza.",
          "Endelea kudhibiti uchezaji kupitia kidogo-cheza kinachodumu juu ya vichupo.",
          "Fungua Mipangilio kurekebisha mandhari, sauti, skani wakati wa kuzindua na kurudia.",
        ],
      ),
      commands: localizedList(
        ["npm install", "npx expo start", "npx expo run:android"],
        ["npm install", "npx expo start", "npx expo run:android"],
      ),
    },
    {
      slug: "scanning-library",
      title: localized("Scanning your library", "Kuskani maktaba yako"),
      description: localized(
        "How expo-media-library finds local media and expo-sqlite keeps the index fast.",
        "Jinsi expo-media-library inavyopata midia ya eneo na expo-sqlite inavyoharakisha orodha.",
      ),
      topics: localizedList(
        [
          "expo-media-library reads songs and videos already stored on the device; files are not uploaded.",
          "The scan-on-launch setting in Settings refreshes the index whenever the app opens.",
          "A fresh scan picks up newly added or deleted files and updates searchable metadata.",
          "expo-sqlite caches the index so the library, Search and Recently added open quickly.",
          "On web, the library starts empty and localStorage replaces expo-sqlite.",
        ],
        [
          "expo-media-library husoma nyimbo na video zilizopo kwenye kifaa; faili hazipakiiwi mtandao.",
          "Chaguo la skani wakati wa kuzindua kwenye Mipangilio hufanya upya orodha kila programu inapofunguliwa.",
          "Skani mpya hutambua faili zilizoongezwa au kufutwa na kusasisha metadata inayotafutwa.",
          "expo-sqlite huhifadhi orodha ili maktaba, Utafutaji na Vilivyoongezwa hivi karibuni vifunguke haraka.",
          "Kwenye wavuti maktaba huanza tupu na localStorage huchukua nafasi ya expo-sqlite.",
        ],
      ),
    },
    {
      slug: "playback",
      title: localized("Playback", "Uchezaji"),
      description: localized(
        "Music, video, the persistent mini-player and playback controls that stay in sync.",
        "Muziki, video, kidogo-cheza kinachodumu na vidhibiti vya uchezaji vinavyosawazishwa.",
      ),
      topics: localizedList(
        [
          "expo-audio plays music and expo-video plays video; only one engine is active at a time.",
          "Open an item for full-screen controls, then switch tabs without stopping it.",
          "The mini-player stays above tab navigation and reflects the same shared state.",
          "Volume and repeat defaults come from Settings; played items are added to history.",
          "Browsers can play media but do not support background audio or native scanning.",
        ],
        [
          "expo-audio hucheza muziki na expo-video hucheza video; injini moja tu hufanya kazi kwa wakati mmoja.",
          "Fungua kipengee kwa vidhibiti vya skrini kamili, kisha badilisha vichupo bila kusimamisha uchezaji.",
          "Kidogo-cheza hukaa juu ya urambazaji na kinaonyesha hali ile ile ya pamoja.",
          "Sauti na chaguo-msingi la kurudia hutoka Mipangilio; vilivyochezwa huongezwa kwenye historia.",
          "Kivinjari kinaweza kucheza midia lakini hakina sauti ya chinichini wala skani ya asili.",
        ],
      ),
    },
    {
      slug: "playlists",
      title: localized("Playlists", "Orodha za kucheza"),
      description: localized(
        "Create, rename, reorder and share playlists from your offline library.",
        "Unda, badilisha jina, panga upya na shiriki orodha za kucheza kutoka kwenye maktaba.",
      ),
      topics: localizedList(
        [
          "Create a playlist from the library, give it a clear name and add tracks from Search.",
          "Open a playlist to play it in order, or add and remove tracks at any time.",
          "Rename or reorder playlists to keep a listening queue that suits the moment.",
          "Delete a playlist when you no longer need it; the media files stay on the device.",
          "Playlists persist in expo-sqlite, with localStorage used for the web build.",
        ],
        [
          "Unda orodha ya kucheza kutoka maktaba, ipe jina wazi na uongeze nyimbo kupitia Utafutaji.",
          "Fungua orodha ili kucheza nyimbo kwa mpangilio, au ongeza na uondoa nyimbo wakati wowote.",
          "Badilisha jina au mpangilio wa orodha ili iendane na hali unayotaka kusikiliza.",
          "Futa orodha unapoihitaji tena; faili za midia zinabaki kwenye kifaa.",
          "Orodha huhifadhiwa kwenye expo-sqlite; toleo la wavuti hutumia localStorage.",
        ],
      ),
    },
    {
      slug: "favorites-history",
      title: localized("Favorites and history", "Vipendwa na historia"),
      description: localized(
        "Mark tracks you love and replay anything from your recent listening history.",
        "Weka alama kwenye nyimbo unazopenda na urudie zilizomo kwenye historia ya hivi karibuni.",
      ),
      topics: localizedList(
        [
          "Mark a song or video as a favorite to keep it separate from the full library.",
          "Open Favorites to replay your most-used tracks without searching again.",
          "History records played items so you can return to something you heard earlier.",
          "Search and Recently added complement favorites when you only remember part of a title.",
          "Favorites and history are stored locally: expo-sqlite on device, localStorage on web.",
        ],
        [
          "Weka wimbo au video kwenye vipendwa ili iwe tofauti na maktaba yote.",
          "Fungua Vipendwa kurudia nyimbo unazotumia sana bila kutafuta tena.",
          "Historia hurekodi vilivyochezwa ili urejee kilichosikika mapema.",
          "Utafutaji na Vilivyoongezwa hivi karibuni husaidia wakati unakumbuka sehemu ya jina tu.",
          "Vipendwa na historia vinahifadhiwa kwenye kifaa: expo-sqlite, au localStorage kwenye wavuti.",
        ],
      ),
    },
    {
      slug: "themes",
      title: localized("Themes and settings", "Mandhari na mipangilio"),
      description: localized(
        "Choose light, dark or system appearance and tune playback defaults.",
        "Chagua mwanga, giza au mandhari ya mfumo na urekebishe chaguo-msingi za uchezaji.",
      ),
      topics: localizedList(
        [
          "Settings offers light, dark and system appearance for the whole app.",
          "The selected theme applies to library screens, the mini-player and full-screen players.",
          "System mode follows the device appearance and updates when the OS theme changes.",
          "Adjust volume, scan-on-launch and repeat defaults from the same settings screen.",
          "Theme preference is persisted locally, including in the localStorage web build.",
        ],
        [
          "Mipangilio inatoa mwanga, giza au mandhari ya mfumo kwa programu yote.",
          "Mandhari iliyochaguliwa huathiri skrini za maktaba, kidogo-cheza na wachezaji wa skrini kamili.",
          "Hali ya mfumo hufuata mandhari ya kifaa na hubadilika wakati OS inabadilika.",
          "Rekebisha sauti, skani wakati wa kuzindua na kurudia kutoka skrini hiyo hiyo.",
          "Chaguo la mandhari huhifadhiwa kwenye kifaa, hata kwenye toleo la wavuti la localStorage.",
        ],
      ),
    },
    {
      slug: "architecture",
      title: localized("Architecture", "Usanifu"),
      description: localized(
        "How the scanner, SQLite cache, audio and video engines and MobX state fit together.",
        "Jinsi skana, akiba ya SQLite, injini za sauti na video na hali ya MobX vinavyofanya kazi pamoja.",
      ),
      topics: localizedList(
        [
          "expo-media-library supplies device media; expo-sqlite caches metadata, with a localStorage web fallback.",
          "expo-audio handles music and expo-video handles video, with mutual exclusivity between them.",
          "MobX and MobX State Tree own library, playlists, favorites, history, playback and settings.",
          "expo-router typed routes connect library, player, search and settings screens.",
          "The persistent mini-player subscribes to the shared playback store across tab navigation.",
        ],
        [
          "expo-media-library huleta midia ya kifaa; expo-sqlite huhifadhi metadata, na localStorage ni mbadala kwenye wavuti.",
          "expo-audio hucheza muziki na expo-video hucheza video, bila kucheza zote kwa wakati mmoja.",
          "MobX na MobX State Tree vimiliki maktaba, orodha, vipendwa, historia, uchezaji na mipangilio.",
          "Njia za expo-router zilizoandikwa kwa aina huunganisha maktaba, kicheza, utafutaji na mipangilio.",
          "Kidogo-cheza kinachodumu hufuata hifadhi ya pamoja ya uchezaji kwenye vichupo vyote.",
        ],
      ),
    },
    {
      slug: "api",
      title: localized("API reference", "Rejea ya API"),
      description: localized(
        "The stores, contexts and playback engines available to app code.",
        "Hifadhi, miktadha na injini za uchezaji zinazopatikana kwa kanuni za programu.",
      ),
      topics: localizedList(
        [
          "Library store: scan, search, recently added and recently played selectors.",
          "Playback engine: play, pause, seek, shuffle, repeat and queue management.",
          "Playlist store: create, rename, reorder, add or remove tracks and delete.",
          "Favorites and history stores record local listening activity for quick replay.",
          "Theme context: light, dark and system modes; settings hold volume, scan-on-launch and repeat defaults.",
          "On web, the same store boundary uses localStorage instead of expo-sqlite.",
        ],
        [
          "Hifadhi ya maktaba: skani, utafutaji, vilivyoongezwa na vilivyochezwa hivi karibuni.",
          "Injini ya uchezaji: kucheza, kusimamisha, kusogea, kuchanganya, kurudia na foleni.",
          "Hifadhi ya orodha: kunda, kubadilisha jina, kupanga, kuongeza au kuondoa nyimbo na kufuta.",
          "Hifadhi za vipendwa na historia hurekodi uchezaji wa eneo kwa kurudia haraka.",
          "Muktadha wa mandhari: mwanga, giza na mfumo; mipangilio inashikilia sauti, skani na kurudia.",
          "Kwenye wavuti mpaka huo huo wa hifadhi hutumia localStorage badala ya expo-sqlite.",
        ],
      ),
    },
    {
      slug: "web",
      title: localized("Web support", "Msaada wa wavuti"),
      description: localized(
        "Browser fallbacks, local storage and the limits of the web build.",
        "Mbadala wa kivinjari, hifadhi ya eneo na mapungufu ya toleo la wavuti.",
      ),
      topics: localizedList(
        [
          "The Expo SDK 54 web build uses localStorage instead of expo-sqlite for persisted state.",
          "The web media library starts empty because there is no native device scan in a browser.",
          "Background audio and native media-library permissions are not available on the web.",
          "Playlists, favorites, history, search, settings and light/dark themes still work locally.",
          "Use Expo Go or an Android development build for the complete offline player experience.",
        ],
        [
          "Toleo la wavuti la Expo SDK 54 hutumia localStorage badala ya expo-sqlite kuhifadhi hali.",
          "Maktaba ya wavuti huanza tupu kwa sababu kivinjari hakina skani ya asili ya kifaa.",
          "Sauti ya chinichini na ruhusa za maktaba ya midia ya asili hazipatikani kwenye wavuti.",
          "Orodha, vipendwa, historia, utafutaji, mipangilio na mandhari bado hufanya kazi kwenye eneo.",
          "Tumia Expo Go au toleo la maendeleo la Android kwa uzoefu kamili wa kicheza nje ya mtandao.",
        ],
      ),
    },
    {
      slug: "troubleshooting",
      title: localized("Troubleshooting", "Kutatua matatizo"),
      description: localized(
        "Fix missing files, playback conflicts and stale development builds.",
        "Sulua faili zisizoonekana, migongano ya uchezaji na vibali vya maendeleo vilivyopitwa na wakati.",
      ),
      topics: localizedList(
        [
          "If files are missing, check media library permission in Android settings and run a fresh scan.",
          "If audio and video overlap, stop the current item first; the two engines are mutually exclusive.",
          "If the mini-player looks wrong after an update, restart the app so it resubscribes to the playback store.",
          "For a stale Metro bundle, restart with a cleared cache using the Expo CLI.",
          "Run the TypeScript and ESLint checks before reporting a reproducible build bug.",
          "Expo Go needs no config plugins for this app; native changes require a development build.",
        ],
        [
          "Ikiwa faili hazionekani, angalia ruhusa ya maktaba ya midia kwenye Mipangilio ya Android na skani upya.",
          "Ikiwa sauti na video vinacheza pamoja, simamisha kipengee cha sasa; injini mbili hazifanyi kazi pamoja.",
          "Ikiwa kidogo-cheza kinaonekana vibaya baada ya sasisho, anzisha programu upya ili kitumie hifadhi tena.",
          "Kwa kifurushi cha Metro kilichopitwa na wakati, anza upya ukiwa umefuta akiba kupitia Expo CLI.",
          "Endesha ukaguzi wa TypeScript na ESLint kabla ya kuripoti hitilafu inayojirudia.",
          "Expo Go haihitaji config plugins kwa programu hii; mabadiliko ya asili yanahitaji toleo la maendeleo.",
        ],
      ),
      commands: localizedList(
        ["npx expo start --clear", "npx tsc --noEmit", "npx eslint ."],
        ["npx expo start --clear", "npx tsc --noEmit", "npx eslint ."],
      ),
    },
  ],
  details: {
    "getting-started": {
      intro: localized(
        "GBrain Media Player turns the music and videos already on your device into one offline library. This guide takes you from installation to your first track.",
        "GBrain Media Player hubadilisha muziki na video zilizopo kwenye kifaa chako kuwa maktaba moja ya nje ya mtandao. Mwongozo huu hukupeleka kutoka usakinishaji hadi wimbo wako wa kwanza.",
      ),
      prerequisites: localizedList(
        [
          "An Android device with local media files",
          "Expo SDK 54 tooling or Expo Go",
          "Permission to read the media library",
        ],
        [
          "Kifaa cha Android kilicho na faili za midia",
          "Zana za Expo SDK 54 au Expo Go",
          "Ruhusa ya kusoma maktaba ya midia",
        ],
      ),
      callout: callout(
        "tip",
        "The first scan takes a moment",
        "The initial scan indexes every local file into expo-sqlite. Later launches read that cache and start almost instantly.",
        "Skani ya kwanza huchukua muda",
        "Skani ya awali huhifadhi kila faili kwenye expo-sqlite. Uzinduzi unaofuata husoma akiba na huanza haraka.",
      ),
      image: image(
        "Library home",
        "Recently added media in the offline library",
        "Maktaba ya nyumbani",
        "Midia iliyoongezwa hivi karibuni kwenye maktaba",
      ),
    },
    "scanning-library": {
      intro: localized(
        "The scanner uses expo-media-library to discover local songs and videos, then stores searchable metadata in expo-sqlite. No media is uploaded.",
        "Skana hutumia expo-media-library kugundua nyimbo na video za eneo, kisha huhifadhi metadata inayotafutwa kwenye expo-sqlite. Midia yoyote haipakiiwi mtandao.",
      ),
      prerequisites: localizedList(
        [
          "Media library permission granted",
          "Audio or video files on the device",
          "Optional: scan-on-launch enabled in Settings",
        ],
        [
          "Ruhusa ya maktaba ya midia imetolewa",
          "Faili za sauti au video kwenye kifaa",
          "Hiari: skani wakati wa kuzindua imewezeshwa",
        ],
      ),
      callout: callout(
        "info",
        "Your files stay with you",
        "The index is a local cache. On the web there is no native scan, so the library starts empty and state falls back to localStorage.",
        "Faili zinabaki kwako",
        "Orodha ni akiba ya eneo. Kwenye wavuti hakuna skani ya asili, hivyo maktaba huanza tupu na hifadhi hubadilika kuwa localStorage.",
      ),
      image: image(
        "Scanned library",
        "Audio and video entries after a fresh scan",
        "Maktaba iliyoskaniwa",
        "Vipengee vya sauti na video baada ya skani",
      ),
    },
    playback: {
      intro: localized(
        "Music plays through expo-audio and video through expo-video. A shared playback store keeps the full-screen player and the persistent mini-player in sync.",
        "Muziki huchezwa na expo-audio na video huchezwa na expo-video. Hifadhi moja ya uchezaji husawazisha kicheza skrini kamili na kidogo-cheza kinachodumu.",
      ),
      prerequisites: localizedList(
        [
          "At least one scanned audio or video file",
          "Device volume turned up",
          "Background audio only on native builds",
        ],
        [
          "Angalau faili moja ya sauti au video iliyoskaniwa",
          "Sauti ya kifaa imeongezwa",
          "Sauti ya chinichini kwenye toleo la asili tu",
        ],
      ),
      callout: callout(
        "warning",
        "One engine at a time",
        "Starting a video stops the current audio track, and vice versa. The two playback engines are deliberately mutually exclusive.",
        "Injini moja kwa wakati",
        "Kuanza video husimamisha wimbo unaocheza, na kinyume chake. Injini mbili za uchezaji haziruhusiwi kufanya kazi pamoja.",
      ),
      image: image(
        "Player screen",
        "Full-screen playback with the mini-player below",
        "Skrini ya kicheza",
        "Uchezaji wa skrini kamili na kidogo-cheza chini",
      ),
    },
    playlists: {
      intro: localized(
        "Playlists group tracks from your local library into ordered queues. You can create, rename, reorder, add to, remove from and delete them at any time.",
        "Orodha za kucheza hukusanya nyimbo kutoka maktaba ya eneo kwa mpangilio. Unaweza kuziunda, kubadilisha jina, kupanga, kuongeza, kuondoa na kuzifuta wakati wowote.",
      ),
      prerequisites: localizedList(
        ["A scanned media library", "At least one track to add"],
        ["Maktaba iliyoskaniwa", "Angalau wimbo mmoja wa kuongeza"],
      ),
      callout: callout(
        "tip",
        "Build from Search",
        "Find a track with Search and add it to an existing playlist, then open the playlist to play the whole queue.",
        "Jenga kutoka Utafutaji",
        "Pata wimbo kupitia Utafutaji na uongeze kwenye orodha iliyopo, kisha fungua orodha kucheza nyimbo zote.",
      ),
      image: image(
        "Playlist detail",
        "Ordered tracks inside a saved playlist",
        "Maelezo ya orodha",
        "Nyimbo zilizopangwa kwenye orodha iliyohifadhiwa",
      ),
    },
    "favorites-history": {
      intro: localized(
        "Favorites keep your most-liked tracks one tap away, while history remembers what you played so a song is never lost again.",
        "Vipendwa vinaviweka nyimbo unazozipenda karibu nawe, na historia hukumbuka ulizocheza ili wimbo usipotee tena.",
      ),
      prerequisites: localizedList(
        ["Playback used at least once", "Tracks available in the library"],
        [
          "Uchezaji umetumika angalau mara moja",
          "Nyimbo zinapatikana kwenye maktaba",
        ],
      ),
      callout: callout(
        "info",
        "Stored on your device",
        "Favorites and history use expo-sqlite on Android and localStorage on web. Clearing app data removes them, not the original files.",
        "Vihifadhiwa kwenye kifaa chako",
        "Vipendwa na historia hutumia expo-sqlite kwenye Android na localStorage kwenye wavuti. Kufuta data ya programu huviondoa, si faili asili.",
      ),
      image: image(
        "Favorites and history",
        "Recently played tracks and saved favorites",
        "Vipendwa na historia",
        "Vyimbo vilivyochezwa hivi karibuni na vipendwa",
      ),
    },
    themes: {
      intro: localized(
        "GBrain Media Player ships with a complete light and dark theme system. Settings also hold volume, scan-on-launch and repeat defaults for daily use.",
        "GBrain Media Player ina mfumo kamili wa mandhari ya mwanga na giza. Mipangilio pia hushikilia sauti, skani wakati wa kuzindua na kurudia.",
      ),
      prerequisites: localizedList(
        [
          "Access to the Settings screen",
          "Optional: a device with system dark mode",
        ],
        [
          "Ufikiaji wa skrini ya Mipangilio",
          "Hiari: kifaa chenye modi ya giza ya mfumo",
        ],
      ),
      callout: callout(
        "tip",
        "Let the system decide",
        "Choose system appearance to follow the OS theme automatically. Light and dark modes cover tabs, the mini-player and full-screen players.",
        "Acha mfumo uamue",
        "Chagua mandhari ya mfumo ili kufuata OS kiotomatiki. Modi za mwanga na giza hufunika vichupo, kidogo-cheza na wachezaji wa skrini kamili.",
      ),
      image: image(
        "Theme settings",
        "Light, dark and system appearance choices",
        "Mipangilio ya mandhari",
        "Chaguo za mwanga, giza na mfumo",
      ),
    },
    architecture: {
      intro: localized(
        "The player is built from a small set of cooperating layers: a media scanner, a SQLite cache, two playback engines and MobX stores that keep the interface in sync.",
        "Kidochezaji kimejengwa kwa tabaka chache zinazofanya kazi pamoja: skana ya midia, akiba ya SQLite, injini mbili za kucheza na hifadhi za MobX.",
      ),
      prerequisites: localizedList(
        ["Familiarity with Expo SDK 54", "Basic understanding of React state"],
        ["Ufahamu wa Expo SDK 54", "Uelewa wa kimsingi wa hali ya React"],
      ),
      callout: callout(
        "info",
        "Why cache metadata?",
        "Querying the media library on every launch is slow on mid-range phones. expo-sqlite keeps startup predictable and makes Search over metadata fast.",
        "Kwa nini uhifadhi metadata?",
        "Kuuliza maktaba ya midia kila kuzindua ni polepole kwenye simu za kawaida. expo-sqlite huharakisha uanzishaji na Utafutaji.",
      ),
      image: image(
        "Architecture diagram",
        "Scanner, cache, engines and UI state",
        "Mchoro wa usanifu",
        "Skana, akiba, injini na hali ya kiolesura",
      ),
    },
    api: {
      intro: localized(
        "App code talks to a few stores and contexts. Understanding these boundaries makes it easier to add features without breaking playback or saved data.",
        "Kanuni ya programu hutumia hifadhi na miktadha chache. Kuelewa mipaka hii hurahisisha kuongeza vipengele bila kuharibu uchezaji au data iliyohifadhiwa.",
      ),
      prerequisites: localizedList(
        ["TypeScript and MobX familiarity", "Knowledge of the Expo media APIs"],
        ["Ufahamu wa TypeScript na MobX", "Ujuzi wa API za midia za Expo"],
      ),
      callout: callout(
        "info",
        "Single source of truth",
        "Playback state lives in one MobX/MST store. The mini-player and full-screen player subscribe to it, so they never disagree.",
        "Chanzo kimoja cha ukweli",
        "Hali ya uchezaji iko kwenye hifadhi moja ya MobX/MST. Kidogo-cheza na kicheza kamili huitumia, hivyo hazikinzani.",
      ),
      image: image(
        "State flow",
        "Stores feeding the mini-player and full player",
        "Mtiririko wa hali",
        "Hifadhi zinazolipa kidogo-cheza na kicheza kamili",
      ),
    },
    web: {
      intro: localized(
        "The same Expo SDK 54 codebase also runs in a browser. Web builds use localStorage instead of expo-sqlite and skip native-only capabilities.",
        "Kanuni hiyo hiyo ya Expo SDK 54 hufanya kazi kwenye kivinjari. Toleo la wavuti hutumia localStorage badala ya expo-sqlite na huacha uwezo wa asili.",
      ),
      prerequisites: localizedList(
        [
          "A modern browser with local storage enabled",
          "Awareness that native scanning is unavailable",
        ],
        [
          "Kivinjari cha kisasa chenye hifadhi ya eneo",
          "Kujua kuwa skani ya asili haipatikani",
        ],
      ),
      callout: callout(
        "warning",
        "Browser limitations",
        "There is no device media scan and no background audio in a browser. Use Expo Go or an Android build for the complete experience.",
        "Mapungufu ya kivinjari",
        "Hakuna skani ya midia ya kifaa wala sauti ya chinichini kwenye kivinjari. Tumia Expo Go au toleo la Android kwa uzoefu kamili.",
      ),
      image: image(
        "Web player",
        "Browser build using the localStorage fallback",
        "Kidochezaji cha wavuti",
        "Toleo la kivinjari lenye mbadala wa localStorage",
      ),
    },
    troubleshooting: {
      intro: localized(
        "Most problems come from permissions, the audio/video exclusivity rule or a stale development bundle. Check these areas before changing app data.",
        "Matatizo mengi hutokana na ruhusa, kanuni ya kutocheza sauti na video pamoja, au kifurushi cha maendeleo kilichopitwa na wakati. Angalia haya kabla ya kufuta data.",
      ),
      prerequisites: localizedList(
        [
          "The app installed on device or in Expo Go",
          "Access to Android app permissions",
          "Expo CLI for development commands",
        ],
        [
          "Programu imesakinishwa kwenye kifaa au Expo Go",
          "Ufikiaji wa ruhusa za programu kwenye Android",
          "Expo CLI kwa amri za maendeleo",
        ],
      ),
      callout: callout(
        "warning",
        "Do not clear data casually",
        "Clearing app data removes playlists, favorites and history from expo-sqlite. The original media files remain, but the local collections must be rebuilt.",
        "Usifute data bila sababu",
        "Kufuta data ya programu huondoa orodha, vipendwa na historia kutoka expo-sqlite. Faili asili zinabaki, lakini makusanyo ya eneo yanahitaji kujengwa upya.",
      ),
      image: image(
        "Diagnostics",
        "Permission prompts, CLI checks and player state",
        "Uchunguzi",
        "Ujumbe wa ruhusa, ukaguzi wa CLI na hali ya kicheza",
      ),
    },
  },
};
