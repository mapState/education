<template>
	<view class="main">
		<view class="search">
			<view class="left">
				<picker @change="bindPickerChange" :value="index" :range="fClass">
					<text class="">{{fClass[fIndex]}}</text>
					<image src="../../static/icon/down.png" mode="aspectFill"></image>
				</picker>
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
			<view class="item" @click="changeType(i)" v-for="(item,i) in filterList" :key="i">
				<text>{{item}}</text>
				<template v-if="i==1">
					<image src="../../static/icon/filter2.png" mode="aspectFit" class="price"></image>
				</template>
				<template v-else>
					<image src="../../static/icon/filter-top.png" mode="aspectFit" class="down" v-if="filterType==i"></image>
					<image src="../../static/icon/filter.png" mode="aspectFit" class="down" v-else></image>
				</template>
			</view>
			<view class="section1" v-if="filterType==0">
				<view class="tag" @click="changeTagIndex(0)" :class="{'tagActive':tagIndex==0}">
					全部
				</view>
				<view class="tag" v-for="(item,i) in classList[fIndex].dictVoList" :key="i" :class="{'tagActive':item.id==tagIndex}" @click="changeTagIndex(item.id)">
					{{item.name}}
				</view>
			</view>
			<view class="section3" v-if="filterType==2">
				<view class="item" v-for="(item,i) in disList" :key="i" @click="changeDisIndex(i)">
					<text class="" :class="{'active':i==disIndex}">{{item}}</text>
					<image src="../../static/icon/cur.png" mode="aspectFill" v-if="i==disIndex"></image>
				</view>
			</view>
			<view class="section4" v-if="filterType==3">
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
				<view class="btn" @click="selTime">
					确 定
				</view>
			</view>
			<view class="section3" v-if="filterType==4">
				<view class="item" v-for="(item,i) in section3List" :key="i" @click="selStatus(i)">
					<text class="" :class="{'active':status==i}">{{item}}</text>
					<image src="../../static/icon/cur.png" mode="aspectFill" v-if="status==i"></image>
				</view>
			</view>
		</view>
		<view class="list">
			<block v-for="item in hotActiveList" :key="item.id">
				<Activity :type="item.id" :detail="item" @click.native="goDetail(item)"></Activity>
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
				tagIndex:0,
				filterList:['全部','价格','距离','时间','状态'],
				section3List:['全部','未开始','报名中','进行中','已结束'],
				disList:['全部项','周边','国内','国外'],
				disIndex:0,
				status:0,
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
				loadStatus: 'noMore',
				focus: false,
				filterType:-1,
				showMask: false,
				pageNo: 1,
				pageSize: 5,
				hotActiveList: [],
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
			goDetail(data) {
				getApp().globalData.activeData=data
				console.log(getApp().globalData.activeData)
				uni.navigateTo({
					url: "/pages/activityDetails/activityDetails"
				})
			},
			selTime(){
				this.closeMask()
				this.sortByTime()
			},
			changeDisIndex(index){
				this.disIndex=index
				if(index==0){
					this.distance=''
				}else{
					this.distance=index
				}
				this.closeMask()
				this.hotActiveList=[]
				this.pageNo=1
				this.sortByDistance()
			},
			changeTagIndex(index){
				this.tagIndex=index
				if(index==0){
					this.typeId=''
				}else{
					this.typeId=index
				}
				this.closeMask()
				this.hotActiveList=[]
				this.pageNo=1
				this.sortByTypeId()
			},
			selStatus(index){
				this.status=index
				this.state=index
				if(index==0){
					this.state=''
				}
				this.closeMask()
				this.hotActiveList=[]
				this.pageNo=1
				this.sortByState()
			},
			//获取分类列表
			getCates() {
				this.$api.get('/api/static/dictList',{
					params:{
						type:1 //1.活动分类 2.课程分类 3.绘本分类 4 帖子分类 5消费得积分 6消费得经验
					}
				}).then((res) => {
					this.getActivityList()
					let classList=[]
					res.data.forEach((item)=>{
						if(item.pid==0){
							classList.push(item.name)
							this.classList.push(item)
						}
					})
					this.fClass=classList
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
			sortByTime(){
				this.loadStatus = "loading"
				this.$api.get('/api/act/getActivityList', {
					params: {
						pageNo: this.pageNo,
						pageSize: this.pageSize,
						lat: this.addressData.lat,
						lng: this.addressData.lng,
						enStart: this.showDate1?this.date1 + ' 00:00:00':'',
						enEnd: this.showDate2?this.date1 + ' 00:00:00':'',
						acStart:this.showDate3?this.date1 + ' 00:00:00':'',
						acEnd: this.showDate4?this.date1 + ' 00:00:00':''
					}
				}).then((res) => {
					if (res.data.length>0) {
						this.hotActiveList = this.hotActiveList.concat(res.data)
						this.pageNo++
						if(res.data.length==this.pageSize){
							this.loadStatus="more"
						}else{
							this.loadStatus = "noMore"
						}
					}else {
						this.loadStatus = "noMore"
					}
				})
			},
			sortByDistance(){
				this.loadStatus = "loading"
				this.$api.get('/api/act/getActivityList', {
					params: {
						pageNo: this.pageNo,
						pageSize: this.pageSize,
						lat: this.addressData.lat,
						lng: this.addressData.lng,
						distance: this.distance
					}
				}).then((res) => {
					if (res.data.length>0) {
						this.hotActiveList = this.hotActiveList.concat(res.data)
						this.pageNo++
						if(res.data.length==this.pageSize){
							this.loadStatus="more"
						}else{
							this.loadStatus = "noMore"
						}
					}else {
						this.loadStatus = "noMore"
					}
				})
			},
			sortByState(){
				this.loadStatus = "loading"
				this.$api.get('/api/act/getActivityList', {
					params: {
						pageNo: this.pageNo,
						pageSize: this.pageSize,
						lat: this.addressData.lat,
						lng: this.addressData.lng,
						state: this.state
					}
				}).then((res) => {
					if (res.data.length > 0) {
						this.hotActiveList = this.hotActiveList.concat(res.data)
						this.pageNo++
						if(res.data.length==this.pageSize){
							this.loadStatus="more"
						}else{
							this.loadStatus = "noMore"
						}
					}else {
						this.loadStatus = "noMore"
					}
				})
			},
			sortByTypeId(){
				this.loadStatus = "loading"
				this.$api.get('/api/act/getActivityList', {
					params: {
						pageNo: this.pageNo,
						pageSize: this.pageSize,
						lat: this.addressData.lat,
						lng: this.addressData.lng,
						typeId: this.typeId
					}
				}).then((res) => {
					if (res.data.length > 0) {
						this.hotActiveList = this.hotActiveList.concat(res.data)
						this.pageNo++
						if(res.data.length==this.pageSize){
							this.loadStatus="more"
						}else{
							this.loadStatus = "noMore"
						}
					}else {
						this.loadStatus = "noMore"
					}
				})
			},
			sortByPrice(){
				this.loadStatus = "loading"
				this.$api.get('/api/act/getActivityList', {
					params: {
						pageNo: this.pageNo,
						pageSize: this.pageSize,
						lat: this.addressData.lat,
						lng: this.addressData.lng,
						isPrice: this.isPrice
					}
				}).then((res) => {
					if (res.data.length > 0) {
						this.hotActiveList = this.hotActiveList.concat(res.data)
						this.pageNo++
						if(res.data.length==this.pageSize){
							this.loadStatus="more"
						}else{
							this.loadStatus = "noMore"
						}
					}else {
						this.loadStatus = "noMore"
					}
				})
			},
			getActivityList() {
				this.loadStatus = "loading"
				this.$api.get('/api/act/getActivityList', {
					params: {
						pageNo: this.pageNo,
						pageSize: this.pageSize,
						lat: this.addressData.lat,
						lng: this.addressData.lng
					}
				}).then((res) => {
					//this.swiperList=res.data
					console.log(res.data)
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
				if (index !== 1) {
					if(this.filterType==index){
						this.showMask = false
						this.filterType=-1
						return
					}
					if(index==3){
						this.showDate1=false
						this.showDate2=false
						this.showDate3=false
						this.showDate4=false
					}
					this.filterType = index
					this.showMask = true
				}else{
					this.isPrice=this.isPrice==0?1:0
					this.hotActiveList=[]
					this.pageNo=1
					this.sortByPrice()
				}
			},
			closeMask() {
				this.filterType = -1
				this.showMask = false
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
