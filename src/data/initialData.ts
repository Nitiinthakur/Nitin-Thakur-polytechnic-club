import { Subject, MockTest, PreviousYearPaper, DailyQuiz, Announcement, CurrentAffairsItem, LeaderboardEntry, Question } from '../types';

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    titleEn: 'JEECUP 2026 Application Form & Exam Notification Released',
    titleHi: 'JEECUP 2026 आवेदन पत्र एवं परीक्षा अधिसूचना जारी',
    category: 'Exam Date',
    date: '10 Nov 2026',
    isImportant: true,
    badge: 'NEW',
    contentEn: 'Joint Entrance Examination Council Uttar Pradesh (JEECUP 2026) has announced the examination schedule for Group A (Engineering) and other Diploma courses. The CBT entrance examination is scheduled for May 2026.',
    contentHi: 'संयुक्त प्रवेश परीक्षा परिषद उत्तर प्रदेश (JEECUP 2026) ने ग्रुप A (इंजीनियरिंग) और अन्य डिप्लोमा पाठ्यक्रमों के लिए परीक्षा कार्यक्रम की घोषणा की है। कंप्यूटर आधारित प्रवेश परीक्षा मई 2026 में आयोजित की जाएगी।',
    linkText: 'Check Eligibility & Exam Pattern'
  },
  {
    id: 'ann-2',
    titleEn: 'Bihar Polytechnic (DCECE/PE 2026) Syllabus & Blueprint Updated',
    titleHi: 'बिहार पॉलिटेक्निक (DCECE/PE 2026) पाठ्यक्रम व ब्लूप्रिंट अपडेट',
    category: 'Syllabus',
    date: '05 Nov 2026',
    isImportant: false,
    badge: 'SYLLABUS',
    contentEn: 'BCECE Board has published the official subject weightage for Polytechnic Engineering (PE). Physics (30 Qs), Chemistry (30 Qs), and Mathematics (30 Qs) carry 450 total marks (5 marks per question).',
    contentHi: 'BCECE बोर्ड ने पॉलिटेक्निक इंजीनियरिंग (PE) के लिए आधिकारिक विषय वेटेज जारी किया है। भौतिक विज्ञान (30 प्रश्न), रसायन विज्ञान (30 प्रश्न) और गणित (30 प्रश्न) कुल 450 अंकों के होंगे।',
    linkText: 'View State Syllabus'
  },
  {
    id: 'ann-3',
    titleEn: 'JEECUP Marking Scheme: +4 Marks for Correct, No Negative Marking in Group A 2026',
    titleHi: 'JEECUP अंकन योजना: सही उत्तर पर +4 अंक, ग्रुप A में नकारात्मक अंकन नहीं',
    category: 'Exam Date',
    date: '28 Oct 2026',
    isImportant: true,
    badge: 'CRITICAL',
    contentEn: 'As per the updated exam regulations, 100 questions of 400 marks will be asked (50 Mathematics, 25 Physics, 25 Chemistry). Make sure to practice with 100-question timed mocks.',
    contentHi: 'अद्यतन परीक्षा नियमों के अनुसार, 400 अंकों के 100 प्रश्न पूछे जाएंगे (50 गणित, 25 भौतिकी, 25 रसायन)। 100 प्रश्नों वाले समयबद्ध मॉक टेस्ट का नियमित अभ्यास करें।',
    linkText: 'Practice 100-Q CBT Mock'
  },
  {
    id: 'ann-4',
    titleEn: 'JEECUP 2025 Counseling & Cut-off Marks Archive Uploaded',
    titleHi: 'JEECUP 2025 काउंसलिंग एवं कट-ऑफ अंक संग्रह अपलोड किया गया',
    category: 'Counseling',
    date: '15 Oct 2026',
    isImportant: false,
    badge: 'CUTOFF',
    contentEn: 'Government Polytechnic Lucknow, Kanpur, and Gorakhpur opening & closing ranks for Civil, Electrical, Mechanical, and CS branches have been added to the reference vault.',
    contentHi: 'राजकीय पॉलिटेक्निक लखनऊ, कानपुर और गोरखपुर के सिविल, इलेक्ट्रिकल, मैकेनिकल और सीएस शाखाओं के ओपनिंग और क्लोजिंग रैंक संदर्भ के लिए उपलब्ध हैं।',
    linkText: 'View College Cutoffs'
  }
];

export const CURRENT_AFFAIRS_ITEMS: CurrentAffairsItem[] = [
  {
    id: 'ca-1',
    date: '08 Nov 2026',
    category: 'Science & Tech',
    titleEn: 'ISRO successfully tests Next-Gen Cryogenic Engine for Heavy Lift Launchers',
    titleHi: 'इसरो ने भारी प्रक्षेपण यान के लिए नेक्स्ट-जेन क्रायोजेनिक इंजन का सफल परीक्षण किया',
    descriptionEn: 'The CE-20 cryogenic engine was hot-tested for an extended duration of 720 seconds at the ISRO Propulsion Complex, Mahendragiri, marking a major milestone for Indian aerospace engineering.',
    descriptionHi: 'CE-20 क्रायोजेनिक इंजन का इसरो प्रोपल्शन कॉम्प्लेक्स, महेंद्रगिरि में 720 सेकंड की अवधि के लिए हॉट टेस्ट किया गया, जो भारतीय अंतरिक्ष इंजीनियरिंग के लिए महत्वपूर्ण मील का पत्थर है।'
  },
  {
    id: 'ca-2',
    date: '07 Nov 2026',
    category: 'National',
    titleEn: 'National Green Hydrogen Mission expands with 3 new testing clusters',
    titleHi: 'राष्ट्रीय हरित हाइड्रोजन मिशन 3 नए परीक्षण समूहों के साथ विस्तारित',
    descriptionEn: 'Ministry of New & Renewable Energy established dedicated high-pressure testing labs in Gujarat, Odisha, and Tamil Nadu to accelerate green ammonia and fuel cell manufacturing.',
    descriptionHi: 'नवीन और नवीकरणीय ऊर्जा मंत्रालय ने हरित अमोनिया और ईंधन सेल विनिर्माण को गति देने के लिए गुजरात, ओडिशा और तमिलनाडु में उच्च दबाव परीक्षण प्रयोगशालाएं स्थापित की हैं।'
  },
  {
    id: 'ca-3',
    date: '06 Nov 2026',
    category: 'Awards',
    titleEn: 'Shanti Swarup Bhatnagar Prize 2026 announced for Physical Sciences',
    titleHi: 'भौतिक विज्ञान के लिए शांति स्वरूप भटनागर पुरस्कार 2026 घोषित',
    descriptionEn: 'Prestigious award conferred for groundbreaking research in 2D quantum semiconductors and high-efficiency photovoltaic materials.',
    descriptionHi: '2D क्वांटम सेमीकंडक्टर और उच्च-दक्षता फोटोवोल्टाइक सामग्रियों में महत्वपूर्ण शोध के लिए यह प्रतिष्ठित पुरस्कार प्रदान किया गया।'
  }
];

