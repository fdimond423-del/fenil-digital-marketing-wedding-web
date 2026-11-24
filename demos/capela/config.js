/* ============================================================
   CAPELA INVITE — ALL EDITABLE CONTENT LIVES HERE
   Names, dates, events, photos, links and colours.
   Dates use ISO format with the India offset (+05:30).
   ============================================================ */
window.INVITE = {
  meta: { sampleLabel: "Sample invite — names, dates and venues are illustrative." },

  colors: {
    bg: "#FBF9F3", bg2: "#F2EEE4", ink: "#1E2E31", muted: "#56625F", head: "#1E474D",
    accent: "#245F66", gold: "#C2A262", card: "#FFFFFB", line: "rgba(36,95,102,.16)"
  },

  couple: {
    first1: "Ryan", first2: "Anya",
    full1: "Ryan Pereira", full2: "Anya Fernandes",
    parents1: "Son of Mr. Anthony Pereira & Mrs. Maria Pereira, Saligao",
    parents2: "Daughter of Mr. Joseph Fernandes & Mrs. Clara Fernandes, Margao",
    bio1: "A marine engineer who sings bass in the parish choir and makes the best prawn balchão in North Goa, by his own account.",
    bio2: "A paediatrician who restores old azulejo tiles on weekends and has never missed a feast-day mass in Margao.",
    story: "A choir practice, a shared hymn book, and many years of sunsets later, we are saying I do. We would love you to be there.",
    photo: "assets/img/couple.webp",
    photoAlt: "Painted portrait of Ryan in a navy suit and Anya in a lace gown on the steps of a white chapel"
  },

  // Opening scene (the chapel doors)
  opening: {
    eyebrow: "Holy Matrimony",
    plaque: "27 · XI · 2027",
    dateLine: "Saturday, 27 November 2027",
    city: "Parra, Goa",
    hint: "Scroll to open the doors"
  },

  blessing: {
    symbolHtml: '<svg viewBox="0 0 48 64" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M24 4v40M14 16h20"/><path d="M8 40c4 8 10 14 16 18c6-4 12-10 16-18" opacity=".7"/><path d="M10 46c-3-1-5-3-6-6M38 46c3-1 5-3 6-6" opacity=".5"/></svg>',
    line: "“A cord of three strands is not quickly broken.”", lang: "en",
    meaning: "Ecclesiastes 4:12"
  },

  invitation: {
    families: "The Pereira and Fernandes families",
    text: "request the pleasure of your company at the marriage of their children",
    joiner: "&",
    closing: "Your prayers, presence and good cheer are the only gifts we ask for."
  },

  coupleTitle: { kicker: "The couple", title: "Two voices, one hymn" },
  eventsTitle: { kicker: "Celebrations", title: "Join us in Goa" },

  events: [
    {
      name: "Roce",
      dateLabel: "Thursday, 25 November 2027", time: "4:30 PM onwards",
      venue: "Fernandes Family Home", area: "Margao, Goa",
      map: "https://www.google.com/maps/search/?api=1&query=Margao+Goa",
      dress: "Old clothes you don't mind getting coconut milk on",
      note: "The traditional Goan blessing with coconut milk, songs and plenty of laughter, followed by dinner.",
      image: "assets/art/ev-roce.webp", imageAlt: "Painting of a brass bowl of coconut milk on a stool beside halved coconuts and flowers",
      palette: { bg: "#F7E7C8", deep: "#FFF8EA", ink: "#3A2A12", accent: "#8A4A1C" }
    },
    {
      name: "Nuptial Mass",
      dateLabel: "Saturday, 27 November 2027", time: "Please be seated by 3:45 PM",
      highlight: { label: "Nuptial Mass:", value: "4:00 PM" },
      venue: "St. Anne's Chapel", area: "Parra, Goa (sample venue)",
      map: "https://www.google.com/maps/search/?api=1&query=Parra+Goa",
      dress: "Formal; please keep shoulders covered in the chapel",
      note: "Followed by a toast and photographs on the chapel steps.",
      image: "assets/art/ev-mass.webp", imageAlt: "Painting of a white Goan chapel with lilies on its steps between coconut palms",
      palette: { bg: "#FFFFFB", deep: "#1E474D", ink: "#1E2E31", accent: "#A47F36" }
    },
    {
      name: "Reception",
      dateLabel: "Saturday, 27 November 2027", time: "7:30 PM until late",
      venue: "Palm Grove Lawns", area: "Candolim, Goa (sample venue)",
      map: "https://www.google.com/maps/search/?api=1&query=Candolim+Goa",
      dress: "Cocktail; bring your dancing shoes",
      note: "Dinner by the sea, the first dance, the cake, and a live band until late.",
      image: "assets/art/ev-reception.webp", imageAlt: "Painting of a lawn by the sea at night with string lights, palms, a dance floor and a wedding cake",
      palette: { bg: "#173A40", deep: "#0E272B", ink: "#EEF3EF", accent: "#E6CF8E" }
    }
  ],

  gallery: {
    kicker: "Moments", title: "A few of our favourites",
    items: [
      { src: "assets/img/g1.webp", alt: "Ryan and Anya laughing on a blue scooter in a colourful Panjim lane", caption: "Sunday rides through Fontainhas" },
      { src: "assets/img/g2.webp", alt: "Ryan and Anya sitting together on a beach at sunset beside a fishing canoe", caption: "Our beach, every December" },
      { src: "assets/img/g4.webp", alt: "Ryan and Anya on the chapel steps", caption: "The chapel where it all began" },
      { src: "assets/img/g3.webp", alt: "Wedding bands, white lilies and a slice of bebinca", caption: "Rings, lilies and bebinca" }
    ]
  },

  rsvp: {
    kicker: "RSVP", title: "Will you join us?",
    text: "Tap below to send us a quick note on WhatsApp. Let us know how many of you are coming.",
    button: "RSVP on WhatsApp",
    whatsapp: "919800000000",
    message: "Hi Ryan & Anya! We'd love to attend your wedding. Number of guests: ",
    deadline: "Kindly reply by 25 October 2027."
  },

  info: {
    kicker: "Good to know", title: "Before you travel",
    items: [
      { icon: "weather", title: "Weather", text: "Late November in Goa is warm and sunny, around 33°C by day and 22°C at night, with a sea breeze in the evening." },
      { icon: "dress", title: "At the chapel", text: "Please keep shoulders covered during mass. A light shawl or jacket is perfect." },
      { icon: "stay", title: "Stay", text: "Rooms are held for out-of-town guests in Candolim. Message us and we'll share the details." },
      { icon: "parking", title: "Getting around", text: "A shuttle runs from the chapel to the reception. Parking near the chapel is limited." }
    ]
  },
  instagram: { hashtag: "#RyanAndAnyaSayIDo", url: "https://www.instagram.com/explore/tags/ryanandanyasayido/", button: "Share your photos" },

  countdown: {
    to: "2027-11-27T16:00:00+05:30",
    kicker: "Saturday, 27 November 2027", title: "Until we say I do",
    after: "Just married!", bg: "assets/art/chapel-cd.webp"
  },

  particles: {
    opening: { shape: "lily", colors: ["#FFFFFF", "#FFFCF2", "#F6F1E2"], size: [7, 12], speed: [0.35, 0.8], density: 0.45 },
    countdown: { shape: "spark", colors: ["#FFF1C9", "#F1DFA8"], size: [2, 4], speed: [0.15, 0.4], rise: true, density: 0.7 }
  },

  music: { src: "assets/audio/theme.mp3" },
  ornament: '<svg viewBox="0 0 40 40"><g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M20 8v24M13 15h14"/><path d="M6 24c4 0 6-3 6-6M34 24c-4 0-6-3-6-6" opacity=".6"/></g></svg>',
  footer: { withLove: "With love, the Pereira and Fernandes families" },
  credits: ["Capela template · paintings, motion and music are original artwork."]
};
