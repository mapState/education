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
				<view class="item">
					<image src="../../static/img/poster.png" mode="aspectFill"></image>
					<text>生成海报</text>
				</view>
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
				
			};
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
			}
		}
	}
</script>

<style lang="scss">
@import './index.scss'
</style>
