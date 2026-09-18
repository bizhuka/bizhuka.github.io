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

### XTT generator

The generator metadata is loaded from `/api/example?ind=...` while Jekyll builds
the site. `_config.yml` uses `http://localhost:3000` for local builds and
`https://open-abap-xtt.vercel.app` when `JEKYLL_ENV=production`. The generated
download forms use the same selected host. Local builds fall back to the public
host when the localhost service is unavailable. A runtime `.env` file is not
used because GitHub Pages serves static files and cannot read environment
variables in the browser.

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
