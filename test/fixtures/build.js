const Metalsmith = require('metalsmith');
const purifyCSS = require('../../lib/index');

Metalsmith(__dirname)
.source('./src')
.destination('./build')
.use(purifyCSS({
  content: ['*.html', '*.js'],
  css: ['styles.css'],
  output: 'styles.css',
  minify: true,
  rejected: true,
  info: true,
  whitelist: ['#whitelisted']
}))
.build((err) => {
  if (err) throw err;
  console.log('Build finished!'); // eslint-disable-line
});
