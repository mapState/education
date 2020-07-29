<template>
	<view class="main">
		<view class="tabs">
			<view class="tab" :class="{'active':tabIndex==index}" @click="changeTabIndex(index)" v-for="(item,index) in tabList" :key="index">
				{{item}}
			</view>
		</view>
		<view class="list">
			<block v-for="item in list" :key="item.id">
				<Activity  @click.native="goPage(item)" :detail="item"></Activity>
			</block>
			<uni-load-more :status="loadStatus"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import Activity from '@/components/Activity.vue';
	export default {
		components:{
			Activity
		},
		data() {
			return {
				tabIndex:0,
				tabList:['全部','报名中','进行中','已结束'],
				list:[],
				pageNo:1,
				pageSize:5,
				loadStatus:"noMore"
			};
		},
		onLoad() {
			this.getList()
		},
		methods:{
			getList(){
				let state=''
				if(this.tabIndex==0){
					state=''
				}else if(this.tabIndex==1){
					state=2
				}else if(this.tabIndex==2){
					state=3
				}else if(this.tabIndex==3){
					state=4
				}
				this.loadStatus="loading"
				this.$api.get('/api/act/getActivityByUser',{
					params:{
						pageNo:this.pageNo,
						pageSize:this.pageSize,
						state
					}
				}).then((res)=>{
					if(res.data.length>0){
						this.list=this.list.concat(res.data)
						this.pageNo++
						if(res.data.length==this.pageSize){
							this.loadStatus="more"
						}else{
							this.loadStatus="noMore"
						}
					}else{
						this.loadStatus="noMore"
					}
				})
			},
			changeTabIndex(index){
				this.tabIndex=index
				this.list=[]
				this.pageNo=1
				this.getList()
			},
			goPage(data){
				getApp().globalData.activeData=data
				uni.navigateTo({
					url:"/pages/activityDetails/activityDetails?buyStatus=1"
				})
			}
		}
	}
</script>

<style lang="scss">
@import './index.scss'
</style>
