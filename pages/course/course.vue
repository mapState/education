<template>
	<view class="main">
		<view class="header" :style="{paddingTop:top+'px',height:height+'px'}">
			<view class="input" @click="goSearch">
				<image src="../../static/icon/ss.png" mode="aspectFit" class="icon"></image>
				<text>搜索课程</text>
			</view>
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
		<view class="scroll-view">
			<scroll-view class="scroll-view_H" scroll-x="true" >
				<view class="list">
					<text class="" :class="{'active':index==ageIndex}" v-for="(item,index) in classList" :key="index" @click="changeAgeIndex(index)">{{item.name}}</text>
				</view>
			</scroll-view>
		</view>
		<view class="cates">
			<view class="cate" v-for="(item,index) in classList[ageIndex].dictVoList" :key="index" @click="changeCates(item)">
				<image :src="imgUrl+item.iconUrl" mode="aspectFit" class="icon1"></image>
				<text>{{item.name}}</text>
			</view>
		</view>
		<view class="block">
			
		</view>
		<view class="h2">
			推荐主题
		</view>
		<view class="titleBox">
			<view class="left">
				<text></text>
				<view class="">
					{{cates.name}}
				</view>
			</view>
			<view class="more">
				<text>更多</text>
				<image src="../../static/icon/right2.png" mode="aspectFit"></image>
			</view>
		</view>
		<view class="list">
			<block v-for="(item,index) in courseList" :key="item.id">
				<course-item :detail="item"></course-item>
			</block>
			<uni-load-more :status="loadStatus"></uni-load-more>
		</view>
	<tab-bar :tabIndex="2"></tab-bar>
	</view>
</template>

<script>
	import TabBar from '@/components/TabBar.vue';
	import CourseItem from '@/components/CourseItem.vue';
	export default {
		components:{
			TabBar,
			CourseItem
		},
		data() {
			return {
				loadStatus:'noMore',
				top: 24,
				currentIndex: 0,
				height:32,
				pageSize:5,
				pageNo:1,
				ageIndex:0,
				classList:[],
				courseList:[],
				cates:{},
				imgUrl:''
			};
		},
		onLoad() {
			this.top = uni.getMenuButtonBoundingClientRect().top
			this.height=uni.getMenuButtonBoundingClientRect().height
			this.imgUrl=this.$baseUrl
			console.log(this.height)
			this.getAdvertList()
			
		},
		onShow() {
			this.pageNo=1
			this.courseList=[]
			this.getCates()
		},
		onReachBottom() {
			this.getCourseList()
		},
		methods: {
			changeCates(data){
				this.cates=data
				this.pageNo=1
				this.courseList=[]
				this.getCourseList()
			},
			changeAgeIndex(index){
				this.ageIndex=index
			},
			//获取分类列表
			getCates() {
				this.$api.get('/api/static/dictList',{
					params:{
						type:2 //1.活动分类 2.课程分类 3.绘本分类 4 帖子分类 5消费得积分 6消费得经验
					}
				}).then((res) => {
					console.log(res.data)
					this.classList=res.data
					if(this.classList.length>0){
						if(this.classList[0].dictVoList.length>0){
							this.cates=this.classList[0].dictVoList[0]
						}else{
							this.cates=this.classList[0]
						}
					}
					this.getCourseList()
				})
			},
			getCourseList(){
				let types=[]
				let id = this.cates.id
				if(id){
					types.push(id)
				}
				uni.request({
				    url: this.$rqUrl+'/api/lesson/list',
						method:"POST",
						 header: {
						  'token': uni.getStorageSync('token')
						},
				    data: {
				      pageNo:this.pageNo,
				      pageSize:this.pageSize,
				      types
				    },
				    success: (res) => {
				       if(res.data.data.length>0){
								 this.courseList=res.data.data
								 this.pageNo++
								 if(res.data.data.length==this.pageSize){
									 this.loadStatus="more"
								 }else{
									 this.loadStatus="noMore"
								 }
							 }else{
								 this.loadStatus="noMore"
							 }
				    }
				});
			},
			//轮播
			getAdvertList() {
				this.$api.get('/api/static/advertList', {
					params: {
						type: 3
					}
				}).then((res) => {
					//this.swiperList=res.data
					console.log(res.data)
				})
			},
			swiperChange(e) {
				this.currentIndex = e.detail.current
			},
			goSearch(){
				uni.navigateTo({
					url:"/pages/searchCourses/searchCourses"
				})
			},
			goCourseList(item){
				console.log(item)
				
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
