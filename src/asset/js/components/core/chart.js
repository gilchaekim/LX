import Class from '../mixin/class';
import {default as Togglable, toggleHeight} from '../mixin/togglable';

import {$, $$, attr, filter, getIndex, hasClass, includes, index, isInView, scrollIntoView, toggleClass, unwrap, wrapAll, within, width, css, toFloat, addClass, removeClass, Transition} from '../../util';
import ApexCharts from 'apexcharts';
export default {
    
    props: {

    },

    data: {
        targets: '> .list',
        active: false,
        animation: [true],
        openSize:null,
        closeSize:null,
        openText:"열기",
        closeText:"닫기",
        clsOpen: 'mui_active',
        toggle: ' .ctrl',
        transition: 'ease',
        duration:300,
        offset: 0
    },
    connected(){

          
    },

    methods: {
        render() {
            const {$el} = this;
            var options = {
                chart: {
                  type: 'line'
                },
                series: [{
                  name: 'sales',
                  data: [30,40,35,50,49,60,70,91,125]
                }],
                xaxis: {
                  categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
                }
            }
            new ApexCharts($el, options).render();
        }
    }

};
