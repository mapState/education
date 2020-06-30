<template>
	<view class="main">
		<view class="activityBox">
			<Activity></Activity>
		</view>
		<view class="block">
			
		</view>
		<view class="titleBox">
			<text></text>
			<view class="">
				全部评价
			</view>
		</view>
		<view class="plItem" v-for="item in 3" :key="item">
			<view class="info">
				<view class="left">
					<image src="/static/1.jpg" mode="aspectFit" class="avatar"></image>
					<view class="desc">
						<view class="row">
							<text class="name">name</text>
							<image src="/static/icon/vip.png" mode="aspectFit" class="vipIcon"></image>
							<text class="hy">会员</text>
						</view>
						<text class="time">2019-04-12 09:20</text>
					</view>
				</view>
				<view class="right">
					<image src="/static/icon/heart.png" mode="aspectFit" class="heartIcon"></image>
					<text>44</text>
				</view>
			</view>
			<view class="detail">
				这样带娃简直是“作死”，婆婆妈妈们经常这样做，
				你家娃中招了吗？
			</view>
			<view class="imgs">
				<image src="https://hbimg.huabanimg.com/08e3ee716b1c1335c8bbf6940074384d59f354fd72516-yrddEo_fw658/format/webp" mode="aspectFill" v-for="item in 3" :key="item"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import Activity from '@/components/Activity.vue';
	export default {
		components:{
			Activity
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
@import './index.scss'
</style>
