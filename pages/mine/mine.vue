<template>
	<view class="main">
		<view class="header" :style="{paddingTop:top+'px'}">
			<view class="title">我的</view>
		</view>
		<view class="info">
			<view class="content">
				<view class="noLogin" v-if="isLogin==false" @click="isLogin=true">
					<view class="imgBox">
						<image src="../../static/icon/mine/noLogin.png" mode="aspectFit"></image>
					</view>
					<text>授权登入</text>
				</view>
				<view class="top" v-else>
					<image src="../../static/1.jpg" mode="aspectFill" class="avatar"></image>
					<view class="right">
						<view class="row">
							<text class="name">name</text>
							<text class="up">去升级？</text>
						</view>
						<view class="line">
							<text></text>
						</view>
						<view class="detail">
							<view class="item">
								<image src="../../static/icon/yk.png" mode="aspectFit" class="ykIcon"></image>
								<text class="text">游客</text>
							</view>
							<view class="item">
								<image src="../../static/icon/vip.png" mode="aspectFit" class="vipIcon"></image>
								<text class="text">成为会员</text>
							</view>
							<view class="item">
								<text class="">经验值</text>
								<text class="jyNum">1245</text>
								<text>/6000</text>
							</view>
						</view>
					</view>
				</view>
				<view class="bottom">
					<view class="item" @click="goCommission">
						<text class="count">1653</text>
						<text class="desc">我的佣金</text>
					</view>
					<view class="item" @click="goIntegral">
						<text class="count">124</text>
						<text class="desc">会员积分</text>
					</view>
					<view class="item" @click="goCollect">
						<text class="count">1653</text>
						<text class="desc">我的收藏</text>
					</view>
				</view>
			</view>
		</view>
		<view class="ad">
			<image src="../../static/icon/medal.png" mode="aspectFit" class="icon"></image>
			<view class="detail">
				<text class="t1">会员学院</text>
				<text class="t2">参与会员学院学习，获得更多权益</text>
			</view>
			<view class="btn"  @click="goSchool">
				立即学习
			</view>
		</view>
		<view class="titleBox">
			我的工具
		</view>
		<view class="moduleList">
			<view class="item" v-for="(item,index) in iconText" :key="index" @click="goPage(index)">
				<view class="iconbox">
					<text class="msgNum" v-if="index==0">3</text>
					<text class="hb" v-if="index==8">火爆</text>
					<image :src="'../../static/icon/mine/icon'+(index+1)+'.png'" mode="aspectFit"></image>
				</view>
				<text>{{item}}</text>
			</view>
		</view>
		<tab-bar :tabIndex="4"></tab-bar>
	</view>
</template>

<script>
	import TabBar from '@/components/TabBar.vue'
	export default {
		components: {
			TabBar
		},
		data() {
			return {
				isLogin:false,
				top:24,
				iconText:['我的消息','我的课程','我的报名','我的成长','我的发布','我的动态','我的团队',
					'等级权益','推广赚钱','联系客服','常见问题','其他'
				]
			};
		},
		onLoad() {
			this.top=uni.getMenuButtonBoundingClientRect().top
		},
		methods:{
			goIntegral(){
				uni.navigateTo({
					url:"/pages/integral/integral"
				})
			},
			goCommission(){
				uni.navigateTo({
					url:"/pages/commission/commission"
				})
			},
			goSchool(){
				uni.navigateTo({
					url:"/pagesA/memberSchool/memberSchool"
				})
			},
			goPage(index){
				switch(index){
					case 0:
					uni.navigateTo({
						url:"/pagesA/news/news"
					})
					break;
					case 1:
					uni.navigateTo({
						url:"/pagesA/myCourse/myCourse"
					})
					break;
					case 2:
					uni.navigateTo({
						url:"/pagesA/mySignUp/mySignUp"
					})
					break;
					case 3:
					uni.navigateTo({
						url:"/pagesA/myGrowth/myGrowth"
					})
					break;
					case 4:
					uni.navigateTo({
						url:"/pagesA/myPost/myPost"
					})
					break;
					case 5:
					uni.navigateTo({
						url:"/pagesA/myActivity/myActivity"
					})
					break;
					case 6:
					uni.navigateTo({
						url:"/pagesA/mytTeam/mytTeam"
					})
					break;
					case 7:
					uni.navigateTo({
						url:"/pagesA/classEquity/classEquity"
					})
					break;
					case 8:
					uni.navigateTo({
						url:"/pagesA/makeMoney/makeMoney"
					})
					break;
					case 9:
					uni.makePhoneCall({
					    phoneNumber: '111'
					});
					break;
					case 10:
					uni.navigateTo({
						url:"/pagesA/issue/issue"
					})
					break;
					case 11:
					uni.navigateTo({
						url:"/pagesA/other/other"
					})
					break;
				}
			},
			goCollect(){
				uni.navigateTo({
					url:"/pagesA/myCollect/myCollect"
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
