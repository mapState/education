<template>
	<view class="main">
		<view class="search">
			<view class="left">
				<picker @change="bindPickerChange" :value="index" :range="fClass">
					<text class="">{{fClass[fIndex]}}</text>
				</picker>
				<image src="../../static/icon/down.png" mode="aspectFill"></image>
			</view>
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
				<text>全部</text>
				<image src="../../static/icon/filter.png" mode="aspectFit" class="down"></image>
			</view>
			<view class="item" @click="changeType(2)">
				<text>价格</text>
				<image src="../../static/icon/filter2.png" mode="aspectFit" class="price"></image>
			</view>
			<view class="item" @click="changeType(3)">
				<text>距离</text>
				<image src="../../static/icon/filter.png" mode="aspectFit" class="down"></image>
			</view>
			<view class="item" @click="changeType(4)">
				<text>时间</text>
				<image src="../../static/icon/filter.png" mode="aspectFit" class="down"></image>
			</view>
			<view class="item" @click="changeType(5)">
				<text>状态</text>
				<image src="../../static/icon/filter.png" mode="aspectFit" class="down"></image>
			</view>
			<view class="section1" v-if="filterType==1">
				<view class="tag tagActive">
					全部
				</view>
				<view class="tag" v-for="item in 6" :key="item">
					夏令营
				</view>
			</view>
			<view class="section3" v-if="filterType==3">
				<view class="item">
					<text class="active">全部项</text>
					<image src="../../static/icon/cur.png" mode="aspectFill"></image>
				</view>
				<view class="item">
					<text class="">周边</text>
					<image src="../../static/icon/cur.png" mode="aspectFill" v-if="false"></image>
				</view>
				<view class="item">
					<text class="">国内</text>
					<image src="../../static/icon/cur.png" mode="aspectFill" v-if="false"></image>
				</view>
				<view class="item">
					<text class="">国外</text>
					<image src="../../static/icon/cur.png" mode="aspectFill" v-if="false"></image>
				</view>
			</view>
			<view class="section4" v-if="filterType==4">
				<view class="item">
					<picker mode="date" :value="date1" :start="startDate" :end="endDate" @change="bindDateChange1">
						<view class="inputs" v-if="showDate1">{{date1}}</view>
						<view class="inputs plclass" v-else>
							报名开始时间
						</view>
					</picker>
					<text></text>
					<picker mode="date" :value="date2" :start="startDate" :end="endDate" @change="bindDateChange2">
						<view class="inpute" v-if="showDate2">{{date2}}</view>
						<view class="inpute plclass" v-else>
							报名结束时间
						</view>
					</picker>
				</view>
				<view class="item">
					<picker mode="date" :value="date3" :start="startDate" :end="endDate" @change="bindDateChange3">
						<view class="inputs" v-if="showDate3">{{date3}}</view>
						<view class="inputs plclass" v-else>
							活动开始时间
						</view>
					</picker>
					<text></text>
					<picker mode="date" :value="date4" :start="startDate" :end="endDate" @change="bindDateChange4">
						<view class="inpute" v-if="showDate4">{{date4}}</view>
						<view class="inpute plclass" v-else>
							活动结束时间
						</view>
					</picker>
				</view>
				<view class="btn">
					确 定
				</view>
			</view>
			<view class="section3" v-if="filterType==5">
				<view class="item">
					<text class="active">全部</text>
					<image src="../../static/icon/cur.png" mode="aspectFill"></image>
				</view>
				<view class="item">
					<text class="">未开始</text>
					<image src="../../static/icon/cur.png" mode="aspectFill" v-if="false"></image>
				</view>
				<view class="item">
					<text class="">报名中</text>
					<image src="../../static/icon/cur.png" mode="aspectFill" v-if="false"></image>
				</view>
				<view class="item">
					<text class="">进行中</text>
					<image src="../../static/icon/cur.png" mode="aspectFill" v-if="false"></image>
				</view>
				<view class="item">
					<text class="">已结束</text>
					<image src="../../static/icon/cur.png" mode="aspectFill" v-if="false"></image>
				</view>
			</view>
		</view>
		<view class="list">
			<block v-for="item in hotActiveList" :key="item.id">
				<Activity :type="item.id" :detail="item"></Activity>
			</block>
		</view>
		<uni-load-more :status="loadStatus"></uni-load-more>
		<view class="mask" v-show="showMask" @click="closeMask">

		</view>
	</view>
</template>

<script>
	import Activity from '@/components/Activity.vue'
	export default {
		components: {
			Activity
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				classList:[],
				fClass:[],
				fIndex:0,
				date1: currentDate, //报名开始时间
				date2: currentDate, //报名结束时间
				date3: currentDate, //活动开始时间
				date4: currentDate, //活动结束时间
				showDate1: false,
				showDate2: false,
				showDate3: false,
				showDate4: false,
				isPrice: 0, //是否价格排序
				state: 0, //活动状态(1未开始2报名中 3进行中 4已结束)
				typeId: 0, //子分类
				distance: '', //距离
				addressData: {},
				loadStatus: 'more',
				focus: false,
				filterType: 0,
				showMask: false,
				pageNo: 1,
				pageSize: 5,
				hotActiveList: []
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onLoad(params) {
			this.fIndex=params.fIndex
			uni.getStorage({
				key: 'address',
				success: (res) => {
					this.addressData = res.data
				},
				complete: () => {
					this.getCates()
				}
			})
		},
		onReachBottom() {
			if (this.loadStatus == "noMore") {
				return
			}
			this.getActivityList()
		},
		methods: {
			//获取分类列表
			getCates() {
				this.$api.get('/api/static/dictList',{
					params:{
						type:1 //1.活动分类 2.课程分类 3.绘本分类 4 帖子分类 5消费得积分 6消费得经验
					}
				}).then((res) => {
					console.log(res.data)
					this.classList=res.data
					this.fClass=res.data.map((item)=>{
						return item.name
					})
				})
			},
			bindPickerChange(e) {
				this.fIndex = e.target.value
			},
			goSearch() {
				uni.navigateTo({
					url: "/pages/search/search"
				})
			},
			bindDateChange1(e) {
				this.date1 = e.target.value
				this.showDate1 = true
			},
			bindDateChange2(e) {
				this.date2 = e.target.value
				this.showDate2 = true
			},
			bindDateChange3(e) {
				this.date3 = e.target.value
				this.showDate3 = true
			},
			bindDateChange4(e) {
				this.date4 = e.target.value
				this.showDate4 = true
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			getActivityList() {
				this.loadStatus = "loading"
				this.$api.get('/api/act/getActivityList', {
					params: {
						pageNo: this.pageNo,
						pageSize: this.pageSize,
						lat: this.addressData.lat,
						lng: this.addressData.lng,
						enStart: this.date1 + ' 00:00:00',
						enEnd: this.date2 + ' 00:00:00',
						acStart: this.date3 + ' 00:00:00',
						acEnd: this.date4 + ' 00:00:00',
						isPrice: this.isPrice,
						state: this.state,
						typeId: this.typeId
					}
				}).then((res) => {
					//this.swiperList=res.data
					console.log(res.data)
					res.data.forEach((item) => {
						item.poster = this.$baseUrl + item.poster
					})
					if (res.data.length > 0) {
						this.hotActiveList = this.hotActiveList.concat(res.data)
						this.pageNo++
						if (res.data.length < this.pageSize) {
							this.loadStatus = "noMore"
						} else {
							this.loadStatus = 'more'
						}
					} else {
						this.loadStatus = "noMore"
					}
				})
			},
			changeType(index) {
				if (index !== 2) {
					this.filterType = index
					this.showMask = true
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
