<template>
	<view class="main">
		<view class="nav" :style="{paddingTop:top+'px'}">
			<image src="../../static/icon/left.png" mode="aspectFill" @click="goBack"></image>
			<view>等级权益</view>
		</view>
		<view class="header">
			<swiper class="swiper" previous-margin="90rpx" @change="swiperChange">
				<swiper-item class="swiperitem" v-for="(item,index) in gradeList" :key="index">
					<view class="itemBox" :class="{'active':index==swiperIndex}">
						<image :src="item.bgImg" mode="aspectFill" class="bgImg"></image>
						<view class="conten">
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
				<view class="up">
					我要升级
				</view>
			</view>
			<view class="progress-box">
				<progress percent="50" show-info stroke-width="3" activeColor="#FDD30F" backgroundColor="#FEF0AD" :show-info="false"/>
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
			<view class="item" v-for="(item,index) in 6" :key="item" @click="selItem(index)" :class="{'active':selIndex==index}">
				<image src="../static/icon/buyem.png" mode="aspectFit" class="selImg" v-if="selIndex==index"></image>
				<view class="em">100经验</view>
				<view class="line">
					
				</view>
				<view class="price">
					￥15
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
		<view class="payBox">
			<view class="payText">
				<text class="t1">支付：</text>
				<text class="t2">10元</text>
			</view>
			<view class="btn">
				经验支付
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				top: 24,
				swiperIndex: 0,
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
				}],
				selIndex:0
			};
		},
		onLoad() {
			this.top = uni.getMenuButtonBoundingClientRect().top
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			swiperChange(e) {
				this.swiperIndex = e.detail.current;
			},
			selItem(index){
				this.selIndex=index
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
