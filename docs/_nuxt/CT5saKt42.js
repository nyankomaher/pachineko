import{P as e,U as t,b as n,j as r,q as i}from"./C8bKil6U.js";import{t as a}from"./czlGUozm.js";import{t as o}from"./FiooIEjL.js";var s=a.extend({name:`buttongroup`,style:`
    .p-buttongroup {
        display: inline-flex;
    }

    .p-buttongroup .p-button {
        margin: 0;
    }

    .p-buttongroup .p-button:not(:last-child),
    .p-buttongroup .p-button:not(:last-child):hover {
        border-inline-end: 0 none;
    }

    .p-buttongroup .p-button:not(:first-of-type):not(:last-of-type) {
        border-radius: 0;
    }

    .p-buttongroup .p-button:first-of-type:not(:only-of-type) {
        border-start-end-radius: 0;
        border-end-end-radius: 0;
    }

    .p-buttongroup .p-button:last-of-type:not(:only-of-type) {
        border-start-start-radius: 0;
        border-end-start-radius: 0;
    }

    .p-buttongroup .p-button:focus {
        position: relative;
        z-index: 1;
    }
`,classes:{root:`p-buttongroup p-component`}});r();var c={name:`ButtonGroup`,extends:{name:`BaseButtonGroup`,extends:o,style:s,provide:function(){return{$pcButtonGroup:this,$parentInstance:this}}},inheritAttrs:!1};function l(r,a,o,s,c,l){return t(),n(`span`,e({class:r.cx(`root`),role:`group`},r.ptmi(`root`)),[i(r.$slots,`default`)],16)}c.render=l;export{c as default};