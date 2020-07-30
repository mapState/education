<template>
	<view class="main">
		<view class="detailTitle">
			<text></text>
			<view class="">
				订购课程
			</view>
		</view>
		<view class="courseList">
			<course-item :detail="detail"></course-item>
		</view>
		<text class="block"></text>
		<view class="detailTitle">
			<text></text>
			<view class="">
				学习内容
			</view>
		</view>
		<view class="giftList">
			<view class="list">
				<scroll-view class="scroll-view_H" scroll-x="true">
					<view class="item" v-for="item in recomedList" :key="item.id">
						<image :src="imgUrl+item.poster" mode="aspectFill"></image>
						<text>{{item.title}}</text>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="detailTitle noBoder">
			<text></text>
			<view class="">
				学习有效期
			</view>
			<view class="other">
				{{detail.studyDay/100}}天
			</view>
		</view>
		<view class="tip">
			时间过期后需要重新订购
		</view>
		<view class="fixedBox">
			<view class="left">
				支付：<text>{{detail.price}}元</text>
			</view>
			<view class="btn" @click="goSuccess">
				订购支付
			</view>
		</view>
	</view>
</template>

<script>
	import CourseItem from '@/components/CourseItem.vue';
	export default {
		components: {
			CourseItem
		},
		data() {
			return {
				imgUrl:'',
				detail:{},
				recomedList:[]
			}
		},
		onLoad() {
			this.imgUrl = this.$baseUrl
			this.detail = getApp().globalData.courseData
			this.getStudyContent()
		},
		methods: {
			getStudyContent() {
				this.$api.get('/api/lesson/getBookListByLessonId', {
					params: {
						lessonId: this.detail.id,
						type: 1
					}
				}).then((res) => {
					this.recomedList = res.data
				})
			},
			goSuccess() {
				this.wxPay()
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
								tableId: this.detail.id,
								userId:uni.getStorageSync('userInfo').id,
								payType:1,
								prayer_id: uni.getStorageSync('paryData').id,
								orderType:4 //类型 1单独购买活动 2活动开团 3活动参团 4课程 5经验
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
										setTimeout(()=>{
											uni.redirectTo({
												url:"/pages/courseBuySuccess/courseBuySuccess"
											})
										},1500)
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