export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 'mathematics',
    nameEn: 'Mathematics',
    nameHi: 'गणित',
    iconName: 'Calculator',
    color: 'from-blue-600 to-indigo-700',
    descriptionEn: 'Carries 50% weightage in JEECUP Group A (50 out of 100 questions, 200 marks). Core focus on 9th-10th algebra, mensuration, trigonometry, and statistics.',
    descriptionHi: 'JEECUP ग्रुप A में 50% वेटेज (100 में से 50 प्रश्न, 200 अंक)। बीजगणित, क्षेत्रमिति, त्रिकोणमिति और सांख्यिकी पर विशेष ध्यान।',
    totalChapters: 6,
    chapters: [
      {
        id: 'math-ch1',
        subjectId: 'mathematics',
        titleEn: 'Number System',
        titleHi: 'संख्या पद्धति',
        order: 1,
        summaryEn: 'Rational & irrational numbers, laws of exponents, surds, prime factorization, and HCF-LCM applications.',
        summaryHi: 'परिमेय एवं अपरिमेय संख्याएं, घातांक नियम, करणी, अभाज्य गुणनखंड तथा म.स.प. व ल.स.प. के अनुप्रयोग।',
        notesEn: [
          'Rational Numbers: Numbers expressible as p/q where p, q are integers and q != 0. Terminating or recurring decimals.',
          'Irrational Numbers: Non-terminating, non-recurring decimals like √2, √3, π.',
          'Real Numbers: The union of all rational and irrational numbers.',
          'Surds: An irrational root of a rational number, e.g., ∛5, √7.',
          'HCF and LCM Relation: For two positive integers a and b, HCF(a, b) × LCM(a, b) = a × b.',
          'Euclid Division Lemma: a = bq + r, where 0 <= r < b.'
        ],
        notesHi: [
          'परिमेय संख्याएं: वे संख्याएं जिन्हें p/q के रूप में लिखा जा सकता है जहाँ p और q पूर्णांक हैं तथा q != 0 है।',
          'अपरिमेय संख्याएं: असांत और अनावर्ती दशमलव जैसे √2, √3, π।',
          'वास्तविक संख्याएं: सभी परिमेय और अपरिमेय संख्याओं का समुच्चय।',
          'करणी (Surds): किसी परिमेय संख्या का अपरिमेय मूल जैसे √5, ∛7।',
          'म.स.प. और ल.स.प. संबंध: दो संख्याओं a और b के लिए, HCF(a, b) × LCM(a, b) = a × b होता है।',
          'यूक्लिड विभाजन प्रमेयिका: a = bq + r, जहाँ 0 <= r < b।'
        ],
        keyPointsEn: [
          'Sum of a rational and irrational number is always irrational.',
          'Product of two irrational numbers can be rational or irrational (e.g. √2 × √2 = 2).',
          'Every composite number can be uniquely factorized into primes (Fundamental Theorem of Arithmetic).'
        ],
        keyPointsHi: [
          'एक परिमेय और एक अपरिमेय संख्या का योगफल सदैव अपरिमेय होता है।',
          'दो अपरिमेय संख्याओं का गुणनफल परिमेय या अपरिमेय कुछ भी हो सकता है (जैसे √2 × √2 = 2)।',
          'प्रत्येक भाज्य संख्या को अभाज्य संख्याओं के अद्वितीय गुणनफल के रूप में लिखा जा सकता है।'
        ],
        formulas: [
          {
            id: 'f-math-1',
            titleEn: 'HCF × LCM Product Rule',
            titleHi: 'म.स.प. × ल.स.प. गुणन नियम',
            formula: 'HCF(a, b) × LCM(a, b) = a × b',
            explanationEn: 'The product of two positive numbers is equal to the product of their HCF and LCM.',
            explanationHi: 'दो धनात्मक संख्याओं का गुणनफल उनके महत्तम समापवर्तक और लघुत्तम समापवर्त्य के गुणनफल के बराबर होता है।'
          },
          {
            id: 'f-math-2',
            titleEn: 'Laws of Exponents for Surds',
            titleHi: 'करणी व घातांक के नियम',
            formula: 'a^(m) × a^(n) = a^(m+n), (a^m)^n = a^(mn)',
            explanationEn: 'When multiplying powers with the same base, add their exponents.',
            explanationHi: 'समान आधार वाली घातों का गुणा करने पर घातांक आपस में जुड़ जाते हैं।'
          },
          {
            id: 'f-math-3',
            titleEn: 'Rationalization of Denominator',
            titleHi: 'हर का परिमेयकरण',
            formula: '1 / (√a + √b) = (√a - √b) / (a - b)',
            explanationEn: 'Multiply numerator and denominator by conjugate pair (√a - √b).',
            explanationHi: 'अंश और हर दोनों को संयुग्मी (√a - √b) से गुणा किया जाता है।'
          }
        ],
        mcqs: [
          {
            id: 'q-math-1',
            subjectId: 'mathematics',
            chapterId: 'math-ch1',
            chapterTitleEn: 'Number System',
            chapterTitleHi: 'संख्या पद्धति',
            textEn: 'If the HCF of two numbers is 16 and their product is 3072, then their LCM is:',
            textHi: 'यदि दो संख्याओं का म.स.प. (HCF) 16 है और उनका गुणनफल 3072 है, तो उनका ल.स.प. (LCM) क्या होगा?',
            optionsEn: ['182', '192', '196', '204'],
            optionsHi: ['182', '192', '196', '204'],
            correctOptionIndex: 1,
            explanationEn: 'LCM = (Product of numbers) / HCF = 3072 / 16 = 192.',
            explanationHi: 'ल.स.प. = (संख्याओं का गुणनफल) / म.स.प. = 3072 / 16 = 192.',
            examSource: 'JEECUP 2024 Group A',
            isDemo: false,
            year: 2024,
            difficulty: 'Easy'
          },
          {
            id: 'q-math-2',
            subjectId: 'mathematics',
            chapterId: 'math-ch1',
            chapterTitleEn: 'Number System',
            chapterTitleHi: 'संख्या पद्धति',
            textEn: 'Which of the following is an irrational number?',
            textHi: 'निम्नलिखित में से कौन-सी एक अपरिमेय संख्या है?',
            optionsEn: ['√4', '√9', '√7', '0.333...'],
            optionsHi: ['√4', '√9', '√7', '0.333...'],
            correctOptionIndex: 2,
            explanationEn: '√4 = 2 (rational), √9 = 3 (rational), 0.333... = 1/3 (rational). √7 cannot be written as p/q, hence irrational.',
            explanationHi: '√4 = 2 (परिमेय), √9 = 3 (परिमेय), 0.333... = 1/3 (परिमेय)। √7 को p/q के रूप में नहीं लिखा जा सकता, अतः यह अपरिमेय है।',
            examSource: 'Bihar PE 2023',
            isDemo: false,
            year: 2023,
            difficulty: 'Easy'
          },
          {
            id: 'q-math-3',
            subjectId: 'mathematics',
            chapterId: 'math-ch1',
            chapterTitleEn: 'Number System',
            chapterTitleHi: 'संख्या पद्धति',
            textEn: 'Value of (256)^0.16 × (256)^0.09 is equal to:',
            textHi: '(256)^0.16 × (256)^0.09 का मान किसके बराबर है?',
            optionsEn: ['4', '16', '64', '256.25'],
            optionsHi: ['4', '16', '64', '256.25'],
            correctOptionIndex: 0,
            explanationEn: '(256)^(0.16 + 0.09) = (256)^0.25 = (256)^(1/4) = (4^4)^(1/4) = 4.',
            explanationHi: '(256)^(0.16 + 0.09) = (256)^0.25 = (256)^(1/4) = (4^4)^(1/4) = 4.',
            examSource: 'JEECUP 2023 Group A',
            isDemo: false,
            year: 2023,
            difficulty: 'Medium'
          }
        ],
        importantQA: [
          {
            questionEn: 'How to prove that √2 is an irrational number using contradiction?',
            questionHi: 'विरोधाभास विधि से यह कैसे सिद्ध करें कि √2 एक अपरिमेय संख्या है?',
            answerEn: 'Assume √2 is rational, i.e., √2 = a/b where a and b are co-prime integers (b ≠ 0). Squaring gives 2 = a²/b² => 2b² = a². Thus 2 divides a², meaning 2 divides a. Let a = 2c. Then 2b² = 4c² => b² = 2c², so 2 divides b. This contradicts that a and b are co-prime. Hence √2 is irrational.',
            answerHi: 'मान लें √2 एक परिमेय संख्या है, अर्थात √2 = a/b जहाँ a और b सह-अभाज्य पूर्णांक हैं (b ≠ 0)। दोनों पक्षों का वर्ग करने पर 2b² = a² मिलता है। इसका अर्थ है कि 2, a को विभाजित करता है। यदि a = 2c रखें, तो b² = 2c² मिलता है, जिससे 2, b को भी विभाजित करता है। यह इस तथ्य का खंडन करता है कि a और b सह-अभाज्य हैं। अतः √2 अपरिमेय है।'
          }
        ]
      },
      {
        id: 'math-ch2',
        subjectId: 'mathematics',
        titleEn: 'Algebra',
        titleHi: 'बीजगणित',
        order: 2,
        summaryEn: 'Polynomials, linear equations in two variables, quadratic equations, discriminant, arithmetic progressions.',
        summaryHi: 'बहुपद, दो चरों वाले रैखिक समीकरण, द्विघात समीकरण, विविक्तकर (Discriminant) एवं समांतर श्रेढ़ी (AP)।',
        notesEn: [
          'Quadratic Equation standard form: ax² + bx + c = 0 (a ≠ 0).',
          'Roots formula (Shreedharacharya Formula): x = [-b ± √(b² - 4ac)] / (2a).',
          'Discriminant D = b² - 4ac:',
          '  - If D > 0: Two distinct real roots.',
          '  - If D = 0: Two equal real roots (x = -b/(2a)).',
          '  - If D < 0: No real roots (imaginary roots).',
          'Sum of roots (α + β) = -b/a, Product of roots (αβ) = c/a.',
          'Arithmetic Progression (AP): nth term a_n = a + (n - 1)d; Sum S_n = (n/2)[2a + (n - 1)d].'
        ],
        notesHi: [
          'द्विघात समीकरण का मानक रूप: ax² + bx + c = 0 (a ≠ 0)।',
          'श्रीधराचार्य सूत्र: x = [-b ± √(b² - 4ac)] / (2a)।',
          'विविक्तकर (Discriminant) D = b² - 4ac:',
          '  - यदि D > 0: दो भिन्न वास्तविक मूल।',
          '  - यदि D = 0: दो बराबर वास्तविक मूल (x = -b/(2a))।',
          '  - यदि D < 0: कोई वास्तविक मूल नहीं (काल्पनिक मूल)।',
          'मूलों का योगफल (α + β) = -b/a, मूलों का गुणनफल (αβ) = c/a।',
          'समांतर श्रेढ़ी (AP): n-वाँ पद a_n = a + (n - 1)d; n पदों का योग S_n = (n/2)[2a + (n - 1)d]।'
        ],
        keyPointsEn: [
          'If one root of a quadratic equation with rational coefficients is (p + √q), the other root must be (p - √q).',
          'For infinitely many solutions in a₁x + b₁y + c₁ = 0 and a₂x + b₂y + c₂ = 0: a₁/a₂ = b₁/b₂ = c₁/c₂.'
        ],
        keyPointsHi: [
          'यदि परिमेय गुणांक वाले द्विघात समीकरण का एक मूल (p + √q) है, तो दूसरा मूल निश्चित रूप से (p - √q) होगा।',
          'अपरिमित रूप से अनेक हलों के लिए: a₁/a₂ = b₁/b₂ = c₁/c₂ होना चाहिए।'
        ],
        formulas: [
          {
            id: 'f-math-4',
            titleEn: 'Quadratic Roots (Shreedharacharya)',
            titleHi: 'द्विघात सूत्र (श्रीधराचार्य नियम)',
            formula: 'x = (-b ± √(b² - 4ac)) / (2a)',
            explanationEn: 'Gives the two roots of quadratic equation ax² + bx + c = 0.',
            explanationHi: 'द्विघात समीकरण ax² + bx + c = 0 के दोनों मूल ज्ञात करने का मानक सूत्र।'
          },
          {
            id: 'f-math-5',
            titleEn: 'Sum of n terms of AP',
            titleHi: 'समांतर श्रेढ़ी के n पदों का योग',
            formula: 'S_n = (n / 2) × [2a + (n - 1)d] = (n / 2) × (a + l)',
            explanationEn: 'Where a is the first term, d is common difference, and l is the last term.',
            explanationHi: 'जहाँ a प्रथम पद, d सार्व अंतर और l अंतिम पद है।'
          }
        ],
        mcqs: [
          {
            id: 'q-math-4',
            subjectId: 'mathematics',
            chapterId: 'math-ch2',
            chapterTitleEn: 'Algebra',
            chapterTitleHi: 'बीजगणित',
            textEn: 'If the roots of equation 2x² - 8x + k = 0 are equal, find the value of k:',
            textHi: 'यदि समीकरण 2x² - 8x + k = 0 के मूल बराबर हैं, तो k का मान ज्ञात कीजिए:',
            optionsEn: ['4', '8', '16', '32'],
            optionsHi: ['4', '8', '16', '32'],
            correctOptionIndex: 1,
            explanationEn: 'For equal roots, D = b² - 4ac = 0 => (-8)² - 4(2)(k) = 0 => 64 - 8k = 0 => k = 8.',
            explanationHi: 'समान मूलों के लिए विविक्तकर D = b² - 4ac = 0 => (-8)² - 4(2)(k) = 0 => 64 - 8k = 0 => k = 8.',
            examSource: 'JEECUP 2024 Group A',
            isDemo: false,
            year: 2024,
            difficulty: 'Medium'
          },
          {
            id: 'q-math-5',
            subjectId: 'mathematics',
            chapterId: 'math-ch2',
            chapterTitleEn: 'Algebra',
            chapterTitleHi: 'बीजगणित',
            textEn: 'The 10th term of the AP 2, 7, 12, ... is:',
            textHi: 'समांतर श्रेढ़ी 2, 7, 12, ... का 10वाँ पद क्या होगा?',
            optionsEn: ['42', '47', '52', '57'],
            optionsHi: ['42', '47', '52', '57'],
            correctOptionIndex: 1,
            explanationEn: 'Here a = 2, d = 7 - 2 = 5. a₁₀ = a + 9d = 2 + 9(5) = 2 + 45 = 47.',
            explanationHi: 'यहाँ a = 2, सार्व अंतर d = 7 - 2 = 5 है। a₁₀ = a + 9d = 2 + 9(5) = 2 + 45 = 47.',
            examSource: 'UP Polytechnic 2023',
            isDemo: false,
            year: 2023,
            difficulty: 'Easy'
          }
        ],
        importantQA: [
          {
            questionEn: 'How to determine the condition for unique solution vs no solution in a system of linear equations?',
            questionHi: 'रैखिक समीकरण निकाय के अद्वितीय हल एवं कोई हल न होने की शर्त कैसे ज्ञात करते हैं?',
            answerEn: 'For a₁x + b₁y + c₁ = 0 and a₂x + b₂y + c₂ = 0: (1) Unique solution: a₁/a₂ ≠ b₁/b₂ (intersecting lines). (2) No solution: a₁/a₂ = b₁/b₂ ≠ c₁/c₂ (parallel lines). (3) Infinite solutions: a₁/a₂ = b₁/b₂ = c₁/c₂ (coincident lines).',
            answerHi: 'दो चरों वाले रैखिक समीकरणों के लिए: (1) अद्वितीय हल: a₁/a₂ ≠ b₁/b₂ (प्रतिच्छेदी रेखाएं)। (2) कोई हल नहीं: a₁/a₂ = b₁/b₂ ≠ c₁/c₂ (समांतर रेखाएं)। (3) अनंत हल: a₁/a₂ = b₁/b₂ = c₁/c₂ (संपाती रेखाएं)।'
          }
        ]
      },
      {
        id: 'math-ch3',
        subjectId: 'mathematics',
        titleEn: 'Geometry',
        titleHi: 'ज्यामिति',
        order: 3,
        summaryEn: 'Lines and angles, triangles, Pythagoras theorem, similarity, circles, tangents and cyclic quadrilaterals.',
        summaryHi: 'रेखाएं और कोण, त्रिभुज, पाइथागोरस प्रमेय, समरूपता, वृत्त, स्पर्श रेखाएं एवं चक्रीय चतुर्भुज।',
        notesEn: [
          'Thales Theorem (Basic Proportionality Theorem): If a line is drawn parallel to one side of a triangle, it divides other two sides in the same ratio.',
          'Pythagoras Theorem: In a right-angled triangle, Hypotenuse² = Base² + Perpendicular².',
          'Circle Tangent Theorem: The tangent at any point of a circle is perpendicular to the radius through the point of contact.',
          'Lengths of two tangents drawn from an external point to a circle are equal.',
          'Cyclic Quadrilateral: The sum of either pair of opposite angles of a cyclic quadrilateral is 180°.'
        ],
        notesHi: [
          'थेल्स प्रमेय (आधारभूत आनुपातिकता प्रमेय): यदि किसी त्रिभुज की एक भुजा के समांतर रेखा खींची जाए, तो वह अन्य दो भुजाओं को समान अनुपात में विभाजित करती है।',
          'पाइथागोरस प्रमेय: समकोण त्रिभुज में, कर्ण² = आधार² + लंब²।',
          'वृत्त की स्पर्श रेखा प्रमेय: वृत्त के किसी बिंदु पर स्पर्श रेखा, स्पर्श बिंदु से होकर जाने वाली त्रिज्या पर लंब होती है।',
          'किसी बाह्य बिंदु से वृत्त पर खींची गई दोनों स्पर्श रेखाओं की लंबाइयाँ समान होती हैं।',
          'चक्रीय चतुर्भुज: चक्रीय चतुर्भुज के सम्मुख कोणों का योग 180° होता है।'
        ],
        keyPointsEn: [
          'The angle subtended by an arc at the center is double the angle subtended by it at any point on the remaining part of the circle.',
          'Angle in a semi-circle is always 90° (right angle).'
        ],
        keyPointsHi: [
          'किसी चाप द्वारा केंद्र पर अंतरित कोण, वृत्त के शेष भाग के किसी बिंदु पर अंतरित कोण का दोगुना होता है।',
          'अर्धवृत्त में बना कोण सदैव समकोण (90°) होता है।'
        ],
        formulas: [
          {
            id: 'f-math-6',
            titleEn: 'Pythagoras Theorem',
            titleHi: 'पाइथागोरस प्रमेय',
            formula: 'c² = a² + b²',
            explanationEn: 'In a right triangle with hypotenuse c and legs a, b.',
            explanationHi: 'समकोण त्रिभुज में कर्ण c तथा भुजाओं a और b के मध्य संबंध।'
          },
          {
            id: 'f-math-7',
            titleEn: 'Similarity Area Ratio',
            titleHi: 'समरूप त्रिभुज क्षेत्रफल अनुपात',
            formula: 'Area(ΔABC) / Area(ΔPQR) = (AB / PQ)²',
            explanationEn: 'The ratio of areas of two similar triangles is equal to the square of the ratio of their corresponding sides.',
            explanationHi: 'दो समरूप त्रिभुजों के क्षेत्रफलों का अनुपात उनकी संगत भुजाओं के अनुपात के वर्ग के बराबर होता है।'
          }
        ],
        mcqs: [
          {
            id: 'q-math-6',
            subjectId: 'mathematics',
            chapterId: 'math-ch3',
            chapterTitleEn: 'Geometry',
            chapterTitleHi: 'ज्यामिति',
            textEn: 'In a circle of radius 5 cm, the length of the tangent drawn from an external point 13 cm away from the center is:',
            textHi: '5 सेमी त्रिज्या वाले वृत्त में, केंद्र से 13 सेमी दूर स्थित बिंदु से खींची गई स्पर्श रेखा की लंबाई होगी:',
            optionsEn: ['10 cm', '11 cm', '12 cm', '14 cm'],
            optionsHi: ['10 सेमी', '11 सेमी', '12 सेमी', '14 सेमी'],
            correctOptionIndex: 2,
            explanationEn: 'Tangent length = √(d² - r²) = √(13² - 5²) = √(169 - 25) = √144 = 12 cm.',
            explanationHi: 'स्पर्श रेखा की लंबाई = √(d² - r²) = √(13² - 5²) = √(169 - 25) = √144 = 12 सेमी।',
            examSource: 'JEECUP 2024 Group A',
            isDemo: false,
            year: 2024,
            difficulty: 'Easy'
          }
        ],
        importantQA: [
          {
            questionEn: 'State and explain the alternate segment theorem in circles.',
            questionHi: 'वृत्त के एकांतर खंड प्रमेय का उल्लेख व व्याख्या कीजिए।',
            answerEn: 'If a line touches a circle and from the point of contact a chord is drawn, the angles which this chord makes with the given line are equal respectively to the angles formed in the corresponding alternate segments.',
            answerHi: 'यदि कोई स्पर्श रेखा वृत्त को स्पर्श करती है और स्पर्श बिंदु से एक जीवा खींची जाती है, तो यह जीवा स्पर्श रेखा के साथ जो कोण बनाती है, वे संगत एकांतर वृत्तखंडों में बने कोणों के बराबर होते हैं।'
          }
        ]
      },
      {
        id: 'math-ch4',
        subjectId: 'mathematics',
        titleEn: 'Trigonometry',
        titleHi: 'त्रिकोणमिति',
        order: 4,
        summaryEn: 'Trigonometric ratios, identities, complementary angles, and heights and distances applications.',
        summaryHi: 'त्रिकोणमितीय अनुपात, सर्वसमिकाएं, पूरक कोण तथा ऊँचाई एवं दूरी के व्यावहारिक अनुप्रयोग।',
        notesEn: [
          'sin θ = Opp/Hyp, cos θ = Adj/Hyp, tan θ = Opp/Adj.',
          'Fundamental Identities: sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ, 1 + cot²θ = cosec²θ.',
          'Complementary angles: sin(90° - θ) = cos θ, tan(90° - θ) = cot θ, sec(90° - θ) = cosec θ.',
          'Angle of Elevation: Angle formed by the line of sight with horizontal when object is above eye level.',
          'Angle of Depression: Angle formed with horizontal when object is below eye level.'
        ],
        notesHi: [
          'sin θ = लंब/कर्ण, cos θ = आधार/कर्ण, tan θ = लंब/आधार।',
          'मूल सर्वसमिकाएं: sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ, 1 + cot²θ = cosec²θ।',
          'पूरक कोण: sin(90° - θ) = cos θ, tan(90° - θ) = cot θ, sec(90° - θ) = cosec θ।',
          'उन्नयन कोण: जब वस्तु आँख के स्तर से ऊपर हो, तो दृष्टि रेखा द्वारा क्षैतिज के साथ बना कोण।',
          'अवनमन कोण: जब वस्तु आँख के स्तर से नीचे हो, तो दृष्टि रेखा द्वारा क्षैतिज के साथ बना कोण।'
        ],
        keyPointsEn: [
          'tan 45° = 1, sin 30° = 1/2, cos 30° = √3/2, sin 60° = √3/2, cos 60° = 1/2.',
          'Maximum value of (sin θ + cos θ) is √2, occurring at θ = 45°.'
        ],
        keyPointsHi: [
          'tan 45° = 1, sin 30° = 1/2, cos 30° = √3/2, sin 60° = √3/2, cos 60° = 1/2।',
          '(sin θ + cos θ) का अधिकतम मान √2 होता है, जो θ = 45° पर प्राप्त होता है।'
        ],
        formulas: [
          {
            id: 'f-math-8',
            titleEn: 'Trigonometric Pythagorean Identity',
            titleHi: 'त्रिकोणमितीय सर्वसमिका',
            formula: 'sin²θ + cos²θ = 1',
            explanationEn: 'Valid for all values of angle θ.',
            explanationHi: 'कोण θ के सभी मानों के लिए मान्य आधारभूत सर्वसमिका।'
          },
          {
            id: 'f-math-9',
            titleEn: 'sec²θ - tan²θ Identity',
            titleHi: 'sec²θ - tan²θ सर्वसमिका',
            formula: 'sec²θ - tan²θ = 1  => (sec θ - tan θ) = 1 / (sec θ + tan θ)',
            explanationEn: 'Extremely frequently tested in JEECUP entrance exam.',
            explanationHi: 'JEECUP प्रवेश परीक्षा में बार-बार पूछा जाने वाला व्युत्क्रम संबंध।'
          }
        ],
        mcqs: [
          {
            id: 'q-math-7',
            subjectId: 'mathematics',
            chapterId: 'math-ch4',
            chapterTitleEn: 'Trigonometry',
            chapterTitleHi: 'त्रिकोणमिति',
            textEn: 'If sec θ + tan θ = 4, then the value of sec θ - tan θ is:',
            textHi: 'यदि sec θ + tan θ = 4 है, तो sec θ - tan θ का मान क्या होगा?',
            optionsEn: ['4', '1/4', '2', '1/2'],
            optionsHi: ['4', '1/4', '2', '1/2'],
            correctOptionIndex: 1,
            explanationEn: 'Since sec²θ - tan²θ = 1 => (sec θ + tan θ)(sec θ - tan θ) = 1 => sec θ - tan θ = 1/4 = 0.25.',
            explanationHi: 'चूंकि sec²θ - tan²θ = 1 => (sec θ + tan θ)(sec θ - tan θ) = 1 => sec θ - tan θ = 1/4 = 0.25.',
            examSource: 'JEECUP 2024 Group A',
            isDemo: false,
            year: 2024,
            difficulty: 'Easy'
          },
          {
            id: 'q-math-8',
            subjectId: 'mathematics',
            chapterId: 'math-ch4',
            chapterTitleEn: 'Trigonometry',
            chapterTitleHi: 'त्रिकोणमिति',
            textEn: 'A tower stands vertically on ground. From a point 30 m away from its foot, the angle of elevation of top is 30°. The height of the tower is:',
            textHi: 'एक मीनार भूमि पर ऊर्ध्वाधर खड़ी है। इसके पाद से 30 मीटर दूर बिंदु से शिखर का उन्नयन कोण 30° है। मीनार की ऊँचाई क्या है?',
            optionsEn: ['30 m', '10√3 m', '20 m', '15√3 m'],
            optionsHi: ['30 मी', '10√3 मी', '20 मी', '15√3 मी'],
            correctOptionIndex: 1,
            explanationEn: 'tan 30° = Height / 30 => 1/√3 = h / 30 => h = 30/√3 = 10√3 m.',
            explanationHi: 'tan 30° = ऊँचाई / 30 => 1/√3 = h / 30 => h = 30/√3 = 10√3 मीटर।',
            examSource: 'Bihar PE 2024',
            isDemo: false,
            year: 2024,
            difficulty: 'Easy'
          }
        ],
        importantQA: [
          {
            questionEn: 'How to prove that (1 - cos θ) / (1 + cos θ) = (cosec θ - cot θ)²?',
            questionHi: 'सिद्ध कीजिए कि (1 - cos θ) / (1 + cos θ) = (cosec θ - cot θ)² होता है?',
            answerEn: 'LHS = (1 - cos θ) / (1 + cos θ). Multiply numerator & denominator by (1 - cos θ): LHS = (1 - cos θ)² / (1 - cos²θ) = (1 - cos θ)² / sin²θ = [(1 - cos θ)/sin θ]² = [1/sin θ - cos θ/sin θ]² = (cosec θ - cot θ)² = RHS.',
            answerHi: 'बायाँ पक्ष = (1 - cos θ) / (1 + cos θ)। अंश व हर में (1 - cos θ) से गुणा करने पर: (1 - cos θ)² / sin²θ = [(1 - cos θ)/sin θ]² = [cosec θ - cot θ]² = दायाँ पक्ष।'
          }
        ]
      },
      {
        id: 'math-ch5',
        subjectId: 'mathematics',
        titleEn: 'Mensuration',
        titleHi: 'क्षेत्रमिति',
        order: 5,
        summaryEn: 'Areas of 2D planes, circles, sectors, and surface areas & volumes of cylinder, cone, sphere, hemisphere, frustum.',
        summaryHi: 'समतल आकृतियों व वृत्तों के क्षेत्रफल, त्रिज्यखंड तथा बेलन, शंकु, गोला, अर्धगोला और छिन्नक के पृष्ठीय क्षेत्रफल व आयतन।',
        notesEn: [
          'Circle: Area = πr², Perimeter = 2πr. Area of sector = (θ/360°) × πr².',
          'Right Circular Cylinder: Curved Surface Area (CSA) = 2πrh, Total Surface Area (TSA) = 2πr(r + h), Volume = πr²h.',
          'Right Circular Cone: Slant height l = √(r² + h²), CSA = πrl, TSA = πr(r + l), Volume = (1/3)πr²h.',
          'Sphere: Surface Area = 4πr², Volume = (4/3)πr³.',
          'Hemisphere: CSA = 2πr², TSA = 3πr², Volume = (2/3)πr³.'
        ],
        notesHi: [
          'वृत्त: क्षेत्रफल = πr², परिधि = 2πr। त्रिज्यखंड का क्षेत्रफल = (θ/360°) × πr²।',
          'लंब वृत्तीय बेलन: वक्र पृष्ठ = 2πrh, संपूर्ण पृष्ठ = 2πr(r + h), आयतन = πr²h।',
          'लंब वृत्तीय शंकु: तिर्यक ऊँचाई l = √(r² + h²), वक्र पृष्ठ = πrl, संपूर्ण पृष्ठ = πr(r + l), आयतन = (1/3)πr²h।',
          'ठोस गोला: संपूर्ण पृष्ठीय क्षेत्रफल = 4πr², आयतन = (4/3)πr³।',
          'अर्धगोला: वक्र पृष्ठ = 2πr², संपूर्ण पृष्ठ = 3πr², आयतन = (2/3)πr³।'
        ],
        keyPointsEn: [
          'When a solid of one shape is melted and recapped into another, total volume remains strictly constant.',
          'If the radius of a sphere is doubled, its volume increases by 8 times (2³ = 8) and surface area by 4 times.'
        ],
        keyPointsHi: [
          'जब किसी ठोस को पिघलाकर दूसरी आकृति में ढाला जाता है, तो कुल आयतन सदैव अपरिवर्तित रहता है।',
          'यदि किसी गोले की त्रिज्या दोगुनी कर दी जाए, तो उसका आयतन 8 गुना (2³ = 8) और पृष्ठ क्षेत्रफल 4 गुना हो जाता है।'
        ],
        formulas: [
          {
            id: 'f-math-10',
            titleEn: 'Cone Volume and Slant Height',
            titleHi: 'शंकु का आयतन एवं तिर्यक ऊँचाई',
            formula: 'V = (1/3)πr²h,  l = √(r² + h²)',
            explanationEn: 'Volume of cone is one-third the volume of cylinder of same base and height.',
            explanationHi: 'समान आधार व ऊँचाई वाले बेलन के आयतन का एक-तिहाई शंकु का आयतन होता है।'
          },
          {
            id: 'f-math-11',
            titleEn: 'Sphere Surface Area & Volume',
            titleHi: 'गोले का पृष्ठ क्षेत्रफल व आयतन',
            formula: 'A = 4πr²,  V = (4/3)πr³',
            explanationEn: 'Surface area and volume of solid sphere with radius r.',
            explanationHi: 'त्रिज्या r वाले ठोस गोले का क्षेत्रफल तथा आयतन सूत्र।'
          }
        ],
        mcqs: [
          {
            id: 'q-math-9',
            subjectId: 'mathematics',
            chapterId: 'math-ch5',
            chapterTitleEn: 'Mensuration',
            chapterTitleHi: 'क्षेत्रमिति',
            textEn: 'If radius of base of a cylinder is halved and height is doubled, the ratio of its new volume to original volume is:',
            textHi: 'यदि किसी बेलन के आधार की त्रिज्या आधी कर दी जाए और ऊँचाई दोगुनी कर दी जाए, तो नए आयतन का प्रारंभिक आयतन से अनुपात होगा:',
            optionsEn: ['1 : 2', '2 : 1', '1 : 4', '1 : 1'],
            optionsHi: ['1 : 2', '2 : 1', '1 : 4', '1 : 1'],
            correctOptionIndex: 0,
            explanationEn: 'V₁ = πr²h. V₂ = π(r/2)²(2h) = π(r²/4)(2h) = (1/2)πr²h = V₁/2. Hence ratio is 1 : 2.',
            explanationHi: 'प्रारंभिक आयतन V₁ = πr²h। नया आयतन V₂ = π(r/2)²(2h) = (1/2)πr²h। अतः अनुपात 1 : 2 होगा।',
            examSource: 'JEECUP 2023 Group A',
            isDemo: false,
            year: 2023,
            difficulty: 'Medium'
          }
        ],
        importantQA: [
          {
            questionEn: 'A solid metallic sphere of radius 6 cm is melted and recast into smaller cones of radius 3 cm and height 4 cm. Find the number of cones formed.',
            questionHi: '6 सेमी त्रिज्या के ठोस धात्विक गोले को पिघलाकर 3 सेमी त्रिज्या व 4 सेमी ऊँचाई वाले छोटे शंकु बनाए गए हैं। बनने वाले शंकुओं की संख्या ज्ञात कीजिए।',
            answerEn: 'Volume of sphere = (4/3)π × 6³ = (4/3)π × 216 = 288π cm³. Volume of one cone = (1/3)π × 3² × 4 = (1/3)π × 36 = 12π cm³. Number of cones = Volume of sphere / Volume of one cone = 288π / 12π = 24 cones.',
            answerHi: 'गोले का आयतन = (4/3)π × 6³ = 288π सेमी³। एक शंकु का आयतन = (1/3)π × 3² × 4 = 12π सेमी³। शंकुओं की संख्या = 288π / 12π = 24 शंकु।'
          }
        ]
      },
      {
        id: 'math-ch6',
        subjectId: 'mathematics',
        titleEn: 'Statistics',
        titleHi: 'सांख्यिकी',
        order: 6,
        summaryEn: 'Mean, median, mode of grouped and ungrouped data, empirical relationship, cumulative frequency and ogives.',
        summaryHi: 'अवर्गीकृत एवं वर्गीकृत आंकड़ों का माध्य, माध्यिका, बहुलक, आनुभविक संबंध और संचयी बारंबारता।',
        notesEn: [
          'Mean (Direct method): x̄ = Σ(fi × xi) / Σfi.',
          'Assumed Mean method: x̄ = a + [Σ(fi × di) / Σfi], where di = xi - a.',
          'Empirical Relationship: Mode = 3 Median - 2 Mean.',
          'Median for grouped data: Median = l + [((N/2) - cf) / f] × h.',
          'Mode for grouped data: Mode = l + [(f₁ - f₀) / (2f₁ - f₀ - f₂)] × h.'
        ],
        notesHi: [
          'प्रत्यक्ष विधि द्वारा माध्य: x̄ = Σ(fi × xi) / Σfi।',
          'कल्पित माध्य विधि: x̄ = a + [Σ(fi × di) / Σfi], जहाँ di = xi - a।',
          'आनुभविक संबंध (Empirical Formula): बहुलक (Mode) = 3 माध्यिका (Median) - 2 माध्य (Mean)।',
          'वर्गीकृत आंकड़ों की माध्यिका: Median = l + [((N/2) - cf) / f] × h।',
          'वर्गीकृत आंकड़ों का बहुलक: Mode = l + [(f₁ - f₀) / (2f₁ - f₀ - f₂)] × h।'
        ],
        keyPointsEn: [
          'Empirical formula (Mode = 3 Median - 2 Mean) appears in almost every JEECUP and state entrance exam paper.',
          'Median is determined from the point of intersection of less-than and more-than ogives.'
        ],
        keyPointsHi: [
          'आनुभविक सूत्र (बहुलक = 3 माध्यिका - 2 माध्य) लगभग हर वर्ष JEECUP और राज्य प्रवेश परीक्षा में पूछा जाता है।',
          'कम प्रकार और अधिक प्रकार के तोरणों (ogives) के प्रतिच्छेद बिंदु का x-निर्देशांक माध्यिका दर्शाता है।'
        ],
        formulas: [
          {
            id: 'f-math-12',
            titleEn: 'Empirical Relationship',
            titleHi: 'सांख्यिकी आनुभविक संबंध',
            formula: 'Mode = 3(Median) - 2(Mean)',
            explanationEn: 'Connects the three measures of central tendency for moderately skewed distribution.',
            explanationHi: 'सामान्य विषम बंटन के लिए माध्य, माध्यिका और बहुलक का संबंध सूत्र।'
          }
        ],
        mcqs: [
          {
            id: 'q-math-10',
            subjectId: 'mathematics',
            chapterId: 'math-ch6',
            chapterTitleEn: 'Statistics',
            chapterTitleHi: 'सांख्यिकी',
            textEn: 'If the mean of a data set is 24 and its median is 26, then its mode is:',
            textHi: 'यदि किसी आंकड़े का माध्य 24 और उसकी माध्यिका 26 है, तो उसका बहुलक होगा:',
            optionsEn: ['28', '30', '32', '34'],
            optionsHi: ['28', '30', '32', '34'],
            correctOptionIndex: 1,
            explanationEn: 'Mode = 3(Median) - 2(Mean) = 3(26) - 2(24) = 78 - 48 = 30.',
            explanationHi: 'बहुलक = 3(माध्यिका) - 2(माध्य) = 3(26) - 2(24) = 78 - 48 = 30.',
            examSource: 'JEECUP 2024 Group A',
            isDemo: false,
            year: 2024,
            difficulty: 'Easy'
          }
        ],
        importantQA: [
          {
            questionEn: 'What is the difference between mean, median, and mode?',
            questionHi: 'माध्य, माध्यिका एवं बहुलक में क्या अंतर है?',
            answerEn: 'Mean is the arithmetic average of all observations. Median is the middle value when data is arranged in ascending order (unaffected by extreme outliers). Mode is the most frequently occurring value in the dataset.',
            answerHi: 'माध्य सभी प्रेक्षणों का अंकगणितीय औसत है। माध्यिका आरोही क्रम में व्यवस्थित करने पर ठीक मध्य का मान है (चरम मानों से अप्रभावित)। बहुलक वह मान है जो आंकड़ों में सर्वाधिक बार आता है।'
          }
        ]
      }
    ]
  },
  {
    id: 'physics',
    nameEn: 'Physics',
    nameHi: 'भौतिक विज्ञान',
    iconName: 'Atom',
    color: 'from-sky-600 to-cyan-700',
    descriptionEn: '25 questions (100 marks) in JEECUP. Tests concepts of kinematics, dynamics, energy, optics, electricity, and thermodynamics.',
    descriptionHi: 'JEECUP में 25 प्रश्न (100 अंक)। गति, बल, ऊर्जा, प्रकाशिकी, विद्युत और ऊष्मागतिकी के व्यावहारिक नियम।',
    totalChapters: 6,
    chapters: [
      {
        id: 'phy-ch1',
        subjectId: 'physics',
        titleEn: 'Motion',
        titleHi: 'गति',
        order: 1,
        summaryEn: 'Distance and displacement, uniform and non-uniform speed and velocity, acceleration, distance-time and velocity-time graphs, equations of motion.',
        summaryHi: 'दूरी एवं विस्थापन, एकसमान व असमान चाल और वेग, त्वरण, दूरी-समय तथा वेग-समय ग्राफ, गति के समीकरण।',
        notesEn: [
          'Distance: Total path length travelled (scalar quantity, always positive).',
          'Displacement: Shortest straight line distance from initial to final position (vector quantity, can be zero or negative).',
          'Acceleration: Rate of change of velocity: a = (v - u) / t (SI unit: m/s²).',
          'Three Equations of Uniformly Accelerated Motion:',
          '  1. v = u + at',
          '  2. s = ut + (1/2)at²',
          '  3. v² = u² + 2as',
          'Motion under gravity: Replace a with g (9.8 m/s² or 10 m/s²). When thrown upwards, take -g.'
        ],
        notesHi: [
          'दूरी: किसी गतिमान वस्तु द्वारा तय किए गए मार्ग की कुल लंबाई (अदिश राशि, सदैव धनात्मक)।',
          'विस्थापन: प्रारंभिक तथा अंतिम बिंदु के बीच की न्यूनतम सीधी दूरी (सदिश राशि, शून्य व ऋणात्मक भी संभव)।',
          'त्वरण: वेग परिवर्तन की दर: a = (v - u) / t (मात्रक: मीटर/सेकंड²)।',
          'एकसमान त्वरित गति के तीन समीकरण:',
          '  1. v = u + at',
          '  2. s = ut + (1/2)at²',
          '  3. v² = u² + 2as',
          'गुरुत्व के अधीन गति: a के स्थान पर g (9.8 m/s²) रखा जाता है। ऊपर फेंकने पर -g लेते हैं।'
        ],
        keyPointsEn: [
          'Area under a velocity-time graph represents the total displacement of the object.',
          'Slope of a distance-time graph gives speed; slope of a velocity-time graph gives acceleration.'
        ],
        keyPointsHi: [
          'वेग-समय ग्राफ के नीचे का क्षेत्रफल वस्तु द्वारा तय किए गए विस्थापन को दर्शाता है।',
          'दूरी-समय ग्राफ की ढाल (slope) चाल देती है, जबकि वेग-समय ग्राफ की ढाल त्वरण देती है।'
        ],
        formulas: [
          {
            id: 'f-phy-1',
            titleEn: 'Equations of Motion',
            titleHi: 'गति के तीन समीकरण',
            formula: 'v = u + at,  s = ut + (1/2)at²,  v² = u² + 2as',
            explanationEn: 'Applicable strictly for motion in a straight line with uniform acceleration.',
            explanationHi: 'सरल रेखा में एकसमान त्वरण से होने वाली गति के लिए प्रयुक्त समीकरण।'
          }
        ],
        mcqs: [
          {
            id: 'q-phy-1',
            subjectId: 'physics',
            chapterId: 'phy-ch1',
            chapterTitleEn: 'Motion',
            chapterTitleHi: 'गति',
            textEn: 'A body starts from rest and moves with uniform acceleration of 2 m/s². The distance covered by it in 5 seconds is:',
            textHi: 'एक पिंड विरामावस्था से चलना प्रारंभ करके 2 m/s² के एकसमान त्वरण से गति करता है। 5 सेकंड में तय की गई दूरी होगी:',
            optionsEn: ['10 m', '20 m', '25 m', '50 m'],
            optionsHi: ['10 मी', '20 मी', '25 मी', '50 मी'],
            correctOptionIndex: 2,
            explanationEn: 'Here u = 0, a = 2 m/s², t = 5 s. Using s = ut + (1/2)at² => s = 0 + (1/2)(2)(5²) = 25 m.',
            explanationHi: 'यहाँ u = 0, a = 2 m/s², t = 5 सेकंड। s = ut + (1/2)at² => s = 0 + (1/2)(2)(25) = 25 मीटर।',
            examSource: 'JEECUP 2024 Group A',
            isDemo: false,
            year: 2024,
            difficulty: 'Easy'
          }
        ],
        importantQA: [
          {
            questionEn: 'Can an object have zero displacement despite covering a large distance? Give an example.',
            questionHi: 'क्या कोई वस्तु काफी दूरी तय करने के बाद भी शून्य विस्थापन रख सकती है? उदाहरण दीजिए।',
            answerEn: 'Yes. If a person starts running around a circular track of radius r and completes one full revolution, the total distance covered is 2πr, but since initial and final points are identical, the displacement is strictly 0.',
            answerHi: 'हाँ। यदि कोई धावक r त्रिज्या के वृत्ताकार पथ पर दौड़कर एक पूरा चक्कर लगाता है, तो तय की गई दूरी 2πr होगी, परंतु प्रारंभिक और अंतिम स्थिति समान होने के कारण विस्थापन शून्य होगा।'
          }
        ]
      },
      {
        id: 'phy-ch2',
        subjectId: 'physics',
        titleEn: 'Force and Laws of Motion',
        titleHi: 'बल तथा गति के नियम',
        order: 2,
        summaryEn: 'Inertia, momentum, Newton three laws of motion, impulse, action-reaction, and conservation of linear momentum.',
        summaryHi: 'जड़त्व, संवेग, न्यूटन के गति के तीन नियम, आवेग, क्रिया-प्रतिक्रिया एवं रेखीय संवेग संरक्षण नियम।',
        notesEn: [
          'Newton First Law (Law of Inertia): An object continues in state of rest or uniform motion unless acted upon by external net force.',
          'Newton Second Law: F = dp/dt = ma. Force equals rate of change of momentum (SI unit: Newton = kg·m/s²).',
          'Newton Third Law: To every action there is an equal and opposite reaction (F₁₂ = -F₂₁).',
          'Linear Momentum: p = mv (vector quantity, kg·m/s).',
          'Law of Conservation of Linear Momentum: In the absence of external force, total initial momentum = total final momentum (m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂).'
        ],
        notesHi: [
          'न्यूटन का प्रथम नियम (जड़त्व का नियम): कोई वस्तु तब तक अपनी विरामावस्था या सरल रेखा में एकसमान गति की अवस्था में रहती है जब तक उस पर कोई बाह्य असंतुलित बल न लगाया जाए।',
          'न्यूटन का द्वितीय नियम: संवेग परिवर्तन की दर लगाए गए बल के समानुपाती होती है: F = ma (मात्रक: न्यूटन)।',
          'न्यूटन का तृतीय नियम: प्रत्येक क्रिया के बराबर और विपरीत दिशा में प्रतिक्रिया होती है (क्रिया-प्रतिक्रिया नियम)।',
          'रेखीय संवेग: p = mv (सदिश राशि, मात्रक: किग्रा·मीटर/सेकंड)।',
          'संवेग संरक्षण का नियम: बाह्य बल की अनुपस्थिति में दो या दो से अधिक पिंडों के निकाय का कुल संवेग स्थिर रहता है।'
        ],
        keyPointsEn: [
          'Action and reaction always act on two different bodies, never on the same body, hence they never cancel each other.',
          'Inertia of a body depends directly on its mass (greater the mass, greater the inertia).'
        ],
        keyPointsHi: [
          'क्रिया और प्रतिक्रिया सदैव दो अलग-अलग वस्तुओं पर कार्य करती हैं, इसलिए वे एक-दूसरे को निरस्त नहीं करतीं।',
          'किसी वस्तु का जड़त्व सीधे उसके द्रव्यमान पर निर्भर करता है (अधिक द्रव्यमान = अधिक जड़त्व)।'
        ],
        formulas: [
          {
            id: 'f-phy-2',
            titleEn: 'Newton Second Law Formula',
            titleHi: 'न्यूटन का द्वितीय नियम सूत्र',
            formula: 'F = m × a = (m(v - u)) / t',
            explanationEn: 'Net force equals mass times acceleration.',
            explanationHi: 'बल = द्रव्यमान × त्वरण।'
          },
          {
            id: 'f-phy-3',
            titleEn: 'Conservation of Momentum',
            titleHi: 'संवेग संरक्षण सूत्र',
            formula: 'm₁u₁ + m₂u₂ = m₁v₁ + m₂v₂',
            explanationEn: 'Total linear momentum before collision equals total linear momentum after collision.',
            explanationHi: 'टक्कर से पूर्व का कुल संवेग = टक्कर के पश्चात का कुल संवेग।'
          }
        ],
        mcqs: [
          {
            id: 'q-phy-2',
            subjectId: 'physics',
            chapterId: 'phy-ch2',
            chapterTitleEn: 'Force and Laws of Motion',
            chapterTitleHi: 'बल तथा गति के नियम',
            textEn: 'A bullet of mass 20 g is fired horizontally with a velocity 150 m/s from a pistol of mass 2 kg. The recoil velocity of the pistol is:',
            textHi: '2 किग्रा द्रव्यमान की पिस्तौल से 20 ग्राम द्रव्यमान की गोली 150 m/s के वेग से दागी जाती है। पिस्तौल का प्रतिक्षेप (recoil) वेग क्या होगा?',
            optionsEn: ['-1.5 m/s', '-2.5 m/s', '-3.0 m/s', '-0.75 m/s'],
            optionsHi: ['-1.5 मी/से', '-2.5 मी/से', '-3.0 मी/से', '-0.75 मी/से'],
            correctOptionIndex: 0,
            explanationEn: 'm₁ = 0.02 kg, v₁ = 150 m/s. m₂ = 2 kg. By conservation of momentum: m₁v₁ + m₂v₂ = 0 => (0.02)(150) + 2(v₂) = 0 => 3 + 2v₂ = 0 => v₂ = -1.5 m/s.',
            explanationHi: 'संवेग संरक्षण से: m₁v₁ + m₂v₂ = 0 => (0.02)(150) + 2(v₂) = 0 => 3 + 2v₂ = 0 => v₂ = -1.5 मी/सेकंड (विपरीत दिशा)।',
            examSource: 'JEECUP 2024 Group A',
            isDemo: false,
            year: 2024,
            difficulty: 'Medium'
          }
        ],
        importantQA: [
          {
            questionEn: 'Why does a cricketer pull his hands backward while catching a fast-moving cricket ball?',
            questionHi: 'तेजी से आती क्रिकेट गेंद को पकड़ते समय क्षेत्ररक्षक अपने हाथों को पीछे की ओर क्यों खींचता है?',
            answerEn: 'By pulling hands backward, the cricketer increases the time interval (Δt) over which the ball velocity drops to zero. As F = Δp / Δt, increasing time decreases the impact force on his palms, preventing injury.',
            answerHi: 'हाथ पीछे खींचने से गेंद का संवेग शून्य होने में लगा समय (Δt) बढ़ जाता है। चूंकि बल F = Δp / Δt होता है, समय बढ़ने से हाथों पर लगने वाला आघात बल कम हो जाता है और चोट नहीं लगती।'
          }
        ]
      },
      {
        id: 'phy-ch3',
        subjectId: 'physics',
        titleEn: 'Work and Energy',
        titleHi: 'कार्य तथा ऊर्जा',
        order: 3,
        summaryEn: 'Work done by force, kinetic energy, potential energy, law of conservation of energy, power and commercial units.',
        summaryHi: 'बल द्वारा किया गया कार्य, गतिज ऊर्जा, स्थितिज ऊर्जा, ऊर्जा संरक्षण का नियम, शक्ति एवं व्यावसायिक इकाइयाँ।',
        notesEn: [
          'Work: W = F · s · cos θ. Unit: Joule (J = N·m). Work is scalar.',
          '  - Positive work: θ < 90° (force and displacement in same general direction).',
          '  - Zero work: θ = 90° (e.g., coolie carrying load horizontally or centripetal force).',
          '  - Negative work: θ = 180° (friction force opposing motion).',
          'Kinetic Energy: KE = (1/2)mv² = p² / (2m).',
          'Gravitational Potential Energy: PE = mgh.',
          'Power: Rate of doing work: P = W / t = F · v. Unit: Watt (W = J/s). 1 Horsepower (hp) = 746 Watts.',
          'Commercial unit of energy: 1 kilowatt-hour (kWh) = 1 Unit = 3.6 × 10⁶ Joules.'
        ],
        notesHi: [
          'कार्य: W = F · s · cos θ। मात्रक: जूल (J = N·m)। कार्य एक अदिश राशि है।',
          '  - धनात्मक कार्य: जब बल और विस्थापन एक ही दिशा में हों (θ = 0°)।',
          '  - शून्य कार्य: जब बल विस्थापन के लंबवत हो (θ = 90°, जैसे सिर पर बोझ लेकर क्षैतिज चलना)।',
          '  - ऋणात्मक कार्य: जब बल विस्थापन की विपरीत दिशा में लगे (जैसे घर्षण बल)।',
          'गतिज ऊर्जा: KE = (1/2)mv² = p² / (2m)।',
          'स्थितिज ऊर्जा: PE = mgh।',
          'शक्ति: कार्य करने की दर: P = W / t = F · v। मात्रक: वाट (1 HP = 746 वाट)।',
          'ऊर्जा की व्यावसायिक इकाई: 1 kWh = 1 यूनिट = 3.6 × 10⁶ जूल।'
        ],
        keyPointsEn: [
          'Work-Energy Theorem: Net work done on an object equals the change in its kinetic energy (W = ΔKE).',
          '1 kWh = 3.6 × 10⁶ J (extremely frequent question in JEECUP).'
        ],
        keyPointsHi: [
          'कार्य-ऊर्जा प्रमेय: किसी वस्तु पर किया गया कुल कार्य उसकी गतिज ऊर्जा में परिवर्तन के बराबर होता है।',
          '1 किलोवाट-घंटा (kWh) = 3.6 × 10⁶ जूल (JEECUP का अत्यंत पसंदीदा प्रश्न)।'
        ],
        formulas: [
          {
            id: 'f-phy-4',
            titleEn: 'Kinetic & Potential Energy',
            titleHi: 'गतिज एवं स्थितिज ऊर्जा',
            formula: 'KE = (1/2)mv²,  PE = mgh,  E_total = KE + PE = constant',
            explanationEn: 'Conservation of mechanical energy in conservative fields.',
            explanationHi: 'संरक्षी बल क्षेत्र में कुल यांत्रिक ऊर्जा नियत रहती है।'
          },
          {
            id: 'f-phy-5',
            titleEn: '1 Horsepower Conversion',
            titleHi: '1 अश्वशक्ति (HP) का मान',
            formula: '1 HP = 746 Watts,  1 kWh = 3.6 × 10⁶ J',
            explanationEn: 'Standard power and electrical energy conversion constants.',
            explanationHi: 'मानक शक्ति एवं ऊर्जा रूपांतरण नियतांक।'
          }
        ],
        mcqs: [
          {
            id: 'q-phy-3',
            subjectId: 'physics',
            chapterId: 'phy-ch3',
            chapterTitleEn: 'Work and Energy',
            chapterTitleHi: 'कार्य तथा ऊर्जा',
            textEn: 'If momentum of a body is doubled, its kinetic energy becomes:',
            textHi: 'यदि किसी पिंड का संवेग दोगुना कर दिया जाए, तो उसकी गतिज ऊर्जा हो जाएगी:',
            optionsEn: ['2 times', '4 times', '8 times', 'Remains unchanged'],
            optionsHi: ['2 गुनी', '4 गुनी', '8 गुनी', 'अपरिवर्तित रहेगी'],
            correctOptionIndex: 1,
            explanationEn: 'KE = p² / (2m). If p becomes 2p, new KE = (2p)² / (2m) = 4 [p²/(2m)] = 4 times.',
            explanationHi: 'KE = p² / (2m)। यदि p को दोगुना करें तो KE = (2p)²/(2m) = 4 गुना हो जाएगी।',
            examSource: 'JEECUP 2023 Group A',
            isDemo: false,
            year: 2023,
            difficulty: 'Easy'
          }
        ],
        importantQA: [
          {
            questionEn: 'State the law of conservation of energy and show how it holds for a freely falling stone.',
            questionHi: 'ऊर्जा संरक्षण का नियम बताइए और दर्शाइए कि यह मुक्त रूप से गिरते पत्थर के लिए कैसे सत्य है।',
            answerEn: 'Energy can neither be created nor destroyed; it can only be transformed from one form to another. For a stone at height h, total energy is PE = mgh (KE = 0). As it falls, PE converts into KE. Just before striking ground, height is 0, PE = 0, and KE = (1/2)mv² = (1/2)m(2gh) = mgh. Total mechanical energy remains mgh at every point.',
            answerHi: 'ऊर्जा न तो उत्पन्न की जा सकती है और न ही नष्ट की जा सकती है; इसे केवल एक रूप से दूसरे रूप में परिवर्तित किया जा सकता है। h ऊँचाई पर कुल ऊर्जा PE = mgh है। गिरते समय PE घटती है और KE बढ़ती है। जमीन से ठीक टकराने से पहले संपूर्ण ऊर्जा KE = (1/2)mv² = mgh में बदल जाती है। हर बिंदु पर कुल ऊर्जा नियत रहती है।'
          }
        ]
      },
      {
        id: 'phy-ch4',
        subjectId: 'physics',
        titleEn: 'Electricity',
        titleHi: 'विद्युत',
        order: 4,
        summaryEn: 'Electric current, potential difference, Ohm law, resistance, resistivity, series & parallel combinations, Joule heating.',
        summaryHi: 'विद्युत धारा, विभवांतर, ओम का नियम, प्रतिरोध, प्रतिरोधकता, श्रेणी एवं समांतर क्रम संयोजन तथा जूल का तापन नियम।',
        notesEn: [
          'Electric Current: I = Q / t (Ampere = Coulomb/second).',
          'Electric Potential Difference: V = W / Q (Volt = Joule/Coulomb).',
          'Ohm Law: At constant temperature, current flowing through a metallic conductor is directly proportional to potential difference: V = I·R.',
          'Resistance Factors: R = ρ(l / A), where ρ is resistivity (ohm-meter), l is length, A is cross-sectional area.',
          'Resistors in Series: R_eq = R₁ + R₂ + R₃ (same current passes through each).',
          'Resistors in Parallel: 1/R_eq = 1/R₁ + 1/R₂ + 1/R₃ (same voltage across each).',
          'Joule Heating Law: Heat H = I²Rt = VIt = (V²/R)t Joules.'
        ],
        notesHi: [
          'विद्युत धारा: I = Q / t (ऐम्पियर = कूलॉम/सेकंड)।',
          'विभवांतर: V = W / Q (वोल्ट = जूल/कूलॉम)।',
          'ओम का नियम: नियत ताप पर किसी चालक तार में प्रवाहित धारा उसके सिरों के बीच विभवांतर के समानुपाती होती है: V = IR।',
          'प्रतिरोध की निर्भरता: R = ρ(l / A), जहाँ ρ चालक की विशिष्ट प्रतिरोधकता (ओम-मीटर) है।',
          'श्रेणीक्रम संयोजन: R_eq = R₁ + R₂ + R₃ (सभी में समान धारा प्रवाहित होती है)।',
          'समांतर क्रम संयोजन: 1/R_eq = 1/R₁ + 1/R₂ + 1/R₃ (सभी के सिरों पर समान विभवांतर होता है)।',
          'जूल का तापन नियम: उत्पन्न ऊष्मा H = I²Rt जूल।'
        ],
        keyPointsEn: [
          'If a wire is stretched to double its length, its new resistance becomes 4 times (since length doubles and area halves: R ∝ l²).',
          'Household electrical appliances are always connected in parallel.'
        ],
        keyPointsHi: [
          'यदि किसी तार को खींचकर उसकी लंबाई दोगुनी कर दी जाए, तो उसका नया प्रतिरोध 4 गुना हो जाता है (क्योंकि R ∝ l²)।',
          'घरों में सभी विद्युत उपकरण सदैव समांतर क्रम में जोड़े जाते हैं।'
        ],
        formulas: [
          {
            id: 'f-phy-6',
            titleEn: 'Ohm Law and Electrical Power',
            titleHi: 'ओम का नियम व विद्युत शक्ति',
            formula: 'V = I·R,  P = V·I = I²R = V² / R',
            explanationEn: 'Relationships between voltage, current, resistance, and dissipated power.',
            explanationHi: 'विभवांतर, धारा, प्रतिरोध एवं व्यय शक्ति के परस्पर संबंध सूत्र।'
          },
          {
            id: 'f-phy-7',
            titleEn: 'Equivalent Resistance',
            titleHi: 'तुल्य प्रतिरोध सूत्र',
            formula: 'Series: R = R₁ + R₂,  Parallel: 1/R = 1/R₁ + 1/R₂ => R = (R₁R₂)/(R₁ + R₂)',
            explanationEn: 'Formulas for computing equivalent resistance in circuits.',
            explanationHi: 'परिपथ में श्रेणी व समांतर क्रम का तुल्य प्रतिरोध निकालने का सूत्र।'
          }
        ],
        mcqs: [
          {
            id: 'q-phy-4',
            subjectId: 'physics',
            chapterId: 'phy-ch4',
            chapterTitleEn: 'Electricity',
            chapterTitleHi: 'विद्युत',
            textEn: 'Two resistors of 6 Ω and 3 Ω are connected in parallel. Their equivalent resistance is:',
            textHi: '6 Ω और 3 Ω के दो प्रतिरोध समांतर क्रम में जोड़े गए हैं। उनका तुल्य प्रतिरोध क्या होगा?',
            optionsEn: ['9 Ω', '4.5 Ω', '2 Ω', '0.5 Ω'],
            optionsHi: ['9 Ω', '4.5 Ω', '2 Ω', '0.5 Ω'],
            correctOptionIndex: 2,
            explanationEn: '1/R = 1/6 + 1/3 = (1 + 2)/6 = 3/6 = 1/2 => R = 2 Ω.',
            explanationHi: '1/R = 1/6 + 1/3 = 3/6 = 1/2 => R = 2 Ω.',
            examSource: 'JEECUP 2024 Group A',
            isDemo: false,
            year: 2024,
            difficulty: 'Easy'
          }
        ],
        importantQA: [
          {
            questionEn: 'Why are domestic electric circuits wired in parallel rather than in series?',
            questionHi: 'घरेलू विद्युत परिपथों को श्रेणीक्रम के स्थान पर समांतर क्रम में क्यों जोड़ा जाता है?',
            answerEn: '(1) In parallel, each appliance receives full supply voltage (220 V). (2) If one appliance breaks or is switched off, others continue to work independently. (3) Each appliance can have its own independent switch.',
            answerHi: '(1) समांतर क्रम में प्रत्येक उपकरण को पूरा 220 V वोल्टेज मिलता है। (2) यदि एक उपकरण खराब या बंद हो जाए, तो अन्य उपकरण अप्रभावित रहकर कार्य करते रहते हैं। (3) प्रत्येक उपकरण के लिए अलग स्विच लगाना संभव होता है।'
          }
        ]
      },
      {
        id: 'phy-ch5',
        subjectId: 'physics',
        titleEn: 'Light',
        titleHi: 'प्रकाश',
        order: 5,
        summaryEn: 'Reflection, spherical mirrors, refraction, Snell law, refractive index, lenses, lens formula, power of lens, human eye.',
        summaryHi: 'परावर्तन, गोलीय दर्पण, अपवर्तन, स्नेल का नियम, अपवर्तनांक, लेंस, लेंस सूत्र, लेंस की क्षमता एवं मानव नेत्र।',
        notesEn: [
          'Laws of Reflection: Angle of incidence = Angle of reflection (∠i = ∠r).',
          'Mirror Formula: 1/f = 1/v + 1/u. Focal length f = R/2.',
          'Magnification for mirror: m = -v/u = h_i / h_o.',
          'Snell Law: sin i / sin r = constant = n₂₁ (refractive index of medium 2 w.r.t medium 1).',
          'Lens Formula: 1/f = 1/v - 1/u. Magnification m = +v/u.',
          'Power of Lens: P = 1 / f(in meters). Unit: Diopter (D). Convex lens: +P; Concave lens: -P.',
          'Myopia (short-sightedness): Corrected by Concave lens. Hypermetropia (long-sightedness): Corrected by Convex lens.'
        ],
        notesHi: [
          'परावर्तन के नियम: आपतन कोण = परावर्तन कोण (∠i = ∠r)।',
          'दर्पण सूत्र: 1/f = 1/v + 1/u। फोकस दूरी f = R/2।',
          'दर्पण का रेखीय आवर्धन: m = -v/u = h_i / h_o।',
          'स्नेल का नियम: sin i / sin r = n₂₁ (माध्यम 2 का 1 के सापेक्ष अपवर्तनांक)।',
          'लेंस सूत्र: 1/f = 1/v - 1/u। लेंस का आवर्धन m = +v/u।',
          'लेंस की क्षमता: P = 1 / f(मीटर में)। मात्रक: डाइऑप्टर (D)। उत्तल लेंस: धनात्मक (+D); अवतल लेंस: ऋणात्मक (-D)।',
          'निकट दृष्टि दोष (मायोपिया): अवतल लेंस द्वारा निवारण। दूर दृष्टि दोष: उत्तल लेंस द्वारा निवारण।'
        ],
        keyPointsEn: [
          'Convex mirror always forms a virtual, erect, and diminished image (used as rear-view mirror in vehicles).',
          'Concave mirror forms real and inverted images, except when object is between Pole and Focus (forms virtual, magnified image).'
        ],
        keyPointsHi: [
          'उत्तल दर्पण सदैव आभासी, सीधा एवं छोटा प्रतिबिंब बनाता है (वाहनों में पश्च-दृश्य दर्पण के रूप में प्रयुक्त)।',
          'अवतल दर्पण वास्तविक व उल्टे प्रतिबिंब बनाता है, केवल ध्रुव और फोकस के बीच रखने पर आभासी व बड़ा प्रतिबिंब बनता है।'
        ],
        formulas: [
          {
            id: 'f-phy-8',
            titleEn: 'Mirror & Lens Formulas',
            titleHi: 'दर्पण एवं लेंस सूत्र',
            formula: 'Mirror: 1/f = 1/v + 1/u,  Lens: 1/f = 1/v - 1/u,  Power P = 1/f (m)',
            explanationEn: 'Sign conventions: distances in direction of incident light are positive; focal length of convex is positive, concave is negative.',
            explanationHi: 'चिह्न परिपाटी: उत्तल लेंस/दर्पण की फोकस दूरी धनात्मक तथा अवतल की ऋणात्मक होती है।'
          }
        ],
        mcqs: [
          {
            id: 'q-phy-5',
            subjectId: 'physics',
            chapterId: 'phy-ch5',
            chapterTitleEn: 'Light',
            chapterTitleHi: 'प्रकाश',
            textEn: 'A convex lens has a focal length of 25 cm. Its power is:',
            textHi: 'एक उत्तल लेंस की फोकस दूरी 25 सेमी है। इसकी क्षमता क्या होगी?',
            optionsEn: ['+4 D', '-4 D', '+2.5 D', '-2.5 D'],
            optionsHi: ['+4 D', '-4 D', '+2.5 D', '-2.5 D'],
            correctOptionIndex: 0,
            explanationEn: 'P = 100 / f(cm) = 100 / (+25) = +4 Diopters (D).',
            explanationHi: 'P = 100 / f(सेमी) = 100 / 25 = +4 डाइऑप्टर (D)। उत्तल लेंस होने से धनात्मक चिह्न होगा।',
            examSource: 'JEECUP 2024 Group A',
            isDemo: false,
            year: 2024,
            difficulty: 'Easy'
          }
        ],
        importantQA: [
          {
            questionEn: 'Why do stars twinkle in the night sky while planets do not?',
            questionHi: 'रात में तारे टिमटिमाते हैं जबकि ग्रह नहीं, क्यों?',
            answerEn: 'Stars are point sources of light located extremely far away. Light from stars travels through various turbulent atmospheric layers of varying refractive indices, causing continuous fluctuation in apparent position and intensity (atmospheric refraction). Planets are closer and act as extended sources, averaging out fluctuations.',
            answerHi: 'तारे पृथ्वी से बहुत दूर होने के कारण बिंदु-प्रकाश स्रोत की तरह कार्य करते हैं। उनसे आने वाला प्रकाश विभिन्न घनत्व व अपवर्तनांक वाली वायुमंडलीय परतों से गुजरता है, जिससे वायुमंडलीय अपवर्तन के कारण प्रकाश की तीव्रता घटती-बढ़ती रहती है। ग्रह निकट होने के कारण विस्तृत स्रोत हैं, अतः उनका टिमटिमाना दिखाई नहीं देता।'
          }
        ]
      },
      {
        id: 'phy-ch6',
        subjectId: 'physics',
        titleEn: 'Heat',
        titleHi: 'ऊष्मा',
        order: 6,
        summaryEn: 'Temperature scales, specific heat capacity, latent heat, thermal expansion, modes of heat transfer (conduction, convection, radiation).',
        summaryHi: 'तापमान पैमाने, विशिष्ट ऊष्मा धारिता, गुप्त ऊष्मा, तापीय प्रसार एवं ऊष्मा संचरण की विधियाँ (चालन, संवहन, विकिरण)।',
        notesEn: [
          'Temperature Scales relation: C/5 = (F - 32)/9 = (K - 273.15)/5.',
          'At -40°, Celsius and Fahrenheit scales read the exact same value (-40°C = -40°F).',
          'Specific Heat: Q = m·c·ΔT (amount of heat required to raise temperature of unit mass by 1°C).',
          'Latent Heat: Q = m·L (heat absorbed or released during phase change at constant temperature). Latent heat of fusion of ice = 80 cal/g; vaporization of water = 540 cal/g.',
          'Anomalous expansion of water: Water has maximum density and minimum volume at 4°C.',
          'Heat Transfer: Conduction (solids), Convection (fluids), Radiation (no medium required, travels as EM waves).'
        ],
        notesHi: [
          'तापमान पैमानों का संबंध: C/5 = (F - 32)/9 = (K - 273.15)/5।',
          '-40° पर सेल्सियस और फारेनहाइट पैमाने का मान एकदम समान होता है (-40°C = -40°F)।',
          'विशिष्ट ऊष्मा: Q = m·c·ΔT (इकाई द्रव्यमान का ताप 1°C बढ़ाने के लिए आवश्यक ऊष्मा)।',
          'गुप्त ऊष्मा: Q = m·L (नियत ताप पर अवस्था परिवर्तन के लिए आवश्यक ऊष्मा)। बर्फ के गलन की गुप्त ऊष्मा = 80 कैलोरी/ग्राम, वाष्पन की = 540 कैलोरी/ग्राम।',
          'जल का असामान्य प्रसार: जल का घनत्व 4°C पर अधिकतम तथा आयतन न्यूनतम होता है।',
          'ऊष्मा संचरण: चालन (ठोसों में), संवहन (तरलों में), विकिरण (माध्यम की आवश्यकता नहीं, विद्युत चुंबकीय तरंगों के रूप में)।'
        ],
        keyPointsEn: [
          'Water has the highest specific heat capacity among common liquids (1 cal/g·°C or 4200 J/kg·K), making it an ideal coolant.',
          'Radiation is the fastest mode of heat transfer (travels at speed of light, 3 × 10⁸ m/s).'
        ],
        keyPointsHi: [
          'जल की विशिष्ट ऊष्मा धारिता सर्वाधिक (1 कैलोरी/ग्राम·°C या 4200 J/kg·K) होती है, इसलिए इसे इंजन कूलेंट में प्रयुक्त करते हैं।',
          'विकिरण ऊष्मा संचरण की सबसे तीव्रतम विधि है (प्रकाश की चाल 3 × 10⁸ m/s से चलती है)।'
        ],
        formulas: [
          {
            id: 'f-phy-9',
            titleEn: 'Temperature Scale Conversion',
            titleHi: 'तापमान पैमाना रूपांतरण',
            formula: 'C / 5 = (F - 32) / 9 = (K - 273) / 5',
            explanationEn: 'Universal formula for converting between Celsius, Fahrenheit, and Kelvin.',
            explanationHi: 'सेल्सियस, फारेनहाइट और केल्विन पैमानों के परस्पर रूपांतरण का सूत्र।'
          },
          {
            id: 'f-phy-10',
            titleEn: 'Latent Heat and Specific Heat',
            titleHi: 'विशिष्ट ऊष्मा एवं गुप्त ऊष्मा',
            formula: 'Q = m·c·ΔT,  Q = m·L',
            explanationEn: 'Formulas for sensible heat and latent heat during state transition.',
            explanationHi: 'ताप वृद्धि में अवशोषित ऊष्मा एवं अवस्था परिवर्तन की गुप्त ऊष्मा।'
          }
        ],
        mcqs: [
          {
            id: 'q-phy-6',
            subjectId: 'physics',
            chapterId: 'phy-ch6',
            chapterTitleEn: 'Heat',
            chapterTitleHi: 'ऊष्मा',
            textEn: 'At what temperature do the Celsius and Fahrenheit thermometers show the same reading?',
            textHi: 'किस तापमान पर सेल्सियस और फारेनहाइट थर्मामीटर समान पाठ्यांक दर्शाते हैं?',
            optionsEn: ['-40°', '0°', '40°', '100°'],
            optionsHi: ['-40°', '0°', '40°', '100°'],
            correctOptionIndex: 0,
            explanationEn: 'Let C = F = x. x/5 = (x - 32)/9 => 9x = 5x - 160 => 4x = -160 => x = -40°.',
            explanationHi: 'x/5 = (x - 32)/9 => 9x - 5x = -160 => 4x = -160 => x = -40°.',
            examSource: 'JEECUP 2024 Group A',
            isDemo: false,
            year: 2024,
            difficulty: 'Easy'
          }
        ],
        importantQA: [
          {
            questionEn: 'Why do aquatic animals survive in frozen ponds during harsh winters?',
            questionHi: 'कड़ाके की ठंड में झील की सतह पर बर्फ जमने पर भी जलीय जीव कैसे जीवित रहते हैं?',
            answerEn: 'Due to anomalous expansion of water, water expands and becomes less dense when cooled below 4°C. Therefore, water at 4°C has maximum density and sinks to the bottom. Ice (being lighter) floats on top and acts as a thermal insulator, preventing the bottom water (at 4°C) from freezing.',
            answerHi: 'जल के असामान्य प्रसार के कारण 4°C पर जल का घनत्व अधिकतम होता है। अतः 4°C का भारी पानी तलहटी में बैठ जाता है, जबकि सतह पर 0°C पर बर्फ जम जाती है। बर्फ ऊष्मा की कुचालक होती है, जिससे नीचे का पानी 4°C पर द्रव अवस्था में बना रहता है और जलीय जीव जीवित रहते हैं।'
          }
        ]
      }
    ]
  },
  {
    id: 'chemistry',
    nameEn: 'Chemistry',
    nameHi: 'रसायन विज्ञान',
    iconName: 'FlaskConical',
    color: 'from-emerald-600 to-teal-700',
    descriptionEn: '25 questions (100 marks) in JEECUP. Covers atomic structure, chemical reactions, acids & bases, metallurgy, and periodic classification.',
    descriptionHi: 'JEECUP में 25 प्रश्न (100 अंक)। परमाणु संरचना, रासायनिक समीकरण, अम्ल व क्षार, धातु कर्म एवं आवर्त सारणी।',
    totalChapters: 5,
    chapters: [
      {
        id: 'chem-ch1',
        subjectId: 'chemistry',
        titleEn: 'Atomic Structure',
        titleHi: 'परमाणु संरचना',
        order: 1,
        summaryEn: 'Subatomic particles (electrons, protons, neutrons), Thomson model, Rutherford experiment, Bohr atomic model, isotopes and isobars.',
        summaryHi: 'अपरमाण्विक कण (इलेक्ट्रॉन, प्रोटॉन, न्यूट्रॉन), रदरफोर्ड प्रयोग, बोर का परमाणु मॉडल, समस्थानिक एवं समभारिक।',
        notesEn: [
          'Subatomic particles: Electron (discovered by J.J. Thomson, charge -1.6 × 10⁻¹⁹ C), Proton (Goldstein/Rutherford, +1.6 × 10⁻¹⁹ C), Neutron (discovered by James Chadwick, neutral).',
          'Rutherford Alpha Scattering Experiment: Established existence of a tiny, dense, positively charged nucleus in the center of the atom.',
          'Bohr Postulates: Electrons revolve only in discrete non-radiating orbits. Angular momentum mvr = nh / (2π).',
          'Atomic Number (Z) = Number of protons = Number of electrons (in neutral atom).',
          'Mass Number (A) = Number of protons + Number of neutrons.',
          'Isotopes: Atoms of same element having same Z but different A (e.g. ₁H¹, ₁H², ₁H³).',
          'Isobars: Atoms of different elements having same A but different Z (e.g. ₁₈Ar⁴⁰ and ₂₀Ca⁴⁰).'
        ],
        notesHi: [
          'मूल कण: इलेक्ट्रॉन (खोज: जे. जे. थॉमसन, आवेश: -1.6 × 10⁻¹⁹ C), प्रोटॉन (खोज: गोल्डस्टीन/रदरफोर्ड, +1.6 × 10⁻¹⁹ C), न्यूट्रॉन (खोज: जेम्स चैडविक, आवेशहीन)।',
          'रदरफोर्ड अल्फा प्रकीर्णन प्रयोग: परमाणु के केंद्र में अत्यंत छोटे, सघन धनावेशित नाभिक की उपस्थिति सिद्ध की।',
          'बोर का परमाणु मॉडल: इलेक्ट्रॉन केवल निश्चित स्थायी कक्षाओं में घूमते हैं। कोणीय संवेग mvr = nh / (2π)।',
          'परमाणु क्रमांक (Z) = प्रोटॉनों की संख्या = इलेक्ट्रॉनों की संख्या (उदासीन परमाणु में)।',
          'द्रव्यमान संख्या (A) = प्रोटॉनों की संख्या + न्यूट्रॉनों की संख्या।',
          'समस्थानिक (Isotopes): समान परमाणु क्रमांक किंतु भिन्न द्रव्यमान संख्या वाले परमाणु (जैसे ₁H¹, ₁H², ₁H³)।',
          'समभारिक (Isobars): समान द्रव्यमान संख्या किंतु भिन्न परमाणु क्रमांक वाले परमाणु (जैसे ₁₈Ar⁴⁰ व ₂₀Ca⁴⁰)।'
        ],
        keyPointsEn: [
          'Maximum number of electrons in nth shell is 2n² (K shell: 2, L shell: 8, M shell: 18, N shell: 32).',
          'Number of neutrons = Mass Number (A) - Atomic Number (Z).'
        ],
        keyPointsHi: [
          'n-वें कोश में अधिकतम इलेक्ट्रॉनों की संख्या 2n² होती है (K=2, L=8, M=18, N=32)।',
          'न्यूट्रॉनों की संख्या = द्रव्यमान संख्या (A) - परमाणु क्रमांक (Z)।'
        ],
        formulas: [
          {
            id: 'f-chem-1',
            titleEn: 'Bohr Angular Momentum & Shell Capacity',
            titleHi: 'बोर कोणीय संवेग व कोश क्षमता',
            formula: 'mvr = (n·h) / (2π),  Max electrons = 2n²',
            explanationEn: 'Quantization of orbital angular momentum and Bohr-Bury electron capacity.',
            explanationHi: 'इलेक्ट्रॉन के कोणीय संवेग का क्वांटीकरण तथा कोश में अधिकतम इलेक्ट्रॉन संख्या।'
          }
        ],
        mcqs: [
          {
            id: 'q-chem-1',
            subjectId: 'chemistry',
            chapterId: 'chem-ch1',
            chapterTitleEn: 'Atomic Structure',
            chapterTitleHi: 'परमाणु संरचना',
            textEn: 'Who discovered the neutron in 1932?',
            textHi: '1932 में न्यूट्रॉन की खोज किसने की थी?',
            optionsEn: ['J.J. Thomson', 'Ernest Rutherford', 'James Chadwick', 'Niels Bohr'],
            optionsHi: ['जे. जे. थॉमसन', 'अर्नेस्ट रदरफोर्ड', 'जेम्स चैडविक', 'नील्स बोर'],
            correctOptionIndex: 2,
            explanationEn: 'James Chadwick discovered the neutral subatomic particle, neutron, by bombarding beryllium with alpha particles in 1932.',
            explanationHi: '1932 में जेम्स चैडविक ने बेरिलियम पर अल्फा कणों की बौछार करके उदासीन कण न्यूट्रॉन की खोज की थी।',
            examSource: 'JEECUP 2024 Group A',
            isDemo: false,
            year: 2024,
            difficulty: 'Easy'
          }
        ],
        importantQA: [
          {
            questionEn: 'Calculate the number of protons, electrons, and neutrons in ₁₁Na²³ and ₁₇Cl³⁵.',
            questionHi: '₁₁Na²³ और ₁₇Cl³⁵ में प्रोटॉन, इलेक्ट्रॉन और न्यूट्रॉन की संख्या ज्ञात कीजिए।',
            answerEn: 'For ₁₁Na²³: Z = 11, A = 23 => Protons = 11, Electrons = 11, Neutrons = A - Z = 23 - 11 = 12. For ₁₇Cl³⁵: Z = 17, A = 35 => Protons = 17, Electrons = 17, Neutrons = 35 - 17 = 18.',
            answerHi: '₁₁Na²³ के लिए: Z = 11, A = 23 => प्रोटॉन = 11, इलेक्ट्रॉन = 11, न्यूट्रॉन = 23 - 11 = 12। ₁₇Cl³⁵ के लिए: Z = 17, A = 35 => प्रोटॉन = 17, इलेक्ट्रॉन = 17, न्यूट्रॉन = 35 - 17 = 18।'
          }
        ]
      },
      {
        id: 'chem-ch2',
        subjectId: 'chemistry',
        titleEn: 'Chemical Reactions',
        titleHi: 'रासायनिक अभिक्रियाएं',
        order: 2,
        summaryEn: 'Types of chemical reactions (combination, decomposition, displacement, double displacement, redox), balancing equations, corrosion, rancidity.',
        summaryHi: 'रासायनिक अभिक्रियाओं के प्रकार (संयोजन, वियोजन, विस्थापन, द्विविस्थापन, रेडॉक्स), समीकरण संतुलन, संक्षारण एवं विकृतगंधिता।',
        notesEn: [
          'Combination Reaction: Two or more reactants combine to form single product: 2H₂ + O₂ -> 2H₂O, CaO + H₂O -> Ca(OH)₂.',
          'Decomposition Reaction: Single compound breaks down into two or more simpler substances: CaCO₃ --Δ-> CaO + CO₂.',
          'Displacement Reaction: More reactive element displaces less reactive element: Fe + CuSO₄ -> FeSO₄ + Cu (blue to green).',
          'Double Displacement: Exchange of ions: Na₂SO₄ + BaCl₂ -> BaSO₄ (white ppt) + 2NaCl.',
          'Redox Reaction: Oxidation (gain of oxygen or loss of electrons) and Reduction (loss of oxygen or gain of electrons) occur simultaneously: CuO + H₂ -> Cu + H₂O.',
          'Corrosion: Slow eating up of metals by atmospheric gases/moisture (e.g. rusting of iron: Fe₂O₃·xH₂O).',
          'Rancidity: Oxidation of fats and oils resulting in bad smell and taste (prevented by antioxidants, nitrogen flushing).'
        ],
        notesHi: [
          'संयोजन अभिक्रिया: दो या अधिक अभिकारक मिलकर एकल उत्पाद बनाते हैं: CaO + H₂O -> Ca(OH)₂ (बुझा चूना)।',
          'वियोजन (अपघटन) अभिक्रिया: एकल यौगिक ऊष्मा, प्रकाश या विद्युत द्वारा दो या अधिक पदार्थों में टूटता है: CaCO₃ -> CaO + CO₂।',
          'विस्थापन अभिक्रिया: अधिक क्रियाशील तत्व कम क्रियाशील तत्व को उसके लवण विलयन से विस्थापित कर देता है: Fe + CuSO₄ -> FeSO₄ + Cu।',
          'द्विविस्थापन अभिक्रिया: आयनों का परस्पर आदान-प्रदान: Na₂SO₄ + BaCl₂ -> BaSO₄ (सफेद अवक्षेप) + 2NaCl।',
          'रेडॉक्स अभिक्रिया: ऑक्सीकरण (ऑक्सीजन का जुड़ना/इलेक्ट्रॉन त्यागना) एवं अपचयन (ऑक्सीजन का हटना/इलेक्ट्रॉन ग्रहण) साथ-साथ होना।',
          'संक्षारण: धातु का वायुमंडलीय नमी व गैसों के प्रभाव से धीरे-धीरे क्षय होना (लोहे पर जंग लगना: Fe₂O₃·xH₂O)।',
          'विकृतगंधिता (Rancidity): वसा व तेलों का ऑक्सीकरण होकर दुर्गंध व स्वाद बदलना (नाइट्रोजन गैस भरकर रोका जाता है)।'
        ],
        keyPointsEn: [
          'Rusting of iron requires both oxygen and water/moisture.',
          'Chips packets are flushed with unreactive Nitrogen gas to prevent oxidative rancidity.'
        ],
        keyPointsHi: [
          'लोहे पर जंग लगने के लिए ऑक्सीजन और नमी दोनों की उपस्थिति अनिवार्य है।',
          'चिप्स की थैलियों में विकृतगंधिता रोकने के लिए अक्रिय नाइट्रोजन गैस भरी जाती है।'
        ],
        formulas: [
          {
            id: 'f-chem-2',
            titleEn: 'Standard Redox Equation',
            titleHi: 'रेडॉक्स अभिक्रिया समीकरण',
            formula: 'CuO + H₂ --Heat--> Cu + H₂O',
            explanationEn: 'CuO is reduced to Cu; H₂ is oxidized to H₂O.',
            explanationHi: 'CuO का Cu में अपचयन तथा H₂ का H₂O में ऑक्सीकरण होता है।'
          }
        ],
        mcqs: [
          {
            id: 'q-chem-2',
            subjectId: 'chemistry',
            chapterId: 'chem-ch2',
            chapterTitleEn: 'Chemical Reactions',
            chapterTitleHi: 'रासायनिक अभिक्रियाएं',
            textEn: 'When an iron nail is immersed in copper sulfate solution, the color of the solution changes from:',
            textHi: 'जब लोहे की कील को कॉपर सल्फेट विलयन में डुबोया जाता है, तो विलयन का रंग बदलकर कैसा हो जाता है?',
            optionsEn: ['Blue to Green', 'Green to Blue', 'Blue to Colorless', 'No color change'],
            optionsHi: ['नीले से हरा', 'हरे से नीला', 'नीले से रंगहीन', 'कोई परिवर्तन नहीं'],
            correctOptionIndex: 0,
            explanationEn: 'Iron displaces copper from copper sulfate (blue) to form iron(II) sulfate, FeSO₄, which has a characteristic pale green color.',
            explanationHi: 'लोहा अधिक क्रियाशील होने से कॉपर सल्फेट (नीला) से कॉपर को विस्थापित कर फेरस सल्फेट (FeSO₄) बनाता है जो हल्के हरे रंग का होता है।',
            examSource: 'JEECUP 2024 Group A',
            isDemo: false,
            year: 2024,
            difficulty: 'Easy'
          }
        ],
        importantQA: [
          {
            questionEn: 'Why is respiration considered an exothermic reaction?',
            questionHi: 'श्वसन को ऊष्माक्षेपी अभिक्रिया क्यों माना जाता है?',
            answerEn: 'During digestion, food is broken down into glucose. In cellular respiration, glucose combines with oxygen to release energy, carbon dioxide, and water: C₆H₁₂O₆ + 6O₂ -> 6CO₂ + 6H₂O + Energy (ATP). Since energy is released, it is exothermic.',
            answerHi: 'श्वसन में भोजन से प्राप्त ग्लूकोज कोशिकाओं में ऑक्सीजन से क्रिया करके कार्बन डाइऑक्साइड, जल और ऊर्जा मुक्त करता है: C₆H₁₂O₆ + 6O₂ -> 6CO₂ + 6H₂O + ऊर्जा। ऊर्जा उत्सर्जित होने के कारण यह ऊष्माक्षेपी अभिक्रिया है।'
          }
        ]
      },
      {
        id: 'chem-ch3',
        subjectId: 'chemistry',
        titleEn: 'Acids, Bases and Salts',
        titleHi: 'अम्ल, क्षार एवं लवण',
        order: 3,
        summaryEn: 'Arrhenius theory, pH scale, indicators (litmus, phenolphthalein, methyl orange), salts, baking soda, washing soda, bleaching powder, Plaster of Paris.',
        summaryHi: 'आर्हिनियस सिद्धांत, pH पैमाना, सूचक (लिटमस, फिनॉल्फथैलिन, मेथिल ऑरेंज), लवण, बेकिंग सोडा, धावन सोडा, विरंजक चूर्ण एवं प्लास्टर ऑफ पेरिस।',
        notesEn: [
          'Acids: Sour in taste, turn blue litmus red, release H⁺ (or H₃O⁺) in aqueous solution. pH < 7.',
          'Bases: Bitter in taste, soapy feel, turn red litmus blue, release OH⁻ in aqueous solution. pH > 7.',
          'Neutral substances: Pure water has pH = 7 at 25°C.',
          'pH scale: pH = -log₁₀[H⁺]. As [H⁺] increases, pH decreases.',
          'Important Industrial Salts:',
          '  - Bleaching Powder: CaOCl₂ (produced by action of Cl₂ on dry slaked lime).',
          '  - Baking Soda: NaHCO₃ (Sodium hydrogen carbonate).',
          '  - Washing Soda: Na₂CO₃·10H₂O (Sodium carbonate decahydrate).',
          '  - Plaster of Paris (POP): CaSO₄·(1/2)H₂O (obtained by heating Gypsum CaSO₄·2H₂O at 373 K).'
        ],
        notesHi: [
          'अम्ल: स्वाद में खट्टे, नीले लिटमस को लाल करते हैं, जलीय विलयन में H⁺ आयन देते हैं। pH < 7।',
          'क्षार (Bases): स्वाद में कड़वे, साबुन जैसा स्पर्श, लाल लिटमस को नीला करते हैं, OH⁻ आयन देते हैं। pH > 7।',
          'उदासीन पदार्थ: 25°C पर शुद्ध जल का pH मान 7 होता है।',
          'pH पैमाना: pH = -log₁₀[H⁺]। H⁺ आयन की सांद्रता बढ़ने पर pH मान घटता है।',
          'महत्वपूर्ण औद्योगिक लवण:',
          '  - विरंजक चूर्ण (Bleaching Powder): CaOCl₂ (बुझे चूने पर क्लोरीन की क्रिया से)।',
          '  - बेकिंग सोडा (खाने का सोडा): NaHCO₃ (सोडियम हाइड्रोजन कार्बोनेट)।',
          '  - धावन सोडा: Na₂CO₃·10H₂O (सोडियम कार्बोनेट डेकाहाइड्रेट)।',
          '  - प्लास्टर ऑफ पेरिस (POP): CaSO₄·(1/2)H₂O (जिप्सम CaSO₄·2H₂O को 373 K पर गर्म करने पर)।'
        ],
        keyPointsEn: [
          'Plaster of Paris formula has half water molecule of crystallization: CaSO₄·(1/2)H₂O.',
          'Strong acid + Weak base gives acidic salt (pH < 7), e.g., NH₄Cl.'
        ],
        keyPointsHi: [
          'प्लास्टर ऑफ पेरिस का रासायनिक सूत्र CaSO₄·(1/2)H₂O है जिसमें आधा अणु क्रिस्टलन जल होता है।',
          'प्रबल अम्ल और दुर्बल क्षार से बना लवण अम्लीय (pH < 7) होता है, जैसे NH₄Cl।'
        ],
        formulas: [
          {
            id: 'f-chem-3',
            titleEn: 'pH Definition Formula',
            titleHi: 'pH मान की परिभाषा',
            formula: 'pH = -log₁₀[H⁺],  pH + pOH = 14',
            explanationEn: 'Negative logarithm of hydronium ion concentration.',
            explanationHi: 'हाइड्रोजन आयन सांद्रण के ऋणात्मक लघुगणक को pH मान कहते हैं।'
          },
          {
            id: 'f-chem-4',
            titleEn: 'Plaster of Paris & Gypsum',
            titleHi: 'POP तथा जिप्सम संबंध',
            formula: 'CaSO₄·2H₂O --373K--> CaSO₄·(1/2)H₂O + 1.5 H₂O',
            explanationEn: 'Heating gypsum to 100°C produces plaster of Paris.',
            explanationHi: 'जिप्सम को 373 K (100°C) पर गर्म करने पर प्लास्टर ऑफ पेरिस बनता है।'
          }
        ],
        mcqs: [
          {
            id: 'q-chem-3',
            subjectId: 'chemistry',
            chapterId: 'chem-ch3',
            chapterTitleEn: 'Acids, Bases and Salts',
            chapterTitleHi: 'अम्ल, क्षार एवं लवण',
            textEn: 'What is the chemical formula of Plaster of Paris?',
            textHi: 'प्लास्टर ऑफ पेरिस का रासायनिक सूत्र क्या है?',
            optionsEn: ['CaSO₄·2H₂O', 'CaSO₄·(1/2)H₂O', 'CaSO₄·H₂O', '2CaSO₄·3H₂O'],
            optionsHi: ['CaSO₄·2H₂O', 'CaSO₄·(1/2)H₂O', 'CaSO₄·H₂O', '2CaSO₄·3H₂O'],
            correctOptionIndex: 1,
            explanationEn: 'Plaster of Paris is calcium sulfate hemihydrate: CaSO₄·(1/2)H₂O. CaSO₄·2H₂O is gypsum.',
            explanationHi: 'प्लास्टर ऑफ पेरिस कैल्शियम सल्फेट हेमीहाइड्रेट है: CaSO₄·(1/2)H₂O। जबकि CaSO₄·2H₂O जिप्सम का सूत्र है।',
            examSource: 'JEECUP 2024 Group A',
            isDemo: false,
            year: 2024,
            difficulty: 'Easy'
          }
        ],
        importantQA: [
          {
            questionEn: 'Why should curd and sour substances not be kept in brass and copper vessels?',
            questionHi: 'दही एवं खट्टे पदार्थों को पीतल एवं तांबे के बर्तनों में क्यों नहीं रखना चाहिए?',
            answerEn: 'Curd and sour foodstuffs contain organic acids (like lactic acid). These acids react with brass (copper and zinc alloy) and copper to form toxic, poisonous metallic salts that can cause severe food poisoning.',
            answerHi: 'दही और खट्टे पदार्थों में लैक्टिक अम्ल जैसे कार्बनिक अम्ल होते हैं। ये अम्ल पीतल और तांबे की धातुओं के साथ रासायनिक क्रिया करके विषैले धात्विक लवण बनाते हैं, जिससे भोजन दूषित हो जाता है और स्वास्थ्य को हानि पहुंचती है।'
          }
        ]
      },
      {
        id: 'chem-ch4',
        subjectId: 'chemistry',
        titleEn: 'Metals and Non-metals',
        titleHi: 'धातु एवं अधातु',
        order: 4,
        summaryEn: 'Physical & chemical properties, reactivity series, metallurgy of iron/copper/aluminum, alloys, extraction, ionic bonding.',
        summaryHi: 'भौतिक व रासायनिक गुण, सक्रियता श्रेणी, धातुकर्म (लोहा/तांबा/एल्युमिनियम), मिश्रधातुएं एवं आयनिक आबंध।',
        notesEn: [
          'Reactivity Series: K > Na > Ca > Mg > Al > Zn > Fe > Pb > [H] > Cu > Hg > Ag > Au.',
          'Potassium and Sodium are stored under kerosene oil because they react vigorously with atmospheric oxygen and moisture.',
          'Liquid elements at room temperature: Metal: Mercury (Hg); Non-metal: Bromine (Br₂).',
          'Ionic Compounds: Formed by transfer of electrons from metal to non-metal. High melting points, soluble in water, conduct electricity in molten or aqueous state.',
          'Alloys:',
          '  - Brass = Copper (Cu, ~70%) + Zinc (Zn, ~30%)',
          '  - Bronze = Copper (Cu, ~88%) + Tin (Sn, ~12%)',
          '  - Solder = Lead (Pb, 50%) + Tin (Sn, 50%) (low melting point, used for welding electric wires)',
          '  - Stainless Steel = Fe + Cr + Ni + C'
        ],
        notesHi: [
          'सक्रियता श्रेणी: K > Na > Ca > Mg > Al > Zn > Fe > Pb > [H] > Cu > Hg > Ag > Au।',
          'सोडियम और पोटैशियम को मिट्टी के तेल (केरोसिन) में डुबोकर रखा जाता है क्योंकि ये वायु में तुरंत आग पकड़ लेते हैं।',
          'कमरे के ताप पर द्रव अवस्था में रहने वाले तत्व: धातु = पारा (Hg); अधातु = ब्रोमीन (Br₂)।',
          'आयनिक यौगिक: धातु से अधातु में इलेक्ट्रॉनों के स्थानांतरण से बनते हैं। उच्च गलनांक, जल में विलेय, गलित अवस्था में विद्युत के सुचालक।',
          'प्रमुख मिश्रधातुएं:',
          '  - पीतल (Brass) = तांबा (Cu ~70%) + जस्ता (Zn ~30%)',
          '  - कांसा (Bronze) = तांबा (Cu ~88%) + टिन (Sn ~12%)',
          '  - सोल्डर = सीसा (Pb) + टिन (Sn) (विद्युत तारों को जोड़ने के लिए)',
          '  - स्टेनलेस स्टील = लोहा + क्रोमियम + निकेल + कार्बन'
        ],
        keyPointsEn: [
          'Cinnabar (HgS) is the chief ore of Mercury; Bauxite (Al₂O₃·2H₂O) is the ore of Aluminum; Hematite (Fe₂O₃) is iron ore.',
          'Amalgam is an alloy of any metal with Mercury (Hg).'
        ],
        keyPointsHi: [
          'सिनेबार (HgS) पारे का, बॉक्साइट (Al₂O₃·2H₂O) एल्युमिनियम का तथा हेमेटाइट (Fe₂O₃) लोहे का प्रमुख अयस्क है।',
          'अमलगम वह मिश्रधातु है जिसमें एक घटक सदैव पारा (मर्करी) होता है।'
        ],
        formulas: [
          {
            id: 'f-chem-5',
            titleEn: 'Composition of Key Alloys',
            titleHi: 'प्रमुख मिश्रधातुओं का संघटन',
            formula: 'Brass = Cu + Zn,  Bronze = Cu + Sn,  Solder = Pb + Sn',
            explanationEn: 'Key compositions tested frequently in JEECUP chemistry paper.',
            explanationHi: 'प्रवेश परीक्षाओं में बारंबार पूछे जाने वाले मिश्रधातु संघटन।'
          }
        ],
        mcqs: [
          {
            id: 'q-chem-4',
            subjectId: 'chemistry',
            chapterId: 'chem-ch4',
            chapterTitleEn: 'Metals and Non-metals',
            chapterTitleHi: 'धातु एवं अधातु',
            textEn: 'Which non-metal exists in liquid state at normal room temperature?',
            textHi: 'सामान्य कमरे के ताप पर कौन-सी अधातु द्रव अवस्था में पाई जाती है?',
            optionsEn: ['Mercury', 'Bromine', 'Iodine', 'Chlorine'],
            optionsHi: ['पारा (मर्करी)', 'ब्रोमीन', 'आयोडीन', 'क्लोरीन'],
            correctOptionIndex: 1,
            explanationEn: 'Bromine (Br₂) is the only liquid non-metal at room temperature. Mercury is a metal.',
            explanationHi: 'ब्रोमीन (Br₂) एकमात्र ऐसी अधातु है जो कमरे के ताप पर द्रव अवस्था में रहती है। पारा एक धातु है।',
            examSource: 'JEECUP 2024 Group A',
            isDemo: false,
            year: 2024,
            difficulty: 'Easy'
          }
        ],
        importantQA: [
          {
            questionEn: 'What is anodizing and how does it prevent corrosion of aluminum articles?',
            questionHi: 'एनोडीकरण (Anodising) क्या है और यह एल्युमिनियम की वस्तुओं को संक्षारण से कैसे बचाता है?',
            answerEn: 'Anodizing is an electrolytic process of creating a thick protective oxide layer of Al₂O₃ on aluminum articles. Clean aluminum article is made the anode in dilute H₂SO₄. Oxygen gas liberated at anode reacts with aluminum to form a durable, uniform, non-porous corrosion-resistant oxide film.',
            answerHi: 'एनोडीकरण एल्युमिनियम की वस्तुओं पर तनु H₂SO₄ विलयन में विद्युत अपघटन द्वारा Al₂O₃ की मोटी, पारदर्शक एवं संक्षारण-रोधी ऑक्साइड परत चढ़ाने की प्रक्रिया है। इसमें वस्तु को एनोड बनाया जाता है।'
          }
        ]
      },
      {
        id: 'chem-ch5',
        subjectId: 'chemistry',
        titleEn: 'Periodic Table',
        titleHi: 'आवर्त सारणी',
        order: 5,
        summaryEn: 'Dobereiner triads, Newlands octaves, Mendeleev periodic table & law, Modern periodic law (Moseley), groups, periods, periodic trends (atomic size, ionization energy, electronegativity).',
        summaryHi: 'डोबेराइनर त्रिक, न्यूलैंड्स अष्टक, मेंडेलीफ आवर्त सारणी व नियम, आधुनिक आवर्त नियम (मोजले), वर्ग, आवर्त एवं आवर्ती प्रवृत्तियां।',
        notesEn: [
          'Mendeleev Periodic Law: Physical and chemical properties of elements are periodic functions of their atomic weights.',
          'Modern Periodic Law (Henry Moseley, 1913): Properties of elements are periodic functions of their atomic numbers (Z).',
          'Modern Periodic Table: 7 horizontal rows called Periods and 18 vertical columns called Groups.',
          'Periodic Trends in a Period (Left to Right):',
          '  - Atomic Size: Decreases (due to increase in effective nuclear charge Z_eff).',
          '  - Valency: Increases from 1 to 4, then decreases to 0.',
          '  - Metallic character: Decreases; Non-metallic character increases.',
          '  - Electronegativity & Ionization Energy: Generally increases.',
          'Periodic Trends down a Group (Top to Bottom):',
          '  - Atomic Size: Increases (new electronic shell added at each step).',
          '  - Metallic character: Increases.',
          '  - Electronegativity: Decreases.'
        ],
        notesHi: [
          'मेंडेलीफ का आवर्त नियम: तत्वों के भौतिक और रासायनिक गुण उनके परमाणु भारों के आवर्ती फलन होते हैं।',
          'आधुनिक आवर्त नियम (हेनरी मोजले, 1913): तत्वों के भौतिक और रासायनिक गुण उनके परमाणु क्रमांकों (Z) के आवर्ती फलन होते हैं।',
          'आधुनिक आवर्त सारणी में 7 क्षैतिज पंक्तियाँ (आवर्त) तथा 18 ऊर्ध्वाधर स्तंभ (वर्ग या समूह) होते हैं।',
          'आवर्त में बाएँ से दाएँ जाने पर:',
          '  - परमाणु त्रिज्या/आकार: घटता है (प्रभावी नाभिकीय आवेश बढ़ने के कारण)।',
          '  - संयोजकता: 1 से बढ़कर 4 होती है, फिर घटकर 0 हो जाती है।',
          '  - धात्विक गुण: घटता है तथा अधात्विक गुण बढ़ता है।',
          '  - विद्युत ऋणात्मकता व आयनन ऊर्जा: बढ़ती है।',
          'वर्ग में ऊपर से नीचे जाने पर:',
          '  - परमाणु आकार: बढ़ता है (नया कोश जुड़ने के कारण)।',
          '  - धात्विक गुण: बढ़ता है।',
          '  - विद्युत ऋणात्मकता: घटती है।'
        ],
        keyPointsEn: [
          'Fluorine (F) is the most electronegative element in the entire periodic table.',
          'Helium (He) has the highest first ionization enthalpy.',
          'Group 18 elements are called Noble Gases (chemically inert with stable octet, except He with duplet).'
        ],
        keyPointsHi: [
          'फ्लोरीन (F) पूरी आवर्त सारणी में सबसे अधिक विद्युत ऋणात्मक तत्व है।',
          'हीलियम (He) की प्रथम आयनन ऊर्जा सर्वाधिक होती है।',
          'वर्ग 18 के तत्वों को अक्रिय गैसें (उत्कृष्ट गैसें) कहते हैं क्योंकि इनका बाह्य कोश पूर्ण होता है।'
        ],
        formulas: [
          {
            id: 'f-chem-6',
            titleEn: 'Modern Periodic Law',
            titleHi: 'आधुनिक आवर्त नियम',
            formula: 'Properties = f(Atomic Number Z)',
            explanationEn: 'Chemical behavior is governed by valence electronic configuration.',
            explanationHi: 'तत्वों का रासायनिक व्यवहार उनकी बाह्यतम इलेक्ट्रॉनिक संरचना पर निर्भर करता है।'
          }
        ],
        mcqs: [
          {
            id: 'q-chem-5',
            subjectId: 'chemistry',
            chapterId: 'chem-ch5',
            chapterTitleEn: 'Periodic Table',
            chapterTitleHi: 'आवर्त सारणी',
            textEn: 'Which is the most electronegative element in the modern periodic table?',
            textHi: 'आधुनिक आवर्त सारणी में सर्वाधिक विद्युत ऋणात्मक तत्व कौन-सा है?',
            optionsEn: ['Chlorine (Cl)', 'Fluorine (F)', 'Oxygen (O)', 'Nitrogen (N)'],
            optionsHi: ['क्लोरीन (Cl)', 'फ्लोरीन (F)', 'ऑक्सीजन (O)', 'नाइट्रोजन (N)'],
            correctOptionIndex: 1,
            explanationEn: 'Fluorine has an electronegativity value of 4.0 on the Pauling scale, making it the most electronegative element.',
            explanationHi: 'पॉलिंग पैमाने पर फ्लोरीन की विद्युत ऋणात्मकता 4.0 है, जो संपूर्ण आवर्त सारणी में सर्वाधिक है।',
            examSource: 'JEECUP 2024 Group A',
            isDemo: false,
            year: 2024,
            difficulty: 'Easy'
          }
        ],
        importantQA: [
          {
            questionEn: 'Why does atomic radius decrease across a period from left to right?',
            questionHi: 'किसी आवर्त में बाएँ से दाएँ जाने पर परमाणु त्रिज्या क्यों घटती है?',
            answerEn: 'Across a period, electrons enter the same valence shell while nuclear charge (number of protons) increases by one unit with each successive element. The increased positive pull draws valence electrons closer to the nucleus, decreasing atomic radius.',
            answerHi: 'आवर्त में बाएँ से दाएँ जाने पर इलेक्ट्रॉन उसी कोश में जुड़ते रहते हैं जबकि नाभिक में प्रोटॉनों की संख्या बढ़ती जाती है। इस बढ़े हुए प्रभावी नाभिकीय आवेश के कारण बाह्यतम इलेक्ट्रॉन नाभिक की ओर अधिक खिंच जाते हैं और परमाणु आकार घट जाता है।'
          }
        ]
      }
    ]
  }
];

