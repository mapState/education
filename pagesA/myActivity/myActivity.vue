<template>
	<view class="main">
		<view class="plItem">
			<view class="info">
				<view class="left">
					<image src="/static/1.jpg" mode="aspectFit" class="avatar"></image>
					<view class="desc">
						<view class="row">
							<text class="name">name</text>
							<image src="/static/icon/vip.png" mode="aspectFit" class="vipIcon"></image>
							<text class="hy">会员</text>
						</view>
						<text class="time">5分钟前</text>
					</view>
				</view>
				<!-- <view class="right">
					<image src="/static/icon/heart.png" mode="aspectFit" class="heartIcon"></image>
					<text>44</text>
				</view> -->
			</view>
			<view class="detail"  @click.stop="goDetail">
				这样带娃简直是“作死”，婆婆妈妈们经常这样做，
				你家娃中招了吗？
			</view>
			<view class="imgs" @click.stop="previewImage">
				<image src="https://hbimg.huabanimg.com/08e3ee716b1c1335c8bbf6940074384d59f354fd72516-yrddEo_fw658/format/webp"
				 mode="aspectFill" v-for="item in 3" :key="item"></image>
			</view>
			<view class="operating">
				<view class="left">
					<view class="tag">
						成长
					</view>
				</view>
				<view class="right">
					<view class="item likeBox">
						<image src="/static/icon/heart.png" mode="aspectFill" class="like"></image>
						<text>11</text>
					</view>
					<view class="item">
						<image src="/static/icon/c-msg.png" mode="aspectFill" class="like"></image>
						<text>121</text>
					</view>
				</view>
			</view>
			<view class="pos">
				<image src="/static/icon/c-dw.png" mode="aspectFit" class="dwIcon"></image>
				<text>杭州市江干区九堡</text>
				<image src="../static/icon/more.png" mode="aspectFit" class="moreIcon" @click.stop="more"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList: [
					'https://hbimg.huabanimg.com/388d9f7f46ca2367215019e2cc657a120232f1a090ab6d-VROHhO_fw658/format/webp',
					'https://hbimg.huabanimg.com/6949b1b94886ea5688ded50a31f2bc24d2ed3aaa2c94e-dJ0QDC_fw658/format/webp'
				],
				pageNo:1,
				pageSize:5,
				userId:''
			};
		},
		onLoad() {
			this.userId=uni.getStorageSync("userInfo").id
			this.getList()
		},
		methods: {
			getList(){
				this.$api.get('/api/club/getMomentByMyself',{
					params:{
						pageSize:this.pageSize,
						pageNo:this.pageNo,
						userId:this.userId
					}
				}).then((res)=>{
					console.log(res)
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
