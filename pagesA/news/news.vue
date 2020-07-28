<template>
	<view class="main">
		<view class="tabs">
			<view class="tab" :class="{'active':tabIndex==index}" @click="changeTabIndex(index)" v-for="(item,index) in tabList" :key="index">
				{{item}}
			</view>
		</view>
		<view class="newsList">
			<view class="new" v-for="item in list" :key="item.id" @click="read(item)">
				<image src="../static/icon/new-tz.png" mode="aspectFit" class="icon" v-if="item.messageType!=1&&item.messageType!=2"></image>
				<image src="../static/icon/new-dz.png" mode="aspectFit" class="icon" v-if="item.messageType==1"></image>
				<image src="../static/icon/new-qz.png" mode="aspectFit" class="icon" v-if="item.messageType==2"></image>
				<view class="detail">
					<text class="t1">
						{{item.messageType}}
					</text>
					<text class="t2">
						{{item.messageContent}}
					</text>
					<text class="time">
						{{item.createDate}}
					</text>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex:0,
				tabList:['全部消息','系统消息','点赞消息','评论消息'],
				pageNo:1,
				pageSize:5,
				list:[],
				loadStatus:'noMore',
				type:''
			};
		},
		onLoad() {
			this.getList()
		},
		onReachBottom() {
			if(this.tabIndex==0){
				this.type=''
			}else{
				this.type=this.tabIndex-1
			}
			this.getList()
		},
		methods:{
			read(data){
				data.status=1
				this.$api.post('/api/message/save',{
					data
				}).then((res)=>{
					
				})
			},
			getList(){
				this.loadStatus='loading'
				this.$api.get('/api/message/list',{
					params:{
						pageNo:this.pageNo,
						pageSize:this.pageSize,
						type:this.type
					}
				}).then((res)=>{
					console.log(res)
					if(res.data.length>0){
						this.list=this.list.concat(res.data)
						this.pageNo++
						if(res.data.length==this.pageSize){
							this.loadStatus='more'
						}else{
							this.loadStatus='noMore'
						}
					}else{
						this.loadStatus='noMore'
					}
				})
			},
			changeTabIndex(index){
				this.tabIndex=index
				this.pageNo=1
				this.list=[]
				this.getList()
			}
		}
	}
</script>

<style lang="scss">
@import './index.scss'
</style>
