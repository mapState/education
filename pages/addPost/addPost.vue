<template>
	<view class="main">
		<view class="textarea">
			<textarea placeholder-class="plClass" placeholder="这一刻的想法~" :maxlength="-1"/>
		</view>
		<view class="addBtn">
			<view class="item">
				<image src="../../static/img/addImg.png" mode="aspectFill" class="addImg"></image>
			</view>
			<view class="item">
				<image src="../../static/img/addVideo.png" mode="aspectFill" class="addVideo"></image>
			</view>
		</view>
		<view class="row">
			<view class="icon">
				<image src="../../static/icon/dwa.png" mode="aspectFit" class="dw"></image>
			</view>
			<text>所在位置</text>
			<image src="../../static/icon/right.png" mode="aspectFit" class="rightIcon"></image>
		</view>
		<view class="row">
			<view class="icon">
				<image src="../../static/icon/fl1.png" mode="aspectFit" class="fl"></image>
			</view>
			<text>帖子分类</text>
			<image src="../../static/icon/right.png" mode="aspectFit" class="rightIcon"></image>
		</view>
		<view class="fixenBtn" @click="openPop">
			发 布
		</view>
		<uni-popup ref="catePost" type="bottom">
			<view class="catePost">
				<view class="title">
					帖子分类
				</view>
				<view class="cateList">
					<view class="item itemActive">
						全部
					</view>
					<view class="item" v-for="item in 5" :key="item">
						亲子活动
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				
			};
		},
		methods:{
			openPop(){
				this.$refs.catePost.open()
			}
		}
	}
</script>

<style lang="scss">
@import './index.scss'
</style>
