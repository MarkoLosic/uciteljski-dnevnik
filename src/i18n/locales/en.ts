import type { Dictionary } from './sr';

export const en: Dictionary = {
  site: {
    tagline: 'Practical support for primary school teachers in everyday classroom work',
    description:
      'A platform dedicated to primary school teachers and classroom work — 1,436 daily lesson plans for grades 1–5, 3-level differentiated expectations, printable A4 worksheets, educational games, and teaching articles.',
  },
  author: {
    role: 'QA engineer and primary school teacher',
    location: 'Banja Luka, Bosnia and Herzegovina',
    intro:
      'I’m a primary school teacher by training, and those eight months with first-graders taught me the two most important skills I have: endless patience and an eye for detail. In a classroom full of six-year-olds you have to notice every little thing — who has quietly got stuck, where a task is unclear, and how a seemingly small slip can cause chaos. I bring that same mindset to IT today, where as a QA engineer I build and test software. For me, building and testing software isn’t just writing code and clicking around an app; it’s exactly that: carefully noticing the details others miss and patiently building systems that work without errors. That’s why I look at technology in education from both sides — where it genuinely lightens the load, and where poor design only gets in the way.',
    background: [
      {
        title: 'In IT',
        text: 'For more than six years I have worked as a QA engineer: building and testing web and mobile apps, automating tests and evaluating AI models. The job taught me not to take technology at its word — I check first whether it really works.',
      },
      {
        title: 'In the classroom',
        text: 'I studied primary education at the University of Banja Luka and spent eight months teaching first graders at Grahovo Primary School. There I saw how much teaching depends on clarity, patience and warmth — with or without technology.',
      },
    ],
  },
  topics: [
    { title: 'Life in the classroom', text: 'Experiences from first grade and ideas for primary teaching.' },
    {
      title: 'Technology in teaching',
      text: 'Tools and apps for teaching, checked through a tester’s eyes — what works and what doesn’t.',
    },
    { title: 'Artificial intelligence', text: 'How AI can help teachers, and where to be careful.' },
  ],
  nav: {
    label: 'Main navigation',
    home: 'Home',
    pripreme: 'Lesson Plans',
    worksheets: 'Coloring & Worksheets',
    worksheetsShort: 'Coloring',
    games: 'Educational Games',
    gamesShort: 'Games',
    blog: 'Blog',
    about: 'About',
    world: 'Schools worldwide',
  },
  pripremePromo: {
    eyebrow: 'For Primary Teachers · Grades 1–5 (BiH Curricula)',
    title: 'Daily Lesson Plans Library (1,436 Lesson Plans)',
    desc: 'Complete library of methodically structured daily lesson plans covering the entire school year for grades 1 to 5 in Bosnia and Herzegovina (Republika Srpska RPZ & Federation of BiH ZJNPP), with one-click e-Dnevnik copy, A4 print, student worksheets, and Word (.docx) export.',
    ctaAll: 'Browse all 1,436 lesson plans',
    gradeLabel: (r: number) => `Grade ${r}`,
  },
  language: {
    label: 'Language',
    change: 'Change language',
  },
  theme: {
    toLight: 'Switch to light theme',
    toDark: 'Switch to dark theme',
  },
  footer: {
    label: 'Footer links',
    rights: 'All rights reserved.',
    author: 'Author',
    contact: 'Contact',
    rss: 'RSS',
  },
  categories: {
    'AI alati u nastavi': 'AI tools in teaching',
    'Etika i AI': 'Ethics and AI',
    'Iskustva iz prakse': 'From the classroom',
    Vijesti: 'News',
    Resursi: 'Resources',
  },
  home: {
    greeting: 'Hi, I’m',
    readBlog: 'Teaching Blog & Practice',
    moreAboutMe: 'About the Author',
    chips: ['Primary teaching', 'QA engineer', 'AI in education'],
    whoEyebrow: '01 — Who I am',
    whoTitle: 'Between the classroom and IT',
    whoImageAlt:
      'Illustration: on one side a teacher plays with children in a classroom, on the other the same man works at a computer as a QA engineer — letters and numbers from the classroom flow into code and tests.',
    topicsEyebrow: '03 — Topics & Focus Areas',
    topicsTitle: 'What we write about and explore',
    blogEyebrow: '04 — From Teaching Practice',
    blogTitle: 'Latest articles for teachers',
    heroBadge: 'Primary Teaching Hub · Grades 1 to 5',
    heroTitleBefore: 'A place built to help teachers in ',
    heroTitleHighlight: 'everyday school work',
    heroLead:
      'Every school day calls for thoughtful preparation, patience, and adapting to every child in the classroom. “Iz učionice” is a practical toolkit for primary teachers: from 1,436 ready-to-use daily lesson plans, 3-level differentiated student expectations, and printable A4 worksheets, to ad-free educational games and classroom insights that save hours of paperwork.',
    ctaPripreme: 'Lesson Plans Library (1,436)',
    ctaWorksheets: 'Coloring & Worksheets (55)',
    stats: [
      {
        value: '1,436',
        label: 'Daily Lesson Plans (Grades 1–5)',
        detail: 'Covers the entire school year across all 6 primary subjects (RPZ RS & ZJNPP FBiH).',
      },
      {
        value: '3 Levels',
        label: 'Differentiated Expectations',
        detail: 'Generate outcomes and tasks for basic, intermediate, and advanced students in one click.',
      },
      {
        value: '55 + 10',
        label: 'A4 Coloring, Worksheets & Games',
        detail: '55 printable A4 sheets for coloring, letters, numbers, and logic, plus 10 ad-free games.',
      },
      {
        value: '1 Click',
        label: 'e-Dnevnik, Word & Print',
        detail: 'Instant copy for e-Dnevnik, .docx export, and Latin ↔ Cyrillic transliteration.',
      },
    ],
    pillarsEyebrow: '01 — Everyday Classroom Support',
    pillarsTitle: 'Everything a primary teacher needs for class — in one place',
    pillarsIntro:
      'Instead of searching through dozens of scattered folders and spreadsheets, find structured materials that follow the real pace of the school year and actual classroom needs.',
    pillars: [
      {
        badge: 'Full Curriculum',
        title: 'Daily Lesson Plans for the Entire School Year (Grades 1–5)',
        text: 'Complete daily lesson plans for Mother Tongue, Mathematics, Science & Social Studies, Art, Music, and Physical Education — including lesson goals, learning outcomes, and intro, main, and closing activities.',
        linkText: 'Browse lesson plans →',
        href: '/pripreme/index.html',
      },
      {
        badge: 'Differentiation & Inclusion',
        title: '3-Level Student Achievement Plans',
        text: 'Every classroom has learners moving at different paces. With one click on any lesson plan, generate tailored expectations, tasks, and teacher support for Basic (I), Intermediate (II), and Advanced (III) levels.',
        linkText: 'Open 3-level plans →',
        href: '/pripreme/index.html',
      },
      {
        badge: 'Less Paperwork',
        title: 'Fast e-Dnevnik Copy, Word (.docx) & A4 Print',
        text: 'Copy any lesson plan formatted for e-Dnevnik in one click, download a clean Word document pre-filled with your school and teacher name, or switch between Latin and Cyrillic scripts instantly.',
        linkText: 'Try export tools →',
        href: '/pripreme/index.html',
      },
      {
        badge: 'Ready for Student Desks',
        title: 'Automatic A4 Student Worksheets',
        text: 'Every lesson plan can generate a print-ready A4 student worksheet with four structured tasks and a student self-assessment scale, plus a 3-level differentiated worksheet.',
        linkText: 'View student worksheets →',
        href: '/pripreme/index.html',
      },
      {
        badge: 'Early Primary & Preschool',
        title: 'Coloring Books, Early Writing, Numbers & Games',
        text: '55 printable A4 coloring pages and worksheets (classroom, seasons, animals, construction, castle, space, alphabet), plus 10 interactive games to build attention and coordination.',
        linkText: 'Open coloring & worksheets →',
        href: '/en/worksheets',
      },
      {
        badge: 'Professional Growth',
        title: 'Classroom Practice, AI Tools & Schools Worldwide',
        text: 'Practical articles on lesson organization, safe use of AI for lesson prep, protecting student privacy, and comparing primary education across Finland, Estonia, Japan, and Singapore.',
        linkText: 'Read blog articles →',
        href: '/en/blog',
      },
    ],
    gradesEyebrow: '02 — Browse by Grade',
    gradesTitle: 'Pick your grade and open daily lesson plans right away',
    gradesIntro:
      'Each grade covers the full annual teaching schedule across all six subjects for both curricula in Bosnia and Herzegovina (RPZ RS and ZJNPP FBiH).',
    gradesList: [
      {
        grade: 1,
        count: '284 plans',
        title: '1st Grade Primary School',
        desc: 'First-grade adaptation, pre-reading skills, learning letters, numbers up to 20, exploring the environment, and building study habits.',
      },
      {
        grade: 2,
        count: '296 plans',
        title: '2nd Grade Primary School',
        desc: 'Second script (Latin/Cyrillic), addition and subtraction up to 100, multiplication and division, seasons, traffic safety, and local community.',
      },
      {
        grade: 3,
        count: '288 plans',
        title: '3rd Grade Primary School',
        desc: 'Parts of speech and creative writing, numbers up to 1,000, geometry and measurement, local history, and living vs. non-living nature.',
      },
      {
        grade: 4,
        count: '284 plans',
        title: '4th Grade Primary School',
        desc: 'Sentence analysis, multi-digit numbers, area and volume, map reading, and natural and social geography.',
      },
      {
        grade: 5,
        count: '284 plans',
        title: '5th Grade Primary School',
        desc: 'Literary genres, verb tenses, fractions and geometry, social communities, energy, and transition to subject teaching.',
      },
    ],
    workflowEyebrow: '03 — How It Works in Practice',
    workflowTitle: 'From choosing a topic to a ready lesson in 3 steps',
    workflowSteps: [
      {
        step: '01',
        title: 'Find your lesson unit',
        text: 'Filter the library by grade (1–5), curriculum (RPZ RS or ZJNPP FBiH), subject, or lesson type, or search by keyword.',
      },
      {
        step: '02',
        title: 'Enable 3 student levels & script',
        text: 'Click “Create 3-level student plan” to generate differentiated expectations and tasks, choose Latin or Cyrillic, and enter your school name.',
      },
      {
        step: '03',
        title: 'Copy to e-Dnevnik or print A4',
        text: 'Copy the lesson plan to e-Dnevnik in one click, download the complete Word (.docx) file, or print the A4 student worksheet.',
      },
    ],
  },
  blog: {
    eyebrow: 'Blog',
    title: 'All articles',
    description:
      'All articles on primary teaching, classroom experience and the sensible use of technology and artificial intelligence.',
    allPosts: 'All articles',
    readMore: 'Read more',
    published: 'Published',
    backToBlog: 'Back to the blog',
    emptyTitle: 'No articles yet',
    emptyMessage: 'The first articles are on their way. Check back soon!',
    notFoundTitle: 'Article not found',
    notFoundMessage: 'The article you are looking for does not exist or has been moved.',
    readingTime: (n: number) => `${n} min read`,
    filterLabel: 'Filter by category',
    filterAll: 'All',
    related: 'More from the blog',
    toc: 'Contents',
    headingLink: (title: string) => `Link to section “${title}”`,
    copyCode: 'Copy',
    codeCopied: 'Copied',
    copyFailed: 'Copy failed',
    share: 'Share this post',
    shareNative: 'Share',
    shareVia: (app: string) => `Share via ${app}`,
    copyLink: 'Copy link',
    linkCopied: 'Link copied',
  },
  about: {
    title: 'About me',
    description:
      'Who writes Iz učionice: a primary teacher by training and QA engineer by trade, from Banja Luka. Background, topics and contact.',
    blogEyebrow: 'About the blog',
    blogTitle: 'What you’ll find here',
    blogText: (siteName: string) =>
      `${siteName} is where I bring together what I learned in the classroom and what I work on every day in IT.`,
    contactEyebrow: 'Contact',
    contactTitle: 'Get in touch',
    contactText: 'Questions, suggestions, an idea for a topic or just a hello — I’m happy to reply.',
    location: 'Location',
  },
  games: {
    eyebrow: 'Games · preschool',
    title: 'Games for little hands',
    intro:
      'Ten short games for children aged 3 to 6. Each one practises something small: finger precision, hand–eye coordination, attention, counting or logical thinking. They work best on a tablet or phone, but a mouse works too.',
    age: 'Ages 3–6 · no ads, no tracking',
    play: 'Play',
    back: 'All games',
    again: 'Play again',
    next: 'Next',
    win: 'Well done!',
    winText: 'Brilliant — all solved!',
    tipsEyebrow: 'For parents and teachers',
    tipsTitle: 'How to make play worthwhile',
    tips: [
      {
        title: 'Play together',
        text: 'Sit next to your child, read them how the game works and praise the effort, not just the result. Talking about colours, shapes and numbers is worth more than the game itself.',
      },
      {
        title: 'Short and often',
        text: 'For preschoolers, 10–15 minutes of screen time at once is plenty. Play two or three games and stop while your child is still enjoying it.',
      },
      {
        title: 'Screens don’t replace hands',
        text: 'These games are an addition to, not a replacement for, play dough, scissors, building blocks and crayons. Real fine motor skills grow in the real world.',
      },
    ],
    skills: {
      fine: 'Fine motor',
      eyeHand: 'Hand–eye',
      logic: 'Logic',
      memory: 'Memory',
      counting: 'Counting',
    },
    colorNames: {
      red: 'red',
      blue: 'blue',
      yellow: 'yellow',
      green: 'green',
      purple: 'purple',
      orange: 'orange',
    },
    shapeNames: {
      circle: 'circle',
      square: 'square',
      triangle: 'triangle',
      star: 'star',
      heart: 'heart',
    },
    things: {
      cat: 'cat',
      dog: 'dog',
      fish: 'fish',
      bird: 'bird',
      rabbit: 'rabbit',
      turtle: 'turtle',
      snail: 'snail',
      apple: 'apple',
      star: 'star',
      flower: 'flower',
      sun: 'sun',
    },
    ui: {
      round: (n: number, total: number) => `Round ${n} of ${total}`,
      progress: (n: number, total: number) => `${n} of ${total}`,
      popBalloon: (color: string) => `Balloon, colour: ${color}`,
      block: (color: string) => `Block, colour: ${color}`,
      basket: (color: string) => `Basket, colour: ${color}`,
      slot: (shape: string) => `Space for: ${shape}`,
      piece: (shape: string) => `Shape: ${shape}`,
      dot: (n: number) => `Dot ${n}`,
      traceArea: 'Path from the bug to the flower',
      maze: 'Maze: move the rabbit to the carrot with arrow keys or your finger',
      hiddenCard: 'Face-down card',
      sequence: 'Pattern of shapes',
      missing: 'What comes next?',
      howMany: (thing: string) => `How many? (${thing})`,
      sizeItem: (thing: string, n: number, total: number) => `${thing}, size ${n} of ${total}`,
      shelf: 'Shelf, from smallest to biggest',
    },
    worksheet: {
      link: 'Printable worksheet',
      eyebrow: 'Worksheet',
      print: 'Print',
      backToGames: 'Back to games',
      backToWorksheets: 'Back to coloring & worksheets',
      name: 'Name',
      date: 'Date',
      page: (n: number, total: number) => `Page ${n}/${total}`,
      tip: 'Tip: print on A4 paper. Black and white works too. Crayons and a thick pencil are better than a thin pen.',
      sectionEyebrow: 'Printables · A4 format',
      sectionTitle: 'Coloring books, letters, Cyrillic, Latin & worksheets',
      sectionText: 'Complete collection of 91 worksheets, differentiated tests and themed coloring pages ready to print on A4: achievement tests for 3 levels (basic, intermediate, advanced), themed coloring books, alphabet pages, fine motor skills and math.',
      alphabet: ['A a', 'B b', 'C c', 'D d', 'E e', 'F f', 'G g', 'H h', 'I i', 'J j', 'K k', 'L l', 'M m', 'N n', 'O o', 'P p', 'Q q', 'R r', 'S s', 'T t', 'U u', 'V v', 'W w', 'X x', 'Y y', 'Z z'],
      groups: {
        books: 'Printable handbooks and workbooks (multi-page, with a plan and answers)',
        tests: 'Differentiated tests (3 levels: basic, intermediate & advanced)',
        coloring: 'Coloring books (themed pictures, letters & numbers)',
        writing: 'Reading and writing',
        motor: 'Fine motor and pre-writing',
        math: 'Numbers and counting',
        logic: 'Logic and attention',
        time: 'Telling time — clock, parts of the day, days, months and seasons',
      },
      labels: {
        dayParts: {
          morning: 'Morning',
          noon: 'Noon',
          evening: 'Evening',
          night: 'Night',
        },
        routine: {
          wakeUp: 'Wake up',
          breakfast: 'Breakfast',
          school: 'School',
          lunch: 'Lunch',
          play: 'Play',
          sleep: 'Sleep',
        },
        weekdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        yesterday: 'Yesterday:',
        today: 'Today:',
        tomorrow: 'Tomorrow:',
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        seasons: {
          winter: 'winter',
          spring: 'spring',
          summer: 'summer',
          autumn: 'autumn',
        },
        year: 'Year',
        birthday: 'My birthday is in:',
        handWash: {
          wet: 'Wet your hands',
          soap: 'Add soap',
          rub: 'Rub well',
          dry: 'Rinse and dry',
        },
        traffic: {
          stop: 'STOP!',
          wait: 'GET READY!',
          go: 'GO!',
        },
        food: {
          everyday: 'Every day',
          sometimes: 'Sometimes',
        },
        bins: {
          paper: 'Paper',
          plastic: 'Plastic',
          glass: 'Glass',
        },
        feelings: {
          happy: 'Happy',
          sad: 'Sad',
          angry: 'Angry',
          scared: 'Scared',
          surprised: 'Surprised',
          calm: 'Calm',
        },
        feelToday: 'Today I feel:',
        answer: 'Answer:',
        calculation: 'Working:',
        daysOrder: {
          neighbours: 'Write the day before and the day after.',
          missingMonth: 'Write the missing month.',
          monthSeason: 'Match each month to its season.',
        },
        calendarTasks: [
          'What day of the week is the 1st?',
          'What day is the 15th?',
          'Circle all the Sundays. How many are there this month?',
          'Color all Saturdays and Sundays yellow.',
          'How many days does this month have?',
          'Today is the 10th. What date will it be in exactly one week?',
          'What was the date two days before the 20th?',
        ],
        wordProblems: [
          'At snack time, Mia ate 3 apples and Luke ate 4 bananas. How many pieces of fruit did they eat altogether?',
          'There were 12 carrots on the plate. The children ate 5. How many carrots are left on the plate?',
          'A week has 7 days. How many days are there in 3 weeks?',
          'Anna has training twice every week. How many training sessions does she have in 4 weeks?',
          'School starts at 8 o\'clock and lasts 4 hours. What time does it finish?',
          'A year has 12 months and 4 seasons. How many months does one season last?',
          'The class collected 18 plastic bottles and 9 glass jars. How many containers did they collect altogether?',
          '15 cars were waiting at the traffic lights. When the light turned green, 9 cars drove away. How many cars were still waiting?',
          'We wash our hands for at least 20 seconds. How many seconds is that if we wash them 3 times a day?',
          'Luke fell asleep at 9 o\'clock in the evening and woke up at 7 o\'clock in the morning. How many hours did he sleep?',
        ],
      },
      sheets: {
        testGrade1: {
          title: 'Differentiated Test for Grade 1 (3 Levels)',
          text: 'Grade 1 evaluation: Level I (numbers to 10, letter & sound recognition), Level II (addition/subtraction to 20, syllables & words), Level III (word problem & sentence construction).',
        },
        testGrade2: {
          title: 'Differentiated Test for Grade 2 (3 Levels)',
          text: 'Grade 2 evaluation: Level I (math to 100 without regrouping, nouns & sentences), Level II (addition/subtraction with regrouping, parts of speech), Level III (two-step problems & short creative prompt).',
        },
        testGrade3: {
          title: 'Differentiated Test for Grade 3 (3 Levels)',
          text: 'Grade 3 evaluation: Level I (multiplication & division table, nouns & verbs), Level II (parentheses expressions, adjectives, map directions), Level III (equations with unknown factor & community map).',
        },
        testGrade4: {
          title: 'Differentiated Test for Grade 4 (3 Levels)',
          text: 'Grade 4 evaluation: Level I (multi-digit numbers, spelling & punctuation), Level II (long multiplication & division, subject & predicate, human biology), Level III (geometry area/perimeter, text analysis & ecosystems).',
        },
        testGrade5: {
          title: 'Differentiated Test for Grade 5 (3 Levels)',
          text: 'Grade 5 evaluation: Level I (basic fractions, grammatical cases), Level II (fraction arithmetic, sentence syntax, geography map), Level III (angles & geometry challenges, figurative language & analysis).',
        },
        testMathOperations: {
          title: 'Differentiated test: Addition & subtraction (3 levels)',
          text: 'Differentiated math test: Level I (basic operations up to 20), Level II (operations up to 100 with parentheses and unknown x), Level III (multi-step word problem and magic square).',
        },
        testLanguageGrammar: {
          title: 'Differentiated test: Language & grammar (3 levels)',
          text: 'Differentiated language test: Level I (sentence types and capital letters), Level II (nouns, verbs, adjectives, gender and number), Level III (error correction and short descriptive paragraph).',
        },
        testNatureSociety: {
          title: 'Differentiated test: Science & Nature (3 levels)',
          text: 'Differentiated nature test: Level I (plant parts and animal habitats), Level II (domestic vs wild animals and seasons), Level III (food chain and environmental protection).',
        },
        testReadingComprehension: {
          title: 'Differentiated test: Reading comprehension (3 levels)',
          text: 'Differentiated reading test: Level I (main characters and setting), Level II (chronological sequence of events), Level III (main moral of the story and personal reflection).',
        },
        testMultiplicationDivision: {
          title: 'Differentiated test: Multiplication & division (3 levels)',
          text: 'Differentiated operations test: Level I (basic tables up to 5), Level II (tables up to 10, order of operations and comparisons), Level III (equations with unknown factors and word problem).',
        },
        coloringClassroom: {
          title: 'Coloring page: My school & classroom',
          text: 'Color the happy classroom, friendly teacher, pupils at their desks, blackboard and globe with your favourite colors.',
        },
        coloringSeasons: {
          title: 'Coloring page: Four seasons',
          text: 'Four nature scenes on one sheet: Spring with flowers, warm Summer with sun and beach, Autumn leaves with squirrel, and snowy Winter with a snowman.',
        },
        coloringSpring: {
          title: 'Coloring: Spring Blossoms & Bees',
          text: 'Color the awakening of nature, blossoming trees, spring flowers, a busy bee, butterfly, and a smiling sun.',
        },
        coloringSummer: {
          title: 'Coloring: Summer Beach & Sandcastle',
          text: 'Color summer fun by the sea: a big sandcastle with towers, a beach umbrella, beach ball, and a friendly crab.',
        },
        coloringAutumn: {
          title: 'Coloring: Autumn Forest & Woodland Animals',
          text: 'Color autumn forest magic: a hedgehog carrying an apple, a squirrel with an acorn, a wise owl, and fallen leaves.',
        },
        coloringWinter: {
          title: 'Coloring: Winter Fun & Sledding',
          text: 'Color winter games in the snow: kids sledding down a hill, cozy winter clothes, snowflakes, and a playful dog.',
        },
        coloringAnimals: {
          title: 'Coloring page: Farm animals',
          text: 'Color the friendly spotted cow, fluffy sheep, playful puppy, rooster on a fence and barnyard.',
        },
        coloringSafari: {
          title: 'Coloring: Safari & Wild Animals',
          text: 'Explore the African savanna: color a brave lion cub, a tall giraffe, a baby elephant, and a monkey on a branch.',
        },
        coloringPets: {
          title: 'Coloring: Cute Household Pets',
          text: 'Color beloved pets: a playful kitten with yarn, a happy dog with a bone, and a goldfish swimming in a bowl.',
        },
        coloringUnderwater: {
          title: 'Coloring page: Ocean & underwater adventure',
          text: 'Dive into the ocean blue and color the smiling dolphin, sea turtle, octopus, starfish and seashells.',
        },
        coloringSubmarine: {
          title: 'Coloring: Submarine & Hidden Treasure',
          text: 'Dive down to the ocean floor in a submarine, explore an ancient treasure chest, and color schools of glowing fish.',
        },
        coloringVehicles: {
          title: 'Coloring page: Vehicles & transport',
          text: 'Color the steam train on tracks, airplane high in the sky, sailboat on water and car on the road.',
        },
        coloringConstruction: {
          title: 'Coloring: Construction Vehicles & Work',
          text: 'Color big construction machines: a heavy excavator digging soil, a dump truck full of sand, and a tall crane.',
        },
        coloringDino: {
          title: 'Coloring page: Dinosaur adventure',
          text: 'Color the gentle long-neck dinosaur, triceratops and cute baby dino hatching from an egg.',
        },
        coloringCastle: {
          title: 'Coloring page: Fairytale castle & dragon',
          text: 'Color the magical castle with turrets and flags, friendly dragon holding a daisy, and rainbow in the sky.',
        },
        coloringSpace: {
          title: 'Coloring page: Space, rocket & astronaut',
          text: 'Color the young astronaut floating weightlessly, rocket ship, ringed planets and friendly waving alien.',
        },
        coloringProfessions: {
          title: 'Coloring: Community Helpers & Jobs',
          text: 'What do you want to be when you grow up? Color a brave firefighter, a caring doctor with a stethoscope, and a chef.',
        },
        coloringSports: {
          title: 'Coloring: Sports & Outdoor Games',
          text: 'Color the joy of movement: a soccer ball, basketball, bicycle, running sneakers, and a golden winner trophy.',
        },
        coloringMusic: {
          title: 'Coloring: Music Band & Instruments',
          text: 'Make music in colors: color an acoustic guitar, piano keys, drums, violin, and dancing musical notes in the air.',
        },
        coloringBakery: {
          title: 'Coloring: Sweet Bakery & Treats',
          text: 'Color delicious bakery treats: a festive birthday cake with candles, frosted donuts with sprinkles, cupcakes, and ice cream.',
        },
        coloringLatin: {
          title: 'Alphabet colouring book — Latin letters',
          text: 'Colour in the large hollow capital and small letters and the matching picture, then trace the grey letters and write them on the line below.',
        },
        coloringCyrillic: {
          title: 'Alphabet colouring book — Cyrillic letters',
          text: 'Colour in the large hollow Cyrillic capital and small letters and the matching picture, then trace and write the letters on the line below.',
        },
        colorByNumber: {
          title: 'Colour by number (1–6)',
          text: 'Check the colour key at the top to see which number matches which colour, then colour each numbered part of the scene.',
        },
        coloringScenes: {
          title: 'Big colouring book — nature, animals & space',
          text: 'Pick your favourite crayons and colour the cheerful nature scene with animals, the space rocket with planets and the underwater world.',
        },
        coloringHandWash: {
          title: 'Coloring: I Wash My Hands',
          text: 'We wash our hands before eating and after playing. Color all four pictures and tell the steps of handwashing in order.',
        },
        coloringTraffic: {
          title: 'Coloring: Traffic Lights & Crosswalk',
          text: 'Color the traffic lights in the right colors: red at the top, yellow in the middle, green at the bottom. We cross the street only at the crosswalk, when the light is green.',
        },
        coloringFood: {
          title: 'Coloring: Healthy Food',
          text: 'Color the healthy food on the big plate — it gives us energy every day. The box at the bottom has sweets we eat only sometimes: circle your favorite.',
        },
        coloringRecycle: {
          title: 'Coloring: Caring for Nature — Sort the Waste',
          text: 'Draw a line from each item to the bin it goes in. Color the paper bin blue, the plastic bin yellow and the glass bin green.',
        },
        coloringFeelings: {
          title: 'Coloring: How Do I Feel?',
          text: 'Look at the faces and show how each feeling looks. Color them, then draw how you feel today in the big circle at the bottom.',
        },
        timeSequence: {
          title: 'What happened first? Putting events in order',
          text: 'Look at the pictures in each row. In the box below, write 1 for what happened first, then 2, 3 and 4. Then color the pictures.',
        },
        timeDayParts: {
          title: 'Parts of the day: morning, noon, evening and night',
          text: 'Color what you do in the morning, at noon, in the evening and at night. Point to where the sun is in the morning and at noon. What do you do when the moon comes out?',
        },
        timeRoutine: {
          title: 'My day and the clock',
          text: 'Color the pictures in the order of your day. On the clock next to each picture, draw the hands — what time do you wake up, have lunch and go to bed?',
        },
        timeClock: {
          title: 'What time is it? Learning the clock',
          text: 'On the first page, color the big clock, then write the time under each small clock. On the second page, draw the hands: the short one for hours, the long one for minutes.',
        },
        timeWeek: {
          title: 'Days of the week — the caterpillar',
          text: 'Color the caterpillar: school days in one color, the weekend in another. Read the days in order, draw or write what you do on each one, then fill in yesterday, today and tomorrow.',
        },
        timeYear: {
          title: 'The year: months and seasons',
          text: 'Color the winter months blue, spring green, summer yellow and autumn orange. Find the month of your birthday, draw a heart in it and finish the sentence.',
        },
        timeClockRead: {
          title: 'Reading the clock: o\'clock and half past',
          text: 'On the first page, look at the hands and write the time (e.g. 6:30). On the second page, draw a line from each clock to the matching time.',
        },
        timeClockMath: {
          title: 'Clock math: what time will it be?',
          text: 'Look at the time on the first clock and how many hours to add or take away. Draw the hands on the second clock and write the new time.',
        },
        timeDaysOrder: {
          title: 'Days and months in order',
          text: 'Write the day before and after each day, fill in the missing months, and draw a line from each month to its season.',
        },
        timeCalendar: {
          title: 'Reading a calendar',
          text: 'Look at the calendar for one month and answer the questions below it. The first row shows short names of the days.',
        },
        mathNumberLine: {
          title: 'Number line jumps',
          text: 'Write the missing numbers on the number line. The arc shows a jump forward (+) or back (−) — work out where the jump lands.',
        },
        mathHouses: {
          title: 'Number houses — number bonds',
          text: 'The number on the roof is the sum of the two numbers on each floor. Write the missing number so they add up to the roof number.',
        },
        mathAdd10: {
          title: 'Addition within 10 (96 problems)',
          text: 'Add the numbers and write the sum in the box. Two pages with 48 problems each — take your time and check with fingers or pictures.',
        },
        mathSub10: {
          title: 'Subtraction within 10 (96 problems)',
          text: 'Subtract and write the difference in the box. Two pages with 48 problems each.',
        },
        mathMissing: {
          title: 'Find the missing number (within 10 and 20)',
          text: 'Write the missing number so the equation is true. Page one within 10, page two within 20.',
        },
        mathAddSub20: {
          title: 'Addition and subtraction within 20',
          text: 'Page one: without bridging ten. Page two: bridging ten (e.g. 8 + 5, 14 − 6).',
        },
        mathPyramids: {
          title: 'Number pyramids',
          text: 'Each brick is the sum of the two bricks below it. Fill in the empty bricks. Page one within 20, page two within 100.',
        },
        mathAddSub100: {
          title: 'Addition and subtraction within 100',
          text: 'Page one: without regrouping. Page two: with regrouping (e.g. 37 + 25, 62 − 18). Work out the tens first, then the ones.',
        },
        mathMultiply: {
          title: 'Times tables (96 problems)',
          text: 'Page one: multiplying by 1 to 5. Page two: by 6 to 10. Write the product in the box.',
        },
        mathDivide: {
          title: 'Division (96 problems)',
          text: 'Page one: dividing by 1 to 5. Page two: by 6 to 10. Use the times tables to help you.',
        },
        writingHandbookLatin: {
          title: 'How a story is made — a handbook for young writers (Latin script)',
          text: 'For grades 3–5: 12 topics on the rules writers follow, examples, reading tips, exercises, a story plan and a checklist.',
        },
        writingHandbookCyrillic: {
          title: 'How a story is made — a handbook for young writers (Cyrillic)',
          text: 'The same handbook in Cyrillic script: 12 topics on the rules writers follow, examples, reading tips and exercises.',
        },
        homeWorkbookMath2: {
          title: 'Practice at home — math, grade 2 (workbook)',
          text: 'One page a day: adding and subtracting to 100, swapping and grouping addends, greater and less, multiplication, clock and calendar, money (KM) and charts. At the end: a big challenge, a certificate and answers for parents.',
        },
        mathWordProblems: {
          title: 'Word problems: food, time, traffic and nature',
          text: 'Read each problem carefully, write the calculation and answer in a full sentence. The problems connect to the lessons on healthy food, the clock, days, traffic and caring for nature.',
        },
        trace: {
          title: 'Follow the path',
          text: 'Follow the dashed line from the bug to the flower with a pencil or crayon. Take your time and try to stay on the grey path.',
        },
        dots: {
          title: 'Join the dots',
          text: 'Join the dots in order, from 1 to the last number, then back to 1. Then colour in the picture.',
        },
        maze: {
          title: 'Bunny maze',
          text: 'Draw the way the bunny gets to the carrot. It can’t go through the hedge.',
        },
        numbers: {
          title: 'Writing numbers',
          text: 'Look at the black number first, then trace over each grey one with a pencil, starting at the top. Write the number on your own in the empty space.',
        },
        latin: {
          title: 'Writing letters',
          text: 'Trace over the grey letters, then write the letter on your own at the end of the row. Capital letters touch the top line, small letters the dashed middle line.',
        },
        cyrillic: {
          title: 'Writing letters — Cyrillic',
          text: 'Trace over the grey letters, then write the letter on your own at the end of the row. Capital letters touch the top line, small letters the dashed middle line.',
        },
        initialLetterLatin: {
          title: 'First letter — Latin',
          text: 'Name each picture, circle the right starting letter out of the three options and write it on the line at the beginning of the word.',
        },
        initialLetterCyrillic: {
          title: 'First letter — Cyrillic',
          text: 'Name each picture, circle the right starting Cyrillic letter out of the three options and write it on the line at the beginning of the word.',
        },
        letterMatchLatin: {
          title: 'Match capital and small letters — Latin',
          text: 'Draw a line to match each capital letter with its small letter at the top, then write the small letter next to the capital one in the boxes below.',
        },
        letterMatchCyrillic: {
          title: 'Match capital and small letters — Cyrillic',
          text: 'Draw a line to match each Cyrillic capital letter with its small letter at the top, then write the small letter in the boxes below.',
        },
        syllablesLatin: {
          title: 'Read and join syllables — Latin',
          text: 'Read the syllable table at the top out loud first. Then join the syllables into words and write the whole word on the line.',
        },
        syllablesCyrillic: {
          title: 'Read and join syllables — Cyrillic',
          text: 'Read the Cyrillic syllable table at the top out loud first. Then join the syllables into words and write the whole word on the line.',
        },
        scriptBridge: {
          title: 'Script bridge — Latin & Cyrillic',
          text: 'Match the corresponding letters between the Latin and Cyrillic scripts, then rewrite the words below in the other script.',
        },
        lines: {
          title: 'Straight lines',
          text: 'Draw a line from one picture to the other: the dog to its bone, the rabbit to the carrot, the rain from the cloud to the flower and the rocket to the moon. Follow the dashed line.',
        },
        waves: {
          title: 'Waves and loops',
          text: 'Each row starts with a black example. Trace the dashed pattern to the end of the row, without lifting the pencil if you can.',
        },
        outlines: {
          title: 'Trace the shapes',
          text: 'The first shape in each row is the example. Trace the dashed shapes, then name them: circle, square, triangle, heart, star.',
        },
        colors: {
          title: 'Colour by shape',
          text: 'Look at the top to see which colour goes with each shape, then colour every shape on the sheet in its colour.',
        },
        count: {
          title: 'Count and circle',
          text: 'Count the pictures in each row and circle the right number.',
        },
        quantity: {
          title: 'Draw how many',
          text: 'In each box, draw as many circles (or apples, or suns) as the number shows.',
        },
        adding: {
          title: 'Add the pictures',
          text: 'Count the pictures on both sides of the plus sign and write in the box how many there are altogether.',
        },
        subtraction: {
          title: 'Subtract with pictures',
          text: 'Look at how many pictures are in each row and how many are crossed out. Count how many are left and write the answer in the box.',
        },
        compareNumbers: {
          title: 'Compare groups and numbers (<, >, =)',
          text: 'Count the pictures on the left and right, then write < (less than), > (greater than) or = (equal to) inside the middle circle.',
        },
        missingNumbers: {
          title: 'Number train & number neighbours',
          text: 'Fill in the missing numbers from 1 to 10 in the train cars at the top, then write the number before and the number after in the boxes below.',
        },
        sizes: {
          title: 'Smallest to biggest',
          text: 'In each row, write the numbers 1 to 4 under the pictures: 1 under the smallest, 4 under the biggest.',
        },
        pattern: {
          title: 'What comes next?',
          text: 'Look at how the pictures repeat, then draw what comes next in the empty boxes.',
        },
        odd: {
          title: 'Odd one out',
          text: 'In each row, one picture is not like the others. Find it, circle it and say why it doesn’t belong.',
        },
        match: {
          title: 'What goes together?',
          text: 'Draw a line between the pictures that go together: the dog and the bone, the rain and the umbrella… Go from dot to dot.',
        },
        shapes: {
          title: 'Find the shadow',
          text: 'Draw a line from each picture on the left to its shadow on the right.',
        },
        differences: {
          title: 'Spot 5 differences',
          text: 'Compare the top and bottom pictures. Circle the 5 things that are different in the bottom one.',
        },
        symmetry: {
          title: 'Finish the other half',
          text: 'Only the left half of each picture is drawn. Draw the right half like a mirror image: the dashed line is the mirror. Count the squares.',
        },
        copy: {
          title: 'Copy the picture',
          text: 'Copy the drawing from the left grid onto the empty grid on the right. Count the squares and start from the same corner.',
        },
      },
    },
    list: {
      balloons: {
        title: 'Balloons',
        short: 'Balloons are floating up — tap them before they fly away.',
        howTo: 'Tap a balloon to pop it. Pop ten balloons to finish. No hurry — new balloons keep coming.',
      },
      colors: {
        title: 'Sort the colours',
        short: 'Drag each block into the basket of the same colour.',
        howTo: 'Hold a block with your finger and drag it into the basket of the same colour. Or tap the block, then tap the basket.',
      },
      shapes: {
        title: 'Shapes in their places',
        short: 'Circle, square, triangle… every shape has its own shadow.',
        howTo: 'Drag each shape onto the dashed shadow that matches it. Name the shapes out loud as you play.',
      },
      trace: {
        title: 'Follow the path',
        short: 'Guide the bug along the path to the flower, slowly and carefully.',
        howTo: 'Put your finger on the bug and slowly guide it along the path to the flower. If your finger slips, go back to the path and carry on.',
      },
      dots: {
        title: 'Join the dots',
        short: 'Tap the numbers in order to reveal a hidden picture.',
        howTo: 'Tap 1, then 2, then 3… A line joins the dots and a picture appears at the end. Count out loud together.',
      },
      maze: {
        title: 'Bunny maze',
        short: 'Help the bunny find its way through the maze to the carrot.',
        howTo: 'Drag the bunny along the path to the carrot — it can’t go through the hedge. Arrow keys work on a computer.',
      },
      memory: {
        title: 'Find the pair',
        short: 'Turn the cards over and remember where each picture hides.',
        howTo: 'Tap two cards. If they match, they stay open; if not, they turn back. Find all the pairs.',
      },
      pattern: {
        title: 'What comes next?',
        short: 'Red, blue, red… guess what continues the pattern.',
        howTo: 'Look at the pattern and choose the shape that goes where the question mark is. Try “reading” the pattern out loud first.',
      },
      count: {
        title: 'Count them',
        short: 'How many pictures are on the board? Count and pick the number.',
        howTo: 'Count the pictures — point at each one with your finger. Then tap the right number.',
      },
      sizes: {
        title: 'Small to big',
        short: 'Put the pictures on the shelf from smallest to biggest.',
        howTo: 'Tap the pictures in order: the smallest first, then bigger and bigger. Each one goes onto the shelf.',
      },
      coloring: {
        title: 'Colour letters & pictures',
        short: 'Pick a colour and paint big and small letters, an apple, the sun, a house and a rocket.',
        howTo: 'Choose the script (Latin or Cyrillic) at the top, tap a colour in the palette below, then tap parts of the letters and drawing to colour them in.',
      },
      letters: {
        title: 'Starting letter (Latin & Cyrillic)',
        short: 'Look at the picture and pick the letter the word starts with.',
        howTo: 'Name the object in the picture, select Latin or Cyrillic at the top, and tap the matching starting letter among the three options.',
      },
    },
  },
  world: {
    eyebrow: 'Schools worldwide',
    title: 'Primary school around the world',
    description:
      'How other countries teach their youngest pupils: school starting age, teachers, assessment and testing — compared with Bosnia and Herzegovina.',
    intro:
      'How other countries teach children in the first years of primary school — and what we could borrow at home. Bosnia and Herzegovina is the point of reference.',
    note: 'Figures come from official sources (Eurydice, OECD, ministries), listed with each country. Systems change, so each country shows when its data was last checked.',
    reference: 'Point of reference',
    countriesTitle: 'Countries',
    compareEyebrow: 'Comparison',
    compareTitle: 'Side by side',
    compareCaption: 'Primary education compared by country',
    compareScroll: 'The table scrolls sideways.',
    facts: {
      schoolStart: 'School starting age',
      compulsory: 'Compulsory education',
      tracking: 'First tracking',
      primaryTeacher: 'Who teaches the early grades',
      teacherEducation: 'Teacher education',
      grading: 'Assessment',
      testing: 'National testing',
    },
    keyIdea: 'Key idea',
    pisa: 'PISA (15-year-olds)',
    timss: 'TIMSS (grade 4)',
    pirls: 'PIRLS (grade 4, reading)',
    math: 'Mathematics',
    reading: 'Reading',
    science: 'Science',
    resultsEyebrow: 'Results',
    resultsTitle: 'International assessments',
    resultsIntro:
      'PISA tests 15-year-olds, while TIMSS and PIRLS test pupils in grade 4 — so for primary school, TIMSS and PIRLS are the closest comparison.',
    resultsCaption: 'International assessment results by country',
    oecdAverage: 'OECD average',
    scaleNote: 'TIMSS and PIRLS have no OECD average; the centre point of their scale is 500.',
    notTaken: 'did not take part',
    olderCycle: (year: number) => `data from ${year}`,
    sources: 'Sources',
    checked: 'Data checked',
    readMore: 'Read more',
    allCountries: 'All countries',
    otherCountries: 'Other countries',
    notFoundTitle: 'Country not found',
    notFoundMessage: 'This country has not been described yet, or is not available in this language.',
    emptyTitle: 'Coming soon in English',
    emptyMessage: 'The comparison of school systems is currently available in Serbian only.',
    emptyAction: 'Open in Serbian',
  },
  notFound: {
    eyebrow: 'Error',
    title: 'Page not found.',
    backHome: 'Back to home',
  },
  error: {
    title: 'Something went wrong',
    message: 'The page did not load properly. Please refresh it — if the site was just updated, that usually fixes it.',
    reload: 'Refresh the page',
  },
};
