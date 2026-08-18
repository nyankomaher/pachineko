import{P as e,U as t,_ as n,b as r,j as i,q as a,y as o}from"./C8bKil6U.js";import{t as s}from"./czlGUozm.js";import{t as c}from"./FiooIEjL.js";var l=s.extend({name:`card`,style:`
    .p-card {
        background: dt('card.background');
        color: dt('card.color');
        box-shadow: dt('card.shadow');
        border-radius: dt('card.border.radius');
        display: flex;
        flex-direction: column;
    }

    .p-card-caption {
        display: flex;
        flex-direction: column;
        gap: dt('card.caption.gap');
    }

    .p-card-body {
        padding: dt('card.body.padding');
        display: flex;
        flex-direction: column;
        gap: dt('card.body.gap');
    }

    .p-card-title {
        font-size: dt('card.title.font.size');
        font-weight: dt('card.title.font.weight');
    }

    .p-card-subtitle {
        color: dt('card.subtitle.color');
    }
`,classes:{root:`p-card p-component`,header:`p-card-header`,body:`p-card-body`,caption:`p-card-caption`,title:`p-card-title`,subtitle:`p-card-subtitle`,content:`p-card-content`,footer:`p-card-footer`}});i();var u={name:`Card`,extends:{name:`BaseCard`,extends:c,style:l,provide:function(){return{$pcCard:this,$parentInstance:this}}},inheritAttrs:!1};function d(i,s,c,l,u,d){return t(),r(`div`,e({class:i.cx(`root`)},i.ptmi(`root`)),[i.$slots.header?(t(),r(`div`,e({key:0,class:i.cx(`header`)},i.ptm(`header`)),[a(i.$slots,`header`)],16)):o(``,!0),n(`div`,e({class:i.cx(`body`)},i.ptm(`body`)),[i.$slots.title||i.$slots.subtitle?(t(),r(`div`,e({key:0,class:i.cx(`caption`)},i.ptm(`caption`)),[i.$slots.title?(t(),r(`div`,e({key:0,class:i.cx(`title`)},i.ptm(`title`)),[a(i.$slots,`title`)],16)):o(``,!0),i.$slots.subtitle?(t(),r(`div`,e({key:1,class:i.cx(`subtitle`)},i.ptm(`subtitle`)),[a(i.$slots,`subtitle`)],16)):o(``,!0)],16)):o(``,!0),n(`div`,e({class:i.cx(`content`)},i.ptm(`content`)),[a(i.$slots,`content`)],16),i.$slots.footer?(t(),r(`div`,e({key:1,class:i.cx(`footer`)},i.ptm(`footer`)),[a(i.$slots,`footer`)],16)):o(``,!0)],16)],16)}u.render=d;export{u as default};