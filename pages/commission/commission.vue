<template>
	<view class="main">
		<view class="nav" :style="{paddingTop:top+'px'}">
			<image src="../../static/icon/left.png" mode="aspectFill" @click="goBack"></image>
			<text>我的佣金</text>
		</view>
		<view class="header">
			<view class="t1">当前佣金
				<text class="team">我的团队></text>
			</view>
			<text class="t2">￥50.00</text>
			<text class="line"></text>
			<view class="category">
				<view class="item">
					<text class="num">￥1345</text>
					<text class="text">累计收益</text>
				</view>
				<text class="hr"></text>
				<view class="item">
					<text class="num">￥1345</text>
					<text class="text">昨日收益</text>
				</view>
				<text class="hr"></text>
				<view class="item">
					<text class="num">￥1345</text>
					<text class="text">累计已提</text>
				</view>
			</view>
			<view class="withdrawBtn" @click="goWithdraw">
				我要提现
			</view>
		</view>
		<view class="Introduction" @click="goIntroduction">
			提现介绍？
		</view>
		<view class="tabList">
			<view class="item" :class="{'active':tabIndex==0}" @click="tabIndex=0">
				提现记录
			</view>
			<view class="item" :class="{'active':tabIndex==1}" @click="tabIndex=1">
				收益记录
			</view>
			<view class="filter" v-if="tabIndex==1">
				<text>按月筛选</text>
				<image src="../../static/icon/filter.png" mode="aspectFit"></image>
			</view>
		</view>
		<view class="list" v-if="tabIndex==0">
			<view class="item" v-for="item in 10" :key="item">
				<view class="detail">
					<text class="t1">提现</text>
					<text class="t2">2020-03-12 13:13</text>
				</view>
				<text class="num">+200</text>
			</view>
		</view>
		<view class="list" v-if="tabIndex==1">
			<view class="item" v-for="item in 10" :key="item">
				<view class="detail">
					<text class="t1">夏令营活动分佣</text>
					<text class="t2">2020-03-12 13:13</text>
				</view>
				<text class="num">-￥200</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				top: 24,
				tabIndex:0
			};
		},
		onLoad() {
			this.top = uni.getMenuButtonBoundingClientRect().top
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			goWithdraw(){
				uni.navigateTo({
					url:"/pages/withdraw/withdraw"
				})
			},
			goIntroduction(){
				uni.navigateTo({
					url:"/pages/withdraw/Introduction/Introduction"
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
