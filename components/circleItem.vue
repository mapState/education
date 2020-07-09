<template>
	<view class="plItem" @click.stop="goDetail">
		<view class="info">
			<view class="left">
				<image src="/static/1.jpg" mode="aspectFit" class="avatar"></image>
				<view class="desc">
					<view class="row">
						<text class="name">name</text>
						<image src="/static/icon/vip.png" mode="aspectFit" class="vipIcon"></image>
						<text class="hy">会员</text>
					</view>
					<text class="time">5分钟前</text>
				</view>
			</view>
			<!-- <view class="right">
				<image src="/static/icon/heart.png" mode="aspectFit" class="heartIcon"></image>
				<text>44</text>
			</view> -->
		</view>
		<view class="detail">
			这样带娃简直是“作死”，婆婆妈妈们经常这样做，
			你家娃中招了吗？
		</view>
		<view class="imgs" @click.stop="previewImage">
			<image src="https://hbimg.huabanimg.com/08e3ee716b1c1335c8bbf6940074384d59f354fd72516-yrddEo_fw658/format/webp" mode="aspectFill" v-for="item in 3" :key="item"></image>
		</view>
		<view class="operating">
			<view class="left">
				<view class="tag">
					成长
				</view>
			</view>
			<view class="right">
				<view class="item likeBox">
					<image src="/static/icon/heart.png" mode="aspectFit" class="like"></image>
					<text>11</text>
				</view>
				<view class="item">
					<image src="/static/icon/c-msg.png" mode="aspectFit" class="like"></image>
					<text>121</text>
				</view>
			</view>
		</view>
		<view class="pos">
			<image src="/static/icon/c-dw.png" mode="aspectFit" class="dwIcon"></image>
			<text>杭州市江干区九堡</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList:[
					'https://hbimg.huabanimg.com/388d9f7f46ca2367215019e2cc657a120232f1a090ab6d-VROHhO_fw658/format/webp',
					'https://hbimg.huabanimg.com/6949b1b94886ea5688ded50a31f2bc24d2ed3aaa2c94e-dJ0QDC_fw658/format/webp'
				]
			};
		},
		methods:{
			previewImage() {
				uni.previewImage({
					urls: this.imgList
				});
			},
			goDetail(){
				uni.navigateTo({
					url:"/pages/circleDetail/circleDetail"
				})
			}
		}
	}
</script>

<style lang="scss">
.plItem{
	width:690rpx;
	padding:40rpx 30rpx;
	display: flex;
	flex-direction: column;
	//align-items: center;
	border-bottom: 1px solid #ddd;
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
				height: 62rpx; 
				display: flex;
				flex-direction: column;
				justify-content:space-between;
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
		width:624rpx;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(0,0,0,1);
		margin-bottom: 30rpx;
		margin-left: 68rpx;
	}
	.imgs{
		width:624rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin-left: 68rpx;
		image{
			display: block;
			width:198rpx;
			height:220rpx;
			border-radius:4rpx;
			margin-right:12rpx;
		}
		&>image:nth-child(3n){
			margin-right: 0;
		}
	}
	.operating{
		margin: 22rpx 0;
		width:622rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-left: 68rpx;
		.left{
			display: flex;
			align-items: center;
			.tag{
				text-align: center;
				line-height: 34rpx;
				margin-right: 20rpx;
				width:89rpx;
				height:34rpx;
				border:1px solid rgba(221,221,221,1);
				border-radius:17rpx;
				font-size:24rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(102,102,102,1);
			}
		}
		.right{
			display: flex;
			align-items: center;
			height: 34rpx;
			.likeBox{
				margin-right: 52rpx;
			}
			.item{
				display: flex;
				align-items: center;
				height: 34rpx;
				.like{
					width:20rpx;
					height: 19rpx;
				}
				.pl{
					width:19rpx;
					height: 20rpx;
				}
				text{
					font-size:24rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(153,153,153,1);
					margin-left: 12rpx;
					line-height: 34rpx;
				}
			}
		}
	}
	.pos{
		width:624rpx;
		display: flex;
		align-items: center;
		margin-left: 68rpx;
		.dwIcon{
			width:22rpx;
			height: 26rpx;
			margin-right: 10rpx;
		}
		text{
			font-size:24rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(1,84,120,1);
		}
	}
}
</style>
