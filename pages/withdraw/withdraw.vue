<template>
	<view class="main">
		<view class="box">
		</view>
		<view class="withdraw">
			<view class="detail">
				<text class="title">提现金额</text>
				<view class="inputBox">
					<text class="t1">￥</text>
					<input type="digit" value="" class="input" />
					<text class="t2">(元)</text>
				</view>
				<view class="desc">
					<text class="t1">可提现金额：￥13637.75</text>
					<text class="t2">全部提现</text>
				</view>
			</view>
			<view class="btn">
				提现
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
