(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/activityDetails/activityDetails"],{"062c":function(t,e,o){"use strict";(function(t){o("1f75");a(o("66fd"));var e=a(o("d945"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("543d")["createPage"])},1985:function(t,e,o){"use strict";var a={uniPopup:function(){return Promise.all([o.e("common/vendor"),o.e("components/uni-popup/uni-popup")]).then(o.bind(null,"5592"))}},i=function(){var t=this,e=t.$createElement,o=(t._self._c,t._f("changeTime")(t.detailData.startDate)),a=t._f("changeTime")(t.detailData.endDate),i=t._f("changeTime")(t.detailData.signStartDate),n=t._f("changeTime")(t.detailData.signEndDate);t._isMounted||(t.e0=t.$refs.sharePop.open,t.e1=function(e){return t.$refs.showMyGroup.open()},t.e2=function(e){t.showAd=!1},t.e3=t.$refs.popup1.close),t.$mp.data=Object.assign({},{$root:{f0:o,f1:a,f2:i,f3:n}})},n=[];o.d(e,"b",(function(){return i})),o.d(e,"c",(function(){return n})),o.d(e,"a",(function(){return a}))},"27a0":function(t,e,o){"use strict";o.r(e);var a=o("281f"),i=o.n(a);for(var n in a)"default"!==n&&function(t){o.d(e,t,(function(){return a[t]}))}(n);e["default"]=i.a},"281f":function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=function(){Promise.all([o.e("common/vendor"),o.e("components/uni-popup/uni-popup")]).then(function(){return resolve(o("5592"))}.bind(null,o)).catch(o.oe)},i=function(){o.e("components/Activity").then(function(){return resolve(o("be53"))}.bind(null,o)).catch(o.oe)},n={components:{uniPopup:a,Activity:i},data:function(){return{imgUrl:"",tmpImg:"",width:570,height:820,pixelRatio:2,codePath:"/static/tmp/code.jpg",poserImg:"https://t8.baidu.com/it/u=3887179165,3572970878&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1596352536&t=2736120db00abcf307212a6d5ddfce18",totalDays:"",laveDays:"",detailData:{},top:22,scrollTop:0,showAd:!0,toIndex:"",letterDetails:[],currentLetter:"Details",type:0,showFixed:!0,status:0,tagList:[],giveList:[],oldEve:[],buyStatus:!1}},filters:{changeTime:function(t){return t?t.substr(0,10):""}},onLoad:function(e){this.imgUrl=this.$baseUrl,this.top=t.getMenuButtonBoundingClientRect().top,this.detailData=getApp().globalData.activeData,this.buyStatus=!!e.buyStatus,this.getLaveTime(),this.getCates(),this.getOldEve()},onShareAppMessage:function(t){return"button"===t.from&&console.log(t.target),{title:"自定义分享标题",path:"/pages/index/index"}},methods:{downFile:function(){t.downloadFile({url:this.imgUrl+this.detailData.filepath,success:function(e){200===e.statusCode&&t.showToast({title:"下载成功"})}})},doCollect:function(){var t=1==this.detailData.isStore?0:1;this.collected(t)},collected:function(e){var o=this;this.$api.post("/api/user/store",{type:1,status:e,tableId:this.detailData.id,userId:t.getStorageSync("userInfo").id}).then((function(t){o.detailData.isStore=e}))},getOldEve:function(){var t=this;this.$api.get("/api/act/getCommentActivityId",{params:{activityId:this.detailData.id}}).then((function(e){t.oldEve=e.data}))},getCates:function(){var t=this;this.$api.get("/api/static/dictList",{params:{type:1}}).then((function(e){console.log(e.data);var o="",a=[];e.data.forEach((function(e){e.id==t.detailData.typeId&&(a.push(e.name),o=e.pid)})),console.log(a),e.data.forEach((function(e){e.id==o&&(a.push(e.name),t.tagList=a)}))}))},getLaveTime:function(){var t=this.detailData.startDate.replace(new RegExp("-","gm"),"/").substr(0,10),e=this.detailData.endDate.replace(new RegExp("-","gm"),"/").substr(0,10);t=new Date(t).getTime(),e=new Date(e).getTime(),this.totalDays=this.geta(t,e);var o=(new Date).getTime(),a=this.detailData.signEndDate.replace(new RegExp("-","gm"),"/").substr(0,10);a=new Date(a).getTime(),this.laveDays=this.geta(o,a)},geta:function(t,e){var o=e-t,a=Math.floor(o/864e5);return a+1},goInfo:function(){t.navigateTo({url:"/pages/togetherInfo/togetherInfo?actId="+this.detailData.id})},goCommet:function(){t.navigateTo({url:"/pagesA/courseEvaluation/courseEvaluation"})},toView:function(t){this.toIndex=t,this.currentLetter=t},scrollHandle:function(e){var o=this,a=e.detail.scrollTop;this.scrollTop=a;var i=t.createSelectorQuery().in(this).selectAll(".module");i.boundingClientRect((function(t){var e=t[0].top;t.forEach((function(t){t.top=t.top-e,t.bottom=t.bottom-e,o.letterDetails.push({id:t.id,top:t.top,bottom:t.bottom})})),o.letterDetails.some((function(t){if(a-180>=t.top&&a-180<=t.bottom-20)return o.currentLetter=t.id,!0}))})).exec()},goBack:function(){t.navigateBack({delta:1})},showGroupPop:function(){this.$refs.popup.open()},OpenGroup:function(){var e=this;this.$api.get("/api/user/getUserInfo").then((function(o){e.$refs.popup.close(),t.navigateTo({url:"/pages/joinDetail/joinDetail?type=1"})}))},viewAll:function(){t.navigateTo({url:"/pages/comment/comment"})},closePoser:function(){this.$refs.poster.close()},getPoster:function(){var e=this;this.$refs.sharePop.close(),t.showLoading({title:"海报生成中...",mask:!0});var o=this,a=wx.createCanvasContext("myCanvas");a.width=this.width,a.height=this.height;a.width;wx.getImageInfo({src:this.poserImg,success:function(i){a.fillStyle="#FFFFFF",a.fillRect(0,0,e.width,e.height),a.drawImage(i.path,0,0,e.width,530),a.setFontSize(28),a.setFillStyle("#000000"),a.setTextAlign("center");var n="杭州小记者内蒙古宁夏夏令营梦幻迪士尼";n.length>20&&(n=n.substr(0,20)+"..."),a.fillText(n,e.width/2,600);var s="长按识别，立即参加";a.setFontSize(28),a.fillText(s,320,760),a.save(),a.restore();var r="邀您参加";a.setFillStyle("#666666"),a.font="normal bold 24px sans-serif",a.fillText(r,340,720),a.save(),a.restore();var c="张雨溪";a.setFillStyle("#000000"),a.font="normal bold 26px sans-serif",a.fillText(c,340,690),a.save(),a.restore(),wx.getImageInfo({src:o.codePath,success:function(i){a.drawImage(o.codePath,33,650,132,132),wx.getImageInfo({src:e.poserImg,success:function(o){console.log(o);var i=62,n=62,s=200,r=660;a.beginPath(),a.arc(i/2+s,n/2+r,i/2,0,2*Math.PI,!1),a.clip(),a.drawImage(o.path,200,660,62,62),a.save(),a.draw(),setTimeout((function(){wx.canvasToTempFilePath({canvasId:"myCanvas",x:0,y:0,width:e.width,height:e.height,destWidth:e.width,destHeight:e.height,success:function(o){var a=o.tempFilePath;e.tmpImg=a,console.log(a),t.hideLoading(),e.$refs.poster.open()},fail:function(e){console.log(e),t.hideLoading()}})}),300)}})}})}})},saveImageToPhotosAlbum:function(){var t=this,e=t.tmpImg;void 0!=e&&""!=e&&wx.saveImageToPhotosAlbum({filePath:e,success:function(t){wx.showToast({title:"已保存到相册",icon:"none",duration:1500,mask:!0})},fail:function(t){console.error(t),console.error("打开设置窗口"),wx.openSetting({success:function(t){console.error(t),t.authSetting["scope.writePhotosAlbum"]?console.error("获取权限成功，再次点击图片保存到相册"):console.error("获取权限失败")}})}})}}};e.default=n}).call(this,o("543d")["default"])},"6be0":function(t,e,o){},"845f":function(t,e,o){"use strict";var a=o("6be0"),i=o.n(a);i.a},d945:function(t,e,o){"use strict";o.r(e);var a=o("1985"),i=o("27a0");for(var n in i)"default"!==n&&function(t){o.d(e,t,(function(){return i[t]}))}(n);o("845f");var s,r=o("f0c5"),c=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],s);e["default"]=c.exports}},[["062c","common/runtime","common/vendor"]]]);