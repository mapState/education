<template>
	<view class="plItem">
		<view class="info">
			<view class="left">
				<image src="/static/1.jpg" mode="aspectFit" class="avatar"></image>
				<view class="desc">
					<view class="row">
						<text class="name">{{detail.name}}</text>
						<image src="/static/icon/vip.png" mode="aspectFit" class="vipIcon"></image>
						<text class="hy">{{detail.level}}</text>
					</view>
					<text class="time">{{detail.createDate}}</text>
				</view>
			</view>
			<view class="right" @click="dz">
				<image src="/static/icon/liked.png" mode="aspectFit" class="heartIcon" v-if="isLike==1"></image>
				<image src="/static/icon/heart.png" mode="aspectFit" class="heartIcon" v-else></image>
				<text>{{likeCount}}</text>
			</view>
		</view>
		<view class="detail">
			{{detail.content}}
		</view>
		<view class="imgs">
			<image :src="imgUrl+img" mode="aspectFill" v-for="(img,i) in imageUrl" :key="i"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl:'',
				isLike:this.detail.isLike,
				likeCount:this.detail.likeCount
			};
		},
		props:{
			detail:{
				type:Object,
				default:{}
			}
		},
		computed:{
			imageUrl(){
				if(this.detail.imageUrl){
					return this.detail.imageUrl.split(',')
				}
				return []
			}
		},
		mounted() {
			this.imgUrl=this.$baseUrl
		},
		methods:{
			dz(){
				this.$api.post('/api/user/like',{
					type:2,
					userId:uni.getStorageSync('userInfo').id,
					tableId:this.detail.id
				}).then((res)=>{
					if(res.data.state==1){
						this.isLike=1
						this.likeCount++
					}else{
						this.isLike=0
						this.likeCount--
					}
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