export const ALL_QUESTIONS: Question[] = INITIAL_SUBJECTS.flatMap(sub =>
  sub.chapters.flatMap(ch => ch.mcqs)
);

// High-yield mock tests (25, 50, and 100 questions)
export const INITIAL_MOCK_TESTS: MockTest[] = [
  {
    id: 'mock-100-jeecup-full',
    titleEn: 'JEECUP Full Syllabus Grand Mock Test (100 Questions)',
    titleHi: 'JEECUP संपूर्ण पाठ्यक्रम महा मॉक टेस्ट (100 प्रश्न)',
    examType: 'JEECUP (UP Polytechnic Group A)',
    questionCount: 100,
    durationMinutes: 150,
    totalMarks: 400,
    negativeMarking: 0,
    difficulty: 'Medium',
    subjectScope: 'All Subjects',
    descriptionEn: 'Full 100-question simulated exam matching the latest JEECUP Group A pattern (50 Mathematics, 25 Physics, 25 Chemistry).',
    descriptionHi: 'नवीनतम JEECUP ग्रुप A पैटर्न पर आधारित 100 प्रश्नों की वास्तविक परीक्षा (50 गणित, 25 भौतिकी, 25 रसायन विज्ञान)।',
    questions: [] // Generated from questions bank
  },
  {
    id: 'mock-50-math-speed',
    titleEn: 'Mathematics Special 50-Question Power Booster',
    titleHi: 'गणित विशेष 50 प्रश्न स्पीड बूस्टर टेस्ट',
    examType: 'JEECUP / State PE',
    questionCount: 50,
    durationMinutes: 75,
    totalMarks: 200,
    negativeMarking: 0,
    difficulty: 'Medium',
    subjectScope: 'Mathematics',
    descriptionEn: 'Focused 50-question mock test covering algebra, geometry, mensuration, trigonometry, and statistics.',
    descriptionHi: 'बीजगणित, ज्यामिति, क्षेत्रमिति, त्रिकोणमिति एवं सांख्यिकी पर आधारित 50 प्रश्नों का विशेष अभ्यास।',
    questions: []
  },
  {
    id: 'mock-25-science-sprint',
    titleEn: 'Physics & Chemistry 25-Question Rapid Fire',
    titleHi: 'भौतिकी एवं रसायन 25 प्रश्न रैपिड टेस्ट',
    examType: 'Polytechnic Common',
    questionCount: 25,
    durationMinutes: 35,
    totalMarks: 100,
    negativeMarking: 0,
    difficulty: 'Easy',
    subjectScope: 'All Subjects',
    descriptionEn: 'Quick 25-question sprint to test concept clarity in mechanics, optics, electricity, and chemical bonds.',
    descriptionHi: 'गति, प्रकाश, विद्युत एवं रासायनिक आबंधों की अवधारणा स्पष्टता जांचने हेतु 25 प्रश्नों का तीव्र टेस्ट।',
    questions: []
  }
];

