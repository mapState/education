<template>
	<view class="main">
		<view class="nav" :style="{paddingTop:top+'px'}">
			<image src="../../static/icon/left.png" mode="aspectFill" @click="goBack"></image>
			<text>会员积分</text>
		</view>
		<view class="header">
			<text class="t1">当前积分</text>
			<text class="t2">50</text>
			<text class="line"></text>
			<view class="category">
				<view class="item">
					<text class="num">1345</text>
					<text class="text">累计积分</text>
				</view>
				<text class="hr"></text>
				<view class="item">
					<text class="num">1345</text>
					<text class="text">累计消费</text>
				</view>
				<text class="hr"></text>
				<view class="item">
					<text class="num">1345</text>
					<text class="text">今日获得</text>
				</view>
			</view>
		</view>
		<view class="tabBox">
			<view class="tabs">
				<view class="tab active">
					<image src="../../static/icon/integral1.png" mode="aspectFit" class="icon1"></image>
					<text class="">积分明细</text>
				</view>
				<view class="tab">
					<image src="../../static/icon/integral2.png" mode="aspectFit" class="icon2"></image>
					<text class="">积分兑换</text>
				</view>
			</view>
		</view>
		<view class="tip">
			<image src="../../static/icon/gth.png" mode="aspectFit"></image>
			<text>消费1元获得1积分，消费越多积分越多</text>
		</view>
		<view class="list">
			<view class="item" v-for="item in list" :key="item">
				<view class="detail">
					<text class="t1">参加活动</text>
					<text class="t2">2020-03-12 13:13</text>
				</view>
				<text class="num">+200</text>
			</view>
			<uni-load-more :status="loadStatus"></uni-load-more>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				top: 24,
				pageSize:10,
				pageNo:1,
				loadStatus:'noMore',
				list:[]
			};
		},
		onLoad() {
			this.top = uni.getMenuButtonBoundingClientRect().top
			this.getList()
		},
		onReachBottom() {
			this.getList()
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			getList(){
				this.$api.get('/api/bill/getPoints',{
					params:{
						pageNo:this.pageNo,
						pageSize:this.pageSize
					}
				}).then((res)=>{
					if(res.data.length>0){
						ths.list=this.list.concat(res.data)
						this.pageNo++
						if(res.data.length==this.pageSize){
							this.loadStatus="more"
						}else{
							this.loadStatus="noMore"
						}
					}else{
						this.loadStatus="noMore"
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
