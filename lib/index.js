const minimatch = require('minimatch');
const purifyCSS = require('purify-css');

const plugin = (options) => {
  const {content, css, output} = options;
  // Delete options that conflict with running in Metalsmith
  delete options.content;
  delete options.css;
  delete options.output;

  return function(files, metalsmith, done) {
    // Stringify HTML & other structural markup
    const fileNames = Object.keys(files);
    const filteredFiles = [...content].reduce((filteredFiles, filename) => {
      return filteredFiles.concat(
        minimatch.match(fileNames, filename, { matchBase: true })
      );
    }, []);

    const structure = [...filteredFiles].reduce((structure, filename) => {
      structure.push(files[filename].contents.toString());
      return structure;
    }, []).toString();

    // Stringify CSS
    const styles = [...css].reduce((styles, filename) => {
      styles.push(files[filename].contents.toString());
      return styles;
    }, []).toString();

    // Pass code and CSS to Purify
    purifyCSS(structure, styles, options, (results) => {
      files[output] = {
        contents: new Buffer(results)
      }
    });

    done();
  }
}

module.exports = plugin;
