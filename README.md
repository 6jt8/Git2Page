<div align="center">

<img src="assets/banner.png" alt="Git2Page Banner" width="100%"/>

<br/>

---

**Your portfolio, automatically.**

Git2Page is a powerful portfolio builder that creates a stunning, personalized portfolio site in minutes — no coding experience required. Simply provide your GitHub username, and Git2Page will automatically generate your portfolio. Deploy to GitHub Pages with just a few clicks.

<br/>

<p>
  <a href="https://github.com/6jt8/Git2Page/issues"><img src="https://img.shields.io/github/issues/6jt8/Git2Page" alt="Issues"/></a>
  <a href="https://github.com/6jt8/Git2Page/stargazers"><img src="https://img.shields.io/github/stars/6jt8/Git2Page" alt="Stars"/></a>
  <a href="https://github.com/6jt8/Git2Page/network/members"><img src="https://img.shields.io/github/forks/6jt8/Git2Page" alt="Forks"/></a>
  <a href="https://github.com/6jt8/Git2Page/commits/master"><img src="https://img.shields.io/github/last-commit/6jt8/Git2Page/master" alt="Last Commit"/></a>
   <a href="https://github.com/6jt8/Git2Page/blob/master/CONTRIBUTING.md"><img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat" alt="Contributions Welcome"/></a>
   <a href="https://github.com/6jt8/Git2Page/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License"/></a>
</p>

<p>
  <a href="https://6jt8.github.io/Git2Page"><strong>View Demo</strong></a>
  &nbsp;·&nbsp;
  <a href="https://github.com/6jt8/Git2Page/issues"><strong>Report Bug</strong></a>
  &nbsp;·&nbsp;
  <a href="https://github.com/6jt8/Git2Page/discussions"><strong>Request Feature</strong></a>
</p>

---

</div>

<div align="center">

### ✨ Features

</div>

<table align="center">
  <tr>
    <td align="center">✅ Easy to Setup</td>
      <td align="center">🎨 42 Themes</td>
    <td align="center">📊 Google Analytics</td>
    <td align="center">🔥 Hotjar</td>
  </tr>
  <tr>
    <td align="center">🔍 SEO</td>
    <td align="center">📱 PWA</td>
    <td align="center">👤 Avatar & Bio</td>
    <td align="center">🔗 Social Links</td>
  </tr>
  <tr>
    <td align="center">💡 Skills</td>
    <td align="center">💼 Experience</td>
    <td align="center">🎓 Certifications</td>
    <td align="center">📚 Education</td>
  </tr>
  <tr>
    <td align="center">🚀 Projects</td>
    <td align="center">📄 Publications</td>
    <td align="center">📝 Blog Posts</td>
    <td align="center">⬇️ Resume Download</td>
  </tr>
</table>

<div align="center">

## 🛠 Installation & Setup

</div>

<div align="center">

There are two ways to use **Git2Page**:

</div>

<table align="center">
<tr>
<td width="50%" valign="top" align="center">

### 🍴 Forking this repo _(recommended)_

<details>
<summary><strong>Show / Hide steps</strong></summary>

<div align="left">

> **Note:** After forking, replace `git2page.config.ts` with your own config from `git2page.config.template.ts`. See `git2page.config.example.ts` for reference.

1. **Fork the repo** — Click [here](https://github.com/6jt8/Git2Page/fork) to fork the repo so you have your own project to customize.

2. **Rename the repo**
   - To host at `https://<USERNAME>.github.io`, rename to `username.github.io`
   - To host at `https://<USERNAME>.github.io/<REPO_NAME>`, rename to `<REPO_NAME>`

3. **Enable workflows** — Go to your repo's **Actions** tab and enable workflows.

4. **Set the `base` value** — Open `git2page.config.ts` and change `base`:
   - Deploying to `https://<USERNAME>.github.io` → set `base` to `'/'`
   - Deploying to `https://<USERNAME>.github.io/<REPO_NAME>` → set `base` to `'/<REPO_NAME>/'`

   ```ts
   // git2page.config.ts
   {
     base: '/',
     // ...
   }
   ```

5. **Commit the changes** — Commit to your **master** branch. Wait a few minutes for the CI/CD pipeline to publish your website to GitHub Pages. Check the [Actions](https://github.com/6jt8/Git2Page/actions) tab for progress.

Your portfolio will be live shortly. Any time you commit to **master**, the website updates automatically.

> [!NOTE]
> If **Source** is not set to **GitHub Actions**, go to **Settings** → **Pages** → **Build and deployment** and set it.
>
> For a **custom domain**, add it in **Settings** → **Pages** → **Custom domain**. No CNAME file required.

> [!NOTE]
> If deploying with **Vercel**, set `base` to `/`.

As this is a Vite project, you can also host on Netlify, Vercel, Heroku, or other popular services. See the [Vite deployment guide](https://vitejs.dev/guide/static-deploy.html) for details.

**[Not working? Ask in Discussions](https://github.com/6jt8/Git2Page/discussions)**

</div>

</details>

</td>
<td width="50%" valign="top" align="center">

### 💻 Setting up locally

<details>
<summary><strong>Show / Hide steps</strong></summary>

<div align="left">

> **Note:** For local development, replace `git2page.config.ts` with your own config from `git2page.config.template.ts`. See `git2page.config.example.ts` for reference.

1. **Clone and enter the project**

   ```shell
   git clone https://github.com/6jt8/Git2Page.git
   cd Git2Page
   ```

2. **Install dependencies**

   ```shell
   npm install
   ```

3. **Run dev server**

   ```shell
   npm run dev
   ```

4. **Visit** `http://localhost:5173/Git2Page/` in your browser.

</div>

</details>

</td>
</tr>
</table>

<div align="center">

## ❤️ Support

</div>

<div align="center">

Show your support by starring this project! ★

<br/>

<a href="https://www.star-history.com/?repos=6jt8%2FGit2Page&type=timeline&logscale=&legend=bottom-right">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=6jt8/Git2Page&type=timeline&theme=dark&logscale&legend=bottom-right" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=6jt8/Git2Page&type=timeline&logscale&legend=bottom-right" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=6jt8/Git2Page&type=timeline&logscale&legend=bottom-right" />
 </picture>
</a>

</div>

<div align="center">

## 🤝 Contributing

</div>

<div align="center">

Contributions are welcome! Whether it's a bug fix, new feature, or improved documentation — we'd love your help.

<br/>

See the **[Contributing Guide](https://github.com/6jt8/Git2Page/blob/master/CONTRIBUTING.md)** for details.

<br/>

### Contributors

Thanks goes to these wonderful people for their contributions:

<a href="https://github.com/6jt8/Git2Page/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=6jt8/Git2Page" alt="Contributors"/>
</a>

[Become a contributor](https://github.com/6jt8/Git2Page/blob/master/CONTRIBUTING.md)

</div>

<div align="center">

## 📄 License

This project is licensed under the **MIT License**.

See [LICENSE](https://github.com/6jt8/Git2Page/blob/master/LICENSE) for details.

<br/><br/>

<sub>Copyright &copy; 2026 [6jt8](https://github.com/6jt8). All rights reserved.</sub>

<br/>

<sub>Built with ❤️ and [Git2Page](https://github.com/6jt8/Git2Page)</sub>

</div>
