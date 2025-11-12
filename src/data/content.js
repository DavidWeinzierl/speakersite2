// src/data/content.js

// Easily update all your website's content here

export const speakerData = {
    name: "Philipp Obermüller",
    tagline: "Phil Your Voice – Eine Stimme die mehr als nur Worte transportiert.",
    email: "philipp.obermuller@example.com",
    about: "Meine Stimme erzählt Geschichten – für Werbung, Telefonschleifen, Hörbücher, Podcasts, E-Learning oder Synchronisation. Ich bin Philipp Obermüller, professioneller Sprecher aus Linz. Ob warm, seriös, energiegeladen oder charmant: Ich finde den passenden Ton für Ihr Projekt und liefere jede Aufnahme schnell, sauber und in höchster Qualität. Ich freue mich auf die Zusammenarbeit.",
  // Title used in the AboutMe2 speech bubble
  aboutTitle: "Über Mich",
    experience: [
      "Voice Talent for National Radio Campaigns",
      "Corporate Narration for Fortune 500 Companies",
      "Documentary Narrator for Award-Winning Films",
      "Commercial Voice for Leading Brands"
    ],
    brands: [
      {
        id: 1,
        name: "Ford",
        logo: process.env.PUBLIC_URL + "/images/ford.png"
      },
      {
        id: 2,
        name: "Bellaflora",
        logo: process.env.PUBLIC_URL + "/images/bellaflora.png"
      },
      {
        id: 3,
        name: "Europlasma",
        logo: process.env.PUBLIC_URL + "/images/europlasma.png"
      },
      {
        id: 4,
        name: "Casinos Austria",
        logo: process.env.PUBLIC_URL + "/images/casinosaustria.png"
      },
      {
        id: 5,
        name: "Nespresso",
        logo: process.env.PUBLIC_URL + "/images/nespresso.svg"
      },
      {
        id: 6,
        name: "Wiselburger Messe",
        logo: process.env.PUBLIC_URL + "/images/wieselburgermesse.png"
      }
    ],
    audioSamples: [
        {
          title: "Europlasma",
          description: "Kino-Spot",
          // Change this line:
          file: process.env.PUBLIC_URL + "/audio/europlasma.mp3"
        },
        {
          title: "Ford 4 You",
          description: "Hörfunk-Spot",
          // Change this line:
          file: process.env.PUBLIC_URL + "/audio/ford.mp3"
        },
        {
          title: "Bellaflora",
          description: "Hörfunk-Spot",
          // Change this line:
          file: process.env.PUBLIC_URL + "/audio/bellaflora.mp3"
        },
        {
          title: "Wieselburger Messe",
          description: "Hörfunk-Spot",
          // Change this line:
          file: process.env.PUBLIC_URL + "/audio/wieselburgermesse.mp3"
        },
        {
          title: "Salzburg AG",
          description: "Hörfunk-Spot",
          file: process.env.PUBLIC_URL + "/audio/SalzburgAG.mp3"
        },
        {
          title: "Megaplexx",
          description: "Hörfunk-Spot",
          file: process.env.PUBLIC_URL + "/audio/Megaplexx.mp3"
        },
        {
          title: "FHCS",
          description: "Hörfunk-Spot",
          file: process.env.PUBLIC_URL + "/audio/FHCS.wav"
        },
        {
          title: "Jugendverschuldung",
          description: "Hörfunk-Spot",
          file: process.env.PUBLIC_URL + "/audio/Jugendverschuldung.mp3"
        }
      ],
    testimonials: [
      {
        quote: "Philipp's voice brought our radio campaign to life. His delivery was exactly what our brand needed—confident, engaging, and memorable.",
        author: "Sarah Johnson",
        title: "Creative Director, AdVoice Agency"
      },
      {
        quote: "The voiceover work Philipp provided was exceptional—professional, clear, and perfectly aligned with our brand's message. He exceeded our expectations.",
        author: "Michael Chen",
        title: "Marketing Manager, TechCorp Inc."
      },
      {
        quote: "Working with Philipp was a dream. His voice perfectly captured the emotion and gravitas our documentary needed. Highly recommended.",
        author: "Emma Rodriguez",
        title: "Film Producer, Creative Vision Studios"
      }
    ],
    services: [
      {
        title: "Sprecherdienste",
        icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
        items: [
          "Hörfunk-Spots (UKW & Online)",
          "Kino-Spots",
          "TV-Werbung",
          "Imagevideos",
          "Dokumentationen",
          "Hörbücher",
          "E-Learning",
          "Gesang & Jingles",
          "Synchronisation"
        ]
      },
      {
        title: "Ausstattung und Anlieferung",
        icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
        items: [
          "Neumann TLM 102 Mikrofon",
          "Universal Audio Interface",
          "Aufnahme in akustisch angepassten Räumlichkeiten",
          "DAWs: ProTools & Logic Pro X",
          "24-Bit/96kHz Aufnahmequalität",
          "Verschiedene Dateiformate"
        ]
      },
      {
        title: "Spezial-Services",
        icon: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0",
        items: [
          "Remote-Aufnahme via Session-Link",
          "Same-Day Delivery",
          "24/7 Verfügbarkeit",
          "Englischsprachige Aufnahmen",
          "Copywriting auf Anfrage"
        ]
      }
    ]
    ,
    // Label text for the dark polygon in the AboutMe2 section
    polygonLabel: "Eine Stimme die mehr als nur Worte transportiert",
  };