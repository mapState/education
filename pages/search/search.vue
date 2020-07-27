<template>
	<view class="main">
		<view class="search">
			<input class="input" placeholder="搜索活动" placeholder-class="plClass" @confirm="search" v-model="keyWord"/>
			<image src="../../static/icon/ss.png" mode="aspectFill" class="ssIcon focusClass"></image>
		</view>
		<view class="title">
			<text class="t1">搜索历史</text>
			<view class="del" @click="clearHistory" v-if="historyList.length>0">
				<image src="../../static/icon/del.png" mode="aspectFill" class="delIcon"></image>
				<text>全部清除</text>
			</view>
		</view>
		<view class="history">
			<view class="item" v-for="(item,index) in historyList" :key="index" @click="historySearch(item)">
				{{item}}
			</view>
		</view>
		<view class="title">
			<text class="t1">搜索结果</text>
		</view>
		<view class="result">
			<block v-for="item in list" :key="item.id">
				<Activity :detail="item"></Activity>
			</block>
			<uni-load-more :status="loadStatus"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import Activity from '@/components/Activity.vue'
	export default {
		components:{
			Activity
		},
		data() {
			return {
				loadStatus:'noMore',
				historyList:[],
				keyWord:'',
				pageNo:1,
				list:[]
			}
		},
		onLoad() {
			uni.getStorage({
			    key: 'historyList',
			    success: (res)=>{
			      this.historyList=res.data
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
				if(this.historyList.indexOf(key)==-1){
					this.historyList.push(key)
					uni.setStorageSync('historyList', this.historyList);
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
				this.$api.get('/api/act/getActivityList',{
					params:{
						keyword:this.keyWord,
						pageSize:5,
						pageNo:this.pageNo
					}
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
				    success: (res) =>{
				        if (res.confirm) {
				          uni.removeStorage({
				              key: 'historyList',
				              success:(res)=>{
													this.historyList=[]
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
