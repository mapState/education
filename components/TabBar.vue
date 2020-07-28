<template>
	<view class="main">
		<view class="tabBar">
			<view class="tab" @click="goHome">
				<image src="/static/tabbar/homea.png" mode="aspectFill" class="homea" v-if="tabIndex==1"></image>
				<image src="/static/tabbar/home.png" mode="aspectFill" class="homea" v-else></image>
				<text>首页</text>
			</view>
			<view class="tab" @click="goCourse">
				<image src="/static/tabbar/coursed.png" mode="aspectFill" class="course" v-if="tabIndex==2"></image>
				<image src="/static/tabbar/course.png" mode="aspectFill" class="course"  v-else></image>
				<text>课程</text>
			</view>
			<view class="addBox" :class="{'spin':spin}" @click="changeSpin">
				<image src="/static/tabbar/add.png" mode="aspectFill" class="add"></image>
				<text>发布</text>
			</view>
			<view class="tab">
				<text style="opacity: 0;">嘿嘿</text>
			</view>
			<view class="tab" @click="goCircle">
				<image src="/static/tabbar/msged.png" mode="aspectFill" class="msg" v-if="tabIndex==3"></image>
				<image src="/static/tabbar/msg.png" mode="aspectFill" class="msg" v-else></image>
				<text>圈子</text>
			</view>
			<view class="tab" @click="goMine">
				<image src="/static/tabbar/mea.png" mode="aspectFill" class="me" v-if="tabIndex==4"></image>
				<image src="/static/tabbar/me.png" mode="aspectFill" class="me" v-else></image>
				<text>我的</text>
			</view>
		</view>
		<view class="maskp" v-if="spin" @click="spin=false">
			
		</view>
		<view class="popup" v-if="spin">
			<view class="pitem" @click="goAddPost">
				<image src="../static/icon/fb1.png" mode="aspectFit"></image>
				<text>发布帖子</text>
			</view>
			<view class="pitem" @click="goAddActivity">
				<image src="../static/icon/fb2.png" mode="aspectFit"></image>
				<text>发布活动</text>
			</view>
			<view class="pitem" @click="goExperience">
				<image src="../static/icon/fb3.png" mode="aspectFit"></image>
				<text>成长经历</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				spin:false,
				showMask:false
			};
		},
		props:{
			tabIndex:{
				type:Number,
				default:1
			}
		},
		methods:{
			goCourse(){
				uni.redirectTo({
					url:"/pages/course/course"
				})
			},
			goHome(){
				uni.redirectTo({
					url:"/pages/index/index"
				})
			},
			changeSpin(){
				this.spin=!this.spin
			},
			goAddPost(){
				this.spin=false
				uni.navigateTo({
					url:"/pages/addPost/addPost"
				})
			},
			goExperience(){
				this.spin=false
				uni.navigateTo({
					url:"/pages/experience/experience"
				})
			},
			goAddActivity(){
				this.spin=false
				uni.navigateTo({
					url:"/pages/addActivity/addActivity"
				})
			},
			goCircle(){
				this.spin=false
				uni.redirectTo({
					url:"/pages/circle/circle"
				})
			},
			goMine(){
				this.spin=false
				uni.redirectTo({
					url:"/pages/mine/mine"
				})
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
	border-top: 1px solid #ddd;
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
			transition: all .1s linear;
		}
		text{
			font-size:24rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(16,16,16,1);
		}
	}
	.spin{
		.add{
			transform: rotate(135deg);
		}
	}
	.tab{
		display:flex;
		flex-direction: column;
		height: 100%;
		align-items: center;
		justify-content:space-around;
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
.maskp{
	position: fixed;
	width:100%;
	height: 100%;
	z-index: 11;
	left:0;
	top:0;
	background-color: rgba(0,0,0,.6);
}
.popup{
	border-bottom: 1px solid #ddd;
	position: fixed;
	left: 0;
	bottom:98rpx;
	width:100%;
	height:301rpx;
	z-index: 90;
	background:rgba(255,255,255,1);
	display: flex;
	align-items: center;
	justify-content: space-around;
	.pitem{
		display: flex;
		flex-direction: column;
		align-items: center;
		image{
			width:100rpx;
			height: 100rpx;
			margin-bottom: 28rpx;
		}
		text{
			font-size:30rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(16,16,16,1);
		}
	}
}
</style>
