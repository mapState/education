<template>
	<view class="main">
		<view class="nav" :style="{paddingTop:top+'px'}">
			<view class="tag" v-for="(item,index) in tabList1" :key="index" :class="{'tagActive':index==tabIndex1}" @click="changeTabIndex1(index)">
				{{item}}
			</view>
		</view>
		<view class="yellow">

		</view>
		<view class="swiper-box">
			<view class="swiperBox">
				<swiper class="swiper" :autoplay="true" :interval="2000" :duration="500" :circular="true" @change="swiperChange">
					<swiper-item v-for="(item,index) in swiperList" :key="index" @click="linkPage(item)">
						<image :src="imgUrl+item.imageUrl" mode="aspectFill" class="itemImg"></image>
					</swiper-item>
				</swiper>
				<view class="dots" v-if="swiperList.length>0">
					<view class="dot" v-for="item in swiperList.length" :key="item" :class="{'dotActive':item==currentIndex}">

					</view>
				</view>
			</view>
		</view>
		<view class="scroll-view" :style="{top:(top+32)+'px'}">
			<scroll-view class="scroll-view_H" scroll-x="true">
				<view class="list">
					<text class="" @click="goCourseList(0)" :class="{'active':classIndex==0}">全部</text>
					<text v-for="item in classList" :key="item.id" @click="goCourseList(item.id)" :class="{'active':classIndex==item.id}">{{item.name}}</text>
				</view>
			</scroll-view>
		</view>
		<circle-item v-for="(item,index) in list" :key="index" :detail="item"></circle-item>
		<uni-load-more :status="loadStatus"></uni-load-more>
		<TabBar :tabIndex="3"></TabBar>
	</view>
</template>

<script>
	import TabBar from '@/components/TabBar.vue';
	import circleItem from '@/components/circleItem.vue'
	export default {
		components: {
			TabBar,
			circleItem
		},
		data() {
			return {
				top: 24,
				currentIndex: 0,
				tabList1:['热门','精选','最新','官方'],
				tabIndex1:0,
				pageNo:1,
				pageSize:5,
				dictIds:'',
				classList:[],
				classIndex:0,
				list:[],
				loadStatus:'noMore',
				swiperList:[],
				imgUrl:''
			};
		},
		onLoad() {
			this.imgUrl=this.$baseUrl
			this.top = uni.getMenuButtonBoundingClientRect().top
			this.getCates()
			this.getAdvertList()
		},
		onShow() {
			this.pageNo=1
			this.list=[]
			this.getCircleList()
		},
		onReachBottom() {
			this.getCircleList()
		},
		methods: {
			//点击轮播跳转
			linkPage(e){
				if(e.linkType==1){//1活动 2课程 3链接
					console.log(e.linkUrl)
				}
			},
			//轮播
			getAdvertList() {
				this.$api.get('/api/static/advertList', {
					params: {
						type: 2  //	类型 1首页 2圈子 3课程
					}
				}).then((res) => {
					this.swiperList=res.data
					//console.log(res.data)
				})
			},
			goCourseList(index){
				// if(index==this.classIndex){
				// 	return
				// }
				this.classIndex=index
				if(index==0){
					this.dictIds=''
				}else{
					this.dictIds=index
				}
				this.pageNo=1
				this.list=[]
				this.getCircleList()
			},
			getCircleList(){
				this.loadStatus="loading"
				this.$api.get('/api/club/getMomentList',{
					params:{
						pageNo:this.pageNo,
						pageSize:this.pageSize,
						type:this.tabIndex1+1,
						dictIds:this.dictIds
					}
				}).then((res)=>{
					if(res.data.length>0){
						this.list=this.list.concat(res.data)
						this.pageNo++
						if(res.data.length==this.pageSize){
							this.loadStatus='more'
						}else{
							this.loadStatus='noMore'
						}
					}else{
						this.loadStatus='noMore'
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
					this.classList=res.data
				})
			},
			swiperChange(e) {
				this.currentIndex = e.detail.current
			},
			changeTabIndex1(index){
				this.tabIndex1=index
				this.list=[]
				this.pageNo=1
				this.getCircleList()
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
