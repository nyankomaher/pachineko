import{J as e,K as t,Ot as n,P as r,U as i,Ut as a,_ as o,b as s,d as c,j as l,q as u,tt as d,w as f}from"./C8bKil6U.js";import{t as p}from"./czlGUozm.js";import{t as m}from"./FiooIEjL.js";import{n as h}from"./CtCgyYMG.js";var g=p.extend({name:`inputchips`,style:`
    .p-inputchips {
        display: inline-flex;
    }

    .p-inputchips-input {
        margin: 0;
        list-style-type: none;
        cursor: text;
        overflow: hidden;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: calc(dt('inputchips.padding.y') / 2) dt('inputchips.padding.x');
        gap: calc(dt('inputchips.padding.y') / 2);
        color: dt('inputchips.color');
        background: dt('inputchips.background');
        border: 1px solid dt('inputchips.border.color');
        border-radius: dt('inputchips.border.radius');
        width: 100%;
        transition:
            background dt('inputchips.transition.duration'),
            color dt('inputchips.transition.duration'),
            border-color dt('inputchips.transition.duration'),
            outline-color dt('inputchips.transition.duration'),
            box-shadow dt('inputchips.transition.duration');
        outline-color: transparent;
        box-shadow: dt('inputchips.shadow');
    }

    .p-inputchips:not(.p-disabled):hover .p-inputchips-input {
        border-color: dt('inputchips.hover.border.color');
    }

    .p-inputchips:not(.p-disabled).p-focus .p-inputchips-input {
        border-color: dt('inputchips.focus.border.color');
        box-shadow: dt('inputchips.focus.ring.shadow');
        outline: dt('inputchips.focus.ring.width') dt('inputchips.focus.ring.style') dt('inputchips.focus.ring.color');
        outline-offset: dt('inputchips.focus.ring.offset');
    }

    .p-inputchips.p-invalid .p-inputchips-input {
        border-color: dt('inputchips.invalid.border.color');
    }

    .p-variant-filled.p-inputchips-input {
        background: dt('inputchips.filled.background');
    }

    .p-inputchips:not(.p-disabled).p-focus .p-variant-filled.p-inputchips-input {
        background: dt('inputchips.filled.focus.background');
    }

    .p-inputchips.p-disabled .p-inputchips-input {
        opacity: 1;
        background: dt('inputchips.disabled.background');
        color: dt('inputchips.disabled.color');
    }

    .p-inputchips-chip.p-chip {
        padding-top: calc(dt('inputchips.padding.y') / 2);
        padding-bottom: calc(dt('inputchips.padding.y') / 2);
        border-radius: dt('inputchips.chip.border.radius');
        transition:
            background dt('inputchips.transition.duration'),
            color dt('inputchips.transition.duration');
    }

    .p-inputchips-chip-item.p-focus .p-inputchips-chip {
        background: dt('inputchips.chip.focus.background');
        color: dt('inputchips.chip.focus.color');
    }

    .p-inputchips-input:has(.p-inputchips-chip) {
        padding-left: calc(dt('inputchips.padding.y') / 2);
        padding-right: calc(dt('inputchips.padding.y') / 2);
    }

    .p-inputchips-input-item {
        flex: 1 1 auto;
        display: inline-flex;
        padding-top: calc(dt('inputchips.padding.y') / 2);
        padding-bottom: calc(dt('inputchips.padding.y') / 2);
    }

    .p-inputchips-input-item input {
        border: 0 none;
        outline: 0 none;
        background: transparent;
        margin: 0;
        padding: 0;
        box-shadow: none;
        border-radius: 0;
        width: 100%;
        font-family: inherit;
        font-feature-settings: inherit;
        font-size: 1rem;
        color: inherit;
    }

    .p-inputchips-input-item input::placeholder {
        color: dt('inputchips.placeholder.color');
    }
`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-inputchips p-component p-inputwrapper`,{"p-disabled":n.disabled,"p-invalid":n.invalid,"p-focus":t.focused,"p-inputwrapper-filled":n.modelValue&&n.modelValue.length||t.inputValue&&t.inputValue.length,"p-inputwrapper-focus":t.focused}]},input:function(e){var t=e.props,n=e.instance;return[`p-inputchips-input`,{"p-variant-filled":t.variant?t.variant===`filled`:n.$primevue.config.inputStyle===`filled`||n.$primevue.config.inputVariant===`filled`}]},chipItem:function(e){var t=e.state,n=e.index;return[`p-inputchips-chip-item`,{"p-focus":t.focusedIndex===n}]},pcChip:`p-inputchips-chip`,chipIcon:`p-inputchips-chip-icon`,inputItem:`p-inputchips-input-item`}});l(),n();var _={name:`BaseInputChips`,extends:m,props:{modelValue:{type:Array,default:null},max:{type:Number,default:null},separator:{type:[String,Object],default:null},addOnBlur:{type:Boolean,default:null},allowDuplicate:{type:Boolean,default:!0},placeholder:{type:String,default:null},variant:{type:String,default:null},invalid:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},inputProps:{type:null,default:null},removeTokenIcon:{type:String,default:void 0},chipIcon:{type:String,default:void 0},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:g,provide:function(){return{$pcInputChips:this,$parentInstance:this}}};function v(e){return S(e)||x(e)||b(e)||y()}function y(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function b(e,t){if(e){if(typeof e==`string`)return C(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?C(e,t):void 0}}function x(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function S(e){if(Array.isArray(e))return C(e)}function C(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var w={name:`InputChips`,extends:_,inheritAttrs:!1,emits:[`update:modelValue`,`add`,`remove`,`focus`,`blur`],data:function(){return{inputValue:null,focused:!1,focusedIndex:null}},mounted:function(){console.warn(`Deprecated since v4. Use AutoComplete component instead with its typeahead property.`)},methods:{onWrapperClick:function(){this.$refs.input.focus()},onInput:function(e){this.inputValue=e.target.value,this.focusedIndex=null},onFocus:function(e){this.focused=!0,this.focusedIndex=null,this.$emit(`focus`,e)},onBlur:function(e){this.focused=!1,this.focusedIndex=null,this.addOnBlur&&this.addItem(e,e.target.value,!1),this.$emit(`blur`,e)},onKeyDown:function(e){var t=e.target.value;switch(e.code){case`Backspace`:t.length===0&&this.modelValue&&this.modelValue.length>0&&(this.focusedIndex===null?this.removeItem(e,this.modelValue.length-1):this.removeItem(e,this.focusedIndex));break;case`Enter`:case`NumpadEnter`:t&&t.trim().length&&!this.maxedOut&&this.addItem(e,t,!0);break;case`ArrowLeft`:t.length===0&&this.modelValue&&this.modelValue.length>0&&this.$refs.container.focus();break;case`ArrowRight`:e.stopPropagation();break;default:this.separator&&(this.separator===e.key||e.key.match(this.separator))&&this.addItem(e,t,!0);break}},onPaste:function(e){var t=this;if(this.separator){var n=this.separator.replace(`\\n`,`
`).replace(`\\r`,`\r`).replace(`\\t`,`	`),r=(e.clipboardData||window.clipboardData).getData(`Text`);if(r){var i=this.modelValue||[],a=r.split(n);a=a.filter(function(e){return t.allowDuplicate||i.indexOf(e)===-1}),i=[].concat(v(i),v(a)),this.updateModel(e,i,!0)}}},onContainerFocus:function(){this.focused=!0},onContainerBlur:function(){this.focusedIndex=-1,this.focused=!1},onContainerKeyDown:function(e){switch(e.code){case`ArrowLeft`:this.onArrowLeftKeyOn(e);break;case`ArrowRight`:this.onArrowRightKeyOn(e);break;case`Backspace`:this.onBackspaceKeyOn(e);break}},onArrowLeftKeyOn:function(){this.inputValue.length===0&&this.modelValue&&this.modelValue.length>0&&(this.focusedIndex=this.focusedIndex===null?this.modelValue.length-1:this.focusedIndex-1,this.focusedIndex<0&&(this.focusedIndex=0))},onArrowRightKeyOn:function(){this.inputValue.length===0&&this.modelValue&&this.modelValue.length>0&&(this.focusedIndex===this.modelValue.length-1?(this.focusedIndex=null,this.$refs.input.focus()):this.focusedIndex++)},onBackspaceKeyOn:function(e){this.focusedIndex!==null&&this.removeItem(e,this.focusedIndex)},updateModel:function(e,t,n){var r=this;this.$emit(`update:modelValue`,t),this.$emit(`add`,{originalEvent:e,value:t}),this.$refs.input.value=``,this.inputValue=``,setTimeout(function(){r.maxedOut&&(r.focused=!1)},0),n&&e.preventDefault()},addItem:function(e,t,n){if(t&&t.trim().length){var r=this.modelValue?v(this.modelValue):[];(this.allowDuplicate||r.indexOf(t)===-1)&&(r.push(t),this.updateModel(e,r,n))}},removeItem:function(e,t){if(!this.disabled){var n=v(this.modelValue),r=n.splice(t,1);this.focusedIndex=null,this.$refs.input.focus(),this.$emit(`update:modelValue`,n),this.$emit(`remove`,{originalEvent:e,value:r})}}},computed:{maxedOut:function(){return this.max&&this.modelValue&&this.max===this.modelValue.length},focusedOptionId:function(){return this.focusedIndex===null?null:`${this.$id}_inputchips_item_${this.focusedIndex}`}},components:{Chip:h}};function T(e){"@babel/helpers - typeof";return T=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},T(e)}function E(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function D(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?E(Object(n),!0).forEach(function(t){O(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):E(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function O(e,t,n){return(t=k(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function k(e){var t=A(e,`string`);return T(t)==`symbol`?t:t+``}function A(e,t){if(T(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(T(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var j=[`aria-labelledby`,`aria-label`,`aria-activedescendant`],M=[`id`,`aria-label`,`aria-setsize`,`aria-posinset`,`data-p-focused`],N=[`id`,`disabled`,`placeholder`,`aria-invalid`];function P(n,l,p,m,h,g){var _=e(`Chip`);return i(),s(`div`,r({class:n.cx(`root`)},n.ptmi(`root`)),[o(`ul`,r({ref:`container`,class:n.cx(`input`),tabindex:`-1`,role:`listbox`,"aria-orientation":`horizontal`,"aria-labelledby":n.ariaLabelledby,"aria-label":n.ariaLabel,"aria-activedescendant":h.focused?g.focusedOptionId:void 0,onClick:l[5]||=function(e){return g.onWrapperClick()},onFocus:l[6]||=function(){return g.onContainerFocus&&g.onContainerFocus.apply(g,arguments)},onBlur:l[7]||=function(){return g.onContainerBlur&&g.onContainerBlur.apply(g,arguments)},onKeydown:l[8]||=function(){return g.onContainerKeyDown&&g.onContainerKeyDown.apply(g,arguments)}},n.ptm(`input`)),[(i(!0),s(c,null,t(n.modelValue,function(e,t){return i(),s(`li`,r({key:`${t}_${e}`,id:n.$id+`_inputchips_item_`+t,role:`option`,class:n.cx(`chipItem`,{index:t}),"aria-label":e,"aria-selected":!0,"aria-setsize":n.modelValue.length,"aria-posinset":t+1},{ref_for:!0},n.ptm(`chipItem`),{"data-p-focused":h.focusedIndex===t}),[u(n.$slots,`chip`,{class:a(n.cx(`pcChip`)),index:t,value:e,removeCallback:function(e){return n.removeOption(e,t)}},function(){return[f(_,{class:a(n.cx(`pcChip`)),label:e,removeIcon:n.chipIcon||n.removeTokenIcon,removable:``,unstyled:n.unstyled,onRemove:function(e){return g.removeItem(e,t)},pt:n.ptm(`pcChip`)},{removeicon:d(function(){return[u(n.$slots,n.$slots.chipicon?`chipicon`:`removetokenicon`,{class:a(n.cx(`chipIcon`)),index:t,removeCallback:function(e){return g.removeItem(e,t)}})]}),_:2},1032,[`class`,`label`,`removeIcon`,`unstyled`,`onRemove`,`pt`])]})],16,M)}),128)),o(`li`,r({class:n.cx(`inputItem`),role:`option`},n.ptm(`inputItem`)),[o(`input`,r({ref:`input`,id:n.inputId,type:`text`,class:n.inputClass,style:n.inputStyle,disabled:n.disabled||g.maxedOut,placeholder:n.placeholder,"aria-invalid":n.invalid||void 0,onFocus:l[0]||=function(e){return g.onFocus(e)},onBlur:l[1]||=function(e){return g.onBlur(e)},onInput:l[2]||=function(){return g.onInput&&g.onInput.apply(g,arguments)},onKeydown:l[3]||=function(e){return g.onKeyDown(e)},onPaste:l[4]||=function(e){return g.onPaste(e)}},D(D({},n.inputProps),n.ptm(`inputItemField`))),null,16,N)],16)],16,j)],16)}w.render=P;export{w as default};