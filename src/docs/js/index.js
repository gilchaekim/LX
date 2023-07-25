// import {fastdom, ready, $, $$, on} from '../../asset/js/util'


// ready(() => {
//   const treeMenu = $$('.tree-title');
//   // console.log(treeMenu);
//   on(treeMenu, 'click', e =>{
//     console.log(e);
//     return false;
//   })
// })

import {
  each,
} from '../../asset/js/util';
import globalApi from '../../asset/js/core/global';
import initializeApi from '../../asset/js/core/initialize';
import instanceApi from '../../asset/js/core/instance';
import * as components from './components';
import * as util from '../../asset/js/util';
import componentCore from '../../asset/js/core/component';
import setFramewrok from '../../asset/js/core/start';





const UiGuide = function (options) {
  this._init(options);
};
UiGuide.util = util;
UiGuide.data = 'uiComponents';
UiGuide.prefixName = 'uiguide';
UiGuide.prefix = "uiguide-";
UiGuide.options = {};

// globalAPI Start
globalApi(UiGuide);
// globalAPI End

// hooksAPI, stateAPI Start
initializeApi(UiGuide);
// hooksAPI End

// componentAPI Start
componentCore(UiGuide);
// componentAPI End

// instanceAPI Start
instanceApi(UiGuide);
// instanceAPI End

// boot Start
setFramewrok(UiGuide);
// boot End

each(components, (component, name) => {
  return UiGuide.component()
});
