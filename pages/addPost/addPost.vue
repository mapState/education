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
			<text class="" v-if="address">{{address}}</text>
			<text v-else>所在位置</text>
			<image src="../../static/icon/right.png" mode="aspectFit" class="rightIcon"></image>
		</view>
		<view class="row" @click="showCates">
			<view class="icon">
				<image src="../../static/icon/fl1.png" mode="aspectFit" class="fl"></image>
			</view>
			<view class="" v-if="claItem">
				{{claItem}}
			</view>
			<text v-else>帖子分类</text>
			<image src="../../static/icon/right.png" mode="aspectFit" class="rightIcon"></image>
		</view>
		<view class="fixenBtn" @click="submit">
			发 布
		</view>
		<uni-popup ref="catePost" type="bottom">
			<view class="catePost">
				<view class="title">
					帖子分类
				</view>
				<view class="cateList">
					<view class="item" :class="{'itemActive':dictId==0}" @click="selDictId(0,'全部')">
						全部
					</view>
					<view class="item" v-for="(item,index) in classList" :key="item.id" 
					:class="{'itemActive':dictId==item.id}"
					@click="selDictId(item.id,item.name)">
						{{item.name}}
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
				type:4,//类型1 成长经历 2活动 3课程 4帖子
				content:'',
				address:'',
				dictId:'0',
				classList:[],
				claItem:''
			};
		},
		onLoad() {
			this.getClass(4)
		},
		methods:{
			getClass(type){
				this.$api.get('/api/static/dictList',{
					params:{
						type
					}
				}).then((res)=>{
					this.classList=res.data
				})
			},
			selDictId(dictId,txt){
				this.dictId=dictId
				this.claItem=txt
				this.$refs.catePost.close()
			},
			submit(){
				this.$api.post('/api/club/publish',{
					address:this.address,
					type:this.type,
					content:this.content,
					dictId:this.dictId
				}).then((res)=>{
					uni.showToast({
						title:"发布成功"
					})
				})
			},
			showCates(){
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
