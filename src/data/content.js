// src/data/content.js

// Easily update all your website's content here

export const speakerData = {
    name: "Philipp Obermüller",
    tagline: "Inspiring Voice, Big Dong.",
    email: "alex.rivera.speaker@example.com",
    about: "I am a professional speaker and communication coach with over a decade of experience captivating audiences. My passion is to translate complex ideas into compelling stories that inspire action and drive change. Whether on stage or in a workshop, my goal is to connect, engage, and leave a lasting impact.",
    experience: [
      "Keynote Speaker, Innovate Conference 2024",
      "Workshop Facilitator, TechCorp Inc.",
      "Guest Lecturer, University of Communication",
      "Voiceover for 'Future Forward' Documentary"
    ],
    audioSamples: [
        {
          title: "Motivational Excerpt: The Power of Perspective",
          description: "A clip from a recent keynote on resilience and mindset.",
          // Change this line:
          file: process.env.PUBLIC_URL + "/audio/sample1.mp3?id=1"
        },
        {
          title: "Corporate Narration: Brand Story",
          description: "A warm, professional tone for a corporate brand video.",
          // Change this line:
          file: process.env.PUBLIC_URL + "/audio/sample1.mp3?id=2"
        },
        {
          title: "Energetic Conference Opening",
          description: "Setting an upbeat and engaging tone for a major industry event.",
          // Change this line:
          file: process.env.PUBLIC_URL + "/audio/sample1.mp3?id=3"
        },
        {
          title: "In-depth Podcast Interview Segment",
          description: "A longer sample showcasing nuanced discussion and vocal range. Ideal for detailed insights.",
          // Change this line:
          file: process.env.PUBLIC_URL + "/audio/sample1.mp3?id=4",
          type: "waveform"
        }
      ],
    testimonials: [
      {
        quote: "Alex's delivery was electric. Our attendees were captivated from start to finish. Truly the highlight of our conference.",
        author: "Jane Doe",
        title: "Event Director, Innovate Conference"
      },
      {
        quote: "The voiceover work Alex provided was exactly what we needed—professional, clear, and perfectly aligned with our brand's message.",
        author: "John Smith",
        title: "Marketing Manager, TechCorp Inc."
      },
      {
        quote: "Our team left the workshop feeling inspired and equipped with new communication skills. Alex is not just a speaker, but a fantastic teacher.",
        author: "Emily White",
        title: "HR Lead, Creative Solutions"
      }
    ]
  };