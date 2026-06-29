# Contributing

👍🎉 First off, thanks for taking the time to contribute! 🎉👍

If you have found an issue or would like to request a new feature, simply create a new issue detailing the request. We also welcome pull requests. See below for information on getting started with development and submitting pull requests.

Please note that we have a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Found an Issue?

If you find a bug in the source code or a mistake in the documentation, you can help us by
submitting an issue to our [GitHub Repository](https://github.com/6jt8/Git2Page/issues/new). Even better you can submit a Pull Request
with a fix.

## Submitting a Pull Request

1. Make sure that the contribution you want to make is explained or detailed in a GitHub issue! Find an [existing issue](https://github.com/6jt8/Git2Page/issues) or [open a new one](https://github.com/6jt8/Git2Page/issues/new).
2. Once done, [fork the repository](https://github.com/6jt8/Git2Page/fork) in your own GitHub account.
3. [Create a new Git branch](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-and-deleting-branches-within-your-repository).
4. Make the changes on your branch.
5. [Submit the branch as a PR](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork) pointing to the `main` branch of the main repository. <br>
   We do not enforce a naming convention for the PRs, but **please use something descriptive of your changes**.

## Development Workflow

### Install dependencies

```sh
npm install
```

### Run dev server

```sh
npm run dev
```

### Linter

Each PR should pass the linter to be accepted. To fix lint and prettier errors, run `npm run lint:fix` and `npm run prettier:fix`.

### Commit Message

Your commit message should follow this format:

- be lowercase
- not finish by a dot or any other punctuation character (!,?)
- start with a verb so that we can read your commit message this way: "this commit will ...", where "..." is the commit message.
  e.g.: "fix the home page button" or "add support for dark mode"

For better overview, prefix your commit message with a type, followed by a colon:
- `fix:` for bug fixes
- `docs:` for documentation changes  
- `feat:` for new features
- `refactor:` for code refactoring
- `style:` for formatting changes
- `test:` for test additions or fixes
- `chore:` for maintenance tasks

e.g.: `fix: correct authentication error` or `docs: update installation guide`
