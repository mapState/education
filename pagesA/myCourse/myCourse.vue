<template>
	<view class="main">
		<view class="tabs">
			<view class="tab" :class="{'active':tabIndex==index}" @click="changeTabIndex(index)" v-for="(item,index) in tabList" :key="index">
				{{item}}
			</view>
		</view>
		<view class="list" v-if="tabIndex==0">
			<block v-for="item in allList" :key="item.id">
				<myCourse :detail="item"></myCourse>
			</block>
			<uni-load-more :status="loadStatus1"></uni-load-more>
		</view>
		<view class="list" v-if="tabIndex==1">
			<block v-for="item in allList" :key="item.id">
				<myCourse :detail="item"></myCourse>
			</block>
			<uni-load-more :status="loadStatus2"></uni-load-more>
		</view>
		<view class="list" v-if="tabIndex==2">
			<block v-for="item in allList" :key="item.id">
				<myCourse :detail="item"></myCourse>
			</block>
			<uni-load-more :status="loadStatus3"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import myCourse from '@/components/myCourse.vue';
	export default {
		components:{
			myCourse
		},
		data() {
			return {
				tabIndex:0,
				tabList:['全部','有效','失效'],
				pageNo1:1,
				loadStatus1:'more',
				pageNo2:1,
				loadStatus2:'more',
				pageNo3:1,
				loadStatus3:'more',
				allList:[],
				effList:[],
				lostList:[],
				tagList:[],
				classList:[]
			};
		},
		onLoad() {
			this.getListAll()
		},
		onReachBottom(){
			if(this.tabIndex==0){
				this.getListAll()
			}else if(this.tabIndex==1){
				this.getListEff()
			}else{
				this.getListLost()
			}
		},
		methods:{
			changeTabIndex(index){
				this.tabIndex=index
				if(index==0&&this.allList.length==0){
					this.getListAll()
				}
				if(index==1&&this.effList.length==0){
					this.getListEff()
				}
				if(index==2&&this.lostList.length==0){
					this.getListLost()
				}
			},
			getListAll(){
				this.loadStatus1="loading"
				this.$api.get('/api/lesson/getLessonByUser',{
					params:{
						pageNo:this.pageNo1,
						pageSize:5
					}
				}).then((res)=>{
					if(res.data.length>0){
						res.data.forEach((course)=>{
							let pid=''
							let tagList=[]
							this.classList.forEach((item)=>{
								if(item.id==course.typeId){
									tagList.push(item.name)
									pid=item.pid
								}
							})
							this.classList.forEach((item)=>{
								if(item.id==pid){
									tagList.push(item.name)
								}
							})
							course.tagList=tagList
						})

						this.allList=this.allList.concat(res.data)
						this.pageNo1++
					}else{
						this.loadStatus1="noMore"
					}
				})
			},
			getListEff(){
				this.loadStatus2="loading"
				this.$api.get('/api/lesson/getLessonByUser',{
					params:{
						pageNo:this.pageNo2,
						pageSize:5,
						status:1 //0删除 1正常
					}
				}).then((res)=>{
					if(res.data.length>0){
						res.data.forEach((course)=>{
							let pid=''
							let tagList=[]
							this.classList.forEach((item)=>{
								if(item.id==course.typeId){
									tagList.push(item.name)
									pid=item.pid
								}
							})
							this.classList.forEach((item)=>{
								if(item.id==pid){
									tagList.push(item.name)
								}
							})
							course.tagList=tagList
						})
						this.effList=this.effList.concat(res.data)
						this.loadStatus2="more"
						this.pageNo2++
					}else{
						this.loadStatus2="noMore"
					}
				})
			},
			getListLost(){
				this.loadStatus3="loading"
				this.$api.get('/api/lesson/getLessonByUser',{
					params:{
						pageNo:this.pageNo3,
						pageSize:5,
						status:0 //0删除 1正常
					}
				}).then((res)=>{
					if(res.data.length>0){
						res.data.forEach((course)=>{
							let pid=''
							let tagList=[]
							this.classList.forEach((item)=>{
								if(item.id==course.typeId){
									tagList.push(item.name)
									pid=item.pid
								}
							})
							this.classList.forEach((item)=>{
								if(item.id==pid){
									tagList.push(item.name)
								}
							})
							course.tagList=tagList
						})
						this.lostList=this.lostList.concat(res.data)
						this.loadStatus3="more"
						this.pageNo3++
					}else{
						this.loadStatus3="noMore"
					}
				})
			},
		}
	}
</script>

<style lang="scss">
@import './index.scss'
</style>
