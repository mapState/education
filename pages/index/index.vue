<template>
	<view class="main">
		<view class="header" :style="{paddingTop:top+'px'}">
			<view class="position" @click="goPosition">
				<image src="/static/icon/dw.png" mode="aspectFit" class="dwIcon"></image>
				<text>杭州市江干区</text>
			</view>
			<view class="search" @click="goSearch">
				<image src="/static/icon/ssl.png" mode="aspectFill" class="sslIcon"></image>
				<view class="searchMain">
					<image src="/static/icon/ss.png" mode="aspectFill" class="ssIcon"></image>
					<text>搜索活动</text>
				</view>
				<image src="/static/icon/message.png" mode="aspectFill" class="messageIcon"></image>
			</view>
		</view>
		<view class="content">
			<view class="swiperBox">
				<swiper class="swiper"  :autoplay="true" :interval="2000" :duration="500" :circular="true" @change="swiperChange">
					<swiper-item v-for="item in 3" :key="item">
						<image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593333346662&di=d4cceef20cedcd44a9c1105a107a1803&imgtype=0&src=http%3A%2F%2Ft8.baidu.com%2Fit%2Fu%3D1484500186%2C1503043093%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1280%26h%3D853" mode="aspectFill" class="itemImg"></image>
					</swiper-item>
				</swiper>
				<view class="dots">
					<view class="dot" v-for="item in 3" :key="item" :class="{'dotActive':item==currentIndex}">
						
					</view>
				</view>
			</view>
			<view class="category" @click="goEventsList">
				<view class="cate">
					<image src="../../static/icon/cate1.png" mode="aspectFill" class="icon1"></image>
					<text>儿童</text>
				</view>
				<view class="cate">
					<image src="../../static/icon/cate2.png" mode="aspectFill" class="icon2"></image>
					<text>成人</text>
				</view>
				<view class="cate">
					<image src="../../static/icon/cate3.png" mode="aspectFill" class="icon3"></image>
					<text>周边</text>
				</view>
				<view class="cate">
					<image src="../../static/icon/cate4.png" mode="aspectFill" class="icon4"></image>
					<text>国内</text>
				</view>
				<view class="cate">
					<image src="../../static/icon/cate5.png" mode="aspectFill" class="icon5"></image>
					<text>国际</text>
				</view>
			</view>
			<view class="block">
			</view>
			<view class="titles">
				<view class="hot" :class="{'titleActive':titleIndex==0}" @click="changeTitle(0)">热门活动</view>
				<view :class="{'titleActive':titleIndex==1}" @click="changeTitle(1)">最新活动</view>
			</view>
			<view class="list" @click="goDetail">
				<block v-for="(item,index) in 4" :key="index">
					<Activity :type="index"></Activity>
				</block>
			</view>
		</view>
		<view class="loginTip">
			<view class="left">
				<image src="/static/icon/tioIcon.png" mode="aspectFill" class="leftIcon"></image>
				<text>您当前未登入，请登入</text>
			</view>
			<view class="btn">
				去登入
			</view>
		</view>
		<tab-bar :tabIndex="1"></tab-bar>
	</view>
</template>

<script>
	import Activity from '@/components/Activity.vue';
	import TabBar from '@/components/TabBar.vue'
	export default {
		components:{
			Activity,
			TabBar
		},
		data() {
			return {
				top: 30,
				currentIndex:0,
				titleIndex:0
			}
		},
		onLoad() {
			this.top = uni.getMenuButtonBoundingClientRect().top
			console.log(this.top)
		},
		methods: {
			swiperChange(e){
				this.currentIndex=e.detail.current
			},
			changeTitle(index){
				if(index==this.titleIndex){
					return
				}
				this.titleIndex=index
			},
			goPosition(){
				uni.navigateTo({
					url:"/pages/position/position"
				})
			},
			goSearch(){
				uni.navigateTo({
					url:"/pages/search/search"
				})
			},
			goEventsList(){
				uni.navigateTo({
					url:"/pages/eventsList/eventsList"
				})
			},
			goDetail(){
				console.log(1)
				uni.navigateTo({
					url:"/pages/activityDetails/activityDetails"
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
