<template>
	<view class="main">
		<view class="activityBox">
			<view class="item">
				<image :src="imgUrl + detail.poster" mode="aspectFill"
				 class="leftImg"></image>
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
						<text class="gray">3km</text>
					</view>
					<view class="row">
						<view class="time" v-if="detail.state==1">报名时间 : {{detail.signStartDate | changeTime}} - {{detail.signEndDate |changeTime}}</view>
						<view class="time" v-else>活动时间 : {{detail.startDate | changeTime}} - {{detail.endDate |changeTime}}</view>
					</view>
					<view class="row btnBox">
						<view class="price">
							￥<text class="t">{{detail.groupPrice}}</text><text class="tt">￥{{detail.personalPrice}}</text>
							<view class="bt" v-if="detail.state==1">
								未开始
							</view>
							<view class="bt" v-if="detail.state==2">
								报名中
							</view>
							<view class="bt" v-if="detail.state==3">
								进行中
							</view>
							<view class="bt" v-if="detail.state==4">
								已结束
							</view>
						</view>
						<view class="xcj" @click="wantJoin">
							想参加
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="block">
			
		</view>
		<view class="titleBox">
			<text></text>
			<view class="">
				全部评价
			</view>
		</view>
		<view class="plItem" v-for="item in list" :key="item.id">
			<view class="info">
				<view class="left">
					<image src="/static/1.jpg" mode="aspectFit" class="avatar"></image>
					<view class="desc">
						<view class="row">
							<text class="name">{{item.name}}</text>
							<image src="/static/icon/vip.png" mode="aspectFit" class="vipIcon"></image>
							<text class="hy">{{item.level}}</text>
						</view>
						<text class="time">{{item.createDate}}</text>
					</view>
				</view>
				<view class="right">
					<image src="/static/icon/heart.png" mode="aspectFit" class="heartIcon"></image>
					<text>{{item.likeCount}}</text>
				</view>
			</view>
			<view class="detail">
				{{item.content}}
			</view>
			<view class="imgs">
				<image src="https://hbimg.huabanimg.com/08e3ee716b1c1335c8bbf6940074384d59f354fd72516-yrddEo_fw658/format/webp" mode="aspectFill" v-for="item in 3" :key="item"></image>
			</view>
		</view>
		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadStatus:'more',
				imgUrl:'',
				pageNo:1,
				pageSize:5,
				tableId:'',
				detail:{},
				tagList:[],
				list:[]
			};
		},
		filters:{
			changeTime(time){
				if(time){
					return time.substr(5,5)
				}
				return''
				
			}
		},
		onLoad() {
			this.imgUrl=this.$baseUrl
			this.getCates()
			this.detail=getApp().globalData.activeData
			this.getList()
		},
		onReachBottom() {
			this.getList()
		},
		methods:{
			wantJoin(){
				uni.navigateBack({
					delta:1
				})
			},
			//获取分类列表
			getCates() {
				this.$api.get('/api/static/dictList',{
					params:{
						type:1 //1.活动分类 2.课程分类 3.绘本分类 4 帖子分类 5消费得积分 6消费得经验
					}
				}).then((res) => {
					//this.swiperList=res.data
					console.log(res.data)
					//this.classList=res.data
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
							this.tagList=tagList
						}
					})
				})
			},
			getList(){
				this.loadStatus="loading"
				this.$api.get('/api/comment/getList',{
					params:{
						pageNo:this.pageNo,
						pageSize:this.pageSize,
						type:1,//1活动评价 2课程评价 3圈子评论
						tableId:this.detail.id
					}
				}).then((res)=>{
					if(res.data.length>0){
						this.list=this.list.concat(res.data)
						this.loadStatus="more"
						this.pageNo++
					}else{
						this.loadStatus="noMore"
					}
				})
			}
		}
	}
</script>

<style lang="scss">
@import './index.scss'
</style>
