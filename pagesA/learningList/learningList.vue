<template>
	<view class="main">
		<view class="nav" :style="{top:top+'px'}">
			<image src="../../static/icon/bk.png" mode="aspectFit" class="backIcon" @click="goBack"></image>
		</view>
		<image src="https://hbimg.huabanimg.com/d6409a671c5a548c96618526d7e9b20070462599c7009-jnmS8U_fw658/format/webp" mode="aspectFill" class="topImg"></image>
		<view class="headerTitle">
			<view class="title">
				<text class="text">0-3岁小孩习惯培养课程大礼包...</text>
				<view class="share">
					<image src="../../static/icon/share.png" mode="aspectFit" class="shareIcon"></image>
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
			<view class="date">
				<view class="left">
					<text></text>
					<view class="">
						到期时间
					</view>
				</view>
				<text class="time">2020-06-04 20:30</text>
			</view>
		</view>
		<view class="block">
			
		</view>
		<view class="bookListTitle">
			学习内容
		</view>
		<view class="bookList" @click="goDetail">
			<view class="item" v-for="item in 8" :key="item">
				<image src="../../static/1.jpg" mode="aspectFill"></image>
				<text>我要做个...</text>
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
		<view class="fixedBottom">
			<view class="pjBtn">
				我要评价
			</view>
			<view class="buyBtn">
				我要订购
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				top:24,
				showAd:true
			};
		},
		onLoad() {
			this.top=uni.getMenuButtonBoundingClientRect().top
		},
		methods:{
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			goDetail(){
				uni.navigateTo({
					url:"/pagesA/studyDetails/studyDetails"
				})
			}
		}
	}
</script>

<style lang="scss">
@import './index.scss'
</style>
