<template>
	<view class="main">
		<view class="tabs">
			<view class="tab" :class="{'active':tabIndex==index}" @click="changeTabIndex(index)" v-for="(item,index) in tabList" :key="index">
				{{item}}
			</view>
		</view>
		<view class="list" v-if="tabIndex==0">
			<view class="item" @click="goPage(1)">
				<image src="https://hbimg.huabanimg.com/afc6085a1964e84263c6b95fcf374473b33ba9ae1c43d2-yI7y1s_fw658/format/webp" mode="aspectFill"
				 class="leftImg"></image>
				<view class="right">
					<view class="row">
						<text class="t1">杭州小记者内蒙古宁夏夏令营梦幻迪士尼，亲子活动</text>
					</view>
					<view class="row">
						<text class="time">2020-10-20 20:20</text>
					</view>
					<view class="bottom">
						<view class="tags">
							<text class="tag">夏令营</text>
						</view>
						<view class="btn1">
							审核中
						</view>
						<view class="btn2" v-if="false">
							失败
						</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="loadStatus1"></uni-load-more>
		</view>
		<view class="list" v-if="tabIndex==1">
			<view class="item" @click="goPage(2)">
				<image src="https://hbimg.huabanimg.com/afc6085a1964e84263c6b95fcf374473b33ba9ae1c43d2-yI7y1s_fw658/format/webp" mode="aspectFill"
				 class="leftImg"></image>
				<view class="right">
					<view class="row">
						<text class="t1">杭州小记者内蒙古宁夏夏令营梦幻迪士尼，亲子活动</text>
					</view>
					<view class="row">
						<text class="time">2020-10-20 20:20</text>
					</view>
					<view class="bottom">
						<view class="tags">
							<text class="tag">夏令营</text>
						</view>
						<view class="btn1" v-if="false">
							审核中
						</view>
						<view class="btn2">
							失败
						</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="loadStatus2"></uni-load-more>
		</view>
		<view class="passList" v-if="tabIndex==2">
			<view class="tabs">
				<view class="tab tabActive">
					全部
				</view>
				<view class="tab">
					未开始
				</view>
				<view class="tab">
					报名中
				</view>
				<view class="tab">
					进行中
				</view>
				<view class="tab">
					已结束
				</view>
			</view>
			<block v-for="(item,index) in 4" :key="index">
				<Activity  @click.native="goDetail" :detail="item"></Activity>
			</block>
			<uni-load-more :status="loadStatus3"></uni-load-more>
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
				tabList:['审核中','审核失败','审核通过'],
				loadStatus1:'more',
				loadStatus2:'more',
				loadStatus3:'more',
				pageNo1:1,
				pageNo2:1,
				pageNo3:1,
				pageSize:5,
				list1:[],
				list2:[],
				list3:[]
			};
		},
		onLoad() {
			this.getList1()
		},
		methods:{
			//审核中
			getList1(){
				this.loadStatus1="loading"
				this.$api.get('/api/act/getPublishActivityByUser',{
					params:{
						pageNo:this.pageNo1,
						pageSize:this.pageSize,
						passStatus:1,//审核状态 (0为平台创建,1未审核 2审核拒绝 3审核成功)
					}
				}).then((res)=>{
					if(res.data.length>0){
						this.list1=this.list1.concat(res.data)
						this.pageNo1++
						this.loadStatus1="more"
					}else{
						this.loadStatus1="noMore"
					}
				})
			},
			getList2(){
				this.loadStatus2="loading"
				this.$api.get('/api/act/getPublishActivityByUser',{
					params:{
						pageNo:this.pageNo2,
						pageSize:this.pageSize,
						passStatus:2,//审核状态 (0为平台创建,1未审核 2审核拒绝 3审核成功)
					}
				}).then((res)=>{
					if(res.data.length>0){
						this.list2=this.list2.concat(res.data)
						this.pageNo2++
						this.loadStatus2="more"
					}else{
						this.loadStatus2="noMore"
					}
				})
			},
			getList3(){
				this.loadStatus3="loading"
				this.$api.get('/api/act/getPublishActivityByUser',{
					params:{
						pageNo:this.pageNo3,
						pageSize:this.pageSize,
						passStatus:3,//审核状态 (0为平台创建,1未审核 2审核拒绝 3审核成功)
					}
				}).then((res)=>{
					if(res.data.length>0){
						this.list3=this.list3.concat(res.data)
						this.pageNo3++
						this.loadStatus3="more"
					}else{
						this.loadStatus3="noMore"
					}
				})
			},
			changeTabIndex(index){
				if(index==0&&this.list1.length<=0){
					this.getList1()
				}
				if(index==1&&this.list2.length<=0){
					this.getList2()
				}
				if(index==2&&this.list3.length<=0){
					this.getList3()
				}
				this.tabIndex=index
			},
			goPage(type){
				//1审核中 2失败
				uni.navigateTo({
					url:"/pagesA/addActivity/addActivity?type="+type
				})
			},
			goDetail(){
				uni.navigateTo({
					url:'/pages/activityDetails/activityDetails'
				})
			}
		}
	}
</script>

<style lang="scss">
@import './index.scss'
</style>
