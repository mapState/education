(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/search/search"],{"95c6":function(t,e,o){"use strict";o.r(e);var n=o("d5c3"),i=o("a5e5");for(var a in i)"default"!==a&&function(t){o.d(e,t,(function(){return i[t]}))}(a);o("a86a");var s,c=o("f0c5"),r=Object(c["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);e["default"]=r.exports},a5e5:function(t,e,o){"use strict";o.r(e);var n=o("dee9"),i=o.n(n);for(var a in n)"default"!==a&&function(t){o.d(e,t,(function(){return n[t]}))}(a);e["default"]=i.a},a86a:function(t,e,o){"use strict";var n=o("c9a6"),i=o.n(n);i.a},c9a6:function(t,e,o){},d5c3:function(t,e,o){"use strict";var n={uniLoadMore:function(){return o.e("components/uni-load-more/uni-load-more").then(o.bind(null,"b7a9"))}},i=function(){var t=this,e=t.$createElement;t._self._c},a=[];o.d(e,"b",(function(){return i})),o.d(e,"c",(function(){return a})),o.d(e,"a",(function(){return n}))},dee9:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=function(){o.e("components/Activity").then(function(){return resolve(o("be53"))}.bind(null,o)).catch(o.oe)},i={components:{Activity:n},data:function(){return{loadStatus:"noMore",historyList:[],keyWord:"",pageNo:1,list:[]}},onLoad:function(){var e=this;t.getStorage({key:"historyList",success:function(t){e.historyList=t.data}})},onReachBottom:function(){this.getList()},methods:{goDetail:function(e){getApp().globalData.activeData=e,console.log(getApp().globalData.activeData),t.navigateTo({url:"/pages/activityDetails/activityDetails"})},search:function(e){var o=e.detail.value;console.log(o),this.pageNo=1,this.list=[],this.getList(),-1==this.historyList.indexOf(o)&&(this.historyList.push(o),t.setStorageSync("historyList",this.historyList))},historySearch:function(t){this.keyWord=t,this.pageNo=1,this.list=[],this.getList()},getList:function(){var t=this;this.loadStatus="loading",this.$api.get("/api/act/getActivityList",{params:{keyword:this.keyWord,pageSize:5,pageNo:this.pageNo}}).then((function(e){e.data.length>0?(t.list=t.list.concat(e.data),t.pageNo++,5==e.data.length?t.loadStatus="more":t.loadStatus="noMore"):t.loadStatus="noMore"}))},clearHistory:function(){var e=this;t.showModal({title:"提示",content:"确定清除搜索历史?",success:function(o){o.confirm?t.removeStorage({key:"historyList",success:function(o){e.historyList=[],t.showToast({title:"清除成功",icon:"none"})}}):o.cancel&&console.log("用户点击取消")}})}}};e.default=i}).call(this,o("543d")["default"])},f42e:function(t,e,o){"use strict";(function(t){o("1f75");n(o("66fd"));var e=n(o("95c6"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("543d")["createPage"])}},[["f42e","common/runtime","common/vendor"]]]);