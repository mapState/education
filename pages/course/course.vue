<template>
	<view class="main">
		<view class="header" :style="{paddingTop:top+'px',height:height+'px'}">
			<view class="input" @click="goSearch">
				<image src="../../static/icon/ss.png" mode="aspectFit" class="icon"></image>
				<text>搜索课程</text>
			</view>
		</view>
		<view class="swiper-box">
			<view class="swiperBox">
				<swiper class="swiper" :autoplay="true" :interval="2000" :duration="500" :circular="true" @change="swiperChange">
					<swiper-item v-for="item in 3" :key="item">
						<image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593333346662&di=d4cceef20cedcd44a9c1105a107a1803&imgtype=0&src=http%3A%2F%2Ft8.baidu.com%2Fit%2Fu%3D1484500186%2C1503043093%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1280%26h%3D853"
						 mode="aspectFill" class="itemImg"></image>
					</swiper-item>
				</swiper>
				<view class="dots">
					<view class="dot" v-for="item in 3" :key="item" :class="{'dotActive':item==currentIndex}">
					</view>
				</view>
			</view>
		</view>
		<view class="scroll-view">
			<scroll-view class="scroll-view_H" scroll-x="true" >
				<view class="list">
					<text class="active" @click="goCourseList">0-3岁</text>
					<text>0-3岁</text>
					<text>4-6岁</text>
					<text>6-7岁</text>
					<text>8-9岁</text>
					<text>9-11岁</text>
				</view>
			</scroll-view>
		</view>
		<view class="cates">
			<view class="cate">
				<image src="../../static/icon/xg.png" mode="aspectFit" class="icon1"></image>
				<text>行为习惯</text>
			</view>
			<view class="cate">
				<image src="../../static/icon/qx.png" mode="aspectFit" class="icon2"></image>
				<text>情绪心理</text>
			</view>
			<view class="cate">
				<image src="../../static/icon/zl.png" mode="aspectFit" class="icon3"></image>
				<text>智力开发</text>
			</view>
			<view class="cate">
				<image src="../../static/icon/jw.png" mode="aspectFit" class="icon4"></image>
				<text>社会交往</text>
			</view>
		</view>
		<view class="block">
			
		</view>
		<view class="h2">
			推荐主题
		</view>
		<view class="titleBox">
			<view class="left">
				<text></text>
				<view class="">
					行为习惯
				</view>
			</view>
			<view class="more">
				<text>更多</text>
				<image src="../../static/icon/right2.png" mode="aspectFit"></image>
			</view>
		</view>
		<view class="list">
			<course-item v-for="item in 2" :key="item"></course-item>
		</view>
	<tab-bar :tabIndex="2"></tab-bar>
	</view>
</template>

<script>
	import TabBar from '@/components/TabBar.vue';
	import CourseItem from '@/components/CourseItem.vue';
	export default {
		components:{
			TabBar,
			CourseItem
		},
		data() {
			return {
				top: 24,
				currentIndex: 0,
				height:32
			};
		},
		onLoad() {
			this.top = uni.getMenuButtonBoundingClientRect().top
			this.height=uni.getMenuButtonBoundingClientRect().height
			console.log(this.height)
			this.getAdvertList()
		},
		methods: {
			//轮播
			getAdvertList() {
				this.$api.get('/api/static/advertList', {
					params: {
						type: 3
					}
				}).then((res) => {
					//this.swiperList=res.data
					console.log(res.data)
				})
			},
			swiperChange(e) {
				this.currentIndex = e.detail.current
			},
			goSearch(){
				uni.navigateTo({
					url:"/pages/searchCourses/searchCourses"
				})
			},
			goCourseList(){
				uni.navigateTo({
					url:"/pages/courseList/courseList"
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
