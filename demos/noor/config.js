/* ============================================================
   NOOR INVITE — ALL EDITABLE CONTENT LIVES HERE
   Names, dates, events, photos, links and colours.
   Dates use ISO format with the India offset (+05:30).
   ============================================================ */
window.INVITE = {
  meta: { sampleLabel: "Sample invite — names, dates and venues are illustrative." },

  colors: {
    bg: "#F8F4EA", bg2: "#EFEBDD", ink: "#18192E", muted: "#55566C", head: "#14204A",
    accent: "#11584A", gold: "#C9A45A", card: "#FFFDF7", line: "rgba(20,32,74,.16)"
  },

  couple: {
    first1: "Ayaan", first2: "Zoya",
    full1: "Ayaan Mirza", full2: "Zoya Naqvi",
    parents1: "Son of Janab Imran Mirza & Begum Shabana Mirza, Lucknow",
    parents2: "Daughter of Janab Faisal Naqvi & Begum Rukhsana Naqvi, Hyderabad",
    bio1: "A conservation architect who restores old Lucknow havelis and knows the best kebab shop on every street he has worked on.",
    bio2: "A poet and schoolteacher who writes Urdu ghazals in the margins of her lesson plans and reads them to no one, except Ayaan.",
    story: "A mushaira, a shared umbrella in the December rain, and two families who agreed over sheer chai. With gratitude to Allah, we begin.",
    photo: "assets/img/couple.webp",
    photoAlt: "Painted portrait of Ayaan in an ivory sherwani and Zoya in a blush-pink gharara under a white arch"
  },

  // Opening scene (the jaali and the crescent)
  opening: {
    eyebrow: "Nikah",
    veilLine: "With the blessings of Allah",
    dateLine: "Saturday, 18 December 2027",
    city: "Lucknow, Uttar Pradesh",
    hint: "Scroll to open the jaali"
  },

  blessing: {
    symbolHtml: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="14" y="14" width="36" height="36"/><rect x="14" y="14" width="36" height="36" transform="rotate(45 32 32)"/><circle cx="32" cy="32" r="8"/><path d="M36 26a7 7 0 1 0 2 10a5.6 5.6 0 1 1 -2 -10z" fill="currentColor" stroke="none"/></svg>',
    line: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", lang: "ar", dir: "rtl",
    meaning: "In the name of Allah, the Most Gracious, the Most Merciful."
  },

  invitation: {
    families: "The Mirza and Naqvi families",
    text: "request the honour of your presence at the Nikah of their children",
    joiner: "&",
    closing: "Your presence and duas will make our celebration complete."
  },

  coupleTitle: { kicker: "The couple", title: "Written in the stars" },
  eventsTitle: { kicker: "Celebrations", title: "Three evenings of noor" },

  events: [
    {
      name: "Mehndi", local: "مہندی", localLang: "ur", localDir: "rtl",
      dateLabel: "Friday, 17 December 2027", time: "6:00 PM onwards",
      venue: "Naqvi Residence", area: "Hazratganj, Lucknow",
      map: "https://www.google.com/maps/search/?api=1&query=Hazratganj+Lucknow",
      dress: "Greens, yellows and anything festive",
      note: "Henna, dholak songs and chai for the ladies and the whole family.",
      image: "assets/art/ev-mehndi.webp", imageAlt: "Painting of henna cones, a bowl of henna paste and glass bangles on a tray",
      palette: { bg: "#0F4A3E", deep: "#08302A", ink: "#F3EEDC", accent: "#E9C46A" }
    },
    {
      name: "Nikah", local: "نکاح", localLang: "ur", localDir: "rtl",
      dateLabel: "Saturday, 18 December 2027", time: "Baraat arrives at 3:30 PM",
      highlight: { label: "Nikah:", value: "4:30 PM, followed by dinner" },
      venue: "Kaiserbagh Heritage Hall", area: "Kaiserbagh, Lucknow (sample venue)",
      map: "https://www.google.com/maps/search/?api=1&query=Kaiserbagh+Lucknow",
      dress: "Traditional; ladies may like to carry a dupatta",
      note: "The Nikah will be solemnised by the Qazi in the presence of both families.",
      image: "assets/art/ev-nikah.webp", imageAlt: "Painting of a white arched hall hung with tuberose strands and a low carved takht",
      palette: { bg: "#FBF6EA", deep: "#14204A", ink: "#18192E", accent: "#A9853F" }
    },
    {
      name: "Walima", local: "ولیمہ", localLang: "ur", localDir: "rtl",
      dateLabel: "Sunday, 19 December 2027", time: "8:00 PM onwards",
      venue: "Gulistan Lawns", area: "Gomti Nagar, Lucknow (sample venue)",
      map: "https://www.google.com/maps/search/?api=1&query=Gomti+Nagar+Lucknow",
      dress: "Evening formal",
      note: "Our first dinner as a married couple, hosted by the Mirza family.",
      image: "assets/art/ev-walima.webp", imageAlt: "Painting of an Awadhi dinner spread with biryani, kebabs and phirni under lanterns",
      palette: { bg: "#1A2353", deep: "#0E1434", ink: "#F3EEDF", accent: "#E9CF8C" }
    }
  ],

  gallery: {
    kicker: "Moments", title: "A few of our favourites",
    items: [
      { src: "assets/img/g2.webp", alt: "Ayaan and Zoya laughing together in a rowing boat on the river at sunset", caption: "The Gomti, one golden evening" },
      { src: "assets/img/g1.webp", alt: "A grand gateway glowing at dusk, reflected on a rain-washed road", caption: "Lucknow evenings" },
      { src: "assets/img/g4.webp", alt: "Ayaan and Zoya smiling under a white arch", caption: "The day the families said yes" },
      { src: "assets/img/g3.webp", alt: "Attar bottles, wedding rings, roses and jasmine on a silver tray", caption: "Attar and promises" }
    ]
  },

  rsvp: {
    kicker: "RSVP", title: "Will you join us?",
    text: "Tap below to send us a quick note on WhatsApp. Let us know how many of you are coming and which evenings.",
    button: "RSVP on WhatsApp",
    whatsapp: "919800000000",
    message: "Assalamu alaikum! We'd love to attend Ayaan & Zoya's Nikah. Number of guests: ",
    deadline: "Kindly reply by 25 November 2027."
  },

  info: {
    kicker: "Good to know", title: "Before you travel",
    items: [
      { icon: "weather", title: "Weather", text: "Mid-December in Lucknow is cool: around 22°C by day and 8°C at night, with foggy mornings. Bring a warm shawl." },
      { icon: "dress", title: "At the Nikah", text: "Modest traditional wear is welcome. Ladies may like to carry a dupatta for the ceremony." },
      { icon: "stay", title: "Stay", text: "Rooms are held for out-of-town guests near Hazratganj. Message us and we'll share the details." },
      { icon: "parking", title: "Parking", text: "Valet parking at the Nikah and the Walima. Winter traffic is slow, so please leave a little early." }
    ]
  },
  instagram: { hashtag: "#AyaanKiZoya", url: "https://www.instagram.com/explore/tags/ayaankizoya/", button: "Share your photos" },

  countdown: {
    to: "2027-12-18T16:30:00+05:30",
    kicker: "Saturday, 18 December 2027", title: "Until the Nikah",
    after: "Mubarak! We're married.", bg: "assets/art/garden-cd.webp"
  },

  particles: {
    opening: { shape: "star", colors: ["#FFF6DD", "#E9CF8C", "#DDE4FF"], size: [2, 4], speed: [0.12, 0.3], rise: true, density: 0.6 },
    countdown: { shape: "star", colors: ["#FFF1C9", "#E9CF8C"], size: [2, 4], speed: [0.12, 0.35], rise: true, density: 0.8 }
  },

  music: { src: "assets/audio/theme.mp3" },
  ornament: '<svg viewBox="0 0 40 40"><g fill="none" stroke="currentColor" stroke-width="1.3"><rect x="10" y="10" width="20" height="20"/><rect x="10" y="10" width="20" height="20" transform="rotate(45 20 20)"/></g><circle cx="20" cy="20" r="3" fill="#C9A45A"/></svg>',
  footer: { withLove: "With love and duas, the Mirza and Naqvi families" },
  credits: ["Noor template · paintings, motion and music are original artwork."]
};
