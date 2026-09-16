# bizhuka.github.io

ABAP library documentation built with Jekyll and the Just the Docs theme.

## Local development

```powershell
bundle install
bundle exec jekyll serve
```

Open <http://localhost:4000>.

On Windows, prefix a command with `ridk exec` if the Ruby DevKit paths are not
active in the current terminal.

## Validation

```powershell
bundle exec jekyll build --trace --strict_front_matter
bundle exec htmlproofer _site --disable-external
```

## Deployment

On pushes to `master`, `.github/workflows/pages.yml` builds the production site
and deploys it only after the build succeeds. In the repository's **Settings →
Pages**, set the source to **GitHub Actions** once. Dependabot checks the Ruby
gems and GitHub Actions monthly.
