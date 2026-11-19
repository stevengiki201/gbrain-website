import {
  localized,
  localizedList,
  image,
  callout,
  type ProductDocBundle,
} from "./types";

export const neuralDocs: ProductDocBundle = {
  sections: [
    {
      id: "getting-started",
      title: localized("Getting started", "Kuanza kutumia"),
      slugs: ["quickstart", "configuration"],
    },
    {
      id: "platform",
      title: localized("Platform", "Jukwaa"),
      slugs: ["architecture", "providers", "agents-skills-tools", "mrx"],
    },
    {
      id: "reference",
      title: localized("Reference", "Rejea"),
      slugs: [
        "api",
        "subsystems",
        "security",
        "development",
        "troubleshooting",
      ],
    },
  ],
  pages: [
    {
      slug: "quickstart",
      title: localized("Quick start", "Kuanza haraka"),
      description: localized(
        "Prepare the environment, run the API and dashboard locally, and connect an Ollama model.",
        "Andaa mazingira, endesha API na dashibodi kwenye kifaa chako, kisha unganisha mfano wa Ollama.",
      ),
      topics: localizedList(
        [
          "Run the setup script to create the local environment and install backend and dashboard dependencies.",
          "Start the FastAPI backend and open the interactive API documentation at 127.0.0.1:8000/api/docs.",
          "Start the React, Vite and Tailwind dashboard and access it at localhost:5173.",
          "Pull a local Ollama model and confirm provider and capability detection in the dashboard.",
        ],
        [
          "Endesha hati ya usanidi ili kuunda mazingira ya ndani na kusakinisha vitegemezi vya seva na dashibodi.",
          "Anzisha seva ya nyuma ya FastAPI na ufungue nyaraka za API zinazoingiliana kwenye 127.0.0.1:8000/api/docs.",
          "Anzisha dashibodi ya React, Vite na Tailwind na uifikie kupitia localhost:5173.",
          "Pakua mfano wa Ollama wa ndani na uthibitishe ugunduzi wa mtoa huduma na uwezo kwenye dashibodi.",
        ],
      ),
      commands: localizedList(
        [
          "./scripts/setup.sh",
          "./scripts/development/api.sh",
          "./scripts/development/web.sh",
        ],
        [
          "./scripts/setup.sh",
          "./scripts/development/api.sh",
          "./scripts/development/web.sh",
        ],
      ),
    },
    {
      slug: "configuration",
      title: localized("Configuration", "Usanidi"),
      description: localized(
        "Configure the local runtime with environment variables, storage, auth and feature toggles.",
        "Sanidi uendeshaji wa ndani kwa vigezo vya mazingira, hifadhi, uthibitishaji na swichi za vipengele.",
      ),
      topics: localizedList(
        [
          "Create your local configuration from .env.example and keep the platform local-first by default.",
          "Set Ollama and database options for the FastAPI backend backed by SQLite with Alembic migrations.",
          "Enable optional bearer authentication by setting API_AUTH_TOKEN when you want to protect API access.",
          "Control permissions, workspace paths and toggles for desktop, browser, MrX, SMS, phone and AudioLink features.",
        ],
        [
          "Unda usanidi wako wa ndani kutoka .env.example na uweke jukwaa likitumika ndani ya kifaa kwa chaguo-msingi.",
          "Weka chaguo za Ollama na hifadhidata kwa seva ya FastAPI inayotumia SQLite pamoja na uhamishaji wa Alembic.",
          "Washa uthibitishaji wa hiari wa bearer kwa kuweka API_AUTH_TOKEN unapohitaji kulinda ufikiaji wa API.",
          "Dhibiti ruhusa, njia za eneo la kazi na swichi za vipengele vya kompyuta, kivinjari, MrX, SMS, simu na AudioLink.",
        ],
      ),
    },
    {
      slug: "architecture",
      title: localized("Architecture", "Usanifu"),
      description: localized(
        "Understand the platform layers from Neural Core and engines to the dashboard and desktop shell.",
        "Elewa tabaka za jukwaa kuanzia Kiini cha Neural na injini hadi dashibodi na ganda la kompyuta.",
      ),
      topics: localizedList(
        [
          "Neural Core coordinates the context, reasoning and action engines to turn requests into planned work.",
          "The FastAPI backend uses SQLite with Alembic migrations while the dashboard is built with React, Vite and Tailwind.",
          "A Tauri v2 desktop scaffold wraps the platform for native packaging without changing the local-first design.",
          "Consequential actions pass through approval gates so the system can propose, approve and verify work.",
          "The platform is developed through Phases 1-12 with a modular structure for providers, engines and subsystems.",
        ],
        [
          "Kiini cha Neural huratibu injini za muktadha, hoja na hatua ili kubadilisha maombi kuwa kazi iliyopangwa.",
          "Seva ya nyuma ya FastAPI hutumia SQLite pamoja na uhamishaji wa Alembic huku dashibodi ikijengwa kwa React, Vite na Tailwind.",
          "Kiunzi cha kompyuta cha Tauri v2 hufungashia jukwaa kwa matumizi ya asili bila kubadilisha muundo wa ndani kwanza.",
          "Hatua zenye athari hupitia milango ya idhini ili mfumo upendekeze, uidhinishe na uthibitishe kazi.",
          "Jukwaa limetengenezwa kupitia Awamu 1-12 kwa muundo wa moduli wa watoa huduma, injini na mifumo midogo.",
        ],
      ),
    },
    {
      slug: "providers",
      title: localized("Providers", "Watoa huduma"),
      description: localized(
        "Connect models through a neutral provider contract with local defaults and room for future backends.",
        "Unganisha miundo kupitia mkataba huru wa watoa huduma ukiwa na chaguo-msingi la ndani na nafasi ya huduma zijazo.",
      ),
      topics: localizedList(
        [
          "The provider-neutral AIProvider contract keeps model integrations decoupled from the rest of the platform.",
          "OllamaProvider is the default local implementation for running models on your own machine.",
          "GBrainAIProvider is reserved for a future GBrain-managed backend without changing application contracts.",
          "MockProvider supports development and testing when a live model is not required.",
        ],
        [
          "Mkataba huru wa AIProvider huweka miunganisho ya miundo ikiwa huru na sehemu nyingine za jukwaa.",
          "OllamaProvider ni utekelezaji chaguo-msingi wa ndani kwa kuendesha miundo kwenye mashine yako mwenyewe.",
          "GBrainAIProvider imehifadhiwa kwa huduma ya GBrain ya baadaye bila kubadilisha mikataba ya programu.",
          "MockProvider husaidia maendeleo na majaribio wakati mfano hai hauhitajiki.",
        ],
      ),
    },
    {
      slug: "agents-skills-tools",
      title: localized("Agents, skills and tools", "Mawakala, ujuzi na zana"),
      description: localized(
        "Compose agent capabilities with scoped permissions, auditable tools and approval-aware execution.",
        "Jenga uwezo wa mawakala kwa ruhusa zilizopimwa, zana zinazokaguliwa na utekelezaji unaoheshimu idhini.",
      ),
      topics: localizedList(
        [
          "Agents combine skills and tools to complete tasks while staying within assigned permission boundaries.",
          "Tools are permission-scoped and audited so sensitive operations can be reviewed after execution.",
          "Skills package reusable instructions and workflows that agents can load when a task requires them.",
          "Approval gates ensure consequential tool actions are reviewed before they run.",
        ],
        [
          "Mawakala huunganisha ujuzi na zana kukamilisha kazi huku yakibaki ndani ya mipaka ya ruhusa zilizotolewa.",
          "Zana zina ruhusa maalum na hukaguliwa ili shughuli nyeti ziweze kupitiwa baada ya utekelezaji.",
          "Ujuzi hupakia maelekezo na mtiririko unaoweza kutumika tena ambao mawakala wanaweza kupakia kazi inapouhitaji.",
          "Milango ya idhini huhakikisha hatua muhimu za zana zinapitiwa kabla ya kutekelezwa.",
        ],
      ),
    },
    {
      slug: "mrx",
      title: localized("MrX", "MrX"),
      description: localized(
        "Use the local coding agent to plan, edit, run and verify development work with human oversight.",
        "Tumia wakala wa ndani wa usimbaji kupanga, kuhariri, kuendesha na kuthibitisha kazi ya maendeleo kwa usimamizi wa binadamu.",
      ),
      topics: localizedList(
        [
          "MrX is a local coding agent that turns an objective into a concrete plan of development steps.",
          "It asks clarifying questions when requirements are ambiguous before making risky changes.",
          "MrX can write files, install dependencies and run builds or tests as part of a task.",
          "Results are verified and reviewed so code changes remain traceable and approval-aware.",
        ],
        [
          "MrX ni wakala wa usimbaji wa ndani anayebadilisha lengo kuwa mpango halisi wa hatua za maendeleo.",
          "Huuliza maswali ya ufafanuzi mahitaji yanapokuwa na utata kabla ya kufanya mabadiliko yenye hatari.",
          "MrX anaweza kuandika faili, kusakinisha vitegemezi na kuendesha ujenzi au majaribio kama sehemu ya kazi.",
          "Matokeo huthibitishwa na kukaguliwa ili mabadiliko ya msimbo yabaki kufuatilika na kuzingatia idhini.",
        ],
      ),
    },
    {
      slug: "api",
      title: localized("API reference", "Rejea ya API"),
      description: localized(
        "Explore the backend surface through interactive OpenAPI docs and organized endpoint groups.",
        "Chunguza uso wa seva ya nyuma kupitia nyaraka za OpenAPI zinazoingiliana na makundi ya vituo vilivyopangwa.",
      ),
      topics: localizedList(
        [
          "The FastAPI backend serves interactive OpenAPI documentation at /api/docs on the local server.",
          "More than 80 endpoints cover chat, conversations, tasks, agents, devices, automations and integrations.",
          "Additional groups expose memory, knowledge, security, desktop, browser, MrX, SMS, communication and learning features.",
          "All endpoints run locally by default, with optional bearer authentication controlled by API_AUTH_TOKEN.",
        ],
        [
          "Seva ya nyuma ya FastAPI hutoa nyaraka za OpenAPI zinazoingiliana kwenye /api/docs katika seva ya ndani.",
          "Zaidi ya vituo 80 vinashughulikia mazungumzo, majukumu, mawakala, vifaa, otomatiki na miunganisho.",
          "Makundi mengine yanaonyesha vipengele vya kumbukumbu, maarifa, usalama, kompyuta, kivinjari, MrX, SMS, mawasiliano na kujifunza.",
          "Vituo vyote hufanya kazi ndani ya kifaa kwa chaguo-msingi, na uthibitishaji wa hiari wa bearer unaodhibitiwa na API_AUTH_TOKEN.",
        ],
      ),
    },
    {
      slug: "subsystems",
      title: localized("Subsystems", "Mifumo midogo"),
      description: localized(
        "Extend the platform with device, automation, communication and learning subsystems.",
        "Panua jukwaa kwa mifumo midogo ya vifaa, otomatiki, mawasiliano na kujifunza.",
      ),
      topics: localizedList(
        [
          "The device engine manages registry, pairing and telemetry, while desktop and browser control enable observation and interaction.",
          "Automations and integrations connect workflows to services such as GitHub and browser-based actions.",
          "SMS, PhoneLink and AudioLink subsystems bridge messages, paired-device operations and PC-to-phone audio sessions.",
          "Communication and Learning engines handle inbox, webhook and notification flows plus deterministic reviews and lessons.",
        ],
        [
          "Injini ya vifaa husimamia usajili, uoanishaji na telemetry, huku udhibiti wa kompyuta na kivinjari ukiruhusu uchunguzi na mwingiliano.",
          "Otomatiki na miunganisho huunganisha mitiririko ya kazi na huduma kama GitHub na vitendo vya kivinjari.",
          "Mifumo midogo ya SMS, PhoneLink na AudioLink huunganisha ujumbe, shughuli za vifaa vilivyooanishwa na vipindi vya sauti kutoka PC hadi simu.",
          "Injini za Mawasiliano na Kujifunza hushughulikia mipasho ya kikasha, webhook na arifa pamoja na mapitio na masomo yaliyopangwa.",
        ],
      ),
    },
    {
      slug: "security",
      title: localized("Security", "Usalama"),
      description: localized(
        "Protect local execution with approvals, auditing, optional authentication and operational safeguards.",
        "Linda utekelezaji wa ndani kwa idhini, ukaguzi, uthibitishaji wa hiari na kinga za uendeshaji.",
      ),
      topics: localizedList(
        [
          "The security engine provides authentication controls, approval workflows and a persistent audit history.",
          "Optional bearer token protection via API_AUTH_TOKEN helps restrict access to the local API when needed.",
          "Monitoring and backup capabilities support operational visibility and recovery for local deployments.",
          "Permission-scoped agents and tools reduce risk by limiting what actions can be proposed and executed.",
        ],
        [
          "Injini ya usalama hutoa udhibiti wa uthibitishaji, mtiririko wa idhini na historia endelevu ya ukaguzi.",
          "Ulinzi wa hiari wa tokeni ya bearer kupitia API_AUTH_TOKEN husaidia kuzuia ufikiaji wa API ya ndani inapohitajika.",
          "Uwezo wa ufuatiliaji na chelezo husaidia mwonekano wa uendeshaji na urejeshaji kwa usakinishaji wa ndani.",
          "Mawakala na zana zenye ruhusa zilizopimwa hupunguza hatari kwa kuwekea mipaka hatua zinazoweza kupendekezwa na kutekelezwa.",
        ],
      ),
    },
    {
      slug: "development",
      title: localized("Development", "Maendeleo"),
      description: localized(
        "Work on the platform with local scripts, provider contracts and audit-aware change practices.",
        "Fanya kazi kwenye jukwaa kwa hati za ndani, mikataba ya watoa huduma na mbinu za mabadiliko zinazozingatia ukaguzi.",
      ),
      topics: localizedList(
        [
          "Use the provided setup and development scripts to run the backend, dashboard and local workflows consistently.",
          "Keep new providers behind the existing AIProvider interfaces so local-first defaults remain intact.",
          "Review the security engine audit trail when changing agents, automations or approval-sensitive behavior.",
          "Phases 1-12 are complete, providing a stable base for incremental improvements and subsystem work.",
        ],
        [
          "Tumia hati zilizotolewa za usanidi na maendeleo kuendesha seva ya nyuma, dashibodi na mitiririko ya ndani kwa uthabiti.",
          "Weka watoa huduma wapya nyuma ya miingiliano iliyopo ya AIProvider ili chaguo-msingi la ndani kwanza libaki salama.",
          "Pitia historia ya ukaguzi ya injini ya usalama unapobadilisha mawakala, otomatiki au tabia zinazohitaji idhini.",
          "Awamu 1-12 zimekamilika, zikitoa msingi thabiti wa maboresho ya hatua kwa hatua na kazi za mifumo midogo.",
        ],
      ),
      commands: localizedList(
        [
          "./scripts/setup.sh",
          "./scripts/development/api.sh",
          "./scripts/development/web.sh",
        ],
        [
          "./scripts/setup.sh",
          "./scripts/development/api.sh",
          "./scripts/development/web.sh",
        ],
      ),
    },
    {
      slug: "troubleshooting",
      title: localized("Troubleshooting", "Utatuzi wa matatizo"),
      description: localized(
        "Diagnose common local issues with the API, dashboard, Ollama connectivity and authentication.",
        "Tambua matatizo ya kawaida ya ndani ya API, dashibodi, muunganisho wa Ollama na uthibitishaji.",
      ),
      topics: localizedList(
        [
          "Check backend health and confirm the API is reachable before debugging dashboard or agent behavior.",
          "Verify Ollama is running, the required model is pulled and provider detection is healthy in the dashboard.",
          "If requests fail unexpectedly, confirm API_AUTH_TOKEN configuration and whether bearer auth is required.",
          "Review logs, audit history and service status when actions stall at approvals or subsystem boundaries.",
        ],
        [
          "Kagua afya ya seva ya nyuma na uthibitishe API inafikika kabla ya kuchunguza tabia ya dashibodi au mawakala.",
          "Hakikisha Ollama inaendesha, mfano unaohitajika umepakuliwa na ugunduzi wa mtoa huduma uko sawa kwenye dashibodi.",
          "Ikiwa maombi yatashindikana bila kutarajiwa, thibitisha usanidi wa API_AUTH_TOKEN na kama uthibitishaji wa bearer unahitajika.",
          "Pitia kumbukumbu, historia ya ukaguzi na hali ya huduma wakati hatua zinasimama kwenye idhini au mipaka ya mifumo midogo.",
        ],
      ),
      commands: localizedList(
        [
          "curl http://127.0.0.1:8000/api/health",
          "ollama list",
          "ollama pull llama3",
        ],
        [
          "curl http://127.0.0.1:8000/api/health",
          "ollama list",
          "ollama pull llama3",
        ],
      ),
    },
  ],
  details: {
    quickstart: {
      intro: localized(
        "Get the GBrain Neural System running on your machine with the local API, dashboard and an Ollama model. The default setup keeps data and execution on 127.0.0.1.",
        "Anzisha Mfumo wa GBrain Neural kwenye mashine yako kwa API ya ndani, dashibodi na mfano wa Ollama. Usanidi chaguo-msingi huweka data na utekelezaji kwenye 127.0.0.1.",
      ),
      prerequisites: localizedList(
        [
          "Python 3.10+ and Node.js 18+ installed locally",
          "Ollama installed with at least one pulled model",
          "A local shell environment able to run the provided scripts",
        ],
        [
          "Python 3.10+ na Node.js 18+ vimesakinishwa ndani ya kifaa",
          "Ollama imesakinishwa ikiwa na angalau mfano mmoja uliopakuliwa",
          "Mazingira ya ndani ya terminal yanayoweza kuendesha hati zilizotolewa",
        ],
      ),
      callout: callout(
        "tip",
        "Local by default",
        "The platform runs without a GBrain account. Use the dashboard to confirm provider detection and capability status after startup.",
        "Ndani ya kifaa kwa chaguo-msingi",
        "Jukwaa hufanya kazi bila akaunti ya GBrain. Tumia dashibodi kuthibitisha ugunduzi wa mtoa huduma na hali ya uwezo baada ya kuanza.",
      ),
      image: image(
        "Quick start overview",
        "API server, dashboard and local Ollama connection",
        "Muhtasari wa kuanza haraka",
        "Seva ya API, dashibodi na muunganisho wa Ollama wa ndani",
      ),
    },
    configuration: {
      intro: localized(
        "Configuration is driven by environment variables so you can tailor storage, authentication and feature toggles without changing source code. Start from .env.example and adjust only what your setup needs.",
        "Usanidi unaendeshwa na vigezo vya mazingira ili uweze kurekebisha hifadhi, uthibitishaji na swichi za vipengele bila kubadilisha msimbo chanzo. Anza na .env.example na ubadilishe tu kile usanidi wako unachohitaji.",
      ),
      prerequisites: localizedList(
        [
          "A copy of .env.example available in the project workspace",
          "Access to edit local environment values before starting services",
        ],
        [
          "Nakala ya .env.example inayopatikana kwenye eneo la kazi la mradi",
          "Ufikiaji wa kuhariri vigezo vya mazingira ya ndani kabla ya kuanzisha huduma",
        ],
      ),
      callout: callout(
        "info",
        "Optional API protection",
        "Set API_AUTH_TOKEN to require a bearer token for API requests. Leave it unset for open local development.",
        "Ulinzi wa hiari wa API",
        "Weka API_AUTH_TOKEN ili kuhitaji tokeni ya bearer kwa maombi ya API. Iache bila kuwekwa kwa maendeleo ya ndani yasiyo na kizuizi.",
      ),
      image: image(
        "Configuration layout",
        "Environment variables for providers, storage and feature toggles",
        "Mpangilio wa usanidi",
        "Vigezo vya mazingira kwa watoa huduma, hifadhi na swichi za vipengele",
      ),
    },
    architecture: {
      intro: localized(
        "GBrain Neural is built as a modular execution platform around a temporary Ollama brain. Core engines, providers and subsystems coordinate through clear interfaces and approval boundaries.",
        "GBrain Neural imejengwa kama jukwaa la utekelezaji la moduli linalozunguka akili ya muda ya Ollama. Injini kuu, watoa huduma na mifumo midogo huratibu kupitia miingiliano wazi na mipaka ya idhini.",
      ),
      callout: callout(
        "info",
        "Modular platform core",
        "Neural Core links context, reasoning and action engines while the FastAPI backend, React dashboard and Tauri v2 scaffold form the application shell.",
        "Kiini cha jukwaa cha moduli",
        "Kiini cha Neural huunganisha injini za muktadha, hoja na hatua huku seva ya FastAPI, dashibodi ya React na kiunzi cha Tauri v2 vikiumba ganda la programu.",
      ),
      image: image(
        "Architecture diagram",
        "Core engines, providers, subsystems and user interfaces",
        "Mchoro wa usanifu",
        "Injini kuu, watoa huduma, mifumo midogo na violesura vya watumiaji",
      ),
    },
    providers: {
      intro: localized(
        "Model access is abstracted behind a provider-neutral contract so the platform can evolve without locking logic to one backend. Local development defaults to Ollama while keeping future options open.",
        "Ufikiaji wa miundo umetenganishwa nyuma ya mkataba huru wa mtoa huduma ili jukwaa liweze kukua bila kufungia mantiki kwenye seva moja. Maendeleo ya ndani hutumia Ollama kwa chaguo-msingi huku yakiacha chaguo za baadaye wazi.",
      ),
      callout: callout(
        "tip",
        "Keep integrations portable",
        "Implement new providers against the AIProvider contract to preserve routing, discovery and local-first behavior.",
        "Weka miunganisho ibebeke",
        "Tekeleza watoa huduma wapya dhidi ya mkataba wa AIProvider ili kuhifadhi uelekezaji, ugunduzi na tabia ya ndani kwanza.",
      ),
      image: image(
        "Provider model",
        "AIProvider contract with Ollama, reserved GBrain and mock implementations",
        "Mfano wa watoa huduma",
        "Mkataba wa AIProvider ukiwa na utekelezaji wa Ollama, GBrain iliyohifadhiwa na mock",
      ),
    },
    "agents-skills-tools": {
      intro: localized(
        "Agents execute work by combining skills and tools under explicit permissions. This structure keeps automation flexible while making sensitive actions auditable and approval-aware.",
        "Mawakala hutekeleza kazi kwa kuunganisha ujuzi na zana chini ya ruhusa zilizo wazi. Muundo huu huweka otomatiki ikiwa rahisi kubadilika huku ukifanya hatua nyeti zikaguliwe na kuzingatia idhini.",
      ),
      callout: callout(
        "warning",
        "Respect permission boundaries",
        "Tools should only be used within their granted scope, and consequential actions must pass through approval gates.",
        "Heshimu mipaka ya ruhusa",
        "Zana zinapaswa kutumika tu ndani ya wigo ulioidhinishwa, na hatua zenye athari lazima zipitie milango ya idhini.",
      ),
      image: image(
        "Agent composition",
        "Agents loading skills and invoking permission-scoped tools",
        "Muundo wa wakala",
        "Mawakala wakipakia ujuzi na kutumia zana zenye ruhusa maalum",
      ),
    },
    mrx: {
      intro: localized(
        "MrX is the platform's local coding agent for guided software work. It focuses on understanding the objective, making scoped changes and verifying outcomes before completion.",
        "MrX ni wakala wa usimbaji wa ndani wa jukwaa kwa kazi za programu zinazoongozwa. Hulenga kuelewa lengo, kufanya mabadiliko yenye mipaka na kuthibitisha matokeo kabla ya kukamilisha.",
      ),
      callout: callout(
        "info",
        "Verification matters",
        "MrX is designed to ask clarifying questions, run relevant builds or tests and report what was verified.",
        "Uthibitishaji ni muhimu",
        "MrX imeundwa kuuliza maswali ya ufafanuzi, kuendesha ujenzi au majaribio husika na kuripoti kilichothibitishwa.",
      ),
      image: image(
        "MrX workflow",
        "Objective intake, planning, implementation and verification loop",
        "Mtiririko wa MrX",
        "Upokeaji wa lengo, upangaji, utekelezaji na kitanzi cha uthibitishaji",
      ),
    },
    api: {
      intro: localized(
        "The API is the control surface for the Neural System, exposing chat, tasks, agents, memory, devices and more. Interactive documentation at /api/docs makes it easy to inspect requests and responses locally.",
        "API ni uso wa udhibiti wa Mfumo wa Neural, ukionyesha mazungumzo, majukumu, mawakala, kumbukumbu, vifaa na mengineyo. Nyaraka zinazoingiliana kwenye /api/docs hurahisisha kukagua maombi na majibu ndani ya kifaa.",
      ),
      callout: callout(
        "info",
        "Comprehensive local surface",
        "With 80+ endpoints, the backend covers core platform features and subsystem integrations without requiring external accounts.",
        "Uso mpana wa ndani",
        "Kwa zaidi ya vituo 80, seva ya nyuma inashughulikia vipengele vya msingi vya jukwaa na miunganisho ya mifumo midogo bila kuhitaji akaunti za nje.",
      ),
      image: image(
        "API explorer",
        "Interactive OpenAPI groups for platform and subsystem endpoints",
        "Kichunguzi cha API",
        "Makundi ya OpenAPI yanayoingiliana kwa vituo vya jukwaa na mifumo midogo",
      ),
    },
    subsystems: {
      intro: localized(
        "Subsystems extend the core platform into devices, automations and communication channels. They share common security, auditing and learning capabilities so behavior stays consistent across integrations.",
        "Mifumo midogo huipanua jukwaa kuu hadi kwenye vifaa, otomatiki na njia za mawasiliano. Hushiriki uwezo wa pamoja wa usalama, ukaguzi na kujifunza ili tabia ibaki thabiti katika miunganisho yote.",
      ),
      callout: callout(
        "tip",
        "Shared platform services",
        "Desktop, browser, SMS, PhoneLink and AudioLink features benefit from the same approval, monitoring and memory foundations.",
        "Huduma za pamoja za jukwaa",
        "Vipengele vya kompyuta, kivinjari, SMS, PhoneLink na AudioLink hunufaika na misingi ile ile ya idhini, ufuatiliaji na kumbukumbu.",
      ),
      image: image(
        "Subsystem connections",
        "Device, automation, communication and learning modules around Neural Core",
        "Miunganisho ya mifumo midogo",
        "Moduli za vifaa, otomatiki, mawasiliano na kujifunza zikizunguka Kiini cha Neural",
      ),
    },
    security: {
      intro: localized(
        "Security in GBrain Neural combines access control, approvals and observability for local-first operation. Sensitive actions are gated, recorded and recoverable through monitoring and backups.",
        "Usalama katika GBrain Neural unachanganya udhibiti wa ufikiaji, idhini na ufuatiliaji kwa uendeshaji wa ndani kwanza. Hatua nyeti hudhibitiwa, kurekodiwa na kurejeshwa kupitia ufuatiliaji na chelezo.",
      ),
      callout: callout(
        "warning",
        "Gate consequential actions",
        "Keep approval requirements enabled for risky operations and use audit history when reviewing automated behavior.",
        "Dhibiti hatua zenye athari",
        "Weka masharti ya idhini yakiwashwa kwa shughuli zenye hatari na tumia historia ya ukaguzi unapopitia tabia za kiotomatiki.",
      ),
      image: image(
        "Security controls",
        "Authentication, approvals, audit trail, monitoring and backups",
        "Udhibiti wa usalama",
        "Uthibitishaji, idhini, historia ya ukaguzi, ufuatiliaji na chelezo",
      ),
    },
    development: {
      intro: localized(
        "Development workflows favor reproducible local scripts and stable interfaces. With Phases 1-12 complete, contributors can extend providers and subsystems while preserving auditability and local-first defaults.",
        "Mtiririko wa maendeleo hupendelea hati za ndani zinazoweza kurudiwa na miingiliano thabiti. Huku Awamu 1-12 zikiwa zimekamilika, wachangiaji wanaweza kupanua watoa huduma na mifumo midogo wakihifadhi ukaguzi na chaguo-msingi la ndani kwanza.",
      ),
      prerequisites: localizedList(
        [
          "A working local setup created with the project scripts",
          "Familiarity with the AIProvider contract and security approval flow",
        ],
        [
          "Usanidi wa ndani unaofanya kazi ulioundwa kwa hati za mradi",
          "Uelewa wa mkataba wa AIProvider na mtiririko wa idhini za usalama",
        ],
      ),
      callout: callout(
        "tip",
        "Preserve platform contracts",
        "When adding capabilities, integrate through existing provider, agent and tool interfaces so behavior remains consistent and reviewable.",
        "Hifadhi mikataba ya jukwaa",
        "Unapoongeza uwezo, unganisha kupitia miingiliano iliyopo ya watoa huduma, mawakala na zana ili tabia ibaki thabiti na rahisi kukaguliwa.",
      ),
      image: image(
        "Development workflow",
        "Local scripts, provider interfaces and audit-aware iteration",
        "Mtiririko wa maendeleo",
        "Hati za ndani, miingiliano ya watoa huduma na marudio yanayozingatia ukaguzi",
      ),
    },
    troubleshooting: {
      intro: localized(
        "Most issues in a local Neural deployment come down to service availability, model readiness or authentication settings. Start with health checks, then verify Ollama and request protection.",
        "Matatizo mengi katika usakinishaji wa ndani wa Neural hutokana na upatikanaji wa huduma, utayari wa mfano au mipangilio ya uthibitishaji. Anza na ukaguzi wa afya, kisha thibitisha Ollama na ulinzi wa maombi.",
      ),
      prerequisites: localizedList(
        [
          "API and dashboard processes started in your local environment",
          "Access to terminal commands for health and Ollama checks",
        ],
        [
          "Michakato ya API na dashibodi imeanzishwa katika mazingira yako ya ndani",
          "Ufikiaji wa amri za terminal kwa ukaguzi wa afya na Ollama",
        ],
      ),
      callout: callout(
        "info",
        "Trace stalled actions",
        "If a task waits on approval or a subsystem boundary, inspect logs and audit history to identify the blocking step.",
        "Fuatilia hatua zilizosimama",
        "Ikiwa kazi inasubiri idhini au mpaka wa mfumo mdogo, kagua kumbukumbu na historia ya ukaguzi ili kutambua hatua inayozuia.",
      ),
      image: image(
        "Troubleshooting checks",
        "Health endpoint, Ollama model status and authentication diagnostics",
        "Ukaguzi wa utatuzi",
        "Kituo cha afya, hali ya mfano wa Ollama na uchunguzi wa uthibitishaji",
      ),
    },
  },
};
