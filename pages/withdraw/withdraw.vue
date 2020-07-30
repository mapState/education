<template>
	<view class="main">
		<view class="box">
		</view>
		<view class="withdraw">
			<view class="detail">
				<text class="title">提现金额</text>
				<view class="inputBox">
					<text class="t1">￥</text>
					<input type="digit" value="" class="input" v-model="money"/>
					<text class="t2">(元)</text>
				</view>
				<view class="desc">
					<text class="t1">可提现金额：￥{{useMoney}}</text>
					<text class="t2" @click="money=useMoney">全部提现</text>
				</view>
			</view>
			<view class="btn" @click="tx">
				提现
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money:'',
				useMoney:222
			}
		},
		methods: {
			tx(){
				this.$api.post('/api/user/cashOut',{
					money:this.money,
					state:0,//0发起 1通过 2拒绝
					status:1,
					userId:uni.getStorageSync('userInfo').id
				}).then((res)=>{
					
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
