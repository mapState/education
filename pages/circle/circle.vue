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
					<swiper-item v-for="item in 3" :key="item">
						<image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593333346662&di=d4cceef20cedcd44a9c1105a107a1803&imgtype=0&src=http%3A%2F%2Ft8.baidu.com%2Fit%2Fu%3D1484500186%2C1503043093%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1280%26h%3D853"
						 mode="aspectFill" class="itemImg"></image>
					</swiper-item>
				</swiper>
				<view class="dots">
					<view class="dot" v-for="item in 3" :key="item" :class="{'dotActive':item==currentIndex}">

					</view>
				</view>
			</view>
		</view>
		<view class="scroll-view" :style="{top:(top+32)+'px'}">
			<scroll-view class="scroll-view_H" scroll-x="true">
				<view class="list">
					<text class="active" @click="goCourseList">全部</text>
					<text>成长</text>
					<text>家庭</text>
					<text>育儿</text>
					<text>宝妈</text>
					<text>生活</text>
					<text>学习</text>
					<text>篮球</text>
				</view>
			</scroll-view>
		</view>
		<circle-item v-for="item in 2" :key="item"></circle-item>
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
			};
		},
		onLoad() {
			this.top = uni.getMenuButtonBoundingClientRect().top
			this.getCates()
			this.getCircleList()
		},
		methods: {
			getCircleList(){
				this.$api.get('/api/club/getMomentList',{
					params:{
						pageNo:this.pageNo,
						pageSize:this.pageSize,
						type:this.tabIndex1+1
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
				})
			},
			swiperChange(e) {
				this.currentIndex = e.detail.current
			},
			changeTabIndex1(index){
				this.tabIndex1=index
				this.getCircleList()
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
