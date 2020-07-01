<template>
	<view class="main">
		<scroll-view class="scroll-view" scroll-y scroll-with-animation="true" :scroll-into-view="toIndex" @scroll="scrollHandle">
			<view class="main">
				<view class="nav" :style="{top:top+'px'}" @click="goBack">
					<image src="../../static/icon/bk.png" mode="aspectFill"></image>
				</view>
				<view class="header " :style="{paddingTop:top+'px'}" v-if="scrollTop>=660">
					<text class="hd" :class="{'active':currentLetter=='Details'}" @click="toView('Details')">详情介绍</text>
					<text class="" :class="{'active':currentLetter=='Evaluation'}" @click="toView('Evaluation')">用户评价</text>
				</view>
				<swiper class="swiper" :autoplay="true" :interval="2000" :duration="500" :circular="true" :indicator-dots="true"
				 indicator-color="#fff" indicator-active-color="#FDD30F">
					<swiper-item v-for="item in 3" :key="item">
						<image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593333346662&di=d4cceef20cedcd44a9c1105a107a1803&imgtype=0&src=http%3A%2F%2Ft8.baidu.com%2Fit%2Fu%3D1484500186%2C1503043093%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1280%26h%3D853"
						 mode="aspectFill" class="itemImg"></image>
					</swiper-item>
				</swiper>
				<view class="titleBox">
					<view class="title">
						<text>0-3岁小孩习惯培养课程大礼包...</text>
						<view class="icons" @click="$refs.sharePop.open">
							<image src="../../static/icon/share.png" mode="aspectFit"></image>
							<text>赚佣金</text>
						</view>
					</view>
					<view class="tags">
						<view class="tag">
							0-3岁
						</view>
						<view class="tag">
							行为习惯
						</view>
					</view>
					<view class="price">
						<view class="col">
							￥<text class="t1">119</text>
						</view>
						<view class="buy">
							已购102458
						</view>
					</view>
				</view>
				<text class="block">1</text>
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
							<view class="item" v-for="item in 5" :key="item">
								<image src="../../static/1.jpg" mode="aspectFill"></image>
								<text>我要做个乖宝宝</text>
							</view>
						</scroll-view>
					</view>
				</view>
				<text class="block">1</text>
				<view class="tabs" :style="{top:top+'px'}">
					<text class="active">详情介绍</text>
					<text @click="toView('Evaluation')">用户评价</text>
				</view>
				<view class="detailBox module" id="Details">
					<image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593333346662&di=d4cceef20cedcd44a9c1105a107a1803&imgtype=0&src=http%3A%2F%2Ft8.baidu.com%2Fit%2Fu%3D1484500186%2C1503043093%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1280%26h%3D853"
					 mode="aspectFill"></image>
					<image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593333346662&di=d4cceef20cedcd44a9c1105a107a1803&imgtype=0&src=http%3A%2F%2Ft8.baidu.com%2Fit%2Fu%3D1484500186%2C1503043093%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1280%26h%3D853"
					 mode="aspectFill" class=""></image>
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
				<view class="detailTitle module" id="Evaluation">
					<text></text>
					<view class="">
						用户评价
					</view>
				</view>
				<view class="pjList">
					<comment-item v-for="item in 3" :key="item"></comment-item>
				</view>
				<view class="tabbar">
					<view class="item kfa">
						<image src="../../static/icon/kf.png" mode="aspectFit" class="kf"></image>
						<text>客服</text>
					</view>
					<view class="item">
						<image src="../../static/icon/Collected.png" mode="aspectFit" class="sc"></image>
						<text>收藏</text>
					</view>
					<view class="btns" @click="goBuy">
						我要订购
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
				top: 22,
				scrollTop: 0,
				showAd: true,
				toIndex: '',
				letterDetails: [],
				currentLetter:"Details"
			};
		},
		onLoad() {
			this.top = uni.getMenuButtonBoundingClientRect().top
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
			goBuy(){
				uni.navigateTo({
					url:"/pages/courseBuy/courseBuy"
				})
			},
			toView(val){
				this.toIndex=val
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
						if ((scrollTop-700)>= item.top && (scrollTop-700) <= item.bottom) {
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
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
