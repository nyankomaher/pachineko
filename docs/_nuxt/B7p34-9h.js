import{J as e,K as t,Ot as n,P as r,U as i,Ut as a,X as o,Y as s,_ as c,b as l,d as u,j as d,nt as f,v as p,w as m}from"./C8bKil6U.js";import{P as h,St as g,et as _,t as v}from"./czlGUozm.js";import{t as y}from"./FiooIEjL.js";import{t as b}from"./Dt0c0nKr.js";import{t as x}from"./C4YRIckR.js";var S=v.extend({name:`dock`,style:`
    .p-dock {
        position: absolute;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: none;
    }

    .p-dock-list-container {
        display: flex;
        pointer-events: auto;
        background: dt('dock.background');
        border: 1px solid dt('dock.border.color');
        padding: dt('dock.padding');
        border-radius: dt('dock.border.radius');
    }

    .p-dock-list {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: 0 none;
    }

    .p-dock-item {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: transform;
        padding: dt('dock.item.padding');
        border-radius: dt('dock.item.border.radius');
    }

    .p-dock-item.p-focus {
        box-shadow: dt('dock.item.focus.ring.shadow');
        outline: dt('dock.item.focus.ring.width') dt('dock.item.focus.ring.style') dt('dock.item.focus.ring.color');
        outline-offset: dt('dock.item.focus.ring.offset');
    }

    .p-dock-item-link {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
        cursor: default;
        width: dt('dock.item.size');
        height: dt('dock.item.size');
    }

    .p-dock-top {
        left: 0;
        top: 0;
        width: 100%;
    }

    .p-dock-bottom {
        left: 0;
        bottom: 0;
        width: 100%;
    }

    .p-dock-right {
        right: 0;
        top: 0;
        height: 100%;
    }

    .p-dock-right .p-dock-list {
        flex-direction: column;
    }

    .p-dock-left {
        left: 0;
        top: 0;
        height: 100%;
    }

    .p-dock-left .p-dock-list {
        flex-direction: column;
    }

    .p-dock-mobile.p-dock-top .p-dock-list-container,
    .p-dock-mobile.p-dock-bottom .p-dock-list-container {
        overflow-x: auto;
        width: 100%;
    }

    .p-dock-mobile.p-dock-top .p-dock-list-container .p-dock-list,
    .p-dock-mobile.p-dock-bottom .p-dock-list-container .p-dock-list {
        margin: 0 auto;
    }

    .p-dock-mobile.p-dock-left .p-dock-list-container,
    .p-dock-mobile.p-dock-right .p-dock-list-container {
        overflow-y: auto;
        height: 100%;
    }

    .p-dock-mobile.p-dock-left .p-dock-list-container .p-dock-list,
    .p-dock-mobile.p-dock-right .p-dock-list-container .p-dock-list {
        margin: auto 0;
    }

    .p-dock-mobile .p-dock-list .p-dock-item {
        transform: none;
        margin: 0;
    }
`,classes:{root:function(e){var t=e.instance;return[`p-dock p-component`,`p-dock-${e.props.position}`,{"p-dock-mobile":t.queryMatches}]},listContainer:`p-dock-list-container`,list:`p-dock-list`,item:function(e){var t=e.instance,n=e.processedItem,r=e.id;return[`p-dock-item`,{"p-focus":t.isItemActive(r),"p-disabled":t.disabled(n)}]},itemContent:`p-dock-item-content`,itemLink:`p-dock-item-link`,itemIcon:`p-dock-item-icon`}});d(),n();var C={name:`BaseDock`,extends:y,props:{position:{type:String,default:`bottom`},model:null,class:null,style:null,tooltipOptions:null,menuId:{type:String,default:null},tabindex:{type:Number,default:0},breakpoint:{type:String,default:`960px`},ariaLabel:{type:String,default:null},ariaLabelledby:{type:String,default:null}},style:S,provide:function(){return{$pcDock:this,$parentInstance:this}}};function w(e){return O(e)||D(e)||E(e)||T()}function T(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function E(e,t){if(e){if(typeof e==`string`)return k(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?k(e,t):void 0}}function D(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function O(e){if(Array.isArray(e))return k(e)}function k(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var A={name:`DockSub`,hostName:`Dock`,extends:y,emits:[`focus`,`blur`],props:{position:{type:String,default:`bottom`},model:{type:Array,default:null},templates:{type:null,default:null},tooltipOptions:null,menuId:{type:String,default:null},tabindex:{type:Number,default:0},ariaLabel:{type:String,default:null},ariaLabelledby:{type:String,default:null}},data:function(){return{currentIndex:-3,focused:!1,focusedOptionIndex:-1}},methods:{getItemId:function(e){return`${this.idx}_${e}`},getItemProp:function(e,t){return e&&e.item?g(e.item[t]):void 0},getPTOptions:function(e,t,n){return this.ptm(e,{context:{index:n,item:t,active:this.isItemActive(this.getItemId(n))}})},isSameMenuItem:function(e){return e.currentTarget&&(e.currentTarget.isSameNode(e.target)||e.currentTarget.isSameNode(e.target.closest(`[data-pc-section="item"]`)))},isItemActive:function(e){return e===this.focusedOptionIndex},onListMouseLeave:function(){this.currentIndex=-3},onItemMouseEnter:function(e){this.currentIndex=e},onItemClick:function(e,t){if(this.isSameMenuItem(e)){var n=this.getItemProp(t,`command`);n&&n({originalEvent:e,item:t.item})}},onListFocus:function(e){this.focused=!0,this.changeFocusedOptionIndex(0),this.$emit(`focus`,e)},onListBlur:function(e){this.focused=!1,this.focusedOptionIndex=-1,this.$emit(`blur`,e)},onListKeyDown:function(e){switch(e.code){case`ArrowDown`:(this.position===`left`||this.position===`right`)&&this.onArrowDownKey(),e.preventDefault();break;case`ArrowUp`:(this.position===`left`||this.position===`right`)&&this.onArrowUpKey(),e.preventDefault();break;case`ArrowRight`:(this.position===`top`||this.position===`bottom`)&&this.onArrowDownKey(),e.preventDefault();break;case`ArrowLeft`:(this.position===`top`||this.position===`bottom`)&&this.onArrowUpKey(),e.preventDefault();break;case`Home`:this.onHomeKey(),e.preventDefault();break;case`End`:this.onEndKey(),e.preventDefault();break;case`Enter`:case`NumpadEnter`:case`Space`:this.onSpaceKey(e),e.preventDefault();break}},onArrowDownKey:function(){var e=this.findNextOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(e)},onArrowUpKey:function(){var e=this.findPrevOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(e)},onHomeKey:function(){this.changeFocusedOptionIndex(0)},onEndKey:function(){this.changeFocusedOptionIndex(h(this.$refs.list,`li[data-pc-section="item"][data-p-disabled="false"]`).length-1)},onSpaceKey:function(){var e=_(this.$refs.list,`li[id="${`${this.focusedOptionIndex}`}"]`),t=e&&_(e,`[data-pc-section="itemlink"]`);t?t.click():e&&e.click()},findNextOptionIndex:function(e){var t=w(h(this.$refs.list,`li[data-pc-section="item"][data-p-disabled="false"]`)).findIndex(function(t){return t.id===e});return t>-1?t+1:0},findPrevOptionIndex:function(e){var t=w(h(this.$refs.list,`li[data-pc-section="item"][data-p-disabled="false"]`)).findIndex(function(t){return t.id===e});return t>-1?t-1:0},changeFocusedOptionIndex:function(e){var t=h(this.$refs.list,`li[data-pc-section="item"][data-p-disabled="false"]`),n=e>=t.length?t.length-1:e<0?0:e;this.focusedOptionIndex=t[n].getAttribute(`id`)},disabled:function(e){return typeof e.disabled==`function`?e.disabled():e.disabled},getMenuItemProps:function(e,t){return{action:r({tabindex:-1,class:this.cx(`itemLink`)},this.getPTOptions(`itemLink`,e,t)),icon:r({class:[this.cx(`itemIcon`),e.icon]},this.getPTOptions(`itemIcon`,e,t))}}},computed:{focusedOptionId:function(){return this.focusedOptionIndex===-1?null:this.focusedOptionIndex},idx:function(){return this.menuId||this.$id}},directives:{ripple:b,tooltip:x}},j=[`id`,`aria-orientation`,`aria-activedescendant`,`tabindex`,`aria-label`,`aria-labelledby`],M=[`id`,`aria-label`,`aria-disabled`,`onClick`,`onMouseenter`,`data-p-focused`,`data-p-disabled`],N=[`href`,`target`];function P(e,n,d,m,h,g){var _=s(`ripple`),v=s(`tooltip`);return i(),l(`div`,r({class:e.cx(`listContainer`)},e.ptm(`listContainer`)),[c(`ul`,r({ref:`list`,id:g.idx,class:e.cx(`list`),role:`menu`,"aria-orientation":d.position===`bottom`||d.position===`top`?`horizontal`:`vertical`,"aria-activedescendant":h.focused?g.focusedOptionId:void 0,tabindex:d.tabindex,"aria-label":d.ariaLabel,"aria-labelledby":d.ariaLabelledby,onFocus:n[0]||=function(){return g.onListFocus&&g.onListFocus.apply(g,arguments)},onBlur:n[1]||=function(){return g.onListBlur&&g.onListBlur.apply(g,arguments)},onKeydown:n[2]||=function(){return g.onListKeyDown&&g.onListKeyDown.apply(g,arguments)},onMouseleave:n[3]||=function(){return g.onListMouseLeave&&g.onListMouseLeave.apply(g,arguments)}},e.ptm(`list`)),[(i(!0),l(u,null,t(d.model,function(t,n){return i(),l(`li`,r({key:n,id:g.getItemId(n),class:e.cx(`item`,{processedItem:t,id:g.getItemId(n)}),role:`menuitem`,"aria-label":t.label,"aria-disabled":g.disabled(t),onClick:function(e){return g.onItemClick(e,t)},onMouseenter:function(e){return g.onItemMouseEnter(n)}},{ref_for:!0},g.getPTOptions(`item`,t,n),{"data-p-focused":g.isItemActive(g.getItemId(n)),"data-p-disabled":g.disabled(t)||!1}),[c(`div`,r({class:e.cx(`itemContent`)},{ref_for:!0},g.getPTOptions(`itemContent`,t,n)),[d.templates.item?(i(),p(o(d.templates.item),{key:1,item:t,index:n,label:t.label,props:g.getMenuItemProps(t,n)},null,8,[`item`,`index`,`label`,`props`])):f((i(),l(`a`,r({key:0,href:t.url,class:e.cx(`itemLink`),target:t.target,tabindex:`-1`},{ref_for:!0},g.getPTOptions(`itemLink`,t,n)),[!d.templates.icon&&!d.templates.itemicon?f((i(),l(`span`,r({key:0,class:[e.cx(`itemIcon`),t.icon]},{ref_for:!0},g.getPTOptions(`itemIcon`,t,n)),null,16)),[[_]]):(i(),p(o(d.templates.icon||d.templates.itemicon),{key:1,item:t,class:a(e.cx(`itemIcon`))},null,8,[`item`,`class`]))],16,N)),[[v,{value:t.label,disabled:!d.tooltipOptions},d.tooltipOptions]])],16)],16,M)}),128))],16,j)],16)}A.render=P;var F={name:`Dock`,extends:C,inheritAttrs:!1,matchMediaListener:null,data:function(){return{query:null,queryMatches:!1}},mounted:function(){this.bindMatchMediaListener()},beforeUnmount:function(){this.unbindMatchMediaListener()},methods:{bindMatchMediaListener:function(){var e=this;if(!this.matchMediaListener){var t=matchMedia(`(max-width: ${this.breakpoint})`);this.query=t,this.queryMatches=t.matches,this.matchMediaListener=function(){e.queryMatches=t.matches,e.mobileActive=!1},this.query.addEventListener(`change`,this.matchMediaListener)}},unbindMatchMediaListener:function(){this.matchMediaListener&&=(this.query.removeEventListener(`change`,this.matchMediaListener),null)}},computed:{containerClass:function(){return[this.class,this.cx(`root`)]}},components:{DockSub:A}};function I(t,n,a,o,s,c){var u=e(`DockSub`);return i(),l(`div`,r({class:c.containerClass,style:t.style},t.ptmi(`root`)),[m(u,{model:t.model,templates:t.$slots,tooltipOptions:t.tooltipOptions,position:t.position,menuId:t.menuId,"aria-label":t.ariaLabel,"aria-labelledby":t.ariaLabelledby,tabindex:t.tabindex,pt:t.pt,unstyled:t.unstyled},null,8,[`model`,`templates`,`tooltipOptions`,`position`,`menuId`,`aria-label`,`aria-labelledby`,`tabindex`,`pt`,`unstyled`])],16)}F.render=I;export{F as default};