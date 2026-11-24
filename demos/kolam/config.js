/* ============================================================
   KOLAM INVITE — ALL EDITABLE CONTENT LIVES HERE
   Names, dates, events, photos, links and colours.
   Dates use ISO format with the India offset (+05:30).
   ============================================================ */
window.INVITE = {
  meta: { sampleLabel: "Sample invite — names, dates and venues are illustrative." },

  colors: {
    bg: "#FBF5EA", bg2: "#F4EADA", ink: "#2B1A12", muted: "#6A5546", head: "#6E1423",
    accent: "#0E5E52", gold: "#C8962E", card: "#FFFBF3", line: "rgba(110,20,35,.18)"
  },

  couple: {
    first1: "Karthik", first2: "Nila",
    full1: "Karthik Venkatesan", full2: "Nila Ramanathan",
    parents1: "Son of Thiru. R. Venkatesan & Tmt. Meenakshi Venkatesan, Coimbatore",
    parents2: "Daughter of Thiru. S. Ramanathan & Tmt. Lalitha Ramanathan, Chennai",
    bio1: "A marine biologist who counts turtle nests on the Chennai coast and has never once refused a second filter coffee.",
    bio2: "A Carnatic violinist and architect who draws a fresh kolam at her grandmother's doorstep every Margazhi morning.",
    story: "A December concert, a borrowed umbrella, and two families who said yes over a plate of murukku. Come bless the beginning.",
    photo: "assets/img/couple.webp",
    photoAlt: "Painted portrait of Karthik in a silk veshti and Nila in a Kanjeevaram saree on a carved wooden swing"
  },

  // Opening scene (the kolam and the lamp)
  opening: {
    tamilLine: "திருமண அழைப்பிதழ்",
    topLine: "A wedding invitation",
    eyebrow: "Shubh Muhurtham",
    dateLine: "Saturday, 4 December 2027",
    city: "Chennai, Tamil Nadu",
    hint: "Scroll to light the lamp"
  },

  blessing: {
    symbolHtml: '<svg viewBox="0 0 60 80" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M30 4c3 4 4 7 0 11c-4-4-3-7 0-11z" fill="#F2B54A" stroke="#C8962E"/><path d="M27 17h6M30 17v6M14 27c4 5 28 5 32 0M10 25h40M14 27l-2-4M46 27l2-4M30 29v8c-3 2-3 6 0 8c3-2 3-6 0-8M30 45v14M24 59h12M20 66c0-4 20-4 20 0M14 74c0-6 32-6 32 0z"/></svg>',
    line: "ஸ்ரீ கணேசாய நம:", lang: "ta",
    meaning: "Sri Ganeshaya Namaha: salutations to Lord Ganesha, remover of obstacles, as every auspicious beginning asks."
  },

  invitation: {
    families: "The Venkatesan and Ramanathan families",
    text: "joyfully invite you, with your family, to the wedding of their children",
    joiner: "&",
    closing: "Your presence and blessings are the greatest gift."
  },

  coupleTitle: { kicker: "The couple", title: "Two families, one swing" },
  eventsTitle: { kicker: "Celebrations", title: "Three days of jasmine" },

  events: [
    {
      name: "Nichayathartham", local: "நிச்சயதார்த்தம்", localLang: "ta",
      dateLabel: "Friday, 3 December 2027", time: "6:30 PM onwards",
      venue: "Kamalam Mahal", area: "T. Nagar, Chennai (sample venue)",
      map: "https://www.google.com/maps/search/?api=1&query=T+Nagar+Chennai",
      dress: "Festive silks", note: "The formal engagement: lagna patrikai is read and thambulam plates are exchanged, followed by dinner.",
      image: "assets/art/ev-nich.webp", imageAlt: "Painting of brass plates of betel leaves, coconuts and a folded Kanjeevaram saree",
      palette: { bg: "#123F3A", deep: "#0A2724", ink: "#F6EEDC", accent: "#F0C25E" }
    },
    {
      name: "Muhurtham", local: "முகூர்த்தம்", localLang: "ta",
      dateLabel: "Saturday, 4 December 2027", time: "Kasi Yatrai and Oonjal from 6:00 AM",
      highlight: { label: "Shubh Muhurtham:", value: "7:30 AM to 9:00 AM" },
      venue: "Kamalam Mahal", area: "T. Nagar, Chennai (sample venue)",
      map: "https://www.google.com/maps/search/?api=1&query=T+Nagar+Chennai",
      dress: "Traditional; silk sarees and veshtis welcome",
      note: "The thali is tied at the muhurtham, followed by a wedding feast served on banana leaf.",
      image: "assets/art/ev-muhurtham.webp", imageAlt: "Painting of a wedding mandapam framed by banana trees and jasmine garlands at dawn",
      palette: { bg: "#FFF3DE", deep: "#6E1423", ink: "#2B1A12", accent: "#B4561A" }
    },
    {
      name: "Reception", local: "வரவேற்பு", localLang: "ta",
      dateLabel: "Saturday, 4 December 2027", time: "7:00 PM onwards",
      venue: "The Courtyard, East Coast Road", area: "Injambakkam, Chennai (sample venue)",
      map: "https://www.google.com/maps/search/?api=1&query=Injambakkam+Chennai",
      dress: "Evening festive",
      note: "Music, dinner, and a stage full of jasmine. Come say hello to the newlyweds.",
      image: "assets/art/ev-reception.webp", imageAlt: "Painting of a reception stage with jasmine and marigold strands, gold chairs and brass lamps",
      palette: { bg: "#5C1220", deep: "#3A0912", ink: "#FBEFE4", accent: "#F4C76A" }
    }
  ],

  gallery: {
    kicker: "Moments", title: "A few of our favourites",
    items: [
      { src: "assets/img/g1.webp", alt: "Karthik and Nila walking hand in hand on the beach beside fishing boats", caption: "Marina, after every concert" },
      { src: "assets/img/g2.webp", alt: "Karthik and Nila laughing over filter coffee on the steps of an old Mylapore house", caption: "Filter coffee, Mylapore" },
      { src: "assets/img/g4.webp", alt: "Karthik and Nila smiling on a carved wooden swing", caption: "The oonjal at Paati's house" },
      { src: "assets/img/g3.webp", alt: "Jasmine and rose wedding garlands beside a lit brass lamp", caption: "Two garlands, waiting" }
    ]
  },

  rsvp: {
    kicker: "RSVP", title: "Will you join us?",
    text: "Tap below to send us a quick note on WhatsApp. Let us know how many of you are coming and which days.",
    button: "RSVP on WhatsApp",
    whatsapp: "919800000000",
    message: "Vanakkam! We'd love to attend Karthik & Nila's wedding. Number of guests: ",
    deadline: "Kindly reply by 10 November 2027."
  },

  info: {
    kicker: "Good to know", title: "Before you travel",
    items: [
      { icon: "weather", title: "Weather", text: "Early December in Chennai is warm, around 29°C, with a chance of a late monsoon shower. Carry a small umbrella." },
      { icon: "dress", title: "At the mandapam", text: "Footwear comes off near the mandapam. Jasmine strings will be handed out at the entrance." },
      { icon: "stay", title: "Stay", text: "Rooms are held for out-of-town guests near T. Nagar. Message us and we'll share the details." },
      { icon: "parking", title: "Parking", text: "Valet parking at both venues. The muhurtham starts early, so plan to arrive by 7 AM." }
    ]
  },
  instagram: { hashtag: "#KarthikNilaKalyanam", url: "https://www.instagram.com/explore/tags/karthiknilakalyanam/", button: "Share your photos" },

  countdown: {
    to: "2027-12-04T07:30:00+05:30",
    kicker: "Saturday, 4 December 2027", title: "Until the muhurtham",
    after: "Just married!", bg: "assets/art/yard-cd.webp"
  },

  particles: {
    opening: { shape: "jasmine", colors: ["#FFFDF6", "#FFF6E2", "#FFE9B8"], size: [5, 9], speed: [0.45, 1.0], density: 0.55 },
    countdown: { shape: "spark", colors: ["#FFD27A", "#FFF1C9", "#FF9F45"], size: [2, 4], speed: [0.15, 0.4], rise: true, density: 0.8 }
  },

  music: { src: "assets/audio/theme.mp3" },
  ornament: '<svg viewBox="0 0 40 40"><g fill="none" stroke="currentColor" stroke-width="1.3"><path d="M20 6c6 5 6 23 0 28c-6-5-6-23 0-28z"/><path d="M6 20c5-6 23-6 28 0c-5 6-23 6-28 0z"/></g><circle cx="20" cy="20" r="2.4" fill="#C8962E"/><g fill="currentColor"><circle cx="9" cy="9" r="1.3"/><circle cx="31" cy="9" r="1.3"/><circle cx="9" cy="31" r="1.3"/><circle cx="31" cy="31" r="1.3"/></g></svg>',
  footer: { withLove: "With love, the Venkatesan and Ramanathan families" },
  credits: ["Kolam template · paintings, motion and music are original artwork."]
};
