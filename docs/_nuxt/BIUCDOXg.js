import{Jt as e,K as t,Ot as n,P as r,U as i,Ut as a,X as o,Y as s,_ as c,b as l,d as u,j as d,nt as f,v as p,y as m}from"./C8bKil6U.js";import{E as h,P as g,_,et as v,t as y,w as b}from"./czlGUozm.js";import{t as x}from"./FiooIEjL.js";import{t as S}from"./Dt0c0nKr.js";var C=y.extend({name:`tabmenu`,style:`
    .p-tabmenu {
        overflow-x: auto;
    }

    .p-tabmenu-tablist {
        display: flex;
        margin: 0;
        padding: 0;
        list-style-type: none;
        background: dt('tabmenu.tablist.background');
        border-style: solid;
        border-color: dt('tabmenu.tablist.border.color');
        border-width: dt('tabmenu.tablist.border.width');
        position: relative;
    }

    .p-tabmenu-item-link {
        cursor: pointer;
        user-select: none;
        display: flex;
        align-items: center;
        text-decoration: none;
        position: relative;
        overflow: hidden;
        background: dt('tabmenu.item.background');
        border-style: solid;
        border-width: dt('tabmenu.item.border.width');
        border-color: dt('tabmenu.item.border.color');
        color: dt('tabmenu.item.color');
        padding: dt('tabmenu.item.padding');
        font-weight: dt('tabmenu.item.font.weight');
        transition:
            background dt('tabmenu.transition.duration'),
            border-color dt('tabmenu.transition.duration'),
            color dt('tabmenu.transition.duration'),
            outline-color dt('tabmenu.transition.duration'),
            box-shadow dt('tabmenu.transition.duration');
        margin: dt('tabmenu.item.margin');
        outline-color: transparent;
        gap: dt('tabmenu.item.gap');
    }

    .p-tabmenu-item-link:focus-visible {
        z-index: 1;
        box-shadow: dt('tabmenu.item.focus.ring.shadow');
        outline: dt('tabmenu.item.focus.ring.width') dt('tabmenu.item.focus.ring.style') dt('tabmenu.item.focus.ring.color');
        outline-offset: dt('tabmenu.item.focus.ring.offset');
    }

    .p-tabmenu-item-icon {
        color: dt('tabmenu.item.icon.color');
        transition:
            background dt('tabmenu.transition.duration'),
            border-color dt('tabmenu.transition.duration'),
            color dt('tabmenu.transition.duration'),
            outline-color dt('tabmenu.transition.duration'),
            box-shadow dt('tabmenu.transition.duration');
    }

    .p-tabmenu-item-label {
        line-height: 1;
    }

    .p-tabmenu-item:not(.p-tabmenu-item-active):not(.p-disabled):hover .p-tabmenu-item-link {
        background: dt('tabmenu.item.hover.background');
        border-color: dt('tabmenu.item.hover.border.color');
        color: dt('tabmenu.item.hover.color');
    }

    .p-tabmenu-item:not(.p-tabmenu-item-active):not(.p-disabled):hover .p-tabmenu-item-icon {
        color: dt('tabmenu.item.icon.hover.color');
    }

    .p-tabmenu-item-active .p-tabmenu-item-link {
        background: dt('tabmenu.item.active.background');
        border-color: dt('tabmenu.item.active.border.color');
        color: dt('tabmenu.item.active.color');
    }

    .p-tabmenu-item-active .p-tabmenu-item-icon {
        color: dt('tabmenu.item.icon.active.color');
    }

    .p-tabmenu-active-bar {
        z-index: 1;
        display: block;
        position: absolute;
        bottom: dt('tabmenu.active.bar.bottom');
        height: dt('tabmenu.active.bar.height');
        background: dt('tabmenu.active.bar.background');
        transition: 250ms cubic-bezier(0.35, 0, 0.25, 1);
    }

    .p-tabmenu::-webkit-scrollbar {
        display: none;
    }
`,classes:{root:`p-tabmenu p-component`,tablist:`p-tabmenu-tablist`,item:function(e){var t=e.instance,n=e.index,r=e.item;return[`p-tabmenu-item`,{"p-tabmenu-item-active":t.d_activeIndex===n,"p-disabled":t.disabled(r)}]},itemLink:`p-tabmenu-item-link`,itemIcon:`p-tabmenu-item-icon`,itemLabel:`p-tabmenu-item-label`,activeBar:`p-tabmenu-active-bar`}});d(),n();var w={name:`TabMenu`,extends:{name:`BaseTabMenu`,extends:x,props:{model:{type:Array,default:null},activeIndex:{type:Number,default:0},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:C,provide:function(){return{$pcTabMenu:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`update:activeIndex`,`tab-change`],data:function(){return{d_activeIndex:this.activeIndex}},watch:{activeIndex:{flush:`post`,handler:function(e){this.d_activeIndex=e,this.updateInkBar()}}},mounted:function(){var e=this;this.$nextTick(function(){e.updateInkBar()});var t=this.findActiveItem();t&&(t.tabIndex=`0`)},updated:function(){this.updateInkBar()},methods:{getPTOptions:function(e,t,n){return this.ptm(e,{context:{item:t,index:n}})},onItemClick:function(e,t,n){if(this.disabled(t)){e.preventDefault();return}t.command&&t.command({originalEvent:e,item:t}),n!==this.d_activeIndex&&(this.d_activeIndex=n,this.$emit(`update:activeIndex`,this.d_activeIndex)),this.$emit(`tab-change`,{originalEvent:e,index:n})},onKeydownItem:function(e,t,n){switch(e.code){case`ArrowRight`:this.navigateToNextItem(e.target),e.preventDefault();break;case`ArrowLeft`:this.navigateToPrevItem(e.target),e.preventDefault();break;case`Home`:this.navigateToFirstItem(e.target),e.preventDefault();break;case`End`:this.navigateToLastItem(e.target),e.preventDefault();break;case`Space`:case`NumpadEnter`:case`Enter`:this.onItemClick(e,t,n),e.preventDefault();break;case`Tab`:this.onTabKey();break}},navigateToNextItem:function(e){var t=this.findNextItem(e);t&&this.setFocusToMenuitem(e,t)},navigateToPrevItem:function(e){var t=this.findPrevItem(e);t&&this.setFocusToMenuitem(e,t)},navigateToFirstItem:function(e){var t=this.findFirstItem(e);t&&this.setFocusToMenuitem(e,t)},navigateToLastItem:function(e){var t=this.findLastItem(e);t&&this.setFocusToMenuitem(e,t)},findNextItem:function(e){var t=e.parentElement.nextElementSibling;return t?b(t,`data-p-disabled`)===!0?this.findNextItem(t.children[0]):t.children[0]:null},findPrevItem:function(e){var t=e.parentElement.previousElementSibling;return t?b(t,`data-p-disabled`)===!0?this.findPrevItem(t.children[0]):t.children[0]:null},findFirstItem:function(){var e=v(this.$refs.nav,`[data-pc-section="item"][data-p-disabled="false"]`);return e?e.children[0]:null},findLastItem:function(){var e=g(this.$refs.nav,`[data-pc-section="item"][data-p-disabled="false"]`);return e?e[e.length-1].children[0]:null},findActiveItem:function(){var e=v(this.$refs.nav,`[data-pc-section="item"][data-p-disabled="false"][data-p-active="true"]`);return e?e.children[0]:null},setFocusToMenuitem:function(e,t){e.tabIndex=`-1`,t.tabIndex=`0`,t.focus()},onTabKey:function(){var e=v(this.$refs.nav,`[data-pc-section="item"][data-p-disabled="false"][data-p-active="true"]`),t=v(this.$refs.nav,`[data-pc-section="itemlink"][tabindex="0"]`);t!==e.children[0]&&(e&&(e.children[0].tabIndex=`0`),t.tabIndex=`-1`)},visible:function(e){return typeof e.visible==`function`?e.visible():e.visible!==!1},disabled:function(e){return typeof e.disabled==`function`?e.disabled():e.disabled===!0},label:function(e){return typeof e.label==`function`?e.label():e.label},updateInkBar:function(){for(var e=this.$refs.nav.children,t=!1,n=0;n<e.length;n++){var r=e[n];b(r,`data-p-active`)&&(this.$refs.inkbar.style.width=h(r)+`px`,this.$refs.inkbar.style.left=_(r).left-_(this.$refs.nav).left+`px`,t=!0)}t||(this.$refs.inkbar.style.width=`0px`,this.$refs.inkbar.style.left=`0px`)},getMenuItemProps:function(e,t){var n=this;return{action:r({class:this.cx(`itemLink`),tabindex:-1,onClick:function(r){return n.onItemClick(r,e,t)},onKeyDown:function(r){return n.onKeydownItem(r,e,t)}},this.getPTOptions(`itemLink`,e,t)),icon:r({class:[this.cx(`itemIcon`),e.icon]},this.getPTOptions(`itemIcon`,e,t)),label:r({class:this.cx(`itemLabel`)},this.getPTOptions(`itemLabel`,e,t))}}},directives:{ripple:S}},T=[`aria-labelledby`,`aria-label`],E=[`onClick`,`onKeydown`,`data-p-active`,`data-p-disabled`],D=[`href`,`target`,`aria-label`,`aria-disabled`];function O(n,d,h,g,_,v){var y=s(`ripple`);return i(),l(`div`,r({class:n.cx(`root`)},n.ptmi(`root`)),[c(`ul`,r({ref:`nav`,class:n.cx(`tablist`),role:`menubar`,"aria-labelledby":n.ariaLabelledby,"aria-label":n.ariaLabel},n.ptm(`tablist`)),[(i(!0),l(u,null,t(n.model,function(t,s){return i(),l(u,{key:v.label(t)+`_`+s.toString()},[v.visible(t)?(i(),l(`li`,r({key:0,ref_for:!0,ref:`tab`,class:[n.cx(`item`,{item:t,index:s}),t.class],role:`presentation`,onClick:function(e){return v.onItemClick(e,t,s)},onKeydown:function(e){return v.onKeydownItem(e,t,s)}},{ref_for:!0},v.getPTOptions(`item`,t,s),{"data-p-active":_.d_activeIndex===s,"data-p-disabled":v.disabled(t)}),[n.$slots.item?(i(),p(o(n.$slots.item),{key:1,item:t,index:s,active:s===_.d_activeIndex,label:v.label(t),props:v.getMenuItemProps(t,s)},null,8,[`item`,`index`,`active`,`label`,`props`])):f((i(),l(`a`,r({key:0,ref_for:!0,ref:`tabLink`,role:`menuitem`,href:t.url,class:n.cx(`itemLink`),target:t.target,"aria-label":v.label(t),"aria-disabled":v.disabled(t),tabindex:-1},{ref_for:!0},v.getPTOptions(`itemLink`,t,s)),[n.$slots.itemicon?(i(),p(o(n.$slots.itemicon),{key:0,item:t,class:a(n.cx(`itemIcon`))},null,8,[`item`,`class`])):t.icon?(i(),l(`span`,r({key:1,class:[n.cx(`itemIcon`),t.icon]},{ref_for:!0},v.getPTOptions(`itemIcon`,t,s)),null,16)):m(``,!0),c(`span`,r({class:n.cx(`itemLabel`)},{ref_for:!0},v.getPTOptions(`itemLabel`,t,s)),e(v.label(t)),17)],16,D)),[[y]])],16,E)):m(``,!0)],64)}),128)),c(`li`,r({ref:`inkbar`,role:`none`,class:n.cx(`activeBar`)},n.ptm(`activeBar`)),null,16)],16,T)],16)}w.render=O;export{w as default};