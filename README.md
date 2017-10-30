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

The API interface is [mostly the same](https://github.com/purifycss/purifycss#api-in-depth) as PurifyCSS.

### Additional options:

| Key              | Type    | Description                                                |  
| :--------------- | :------ | :--------------------------------------------------------- |  
| `removeOriginal` | boolean | Removes files matched by the `css` option from the output. |  


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
