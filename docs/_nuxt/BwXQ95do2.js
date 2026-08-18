import{Jt as e,K as t,Ot as n,P as r,U as i,X as a,_ as o,b as s,d as c,j as l,v as u,y as d}from"./C8bKil6U.js";import{P as f,et as p,t as m}from"./czlGUozm.js";import{t as h}from"./FiooIEjL.js";var g=m.extend({name:`steps`,style:`
    .p-steps {
        position: relative;
    }

    .p-steps-list {
        padding: 0;
        margin: 0;
        list-style-type: none;
        display: flex;
    }

    .p-steps-item {
        position: relative;
        display: flex;
        justify-content: center;
        flex: 1 1 auto;
    }

    .p-steps-item.p-disabled,
    .p-steps-item.p-disabled * {
        opacity: 1;
        pointer-events: auto;
        user-select: auto;
        cursor: auto;
    }

    .p-steps-item:before {
        content: ' ';
        border-top: 2px solid dt('steps.separator.background');
        width: 100%;
        top: 50%;
        left: 0;
        display: block;
        position: absolute;
        margin-top: calc(-1rem + 1px);
    }

    .p-steps-item:first-child::before {
        width: calc(50% + 1rem);
        transform: translateX(100%);
    }

    .p-steps-item:last-child::before {
        width: 50%;
    }

    .p-steps-item-link {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
        text-decoration: none;
        transition:
            outline-color dt('steps.transition.duration'),
            box-shadow dt('steps.transition.duration');
        border-radius: dt('steps.item.link.border.radius');
        outline-color: transparent;
        gap: dt('steps.item.link.gap');
    }

    .p-steps-item-link:not(.p-disabled):focus-visible {
        box-shadow: dt('steps.item.link.focus.ring.shadow');
        outline: dt('steps.item.link.focus.ring.width') dt('steps.item.link.focus.ring.style') dt('steps.item.link.focus.ring.color');
        outline-offset: dt('steps.item.link.focus.ring.offset');
    }

    .p-steps-item-label {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
        color: dt('steps.item.label.color');
        display: block;
        font-weight: dt('steps.item.label.font.weight');
    }

    .p-steps-item-number {
        display: flex;
        align-items: center;
        justify-content: center;
        color: dt('steps.item.number.color');
        border: 2px solid dt('steps.item.number.border.color');
        background: dt('steps.item.number.background');
        min-width: dt('steps.item.number.size');
        height: dt('steps.item.number.size');
        line-height: dt('steps.item.number.size');
        font-size: dt('steps.item.number.font.size');
        z-index: 1;
        border-radius: dt('steps.item.number.border.radius');
        position: relative;
        font-weight: dt('steps.item.number.font.weight');
    }

    .p-steps-item-number::after {
        content: ' ';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: dt('steps.item.number.border.radius');
        box-shadow: dt('steps.item.number.shadow');
    }

    .p-steps:not(.p-readonly) .p-steps-item {
        cursor: pointer;
    }

    .p-steps-item-active .p-steps-item-number {
        background: dt('steps.item.number.active.background');
        border-color: dt('steps.item.number.active.border.color');
        color: dt('steps.item.number.active.color');
    }

    .p-steps-item-active .p-steps-item-label {
        color: dt('steps.item.label.active.color');
    }
`,classes:{root:function(e){return[`p-steps p-component`,{"p-readonly":e.props.readonly}]},list:`p-steps-list`,item:function(e){var t=e.instance,n=e.item,r=e.index;return[`p-steps-item`,{"p-steps-item-active":t.isActive(r),"p-disabled":t.isItemDisabled(n,r)}]},itemLink:`p-steps-item-link`,itemNumber:`p-steps-item-number`,itemLabel:`p-steps-item-label`}});l(),n();var _={name:`Steps`,extends:{name:`BaseSteps`,extends:h,props:{id:{type:String},model:{type:Array,default:null},readonly:{type:Boolean,default:!0},activeStep:{type:Number,default:0}},style:g,provide:function(){return{$pcSteps:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`update:activeStep`,`step-change`],data:function(){return{d_activeStep:this.activeStep}},watch:{activeStep:function(e){this.d_activeStep=e}},mounted:function(){var e=this.findFirstItem();e&&(e.tabIndex=`0`)},methods:{getPTOptions:function(e,t,n){return this.ptm(e,{context:{item:t,index:n,active:this.isActive(n),disabled:this.isItemDisabled(t,n)}})},onItemClick:function(e,t,n){if(this.disabled(t)||this.readonly){e.preventDefault();return}t.command&&t.command({originalEvent:e,item:t}),n!==this.d_activeStep&&(this.d_activeStep=n,this.$emit(`update:activeStep`,this.d_activeStep)),this.$emit(`step-change`,{originalEvent:e,index:n})},onItemKeydown:function(e,t){switch(e.code){case`ArrowRight`:this.navigateToNextItem(e.target),e.preventDefault();break;case`ArrowLeft`:this.navigateToPrevItem(e.target),e.preventDefault();break;case`Home`:this.navigateToFirstItem(e.target),e.preventDefault();break;case`End`:this.navigateToLastItem(e.target),e.preventDefault();break;case`Tab`:break;case`Enter`:case`NumpadEnter`:case`Space`:this.onItemClick(e,t),e.preventDefault();break}},navigateToNextItem:function(e){var t=this.findNextItem(e);t&&this.setFocusToMenuitem(e,t)},navigateToPrevItem:function(e){var t=this.findPrevItem(e);t&&this.setFocusToMenuitem(e,t)},navigateToFirstItem:function(e){var t=this.findFirstItem(e);t&&this.setFocusToMenuitem(e,t)},navigateToLastItem:function(e){var t=this.findLastItem(e);t&&this.setFocusToMenuitem(e,t)},findNextItem:function(e){var t=e.parentElement.nextElementSibling;return t?t.children[0]:null},findPrevItem:function(e){var t=e.parentElement.previousElementSibling;return t?t.children[0]:null},findFirstItem:function(){var e=p(this.$refs.list,`[data-pc-section="item"]`);return e?e.children[0]:null},findLastItem:function(){var e=f(this.$refs.list,`[data-pc-section="item"]`);return e?e[e.length-1].children[0]:null},setFocusToMenuitem:function(e,t){e.tabIndex=`-1`,t.tabIndex=`0`,t.focus()},isActive:function(e){return e===this.d_activeStep},isItemDisabled:function(e,t){return this.disabled(e)||this.readonly&&!this.isActive(t)},visible:function(e){return typeof e.visible==`function`?e.visible():e.visible!==!1},disabled:function(e){return typeof e.disabled==`function`?e.disabled():e.disabled},label:function(e){return typeof e.label==`function`?e.label():e.label},getMenuItemProps:function(e,t){var n=this;return{action:r({class:this.cx(`itemLink`),onClick:function(t){return n.onItemClick(t,e)},onKeyDown:function(t){return n.onItemKeydown(t,e)}},this.getPTOptions(`itemLink`,e,t)),step:r({class:this.cx(`itemNumber`)},this.getPTOptions(`itemNumber`,e,t)),label:r({class:this.cx(`itemLabel`)},this.getPTOptions(`itemLabel`,e,t))}}}},v=[`id`],y=[`aria-current`,`onClick`,`onKeydown`,`data-p-active`,`data-p-disabled`];function b(n,l,f,p,m,h){return i(),s(`nav`,r({id:n.id,class:n.cx(`root`)},n.ptmi(`root`)),[o(`ol`,r({ref:`list`,class:n.cx(`list`)},n.ptm(`list`)),[(i(!0),s(c,null,t(n.model,function(t,l){return i(),s(c,{key:h.label(t)+`_`+l.toString()},[h.visible(t)?(i(),s(`li`,r({key:0,class:[n.cx(`item`,{item:t,index:l}),t.class],style:t.style,"aria-current":h.isActive(l)?`step`:void 0,onClick:function(e){return h.onItemClick(e,t,l)},onKeydown:function(e){return h.onItemKeydown(e,t,l)}},{ref_for:!0},h.getPTOptions(`item`,t,l),{"data-p-active":h.isActive(l),"data-p-disabled":h.isItemDisabled(t,l)}),[n.$slots.item?(i(),u(a(n.$slots.item),{key:1,item:t,index:l,active:l===m.d_activeStep,label:h.label(t),props:h.getMenuItemProps(t,l)},null,8,[`item`,`index`,`active`,`label`,`props`])):(i(),s(`span`,r({key:0,class:n.cx(`itemLink`)},{ref_for:!0},h.getPTOptions(`itemLink`,t,l)),[o(`span`,r({class:n.cx(`itemNumber`)},{ref_for:!0},h.getPTOptions(`itemNumber`,t,l)),e(l+1),17),o(`span`,r({class:n.cx(`itemLabel`)},{ref_for:!0},h.getPTOptions(`itemLabel`,t,l)),e(h.label(t)),17)],16))],16,y)):d(``,!0)],64)}),128))],16)],16,v)}_.render=b;export{_ as default};