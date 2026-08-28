# 🎁 A Surprise for Cutie — Devashree's Birthday Site

A fun, interactive, one-page birthday website built for **Devashree Marathe ("Cutie")** — 14th September 🎉

It's not just a "Happy Birthday" splash screen — it's a little journey:
Open a gift → reveal the date → flip through 5 reasons she's awesome → pop balloons to
unlock a secret message → blow out candles on a cake → get the full birthday message,
signed off by Jayu.

Built with plain **HTML, CSS and JavaScript** — no build tools, no dependencies — so it
runs perfectly on **GitHub Pages** for free.

---

## 🚀 How to put this on GitHub Pages (step by step)

1. Create a new repository on GitHub (e.g. `devashree-birthday`).
2. Upload these 3 files to the repo (drag-and-drop works fine on github.com):
   - `index.html`
   - `style.css`
   - `script.js`
   - (optionally the `images/` folder — see below)
3. Go to your repo → **Settings** → **Pages** (left sidebar).
4. Under "Build and deployment", set **Source** to `Deploy from a branch`.
5. Choose branch `main` and folder `/ (root)`, then click **Save**.
6. Wait ~1 minute, then GitHub will give you a live link like:
   `https://<your-username>.github.io/devashree-birthday/`
7. Send that link to Devashree 💌

---

## 🖼️ Adding a real photo of her (optional, recommended!)

Right now the site uses emojis and hand-drawn icons so it works instantly with zero setup.
If you want to make it even more personal:

1. Put a photo (e.g. `cutie.jpg`) inside the `images/` folder.
2. In `index.html`, find the `#about` or `#hero` section and add:
   ```html
   <img src="images/cutie.jpg" alt="Devashree" class="hero-photo" />
   ```
3. In `style.css`, you can style it like:
   ```css
   .hero-photo {
     width: 160px;
     height: 160px;
     object-fit: cover;
     border-radius: 50%;
     border: 4px solid var(--blush);
     box-shadow: var(--shadow-soft);
     margin-bottom: 20px;
   }
   ```

## ✏️ Customizing the message

- The final birthday message is in `index.html` inside the `#message` section — edit the
  text inside the `<p class="message-text">` tags to make it even more personal.
- The 5 "reasons" flip cards are in the `#about` section — swap in real inside jokes or
  memories if you'd like.
- The secret balloon message is defined at the top of `script.js` in the `balloonWords`
  array — change the words/order freely.

## 🎨 Design notes

- Colors: warm cream background with coral pink, sunshine yellow, soft lavender and mint accents.
- Fonts: "Baloo 2" (playful, rounded) for headings, "Quicksand" for body text.
- Fully responsive — tested for both mobile and desktop layouts.
- Respects `prefers-reduced-motion` for users sensitive to animation.

---

Made with 💜 by **Jayu (Jayostu Patil)**
