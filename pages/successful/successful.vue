<template>
	<view class="main">
		<image src="../../static/img/success.png" mode="aspectFill" class="okIcon"></image>
		<text class="tip">报名成功</text>
		<view class="btns">
			<view class="btn" @click="showShare">
				赚佣金
			</view>
			<view class="btn">
				查看报名
			</view>
		</view>
		<image src="../../static/1.jpg" mode="aspectFill" class="codeImg"></image>
		<text class="codeTip">长按扫码，免费领取资料</text>
		<image src="https://hbimg.huabanimg.com/04f8b2ddb434f859f3f69d8abd61082374db742f24dbb-jmBN3q_fw658/format/webp" mode="aspectFill" class="ad"></image>
		
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
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				imgUrl:'',
				tmpImg: '',
				width: 570,
				height: 820,
				pixelRatio: 2,
				codePath: '/static/tmp/code.jpg', //小程序码
				poserImg: 'https://t8.baidu.com/it/u=3887179165,3572970878&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1596352536&t=2736120db00abcf307212a6d5ddfce18',
			};
		},
		onLoad() {
			
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
		methods:{
			showShare(){
				this.$refs.sharePop.open()
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
