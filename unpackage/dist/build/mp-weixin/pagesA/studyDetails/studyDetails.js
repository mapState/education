(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/studyDetails/studyDetails"],{"1ee4":function(t,n,e){"use strict";var i,o=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return i}))},"3c37":function(t,n,e){"use strict";var i=e("bbfb"),o=e.n(i);o.a},"42a3":function(t,n,e){"use strict";e.r(n);var i=e("1ee4"),o=e("e62b");for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);e("3c37");var s,u=e("f0c5"),r=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);n["default"]=r.exports},"4b7c":function(t,n,e){"use strict";(function(t){function i(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o="",a=function(){e.e("components/CourseItem").then(function(){return resolve(e("7864"))}.bind(null,e)).catch(e.oe)},s={components:{CourseItem:a},data:function(){var t;return t={spUrl:"https://smallwx.pkbkok.com/lesson/file/media/",showRecommend:!1,tabIndex:0,tabList:["绘本图","听音频","阅读指导","游戏介绍"],currentIndex:0},i(t,"currentIndex",0),i(t,"duration",0),i(t,"currentTime",0),i(t,"playWay",1),i(t,"playState",1),i(t,"nowIndex",0),i(t,"courseList",[]),i(t,"detail",{}),i(t,"imgUrl",""),i(t,"books",[]),i(t,"bIndex",0),t},computed:{imgList:function(){var t=[];return this.books.length>0&&this.books[this.bIndex].image&&(t=this.books[this.bIndex].image.split(",")),t},nowtime:function(){var t,n=this,e=n.currentTime;return t=Math.floor(e/60),e%=60,t+="",e+="",t=1==t.length?"0"+t:t,e=1==e.length?"0"+e:e,t+":"+e},alltime:function(){var t,n=this,e=n.duration;return t=Math.floor(e/60),e%=60,t+="",e+="",t=1==t.length?"0"+t:t,e=1==e.length?"0"+e:e,t+":"+e}},onLoad:function(n){this.bIndex=n.index?n.index:0,this.imgUrl=this.$baseUrl,this.detail=getApp().globalData.learnDetail,this.bookList(),o=t.getBackgroundAudioManager(),this.getRecomed()},methods:{bookList:function(){var t=this;this.$api.get("/api/lesson/getBookListByLessonId",{params:{lessonId:this.detail.id,type:1}}).then((function(n){t.books=n.data}))},getRecomed:function(){var t=this;this.$api.get("/api/lesson/getBookListByLessonId",{params:{lessonId:this.detail.id,type:2}}).then((function(n){t.courseList=n.data}))},goDetail:function(){t.navigateTo({url:"/pages/courseDetails/courseDetails?type=1"})},bf:function(){1==this.playState?this.play():this.pause()},changeTabIndex:function(t){this.tabIndex=t},swiperChange:function(t){this.currentIndex=t.detail.current,this.currentIndex==this.imgList.length-1&&(this.showRecommend=!0)},sliderChange:function(t){this.currentTime=t.detail.value,o.seek(this.currentTime)},bgAudioInnit:function(){var t=this,n=this;this.books[this.bIndex]&&this.books[this.bIndex].audio&&(o.title=this.books[this.bIndex].title,o.src=this.spUrl+this.books[this.bIndex].audio,o.onPlay((function(){n.playFunc()})),o.onPause((function(){n.pauseFunc()})),o.onEnded((function(){n.next()})),o.onTimeUpdate((function(){t.currentTime=Math.floor(o.currentTime)})),o.onPrev((function(){n.last()})),o.onNext((function(){n.next()})),o.onError((function(){n.error()})),o.onWaiting((function(){n.playState=0})),o.onCanplay((function(){})))},error:function(){this.playState=0},play:function(){void 0==o.src&&this.bgAudioInnit(),o.play()},pause:function(){o.pause()},playFunc:function(){var t=this;t.playState=0,t.duration=Math.floor(o.duration)},pauseFunc:function(){var t=this;t.playState=1},last:function(){},next:function(){this.playState=1}}};n.default=s}).call(this,e("543d")["default"])},"60a2":function(t,n,e){"use strict";(function(t){e("1f75");i(e("66fd"));var n=i(e("42a3"));function i(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},bbfb:function(t,n,e){},e62b:function(t,n,e){"use strict";e.r(n);var i=e("4b7c"),o=e.n(i);for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);n["default"]=o.a}},[["60a2","common/runtime","common/vendor"]]]);