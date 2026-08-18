import{Jt as e,K as t,Ot as n,P as r,U as i,_ as a,a as o,b as s,d as c,j as l,nt as u,s as d,y as f}from"./C8bKil6U.js";import{nt as p,t as m}from"./czlGUozm.js";import{t as h}from"./FiooIEjL.js";var g=p(),_=m.extend({name:`terminal`,style:`
    .p-terminal {
        display: block;
        height: dt('terminal.height');
        overflow: auto;
        background: dt('terminal.background');
        color: dt('terminal.color');
        border: 1px solid dt('terminal.border.color');
        padding: dt('terminal.padding');
        border-radius: dt('terminal.border.radius');
    }

    .p-terminal-prompt {
        display: flex;
        align-items: center;
    }

    .p-terminal-prompt-value {
        flex: 1 1 auto;
        border: 0 none;
        background: transparent;
        color: inherit;
        padding: 0;
        outline: 0 none;
        font-family: inherit;
        font-feature-settings: inherit;
        font-size: 1rem;
    }

    .p-terminal-prompt-label {
        margin-inline-end: dt('terminal.prompt.gap');
    }

    .p-terminal-input::-ms-clear {
        display: none;
    }

    .p-terminal-command-response {
        margin: dt('terminal.command.response.margin');
    }
`,classes:{root:`p-terminal p-component`,welcomeMessage:`p-terminal-welcome-message`,commandList:`p-terminal-command-list`,command:`p-terminal-command`,commandValue:`p-terminal-command-value`,commandResponse:`p-terminal-command-response`,prompt:`p-terminal-prompt`,promptLabel:`p-terminal-prompt-label`,promptValue:`p-terminal-prompt-value`}});l(),n(),o();var v={name:`Terminal`,extends:{name:`BaseTerminal`,extends:h,props:{welcomeMessage:{type:String,default:null},prompt:{type:String,default:null}},style:_,provide:function(){return{$pcTerminal:this,$parentInstance:this}}},inheritAttrs:!1,data:function(){return{commandText:null,commands:[]}},mounted:function(){g.on(`response`,this.responseListener),this.$refs.input.focus()},updated:function(){this.$el.scrollTop=this.$el.scrollHeight},beforeUnmount:function(){g.off(`response`,this.responseListener)},methods:{onClick:function(){this.$refs.input.focus()},onKeydown:function(e){e.key===`Enter`&&this.commandText&&(this.commands.push({text:this.commandText}),g.emit(`command`,this.commandText),this.commandText=``)},responseListener:function(e){this.commands[this.commands.length-1].response=e}}};function y(n,o,l,p,m,h){return i(),s(`div`,r({class:n.cx(`root`),onClick:o[2]||=function(){return h.onClick&&h.onClick.apply(h,arguments)}},n.ptmi(`root`)),[n.welcomeMessage?(i(),s(`div`,r({key:0,class:n.cx(`welcomeMessage`)},n.ptm(`welcomeMessage`)),e(n.welcomeMessage),17)):f(``,!0),a(`div`,r({class:n.cx(`commandList`)},n.ptm(`content`)),[(i(!0),s(c,null,t(m.commands,function(t,o){return i(),s(`div`,r({key:t.text+o.toString(),class:n.cx(`command`)},{ref_for:!0},n.ptm(`commands`)),[a(`span`,r({class:n.cx(`promptLabel`)},{ref_for:!0},n.ptm(`prompt`)),e(n.prompt),17),a(`span`,r({class:n.cx(`commandValue`)},{ref_for:!0},n.ptm(`command`)),e(t.text),17),a(`div`,r({class:n.cx(`commandResponse`),"aria-live":`polite`},{ref_for:!0},n.ptm(`response`)),e(t.response),17)],16)}),128))],16),a(`div`,r({class:n.cx(`prompt`)},n.ptm(`container`)),[a(`span`,r({class:n.cx(`promptLabel`)},n.ptm(`prompt`)),e(n.prompt),17),u(a(`input`,r({ref:`input`,"onUpdate:modelValue":o[0]||=function(e){return m.commandText=e},class:n.cx(`promptValue`),type:`text`,autocomplete:`off`,onKeydown:o[1]||=function(){return h.onKeydown&&h.onKeydown.apply(h,arguments)}},n.ptm(`commandText`)),null,16),[[d,m.commandText]])],16)],16)}v.render=y;export{v as default};