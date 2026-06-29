<br/>

<p align="center">
  <h4 align="center">Easy to use automatic portfolio builder for every GitHub user!</h4>

  <p align="center">
    <a href="https://github.com/6jt8/Git2Page/actions"><img src="https://github.com/6jt8/Git2Page/actions/workflows/deploy.yml/badge.svg" /></a>
    <a href="https://github.com/6jt8/Git2Page/issues"><img src="https://img.shields.io/github/issues/6jt8/Git2Page"/></a>
    <a href="https://github.com/6jt8/Git2Page/stargazers"><img src="https://img.shields.io/github/stars/6jt8/Git2Page"/></a>
    <a href="https://github.com/6jt8/Git2Page/network/members"><img src="https://img.shields.io/github/forks/6jt8/Git2Page"/></a>
    <a href="https://github.com/6jt8/Git2Page/commits/main"><img src="https://img.shields.io/github/last-commit/6jt8/Git2Page/main"/></a>
    <a href="https://github.com/6jt8/Git2Page/blob/main/CONTRIBUTING.md"><img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat"/></a>
    <a href="https://github.com/6jt8/Git2Page/blob/main/LICENSE"><img src="https://img.shields.io/github/license/6jt8/Git2Page"/></a>
  </p>

  <p align="center">
    <a href="https://6jt8.github.io/Git2Page">View Demo</a>
    ·
    <a href="https://github.com/6jt8/Git2Page/issues">Report Bug</a>
    ·
    <a href="https://github.com/6jt8/Git2Page/discussions">Request Feature</a>
  </p>
</p>

**Git2Page** is a powerful portfolio builder that allows you to create a stunning and personalized portfolio site in minutes, even if you have no coding experience. Simply provide your GitHub username, and Git2Page will automatically generate a portfolio. Best of all, you can easily deploy your portfolio to GitHub Pages with just a few clicks, making it accessible to the world in no time.

**Features:**

✓ [Easy to Setup](#-installation--setup)  
✓ [37 Themes](#themes)  
✓ [Google Analytics](#google-analytics)  
✓ [Hotjar](#hotjar)  
✓ [SEO](#seo)  
✓ [PWA](#pwa)  
✓ [Avatar and Bio](#avatar-and-bio)  
✓ [Social Links](#social-links)  
✓ [Skill Section](#skills)  
✓ [Experience Section](#experience)  
✓ [Certification Section](#certifications)  
✓ [Education Section](#education)  
✓ [Projects Section](#projects)  
✓ [Publication Section](#publications)  
✓ [Blog Posts Section](#blog-posts)

## 🛠 Installation & Setup

There are two ways to use **Git2Page**. Use any.

- [Forking this repo _(recommended)_](#forking-this-repo)
- [Setting up locally](#setting-up-locally)

### Forking this repo

These instructions will get you a copy of the project and deploy your portfolio online using GitHub Pages!

- **Fork repo:** Click [here](https://github.com/6jt8/Git2Page/fork) to fork the repo so you have your own project to customize. A "fork" is a copy of a repository.
- **Rename repo:**
  - If you want to host your portfolio at `https://<USERNAME>.github.io`, rename your forked repository to `username.github.io` in GitHub, where `username` is your GitHub username (or organization name).
  - If you want to host your portfolio at `https://<USERNAME>.github.io/<REPO_NAME>` (e.g. `https://<USERNAME>.github.io/portfolio`), rename your forked repository to `<REPO_NAME>` (e.g. `portfolio`) in GitHub.
- **Enable workflows:** Go to your repo's **Actions** tab and enable workflows.

  ![Workflows](https://github.com/6jt8/Git2Page/assets/placeholder/workflows.png)

- **Base Value:** Open `git2page.config.ts`, and change `base`'s value.
  - If you are deploying to `https://<USERNAME>.github.io`, set `base` to `'/'`.

  - If you are deploying to `https://<USERNAME>.github.io/<REPO_NAME>` (e.g. `https://<USERNAME>.github.io/portfolio`), then set `base` to `'/<REPO_NAME>/'` (e.g. `'/portfolio/'`).

  ```ts
  // git2page.config.ts
  {
    base: '/',
    // ...
  }
  ```

- **Commit the changes:** Now commit to your **main** branch with your changes. Wait a few minutes so that the CI/CD pipeline can publish your website to GitHub Pages. You can check the progress in the [Actions](https://github.com/6jt8/Git2Page/actions) tab.

Your portfolio website will be live shortly. Any time you commit a change to the **main** branch, the website will be automatically updated. If you face any issue viewing the website, double-check the `base` value in the `git2page.config.ts` file. Also, check if **Source** is set to **GitHub Actions** in **Settings** � **Pages** ➜ **Build and deployment**.

If you wish to add a custom domain, no CNAME file is required. Just add it to your repo's **Settings** � **Pages** ➜ **Custom domain**.

As this is a Vite project, you can also host your website to Netlify, Vercel, Heroku, or other popular services. Please refer to this [doc](https://vitejs.dev/guide/static-deploy.html) for a detailed deployment guide to other services.

> [!NOTE]
> If you are going to deploy using **Vercel**, remember to set the `base` as `/`.

```ts
// git2page.config.ts
{
  base: '/',
  // ...
}
```

[**Not working?**](https://github.com/6jt8/Git2Page/discussions)

### Setting up locally

- Clone the project and change directory.

  ```shell
  git clone https://github.com/6jt8/Git2Page.git
  cd Git2Page
  ```

- Install dependencies.

  ```shell
  npm install
  ```

- Run dev server.

  ```shell
  npm run dev
  ```

- Finally, visit `http://localhost:5173/Git2Page/` from your browser.

## 🎨 Customization

All the magic happens in the file `git2page.config.ts`. Open it and modify it according to your preference.

## � Support

<p>You can show your support by starring this project. ★</p>
<a href="https://github.com/6jt8/Git2Page/stargazers">
  <img src="https://img.shields.io/github/stars/6jt8/Git2Page?style=social" alt="Github Star">
</a>

## 💡 Contribute

To contribute, see the [Contributing guide](https://github.com/6jt8/Git2Page/blob/main/CONTRIBUTING.md).

## 📄 License

[MIT](https://github.com/6jt8/Git2Page/blob/main/LICENSE)
