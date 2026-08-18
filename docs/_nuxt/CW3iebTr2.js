import{P as e,U as t,b as n,j as r,q as i}from"./C8bKil6U.js";import{A as a,M as o,d as s,t as c}from"./czlGUozm.js";import{t as l}from"./cO8iUN-n.js";import{t as u}from"./FiooIEjL.js";import{n as d,t as f}from"./CNPmhXSq.js";var p=c.extend({name:`blockui`,style:`
    .p-blockui {
        position: relative;
    }

    .p-blockui-mask {
        border-radius: dt('blockui.border.radius');
    }

    .p-blockui-mask.p-overlay-mask {
        position: absolute;
    }

    .p-blockui-mask-document.p-overlay-mask {
        position: fixed;
    }
`,classes:{root:`p-blockui`}});r();var m={name:`BlockUI`,extends:{name:`BaseBlockUI`,extends:u,props:{blocked:{type:Boolean,default:!1},fullScreen:{type:Boolean,default:!1},baseZIndex:{type:Number,default:0},autoZIndex:{type:Boolean,default:!0}},style:p,provide:function(){return{$pcBlockUI:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`block`,`unblock`],mask:null,data:function(){return{isBlocked:!1}},watch:{blocked:function(e){e===!0?this.block():this.unblock()}},mounted:function(){this.blocked&&this.block()},methods:{block:function(){var e=`p-blockui-mask p-overlay-mask p-overlay-mask-enter-active`;this.fullScreen?(e+=` p-blockui-mask-document`,this.mask=a(`div`,{style:{position:`fixed`,top:`0`,left:`0`,width:`100%`,height:`100%`},class:!this.isUnstyled&&e,"p-bind":this.ptm(`mask`)}),document.body.appendChild(this.mask),f(),document.activeElement.blur()):(this.mask=a(`div`,{style:{position:`absolute`,top:`0`,left:`0`,width:`100%`,height:`100%`},class:!this.isUnstyled&&e,"p-bind":this.ptm(`mask`)}),this.$refs.container.appendChild(this.mask)),this.autoZIndex&&l.set(`modal`,this.mask,this.baseZIndex||this.$primevue.config.zIndex.modal),this.isBlocked=!0,this.$emit(`block`)},unblock:function(){var e=this;if(this.mask){!this.isUnstyled&&o(this.mask,`p-overlay-mask-leave-active`);var t=function(){clearTimeout(n),e.mask.removeEventListener(`animationend`,t),e.mask.removeEventListener(`webkitAnimationEnd`,t)},n=setTimeout(function(){e.removeMask()},300);s(this.mask)>0&&(this.mask.addEventListener(`animationend`,t),this.mask.addEventListener(`webkitAnimationEnd`,t))}else this.removeMask()},removeMask:function(){if(l.clear(this.mask),this.fullScreen)document.body.removeChild(this.mask),d();else{var e;(e=this.$refs.container)==null||e.removeChild(this.mask)}this.isBlocked=!1,this.$emit(`unblock`)}}},h=[`aria-busy`];function g(r,a,o,s,c,l){return t(),n(`div`,e({ref:`container`,class:r.cx(`root`),"aria-busy":c.isBlocked},r.ptmi(`root`)),[i(r.$slots,`default`)],16,h)}m.render=g;export{m as default};