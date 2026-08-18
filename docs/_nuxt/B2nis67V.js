import{P as e,U as t,_ as n,b as r,j as i,q as a}from"./C8bKil6U.js";import{t as o}from"./czlGUozm.js";import{t as s}from"./FiooIEjL.js";var c=o.extend({name:`toolbar`,style:`
    .p-toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: dt('toolbar.padding');
        background: dt('toolbar.background');
        border: 1px solid dt('toolbar.border.color');
        color: dt('toolbar.color');
        border-radius: dt('toolbar.border.radius');
        gap: dt('toolbar.gap');
    }

    .p-toolbar-start,
    .p-toolbar-center,
    .p-toolbar-end {
        display: flex;
        align-items: center;
    }
`,classes:{root:`p-toolbar p-component`,start:`p-toolbar-start`,center:`p-toolbar-center`,end:`p-toolbar-end`}});i();var l={name:`Toolbar`,extends:{name:`BaseToolbar`,extends:s,props:{ariaLabelledby:{type:String,default:null}},style:c,provide:function(){return{$pcToolbar:this,$parentInstance:this}}},inheritAttrs:!1},u=[`aria-labelledby`];function d(i,o,s,c,l,d){return t(),r(`div`,e({class:i.cx(`root`),role:`toolbar`,"aria-labelledby":i.ariaLabelledby},i.ptmi(`root`)),[n(`div`,e({class:i.cx(`start`)},i.ptm(`start`)),[a(i.$slots,`start`)],16),n(`div`,e({class:i.cx(`center`)},i.ptm(`center`)),[a(i.$slots,`center`)],16),n(`div`,e({class:i.cx(`end`)},i.ptm(`end`)),[a(i.$slots,`end`)],16)],16,u)}l.render=d;export{l as default};