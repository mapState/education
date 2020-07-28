<template>
	<view class="plItem">
		<view class="info">
			<view class="left">
				<image :src="imgUrl+detail.avatar" mode="aspectFit" class="avatar"></image>
				<view class="desc">
					<view class="row">
						<text class="name">{{item.name}}</text>
						<image src="/static/icon/vip.png" mode="aspectFit" class="vipIcon"></image>
						<text class="hy">{{detail.level}}</text>
					</view>
					<text class="time">{{detail.createDate}}</text>
				</view>
			</view>
			<!-- <view class="right">
				<image src="/static/icon/heart.png" mode="aspectFit" class="heartIcon"></image>
				<text>44</text>
			</view> -->
		</view>
		<view class="detail" @click.stop="goDetail">
			{{detail.content}}
		</view>
		<view class="imgs" @click.stop="previewImage">
			<image src="https://hbimg.huabanimg.com/08e3ee716b1c1335c8bbf6940074384d59f354fd72516-yrddEo_fw658/format/webp" mode="aspectFill" v-for="item in imgList" :key="item"></image>
		</view>
		<view class="operating">
			<view class="left">
				<view class="tag" v-if="tag">
					{{tag}}
				</view>
			</view>
			<view class="right">
				<view class="item likeBox" @click="clickLike">
					<image src="/static/icon/liked.png" mode="aspectFit" class="like" v-if="isLike==1"></image>
					<image src="/static/icon/heart.png" mode="aspectFit" class="like" v-else></image>
					<text>{{likeCount||0}}</text>
				</view>
				<view class="item">
					<image src="/static/icon/c-msg.png" mode="aspectFit" class="like"></image>
					<text>{{detail.commentCount||0}}</text>
				</view>
			</view>
		</view>
		<view class="pos">
			<image src="/static/icon/c-dw.png" mode="aspectFit" class="dwIcon"></image>
			<text>{{detail.address}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl:"",
				tag:'',
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
			imgList(){
				let arry=[]
				if(this.detail.resUrl){
					arry=this.detail.resUrl.split(',')
					arry.forEach((item)=>{
						item=this.imgUrl+item
					})
				}
				return arry
			}
		},
		mounted() {
			this.imgUrl=this.$baseUrl
			this.getCates()
		},
		methods:{
			clickLike(){
				this.$api.post('/api/user/like',{
					tableId:this.detail.id,
					type:1,
					userId:uni.getStorageSync('userInfo').id
				}).then((res)=>{
					this.isLike=res.data.state
					if(res.data.state==1){
						this.likeCount++
					}else{
						this.likeCount--
					}
				})
			},
			//获取分类列表
			getCates() {
				this.$api.get('/api/static/dictList',{
					params:{
						type:4 //1.活动分类 2.课程分类 3.绘本分类 4 帖子分类 5消费得积分 6消费得经验
					}
				}).then((res) => {
					console.log(res.data)
					res.data.forEach((item)=>{
						if(item.id==this.detail.dictId){
							this.tag=item.name
						}
					})
				})
			},
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
