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
					<swiper-item v-for="(item,index) in swiperList" :key="index">
						<image :src="item" mode="aspectFill" class="itemImg"></image>
					</swiper-item>
				</swiper>
				<view class="dots">
					<view class="dot" v-for="item in 3" :key="item" :class="{'dotActive':item==currentIndex}">

					</view>
				</view>
			</view>
		</view>
		<view class="category">
			<view class="cate" v-for="(item,index) in classList" :key="index" :index="index" @click="goEventsList(index)">
				<image :src="imgUrl + item.iconUrl" mode="aspectFill" class="icon1"></image>
				<text>{{item.name}}</text>
			</view>
			<!-- <view class="cate">
				<image src="../../static/icon/cate2.png" mode="aspectFill" class="icon2"></image>
				<text>成人</text>
			</view>
			<view class="cate">
				<image src="../../static/icon/cate3.png" mode="aspectFill" class="icon3"></image>
				<text>周边</text>
			</view>
			<view class="cate">
				<image src="../../static/icon/cate4.png" mode="aspectFill" class="icon4"></image>
				<text>国内</text>
			</view>
			<view class="cate">
				<image src="../../static/icon/cate5.png" mode="aspectFill" class="icon5"></image>
				<text>国际</text>
			</view> -->
		</view>
		<view class="block">
		</view>
		<view class="titles">
			<view class="hot" :class="{'titleActive':titleIndex==0}" @click="changeTitle(0)">热门活动</view>
			<view :class="{'titleActive':titleIndex==1}" @click="changeTitle(1)">最新活动</view>
		</view>
		<view class="list">
			<block v-for="(item,index) in hotActiveList" :key="index">
				<Activity :type="index" @click.native="goDetail(item)" :detail="item"></Activity>
			</block>
		</view>
		<!-- 		</view> -->
		<view class="loginTip" v-if="loginStatus">
			<view class="left">
				<image src="/static/icon/tioIcon.png" mode="aspectFill" class="leftIcon"></image>
				<text>您当前未登入，请登入</text>
			</view>
			<view class="btn">
				去登入
			</view>
		</view>
		<uni-load-more :status="loadStatus"></uni-load-more>
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
				pageNo1:1,
				pageNo2:1,
				pageSize:5,
				loadStatus:'more',
				loginStatus:false,
				addressData:{},
				top: 30,
				height: 32,
				right: 0,
				currentIndex: 0,
				titleIndex: 0,
				showAddTip: false,
				swiperList: ['https://hbimg.huabanimg.com/fafd309bf78db3cc72d851453501cfc74eb45ef150c23-xr5gos_fw658/format/webp',
					'https://hbimg.huabanimg.com/5532df46d645484f3009553eef71931fbfb056d86bc71-qB3y3k_fw658/format/webp',
					'https://hbimg.huabanimg.com/3a3b1760646c6ef34213e43874422267d7bd86102cbf6-nKqPxr_fw658/format/webp'
				],
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
				// this.addressData=getApp().globalData.addressData
				// console.log(getApp().globalData.addressData)
				// this.getActivityList1() //热门
			},400)
		},
		onReachBottom(){
			if(this.loadStatus=="noMore"){
				return
			}
			this.getActivityList1()
		},
		methods: {
			//轮播
			getAdvertList() {
				this.$api.get('/api/static/advertList', {
					params: {
						type: 1
					}
				}).then((res) => {
					//this.swiperList=res.data
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
					this.classList=res.data
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
					res.data.forEach((item)=>{
						item.poster=this.$baseUrl+item.poster
					})
					if(res.data.length>0){
						this.hotActiveList=this.hotActiveList.concat(res.data)
						this.pageNo1++
						if(res.data.length<this.pageSize){
							this.loadStatus="noMore"
						}else{
							this.loadStatus='more'
						}
					}else{
						this.loadStatus="noMore"
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
					url: "/pages/eventsList/eventsList?fIndex="+index
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
