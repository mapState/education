<template>
	<view class="main">
			<view class="tabs">
				<view class="tab" :class="{'active':tabIndex==0}" @click="changeTabIndex(0)">
					活动收藏
				</view>
				<view class="tab" :class="{'active':tabIndex==1}" @click="changeTabIndex(1)">
					课程收藏
				</view>
			</view>
			<view class="list" v-if="tabIndex==0">
				<block v-for="item in list1" :key="item.id">
					<Activity :detail="item"></Activity>
				</block>
				<!-- <uni-load-more :status="loadStatus1"></uni-load-more> -->
			</view>
			<view class="list" v-if="tabIndex==1">
				<course-item v-for="item in list2" :key="item.id" :detail="item"></course-item>
				<!-- <uni-load-more :status="loadStatus2"></uni-load-more> -->
			</view>
	</view>
</template>

<script>
	import Activity from '@/components/Activity.vue';
	import CourseItem from '@/components/CourseItem.vue';
	export default {
		components: {
			Activity,
			CourseItem
		},
		data() {
			return {
				tabIndex:0,
				list1:[],
				loadStatus1:'more',
				list2:[],
				loadStatus2:'more'
			}
		},
		// onReachBottom() {
		// 	//this.getList()
		// },
		onLoad() {
			this.getList()
		},
		methods: {
			changeTabIndex(index){
				this.tabIndex=index
				this.getList()
			},
			getList(){
				this.tabIndex==0?this.loadStatus1='loading':this.loadStatus2='loading'
				this.$api.get('/api/view/storeList',{
					params:{
						type:this.tabIndex+1,
						userId:uni.getStorageSync('userInfo').id
					}
				}).then((res)=>{
					if(res.data.length>0){
						if(this.tabIndex==0){
							this.list1=res.data
						}else{
							this.list2=res.data
						}
						this.tabIndex==0?this.loadStatus1='more':this.loadStatus2='more'
					}else{
						this.tabIndex==0?this.loadStatus1='noMore':this.loadStatus2='noMore'
					}
				})
			},
		}
	}
</script>

<style lang="scss">
@import './index.scss'
</style>
