<template>
	<view class="main">
		<view class="textarea">
			<textarea placeholder-class="plClass" placeholder="请输入活动标题..." :maxlength="-1" />
			</view>
		<view class="addBtn">
			<view class="item">
				<image src="../../static/img/addImg.png" mode="aspectFill" class="addImg"></image>
				<text>活动封面</text>
			</view>
		</view>
		<view class="row" @click="gotomapLocation">
			<view class="icon">
				<image src="../../static/icon/dwa.png" mode="aspectFit" class="dw"></image>
			</view>
			<text class="addressTxt" v-if="address">{{address}}</text>
			<text v-else>活动地点</text>
			<image src="../../static/icon/right.png" mode="aspectFit" class="rightIcon"></image>
		</view>
		<view class="row">
			<view class="icon">
				<image src="../../static/icon/time.png" mode="aspectFit" class="timeIcon"></image>
			</view>
			<e-picker mode="dateTime" :showValue="currentDateTime" @change="handleChange('currentDateTime',$event)">
				<view class="time">
					{{currentDateTime||'活动时间'}}
				</view>
			</e-picker>
			<image src="../../static/icon/right.png" mode="aspectFit" class="rightIcon"></image>
		</view>
		<view class="row">
			<view class="icon">
				<image src="../../static/icon/fl1.png" mode="aspectFit" class="fl"></image>
			</view>
			<text>活动分类</text>
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
			<view class="item">
				<image src="../../static/icon/Upload.png" mode="aspectFill" class="uploadIcon"></image>
			</view>
		</view>
		<view class="fixenBtn" @click="openPop">
			提交审核
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
				address:'',
				currentDateTime:''
			};
		},
		methods:{
			handleChange(type, e) {
				this[type] = e
			},
			openPop(){
				this.$refs.catePost.open()
			},
			gotomapLocation(){//选取位置
				wx.chooseLocation({
					success: (res)=>{
						this.address=res.address
						console.log(res)
					}
				})
			},
		}
	}
</script>

<style lang="scss">
@import './index.scss'
</style>
