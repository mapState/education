<template>
	<view class="main">
		<view class="search">
			<input class="input" placeholder="搜索活动" placeholder-class="plClass" @focus="focus=true" @blur="focus=false"/>
			<image src="../../static/icon/ss.png" mode="aspectFill" class="ssIcon" :class="{'focusClass':focus}"></image>
		</view>
		<view class="title">
			<text class="t1">搜索历史</text>
			<view class="del">
				<image src="../../static/icon/del.png" mode="aspectFill" class="delIcon"></image>
				<text>全部清除</text>
			</view>
		</view>
		<view class="history">
			<view class="item" v-for="item in 6" :key="item">
				夏令营
			</view>
		</view>
		<view class="title">
			<text class="t1">搜索结果</text>
		</view>
		<view class="result">
			<block v-for="item in 2" :key="item">
				<Activity :type="item"></Activity>
			</block>
		</view>
	</view>
</template>

<script>
	import Activity from '@/components/Activity.vue'
	export default {
		components:{
			Activity
		},
		data() {
			return {
				focus:false
			}
		},
		methods: {
		
		}
	}
</script>

<style lang="scss">
@import  './index.scss'
</style>
