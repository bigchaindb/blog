# BigchainDB Blog

> Ghost theme for BigchainDB's blog

## Ghost in your shell

### Install Node.js

We need Node LTS 6.9.1. On macOS you can install that version with nvm or Homebrew:

```bash
# nvm
nvm install node 6.9.1

# Homebrew
brew tap homebrew/versions
brew install homebrew/versions/node6-lts
brew link node6-lts
```

### Install Ghost

Use an existing Ghost installation on your machine or download and copy a fresh version and  symlink this repository into the theme folder:

```bash
ln -s . ~/Sites/ghost/content/themes/bigchaindb-blog
```

Then go into your Ghost installation root folder and start up Ghost:

```bash
# install dependencies
npm install --production

# let's roll
npm start
```

## Theme Development

```bash
cd bigchain-blog
sass --watch assets/scss/bigchaindb-blog.scss:assets/css/bigchaindb-blog.css
```


### Ghost documentation

- [themes.ghost.org](https://themes.ghost.org)
- [themes.ghost.org - Templates](https://themes.ghost.org/docs/templates)

## Deployment
