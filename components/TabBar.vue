<template>
	<view class="main">
		<view class="tabBar">
			<view class="tab">
				<image src="/static/tabbar/home.png" mode="aspectFill" class="homea" v-if="tabIndex==1"></image>
				<image src="/static/tabbar/homea.png" mode="aspectFill" class="homea" v-else></image>
				<text>首页</text>
			</view>
			<view class="tab">
				<image src="/static/tabbar/coursed.png" mode="aspectFill" class="course" v-if="tabIndex==2"></image>
				<image src="/static/tabbar/course.png" mode="aspectFill" class="course"  v-else></image>
				<text>课程</text>
			</view>
			<view class="addBox">
				<image src="/static/tabbar/add.png" mode="aspectFill" class="add"></image>
				<text>发布</text>
			</view>
			<view class="tab">
				<text style="opacity: 0;">嘿嘿</text>
			</view>
			<view class="tab">
				<image src="/static/tabbar/msg.png" mode="aspectFill" class="msg"></image>
				<text>消息</text>
			</view>
			<view class="tab">
				<image src="/static/tabbar/me.png" mode="aspectFill" class="me"></image>
				<text>我的</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			tabIndex:{
				type:Number,
				default:1
			}
		}
	}
</script>

<style lang="scss">
.tabBar{
	width:100%;
	height: 98rpx;
	display: flex;
	align-items: center;
	justify-content: space-around;
	position: fixed;
	bottom:0;
	z-index: 99;
	background-color: #fff;
	.addBox{
		top:-32rpx;
		left:50%;
		transform: translateX(-50%);
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		.add{
			width:89rpx;
			height:87rpx;
		}
		text{
			font-size:24rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(16,16,16,1);
		}
	}
	.tab{
		display:flex;
		flex-direction: column;
		height: 100%;
		align-items: center;
		justify-content: space-around;
		.homea{
			width:40rpx;
			height: 47rpx;
		}
		.course{
			width:38rpx;
			height: 44rpx;
		}
		.msg{
			width:44rpx;
			height: 44rpx;
		}
		.me{
			width:40rpx;
			height: 50rpx;
		}
		text{
			font-size:24rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(16,16,16,1);
		}
	}
}
</style>
