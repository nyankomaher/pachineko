import{Jt as e,Ot as t,P as n,Qt as r,U as i,X as a,b as o,j as s,q as c,v as l,y as u}from"./C8bKil6U.js";import{t as d}from"./czlGUozm.js";import{t as f}from"./CRHlWn3X.js";import{t as p}from"./FiooIEjL.js";import{t as m}from"./_5kPnuOP.js";var h=d.extend({name:`chip`,style:`
    .p-chip {
        display: inline-flex;
        align-items: center;
        background: dt('chip.background');
        color: dt('chip.color');
        border-radius: dt('chip.border.radius');
        padding-block: dt('chip.padding.y');
        padding-inline: dt('chip.padding.x');
        gap: dt('chip.gap');
    }

    .p-chip-icon {
        color: dt('chip.icon.color');
        font-size: dt('chip.icon.size');
        width: dt('chip.icon.size');
        height: dt('chip.icon.size');
    }

    .p-chip-image {
        border-radius: 50%;
        width: dt('chip.image.width');
        height: dt('chip.image.height');
        margin-inline-start: calc(-1 * dt('chip.padding.y'));
    }

    .p-chip:has(.p-chip-remove-icon) {
        padding-inline-end: dt('chip.padding.y');
    }

    .p-chip:has(.p-chip-image) {
        padding-block-start: calc(dt('chip.padding.y') / 2);
        padding-block-end: calc(dt('chip.padding.y') / 2);
    }

    .p-chip-remove-icon {
        cursor: pointer;
        font-size: dt('chip.remove.icon.size');
        width: dt('chip.remove.icon.size');
        height: dt('chip.remove.icon.size');
        color: dt('chip.remove.icon.color');
        border-radius: 50%;
        transition:
            outline-color dt('chip.transition.duration'),
            box-shadow dt('chip.transition.duration');
        outline-color: transparent;
    }

    .p-chip-remove-icon:focus-visible {
        box-shadow: dt('chip.remove.icon.focus.ring.shadow');
        outline: dt('chip.remove.icon.focus.ring.width') dt('chip.remove.icon.focus.ring.style') dt('chip.remove.icon.focus.ring.color');
        outline-offset: dt('chip.remove.icon.focus.ring.offset');
    }
`,classes:{root:`p-chip p-component`,image:`p-chip-image`,icon:`p-chip-icon`,label:`p-chip-label`,removeIcon:`p-chip-remove-icon`}}),g=r({default:()=>_});s(),t();var _={name:`Chip`,extends:{name:`BaseChip`,extends:p,props:{label:{type:[String,Number],default:null},icon:{type:String,default:null},image:{type:String,default:null},removable:{type:Boolean,default:!1},removeIcon:{type:String,default:void 0}},style:h,provide:function(){return{$pcChip:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`remove`],data:function(){return{visible:!0}},methods:{onKeydown:function(e){(e.key===`Enter`||e.key===`Backspace`)&&this.close(e)},close:function(e){this.visible=!1,this.$emit(`remove`,e)}},computed:{dataP:function(){return f({removable:this.removable})}},components:{TimesCircleIcon:m}},v=[`aria-label`,`data-p`],y=[`src`];function b(t,r,s,d,f,p){return f.visible?(i(),o(`div`,n({key:0,class:t.cx(`root`),"aria-label":t.label},t.ptmi(`root`),{"data-p":p.dataP}),[c(t.$slots,`default`,{},function(){return[t.image?(i(),o(`img`,n({key:0,src:t.image},t.ptm(`image`),{class:t.cx(`image`)}),null,16,y)):t.$slots.icon?(i(),l(a(t.$slots.icon),n({key:1,class:t.cx(`icon`)},t.ptm(`icon`)),null,16,[`class`])):t.icon?(i(),o(`span`,n({key:2,class:[t.cx(`icon`),t.icon]},t.ptm(`icon`)),null,16)):u(``,!0),t.label===null?u(``,!0):(i(),o(`div`,n({key:3,class:t.cx(`label`)},t.ptm(`label`)),e(t.label),17))]}),t.removable?c(t.$slots,`removeicon`,{key:0,removeCallback:p.close,keydownCallback:p.onKeydown},function(){return[(i(),l(a(t.removeIcon?`span`:`TimesCircleIcon`),n({class:[t.cx(`removeIcon`),t.removeIcon],onClick:p.close,onKeydown:p.onKeydown},t.ptm(`removeIcon`)),null,16,[`class`,`onClick`,`onKeydown`]))]}):u(``,!0)],16,v)):u(``,!0)}_.render=b;export{_ as n,g as t};