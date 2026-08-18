import{J as e,Jt as t,Ot as n,P as r,U as i,Ut as a,X as o,_ as s,a as c,b as l,c as u,j as d,nt as f,q as p,t as m,tt as h,v as g,w as _,y as v}from"./C8bKil6U.js";import{t as y}from"./czlGUozm.js";import{t as b}from"./CRHlWn3X.js";import{t as x}from"./FiooIEjL.js";import{t as S}from"./Dt0c0nKr.js";import{n as C}from"./S_m9Oqws.js";import{t as w}from"./BI16ITd3.js";import{t as T}from"./NjzZx4ml.js";var E=y.extend({name:`panel`,style:`
    .p-panel {
        display: block;
        border: 1px solid dt('panel.border.color');
        border-radius: dt('panel.border.radius');
        background: dt('panel.background');
        color: dt('panel.color');
    }

    .p-panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: dt('panel.header.padding');
        background: dt('panel.header.background');
        color: dt('panel.header.color');
        border-style: solid;
        border-width: dt('panel.header.border.width');
        border-color: dt('panel.header.border.color');
        border-radius: dt('panel.header.border.radius');
    }

    .p-panel-toggleable .p-panel-header {
        padding: dt('panel.toggleable.header.padding');
    }

    .p-panel-title {
        line-height: 1;
        font-weight: dt('panel.title.font.weight');
    }

    .p-panel-content-container {
        display: grid;
        grid-template-rows: 1fr;
    }

    .p-panel-content-wrapper {
        min-height: 0;
    }

    .p-panel-content {
        padding: dt('panel.content.padding');
    }

    .p-panel-footer {
        padding: dt('panel.footer.padding');
    }
`,classes:{root:function(e){return[`p-panel p-component`,{"p-panel-toggleable":e.props.toggleable}]},header:`p-panel-header`,title:`p-panel-title`,headerActions:`p-panel-header-actions`,pcToggleButton:`p-panel-toggle-button`,contentContainer:`p-panel-content-container`,contentWrapper:`p-panel-content-wrapper`,content:`p-panel-content`,footer:`p-panel-footer`}});d(),n(),c();var D={name:`Panel`,extends:{name:`BasePanel`,extends:x,props:{header:String,toggleable:Boolean,collapsed:Boolean,toggleButtonProps:{type:Object,default:function(){return{severity:`secondary`,text:!0,rounded:!0}}}},style:E,provide:function(){return{$pcPanel:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`update:collapsed`,`toggle`],data:function(){return{d_collapsed:this.collapsed}},watch:{collapsed:function(e){this.d_collapsed=e}},methods:{toggle:function(e){this.d_collapsed=!this.d_collapsed,this.$emit(`update:collapsed`,this.d_collapsed),this.$emit(`toggle`,{originalEvent:e,value:this.d_collapsed})},onKeyDown:function(e){(e.code===`Enter`||e.code===`NumpadEnter`||e.code===`Space`)&&(this.toggle(e),e.preventDefault())}},computed:{buttonAriaLabel:function(){return this.toggleButtonProps&&this.toggleButtonProps.ariaLabel?this.toggleButtonProps.ariaLabel:this.header},dataP:function(){return b({toggleable:this.toggleable})}},components:{PlusIcon:w,MinusIcon:T,Button:C},directives:{ripple:S}},O=[`data-p`],k=[`data-p`],A=[`id`],j=[`id`,`aria-labelledby`];function M(n,c,d,y,b,x){var S=e(`Button`);return i(),l(`div`,r({class:n.cx(`root`),"data-p":x.dataP},n.ptmi(`root`)),[s(`div`,r({class:n.cx(`header`),"data-p":x.dataP},n.ptm(`header`)),[p(n.$slots,`header`,{id:n.$id+`_header`,class:a(n.cx(`title`)),collapsed:b.d_collapsed},function(){return[n.header?(i(),l(`span`,r({key:0,id:n.$id+`_header`,class:n.cx(`title`)},n.ptm(`title`)),t(n.header),17,A)):v(``,!0)]}),s(`div`,r({class:n.cx(`headerActions`)},n.ptm(`headerActions`)),[p(n.$slots,`icons`),n.toggleable?p(n.$slots,`togglebutton`,{key:0,collapsed:b.d_collapsed,toggleCallback:function(e){return x.toggle(e)},keydownCallback:function(e){return x.onKeyDown(e)}},function(){return[_(S,r({id:n.$id+`_header`,class:n.cx(`pcToggleButton`),"aria-label":x.buttonAriaLabel,"aria-controls":n.$id+`_content`,"aria-expanded":!b.d_collapsed,unstyled:n.unstyled,onClick:c[0]||=function(e){return x.toggle(e)},onKeydown:c[1]||=function(e){return x.onKeyDown(e)}},n.toggleButtonProps,{pt:n.ptm(`pcToggleButton`)}),{icon:h(function(e){return[p(n.$slots,n.$slots.toggleicon?`toggleicon`:`togglericon`,{collapsed:b.d_collapsed},function(){return[(i(),g(o(b.d_collapsed?`PlusIcon`:`MinusIcon`),r({class:e.class},n.ptm(`pcToggleButton`).icon),null,16,[`class`]))]})]}),_:3},16,[`id`,`class`,`aria-label`,`aria-controls`,`aria-expanded`,`unstyled`,`pt`])]}):v(``,!0)],16)],16,k),_(m,r({name:`p-collapsible`},n.ptm(`transition`)),{default:h(function(){return[f(s(`div`,r({id:n.$id+`_content`,class:n.cx(`contentContainer`),role:`region`,"aria-labelledby":n.$id+`_header`},n.ptm(`contentContainer`)),[s(`div`,r({class:n.cx(`contentWrapper`)},n.ptm(`contentWrapper`)),[s(`div`,r({class:n.cx(`content`)},n.ptm(`content`)),[p(n.$slots,`default`)],16),n.$slots.footer?(i(),l(`div`,r({key:0,class:n.cx(`footer`)},n.ptm(`footer`)),[p(n.$slots,`footer`)],16)):v(``,!0)],16)],16,j),[[u,!b.d_collapsed]])]}),_:3},16)],16,O)}D.render=M;export{D as default};