export const INITIAL_PYQ_PAPERS: PreviousYearPaper[] = [
  {
    id: 'pyq-jeecup-2024',
    title: 'JEECUP 2024 Group A Official Entrance Question Paper',
    examName: 'JEECUP Group A (Engineering)',
    year: 2024,
    state: 'Uttar Pradesh',
    durationMinutes: 150,
    totalQuestions: 100,
    totalMarks: 400,
    verified: true,
    paperType: 'Official Verified',
    questions: []
  },
  {
    id: 'pyq-jeecup-2023',
    title: 'JEECUP 2023 Group A Shift-1 Question Paper with Solutions',
    examName: 'JEECUP Group A (Engineering)',
    year: 2023,
    state: 'Uttar Pradesh',
    durationMinutes: 150,
    totalQuestions: 100,
    totalMarks: 400,
    verified: true,
    paperType: 'Official Verified',
    questions: []
  },
  {
    id: 'pyq-bihar-2024',
    title: 'Bihar Polytechnic (DCECE / PE) 2024 Solved Entrance Paper',
    examName: 'Bihar Polytechnic PE',
    year: 2024,
    state: 'Bihar',
    durationMinutes: 135,
    totalQuestions: 90,
    totalMarks: 450,
    verified: true,
    paperType: 'Official Verified',
    questions: []
  },
  {
    id: 'pyq-up-2022',
    title: 'UP Polytechnic Entrance Exam 2022 Official Paper',
    examName: 'JEECUP Group A',
    year: 2022,
    state: 'Uttar Pradesh',
    durationMinutes: 150,
    totalQuestions: 100,
    totalMarks: 400,
    verified: true,
    paperType: 'Official Verified',
    questions: []
  }
];

