import{J as e,Jt as t,K as n,Ot as r,P as i,U as a,Ut as o,X as s,b as c,d as l,j as u,q as d,tt as f,v as p,w as m,y as h}from"./C8bKil6U.js";import{t as g}from"./czlGUozm.js";import{t as _}from"./FiooIEjL.js";import{t as v}from"./CtougOl92.js";import{t as y}from"./CyBH0TdR2.js";import b from"./CvsFZvRP.js";import x from"./B9trm2pq.js";import S from"./Dc0D_IN9.js";var C=g.extend({name:`accordion`,style:`
    .p-accordionpanel {
        display: flex;
        flex-direction: column;
        border-style: solid;
        border-width: dt('accordion.panel.border.width');
        border-color: dt('accordion.panel.border.color');
    }

    .p-accordionheader {
        all: unset;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: dt('accordion.header.padding');
        color: dt('accordion.header.color');
        background: dt('accordion.header.background');
        border-style: solid;
        border-width: dt('accordion.header.border.width');
        border-color: dt('accordion.header.border.color');
        font-weight: dt('accordion.header.font.weight');
        border-radius: dt('accordion.header.border.radius');
        transition:
            background dt('accordion.transition.duration'),
            color dt('accordion.transition.duration'),
            outline-color dt('accordion.transition.duration'),
            box-shadow dt('accordion.transition.duration');
        outline-color: transparent;
    }

    .p-accordionpanel:first-child > .p-accordionheader {
        border-width: dt('accordion.header.first.border.width');
        border-start-start-radius: dt('accordion.header.first.top.border.radius');
        border-start-end-radius: dt('accordion.header.first.top.border.radius');
    }

    .p-accordionpanel:last-child > .p-accordionheader {
        border-end-start-radius: dt('accordion.header.last.bottom.border.radius');
        border-end-end-radius: dt('accordion.header.last.bottom.border.radius');
    }

    .p-accordionpanel:last-child.p-accordionpanel-active > .p-accordionheader {
        border-end-start-radius: dt('accordion.header.last.active.bottom.border.radius');
        border-end-end-radius: dt('accordion.header.last.active.bottom.border.radius');
    }

    .p-accordionheader-toggle-icon {
        color: dt('accordion.header.toggle.icon.color');
    }

    .p-accordionpanel:not(.p-disabled) .p-accordionheader:focus-visible {
        box-shadow: dt('accordion.header.focus.ring.shadow');
        outline: dt('accordion.header.focus.ring.width') dt('accordion.header.focus.ring.style') dt('accordion.header.focus.ring.color');
        outline-offset: dt('accordion.header.focus.ring.offset');
    }

    .p-accordionpanel:not(.p-accordionpanel-active):not(.p-disabled) > .p-accordionheader:hover {
        background: dt('accordion.header.hover.background');
        color: dt('accordion.header.hover.color');
    }

    .p-accordionpanel:not(.p-accordionpanel-active):not(.p-disabled) .p-accordionheader:hover .p-accordionheader-toggle-icon {
        color: dt('accordion.header.toggle.icon.hover.color');
    }

    .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader {
        background: dt('accordion.header.active.background');
        color: dt('accordion.header.active.color');
    }

    .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader .p-accordionheader-toggle-icon {
        color: dt('accordion.header.toggle.icon.active.color');
    }

    .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader:hover {
        background: dt('accordion.header.active.hover.background');
        color: dt('accordion.header.active.hover.color');
    }

    .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader:hover .p-accordionheader-toggle-icon {
        color: dt('accordion.header.toggle.icon.active.hover.color');
    }

    .p-accordioncontent {
        display: grid;
        grid-template-rows: 1fr;
    }

    .p-accordioncontent-wrapper {
        min-height: 0;
    }

    .p-accordioncontent-content {
        border-style: solid;
        border-width: dt('accordion.content.border.width');
        border-color: dt('accordion.content.border.color');
        background-color: dt('accordion.content.background');
        color: dt('accordion.content.color');
        padding: dt('accordion.content.padding');
    }
`,classes:{root:`p-accordion p-component`}});u(),r();var w={name:`Accordion`,extends:{name:`BaseAccordion`,extends:_,props:{value:{type:[String,Number,Array],default:void 0},multiple:{type:Boolean,default:!1},lazy:{type:Boolean,default:!1},tabindex:{type:Number,default:0},selectOnFocus:{type:Boolean,default:!1},expandIcon:{type:String,default:void 0},collapseIcon:{type:String,default:void 0},activeIndex:{type:[Number,Array],default:null}},style:C,provide:function(){return{$pcAccordion:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`update:value`,`update:activeIndex`,`tab-open`,`tab-close`,`tab-click`],data:function(){return{d_value:this.value}},watch:{value:function(e){this.d_value=e},activeIndex:{immediate:!0,handler:function(e){this.hasAccordionTab&&(this.d_value=this.multiple?e?.map(String):e?.toString())}}},methods:{isItemActive:function(e){return this.multiple?this.d_value?.includes(e):this.d_value===e},updateValue:function(e){var t=this.isItemActive(e);this.multiple?t?this.d_value=this.d_value.filter(function(t){return t!==e}):this.d_value?this.d_value.push(e):this.d_value=[e]:this.d_value=t?null:e,this.$emit(`update:value`,this.d_value),this.$emit(`update:activeIndex`,this.multiple?this.d_value?.map(Number):Number(this.d_value)),this.$emit(t?`tab-close`:`tab-open`,{originalEvent:void 0,index:Number(e)})},isAccordionTab:function(e){return e.type.name===`AccordionTab`},getTabProp:function(e,t){return e.props?e.props[t]:void 0},getKey:function(e,t){return this.getTabProp(e,`header`)||t},getHeaderPT:function(e,t){var n=this;return{root:i({onClick:function(e){return n.onTabClick(e,t)}},this.getTabProp(e,`headerProps`),this.getTabPT(e,`header`,t)),toggleicon:i(this.getTabProp(e,`headeractionprops`),this.getTabPT(e,`headeraction`,t))}},getContentPT:function(e,t){return{root:i(this.getTabProp(e,`contentProps`),this.getTabPT(e,`toggleablecontent`,t)),transition:this.getTabPT(e,`transition`,t),content:this.getTabPT(e,`content`,t)}},getTabPT:function(e,t,n){var r=this.tabs.length,a={props:e.props||{},parent:{instance:this,props:this.$props,state:this.$data},context:{index:n,count:r,first:n===0,last:n===r-1,active:this.isItemActive(`${n}`)}};return i(this.ptm(`accordiontab.${t}`,a),this.ptmo(this.getTabProp(e,`pt`),t,a))},onTabClick:function(e,t){this.$emit(`tab-click`,{originalEvent:e,index:t})}},computed:{tabs:function(){var e=this;return this.$slots.default().reduce(function(t,n){return e.isAccordionTab(n)?t.push(n):n.children&&n.children instanceof Array&&n.children.forEach(function(n){e.isAccordionTab(n)&&t.push(n)}),t},[])},hasAccordionTab:function(){return this.tabs.length}},components:{AccordionPanel:S,AccordionHeader:x,AccordionContent:b,ChevronUpIcon:y,ChevronRightIcon:v}};function T(r,u,g,_,v,y){var b=e(`AccordionHeader`),x=e(`AccordionContent`),S=e(`AccordionPanel`);return a(),c(`div`,i({class:r.cx(`root`)},r.ptmi(`root`)),[y.hasAccordionTab?(a(!0),c(l,{key:0},n(y.tabs,function(e,n){return a(),p(S,{key:y.getKey(e,n),value:`${n}`,pt:{root:y.getTabPT(e,`root`,n)},disabled:y.getTabProp(e,`disabled`)},{default:f(function(){return[m(b,{class:o(y.getTabProp(e,`headerClass`)),pt:y.getHeaderPT(e,n)},{toggleicon:f(function(t){return[t.active?(a(),p(s(r.$slots.collapseicon?r.$slots.collapseicon:r.collapseIcon?`span`:`ChevronDownIcon`),i({key:0,class:[r.collapseIcon,t.class],"aria-hidden":`true`},{ref_for:!0},y.getTabPT(e,`headericon`,n)),null,16,[`class`])):(a(),p(s(r.$slots.expandicon?r.$slots.expandicon:r.expandIcon?`span`:`ChevronUpIcon`),i({key:1,class:[r.expandIcon,t.class],"aria-hidden":`true`},{ref_for:!0},y.getTabPT(e,`headericon`,n)),null,16,[`class`]))]}),default:f(function(){return[e.children&&e.children.headericon?(a(),p(s(e.children.headericon),{key:0,isTabActive:y.isItemActive(`${n}`),active:y.isItemActive(`${n}`),index:n},null,8,[`isTabActive`,`active`,`index`])):h(``,!0),e.props&&e.props.header?(a(),c(`span`,i({key:1,ref_for:!0},y.getTabPT(e,`headertitle`,n)),t(e.props.header),17)):h(``,!0),e.children&&e.children.header?(a(),p(s(e.children.header),{key:2})):h(``,!0)]}),_:2},1032,[`class`,`pt`]),m(x,{pt:y.getContentPT(e,n)},{default:f(function(){return[(a(),p(s(e)))]}),_:2},1032,[`pt`])]}),_:2},1032,[`value`,`pt`,`disabled`])}),128)):d(r.$slots,`default`,{key:1})],16)}w.render=T;export{w as default};