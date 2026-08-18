import{Jt as e,Ot as t,P as n,U as r,X as i,_ as a,b as o,j as s,q as c,v as l,y as u}from"./C8bKil6U.js";import{t as d}from"./czlGUozm.js";import{t as f}from"./CRHlWn3X.js";import{t as p}from"./FiooIEjL.js";var m=d.extend({name:`tag`,style:`
    .p-tag {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: dt('tag.primary.background');
        color: dt('tag.primary.color');
        font-size: dt('tag.font.size');
        font-weight: dt('tag.font.weight');
        padding: dt('tag.padding');
        border-radius: dt('tag.border.radius');
        gap: dt('tag.gap');
    }

    .p-tag-icon {
        font-size: dt('tag.icon.size');
        width: dt('tag.icon.size');
        height: dt('tag.icon.size');
    }

    .p-tag-rounded {
        border-radius: dt('tag.rounded.border.radius');
    }

    .p-tag-success {
        background: dt('tag.success.background');
        color: dt('tag.success.color');
    }

    .p-tag-info {
        background: dt('tag.info.background');
        color: dt('tag.info.color');
    }

    .p-tag-warn {
        background: dt('tag.warn.background');
        color: dt('tag.warn.color');
    }

    .p-tag-danger {
        background: dt('tag.danger.background');
        color: dt('tag.danger.color');
    }

    .p-tag-secondary {
        background: dt('tag.secondary.background');
        color: dt('tag.secondary.color');
    }

    .p-tag-contrast {
        background: dt('tag.contrast.background');
        color: dt('tag.contrast.color');
    }
`,classes:{root:function(e){var t=e.props;return[`p-tag p-component`,{"p-tag-info":t.severity===`info`,"p-tag-success":t.severity===`success`,"p-tag-warn":t.severity===`warn`,"p-tag-danger":t.severity===`danger`,"p-tag-secondary":t.severity===`secondary`,"p-tag-contrast":t.severity===`contrast`,"p-tag-rounded":t.rounded}]},icon:`p-tag-icon`,label:`p-tag-label`}});s(),t();var h={name:`BaseTag`,extends:p,props:{value:null,severity:null,rounded:Boolean,icon:String},style:m,provide:function(){return{$pcTag:this,$parentInstance:this}}};function g(e){"@babel/helpers - typeof";return g=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},g(e)}function _(e,t,n){return(t=v(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function v(e){var t=y(e,`string`);return g(t)==`symbol`?t:t+``}function y(e,t){if(g(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(g(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var b={name:`Tag`,extends:h,inheritAttrs:!1,computed:{dataP:function(){return f(_({rounded:this.rounded},this.severity,this.severity))}}},x=[`data-p`];function S(t,s,d,f,p,m){return r(),o(`span`,n({class:t.cx(`root`),"data-p":m.dataP},t.ptmi(`root`)),[t.$slots.icon?(r(),l(i(t.$slots.icon),n({key:0,class:t.cx(`icon`)},t.ptm(`icon`)),null,16,[`class`])):t.icon?(r(),o(`span`,n({key:1,class:[t.cx(`icon`),t.icon]},t.ptm(`icon`)),null,16)):u(``,!0),t.value!=null||t.$slots.default?c(t.$slots,`default`,{key:2},function(){return[a(`span`,n({class:t.cx(`label`)},t.ptm(`label`)),e(t.value),17)]}):u(``,!0)],16,x)}b.render=S;export{b as default};