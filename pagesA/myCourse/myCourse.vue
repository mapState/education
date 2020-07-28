<template>
	<view class="main">
		<view class="tabs">
			<view class="tab" :class="{'active':tabIndex==index}" @click="changeTabIndex(index)" v-for="(item,index) in tabList" :key="index">
				{{item}}
			</view>
		</view>
		<view class="list" v-if="tabIndex==0">
			<view class="item" v-for="item in allList" :key="item.id">
				<view class="courseImg">
					<text v-if="item==0" class="yx">有效</text>
					<text v-if="item==1" class="yx sx">失效</text>
					<image src="https://hbimg.huabanimg.com/a0ca655c84991202c83bfb8110ee4480873d5899299ba-6voOiU_fw658/format/webp" mode="aspectFill" class="img"></image>
				</view>
				<view class="right">
					<text class="t1">0-3岁小孩习惯培养课程大礼包，从小培养计划</text>
					<view class="tags">
						<view class="tag">
							0-3岁
						</view>
						<view class="tag">
							行为习惯
						</view>
					</view>
					<view class="time">
						到时时间：2020-06-26 20:30
					</view>
				</view>
			</view>
			<uni-load-more :status="loadStatus1"></uni-load-more>
		</view>
		<view class="list" v-if="tabIndex==1">
			<view class="item" v-for="item in effList" :key="item.id">
				<view class="courseImg">
					<text v-if="item.status==1" class="yx">有效</text>
					<text v-else class="yx sx">失效</text>
					<image src="https://hbimg.huabanimg.com/a0ca655c84991202c83bfb8110ee4480873d5899299ba-6voOiU_fw658/format/webp" mode="aspectFill" class="img"></image>
				</view>
				<view class="right">
					<text class="t1">{{item.title}}</text>
					<view class="tags">
						<view class="tag">
							0-3岁
						</view>
					</view>
					<view class="time">
						到期时间：2020-06-26 20:30
					</view>
				</view>
			</view>
			<uni-load-more :status="loadStatus2"></uni-load-more>
		</view>
		<view class="list" v-if="tabIndex==2">
			<view class="item" v-for="item in lostList" :key="item.id">
				<view class="courseImg">
					<text v-if="item==0" class="yx">有效</text>
					<text v-if="item==1" class="yx sx">失效</text>
					<image src="https://hbimg.huabanimg.com/a0ca655c84991202c83bfb8110ee4480873d5899299ba-6voOiU_fw658/format/webp" mode="aspectFill" class="img"></image>
				</view>
				<view class="right">
					<text class="t1">0-3岁小孩习惯培养课程大礼包，从小培养计划</text>
					<view class="tags">
						<view class="tag">
							0-3岁
						</view>
						<view class="tag">
							行为习惯
						</view>
					</view>
					<view class="time">
						到时时间：2020-06-26 20:30
					</view>
				</view>
			</view>
			<uni-load-more :status="loadStatus3"></uni-load-more>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex:0,
				tabList:['全部','有效(1)','失效(10)'],
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
			this.getCates()
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
			getCates() {
				this.$api.get('/api/static/dictList',{
					params:{
						type:2 //1.活动分类 2.课程分类 3.绘本分类 4 帖子分类 5消费得积分 6消费得经验
					}
				}).then((res) => {
					this.classList=res.data
					this.getListAll()
				})
			},
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
