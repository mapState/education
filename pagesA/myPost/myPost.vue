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
				<Activity :type="index"></Activity>
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
				tabList:['审核中','审核失败','审核通过']
			};
		},
		methods:{
			changeTabIndex(index){
				this.tabIndex=index
			},
			goPage(type){
				//1审核中 2失败
				uni.navigateTo({
					url:"/pagesA/addActivity/addActivity?type="+type
				})
			}
		}
	}
</script>

<style lang="scss">
@import './index.scss'
</style>
