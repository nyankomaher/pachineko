import{C as e,J as t,Jt as n,Ot as r,P as i,U as a,Ut as o,_ as s,b as c,d as l,j as u,q as d,tt as f,v as p,x as m,y as h}from"./C8bKil6U.js";import{ft as g,gt as _,t as v,wt as y}from"./czlGUozm.js";import{t as b}from"./FiooIEjL.js";import{n as x}from"./BuBkwc60.js";var S=v.extend({name:`dataview`,style:`
    .p-dataview {
        position: relative;
        display: block;
        border-color: dt('dataview.border.color');
        border-width: dt('dataview.border.width');
        border-style: solid;
        border-radius: dt('dataview.border.radius');
        padding: dt('dataview.padding');
    }

    .p-dataview-header {
        background: dt('dataview.header.background');
        color: dt('dataview.header.color');
        border-color: dt('dataview.header.border.color');
        border-width: dt('dataview.header.border.width');
        border-style: solid;
        padding: dt('dataview.header.padding');
        border-radius: dt('dataview.header.border.radius');
    }

    .p-dataview-content {
        background: dt('dataview.content.background');
        border-color: dt('dataview.content.border.color');
        border-width: dt('dataview.content.border.width');
        border-style: solid;
        color: dt('dataview.content.color');
        padding: dt('dataview.content.padding');
        border-radius: dt('dataview.content.border.radius');
    }

    .p-dataview-footer {
        background: dt('dataview.footer.background');
        color: dt('dataview.footer.color');
        border-color: dt('dataview.footer.border.color');
        border-width: dt('dataview.footer.border.width');
        border-style: solid;
        padding: dt('dataview.footer.padding');
        border-radius: dt('dataview.footer.border.radius');
    }

    .p-dataview-paginator-top {
        border-width: dt('dataview.paginator.top.border.width');
        border-color: dt('dataview.paginator.top.border.color');
        border-style: solid;
    }

    .p-dataview-paginator-bottom {
        border-width: dt('dataview.paginator.bottom.border.width');
        border-color: dt('dataview.paginator.bottom.border.color');
        border-style: solid;
    }

    .p-dataview-loading-overlay {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
    }
`,classes:{root:function(e){var t=e.props;return[`p-dataview p-component`,{"p-dataview-list":t.layout===`list`,"p-dataview-grid":t.layout===`grid`}]},header:`p-dataview-header`,pcPaginator:function(e){return`p-dataview-paginator-`+e.position},content:`p-dataview-content`,emptyMessage:`p-dataview-empty-message`,footer:`p-dataview-footer`}});u(),r();var C={name:`BaseDataView`,extends:b,props:{value:{type:Array,default:null},layout:{type:String,default:`list`},rows:{type:Number,default:0},first:{type:Number,default:0},totalRecords:{type:Number,default:0},paginator:{type:Boolean,default:!1},paginatorPosition:{type:String,default:`bottom`},alwaysShowPaginator:{type:Boolean,default:!0},paginatorTemplate:{type:String,default:`FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown`},pageLinkSize:{type:Number,default:5},rowsPerPageOptions:{type:Array,default:null},currentPageReportTemplate:{type:String,default:`({currentPage} of {totalPages})`},sortField:{type:[String,Function],default:null},sortOrder:{type:Number,default:null},lazy:{type:Boolean,default:!1},dataKey:{type:String,default:null}},style:S,provide:function(){return{$pcDataView:this,$parentInstance:this}}};function w(e){return O(e)||D(e)||E(e)||T()}function T(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function E(e,t){if(e){if(typeof e==`string`)return k(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?k(e,t):void 0}}function D(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function O(e){if(Array.isArray(e))return k(e)}function k(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var A={name:`DataView`,extends:C,inheritAttrs:!1,emits:[`update:first`,`update:rows`,`page`],data:function(){return{d_first:this.first,d_rows:this.rows}},watch:{first:function(e){this.d_first=e},rows:function(e){this.d_rows=e},sortField:function(){this.resetPage()},sortOrder:function(){this.resetPage()}},methods:{getKey:function(e,t){return this.dataKey?y(e,this.dataKey):t},onPage:function(e){this.d_first=e.first,this.d_rows=e.rows,this.$emit(`update:first`,this.d_first),this.$emit(`update:rows`,this.d_rows),this.$emit(`page`,e)},sort:function(){var e=this;if(this.value){var t=w(this.value),n=g();return t.sort(function(t,r){return _(y(t,e.sortField),y(r,e.sortField),e.sortOrder,n)}),t}else return null},resetPage:function(){this.d_first=0,this.$emit(`update:first`,this.d_first)}},computed:{getTotalRecords:function(){return this.totalRecords?this.totalRecords:this.value?this.value.length:0},empty:function(){return!this.value||this.value.length===0},emptyMessageText:function(){var e;return((e=this.$primevue.config)==null||(e=e.locale)==null?void 0:e.emptyMessage)||``},paginatorTop:function(){return this.paginator&&(this.paginatorPosition!==`bottom`||this.paginatorPosition===`both`)},paginatorBottom:function(){return this.paginator&&(this.paginatorPosition!==`top`||this.paginatorPosition===`both`)},items:function(){if(this.value&&this.value.length){var e=this.value;if(e&&e.length&&this.sortField&&(e=this.sort()),this.paginator){var t=this.lazy?0:this.d_first;return e.slice(t,t+this.d_rows)}else return e}else return null}},components:{DVPaginator:x}};function j(r,u,g,_,v,y){var b=t(`DVPaginator`);return a(),c(`div`,i({class:r.cx(`root`)},r.ptmi(`root`)),[r.$slots.header?(a(),c(`div`,i({key:0,class:r.cx(`header`)},r.ptm(`header`)),[d(r.$slots,`header`)],16)):h(``,!0),y.paginatorTop?(a(),p(b,{key:1,rows:v.d_rows,first:v.d_first,totalRecords:y.getTotalRecords,pageLinkSize:r.pageLinkSize,template:r.paginatorTemplate,rowsPerPageOptions:r.rowsPerPageOptions,currentPageReportTemplate:r.currentPageReportTemplate,class:o(r.cx(`pcPaginator`,{position:`top`})),alwaysShow:r.alwaysShowPaginator,onPage:u[0]||=function(e){return y.onPage(e)},unstyled:r.unstyled,pt:r.ptm(`pcPaginator`)},m({_:2},[r.$slots.paginatorcontainer?{name:`container`,fn:f(function(e){return[d(r.$slots,`paginatorcontainer`,{first:e.first,last:e.last,rows:e.rows,page:e.page,pageCount:e.pageCount,pageLinks:e.pageLinks,totalRecords:e.totalRecords,firstPageCallback:e.firstPageCallback,lastPageCallback:e.lastPageCallback,prevPageCallback:e.prevPageCallback,nextPageCallback:e.nextPageCallback,rowChangeCallback:e.rowChangeCallback,changePageCallback:e.changePageCallback})]}),key:`0`}:void 0,r.$slots.paginatorstart?{name:`start`,fn:f(function(){return[d(r.$slots,`paginatorstart`)]}),key:`1`}:void 0,r.$slots.paginatorend?{name:`end`,fn:f(function(){return[d(r.$slots,`paginatorend`)]}),key:`2`}:void 0]),1032,[`rows`,`first`,`totalRecords`,`pageLinkSize`,`template`,`rowsPerPageOptions`,`currentPageReportTemplate`,`class`,`alwaysShow`,`unstyled`,`pt`])):h(``,!0),s(`div`,i({class:r.cx(`content`)},r.ptm(`content`)),[y.empty?(a(),c(`div`,i({key:1,class:r.cx(`emptyMessage`)},r.ptm(`emptyMessage`)),[d(r.$slots,`empty`,{layout:r.layout},function(){return[e(n(y.emptyMessageText),1)]})],16)):(a(),c(l,{key:0},[r.$slots.list&&r.layout===`list`?d(r.$slots,`list`,{key:0,items:y.items}):h(``,!0),r.$slots.grid&&r.layout===`grid`?d(r.$slots,`grid`,{key:1,items:y.items}):h(``,!0)],64))],16),y.paginatorBottom?(a(),p(b,{key:2,rows:v.d_rows,first:v.d_first,totalRecords:y.getTotalRecords,pageLinkSize:r.pageLinkSize,template:r.paginatorTemplate,rowsPerPageOptions:r.rowsPerPageOptions,currentPageReportTemplate:r.currentPageReportTemplate,class:o(r.cx(`pcPaginator`,{position:`bottom`})),alwaysShow:r.alwaysShowPaginator,onPage:u[1]||=function(e){return y.onPage(e)},unstyled:r.unstyled,pt:r.ptm(`pcPaginator`)},m({_:2},[r.$slots.paginatorcontainer?{name:`container`,fn:f(function(e){return[d(r.$slots,`paginatorcontainer`,{first:e.first,last:e.last,rows:e.rows,page:e.page,pageCount:e.pageCount,pageLinks:e.pageLinks,totalRecords:e.totalRecords,firstPageCallback:e.firstPageCallback,lastPageCallback:e.lastPageCallback,prevPageCallback:e.prevPageCallback,nextPageCallback:e.nextPageCallback,rowChangeCallback:e.rowChangeCallback,changePageCallback:e.changePageCallback})]}),key:`0`}:void 0,r.$slots.paginatorstart?{name:`start`,fn:f(function(){return[d(r.$slots,`paginatorstart`)]}),key:`1`}:void 0,r.$slots.paginatorend?{name:`end`,fn:f(function(){return[d(r.$slots,`paginatorend`)]}),key:`2`}:void 0]),1032,[`rows`,`first`,`totalRecords`,`pageLinkSize`,`template`,`rowsPerPageOptions`,`currentPageReportTemplate`,`class`,`alwaysShow`,`unstyled`,`pt`])):h(``,!0),r.$slots.footer?(a(),c(`div`,i({key:3,class:r.cx(`footer`)},r.ptm(`footer`)),[d(r.$slots,`footer`)],16)):h(``,!0)],16)}A.render=j;export{A as default};