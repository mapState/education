<template>
	<view class="main">
		<view class="scroll-header">
			<scroll-view class="scroll-view_H" scroll-x="true">
				<view class="item" @click="goTest(3)">
						<image src="../static/img/test1.png" mode="aspectFill"></image>
						<text>阅读推广师考试</text>
				</view>
				<view class="item" @click="goTest(4)">
						<image src="../static/img/test2.png" mode="aspectFill"></image>
						<text>营长考试</text>
				</view>
				<view class="item" @click="goTest(5)">
						<image src="../static/img/test3.png" mode="aspectFill"></image>
						<text>总营长考试</text>
				</view>
			</scroll-view>
		</view>
		<view class="block">
			
		</view>
		<view class="tabs">
			<view class="tab tab1" :class="{'active':tabIndex==0}" @click="changeTabIndex(0)">
				阅读推广师
			</view>
			<view class="tab" :class="{'active':tabIndex==1}" @click="changeTabIndex(1)">
				营长
			</view>
			<view class="tab tab3" :class="{'active':tabIndex==2}" @click="changeTabIndex(2)">
				总营长
			</view>
			<view class="tab" :class="{'active':tabIndex==3}" @click="changeTabIndex(3)">
				合伙人
			</view>
		</view>
		<view class="list" v-for="item in courseList" :key="item.id">
			<view class="item" @click.stop="goDetail">
				<image src="https://hbimg.huabanimg.com/a0ca655c84991202c83bfb8110ee4480873d5899299ba-6voOiU_fw658/format/webp" mode="aspectFill" class="img"></image>
				<view class="right">
					<text class="t1">0-3岁小孩习惯培养课程大礼包</text>
					<view class="desc">孩子从小教育中的行为习惯，0-3岁是特别重要的一个阶段</view>
					<view class="price">
						<text class="num"></text> <text class="t1">视频</text>
						<view class="btn" @click.stop="study">
							去学习
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadStatus"></uni-load-more>
		<uni-popup ref="tipPop" type="center">
			<view class="tipBox">
				<view class="title">
					<image src="../static/icon/tipIcon.png" mode="aspectFit"></image>
					<text>温馨提示</text>
				</view>
				<view class="tipDesc">
					您当前未升级“阅读推广师”身份，升级后才可以参加该考试
				</view>
				<view class="bottom">
					<view class="item cancal" @click="cancal">
						取消
					</view>
					<view class="item up">
						去升级
					</view>
				</view>
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
				tabIndex:0,
				pageNo:1,
				pageSize:5,
				levelId:3,
				loadStatus:'noMore',
				courseList:[]
			};
		},
		onReachBottom() {
			this.getList()
		},
		onLoad() {
			this.getList()
		},
		methods:{
			changeTabIndex(index){
				if(this.tabIndex==index){
					return
				}
				this.tabIndex=index
				this.levelId=index+3
				this.courseList=[]
				this.pageNo=1
				this.getList()
				
			},
			getList(){
				this.loadStatus="loading"
				this.$api.get('/api/learn/lessonList',{
					params:{
						pageNo:this.pageNo,
						pageSize:this.pageSize,
						levelId:this.levelId
					}
				}).then((res)=>{
						if(res.data.length>0){
								 this.courseList=res.data
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
			},
			goDetail(){
				uni.navigateTo({
					url:"/pagesA/multimediaCourse/multimediaCourse"
				})
			},
			study(){
				this.$refs.tipPop.open()
			},
			cancal(){
				this.$refs.tipPop.close()
			},
			goTest(levelId){
				uni.navigateTo({
					url:"/pagesA/test/test?levelId="+levelId
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
