import browserSync from "browser-sync";
import { buildDir, config } from "../config";
import { watch, series } from "gulp";
import pug from './pug';
import scss from './scss';
import javascript from './javascript';
import docsScss from './docsScss';
import docsJavascript from './docsJavascript';
import docsPug from './docsPug';

const watch11 = () => {
  browserSync.init({
    server: buildDir,
    notify: false,
    plugins: ['bs-eslint-message'],
    startPath:"/coding_list.html"
    // browser: ["google chrome", "firefox"]
  })
  const pugWather = watch(config.source.pugWather);

  pugWather.on('change', (path, state) => {
    let isComponents = path.indexOf('components');
    let pagePath;
    if(isComponents<0){
      pagePath = `./${path.replace('\\', '/')}`;
    }
    pug(pagePath);
  })


  watch(
    config.doc.source.scss,
    docsScss
  );

  watch(
    config.doc.source.pug,
    docsPug
  );
  // watch(
  //   config.source.pugWather,
  //   pug
  // );
  watch(
    [
      config.source.scss,
      config.source.templateScss,
    ],
    scss
  );
  watch(
    [
      config.source.jsAll,
    ],
    javascript
  );

  watch(
    [
      config.doc.source.jsAll,
    ],
    docsJavascript
  );
}


export default watch11;