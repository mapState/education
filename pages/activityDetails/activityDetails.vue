<template>
	<view class="main">
		<view class="nav" :style="{top:top+'px'}" @click="goBack">
			<image src="../../static/icon/bk.png" mode="aspectFill"></image>
		</view>
		<view class="header " :style="{paddingTop:top+'px'}" v-if="scrollTop>=200">
			<text class="hd" :class="{'active':currentLetter=='Details'}" @click="toView('Details')">活动详情</text>
			<text class="give" :class="{'active':currentLetter=='Give'}" @click="toView('Give')">赠送福利</text>
			<text class="" :class="{'active':currentLetter=='Evaluation'}" @click="toView('Evaluation')">往期评价</text>
		</view>
		<scroll-view class="scroll-view" scroll-y scroll-with-animation="true" :scroll-into-view="toIndex" @scroll="scrollHandle">
			<view class="main">
				<view class="ss">
					<image :src="imgUrl+detailData.poster" mode="aspectFill" class="ssImge"></image>
					<!-- <view class="income">
						<text>累计佣金收益:￥1234</text>
						<view class="down">
							下载名单
						</view>
					</view> -->
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
						<text>{{detailData.title}}</text>
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
							￥<text class="t1">{{detailData.personalPrice/100}}</text><text class="t2">单人价</text>
						</view>
						<view class="col ct">
							￥<text class="t1">{{detailData.groupPrice/100}}</text><text class="t2">参团价</text>
						</view>
						<view class="col">
							<image src="../../static/icon/eye.png" mode="aspectFit" class="eye"></image>
							<text class="t2">{{detailData.fake}}</text>
						</view>
						<view class="col">
							<image src="../../static/icon/peo.png" mode="aspectFit" class="uesr"></image>
							<text class="t2">{{detailData.groupNumber}}</text>
						</view>
					</view>
				</view>
				<view class="block">
					<text style="opacity: 0;">1</text>
				</view>
				<view class="section">
					<view class="local">
						<view class="item">
							<text class="t1">活动地点</text>
							<text class="t2">{{detailData.address}}</text>
							<image src="../../static/icon/pdw.png" mode="aspectFit" class="dw"></image>
						</view>
						<view class="item">
							<text class="t1">主办方</text>
							<text class="t2">{{detailData.organizer}}</text>
							<image src="../../static/icon/tel.png" mode="aspectFit" class="tel" @click="getPhone"></image>
						</view>
					</view>
					<view class="time1">
						<view class="left">
							<text class="t1">活动时间</text>
							<text class="t2">{{detailData.startDate |changeTime}} 至 {{detailData.endDate|changeTime}}</text>
						</view>
						<text class="t3">共{{totalDays}}天</text>
					</view>
					<view class="time1">
						<view class="left">
							<text class="t1">报名时间</text>
							<text class="t2">{{detailData.signStartDate |changeTime}} 至 {{detailData.signEndDate |changeTime}}</text>
						</view>
						<text class="t3">剩余{{laveDays}}天</text>
					</view>
					<view class="time1">
						<view class="left">
							<text class="t1">剩余名额</text>
							<view class="over">{{detailData.groupNumber-detailData.joinCount}}<text>/{{detailData.groupNumber}}</text></view>
						</view>
						<text class="t3">已报名{{detailData.joinCount}}</text>
					</view>
				</view>
				<view class="block">
					<text style="opacity: 0;">1</text>
				</view>
				<view class="tabs" :style="{top:top+'px'}">
					<text :class="{'active':currentLetter=='Details'}" @click="toView('Details')">活动详情</text>
					<text :class="{'active':currentLetter=='Give'}" @click="toView('Give')">赠送福利</text>
					<text :class="{'active':currentLetter=='Evaluation'}" @click="toView('Evaluation')">往期评价</text>
				</view>
				<view class="detailBox module" id="Details">
					<rich-text :nodes="detailData.activityInfo"></rich-text>
				</view>
				<view class="main module" id="Give">
					<view class="detailTitle">
						<text></text>
						<view>
							赠送福利
						</view>
					</view>
					<view class="giftList">
						<view class="title">
							<text>赠送绘本课程</text>
							<text>价值300元</text>
						</view>
						<view class="list">
							<scroll-view class="scroll-view_H" scroll-x="true">
								<view class="item" v-for="item in giveList" :key="item.id">
									<image :src="imgUrl+item.poster" mode="aspectFill"></image>
									<text>{{item.title}}</text>
								</view>
							</scroll-view>
						</view>
					</view>
					<view class="block">

					</view>
					<view class="flCaption">
						<view class="title">现场领取其他福利：</view>
						<view class="detail">
							{{detailData.welfare}}
						</view>
					</view>
				</view>
				<view class="main module" id="Evaluation">
					<view class="detailTitle">
						<text></text>
						<view class="">
							往期评价
						</view>
					</view>
					<view class="commentBox">
						<block v-for="it in oldEve" :key="it.id">
							<Activity :detail="it"></Activity>
							<view class="plBox">
								<view class="top">
									<text>评论</text>
									<view class="" @click="viewAll(it)">
										<text>查看全部</text>
										<image src="/static/icon/right.png" mode="aspectFit"></image>
									</view>
								</view>
								<view class="plItem" v-for="item in it.commentList" :key="item">
									<text>JONCS</text>
									<view class="desc">
										这样带娃简直是“作死”，婆婆妈妈们经常这样做，你家娃
										中招了吗？
									</view>
								</view>
							</view>
						</block>
					</view>
				</view>
				<view class="ks3" v-if="detailData.state==3&&buyStatus==0">
					<view class="item kfa">
						<image src="../../static/icon/kf.png" mode="aspectFit" class="kf"></image>
						<text>客服</text>
					</view>
					<view class="item" @click="doCollect">
						<image src="../../static/icon/Collected.png" mode="aspectFit" class="sc" v-if="detailData.isStore"></image>
						<image src="../../static/icon/hx-sc.png" mode="aspectFit" class="sc" v-else></image>
						<text>收藏</text>
					</view>
				</view>

				<view class="tabbar" v-if="detailData.state==2&&buyStatus==0">
					<view class="item kfa">
						<image src="../../static/icon/kf.png" mode="aspectFit" class="kf"></image>
						<text>客服</text>
					</view>
					<view class="item" @click="doCollect">
						<image src="../../static/icon/Collected.png" mode="aspectFit" class="sc" v-if="detailData.isStore"></image>
						<image src="../../static/icon/hx-sc.png" mode="aspectFit" class="sc" v-else></image>
						<text>收藏</text>
					</view>
					<view class="btns">
						<view class="buy" @click="aloneBuy">
							单独购买
						</view>
						<view class="group" @click="showGroupPop">
							拼团购买

						</view>
					</view>
				</view>
				<view class="tabbar" v-if="buyStatus!=0">
					<view class="item kfa">
						<image src="../../static/icon/kf.png" mode="aspectFit" class="kf"></image>
						<text>客服</text>
					</view>
					<view class="item" @click="doCollect">
						<image src="../../static/icon/Collected.png" mode="aspectFit" class="sc" v-if="detailData.isStore"></image>
						<image src="../../static/icon/hx-sc.png" mode="aspectFit" class="sc" v-else></image>
						<text>收藏</text>
					</view>
					<view class="btns" v-if="detailData.state==3">
						<view class="buy" @click="downFile">
							下载附件
						</view>
						<view class="group" @click="$refs.showMyGroup.open()">
							我的团
						</view>
					</view>
					<view class="btns" v-if="detailData.state==4">
						<view class="buy" @click="downFile">
							下载附件
						</view>
						<view class="group" @click="goCommet">
							我要评论
						</view>
					</view>
					<view class="bmBtn" v-if="detailData.state==2">
						<view class="btn1" @click="tk">
							{{detailData.buyStatus==1?'申请退款':'退款中'}}
						</view>
						<view class="btn2" @click="downFile">
							下载附件
						</view>
						<view class="btn3" @click="$refs.showMyGroup.open()">
							我的团
						</view>
					</view>
				</view>
				<view class="tabbar" v-if="detailData.state==1&&buyStatus==0">
					<view class="item kfa">
						<image src="../../static/icon/kf.png" mode="aspectFit" class="kf"></image>
						<text>客服</text>
					</view>
					<view class="item" @click="doCollect">
						<image src="../../static/icon/Collected.png" mode="aspectFit" class="sc" v-if="detailData.isStore"></image>
						<image src="../../static/icon/hx-sc.png" mode="aspectFit" class="sc" v-else></image>
						<text>收藏</text>
					</view>
					<view class="wksBtn">
						报名未开始
					</view>
				</view>
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
			</view>
		</scroll-view>
		<uni-popup ref="popup" type="bottom">
			<view class="popGroup">
				<view class="btn1" @click="OpenGroup">
					我要开团
				</view>
				<view class="btn2" @click="goInfo">
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
		<uni-popup ref="showMyGroup" type="bottom">
			<view class="grouplist">
				<view class="title">
					拼团列表
				</view>
				<view class="list">
					<view class="item" v-for="item in teamData.memberList" :key="item">
						<image :src="item.avatar" mode="aspectFill"></image>
						<text>{{item.name}}</text>
					</view>
					<view class="wz">
						<image src="../../static/icon/wz.png" mode="aspectFill"></image>
						<text>空位</text>
					</view>
					<view class="btn">
						邀请
					</view>
				</view>
			</view>
		</uni-popup>
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
	export default {
		components: {
			uniPopup,
			Activity
		},
		data() {
			return {
				imgUrl: '',
				tmpImg: '',
				width: 570,
				height: 820,
				pixelRatio: 2,
				codePath: '/static/tmp/code.jpg', //小程序码
				poserImg: 'https://t8.baidu.com/it/u=3887179165,3572970878&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1596352536&t=2736120db00abcf307212a6d5ddfce18',
				totalDays: '', //总天数
				laveDays: '', //剩余天数
				detailData: {},
				top: 22,
				scrollTop: 0,
				showAd: true,
				toIndex: '',
				letterDetails: [],
				currentLetter: "Details",
				type: 0, //我的报名  (1未开始2报名中 3进行中 4已结束)
				showFixed: true,
				status: 0, //1报名中 2未开始 3进行中 4已结束
				//classList:[],
				tagList: [],
				giveList: [], //赠送福利
				oldEve: [],
				buyStatus: 0,
			};
		},
		filters: {
			changeTime(val) {
				if (val) {
					return val.substr(0, 10)
				}
				return ''
			}
		},
		onLoad(params) {
			this.imgUrl = this.$baseUrl
			this.top = uni.getMenuButtonBoundingClientRect().top
			this.detailData = getApp().globalData.activeData
			this.buyStatus=this.detailData.isBuy
			//this.buyStatus=params.buyStatus?1:0
			this.getLaveTime()
			this.getCates()
			this.getGiveCourse() //赠送的课程
			this.getOldEve() //往期评价
			this.getTeamList()
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
			getTeamList(){
				this.$api.get('/api/team/myTeam',{
					params:{
						actId:this.detailData.id
					}
				}).then((res)=>{
					this.teamData=res.data
				})
			},
			//退款
			tk(){
				if(this.buyStatus==2){
					uni.showToast({
						title:"退款中",
						icon:'none'
					})
					return
				}
				this.$api.post('/api/order/refund',{
					id:this.detailData.orderId
				}).then((res)=>{
					this.detailData.buyStatus=2
					uni.showToast({
						title:res.message,
						icon:'none'
					})
				})
			},
			//1开团 2单独购买 3参团
			//单独购买
			aloneBuy() {
				uni.navigateTo({
					url: "/pages/joinDetail/joinDetail?type=2"
				})
			},
			getPhone() {
				if (this.detailData.organizerPhone) {
					uni.makePhoneCall({
						phoneNumber: this.detailData.organizerPhone
					});
				}
			},
			downFile() {
				if (this.detailData.filepath) {
					uni.downloadFile({
						url: this.imgUrl + this.detailData.filepath,
						success: (res) => {
							if (res.statusCode === 200) {
								uni.showToast({
									title: "下载成功"
								})
							}
						}
					});
				} else {
					uni.showToast({
						title: "附件地址不存在",
						icon: 'none'
					})
					return
				}
			},
			doCollect() {
				let status = this.detailData.isStore == 1 ? 0 : 1
				this.collected(status)
			},
			//收藏
			collected(status) {
				this.$api.post('/api/user/store', {
					type: 1, //1活动 2课程
					status,
					tableId: this.detailData.id,
					userId: uni.getStorageSync('userInfo').id
				}).then((res) => {
					this.detailData.isStore = status
				})
			},
			getOldEve() {
				this.$api.get('/api/act/getCommentActivityId', {
					params: {
						activityId: this.detailData.id
					}
				}).then((res) => {
					this.oldEve = res.data
				})
			},
			getGiveCourse() {
				this.$api.get('/api/act/getLessonByActivityId', {
					params: {
						activityId: this.detailData.id
					}
				}).then((res) => {
					if (res.data.length > 0) {
						this.giveList = res.data
					}
				})
			},
			//获取分类列表
			getCates() {
				this.$api.get('/api/static/dictList', {
					params: {
						type: 1 //1.活动分类 2.课程分类 3.绘本分类 4 帖子分类 5消费得积分 6消费得经验
					}
				}).then((res) => {
					//this.swiperList=res.data
					console.log(res.data)
					//this.classList=res.data
					let pid = ''
					let tagList = []
					res.data.forEach((item) => {
						if (item.id == this.detailData.typeId) {
							tagList.push(item.name)
							pid = item.pid
						}
					})
					console.log(tagList)
					res.data.forEach((item) => {
						if (item.id == pid) {
							tagList.push(item.name)
							this.tagList = tagList
						}
					})
				})
			},
			getLaveTime() {
				let t1 = this.detailData.startDate.replace(new RegExp("-", "gm"), "/").substr(0, 10);
				let t2 = this.detailData.endDate.replace(new RegExp("-", "gm"), "/").substr(0, 10);
				t1 = new Date(t1).getTime()
				t2 = new Date(t2).getTime()
				this.totalDays = this.geta(t1, t2)
				let nowData = new Date().getTime()
				let endData = this.detailData.signEndDate.replace(new RegExp("-", "gm"), "/").substr(0, 10);
				endData = new Date(endData).getTime()
				this.laveDays = this.geta(nowData, endData)
			},
			//获取时间差
			geta(date1, date2) { //date2结束时间
				var date3 = date2 - date1 //时间差的毫秒数
				//计算出相差天数
				var days = Math.floor(date3 / (24 * 3600 * 1000))
				return days + 1
			},
			goInfo() {
				uni.navigateTo({
					url: "/pages/togetherInfo/togetherInfo?actId=" + this.detailData.id
				})
			},
			goCommet() {
				uni.navigateTo({
					url: "/pagesA/courseEvaluation/courseEvaluation?type=1"
				})
			},
			toView(val) {
				this.toIndex = val
				this.currentLetter = val
			},
			scrollHandle(e) {
				let scrollTop = e.detail.scrollTop
				this.scrollTop = scrollTop
				//console.log(scrollTop)
				let view = uni.createSelectorQuery().in(this).selectAll(".module");
				view.boundingClientRect(d => {
					let top = d[0].top
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
						if ((scrollTop - 180) >= item.top && (scrollTop - 180) <= (item.bottom - 20)) {
							this.currentLetter = item.id;
							//console.log(this.currentLetter)
							//当前固定用的是粘性定位，如果不用粘性定位，在这里设置
							return true;
						}
					});
					//console.log(this.currentLetter)
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
				//this.kTeam()
				this.$api.get('/api/user/getUserInfo').then((res) => {
					this.$refs.popup.close()
					if (res.data.level >= 3) {
						//开团 填写信息 type 1开团 2单独购买 3参团
						uni.navigateTo({
							url: "/pages/joinDetail/joinDetail?type=1"
						})
					} else {
						this.$refs.popup1.open()
					}
				})
			},
			viewAll(data) {
				getApp().globalData.oldActiveData = data
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
										context.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width /
											2, 0, Math.PI * 2, false);
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
