/* ============================================================
   RANGMAHAL INVITE — ALL EDITABLE CONTENT LIVES HERE
   Change names, dates, events, photos, links and colours below.
   Dates use ISO format with the India offset (+05:30).
   ============================================================ */
window.INVITE = {
  meta: {
    title: "Aarav & Meher — Wedding Invitation",
    description: "Join us in Udaipur, 12–14 February 2027.",
    sampleLabel: "Sample invite — names, dates and venues are illustrative."
  },

  couple: {
    groom: "Aarav",
    bride: "Meher",
    groomFull: "Aarav Sharma",
    brideFull: "Meher Rathore",
    groomParents: "Son of Mrs. Kavita & Mr. Rajesh Sharma, Jaipur",
    brideParents: "Daughter of Mrs. Nandini & Mr. Vikram Rathore, Udaipur",
    groomBio: "An architect who sketches doorways wherever he travels, and who still can't believe she said yes over chai.",
    brideBio: "A classical dancer and the family's unofficial event planner, who has been counting down since the day they met.",
    story: "Two families, one city of lakes and a lifetime of celebrations ahead. We'd love you there for every moment of it."
  },

  // Shown on the closed doors and in the opening text
  opening: {
    eyebrow: "Shubh Vivah",
    doorHint: "Scroll to open the doors",
    dateLine: "12 – 14 February 2027",
    city: "Udaipur, Rajasthan"
  },

  // Ganesha blessing block
  mantra: {
    line: "॥ श्री गणेशाय नमः ॥",
    shloka: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
    meaning: "O Lord Ganesha, radiant as a million suns, remove every obstacle from all that we begin."
  },

  invitation: {
    families: "The Sharma and Rathore families",
    text: "joyfully invite you and your family to celebrate the wedding of their children",
    closing: "Your presence and blessings will make our celebrations complete."
  },

  // Each event gets its own palette. bg = card colour, ink = text, accent = trims/buttons
  events: [
    {
      name: "Mehendi", local: "मेहंदी",
      start: "2027-02-12T16:00:00+05:30",
      dateLabel: "Friday, 12 February 2027", time: "4:00 PM onwards",
      venue: "Bagh-e-Noor Lawns, Sagar Vilas", area: "Lake Pichola, Udaipur",
      map: "https://www.google.com/maps/search/?api=1&query=Lake+Pichola+Udaipur",
      dress: "Shades of green", image: "assets/art/ev-mehendi.webp",
      imageAlt: "Painting of a bride having mehendi applied in a palace garden",
      palette: { bg: "#1F5235", deep: "#123722", ink: "#F6F1DC", accent: "#C9DB7A" }
    },
    {
      name: "Haldi", local: "हल्दी",
      start: "2027-02-13T10:00:00+05:30",
      dateLabel: "Saturday, 13 February 2027", time: "10:00 AM",
      venue: "The Sun Courtyard, Sagar Vilas", area: "Lake Pichola, Udaipur",
      map: "https://www.google.com/maps/search/?api=1&query=Lake+Pichola+Udaipur",
      dress: "Yellow and white", image: "assets/art/ev-haldi.webp",
      imageAlt: "Painting of a joyful haldi ceremony",
      palette: { bg: "#E1A21B", deep: "#B97A06", ink: "#3A2200", accent: "#FFF3C4" }
    },
    {
      name: "Sangeet", local: "संगीत",
      start: "2027-02-13T19:30:00+05:30",
      dateLabel: "Saturday, 13 February 2027", time: "7:30 PM till late",
      venue: "Darbar Hall, Sagar Vilas", area: "Lake Pichola, Udaipur",
      map: "https://www.google.com/maps/search/?api=1&query=Lake+Pichola+Udaipur",
      dress: "Glitter and jewel tones", image: "assets/art/ev-sangeet.webp",
      imageAlt: "Painting of a couple dancing at a sangeet night",
      palette: { bg: "#9C1757", deep: "#6B0C3B", ink: "#FFEAF3", accent: "#FF9BC8" }
    },
    {
      name: "Wedding", local: "विवाह",
      start: "2027-02-14T19:30:00+05:30",
      dateLabel: "Sunday, 14 February 2027", time: "Baraat 6:30 PM · Pheras 7:30 PM",
      venue: "Lakefront Lawns, Sagar Vilas", area: "Lake Pichola, Udaipur",
      map: "https://www.google.com/maps/search/?api=1&query=Lake+Pichola+Udaipur",
      dress: "Traditional Indian", image: "assets/art/ev-wedding.webp",
      imageAlt: "Painting of a bride and groom under a mandap by a lake",
      palette: { bg: "#B3261E", deep: "#7C130F", ink: "#FFF4E0", accent: "#E7BE62" }
    }
  ],

  // The countdown counts to this moment; afterwards it shows "Just married"
  countdownTo: "2027-02-14T19:30:00+05:30",
  countdownTitle: "The countdown begins",
  countdownAfter: "Just married",

  gallery: {
    title: "Moments before forever",
    images: [
      { src: "assets/img/g1.webp", alt: "Couple portrait on a terrace" },
      { src: "assets/img/g2.webp", alt: "Couple in wedding attire" },
      { src: "assets/img/g3.webp", alt: "Couple portrait against a dark backdrop" },
      { src: "assets/img/g4.webp", alt: "Couple under a festive canopy" },
      { src: "assets/img/g5.webp", alt: "Couple dancing" }
    ]
  },

  couplePhoto: { src: "assets/img/couple.webp", alt: "The couple under twinkling lights" },

  rsvp: {
    title: "Will you join us?",
    text: "Tap below to RSVP on WhatsApp. Kindly reply by 20 January 2027.",
    button: "RSVP on WhatsApp",
    // Placeholder number. Replace with country code + number, digits only, e.g. "9198XXXXXXXX"
    whatsapp: "910000000000",
    message: "Hi! We're delighted to attend Aarav & Meher's wedding. Number of guests: __"
  },

  instagram: { title: "Follow the celebrations", handle: "@aaravandmeher", url: "#", button: "Open Instagram" },
  hashtag: "#MeherKaAarav",

  info: [
    { icon: "hashtag", title: "Hashtag", text: "Share your photos with #MeherKaAarav" },
    { icon: "weather", title: "Weather", text: "Pleasant days around 26°C, cool evenings near 12°C. Carry a shawl." },
    { icon: "stay", title: "Stay", text: "Rooms are held for guests at Sagar Vilas. Our family team will share details." },
    { icon: "parking", title: "Parking", text: "Valet parking at the main gate. Boat shuttles run every 20 minutes." },
    { icon: "dress", title: "Dress code", text: "Each event has a colour theme. Comfortable shoes for the lawns!" }
  ],

  // Music: any MP3 you have the rights to use. Never autoplays; guests tap to play.
  music: { src: "assets/audio/invite-theme.mp3", title: "Rangmahal theme (original)" },

  // Global colours
  colors: {
    ivory: "#FBF4E6", maroon: "#4C1026", gold: "#C08A2E", goldLight: "#E9C77B",
    peacock: "#0F3F3D", marigold: "#F28A1E", rose: "#F4DCD3", ink: "#2B1A1F"
  },

  credits: [
    "Gallery and couple photos from Pexels (free licence): the Amritdev, Deepak Sharma, upender photography, Gaurav Vishwakarma, Ramu ipictures, Khaas Photographer. Replace them with your own photos.",
    "Paintings, illustrations, motion and music are original to the Rangmahal template."
  ]
};
