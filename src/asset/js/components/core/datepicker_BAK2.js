import Calendar from './calendar'
import {
  $, 
  assign,
  findAll, 
  isDate, 
  each, 
  mergeOptions, 
  addLeadingZero, 
  isString, 
  hasClass, 
  toggleClass, 
  Dimensions, 
  height, 
  isVisible, 
  width, 
  toNodes, 
  queryAll, 
  trigger, 
  isNumber, 
  $$, 
  append, 
  fragment, 
  toNode, 
  addClass,
  removeClass,
  find, 
  empty, 
  data,
} from '../../util/index';
import {cssPrefix} from 'GC-data'

export default {
  install,
  props: {
    pickerButton:Boolean,
    value:String,
  },

  data: {
    target: '> * input',
  },
  created() {
    this.calendar = this.$create('calendar', { ...this.$props })
  },

  computed: {
   
  },

  // created() {
  //   this.picker = 'dfdsfsfaasfasfs'
  // },
  // beforeConnect() {
  //   console.log(`beforeConnect ${this.$el}`)
  // },
  connected() {
    console.log('picker')
  },
  // beforeDisconnect() {
  //   console.log('disconnected');
  // },
  // disconnected() {
  //   console.log('disconnected');
  // },
  destory() {
    console.log('destory');
  },

  events: [
    {
      name: 'click',
      handler(e) {
        console.log(this.calendar.renderPickerDate())
      }
    }
  ],
  methods: {
    

  },
  update() {

  }
};



function install(GCui, Datepicker) {
  // console.log(Datepicker)
  // console.log(GCui.calendar)
  if (!GCui.calendar) {
    GCui.component('calendar', Calendar);
    
  }
  console.log(GCui.component('calendar').options.$el)
  assign(Datepicker.props, GCui.component('calendar').options.props);
}