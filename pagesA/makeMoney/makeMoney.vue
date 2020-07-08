<template>
	<view class="main">
		<view class="tabs">
			<view class="tab" :class="{'active':tabIndex==index}" @click="changeTabIndex(index)" v-for="(item,index) in tabList" :key="index">
				{{item}}
			</view>
		</view>
		<view class="main list1" v-if="tabIndex==0">
			<image src="https://hbimg.huabanimg.com/c7c56af20e6de24ad7c94000e8639c6d0e7c62fa82a5c-h5cSEE_fw658/format/webp" mode="aspectFill" class="adImg"></image>
			<view class="item">
				<image src="../static/icon/Promote1.png" mode="aspectFill"></image>
				<view class="desc">
					<view class="t1">
						推广一个会员
					</view>
					<view class="t2">
						可赚<text>￥210</text>
					</view>
				</view>
				<view class="btn">
					邀请
				</view>
			</view>
			<view class="item">
				<image src="../static/icon/Promote2.png" mode="aspectFill"></image>
				<view class="desc">
					<view class="t1">
						推广一个阅读推广师
					</view>
					<view class="t2">
						可赚<text>￥210</text>
					</view>
				</view>
				<view class="btn">
					邀请
				</view>
			</view>
			<view class="item">
				<image src="../static/icon/Promote3.png" mode="aspectFill"></image>
				<view class="desc">
					<view class="t1">
						推广一个营长
					</view>
					<view class="t2">
						可赚<text>￥210</text>
					</view>
				</view>
				<view class="btn">
					邀请
				</view>
			</view>
			<view class="item">
				<image src="../static/icon/Promote4.png" mode="aspectFill"></image>
				<view class="desc">
					<view class="t1">
						推广一个总营长
					</view>
					<view class="t2">
						可赚<text>￥210</text>
					</view>
				</view>
				<view class="btn">
					邀请
				</view>
			</view>
		</view>
		<view class="main list2" v-if="tabIndex==1">
			<image src="https://hbimg.huabanimg.com/c7c56af20e6de24ad7c94000e8639c6d0e7c62fa82a5c-h5cSEE_fw658/format/webp" mode="aspectFill" class="adImg"></image>
			<view class="item" v-for="item in 3" :key="item">
				<image src="../../static/1.jpg" mode="aspectFill" class="leftImg"></image>
				<view class="right">
					<view class="t1">
						杭州小记者内蒙古宁夏夏令营梦幻迪士尼，亲子活动
					</view>
					<view class="row">
						<view class="t1">￥<text>119</text></view>
						<view class="btn">
							预计得<text>￥3099.69</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="main list2" v-if="tabIndex==2">
			<image src="https://hbimg.huabanimg.com/c7c56af20e6de24ad7c94000e8639c6d0e7c62fa82a5c-h5cSEE_fw658/format/webp" mode="aspectFill" class="adImg"></image>
			<view class="item" v-for="item in 3" :key="item">
				<image src="../../static/1.jpg" mode="aspectFill" class="leftImg"></image>
				<view class="right">
					<view class="t1">
						0-3岁小孩习惯培养课程大礼包，从小培养计划
					</view>
					<view class="row">
						<view class="t1">￥<text>119</text></view>
						<view class="btn">
							预计得<text>￥3099.69</text>
						</view>
					</view>
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
				tabList:['推广用户','推广活动','推广课程']
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
