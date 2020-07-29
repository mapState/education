<template>
	<view class="main">
		<view class="plItem" v-for="item in list" :key="item.id">
			<view class="info">
				<view class="left">
					<image src="/static/1.jpg" mode="aspectFit" class="avatar"></image>
					<view class="desc">
						<view class="row">
							<text class="name">{{item.name}}</text>
							<image src="/static/icon/vip.png" mode="aspectFit" class="vipIcon"></image>
							<text class="hy">{{item.level||getLevel}}</text>
						</view>
						<text class="time">{{item.createDate}}</text>
					</view>
				</view>
				<!-- <view class="right">
					<image src="/static/icon/heart.png" mode="aspectFit" class="heartIcon"></image>
					<text>44</text>
				</view> -->
			</view>
			<view class="detail"  @click.stop="goDetail">
				{{item.content}}
			</view>
			<view class="imgs" @click.stop="previewImage(item.imgList)">
				<image :src="img" v-for="img in item.imgList" :key="item"></image>
			</view>
			<view class="operating">
				<view class="left">
					<view class="tag">
						{{item.tag}}
					</view>
				</view>
				<view class="right">
					<view class="item likeBox">
						<image src="/static/icon/heart.png" mode="aspectFill" class="like"></image>
						<text>{{item.likeCount}}</text>
					</view>
					<view class="item">
						<image src="/static/icon/c-msg.png" mode="aspectFill" class="like"></image>
						<text>{{item.commentCount}}</text>
					</view>
				</view>
			</view>
			<view class="pos">
				<image src="/static/icon/c-dw.png" mode="aspectFit" class="dwIcon"></image>
				<text>{{item.address}}</text>
				<image src="../static/icon/more.png" mode="aspectFit" class="moreIcon" @click.stop="more"></image>
			</view>
		</view>
		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>	
</template>

<script>
	export default {
		data() {
			return {
				imgUrl:'',
				pageNo:1,
				pageSize:5,
				userId:'',
				loadStatus:'noMore',
				list:[],
				classList:[]
			};
		},
		onLoad() {
			this.imgUrl=this.$baseUrl
			this.userId=uni.getStorageSync("userInfo").id
			this.getCates()
		},
		onReachBottom() {
			this.getList()
		},
		filters:{
			getLevel(id){
				let levleList=getApp().globalData.level
				let levelName='游客'
				levleList.forEach((item)=>{
					if(item.id==id){
						levelName = item.name
					}
				})
				return levelName
			}
		},
		methods: {
			//获取分类列表
			getCates() {
				this.$api.get('/api/static/dictList',{
					params:{
						type:4 //1.活动分类 2.课程分类 3.绘本分类 4 帖子分类 5消费得积分 6消费得经验
					}
				}).then((res) => {
					this.classList=res.data
					this.getList()
				})
			},
			getList(){
				this.loadStatus="loading"
				this.$api.get('/api/club/getMomentByMyself',{
					params:{
						pageSize:this.pageSize,
						pageNo:this.pageNo,
						userId:this.userId
					}
				}).then((res)=>{
					console.log(res)
					if(res.data.length>0){
						res.data.forEach((item)=>{
							let imgList=item.resUrl
							if(imgList){
								item.imgList=imgList.split(',')
							}else{
								item.imgList=[]
							}
							this.classList.forEach((cls)=>{
								if(item.dictId==cls.id){
									item.tag=cls.name
								}
							})
						})
						this.list=this.list.concat(res.data)
						this.pageNo++
						if(res.data.length==this.pageSize){
							this.loadStatus="more"
						}else{
							tihs.loadStatus="noMore"
						}
					}else{
						tihs.loadStatus="noMore"
					}
				}).catch((err)=>{
					if(err.code==10903){
						uni.showToast({
							title:"该用户已设置权限",
							icon:'none'
						})
					}
				})
			},
			previewImage() {
				uni.previewImage({
					urls: this.imgList
				});
			},
			goDetail() {
				uni.navigateTo({
					url: "/pages/circleDetail/circleDetail"
				})
			},
			more() {
				uni.showActionSheet({
					itemList: ['删除'],
					success: function(res) {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
