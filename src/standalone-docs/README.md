# PYMSTR Standalone Documentation

These are **standalone HTML documentation pages** that can be hosted **separately from your React app** - on a marketing website, documentation site, GitHub Pages, or any static hosting service.

## 📁 Files Included

- **`index.html`** - Landing page with overview and links to all docs
- **`quickstart.html`** - Quick Start Guide (5-10 minute integration tutorial)
- **`api-reference.html`** - Complete API Reference with all endpoints
- **`code-examples.html`** - Code examples in JavaScript, Python, PHP, and cURL

## 🚀 How to Use

### Option 1: Upload to Your Static Site

1. Copy all HTML files from the `/standalone-docs/` folder
2. Upload them to your website's documentation folder
3. Link to them from your marketing site:

```html
<a href="https://yoursite.com/docs/quickstart.html">Quick Start Guide</a>
<a href="https://yoursite.com/docs/api-reference.html">API Reference</a>
<a href="https://yoursite.com/docs/code-examples.html">Code Examples</a>
```

### Option 2: Host on GitHub Pages

1. Create a new repository or use an existing one
2. Upload the files to a `docs/` folder
3. Enable GitHub Pages in repository settings
4. Access at: `https://yourusername.github.io/repo-name/docs/`

### Option 3: Use a CDN/Static Hosting

Upload to services like:
- **Netlify** - Drag and drop the folder
- **Vercel** - Deploy as a static site
- **AWS S3** - Upload and enable static website hosting
- **Cloudflare Pages** - Connect your repo and deploy

### Option 4: Local Testing

1. Open any `.html` file directly in your browser
2. Or run a simple local server:

```bash
# Python 3
python3 -m http.server 8000

# Node.js (using npx)
npx serve

# Then open: http://localhost:8000
```

## 🔗 Navigation

All pages have:
- **Sidebar navigation** to other doc pages
- **Internal links** for jumping to sections
- **"Back" button** that uses browser history
- **Fully responsive** mobile design

## 🎨 Design

These pages follow PYMSTR's design system:
- **Brand color:** `#000000` (black)
- **Rounded buttons:** Full pill-shaped design (`border-radius: 9999px`)
- **Clean, modern aesthetic** matching the main app
- **Mobile-responsive** with proper breakpoints

## ✏️ Customization

To customize these pages:

1. **Update Links:**
   - Replace `https://app.pymstr.com` with your actual app URL
   - Update the "Back" button behavior if needed

2. **Change Branding:**
   - Update the `.logo` text in each file
   - Modify colors in the `<style>` section

3. **Add Content:**
   - Each page has clear HTML structure
   - Add new sections by copying existing patterns
   - All styles are inline (no external CSS files needed)

## 📝 Updating Content

All content is self-contained in each HTML file. No build process required!

To update:
1. Open the `.html` file in a text editor
2. Find the section you want to edit
3. Make your changes
4. Save and re-upload to your hosting

## 🌐 SEO-Friendly

These pages are SEO-optimized with:
- Proper HTML5 semantic structure
- Meta tags for viewport and charset
- Descriptive page titles
- Clean, crawlable HTML

## 💡 Integration Examples

### Marketing Website Link
```html
<!-- From your marketing site -->
<nav>
  <a href="/docs/index.html">Documentation</a>
  <a href="/docs/quickstart.html">Quick Start</a>
  <a href="/docs/api-reference.html">API</a>
</nav>
```

### Email Link
```
Hi Developer,

Get started with PYMSTR:
https://docs.yoursite.com/quickstart.html

Check out our API docs:
https://docs.yoursite.com/api-reference.html

Best,
PYMSTR Team
```

### Blog Post Link
```markdown
Learn how to integrate PYMSTR in our [Quick Start Guide](https://docs.yoursite.com/quickstart.html).
```

## 🔒 Security Note

These are static HTML pages with **no backend dependencies**. They don't:
- Execute any server-side code
- Store user data
- Make API calls (except in code examples)
- Require authentication

They're safe to host anywhere!

## ✅ What's Different from the React App

| Feature | React App | Standalone Docs |
|---------|-----------|----------------|
| **Purpose** | Merchant dashboard & checkout | Public documentation |
| **Technology** | React, Tailwind CSS | Pure HTML/CSS |
| **Hosting** | Requires Node.js app | Any static hosting |
| **Navigation** | Internal React routing | Standard HTML links |
| **Updates** | Requires rebuild | Direct file editing |

## 🎯 Use Cases

**Perfect for:**
- Marketing website documentation sections
- GitHub repository docs
- Developer portal
- External linking from blog posts/emails
- SEO-optimized public documentation

**Not suitable for:**
- Interactive features (use the React app for that)
- User dashboards (use the React app)
- Payment processing (use the React app)

## 📞 Support

These pages link to your main PYMSTR app at `https://app.pymstr.com`. Make sure to:
1. Update all instances of this URL to match your actual domain
2. Test all links after deployment
3. Verify the "Go to Dashboard" buttons work correctly

---

**That's it!** These pages are ready to deploy anywhere. Just upload and share the links! 🚀
