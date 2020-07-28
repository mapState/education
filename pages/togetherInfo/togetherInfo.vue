<template>
	<view class="main">
		<view class="activityBox">
			<Activity :detail="detailData"></Activity>
		</view>
		<view class="titleBox">
			<view class="top">
				<text></text>
				<view class="">
					拼团列表
				</view>
			</view>
			<view class="row">
				<view class="col wz">
					<image src="../../static/icon/dw2.png" mode="aspectFit" class="dwIcon"></image>
					<text>杭州</text>
				</view>
				<view class="col">
					<image src="../../static/icon/us2.png" mode="aspectFit" class="userIcon"></image>
					<text>团剩余数</text>
				</view>
				<view class="col again" @click="viewMore">
					<image src="../../static/icon/cil.png" mode="aspectFit" class="cilIcon"></image>
					<text>换一批</text>
				</view>
			</view>
		</view>
		<view class="plItem" v-for="item in list" :key="item.id">
			<view class="top">
				<view class="left">
					<view class="avatarBox" @click="goInfo">
						<image :src="item.memberList[0].avatar" mode="aspectFill" class="avatar"></image>
						<view class="ids">
							<image src="/static/img/Identity.png" mode="aspectFit" class="idimg"></image>
							<text>团长</text>
						</view>
					</view>
					<view class="nameBox">
						<text>{{item.avatar}}</text>
						<view class="tag">
							营长
						</view>
					</view>
				</view>
				<view class="right">
					<text class="jl">13.3km</text>
					<text class="wz">杭州市江干区九堡</text>
				</view>
			</view>
			<view class="people" v-for="(other,index) in item.memberList" :key="index">
				<view class="left">
					<view class="item">
						<image src="../../static/1.jpg" mode="aspectFill" class="peoImg"></image>
						<text class="name">酒酒</text>
					</view>
					<view class="item">
						<image src="../../static/1.jpg" mode="aspectFill" class="peoImg"></image>
						<text class="name">酒酒</text>
					</view>
					<view class="item">
						<view class="black">
							?
						</view>
						<text class="name">空位</text>
					</view>
					<view class="item">
						<view class="black">
							?
						</view>
						<text class="name">空位</text>
					</view>
				</view>
				<view class="cy" v-if="item.memberList.length<5" @click="goJoinDetail">
					参与
				</view>
				<view class="man" v-else>
					已满
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Activity from '@/components/Activity.vue';
	let actId='';
	export default {
		components:{
			Activity
		},
		data() {
			return {
				pageSize:2,
				pageNo:1,
				detailData:{},
				list:[]
			}
		},
		onLoad(params) {
			this.detailData = getApp().globalData.activeData
			actId=this.detailData.id
			this.getList()
		},
		methods: {
			viewMore(){
				this.getList()
			},
			getList(){
				this.$api.get('/api/team/list',{
					params:{
						actId,
						pageNo:this.pageNo,
						pageSize:this.pageSize
					}
				}).then((res)=>{
					if(res.data.length>0){
						this.list=res.data
						this.pageNo++
					}
				})
			},
			goInfo(){
				uni.navigateTo({
					url:"/pages/headInfo/headInfo"
				})
			},
			goJoinDetail(){
				uni.navigateTo({
					url:"/pages/joinDetail/joinDetail?type=3"
				})
			}
		}
	}
</script>

<style lang="scss">
@import  './index.scss'
</style>
