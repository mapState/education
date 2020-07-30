<template>
	<view class="main">
		<view class="nav" :style="{top:top+'px'}" @click="goBack">
			<image src="../../static/icon/bk.png" mode="aspectFill"></image>
		</view>
		<view class="header " :style="{paddingTop:top+'px'}" v-if="scrollTop>=200">
			<text class="hd" :class="{'active':currentLetter=='Details'}" @click="toView('Details')">详情介绍</text>
			<text class="" :class="{'active':currentLetter=='Evaluation'}" @click="toView('Evaluation')">用户评价</text>
		</view>
		<scroll-view class="scroll-view" scroll-y scroll-with-animation="true" :scroll-into-view="toIndex" @scroll="scrollHandle">
			<view class="main">
				<view class="ss">
					<image :src="imgUrl+detail.poster" mode="aspectFill" class="ssImge"></image>
				</view>
				<!-- <swiper class="swiper" :autoplay="true" :interval="2000" :duration="500" :circular="true" :indicator-dots="true"
				 indicator-color="#fff" indicator-active-color="#FDD30F">
					<swiper-item v-for="item in 3" :key="item">
						<image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593333346662&di=d4cceef20cedcd44a9c1105a107a1803&imgtype=0&src=http%3A%2F%2Ft8.baidu.com%2Fit%2Fu%3D1484500186%2C1503043093%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1280%26h%3D853"
						 mode="aspectFill" class="itemImg"></image>
					</swiper-item>
				</swiper> -->
				<view class="titleBox">
					<view class="title">
						<text>{{detail.title}}</text>
						<view class="icons" @click="$refs.sharePop.open">
							<image src="../../static/icon/share.png" mode="aspectFit"></image>
							<text>赚佣金</text>
						</view>
					</view>
					<view class="tags">
						<view class="tag" v-for="(item,index) in tagList" :key="index">
							{{item}}
						</view>
					</view>
					<view class="price">
						<view class="col">
							￥<text class="t1">{{detail.price}}</text>
						</view>
						<view class="buy">
							已购{{detail.buyCount}}
						</view>
					</view>
				</view>
				<text class="block">1</text>
				<template v-if="recomedList.length>0">
					<view class="detailTitle">
						<view class="tt">
							学习内容
						</view>
					</view>
					<view class="giftList">
						<!-- <view class="title">
							<text>0-3岁小孩习惯培养课程大礼包</text>
							<text>价值300元</text>
						</view> -->
						<view class="list">
							<scroll-view class="scroll-view_H" scroll-x="true">
								<view class="item" v-for="item in recomedList" :key="item.id">
									<image :src="imgUrl+item.poster" mode="aspectFill"></image>
									<text>{{item.title}}</text>
								</view>
							</scroll-view>
						</view>
					</view>
					<text class="block">1</text>
				</template>
				<view class="tabs">
					<text :class="{'active':currentLetter=='Details'}" @click="toView('Details')">详情介绍</text>
					<text :class="{'active':currentLetter=='Evaluation'}" @click="toView('Evaluation')">用户评价</text>
				</view>
				<view class="detailBox module" id="Details">
					<rich-text :nodes="detail.intro"></rich-text>
				</view>
				<view class="block">1
				</view>
				<!-- <view class="flCaption">
					<view class="title">现场领取其他福利：</view>
					<view class="detail">
						演示文字：首先，心理压力比较具体和直接，它涉及的问题比较广泛如果你想在装修过程中省心一些，
						那就请你费一些银子吧。省心的办法不是没有，只是看你肯不肯选罢了。找一家声誉好的大型装修公司
						全包。一般来说全包的价格从每平米建筑面积500元至1000元，再贵的也有，这要看你怎么设计，怎么用料。大公司就这样好，他为了保证自己的信誉不受损害，一定会认真地对待每个客户。所以在用料和做工上你完全可以放心。你所做的就是准备好付银子和验收。
					</view>
				</view> -->
				<view class="module" id="Evaluation" style="width:100%;">
					<view class="detailTitle">
						<text></text>
						<view class="">
							用户评价
						</view>
					</view>
					<view class="pjList">
						<comment-item v-for="item in commentList" :key="item.id" :detail="item"></comment-item>
					</view>
				</view>
				<view class="tabbar">
					<view class="item kfa">
						<image src="../../static/icon/kf.png" mode="aspectFit" class="kf"></image>
						<text>客服</text>
					</view>
					<view class="item" @click="doCollected">
						<image src="../../static/icon/Collected.png" mode="aspectFit" class="sc" v-if="detail.isStore"></image>
						<image src="../../static/icon/heart.png" mode="aspectFit" class="sc" v-else></image>
						<text>收藏</text>
					</view>
					<view class="pjBtn" @click="goEval" v-if="type==1">
						我要评价
					</view>
					<view class="btns" @click="goBuy" v-else>
						我要订购
					</view>
				</view>
			</view>
		</scroll-view>
		<uni-popup ref="popup" type="bottom">
			<view class="popGroup">
				<view class="btn1" @click="OpenGroup">
					我要开团
				</view>
				<view class="btn2">
					我要参团(3)
				</view>
			</view>
		</uni-popup>
		<!-- 开团提示 -->
		<uni-popup ref="popup1" type="center">
			<view class="tip">
				<image src="../../static/img/notEnough.png" mode="aspectFill" class="tipImg"></image>
				<view class="desc">
					<text>只有营长及其以上等级才能够开团，去升级成为营长</text>
				</view>
				<view class="operating">
					<view class="item" @click="$refs.popup1.close">
						取消
					</view>
					<view class="item up">
						去升级
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="sharePop" type="bottom">
			<view class="shareBox">
				<view class="item">
					<image src="../../static/img/wx.png" mode="aspectFill"></image>
					<text>发送给朋友</text>
					<button open-type="share" class="shareBtn"></button>
				</view>
				<view class="item" @click="getPoster">
					<image src="../../static/img/poster.png" mode="aspectFill"></image>
					<text>生成海报</text>
				</view>
			</view>
		</uni-popup>
		<view class="ad" v-if="showAd">
			<image src="/static/icon/close.png" mode="aspectFit" class="closeIcon" @click="showAd=false"></image>
			<view class="line">

			</view>
			<view class="imgBox">
				<image src="/static/img/hb.png" mode="aspectFit" class="bgImg"></image>
				<view class="conten">
					<text class="t1">分享返</text>
					<view class="t2">￥<text>6</text></view>
					<text class="t3">下单即返佣金</text>
					<text class="t4">立即分享</text>
				</view>
			</view>
		</view>
		<view class="canvasBox" style="width:0;height:0;overflow: hidden;opacity:0;position:fixed;left:-750px;top:0;">
			<canvas canvas-id='myCanvas' :style="{width:width+'px',height: height+'px'}"></canvas>
		</view>
		<uni-popup ref="poster" type="center" :maskClick="false">
			<view class="posterBox">
				<image :src="tmpImg" mode="aspectFill" class="posterImg"></image>
				<text class="posterTip" @click="saveImageToPhotosAlbum">保存到手机</text>
				<image src="../../static/icon/closeIcon.png" mode="aspectFill" class="closeIcon" @click="closePoser"></image>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import Activity from '@/components/Activity.vue';
	import CommentItem from '@/components/CommentItem.vue';
	export default {
		components: {
			uniPopup,
			Activity,
			CommentItem
		},
		data() {
			return {
				tmpImg: '',
				width: 570,
				height: 820,
				pixelRatio: 2,
				codePath: '/static/tmp/code.jpg', //小程序码
				poserImg: 'https://t8.baidu.com/it/u=3887179165,3572970878&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1596352536&t=2736120db00abcf307212a6d5ddfce18',
				tagList: [],
				detail: {},
				top: 22,
				scrollTop: 0,
				showAd: true,
				toIndex: '',
				letterDetails: [],
				currentLetter: "Details",
				type: 0,
				recomedList: [],
				imgUrl: '',
				commentList: [],
				pageNo: 1,
			};
		},
		onLoad(params) {
			this.imgUrl = this.$baseUrl
			this.top = uni.getMenuButtonBoundingClientRect().top
			this.detail = getApp().globalData.courseData
			this.getCates()
			this.getCommentList()
			this.getStudyContent()//课程包含
			if (params.type) {
				this.type = params.type
			}
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '自定义分享标题',
				path: '/pages/index/index'
			}
		},
		methods: {
			doCollected(){
				let status=this.detail.isStore==0?1:0
				this.$api.post('/api/user/store',{
					type:2,//1活动 2课程
					status,
					tableId:this.detail.id,
					userId:uni.getStorageSync('userInfo').id
				}).then((res)=>{
					this.detail.isStore=status
				})
			},
			getCates() {
				this.$api.get('/api/static/dictList', {
					params: {
						type: 2 //1.活动分类 2.课程分类 3.绘本分类 4 帖子分类 5消费得积分 6消费得经验
					}
				}).then((res) => {
					let pid = ''
					let tagList = []
					res.data.forEach((item) => {
						if (item.id == this.detail.typeId) {
							tagList.push(item.name)
							pid = item.pid
						}
					})
					console.log(tagList)
					res.data.forEach((item) => {
						if (item.id == pid) {
							tagList.push(item.name)
						}
					})
					this.tagList = tagList
				})
			},
			getCommentList() {
				this.$api.get('/api/comment/getList', {
					params: {
						pageNo: this.pageNo,
						pageSize: 5,
						tableId: this.detail.id,
						type: 2
					}
				}).then((res) => {
					if (res.data.length > 0) {
						this.commentList = this.commentList.concat(res.data)
						this.pageNo++
					}
				})
			},
			getStudyContent() {
				this.$api.get('/api/lesson/getBookListByLessonId', {
					params: {
						lessonId: this.detail.id,
						type: 1
					}
				}).then((res) => {
					this.recomedList = res.data
				})
			},
			goEval() {
				uni.navigateTo({
					url: "/pagesA/courseEvaluation/courseEvaluation"
				})
			},
			goBuy() {
				uni.navigateTo({
					url: "/pages/courseBuy/courseBuy"
				})
			},
			toView(val) {
				this.toIndex = val
			},
			scrollHandle(e) {
				let scrollTop = e.detail.scrollTop
				this.scrollTop = scrollTop
				console.log(scrollTop)
				let view = uni.createSelectorQuery().in(this).selectAll(".module");
				view.boundingClientRect(d => {
					let top = d[0].top
					console.log(d)
					d.forEach(item => {
						item.top = item.top - top;
						item.bottom = item.bottom - top;
						this.letterDetails.push({
							id: item.id,
							top: item.top,
							bottom: item.bottom
						});
					});
					this.letterDetails.some(item => {
						if ((scrollTop - 180) >= item.top && (scrollTop - 180) <= item.bottom - 20) {
							this.currentLetter = item.id;
							//当前固定用的是粘性定位，如果不用粘性定位，在这里设置
							return true;
						}
					});
					console.log(this.currentLetter)
				}).exec()
			},
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			showGroupPop() {
				this.$refs.popup.open()
			},
			OpenGroup() {
				this.$refs.popup.close()
				this.$refs.popup1.open()
			},
			viewAll() {
				uni.navigateTo({
					url: "/pages/comment/comment"
				})
			},
			//生成 海报
			closePoser() {
				this.$refs.poster.close()
			},
			getPoster() {
				this.$refs.sharePop.close()
				uni.showLoading({
					title: '海报生成中...',
					mask: true
				});
				let that = this
				let context = wx.createCanvasContext('myCanvas');
				context.width = this.width;
				context.height = this.height;
				let x = context.width / 2;
				wx.getImageInfo({
					src: this.poserImg,
					success: (res) => {
						context.fillStyle = "#FFFFFF";
						context.fillRect(0, 0, this.width, this.height);
						// context.drawImage(this.bgPath, 0, 0, this.width, this.height);
						context.drawImage(res.path, 0, 0, this.width, 530);
						context.setFontSize(28);
						context.setFillStyle('#000000');
						context.setTextAlign('center');
						let text = '杭州小记者内蒙古宁夏夏令营梦幻迪士尼'
						if (text.length > 20) {
							text = text.substr(0, 20) + '...'
						}
						context.fillText(text, this.width / 2, 600);
						let tip = '长按识别，立即参加'
						context.setFontSize(28);
						context.fillText(tip, 320, 760);
						context.save();
						context.restore();
						let yq = '邀您参加'
						context.setFillStyle('#666666');
						context.font = 'normal bold 24px sans-serif';
						context.fillText(yq, 340, 720);
						context.save();
						context.restore();
						let name = '张雨溪'
						context.setFillStyle('#000000');
						context.font = 'normal bold 26px sans-serif';
						context.fillText(name, 340, 690);
						context.save();
						context.restore();
						wx.getImageInfo({
							src: that.codePath,
							success: (res1) => {
								context.drawImage(that.codePath, 33, 650, 132, 132);
								wx.getImageInfo({
									src: this.poserImg,
									success: (avatar) => {
										console.log(avatar)
										var avatarurl_width = 62; //绘制的头像宽度
										var avatarurl_heigth = 62; //绘制的头像高度
										var avatarurl_x = 200; //绘制的头像在画布上的位置
										var avatarurl_y = 660; //绘制的头像在画布上的位置
										context.beginPath(); //开始绘制
										context.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);
										context.clip();
										context.drawImage(avatar.path, 200, 660, 62, 62);
										context.save();
										context.draw();
										setTimeout(() => {
											wx.canvasToTempFilePath({
												canvasId: 'myCanvas',
												x: 0, //指定的画布区域的左上角横坐标	
												y: 0, //指定的画布区域的左上角纵坐标	
												width: this.width, //指定的画布区域的宽度
												height: this.height, //指定的画布区域的高度
												destWidth: this.width, //输出的图片的宽度 
												destHeight: this.height, //输出的图片的高度
												success: (res) => {
													var tempFilePath = res.tempFilePath;
													this.tmpImg = tempFilePath
													console.log(tempFilePath)
													uni.hideLoading();
													this.$refs.poster.open()
												},
												fail: (res) => {
													console.log(res);
													uni.hideLoading();
												}
											});
										}, 300);
									}
								})

							}
						})
					}
				})
			},
			saveImageToPhotosAlbum() {
				var that = this
				var value = that.tmpImg; // 你的图片路径
				if (value != undefined && value != "") {
					wx.saveImageToPhotosAlbum({
						filePath: value,
						success: (res) => {
							// that.hideModal();
							// that.hideMoments();
							wx.showToast({
								title: "已保存到相册",
								icon: 'none',
								duration: 1500,
								mask: true
							})
						},
						fail: function(res) {
							console.error(res)
							//首次保存会询问你是否授权，选是就好了
							// if (res.errMsg == "saveImageToPhotosAlbum:fail auth deny") {
							console.error("打开设置窗口");
							wx.openSetting({
								success(settingdata) {
									console.error(settingdata)
									if (settingdata.authSetting["scope.writePhotosAlbum"]) {
										console.error("获取权限成功，再次点击图片保存到相册")
									} else {
										console.error("获取权限失败")
									}
								}
							})
							// }
						}
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
