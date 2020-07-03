<template>
	<view class="main">
		<view class="nav" :style="{top:top+'px'}">
			<image src="../../static/icon/bk.png" mode="aspectFit" @click="goBack"></image>
			<text>我的团队</text>
		</view>
		<view class="header">
			<image src="../static/img/teamBg.png" mode="aspectFill" class="bgImg"></image>
			<text class="t1">10</text>
			<text class="t2">团队人数</text>
		</view>
		<view class="tabs">
			<view class="tab active">
				一级
			</view>
			<view class="tab">
				二级
			</view>
		</view>
		<view class="search">
			<input type="text" value="" placeholder="请输入昵称" placeholder-class="plClass"/>
		</view>
		<view class="filter">
			<view class="item">
				<text>团队排序</text>
				<image src="../../static/icon/filter2.png" mode="aspectFit"></image>
			</view>
			<text class="line"></text>
			<view class="item">
				<text>贡献金额</text>
				<image src="../../static/icon/filter2.png" mode="aspectFit"></image>
			</view>
			<text class="line"></text>
			<view class="item">
				<text>累计分佣</text>
				<image src="../../static/icon/filter2.png" mode="aspectFit"></image>
			</view>
		</view>
		<view class="list">
			<view class="teamItem" v-for="item in 4" :key="item">
				<image src="/static/1.jpg" mode="aspectFill" class="avatar"></image>
				<view class="info">
					<text class="name">小丸子</text>
					<text class="vip">会员</text>
				</view>
				<view class="num num1">
					￥<text>600</text>
				</view>
				<view class="num">
					￥<text>600</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				top:24
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
			}
		}
	}
</script>

<style lang="scss">
@import  './index.scss'
</style>
