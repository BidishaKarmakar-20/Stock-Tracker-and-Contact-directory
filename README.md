# Connect & Stock

A static contact directory and stock management interface built with HTML, CSS, and JavaScript. Optimized for quick deployment via GitHub Pages, Netlify, or Vercel.

---

## 🚀 Features

- **Contact Directory**: Manage and search contact entries efficiently.
- **Stock Tracker**: Track inventory, product stock levels, and status updates.
- **Responsive Layout**: Designed with a clean sidebar-navigation aesthetic for desktop and mobile viewports.
- **Zero Dependencies**: Pure HTML, CSS, and plain Vanilla JavaScript — fast and lightweight with no build step required.

---

## 📁 Repository Structure

```
├── index.html          # Main HTML entry point
├── assets/
│   ├── style.css       # Core stylesheets
│   └── app.js          # App interactivity and logic
├── netlify.toml        # Netlify configuration (headers & build settings)
├── _redirects          # Netlify routing rules
└── README.md           # Project documentation
```

---

## 🌐 Deploy to GitHub Pages

### Option 1: Via GitHub Actions (Recommended)
1. Push this repository to GitHub.
2. Go to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. GitHub will automatically detect and deploy your static site.

### Option 2: Deploy from Branch
1. Push your code to the `main` (or `master`) branch.
2. Go to **Settings** > **Pages** in your repository.
3. Under **Source**, select **Deploy from a branch**.
4. Select `main` branch and `/ (root)` folder, then click **Save**.
5. Your site will be live at `https://<your-username>.github.io/<your-repo-name>/`.

---

## ⚡ Deploy to Netlify

1. Push your repo to GitHub.
2. Sign in to [Netlify](https://www.netlify.com/).
3. Click **Add new site** > **Import an existing project**.
4. Select **GitHub**, choose this repository, and set the publish directory to `.` (root).
5. Click **Deploy**.

---

## 💻 Local Setup & Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR-USERNAME/connect-stock.git
   cd connect-stock
   ```

2. **Run locally:**
   Open `index.html` directly in any web browser, or use VS Code's **Live Server** extension.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
