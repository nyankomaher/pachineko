import{P as e,U as t,_ as n,b as r,j as i,q as a}from"./C8bKil6U.js";import{C as o,M as s,k as c,t as l}from"./czlGUozm.js";import{t as u}from"./FiooIEjL.js";var d=l.extend({name:`scrollpanel`,style:`
    .p-scrollpanel-content-container {
        overflow: hidden;
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 1;
        float: left;
    }

    .p-scrollpanel-content {
        height: calc(100% + calc(2 * dt('scrollpanel.bar.size')));
        width: calc(100% + calc(2 * dt('scrollpanel.bar.size')));
        padding-inline: 0 calc(2 * dt('scrollpanel.bar.size'));
        padding-block: 0 calc(2 * dt('scrollpanel.bar.size'));
        position: relative;
        overflow: auto;
        box-sizing: border-box;
        scrollbar-width: none;
    }

    .p-scrollpanel-content::-webkit-scrollbar {
        display: none;
    }

    .p-scrollpanel-bar {
        position: relative;
        border-radius: dt('scrollpanel.bar.border.radius');
        z-index: 2;
        cursor: pointer;
        opacity: 0;
        outline-color: transparent;
        background: dt('scrollpanel.bar.background');
        border: 0 none;
        transition:
            outline-color dt('scrollpanel.transition.duration'),
            opacity dt('scrollpanel.transition.duration');
    }

    .p-scrollpanel-bar:focus-visible {
        box-shadow: dt('scrollpanel.bar.focus.ring.shadow');
        outline: dt('scrollpanel.barfocus.ring.width') dt('scrollpanel.bar.focus.ring.style') dt('scrollpanel.bar.focus.ring.color');
        outline-offset: dt('scrollpanel.barfocus.ring.offset');
    }

    .p-scrollpanel-bar-y {
        width: dt('scrollpanel.bar.size');
        inset-block-start: 0;
    }

    .p-scrollpanel-bar-x {
        height: dt('scrollpanel.bar.size');
        inset-block-end: 0;
    }

    .p-scrollpanel-hidden {
        visibility: hidden;
    }

    .p-scrollpanel:hover .p-scrollpanel-bar,
    .p-scrollpanel:active .p-scrollpanel-bar {
        opacity: 1;
    }

    .p-scrollpanel-grabbed {
        user-select: none;
    }
`,classes:{root:`p-scrollpanel p-component`,contentContainer:`p-scrollpanel-content-container`,content:`p-scrollpanel-content`,barX:`p-scrollpanel-bar p-scrollpanel-bar-x`,barY:`p-scrollpanel-bar p-scrollpanel-bar-y`}});i();var f={name:`ScrollPanel`,extends:{name:`BaseScrollPanel`,extends:u,props:{step:{type:Number,default:5}},style:d,provide:function(){return{$pcScrollPanel:this,$parentInstance:this}}},inheritAttrs:!1,initialized:!1,documentResizeListener:null,documentMouseMoveListener:null,documentMouseUpListener:null,frame:null,scrollXRatio:null,scrollYRatio:null,isXBarClicked:!1,isYBarClicked:!1,lastPageX:null,lastPageY:null,timer:null,outsideClickListener:null,data:function(){return{orientation:`vertical`,lastScrollTop:0,lastScrollLeft:0}},mounted:function(){this.$el.offsetParent&&this.initialize()},updated:function(){!this.initialized&&this.$el.offsetParent&&this.initialize()},beforeUnmount:function(){this.unbindDocumentResizeListener(),this.frame&&window.cancelAnimationFrame(this.frame)},methods:{initialize:function(){this.moveBar(),this.bindDocumentResizeListener(),this.calculateContainerHeight()},calculateContainerHeight:function(){var e=getComputedStyle(this.$el),t=getComputedStyle(this.$refs.xBar),n=c(this.$el)-parseInt(t.height,10);e[`max-height`]!==`none`&&n===0&&(this.$refs.content.offsetHeight+parseInt(t.height,10)>parseInt(e[`max-height`],10)?this.$el.style.height=e[`max-height`]:this.$el.style.height=this.$refs.content.offsetHeight+parseFloat(e.paddingTop)+parseFloat(e.paddingBottom)+parseFloat(e.borderTopWidth)+parseFloat(e.borderBottomWidth)+`px`)},moveBar:function(){var e=this;if(this.$refs.content){var t=this.$refs.content.scrollWidth,n=this.$refs.content.clientWidth,r=(this.$el.clientHeight-this.$refs.xBar.clientHeight)*-1;this.scrollXRatio=n/t;var i=this.$refs.content.scrollHeight,a=this.$refs.content.clientHeight,c=(this.$el.clientWidth-this.$refs.yBar.clientWidth)*-1;this.scrollYRatio=a/i;var l=Math.max(this.scrollXRatio*100,10),u=Math.max(this.scrollYRatio*100,10);this.frame=this.requestAnimationFrame(function(){e.$refs.xBar&&(e.scrollXRatio>=1?(e.$refs.xBar.setAttribute(`data-p-scrollpanel-hidden`,`true`),!e.isUnstyled&&s(e.$refs.xBar,`p-scrollpanel-hidden`)):(e.$refs.xBar.setAttribute(`data-p-scrollpanel-hidden`,`false`),!e.isUnstyled&&o(e.$refs.xBar,`p-scrollpanel-hidden`),e.$refs.xBar.style.cssText=`width:`+l+`%; inset-inline-start:`+Math.abs(e.$refs.content.scrollLeft)/(t-n)*(100-l)+`%;bottom:`+r+`px;`)),e.$refs.yBar&&(e.scrollYRatio>=1?(e.$refs.yBar.setAttribute(`data-p-scrollpanel-hidden`,`true`),!e.isUnstyled&&s(e.$refs.yBar,`p-scrollpanel-hidden`)):(e.$refs.yBar.setAttribute(`data-p-scrollpanel-hidden`,`false`),!e.isUnstyled&&o(e.$refs.yBar,`p-scrollpanel-hidden`),e.$refs.yBar.style.cssText=`height:`+u+`%; top: calc(`+e.$refs.content.scrollTop/(i-a)*(100-u)+`% - `+e.$refs.xBar.clientHeight+`px); inset-inline-end:`+c+`px;`))})}},onYBarMouseDown:function(e){this.isYBarClicked=!0,this.$refs.yBar.focus(),this.lastPageY=e.pageY,this.$refs.yBar.setAttribute(`data-p-scrollpanel-grabbed`,`true`),!this.isUnstyled&&s(this.$refs.yBar,`p-scrollpanel-grabbed`),document.body.setAttribute(`data-p-scrollpanel-grabbed`,`true`),!this.isUnstyled&&s(document.body,`p-scrollpanel-grabbed`),this.bindDocumentMouseListeners(),e.preventDefault()},onXBarMouseDown:function(e){this.isXBarClicked=!0,this.$refs.xBar.focus(),this.lastPageX=e.pageX,this.$refs.yBar.setAttribute(`data-p-scrollpanel-grabbed`,`false`),!this.isUnstyled&&s(this.$refs.xBar,`p-scrollpanel-grabbed`),document.body.setAttribute(`data-p-scrollpanel-grabbed`,`false`),!this.isUnstyled&&s(document.body,`p-scrollpanel-grabbed`),this.bindDocumentMouseListeners(),e.preventDefault()},onScroll:function(e){this.lastScrollLeft===e.target.scrollLeft?this.lastScrollTop!==e.target.scrollTop&&(this.lastScrollTop=e.target.scrollTop,this.orientation=`vertical`):(this.lastScrollLeft=e.target.scrollLeft,this.orientation=`horizontal`),this.moveBar()},onKeyDown:function(e){if(this.orientation===`vertical`)switch(e.code){case`ArrowDown`:this.setTimer(`scrollTop`,this.step),e.preventDefault();break;case`ArrowUp`:this.setTimer(`scrollTop`,this.step*-1),e.preventDefault();break;case`ArrowLeft`:case`ArrowRight`:e.preventDefault();break}else if(this.orientation===`horizontal`)switch(e.code){case`ArrowRight`:this.setTimer(`scrollLeft`,this.step),e.preventDefault();break;case`ArrowLeft`:this.setTimer(`scrollLeft`,this.step*-1),e.preventDefault();break;case`ArrowDown`:case`ArrowUp`:e.preventDefault();break}},onKeyUp:function(){this.clearTimer()},repeat:function(e,t){this.$refs.content[e]+=t,this.moveBar()},setTimer:function(e,t){var n=this;this.clearTimer(),this.timer=setTimeout(function(){n.repeat(e,t)},40)},clearTimer:function(){this.timer&&clearTimeout(this.timer)},onDocumentMouseMove:function(e){this.isXBarClicked?this.onMouseMoveForXBar(e):(this.isYBarClicked||this.onMouseMoveForXBar(e),this.onMouseMoveForYBar(e))},onMouseMoveForXBar:function(e){var t=this,n=e.pageX-this.lastPageX;this.lastPageX=e.pageX,this.frame=this.requestAnimationFrame(function(){t.$refs.content.scrollLeft+=n/t.scrollXRatio})},onMouseMoveForYBar:function(e){var t=this,n=e.pageY-this.lastPageY;this.lastPageY=e.pageY,this.frame=this.requestAnimationFrame(function(){t.$refs.content.scrollTop+=n/t.scrollYRatio})},onFocus:function(e){this.$refs.xBar.isSameNode(e.target)?this.orientation=`horizontal`:this.$refs.yBar.isSameNode(e.target)&&(this.orientation=`vertical`)},onBlur:function(){this.orientation===`horizontal`&&(this.orientation=`vertical`)},onDocumentMouseUp:function(){this.$refs.yBar.setAttribute(`data-p-scrollpanel-grabbed`,`false`),!this.isUnstyled&&o(this.$refs.yBar,`p-scrollpanel-grabbed`),this.$refs.xBar.setAttribute(`data-p-scrollpanel-grabbed`,`false`),!this.isUnstyled&&o(this.$refs.xBar,`p-scrollpanel-grabbed`),document.body.setAttribute(`data-p-scrollpanel-grabbed`,`false`),!this.isUnstyled&&o(document.body,`p-scrollpanel-grabbed`),this.unbindDocumentMouseListeners(),this.isXBarClicked=!1,this.isYBarClicked=!1},requestAnimationFrame:function(e){return(window.requestAnimationFrame||this.timeoutFrame)(e)},refresh:function(){this.moveBar()},scrollTop:function(e){var t=this.$refs.content.scrollHeight-this.$refs.content.clientHeight;e=e>t?t:e>0?e:0,this.$refs.content.scrollTop=e},timeoutFrame:function(e){setTimeout(e,0)},bindDocumentMouseListeners:function(){var e=this;this.documentMouseMoveListener||(this.documentMouseMoveListener=function(t){e.onDocumentMouseMove(t)},document.addEventListener(`mousemove`,this.documentMouseMoveListener)),this.documentMouseUpListener||(this.documentMouseUpListener=function(t){e.onDocumentMouseUp(t)},document.addEventListener(`mouseup`,this.documentMouseUpListener))},unbindDocumentMouseListeners:function(){this.documentMouseMoveListener&&=(document.removeEventListener(`mousemove`,this.documentMouseMoveListener),null),this.documentMouseUpListener&&=(document.removeEventListener(`mouseup`,this.documentMouseUpListener),null)},bindDocumentResizeListener:function(){var e=this;this.documentResizeListener||(this.documentResizeListener=function(){e.moveBar()},window.addEventListener(`resize`,this.documentResizeListener))},unbindDocumentResizeListener:function(){this.documentResizeListener&&=(window.removeEventListener(`resize`,this.documentResizeListener),null)}},computed:{contentId:function(){return this.$id+`_content`}}},p=[`id`],m=[`aria-controls`,`aria-valuenow`],h=[`aria-controls`,`aria-valuenow`];function g(i,o,s,c,l,u){return t(),r(`div`,e({class:i.cx(`root`)},i.ptmi(`root`)),[n(`div`,e({class:i.cx(`contentContainer`)},i.ptm(`contentContainer`)),[n(`div`,e({ref:`content`,id:u.contentId,class:i.cx(`content`),onScroll:o[0]||=function(){return u.onScroll&&u.onScroll.apply(u,arguments)},onMouseenter:o[1]||=function(){return u.moveBar&&u.moveBar.apply(u,arguments)}},i.ptm(`content`)),[a(i.$slots,`default`)],16,p)],16),n(`div`,e({ref:`xBar`,class:i.cx(`barx`),tabindex:`0`,role:`scrollbar`,"aria-orientation":`horizontal`,"aria-controls":u.contentId,"aria-valuenow":l.lastScrollLeft,onMousedown:o[2]||=function(){return u.onXBarMouseDown&&u.onXBarMouseDown.apply(u,arguments)},onKeydown:o[3]||=function(e){return u.onKeyDown(e)},onKeyup:o[4]||=function(){return u.onKeyUp&&u.onKeyUp.apply(u,arguments)},onFocus:o[5]||=function(){return u.onFocus&&u.onFocus.apply(u,arguments)},onBlur:o[6]||=function(){return u.onBlur&&u.onBlur.apply(u,arguments)}},i.ptm(`barx`),{"data-pc-group-section":`bar`}),null,16,m),n(`div`,e({ref:`yBar`,class:i.cx(`bary`),tabindex:`0`,role:`scrollbar`,"aria-orientation":`vertical`,"aria-controls":u.contentId,"aria-valuenow":l.lastScrollTop,onMousedown:o[7]||=function(){return u.onYBarMouseDown&&u.onYBarMouseDown.apply(u,arguments)},onKeydown:o[8]||=function(e){return u.onKeyDown(e)},onKeyup:o[9]||=function(){return u.onKeyUp&&u.onKeyUp.apply(u,arguments)},onFocus:o[10]||=function(){return u.onFocus&&u.onFocus.apply(u,arguments)}},i.ptm(`bary`),{"data-pc-group-section":`bar`}),null,16,h)],16)}f.render=g;export{f as default};