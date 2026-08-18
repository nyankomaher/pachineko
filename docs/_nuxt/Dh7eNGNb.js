import{J as e,P as t,U as n,b as r,j as i,q as a,w as o}from"./C8bKil6U.js";import{t as s}from"./czlGUozm.js";import{n as c}from"./DrfjUyko.js";var l=s.extend({name:`overlaybadge`,style:`
    .p-overlaybadge {
        position: relative;
    }

    .p-overlaybadge .p-badge {
        position: absolute;
        inset-block-start: 0;
        inset-inline-end: 0;
        transform: translate(50%, -50%);
        transform-origin: 100% 0;
        margin: 0;
        outline-width: dt('overlaybadge.outline.width');
        outline-style: solid;
        outline-color: dt('overlaybadge.outline.color');
    }

    .p-overlaybadge .p-badge:dir(rtl) {
        transform: translate(-50%, -50%);
    }
`,classes:{root:`p-overlaybadge`}});i();var u={name:`OverlayBadge`,extends:{name:`OverlayBadge`,extends:c,style:l,provide:function(){return{$pcOverlayBadge:this,$parentInstance:this}}},inheritAttrs:!1,components:{Badge:c}};function d(i,s,c,l,u,d){var f=e(`Badge`);return n(),r(`div`,t({class:i.cx(`root`)},i.ptmi(`root`)),[a(i.$slots,`default`),o(f,t(i.$props,{pt:i.ptm(`pcBadge`)}),null,16,[`pt`])],16)}u.render=d;export{u as default};