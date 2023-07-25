import {
    each,
    isArray,
    append,
    prepend,
    empty,
    attr,
    toggleClass,
    parent,
    removeClass,
    addClass,
    $$,
    hasClass,
    html,
} from '../../util';
export default {

    props: {
        data: Object,
        mainFrame:String,
        idName:String,
    },

    data: {
        data: null,
        buildData: [],
        idName:"treeId",
        treeNavCls:"tree_nav",
        treeLink:".tree_lists a.name",
        activeCls:'mui-active',
        highlightCls:'mui-highlight',
        highlightItem:'highlightItem',
        activeItem:'activeItem',
        mainFrame:null,
        index:0,
        template:`<div class="tree_control">
            <div class="path_box">현재 페이지 : <p class="page_path"></p></div>
            <span class="status">
                <span class="complete">퍼블 작업 완료</span>
                <span class="confirm">기획 검수 완료</span>
            </span>
            <span class="collapse">
                <button type="button" class="open_all">open all</button>
                <button type="button" class="close_all">close all</button>
            </span>
            <span class="search">
                <input type="text"> 
                <button type="button">검색</button>
            </span>
        </div>`
    },
    beforeConnect(){
        this.$wrap = append(this.$el, '<div id="tree_wrap"></div>');
        this.appendTree(this.data);
        this.filepath = $('.page_path', prepend(this.$el, this.template));
        if(!!this.highlightItem) {
            let src = $(`#${this.highlightItem}`)?.pathname;
            attr(this.mainFrame, 'src', src)
            this.setFilePath(src);
        }
        
    },


    computed: {
        mainFrame({mainFrame}) {
            return $(mainFrame);
        },
        highlightItem(){
            return localStorage.getItem(this.keyHighlightItem);
        },
        activeItem({keyActiveItem}){
            return JSON.parse(localStorage.getItem(this.keyActiveItem)) || [];
        },
        keyHighlightItem({idName, highlightItem}){
            return `${idName}${highlightItem}`
        },
        keyActiveItem({idName, activeItem}){
            return `${idName}${activeItem}`
        }
    },

    events: [
        {
            name: 'click',
            delegate() {
                return this.treeLink;
            },
            handler(e) {
                e.preventDefault();
                this.highlight(e.current.id)
                attr(this.mainFrame, 'src', e.current.pathname);
                this.setFilePath(e.current.pathname);
            }
        },
        {
            name: 'load',
            el() {
                return this.mainFrame;
            },
            handler(e) {
                addClass(this.mainFrame.contentDocument.documentElement, 'guide_scroll')
            }
        },
        {
            name: 'click',
            delegate() {
                return '.collapse button';
            },
            handler(e) {
                e.preventDefault();
                this.collapseAll(e.current.className === 'open_all')
            }
        },
        {
            name: 'click',
            delegate() {
                return `.${this.treeNavCls}`;
            },
            handler(e) {
                const item = parent(e.current);
                const id = e.current.id;
                const {activeCls, setSelected} = this;
                if(hasClass(item, activeCls)){
                    removeClass(item, activeCls);
                    setSelected(id, false);
                }else{
                    addClass(item, activeCls)
                    setSelected(id, true);
                }
            }
        }
    ],

    methods: {
        build(data){
            return this.sortData(data, 0);
        },
        appendTree(data){
            const {$wrap, build} = this;
            append($wrap, build(data));
        },
        sortData(data, index){
            const deps = ++index;
            const hilight = this.highlightItem;
            const {
                $wrap,
                treeNavCls,
                highlightCls,
                activeCls,
                idName,
                activeItem,
            } = this;
            let str = ''
            empty($wrap);
            each(data, (data, key) => {
                let idIndex = this.index++;
                let id = `${idName}${deps}${idIndex}`;
                if (!isArray(data)) {
                    str+=`
                    <div class="tree_wrap ${activeItem.length && activeItem.find((arr)=>arr === id)?activeCls:""}">
                        <button tabindex="-1" type="button" id="${id}" class="${treeNavCls}">${key}</button>
                        <div class="tree_sub_wrap">${this.sortData(data, deps)}</div>
                    </div>
                    `;
                }else{
                    str+=`
                    <div class="tree_lists ${data[1]?data[1]:""}">
                        <span>
                            <a href="${data[0]}" class="name ${hilight === id ? highlightCls:""}" id="${id}">${key}</a>
                            <a href="${data[0]}" class="blank" target="_blank" title="새 창" tabindex="-1">${key}</a>
                        </span>
                    </div>
                    `;
                }
            })
            
            return str;
        },
        highlight(id){
            const { highlightCls, setHighlight, $el } = this;
            const newItem = $(`#${id}`, $el);
            let { highlightItem } = this;
            const item = $(`#${highlightItem}`, $el);
            
            item && removeClass(item, highlightCls)
            this.highlightItem = id;
            addClass( newItem, highlightCls );
            setHighlight(id);
        },
        setSelected(id, action){
            let items = this.activeItem;
            const add = (id) => !items.find((arr)=>arr=== id) && items.push(id);
            const remove = (id) =>{
                for (let i = 0; i < this.activeItem.length; i++) {
                    if(this.activeItem[i] === id){
                        this.activeItem.splice(i, 1);
                    }
                }
            }
            (action?add:remove)(id);
            this.activeItem = items ;
            localStorage.setItem(this.keyActiveItem, JSON.stringify(this.activeItem));
        },
        setHighlight(id){
            localStorage.setItem(this.keyHighlightItem, id);
        },
        refresh(){
            this.clearStorage();
        },
        collapseAll(bool) {
            const { $wrap, activeCls } = this;
            $$(`.${this.treeNavCls}`, $wrap).forEach((el, i)=>{
                ( bool ? addClass : removeClass )(parent(el), activeCls);
                this.setSelected(el.id, bool)
            });
        },
        closeAll() {

        },
        setFilePath(path) {
            html(this.filepath, path)
        },
        clearStorage(){
            localStorage.removeItem(this.keyActiveItem);
        }
    }
};

