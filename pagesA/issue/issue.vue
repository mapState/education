<template>
	<view class="main">
		<view class="item" v-for="(item,index) in list" :key="item" :class="{'bn':item.show}">
			<view class="title" @click="changeShow(index)">
				<text class="t1">参团后的注意事项怎么了解？</text>
				<image src="../static/icon/bottom.png" mode="aspectFit" class="icon" v-if="item.show"></image>
				<image src="../static/icon/top.png" mode="aspectFit" class="icon" v-else></image>
			</view>
			<view class="detail" v-if="item.show">
				参团成功后，会有活动附件，点击活动附件即可查询注意事项
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[{
					show:false
				},{
					show:false
				}]
			};
		},
		methods:{
			changeShow(index){
				this.list[index].show=!this.list[index].show
			}
		}
	}
</script>

<style lang="scss">
.item{
	width:100%;
	border-bottom: 1px solid #ddd;
	display: flex;
	flex-direction: column;
	align-items: center;
	&.bn{
		border: none;
		.title{
			.t1{
				color:rgba(17,170,249,1);
			}
		}
	}
	.title{
		width:100%;
		height:92rpx;
		padding:0 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.t1{
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(0,0,0,1);
		}
		.icon{
			width:26rpx;
			height: 15rpx;
		}
	}
	.detail{
		width:630rpx;
		height:200rpx;
		background:rgba(242,242,242,1);
		border-radius:6rpx;
		padding:22rpx 30rpx;
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(0,0,0,1);
	}
}
</style>
