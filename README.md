# Metalsmith PurifyCSS

[![Build Status](https://travis-ci.org/alex-ketch/metalsmith-purifycss.svg?branch=master)](https://travis-ci.org/alex-ketch/metalsmith-purifycss)

This is a [Metalsmith](http://www.metalsmith.io) plugin for [PurifyCSS](https://github.com/purifycss/purifycss).

---

## Installation
To install run:
```js
npm install metalsmith-purifycss --save-dev
```

or if you're using [Yarn](https://yarnpkg.com)
```js
yarn add metalsmith-purifycss --dev
```

---
## Usage

The API interface is [exactly the same](https://github.com/purifycss/purifycss#api-in-depth) as for PurifyCSS.

This is the simplest setup:
```js
const purifyCSS = require('metalsmith-purifycss');

Metalsmith()
  // ... Compile CSS/HTML/JavaScript
  .use(purifyCSS({
    content: ['*.html', '*.js'],
    css: ['styles.css'],
    output: 'styles-purified.css',
  }))
  .build((err, files) => {
    if (err) throw new err;
  });
});
```

Note that if you'd like to overwrite the original CSS file, set the `output`
name to match the `css` filename.

---

## Limitations

- The plugin currently only accepts one CSS file as the input, such as a
compiled Sass stylesheet.
- PurifyCSS does not seem to prune HTML tags (`h1`, `p`, etc.), but works
great for CSS selectors such as classes and IDs.
