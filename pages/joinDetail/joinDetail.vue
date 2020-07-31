<template>
	<view class="main">
		<view class="acList">
			<Activity :detail="activeData"></Activity>
		</view>
		<template v-if="buyType==3">
			<view class="block">
			</view>
			<view class="titleBox">
				<text></text>
				<view class="">
					参团人员
				</view>
			</view>
			<view class="joinPeople">
				<view class="item" v-for="(item,index) in activityTeamList.memberList" :key="index">
					<view class="avatarBox">
						<image :src="item.avatar" mode="aspectFill" class="avatar"></image>
						<image src="../../static/img/Identity.png" mode="aspectFit" class="idenImg" v-if="index==0"></image>
						<text v-if="index==0">团长</text>
						<image src="../../static/icon/jia.png" mode="aspectFit" class="addIcon" v-if="(index+1)!=activityTeamList.memberList.length"></image>
					</view>
					<text class="name">{{item.name}}</text>
				</view>
			</view>
		</template>
		<view class="block">

		</view>
		<view class="titleBox">
			<text></text>
			<view class="">
				报名信息
			</view>
		</view>
		<view class="form">
			<view class="row">
				<text class="title">姓名：</text>
				<input class="input" focus placeholder="请填写报名人姓名" placeholder-class="plClass" v-model="name" />
			</view>
			<view class="row">
				<text class="title">电话：</text>
				<input class="input" focus placeholder="请填写报名人电话" placeholder-class="plClass" v-model="phone" />
			</view>
			<view class="row">
				<text class="title">性别：</text>
				<picker @change="bindPickerChange" :value="sex" :range="array">
					<view class="input sexInput">{{array[sex]}}</view>
				</picker>
			</view>

			<view class="row">
				<text class="title">年龄：</text>
				<input class="input" focus placeholder="请填写报名人年龄" placeholder-class="plClass" v-model="age" />
			</view>
			<view class="row br">
				<text class="title">所在地：</text>
				<input class="input" focus placeholder="请填写报名人所在地" placeholder-class="plClass" v-model="address" />
				<image src="../../static/icon/pdw.png" mode="aspectFit" class="icon" @click="gotomapLocation"></image>
			</view>
		</view>
		<view class="block2">

		</view>
		<view class="payBox">
			<view class="price">支付{{buyType==1?'开团':(buyType==2?'单人':'参团')}}价：<text>{{activeData.personalPrice/100}}</text></view>
			<view class="btn" @click="goSuccess">
				支付
			</view>
		</view>
	</view>
</template>

<script>
	import Activity from '@/components/Activity.vue'
	export default {
		components: {
			Activity
		},
		data() {
			return {
				array: ['女', '男'],
				activeData: {},
				buyType: 2, //1开团 2单独购买 3参团
				address: '',
				age: '',
				name: '',
				phone: '',
				sex:0,
				activityTeamList:{}
			};
		},
		onLoad(params) {
			this.activityTeamList=getApp().globalData.activityTeamList
			this.activeData = getApp().globalData.activeData
			this.buyType = params.type ? params.type : 2
		},
		methods: {
			gotomapLocation(){//选取位置
				wx.chooseLocation({
					success: (res)=>{
						this.address=res.address
						console.log(res)
					}
				})
			},
			bindPickerChange: function(e) {
				this.sex = e.target.value
			},
			goSuccess() {  
				if(this.name==''||this.phone==''||this.address==''||this.age==''){
					uni.showToast({
						title:"内容不能为空",
						icon:'none'
					})
					return
				}
				// buyType 1单独购买活动 2活动开团 3活动参团 4课程 5经验
				let buyType = ''
				let ktType=''
				if (this.buyType == 1) {
					buyType = 2
				} else if (this.buyType == 2) {
					buyType = 1
				} else if (this.buyType == 3) {
					buyType = 3
				}
				if(this.buyType==3){//组队购买
					console.log('组队拼团')
					this.joinGroup(this.activityTeamList.id)  //activityTeamId
				}else{
					if(this.buyType==1){
						this.sendInfo1(buyType, 1)
					}else{
						this.sendInfo1(buyType, 2)
					}
					
				}
				
			},
			//组队开团
			joinGroup(activityTeamId){
				this.$api.post('/api/team/join', {
					activityTeamId,
					userId: uni.getStorageSync('userInfo').id,
					activityId:this.activeData.id,
					address: this.address,
					age: this.age,
					name: this.name,
					phone: this.phone,
					sex:this.sex
				}).then((kt)=>{
					this.wxPay(3,kt.data.id)
				})
			},
			//开团 1拼团 2单独购买
			sendInfo1(buyType, type) {
				this.$api.post('/api/team/start', {
					userId: uni.getStorageSync('userInfo').id,
					type,
					activityId:this.activeData.id,
					teamMember:{
						activityId: this.activeData.id,
						address: this.address,
						age: this.age,
						name: this.name,
						phone: this.phone,
						sex:this.sex
					}
				}).then((kt) => {
					this.wxPay(buyType,kt.data.id)
				})
			},
			wxPay(orderType,tableId) {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				wx.login({
					success: (res) => {
						if (res.code) {
							this.$api.post('/api/order/wxPay', {
								tableId,
								userId: uni.getStorageSync('userInfo').id,
								payType: 1,
								prayer_id: uni.getStorageSync('paryData').id,
								orderType //类型 1单独购买活动 2活动开团 3活动参团 4课程 5经验
							}).then((s) => {
								let info = s.data
								wx.requestPayment({
									'appId': info.appid,
									'timeStamp': info.timestamp,
									'nonceStr': info.noncestr,
									'package': info.package,
									'signType': 'MD5',
									'paySign': info.sign,
									success: (res2) => {
										uni.showToast({
											title: "支付成功",
											duration: 900
										})
										setTimeout(() => {
											uni.redirectTo({
												url: "/pages/successful/successful"
											})
										}, 1500)
									},
									fail: (err1) => {
										console.log(err1)
										console.log("支付失败")
										uni.showToast({
											title: '支付失败',
											icon: 'none',
											duration: 1200
										})
									},
									complete: (err2) => {
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
