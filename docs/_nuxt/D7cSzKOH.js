import{Gt as e,J as t,Jt as n,K as r,O as i,Ot as a,P as o,U as s,Ut as c,Wt as l,X as u,Y as d,_ as f,b as p,d as m,j as h,nt as g,q as _,v,w as y,y as b}from"./C8bKil6U.js";import{B as x,Et as S,F as C,St as w,ct as T,et as E,st as D,t as O,xt as k}from"./czlGUozm.js";import{t as A}from"./cO8iUN-n.js";import{t as j}from"./FiooIEjL.js";import{t as M}from"./Dt0c0nKr.js";import{t as N}from"./B5hKuKmL2.js";import{t as P}from"./DnBHaTsi.js";import{t as F}from"./CKEJIYsq.js";var I=O.extend({name:`menubar`,style:`
    .p-menubar {
        display: flex;
        align-items: center;
        background: dt('menubar.background');
        border: 1px solid dt('menubar.border.color');
        border-radius: dt('menubar.border.radius');
        color: dt('menubar.color');
        padding: dt('menubar.padding');
        gap: dt('menubar.gap');
    }

    .p-menubar-start,
    .p-megamenu-end {
        display: flex;
        align-items: center;
    }

    .p-menubar-root-list,
    .p-menubar-submenu {
        display: flex;
        margin: 0;
        padding: 0;
        list-style: none;
        outline: 0 none;
    }

    .p-menubar-root-list {
        align-items: center;
        flex-wrap: wrap;
        gap: dt('menubar.gap');
    }

    .p-menubar-root-list > .p-menubar-item > .p-menubar-item-content {
        border-radius: dt('menubar.base.item.border.radius');
    }

    .p-menubar-root-list > .p-menubar-item > .p-menubar-item-content > .p-menubar-item-link {
        padding: dt('menubar.base.item.padding');
    }

    .p-menubar-item-content {
        transition:
            background dt('menubar.transition.duration'),
            color dt('menubar.transition.duration');
        border-radius: dt('menubar.item.border.radius');
        color: dt('menubar.item.color');
    }

    .p-menubar-item-link {
        cursor: pointer;
        display: flex;
        align-items: center;
        text-decoration: none;
        overflow: hidden;
        position: relative;
        color: inherit;
        padding: dt('menubar.item.padding');
        gap: dt('menubar.item.gap');
        user-select: none;
        outline: 0 none;
    }

    .p-menubar-item-label {
        line-height: 1;
    }

    .p-menubar-item-icon {
        color: dt('menubar.item.icon.color');
    }

    .p-menubar-submenu-icon {
        color: dt('menubar.submenu.icon.color');
        margin-left: auto;
        font-size: dt('menubar.submenu.icon.size');
        width: dt('menubar.submenu.icon.size');
        height: dt('menubar.submenu.icon.size');
    }

    .p-menubar-submenu .p-menubar-submenu-icon:dir(rtl) {
        margin-left: 0;
        margin-right: auto;
    }

    .p-menubar-item.p-focus > .p-menubar-item-content {
        color: dt('menubar.item.focus.color');
        background: dt('menubar.item.focus.background');
    }

    .p-menubar-item.p-focus > .p-menubar-item-content .p-menubar-item-icon {
        color: dt('menubar.item.icon.focus.color');
    }

    .p-menubar-item.p-focus > .p-menubar-item-content .p-menubar-submenu-icon {
        color: dt('menubar.submenu.icon.focus.color');
    }

    .p-menubar-item:not(.p-disabled) > .p-menubar-item-content:hover {
        color: dt('menubar.item.focus.color');
        background: dt('menubar.item.focus.background');
    }

    .p-menubar-item:not(.p-disabled) > .p-menubar-item-content:hover .p-menubar-item-icon {
        color: dt('menubar.item.icon.focus.color');
    }

    .p-menubar-item:not(.p-disabled) > .p-menubar-item-content:hover .p-menubar-submenu-icon {
        color: dt('menubar.submenu.icon.focus.color');
    }

    .p-menubar-item-active > .p-menubar-item-content {
        color: dt('menubar.item.active.color');
        background: dt('menubar.item.active.background');
    }

    .p-menubar-item-active > .p-menubar-item-content .p-menubar-item-icon {
        color: dt('menubar.item.icon.active.color');
    }

    .p-menubar-item-active > .p-menubar-item-content .p-menubar-submenu-icon {
        color: dt('menubar.submenu.icon.active.color');
    }

    .p-menubar-submenu {
        display: none;
        position: absolute;
        min-width: 12.5rem;
        z-index: 1;
        background: dt('menubar.submenu.background');
        border: 1px solid dt('menubar.submenu.border.color');
        border-radius: dt('menubar.submenu.border.radius');
        box-shadow: dt('menubar.submenu.shadow');
        color: dt('menubar.submenu.color');
        flex-direction: column;
        padding: dt('menubar.submenu.padding');
        gap: dt('menubar.submenu.gap');
    }

    .p-menubar-submenu .p-menubar-separator {
        border-block-start: 1px solid dt('menubar.separator.border.color');
    }

    .p-menubar-submenu .p-menubar-item {
        position: relative;
    }

    .p-menubar-submenu > .p-menubar-item-active > .p-menubar-submenu {
        display: block;
        left: 100%;
        top: 0;
    }

    .p-menubar-end {
        margin-left: auto;
        align-self: center;
    }

    .p-menubar-end:dir(rtl) {
        margin-left: 0;
        margin-right: auto;
    }

    .p-menubar-button {
        display: none;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        width: dt('menubar.mobile.button.size');
        height: dt('menubar.mobile.button.size');
        position: relative;
        color: dt('menubar.mobile.button.color');
        border: 0 none;
        background: transparent;
        border-radius: dt('menubar.mobile.button.border.radius');
        transition:
            background dt('menubar.transition.duration'),
            color dt('menubar.transition.duration'),
            outline-color dt('menubar.transition.duration');
        outline-color: transparent;
    }

    .p-menubar-button:hover {
        color: dt('menubar.mobile.button.hover.color');
        background: dt('menubar.mobile.button.hover.background');
    }

    .p-menubar-button:focus-visible {
        box-shadow: dt('menubar.mobile.button.focus.ring.shadow');
        outline: dt('menubar.mobile.button.focus.ring.width') dt('menubar.mobile.button.focus.ring.style') dt('menubar.mobile.button.focus.ring.color');
        outline-offset: dt('menubar.mobile.button.focus.ring.offset');
    }

    .p-menubar-mobile {
        position: relative;
    }

    .p-menubar-mobile .p-menubar-button {
        display: flex;
    }

    .p-menubar-mobile .p-menubar-root-list {
        position: absolute;
        display: none;
        width: 100%;
        flex-direction: column;
        top: 100%;
        left: 0;
        z-index: 1;
        padding: dt('menubar.submenu.padding');
        background: dt('menubar.submenu.background');
        border: 1px solid dt('menubar.submenu.border.color');
        box-shadow: dt('menubar.submenu.shadow');
        border-radius: dt('menubar.submenu.border.radius');
        gap: dt('menubar.submenu.gap');
    }

    .p-menubar-mobile .p-menubar-root-list:dir(rtl) {
        left: auto;
        right: 0;
    }

    .p-menubar-mobile .p-menubar-root-list > .p-menubar-item > .p-menubar-item-content > .p-menubar-item-link {
        padding: dt('menubar.item.padding');
    }

    .p-menubar-mobile-active .p-menubar-root-list {
        display: flex;
    }

    .p-menubar-mobile .p-menubar-root-list .p-menubar-item {
        width: 100%;
        position: static;
    }

    .p-menubar-mobile .p-menubar-root-list .p-menubar-separator {
        border-block-start: 1px solid dt('menubar.separator.border.color');
    }

    .p-menubar-mobile .p-menubar-root-list > .p-menubar-item > .p-menubar-item-content .p-menubar-submenu-icon {
        margin-left: auto;
        transition: transform 0.2s;
    }

    .p-menubar-mobile .p-menubar-root-list > .p-menubar-item > .p-menubar-item-content .p-menubar-submenu-icon:dir(rtl),
    .p-menubar-mobile .p-menubar-submenu-icon:dir(rtl) {
        margin-left: 0;
        margin-right: auto;
    }

    .p-menubar-mobile .p-menubar-root-list > .p-menubar-item-active > .p-menubar-item-content .p-menubar-submenu-icon {
        transform: rotate(-180deg);
    }

    .p-menubar-mobile .p-menubar-submenu .p-menubar-submenu-icon {
        transition: transform 0.2s;
        transform: rotate(90deg);
    }

    .p-menubar-mobile .p-menubar-item-active > .p-menubar-item-content .p-menubar-submenu-icon {
        transform: rotate(-90deg);
    }

    .p-menubar-mobile .p-menubar-submenu {
        width: 100%;
        position: static;
        box-shadow: none;
        border: 0 none;
        padding-inline-start: dt('menubar.submenu.mobile.indent');
        padding-inline-end: 0;
    }
`,classes:{root:function(e){var t=e.instance;return[`p-menubar p-component`,{"p-menubar-mobile":t.queryMatches,"p-menubar-mobile-active":t.mobileActive}]},start:`p-menubar-start`,button:`p-menubar-button`,rootList:`p-menubar-root-list`,item:function(e){var t=e.instance,n=e.processedItem;return[`p-menubar-item`,{"p-menubar-item-active":t.isItemActive(n),"p-focus":t.isItemFocused(n),"p-disabled":t.isItemDisabled(n)}]},itemContent:`p-menubar-item-content`,itemLink:`p-menubar-item-link`,itemIcon:`p-menubar-item-icon`,itemLabel:`p-menubar-item-label`,submenuIcon:`p-menubar-submenu-icon`,submenu:`p-menubar-submenu`,separator:`p-menubar-separator`,end:`p-menubar-end`},inlineStyles:{submenu:function(e){var t=e.instance,n=e.processedItem;return{display:t.isItemActive(n)?`flex`:`none`}}}});h(),a();var L={name:`BaseMenubar`,extends:j,props:{model:{type:Array,default:null},buttonProps:{type:null,default:null},breakpoint:{type:String,default:`960px`},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:I,provide:function(){return{$pcMenubar:this,$parentInstance:this}}},R={name:`MenubarSub`,hostName:`Menubar`,extends:j,emits:[`item-mouseenter`,`item-click`,`item-mousemove`],props:{items:{type:Array,default:null},root:{type:Boolean,default:!1},popup:{type:Boolean,default:!1},mobileActive:{type:Boolean,default:!1},templates:{type:Object,default:null},level:{type:Number,default:0},menuId:{type:String,default:null},focusedItemId:{type:String,default:null},activeItemPath:{type:Object,default:null}},list:null,methods:{getItemId:function(e){return`${this.menuId}_${e.key}`},getItemKey:function(e){return this.getItemId(e)},getItemProp:function(e,t,n){return e&&e.item?w(e.item[t],n):void 0},getItemLabel:function(e){return this.getItemProp(e,`label`)},getItemLabelId:function(e){return`${this.menuId}_${e.key}_label`},getPTOptions:function(e,t,n){return this.ptm(n,{context:{item:e.item,index:t,active:this.isItemActive(e),focused:this.isItemFocused(e),disabled:this.isItemDisabled(e),level:this.level}})},isItemActive:function(e){return this.activeItemPath.some(function(t){return t.key===e.key})},isItemVisible:function(e){return this.getItemProp(e,`visible`)!==!1},isItemDisabled:function(e){return this.getItemProp(e,`disabled`)},isItemFocused:function(e){return this.focusedItemId===this.getItemId(e)},isItemGroup:function(e){return S(e.items)},onItemClick:function(e,t){this.getItemProp(t,`command`,{originalEvent:e,item:t.item}),this.$emit(`item-click`,{originalEvent:e,processedItem:t,isFocus:!0})},onItemMouseEnter:function(e,t){this.$emit(`item-mouseenter`,{originalEvent:e,processedItem:t})},onItemMouseMove:function(e,t){this.$emit(`item-mousemove`,{originalEvent:e,processedItem:t})},getAriaPosInset:function(e){return e-this.calculateAriaSetSize.slice(0,e).length+1},getMenuItemProps:function(e,t){return{action:o({class:this.cx(`itemLink`),tabindex:-1},this.getPTOptions(e,t,`itemLink`)),icon:o({class:[this.cx(`itemIcon`),this.getItemProp(e,`icon`)]},this.getPTOptions(e,t,`itemIcon`)),label:o({class:this.cx(`itemLabel`)},this.getPTOptions(e,t,`itemLabel`)),submenuicon:o({class:this.cx(`submenuIcon`)},this.getPTOptions(e,t,`submenuIcon`))}}},computed:{calculateAriaSetSize:function(){var e=this;return this.items.filter(function(t){return e.isItemVisible(t)&&e.getItemProp(t,`separator`)})},getAriaSetSize:function(){var e=this;return this.items.filter(function(t){return e.isItemVisible(t)&&!e.getItemProp(t,`separator`)}).length}},components:{AngleRightIcon:F,AngleDownIcon:P},directives:{ripple:M}},z=[`id`,`aria-label`,`aria-disabled`,`aria-expanded`,`aria-haspopup`,`aria-setsize`,`aria-posinset`,`data-p-active`,`data-p-focused`,`data-p-disabled`],B=[`onClick`,`onMouseenter`,`onMousemove`],V=[`href`,`target`],H=[`id`],U=[`id`];function W(i,a,l,h,_,y){var x=t(`MenubarSub`,!0),S=d(`ripple`);return s(),p(`ul`,o({class:l.level===0?i.cx(`rootList`):i.cx(`submenu`)},l.level===0?i.ptm(`rootList`):i.ptm(`submenu`)),[(s(!0),p(m,null,r(l.items,function(t,r){return s(),p(m,{key:y.getItemKey(t)},[y.isItemVisible(t)&&!y.getItemProp(t,`separator`)?(s(),p(`li`,o({key:0,id:y.getItemId(t),style:y.getItemProp(t,`style`),class:[i.cx(`item`,{processedItem:t}),y.getItemProp(t,`class`)],role:`menuitem`,"aria-label":y.getItemLabel(t),"aria-disabled":y.isItemDisabled(t)||void 0,"aria-expanded":y.isItemGroup(t)?y.isItemActive(t):void 0,"aria-haspopup":y.isItemGroup(t)&&!y.getItemProp(t,`to`)?`menu`:void 0,"aria-setsize":y.getAriaSetSize,"aria-posinset":y.getAriaPosInset(r)},{ref_for:!0},y.getPTOptions(t,r,`item`),{"data-p-active":y.isItemActive(t),"data-p-focused":y.isItemFocused(t),"data-p-disabled":y.isItemDisabled(t)}),[f(`div`,o({class:i.cx(`itemContent`),onClick:function(e){return y.onItemClick(e,t)},onMouseenter:function(e){return y.onItemMouseEnter(e,t)},onMousemove:function(e){return y.onItemMouseMove(e,t)}},{ref_for:!0},y.getPTOptions(t,r,`itemContent`)),[l.templates.item?(s(),v(u(l.templates.item),{key:1,item:t.item,root:l.root,hasSubmenu:!!y.getItemProp(t,`items`),label:y.getItemLabel(t),props:y.getMenuItemProps(t,r)},null,8,[`item`,`root`,`hasSubmenu`,`label`,`props`])):g((s(),p(`a`,o({key:0,href:y.getItemProp(t,`url`),class:i.cx(`itemLink`),target:y.getItemProp(t,`target`),tabindex:`-1`},{ref_for:!0},y.getPTOptions(t,r,`itemLink`)),[l.templates.itemicon?(s(),v(u(l.templates.itemicon),{key:0,item:t.item,class:c(i.cx(`itemIcon`))},null,8,[`item`,`class`])):y.getItemProp(t,`icon`)?(s(),p(`span`,o({key:1,class:[i.cx(`itemIcon`),y.getItemProp(t,`icon`)]},{ref_for:!0},y.getPTOptions(t,r,`itemIcon`)),null,16)):b(``,!0),f(`span`,o({id:y.getItemLabelId(t),class:i.cx(`itemLabel`)},{ref_for:!0},y.getPTOptions(t,r,`itemLabel`)),n(y.getItemLabel(t)),17,H),y.getItemProp(t,`items`)?(s(),p(m,{key:2},[l.templates.submenuicon?(s(),v(u(l.templates.submenuicon),{key:0,root:l.root,active:y.isItemActive(t),class:c(i.cx(`submenuIcon`))},null,8,[`root`,`active`,`class`])):(s(),v(u(l.root?`AngleDownIcon`:`AngleRightIcon`),o({key:1,class:i.cx(`submenuIcon`)},{ref_for:!0},y.getPTOptions(t,r,`submenuIcon`)),null,16,[`class`]))],64)):b(``,!0)],16,V)),[[S]])],16,B),y.isItemVisible(t)&&y.isItemGroup(t)?(s(),v(x,{key:0,id:y.getItemId(t)+`_list`,menuId:l.menuId,role:`menu`,style:e(i.sx(`submenu`,!0,{processedItem:t})),focusedItemId:l.focusedItemId,items:t.items,mobileActive:l.mobileActive,activeItemPath:l.activeItemPath,templates:l.templates,level:l.level+1,"aria-labelledby":y.getItemLabelId(t),pt:i.pt,unstyled:i.unstyled,onItemClick:a[0]||=function(e){return i.$emit(`item-click`,e)},onItemMouseenter:a[1]||=function(e){return i.$emit(`item-mouseenter`,e)},onItemMousemove:a[2]||=function(e){return i.$emit(`item-mousemove`,e)}},null,8,[`id`,`menuId`,`style`,`focusedItemId`,`items`,`mobileActive`,`activeItemPath`,`templates`,`level`,`aria-labelledby`,`pt`,`unstyled`])):b(``,!0)],16,z)):b(``,!0),y.isItemVisible(t)&&y.getItemProp(t,`separator`)?(s(),p(`li`,o({key:1,id:y.getItemId(t),class:[i.cx(`separator`),y.getItemProp(t,`class`)],style:y.getItemProp(t,`style`),role:`separator`},{ref_for:!0},i.ptm(`separator`)),null,16,U)):b(``,!0)],64)}),128))],16)}R.render=W;var G={name:`Menubar`,extends:L,inheritAttrs:!1,emits:[`focus`,`blur`],matchMediaListener:null,data:function(){return{mobileActive:!1,focused:!1,focusedItemInfo:{index:-1,level:0,parentKey:``},activeItemPath:[],dirty:!1,query:null,queryMatches:!1}},watch:{activeItemPath:function(e){S(e)?(this.bindOutsideClickListener(),this.bindResizeListener()):(this.unbindOutsideClickListener(),this.unbindResizeListener())}},outsideClickListener:null,container:null,menubar:null,mounted:function(){this.bindMatchMediaListener()},beforeUnmount:function(){this.mobileActive=!1,this.unbindOutsideClickListener(),this.unbindResizeListener(),this.unbindMatchMediaListener(),this.container&&A.clear(this.container),this.container=null},methods:{getItemProp:function(e,t){return e?w(e[t]):void 0},getItemLabel:function(e){return this.getItemProp(e,`label`)},isItemDisabled:function(e){return this.getItemProp(e,`disabled`)},isItemVisible:function(e){return this.getItemProp(e,`visible`)!==!1},isItemGroup:function(e){return S(this.getItemProp(e,`items`))},isItemSeparator:function(e){return this.getItemProp(e,`separator`)},getProccessedItemLabel:function(e){return e?this.getItemLabel(e.item):void 0},isProccessedItemGroup:function(e){return e&&S(e.items)},toggle:function(e){var t=this;this.mobileActive?(this.mobileActive=!1,A.clear(this.menubar),this.hide()):(this.mobileActive=!0,A.set(`menu`,this.menubar,this.$primevue.config.zIndex.menu),setTimeout(function(){t.show()},1)),this.bindOutsideClickListener(),e.preventDefault()},show:function(){x(this.menubar)},hide:function(e,t){var n=this;this.mobileActive&&(this.mobileActive=!1,setTimeout(function(){x(n.$refs.menubutton)},0)),this.activeItemPath=[],this.focusedItemInfo={index:-1,level:0,parentKey:``},t&&x(this.menubar),this.dirty=!1},onFocus:function(e){this.focused=!0,this.focusedItemInfo=this.focusedItemInfo.index===-1?{index:this.findFirstFocusedItemIndex(),level:0,parentKey:``}:this.focusedItemInfo,this.$emit(`focus`,e)},onBlur:function(e){this.focused=!1,this.focusedItemInfo={index:-1,level:0,parentKey:``},this.searchValue=``,this.dirty=!1,this.$emit(`blur`,e)},onKeyDown:function(e){var t=e.metaKey||e.ctrlKey;switch(e.code){case`ArrowDown`:this.onArrowDownKey(e);break;case`ArrowUp`:this.onArrowUpKey(e);break;case`ArrowLeft`:this.onArrowLeftKey(e);break;case`ArrowRight`:this.onArrowRightKey(e);break;case`Home`:this.onHomeKey(e);break;case`End`:this.onEndKey(e);break;case`Space`:this.onSpaceKey(e);break;case`Enter`:case`NumpadEnter`:this.onEnterKey(e);break;case`Escape`:this.onEscapeKey(e);break;case`Tab`:this.onTabKey(e);break;case`PageDown`:case`PageUp`:case`Backspace`:case`ShiftLeft`:case`ShiftRight`:break;default:!t&&D(e.key)&&this.searchItems(e,e.key);break}},onItemChange:function(e,t){var n=e.processedItem,r=e.isFocus;if(!k(n)){var i=n.index,a=n.key,o=n.level,s=n.parentKey,c=n.items,l=S(c),u=this.activeItemPath.filter(function(e){return e.parentKey!==s&&e.parentKey!==a});l&&u.push(n),this.focusedItemInfo={index:i,level:o,parentKey:s},l&&(this.dirty=!0),r&&x(this.menubar),!(t===`hover`&&this.queryMatches)&&(this.activeItemPath=u)}},onItemClick:function(e){var t=e.originalEvent,n=e.processedItem,r=this.isProccessedItemGroup(n),i=k(n.parent);if(this.isSelected(n)){var a=n.index,o=n.key,s=n.level,c=n.parentKey;this.activeItemPath=this.activeItemPath.filter(function(e){return o!==e.key&&o.startsWith(e.key)}),this.focusedItemInfo={index:a,level:s,parentKey:c},this.dirty=!i,x(this.menubar)}else if(r)this.onItemChange(e);else{var l=i?n:this.activeItemPath.find(function(e){return e.parentKey===``});this.hide(t),this.changeFocusedItemIndex(t,l?l.index:-1),this.mobileActive=!1,x(this.menubar)}},onItemMouseEnter:function(e){this.dirty&&this.onItemChange(e,`hover`)},onItemMouseMove:function(e){this.focused&&this.changeFocusedItemIndex(e,e.processedItem.index)},menuButtonClick:function(e){this.toggle(e)},menuButtonKeydown:function(e){(e.code===`Enter`||e.code===`NumpadEnter`||e.code===`Space`)&&this.menuButtonClick(e)},onArrowDownKey:function(e){var t=this.visibleItems[this.focusedItemInfo.index];if(t&&k(t.parent))this.isProccessedItemGroup(t)&&(this.onItemChange({originalEvent:e,processedItem:t}),this.focusedItemInfo={index:-1,parentKey:t.key},this.onArrowRightKey(e));else{var n=this.focusedItemInfo.index===-1?this.findFirstFocusedItemIndex():this.findNextItemIndex(this.focusedItemInfo.index);this.changeFocusedItemIndex(e,n)}e.preventDefault()},onArrowUpKey:function(e){var t=this,n=this.visibleItems[this.focusedItemInfo.index];if(k(n.parent)){if(this.isProccessedItemGroup(n)){this.onItemChange({originalEvent:e,processedItem:n}),this.focusedItemInfo={index:-1,parentKey:n.key};var r=this.findLastItemIndex();this.changeFocusedItemIndex(e,r)}}else{var i=this.activeItemPath.find(function(e){return e.key===n.parentKey});if(this.focusedItemInfo.index===0)this.focusedItemInfo={index:-1,parentKey:i?i.parentKey:``},this.searchValue=``,this.onArrowLeftKey(e),this.activeItemPath=this.activeItemPath.filter(function(e){return e.parentKey!==t.focusedItemInfo.parentKey});else{var a=this.focusedItemInfo.index===-1?this.findLastFocusedItemIndex():this.findPrevItemIndex(this.focusedItemInfo.index);this.changeFocusedItemIndex(e,a)}}e.preventDefault()},onArrowLeftKey:function(e){var t=this,n=this.visibleItems[this.focusedItemInfo.index],r=n?this.activeItemPath.find(function(e){return e.key===n.parentKey}):null;if(r)this.onItemChange({originalEvent:e,processedItem:r}),this.activeItemPath=this.activeItemPath.filter(function(e){return e.parentKey!==t.focusedItemInfo.parentKey}),e.preventDefault();else{var i=this.focusedItemInfo.index===-1?this.findLastFocusedItemIndex():this.findPrevItemIndex(this.focusedItemInfo.index);this.changeFocusedItemIndex(e,i),e.preventDefault()}},onArrowRightKey:function(e){var t=this.visibleItems[this.focusedItemInfo.index];if(t&&this.activeItemPath.find(function(e){return e.key===t.parentKey}))this.isProccessedItemGroup(t)&&(this.onItemChange({originalEvent:e,processedItem:t}),this.focusedItemInfo={index:-1,parentKey:t.key},this.onArrowDownKey(e));else{var n=this.focusedItemInfo.index===-1?this.findFirstFocusedItemIndex():this.findNextItemIndex(this.focusedItemInfo.index);this.changeFocusedItemIndex(e,n),e.preventDefault()}},onHomeKey:function(e){this.changeFocusedItemIndex(e,this.findFirstItemIndex()),e.preventDefault()},onEndKey:function(e){this.changeFocusedItemIndex(e,this.findLastItemIndex()),e.preventDefault()},onEnterKey:function(e){if(this.focusedItemInfo.index!==-1){var t=E(this.menubar,`li[id="${`${this.focusedItemId}`}"]`),n=t&&E(t,`a[data-pc-section="itemlink"]`);n?n.click():t&&t.click();var r=this.visibleItems[this.focusedItemInfo.index];!this.isProccessedItemGroup(r)&&(this.focusedItemInfo.index=this.findFirstFocusedItemIndex())}e.preventDefault()},onSpaceKey:function(e){this.onEnterKey(e)},onEscapeKey:function(e){if(this.focusedItemInfo.level!==0){var t=this.focusedItemInfo;this.hide(e,!1),this.focusedItemInfo={index:Number(t.parentKey.split(`_`)[0]),level:0,parentKey:``}}e.preventDefault()},onTabKey:function(e){if(this.focusedItemInfo.index!==-1){var t=this.visibleItems[this.focusedItemInfo.index];!this.isProccessedItemGroup(t)&&this.onItemChange({originalEvent:e,processedItem:t})}this.hide()},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(t){var n=e.container&&!e.container.contains(t.target),r=!(e.target&&(e.target===t.target||e.target.contains(t.target)));n&&r&&e.hide()},document.addEventListener(`click`,this.outsideClickListener,!0))},unbindOutsideClickListener:function(){this.outsideClickListener&&=(document.removeEventListener(`click`,this.outsideClickListener,!0),null)},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(t){C()||e.hide(t,!0),e.mobileActive=!1},window.addEventListener(`resize`,this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&=(window.removeEventListener(`resize`,this.resizeListener),null)},bindMatchMediaListener:function(){var e=this;if(!this.matchMediaListener){var t=matchMedia(`(max-width: ${this.breakpoint})`);this.query=t,this.queryMatches=t.matches,this.matchMediaListener=function(){e.queryMatches=t.matches,e.mobileActive=!1},this.query.addEventListener(`change`,this.matchMediaListener)}},unbindMatchMediaListener:function(){this.matchMediaListener&&=(this.query.removeEventListener(`change`,this.matchMediaListener),null)},isItemMatched:function(e){return this.isValidItem(e)&&this.getProccessedItemLabel(e)?.toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase())},isValidItem:function(e){return!!e&&!this.isItemDisabled(e.item)&&!this.isItemSeparator(e.item)&&this.isItemVisible(e.item)},isValidSelectedItem:function(e){return this.isValidItem(e)&&this.isSelected(e)},isSelected:function(e){return this.activeItemPath.some(function(t){return t.key===e.key})},findFirstItemIndex:function(){var e=this;return this.visibleItems.findIndex(function(t){return e.isValidItem(t)})},findLastItemIndex:function(){var e=this;return T(this.visibleItems,function(t){return e.isValidItem(t)})},findNextItemIndex:function(e){var t=this,n=e<this.visibleItems.length-1?this.visibleItems.slice(e+1).findIndex(function(e){return t.isValidItem(e)}):-1;return n>-1?n+e+1:e},findPrevItemIndex:function(e){var t=this,n=e>0?T(this.visibleItems.slice(0,e),function(e){return t.isValidItem(e)}):-1;return n>-1?n:e},findSelectedItemIndex:function(){var e=this;return this.visibleItems.findIndex(function(t){return e.isValidSelectedItem(t)})},findFirstFocusedItemIndex:function(){var e=this.findSelectedItemIndex();return e<0?this.findFirstItemIndex():e},findLastFocusedItemIndex:function(){var e=this.findSelectedItemIndex();return e<0?this.findLastItemIndex():e},searchItems:function(e,t){var n=this;this.searchValue=(this.searchValue||``)+t;var r=-1,i=!1;return this.focusedItemInfo.index===-1?r=this.visibleItems.findIndex(function(e){return n.isItemMatched(e)}):(r=this.visibleItems.slice(this.focusedItemInfo.index).findIndex(function(e){return n.isItemMatched(e)}),r=r===-1?this.visibleItems.slice(0,this.focusedItemInfo.index).findIndex(function(e){return n.isItemMatched(e)}):r+this.focusedItemInfo.index),r!==-1&&(i=!0),r===-1&&this.focusedItemInfo.index===-1&&(r=this.findFirstFocusedItemIndex()),r!==-1&&this.changeFocusedItemIndex(e,r),this.searchTimeout&&clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout(function(){n.searchValue=``,n.searchTimeout=null},500),i},changeFocusedItemIndex:function(e,t){this.focusedItemInfo.index!==t&&(this.focusedItemInfo.index=t,this.scrollInView())},scrollInView:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:-1,t=e===-1?this.focusedItemId:`${this.$id}_${e}`,n=E(this.menubar,`li[id="${t}"]`);n&&n.scrollIntoView&&n.scrollIntoView({block:`nearest`,inline:`start`})},createProcessedItems:function(e){var t=this,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:``,a=[];return e&&e.forEach(function(e,o){var s=(i===``?``:i+`_`)+o,c={item:e,index:o,level:n,key:s,parent:r,parentKey:i};c.items=t.createProcessedItems(e.items,n+1,c,s),a.push(c)}),a},containerRef:function(e){this.container=e},menubarRef:function(e){this.menubar=e?e.$el:void 0}},computed:{processedItems:function(){return this.createProcessedItems(this.model||[])},visibleItems:function(){var e=this,t=this.activeItemPath.find(function(t){return t.key===e.focusedItemInfo.parentKey});return t?t.items:this.processedItems},focusedItemId:function(){return this.focusedItemInfo.index===-1?null:`${this.$id}${S(this.focusedItemInfo.parentKey)?`_`+this.focusedItemInfo.parentKey:``}_${this.focusedItemInfo.index}`}},components:{MenubarSub:R,BarsIcon:N}};function K(e){"@babel/helpers - typeof";return K=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},K(e)}function q(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function J(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?q(Object(n),!0).forEach(function(t){Y(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):q(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function Y(e,t,n){return(t=X(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function X(e){var t=Z(e,`string`);return K(t)==`symbol`?t:t+``}function Z(e,t){if(K(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(K(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var Q=[`aria-haspopup`,`aria-expanded`,`aria-controls`,`aria-label`];function $(e,n,r,a,u,d){var f=t(`BarsIcon`),m=t(`MenubarSub`);return s(),p(`div`,o({ref:d.containerRef,class:e.cx(`root`)},e.ptmi(`root`)),[e.$slots.start?(s(),p(`div`,o({key:0,class:e.cx(`start`)},e.ptm(`start`)),[_(e.$slots,`start`)],16)):b(``,!0),_(e.$slots,e.$slots.button?`button`:`menubutton`,{id:e.$id,class:c(e.cx(`button`)),toggleCallback:function(e){return d.menuButtonClick(e)}},function(){return[e.model&&e.model.length>0?(s(),p(`a`,o({key:0,ref:`menubutton`,role:`button`,tabindex:`0`,class:e.cx(`button`),"aria-haspopup":!!(e.model.length&&e.model.length>0),"aria-expanded":u.mobileActive,"aria-controls":e.$id,"aria-label":e.$primevue.config.locale.aria?.navigation,onClick:n[0]||=function(e){return d.menuButtonClick(e)},onKeydown:n[1]||=function(e){return d.menuButtonKeydown(e)}},J(J({},e.buttonProps),e.ptm(`button`))),[_(e.$slots,e.$slots.buttonicon?`buttonicon`:`menubuttonicon`,{},function(){return[y(f,l(i(e.ptm(`buttonicon`))),null,16)]})],16,Q)):b(``,!0)]}),y(m,{ref:d.menubarRef,id:e.$id+`_list`,role:`menubar`,items:d.processedItems,templates:e.$slots,root:!0,mobileActive:u.mobileActive,tabindex:`0`,"aria-activedescendant":u.focused?d.focusedItemId:void 0,menuId:e.$id,focusedItemId:u.focused?d.focusedItemId:void 0,activeItemPath:u.activeItemPath,level:0,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,pt:e.pt,unstyled:e.unstyled,onFocus:d.onFocus,onBlur:d.onBlur,onKeydown:d.onKeyDown,onItemClick:d.onItemClick,onItemMouseenter:d.onItemMouseEnter,onItemMousemove:d.onItemMouseMove},null,8,[`id`,`items`,`templates`,`mobileActive`,`aria-activedescendant`,`menuId`,`focusedItemId`,`activeItemPath`,`aria-labelledby`,`aria-label`,`pt`,`unstyled`,`onFocus`,`onBlur`,`onKeydown`,`onItemClick`,`onItemMouseenter`,`onItemMousemove`]),e.$slots.end?(s(),p(`div`,o({key:1,class:e.cx(`end`)},e.ptm(`end`)),[_(e.$slots,`end`)],16)):b(``,!0)],16)}G.render=$;export{G as default};