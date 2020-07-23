<template>
	<view class="main">
		<view class="textarea">
			<textarea placeholder-class="plClass" placeholder="这一刻的想法~" :maxlength="-1" v-model="content"/>
			</view>
		<view class="addBtn">
			<view class="item">
				<image src="../../static/img/addImg.png" mode="aspectFill" class="addImg"></image>
			</view>
			<view class="item">
				<image src="../../static/img/addVideo.png" mode="aspectFill" class="addVideo"></image>
			</view>
		</view>
		<view class="row" @click="gotomapLocation">
			<view class="icon">
				<image src="../../static/icon/dwa.png" mode="aspectFit" class="dw"></image>
			</view>
			<text class="addressTxt" v-if="address">{{address}}</text>
			<text v-else>所在位置</text>
			<image src="../../static/icon/right.png" mode="aspectFit" class="rightIcon"></image>
		</view>
		<view class="row">
			<view class="icon">
				<image src="../../static/icon/lock.png" mode="aspectFit" class="fl"></image>
			</view>
			<text>是否公开</text>
			<switch @change="switchChange" class="lock" color="#FDD30F"/>
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
				isProtect:1,
				type:1,//类型1 成长经历 2活动 3课程 4帖子
				content:'',
				address:''
			};
		},
		methods:{
			openPop(){
				this.$api.post('/api/club/publish',{
					address:this.address,
					type:this.type,
					content:this.content,
					isProtect:this.isProtect
				}).then((res)=>{
					if(res.code==10200){
						uni.showToast({
							title:"发布成功"
						})
					}
				})
			},
			switchChange(e){
				this.isProtect=e.target.value?0:1
				console.log(e.target.value)
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
