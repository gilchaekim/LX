'use strict';
require("@babel/register")

import {series, parallel} from "gulp";
import clean from './gulp/tasks/clean';
import scss from './gulp/tasks/scss';
import javascript from './gulp/tasks/javascript';
import pug from './gulp/tasks/pug';
import watch from "./gulp/tasks/watch";

import docsScss from './gulp/tasks/docsScss';
import docsJavascript from './gulp/tasks/docsJavascript';
import docsPug from './gulp/tasks/docsPug';




import {config} from "./gulp/config";



// javascript(taskOptionList);
// sass(taskOptionList);
// template(taskOptionList);
// watch(taskOptionList);




// const cleanRoot = () => {
//   return console.log(config11);
// }

const startServer = series(
  // clean,
  scss,
  javascript,
  pug,
  docsScss,
  docsJavascript,
  docsPug,
  watch
)


const build = series(
  scss,
  javascript,
  pug,
)

exports.start = startServer;
exports.build = build;