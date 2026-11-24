# Knotlink — 1:1 Complete Painted Wedding Invitation Websites Platform Clone

Ekdam 1:1 identical, fully working clone of **[Knotlink.in](https://www.knotlink.in/)**.

---

## 🌟 What is Included in this Clone

1. **Main Storefront & Marketing Platform (`index.html`)**:
   - Hero section with Toran decor, typography, and palace door video loop (`rangmahal-loop.mp4`).
   - Dynamic Filter Chips (All, Royal / Palace, Floral, Minimal, South Indian, Christian).
   - All 6 Wedding Invitation Collection Cards with dynamic pricing, tags, and detail view buttons.
   - Interactive Feature Highlights (Palace doors, WhatsApp RSVP, Google Maps, Countdown, Music, Elder-friendly UI).
   - 3-Step Process section, Pricing breakdown, Family reviews, FAQ accordion, and footer.

2. **All 6 Wedding Template Pages (`/templates/`)**:
   - [Rangmahal Template](http://localhost:3000/templates/rangmahal/) — Royal Rajasthani Palace Theme (₹1,499)
   - [Phulkari Template](http://localhost:3000/templates/phulkari/) — Vibrant Punjabi Heritage Theme (₹1,499)
   - [Kolam Template](http://localhost:3000/templates/kolam/) — South Indian Classical Tradition Theme (₹1,499)
   - [Noor Template](http://localhost:3000/templates/noor/) — Mughal & Nikah Grace Theme (₹1,499)
   - [Capela Template](http://localhost:3000/templates/capela/) — Goan & Christian Chapel Theme (₹1,499)
   - [Pichola Template](http://localhost:3000/templates/pichola/) — Lake Palace Luxury Theme (₹1,499)

3. **All 6 Full Interactive Wedding Invitation Demo Web Apps (`/demos/`)**:
   - [Rangmahal Live Demo](http://localhost:3000/demos/rangmahal/) — Complete with animated opening palace doors, custom music playback, event schedule, maps, gallery, countdown timer, and WhatsApp RSVP.
   - [Phulkari Live Demo](http://localhost:3000/demos/phulkari/)
   - [Kolam Live Demo](http://localhost:3000/demos/kolam/)
   - [Noor Live Demo](http://localhost:3000/demos/noor/)
   - [Capela Live Demo](http://localhost:3000/demos/capela/)
   - [Pichola Live Demo](http://localhost:3000/demos/pichola/)

4. **All Policy & Auxiliary Pages**:
   - [Contact Us](http://localhost:3000/contact/)
   - [Terms of Service](http://localhost:3000/terms/)
   - [Privacy Policy](http://localhost:3000/privacy/)
   - [Refund Policy](http://localhost:3000/refund/)
   - [Thank You / Order Confirmation](http://localhost:3000/thank-you/)
   - [Blog (All 29 Articles)](http://localhost:3000/blog/)

5. **Backend APIs & Order System (`server.js`)**:
   - `POST /api/create-order` — Order creation with base amount and Done-for-you setup addon (+₹999).
   - `POST /api/verify-payment` — Payment verification and receipt generation.
   - `GET /api/health` — Server health check.
   - WhatsApp fallback order generator (`https://wa.me/...`).

---

## 🚀 How to Run Locally

### 1. Start Server
Run either of these commands in this directory:
```bash
npm start
```
or
```bash
node server.js
```

The server runs on **`http://localhost:3000`** by default.

---

## ⚙️ Customization & Configuration

- **Store Settings (`assets/js/cfg.js`)**:
  ```javascript
  window.STORE = {
    "checkoutEnabled": true,
    "brand": "Knotlink",
    "whatsapp": "916362240361", // Change to your WhatsApp Number
    "addonName": "Done-for-you setup"
  };
  ```

- **Invitation Details (`demos/<template_name>/config.js`)**:
  You can edit couple names, wedding dates, event timings, venues, photo galleries, and audio tracks in each template's `config.js` file.
