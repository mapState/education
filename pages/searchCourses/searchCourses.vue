<template>
	<view class="main">
		<view class="search">
			<input class="input" placeholder="搜索课程" placeholder-class="plClass" @confirm="search" v-model="keyWord"/>
			<image src="../../static/icon/ss.png" mode="aspectFill" class="ssIcon focusClass"></image>
		</view>
		<view class="title">
			<text class="t1">搜索历史</text>
			<view class="del" @click="clearHistory" v-if="historyListC.length>0">
				<image src="../../static/icon/del.png" mode="aspectFill" class="delIcon"></image>
				<text>全部清除</text>
			</view>
		</view>
		<view class="history">
			<view class="item" v-for="(item,index) in historyListC" :key="index" @click="historySearch(item)">
				{{item}}
			</view>
		</view>
		<view class="title">
			<text class="t1">搜索结果</text>
		</view>
		<view class="result">
			<block v-for="item in list" :key="item.id">
				<course-item :detail="item"></course-item>
			</block>
			<uni-load-more :status="loadStatus"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import CourseItem from '@/components/CourseItem.vue';
	export default {
		components:{
			CourseItem
		},
		data() {
			return {
				loadStatus:'noMore',
				historyListC:[],
				keyWord:'',
				pageNo:1,
				list:[]
			}
		},
		onLoad() {
			uni.getStorage({
			    key: 'historyListC',
			    success: (res)=>{
			      this.historyListC=res.data
			    }
			});
		},
		onReachBottom() {
			this.getList()
		},
		methods: {
			search(e){
				let key=e.detail.value
				console.log(key)
				this.pageNo=1
				this.list=[]
				this.getList()
				if(this.historyListC.indexOf(key)==-1){
					this.historyListC.push(key)
					uni.setStorageSync('historyListC', this.historyListC);
				}
			},
			historySearch(key){
				this.keyWord=key
				this.pageNo=1
				this.list=[]
				this.getList()
			},
			getList(){
				this.loadStatus="loading"
				this.$api.post('/api/lesson/list',{
						keyword:this.keyWord,
						pageSize:5,
						pageNo:this.pageNo
					}).then((res)=>{
					if(res.data.length>0){
						this.list=this.list.concat(res.data)
						this.pageNo++
						if(res.data.length==5){
							this.loadStatus="more"
						}else{
							this.loadStatus="noMore"
						}
					}else{
						this.loadStatus="noMore"
					}
				})
			},
			clearHistory(){
				uni.showModal({
				    title: '提示',
				    content: '确定清除搜索历史?',
				    success:(res)=>{
				        if (res.confirm) {
				          uni.removeStorage({
				              key: 'historyListC',
				              success:(res)=>{
													this.historyListC=[]
				                  uni.showToast({
				                  	title:"清除成功",
														icon:'none'
				                  })
				              }
				          });
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
@import  './index.scss'
</style>
