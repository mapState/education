<template>
	<view class="main">
		<image src="../../static/img/success.png" mode="aspectFit" class="okIcon"></image>
		<text class="tip">订购成功</text>
		<view class="btns">
			<view class="btn left">
				分享课程
			</view>
			<view class="btn" @click="goCourse">
				查看课程
			</view>
		</view>
		<view class="block">
			
		</view>
		<view class="tabs">
			<view class="" :class="{'active':tabIndex==0}"  @click="changeTabIndex(0)">
				推荐课程
			</view>
			<view class="" :class="{'active':tabIndex==1}" @click="changeTabIndex(1)">
				推荐书籍
			</view>
		</view>
		<view class="courseList" v-if="tabIndex==0">
			<CourseItem v-for="item in list1" :key="item.id" :detail="item"></CourseItem>
		</view>
		<view class="bookList" v-if="tabIndex==1">
			<view class="item" v-for="item in list2" :key="item.id">
				<image :src="imgUrl+item.poster" mode="aspectFill"></image>
				<text>{{item.title}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import CourseItem from '@/components/CourseItem.vue';
	export default {
		components:{
			CourseItem
		},
		data() {
			return {
				tabIndex:0,
				list1:[],
				list2:[],
				imgUrl:''
			}
		},
		onLoad() {
			this.imgUrl=this.$baseUrl
			this.detail = getApp().globalData.courseData
			this.getList1()
			this.getList2()
		},
		methods: {
			goCourse(){
				uni.redirectTo({
					url:"/pagesA/studyDetails/studyDetails"
				})
			},
			changeTabIndex(index){
				this.tabIndex=index
			},
			getList1(){
				this.$api.get('/api/lesson/getBookListByLessonId',{
					lessonId:this.detail.id,
					type:2
				}).then((res)=>{
					this.list1=res.data
				})
			},
			getList2(){
				this.$api.get('/api/lesson/getBookListByLessonId',{
					lessonId:this.detail.id,
					type:3
				}).then((res)=>{
					this.list2=res.data
				})
			}
		}
	}
</script>

<style lang="scss">
@import './index.scss'
</style>
