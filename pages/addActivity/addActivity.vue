<template>
	<view class="main">
		<view class="textarea">
			<textarea placeholder-class="plClass" placeholder="请输入活动标题..." :maxlength="-1" v-model="title" />
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
		<view class="row" @click="showPicker">
			<view class="icon">
				<image src="../../static/icon/time.png" mode="aspectFit" class="timeIcon"></image>
			</view>
			<view class="time">
				{{chooseDate||'活动时间'}}
			</view>
			<image src="../../static/icon/right.png" mode="aspectFit" class="rightIcon"></image>
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
		<view class="upFileName">
			{{upFileName}}
		</view>
		<view class="addBtn" style="border: none;margin-bottom: 300rpx;">
			<view class="item" @click="upFile">
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
		<rangeDatePick 
					:show="isShow"
					@showchange="showchange"
					start="2020-07-01"
					end="2021-04-01"
					@change="bindChange"
					@cancel="bindCancel"
					themeColor="#4C83D6"
					fields="day"
				></rangeDatePick>
	</view>
</template>

<script>
	import rangeDatePick from '@/components/pyh-rdtpicker/pyh-rdtpicker.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	export default {
		components: {
			uniPopup,
			rangeDatePick
		},
		data() {
			const currentDate = this.getDate({
				 format: true
			})
			return {
				nowDate:currentDate,//获取当前时间
				isShow:false,
				value:[],
				chooseDate:"",
				title:'',
				address:'',
				currentDateTime:'',
				poster:'',
				imgUrl:'',
				classList:[],
				classIndex:0,
				type:'',
				resUrl:'',
				typeName:'',
				filepath:'',
				startDate:'',
				endDate:'',
				upFileName:''
			};
		},
		onLoad() {
			this.imgUrl=this.$baseUrl
			this.getCates()
		},
		methods:{
			showPicker(e){
				this.isShow=true
			},
			showchange(){
				this.isShow=!this.isShow;
			},
			bindChange(data){
				console.log(data)
				this.chooseDate=data[0]+"至"+data[1]
				this.startDate=data[0] + ' 00:00:00',
				this.endDate=data[1] + ' 00:00:00'
			},
			bindCancel(e){
				console.log(e)
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			upFile(){
				wx.chooseMessageFile({
				  count: 1,
				  type: 'file',
				  success: (res)=>{
				    const tempFilePaths = res.tempFiles
						console.log(tempFilePaths)
						this.upFileName=tempFilePaths[0].name
						uni.uploadFile({
								url: this.$uploadUrl, 
								filePath: tempFilePaths[0].path,
								name: 'file',
								success: (uploadFileRes) => {
									console.log(JSON.parse(uploadFileRes.data));
									let res=JSON.parse(uploadFileRes.data)
									this.filepath=res.data
								}
						});
				  }
				})
			},
			submit(){
				this.$api.post('/api/act/publishActivity',{
					address:this.address,
					title:this.title,
					typeId:this.type,
					poster:this.poster,
					userId:uni.getStorageSync('userInfo').id,
					filepath:this.filepath,
					endDate:this.endDate,
					startDate:this.startDate
				}).then((res)=>{
					uni.showToast({
						title:"发布成功",
						duration:800,
						icon:'none'
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1500)
				}).catch((err)=>{
					console.log(err)
					if(err.code==10400){
						uni.showToast({
							title:"请认真填写",
							icon:'none'
						})
					}
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
