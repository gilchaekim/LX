import {
  $, 
  isString, 
  isAndroid,
  after,
  toNumber,
  numberOnly,
  dateFormat,
  getMaxlength,
  numerFormat,
  getRawValue,
  headStr,
  getFormattedValue,
  getNextCursorPosition,
  setSelection,
  uppercaseFormat,
  lowercaseFormat,
  getPostDelimiter,
} from '../../util/index';
import {cssPrefix} from 'GC-data'

export default {

  props: {
    numeric: Boolean,
    prefix: String,
    uppercase: Boolean,
    lowercase: Boolean,
    tailPrefix: Boolean,
    delimiter: String,
    blocks: String,
    dateForm: Boolean,
    viewMaxLength:Boolean,
  },

  data: {
    numeric:false,
    numericOnly:false,
    dateForm:false,
    prefix:"",
    uppercase:false,
    lowercase:false,
    tailPrefix:false,
    viewMaxLength:false,
    delimiter:"",
    delimiters:[],
    datePattern: ['yyyy', 'mm', 'dd'],
    delimiterLazyShow:false,
    isBackward:null,
    lastInputValue:"",
    postDelimiterBackspace:false,
    blocks:[],
    template: `<span class="mui_maxlength">
      <span class="current"></span>
      <span class="maximun"></span>
    </span>`,
  },
  computed: {
    blocks({dateForm, datePattern, blocks}) {
      if (dateForm && datePattern) {
        return datePattern.reduce((block, len) => {
          block.push(len.length);
          return block;
        }, []);
      }
      return isString(blocks) ? toArray(blocks, "|") : blocks;
    }
  },
  connected() {
    const { 
      $el,
      numeric, 
      dateForm, 
      datePattern,
      blocks,
    } = this;
    $el.rawValue = $el.value;
    this.lastValue = "";

    if (dateForm || numeric) this.numericOnly = true;

    if (dateForm && datePattern) {
      this.delimiter = '-';
    }
    
    if (numeric && this.delimiter === "") {
      this.delimiter = ","
    }
    if (this.viewMaxLength) {
      this.Maxlengthel = after(this.$el, this.template);
      this.MaxlengthCurrent = $('.current', this.Maxlengthel);
      this.MaxlengthCurrent.innerHTML = $el.value.length
      this.MaxlengthMaximun = $('.maximun', this.Maxlengthel);
      this.MaxlengthMaximun.innerHTML = $el.maxLength;
    }
    this.maxlength = getMaxlength(blocks);
    this.formatter(this.$el.rawValue)
  },
  destory() {
    console.log('destory');
  },

  events: [
    {
      name: 'input',
      handler(e) {

        this.isBackward = this.isBackward || e.inputType === 'deleteContentBackward';
        const postDelimiter = getPostDelimiter(this.lastInputValue, this.delimiter, this.delimiters);

        if (this.isBackward && postDelimiter) {
          this.postDelimiterBackspace = postDelimiter;
        } else {
          this.postDelimiterBackspace = false;
        }
        this.formatter(e);
      }
    },
    {
      name: 'keydown',
      handler(e) {
        this.lastInputValue = this.$el.value;
        this.isBackward = e.keyCode === 8;
      }
    },
  ],

  methods: {
    formatter() {
      const {
        $el,
        numeric,
        uppercase,
        lowercase,
        dateForm,
        isBackward,
        datePattern,
        blocks,
        delimiter,
        maxlength,
        delimiters,
        delimiterLazyShow,
        numericOnly,
        postDelimiterBackspace,
        viewMaxLength
      } = this;
      let value = $el.value;

      if (isBackward && postDelimiterBackspace) {
        value = headStr(value, value.length - postDelimiterBackspace.length);
      }

      if (numericOnly) value = numberOnly(value);


      $el.rawValue = getRawValue(value, delimiter, delimiters, maxlength);

      if ( !numeric && !uppercase && !lowercase && !dateForm && !!!blocks.length && !viewMaxLength ) return;

      if(numeric){
        $el.rawValue = numerFormat($el.rawValue, delimiter);
      }

      if(dateForm){
        $el.rawValue = dateFormat($el.rawValue, datePattern, blocks)
      }

      if (uppercase) {
        $el.rawValue = uppercaseFormat($el.rawValue)
      }

      if (lowercase) {
        $el.rawValue = lowercaseFormat($el.rawValue)
      }
      
      this.lastValue = getFormattedValue($el.rawValue, blocks, delimiter, delimiters, delimiterLazyShow );
      
      this.updateValueState();
    },
    updateValueState() {
      const { $el, lastValue, delimiter, delimiters, viewMaxLength } = this;
      let cursorPos = $el.selectionEnd;
      cursorPos = getNextCursorPosition(cursorPos, $el.value, lastValue, delimiter, delimiters);
      if (isAndroid) {
        window.setTimeout(function () {
          $el.value = lastValue;
          setSelection($el, cursorPos, document);
        }, 1);
        return;
      }

      $el.value = lastValue;

      if (viewMaxLength) {  
        this.MaxlengthCurrent.innerHTML = lastValue.length;
      }
      
      setSelection($el, cursorPos, document);
    }
  }
};

function toArray(str, dvd) {
  let result = [];
  str.split(dvd).forEach(n => {
    result.push(toNumber(n));
  });
  return result;
}
  
