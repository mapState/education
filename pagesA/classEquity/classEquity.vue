<template>
	<view class="main">
		<view class="nav" :style="{paddingTop:top+'px'}">
			<image src="../../static/icon/left.png" mode="aspectFill" @click="goBack"></image>
			等级权益
		</view>
		<view class="header">
			<swiper class="swiper" previous-margin="90rpx" circular @change="swiperChange">
				<swiper-item class="swiperitem" v-for="(item,index) in gradeList" :key="index">
					<view class="itemBox" :class="{'active':index==swiperIndex}">
						<image :src="item.bgImg" mode="aspectFill" class="bgImg"></image>
						<view class="conten">
							<image src="../static/icon/lock.png" mode="aspectFit" class="lockIcon"></image>
							<view class="name">{{item.name}}</view>
							<view class="desc">
								{{item.desc}}
							</view>
							<view class="income">
								<view class="item">
									<text class="t1">{{item.num1}}%</text>
									<text class="t2">课程分佣</text>
								</view>
								<view class="line">

								</view>
								<view class="item">
									<text class="t1">{{item.num2}}%</text>
									<text class="t2">活动分佣</text>
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="experience">
			<view class="top">
				<text>当前等级</text>
				<view class="up" @click="$refs.popup.open()">
					我要升级
				</view>
				<!-- <view class="up">
					未考试
				</view> -->
			</view>
			<view class="progress-box">
				<progress percent="50" show-info stroke-width="3" activeColor="#FDD30F" backgroundColor="#FEF0AD" :show-info="false" />
			</view>
			<view class="bottom">
				<view class="current">
					<image src="../../static/icon/yk.png" mode="aspectFit"></image>
					<text>会员</text>
				</view>
				<view class="next">
					<image src="../../static/icon/vip.png" mode="aspectFit"></image>
					<text>成为阅读推广师</text>
				</view>
				<view class="jy">
					<text class="t1">经验值</text>
					<text class="t2">2455</text>
					<text class="t3">/6000</text>
				</view>
			</view>
		</view>
		<view class="block">

		</view>
		<view class="titleBox">
			<text></text>
			<view class="">
				购买经验
			</view>
		</view>
		<view class="empiricList">
			<view class="item" v-for="(item,index) in menuList" :key="item" @click="selItem(item.id,item.money)" :class="{'active':selIndex==item.id}">
				<image src="../static/icon/buyem.png" mode="aspectFit" class="selImg" v-if="selIndex==item.id"></image>
				<view class="em">{{item.expValue}}经验</view>
				<view class="line">

				</view>
				<view class="price">
					￥{{item.money/100}}
				</view>
			</view>
		</view>
		<view class="interest">
			<view class="title">
				当前等级权益
			</view>
			<view class="list">
				<view class="item" v-for="item in 4" :key="item">
					<view class="iconBox">

					</view>
					<text class="text">会员标识</text>
				</view>
			</view>
		</view>
		<view class="interest">
			<view class="title">
				升级阅读推广师 <text>获得更多权益</text>
			</view>
			<view class="list">
				<view class="item" v-for="item in 4" :key="item">
					<view class="iconBox">

					</view>
					<text class="text">会员标识</text>
				</view>
			</view>
		</view>
		<view class="payBox" v-if="money!=''">
			<view class="payText">
				<text class="t1">支付：</text>
				<text class="t2">{{money/100}}元</text>
			</view>
			<view class="btn" @click="wxPay">
				经验支付
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="tip">
				<image src="../../static/img/notEnough.png" mode="aspectFill" class="tipImg"></image>
				<text class="upTip">升级成功</text>
				<view class="desc">
					<text>当前已升级成功“{{userInfo.userLevel.name}}”，通过对应考试才能享受等级权益。</text>
				</view>
				<view class="operating">
					<view class="item" @click="$refs.popup.close()">
						取消
					</view>
					<view class="item up" @click="goTest">
						去考试
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				imgUrl: '',
				top: 24,
				swiperIndex: 0,
				//gradeList:[],
				gradeList: [{
					bgImg: '../static/img/grade1.png',
					name: '游客',
					desc: '该等级介绍了在活动报名期间，可以根据等级获取权益',
					num1: 10,
					num2: 10
				}, {
					bgImg: '../static/img/grade2.png',
					name: '营长',
					desc: '该等级介绍了在活动报名期间，可以根据等级获取权益',
					num1: 10,
					num2: 10
				}, {
					bgImg: '../static/img/grade3.png',
					name: '总营长',
					desc: '该等级介绍了在活动报名期间，可以根据等级获取权益',
					num1: 10,
					num2: 10
				}, {
					bgImg: '../static/img/grade4.png',
					name: '阅读推广师',
					desc: '该等级介绍了在活动报名期间，可以根据等级获取权益',
					num1: 10,
					num2: 10
				}, {
					bgImg: '../static/img/grade5.png',
					name: '合伙人',
					desc: '该等级介绍了在活动报名期间，可以根据等级获取权益',
					num1: 10,
					num2: 10
				}],
				selIndex: 0,
				money: '',
				menuList: [],
				userInfo:{}
			};
		},
		onLoad() {
			this.imgUrl = this.$baseUrl
			this.top = uni.getMenuButtonBoundingClientRect().top
			this.getUserLevel()
			this.getMenuList()
			this.getMyInfo()
		},
		methods: {
			getMyInfo(){
				this.$api.get('/api/user/getUserInfo').then((res)=>{
					this.userInfo=res.data
				})
			},
			goTest(){
				this.$refs.popup.close()
				uni.navigateTo({
					url:"/pagesA/test/test?levelId="+this.userInfo.userLevel.id
				})
			},
			//获取经验套餐列表
			getMenuList() {
				this.$api.get('/api/static/getMenuList').then((res) => {
					console.log(res.data)
					this.menuList = res.data
				})
			},
			//获取用户等级
			getUserLevel() {
				this.$api.get('/api/static/userLevel').then((res) => {
					console.log(res.data)
					//this.gradeList=res.data
				})
			},
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			swiperChange(e) {
				this.swiperIndex = e.detail.current;
			},
			selItem(index, money) {
				if (index == this.selIndex) {
					this.selIndex = 0
					this.money = ''
				} else {
					this.selIndex = index
					this.money = money
				}
			},
			wxPay() {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				wx.login({
					success: (res) => {
						if (res.code) {
							this.$api.post('/api/order/wxPay', {
								tableId:this.selIndex,
								userId:uni.getStorageSync('userInfo').id,
								payType:1,
								prayer_id: uni.getStorageSync('paryData').id,
								orderType:5 //类型 1单独购买活动 2活动开团 3活动参团 4课程 5经验
							}).then((s) => {
								let info=s.data
								wx.requestPayment({
									'appId': info.appid,
									'timeStamp': info.timestamp,
									'nonceStr': info.noncestr,
									'package': info.package,
									'signType':'MD5',
									'paySign': info.sign,
									success: (res2) => {
										getApp().globalData.courseData.buyCount++
										uni.showToast({
											title:"支付成功",
											duration:900
										})
										this.$refs.popup.open()
									},
									fail:(err1)=>{
										console.log(err1)
										console.log("支付失败")
										uni.showToast({
											title: '支付失败',
											icon: 'none',
											duration: 1200
										})
									},
									complete: (err2)=>{
										uni.hideLoading();
									}
								})
							})
			
						} else {
							console.log('登录失败！' + res.errMsg)
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
