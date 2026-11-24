/* ============================================================
   PICHOLA SAVE-THE-DATE — ALL EDITABLE CONTENT LIVES HERE
   Names, dates, photos, links and colours.
   Dates use ISO format with the India offset (+05:30).
   ============================================================ */
window.INVITE = {
  meta: { sampleLabel: "Sample save-the-date — names, dates and places are illustrative." },

  colors: {
    bg: "#FDF5EC", bg2: "#F8E9DA", ink: "#2E1824", muted: "#6C5059", head: "#5B2340",
    accent: "#2F6B70", gold: "#E3A24A", card: "#FFFAF4", line: "rgba(91,35,64,.16)"
  },

  couple: {
    first1: "Kabir", first2: "Tara",
    full1: "Kabir Shekhawat", full2: "Tara Mehta",
    parents1: "Son of Mr. Vikram Singh Shekhawat & Mrs. Rekha Shekhawat, Jaipur",
    parents2: "Daughter of Mr. Sanjay Mehta & Mrs. Anjali Mehta, Mumbai",
    bio1: "A hotelier who grew up between Jaipur and Udaipur and still insists the best chai is the one served on a boat.",
    bio2: "A documentary filmmaker who came to Udaipur for a shoot, missed the last boat back, and met Kabir on the next one.",
    story: "The full invitation, with every event and venue, will follow. For now, please keep these days free for us.",
    photo: "assets/img/couple.webp",
    photoAlt: "Painted portrait of Kabir in an ivory bandhgala and Tara in a marigold leheriya saree on a lakeside terrace"
  },

  // Opening scene (the boat on the lake)
  opening: {
    title: "Save the Date",
    dateLine: "18 – 20 November 2027",
    city: "Udaipur, Rajasthan",
    hint: "Scroll to sail on"
  },

  blessing: {
    line: "Some journeys begin on the water.",
    meaning: "Formal invitation to follow."
  },

  invitation: {
    families: "The Shekhawat and Mehta families",
    text: "are delighted to share that their children are getting married",
    joiner: "&",
    closing: "We would love to celebrate with you by the lake."
  },

  coupleTitle: { kicker: "The couple", title: "The boat we nearly missed" },
  eventsTitle: { kicker: "Mark your calendar", title: "One weekend, by the lake" },

  events: [
    {
      name: "The Wedding Weekend",
      dateLabel: "Thursday 18 to Saturday 20 November 2027", time: "The wedding: Saturday, 20 November",
      highlight: { label: "Hold the dates:", value: "18 to 20 November 2027" },
      venue: "A lakeside palace on Lake Pichola", area: "Udaipur, Rajasthan (sample venue)",
      map: "https://www.google.com/maps/search/?api=1&query=Lake+Pichola+Udaipur",
      note: "Three days of celebrations by the lake. The formal invitation with every event, time and dress code will follow.",
      image: "assets/art/ev-lake.webp", imageAlt: "Painting of a lakeside palace courtyard with marigold garlands and floating diyas at dusk",
      palette: { bg: "#3B1A2C", deep: "#24101B", ink: "#FBEFE6", accent: "#F7B85A" }
    }
  ],

  gallery: {
    kicker: "Moments", title: "A little of us",
    items: [
      { src: "assets/img/g1.webp", alt: "Kabir and Tara walking hand in hand down a pastel lane in old Udaipur", caption: "The old city, the morning after" },
      { src: "assets/img/g3.webp", alt: "Kabir and Tara on a terrace above the lake", caption: "Where he asked" },
      { src: "assets/img/g2.webp", alt: "A sealed envelope, gold rings, marigolds and a lit diya on a windowsill above a lake", caption: "Invitation on its way" }
    ]
  },

  rsvp: {
    kicker: "Let us know", title: "Can you make it?",
    text: "Tap below to tell us on WhatsApp if you can keep the dates free. It helps us plan rooms and travel.",
    button: "Reply on WhatsApp",
    whatsapp: "919800000000",
    message: "Hi Kabir & Tara! We've saved the date. Number of guests: ",
    deadline: "A quick reply by 31 January 2027 would be lovely."
  },

  info: {
    kicker: "Good to know", title: "Planning ahead",
    items: [
      { icon: "weather", title: "Weather", text: "Mid-November in Udaipur is lovely: about 28°C by day and 12°C at night. Pack a shawl for the evenings on the lake." },
      { icon: "stay", title: "Stay", text: "We are holding rooms near the lake for guests. Tell us early and we'll share the details." },
      { icon: "parking", title: "Getting there", text: "Udaipur's airport is about 30 minutes from the old city. We'll arrange pick-ups for the weekend." }
    ]
  },
  instagram: { hashtag: "#KabirTaraByTheLake", url: "https://www.instagram.com/explore/tags/kabirtarabythelake/", button: "Follow the countdown" },

  countdown: {
    to: "2027-11-20T18:00:00+05:30",
    kicker: "Saturday, 20 November 2027", title: "See you on the lake",
    after: "Just married!", bg: "assets/art/lake-cd.webp", ics: "assets/save-the-date.ics"
  },

  particles: {
    opening: { shape: "petal", colors: ["#F7A531", "#F9C04A", "#E86A2C", "#F49AB0"], size: [5, 9], speed: [0.35, 0.8], density: 0.4 },
    countdown: { shape: "spark", colors: ["#FFD27A", "#FFF1C9"], size: [2, 4], speed: [0.15, 0.4], rise: true, density: 0.7 }
  },

  music: { src: "assets/audio/theme.mp3" },
  ornament: '<svg viewBox="0 0 40 40"><g fill="none" stroke="currentColor" stroke-width="1.3"><path d="M6 22q7-5 14 0t14 0"/><path d="M10 28q5-3 10 0t10 0" opacity=".6"/></g><circle cx="20" cy="13" r="4" fill="#E3A24A"/></svg>',
  footer: { withLove: "With love, the Shekhawat and Mehta families" },
  credits: ["Pichola template · paintings, motion and music are original artwork."]
};
