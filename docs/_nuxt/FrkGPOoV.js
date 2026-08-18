import{P as e,U as t,a as n,b as r,j as i,l as a,q as o}from"./C8bKil6U.js";import{t as s}from"./czlGUozm.js";import{t as c}from"./FiooIEjL.js";var l=s.extend({name:`inplace`,style:`
    .p-inplace-display {
        display: inline-block;
        cursor: pointer;
        border: 1px solid transparent;
        padding: dt('inplace.padding');
        border-radius: dt('inplace.border.radius');
        transition:
            background dt('inplace.transition.duration'),
            color dt('inplace.transition.duration'),
            outline-color dt('inplace.transition.duration'),
            box-shadow dt('inplace.transition.duration');
        outline-color: transparent;
    }

    .p-inplace-display:not(.p-disabled):hover {
        background: dt('inplace.display.hover.background');
        color: dt('inplace.display.hover.color');
    }

    .p-inplace-display:focus-visible {
        box-shadow: dt('inplace.focus.ring.shadow');
        outline: dt('inplace.focus.ring.width') dt('inplace.focus.ring.style') dt('inplace.focus.ring.color');
        outline-offset: dt('inplace.focus.ring.offset');
    }

    .p-inplace-content {
        display: block;
    }
`,classes:{root:`p-inplace p-component`,display:function(e){return[`p-inplace-display`,{"p-disabled":e.props.disabled}]},content:`p-inplace-content`}});i(),n();var u={name:`Inplace`,extends:{name:`BaseInplace`,extends:c,props:{active:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},displayProps:{type:null,default:null}},style:l,provide:function(){return{$pcInplace:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`open`,`close`,`update:active`],data:function(){return{d_active:this.active}},watch:{active:function(e){this.d_active=e}},methods:{open:function(e){this.disabled||(this.d_active=!0,this.$emit(`open`,e),this.$emit(`update:active`,!0))},close:function(e){var t=this;this.d_active=!1,this.$emit(`close`,e),this.$emit(`update:active`,!1),setTimeout(function(){t.$refs.display.focus()},0)}}};function d(e){"@babel/helpers - typeof";return d=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},d(e)}function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?f(Object(n),!0).forEach(function(t){m(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function m(e,t,n){return(t=h(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function h(e){var t=g(e,`string`);return d(t)==`symbol`?t:t+``}function g(e,t){if(d(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(d(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var _=[`tabindex`,`data-p-disabled`];function v(n,i,s,c,l,u){return t(),r(`div`,e({class:n.cx(`root`),"aria-live":`polite`},n.ptmi(`root`)),[l.d_active?(t(),r(`div`,e({key:1,class:n.cx(`content`)},n.ptm(`content`)),[o(n.$slots,`content`,{closeCallback:u.close})],16)):(t(),r(`div`,e({key:0,ref:`display`,class:n.cx(`display`),tabindex:n.$attrs.tabindex||`0`,role:`button`,onClick:i[0]||=function(){return u.open&&u.open.apply(u,arguments)},onKeydown:i[1]||=a(function(){return u.open&&u.open.apply(u,arguments)},[`enter`]),"data-p-disabled":n.disabled},p(p({},n.displayProps),n.ptm(`display`))),[o(n.$slots,`display`)],16,_))],16)}u.render=v;export{u as default};