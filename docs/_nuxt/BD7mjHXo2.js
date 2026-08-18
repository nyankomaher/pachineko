import{J as e,Jt as t,K as n,Ot as r,P as i,U as a,Ut as o,X as s,Y as c,_ as l,a as u,b as d,d as f,j as p,nt as m,t as h,tt as g,v as _,w as v,y}from"./C8bKil6U.js";import{B as b,D as x,Et as S,F as C,St as w,W as T,ct as E,et as D,f as O,g as k,st as A,t as j,tt as M,xt as N}from"./czlGUozm.js";import{t as P}from"./cO8iUN-n.js";import{t as F}from"./FiooIEjL.js";import{t as I}from"./Dt0c0nKr.js";import{t as L}from"./CIS0k65p.js";import{t as R}from"./CKEJIYsq.js";var z=j.extend({name:`contextmenu`,style:`
    .p-contextmenu {
        background: dt('contextmenu.background');
        color: dt('contextmenu.color');
        border: 1px solid dt('contextmenu.border.color');
        border-radius: dt('contextmenu.border.radius');
        box-shadow: dt('contextmenu.shadow');
        min-width: 12.5rem;
    }

    .p-contextmenu-root-list,
    .p-contextmenu-submenu {
        margin: 0;
        padding: dt('contextmenu.list.padding');
        list-style: none;
        outline: 0 none;
        display: flex;
        flex-direction: column;
        gap: dt('contextmenu.list.gap');
    }

    .p-contextmenu-submenu {
        position: absolute;
        display: flex;
        flex-direction: column;
        min-width: 100%;
        z-index: 1;
        background: dt('contextmenu.background');
        color: dt('contextmenu.color');
        border: 1px solid dt('contextmenu.border.color');
        border-radius: dt('contextmenu.border.radius');
        box-shadow: dt('contextmenu.shadow');
    }

    .p-contextmenu-item {
        position: relative;
    }

    .p-contextmenu-item-content {
        transition:
            background dt('contextmenu.transition.duration'),
            color dt('contextmenu.transition.duration');
        border-radius: dt('contextmenu.item.border.radius');
        color: dt('contextmenu.item.color');
    }

    .p-contextmenu-item-link {
        cursor: pointer;
        display: flex;
        align-items: center;
        text-decoration: none;
        overflow: hidden;
        position: relative;
        color: inherit;
        padding: dt('contextmenu.item.padding');
        gap: dt('contextmenu.item.gap');
        user-select: none;
    }

    .p-contextmenu-item-label {
        line-height: 1;
    }

    .p-contextmenu-item-icon {
        color: dt('contextmenu.item.icon.color');
    }

    .p-contextmenu-submenu-icon {
        color: dt('contextmenu.submenu.icon.color');
        margin-left: auto;
        font-size: dt('contextmenu.submenu.icon.size');
        width: dt('contextmenu.submenu.icon.size');
        height: dt('contextmenu.submenu.icon.size');
    }

    .p-contextmenu-submenu-icon:dir(rtl) {
        margin-left: 0;
        margin-right: auto;
    }

    .p-contextmenu-item.p-focus > .p-contextmenu-item-content {
        color: dt('contextmenu.item.focus.color');
        background: dt('contextmenu.item.focus.background');
    }

    .p-contextmenu-item.p-focus > .p-contextmenu-item-content .p-contextmenu-item-icon {
        color: dt('contextmenu.item.icon.focus.color');
    }

    .p-contextmenu-item.p-focus > .p-contextmenu-item-content .p-contextmenu-submenu-icon {
        color: dt('contextmenu.submenu.icon.focus.color');
    }

    .p-contextmenu-item:not(.p-disabled) > .p-contextmenu-item-content:hover {
        color: dt('contextmenu.item.focus.color');
        background: dt('contextmenu.item.focus.background');
    }

    .p-contextmenu-item:not(.p-disabled) > .p-contextmenu-item-content:hover .p-contextmenu-item-icon {
        color: dt('contextmenu.item.icon.focus.color');
    }

    .p-contextmenu-item:not(.p-disabled) > .p-contextmenu-item-content:hover .p-contextmenu-submenu-icon {
        color: dt('contextmenu.submenu.icon.focus.color');
    }

    .p-contextmenu-item-active > .p-contextmenu-item-content {
        color: dt('contextmenu.item.active.color');
        background: dt('contextmenu.item.active.background');
    }

    .p-contextmenu-item-active > .p-contextmenu-item-content .p-contextmenu-item-icon {
        color: dt('contextmenu.item.icon.active.color');
    }

    .p-contextmenu-item-active > .p-contextmenu-item-content .p-contextmenu-submenu-icon {
        color: dt('contextmenu.submenu.icon.active.color');
    }

    .p-contextmenu-separator {
        border-block-start: 1px solid dt('contextmenu.separator.border.color');
    }

    .p-contextmenu-mobile .p-contextmenu-submenu {
        position: static;
        box-shadow: none;
        border: 0 none;
        padding-inline-start: dt('tieredmenu.submenu.mobile.indent');
        padding-inline-end: 0;
    }

    .p-contextmenu-mobile .p-contextmenu-submenu-icon {
        transition: transform 0.2s;
        transform: rotate(90deg);
    }

    .p-contextmenu-mobile .p-contextmenu-item-active > .p-contextmenu-item-content .p-contextmenu-submenu-icon {
        transform: rotate(-90deg);
    }
`,classes:{root:function(e){return[`p-contextmenu p-component`,{"p-contextmenu-mobile":e.instance.queryMatches}]},rootList:`p-contextmenu-root-list`,item:function(e){var t=e.instance,n=e.processedItem;return[`p-contextmenu-item`,{"p-contextmenu-item-active":t.isItemActive(n),"p-focus":t.isItemFocused(n),"p-disabled":t.isItemDisabled(n)}]},itemContent:`p-contextmenu-item-content`,itemLink:`p-contextmenu-item-link`,itemIcon:`p-contextmenu-item-icon`,itemLabel:`p-contextmenu-item-label`,submenuIcon:`p-contextmenu-submenu-icon`,submenu:`p-contextmenu-submenu`,separator:`p-contextmenu-separator`}});p(),u(),r();var B={name:`BaseContextMenu`,extends:F,props:{model:{type:Array,default:null},appendTo:{type:[String,Object],default:`body`},autoZIndex:{type:Boolean,default:!0},baseZIndex:{type:Number,default:0},global:{type:Boolean,default:!1},breakpoint:{type:String,default:`960px`},tabindex:{type:Number,default:0},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:z,provide:function(){return{$pcContextMenu:this,$parentInstance:this}}},V={name:`ContextMenuSub`,hostName:`ContextMenu`,extends:F,emits:[`item-click`,`item-mouseenter`,`item-mousemove`],props:{items:{type:Array,default:null},menuId:{type:String,default:null},focusedItemId:{type:String,default:null},root:{type:Boolean,default:!1},visible:{type:Boolean,default:!1},level:{type:Number,default:0},templates:{type:Object,default:null},activeItemPath:{type:Object,default:null},tabindex:{type:Number,default:0}},methods:{getItemId:function(e){return`${this.menuId}_${e.key}`},getItemKey:function(e){return this.getItemId(e)},getItemProp:function(e,t,n){return e&&e.item?w(e.item[t],n):void 0},getItemLabel:function(e){return this.getItemProp(e,`label`)},getItemLabelId:function(e){return`${this.menuId}_${e.key}_label`},getPTOptions:function(e,t,n){return this.ptm(e,{context:{item:t.item,active:this.isItemActive(t),focused:this.isItemFocused(t),disabled:this.isItemDisabled(t),index:n}})},isItemActive:function(e){return this.activeItemPath.some(function(t){return t.key===e.key})},isItemVisible:function(e){return this.getItemProp(e,`visible`)!==!1},isItemDisabled:function(e){return this.getItemProp(e,`disabled`)},isItemFocused:function(e){return this.focusedItemId===this.getItemId(e)},isItemGroup:function(e){return S(e.items)},onItemClick:function(e,t){this.getItemProp(t,`command`,{originalEvent:e,item:t.item}),this.$emit(`item-click`,{originalEvent:e,processedItem:t,isFocus:!0})},onItemMouseEnter:function(e,t){this.$emit(`item-mouseenter`,{originalEvent:e,processedItem:t})},onItemMouseMove:function(e,t){this.$emit(`item-mousemove`,{originalEvent:e,processedItem:t,isFocus:!0})},getAriaSetSize:function(){var e=this;return this.items.filter(function(t){return e.isItemVisible(t)&&!e.getItemProp(t,`separator`)}).length},getAriaPosInset:function(e){var t=this;return e-this.items.slice(0,e).filter(function(e){return t.isItemVisible(e)&&t.getItemProp(e,`separator`)}).length+1},onEnter:function(){M(this.$refs.container,this.level)},getMenuItemProps:function(e,t){return{action:i({class:this.cx(`itemLink`),tabindex:-1},this.getPTOptions(`itemLink`,e,t)),icon:i({class:[this.cx(`itemIcon`),this.getItemProp(e,`icon`)]},this.getPTOptions(`itemIcon`,e,t)),label:i({class:this.cx(`itemLabel`)},this.getPTOptions(`itemLabel`,e,t)),submenuicon:i({class:this.cx(`submenuIcon`)},this.getPTOptions(`submenuicon`,e,t))}}},components:{AngleRightIcon:R},directives:{ripple:I}},H=[`tabindex`],U=[`id`,`aria-label`,`aria-disabled`,`aria-expanded`,`aria-haspopup`,`aria-level`,`aria-setsize`,`aria-posinset`,`data-p-active`,`data-p-focused`,`data-p-disabled`],W=[`onClick`,`onMouseenter`,`onMousemove`],G=[`href`,`target`],K=[`id`],q=[`id`];function J(r,u,p,v,b,x){var S=e(`AngleRightIcon`),C=e(`ContextMenuSub`,!0),w=c(`ripple`);return a(),_(h,i({name:`p-anchored-overlay`,onEnter:x.onEnter},r.ptm(`menu.transition`)),{default:g(function(){return[p.root||p.visible?(a(),d(`ul`,i({key:0,ref:`container`,tabindex:p.tabindex},r.ptm(`rootList`)),[(a(!0),d(f,null,n(p.items,function(e,n){return a(),d(f,{key:x.getItemKey(e)},[x.isItemVisible(e)&&!x.getItemProp(e,`separator`)?(a(),d(`li`,i({key:0,id:x.getItemId(e),style:x.getItemProp(e,`style`),class:[r.cx(`item`,{processedItem:e}),x.getItemProp(e,`class`)],role:`menuitem`,"aria-label":x.getItemLabel(e),"aria-disabled":x.isItemDisabled(e)||void 0,"aria-expanded":x.isItemGroup(e)?x.isItemActive(e):void 0,"aria-haspopup":x.isItemGroup(e)&&!x.getItemProp(e,`to`)?`menu`:void 0,"aria-level":p.level+1,"aria-setsize":x.getAriaSetSize(),"aria-posinset":x.getAriaPosInset(n)},{ref_for:!0},x.getPTOptions(`item`,e,n),{"data-p-active":x.isItemActive(e),"data-p-focused":x.isItemFocused(e),"data-p-disabled":x.isItemDisabled(e)}),[l(`div`,i({class:r.cx(`itemContent`),onClick:function(t){return x.onItemClick(t,e)},onMouseenter:function(t){return x.onItemMouseEnter(t,e)},onMousemove:function(t){return x.onItemMouseMove(t,e)}},{ref_for:!0},x.getPTOptions(`itemContent`,e,n)),[p.templates.item?(a(),_(s(p.templates.item),{key:1,item:e.item,hasSubmenu:!!x.getItemProp(e,`items`),label:x.getItemLabel(e),props:x.getMenuItemProps(e,n)},null,8,[`item`,`hasSubmenu`,`label`,`props`])):m((a(),d(`a`,i({key:0,href:x.getItemProp(e,`url`),class:r.cx(`itemLink`),target:x.getItemProp(e,`target`),tabindex:`-1`},{ref_for:!0},x.getPTOptions(`itemLink`,e,n)),[p.templates.itemicon?(a(),_(s(p.templates.itemicon),{key:0,item:e.item,class:o(r.cx(`itemIcon`))},null,8,[`item`,`class`])):x.getItemProp(e,`icon`)?(a(),d(`span`,i({key:1,class:[r.cx(`itemIcon`),x.getItemProp(e,`icon`)]},{ref_for:!0},x.getPTOptions(`itemIcon`,e,n)),null,16)):y(``,!0),l(`span`,i({id:x.getItemLabelId(e),class:r.cx(`itemLabel`)},{ref_for:!0},x.getPTOptions(`itemLabel`,e,n)),t(x.getItemLabel(e)),17,K),x.getItemProp(e,`items`)?(a(),d(f,{key:2},[p.templates.submenuicon?(a(),_(s(p.templates.submenuicon),{key:0,active:x.isItemActive(e),class:o(r.cx(`submenuIcon`))},null,8,[`active`,`class`])):(a(),_(S,i({key:1,class:r.cx(`submenuIcon`)},{ref_for:!0},x.getPTOptions(`submenuicon`,e,n)),null,16,[`class`]))],64)):y(``,!0)],16,G)),[[w]])],16,W),x.isItemVisible(e)&&x.isItemGroup(e)?(a(),_(C,i({key:0,id:x.getItemId(e)+`_list`,role:`menu`,class:r.cx(`submenu`),menuId:p.menuId,focusedItemId:p.focusedItemId,items:e.items,templates:p.templates,activeItemPath:p.activeItemPath,level:p.level+1,visible:x.isItemActive(e)&&x.isItemGroup(e),pt:r.pt,unstyled:r.unstyled,onItemClick:u[0]||=function(e){return r.$emit(`item-click`,e)},onItemMouseenter:u[1]||=function(e){return r.$emit(`item-mouseenter`,e)},onItemMousemove:u[2]||=function(e){return r.$emit(`item-mousemove`,e)},"aria-labelledby":x.getItemLabelId(e)},{ref_for:!0},r.ptm(`submenu`)),null,16,[`id`,`class`,`menuId`,`focusedItemId`,`items`,`templates`,`activeItemPath`,`level`,`visible`,`pt`,`unstyled`,`aria-labelledby`])):y(``,!0)],16,U)):y(``,!0),x.isItemVisible(e)&&x.getItemProp(e,`separator`)?(a(),d(`li`,i({key:1,id:x.getItemId(e),style:x.getItemProp(e,`style`),class:[r.cx(`separator`),x.getItemProp(e,`class`)],role:`separator`},{ref_for:!0},r.ptm(`separator`)),null,16,q)):y(``,!0)],64)}),128))],16,H)):y(``,!0)]}),_:1},16,[`onEnter`])}V.render=J;var Y={name:`ContextMenu`,extends:B,inheritAttrs:!1,emits:[`focus`,`blur`,`show`,`hide`,`before-show`,`before-hide`],target:null,outsideClickListener:null,resizeListener:null,documentContextMenuListener:null,matchMediaListener:null,pageX:null,pageY:null,container:null,list:null,data:function(){return{focused:!1,focusedItemInfo:{index:-1,level:0,parentKey:``},activeItemPath:[],visible:!1,submenuVisible:!1,query:null,queryMatches:!1}},watch:{activeItemPath:function(e){S(e)?(this.bindOutsideClickListener(),this.bindResizeListener()):this.visible||(this.unbindOutsideClickListener(),this.unbindResizeListener())}},mounted:function(){this.bindMatchMediaListener(),this.global&&this.bindDocumentContextMenuListener()},beforeUnmount:function(){this.unbindResizeListener(),this.unbindOutsideClickListener(),this.unbindDocumentContextMenuListener(),this.unbindMatchMediaListener(),this.container&&this.autoZIndex&&P.clear(this.container),this.target=null,this.container=null},methods:{getItemProp:function(e,t){return e?w(e[t]):void 0},getItemLabel:function(e){return this.getItemProp(e,`label`)},isItemDisabled:function(e){return this.getItemProp(e,`disabled`)},isItemVisible:function(e){return this.getItemProp(e,`visible`)!==!1},isItemGroup:function(e){return S(this.getItemProp(e,`items`))},isItemSeparator:function(e){return this.getItemProp(e,`separator`)},getProccessedItemLabel:function(e){return e?this.getItemLabel(e.item):void 0},isProccessedItemGroup:function(e){return e&&S(e.items)},toggle:function(e){this.visible?this.hide():this.show(e)},show:function(e){this.$emit(`before-show`),this.activeItemPath=[],this.focusedItemInfo={index:-1,level:0,parentKey:``},b(this.list),this.pageX=e.pageX,this.pageY=e.pageY,this.visible?this.position():this.visible=!0,e.stopPropagation(),e.preventDefault()},hide:function(){this.$emit(`before-hide`),this.visible=!1,this.activeItemPath=[],this.focusedItemInfo={index:-1,level:0,parentKey:``}},onFocus:function(e){this.focused=!0,this.focusedItemInfo=this.focusedItemInfo.index===-1?{index:-1,level:0,parentKey:``}:this.focusedItemInfo,this.$emit(`focus`,e)},onBlur:function(e){this.focused=!1,this.focusedItemInfo={index:-1,level:0,parentKey:``},this.searchValue=``,this.$emit(`blur`,e)},onKeyDown:function(e){var t=e.metaKey||e.ctrlKey;switch(e.code){case`ArrowDown`:this.onArrowDownKey(e);break;case`ArrowUp`:this.onArrowUpKey(e);break;case`ArrowLeft`:this.onArrowLeftKey(e);break;case`ArrowRight`:this.onArrowRightKey(e);break;case`Home`:this.onHomeKey(e);break;case`End`:this.onEndKey(e);break;case`Space`:this.onSpaceKey(e);break;case`Enter`:case`NumpadEnter`:this.onEnterKey(e);break;case`Escape`:this.onEscapeKey(e);break;case`Tab`:this.onTabKey(e);break;case`PageDown`:case`PageUp`:case`Backspace`:case`ShiftLeft`:case`ShiftRight`:break;default:!t&&A(e.key)&&this.searchItems(e,e.key);break}},onItemChange:function(e,t){var n=e.processedItem,r=e.isFocus;if(!N(n)){var i=n.index,a=n.key,o=n.level,s=n.parentKey,c=n.items,l=S(c),u=this.activeItemPath.filter(function(e){return e.parentKey!==s&&e.parentKey!==a});l&&(u.push(n),this.submenuVisible=!0),this.focusedItemInfo={index:i,level:o,parentKey:s},r&&b(this.list),!(t===`hover`&&this.queryMatches)&&(this.activeItemPath=u)}},onItemClick:function(e){var t=e.processedItem,n=this.isProccessedItemGroup(t);if(this.isSelected(t)){var r=t.index,i=t.key,a=t.level,o=t.parentKey;this.activeItemPath=this.activeItemPath.filter(function(e){return i!==e.key&&i.startsWith(e.key)}),this.focusedItemInfo={index:r,level:a,parentKey:o},b(this.list)}else n?this.onItemChange(e):this.hide()},onItemMouseEnter:function(e){this.onItemChange(e,`hover`)},onItemMouseMove:function(e){this.focused&&this.changeFocusedItemIndex(e,e.processedItem.index)},onArrowDownKey:function(e){var t=this.focusedItemInfo.index===-1?this.findFirstFocusedItemIndex():this.findNextItemIndex(this.focusedItemInfo.index);this.changeFocusedItemIndex(e,t),e.preventDefault()},onArrowUpKey:function(e){if(e.altKey){if(this.focusedItemInfo.index!==-1){var t=this.visibleItems[this.focusedItemInfo.index];!this.isProccessedItemGroup(t)&&this.onItemChange({originalEvent:e,processedItem:t})}this.popup&&this.hide(),e.preventDefault()}else{var n=this.focusedItemInfo.index===-1?this.findLastFocusedItemIndex():this.findPrevItemIndex(this.focusedItemInfo.index);this.changeFocusedItemIndex(e,n),e.preventDefault()}},onArrowLeftKey:function(e){var t=this,n=this.visibleItems[this.focusedItemInfo.index],r=this.activeItemPath.find(function(e){return e.key===n.parentKey});N(n.parent)||(this.focusedItemInfo={index:-1,parentKey:r?r.parentKey:``},this.searchValue=``,this.onArrowDownKey(e)),this.activeItemPath=this.activeItemPath.filter(function(e){return e.parentKey!==t.focusedItemInfo.parentKey}),e.preventDefault()},onArrowRightKey:function(e){var t=this.visibleItems[this.focusedItemInfo.index];this.isProccessedItemGroup(t)&&(this.onItemChange({originalEvent:e,processedItem:t}),this.focusedItemInfo={index:-1,parentKey:t.key},this.searchValue=``,this.onArrowDownKey(e)),e.preventDefault()},onHomeKey:function(e){this.changeFocusedItemIndex(e,this.findFirstItemIndex()),e.preventDefault()},onEndKey:function(e){this.changeFocusedItemIndex(e,this.findLastItemIndex()),e.preventDefault()},onEnterKey:function(e){if(this.focusedItemInfo.index!==-1){var t=D(this.list,`li[id="${`${this.focusedItemIdx}`}"]`),n=t&&D(t,`[data-pc-section="itemlink"]`);n?n.click():t&&t.click();var r=this.visibleItems[this.focusedItemInfo.index];!this.isProccessedItemGroup(r)&&(this.focusedItemInfo.index=this.findFirstFocusedItemIndex())}e.preventDefault()},onSpaceKey:function(e){this.onEnterKey(e)},onEscapeKey:function(e){this.hide(),!this.popup&&(this.focusedItemInfo.index=this.findFirstFocusedItemIndex()),e.preventDefault()},onTabKey:function(e){if(this.focusedItemInfo.index!==-1){var t=this.visibleItems[this.focusedItemInfo.index];!this.isProccessedItemGroup(t)&&this.onItemChange({originalEvent:e,processedItem:t})}this.hide()},onEnter:function(e){x(e,{position:`absolute`}),this.position(),this.autoZIndex&&P.set(`menu`,e,this.baseZIndex||this.$primevue.config.zIndex.menu)},onAfterEnter:function(){this.bindOutsideClickListener(),this.bindResizeListener(),this.$emit(`show`),b(this.list)},onLeave:function(){this.$emit(`hide`),this.container=null},onAfterLeave:function(e){this.autoZIndex&&P.clear(e),this.unbindOutsideClickListener(),this.unbindResizeListener()},position:function(){var e=this.pageX+1,t=this.pageY+1,n=this.container.offsetParent?this.container.offsetWidth:k(this.container),r=this.container.offsetParent?this.container.offsetHeight:O(this.container),i=T(),a=window.scrollY||document.documentElement.scrollTop||document.body.scrollTop||0,o=window.scrollX||document.documentElement.scrollLeft||document.body.scrollLeft||0;e+n-o>i.width&&(e-=n),t+r-a>i.height&&(t-=r),e<o&&(e=o),t<a&&(t=a),this.container.style.left=e+`px`,this.container.style.top=t+`px`},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(t){var n=e.container&&!e.container.contains(t.target),r=!e.visible||!(e.target&&(e.target===t.target||e.target.contains(t.target)));n&&r&&e.hide()},document.addEventListener(`click`,this.outsideClickListener,!0))},unbindOutsideClickListener:function(){this.outsideClickListener&&=(document.removeEventListener(`click`,this.outsideClickListener,!0),null)},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(){e.visible&&!C()&&e.hide()},window.addEventListener(`resize`,this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&=(window.removeEventListener(`resize`,this.resizeListener),null)},bindDocumentContextMenuListener:function(){var e=this;this.documentContextMenuListener||(this.documentContextMenuListener=function(t){t.button===2&&e.show(t)},document.addEventListener(`contextmenu`,this.documentContextMenuListener))},unbindDocumentContextMenuListener:function(){this.documentContextMenuListener&&=(document.removeEventListener(`contextmenu`,this.documentContextMenuListener),null)},bindMatchMediaListener:function(){var e=this;if(!this.matchMediaListener){var t=matchMedia(`(max-width: ${this.breakpoint})`);this.query=t,this.queryMatches=t.matches,this.matchMediaListener=function(){e.queryMatches=t.matches},this.query.addEventListener(`change`,this.matchMediaListener)}},unbindMatchMediaListener:function(){this.matchMediaListener&&=(this.query.removeEventListener(`change`,this.matchMediaListener),null)},isItemMatched:function(e){return this.isValidItem(e)&&this.getProccessedItemLabel(e)?.toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase())},isValidItem:function(e){return!!e&&!this.isItemDisabled(e.item)&&!this.isItemSeparator(e.item)&&this.isItemVisible(e.item)},isValidSelectedItem:function(e){return this.isValidItem(e)&&this.isSelected(e)},isSelected:function(e){return this.activeItemPath.some(function(t){return t.key===e.key})},findFirstItemIndex:function(){var e=this;return this.visibleItems.findIndex(function(t){return e.isValidItem(t)})},findLastItemIndex:function(){var e=this;return E(this.visibleItems,function(t){return e.isValidItem(t)})},findNextItemIndex:function(e){var t=this,n=e<this.visibleItems.length-1?this.visibleItems.slice(e+1).findIndex(function(e){return t.isValidItem(e)}):-1;return n>-1?n+e+1:e},findPrevItemIndex:function(e){var t=this,n=e>0?E(this.visibleItems.slice(0,e),function(e){return t.isValidItem(e)}):-1;return n>-1?n:e},findSelectedItemIndex:function(){var e=this;return this.visibleItems.findIndex(function(t){return e.isValidSelectedItem(t)})},findFirstFocusedItemIndex:function(){var e=this.findSelectedItemIndex();return e<0?this.findFirstItemIndex():e},findLastFocusedItemIndex:function(){var e=this.findSelectedItemIndex();return e<0?this.findLastItemIndex():e},searchItems:function(e,t){var n=this;this.searchValue=(this.searchValue||``)+t;var r=-1,i=!1;return this.focusedItemInfo.index===-1?r=this.visibleItems.findIndex(function(e){return n.isItemMatched(e)}):(r=this.visibleItems.slice(this.focusedItemInfo.index).findIndex(function(e){return n.isItemMatched(e)}),r=r===-1?this.visibleItems.slice(0,this.focusedItemInfo.index).findIndex(function(e){return n.isItemMatched(e)}):r+this.focusedItemInfo.index),r!==-1&&(i=!0),r===-1&&this.focusedItemInfo.index===-1&&(r=this.findFirstFocusedItemIndex()),r!==-1&&this.changeFocusedItemIndex(e,r),this.searchTimeout&&clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout(function(){n.searchValue=``,n.searchTimeout=null},500),i},changeFocusedItemIndex:function(e,t){this.focusedItemInfo.index!==t&&(this.focusedItemInfo.index=t,this.scrollInView())},scrollInView:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:-1,t=e===-1?this.focusedItemIdx:`${this.$id}_${e}`,n=D(this.list,`li[id="${t}"]`);n&&n.scrollIntoView&&n.scrollIntoView({block:`nearest`,inline:`start`})},createProcessedItems:function(e){var t=this,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:``,a=[];return e&&e.forEach(function(e,o){var s=(i===``?``:i+`_`)+o,c={item:e,index:o,level:n,key:s,parent:r,parentKey:i};c.items=t.createProcessedItems(e.items,n+1,c,s),a.push(c)}),a},containerRef:function(e){this.container=e},listRef:function(e){this.list=e?e.$el:void 0}},computed:{processedItems:function(){return this.createProcessedItems(this.model||[])},visibleItems:function(){var e=this,t=this.activeItemPath.find(function(t){return t.key===e.focusedItemInfo.parentKey});return t?t.items:this.processedItems},focusedItemIdx:function(){return this.focusedItemInfo.index===-1?null:`${this.$id}${S(this.focusedItemInfo.parentKey)?`_`+this.focusedItemInfo.parentKey:``}_${this.focusedItemInfo.index}`}},components:{ContextMenuSub:V,Portal:L}};function X(t,n,r,s,c,l){var u=e(`ContextMenuSub`),f=e(`Portal`);return a(),_(f,{appendTo:t.appendTo},{default:g(function(){return[v(h,i({name:`p-anchored-overlay`,onEnter:l.onEnter,onAfterEnter:l.onAfterEnter,onLeave:l.onLeave,onAfterLeave:l.onAfterLeave},t.ptm(`transition`)),{default:g(function(){return[c.visible?(a(),d(`div`,i({key:0,ref:l.containerRef,class:t.cx(`root`)},t.ptmi(`root`)),[v(u,{ref:l.listRef,id:t.$id+`_list`,class:o(t.cx(`rootList`)),role:`menubar`,root:!0,tabindex:t.tabindex,"aria-orientation":`vertical`,"aria-activedescendant":c.focused?l.focusedItemIdx:void 0,menuId:t.$id,focusedItemId:c.focused?l.focusedItemIdx:void 0,items:l.processedItems,templates:t.$slots,activeItemPath:c.activeItemPath,"aria-labelledby":t.ariaLabelledby,"aria-label":t.ariaLabel,level:0,visible:c.submenuVisible,pt:t.pt,unstyled:t.unstyled,onFocus:l.onFocus,onBlur:l.onBlur,onKeydown:l.onKeyDown,onItemClick:l.onItemClick,onItemMouseenter:l.onItemMouseEnter,onItemMousemove:l.onItemMouseMove},null,8,[`id`,`class`,`tabindex`,`aria-activedescendant`,`menuId`,`focusedItemId`,`items`,`templates`,`activeItemPath`,`aria-labelledby`,`aria-label`,`visible`,`pt`,`unstyled`,`onFocus`,`onBlur`,`onKeydown`,`onItemClick`,`onItemMouseenter`,`onItemMousemove`])],16)):y(``,!0)]}),_:1},16,[`onEnter`,`onAfterEnter`,`onLeave`,`onAfterLeave`])]}),_:1},8,[`appendTo`])}Y.render=X;export{Y as default};