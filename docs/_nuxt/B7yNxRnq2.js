import{J as e,Jt as t,K as n,Ot as r,P as i,U as a,Ut as o,X as s,_ as c,b as l,d as u,j as d,q as f,v as p,w as m,y as h}from"./C8bKil6U.js";import{t as g}from"./czlGUozm.js";import{t as _}from"./FiooIEjL.js";import{t as v}from"./CtougOl92.js";var y=g.extend({name:`breadcrumb`,style:`
    .p-breadcrumb {
        background: dt('breadcrumb.background');
        padding: dt('breadcrumb.padding');
        overflow-x: auto;
    }

    .p-breadcrumb-list {
        margin: 0;
        padding: 0;
        list-style-type: none;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        gap: dt('breadcrumb.gap');
    }

    .p-breadcrumb-separator {
        display: flex;
        align-items: center;
        color: dt('breadcrumb.separator.color');
    }

    .p-breadcrumb-separator-icon:dir(rtl) {
        transform: rotate(180deg);
    }

    .p-breadcrumb::-webkit-scrollbar {
        display: none;
    }

    .p-breadcrumb-item-link {
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: dt('breadcrumb.item.gap');
        transition:
            background dt('breadcrumb.transition.duration'),
            color dt('breadcrumb.transition.duration'),
            outline-color dt('breadcrumb.transition.duration'),
            box-shadow dt('breadcrumb.transition.duration');
        border-radius: dt('breadcrumb.item.border.radius');
        outline-color: transparent;
        color: dt('breadcrumb.item.color');
    }

    .p-breadcrumb-item-link:focus-visible {
        box-shadow: dt('breadcrumb.item.focus.ring.shadow');
        outline: dt('breadcrumb.item.focus.ring.width') dt('breadcrumb.item.focus.ring.style') dt('breadcrumb.item.focus.ring.color');
        outline-offset: dt('breadcrumb.item.focus.ring.offset');
    }

    .p-breadcrumb-item-link:hover .p-breadcrumb-item-label {
        color: dt('breadcrumb.item.hover.color');
    }

    .p-breadcrumb-item-label {
        transition: inherit;
    }

    .p-breadcrumb-item-icon {
        color: dt('breadcrumb.item.icon.color');
        transition: inherit;
    }

    .p-breadcrumb-item-link:hover .p-breadcrumb-item-icon {
        color: dt('breadcrumb.item.icon.hover.color');
    }
`,classes:{root:`p-breadcrumb p-component`,list:`p-breadcrumb-list`,homeItem:`p-breadcrumb-home-item`,separator:`p-breadcrumb-separator`,separatorIcon:`p-breadcrumb-separator-icon`,item:function(e){return[`p-breadcrumb-item`,{"p-disabled":e.instance.disabled()}]},itemLink:`p-breadcrumb-item-link`,itemIcon:`p-breadcrumb-item-icon`,itemLabel:`p-breadcrumb-item-label`}});d(),r();var b={name:`BaseBreadcrumb`,extends:_,props:{model:{type:Array,default:null},home:{type:null,default:null}},style:y,provide:function(){return{$pcBreadcrumb:this,$parentInstance:this}}},x={name:`BreadcrumbItem`,hostName:`Breadcrumb`,extends:_,props:{item:null,templates:null,index:null},methods:{onClick:function(e){this.item.command&&this.item.command({originalEvent:e,item:this.item})},visible:function(){return typeof this.item.visible==`function`?this.item.visible():this.item.visible!==!1},disabled:function(){return typeof this.item.disabled==`function`?this.item.disabled():this.item.disabled},label:function(){return typeof this.item.label==`function`?this.item.label():this.item.label},isCurrentUrl:function(){var e=this.item,t=e.to,n=e.url,r=typeof window<`u`?window.location.pathname:``;return t===r||n===r?`page`:void 0}},computed:{ptmOptions:function(){return{context:{item:this.item,index:this.index}}},getMenuItemProps:function(){var e=this;return{action:i({class:this.cx(`itemLink`),"aria-current":this.isCurrentUrl(),onClick:function(t){return e.onClick(t)}},this.ptm(`itemLink`,this.ptmOptions)),icon:i({class:[this.cx(`icon`),this.item.icon]},this.ptm(`icon`,this.ptmOptions)),label:i({class:this.cx(`label`)},this.ptm(`label`,this.ptmOptions))}}}},S=[`href`,`target`,`aria-current`];function C(e,n,r,c,u,d){return d.visible()?(a(),l(`li`,i({key:0,class:[e.cx(`item`),r.item.class]},e.ptm(`item`,d.ptmOptions)),[r.templates.item?(a(),p(s(r.templates.item),{key:1,item:r.item,label:d.label(),props:d.getMenuItemProps},null,8,[`item`,`label`,`props`])):(a(),l(`a`,i({key:0,href:r.item.url||`#`,class:e.cx(`itemLink`),target:r.item.target,"aria-current":d.isCurrentUrl(),onClick:n[0]||=function(){return d.onClick&&d.onClick.apply(d,arguments)}},e.ptm(`itemLink`,d.ptmOptions)),[r.templates&&r.templates.itemicon?(a(),p(s(r.templates.itemicon),{key:0,item:r.item,class:o(e.cx(`itemIcon`,d.ptmOptions))},null,8,[`item`,`class`])):r.item.icon?(a(),l(`span`,i({key:1,class:[e.cx(`itemIcon`),r.item.icon]},e.ptm(`itemIcon`,d.ptmOptions)),null,16)):h(``,!0),r.item.label?(a(),l(`span`,i({key:2,class:e.cx(`itemLabel`)},e.ptm(`itemLabel`,d.ptmOptions)),t(d.label()),17)):h(``,!0)],16,S))],16)):h(``,!0)}x.render=C;var w={name:`Breadcrumb`,extends:b,inheritAttrs:!1,components:{BreadcrumbItem:x,ChevronRightIcon:v}};function T(t,r,o,s,d,g){var _=e(`BreadcrumbItem`),v=e(`ChevronRightIcon`);return a(),l(`nav`,i({class:t.cx(`root`)},t.ptmi(`root`)),[c(`ol`,i({class:t.cx(`list`)},t.ptm(`list`)),[t.home?(a(),p(_,i({key:0,item:t.home,class:t.cx(`homeItem`),templates:t.$slots,pt:t.pt,unstyled:t.unstyled},t.ptm(`homeItem`)),null,16,[`item`,`class`,`templates`,`pt`,`unstyled`])):h(``,!0),(a(!0),l(u,null,n(t.model,function(e,n){return a(),l(u,{key:e.label+`_`+n},[t.home||n!==0?(a(),l(`li`,i({key:0,class:t.cx(`separator`)},{ref_for:!0},t.ptm(`separator`)),[f(t.$slots,`separator`,{},function(){return[m(v,i({"aria-hidden":`true`,class:t.cx(`separatorIcon`)},{ref_for:!0},t.ptm(`separatorIcon`)),null,16,[`class`])]})],16)):h(``,!0),m(_,{item:e,index:n,templates:t.$slots,pt:t.pt,unstyled:t.unstyled},null,8,[`item`,`index`,`templates`,`pt`,`unstyled`])],64)}),128))],16)],16)}w.render=T;export{w as default};