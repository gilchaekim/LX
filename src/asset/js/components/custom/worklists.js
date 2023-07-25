import Class from "../mixin/class";
import { default as Togglable, toggleHeight } from "../mixin/togglable";
import {
  $,
  $$,
  attr,
  inBrowser,
  filter,
  getIndex,
  hasClass,
  includes,
  index,
  isInView,
  scrollIntoView,
  toggleClass,
  unwrap,
  wrapAll,
  before,
  wrapInner,
  fragment,
  apply,
  isVoidElement,
  parents,
  camelize,
  hyphenate,
  ucfirst,
  startsWith,
  findIndex,
  css,
} from "../../util";

export default {
  mixins: [Class, Togglable],
  props: {
    selector: String,
  },
  data: {
    mainPath:'/pages/index.html',
    sidePath:'#pageLists',
    selector: " .tree-title",
    topNav:'#topNav a',
    sideTabLists:'#pages > div',
    clsOpen: "tree-open",
    clsClose: "tree-close",
    treeLists: ".lists button",
    contentframe: "#content_frame"
  },

  computed: {
    contentframe({contentframe}) {
      return $(contentframe);
    },
    mainPath({mainPath}) {
      return !!localStorage.getItem('url') ? localStorage.getItem('url') : mainPath;
    },
    sidePath({sidePath}) {
      return !!localStorage.getItem('sideNav') ? localStorage.getItem('sideNav') : sidePath;
    },
  },

  events: [
    {
      name: "readystatechange load hashchange popstate",
      el: inBrowser && window,
      handler(e) {
        this.viewMainFrame(this.mainPath);
        this.viewsideNavigation(this.sidePath);
      },
    },
    {
      name: "click",
      delegate() {
        return `${this.selector}`;
      },
      handler(e) {
        e.preventDefault();
        console.log(this.path)
      },
    },
    {
      name: "click",
      delegate() {
        return `${this.topNav}`;
      },
      handler(e) {
        e.preventDefault();
        console.log(e.current.hash);
        this.viewsideNavigation(e.current.hash);
      },
    },
    {
      name: "click",
      delegate() {
        return `${this.treeLists}`;
      },
      handler(e) {
        e.preventDefault();
        const path = attr(e.current, 'data-href');
        this.viewMainFrame(path);
      },
    },
    {
      name: "scroll",

      el: window,

      handler() {
        // this.$emit('resize');
      },
    },
  ],

  methods: {
    test() {
      alert("dddddd");
    },
    setMainContent() {
      console.log('sdfsdf')
    },
    viewMainFrame(path) {
      localStorage.setItem('url', path)
      attr(this.contentframe, 'src', path)
    },
    viewsideNavigation(id) {
      localStorage.setItem('sideNav', id)
      $$(this.sideTabLists).forEach((el)=> css(el, 'display', `#${el.id}` === id ? 'block' : 'none'))
    }

  }
};
