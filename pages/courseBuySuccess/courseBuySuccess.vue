<template>
	<view class="main">
		<image src="../../static/img/success.png" mode="aspectFit" class="okIcon"></image>
		<text class="tip">订购成功</text>
		<view class="btns">
			<view class="btn left">
				分享课程
			</view>
			<view class="btn">
				查看课程
			</view>
		</view>
		<view class="block">
			
		</view>
		<view class="tabs">
			<view class="" :class="{'active':tabIndex==0}"  @click="changeTabIndex(0)">
				推荐课程
			</view>
			<view class="" :class="{'active':tabIndex==1}" @click="changeTabIndex(1)">
				推荐书籍
			</view>
		</view>
		<view class="courseList" v-if="tabIndex==0">
			<CourseItem v-for="item in 2" :key="item"></CourseItem>
		</view>
		<view class="bookList" v-if="tabIndex==1">
			<view class="item" v-for="item in 8" :key="item">
				<image src="../../static/1.jpg" mode="aspectFill"></image>
				<text>我要做个...</text>
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
				tabIndex:0
			}
		},
		methods: {
			changeTabIndex(index){
				this.tabIndex=index
			}
		}
	}
</script>

<style lang="scss">
@import './index.scss'
</style>
