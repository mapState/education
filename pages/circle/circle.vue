<template>
	<view class="main">
		<view class="nav" :style="{paddingTop:top+'px'}">
			<view class="tag tagActive">
				热门
			</view>
			<view class="tag">
				精选
			</view>
			<view class="tag">
				最新
			</view>
			<view class="tag">
				官方
			</view>
		</view>
		<view class="yellow">

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
		<view class="scroll-view" :style="{top:(top+32)+'px'}">
			<scroll-view class="scroll-view_H" scroll-x="true">
				<view class="list">
					<text class="active" @click="goCourseList">全部</text>
					<text>成长</text>
					<text>家庭</text>
					<text>育儿</text>
					<text>宝妈</text>
					<text>生活</text>
					<text>学习</text>
					<text>篮球</text>
				</view>
			</scroll-view>
		</view>
		<circle-item v-for="item in 2" :key="item"></circle-item>
		<TabBar :tabIndex="3"></TabBar>
	</view>
</template>

<script>
	import TabBar from '@/components/TabBar.vue';
	import circleItem from '@/components/circleItem.vue'
	export default {
		components: {
			TabBar,
			circleItem
		},
		data() {
			return {
				top: 24,
				currentIndex: 0,
			};
		},
		onLoad() {
			this.top = uni.getMenuButtonBoundingClientRect().top
		},
		methods: {
			swiperChange(e) {
				this.currentIndex = e.detail.current
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
