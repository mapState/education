<template>
	<view class="main">
		<view class="list">
			<Activity  :detail="detail" v-if="type==1"></Activity>
			<course-item :detail="detail" v-else></course-item>
		</view>
		<view class="block">
			
		</view>
		<view class="titleBox">
			<text></text>
			<view class="">
				全部评价
			</view>
		</view>
		<view class="textarea">
			<textarea placeholder-class="plClass" placeholder="这一刻的想法~" :maxlength="-1" v-model="content"/>
		</view>
		<view class="fileList">
			<image :src="imgUrl+img" mode="aspectFill" v-for="(img,g) in imgList" :key="g" class="file"></image>
		</view>
		<view class="addBtn" @click="addImg">
			<view class="item">
				<image src="../../static/img/addImg.png" mode="aspectFill" class="addImg"></image>
			</view>
		</view>
		<view class="post" @click="pl">
			发 布
		</view>
	</view>
</template>

<script>
	import CourseItem from '@/components/CourseItem.vue';
	import Activity from '@/components/Activity.vue';
	export default {
		components:{
			CourseItem,
			Activity
		},
		data() {
			return {
				imgUrl:'',
				detail:{},
				content:'',
				imgList:[],
				tmpImgList:[],
				type:2,//1活动评价 2课程评价
			};
		},
		onLoad(params) {
			if(params.type==1){//活动
				this.type=1
				this.detail=getApp().globalData.learnDetail
			}else{
				this.detail = getApp().globalData.activeData
			}
			this.imgUrl=this.$baseUrl
		},
		methods:{
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
			pl(){
				let imgUrl=this.imgList.join()
				this.$api.get('/api/comment/save',{
					params:{
						tableId:this.detail.id,
						type:this.type,
						content:this.content,
						userId:uni.getStorageSync('userInfo').id,
						imgUrl
					}
				}).then((res)=>{
					uni.showToast({
						title:"评价成功"
					})
				})
			}
		}
	}
</script>

<style lang="scss">
@import './index.scss'
</style>
