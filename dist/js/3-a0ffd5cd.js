webpackJsonp([3],{281:function(e,t,a){function i(e){a(321)}var n=a(2)(a(289),a(312),i,"data-v-ea417dfa",null);e.exports=n.exports},289:function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(14),o=i(n),s=a(55),r=a(25),l=i(r),c=a(20),d=(0,c.mapActions)((0,o.default)({},l.default));t.default={name:"user",components:{TabBar:s.TabBar,TabbarItem:s.TabbarItem},data:function(){return(0,o.default)({},d,{page:0,tableLabel:[{name:"最近回复"},{name:"最新发布"}]})},mounted:function(){var e=this.$route.params.loginName;this.getUserInfo(e)},computed:(0,o.default)({},(0,c.mapState)({userState:function(e){return e.user}}),{user:function(){var e=this.$route.params.loginName;return this.userState.userSave[e]},itemList:function(){var e=this.user;return[e.recent_replies,e.recent_topics]},isme:function(){return(this.userState.userInfo||{}).loginname===(this.user||{}).loginname}}),methods:{getTime:function(e){return diffTime(e)},pageChange:function(e){this.page=e},jump:function(e){this.$router.push("/detail/"+e.id)},loginOut:function(){var e=this;this.$PopUp.confirm("提示","确定要退出登录吗？",function(){e.unLogin(),e.$router.replace("/")})}}}},298:function(e,t,a){t=e.exports=a(0)(!1),t.push([e.i,".container[data-v-ea417dfa]{height:100%;padding-top:110px;position:relative}.user-center[data-v-ea417dfa]{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;height:110px;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:0 20px 14px}.user-avator[data-v-ea417dfa]{width:90px;height:90px;background-position:50%;background-repeat:no-repeat;background-size:cover;border-radius:45px;position:relative;z-index:1;background-color:#ccc}.center-right[data-v-ea417dfa]{-webkit-box-flex:1;-ms-flex:1;flex:1;color:#fff;padding-left:12px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;font-size:12px}.login-name[data-v-ea417dfa]{font-size:16px;color:#fff;font-weight:500;margin-bottom:20px}.score[data-v-ea417dfa]{margin-bottom:4px}.item-container[data-v-ea417dfa]{background:#fff}.item[data-v-ea417dfa]{display:-webkit-box;display:-ms-flexbox;display:flex;padding:10px;border-bottom:1px solid #ececec}.item[data-v-ea417dfa]:active{background-color:#f6f6f6}.item .avator[data-v-ea417dfa]{width:48px;height:48px;border-radius:24px;background-size:cover;background-color:#ececec;background-position:50%;background-repeat:no-repeat}.item .right-desc[data-v-ea417dfa]{-webkit-box-flex:1;-ms-flex:1;flex:1;padding:4px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin-left:4px}.item .title[data-v-ea417dfa]{font-size:14px;color:#333;font-weight:500;line-height:20px}.item .item-info[data-v-ea417dfa]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;color:#666;font-size:12px}.item .item-info span[data-v-ea417dfa]{display:block}.login-out[data-v-ea417dfa]{display:block;height:100%;background-color:transparent;color:#fff;padding:0 10px;font-size:16px}",""])},312:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.user?a("div",{directives:[{name:"has-header",rawName:"v-has-header"}],staticClass:"ms-page"},[a("MsHeader",{attrs:{title:"用户中心"}},[a("div",{staticClass:"user-center",attrs:{slot:"bottom"},slot:"bottom"},[a("div",{staticClass:"user-avator",style:{backgroundImage:"url("+e.user.avatar_url+")"}}),e._v(" "),a("div",{staticClass:"center-right"},[a("p",{staticClass:"login-name"},[e._v(e._s(e.user.loginname))]),e._v(" "),a("div",{staticClass:"score"},[e._v("\n                    积分："+e._s(e.user.score)+" | 注册于："+e._s(e.getTime(e.user.create_at))+"\n                ")])])]),e._v(" "),e.isme?a("button",{staticClass:"login-out",attrs:{slot:"right"},on:{click:e.loginOut},slot:"right"},[e._v("退出")]):e._e()]),e._v(" "),a("div",{staticClass:"container"},[a("TabBar",{attrs:{tableLabel:e.tableLabel,hasLine:!0,page:e.page,onChange:e.pageChange}},e._l(e.itemList,function(t,i){return a("TabbarItem",{key:i},[a("ScrollView",[a("ul",{staticClass:"item-container"},e._l(t,function(t){return a("li",{staticClass:"item",on:{click:function(a){e.jump(t)}}},[a("div",{staticClass:"avator",style:{backgroundImage:"url("+t.author.avatar_url+")"}}),e._v(" "),a("div",{staticClass:"right-desc"},[a("div",{staticClass:"title text-line-1"},[e._v(e._s(t.title))]),e._v(" "),a("div",{staticClass:"item-info"},[a("span",[e._v("\n                                        "+e._s(t.author.loginname)+"\n                                    ")]),e._v(" "),a("span",[e._v("\n                                        "+e._s(e.getTime(t.last_reply_at))+"\n                                    ")])])])])}))])],1)}))],1)],1):e._e()},staticRenderFns:[]}},321:function(e,t,a){var i=a(298);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a(1)("493e30f5",i,!0,{})}});