import mongoose from 'mongoose';
import KeuzeModuleModel from '../infrastructure/persistence/mongoose/models/keuzemodule.model';
import { config } from '../config';

async function seed() {
  console.log('[seed] starting');
  console.log('[seed] DB URI (first 80 chars):', String(config.db?.uri ?? '').slice(0, 80));

  const force = process.argv.includes('--force');
  console.log('[seed] force mode:', force);

  await mongoose.connect(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true } as any);
  console.log('[seed] connected to db');

  const samples = [
    {
      name: 'Web Development',
      shortdescription: 'Front-end en back-end ontwikkeling met moderne webtechnologieën',
      description: 'Leer HTML, CSS, JavaScript, React en Node.js. Focus op full-stack projecten en deployment.',
      content: 'HTML, CSS, JavaScript, React, Node/Express, MongoDB, deployment.',
      studycredit: 6,
      location: 'Breda',
      level: 'Bachelor',
      learningoutcomes: 'Student kan interactieve webapplicaties bouwen en deployen.',
      tags: ['frontend','backend','javascript','react'],
      translations: {
        nl: {
          name: 'Web Development',
          shortdescription: 'Front-end en back-end ontwikkeling met moderne webtechnologieën',
          description: 'In deze module leren studenten hoe moderne websites en webapplicaties worden opgebouwd van front-end tot back-end. Ze verdiepen zich in HTML, CSS, JavaScript en frameworks zoals React, waarmee ze interactieve gebruikersinterfaces ontwikkelen. Daarnaast leren ze werken met Node.js en Express voor de serverzijde, inclusief het bouwen van RESTful API’s en het opslaan van data in MongoDB. Er wordt aandacht besteed aan versiebeheer met Git, debugging, en het deployen van applicaties naar de cloud. Studenten werken aan een full-stack project waarin design, logica en data samenkomen. Na afloop begrijpen ze hoe alle onderdelen van een moderne webapplicatie samenwerken, en zijn ze in staat zelfstandig een complete weboplossing te realiseren van idee tot publicatie.',
          content: 'HTML, CSS, JavaScript, React, Node/Express, MongoDB, deployment.',
          learningoutcomes: 'Student kan interactieve webapplicaties bouwen en deployen.',
        },
        en: {
          name: 'Web Development',
          shortdescription: 'Front-end and back-end development with modern web technologies',
          description: 'In this module, students learn how modern websites and web applications are built from front-end to back-end. They explore HTML, CSS, and JavaScript along with frameworks such as React to create interactive user interfaces. On the server side, students use Node.js and Express to build RESTful APIs and work with MongoDB for data storage. The module also covers Git version control, debugging, and cloud deployment. Through a full-stack project, students combine design, logic, and data into a functional product. By the end of the module, they understand how all layers of a web application connect and can independently develop and deploy complete web solutions from concept to publication.',
          content: 'HTML, CSS, JavaScript, React, Node/Express, MongoDB, deployment.',
          learningoutcomes: 'Student can build and deploy interactive web applications.',
        }
      }

    },
    {
      name: 'Data Science',
      shortdescription: 'Data-analyse, statistiek en machine learning in praktijk',
      description: 'In deze module leren studenten data verzamelen, analyseren en interpreteren met behulp van Python en bijbehorende libraries. Ze maken kennis met statistische concepten en bouwen eenvoudige machine learning-modellen. Naast de technische vaardigheden ligt de nadruk op het vertalen van data naar waardevolle inzichten en het communiceren van resultaten naar niet-technische stakeholders.',
      content: 'Modules: Python, Pandas, NumPy, Matplotlib, Scikit-learn, basis statistiek, datavisualisatie, mini-project met bedrijfsdataset.',
      studycredit: 6,
      location: 'Den Bosch',
      level: 'Bachelor',
      learningoutcomes: 'Student kan datasets analyseren, patronen herkennen, ML-modellen trainen en resultaten op begrijpelijke wijze presenteren.',
      tags: ['data','python','ml','statistics'],
      translations: {
        nl: {
          name: 'Data Science',
          shortdescription: 'Data-analyse, statistiek en machine learning in praktijk',
          description: 'In deze module ontdekken studenten de kracht van data en leren ze hoe ze met Python en bibliotheken zoals Pandas, NumPy en Scikit-learn data kunnen verzamelen, analyseren en interpreteren. Ze ontwikkelen inzicht in statistische principes, datavisualisatie en dataverwerking. Vervolgens leren ze machine learning-modellen trainen en toepassen op realistische datasets. Er wordt gewerkt aan kleine projecten waarbij studenten de volledige data science-cyclus doorlopen: van ruwe data tot concrete inzichten. Ook is er aandacht voor ethiek en dataverantwoordelijkheid, zoals privacy en bias. Aan het einde van de module kunnen studenten data-gedreven beslissingen ondersteunen, complexe informatie begrijpelijk communiceren en zien ze hoe data wetenschap bedrijven en samenlevingen vormgeeft.',
          content: 'Modules: Python, Pandas, NumPy, Matplotlib, Scikit-learn, statistiek, datavisualisatie, mini-project.',
          learningoutcomes: 'Student kan datasets analyseren, patronen herkennen, ML-modellen trainen en resultaten presenteren.',
        },
        en: {
          name: 'Data Science',
          shortdescription: 'Data analysis, statistics and machine learning in practice',
          description: 'This module introduces students to the power of data and teaches them how to collect, analyze, and interpret data using Python and libraries such as Pandas, NumPy, and Scikit-learn. Students gain a deep understanding of statistical principles, data visualization, and processing. They learn to train and evaluate machine learning models and apply them to real-world datasets. Through hands-on projects, students experience the full data science cycle — from raw data to actionable insights. Ethical aspects of data use, including privacy and bias, are also discussed. By the end, students are capable of supporting data-driven decision-making, communicating complex information clearly, and understanding how data science shapes industries and societies.',
          content: 'Modules: Python, Pandas, NumPy, Matplotlib, Scikit-learn, statistics, visualization, mini-project.',
          learningoutcomes: 'Student can analyze datasets, identify patterns, train ML models, and present results effectively.',
        }
      }

    },
    {
      name: 'Mobile App Development',
      shortdescription: 'Native en cross-platform mobiele apps bouwen',
      description: 'Deze module richt zich op het ontwikkelen van mobiele applicaties voor iOS en Android met behulp van cross-platform frameworks zoals React Native. Studenten leren werken met component-based UI, device functionaliteiten, API-integratie en app stores. Er is aandacht voor design patterns, performantie en gebruiksvriendelijkheid op kleine schermen.',
      content: 'Modules: React Native, Expo, offline opslag, push notifications, API-integratie, app deployment.',
      studycredit: 5,
      location: 'Breda',
      level: 'Bachelor',
      learningoutcomes: 'Student kan mobiele apps ontwerpen, bouwen, testen en publiceren met aandacht voor gebruikerservaring en technische kwaliteit.',
      tags: ['mobile','react-native','app'],
      translations: {
        nl: {
          name: 'Mobile App Development',
          shortdescription: 'Native en cross-platform mobiele apps bouwen',
          description: 'Deze module richt zich op het ontwikkelen van mobiele applicaties voor iOS en Android met behulp van cross-platform frameworks zoals React Native.',
          content: 'Modules: React Native, Expo, offline opslag, push notifications, API-integratie, app deployment.',
          learningoutcomes: 'Student kan mobiele apps ontwerpen, bouwen, testen en publiceren met aandacht voor gebruikerservaring en technische kwaliteit.',
        },
        en: {
          name: 'Mobile App Development',
          shortdescription: 'Building native and cross-platform mobile apps',
          description: 'This module focuses on developing mobile applications for iOS and Android using cross-platform frameworks such as React Native.',
          content: 'Modules: React Native, Expo, offline storage, push notifications, API integration, app deployment.',
          learningoutcomes: 'Student can design, build, test, and publish mobile apps with attention to user experience and technical quality.',
        }
      }
    },
    {
      name: 'AI & Ethics',
      shortdescription: 'AI-concepten en maatschappelijke/ethische implicaties',
      description: 'De opkomst van kunstmatige intelligentie brengt naast kansen ook ethische vraagstukken met zich mee. Studenten leren in deze module hoe AI-algoritmes werken en hoe biases, privacy en transparantie hierin een rol spelen.',
      content: 'Modules: AI-basics, bias-detectie, privacy-by-design, ethische kaders, case studies.',
      studycredit: 3,
      location: 'Den Bosch',
      level: 'Bachelor',
      learningoutcomes: 'Student kan ethische risico’s identificeren, analyseren en mitigeren binnen AI-toepassingen.',
      tags: ['ai','ethics','society'],
      translations: {
        nl: {
          name: 'Artificial Intelligence & Ethics',
          shortdescription: 'De kracht en verantwoordelijkheid van kunstmatige intelligentie',
          description: 'In deze module leren studenten wat kunstmatige intelligentie is, hoe het werkt en welke ethische vraagstukken daarbij komen kijken. Ze verkennen algoritmen voor machine learning, neurale netwerken en natuurlijke taalverwerking, maar ook de risico’s van AI, zoals bias, privacy en autonomie. Studenten ontwikkelen inzicht in hoe data en modellen beslissingen beïnvloeden en leren ethische kaders toepassen, zoals transparantie en verantwoordelijkheid. Via casestudy’s onderzoeken ze hoe AI wordt ingezet in de zorg, marketing of justitie, en wat de maatschappelijke impact daarvan is. Door praktijkgerichte opdrachten bouwen ze kleine AI-modellen en reflecteren ze kritisch op hun gebruik. Aan het einde begrijpen ze zowel de technische werking als de morele dimensie van kunstmatige intelligentie.',
          content: 'Machine learning, ethiek, bias, transparantie, NLP, neurale netwerken, casestudy’s.',
          learningoutcomes: 'Student kan AI-toepassingen ontwerpen en beoordelen met aandacht voor ethische aspecten.',
        },
        en: {
          name: 'Artificial Intelligence & Ethics',
          shortdescription: 'The power and responsibility of artificial intelligence',
          description: 'In this module, students learn what artificial intelligence is, how it works, and which ethical challenges it raises. They explore algorithms for machine learning, neural networks, and natural language processing, while also examining issues such as bias, privacy, and autonomy. Students gain insight into how data and models influence decision-making and learn to apply ethical frameworks focusing on transparency and accountability. Through case studies, they analyze the societal impact of AI in domains like healthcare, marketing, and justice. Practical exercises include building small AI models and reflecting critically on their implications. By the end, students understand both the technical mechanisms and the moral dimensions of artificial intelligence.',
          content: 'Machine learning, ethics, bias, transparency, NLP, neural networks, case studies.',
          learningoutcomes: 'Student can design and evaluate AI applications with attention to ethical implications.',
        }
      }

    },
    {
      name: 'UX Design en Prototyping',
      shortdescription: 'User research, prototyping en usability testing',
      description: 'Studenten leren hoe ze gebruikersbehoeften vertalen naar intuïtieve digitale interfaces met tools zoals Figma.',
      content: 'Modules: Research methods, wireframing, Figma, prototyping, usability testing, design thinking.',
      studycredit: 4,
      location: 'Breda',
      level: 'Bachelor',
      learningoutcomes: 'Student kan user flows ontwerpen, prototypes maken en valideren met gebruikersfeedback.',
      tags: ['design','ux','figma'],
      translations: {
        nl: {
          name: 'UX Design',
          shortdescription: 'Gebruiksvriendelijke interfaces ontwerpen vanuit de gebruiker',
          description: 'In deze module leren studenten digitale producten ontwerpen die intuïtief, aantrekkelijk en gebruiksvriendelijk zijn. Ze onderzoeken de principes van human-centered design en leren hoe onderzoek naar gebruikersbehoeften leidt tot betere ontwerpen. Met tools zoals Figma of Adobe XD maken studenten wireframes, prototypes en interactieve ontwerpen. Ze leren ook usability testen uitvoeren om te achterhalen hoe gebruikers een product ervaren. Daarnaast komt informatiearchitectuur, toegankelijkheid en visuele consistentie aan bod. Via praktijkopdrachten werken studenten aan een concreet ontwerp dat aansluit op een reële doelgroep. Na afloop begrijpen ze hoe ontwerpbeslissingen de gebruikerservaring beïnvloeden en kunnen ze digitale interfaces ontwerpen die effectief, esthetisch en empathisch zijn.',
          content: 'User research, wireframing, prototyping, usability testing, design systems, Figma/Adobe XD.',
          learningoutcomes: 'Student kan gebruiksvriendelijke interfaces ontwerpen op basis van onderzoek en testen.',
        },
        en: {
          name: 'UX Design',
          shortdescription: 'Designing user-friendly interfaces with a human-centered approach',
          description: 'This module teaches students how to design digital products that are intuitive, engaging, and user-friendly. They explore the principles of human-centered design and learn how user research can guide better design decisions. Using tools like Figma or Adobe XD, students create wireframes, prototypes, and interactive mockups. They also perform usability testing to evaluate how users interact with their designs. Topics include information architecture, accessibility, and visual consistency. Through hands-on assignments, students design a product tailored to a real target audience. By the end, they understand how design choices shape the user experience and can create digital interfaces that are both functional and empathetic.',
          content: 'User research, wireframing, prototyping, usability testing, design systems, Figma/Adobe XD.',
          learningoutcomes: 'Student can design user-friendly interfaces based on research and usability testing.',
        }
      }

    },
    {
      name: 'Game Development Basics',
      shortdescription: 'Introductie in game design en interactieve werelden',
      description: 'In deze module ontdekken studenten de basisprincipes van game design en ontwikkeling met behulp van Unity.',
      content: 'Modules: Unity, C#, game mechanics, physics, animation, level design, playtesting.',
      studycredit: 5,
      location: 'Breda',
      level: 'Bachelor',
      learningoutcomes: 'Student kan een functionele game bouwen met aandacht voor spelmechanieken, balans en gebruikerservaring.',
      tags: ['game','unity','csharp'],
      translations: {
        nl: {
          name: 'Game Development',
          shortdescription: 'Interactieve games ontwerpen en programmeren',
          description: 'In deze module ontdekken studenten de wereld van game-ontwikkeling. Ze leren de basis van gameplaydesign, 2D- en 3D-omgevingen en programmeren met een engine zoals Unity of Unreal Engine. Studenten werken met physics, animaties, inputsystemen en game loops om levendige spelervaringen te creëren. Daarnaast leren ze de balans tussen uitdaging en plezier te vinden en krijgen ze inzicht in leveldesign en storytelling. Er is aandacht voor teamwerk en iteratief ontwerpen, waarbij feedback wordt gebruikt om games te verbeteren. Door een eigen game te ontwikkelen, leren studenten het volledige proces van concept tot speelbaar prototype. Na afloop kunnen ze creatieve ideeën omzetten in een technisch werkend spel.',
          content: 'Unity/Unreal, C#, gameplaydesign, physics, animatie, prototyping, storytelling.',
          learningoutcomes: 'Student kan een complete game ontwerpen, programmeren en testen in een game-engine.',
        },
        en: {
          name: 'Game Development',
          shortdescription: 'Designing and programming interactive games',
          description: 'In this module, students explore the world of game development. They learn the fundamentals of gameplay design, 2D and 3D environments, and programming with engines such as Unity or Unreal Engine. Students work with physics, animations, input systems, and game loops to create engaging experiences. They also learn to balance challenge and fun while gaining insight into level design and storytelling. Collaboration and iterative design are emphasized, with feedback used to refine their games. By developing their own project, students experience the complete process from concept to playable prototype. By the end, they can transform creative ideas into technically functional and enjoyable games.',
          content: 'Unity/Unreal, C#, gameplay design, physics, animation, prototyping, storytelling.',
          learningoutcomes: 'Student can design, code, and test a complete game within a professional engine.',
        }
      }

    },
    {
      name: 'Cybersecurity Fundamentals',
      shortdescription: 'Beveiliging van systemen en data in de praktijk',
      description: 'Deze module geeft inzicht in digitale veiligheid en leert studenten hoe ze systemen kunnen beveiligen tegen dreigingen.',
      content: 'Modules: Netwerkbeveiliging, wachtwoordbeheer, encryptie, pentesting, security awareness.',
      studycredit: 4,
      location: 'Den Bosch',
      level: 'Bachelor',
      learningoutcomes: 'Student begrijpt fundamentele beveiligingsprincipes en kan maatregelen implementeren om risico’s te beperken.',
      tags: ['security','cyber','network'],
      translations: {
        nl: {
          name: 'Cybersecurity',
          shortdescription: 'Bescherming van systemen en data tegen digitale dreigingen',
          description: 'In deze module leren studenten hoe digitale systemen worden beveiligd tegen aanvallen en datalekken. Ze ontdekken de fundamenten van netwerkbeveiliging, encryptie, authenticatie en risicobeheer. Via praktijkopdrachten leren ze kwetsbaarheden herkennen en mitigeren, bijvoorbeeld door het uitvoeren van securityscans en penetratietests in gecontroleerde omgevingen. Daarnaast behandelen ze actuele thema’s zoals phishing, ransomware en sociale engineering. Studenten leren ook hoe ze veilige code schrijven en securitymaatregelen kunnen implementeren in softwareprojecten. De ethische kant van cybersecurity krijgt eveneens aandacht, inclusief de verantwoordelijkheden van ethisch hacken. Na afloop weten studenten hoe ze bijdragen aan veilige IT-systemen en dataveiligheid in organisaties kunnen waarborgen.',
          content: 'Netwerken, encryptie, pentesting, firewalls, ethisch hacken, risicobeheer.',
          learningoutcomes: 'Student kan systemen analyseren, beveiligen en verantwoord omgaan met kwetsbaarheden.',
        },
        en: {
          name: 'Cybersecurity',
          shortdescription: 'Protecting systems and data against digital threats',
          description: 'This module teaches students how to secure digital systems against attacks and data breaches. They explore the fundamentals of network security, encryption, authentication, and risk management. Through practical assignments, students learn to identify and mitigate vulnerabilities by performing security scans and penetration tests in controlled environments. The module also covers current topics such as phishing, ransomware, and social engineering. Students learn how to write secure code and implement protective measures in software projects. Ethical aspects of cybersecurity, including the responsibilities of ethical hacking, are also discussed. By the end, students understand how to analyze and protect systems while promoting data security within organizations.',
          content: 'Networking, encryption, pentesting, firewalls, ethical hacking, risk management.',
          learningoutcomes: 'Student can analyze, secure, and ethically manage vulnerabilities in IT systems.',
        }
      }

    },
    {
      name: 'Digital Marketing',
      shortdescription: 'Online strategie, data-analyse en contentmarketing',
      description: 'Studenten leren hoe ze digitale marketingcampagnes opzetten, uitvoeren en optimaliseren met data-analyse.',
      content: 'Modules: SEO/SEA, Google Analytics, social media strategie, contentplanning, data-analyse.',
      studycredit: 4,
      location: 'Breda',
      level: 'Bachelor',
      learningoutcomes: 'Student kan effectieve digitale campagnes opzetten en optimaliseren op basis van meetbare resultaten.',
      tags: ['marketing','seo','social'],
      translations: {
        nl: {
          name: 'Digital Marketing',
          shortdescription: 'Online strategieën en data inzetten voor effectieve marketing',
          description: 'In deze module leren studenten hoe digitale marketing werkt en hoe bedrijven online zichtbaar en succesvol blijven. Ze onderzoeken strategieën voor sociale media, zoekmachineoptimalisatie (SEO), contentmarketing en online advertenties. Studenten leren data gebruiken om campagnes te analyseren en optimaliseren, bijvoorbeeld via Google Analytics of Meta Ads Manager. Ook komt doelgroepsegmentatie, merkpositionering en storytelling aan bod. Door zelf een digitale marketingcampagne op te zetten, ervaren studenten hoe theorie in praktijk wordt gebracht. Er wordt aandacht besteed aan ethiek, privacy en verantwoord adverteren. Na afloop kunnen studenten effectieve marketingstrategieën ontwikkelen die aansluiten op de juiste doelgroep en meetbaar resultaat opleveren.',
          content: 'SEO, SEA, social media, analytics, doelgroepsegmentatie, storytelling, ethiek.',
          learningoutcomes: 'Student kan digitale marketingcampagnes ontwerpen, uitvoeren en evalueren op basis van data.',
        },
        en: {
          name: 'Digital Marketing',
          shortdescription: 'Using online strategies and data for effective marketing',
          description: 'This module introduces students to the world of digital marketing and how businesses maintain online visibility and success. They explore strategies for social media, search engine optimization (SEO), content marketing, and online advertising. Students learn to use data analytics tools like Google Analytics and Meta Ads Manager to evaluate and optimize campaigns. The module covers audience segmentation, brand positioning, and storytelling. By designing their own digital marketing campaign, students apply theory to practice. Ethical advertising, privacy, and responsible data use are also discussed. By the end, students can develop and measure effective marketing strategies that reach the right audience and achieve tangible results.',
          content: 'SEO, SEA, social media, analytics, segmentation, storytelling, ethics.',
          learningoutcomes: 'Student can design, execute, and evaluate data-driven digital marketing campaigns.',
        }
      }

    },
    {
      name: 'Internet of Things (IoT)',
      shortdescription: 'Slimme apparaten, sensoren en data-integratie',
      description: 'Deze module richt zich op het ontwerpen en bouwen van IoT-oplossingen waarbij hardware, software en data samenkomen.',
      content: 'Modules: Arduino/ESP32, sensoren, dataoverdracht, cloud integratie, visualisatie.',
      studycredit: 5,
      location: 'Den Bosch',
      level: 'Bachelor',
      learningoutcomes: 'Student kan een IoT-prototype realiseren dat fysieke data verzamelt en digitaal inzichtelijk maakt.',
      tags: ['iot','hardware','sensor'],
      translations: {
        nl: {
          name: 'Internet of Things (IoT)',
          shortdescription: 'Slimme apparaten verbinden en laten samenwerken',
          description: 'In deze module leren studenten hoe fysieke apparaten via het internet met elkaar kunnen communiceren. Ze ontdekken de basis van sensoren, microcontrollers (zoals Arduino of Raspberry Pi) en dataverwerking in de cloud. Studenten bouwen prototypes van slimme systemen die real-time data verzamelen en verwerken, bijvoorbeeld voor energiebeheer, gezondheid of slimme steden. Ze leren over protocollen zoals MQTT en concepten als edge computing en automatisering. Veiligheid en privacy spelen een belangrijke rol, evenals de maatschappelijke impact van IoT. Door een praktijkproject ontwikkelen studenten een functioneel IoT-systeem dat een concreet probleem oplost. Na afloop begrijpen ze de technische, ethische en duurzame aspecten van verbonden technologieën.',
          content: 'Arduino, sensoren, cloud, data, automatisering, MQTT, IoT-project.',
          learningoutcomes: 'Student kan een werkend IoT-systeem ontwerpen, bouwen en evalueren met aandacht voor veiligheid en duurzaamheid.',
        },
        en: {
          name: 'Internet of Things (IoT)',
          shortdescription: 'Connecting smart devices to communicate and collaborate',
          description: 'In this module, students learn how physical devices communicate with each other through the Internet. They explore the basics of sensors, microcontrollers (such as Arduino or Raspberry Pi), and cloud data processing. Students build prototypes of smart systems that collect and process real-time data — for example, in energy management, healthcare, or smart cities. Topics include IoT communication protocols like MQTT, automation, and edge computing. Security, privacy, and the societal impact of IoT are key considerations. Through a hands-on project, students design and build a functional IoT solution addressing a real-world challenge. By the end, they understand the technical, ethical, and sustainable dimensions of connected technologies.',
          content: 'Arduino, sensors, cloud, data, automation, MQTT, IoT project.',
          learningoutcomes: 'Student can design, build, and evaluate an IoT system with attention to safety and sustainability.',
        }
      }

    },
    {
      name: 'Project Management & Agile',
      shortdescription: 'Leidinggeven aan multidisciplinaire IT-projecten',
      description: 'In deze module leren studenten hoe ze projecten efficiënt plannen en uitvoeren met methodieken zoals Scrum en Kanban.',
      content: 'Modules: Scrum, Kanban, teamdynamiek, planning, retrospectives, agile mindset.',
      studycredit: 3,
      location: 'Breda',
      level: 'Bachelor',
      learningoutcomes: 'Student kan een project structureren, een team aansturen en effectief samenwerken binnen een agile omgeving.',
      tags: ['management','agile','scrum'],
      translations: {
        nl: {
          name: 'Project Management',
          shortdescription: 'Effectief plannen, organiseren en samenwerken in projecten',
          description: 'In deze module leren studenten hoe projecten succesvol worden gepland en uitgevoerd. Ze ontdekken verschillende projectmanagementmethodieken, zoals Scrum, Agile en Waterfall, en leren deze toepassen in uiteenlopende contexten. Er wordt aandacht besteed aan taakverdeling, risicobeheer, communicatie en stakeholdermanagement. Studenten oefenen met het opstellen van projectplannen, het bewaken van voortgang en het omgaan met tegenslagen. Via groepsopdrachten ervaren ze het belang van samenwerking, leiderschap en transparantie. Ook wordt er gereflecteerd op soft skills zoals feedback geven en besluitvorming. Na afloop zijn studenten in staat een project gestructureerd te leiden, efficiënt samen te werken en resultaatgericht te werken binnen multidisciplinaire teams.',
          content: 'Scrum, Agile, planning, teamwork, communicatie, leiderschap, risicomanagement.',
          learningoutcomes: 'Student kan projecten plannen, coördineren en afronden binnen een teamomgeving.',
        },
        en: {
          name: 'Project Management',
          shortdescription: 'Effectively planning, organizing, and collaborating in projects',
          description: 'This module teaches students how to plan and execute projects successfully. They explore various project management methodologies such as Scrum, Agile, and Waterfall, and learn how to apply them in different contexts. Topics include task division, risk management, communication, and stakeholder engagement. Students practice creating project plans, monitoring progress, and managing challenges. Group assignments emphasize teamwork, leadership, and transparency. The module also focuses on soft skills such as giving feedback and decision-making. By the end, students can structure and lead projects efficiently while collaborating effectively in multidisciplinary teams and achieving measurable results.',
          content: 'Scrum, Agile, planning, teamwork, communication, leadership, risk management.',
          learningoutcomes: 'Student can plan, coordinate, and deliver projects effectively in a collaborative environment.',
        }
      }

    },
  ];

  let created = 0;
  let skipped = 0;

  for (const s of samples) {
    try {
      const exists = await KeuzeModuleModel.findOne({ name: s.name }).lean();
      if (exists && !force) {
        console.log(`[seed] exists, skipping: ${s.name} (${exists._id})`);
        skipped++;
        continue;
      }

      if (exists && force) {
        console.log(`[seed] force: removing existing ${s.name} (${exists._id})`);
        await KeuzeModuleModel.deleteMany({ name: s.name });
      }

      const doc = new KeuzeModuleModel(s);
      await doc.save();
      console.log(`[seed] created: ${s.name} (${doc._id})`);
      created++;
    } catch (err) {
      console.error(`[seed] error processing ${s.name}:`, (err as Error).message);
    }
  }

  console.log(`[seed] finished — created: ${created}, skipped: ${skipped}`);
  await mongoose.disconnect();
  console.log('[seed] disconnected');
}

seed().catch(err => {
  console.error('[seed] fatal error:', err);
  process.exit(1);
});
