import{J as e,Jt as t,K as n,Ot as r,P as i,U as a,Ut as o,_ as s,b as c,d as l,j as u,q as d,w as f,y as p}from"./C8bKil6U.js";import{t as m}from"./czlGUozm.js";import{t as h}from"./CRHlWn3X.js";import{t as g}from"./FiooIEjL.js";var _=m.extend({name:`metergroup`,style:`
    .p-metergroup {
        display: flex;
        gap: dt('metergroup.gap');
    }

    .p-metergroup-meters {
        display: flex;
        background: dt('metergroup.meters.background');
        border-radius: dt('metergroup.border.radius');
    }

    .p-metergroup-label-list {
        display: flex;
        flex-wrap: wrap;
        margin: 0;
        padding: 0;
        list-style-type: none;
    }

    .p-metergroup-label {
        display: inline-flex;
        align-items: center;
        gap: dt('metergroup.label.gap');
    }

    .p-metergroup-label-marker {
        display: inline-flex;
        width: dt('metergroup.label.marker.size');
        height: dt('metergroup.label.marker.size');
        border-radius: 100%;
    }

    .p-metergroup-label-icon {
        font-size: dt('metergroup.label.icon.size');
        width: dt('metergroup.label.icon.size');
        height: dt('metergroup.label.icon.size');
    }

    .p-metergroup-horizontal {
        flex-direction: column;
    }

    .p-metergroup-label-list-horizontal {
        gap: dt('metergroup.label.list.horizontal.gap');
    }

    .p-metergroup-horizontal .p-metergroup-meters {
        height: dt('metergroup.meters.size');
    }

    .p-metergroup-horizontal .p-metergroup-meter:first-of-type {
        border-start-start-radius: dt('metergroup.border.radius');
        border-end-start-radius: dt('metergroup.border.radius');
    }

    .p-metergroup-horizontal .p-metergroup-meter:last-of-type {
        border-start-end-radius: dt('metergroup.border.radius');
        border-end-end-radius: dt('metergroup.border.radius');
    }

    .p-metergroup-vertical {
        flex-direction: row;
    }

    .p-metergroup-label-list-vertical {
        flex-direction: column;
        gap: dt('metergroup.label.list.vertical.gap');
    }

    .p-metergroup-vertical .p-metergroup-meters {
        flex-direction: column;
        width: dt('metergroup.meters.size');
        height: 100%;
    }

    .p-metergroup-vertical .p-metergroup-label-list {
        align-items: flex-start;
    }

    .p-metergroup-vertical .p-metergroup-meter:first-of-type {
        border-start-start-radius: dt('metergroup.border.radius');
        border-start-end-radius: dt('metergroup.border.radius');
    }

    .p-metergroup-vertical .p-metergroup-meter:last-of-type {
        border-end-start-radius: dt('metergroup.border.radius');
        border-end-end-radius: dt('metergroup.border.radius');
    }
`,classes:{root:function(e){var t=e.props;return[`p-metergroup p-component`,{"p-metergroup-horizontal":t.orientation===`horizontal`,"p-metergroup-vertical":t.orientation===`vertical`}]},meters:`p-metergroup-meters`,meter:`p-metergroup-meter`,labelList:function(e){var t=e.props;return[`p-metergroup-label-list`,{"p-metergroup-label-list-vertical":t.labelOrientation===`vertical`,"p-metergroup-label-list-horizontal":t.labelOrientation===`horizontal`}]},label:`p-metergroup-label`,labelIcon:`p-metergroup-label-icon`,labelMarker:`p-metergroup-label-marker`,labelText:`p-metergroup-label-text`}});u(),r();var v={name:`MeterGroup`,extends:g,props:{value:{type:Array,default:null},min:{type:Number,default:0},max:{type:Number,default:100},orientation:{type:String,default:`horizontal`},labelPosition:{type:String,default:`end`},labelOrientation:{type:String,default:`horizontal`}},style:_,provide:function(){return{$pcMeterGroup:this,$parentInstance:this}}};function y(e){"@babel/helpers - typeof";return y=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},y(e)}function b(e,t,n){return(t=x(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function x(e){var t=S(e,`string`);return y(t)==`symbol`?t:t+``}function S(e,t){if(y(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(y(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var C={name:`MeterGroupLabel`,hostName:`MeterGroup`,extends:g,inheritAttrs:!1,inject:[`$pcMeterGroup`],props:{value:{type:Array,default:null},labelPosition:{type:String,default:`end`},labelOrientation:{type:String,default:`horizontal`}},computed:{dataP:function(){return h(b({},this.$pcMeterGroup.labelOrientation,this.$pcMeterGroup.labelOrientation))}}},w=[`data-p`];function T(e,r,u,f,p,m){return a(),c(`ol`,i({class:e.cx(`labelList`),"data-p":m.dataP},e.ptm(`labelList`)),[(a(!0),c(l,null,n(u.value,function(n,r){return a(),c(`li`,i({key:r+`_label`,class:e.cx(`label`)},{ref_for:!0},e.ptm(`label`)),[d(e.$slots,`icon`,{value:n,class:o(e.cx(`labelIcon`))},function(){return[n.icon?(a(),c(`i`,i({key:0,class:[n.icon,e.cx(`labelIcon`)],style:{color:n.color}},{ref_for:!0},e.ptm(`labelIcon`)),null,16)):(a(),c(`span`,i({key:1,class:e.cx(`labelMarker`),style:{backgroundColor:n.color}},{ref_for:!0},e.ptm(`labelMarker`)),null,16))]}),s(`span`,i({class:e.cx(`labelText`)},{ref_for:!0},e.ptm(`labelText`)),t(n.label)+` (`+t(e.$parentInstance.percentValue(n.value))+`)`,17)],16)}),128))],16,w)}C.render=T;function E(e){"@babel/helpers - typeof";return E=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},E(e)}function D(e,t,n){return(t=O(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function O(e){var t=k(e,`string`);return E(t)==`symbol`?t:t+``}function k(e,t){if(E(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(E(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var A={name:`MeterGroup`,extends:v,inheritAttrs:!1,methods:{getPTOptions:function(e,t,n){return this.ptm(e,{context:{value:t,index:n}})},percent:function(){var e=((arguments.length>0&&arguments[0]!==void 0?arguments[0]:0)-this.min)/(this.max-this.min)*100;return Math.max(0,Math.min(100,e))},roundedPercent:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0;return Math.round(this.percent(e))},percentValue:function(e){return this.roundedPercent(e)+`%`},meterCalculatedStyles:function(e){return{backgroundColor:e.color,width:this.orientation===`horizontal`&&this.percent(e.value)+`%`,height:this.orientation===`vertical`&&this.percent(e.value)+`%`}}},computed:{totalPercent:function(){return this.roundedPercent(this.value.reduce(function(e,t){return e+t.value},0))},percentages:function(){var e=0,t=[];return this.value.forEach(function(n){e+=n.value,t.push(e)}),t},dataP:function(){return h(D({},this.orientation,this.orientation))}},components:{MeterGroupLabel:C}},j=[`aria-valuemin`,`aria-valuemax`,`aria-valuenow`,`data-p`],M=[`data-p`],N=[`data-p`];function P(t,r,u,m,h,g){var _=e(`MeterGroupLabel`);return a(),c(`div`,i({class:t.cx(`root`),role:`meter`,"aria-valuemin":t.min,"aria-valuemax":t.max,"aria-valuenow":g.totalPercent,"data-p":g.dataP},t.ptmi(`root`)),[t.labelPosition===`start`?d(t.$slots,`label`,{key:0,value:t.value,totalPercent:g.totalPercent,percentages:g.percentages},function(){return[f(_,{value:t.value,labelPosition:t.labelPosition,labelOrientation:t.labelOrientation,unstyled:t.unstyled,pt:t.pt},null,8,[`value`,`labelPosition`,`labelOrientation`,`unstyled`,`pt`])]}):p(``,!0),d(t.$slots,`start`,{value:t.value,totalPercent:g.totalPercent,percentages:g.percentages}),s(`div`,i({class:t.cx(`meters`),"data-p":g.dataP},t.ptm(`meters`)),[(a(!0),c(l,null,n(t.value,function(e,n){return d(t.$slots,`meter`,{key:n,value:e,index:n,class:o(t.cx(`meter`)),orientation:t.orientation,size:g.percentValue(e.value),totalPercent:g.totalPercent},function(){return[g.roundedPercent(e.value)?(a(),c(`span`,i({key:0,class:t.cx(`meter`),style:g.meterCalculatedStyles(e),"data-p":g.dataP},{ref_for:!0},g.getPTOptions(`meter`,e,n)),null,16,N)):p(``,!0)]})}),128))],16,M),d(t.$slots,`end`,{value:t.value,totalPercent:g.totalPercent,percentages:g.percentages}),t.labelPosition===`end`?d(t.$slots,`label`,{key:1,value:t.value,totalPercent:g.totalPercent,percentages:g.percentages},function(){return[f(_,{value:t.value,labelPosition:t.labelPosition,labelOrientation:t.labelOrientation,unstyled:t.unstyled,pt:t.pt},null,8,[`value`,`labelPosition`,`labelOrientation`,`unstyled`,`pt`])]}):p(``,!0)],16,j)}A.render=P;export{A as default};