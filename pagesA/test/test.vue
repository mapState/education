<template>
	<view class="main">
		<text class="t1">阅读推广师考试</text>
		<text class="t2">倒计时：{{downTime}}S</text>
		<view class="testBox">
			<view class="hidden1">
			</view>
			<view class="hidden2">
			</view>
			<view class="contentTest">
				<view class="type">
					{{testList[index].isMc?'多选':'单选'}}
				</view>
				<view class="content">
					<text class="count">{{index+1}}/{{testList.length}}</text>
					<template v-if="isAnswer&&testList.length>0">
						<view class="title">{{index+1}}、{{testList[index].name}}</view>
						<scroll-view scroll-y="true" class="options">
							<view class="item" v-for="(op,o) in testList[index].optionList" :key="o" :class="{'active':selOptionIds.includes(op.id)}"
							 @click="selOption(testList[index].isMc,op.id)">
								{{op.orderNum}}、{{op.name}}
							</view>
						</scroll-view>
						<view class="btns">
							<view class="prev" @click="prev">
								上一题
							</view>
							<view class="next" @click="next" v-if="(index+1) < testList.length">
								下一题
							</view>
							<view class="next" @click="submitAnswer" v-if="(index+1)==testList.length">
								提交
							</view>
						</view>
					</template>
					<template v-if="!isAnswer">
						<image src="../static/img/cjd.png" mode="aspectFill" class="cjdImg"></image>
						<view class="fraction">
							<text>{{result.score}}</text>分
						</view>
						<text class="correctNum">共答对{{result.count}}道</text>
						<text class="correctNum time">共用时{{result.userTime}}秒</text>
						<text class="testResult">{{result.isPass==1?'考试通过':'考试未通过'}}</text>
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
				<image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593773205803&di=890bbb41896bcee640c6781e6dc64052&imgtype=0&src=http%3A%2F%2Ft8.baidu.com%2Fit%2Fu%3D1484500186%2C1503043093%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1280%26h%3D853"
				 mode="aspectFill" class="bookImg"></image>
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
		components: {
			uniPopup
		},
		data() {
			return {
				selOptionIds: [],
				defineOption: [],
				index:0,
				isAnswer: true,
				levelId: 2,
				testList: [],
				downTime:180,
				timer:null,
				result:{}
			};
		},
		onLoad(params) {
			this.levelId=params.levelId?params.levelId:2
			this.getList()
			this.countdown()
		},
		methods: {
			countdown(){
				this.timer=setInterval(()=>{
					if(this.downTime<=0){
						clearInterval(this.timer)
					}else{
						this.downTime--
					}
				},1000)
			},
			submitAnswer() {
				let obj = {}
				let answer = this.selOptionIds.join(',')
				obj.questionId = this.testList[this.index].id
				obj.answer = answer
				this.$set(this.defineOption,this.index,obj)
				uni.request({
					url: this.$rqUrl + '/api/learn/answer',
					method: "POST",
					data: {
						levelId: this.levelId,
						list: this.defineOption
					},
					header: {
						'token':uni.getStorageSync('token')
					},
					success: (res) => {
						if(res.data.code==10200){
							this.result=res.data.data
							this.isAnswer = false
						}else{
							uni.showToast({
								title:res.data.message,
								icon:'none'
							})
						}
					}
				});

			},
			getList() {
				this.$api.get('/api/learn/questionList', {
					params: {
						levelId: this.levelId
					}
				}).then((res) => {
					console.log(res)
					if(res.data.length>0){
						res.data.forEach((item) => {
							this.defineOption.push({})
							var count = 0
							item.optionList.forEach((op) => {
								if (op.isTrue == 1) {
									count++
								}
							})
							console.log(count)
							if (count > 1) {
								item.isMc = true
							} else {
								item.isMc = false
							}
						})
						this.testList = res.data
					}
				})
			},
			selOption(isMc, id) {
				console.log(isMc,id)
				let index = this.selOptionIds.indexOf(id)
				if (isMc) { //多选
					if (index == -1) {
						this.selOptionIds.push(id)
					} else {
						this.selOptionIds.splice(index, 1)
					}
				} else {
					let a=[]
					a.push(id)
					this.selOptionIds = a
				}
			},
			prev() {
				if (this.index > 0) {
					this.selOptionIds = []
					// if (this.defineOption[this.index-1].answer) {
					// 	this.selOptionIds = this.defineOption[this.index-1].answer.split(',')
					// }
					this.$set(this.defineOption,this.index-1,{})
					this.index--
				}
			},
			next() {
				if (this.index < (this.testList.length-1)) {
					let obj = {}
					let answer = this.selOptionIds.join(',')
					obj.questionId = this.testList[this.index].id
					obj.answer = answer
					this.$set(this.defineOption,this.index,obj)
					this.selOptionIds = []
					this.index++
				}
			},
			showBook() {
				this.$refs.popup.open()
			},
			closePop() {
				this.$refs.popup.close()
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
