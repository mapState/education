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
			<view class="more" @click="goMore">
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
				imgUrl:'',
				swiperList:[]
			};
		},
		onLoad() {
			this.top = uni.getMenuButtonBoundingClientRect().top
			this.height=uni.getMenuButtonBoundingClientRect().height
			this.imgUrl=this.$baseUrl
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
						type:3  //	类型 1首页 2圈子 3课程
					}
				}).then((res) => {
					this.swiperList=res.data
					//console.log(res.data)
				})
			},
			goMore(){
				uni.navigateTo({
					url:"/pages/courseList/courseList"
				})
			},
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
					//console.log(res.data)
					let classList=[]
					if(res.data.length>0){
						res.data.forEach((item)=>{
							if(item.pid==0){
								classList.push(item)
							}
						})
						this.classList=classList //一级分类
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
