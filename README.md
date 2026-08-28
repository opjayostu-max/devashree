# a birthday page for Devashree (Cutie) 🎁

A little scrapbook-style, hand-drawn feeling birthday page — not a "happy birthday" splash
screen, but a small journey: open a gift → see the date → flip through a few notes →
pop balloons to unlock a hidden message → blow out candles → read the full message,
signed off by Jayu.

Plain **HTML, CSS, JS** — no frameworks, no build step — works straight on **GitHub Pages**.

---

## putting it on GitHub Pages

1. Make a new repo on GitHub (e.g. `devashree-birthday`).
2. Upload `index.html`, `style.css`, `script.js` (and `images/` if you use it).
3. Repo → **Settings** → **Pages**.
4. Source: `Deploy from a branch` → branch `main`, folder `/ (root)` → **Save**.
5. Wait a minute, then your link will look like:
   `https://<your-username>.github.io/devashree-birthday/`
6. Send it to her.

---

## adding a real photo (optional)

1. Drop a photo into `images/`, e.g. `images/cutie.jpg`.
2. In `index.html`, wherever you want it (hero or about section), add:
   ```html
   <img src="images/cutie.jpg" alt="Devashree" class="polaroid" />
   ```
3. In `style.css`, add:
   ```css
   .polaroid {
     width: 160px;
     border: 6px solid var(--paper-card);
     border-bottom-width: 26px;
     box-shadow: var(--hard-shadow);
     transform: rotate(-3deg);
     margin-bottom: 18px;
   }
   ```

## editing the message

- Final message: `index.html`, inside the `#message` section.
- The 5 little notes: `#about` section — swap in real inside jokes if you want.
- Hidden balloon message: top of `script.js`, the `balloonWords` array.

---

made by **Jayu (Jayostu Patil)**
