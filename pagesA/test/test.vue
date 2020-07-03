<template>
	<view class="main">
		<text class="t1">阅读推广师考试</text>
		<text class="t2">倒计时：180S</text>
		<view class="testBox">
			<view class="hidden1">
			</view>
			<view class="hidden2">
			</view>
			<view class="contentTest">
				<view class="type">
					多选
				</view>
				<view class="content">
						<text class="count">{{index}}/30</text>
						<template v-if="isAnswer">
							<view class="title">1、世界读书日的时间是？</view>
							<scroll-view scroll-y="true" class="options">
								<view class="item" v-for="(item,index) in 6" :key="index" :class="{'active':selIndex==index}" @click="selOption(index)">
										A、4月22日
								</view>
							</scroll-view>
							<view class="btns">
								<view class="prev" @click="prev">
									上一题
								</view>
								<view class="next" @click="next" v-if="index!==30">
									下一题
								</view>
								<view class="next" @click="submit" v-if="index==30">
									提交
								</view>
							</view>
						</template>
						<template v-else>
							<image src="../static/img/cjd.png" mode="aspectFill" class="cjdImg"></image>
							<view class="fraction">
								<text>90</text>分
							</view>
							<text class="correctNum">共答对9道</text>
							<text class="correctNum time">共用时60秒</text>
							<text class="testResult">考试通过</text>
							<view class="next" @click="showBook">
								查看证书
							</view>
						</template>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="popBox">
				<image src="../static/icon/closePop.png" mode="aspectFit" class="closeIcon" @click="closePop"></image>
				<view class="title">
					<text class="tt1">阅读推广师证书</text>
					<text class="tt2">获得者：江苓知</text>
				</view>
				<image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593773205803&di=890bbb41896bcee640c6781e6dc64052&imgtype=0&src=http%3A%2F%2Ft8.baidu.com%2Fit%2Fu%3D1484500186%2C1503043093%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1280%26h%3D853" mode="aspectFill" class="bookImg"></image>
				<view class="btns">
					<view class="save">
						保存到手机
					</view>
					<view class="contact" @click="$refs.popupCode.open()">
						联系客服领取
					</view>
				</view>
			</view>
		</uni-popup>
		
		<uni-popup ref="popupCode" type="center">
			<view class="popCodeBox">
				<image src="../static/icon/closePop.png" mode="aspectFit" class="closeIcon" @click="$refs.popupCode.close()"></image>
				<text class="title">客服二维码</text>
				<image src="../../static/1.jpg" mode="aspectFit" class="codeImg"></image>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'; 
	export default {
		components:{
			uniPopup
		},
		data() {
			return {
				selIndex:-1,
				index:1,
				isAnswer:false
			};
		},
		methods:{
			selOption(index){
				console.log(index)
				this.selIndex=index
			},
			prev(){
				if(this.index>1){
					this.index--
				}
			},
			next(){
				if(this.index<30){
					this.index++
				}
			},
			submit(){
				this.isAnswer=false
			},
			showBook(){
				this.$refs.popup.open()
			},
			closePop(){
				this.$refs.popup.close()
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
