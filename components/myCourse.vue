<template>
	<view class="item" @click="goDetail">
		<view class="courseImg">
			<text v-if="detail.status==1" class="yx">有效</text>
			<text v-else class="yx sx">失效</text>
			<image :src="imgUrl+detail.poster" mode="aspectFill" class="img"></image>
		</view>
		<view class="right">
			<text class="t1">{{detail.title}}</text>
			<view class="tags">
				<view class="tag" v-for="(item,index) in tagList" :key="index">
					{{item}}
				</view>
			</view>
			<view class="time">
				到期时间：{{detail.createDate}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tagList:[],
				imgUrl:''
			};
		},
		props:{
			detail:{
				type:Object,
				default:{}
			}
		},
		mounted() {
			this.imgUrl=this.$baseUrl
			this.getCates()
		},
		methods:{
			goDetail(){
				getApp().globalData.learnDetail=this.detail
				uni.navigateTo({
					url:"/pagesA/learningList/learningList?tagList="+JSON.stringify(this.tagList)
				})
			},
			getCates() {
				this.$api.get('/api/static/dictList',{
					params:{
						type:2 //1.活动分类 2.课程分类 3.绘本分类 4 帖子分类 5消费得积分 6消费得经验
					}
				}).then((res) => {
					let pid=''
					let tagList=[]
					res.data.forEach((item)=>{
						if(item.id==this.detail.typeId){
							tagList.push(item.name)
							pid=item.pid
						}
					})
					console.log(tagList)
					res.data.forEach((item)=>{
						if(item.id==pid){
							tagList.push(item.name)
						}
					})
					this.tagList=tagList
					
				})
			},
		}
	}
</script>

<style lang="scss">
.item{
			width:100%;
			padding:50rpx 0;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #F3F3F3;
			.courseImg{
				position: relative;
				.img{
					width:274rpx;
					height:190rpx;
					border-radius:10rpx;
					margin-right: 30rpx;
				}
				.yx{
					position: absolute;
					left:0;
					top:0;
					width:71rpx;
					height:36rpx;
					background:rgba(253,211,15,1);
					border-radius:10rpx 0px 10rpx 0px;
					font-size:24rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(0,0,0,1);
					text-align: center;
					line-height: 36rpx;
				}
				.sx{
					background-color: #A8A8A8;
					color:#FFFFFF;
				}
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
						padding:5rpx 11rpx;
						font-size:24rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(102,102,102,1);
						border:1px solid rgba(221,221,221,1);
						border-radius:18rpx;
						margin-right: 20rpx;
					}
				}
				.time{
					font-size:24rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(102,102,102,1);
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
