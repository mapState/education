<template>
	<view class="plItem">
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
.plItem{
	width:690rpx;
	padding:40rpx 30rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-top: 1px solid #ddd;
	.info{
		width:100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 33rpx;
		.left{
			display: flex;
			align-items: center;
			.avatar{
				width:60rpx;
				height:60rpx;
				border-radius:50%;
				margin-right: 8rpx;
			}
			.desc{
				height: 60rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.time{
					font-size:20rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(101,101,101,1);
				}
				.row{
					display: flex;
					align-items: center;
					.name{
						font-size:28rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(1,83,119,1);
					}
					.vipIcon{
						width:28rpx;
						height: 19rpx;
						margin-left: 22rpx;
						margin-right:8rpx;
					}
					.hy{
						font-size:24rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(0,0,0,1);
					}
				}
			}
		}
		.right{
			display: flex;
			align-items: center;
			.heartIcon{
				width:20rpx;
				height: 18rpx;
				margin-right: 10rpx;
			}
			text{
				font-size:26rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(153,153,153,1);
			}
		}
	}
	.detail{
		width:604rpx;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(0,0,0,1);
		margin-bottom: 30rpx;
	}
	.imgs{
		width:632rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		image{
			display: block;
			width:198rpx;
			height:220rpx;
			border-radius:4rpx;
			margin-left:12rpx;
		}
	}
}
</style>
