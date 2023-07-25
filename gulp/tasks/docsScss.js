import { src, dest } from 'gulp';
import {config, buildDir} from "./../config";
import plugins from "./plugins";
import browserSync from 'browser-sync';
import sourcemaps from "gulp-sourcemaps";


const docScssBuild = (path) => {
  // const src = path?path:config.doc.source.scss;
  return src(config.doc.source.scss)
    .pipe(sourcemaps.init())
    .pipe(plugins.dartSass({
      outputStyle: config.args.production ? 'compressed' : 'expanded',
      precision: 10,
      sync: true
    }))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(dest(config.doc.build.scss))
    .pipe(browserSync.stream({ match: '**/*.css' }))
}

export default docScssBuild;