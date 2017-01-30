const metalsmith = require('metalsmith')
const markdown = require('metalsmith-markdown')
const layouts = require('metalsmith-layouts')
const collections = require('metalsmith-collections')
const permalinks = require('metalsmith-permalinks')
const handlebars = require('handlebars')
handlebars.registerHelper('moment', require('helper-moment'))

metalsmith(__dirname)
  .metadata({
    site: {
      name: 'Elektro_nique',
      description: "Elektro_nique is jane-of-all-trades Fiona's spot in the internet"
    }
  })
  .source('./src')
  .destination('./public')
  .use(collections({
    articles: {
      pattern: 'articles/**/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(markdown())
  .use(permalinks({
    relative: false,
    pattern: ':title'
  }))
  .use(layouts({
    engine: 'handlebars',
    directory: './layouts',
    default: 'article.html',
    pattern: ['*/*/*html', '*/*html', '*html'],
    partials: {
      header: 'partials/header',
      navbar: 'partials/navbar',
      footer: 'partials/footer'
    }
  }))
  .build((err) => {
    if (err) console.log(err)
    else console.log('Elektro_nique built')
  })
