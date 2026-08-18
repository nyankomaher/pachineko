import{J as e,Ot as t,P as n,U as r,Ut as i,X as a,a as o,j as s,q as c,t as l,tt as u,v as d,y as f}from"./C8bKil6U.js";import{a as p,t as m}from"./czlGUozm.js";import{t as h}from"./cO8iUN-n.js";import{t as g}from"./FiooIEjL.js";import{n as _}from"./S_m9Oqws.js";import{t as v}from"./CyBH0TdR2.js";var y=m.extend({name:`scrolltop`,style:`
    .p-scrolltop.p-button {
        position: fixed !important;
        inset-block-end: 20px;
        inset-inline-end: 20px;
    }

    .p-scrolltop-sticky.p-button {
        position: sticky !important;
        display: flex;
        margin-inline-start: auto;
    }

    .p-scrolltop-enter-from {
        opacity: 0;
    }

    .p-scrolltop-enter-active {
        transition: opacity 300ms;
    }

    .p-scrolltop-leave-to {
        opacity: 0;
    }

    .p-scrolltop-leave-active {
        transition: opacity 300ms;
    }
`,classes:{root:function(e){return[`p-scrolltop`,{"p-scrolltop-sticky":e.props.target!==`window`}]},icon:`p-scrolltop-icon`}});s(),o(),t();var b={name:`ScrollTop`,extends:{name:`BaseScrollTop`,extends:g,props:{target:{type:String,default:`window`},threshold:{type:Number,default:400},icon:{type:String,default:void 0},behavior:{type:String,default:`smooth`},buttonProps:{type:Object,default:function(){return{rounded:!0}}}},style:y,provide:function(){return{$pcScrollTop:this,$parentInstance:this}}},inheritAttrs:!1,scrollListener:null,container:null,data:function(){return{visible:!1}},mounted:function(){this.target===`window`?this.bindDocumentScrollListener():this.target===`parent`&&this.bindParentScrollListener()},beforeUnmount:function(){this.target===`window`?this.unbindDocumentScrollListener():this.target===`parent`&&this.unbindParentScrollListener(),this.container&&(h.clear(this.container),this.overlay=null)},methods:{onClick:function(){(this.target===`window`?window:this.$el.parentElement).scroll({top:0,behavior:this.behavior})},checkVisibility:function(e){e>this.threshold?this.visible=!0:this.visible=!1},bindParentScrollListener:function(){var e=this;this.scrollListener=function(){e.checkVisibility(e.$el.parentElement.scrollTop)},this.$el.parentElement.addEventListener(`scroll`,this.scrollListener)},bindDocumentScrollListener:function(){var e=this;this.scrollListener=function(){e.checkVisibility(p())},window.addEventListener(`scroll`,this.scrollListener)},unbindParentScrollListener:function(){this.scrollListener&&=(this.$el.parentElement.removeEventListener(`scroll`,this.scrollListener),null)},unbindDocumentScrollListener:function(){this.scrollListener&&=(window.removeEventListener(`scroll`,this.scrollListener),null)},onEnter:function(e){h.set(`overlay`,e,this.$primevue.config.zIndex.overlay)},onAfterLeave:function(e){h.clear(e)},containerRef:function(e){this.container=e?e.$el:void 0}},computed:{scrollTopAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.scrollTop:void 0}},components:{ChevronUpIcon:v,Button:_}};function x(t,o,s,p,m,h){var g=e(`Button`);return r(),d(l,n({name:`p-scrolltop`,appear:``,onEnter:h.onEnter,onAfterLeave:h.onAfterLeave},t.ptm(`transition`)),{default:u(function(){return[m.visible?(r(),d(g,n({key:0,ref:h.containerRef,class:t.cx(`root`),onClick:h.onClick,"aria-label":h.scrollTopAriaLabel,unstyled:t.unstyled},t.buttonProps,{pt:t.ptm(`root`)}),{icon:u(function(e){return[c(t.$slots,`icon`,{class:i(t.cx(`icon`))},function(){return[(r(),d(a(t.icon?`span`:`ChevronUpIcon`),n({class:[t.cx(`icon`),t.icon,e.class]},t.ptm(`root`).icon,{"data-pc-section":`icon`}),null,16,[`class`]))]})]}),_:3},16,[`class`,`onClick`,`aria-label`,`unstyled`,`pt`])):f(``,!0)]}),_:3},16,[`onEnter`,`onAfterLeave`])}b.render=x;export{b as default};