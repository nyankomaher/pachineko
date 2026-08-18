import{J as e,K as t,O as n,Ot as r,P as i,U as a,Wt as o,X as s,_ as c,b as l,d as u,j as d,v as f,w as p,y as m}from"./C8bKil6U.js";import{I as h,t as g}from"./czlGUozm.js";import{t as _}from"./FiooIEjL.js";import{t as v}from"./Dj2uvVLm2.js";import{t as y}from"./CyBH0TdR2.js";var b=g.extend({name:`organizationchart`,style:`
    .p-organizationchart-table {
        border-spacing: 0;
        border-collapse: separate;
        margin: 0 auto;
    }

    .p-organizationchart-table > tbody > tr > td {
        text-align: center;
        vertical-align: top;
        padding: 0 dt('organizationchart.gutter');
    }

    .p-organizationchart-node {
        display: inline-block;
        position: relative;
        border: 1px solid dt('organizationchart.node.border.color');
        background: dt('organizationchart.node.background');
        color: dt('organizationchart.node.color');
        padding: dt('organizationchart.node.padding');
        border-radius: dt('organizationchart.node.border.radius');
        transition:
            background dt('organizationchart.transition.duration'),
            border-color dt('organizationchart.transition.duration'),
            color dt('organizationchart.transition.duration'),
            box-shadow dt('organizationchart.transition.duration');
    }

    .p-organizationchart-node:has(.p-organizationchart-node-toggle-button) {
        padding: dt('organizationchart.node.toggleable.padding');
    }

    .p-organizationchart-node.p-organizationchart-node-selectable:not(.p-organizationchart-node-selected):hover {
        background: dt('organizationchart.node.hover.background');
        color: dt('organizationchart.node.hover.color');
    }

    .p-organizationchart-node-selected {
        background: dt('organizationchart.node.selected.background');
        color: dt('organizationchart.node.selected.color');
    }

    .p-organizationchart-node-toggle-button {
        position: absolute;
        inset-block-end: calc(-1 * calc(dt('organizationchart.node.toggle.button.size') / 2));
        margin-inline-start: calc(-1 * calc(dt('organizationchart.node.toggle.button.size') / 2));
        z-index: 2;
        inset-inline-start: 50%;
        user-select: none;
        cursor: pointer;
        width: dt('organizationchart.node.toggle.button.size');
        height: dt('organizationchart.node.toggle.button.size');
        text-decoration: none;
        background: dt('organizationchart.node.toggle.button.background');
        color: dt('organizationchart.node.toggle.button.color');
        border-radius: dt('organizationchart.node.toggle.button.border.radius');
        border: 1px solid dt('organizationchart.node.toggle.button.border.color');
        display: inline-flex;
        justify-content: center;
        align-items: center;
        outline-color: transparent;
        transition:
            background dt('organizationchart.transition.duration'),
            color dt('organizationchart.transition.duration'),
            border-color dt('organizationchart.transition.duration'),
            outline-color dt('organizationchart.transition.duration'),
            box-shadow dt('organizationchart.transition.duration');
    }

    .p-organizationchart-node-toggle-button:hover {
        background: dt('organizationchart.node.toggle.button.hover.background');
        color: dt('organizationchart.node.toggle.button.hover.color');
    }

    .p-organizationchart-node-toggle-button:focus-visible {
        box-shadow: dt('organizationchart.node.toggle.button.focus.ring.shadow');
        outline: dt('organizationchart.node.toggle.button.focus.ring.width') dt('organizationchart.node.toggle.button.focus.ring.style') dt('organizationchart.node.toggle.button.focus.ring.color');
        outline-offset: dt('organizationchart.node.toggle.button.focus.ring.offset');
    }

    .p-organizationchart-node-toggle-button-icon {
        position: relative;
        inset-block-start: 1px;
    }

    .p-organizationchart-connector-down {
        margin: 0 auto;
        height: dt('organizationchart.connector.height');
        width: 1px;
        background: dt('organizationchart.connector.color');
    }

    .p-organizationchart-connector-right {
        border-radius: 0;
    }

    .p-organizationchart-connector-left {
        border-radius: 0;
        border-inline-end: 1px solid dt('organizationchart.connector.color');
    }

    .p-organizationchart-connector-top {
        border-block-start: 1px solid dt('organizationchart.connector.color');
    }

    .p-organizationchart-node-selectable {
        cursor: pointer;
    }

    .p-organizationchart-connectors :nth-child(1 of .p-organizationchart-connector-left) {
        border-inline-end: 0 none;
    }

    .p-organizationchart-connectors :nth-last-child(1 of .p-organizationchart-connector-left) {
        border-start-end-radius: dt('organizationchart.connector.border.radius');
    }

    .p-organizationchart-connectors :nth-child(1 of .p-organizationchart-connector-right) {
        border-inline-start: 1px solid dt('organizationchart.connector.color');
        border-start-start-radius: dt('organizationchart.connector.border.radius');
    }
`,classes:{root:`p-organizationchart p-component`,table:`p-organizationchart-table`,node:function(e){var t=e.instance;return[`p-organizationchart-node`,{"p-organizationchart-node-selectable":t.selectable,"p-organizationchart-node-selected":t.selected}]},nodeToggleButton:function(e){return[`p-organizationchart-node-toggle-button`,{"p-disabled":!e.instance.selectable}]},nodeToggleButtonIcon:`p-organizationchart-node-toggle-button-icon`,connectors:`p-organizationchart-connectors`,connectorDown:`p-organizationchart-connector-down`,connectorLeft:function(e){return[`p-organizationchart-connector-left`,{"p-organizationchart-connector-top":e.index!==0}]},connectorRight:function(e){var t=e.props;return[`p-organizationchart-connector-right`,{"p-organizationchart-connector-top":e.index!==t.node.children.length-1}]},nodeChildren:`p-organizationchart-node-children`}});d(),r();var x={name:`BaseOrganizationChart`,extends:_,props:{value:{type:null,default:null},selectionKeys:{type:null,default:null},selectionMode:{type:String,default:null},collapsible:{type:Boolean,default:!1},collapsedKeys:{type:null,default:null}},style:b,provide:function(){return{$pcOrganizationChart:this,$parentInstance:this}}},S={name:`OrganizationChartNode`,hostName:`OrganizationChart`,extends:_,emits:[`node-click`,`node-toggle`],props:{node:{type:null,default:null},templates:{type:null,default:null},collapsible:{type:Boolean,default:!1},collapsedKeys:{type:null,default:null},selectionKeys:{type:null,default:null},selectionMode:{type:String,default:null}},methods:{getPTOptions:function(e){return this.ptm(e,{context:{expanded:this.expanded,selectable:this.selectable,selected:this.selected,toggleable:this.toggleable,active:this.selected}})},getNodeOptions:function(e,t){return this.ptm(t,{context:{lineTop:e}})},onNodeClick:function(e){h(e.target,`data-pc-section`,`nodetogglebutton`)||h(e.target,`data-pc-section`,`nodetogglebuttonicon`)||this.selectionMode&&this.$emit(`node-click`,this.node)},onChildNodeClick:function(e){this.$emit(`node-click`,e)},toggleNode:function(){this.$emit(`node-toggle`,this.node)},onChildNodeToggle:function(e){this.$emit(`node-toggle`,e)},onKeydown:function(e){(e.code===`Enter`||e.code===`NumpadEnter`||e.code===`Space`)&&(this.toggleNode(),e.preventDefault())}},computed:{leaf:function(){return this.node.leaf!==!1&&!(this.node.children&&this.node.children.length)},colspan:function(){return this.node.children&&this.node.children.length?this.node.children.length*2:null},childStyle:function(){return{visibility:!this.leaf&&this.expanded?`inherit`:`hidden`}},expanded:function(){return this.collapsedKeys[this.node.key]===void 0},selectable:function(){return this.selectionMode&&this.node.selectable!==!1},selected:function(){return this.selectable&&this.selectionKeys&&this.selectionKeys[this.node.key]===!0},toggleable:function(){return this.collapsible&&this.node.collapsible!==!1&&!this.leaf}},components:{ChevronDownIcon:v,ChevronUpIcon:y}},C=[`colspan`],w=[`colspan`],T=[`colspan`];function E(r,d,h,g,_,v){var y=e(`OrganizationChartNode`,!0);return a(),l(`table`,i({class:r.cx(`table`)},r.ptm(`table`)),[c(`tbody`,o(n(r.ptm(`body`))),[h.node?(a(),l(`tr`,o(i({key:0},r.ptm(`row`))),[c(`td`,i({colspan:v.colspan},r.ptm(`cell`)),[c(`div`,i({class:[r.cx(`node`),h.node.styleClass],onClick:d[2]||=function(){return v.onNodeClick&&v.onNodeClick.apply(v,arguments)}},v.getPTOptions(`node`)),[(a(),f(s(h.templates[h.node.type]||h.templates.default),{node:h.node},null,8,[`node`])),v.toggleable?(a(),l(`a`,i({key:0,tabindex:`0`,class:r.cx(`nodeToggleButton`),onClick:d[0]||=function(){return v.toggleNode&&v.toggleNode.apply(v,arguments)},onKeydown:d[1]||=function(){return v.onKeydown&&v.onKeydown.apply(v,arguments)}},v.getPTOptions(`nodeToggleButton`)),[h.templates.toggleicon||h.templates.togglericon?(a(),f(s(h.templates.toggleicon||h.templates.togglericon),i({key:0,expanded:v.expanded,class:r.cx(`nodeToggleButtonIcon`)},v.getPTOptions(`nodeToggleButtonIcon`)),null,16,[`expanded`,`class`])):(a(),f(s(v.expanded?`ChevronDownIcon`:`ChevronUpIcon`),i({key:1,class:r.cx(`nodeToggleButtonIcon`)},v.getPTOptions(`nodeToggleButtonIcon`)),null,16,[`class`]))],16)):m(``,!0)],16)],16,C)],16)):m(``,!0),c(`tr`,i({style:v.childStyle,class:r.cx(`connectors`)},r.ptm(`connectors`)),[c(`td`,i({colspan:v.colspan},r.ptm(`lineCell`)),[c(`div`,i({class:r.cx(`connectorDown`)},r.ptm(`connectorDown`)),null,16)],16,w)],16),c(`tr`,i({style:v.childStyle,class:r.cx(`connectors`)},r.ptm(`connectors`)),[h.node.children&&h.node.children.length===1?(a(),l(`td`,i({key:0,colspan:v.colspan},r.ptm(`lineCell`)),[c(`div`,i({class:r.cx(`connectorDown`)},r.ptm(`connectorDown`)),null,16)],16,T)):m(``,!0),h.node.children&&h.node.children.length>1?(a(!0),l(u,{key:1},t(h.node.children,function(e,t){return a(),l(u,{key:e.key},[c(`td`,i({class:r.cx(`connectorLeft`,{index:t})},{ref_for:!0},v.getNodeOptions(t!==0,`connectorLeft`)),`\xA0`,16),c(`td`,i({class:r.cx(`connectorRight`,{index:t})},{ref_for:!0},v.getNodeOptions(t!==h.node.children.length-1,`connectorRight`)),`\xA0`,16)],64)}),128)):m(``,!0)],16),c(`tr`,i({style:v.childStyle,class:r.cx(`nodeChildren`)},r.ptm(`nodeChildren`)),[(a(!0),l(u,null,t(h.node.children,function(e){return a(),l(`td`,i({key:e.key,colspan:`2`},{ref_for:!0},r.ptm(`nodeCell`)),[p(y,{node:e,templates:h.templates,collapsedKeys:h.collapsedKeys,onNodeToggle:v.onChildNodeToggle,collapsible:h.collapsible,selectionMode:h.selectionMode,selectionKeys:h.selectionKeys,onNodeClick:v.onChildNodeClick,pt:r.pt,unstyled:r.unstyled},null,8,[`node`,`templates`,`collapsedKeys`,`onNodeToggle`,`collapsible`,`selectionMode`,`selectionKeys`,`onNodeClick`,`pt`,`unstyled`])],16)}),128))],16)],16)],16)}S.render=E;function D(e){"@babel/helpers - typeof";return D=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},D(e)}function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function k(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?O(Object(n),!0).forEach(function(t){A(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function A(e,t,n){return(t=j(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function j(e){var t=M(e,`string`);return D(t)==`symbol`?t:t+``}function M(e,t){if(D(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(D(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var N={name:`OrganizationChart`,extends:x,inheritAttrs:!1,emits:[`node-unselect`,`node-select`,`update:selectionKeys`,`node-expand`,`node-collapse`,`update:collapsedKeys`],data:function(){return{d_collapsedKeys:this.collapsedKeys||{}}},watch:{collapsedKeys:function(e){this.d_collapsedKeys=e}},methods:{onNodeClick:function(e){var t=e.key;if(this.selectionMode){var n=this.selectionKeys?k({},this.selectionKeys):{};n[t]?(delete n[t],this.$emit(`node-unselect`,e)):(this.selectionMode===`single`&&(n={}),n[t]=!0,this.$emit(`node-select`,e)),this.$emit(`update:selectionKeys`,n)}},onNodeToggle:function(e){var t=e.key;this.d_collapsedKeys[t]?(delete this.d_collapsedKeys[t],this.$emit(`node-expand`,e)):(this.d_collapsedKeys[t]=!0,this.$emit(`node-collapse`,e)),this.d_collapsedKeys=k({},this.d_collapsedKeys),this.$emit(`update:collapsedKeys`,this.d_collapsedKeys)}},components:{OrganizationChartNode:S}};function P(t,n,r,o,s,c){var u=e(`OrganizationChartNode`);return a(),l(`div`,i({class:t.cx(`root`)},t.ptmi(`root`)),[p(u,{node:t.value,templates:t.$slots,onNodeToggle:c.onNodeToggle,collapsedKeys:s.d_collapsedKeys,collapsible:t.collapsible,onNodeClick:c.onNodeClick,selectionMode:t.selectionMode,selectionKeys:t.selectionKeys,pt:t.pt,unstyled:t.unstyled},null,8,[`node`,`templates`,`onNodeToggle`,`collapsedKeys`,`collapsible`,`onNodeClick`,`selectionMode`,`selectionKeys`,`pt`,`unstyled`])],16)}N.render=P;export{N as default};