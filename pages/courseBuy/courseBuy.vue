<template>
	<view class="main">
		<view class="detailTitle">
			<text></text>
			<view class="">
				订购课程
			</view>
		</view>
		<view class="courseList">
			<course-item></course-item>
		</view>
		<text class="block"></text>
		<view class="detailTitle">
			<text></text>
			<view class="">
				学习内容
			</view>
		</view>
		<view class="giftList">
			<view class="list">
				<scroll-view class="scroll-view_H" scroll-x="true">
					<view class="item" v-for="item in 5" :key="item">
						<image src="../../static/1.jpg" mode="aspectFill"></image>
						<text>我要做个乖宝宝</text>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="detailTitle noBoder">
			<text></text>
			<view class="">
				学习有效期
			</view>
			<view class="other">
				60天
			</view>
		</view>
		<view class="tip">
			时间过期后需要重新订购
		</view>
		<view class="fixedBox">
			<view class="left">
				支付：<text>120元</text>
			</view>
			<view class="btn" @click="goSuccess">
				订购支付
			</view>
		</view>
	</view>
</template>

<script>
	import CourseItem from '@/components/CourseItem.vue';
	export default {
		components:{
			CourseItem
		},
		data() {
			return {
				
			}
		},
		methods: {
			goSuccess(){
				uni.navigateTo({
					url:"/pages/courseBuySuccess/courseBuySuccess"
				})
			}
		}
	}
</script>

<style lang="scss">
@import './index.scss'
</style>
