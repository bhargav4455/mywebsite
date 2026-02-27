# Deploying bhargavakatta.com to Cloudflare Pages

## Prerequisites

1. A **Cloudflare account** — sign up free at [dash.cloudflare.com](https://dash.cloudflare.com)
2. Your domain `bhargavakatta.com` added to Cloudflare (nameservers pointed to Cloudflare)
3. A **GitHub** (or GitLab) repository containing this project

---

## Option A: Deploy via Git Integration (Recommended)

### Step 1 — Push Code to GitHub

```bash
cd bhargavakatta.com
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/bhargavakatta.com.git
git push -u origin main
```

### Step 2 — Connect to Cloudflare Pages

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. Select your GitHub account and the `bhargavakatta.com` repository
4. Configure the build:
   - **Project name:** `bhargavakatta`
   - **Production branch:** `main`
   - **Build command:** *(leave empty — no build step needed)*
   - **Build output directory:** `/` *(root, since we serve static files directly)*
5. Click **Save and Deploy**

### Step 3 — Set Up Custom Domain

1. After deployment, go to your Pages project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter `bhargavakatta.com`
4. Cloudflare will automatically configure DNS (CNAME record)
5. Also add `www.bhargavakatta.com` and configure a redirect rule:
   - Go to **Rules** → **Redirect Rules** → **Create Rule**
   - Match: `www.bhargavakatta.com/*`
   - Redirect to: `https://bhargavakatta.com/${1}` (301 permanent)

---

## Option B: Direct Upload (No Git Required)

### Step 1 — Upload via Dashboard

1. Go to **Workers & Pages** → **Create application** → **Pages** → **Upload assets**
2. Name your project: `bhargavakatta`
3. Drag and drop the project folder contents (index.html, styles.css, script.js, assets/)
4. Click **Deploy site**

### Step 2 — Set Up Custom Domain

Follow the same custom domain steps as Option A above.

---

## Option C: Deploy via Wrangler CLI

### Step 1 — Install Wrangler

```bash
npm install -g wrangler
wrangler login
```

### Step 2 — Deploy

```bash
cd bhargavakatta.com
wrangler pages deploy . --project-name=bhargavakatta
```

### Step 3 — Set Up Custom Domain

Follow the same custom domain steps as Option A above.

---

## Post-Deployment Checklist

- [ ] Verify the site loads at `https://bhargavakatta.com`
- [ ] Confirm HTTPS is active (Cloudflare provides free SSL)
- [ ] Test on mobile devices
- [ ] Add your resume PDF to `assets/docs/Bhargava_Katta_Resume.pdf`
- [ ] Update the email address in `index.html` (replace `hello@bhargavakatta.com`)
- [ ] Update the LinkedIn URL in `index.html` (replace `linkedin.com/in/bhargavakatta`)
- [ ] Add an Open Graph image at `assets/images/og-image.png` (1200×630px recommended)
- [ ] Add a favicon at `assets/icons/favicon.svg`
- [ ] Test the contact form behavior

---

## File Structure

```
bhargavakatta.com/
├── index.html              # Main HTML page
├── styles.css              # All styles
├── script.js               # All JavaScript
├── DEPLOY.md               # This file
└── assets/
    ├── images/             # Profile photo, OG image, etc.
    ├── docs/               # Resume PDF
    └── icons/              # Favicon and icon assets
```

---

## Performance Notes

- No build tooling required — pure static files
- Cloudflare Pages automatically applies:
  - Global CDN distribution
  - Brotli/Gzip compression
  - HTTP/2 and HTTP/3
  - Edge caching
- Google Fonts are loaded with `preconnect` for faster font delivery
- CSS and JS are minimal — single file each, no external dependencies

---

## Future Enhancements

- Connect the contact form to a backend (Cloudflare Workers, Formspree, or Netlify Forms)
- Add Google Analytics or Cloudflare Web Analytics
- Add a blog section with Markdown support
- Integrate a CMS (e.g., Cloudflare Pages + headless CMS)
