<template>
	<view class="main">
		<view class="option" @click="goPage(1)">
			<image src="../static/icon/other1.png" mode="aspectFit" class="icon1"></image>
			<view>孩子信息</view>
			<image src="../static/icon/right.png" mode="aspectFit" class="rightIcon"></image>
		</view>
		<view class="option" @click="goPage(2)">
			<image src="../static/icon/other2.png" mode="aspectFit" class="icon2"></image>
			<view>关于我们</view>
			<image src="../static/icon/right.png" mode="aspectFit" class="rightIcon"></image>
		</view>
		<view class="option" @click="goPage(3)">
			<image src="../static/icon/other3.png" mode="aspectFit" class="icon3"></image>
			<view>隐私协议</view>
			<image src="../static/icon/right.png" mode="aspectFit" class="rightIcon"></image>
		</view>
		<view class="option" @click="goPage(4)">
			<image src="../static/icon/other4.png" mode="aspectFit" class="icon4"></image>
			<view>常见问题</view>
			<image src="../static/icon/right.png" mode="aspectFit" class="rightIcon"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			goPage(index){
				if(index==1){
					uni.navigateTo({
						url:"/pagesA/childInfo/childInfo"
					})
				}else if(index==2){
					uni.navigateTo({
						url:"/pagesA/aboutUs/aboutUs"
					})
				}else if(index==3){
					uni.navigateTo({
						url:"/pagesA/privacyAgreement/privacyAgreement"
					})
				}else{
					uni.navigateTo({
						url:"/pagesA/issue/issue"
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.option{
	width: 100%;
	height:102rpx;
	position: relative;
	display: flex;
	align-items: center;
	border-bottom: 1px solid #ddd;
	.icon1{
		width:42rpx;
		height: 36rpx;
		margin-left: 30rpx;
		margin-right: 15rpx;
	}
	.icon2{
		width:40rpx;
		height: 40rpx;
		margin-left: 30rpx;
		margin-right: 17rpx;
	}
	.icon3{
		width:37rpx;
		height: 43rpx;
		margin-left: 30rpx;
		margin-right: 20rpx;
	}
	.icon4{
		width:40rpx;
		height: 40rpx;
		margin-left: 30rpx;
		margin-right: 18rpx;
	}
	view{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(0,0,0,1);
	}
	.rightIcon{
		position: absolute;
		right: 30rpx;
		top:50%;
		transform: translateY(-50%);
		width:18rpx;
		height: 34rpx;
	}
}
</style>
