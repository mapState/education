<template>
	<view class="main">
		<view class="acList">
			<Activity :type="3"></Activity>
		</view>
		<view class="block">
		</view>
		<view class="titleBox">
			<text></text>
			<view class="">
				参团人员
			</view>
		</view>
		<view class="joinPeople">
			<view class="item">
				<view class="avatarBox">
					<image src="../../static/1.jpg" mode="aspectFill" class="avatar"></image>
					<image src="../../static/img/Identity.png" mode="aspectFit" class="idenImg"></image>
					<image src="../../static/icon/jia.png" mode="aspectFit" class="addIcon"></image>
					<text>团长</text>
				</view>
				<text class="name">欧文</text>
			</view>
			<view class="item">
				<view class="avatarBox">
					<image src="../../static/1.jpg" mode="aspectFill" class="avatar"></image>
					<image src="../../static/img/Identity.png" mode="aspectFit" class="idenImg" v-if="false"></image>
					<text v-if="false">团长</text>
					<image src="../../static/icon/jia.png" mode="aspectFit" class="addIcon"></image>
				</view>
				<text class="name">欧文2</text>
			</view>
			<view class="item">
				<view class="avatarBox">
					<image src="../../static/1.jpg" mode="aspectFill" class="avatar"></image>
					<image src="../../static/img/Identity.png" mode="aspectFit" class="idenImg" v-if="false"></image>
					<text v-if="false">团长</text>
				</view>
				<text class="name">欧文3</text>
			</view>
		</view>
		<view class="block">

		</view>
		<view class="titleBox">
			<text></text>
			<view class="">
				报名信息
			</view>
		</view>
		<view class="form">
			<view class="row">
				<text class="title">姓名：</text>
				<input class="input" focus placeholder="请填写报名人姓名" placeholder-class="plClass" />
			</view>
			<view class="row">
				<text class="title">电话：</text>
				<input class="input" focus placeholder="请填写报名人电话" placeholder-class="plClass" />
			</view>
			<view class="row">
				<text class="title">性别：</text>
				<input class="input" focus placeholder="请填写报名人性别" placeholder-class="plClass" />
			</view>

			<view class="row">
				<text class="title">年龄：</text>
				<input class="input" focus placeholder="请填写报名人年龄" placeholder-class="plClass" />
			</view>
			<view class="row br">
				<text class="title">所在地：</text>
				<input class="input" focus placeholder="请填写报名人所在地" placeholder-class="plClass" />
				<image src="../../static/icon/pdw.png" mode="aspectFit" class="icon"></image>
			</view>
		</view>
		<view class="block2">
			
		</view>
		<view class="payBox">
			<view class="price">支付参团价：<text>200</text></view>
			<view class="btn" @click="goSuccess">
				支付
			</view>
		</view>
	</view>
</template>

<script>
	import Activity from '@/components/Activity.vue'
	export default {
		components: {
			Activity
		},
		data() {
			return {

			};
		},
		methods:{
			goSuccess(){
				uni.navigateTo({
					url:"/pages/successful/successful"
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
