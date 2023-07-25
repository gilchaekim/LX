import { src, dest } from 'gulp';
import {config, buildDir} from "./../config";
import plugins from "./plugins";
import browserSync from 'browser-sync';
import {
  printError,
  logError
} from '../util/util';

const docPugBuild = (path) => {
  let reload = true;
  return src(config.doc.source.pug)
  .pipe(
    plugins.pug({
      pretty: true
    })
  )
  .on('error', function (error) {
    console.log(error)
    browserSync.notify(printError(error), 25000);
    reload = false;
    this.emit('end');
    logError(error.name, error.message);
  })
  .pipe(dest(config.doc.build.pug))
  .on('end', () => {
    reload && browserSync.reload();
  })
}

export default docPugBuild;