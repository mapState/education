<template>
	<view class="main">
		<view class="textarea">
			<textarea placeholder-class="plClass" placeholder="这一刻的想法~" :maxlength="-1" v-model="content" />
		</view>
		<view class="fileList">
			<image :src="imgUrl+img" mode="aspectFill" v-for="(img,g) in imgList" :key="g" class="file"></image>
			<video :src="imgUrl+video"  muted v-for="(video,v) in videoList" :key="v" class="file"></video>
		</view>
		<view class="addBtn">
			<view class="item" @click="addImg">
				<image src="../../static/img/addImg.png" mode="aspectFill" class="addImg"></image>
			</view>
			<view class="item" @click="addVideo">
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
				imgUrl:'',
				isProtect:1,
				type:1,//类型1 成长经历 2活动 3课程 4帖子
				content:'',
				address:'',
				imgList:[],
				tmpImgList:[],
				videoList:[]
			};
		},
		onLoad() {
			this.imgUrl=this.$baseUrl
		},
		methods:{
			openPop(){
				let arr=this.imgList.join()
				this.$api.post('/api/club/publish',{
					address:this.address,
					type:this.type,
					content:this.content,
					isProtect:this.isProtect,
					resUrl:arr,
					userId:uni.getStorageSync('userInfo').id
				}).then((res)=>{
					uni.showToast({
						title:"发布成功",
						duration:500
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1200)
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
			addImg(){
				uni.chooseImage({
						count: 3,
				    success: (chooseImageRes) => {
							const tempFilePaths = chooseImageRes.tempFilePaths;
							console.log(tempFilePaths)
							for(let i=0;i<tempFilePaths.length;i++){
								console.log(i)
								uni.uploadFile({
										url: this.$uploadUrl, 
										filePath: tempFilePaths[i],
										name: 'file',
										success: (uploadFileRes) => {
											console.log(JSON.parse(uploadFileRes.data));
											let res=JSON.parse(uploadFileRes.data)
											this.$set(this.tmpImgList,i,res.data)
											if(this.tmpImgList.length==tempFilePaths.length){
												this.imgList=this.imgList.concat(this.tmpImgList)
											}
										}
								});
							}
				    }
				});
			},
			addVideo(){
				uni.chooseVideo({
						count: 1,
				    success: (res) => {
							const videoPath = res.tempFilePath;
							const thumPath = res.thumbTempFilePath
							console.log(res)
							uni.uploadFile({
									url: this.$uploadUrl, 
									filePath:videoPath,
									name: 'file',
									success: (uploadFileRes) => {
										console.log(JSON.parse(uploadFileRes.data));
										let result=JSON.parse(uploadFileRes.data)
										this.videoList.push(result.data)
									}
							});
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
@import './index.scss'
</style>
