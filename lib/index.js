const minimatch = require('minimatch');
const purifyCSS = require('purify-css');

const plugin = (options) => {
  const {content, css, output} = options;
  // Delete options that conflict with running in Metalsmith
  delete options.content;
  delete options.css;
  delete options.output;

  return function(files, metalsmith, done) {
    const fileNames = Object.keys(files);

    const filterFiles = (targetFiles) => {
      return [...targetFiles].reduce((matchedFiles, filename) => {
        return matchedFiles.concat(
          minimatch.match(fileNames, filename, { matchBase: true })
        );
      }, []);
    };

    const concatContents = (targetFiles) => {
      return [...targetFiles].reduce((contents, filename) => {
        contents.push(files[filename].contents.toString());
        return contents;
      }, []).toString();
    }

    // Stringify matched HTML & CSS file contents
    const structure = concatContents(filterFiles(content));
    const styles = concatContents(filterFiles(css));

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
