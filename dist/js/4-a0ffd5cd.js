webpackJsonp([4],{280:function(t,e,a){function o(t){a(315)}var n=a(2)(a(288),a(307),o,"data-v-3a5aea02",null);t.exports=n.exports},288:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a(14),n=function(t){return t&&t.__esModule?t:{default:t}}(o),i=a(55),s=a(20);e.default={name:"release",components:{MsHeader:i.MsHeader,MsButton:i.MsButton,MsSelect:i.MsSelect},data:function(){return{title:"",content:"",type:"dev",options:[{name:"测试",value:"dev"},{name:"问答",value:"ask"},{name:"分享",value:"share"},{name:"招聘",value:"job"}]}},computed:(0,n.default)({},(0,s.mapState)({userState:function(t){return t.user}})),methods:{onSubmit:function(){var t=this,e=this.title,a=this.content,o=(this.type,this.userState,null);return e=trim(e),a=trim(a),e||(o="请输入标题！"),e.length<10&&(o="标题不能小于小于10个字"),a||(o="请输入内容"),a.length<15&&(o="内容不能小于15个字"),o?this.$PopUp.tip(o):getUserLogin()?void this.release():this.$openLogin(function(e){e(),t.release()})},release:function(){var t=this;loading("发布中...");var e=this.title,a=this.content,o=this.type,n=this.userState,i=n.access_token;this.$http.post("/topics",{title:e,tab:o,content:a,accesstoken:i}).then(function(e){var a=e.topic_id;t.$PopUp.toast("发布成功！",function(){t.$router.push("/detail/"+a)})}).catch(function(){t.$PopUp.alert("发布失败，请重新发布！")}).finally(loadingClose)}}}},292:function(t,e,a){e=t.exports=a(0)(!1),e.push([t.i,".sub-form[data-v-3a5aea02]{display:block;padding:16px 10px}.bg-white[data-v-3a5aea02]{background-color:#fff}.title[data-v-3a5aea02]{height:40px;width:100%;outline:none;border:1px solid #ccc;background-color:#fff;border-radius:2px;padding:0 10px;font-size:14px;color:#555}.title[data-v-3a5aea02]:focus{border-color:#ff7a4c}.content[data-v-3a5aea02]{display:block;background-color:#fff;margin-top:16px;width:100%;border:1px solid #ccc;padding:10px;border-radius:2px}.content textarea[data-v-3a5aea02]{display:block;width:100%;min-height:200px;outline:none;border:none;resize:none;font-size:14px;padding:0;color:#555}.select-box[data-v-3a5aea02]{margin-top:16px}.button[data-v-3a5aea02]{height:42px;width:100%;border-radius:6px;margin-top:30px;font-size:16px}",""])},307:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"has-header",rawName:"v-has-header"}],staticClass:"ms-page bg-white"},[a("MsHeader",{attrs:{title:"发表主题"}}),t._v(" "),a("form",{staticClass:"sub-form",on:{submit:function(e){e.preventDefault(),t.onSubmit(e)}}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],staticClass:"title",attrs:{type:"text",placeholder:"请输入主题"},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value)}}}),t._v(" "),a("div",{staticClass:"content"},[a("textarea",{directives:[{name:"textarea-auto",rawName:"v-textarea-auto"},{name:"model",rawName:"v-model",value:t.content,expression:"content"}],attrs:{placeholder:"请输入内容"},domProps:{value:t.content},on:{input:function(e){e.target.composing||(t.content=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"select-box"},[a("MsSelect",{attrs:{options:t.options,title:"请选择发布类型"},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}})],1),t._v(" "),a("MsButton",{staticClass:"button"},[t._v("发布")])],1)],1)},staticRenderFns:[]}},315:function(t,e,a){var o=a(292);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a(1)("76fc74ce",o,!0,{})}});