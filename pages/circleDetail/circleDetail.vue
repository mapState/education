<template>
	<view class="main">
		<view class="post">
			<circleItem></circleItem>
		</view>
		<view class="block">
		</view>
		<view class="titleBox">
			<text></text>
			<view class="">
				全部评价
			</view>
		</view>
		<view class="evaluationList">
			<view class="evaluationItem" v-for="item in 2" :key="item">
				<view class="header">
					<image src="/static/1.jpg" mode="aspectFill" class="avatar"></image>
					<view class="info">
						<view class="nameBox">
							<view class="name">
								JONCS
							</view>
							<view class="vipBox">
								<image src="/static/icon/vip.png" mode="aspectFit" class="vipIcon"></image>
								<text>会员</text>
							</view>
						</view>
						<text class="time">5分钟前</text>
					</view>
					<view class="likeBox">
						<image src="/static/icon/liked.png" mode="aspectFit" class="likeIcon"></image>
						<text class="likeActive">11</text>
					</view>
				</view>
				<view class="text">
					这样带娃简直是“作死”，婆婆妈妈们经常这样做，你家娃中招了吗？
				</view>
				<view class="hotEva">
					<text class="name">娃哈哈:</text>
					跟孩子互动的好处就是孩子与你变得更加亲近了，只是孩子脾气越来越大。
				</view>
				<view class="replyNum" @click="showPop">
					231条回复>
				</view>
			</view>
		</view>

		<uni-popup ref="popup" type="bottom">
			<view class="popBox">
				<view class="top">
					<image src="/static/icon/bk.png" mode="aspectFit" class="leftIcon"></image>
					<text>回复(1233)</text>
				</view>
				<scroll-view scroll-y="true" class="scroll-Y">
					<view class="evaluationItem">
						<view class="header">
							<image src="/static/1.jpg" mode="aspectFill" class="avatar"></image>
							<view class="info">
								<view class="nameBox">
									<view class="name">
										JONCS
									</view>
									<view class="vipBox">
										<image src="/static/icon/vip.png" mode="aspectFit" class="vipIcon"></image>
										<text>会员</text>
									</view>
								</view>
								<text class="time">5分钟前</text>
							</view>
							<view class="likeBox">
								<image src="/static/icon/liked.png" mode="aspectFit" class="likeIcon"></image>
								<text class="likeActive">11</text>
							</view>
						</view>
						<view class="text">
							这样带娃简直是“作死”，婆婆妈妈们经常这样做，你
							家娃中招了吗？
						</view>
					</view>
					<view class="block">

					</view>
					<view class="titleText">
						全部回复
					</view>
					<view class="evaluationItem" v-for="item in 2" :key="item">
						<view class="header">
							<image src="/static/1.jpg" mode="aspectFill" class="avatar"></image>
							<view class="info">
								<view class="nameBox">
									<view class="name">
										JONCS
									</view>
									<view class="vipBox">
										<image src="/static/icon/vip.png" mode="aspectFit" class="vipIcon"></image>
										<text>会员</text>
									</view>
								</view>
								<text class="time">5分钟前</text>
							</view>
							<view class="likeBox">
								<image src="/static/icon/liked.png" mode="aspectFit" class="likeIcon"></image>
								<text class="likeActive">11</text>
							</view>
						</view>
						<view class="text">
							这样带娃简直是“作死”，婆婆妈妈们经常这样做，你家娃中招了吗？
						</view>
						<view class="hotEva">
							<text class="name">娃哈哈:</text>
							跟孩子互动的好处就是孩子与你变得更加亲近了，只是孩子脾气越来越大。
						</view>
						<!-- <view class="replyNum" @click="showPop">
							231条回复>
						</view> -->
					</view>
				</scroll-view>
				<view class="inputBox">
					<input type="text" value="" placeholder="回复玛玛哈哈" placeholder-class="plClass" class="input"/>
					<view class="send">
						发送
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import circleItem from '@/components/circleItem.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	export default {
		components: {
			circleItem,
			uniPopup
		},
		data() {
			return {

			};
		},
		methods: {
			showPop() {
				this.$refs.popup.open()
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
