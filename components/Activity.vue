<template>
	<view class="item">
		<image :src="imgPath" mode="aspectFill"
		 class="leftImg" v-if="detail.poster"></image>
		<view class="right">
			<view class="row">
				<text class="t1">{{detail.title}}</text>
			</view>
			<view class="row">
				<view class="tag" v-for="(item,index) in tagList" :key="index">{{item}}</view>
				<image src="/static/icon/eye.png" mode="aspectFill" class="eyeIcon"></image>
				<text class="gray">{{detail.fake}}</text>
				<image src="/static/icon/peo.png" mode="aspectFill" class="peoIcon"></image>
				<text class="gray userNum">{{detail.groupNumber}}</text>
				<text class="gray">{{detail.distance||0}}km</text>
			</view>
			<view class="row">
				<view class="time" v-if="detail.state==1">报名时间 : {{detail.signStartDate | changeTime}} - {{detail.signEndDate |changeTime}}</view>
				<view class="time" v-else>活动时间 : {{detail.startDate | changeTime}} - {{detail.endDate |changeTime}}</view>
			</view>
			<view class="row btnBox">
				<view class="price">
					￥<text class="t">{{detail.groupPrice/100}}</text><text class="tt">￥{{detail.personalPrice/100}}</text>
				</view>
				<view class="btn2" v-if="detail.state==1">
					未开始
				</view>
				<view class="btn1" v-if="detail.state==2">
					报名中
				</view>
				<view class="btn3" v-if="detail.state==3">
					进行中
				</view>
				<view class="btn4" v-if="detail.state==4">
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
				imgUrl:'',
				tagList:[]
			};
		},
		props:{
			detail:{
				type:Object,
				default:{}
			}
		},
		computed:{
			imgPath(){
				return this.imgUrl+this.detail.poster
			}
		},
		filters:{
			changeTime(time){
				if(time){
					return time.substr(5,5)
				}
				return''
				
			}
		},
		mounted() {
			this.imgUrl=this.$baseUrl
			console.log(this.imgUrl)
			this.getCates()
		},
		methods:{
			//问题不大
			//获取分类列表
			getCates() {
				this.$api.get('/api/static/dictList',{
					params:{
						type:1 //1.活动分类 2.课程分类 3.绘本分类 4 帖子分类 5消费得积分 6消费得经验
					}
				}).then((res) => {
					//this.swiperList=res.data
					//console.log(res.data)
					//this.classList=res.data
					let pid=''
					let tagList=[]
					res.data.forEach((item)=>{
						if(item.id==this.detail.typeId){
							tagList.push(item.name)
							pid=item.pid
						}
					})
					//console.log(tagList)
					// res.data.forEach((item)=>{
					// 	if(item.id==pid){
					// 		tagList.push(item.name)
					// 	}
					// })
					this.tagList=tagList
				})
			},
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
			flex-shrink: 0;
		}
		.right {
			height: 230rpx;
			width:440rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			.btnBox {
				justify-content: space-between;
			}
			.row {
				width:100%;
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
					margin-right:20rpx;
				}

				.gray {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);
					vertical-align: middle;
				}

				.eyeIcon {
					width: 27rpx;
					height: 19rpx;
				}

				.peoIcon {
					display: block;
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
