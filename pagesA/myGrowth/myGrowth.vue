<template>
	<view class="main">
		<view class="experience">
			<view class="item" v-for="item in 2" :key="item">
				<image src="../../static/icon/time.png" mode="aspectFit" class="timeIcon"></image>
				<text class="time">2020-06-02 19:19</text>
				<text class="topic">#订购课程#</text>
				<view class="detail">
					<image src="../../static/1.jpg" mode="aspectFit" class="deImg"></image>
					<view class="right">
						<text>杭州体育馆夏季儿童运动会，亲子活动</text>
						<view class="tags">
							<view class="tag">
								夏令营
							</view>
							<view class="tag">
								行为习惯
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="item">
				<image src="../../static/icon/time.png" mode="aspectFit" class="timeIcon"></image>
				<text class="time">2020-06-02 19:19</text>
				<text class="topic">#发布成长帖子#</text>
				<view class="desc">
					这样带娃简直是“作死”，婆婆妈妈们经常这样做，
					你家娃中招了吗？
				</view>
				<view class="imgs">
					<image src="../../static/1.jpg" mode="aspectFill"></image>
					<image src="../../static/1.jpg" mode="aspectFill"></image>
					<image src="../../static/1.jpg" mode="aspectFill"></image>
				</view>
				<view class="operating">
					<view class="tags">
						<view class="tag">
							成长
						</view>
					</view>
					<view class="operat">
						<view class="op">
							<image src="../../static/icon/heart.png" mode="aspectFit"></image>
							<text>11</text>
						</view>
						<view class="op">
							<image src="../../static/icon/c-msg.png" mode="aspectFit"></image>
							<text>11</text>
						</view>
					</view>
				</view>
				<view class="dw">
					<image src="../../static/icon/c-dw.png" mode="aspectFit"></image>
					<text>杭州市江干区九堡</text>
				</view>
			</view>
			<view class="tabbar">
				<view class="btn1">
					我的分享
				</view>
				<view class="btn2" @click="goPage">
					发布成长经历
				</view>
			</view>
		</view>
		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				loadStatus:'noMore',
				pageNo:1,
				pageSize:5
			};
		},
		onLoad() {
			this.getList()
		},
		methods:{
			goPage(){
				uni.navigateTo({
					url:"/pages/experience/experience"
				})
			},
			getList(){
				this.$api.get('/api/club/getMomentByUserId',{
					params:{
						pageNo:this.pageNo,
						pageSize:this.pageSize,
						userId:uni.getStorageSync('userInfo').id
					}
				}).then((res)=>{
					if(res.data.length>0){
						this.list=this.list.concat(res.data)
						this.pageNo++
						if(res.data.length==this.pageSize){
							this.loadStatus="more"
						}else{
							this.loadStatus="noMore"
						}
					}else{
						this.loadStatus="noMore"
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
