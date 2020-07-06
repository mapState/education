<template>
	<view class="main">
		<view class="tabs">
			<view class="tab" :class="{'active':tabIndex==index}" @click="changeTabIndex(index)" v-for="(item,index) in tabList" :key="index">
				{{item}}
			</view>
		</view>
		<view class="list">
			<block v-for="(item,index) in 4" :key="index">
				<Activity :type="index" @click.native="goPage(index)"></Activity>
			</block>
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
				tabList:['全部','报名中','进行中','已结束']
			};
		},
		methods:{
			changeTabIndex(index){
				this.tabIndex=index
			},
			goPage(index){
				let type=0
				if(index==0){
					type=1
				}else if(index==1){
					type=2
				}else if(index==2){
					type=3
				}else if(index==3){
					type=4
				}
				uni.navigateTo({
					url:"/pages/activityDetails/activityDetails?type="+type
				})
			}
		}
	}
</script>

<style lang="scss">
@import './index.scss'
</style>
