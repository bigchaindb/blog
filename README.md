# BigchainDB Blog

> Ghost theme for BigchainDB's blog

## Ghost in your shell

### Install Node.js

We need Node LTS 6.9.1. On macOS you can install that version with either nvm or Homebrew:

```bash
# nvm
nvm install node 6.9.1

# Homebrew
brew tap homebrew/versions
brew install homebrew/versions/node6-lts
brew link node6-lts
```

### Install Ghost

Use an existing Ghost installation on your machine or download and copy a fresh version and  symlink this repository's dist output into the theme folder:

```bash
ln -s dist/bigchaindb-blog ~/Sites/ghost/content/themes/bigchaindb-blog
```

Then go into your Ghost installation root folder and start up Ghost:

```bash
# install dependencies
npm install --production

# let's roll
npm start
```

## Theme Development

Clone the repository and make sure to include submodules too:

```bash
git clone --recursive git@github.com:bigchaindb/blog.git
```

Then install dependencies with:

```bash
npm i
```

The following development server proxies to the local Ghost url which you need to setup in the config section of the `gulpfile.js`:

```js
GHOSTURL = 'localhost:2368'
```

Finally, spin up the local dev server with livereloading via BrowserSync, reachable under [https://localhost:1337](https://localhost:1337):

```bash
gulp
```

### Production build

Puts everything together and puts it into a folder under `dist/` and makes a zip-package out of it:

```bash
gulp build --production
```


### Ghost documentation

- [themes.ghost.org](https://themes.ghost.org)
- [themes.ghost.org - Templates](https://themes.ghost.org/docs/templates)
