<template>
	<view class="item">
		<image src="https://hbimg.huabanimg.com/afc6085a1964e84263c6b95fcf374473b33ba9ae1c43d2-yI7y1s_fw658/format/webp" mode="aspectFill"
		 class="leftImg"></image>
		<view class="right">
			<view class="row">
				<text class="t1">杭州小记者内蒙古宁夏夏令营梦幻迪士尼，亲子活动</text>
			</view>
			<view class="row">
				<view class="tag">夏令营</view>
				<image src="/static/icon/eye.png" mode="aspectFill" class="eyeIcon"></image>
				<text class="gray">111125</text>
				<image src="/static/icon/peo.png" mode="aspectFill" class="peoIcon"></image>
				<text class="gray userNum">101</text>
				<text class="gray">3km</text>
			</view>
			<view class="row">
				<text class="time">报名时间：06/25 - 03/25</text>
			</view>
			<view class="row btnBox">
				<view class="price">
					￥<text class="t">119</text><text class="tt">￥119</text>
				</view>
				<view class="btn1" v-if="type==0">
					报名中
				</view>
				<view class="btn2" v-if="type==1">
					未开始
				</view>
				<view class="btn3" v-if="type==2">
					进行中
				</view>
				<view class="btn4" v-if="type==3">
					已结束
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
		},
		props:{
			type:{
				type:Number,
				default:0
			}
		}
	}
</script>

<style lang="scss">
	.item {
		width: 100%;
		display: flex;
		align-items: center;
		padding: 40rpx 0;
		border-bottom: 1px solid #ddd;
		.leftImg {
			width: 230rpx;
			height: 230rpx;
			border-radius: 10rpx;
			margin-right: 20rpx;
		}

		.right {
			height: 230rpx;
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.btnBox {
				justify-content: space-between;
			}

			.row {
				display: flex;
				align-items: center;

				.t1 {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba(9, 9, 9, 1);
				}

				.tag {
					font-size: 20rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);
					width: 76rpx;
					height: 34rpx;
					text-align: center;
					line-height: 34rpx;
					border: 1rpx solid rgba(221, 221, 221, 1);
					border-radius: 17rpx;
					margin-right: 30rpx;
				}

				.gray {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);
				}

				.eyeIcon {
					width: 27rpx;
					height: 19rpx;
				}

				.peoIcon {
					width: 22rpx;
					height: 22rpx;
					margin-left: 30rpx;
					margin-right: 8rpx;
				}

				.userNum {
					margin-right: 82rpx;
				}

				.time {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);
				}

				.btn1 {
					text-align: center;
					line-height: 46rpx;
					width: 110rpx;
					height: 46rpx;
					background: rgba(253, 211, 15, 1);
					border-radius: 23rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(0, 0, 0, 1);
				}

				.btn2 {
					text-align: center;
					line-height: 46rpx;
					width: 110rpx;
					height: 46rpx;
					background: rgba(0, 191, 191, 1);
					border-radius: 23rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
				}

				.btn3 {
					text-align: center;
					line-height: 46rpx;
					width: 110rpx;
					height: 46rpx;
					background: rgba(32, 123, 226, 1);
					border-radius: 23rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
				}

				.btn4 {
					text-align: center;
					line-height: 46rpx;
					width: 110rpx;
					height: 46rpx;
					background: rgba(215, 215, 215, 1);
					border-radius: 23rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(0, 0, 0, 1);
				}

				.price {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(255, 0, 0, 1);

					.t {
						font-size: 36rpx;
					}

					.tt {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(102, 102, 102, 1);
						text-decoration: line-through;
						margin-left: 10rpx;
					}

				}
			}
		}
	}
</style>
