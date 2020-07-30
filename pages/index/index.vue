<template>
	<view class="main">
		<view class="mask" v-if="showAddTip" @click="closeTip">

		</view>
		<view class="addTip" :style="{top:(top+height+6)+'px'}" v-if="showAddTip">
			<view class="box">
				点击上方添加我的小程序
			</view>
			<image src="/static/icon/ctip.png" mode="aspectFit" class="icon" @click="closeTip"></image>
		</view>
		<view class="header" :style="{paddingTop:top+'px'}">
			<view class="position" @click="goPosition" :style="{height:height+'px'}">
				<image src="/static/icon/dw.png" mode="aspectFit" class="dwIcon"></image>
				<text>{{addressData.city}}</text>
			</view>
			<view class="search">
				<image src="/static/icon/ssl.png" mode="aspectFill" class="sslIcon"></image>
				<view class="searchMain" @click="goSearch">
					<image src="/static/icon/ss.png" mode="aspectFill" class="ssIcon"></image>
					<text>搜索活动</text>
				</view>
				<image src="/static/icon/message.png" mode="aspectFill" class="messageIcon" @click="goMessage"></image>
			</view>
		</view>
		<!-- 		<view class="content"> -->
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
		<view class="category">
			<view class="cate" v-for="(item,index) in classList" :key="index" :index="index" @click="goEventsList(index)">
				<image :src="imgUrl + item.iconUrl" mode="aspectFill" class="icon1"></image>
				<text>{{item.name}}</text>
			</view>
		</view>
		<view class="block">
		</view>
		<view class="titles">
			<view class="hot" :class="{'titleActive':titleIndex==0}" @click="changeTitle(0)">热门活动</view>
			<view :class="{'titleActive':titleIndex==1}" @click="changeTitle(1)">最新活动</view>
		</view>
		<view class="list" v-if="titleIndex==0">
			<block v-for="(item,index) in hotActiveList" :key="index">
				<Activity @click.native="goDetail(item)" :detail="item"></Activity>
			</block>
			<uni-load-more :status="loadStatus"></uni-load-more>
		</view>
		<view class="list" v-if="titleIndex==1">
			<block v-for="(item,index) in newActiveList" :key="index">
				<Activity @click.native="goDetail(item)" :detail="item"></Activity>
			</block>
			<uni-load-more :status="loadStatus"></uni-load-more>
		</view>
		<!-- 		</view> -->
		<view class="loginTip" v-if="loginStatus==0">
			<view class="left">
				<image src="/static/icon/tioIcon.png" mode="aspectFill" class="leftIcon"></image>
				<text>您当前未登入，请登入</text>
			</view>
			<view class="btn" @click="goMine">
				去登入
			</view>
		</view>
		<tab-bar :tabIndex="1"></tab-bar>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
	import QQMapWX from '../../common/qqmap-wx-jssdk.min.js';
	var qqmapsdk;
	import Activity from '@/components/Activity.vue';
	import TabBar from '@/components/TabBar.vue'
	export default {
		components: {
			Activity,
			TabBar,
			uniLoadMore
		},
		data() {
			return {
				imgUrl:'',
				classList:[],
				hotActiveList:[],
				newActiveList:[],
				pageNo1:1,
				pageNo2:1,
				pageSize:5,
				loadStatus1:'noMore',
				loadStatus2:'noMore',
				loginStatus:1,
				addressData:{},
				top: 30,
				height: 32,
				right: 0,
				currentIndex: 0,
				titleIndex: 0,
				showAddTip: false,
				swiperList: [],
				jw:{},//经纬度
			}
		},
		onLoad() {
			this.imgUrl=this.$baseUrl
			let info = uni.getMenuButtonBoundingClientRect()
			this.top = info.top
			this.height = info.height
			//this.getAddress()
			this.getAdvertList()
		},
		onShow() {
			let token=uni.getStorageSync('token')
			this.loginStatus=token?1:0
			this.titleIndex=0
			this.newActiveList=[]
			this.loadStatus1='noMore'
			this.loadStatus2='noMore'
			this.pageNo1=1
			this.pageNo2=1
			this.hotActiveList=[]
			setTimeout(()=>{
				uni.getStorage({
				    key: 'address',
				    success:(res)=>{
				      this.addressData=res.data
				    },
						complete:()=>{
							this.getCates()
						}
				})
			},400)
		},
		onReachBottom(){
			if(this.loadStatus=="noMore"){
				return
			}
			if(this.titleIndex==0){
				this.getActivityList1()
			}else{
				this.getActivityList2()
			}
		},
		methods: {
			goMine(){
				uni.reLaunch({
				    url: '/pages/mine/mine'
				});
			},
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
						type: 1
					}
				}).then((res) => {
					this.swiperList=res.data
					//console.log(res.data)
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
					let classList=[]
					res.data.forEach((item)=>{
						if(item.pid==0){
							classList.push(item)
						}
					})
					this.classList=classList
					this.getActivityList1() //热门
				})
			},
			//活动列表
			getActivityList1(){
				this.loadStatus="loading"
				this.$api.get('/api/act/getActivityList',{
					params:{
						pageNo:this.pageNo1,
						pageSize:this.pageSize,
						lat:this.addressData.lat,
						lng:this.addressData.lng
					}
				}).then((res) => {
					//this.swiperList=res.data
					console.log(res.data)
					if(res.data.length>0){
						this.hotActiveList=this.hotActiveList.concat(res.data)
						this.pageNo1++
						if(res.data.length<this.pageSize){
							this.loadStatus1="noMore"
						}else{
							this.loadStatus1='more'
						}
					}else{
						this.loadStatus1="noMore"
					}
				})
			},
			getActivityList2(){
				this.loadStatus="loading"
				this.$api.get('/api/act/getActivityList',{
					params:{
						pageNo:this.pageNo2,
						pageSize:this.pageSize,
						lat:this.addressData.lat,
						lng:this.addressData.lng,
						isNew:1
					}
				}).then((res) => {
					//this.swiperList=res.data
					console.log(res.data)
					if(res.data.length>0){
						this.newActiveList=this.newActiveList.concat(res.data)
						this.pageNo2++
						if(res.data.length<this.pageSize){
							this.loadStatus2="noMore"
						}else{
							this.loadStatus2='more'
						}
					}else{
						this.loadStatus2="noMore"
					}
				})
			},
			closeTip() {
				this.showAddTip = false
			},
			swiperChange(e) {
				this.currentIndex = e.detail.current
			},
			changeTitle(index) {
				if (index == this.titleIndex) {
					return
				}
				this.titleIndex = index
				if(this.titleIndex==0&&this.hotActiveList.length<=0){
					this.getActivityList1()
				}
				if(this.titleIndex==1&&this.newActiveList.length<=0){
					this.getActivityList2()
				}
			},
			goPosition() {
				uni.navigateTo({
					url: "/pages/position/position"
				})
			},
			goSearch() {
				uni.navigateTo({
					url: "/pages/search/search"
				})
			},
			goEventsList(index) {
				uni.navigateTo({
					url: "/pages/eventsList/eventsList?oneIndex="+index
				})
			},
			goDetail(data) {
				getApp().globalData.activeData=data
				console.log(getApp().globalData.activeData)
				uni.navigateTo({
					url: "/pages/activityDetails/activityDetails"
				})
			},
			goMessage() {
				uni.navigateTo({
					url: "/pagesA/news/news"
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
