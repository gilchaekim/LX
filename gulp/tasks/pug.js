import { src, dest } from 'gulp';
import {config, buildDir} from "./../config";
import plugins from "./plugins";
import browserSync from 'browser-sync';
import beautify from "gulp-beautify";
import {
  printError,
  logError
} from '../util/util';
import { render } from 'pug';

const pugBuild = (path) => {
  console.log(path);
  let sourceSrc = typeof path === 'string'?path:config.source.pug;
  let reload = true;
  return src(sourceSrc)
  .pipe(
    plugins.pug({
      pretty: true,
      filename: 'index.pug',
      filters:{
        code:(text) => {
          return render(`include index.pug\n\nsection.code_view\n  ${text.trim().split('\n').join('\n  ')}\n\ndiv.code_block\n    pre\n      code.language-pug\n        | ${text.trim().split('\n').join('\n        | ')}`, {
            filename: 'index.pug'
          });
        }
      }
    })
  )
  .on('error', function (error) {
    console.log(error)
    browserSync.notify(printError(error), 25000);
    reload = false;
    this.emit('end');
    logError(error.name, error.message);
  })
  .pipe(beautify.html({ indent_size: 2 }))
  .pipe(dest(buildDir))
  .on('end', () => {
    reload && browserSync.reload();
  })
}

export default pugBuild;