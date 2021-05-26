const fs = require('fs');
const { DateTime } = require('luxon');
const { icon } = require('@fortawesome/fontawesome-svg-core');
const {
  faPlus,
  faFolder,
  faFile,
} = require('@fortawesome/free-solid-svg-icons');
const { faGithub, faLinkedin } = require('@fortawesome/free-brands-svg-icons');

module.exports = function (config) {
  config.setLiquidOptions({
    dynamicPartials: true,
  });

  config.addLiquidShortcode('yinyang', (width = '1em', height = '1em') => {
    const temp2 = icon(faPlus, {
      attributes: {
        width,
        height,
      },
    });
    return `${temp2.html[0]}`;
  });

  config.addLiquidShortcode('faFolder', (width = '1em', height = '1em') => {
    return icon(faFolder, {
      attributes: {
        width,
        height,
      },
    }).html[0];
  });

  config.addLiquidShortcode('faFile', (width = '1em', height = '1em') => {
    return icon(faFile, {
      attributes: {
        width,
        height,
      },
    }).html[0];
  });

  config.addLiquidShortcode('faGithub', (width = '1em', height = '1em') => {
    return icon(faGithub, {
      attributes: {
        width,
        height,
      },
    }).html[0];
  });

  config.addLiquidShortcode('faLinkedin', (width = '1em', height = '1em') => {
    return icon(faLinkedin, {
      attributes: {
        width,
        height,
      },
    }).html[0];
  });

  config.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
      'dd LLL yyyy',
    );
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  config.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  });

  // Static assets to pass through
  config.addPassthroughCopy('./src/fonts');
  config.addPassthroughCopy('./src/images');
  config.addPassthroughCopy('./src/favicon.ico');
  config.addPassthroughCopy('./src/manifest.json');
  config.addPassthroughCopy('./src/robots.txt');

  // 404
  config.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync('dist/404.html');

        browserSync.addMiddleware('*', (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
  });

  config.addLiquidShortcode('user', function (name, twitterUsername) {
    return `<div class="user">
<div class="user_name">${name}</div>
<div class="user_twitter">@${twitterUsername}</div>
</div>`;
  });

  config.addLiquidShortcode('test', function (...args) {
    console.log('######## args', args);
    return '<span>icon</span>';
  });

  return {
    dir: {
      input: 'src',
      output: 'src/_site',
    },
    passthroughFileCopy: true,
    templateFormats: ['html', 'md', 'liquid'],
    htmlTemplateEngine: 'liquid',
    dataTemplateEngine: 'liquid',
    markdownTemplateEngine: 'liquid',
  };
};
