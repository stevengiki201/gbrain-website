import {
  localized,
  localizedList,
  image,
  callout,
  type ProductDocBundle,
} from "./types";

export const smsDocs: ProductDocBundle = {
  sections: [
    {
      id: "getting-started",
      title: localized("Getting started", "Kuanza kutumia"),
      slugs: ["setup", "config", "cli"],
    },
    {
      id: "conversations",
      title: localized("Conversations", "Mazungumzo"),
      slugs: ["replies", "memory", "scheduling", "whatsapp"],
    },
    {
      id: "voice",
      title: localized("Voice bridge", "Daraja la sauti"),
      slugs: ["voice"],
    },
    {
      id: "reference",
      title: localized("Reference", "Rejea"),
      slugs: ["architecture", "security", "troubleshooting"],
    },
  ],
  pages: [
    {
      slug: "setup",
      title: localized("Setup guide", "Mwongozo wa kusakinisha"),
      description: localized(
        "Prepare a Linux PC, an Android phone, ADB and the adbsms companion app, then start the Python SMS service.",
        "Andaa kompyuta ya Linux, simu ya Android, ADB na programu ndogo ya adbsms, kisha anza huduma ya SMS ya Python.",
      ),
      topics: localizedList(
        [
          "Install Python 3.10+ and android-tools-adb, then enable USB debugging on the phone.",
          "Connect over USB and confirm the device appears as authorized in adb devices.",
          "Install the adbsms companion app so the bot can read and send SMS through content://adbsms.",
          "Create a virtual environment, install requirements and copy config.example.yaml to config.yaml.",
          "Run the bot and watch the logs to confirm inbound messages are detected.",
        ],
        [
          "Sakinisha Python 3.10+ na android-tools-adb, kisha wezesha urekebishaji wa USB kwenye simu.",
          "Unganisha kupitia USB na uhakikishe kifaa kinaonekana kama kilichoidhinishwa kwenye adb devices.",
          "Sakinisha programu ndogo ya adbsms ili bot isome na kutuma SMS kupitia content://adbsms.",
          "Unda mazingira pepe, sakinisha mahitaji na nakili config.example.yaml kuwa config.yaml.",
          "Endesha bot na ufuate kumbukumbu ili kuthibitisha ujumbe unaoingia unagunduliwa.",
        ],
      ),
      commands: localizedList(
        [
          "python3 -m venv .venv",
          "source .venv/bin/activate",
          "pip install -r requirements.txt",
          "adb devices",
          "python -m bot.main run",
        ],
        [
          "python3 -m venv .venv",
          "source .venv/bin/activate",
          "pip install -r requirements.txt",
          "adb devices",
          "python -m bot.main run",
        ],
      ),
    },
    {
      slug: "config",
      title: localized("Configuration", "Usanidi"),
      description: localized(
        "A reference for config.yaml: the Ollama model, poll interval, safety limits, DND windows and send strategies.",
        "Rejea ya config.yaml: mfano wa Ollama, muda wa ukaguzi, mipaka ya usalama, vipindi vya kutokusumbua na mikakati ya kutuma.",
      ),
      topics: localizedList(
        [
          "Copy config.example.yaml to config.yaml before the first run; keep the original as a template.",
          "Choose the Ollama model and keep the rule-based fallback enabled for when the model is unavailable.",
          "Set the poll interval and allowed contacts so the bot only handles messages you expect.",
          "Define do-not-disturb windows and reply cooldowns to avoid late-night or repeated replies.",
          "WhatsApp auto-reply and webhooks are optional; leave them off unless you need them.",
        ],
        [
          "Nakili config.example.yaml kuwa config.yaml kabla ya uendeshaji wa kwanza; uhifadhi asili kama kiolezo.",
          "Chagua mfano wa Ollama na uache sheria za mbadala zikiwashwa wakati mfano haupatikani.",
          "Weka muda wa ukaguzi na anwani zinazoruhusiwa ili bot ishughulikie tu ujumbe unaotarajia.",
          "Bainisha vipindi vya kutokusumbua na muda wa kusubiri ili kuepuka majibu usiku au yanayorudiwa.",
          "Kujibu WhatsApp kiotomatiki na webhooks ni hiari; viache vizimwa isipokuwa unavihitaji.",
        ],
      ),
    },
    {
      slug: "cli",
      title: localized("CLI reference", "Rejea ya CLI"),
      description: localized(
        "Commands for running, diagnosing and maintaining the bot from a Linux terminal.",
        "Amri za kuendesha, kutambua matatizo na kutunza bot kutoka kwenye terminal ya Linux.",
      ),
      topics: localizedList(
        [
          "python -m bot.main run starts the foreground service and message loop.",
          "python -m bot.main voice-check checks the speech and voice pipeline.",
          "adb devices confirms the phone is connected and ADB-authorized.",
          "Rotating logs record SMS ids, model latency and ADB reconnects without filling the disk.",
          "Deduplication by SMS id prevents the same inbound message from being answered twice.",
        ],
        [
          "python -m bot.main run huanzisha huduma ya mbele na kitanzi cha ujumbe.",
          "python -m bot.main voice-check hukagua mtiririko wa sauti na usemi.",
          "adb devices huhakikisha simu imeunganishwa na kuidhinishwa na ADB.",
          "Kumbukumbu zinazozungushwa hurekodi vitambulisho vya SMS, muda wa mfano na muunganisho wa ADB bila kujaza diski.",
          "Kuondoa nakala kwa kitambulisho cha SMS huzuia ujumbe mmoja kujibiwa mara mbili.",
        ],
      ),
      commands: localizedList(
        [
          "python -m bot.main run",
          "python -m bot.main voice-check",
          "adb devices",
        ],
        [
          "python -m bot.main run",
          "python -m bot.main voice-check",
          "adb devices",
        ],
      ),
    },
    {
      slug: "replies",
      title: localized("Reply engine", "Injini ya majibu"),
      description: localized(
        "How an inbound SMS becomes a human-like reply, and when the rule-based fallback takes over.",
        "Jinsi SMS inayoingia inavyogeuka jibu linalofanana na la binadamu, na wakati sheria za mbadala zinapochukua nafasi.",
      ),
      topics: localizedList(
        [
          "The bot reads new messages through the adbsms provider and ignores messages it has already handled.",
          "Allowed contacts, cooldowns and DND windows are checked before any reply is sent.",
          "Ollama drafts a natural-language reply on the local machine; no cloud LLM is required.",
          "If Ollama is unavailable or slow, the rule-based fallback still produces a useful answer.",
          "The reply is sent back over ADB and recorded in the rotating logs with its SMS id.",
        ],
        [
          "Bot husoma ujumbe mpya kupitia msambazaji wa adbsms na hupuuza ulioshughulikiwa tayari.",
          "Anwani zinazoruhusiwa, muda wa kusubiri na vipindi vya kutokusumbua hukaguliwa kabla ya jibu kutumwa.",
          "Ollama huandika jibu kwa lugha asilia kwenye mashine ya eneo; hakuna LLM ya wingu inayohitajika.",
          "Ollama isipopatikana au ikichelewaa, sheria za mbadala hutoa jibu linalofaa.",
          "Jibu hutumwa tena kupitia ADB na kurekodiwa kwenye kumbukumbu zinazozungushwa pamoja na kitambulisho cha SMS.",
        ],
      ),
    },
    {
      slug: "memory",
      title: localized("Local memory", "Kumbukumbu ya eneo"),
      description: localized(
        "SQLite-backed conversation memory with keyword retrieval and learned preferences.",
        "Kumbukumbu ya mazungumzo kwenye SQLite yenye utafutaji wa maneno muhimu na kujifunza mapendeleo.",
      ),
      topics: localizedList(
        [
          "Conversation history is stored in a local SQLite database, not in a remote service.",
          "Keyword retrieval surfaces relevant earlier messages to give Ollama useful context.",
          "Repeated preferences are learned over time, so replies can reflect how you like to be addressed.",
          "Memory stays on the Linux machine and is independent of the phone's own SMS storage.",
          "Clearing the local database never removes messages stored on the phone.",
        ],
        [
          "Historia ya mazungumzo inahifadhiwa kwenye hifadhidata ya SQLite ya eneo, si kwenye huduma ya mbali.",
          "Utafutaji wa maneno muhimu huleta ujumbe wa awali unaofaa ili kumpa Ollama muktadha mzuri.",
          "Mapendeleo yanayorudiwa hujifunza polepole, hivyo majibu yanaweza kuonyesha jinsi unavyopenda kuitwa.",
          "Kumbukumbu inabaki kwenye kompyuta ya Linux na haihusiani na hifadhi ya SMS ya simu.",
          "Kuifuta hifadhidata ya eneo kamwe haiondoi ujumbe uliohifadhiwa kwenye simu.",
        ],
      ),
    },
    {
      slug: "scheduling",
      title: localized("Scheduled replies", "Majibu yaliyopangwa"),
      description: localized(
        "Let the bot understand 'reply at 7pm' and respect quiet hours with DND windows.",
        "Ruhusu bot kuelewa 'jibu saa 7 jioni' na kuheshimu saa za utulivu kwa vipindi vya kutokusumbua.",
      ),
      topics: localizedList(
        [
          "Enable scheduling in config.yaml to interpret phrases such as 'reply at 7pm'.",
          "The bot records the requested time and queues the reply instead of sending it immediately.",
          "Do-not-disturb windows suppress replies during nights or meeting hours.",
          "Reply cooldowns prevent a contact from receiving several near-identical answers.",
          "Scheduled work follows the same ADB send path as ordinary replies, including deduplication by SMS id.",
        ],
        [
          "Wezesha ratiba kwenye config.yaml ili kutafsiri maneno kama 'jibu saa 7 jioni'.",
          "Bot huhifadhi wakati uliotakiwa na kuweka jibu kwenye foleni badala ya kutuma mara moja.",
          "Vipindi vya kutokusumbua huzuia majibu usiku au wakati wa mikutano.",
          "Muda wa kusubiri huzuia anwani kupokea majibu kadhaa yanayofanana.",
          "Kazi iliyopangwa hufuata njia ile ile ya kutuma kupitia ADB kama majibu ya kawaida, ikijumuisha kuondoa nakala kwa kitambulisho cha SMS.",
        ],
      ),
    },
    {
      slug: "whatsapp",
      title: localized("WhatsApp replies", "Majibu ya WhatsApp"),
      description: localized(
        "Experimental auto-reply for WhatsApp notifications, with clear limits.",
        "Kujibu WhatsApp kiotomatiki kwa kutumia arifa, bado katika majaribio, pamoja na mipaka yake.",
      ),
      topics: localizedList(
        [
          "WhatsApp auto-reply is experimental and is disabled until you enable it in config.yaml.",
          "It reads incoming message notifications from the Android notification shade rather than the WhatsApp database.",
          "Notification text can be incomplete, so replies are less reliable than the ADB SMS path.",
          "The same Ollama brain, rule-based fallback, memory and DND rules can guide WhatsApp replies.",
          "Keep the feature off for sensitive chats and review the logs when testing it.",
        ],
        [
          "Kujibu WhatsApp kiotomatiki bado ni majaribio na kumezimwa hadi utakapowezesha kwenye config.yaml.",
          "Husoma arifa za ujumbe unaoingia kutoka kwenye kivuli cha arifa za Android, si kutoka hifadhidata ya WhatsApp.",
          "Maandishi ya arifa yanaweza kuwa yasiyokamilika, hivyo majibu hayategemewi kama njia ya SMS kupitia ADB.",
          "Akili ile ile ya Ollama, sheria za mbadala, kumbukumbu na vipindi vya kutokusumbua vinaweza kuongoza majibu ya WhatsApp.",
          "Iache imezimwa kwa mazungumzo nyeti na ukague kumbukumbu unapojaribu.",
        ],
      ),
    },
    {
      slug: "voice",
      title: localized("Voice bridge", "Daraja la sauti"),
      description: localized(
        "faster-whisper speech-to-text and Piper text-to-speech over an acoustic call bridge.",
        "faster-whisper kwa kusoma sauti na Piper kwa kutoa sauti kupitia daraja la akustika.",
      ),
      topics: localizedList(
        [
          "The bridge uses the speakerphone and microphone; it does not access cellular call audio.",
          "faster-whisper performs local speech recognition with a configurable model size.",
          "Ollama drafts the reply, with the rule-based fallback available if the model is busy.",
          "Piper speaks the reply back; half-duplex playback and echo cancellation stop the bot hearing itself.",
          "Voice activity detection pauses capture while the reply is played back.",
          "The AudioLink Android app carries the PC-to-phone audio over WebRTC.",
        ],
        [
          "Daraja hutumia spika na maikrofoni; halifikii sauti ya simu ya rununu.",
          "faster-whisper hutambua sauti kwenye kifaa, na ukubwa wa mfano unaweza kubadilishwa.",
          "Ollama huandika jibu, na sheria za mbadala zinapatikana mfano unaposhughulika.",
          "Piper hulisema jibu; uchezaji wa nusu-duplex na kufuta mwangwi huzuia bot kuisikia yenyewe.",
          "Kugundua shughuli za sauti husimamisha kurekodi jibu linapochezwa.",
          "Programu ya AudioLink kwenye Android husafirisha sauti kati ya PC na simu kupitia WebRTC.",
        ],
      ),
    },
    {
      slug: "architecture",
      title: localized("Architecture", "Usanifu"),
      description: localized(
        "How the Linux service, ADB bridge, companion app, Ollama, SQLite and AudioLink fit together.",
        "Jinsi huduma ya Linux, daraja la ADB, programu ndogo, Ollama, SQLite na AudioLink vinavyoungana.",
      ),
      topics: localizedList(
        [
          "A Python service on Linux polls the phone over ADB; the adbsms companion app exposes SMS content.",
          "Inbound messages pass through filtering, memory lookup and the reply engine before being sent back over ADB.",
          "Ollama is the local brain, with a rule-based fallback so replies continue when the model is busy.",
          "SQLite holds conversation memory and learned preferences; rotating logs record operational events.",
          "The AudioLink Android app uses WebRTC for PC-to-phone audio, while voice calls use an acoustic speakerphone bridge.",
          "The bot also plugs into GBrain Neural as an SMS subsystem for simulated inbound messages.",
        ],
        [
          "Huduma ya Python kwenye Linux hukagua simu kupitia ADB; programu ndogo ya adbsms hutoa yaliyomo ya SMS.",
          "Ujumbe unaoingia hupita kwenye kuchuja, kutafuta kumbukumbu na injini ya majibu kabla ya kutumwa tena kupitia ADB.",
          "Ollama ndiye akili ya eneo, akiwa na sheria za mbadala ili majibu yaendelee mfano unaposhughulika.",
          "SQLite inashikilia kumbukumbu ya mazungumzo na mapendeleo yaliyojifunza; kumbukumbu zinazozungushwa hurekodi matukio ya uendeshaji.",
          "Programu ya AudioLink kwenye Android hutumia WebRTC kwa sauti kati ya PC na simu, wakati simu za sauti hutumia daraja la akustika la spika.",
          "Bot pia hujiunga na GBrain Neural kama mfumo ndogo wa SMS kwa ujumbe unaoingia unaiga.",
        ],
      ),
    },
    {
      slug: "security",
      title: localized("Security and privacy", "Usalama na faragha"),
      description: localized(
        "Where data stays, what ADB access means and how to deploy the bot carefully.",
        "Wapi data inabaki, maana ya ufikiaji wa ADB na jinsi ya kusakinisha bot kwa uangalifu.",
      ),
      topics: localizedList(
        [
          "Messages, memory and operational logs stay on the Linux machine; keep webhooks disabled to avoid outbound data.",
          "ADB access grants deep control of the phone, so connect only a device you own.",
          "Enable USB debugging only while the bot is running and revoke debug authorizations you no longer need.",
          "Use allowed contacts and DND windows to limit who can trigger a reply and when.",
          "The WhatsApp notification path is experimental and may see unrelated notification text; review it before trusting it.",
        ],
        [
          "Ujumbe, kumbukumbu ya mazungumzo na matukio ya uendeshaji vinabaki kwenye kompyuta ya Linux; weka webhooks zimezimwa ili data isitoke.",
          "Ufikiaji wa ADB hutoa udhibiti mkubwa wa simu, hivyo unganisha tu kifaa chako.",
          "Wezesha urekebishaji wa USB wakati bot inafanya kazi tu na uondoe idhini za urekebishaji usizozihitaji.",
          "Tumia anwani zinazoruhusiwa na vipindi vya kutokusumbua kupunguza ni nani na wakati gani wanaweza kupata jibu.",
          "Njia ya arifa za WhatsApp bado ni majaribio na inaweza kuona maandishi ya arifa yasiyohusiana; ikague kabla ya kuiamini.",
        ],
      ),
    },
    {
      slug: "troubleshooting",
      title: localized("Troubleshooting", "Kutatua matatizo"),
      description: localized(
        "A practical checklist for missed replies, missing devices and voice diagnostics.",
        "Orodha ya vitendo vya majibu yasiyofika, kifaa kisichoonekana na ukaguzi wa sauti.",
      ),
      topics: localizedList(
        [
          "Run adb devices first: an 'unauthorized' or empty device list is the most common setup failure.",
          "If no reply arrives, check that adbsms is installed and that the inbound SMS id is new.",
          "Slow or odd answers usually mean Ollama is not running; the rule-based fallback should still reply.",
          "Check DND windows, cooldowns and allowed contacts before assuming the reply engine failed.",
          "Use python -m bot.main voice-check for speech pipeline issues and inspect the rotating logs for model latency.",
          "Restart with python -m bot.main run after changing config.yaml; reconnect USB if ADB drops.",
        ],
        [
          "Anza na adb devices: orodha tupu au yenye hali 'unauthorized' ndio hitilafu ya kawaida wakati wa kusakinisha.",
          "Jibu lisipofika, angalia adbsms imesakinishwa na kitambulisho cha SMS inayoingia ni kipya.",
          "Majibu ya polepole au yasiyoeleweka kwa kawaida huashiria Ollama haifanyi kazi; sheria za mbadala zinapaswa kujibu bado.",
          "Angalia vipindi vya kutokusumbua, muda wa kusubiri na anwani zinazoruhusiwa kabla ya kudhani injini ya majibu imeshindwa.",
          "Tumia python -m bot.main voice-check kwa matatizo ya mtiririko wa sauti na ukague kumbukumbu zinazozungushwa kwa muda wa mfano.",
          "Anzisha tena kwa python -m bot.main run baada ya kubadilisha config.yaml; unganisha USB tena ikiwa ADB itakatika.",
        ],
      ),
      commands: localizedList(
        [
          "adb devices",
          "python -m bot.main voice-check",
          "python -m bot.main run",
        ],
        [
          "adb devices",
          "python -m bot.main voice-check",
          "python -m bot.main run",
        ],
      ),
    },
  ],
  details: {
    setup: {
      intro: localized(
        "The SMS bot runs on a Linux machine and talks to an Android phone over ADB. Prepare the phone first, then bring up the Python service.",
        "Bot ya SMS hufanya kazi kwenye kompyuta ya Linux na kuwasiliana na simu ya Android kupitia ADB. Andaa simu kwanza, kisha anza huduma ya Python.",
      ),
      prerequisites: localizedList(
        [
          "Python 3.10 or newer",
          "ADB with USB debugging enabled",
          "The adbsms companion app on the phone",
          "A USB cable and a phone you own",
        ],
        [
          "Python 3.10 au zaidi",
          "ADB iliyo na urekebishaji wa USB",
          "Programu ya adbsms kwenye simu",
          "Kebo ya USB na simu unayomiliki",
        ],
      ),
      callout: callout(
        "warning",
        "Use a trusted cable",
        "ADB access grants deep control of the phone. Only connect a device you own and keep USB debugging off when the bot is not running.",
        "Tumia kebo inayoaminika",
        "Ufikiaji wa ADB hutoa udhibiti mkubwa wa simu. Unganisha tu kifaa chako na uzime urekebishaji wa USB bot isipofanya kazi.",
      ),
      image: image(
        "Connected device",
        "ADB device list and bot startup logs",
        "Kifaa kilichounganishwa",
        "Orodha ya vifaa vya ADB na kumbukumbu za kuanza",
      ),
    },
    config: {
      intro: localized(
        "config.yaml controls the brain, the safety limits and the reply schedule. Copy the example file and change only what you understand.",
        "config.yaml hudhibiti akili, mipaka ya usalama na ratiba ya majibu. Nakili faili ya mfano na ubadilishe tu unachokielewa.",
      ),
      prerequisites: localizedList(
        [
          "A completed setup",
          "config.example.yaml from the project",
          "Ollama running locally if you want model replies",
        ],
        [
          "Kusakinisha kumekamilika",
          "config.example.yaml kutoka kwenye mradi",
          "Ollama ikifanya kazi kwenye eneo ikiwa unataka majibu ya mfano",
        ],
      ),
      callout: callout(
        "tip",
        "Start with offline fallback",
        "Keep the rule-based fallback enabled while you test. The bot still replies when Ollama is busy or the model has not been pulled yet.",
        "Anza na mbadala wa nje ya mtandao",
        "Weka sheria za mbadala zikiwashwa wakati wa majaribio. Bot hujibu hata Ollama inaposhughulika au mfano haujapakuliwa.",
      ),
      image: image(
        "Configuration file",
        "Annotated config.yaml sections",
        "Faili ya usanidi",
        "Sehemu za config.yaml zenye maelezo",
      ),
    },
    cli: {
      intro: localized(
        "Every routine operation is a module command. Check the ADB connection and voice pipeline before editing configuration so you know which layer is failing.",
        "Kila operesheni ya kawaida ni amri ya moduli. Angalia muunganisho wa ADB na mtiririko wa sauti kabla ya kuhariri usanidi ili ujue tabaka linaloshindwa.",
      ),
      callout: callout(
        "tip",
        "Logs are your friend",
        "Rotating logs record message ids, model latency and ADB reconnects. They are the fastest way to diagnose a missed reply.",
        "Kumbukumbu ni rafiki yako",
        "Kumbukumbu zinazozungushwa hurekodi vitambulisho vya ujumbe, muda wa mfano na muunganisho wa ADB. Ni njia ya haraka kutambua jibu lililokosa.",
      ),
      image: image(
        "Terminal session",
        "Bot status and recent log lines",
        "Kikao cha terminal",
        "Hali ya bot na mistari ya hivi karibuni",
      ),
    },
    replies: {
      intro: localized(
        "An inbound SMS follows a short pipeline: filter, understand, answer, send. The local brain handles normal cases and simple rules cover the rest.",
        "SMS inayoingia hupitia hatua chache: kuchuja, kuelewa, kujibu, kutuma. Akili ya eneo hushughulikia hali za kawaida na sheria rahisi hufanya mengine.",
      ),
      prerequisites: localizedList(
        [
          "A connected Android phone with adbsms",
          "config.yaml with allowed contacts and cooldowns",
          "An Ollama model or the rule-based fallback enabled",
        ],
        [
          "Simu ya Android iliyounganishwa yenye adbsms",
          "config.yaml yenye anwani zinazoruhusiwa na muda wa kusubiri",
          "Mfano wa Ollama au sheria za mbadala zilizowashwa",
        ],
      ),
      callout: callout(
        "info",
        "Two brains, one answer",
        "Ollama writes natural replies and the rule-based fallback takes over when the model is unavailable, so a busy model never means silence.",
        "Akili mbili, jibu moja",
        "Ollama huandika majibu asilia na sheria za mbadala huchukua nafasi mfano usipopatikana, hivyo mfano wenye shughuli nyingi haumaanishi ukimya.",
      ),
      image: image(
        "Reply pipeline",
        "Inbound SMS to filter to reply",
        "Mtiririko wa jibu",
        "SMS inayoingia hadi kuchujwa hadi jibu",
      ),
    },
    memory: {
      intro: localized(
        "The bot remembers earlier conversations in a local SQLite database and uses keyword retrieval to bring relevant context back into a reply.",
        "Bot hukumbuka mazungumzo ya awali kwenye hifadhidata ya SQLite ya eneo na hutumia utafutaji wa maneno muhimu kurejesha muktadha unaofaa kwenye jibu.",
      ),
      prerequisites: localizedList(
        [
          "The SMS bot installed and run at least once",
          "A writable data directory on the Linux machine",
        ],
        [
          "Bot ya SMS imesakinishwa na kuendeshwa angalau mara moja",
          "Saraka ya data inayoandikika kwenye kompyuta ya Linux",
        ],
      ),
      callout: callout(
        "info",
        "Local by default",
        "Memory never leaves the machine. Clearing it does not delete messages stored on the phone.",
        "Kwanza kienyeji",
        "Kumbukumbu haiondoki kwenye mashine. Kuifuta haiondoi ujumbe uliohifadhiwa kwenye simu.",
      ),
      image: image(
        "Memory store",
        "SQLite tables and retrieved context",
        "Hifadhi ya kumbukumbu",
        "Jedwali za SQLite na muktadha uliopatikana",
      ),
    },
    scheduling: {
      intro: localized(
        "Scheduling lets a message ask for a later answer. The bot stores the requested time, waits for it and still obeys quiet hours.",
        "Ratiba huruhusu ujumbe kuomba jibu baadaye. Bot huhifadhi wakati uliotakiwa, husubiri, na bado huzingatia saa za utulivu.",
      ),
      prerequisites: localizedList(
        [
          "Scheduling enabled in config.yaml",
          "Do-not-disturb windows reviewed",
        ],
        [
          "Ratiba imewezeshwa kwenye config.yaml",
          "Vipindi vya kutokusumbua vimekaguliwa",
        ],
      ),
      callout: callout(
        "tip",
        "Respect quiet hours",
        "A scheduled reply is still suppressed inside a DND window, so late-night requests do not wake anyone.",
        "Heshimu saa za utulivu",
        "Jibu lililopangwa bado huzuiwa wakati wa kutokusumbua, hivyo maombi ya usiku hawayamshi mtu yeyote.",
      ),
      image: image(
        "Scheduled queue",
        "Pending replies and DND windows",
        "Foleni ya ratiba",
        "Majibu yanayosubiri na vipindi vya kutokusumbua",
      ),
    },
    whatsapp: {
      intro: localized(
        "WhatsApp auto-reply is an experimental extra. It watches notification shade alerts instead of reading WhatsApp data directly.",
        "Kujibu WhatsApp kiotomatiki ni nyongeza ya majaribio. Hufuatilia arifa kwenye kivuli cha arifa badala ya kusoma data ya WhatsApp moja kwa moja.",
      ),
      prerequisites: localizedList(
        [
          "WhatsApp auto-reply enabled in config.yaml",
          "Notification access for the Android bridge",
          "A test conversation you control",
        ],
        [
          "Kujibu WhatsApp kiotomatiki kumewezeshwa kwenye config.yaml",
          "Ufikiaji wa arifa kwa daraja la Android",
          "Mazungumzo ya majaribio unayodhibiti",
        ],
      ),
      callout: callout(
        "warning",
        "Experimental feature",
        "Notification text may be truncated or delayed, so treat WhatsApp replies as best-effort and keep them off for sensitive chats.",
        "Kipengele cha majaribio",
        "Maandishi ya arifa yanaweza kukatwa au kuchelewa, hivyo uyatendee majibu ya WhatsApp kama jitihada bora na uyaache yamezimwa kwa mazungumzo nyeti.",
      ),
      image: image(
        "Notification reply",
        "Incoming alert and generated answer",
        "Jibu la arifa",
        "Arifa inayoingia na jibu lililotengenezwa",
      ),
    },
    voice: {
      intro: localized(
        "The voice bridge creates a local conversation loop: the microphone feeds faster-whisper, Ollama writes the reply and Piper speaks it through the speaker.",
        "Daraja la sauti huunda mazungumzo ya eneo: maikrofoni hulisha faster-whisper, Ollama huandika jibu na Piper hulisema kupitia spika.",
      ),
      prerequisites: localizedList(
        [
          "The AudioLink Android bridge app",
          "A phone placed on speakerphone",
          "faster-whisper and Piper installed locally",
        ],
        [
          "Programu ya daraja ya AudioLink kwenye Android",
          "Simu iliyowekwa kwenye spika",
          "faster-whisper na Piper zimesakinishwa kwenye eneo",
        ],
      ),
      callout: callout(
        "info",
        "Acoustic, not telephony",
        "The bridge uses the speakerphone and microphone. It never attaches to cellular call audio, so it works with ordinary voice calls placed on speaker.",
        "Akustika, si simu za kawaida",
        "Daraja hutumia spika na maikrofoni. Haijiunga na sauti ya simu ya rununu, hivyo hufanya kazi na simu za kawaida zilizowekwa spika.",
      ),
      image: image(
        "Voice pipeline",
        "Microphone to STT to LLM to TTS",
        "Mtiririko wa sauti",
        "Maikrofoni hadi STT hadi LLM hadi TTS",
      ),
    },
    architecture: {
      intro: localized(
        "The system is a small set of local services: a Python bot on Linux, an ADB bridge to Android, a brain, a memory store and an optional voice bridge.",
        "Mfumo ni huduma chache za eneo: bot ya Python kwenye Linux, daraja la ADB kwenda Android, akili, hifadhi ya kumbukumbu na daraja la sauti la hiari.",
      ),
      callout: callout(
        "info",
        "Local-first loop",
        "Messages, replies, memory and operational events stay on the machine; only ADB to your own phone and optional webhooks cross a boundary.",
        "Kitanzi cha kwanza-kienyeji",
        "Ujumbe, majibu, kumbukumbu na matukio ya uendeshaji vinabaki kwenye mashine; ADB kwenda simu yako na webhooks za hiari tu huvuka mpaka.",
      ),
      image: image(
        "System map",
        "Bot, ADB, Ollama, SQLite and AudioLink",
        "Ramani ya mfumo",
        "Bot, ADB, Ollama, SQLite na AudioLink",
      ),
    },
    security: {
      intro: localized(
        "The bot is designed to keep communication on your own hardware. The main risks come from ADB access and optional outbound features.",
        "Bot imeundwa kuweka mawasiliano kwenye vifaa vyako. Hatari kuu hutokana na ufikiaji wa ADB na vipengele vya hiari vinavyotuma data nje.",
      ),
      prerequisites: localizedList(
        [
          "A phone you own and control",
          "config.yaml reviewed before enabling optional features",
        ],
        [
          "Simu unayomiliki na kuibadilisha",
          "config.yaml imekaguliwa kabla ya kuwezesha vipengele vya hiari",
        ],
      ),
      callout: callout(
        "warning",
        "ADB is powerful",
        "USB debugging can control the whole phone. Turn it off when the bot is not running and approve only your own device.",
        "ADB ina nguvu",
        "Urekebishaji wa USB unaweza kudhibiti simu yote. Uzime wakati bot haifanyi kazi na uidhinishe kifaa chako tu.",
      ),
      image: image(
        "Trust boundaries",
        "Linux host, ADB cable and optional webhooks",
        "Mipaka ya uaminifu",
        "Kompyuta ya Linux, kebo ya ADB na webhooks za hiari",
      ),
    },
    troubleshooting: {
      intro: localized(
        "Most failures are connection or configuration issues. Work from the phone link outward, then check the model and the logs.",
        "Hitilafu nyingi hutokana na muunganisho au usanidi. Anza kwenye kiungo cha simu, kisha angalia mfano na kumbukumbu.",
      ),
      prerequisites: localizedList(
        ["Access to the Linux terminal", "The rotating log output"],
        [
          "Ufikiaji wa terminal ya Linux",
          "Matokeo ya kumbukumbu zinazozungushwa",
        ],
      ),
      callout: callout(
        "tip",
        "Check the obvious first",
        "An unauthorized ADB prompt or a faulty USB cable explains more missed replies than any model problem.",
        "Angalia wazi kwanza",
        "Ujumbe wa ADB usioidhinishwa au kebo mbaya ya USB husababisha majibu yasiyofika zaidi ya tatizo lolote la mfano.",
      ),
      image: image(
        "Diagnostic run",
        "Device check, voice-check and log lines",
        "Uendeshaji wa uchunguzi",
        "Ukaguzi wa kifaa, voice-check na mistari ya kumbukumbu",
      ),
    },
  },
};
