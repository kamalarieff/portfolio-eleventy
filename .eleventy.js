const fs = require('fs');
const { DateTime } = require('luxon');
const { icon } = require('@fortawesome/fontawesome-svg-core');
const {
  faPlus,
  faFolder,
  faFile,
  faBars,
  faTimes,
  faPhoneAlt,
  faEnvelope,
  faMapMarkerAlt,
} = require('@fortawesome/free-solid-svg-icons');
const { faGithub, faLinkedin } = require('@fortawesome/free-brands-svg-icons');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

module.exports = function (config) {
  config.addPlugin(syntaxHighlight);
  const markdownLib = markdownIt({
    html: true,
  }).use(markdownItAnchor, {
    level: 1,
    permalink: markdownItAnchor.permalink.linkInsideHeader({
      symbol: `
      <span class="hidden">Jump to heading</span>
      <span aria-hidden="true">#</span>
    `,
      placement: 'after',
    }),
  });
  config.setLibrary('md', markdownLib);

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

  config.addLiquidShortcode('faBars', (width = '1em', height = '1em') => {
    return icon(faBars, {
      attributes: {
        width,
        height,
      },
    }).html[0];
  });

  config.addLiquidShortcode('faTimes', (width = '1em', height = '1em') => {
    return icon(faTimes, {
      attributes: {
        width,
        height,
      },
    }).html[0];
  });

  config.addLiquidShortcode('faPhoneAlt', (width = '1em', height = '1em') => {
    return icon(faPhoneAlt, {
      attributes: {
        width,
        height,
      },
      classes: ['text-blue-500'],
    }).html[0];
  });

  config.addLiquidShortcode('faEnvelope', (width = '1em', height = '1em') => {
    return icon(faEnvelope, {
      attributes: {
        width,
        height,
      },
      classes: ['text-blue-500'],
    }).html[0];
  });

  config.addLiquidShortcode(
    'faMapMarkerAlt',
    (width = '1em', height = '1em') => {
      return icon(faMapMarkerAlt, {
        attributes: {
          width,
          height,
        },
        classes: ['text-blue-500'],
      }).html[0];
    },
  );

  config.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat('dd LLL yyyy');
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  config.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat('yyyy-LL-dd');
  });

  config.addFilter('isoDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toISO();
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

  config.addPassthroughCopy('**/Kamal Arieff Ahmad Faizel Resume.pdf');

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
