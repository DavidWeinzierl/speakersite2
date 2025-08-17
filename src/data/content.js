// src/data/content.js

// Easily update all your website's content here

export const speakerData = {
    name: "Philipp Obermüller",
    tagline: "Professional Voice Talent & Radio Commercial Specialist",
    email: "philipp.obermuller@example.com",
    about: "I am a professional voice talent with over a decade of experience bringing scripts to life through compelling narration and commercial work. My passion is crafting authentic, engaging voiceovers that connect with audiences and drive results. Whether it's a radio commercial, corporate narration, or documentary work, I deliver the perfect voice to tell your story.",
    experience: [
      "Voice Talent for National Radio Campaigns",
      "Corporate Narration for Fortune 500 Companies",
      "Documentary Narrator for Award-Winning Films",
      "Commercial Voice for Leading Brands"
    ],
    audioSamples: [
        {
          title: "Radio Commercial: Automotive Brand",
          description: "High-energy commercial showcasing dynamic vocal range and persuasive delivery.",
          // Change this line:
          file: process.env.PUBLIC_URL + "/audio/sample1.mp3?id=1"
        },
        {
          title: "Corporate Narration: Healthcare Services",
          description: "Warm, trustworthy voice perfect for professional healthcare messaging.",
          // Change this line:
          file: process.env.PUBLIC_URL + "/audio/sample1.mp3?id=2"
        },
        {
          title: "Documentary Narration: Environmental Story",
          description: "Compelling storytelling voice that engages and educates viewers.",
          // Change this line:
          file: process.env.PUBLIC_URL + "/audio/sample1.mp3?id=3"
        },
        {
          title: "Radio Commercial: Food & Beverage",
          description: "Appetizing, conversational tone that makes listeners crave the product.",
          // Change this line:
          file: process.env.PUBLIC_URL + "/audio/sample1.mp3?id=4",
          type: "waveform"
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
    ]
  };