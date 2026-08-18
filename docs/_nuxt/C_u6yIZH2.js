import{J as e,Ot as t,P as n,U as r,Ut as i,X as a,_ as o,b as s,j as c,q as l,tt as u,v as d,w as f,x as p}from"./C8bKil6U.js";import{t as m,xt as h}from"./czlGUozm.js";import{t as g}from"./FiooIEjL.js";import{n as _}from"./S_m9Oqws.js";import{t as v}from"./Dj2uvVLm2.js";import y from"./CgMQVtaR2.js";var b=m.extend({name:`splitbutton`,style:`
    .p-splitbutton {
        display: inline-flex;
        position: relative;
        border-radius: dt('splitbutton.border.radius');
    }

    .p-splitbutton-button.p-button {
        border-start-end-radius: 0;
        border-end-end-radius: 0;
        border-inline-end: 0 none;
    }

    .p-splitbutton-button.p-button:focus-visible,
    .p-splitbutton-dropdown.p-button:focus-visible {
        z-index: 1;
    }

    .p-splitbutton-button.p-button:not(:disabled):hover,
    .p-splitbutton-button.p-button:not(:disabled):active {
        border-inline-end: 0 none;
    }

    .p-splitbutton-dropdown.p-button {
        border-start-start-radius: 0;
        border-end-start-radius: 0;
    }

    .p-splitbutton .p-menu {
        min-width: 100%;
    }

    .p-splitbutton-fluid {
        display: flex;
    }

    .p-splitbutton-rounded .p-splitbutton-dropdown.p-button {
        border-start-end-radius: dt('splitbutton.rounded.border.radius');
        border-end-end-radius: dt('splitbutton.rounded.border.radius');
    }

    .p-splitbutton-rounded .p-splitbutton-button.p-button {
        border-start-start-radius: dt('splitbutton.rounded.border.radius');
        border-end-start-radius: dt('splitbutton.rounded.border.radius');
    }

    .p-splitbutton-raised {
        box-shadow: dt('splitbutton.raised.shadow');
    }
`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-splitbutton p-component`,{"p-splitbutton-raised":n.raised,"p-splitbutton-rounded":n.rounded,"p-splitbutton-fluid":t.hasFluid}]},pcButton:`p-splitbutton-button`,pcDropdown:`p-splitbutton-dropdown`}});c(),t();var x={name:`SplitButton`,extends:{name:`BaseSplitButton`,extends:g,props:{label:{type:String,default:null},icon:{type:String,default:null},model:{type:Array,default:null},autoZIndex:{type:Boolean,default:!0},baseZIndex:{type:Number,default:0},appendTo:{type:[String,Object],default:`body`},disabled:{type:Boolean,default:!1},fluid:{type:Boolean,default:null},class:{type:null,default:null},style:{type:null,default:null},buttonProps:{type:null,default:null},menuButtonProps:{type:null,default:null},menuButtonIcon:{type:String,default:void 0},dropdownIcon:{type:String,default:void 0},severity:{type:String,default:null},raised:{type:Boolean,default:!1},rounded:{type:Boolean,default:!1},text:{type:Boolean,default:!1},outlined:{type:Boolean,default:!1},size:{type:String,default:null},plain:{type:Boolean,default:!1}},style:b,provide:function(){return{$pcSplitButton:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`click`],inject:{$pcFluid:{default:null}},data:function(){return{isExpanded:!1}},mounted:function(){var e=this;this.$watch(`$refs.menu.visible`,function(t){e.isExpanded=t})},methods:{onDropdownButtonClick:function(e){e&&e.preventDefault(),this.$refs.menu.toggle({currentTarget:this.$el,relatedTarget:this.$refs.button.$el}),this.isExpanded=this.$refs.menu.visible},onDropdownKeydown:function(e){(e.code===`ArrowDown`||e.code===`ArrowUp`)&&(this.onDropdownButtonClick(),e.preventDefault())},onDefaultButtonClick:function(e){this.isExpanded&&this.$refs.menu.hide(e),this.$emit(`click`,e)}},computed:{containerClass:function(){return[this.cx(`root`),this.class]},hasFluid:function(){return h(this.fluid)?!!this.$pcFluid:this.fluid}},components:{PVSButton:_,PVSMenu:y,ChevronDownIcon:v}},S=[`data-p-severity`];function C(t,c,m,h,g,_){var v=e(`PVSButton`),y=e(`PVSMenu`);return r(),s(`div`,n({class:_.containerClass,style:t.style},t.ptmi(`root`),{"data-p-severity":t.severity}),[f(v,n({type:`button`,class:t.cx(`pcButton`),label:t.label,disabled:t.disabled,severity:t.severity,text:t.text,icon:t.icon,outlined:t.outlined,size:t.size,fluid:t.fluid,"aria-label":t.label,onClick:_.onDefaultButtonClick},t.buttonProps,{pt:t.ptm(`pcButton`),unstyled:t.unstyled}),p({default:u(function(){return[l(t.$slots,`default`)]}),_:2},[t.$slots.icon?{name:`icon`,fn:u(function(e){return[l(t.$slots,`icon`,{class:i(e.class)},function(){return[o(`span`,n({class:[t.icon,e.class]},t.ptm(`pcButton`).icon,{"data-pc-section":`buttonicon`}),null,16)]})]}),key:`0`}:void 0]),1040,[`class`,`label`,`disabled`,`severity`,`text`,`icon`,`outlined`,`size`,`fluid`,`aria-label`,`onClick`,`pt`,`unstyled`]),f(v,n({ref:`button`,type:`button`,class:t.cx(`pcDropdown`),disabled:t.disabled,"aria-haspopup":`true`,"aria-expanded":g.isExpanded,"aria-controls":g.isExpanded?t.$id+`_overlay`:void 0,onClick:_.onDropdownButtonClick,onKeydown:_.onDropdownKeydown,severity:t.severity,text:t.text,outlined:t.outlined,size:t.size,unstyled:t.unstyled},t.menuButtonProps,{pt:t.ptm(`pcDropdown`)}),{icon:u(function(e){return[l(t.$slots,t.$slots.dropdownicon?`dropdownicon`:`menubuttonicon`,{class:i(e.class)},function(){return[(r(),d(a(t.menuButtonIcon||t.dropdownIcon?`span`:`ChevronDownIcon`),n({class:[t.dropdownIcon||t.menuButtonIcon,e.class]},t.ptm(`pcDropdown`).icon,{"data-pc-section":`menubuttonicon`}),null,16,[`class`]))]})]}),_:3},16,[`class`,`disabled`,`aria-expanded`,`aria-controls`,`onClick`,`onKeydown`,`severity`,`text`,`outlined`,`size`,`unstyled`,`pt`]),f(y,{ref:`menu`,id:t.$id+`_overlay`,model:t.model,popup:!0,autoZIndex:t.autoZIndex,baseZIndex:t.baseZIndex,appendTo:t.appendTo,unstyled:t.unstyled,pt:t.ptm(`pcMenu`)},p({_:2},[t.$slots.menuitemicon?{name:`itemicon`,fn:u(function(e){return[l(t.$slots,`menuitemicon`,{item:e.item,class:i(e.class)})]}),key:`0`}:void 0,t.$slots.item?{name:`item`,fn:u(function(e){return[l(t.$slots,`item`,{item:e.item,hasSubmenu:e.hasSubmenu,label:e.label,props:e.props})]}),key:`1`}:void 0]),1032,[`id`,`model`,`autoZIndex`,`baseZIndex`,`appendTo`,`unstyled`,`pt`])],16,S)}x.render=C;export{x as default};