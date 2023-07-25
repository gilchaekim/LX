
const buildDir = "./";
const sourceDir = "./src/";


const config = {
  source: {
    data: `${sourceDir}_data/`,
    scss: `${sourceDir}asset/scss/**/!(_*).scss`,
    jsIndex: `${sourceDir}asset/js/index.js`,
    jsAll: `${sourceDir}asset/js/**/*.js`,
    pug: [
      `${sourceDir}**/*.pug`,
      `!${sourceDir}components/**/*.pug`,
      `!${sourceDir}docs/layout/*.pug`,
    ],
    pugWather:[`${sourceDir}html/**/*.pug`, `${sourceDir}components/**/*.pug`, `${sourceDir}docs/**/*.pug`, 'index.pug'],
    template: `${sourceDir}components/**/*.pug`,
    templateScss: `${sourceDir}components/**/*.scss`,
    components: `${sourceDir}components`,
    pages: `${sourceDir}pages`,
  },
  doc:{
    source:{
      scss: `${sourceDir}docs/scss/**/*.scss`,
      js: `${sourceDir}docs/js/index.js`,
      jsAll: `${sourceDir}docs/js/**/*.js`,
      pug: [`${sourceDir}*.pug`],
    },
    build:{
      scss: `${buildDir}docs/css/`,
      js: `${buildDir}docs/js/`,
      pug: `${buildDir}`,
    }
  },
  build: {
    scss: `${buildDir}css/`,
    js: `${buildDir}js/`,
    pug: `${buildDir}html/`,
    docs:`${sourceDir}docs/`,
  },
  args: {
    production: false,
  }
}

export {
  buildDir,
  sourceDir,
  config,
}