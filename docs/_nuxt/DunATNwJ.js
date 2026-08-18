import{Jt as e,Ot as t,P as n,U as r,Ut as i,X as a,Y as o,_ as s,a as c,b as l,c as u,j as d,nt as f,q as p,t as m,tt as h,v as g,w as _,y as v}from"./C8bKil6U.js";import{t as y}from"./czlGUozm.js";import{t as b}from"./CRHlWn3X.js";import{t as x}from"./FiooIEjL.js";import{t as S}from"./Dt0c0nKr.js";import{t as C}from"./BI16ITd3.js";import{t as w}from"./NjzZx4ml.js";var T=y.extend({name:`fieldset`,style:`
    .p-fieldset {
        background: dt('fieldset.background');
        border: 1px solid dt('fieldset.border.color');
        border-radius: dt('fieldset.border.radius');
        color: dt('fieldset.color');
        padding: dt('fieldset.padding');
        margin: 0;
    }

    .p-fieldset-legend {
        background: dt('fieldset.legend.background');
        border-radius: dt('fieldset.legend.border.radius');
        border-width: dt('fieldset.legend.border.width');
        border-style: solid;
        border-color: dt('fieldset.legend.border.color');
        color: dt('fieldset.legend.color');
        padding: dt('fieldset.legend.padding');
        transition:
            background dt('fieldset.transition.duration'),
            color dt('fieldset.transition.duration'),
            outline-color dt('fieldset.transition.duration'),
            box-shadow dt('fieldset.transition.duration');
    }

    .p-fieldset-toggleable > .p-fieldset-legend {
        padding: 0;
    }

    .p-fieldset-toggle-button {
        cursor: pointer;
        user-select: none;
        overflow: hidden;
        position: relative;
        text-decoration: none;
        display: flex;
        gap: dt('fieldset.legend.gap');
        align-items: center;
        justify-content: center;
        padding: dt('fieldset.legend.padding');
        background: transparent;
        border: 0 none;
        border-radius: dt('fieldset.legend.border.radius');
        transition:
            background dt('fieldset.transition.duration'),
            color dt('fieldset.transition.duration'),
            outline-color dt('fieldset.transition.duration'),
            box-shadow dt('fieldset.transition.duration');
        outline-color: transparent;
    }

    .p-fieldset-legend-label {
        font-weight: dt('fieldset.legend.font.weight');
    }

    .p-fieldset-toggle-button:focus-visible {
        box-shadow: dt('fieldset.legend.focus.ring.shadow');
        outline: dt('fieldset.legend.focus.ring.width') dt('fieldset.legend.focus.ring.style') dt('fieldset.legend.focus.ring.color');
        outline-offset: dt('fieldset.legend.focus.ring.offset');
    }

    .p-fieldset-toggleable > .p-fieldset-legend:hover {
        color: dt('fieldset.legend.hover.color');
        background: dt('fieldset.legend.hover.background');
    }

    .p-fieldset-toggle-icon {
        color: dt('fieldset.toggle.icon.color');
        transition: color dt('fieldset.transition.duration');
    }

    .p-fieldset-toggleable > .p-fieldset-legend:hover .p-fieldset-toggle-icon {
        color: dt('fieldset.toggle.icon.hover.color');
    }

    .p-fieldset-content-container {
        display: grid;
        grid-template-rows: 1fr;
    }

    .p-fieldset-content-wrapper {
        min-height: 0;
    }

    .p-fieldset-content {
        padding: dt('fieldset.content.padding');
    }
`,classes:{root:function(e){return[`p-fieldset p-component`,{"p-fieldset-toggleable":e.props.toggleable}]},legend:`p-fieldset-legend`,legendLabel:`p-fieldset-legend-label`,toggleButton:`p-fieldset-toggle-button`,toggleIcon:`p-fieldset-toggle-icon`,contentContainer:`p-fieldset-content-container`,contentWrapper:`p-fieldset-content-wrapper`,content:`p-fieldset-content`}});d(),t(),c();var E={name:`Fieldset`,extends:{name:`BaseFieldset`,extends:x,props:{legend:String,toggleable:Boolean,collapsed:Boolean,toggleButtonProps:{type:null,default:null}},style:T,provide:function(){return{$pcFieldset:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`update:collapsed`,`toggle`],data:function(){return{d_collapsed:this.collapsed}},watch:{collapsed:function(e){this.d_collapsed=e}},methods:{toggle:function(e){this.d_collapsed=!this.d_collapsed,this.$emit(`update:collapsed`,this.d_collapsed),this.$emit(`toggle`,{originalEvent:e,value:this.d_collapsed})},onKeyDown:function(e){(e.code===`Enter`||e.code===`NumpadEnter`||e.code===`Space`)&&(this.toggle(e),e.preventDefault())}},computed:{buttonAriaLabel:function(){return this.toggleButtonProps&&this.toggleButtonProps.ariaLabel?this.toggleButtonProps.ariaLabel:this.legend},dataP:function(){return b({toggleable:this.toggleable})}},directives:{ripple:S},components:{PlusIcon:C,MinusIcon:w}};function D(e){"@babel/helpers - typeof";return D=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},D(e)}function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function k(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?O(Object(n),!0).forEach(function(t){A(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function A(e,t,n){return(t=j(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function j(e){var t=M(e,`string`);return D(t)==`symbol`?t:t+``}function M(e,t){if(D(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(D(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var N=[`data-p`],P=[`data-p`],F=[`id`],I=[`id`,`aria-controls`,`aria-expanded`,`aria-label`],L=[`id`,`aria-labelledby`];function R(t,c,d,y,b,x){var S=o(`ripple`);return r(),l(`fieldset`,n({class:t.cx(`root`),"data-p":x.dataP},t.ptmi(`root`)),[s(`legend`,n({class:t.cx(`legend`),"data-p":x.dataP},t.ptm(`legend`)),[p(t.$slots,`legend`,{toggleCallback:x.toggle},function(){return[t.toggleable?v(``,!0):(r(),l(`span`,n({key:0,id:t.$id+`_header`,class:t.cx(`legendLabel`)},t.ptm(`legendLabel`)),e(t.legend),17,F)),t.toggleable?f((r(),l(`button`,n({key:1,id:t.$id+`_header`,type:`button`,"aria-controls":t.$id+`_content`,"aria-expanded":!b.d_collapsed,"aria-label":x.buttonAriaLabel,class:t.cx(`toggleButton`),onClick:c[0]||=function(){return x.toggle&&x.toggle.apply(x,arguments)},onKeydown:c[1]||=function(){return x.onKeyDown&&x.onKeyDown.apply(x,arguments)}},k(k({},t.toggleButtonProps),t.ptm(`toggleButton`))),[p(t.$slots,t.$slots.toggleicon?`toggleicon`:`togglericon`,{collapsed:b.d_collapsed,class:i(t.cx(`toggleIcon`))},function(){return[(r(),g(a(b.d_collapsed?`PlusIcon`:`MinusIcon`),n({class:t.cx(`toggleIcon`)},t.ptm(`toggleIcon`)),null,16,[`class`]))]}),s(`span`,n({class:t.cx(`legendLabel`)},t.ptm(`legendLabel`)),e(t.legend),17)],16,I)),[[S]]):v(``,!0)]})],16,P),_(m,n({name:`p-collapsible`},t.ptm(`transition`)),{default:h(function(){return[f(s(`div`,n({id:t.$id+`_content`,class:t.cx(`contentContainer`),role:`region`,"aria-labelledby":t.$id+`_header`},t.ptm(`contentContainer`)),[s(`div`,n({class:t.cx(`contentWrapper`)},t.ptm(`contentWrapper`)),[s(`div`,n({class:t.cx(`content`)},t.ptm(`content`)),[p(t.$slots,`default`)],16)],16)],16,L),[[u,!b.d_collapsed]])]}),_:3},16)],16,N)}E.render=R;export{E as default};