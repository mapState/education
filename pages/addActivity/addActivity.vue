<template>
	<view class="main">
		<view class="textarea">
			<textarea placeholder-class="plClass" placeholder="请输入活动标题..." :maxlength="-1" v-model="title"/>
		</view>
		<view class="fileList" v-if="poster">
			<image :src="imgUrl+poster" mode="aspectFill" class="file"></image>
		</view>
		<view class="addBtn">
			<view class="item" @click="addImg">
				<image src="../../static/img/addImg.png" mode="aspectFill" class="addImg"></image>
				<text>活动封面</text>
			</view>
		</view>
		<view class="row" @click="gotomapLocation">
			<view class="icon">
				<image src="../../static/icon/dwa.png" mode="aspectFit" class="dw"></image>
			</view>
			<text class="" v-if="address">{{address}}</text>
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
				<image src="../../static/icon/right.png" mode="aspectFit" class="rightIcon"></image>
			</e-picker>
		</view>
		<view class="row" @click="openPop">
			<view class="icon">
				<image src="../../static/icon/fl1.png" mode="aspectFit" class="fl"></image>
			</view>
			<text>{{typeName||'活动分类'}}</text>
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
		<view class="fixenBtn" @click="submit">
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
						  <view class="item" :class="{'active':index==classIndex}" v-for="(item,index) in classList" :key="index" @click="changeClassIndex(index)">
						  	{{item.name}}
						  </view>
						</scroll-view>
					</view>
					<view class="right">
						<view class="item" v-for="rt in classList[classIndex].dictVoList" :key="rt.id" @click="selectTypeId(rt.id,rt.name)" :class="{'active':rt.id==type}">
							{{rt.name}}
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
				title:'',
				address:'',
				currentDateTime:'',
				poster:'',
				imgUrl:'',
				classList:[],
				classIndex:0,
				type:'',
				resUrl:'',
				typeName:''
			};
		},
		onLoad() {
			this.imgUrl=this.$baseUrl
			this.getCates()
		},
		methods:{
			submit(){
				return
				this.$api.post('/api/club/publish',{
					address:this.address,
					type:2,
					title:this.title,
					dictId:this.type,
					avatar:this.poster,
					resUrl:this.resUrl
				}).then((res)=>{
					// uni.showToast({
					// 	title:"发布成功",
					// 	duration:500
					// })
					// setTimeout(()=>{
					// 	uni.navigateBack({
					// 		delta:1
					// 	})
					// },1200)
				}).catch((err)=>{
					console.log(err)
				})
			},
			selectTypeId(id,text){
				this.type=id
				this.typeName=text
				this.$refs.catePost.close()
			},
			changeClassIndex(index){
				this.classIndex=index
			},
			getCates() {
				this.$api.get('/api/static/dictList',{
					params:{
						type:1 //1.活动分类 2.课程分类 3.绘本分类 4 帖子分类 5消费得积分 6消费得经验
					}
				}).then((res) => {
					console.log(res.data)
					this.classList=res.data
				})
			},
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
			addImg(){
				uni.chooseImage({
						count: 1,
				    success: (chooseImageRes) => {
							const tempFilePaths = chooseImageRes.tempFilePaths;
							console.log(tempFilePaths)
							uni.uploadFile({
									url: this.$uploadUrl, 
									filePath: tempFilePaths[0],
									name: 'file',
									success: (uploadFileRes) => {
										console.log(JSON.parse(uploadFileRes.data));
										let res=JSON.parse(uploadFileRes.data)
										this.poster=res.data
									}
							});
				    }
				});
			},
		}
	}
</script>

<style lang="scss">
@import './index.scss'
</style>
