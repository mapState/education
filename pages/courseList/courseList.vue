<template>
	<view class="main">
		<view class="search">
			<view class="left">
				<text>0-3岁</text>
				<image src="../../static/icon/down.png" mode="aspectFill"></image>
			</view>
			<view class="inputBox">
				<input class="input" placeholder="搜索课程" placeholder-class="plClass" @focus="focus=true" @blur="focus=false"/>
				<image src="../../static/icon/ss.png" mode="aspectFill" class="ssIcon" :class="{'focusClass':focus}"></image>
			</view>
		</view>
		<view class="filter">
			<view class="item" @click="changeType(1)">
				<text>全部分类</text>
				<image src="../../static/icon/filter.png" mode="aspectFit" class="down"></image>
			</view>
			<view class="item" @click="changeType(3)">
				<text>性别</text>
				<image src="../../static/icon/filter.png" mode="aspectFit" class="down"></image>
			</view>
			<view class="item" @click="changeType(2)">
				<text>中文专区</text>
				<image src="../../static/icon/filter2.png" mode="aspectFit" class="price"></image>
			</view>
			<!-- <view class="item" @click="changeType(4)">
				<text>时间</text>
				<image src="../../static/icon/filter.png" mode="aspectFit" class="down"></image>
			</view>
			<view class="item" @click="changeType(5)">
				<text>状态</text>
				<image src="../../static/icon/filter.png" mode="aspectFit" class="down"></image>
			</view> -->
			<view class="section1" v-if="filterType==1">
				<view class="tag tagActive">
					全部分类
				</view>
				<view class="tag" v-for="item in 6" :key="item">
					行为习惯
				</view>
			</view>
			<view class="section3" v-if="filterType==3">
				<view class="item">
					<text class="active">全部项</text>
					<image src="../../static/icon/cur.png" mode="aspectFill"></image>
				</view>
				<view class="item">
					<text class="">男</text>
					<image src="../../static/icon/cur.png" mode="aspectFill" v-if="false"></image>
				</view>
				<view class="item">
					<text class="">女</text>
					<image src="../../static/icon/cur.png" mode="aspectFill" v-if="false"></image>
				</view>
			</view>
			<view class="section4" v-if="filterType==4">
				<view class="item">
					<input class="inputs" placeholder-class="plclass" placeholder="报名开始时间" />
					<text></text>
					<input class="inpute" placeholder-class="plclass" placeholder="报名结束时间" />
				</view>
				<view class="item">
					<input class="inputs" placeholder-class="plclass" placeholder="报名开始时间" />
					<text></text>
					<input class="inpute" placeholder-class="plclass" placeholder="报名结束时间" />
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
			<block v-for="item in 3" :key="item">
				<course-item></course-item>
			</block>
		</view>
		<view class="mask" v-show="showMask" @click="closeMask">
			
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
				focus:false,
				filterType:0,
				showMask:false
			}
		},
		methods: {
			changeType(index){
				if(index!==2){
					this.filterType=index
					this.showMask=true
				}
			},
			closeMask(){
				this.filterType=0
				this.showMask=false
			}
		}
	}
</script>

<style lang="scss">
@import  './index.scss'
</style>
