import {
  localized,
  localizedList,
  image,
  callout,
  type ProductDocBundle,
} from "./types";

export const shulebombaDocs: ProductDocBundle = {
  sections: [
    {
      id: "getting-started",
      title: localized("Getting started", "Kuanza kutumia"),
      slugs: ["overview", "getting-started", "how-to-use"],
    },
    {
      id: "classroom",
      title: localized("Classroom workflows", "Mtiririko wa darasani"),
      slugs: ["attendance", "tests-and-scores", "reports"],
    },
    {
      id: "reference",
      title: localized("Reference", "Rejea"),
      slugs: [
        "profile-settings",
        "why-choose",
        "privacy-security",
        "troubleshooting",
        "faq",
      ],
    },
  ],
  pages: [
    {
      slug: "overview",
      title: localized("Overview", "Muhtasari"),
      description: localized(
        "What ShuleBomba is, who it is for and why teachers use it.",
        "ShuleBomba ni nini, ni kwa ajili ya nani na kwa nini walimu wanaikitumia.",
      ),
      topics: localizedList(
        [
          "ShuleBomba is an Android-first class management app for primary and secondary school teachers.",
          "One teacher can manage multiple classes, each with its own students, subjects, tests and attendance records.",
          "Daily work is offline-first: register students, take roll call, record marks and review saved records without a network connection.",
          "Internet is only needed to install or update the app and for uploading, viewing or syncing records.",
          "The app is designed around classroom reality: fast entry, clear records and minimal setup.",
        ],
        [
          "ShuleBomba ni programu ya usimamizi wa darasa inayotumia Android kwanza, kwa walimu wa shule za msingi na sekondari.",
          "Mwalimu mmoja anaweza kusimamia madarasa mengi, kila moja ikiwa na wanafunzi, masomo, mitihani na rekodi za mahudhurio.",
          "Kazi ya kila siku hufanya kazi bila mtandao: sajili wanafunzi, chukua roll call, weka alama na angalia rekodi bila intaneti.",
          "Mtandao unahitajika tu kusakinisha au kusasisha programu na kupakia, kutazama au kusawazisha rekodi.",
          "Programu imeundwa kwa hali halisi ya darasa: kuingiza data haraka, rekodi wazi na usanidi mdogo.",
        ],
      ),
      links: [
        {
          label: localized(
            "Get ShuleBomba on Google Play",
            "Pata ShuleBomba kwenye Google Play",
          ),
          url: "https://play.google.com/store/apps/details?id=app.ShuleBomba.com&hl=en",
        },
      ],
    },
    {
      slug: "getting-started",
      title: localized("Getting started", "Kuanza kutumia"),
      description: localized(
        "Install from Google Play and set up your school, profile and first class.",
        "Sakinisha kutoka Google Play na sanidi shule, wasifu na darasa lako la kwanza.",
      ),
      topics: localizedList(
        [
          "Install ShuleBomba from Google Play on an Android phone, or open the web build for a limited preview.",
          "Open the app and go to Settings → My Profile to add your username, school name and optional profile picture.",
          "From Home, tap Add Your First Class and give the class a clear name such as Form 3 A.",
          "Open the class, choose Add Student, then enter each learner's full name, registration number and sex.",
          "In Settings → Manage Classes, add subjects for the class before recording test scores.",
          "You are ready to take attendance; saved records can be exported as PDF, Excel or Word.",
        ],
        [
          "Sakinisha ShuleBomba kutoka Google Play kwenye simu ya Android, au fungua toleo la wavuti kwa muonekano mdogo.",
          "Fungua programu na nenda Mipangilio → Wasifu Wangu ili kuongeza jina lako, jina la shule na picha ya hiari.",
          "Kutoka Nyumbani, gonga Ongeza Darasa Lako la Kwanza na liite kwa jina wazi kama Form 3 A.",
          "Fungua darasa, chagua Ongeza Mwanafunzi, kisha weka jina kamili, namba ya usajili na jinsia ya kila mwanafunzi.",
          "Kwenye Mipangilio → Simamia Madarasa, ongeza masomo ya darasa kabla ya kuweka alama za mitihani.",
          "Uko tayari kuchukua mahudhurio; rekodi zilizohifadhiwa zinaweza kutolewa kama PDF, Excel au Word.",
        ],
      ),
      links: [
        {
          label: localized(
            "Download from Google Play",
            "Pakua kutoka Google Play",
          ),
          url: "https://play.google.com/store/apps/details?id=app.ShuleBomba.com&hl=en",
        },
      ],
    },
    {
      slug: "how-to-use",
      title: localized("How to use ShuleBomba", "Jinsi ya kutumia ShuleBomba"),
      description: localized(
        "The daily workflow from class selection to saved records and reports.",
        "Mtiririko wa kila siku kutoka kuchagua darasa hadi rekodi zilizohifadhiwa na ripoti.",
      ),
      topics: localizedList(
        [
          "Open Home and select a class to see its student count and quick actions.",
          "Use Add Student, Attendance, Add Test and Test Scores from the class screen.",
          "Edit or delete students from the class roster; deleting a student also removes that student's attendance records.",
          "Use Settings → Manage Classes to rename classes, add subjects, rename subjects or remove a class.",
          "Use the theme control in App Preference to switch between light, dark and system appearance.",
          "Share or rate the app from Settings when you want to recommend it to another teacher.",
        ],
        [
          "Fungua Nyumbani na uchague darasa ili kuona idadi ya wanafunzi na vitendo vya haraka.",
          "Tumia Ongeza Mwanafunzi, Mahudhurio, Ongeza Mtihani na Alama za Mtihani kutoka skrini ya darasa.",
          "Hariri au futa wanafunzi kutoka orodha ya darasa; kufuta mwanafunzi pia huondoa rekodi zake za mahudhurio.",
          "Tumia Mipangilio → Simamia Madarasa kubadilisha jina la darasa, kuongeza masomo, kubadilisha jina la somo au kufuta darasa.",
          "Tumia kidhibiti cha mandhari kwenye Mapendeleo ya Programu kubadilisha mwanga, giza au mfumo.",
          "Shiriki au kadiria programu kutoka Mipangilio unapotaka kuipendekeza kwa mwalimu mwingine.",
        ],
      ),
    },
    {
      slug: "attendance",
      title: localized(
        "Attendance and saved roll calls",
        "Mahudhurio na roll call zilizohifadhiwa",
      ),
      description: localized(
        "Take daily roll call, save it and review records by class and date.",
        "Chukua roll call ya kila siku, ihifadhi na uitazame kwa darasa na tarehe.",
      ),
      topics: localizedList(
        [
          "Open a class and tap Attendance, then pick or confirm the date.",
          "For each learner choose Present, Absent or Sick; review the table before saving.",
          "Tap Save Attendance and confirm the prompt. Saved entries are locked in the app, so check carefully first.",
          "Open Saved Rollcall to browse dates with attendance for the selected class.",
          "The date list shows counts for present, absent and sick learners, and you can select a saved date to inspect the full row.",
          "Use the class screen to fix roster problems before taking a new roll call.",
        ],
        [
          "Fungua darasa na gonga Mahudhurio, kisha chagua au thibitisha tarehe.",
          "Kwa kila mwanafunzi chagua Aliyepo, Hayupo au Ameugua; angalia jedwali kabla ya kuhifadhi.",
          "Gonga Hifadhi Mahudhurio na uthibitishe ujumbe. Rekodi zilizohifadhiwa zimefungwa kwenye programu, hivyo angalia kwa makini kwanza.",
          "Fungua Rollcall Iliyohifadhiwa kuona tarehe zilizo na mahudhurio kwa darasa lililochaguliwa.",
          "Orodha ya tarehe inaonyesha idadi ya waliohudhuria, wasiohudhuria na walio ugua, na unaweza kuchagua tarehe iliyohifadhiwa kuona safu kamili.",
          "Tumia skrini ya darasa kurekebisha matatizo ya orodha kabla ya kuchukua roll call mpya.",
        ],
      ),
    },
    {
      slug: "tests-and-scores",
      title: localized("Tests and scores", "Mitihani na alama"),
      description: localized(
        "Create subjects, record marks and review scores across a class.",
        "Unda masomo, weka alama na angalia alama za darasa lote.",
      ),
      topics: localizedList(
        [
          "Add subjects under Settings → Manage Classes so tests can be grouped by subject.",
          "From a class, tap Add Test, choose a test name and subject, then enter a mark for each learner.",
          "Save the test to append it to the class; a class can hold any number of tests.",
          "Open Test Scores to review a table of learners and tests, and filter by subject.",
          "Use the menu on a test to edit its name, subject or marks without creating a duplicate.",
          "Export attendance reports separately from the class quick actions; test records remain with the class.",
        ],
        [
          "Ongeza masomo chini ya Mipangilio → Simamia Madarasa ili mitihani ipangwe kwa somo.",
          "Kutoka darasa, gonga Ongeza Mtihani, chagua jina la mtihani na somo, kisha weka alama kwa kila mwanafunzi.",
          "Hifadhi mtihani ili uongeze kwenye darasa; darasa linaweza kuwa na mitihani mingi.",
          "Fungua Alama za Mtihani kuona jedwali la wanafunzi na mitihani, na kuchuja kwa somo.",
          "Tumia menyu kwenye mtihani kuhariri jina, somo au alama bila kuunda nakala mpya.",
          "Tolea ripoti za mahudhurio kando kutoka vitendo vya haraka vya darasa; rekodi za mitihani zinabaki na darasa.",
        ],
      ),
    },
    {
      slug: "reports",
      title: localized("Reports and exports", "Ripoti na uhamishaji wa data"),
      description: localized(
        "Export saved attendance for a class and a date range.",
        "Toa mahudhurio yaliyohifadhiwa kwa darasa na kipindi maalum.",
      ),
      topics: localizedList(
        [
          "Open the Export screen from the class workflow and choose the class to export.",
          "Select a date range; the default is the last 30 days including today.",
          "Check the saved-record count shown for the range before exporting.",
          "Choose PDF for a print-ready report, Excel for a spreadsheet with per-date columns, or Word for an editable document.",
          "If the range has no saved attendance, choose another class or widen the date range.",
          "Generated files include the school name from your profile and the selected reporting period.",
        ],
        [
          "Fungua skrini ya Uhamishaji kutoka mtiririko wa darasa na uchague darasa la kuhamisha.",
          "Chagua kipindi cha tarehe; chaguo-msingi ni siku 30 zilizopita pamoja na leo.",
          "Angalia idadi ya rekodi zilizohifadhiwa inayoonyeshwa kwa kipindi kabla ya kuhamisha.",
          "Chagua PDF kwa ripoti ya kuchapisha, Excel kwa jedwali lenye safu kwa kila tarehe, au Word kwa hati inayoweza kuhaririwa.",
          "Ikiwa hakuna mahudhurio yaliyohifadhiwa kwenye kipindi, chagua darasa lingine au panua kipindi.",
          "Faili zinazotolewa zinajumuisha jina la shule kutoka wasifu wako na kipindi kilichochaguliwa.",
        ],
      ),
    },
    {
      slug: "profile-settings",
      title: localized("Profile and settings", "Wasifu na mipangilio"),
      description: localized(
        "Manage your teacher profile, class list, app appearance and app store actions from Settings.",
        "Simamia wasifu wako wa mwalimu, orodha ya madarasa, muonekano wa programu na vitendo vya duka kutoka Mipangilio.",
      ),
      topics: localizedList(
        [
          "Open Settings → My Profile to update your username, school name and profile picture.",
          "The school name you save here appears on exported PDF, Excel and Word reports.",
          "Use Settings → Manage Classes to rename classes, add or rename subjects and remove a class you no longer teach.",
          "Open App Preference to choose a light, dark or system theme for the app appearance.",
          "Use Settings to share the app with another teacher or rate it on Google Play.",
          "Profile and class changes are stored locally with AsyncStorage on the device.",
        ],
        [
          "Fungua Mipangilio → Wasifu Wangu kusasisha jina lako, jina la shule na picha ya wasifu.",
          "Jina la shule unaloweka hapa linaonekana kwenye ripoti za PDF, Excel na Word zinazotolewa.",
          "Tumia Mipangilio → Simamia Madarasa kubadilisha jina la darasa, kuongeza au kubadilisha jina la somo na kufuta darasa usilofundisha tena.",
          "Fungua Mapendeleo ya Programu kuchagua mandhari ya mwanga, giza au kufuata mfumo.",
          "Tumia Mipangilio kushiriki programu na mwalimu mwingine au kuikadiria kwenye Google Play.",
          "Mabadiliko ya wasifu na madarasa yamehifadhiwa kwenye kifaa kwa kutumia AsyncStorage.",
        ],
      ),
      links: [
        {
          label: localized(
            "Get ShuleBomba on Google Play",
            "Pata ShuleBomba kwenye Google Play",
          ),
          url: "https://play.google.com/store/apps/details?id=app.ShuleBomba.com&hl=en",
        },
      ],
    },
    {
      slug: "why-choose",
      title: localized("Why choose ShuleBomba", "Kwa nini uchague ShuleBomba"),
      description: localized(
        "The practical reasons teachers choose this class management app.",
        "Sababu za vitendo zinazowafanya walimu wachague programu hii ya usimamizi wa darasa.",
      ),
      topics: localizedList(
        [
          "Teacher-focused: built around attendance, tests and class records instead of generic office work.",
          "Simple and intuitive: no training programme is needed to start taking roll call.",
          "Fast and reliable: mark a whole class present, absent or sick in seconds.",
          "Offline-first: classroom work continues during network outages and in areas with expensive data.",
          "Multi-class ready: one teacher can keep several classes separate but accessible in one place.",
          "Private by design: learner records stay on the device unless you choose to upload or sync them.",
        ],
        [
          "Inayolenga mwalimu: imejengwa kwa mahudhurio, mitihani na rekodi za darasa badala ya kazi za ofisi za jumla.",
          "Rahisi na inayoeleweka: huhitaji mafunzo ili kuanza kuchukua roll call.",
          "Haraka na ya kuaminika: weka darasa lote kama liko, halipo au limeugua katika sekunde chache.",
          "Kwanza-nje-ya-mtandao: kazi ya darasa inaendelea wakati mtandao umezima au data ni ghali.",
          "Inayatuma madarasa mengi: mwalimu mmoja anaweza kuweka madarasa kadhaa tofauti lakini yanayopatikana mahali pamoja.",
          "Inayotunza faragha: rekodi za wanafunzi zinabaki kwenye kifaa isipokuwa utakaza kupakia au kusawazisha.",
        ],
      ),
    },
    {
      slug: "privacy-security",
      title: localized("Privacy and security", "Faragha na usalama"),
      description: localized(
        "Where ShuleBomba stores data and how saved attendance is protected.",
        "ShuleBomba inahifadhiwaje data na jinsi mahudhurio yaliyohifadhiwa yanavyolindwa.",
      ),
      topics: localizedList(
        [
          "Teacher profiles, classes, learners and attendance are stored locally on the device using AsyncStorage.",
          "The app states that it does not share information with third parties; uploading or syncing is a separate action you initiate.",
          "Saved roll calls are locked from further editing in the app, which protects the daily attendance record.",
          "Use your device screen lock and keep the app updated to protect access to the phone itself.",
          "Deleting a class or account removes local data, so export reports first if you need a copy.",
          "Internet access is not required for daily class management, which reduces exposure and data costs.",
        ],
        [
          "Wasifu wa mwalimu, madarasa, wanafunzi na mahudhurio vinahifadhiwa kwenye kifaa kwa kutumia AsyncStorage.",
          "Programu inasema haishiriki taarifa na wahusika wengine; kupakia au kusawazisha ni kitendo tofauti unachofanya wewe.",
          "Roll call zilizohifadhiwa zimefungwa kusiweze kuhaririwa tena kwenye programu, hivyo zinalinda rekodi ya kila siku.",
          "Tumia kifungo cha skrini cha kifaa chako na endelea kusasisha programu ili kulinda ufikiaji wa simu yenyewe.",
          "Kufuta darasa au akaunti huondoa data ya eneo, hivyo toa ripoti kwanza ukihitaji nakala.",
          "Mtandao hauhitajiki kwa usimamizi wa darasa la kila siku, hivyo hupunguza hatari na gharama za data.",
        ],
      ),
      links: [
        {
          label: localized(
            "Read the platform security policy",
            "Soma sera ya usalama ya jukwaa",
          ),
          url: "https://gbrain.tech/security",
        },
      ],
    },
    {
      slug: "troubleshooting",
      title: localized("Troubleshooting", "Kutatua matatizo"),
      description: localized(
        "Common problems with attendance, scores, exports and offline data, and what to check first.",
        "Matatizo ya kawaida na mahudhurio, alama, uhamishaji wa data na data ya nje ya mtandao, na yakuangalia kwanza.",
      ),
      topics: localizedList(
        [
          "If a learner is missing from roll call, add or restore the name on the class roster before saving a new entry.",
          "A saved roll call cannot be edited; if a date was recorded incorrectly, keep the saved record and take a new roll call for the correct date.",
          "If a test is missing from Test Scores, confirm its subject was added under Settings → Manage Classes and that the test was saved.",
          "When an export shows zero records, widen the date range or confirm you selected the class with saved attendance.",
          "If the app appears to lose data, check that you have not deleted the class or account; local data uses AsyncStorage and deleting removes it.",
          "Daily work does not need internet; if install, update, upload or sync fails, check connectivity and update the app from Google Play.",
        ],
        [
          "Ikiwa mwanafunzi hayupo kwenye roll call, ongeza au rudisha jina kwenye orodha ya darasa kabla ya kuhifadhi rekodi mpya.",
          "Roll call iliyohifadhiwa haiwezi kuhaririwa; ikiwa tarehe ilirekodiwa vibaya, ihifadhi rekodi iliyopo na uchukue roll call mpya kwa tarehe sahihi.",
          "Ikiwa mtihani haupo kwenye Alama za Mtihani, thibitisha somo lake liliongezwa kwenye Mipangilio → Simamia Madarasa na kwamba mtihani ulihifadhiwa.",
          "Uhamishaji unapoonyesha rekodi sifuri, panua kipindi cha tarehe au thibitisha kuwa umechagua darasa lenye mahudhurio yaliyohifadhiwa.",
          "Programu ikionekana kupoteza data, angalia kuwa hukufuta darasa au akaunti; data ya eneo hutumia AsyncStorage na kufuta huiondoa.",
          "Kazi ya kila siku haihitaji intaneti; ikiwa usakinishaji, usasishaji, upakiaji au usawazishaji unashindwa, angalia mtandao na sasisha programu kutoka Google Play.",
        ],
      ),
      links: [
        {
          label: localized(
            "Get ShuleBomba on Google Play",
            "Pata ShuleBomba kwenye Google Play",
          ),
          url: "https://play.google.com/store/apps/details?id=app.ShuleBomba.com&hl=en",
        },
      ],
    },
    {
      slug: "faq",
      title: localized(
        "Frequently asked questions",
        "Maswali yanayoulizwa mara kwa mara",
      ),
      description: localized(
        "Short answers about offline use, data storage, attendance edits, exports and where to get the app.",
        "Majibu mafupi kuhusu matumizi bila mtandao, uhifadhi wa data, uhariri wa mahudhurio, uhamishaji na mahali pa kupata programu.",
      ),
      topics: localizedList(
        [
          "Does ShuleBomba need internet? No. Daily class work is offline-first; internet is used for install, updates, uploading, viewing or syncing records.",
          "Where is my data stored? Teacher profiles, classes, learners, attendance and test scores are stored locally on the device with AsyncStorage.",
          "Can I fix a roll call after saving it? No. Saved roll calls are locked from editing, so review the table before you save.",
          "Can I manage more than one class? Yes. Each class keeps its own students, subjects, tests and attendance, and you switch classes from Home.",
          "Can I change how the app looks? Yes. App Preference offers light, dark and system themes.",
          "How do I share or rate the app? Use the share and rate options in Settings, or open the Google Play listing.",
        ],
        [
          "Je, ShuleBomba inahitaji intaneti? Hapana. Kazi ya darasa ya kila siku hufanya kazi bila mtandao; intaneti hutumiwa kusakinisha, kusasisha, kupakia, kutazama au kusawazisha rekodi.",
          "Data yangu imehifadhiwa wapi? Wasifu wa mwalimu, madarasa, wanafunzi, mahudhurio na alama vimehifadhiwa kwenye kifaa kwa kutumia AsyncStorage.",
          "Je, ninaweza kurekebisha roll call baada ya kuhifadhi? Hapana. Roll call zilizohifadhiwa zimefungwa kusiweze kuhaririwa, hivyo angalia jedwali kabla ya kuhifadhi.",
          "Je, ninaweza kusimamia zaidi ya darasa moja? Ndio. Kila darasa lina wanafunzi, masomo, mitihani na mahudhurio vyake, nao hubadilisha madarasa kutoka Nyumbani.",
          "Je, ninaweza kubadilisha muonekano wa programu? Ndio. Mapendeleo ya Programu yana mandhari ya mwanga, giza na kufuata mfumo.",
          "Ninawezaje kushiriki au kukadiria programu? Tumia chaguo za kushiriki na kukadiria kwenye Mipangilio, au fungua ukurasa wa Google Play.",
        ],
      ),
      links: [
        {
          label: localized(
            "Get ShuleBomba on Google Play",
            "Pata ShuleBomba kwenye Google Play",
          ),
          url: "https://play.google.com/store/apps/details?id=app.ShuleBomba.com&hl=en",
        },
      ],
    },
  ],
  details: {
    overview: {
      intro: localized(
        "ShuleBomba is an Android-first class management app for teachers. It keeps classes, learners, attendance and test scores on the device, ready even without internet.",
        "ShuleBomba ni programu ya usimamizi wa darasa inayotumia Android kwanza, kwa walimu. Mihifadhi madarasa, wanafunzi, mahudhurio na alama kwenye kifaa, hata bila intaneti.",
      ),
      prerequisites: localizedList(
        [
          "An Android phone",
          "A Google Play account for installation",
          "Your class list and learner names",
        ],
        [
          "Simu ya Android",
          "Akaunti ya Google Play kwa usakinishaji",
          "Orodha ya darasa na majina ya wanafunzi",
        ],
      ),
      callout: callout(
        "info",
        "Built for the classroom",
        "Daily work is offline. Internet is only needed to install or update the app, or when you choose to upload or sync records.",
        "Imejengwa kwa darasani",
        "Kazi ya kila siku hufanyika bila mtandao. Intaneti inahitajika tu kusakinisha, kusasisha, kupakia au kusawazisha.",
      ),
      image: image(
        "Class home",
        "Teacher home screen with class cards",
        "Nyumbani ya darasa",
        "Skrini ya mwalimu yenye kadi za madarasa",
      ),
    },
    "getting-started": {
      intro: localized(
        "Install from Google Play, add your profile and create the first class. A few minutes of setup is enough to start taking roll call.",
        "Sakinisha kutoka Google Play, ongeza wasifu wako na unda darasa la kwanza. Usanidi wa dakika chache unatosha kuanza kuchukua mahudhurio.",
      ),
      callout: callout(
        "tip",
        "Name classes clearly",
        "Use names such as Form 3 A or Grade 5 B so reports and exports are easy to recognise later.",
        "Pa madarasa majina wazi",
        "Tumia majina kama Form 3 A au Grade 5 B ili ripoti na uhamishaji wa data vitambulike baadaye.",
      ),
      image: image(
        "First class setup",
        "Profile form and Add Class dialog",
        "Usanidi wa darasa la kwanza",
        "Fomu ya wasifu na dirisha la kuongeza darasa",
      ),
    },
    "how-to-use": {
      intro: localized(
        "The daily loop is simple: open a class, add learners, take attendance, record a test and review the saved records whenever you need them.",
        "Mzunguko wa kila siku ni rahisi: fungua darasa, ongeza wanafunzi, chukua mahudhurio, weka mtihani na angalia rekodi zilizohifadhiwa.",
      ),
      callout: callout(
        "info",
        "Records stay with the class",
        "Attendance and tests belong to the class you opened. Switch classes from Home if you teach more than one.",
        "Rekodi zinabaki na darasa",
        "Mahudhurio na mitihani ni ya darasa ulilofungua. Badilisha madarasa kutoka Nyumbani ikiwa unafundisha zaidi ya moja.",
      ),
      image: image(
        "Class workflow",
        "Quick actions on a class screen",
        "Mtiririko wa darasa",
        "Vitendo vya haraka kwenye skrini ya darasa",
      ),
    },
    attendance: {
      intro: localized(
        "Mark a whole class present, absent or sick in seconds, then save the roll call. Saved entries are locked so the daily record stays reliable.",
        "Weka darasa lote kama liko, halipo au limeugua katika sekunde chache, kisha hifadhi roll call. Rekodi zilizohifadhiwa zimefungwa.",
      ),
      callout: callout(
        "warning",
        "Check before saving",
        "Saved roll calls cannot be edited in the app. Review the table carefully and fix the class roster first if a name is missing.",
        "Angalia kabla ya kuhifadhi",
        "Roll call zilizohifadhiwa haziwezi kuhaririwa kwenye programu. Angalia jedwali kwa makini kabla ya kuhifadhi.",
      ),
      image: image(
        "Attendance sheet",
        "Present, absent and sick controls per learner",
        "Laha ya mahudhurio",
        "Vidhibiti vya aliyepo, hayupo na ameugua",
      ),
    },
    "tests-and-scores": {
      intro: localized(
        "Add subjects once, then attach any number of tests to a class. The score table gives a quick view of every learner across every subject.",
        "Ongeza masomo mara moja, kisha unganisha mitihani mingi na darasa. Jedwali la alama hutoa muonekano wa haraka wa kila mwanafunzi.",
      ),
      callout: callout(
        "tip",
        "Edit instead of duplicating",
        "Use the test menu to rename a test or correct marks. Creating a second test with the same name makes reports confusing.",
        "Hariri badala ya kuunda nakala",
        "Tumia menyu ya mtihani kubadilisha jina au kurekebisha alama. Kuunda mtihani mwingine wenye jina lile huchanganya ripoti.",
      ),
      image: image(
        "Score table",
        "Learners by row and tests by column",
        "Jedwali la alama",
        "Wanafunzi kwa safu na mitihani kwa nguzo",
      ),
    },
    reports: {
      intro: localized(
        "Export saved attendance for a class and a date range as PDF, Excel or Word. Reports include the school name from your profile.",
        "Toa mahudhurio yaliyohifadhiwa kwa darasa na kipindi kama PDF, Excel au Word. Ripoti zinajumuisha jina la shule kutoka wasifu wako.",
      ),
      callout: callout(
        "info",
        "Nothing to export?",
        "If the range shows zero saved records, widen the dates or choose the class whose attendance you actually saved.",
        "Hakuna cha kutoa?",
        "Ikiwa kipindi kinaonyesha rekodi sifuri, panua tarehe au chagua darasa ulilohifadhi mahudhurio yake.",
      ),
      image: image(
        "Export options",
        "Date range picker and format selection",
        "Chaguo za uhamishaji",
        "Kichaguzi cha tarehe na muundo wa faili",
      ),
    },
    "profile-settings": {
      intro: localized(
        "Settings is where you keep your teacher identity and class structure up to date. The school name and theme you choose here affect reports and the whole app experience.",
        "Mipangilio ndipo unakosasa utambulisho wako wa mwalimu na muundo wa madarasa. Jina la shule na mandhari unayochagua hapa zinaathiri ripoti na matumizi yote ya programu.",
      ),
      prerequisites: localizedList(
        [
          "A profile created during first-time setup",
          "At least one class in the app",
        ],
        [
          "Wasifu ulioumbwa wakati wa usanidi wa kwanza",
          "Angalau darasa moja kwenye programu",
        ],
      ),
      callout: callout(
        "tip",
        "Reports use your saved school name",
        "Update My Profile before exporting attendance if the school name changed, so PDF, Excel and Word files carry the correct header.",
        "Ripoti hutumia jina la shule ulilohifadhi",
        "Sasisha Wasifu Wangu kabla ya kutoa mahudhurio ikiwa jina la shule limebadilika, ili faili za PDF, Excel na Word ziwe na kichwa sahihi.",
      ),
      image: image(
        "Settings screen",
        "Profile, Manage Classes and App Preference options",
        "Skrini ya mipangilio",
        "Wasifu, Simamia Madarasa na Mapendeleo ya Programu",
      ),
    },
    "why-choose": {
      intro: localized(
        "Teachers choose ShuleBomba because it focuses on attendance, tests and class records instead of generic office tools.",
        "Walimu huchagua ShuleBomba kwa sababu inazingatia mahudhurio, mitihani na rekodi za darasa badala ya zana za ofisi za jumla.",
      ),
      callout: callout(
        "tip",
        "No training programme needed",
        "The screens follow the way a teacher actually works, so a new user can take roll call on the first day.",
        "Hakuna mafunzo maalum yanayohitajika",
        "Skrini zinafuata jinsi mwalimu anavyofanya kazi, hivyo mtumiaji mpya anaweza kuchukua mahudhurio siku ya kwanza.",
      ),
      image: image(
        "Teacher workflow",
        "Fast roll call and clear class records",
        "Mtiririko wa mwalimu",
        "Mahudhurio ya haraka na rekodi wazi za darasa",
      ),
    },
    "privacy-security": {
      intro: localized(
        "Teacher profiles, classes, learners and attendance live locally on the device. Uploading or syncing is a separate action you start yourself.",
        "Wasifu wa mwalimu, madarasa, wanafunzi na mahudhurio vinabaki kwenye kifaa. Kupakia au kusawazisha ni kitendo tofauti unachoanza wewe.",
      ),
      callout: callout(
        "warning",
        "Export before deleting",
        "Deleting a class or account removes local data. Export any reports you need to keep before you delete anything.",
        "Toa ripoti kabla ya kufuta",
        "Kufuta darasa au akaunti huondoa data ya eneo. Toa ripoti unazotaka kuhifadhi kabla ya kufuta chochote.",
      ),
      image: image(
        "Local data",
        "On-device storage and locked roll calls",
        "Data ya eneo",
        "Hifadhi ya kifaa na roll call zilizofungwa",
      ),
    },
    troubleshooting: {
      intro: localized(
        "Most ShuleBomba problems come from three places: the class roster, the saved-record rules and the export date range. Work through these checks in order before looking for anything more complex.",
        "Matatizo mengi ya ShuleBomba hutokana na sehemu tatu: orodha ya darasa, sheria za rekodi zilizohifadhiwa na kipindi cha tarehe za uhamishaji. Angalia hizi kwa mpangilio kabla ya kutafuta kitu kingine.",
      ),
      prerequisites: localizedList(
        [
          "The class and date you are investigating",
          "A recent version of the app from Google Play",
        ],
        [
          "Darasa na tarehe unayochunguza",
          "Toleo la hivi karibuni la programu kutoka Google Play",
        ],
      ),
      callout: callout(
        "warning",
        "Saved roll calls are final",
        "The app locks saved roll calls from editing. Do not delete a class to correct one entry; that also removes the rest of that class's local data.",
        "Roll call zilizohifadhiwa ni za mwisho",
        "Programu hufunga roll call zilizohifadhiwa kusiweze kuhaririwa. Usifute darasa ili kurekebisha rekodi moja; hiyo pia huondoa data yote ya eneo ya darasa hilo.",
      ),
      image: image(
        "Troubleshooting checklist",
        "Roster, saved records and export range checks",
        "Orodha ya kutatua matatizo",
        "Ukaguzi wa orodha, rekodi zilizohifadhiwa na kipindi cha uhamishaji",
      ),
    },
    faq: {
      intro: localized(
        "A quick reference for the questions teachers ask most, from offline use and local storage to saved records and export formats.",
        "Rejea ya haraka kwa maswali yanayoulizwa na walimu mara nyingi, kutoka matumizi bila mtandao na uhifadhi wa eneo hadi rekodi zilizohifadhiwa na muundo wa uhamishaji.",
      ),
      callout: callout(
        "info",
        "Records stay on your device",
        "ShuleBomba states that it does not share information with third parties. Uploading or syncing is a separate action you choose to start.",
        "Rekodi zinabaki kwenye kifaa chako",
        "ShuleBomba inasema haishiriki taarifa na wahusika wengine. Kupakia au kusawazisha ni kitendo tofauti unachochagua kuanza.",
      ),
      image: image(
        "FAQ overview",
        "Common questions grouped by topic",
        "Muhtasari wa maswali",
        "Maswali ya kawaida yaliyopangwa kwa mada",
      ),
    },
  },
};
