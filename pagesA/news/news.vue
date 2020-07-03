<template>
	<view class="main">
		<view class="tabs">
			<view class="tab" :class="{'active':tabIndex==index}" @click="changeTabIndex(index)" v-for="(item,index) in tabList" :key="index">
				{{item}}
			</view>
		</view>
		<view class="newsList">
			<view class="new" v-for="item in 3" :key="item">
				<image src="../static/icon/new-tz.png" mode="aspectFit" class="icon" v-if="item==0"></image>
				<image src="../static/icon/new-dz.png" mode="aspectFit" class="icon" v-if="item==1"></image>
				<image src="../static/icon/new-qz.png" mode="aspectFit" class="icon" v-if="item==2"></image>
				<view class="detail">
					<text class="t1">
						活动报名成功通知
					</text>
					<text class="t2">
						亲子活动已经报名成功
					</text>
					<text class="time">
						2019-12-26 15:36:24
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex:0,
				tabList:['全部消息','系统消息','点赞消息','评论消息']
			};
		},
		methods:{
			changeTabIndex(index){
				this.tabIndex=index
			}
		}
	}
</script>

<style lang="scss">
@import './index.scss'
</style>
