import{C as e,J as t,Jt as n,K as r,Ot as i,P as a,U as o,Ut as s,X as c,Y as l,_ as u,a as d,b as f,d as p,j as m,nt as h,q as g,t as _,tt as v,v as y,w as b,y as x}from"./C8bKil6U.js";import{B as S,D as C,F as w,P as T,Q as E,St as D,et as O,l as k,t as A}from"./czlGUozm.js";import{t as j}from"./CRHlWn3X.js";import{t as M}from"./cO8iUN-n.js";import{t as N}from"./FiooIEjL.js";import{t as P}from"./Dt0c0nKr.js";import{t as F}from"./CIS0k65p.js";import{t as I}from"./BcqfQMni2.js";import{t as L}from"./ZxzoJfzS2.js";var R=A.extend({name:`menu`,style:`
    .p-menu {
        background: dt('menu.background');
        color: dt('menu.color');
        border: 1px solid dt('menu.border.color');
        border-radius: dt('menu.border.radius');
        min-width: 12.5rem;
    }

    .p-menu-list {
        margin: 0;
        padding: dt('menu.list.padding');
        outline: 0 none;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: dt('menu.list.gap');
    }

    .p-menu-item-content {
        transition:
            background dt('menu.transition.duration'),
            color dt('menu.transition.duration');
        border-radius: dt('menu.item.border.radius');
        color: dt('menu.item.color');
        overflow: hidden;
    }

    .p-menu-item-link {
        cursor: pointer;
        display: flex;
        align-items: center;
        text-decoration: none;
        overflow: hidden;
        position: relative;
        color: inherit;
        padding: dt('menu.item.padding');
        gap: dt('menu.item.gap');
        user-select: none;
        outline: 0 none;
    }

    .p-menu-item-label {
        line-height: 1;
    }

    .p-menu-item-icon {
        color: dt('menu.item.icon.color');
    }

    .p-menu-item.p-focus .p-menu-item-content {
        color: dt('menu.item.focus.color');
        background: dt('menu.item.focus.background');
    }

    .p-menu-item.p-focus .p-menu-item-icon {
        color: dt('menu.item.icon.focus.color');
    }

    .p-menu-item:not(.p-disabled) .p-menu-item-content:hover {
        color: dt('menu.item.focus.color');
        background: dt('menu.item.focus.background');
    }

    .p-menu-item:not(.p-disabled) .p-menu-item-content:hover .p-menu-item-icon {
        color: dt('menu.item.icon.focus.color');
    }

    .p-menu-overlay {
        box-shadow: dt('menu.shadow');
    }

    .p-menu-submenu-label {
        background: dt('menu.submenu.label.background');
        padding: dt('menu.submenu.label.padding');
        color: dt('menu.submenu.label.color');
        font-weight: dt('menu.submenu.label.font.weight');
    }

    .p-menu-separator {
        border-block-start: 1px solid dt('menu.separator.border.color');
    }
`,classes:{root:function(e){return[`p-menu p-component`,{"p-menu-overlay":e.props.popup}]},start:`p-menu-start`,list:`p-menu-list`,submenuLabel:`p-menu-submenu-label`,separator:`p-menu-separator`,end:`p-menu-end`,item:function(e){var t=e.instance;return[`p-menu-item`,{"p-focus":t.id===t.focusedOptionId,"p-disabled":t.disabled()}]},itemContent:`p-menu-item-content`,itemLink:`p-menu-item-link`,itemIcon:`p-menu-item-icon`,itemLabel:`p-menu-item-label`}});m(),i(),d();var z={name:`BaseMenu`,extends:N,props:{popup:{type:Boolean,default:!1},model:{type:Array,default:null},appendTo:{type:[String,Object],default:`body`},autoZIndex:{type:Boolean,default:!0},baseZIndex:{type:Number,default:0},tabindex:{type:Number,default:0},ariaLabel:{type:String,default:null},ariaLabelledby:{type:String,default:null}},style:R,provide:function(){return{$pcMenu:this,$parentInstance:this}}},B={name:`Menuitem`,hostName:`Menu`,extends:N,inheritAttrs:!1,emits:[`item-click`,`item-mousemove`],props:{item:null,templates:null,id:null,focusedOptionId:null,index:null},methods:{getItemProp:function(e,t){return e&&e.item?D(e.item[t]):void 0},getPTOptions:function(e){return this.ptm(e,{context:{item:this.item,index:this.index,focused:this.isItemFocused(),disabled:this.disabled()}})},isItemFocused:function(){return this.focusedOptionId===this.id},onItemClick:function(e){var t=this.getItemProp(this.item,`command`);t&&t({originalEvent:e,item:this.item.item}),this.$emit(`item-click`,{originalEvent:e,item:this.item,id:this.id})},onItemMouseMove:function(e){this.$emit(`item-mousemove`,{originalEvent:e,item:this.item,id:this.id})},visible:function(){return typeof this.item.visible==`function`?this.item.visible():this.item.visible!==!1},disabled:function(){return typeof this.item.disabled==`function`?this.item.disabled():this.item.disabled},label:function(){return typeof this.item.label==`function`?this.item.label():this.item.label},getMenuItemProps:function(e){return{action:a({class:this.cx(`itemLink`),tabindex:`-1`},this.getPTOptions(`itemLink`)),icon:a({class:[this.cx(`itemIcon`),e.icon]},this.getPTOptions(`itemIcon`)),label:a({class:this.cx(`itemLabel`)},this.getPTOptions(`itemLabel`))}}},computed:{dataP:function(){return j({focus:this.isItemFocused(),disabled:this.disabled()})}},directives:{ripple:P}},V=[`id`,`aria-label`,`aria-disabled`,`data-p-focused`,`data-p-disabled`,`data-p`],H=[`data-p`],U=[`href`,`target`],W=[`data-p`],G=[`data-p`];function K(e,t,r,i,d,p){var m=l(`ripple`);return p.visible()?(o(),f(`li`,a({key:0,id:r.id,class:[e.cx(`item`),r.item.class],role:`menuitem`,style:r.item.style,"aria-label":p.label(),"aria-disabled":p.disabled(),"data-p-focused":p.isItemFocused(),"data-p-disabled":p.disabled()||!1,"data-p":p.dataP},p.getPTOptions(`item`)),[u(`div`,a({class:e.cx(`itemContent`),onClick:t[0]||=function(e){return p.onItemClick(e)},onMousemove:t[1]||=function(e){return p.onItemMouseMove(e)},"data-p":p.dataP},p.getPTOptions(`itemContent`)),[r.templates.item?r.templates.item?(o(),y(c(r.templates.item),{key:1,item:r.item,label:p.label(),props:p.getMenuItemProps(r.item)},null,8,[`item`,`label`,`props`])):x(``,!0):h((o(),f(`a`,a({key:0,href:r.item.url,class:e.cx(`itemLink`),target:r.item.target,tabindex:`-1`},p.getPTOptions(`itemLink`)),[r.templates.itemicon?(o(),y(c(r.templates.itemicon),{key:0,item:r.item,class:s(e.cx(`itemIcon`))},null,8,[`item`,`class`])):r.item.icon?(o(),f(`span`,a({key:1,class:[e.cx(`itemIcon`),r.item.icon],"data-p":p.dataP},p.getPTOptions(`itemIcon`)),null,16,W)):x(``,!0),u(`span`,a({class:e.cx(`itemLabel`),"data-p":p.dataP},p.getPTOptions(`itemLabel`)),n(p.label()),17,G)],16,U)),[[m]])],16,H)],16,V)):x(``,!0)}B.render=K;function q(e){return Z(e)||X(e)||Y(e)||J()}function J(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Y(e,t){if(e){if(typeof e==`string`)return Q(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Q(e,t):void 0}}function X(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function Z(e){if(Array.isArray(e))return Q(e)}function Q(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var $={name:`Menu`,extends:z,inheritAttrs:!1,emits:[`show`,`hide`,`focus`,`blur`],data:function(){return{overlayVisible:!1,focused:!1,focusedOptionIndex:-1,selectedOptionIndex:-1}},target:null,outsideClickListener:null,scrollHandler:null,resizeListener:null,container:null,list:null,mounted:function(){this.popup||(this.bindResizeListener(),this.bindOutsideClickListener())},beforeUnmount:function(){this.unbindResizeListener(),this.unbindOutsideClickListener(),this.scrollHandler&&=(this.scrollHandler.destroy(),null),this.target=null,this.container&&this.autoZIndex&&M.clear(this.container),this.container=null},methods:{itemClick:function(e){var t=e.item;this.disabled(t)||(t.command&&t.command(e),this.overlayVisible&&this.hide(),!this.popup&&this.focusedOptionIndex!==e.id&&(this.focusedOptionIndex=e.id))},itemMouseMove:function(e){this.focused&&(this.focusedOptionIndex=e.id)},onListFocus:function(e){this.focused=!0,!this.popup&&this.changeFocusedOptionIndex(0),this.$emit(`focus`,e)},onListBlur:function(e){this.focused=!1,this.focusedOptionIndex=-1,this.$emit(`blur`,e)},onListKeyDown:function(e){switch(e.code){case`ArrowDown`:this.onArrowDownKey(e);break;case`ArrowUp`:this.onArrowUpKey(e);break;case`Home`:this.onHomeKey(e);break;case`End`:this.onEndKey(e);break;case`Enter`:case`NumpadEnter`:this.onEnterKey(e);break;case`Space`:this.onSpaceKey(e);break;case`Escape`:this.popup&&(S(this.target),this.hide());case`Tab`:this.overlayVisible&&this.hide();break}},onArrowDownKey:function(e){var t=this.findNextOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(t),e.preventDefault()},onArrowUpKey:function(e){if(e.altKey&&this.popup)S(this.target),this.hide(),e.preventDefault();else{var t=this.findPrevOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(t),e.preventDefault()}},onHomeKey:function(e){this.changeFocusedOptionIndex(0),e.preventDefault()},onEndKey:function(e){this.changeFocusedOptionIndex(T(this.container,`li[data-pc-section="item"][data-p-disabled="false"]`).length-1),e.preventDefault()},onEnterKey:function(e){var t=O(this.list,`li[id="${`${this.focusedOptionIndex}`}"]`),n=t&&O(t,`a[data-pc-section="itemlink"]`);this.popup&&S(this.target),n?n.click():t&&t.click(),e.preventDefault()},onSpaceKey:function(e){this.onEnterKey(e)},findNextOptionIndex:function(e){var t=q(T(this.container,`li[data-pc-section="item"][data-p-disabled="false"]`)).findIndex(function(t){return t.id===e});return t>-1?t+1:0},findPrevOptionIndex:function(e){var t=q(T(this.container,`li[data-pc-section="item"][data-p-disabled="false"]`)).findIndex(function(t){return t.id===e});return t>-1?t-1:0},changeFocusedOptionIndex:function(e){var t=T(this.container,`li[data-pc-section="item"][data-p-disabled="false"]`),n=e>=t.length?t.length-1:e<0?0:e;n>-1&&(this.focusedOptionIndex=t[n].getAttribute(`id`))},toggle:function(e,t){this.overlayVisible?this.hide():this.show(e,t)},show:function(e,t){this.overlayVisible=!0,this.target=t??e.currentTarget},hide:function(){this.overlayVisible=!1,this.target=null},onEnter:function(e){C(e,{position:`absolute`,top:`0`}),this.alignOverlay(),this.bindOutsideClickListener(),this.bindResizeListener(),this.bindScrollListener(),this.autoZIndex&&M.set(`menu`,e,this.baseZIndex||this.$primevue.config.zIndex.menu),this.popup&&S(this.list),this.$emit(`show`)},onLeave:function(){this.unbindOutsideClickListener(),this.unbindResizeListener(),this.unbindScrollListener(),this.$emit(`hide`)},onAfterLeave:function(e){this.autoZIndex&&M.clear(e)},alignOverlay:function(){k(this.container,this.target),E(this.target)>E(this.container)&&(this.container.style.minWidth=E(this.target)+`px`)},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(t){var n=e.container&&!e.container.contains(t.target),r=!(e.target&&(e.target===t.target||e.target.contains(t.target)));e.overlayVisible&&n&&r?e.hide():!e.popup&&n&&r&&(e.focusedOptionIndex=-1)},document.addEventListener(`click`,this.outsideClickListener,!0))},unbindOutsideClickListener:function(){this.outsideClickListener&&=(document.removeEventListener(`click`,this.outsideClickListener,!0),null)},bindScrollListener:function(){var e=this;this.scrollHandler||=new I(this.target,function(){e.overlayVisible&&e.hide()}),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(){e.overlayVisible&&!w()&&e.hide()},window.addEventListener(`resize`,this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&=(window.removeEventListener(`resize`,this.resizeListener),null)},visible:function(e){return typeof e.visible==`function`?e.visible():e.visible!==!1},disabled:function(e){return typeof e.disabled==`function`?e.disabled():e.disabled},label:function(e){return typeof e.label==`function`?e.label():e.label},onOverlayClick:function(e){L.emit(`overlay-click`,{originalEvent:e,target:this.target})},containerRef:function(e){this.container=e},listRef:function(e){this.list=e}},computed:{focusedOptionId:function(){return this.focusedOptionIndex===-1?null:this.focusedOptionIndex},dataP:function(){return j({popup:this.popup})}},components:{PVMenuitem:B,Portal:F}},ee=[`id`,`data-p`],te=[`id`,`tabindex`,`aria-activedescendant`,`aria-label`,`aria-labelledby`],ne=[`id`];function re(i,s,c,l,d,m){var h=t(`PVMenuitem`),S=t(`Portal`);return o(),y(S,{appendTo:i.appendTo,disabled:!i.popup},{default:v(function(){return[b(_,a({name:`p-anchored-overlay`,onEnter:m.onEnter,onLeave:m.onLeave,onAfterLeave:m.onAfterLeave},i.ptm(`transition`)),{default:v(function(){return[!i.popup||d.overlayVisible?(o(),f(`div`,a({key:0,ref:m.containerRef,id:i.$id,class:i.cx(`root`),onClick:s[3]||=function(){return m.onOverlayClick&&m.onOverlayClick.apply(m,arguments)},"data-p":m.dataP},i.ptmi(`root`)),[i.$slots.start?(o(),f(`div`,a({key:0,class:i.cx(`start`)},i.ptm(`start`)),[g(i.$slots,`start`)],16)):x(``,!0),u(`ul`,a({ref:m.listRef,id:i.$id+`_list`,class:i.cx(`list`),role:`menu`,tabindex:i.tabindex,"aria-activedescendant":d.focused?m.focusedOptionId:void 0,"aria-label":i.ariaLabel,"aria-labelledby":i.ariaLabelledby,onFocus:s[0]||=function(){return m.onListFocus&&m.onListFocus.apply(m,arguments)},onBlur:s[1]||=function(){return m.onListBlur&&m.onListBlur.apply(m,arguments)},onKeydown:s[2]||=function(){return m.onListKeyDown&&m.onListKeyDown.apply(m,arguments)}},i.ptm(`list`)),[(o(!0),f(p,null,r(i.model,function(t,s){return o(),f(p,{key:m.label(t)+s.toString()},[t.items&&m.visible(t)&&!t.separator?(o(),f(p,{key:0},[t.items?(o(),f(`li`,a({key:0,id:i.$id+`_`+s,class:[i.cx(`submenuLabel`),t.class],role:`none`},{ref_for:!0},i.ptm(`submenuLabel`)),[g(i.$slots,i.$slots.submenulabel?`submenulabel`:`submenuheader`,{item:t},function(){return[e(n(m.label(t)),1)]})],16,ne)):x(``,!0),(o(!0),f(p,null,r(t.items,function(e,n){return o(),f(p,{key:e.label+s+`_`+n},[m.visible(e)&&!e.separator?(o(),y(h,{key:0,id:i.$id+`_`+s+`_`+n,item:e,templates:i.$slots,focusedOptionId:m.focusedOptionId,unstyled:i.unstyled,onItemClick:m.itemClick,onItemMousemove:m.itemMouseMove,pt:i.pt},null,8,[`id`,`item`,`templates`,`focusedOptionId`,`unstyled`,`onItemClick`,`onItemMousemove`,`pt`])):m.visible(e)&&e.separator?(o(),f(`li`,a({key:`separator`+s+n,class:[i.cx(`separator`),t.class],style:e.style,role:`separator`},{ref_for:!0},i.ptm(`separator`)),null,16)):x(``,!0)],64)}),128))],64)):m.visible(t)&&t.separator?(o(),f(`li`,a({key:`separator`+s.toString(),class:[i.cx(`separator`),t.class],style:t.style,role:`separator`},{ref_for:!0},i.ptm(`separator`)),null,16)):(o(),y(h,{key:m.label(t)+s.toString(),id:i.$id+`_`+s,item:t,index:s,templates:i.$slots,focusedOptionId:m.focusedOptionId,unstyled:i.unstyled,onItemClick:m.itemClick,onItemMousemove:m.itemMouseMove,pt:i.pt},null,8,[`id`,`item`,`index`,`templates`,`focusedOptionId`,`unstyled`,`onItemClick`,`onItemMousemove`,`pt`]))],64)}),128))],16,te),i.$slots.end?(o(),f(`div`,a({key:1,class:i.cx(`end`)},i.ptm(`end`)),[g(i.$slots,`end`)],16)):x(``,!0)],16,ee)):x(``,!0)]}),_:3},16,[`onEnter`,`onLeave`,`onAfterLeave`])]}),_:3},8,[`appendTo`,`disabled`])}$.render=re;export{$ as default};