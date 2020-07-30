<template>
	<view class="main">
		<view class="search">
			<view class="left">
				<picker @change="bindPickerChange" :value="index" :range="fClass">
					<text class="">{{fClass[fIndex]}}</text>
					<image src="../../static/icon/down.png" mode="aspectFill"></image>
				</picker>
			</view>
			<!-- <view class="inputBox">
				<input class="input" placeholder="搜索课程" placeholder-class="plClass" />
				<image src="../../static/icon/ss.png" mode="aspectFill" class="ssIcon focusClass"></image>
			</view> -->
			<view class="inputBox" @click="goSearch">
				<view class="plClass input">
					搜索活动
				</view>
				<!-- <input class="input" placeholder="搜索活动" placeholder-class="plClass" @focus="focus=true" @blur="focus=false" /> -->
				<image src="../../static/icon/ss.png" mode="aspectFill" class="ssIcon" :class="{'focusClass':focus}"></image>
			</view>
		</view>
		<view class="filter">
			<view class="item" @click="changeType(1)">
				<text>全部分类</text>
				<image src="../../static/icon/filter-top.png" mode="aspectFit" class="down" v-if="filterType==1"></image>
				<image src="../../static/icon/filter.png" mode="aspectFit" class="down" v-else></image>
			</view>
			<view class="item" @click="changeType(3)">
				<text>性别</text>
				<image src="../../static/icon/filter-top.png" mode="aspectFit" class="down" v-if="filterType==2"></image>
				<image src="../../static/icon/filter.png" mode="aspectFit" class="down" v-else></image>
			</view>
			<view class="item" @click="changeType(2)">
				<text>{{language==1?'英文专区':'中文专区'}}</text>
				<image src="../../static/icon/filter2.png" mode="aspectFit" class="price"></image>
			</view>

			<view class="section1" v-if="filterType==1">
				<view class="tag" @click="selTypeId(0)" :class="{'tagActive':tagIndex==0}">
					全部分类
				</view>
				<view class="tag" v-for="item in classList[fIndex].dictVoList" :key="item.id" :class="{'tagActive':tagIndex==item.id}" @click="selTypeId(item.id)">
					{{item.name}}
				</view>
			</view>
			<view class="section3" v-if="filterType==3">
				<view class="item">
					<text class="" @click="selSex(-1)" :class="{'active':sexIndex==-1}">全部项</text>
					<image src="../../static/icon/cur.png" mode="aspectFill" v-if="sexIndex==-1"></image>
				</view>
				<view class="item">
					<text class="" @click="selSex(1)" :class="{'active':sexIndex==1}">男</text>
					<image src="../../static/icon/cur.png" mode="aspectFill" v-if="sexIndex==1"></image>
				</view>
				<view class="item">
					<text class="" @click="selSex(0)" :class="{'active':sexIndex==0}">女</text>
					<image src="../../static/icon/cur.png" mode="aspectFill" v-if="sexIndex==0"></image>
				</view>
			</view>
		</view>
		<view class="list">
			<block v-for="item in list" :key="item.id">
				<course-item :detail="item"></course-item>
			</block>
		</view>
		<uni-load-more :status="loadStatus"></uni-load-more>
		<view class="mask" v-show="showMask" @click="closeMask">

		</view>
	</view>
</template>

<script>
	import CourseItem from '@/components/CourseItem.vue';
	export default {
		components: {
			CourseItem
		},
		data() {
			return {
				tagIndex: 0,
				classList: [],
				focus: false,
				filterType: 0,
				showMask: false,
				loadStatus: 'noMore',
				list: [],
				sexIndex: -1,
				keyword: '1',
				language: 1, //	1中文 2英语
				pageNo: 1,
				pageSize: 5,
				sex: '',
				types: [],
				fClass:[],
				fIndex:0
			}
		},
		onLoad() {
			this.getList()
			this.getCates()
		},
		onReachBottom() {
			this.getList()
		},
		methods: {
			bindPickerChange(e) {
				this.fIndex = e.target.value
			},
			selSex(index) {
				this.sexIndex = index
				if (index == -1) {
					this.sex = ''
				} else {
					this.sex = index
				}
				this.closeMask()
				this.pageNo = 1
				this.keyword = ''
				this.language = ''
				this.types = []
				this.list = []
				this.getList()
			},
			selTypeId(index) {
				this.types = []
				this.tagIndex = index
				this.closeMask()
				if (index == 0) {
					this.types = []
				} else {
					this.types.push(index)
				}
				this.pageNo = 1
				this.keyword = ''
				this.language = ''
				this.sex = ''
				this.list = []
				this.getList()
			},
			//获取分类列表
			getCates() {
				this.$api.get('/api/static/dictList', {
					params: {
						type: 2 //1.活动分类 2.课程分类 3.绘本分类 4 帖子分类 5消费得积分 6消费得经验
					}
				}).then((res) => {
					if(res.data.length>0){
						let fClass=[]
						let classList=[]
						res.data.forEach((item)=>{
							if(item.pid==0){
								fClass.push(item.name)
								classList.push(item)
							}
						})
						this.classList=classList
						this.fClass=fClass
					}
				})
			},
			goSearch() {
				uni.navigateTo({
					url: "/pages/searchCourses/searchCourses"
				})
			},
			getList() {
				this.loadStatus = "loading"
				wx.request({
					url: this.$rqUrl + '/api/lesson/list',
					method:"POST",
					data: {
						language: this.language,
						pageNo: this.pageNo,
						pageSize: this.pageSize,
						sex: this.sex,
						types:this.types
					},
					success:(res)=>{
						//console.log(res.data)
						if (res.data.data.length > 0) {
								this.list = this.list.concat(res.data.data)
								this.pageNo++
								if (res.data.data.length == this.pageSize) {
									this.loadStatus = "more"
								} else {
									this.loadStatus = "noMore"
								}
							} else {
								this.loadStatus = "noMore"
							}
					}
				})
				// this.$api.post('/api/lesson/list', {
				// 	language: this.language,
				// 	pageNo: this.pageNo,
				// 	pageSize: this.pageSize,
				// 	sex: this.sex,
				// 	types: JSON.stringify(this.types)
				// }).then((res) => {
				// 	if (res.data.length > 0) {
				// 		this.list = this.list.concat(res.data)
				// 		this.pageNo++
				// 		if (res.data.length == this.pageSize) {
				// 			this.loadStatus = "more"
				// 		} else {
				// 			this.loadStatus = "noMore"
				// 		}
				// 	} else {
				// 		this.loadStatus = "noMore"
				// 	}
				// })
			},
			changeType(index) {
				if (index !== 2) {
					if(this.filterType == index){
						this.showMask = false
						this.filterType=-1
						return
					}
					this.filterType = index
					this.showMask = true
				} else {
					this.showMask = false
					this.language = this.language == 1 ? 2 : 1
					this.pageNo = 1
					this.keyword = ''
					this.types = []
					this.sex = ''
					this.list = []
					this.getList()
				}
			},
			closeMask() {
				this.filterType = 0
				this.showMask = false
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