export const DAILY_QUIZ_QUESTIONS: Question[] = [
  {
    id: 'dq-1',
    subjectId: 'mathematics',
    chapterId: 'math-ch4',
    textEn: 'Value of sin²30° + cos²30° is:',
    textHi: 'sin²30° + cos²30° का मान क्या होगा?',
    optionsEn: ['0', '1/2', '1', '2'],
    optionsHi: ['0', '1/2', '1', '2'],
    correctOptionIndex: 2,
    explanationEn: 'sin²θ + cos²θ = 1 for any angle θ.',
    explanationHi: 'किसी भी कोण θ के लिए sin²θ + cos²θ = 1 होता है।',
    examSource: 'Daily Quiz',
    isDemo: false
  },
  {
    id: 'dq-2',
    subjectId: 'physics',
    chapterId: 'phy-ch4',
    textEn: 'The filament of an electric bulb is generally made of:',
    textHi: 'विद्युत बल्ब का फिलामेंट सामान्यतः किस धातु का बना होता है?',
    optionsEn: ['Copper', 'Aluminum', 'Tungsten', 'Nichrome'],
    optionsHi: ['तांबा', 'एल्युमिनियम', 'टंगस्टन', 'नाइक्रोम'],
    correctOptionIndex: 2,
    explanationEn: 'Tungsten has a very high melting point (~3422°C) and high resistance, making it ideal for glowing filaments.',
    explanationHi: 'टंगस्टन का गलनांक अत्यंत उच्च (~3422°C) होता है, जिससे यह उच्च ताप पर पिघलता नहीं है।',
    examSource: 'Daily Quiz',
    isDemo: false
  },
  {
    id: 'dq-3',
    subjectId: 'chemistry',
    chapterId: 'chem-ch3',
    textEn: 'What is the pH value of pure water at 25°C?',
    textHi: '25°C पर शुद्ध जल का pH मान कितना होता है?',
    optionsEn: ['0', '7', '14', '1'],
    optionsHi: ['0', '7', '14', '1'],
    correctOptionIndex: 1,
    explanationEn: 'Pure water is neutral with [H⁺] = 10⁻⁷ M, so pH = -log(10⁻⁷) = 7.',
    explanationHi: 'शुद्ध जल उदासीन होता है, इसका pH मान 7 होता है।',
    examSource: 'Daily Quiz',
    isDemo: false
  },
  {
    id: 'dq-4',
    subjectId: 'mathematics',
    chapterId: 'math-ch2',
    textEn: 'The roots of quadratic equation x² - 5x + 6 = 0 are:',
    textHi: 'द्विघात समीकरण x² - 5x + 6 = 0 के मूल क्या हैं?',
    optionsEn: ['2 and 3', '-2 and -3', '1 and 6', '-1 and -6'],
    optionsHi: ['2 और 3', '-2 और -3', '1 और 6', '-1 और -6'],
    correctOptionIndex: 0,
    explanationEn: 'x² - 3x - 2x + 6 = 0 => (x - 3)(x - 2) = 0 => x = 2, 3.',
    explanationHi: '(x - 2)(x - 3) = 0 => x = 2, 3.',
    examSource: 'Daily Quiz',
    isDemo: false
  },
  {
    id: 'dq-5',
    subjectId: 'physics',
    chapterId: 'phy-ch3',
    textEn: '1 Kilowatt-hour (kWh) is equal to how many Joules?',
    textHi: '1 किलोवाट-घंटा (kWh) कितने जूल के बराबर होता है?',
    optionsEn: ['3.6 × 10⁵ J', '3.6 × 10⁶ J', '3.6 × 10⁷ J', '1000 J'],
    optionsHi: ['3.6 × 10⁵ जूल', '3.6 × 10⁶ जूल', '3.6 × 10⁷ जूल', '1000 जूल'],
    correctOptionIndex: 1,
    explanationEn: '1 kWh = 1000 W × 3600 s = 3,600,000 J = 3.6 × 10⁶ Joules.',
    explanationHi: '1 kWh = 1000 वाट × 3600 सेकंड = 3.6 × 10⁶ जूल।',
    examSource: 'Daily Quiz',
    isDemo: false
  },
  {
    id: 'dq-6',
    subjectId: 'chemistry',
    chapterId: 'chem-ch4',
    textEn: 'Bronze is an alloy of which metals?',
    textHi: 'कांसा (Bronze) किन धातुओं की मिश्रधातु है?',
    optionsEn: ['Copper and Zinc', 'Copper and Tin', 'Lead and Tin', 'Iron and Carbon'],
    optionsHi: ['तांबा और जस्ता', 'तांबा और टिन', 'सीसा और टिन', 'लोहा और कार्बन'],
    correctOptionIndex: 1,
    explanationEn: 'Bronze consists of Copper (~88%) and Tin (~12%). Brass is Copper and Zinc.',
    explanationHi: 'कांसा (Bronze) तांबे और टिन का मिश्रण है। पीतल (Brass) तांबे और जस्ते का मिश्रण है।',
    examSource: 'Daily Quiz',
    isDemo: false
  },
  {
    id: 'dq-7',
    subjectId: 'mathematics',
    chapterId: 'math-ch1',
    textEn: 'Product of two numbers is 1800 and their HCF is 15. Their LCM is:',
    textHi: 'दो संख्याओं का गुणनफल 1800 और उनका म.स.प. 15 है। उनका ल.स.प. होगा:',
    optionsEn: ['120', '150', '180', '90'],
    optionsHi: ['120', '150', '180', '90'],
    correctOptionIndex: 0,
    explanationEn: 'LCM = Product / HCF = 1800 / 15 = 120.',
    explanationHi: 'ल.स.प. = गुणनफल / म.स.प. = 1800 / 15 = 120.',
    examSource: 'Daily Quiz',
    isDemo: false
  },
  {
    id: 'dq-8',
    subjectId: 'physics',
    chapterId: 'phy-ch5',
    textEn: 'Myopia (near-sightedness) is corrected using which lens?',
    textHi: 'निकट दृष्टि दोष (मायोपिया) का निवारण किस लेंस से किया जाता है?',
    optionsEn: ['Convex lens', 'Concave lens', 'Bifocal lens', 'Cylindrical lens'],
    optionsHi: ['उत्तल लेंस', 'अवतल लेंस', 'द्विफोकसी लेंस', 'बेलनाकार लेंस'],
    correctOptionIndex: 1,
    explanationEn: 'Concave lens diverges incoming parallel rays so image forms on retina instead of in front of it.',
    explanationHi: 'अवतल लेंस प्रकाश किरणों को अपसारित करके रेटिना पर स्पष्ट प्रतिबिंब बनाता है।',
    examSource: 'Daily Quiz',
    isDemo: false
  },
  {
    id: 'dq-9',
    subjectId: 'chemistry',
    chapterId: 'chem-ch5',
    textEn: 'Modern Periodic Law is based on:',
    textHi: 'आधुनिक आवर्त नियम किस पर आधारित है?',
    optionsEn: ['Atomic Weight', 'Atomic Mass', 'Atomic Number', 'Neutron Number'],
    optionsHi: ['परमाणु भार', 'परमाणु द्रव्यमान', 'परमाणु क्रमांक', 'न्यूट्रॉन संख्या'],
    correctOptionIndex: 2,
    explanationEn: 'Henry Moseley established that atomic number (Z) is fundamental property rather than atomic mass.',
    explanationHi: 'आधुनिक आवर्त नियम परमाणु क्रमांक (Atomic Number) पर आधारित है।',
    examSource: 'Daily Quiz',
    isDemo: false
  },
  {
    id: 'dq-10',
    subjectId: 'physics',
    chapterId: 'phy-ch1',
    textEn: 'Slope of a velocity-time graph represents:',
    textHi: 'वेग-समय ग्राफ की ढाल (प्रवणता) क्या दर्शाती है?',
    optionsEn: ['Speed', 'Displacement', 'Acceleration', 'Force'],
    optionsHi: ['चाल', 'विस्थापन', 'त्वरण', 'बल'],
    correctOptionIndex: 2,
    explanationEn: 'Slope = Δv / Δt = acceleration.',
    explanationHi: 'ढाल = वेग परिवर्तन / समय = त्वरण।',
    examSource: 'Daily Quiz',
    isDemo: false
  }
];

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'lead-1',
    studentName: 'Nitin Kumar (Top Ranker)',
    rollNumber: 'JEEC-2026-001',
    score: 96,
    totalMarks: 100,
    timeTaken: '4 min 12 sec',
    avatarUrl: '/assets/aistudio/ChatGPT_Image_Oct_13__2026__08_09_58_PM__1__11160beb.jpg',
    date: 'Today',
    state: 'UP'
  },
  {
    id: 'lead-2',
    studentName: 'Priya Sharma',
    rollNumber: 'JEEC-2026-148',
    score: 92,
    totalMarks: 100,
    timeTaken: '5 min 02 sec',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    date: 'Today',
    state: 'Bihar'
  },
  {
    id: 'lead-3',
    studentName: 'Amit Verma',
    rollNumber: 'JEEC-2026-219',
    score: 88,
    totalMarks: 100,
    timeTaken: '5 min 45 sec',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    date: 'Today',
    state: 'UP'
  },
  {
    id: 'lead-4',
    studentName: 'Rohan Gupta',
    rollNumber: 'JEEC-2026-304',
    score: 84,
    totalMarks: 100,
    timeTaken: '6 min 10 sec',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    date: 'Today',
    state: 'MP'
  },
  {
    id: 'lead-5',
    studentName: 'Sneha Patel',
    rollNumber: 'JEEC-2026-412',
    score: 80,
    totalMarks: 100,
    timeTaken: '6 min 35 sec',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    date: 'Today',
    state: 'Delhi'
  }
];
