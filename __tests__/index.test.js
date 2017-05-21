const Metalsmith = require('metalsmith');
const purifyCSS = require('../lib/index');

const build = options => {
  return new Promise ((resolve, reject) => {
    Metalsmith(`${__dirname }/fixtures`)
    .source('src')
    .use(purifyCSS(options))
    .build((err, files) => {
      if (err) reject(err);
      resolve(files);
    });
  })
};

test('purified CSS file is created', () => {
  const options = {
    content: ['*.html', '*.js'],
    css: ['styles.css'],
    output: 'styles-cleaned.css',
  };

  return build(options).then((files) => {
    expect(files['styles-cleaned.css']).toBeDefined();
  })
});

test('original CSS is purified', () => {
  const options = {
    content: ['*.html', '*.js'],
    css: ['styles.css'],
    output: 'styles-cleaned.css',
  };

  return build(options).then((files) => {
    expect(files['styles-cleaned.css'].contents.toString()).not.toEqual(files['styles.css']);
  })
});

test('unused selectors are removed', () => {
  const options = {
    content: ['*.html', '*.js'],
    css: ['styles.css'],
    output: 'styles-cleaned.css',
  };

  return build(options).then((files) => {
    expect(files['styles-cleaned.css'].contents.toString()).toMatchSnapshot();
  })
});

test('output is minified', () => {
  const options = {
    content: ['*.html', '*.js'],
    css: ['styles.css'],
    output: 'styles-cleaned.css',
    minify: true
  };

  return build(options).then((files) => {
    expect(files['styles-cleaned.css'].contents.toString()).toMatchSnapshot();
  })
});

test('whitelist option is respected', () => {
  const options = {
    content: ['*.html', '*.js'],
    css: ['styles.css'],
    output: 'styles-cleaned.css',
    whitelist: ['#whitelisted']
  };

  return build(options).then((files) => {
    expect(files['styles-cleaned.css'].contents.toString()).toContain('#whitelisted');
  })
});

test('an array of stylesheets is accepted', () => {
  const options = {
    content: ['*.html', '*.js'],
    css: ['styles.css', 'styles2.css'],
    output: 'styles-cleaned.css',
  };

  return build(options).then((files) => {
    expect(files['styles-cleaned.css'].contents.toString()).toContain('.multipleCSSfiles');
  })
});


test('a glob is accepted for CSS parameter', () => {
  const options = {
    content: ['*.html', '*.js'],
    css: ['*.css'],
    output: 'styles-cleaned.css',
  };

  return build(options).then((files) => {
    expect(files['styles-cleaned.css'].contents.toString()).toContain('span');
  })
});
