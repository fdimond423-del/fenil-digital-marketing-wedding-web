/* ============================================================
   PHULKARI INVITE — ALL EDITABLE CONTENT LIVES HERE
   Names, dates, events, photos, links and colours.
   Dates use ISO format with the India offset (+05:30).
   ============================================================ */
window.INVITE = {
  meta: { sampleLabel: "Sample invite — names, dates and venues are illustrative." },

  colors: {
    bg: "#FBF2E6", bg2: "#F6E7D6", ink: "#3A1420", muted: "#6D4A4E", head: "#6E1630",
    accent: "#A8283B", gold: "#E9B13A", card: "#FFF9F1", line: "rgba(168,40,59,.2)"
  },

  couple: {
    first1: "Arjan", first2: "Simran",
    full1: "Arjan Singh Sandhu", full2: "Simran Kaur Gill",
    parents1: "Son of S. Harpreet Singh & Sdn. Navneet Kaur Sandhu, Ludhiana",
    parents2: "Daughter of S. Gurdeep Singh & Sdn. Manjit Kaur Gill, Amritsar",
    bio1: "A civil engineer who builds bridges for a living and plays the dhol at every family wedding, invited or not.",
    bio2: "A textile designer who learned phulkari from her grandmother and still keeps her first unfinished bagh.",
    story: "Two families, one city of golden mornings, and a lifetime of stitches still to come. We would be honoured to have you with us.",
    photo: "assets/img/couple.webp",
    photoAlt: "Painted portrait of Arjan and Simran in a mustard field at golden hour"
  },

  // Opening scene (the phulkari veil)
  opening: {
    eyebrow: "Anand Karaj",
    veilLine: "With the blessings of Waheguru",
    dateLine: "Sunday, 7 November 2027",
    city: "Amritsar, Punjab",
    hint: "Scroll to lift the phulkari"
  },

  blessing: {
    symbolHtml: '<span class="ik" lang="pa">ੴ</span>',
    line: "ੴ ਸਤਿ ਨਾਮੁ", lang: "pa",
    meaning: "Ik Onkar, Sat Naam: there is one Creator, whose name is Truth."
  },

  invitation: {
    families: "The Sandhu and Gill families",
    text: "request the pleasure of your company at the Anand Karaj of their children",
    joiner: "&",
    closing: "Your presence and blessings will make the day complete."
  },

  coupleTitle: { kicker: "The couple", title: "Two families, one thread" },
  eventsTitle: { kicker: "Celebrations", title: "Join us for every moment" },

  events: [
    {
      name: "Jaggo", local: "ਜਾਗੋ", localLang: "pa",
      dateLabel: "Friday, 5 November 2027", time: "8:00 PM onwards",
      venue: "Sandhu Farmhouse", area: "Majitha Road, Amritsar",
      map: "https://www.google.com/maps/search/?api=1&query=Majitha+Road+Amritsar",
      dress: "Bright and festive", note: "Bring your dancing shoes: the gaagar of lamps leads the way.",
      image: "assets/art/ev-jaggo.webp", imageAlt: "Painting of a brass pot crowned with lit clay lamps on a phulkari cloth",
      palette: { bg: "#231A44", deep: "#140F2B", ink: "#F7EEDD", accent: "#F2B54A" }
    },
    {
      name: "Maiyan", local: "ਮਾਈਆਂ", localLang: "pa",
      dateLabel: "Saturday, 6 November 2027", time: "11:00 AM",
      venue: "Gill Family Home", area: "Ranjit Avenue, Amritsar",
      map: "https://www.google.com/maps/search/?api=1&query=Ranjit+Avenue+Amritsar",
      dress: "Yellow, or anything you don't mind getting turmeric on",
      image: "assets/art/ev-maiyan.webp", imageAlt: "Painting of brass bowls of turmeric paste and marigolds on a wooden chowki",
      palette: { bg: "#F4C430", deep: "#FFF4D6", ink: "#3A2405", accent: "#6E220E" }
    },
    {
      name: "Anand Karaj", local: "ਅਨੰਦ ਕਾਰਜ", localLang: "pa",
      dateLabel: "Sunday, 7 November 2027", time: "9:30 AM · Milni at 8:30 AM",
      venue: "Gurdwara Sahib, Green Avenue", area: "Amritsar (sample venue)",
      map: "https://www.google.com/maps/search/?api=1&query=Green+Avenue+Amritsar",
      dress: "Traditional Indian; please cover your head inside the gurdwara",
      note: "The four Laavan, followed by langar for all guests.",
      image: "assets/art/ev-anand.webp", imageAlt: "Painting of a white marble gurdwara entrance garlanded with marigolds at morning",
      palette: { bg: "#FFF4E4", deep: "#7A1E33", ink: "#3A1420", accent: "#C2571A" }
    },
    {
      name: "Reception", local: "ਰਿਸੈਪਸ਼ਨ", localLang: "pa",
      dateLabel: "Sunday, 7 November 2027", time: "7:30 PM onwards",
      venue: "The Orchard Lawns", area: "GT Road, Amritsar",
      map: "https://www.google.com/maps/search/?api=1&query=GT+Road+Amritsar",
      dress: "Evening formal",
      image: "assets/art/ev-reception.webp", imageAlt: "Painting of a reception lawn under string lights with a phulkari-draped stage",
      palette: { bg: "#5A1636", deep: "#3A0C22", ink: "#FBEFF2", accent: "#F2A7B8" }
    }
  ],

  gallery: {
    kicker: "Moments", title: "A few of our favourites",
    items: [
      { src: "assets/img/g1.webp", alt: "Arjan and Simran walking hand in hand down an old Amritsar lane", caption: "The old city, where it began" },
      { src: "assets/img/g2.webp", alt: "Arjan and Simran laughing on a charpai under a peepal tree", caption: "Sundays at Nani's" },
      { src: "assets/img/g4.webp", alt: "Arjan and Simran in a mustard field", caption: "Sarson season" },
      { src: "assets/img/g3.webp", alt: "Silhouette of the couple watching a sunset over fields", caption: "Every evening since" }
    ]
  },

  rsvp: {
    kicker: "RSVP", title: "Will you join us?",
    text: "Tap below to send us a quick note on WhatsApp. Let us know how many of you are coming.",
    button: "RSVP on WhatsApp",
    whatsapp: "919800000000",
    message: "Sat Sri Akal! We'd love to attend Arjan & Simran's wedding. Number of guests: ",
    deadline: "Kindly reply by 15 October 2027."
  },

  info: {
    kicker: "Good to know", title: "Before you travel",
    items: [
      { icon: "weather", title: "Weather", text: "Early November in Amritsar is pleasant: around 27°C by day and 12°C at night. Bring a light shawl." },
      { icon: "dress", title: "At the gurdwara", text: "Please cover your head and remove shoes. Scarves will be available at the entrance." },
      { icon: "stay", title: "Stay", text: "Rooms are held for family at a hotel near the venue. Message us and we'll share the details." },
      { icon: "parking", title: "Parking", text: "Valet parking at the reception; parking for the Anand Karaj is a short walk from the gurdwara." }
    ]
  },
  instagram: { hashtag: "#ArjanStitchedToSimran", url: "https://www.instagram.com/explore/tags/arjanstitchedtosimran/", button: "Share your photos" },

  countdown: {
    to: "2027-11-07T09:30:00+05:30",
    kicker: "Sunday, 7 November 2027", title: "Counting the mornings",
    after: "Just married!", bg: "assets/art/dawn-cd.webp"
  },

  particles: {
    opening: { shape: "petal", colors: ["#F5A3B5", "#F7C1CC", "#F2B54A", "#E8556D"], size: [5, 10], speed: [0.5, 1.2], density: 0.7 },
    countdown: { shape: "spark", colors: ["#FFD27A", "#FFF1C9"], size: [2, 4], speed: [0.15, 0.4], rise: true, density: 0.8 }
  },

  music: { src: "assets/audio/theme.mp3" },
  ornament: '<svg viewBox="0 0 40 40"><g fill="none" stroke="currentColor" stroke-width="1.4"><path d="M20 4l16 16-16 16L4 20z"/><path d="M20 11l9 9-9 9-9-9z"/></g><path d="M20 16l4 4-4 4-4-4z" fill="#E9B13A"/></svg>',
  footer: { withLove: "With love, the Sandhu and Gill families" },
  credits: ["Phulkari template · paintings, motion and music are original artwork."]
};
