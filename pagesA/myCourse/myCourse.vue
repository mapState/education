<template>
	<view class="main">
		<view class="tabs">
			<view class="tab" :class="{'active':tabIndex==index}" @click="changeTabIndex(index)" v-for="(item,index) in tabList" :key="index">
				{{item}}
			</view>
		</view>
		<view class="list" v-if="tabIndex==0">
			<view class="item">
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
				loadStatus3:'more'
			};
		},
		onLoad() {
			this.getListAll()
		},
		onReachBottom(){
			if(this.tabIndex==0){
				
			}else if(this.tabIndex==1){
				
			}else{
				
			}
		},
		methods:{
			changeTabIndex(index){
				this.tabIndex=index
			},
			getListAll(){
				this.$api.get('/api/lesson/getLessonByUser',{
					params:{
						pageNo:this.pageNo,
						pageSize:5
					}
				}).then((res)=>{
					if(res.data.length>0){
						this.allList=this.allList.concat(res.data)
					}else{
						
					}
				})
			},
		}
	}
</script>

<style lang="scss">
@import './index.scss'
</style>
