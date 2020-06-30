<template>
	<view class="item">
		<image src="https://hbimg.huabanimg.com/a0ca655c84991202c83bfb8110ee4480873d5899299ba-6voOiU_fw658/format/webp" mode="aspectFill" class="img"></image>
		<view class="right">
			<text class="t1">0-3岁小孩习惯培养课程大礼包，从小培养计划</text>
			<view class="tags">
				<view class="tag">
					0-3岁
				</view>
				<view class="tag">
					行为习惯
				</view>
			</view>
			<view class="price">
				￥<text class="num">119</text> <text class="t1">已购10293</text>
				<view class="btn">
					去订购
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.item{
		width:100%;
		padding:50rpx 0;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #ddd;
		.img{
			width:274rpx;
			height:190rpx;
			border-radius:10rpx;
			margin-right: 30rpx;
		}
		.right{
			flex:1;
			height: 190rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			.t1{
				font-size:30rpx;
				font-family:PingFang SC;
				font-weight:bold;
			}
			.tags{
				display: flex;
				align-items: center;
				.tag{
					padding:6rpx 11rpx;
					font-size:24rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(102,102,102,1);
					border:1px solid rgba(221,221,221,1);
					border-radius:17rpx;
				}
			}
			.price{
				position: relative;
				display: flex;
				align-items: center;
				font-size:26rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(255,0,0,1);
				.num{
					font-size:26rpx;
				}
				.t1{
					margin-left: 20rpx;
					font-size:24rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(102,102,102,1);
				}
				.btn{
					position: absolute;
					right: 0;
					top:50%;
					transform: translateY(-50%);
					width:110rpx;
					height:46rpx;
					text-align: center;
					line-height: 46rpx;
					background:rgba(253,211,15,1);
					border-radius:23rpx;
					font-size:26rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(0,0,0,1);
				}
			}
		}
	}
</style>
