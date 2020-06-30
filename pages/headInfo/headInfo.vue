<template>
	<view class="main">
		<view class="realnav" :style="{paddingTop:top+'px'}" v-show="scrollTop>=40">
			<image src="/static/icon/bk.png" mode="aspectFit" @click="goBack"></image>
			<text>团长主页</text>
		</view>
		<view class="header">
			<view class="mask">
				
			</view>
			<view class="nav" :style="{top:top+'px'}">
				<image src="../../static/icon/left.png" mode="aspectFill" class="left" @click="goBack"></image>
				<text>团长主页</text>
			</view>
			<view class="avaBox">
				<image src="../../static/2.jpg" mode="aspectFit"></image>
				<text>新禧</text>
			</view>
		</view>
		<view class="tabs">
			<text @click="changeIndex(0)" :class="{'tabActive':tabIndex==0}">基础信息</text>
			<text @click="changeIndex(1)" :class="{'tabActive':tabIndex==1}">成长经历</text>
		</view>
		<view class="info" v-if="tabIndex==0">
			<view class="row">
				<text class="title">团长位置</text>
				<view class="detail">
					<image src="../../static/icon/pdw.png" mode="aspectFit" class="icon"></image>
					<text>杭州市江干区九堡华侨国际</text>
				</view>
			</view>
			<view class="row">
				<text class="title">距离团长</text>
				<view class="detail">
					<text>1122.km</text>
				</view>
			</view>
			<view class="row">
				<text class="title">真实姓名</text>
				<view class="detail">
					<text>1122.km</text>
				</view>
			</view>
			<view class="row">
				<text class="title">用户等级</text>
				<view class="detail">
					<text>1122.km</text>
				</view>
			</view>
			<view class="book">
				<text class="title">等级证书</text>
				<view class="bookList">
					<image src="../../static/1.jpg" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view class="experience" v-if="tabIndex==1&&show">
			<view class="item" v-for="item in 2" :key="item">
				<image src="../../static/icon/time.png" mode="aspectFit" class="timeIcon"></image>
				<text class="time">2020-06-02 19:19</text>
				<text class="topic">#参加活动#</text>
				<view class="detail">
					<image src="../../static/1.jpg" mode="aspectFit" class="deImg"></image>
					<view class="right">
						<text>杭州体育馆夏季儿童运动会，亲子活动</text>
						<view class="tags">
							<view class="tag">
								夏令营
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="item">
				<image src="../../static/icon/time.png" mode="aspectFit" class="timeIcon"></image>
				<text class="time">2020-06-02 19:19</text>
				<text class="topic">#参加活动#</text>
				<view class="desc">
					这样带娃简直是“作死”，婆婆妈妈们经常这样做，
					你家娃中招了吗？
				</view>
				<view class="imgs">
					<image src="../../static/1.jpg" mode="aspectFill"></image>
					<image src="../../static/1.jpg" mode="aspectFill"></image>
					<image src="../../static/1.jpg" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<!-- <view class="" v-if="tabIndex==1&&show==false">
			<image src="" mode=""></image>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				top:22,
				tabIndex:0,
				scrollTop:0,
				show:true
			};
		},
		onLoad() {
			this.top = uni.getMenuButtonBoundingClientRect().top
		},
		methods:{
			onPageScroll(e){
				this.scrollTop=e.scrollTop
			},
			changeIndex(index){
				this.tabIndex=index
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss">
@import  './index.scss'
</style>
