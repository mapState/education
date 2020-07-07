<template>
	<view class="main">
		<view class="failDetail" v-if="type==2">
			<view class="t1">失败原因</view>
			<view class="t2">人员未达到成团的要求，请再次核对成团人数...</view>
		</view>
		<view class="textarea">
			<view class="text">
				杭州小记者内蒙古宁令营梦幻迪士尼，亲子活动
			</view>
			<!-- <textarea placeholder-class="plClass" placeholder="请输入活动标题..." :maxlength="-1" /> -->
		</view>
		<view class="addBtn">
			<!-- <view class="item">
				<image src="../../static/img/addImg.png" mode="aspectFill" class="addImg"></image>
				<text>活动封面</text>
			</view> -->
			<view class="item">
				<image src="../../static/1.jpg" mode="aspectFill" class="selImg"></image>
			</view>
		</view>
		<view class="row">
			<view class="icon">
				<image src="../../static/icon/dwa.png" mode="aspectFit" class="dw"></image>
			</view>
			<text>杭州市江干区九堡街道华侨国际B座515</text>
			<image src="../../static/icon/right.png" mode="aspectFit" class="rightIcon"></image>
		</view>
		<view class="row">
			<view class="icon">
				<image src="../../static/icon/time.png" mode="aspectFit" class="timeIcon"></image>
			</view>
			<text>2020-06-02 至 2020-06-18</text>
			<image src="../../static/icon/right.png" mode="aspectFit" class="rightIcon"></image>
		</view>
		<view class="row">
			<view class="icon">
				<image src="../../static/icon/fl1.png" mode="aspectFit" class="fl"></image>
			</view>
			<!-- <text>活动分类</text> -->
			<view class="tags">
				<view class="tag">
					夏令营
				</view>
				<view class="tag">
					亲子活动
				</view>
			</view>
			<image src="../../static/icon/right.png" mode="aspectFit" class="rightIcon"></image>
		</view>
		<view class="row annex">
			<view class="icon">
				<image src="../../static/icon/annexIcon.png" mode="aspectFit" class="annexIcon"></image>
			</view>
			<text>方案附件</text>
			<text class="annexTip">文件格式：DOC、PDF、PPT</text>
		</view>
		<view class="addBtn" style="border: none;margin-bottom: 300rpx;">
			<!-- <view class="item">
				<image src="../../static/icon/Upload.png" mode="aspectFill" class="uploadIcon"></image>
			</view> -->
			<view class="item">
				<image src="../../static/1.jpg" mode="aspectFill" class="selImg"></image>
			</view>
		</view>
		<view class="fixenBtn" v-if="type==2">
			重新提交
		</view>
		<view class="waitBtn" v-if="type==1">
			审核中，请等待
		</view>
		<uni-popup ref="catePost" type="bottom">
			<view class="catePost">
				<view class="title">
					活动分类
				</view>
				<view class="cateList">
					<view class="left">
						<scroll-view scroll-y="true" class="left-scroll">
						  <view class="item active">
						  	儿童
						  </view>
							<view class="item" v-for="item in 6" :key="item">
								国外
							</view>
						</scroll-view>
					</view>
					<view class="right">
						<view class="item active">
							夏令营
						</view>
						<view class="item" v-for="item in 5" :key="item">
							踏春
						</view>
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
				type:0
			};
		},
		onLoad(params) {
			if(params.type){
				this.type=params.type
			}
		},
		methods:{
			openPop(){
				this.$refs.catePost.open()
			},
		}
	}
</script>

<style lang="scss">
@import './index.scss'
</style>
