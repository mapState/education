<template>
	<view class="main">
		<view class="search">
			<input class="input" placeholder="搜索城市" placeholder-class="plClass" @focus="focus=true" @blur="focus=false" />
			<image src="../../static/icon/ss.png" mode="aspectFill" class="ssIcon" :class="{'focusClass':focus}"></image>
		</view>
		<view class="tabs">
			<view class="tab" :class="{'tabActive':tabIndex==0}" @click="changeIndex(0)">
				国内
			</view>
			<view class="tab" :class="{'tabActive':tabIndex==1}" @click="changeIndex(1)">
				国际港澳台
			</view>
		</view>
		<view class="current" v-show="tabIndex==0">
			<text class="now">您正在看：杭州江干区</text>
			<view class="change">
				<text>切换县区</text>
				<image src="../../static/icon/back.png" mode="aspectFill" class="backIcon"></image>
			</view>
		</view>
		<view class="tagList" v-show="tabIndex==0">
			<view class="tag tagActive">
				全部
			</view>
			<view class="tag" v-for="item in 11" :key="item">
				西湖区
			</view>
		</view>
		<view class="international" v-show="tabIndex==1">
			<view class="left">
				<scroll-view scroll-y="true" class="leftList">
					<view class="item leftActive" >
						港澳台
					</view>
						<view class="item" v-for="item in 16" :key="item">
							港澳台
						</view>
				</scroll-view>
			</view>
			<view class="right">
				<scroll-view scroll-y="true" class="rightList">
						<view class="item">
							<text>当前定位</text>
							<view class="tag">
								<image src="../../static/icon/pdw.png" mode="aspectFill" class="dwIcon"></image>
								<text>杭州</text>
							</view>
						</view>
						<view class="item" v-for="item in 10" :key="item">
							<text>中国香港</text>
							<view class="tag">
								<text >杭州</text>
							</view>
						</view>
				</scroll-view>
			</view>
		</view>
		<view class="cityList" v-show="tabIndex==0">
			<view class="title">
				A
			</view>
			<view class="item" v-for="item in 20" :key="item">
				安庆
			</view>
		</view>
		<view class="abcList" v-show="tabIndex==0">
			<view class="item" v-for="item in abcList" :key="item">
				{{item}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				focus:false,
				tabIndex: 0,
				abcList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Z']
			}
		},
		methods: {
			changeIndex(index) {
				this.tabIndex = index
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
