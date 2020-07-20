<template>
	<view class="main">
		<view class="search">
			<input class="input" placeholder="搜索城市" placeholder-class="plClass" @focus="focus=true" @blur="focus=false" />
			<image src="../../static/icon/ss.png" mode="aspectFill" class="ssIcon focusClass"></image>
		</view>
		<view class="tabs">
			<view class="tab" :class="{'tabActive':tabIndex==0}" @click="changeIndex(0)">
				国内
			</view>
			<view class="tab" :class="{'tabActive':tabIndex==1}" @click="changeIndex(1)">
				国际港澳台
			</view>
		</view>

		<view class="international" v-show="tabIndex==1">
			<view class="left">
				<scroll-view scroll-y="true" class="leftList">
					<view class="item leftActive">
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
							<text>杭州</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view v-show="tabIndex==0" class="domestic">
			<scroll-view class="scroll-view" scroll-y scroll-with-animation="true" enable-back-to-top="true" :scroll-into-view="toIndex"
			 @scroll="scrollHandle">
				<view class="current">
					<text class="now">您正在看：杭州江干区</text>
					<view class="change">
						<text>切换县区</text>
						<image src="../../static/icon/back.png" mode="aspectFill" class="backIcon"></image>
					</view>
				</view>
				<view class="tagList">
					<view class="tag tagActive">
						全部
					</view>
					<view class="tag" v-for="item in 11" :key="item">
						西湖区
					</view>
				</view>
				<view class="cityList">
					<view class="list-item" v-for="(item, key) of cities" :key="key" :id="key">
						<view class="title">
							{{key}}
						</view>
						<view class="item" v-for="innerItem in item" :key="innerItem.cityId" >
							{{ innerItem.city }}
						</view>
					</view>
				</view>
				<view class="abcList" @touchstart="touchStart" @touchend="touchEnd" @touchmove.stop="touchMove">
					<view class="item" v-for="item in abcList" :key="item" :class="{ active: currentLetter == item }" @touchstart="getLetter" @touchend="setLetter" :id="item">
						{{item}}
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import City from "@/static/city.json";
	export default {
		data() {
			return {
				cities: City.data.cities,
				tabIndex: 0,
				abcList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q','R','S','T','W','X','Y','Z'],
				letterDetails:[],
				currentLetter:'A',
				tipsLetter:'',
				toIndex:''
			}
		},
		methods: {
			changeIndex(index) {
				this.tabIndex = index
			},
			scrollHandle(e) {
				let view = uni.createSelectorQuery().in(this).selectAll(".list-item");
				view.boundingClientRect(d => {
					let top = d[0].top;
					d.forEach(item => {
						item.top = item.top - top;
						item.bottom = item.bottom - top;
						this.letterDetails.push({
							id: item.id,
							top: item.top,
							bottom: item.bottom
						});
					});
				}).exec();

				const scrollTop = e.detail.scrollTop;
				this.letterDetails.some(item => {
					if (scrollTop >= item.top && scrollTop <= item.bottom - 20) {
						this.currentLetter = item.id;
						//当前固定用的是粘性定位，如果不用粘性定位，在这里设置
						return true;
					}
				});
			},
			touchStart(e) {
				// console.log(e);
			},
			//移动时
			touchMove(e) {
				uni.vibrateShort();
				let y = e.touches[0].clientY;
				let offsettop = e.currentTarget.offsetTop;
			
				//判断选择区域,只在选择区才会生效
				if (y > offsettop) {
					let num = parseInt((y - offsettop) / 15); //右边每个字母元素的高度
					let letter = this.alphabet[num];
					this.tipsLetter = letter;
			
					let curentLetter = this.letterTransform(letter);
					uni.showToast({
						title: curentLetter,
						icon: "none",
						duration: 1000
					});
				}
			},
			//触发结束
			touchEnd() {
				this.toIndex = this.tipsLetter;
			},
			//移动开始获取字母，并放大提示
			getLetter(e) {
				uni.vibrateShort();
				let {
					id
				} = e.currentTarget;
				this.tipsLetter = id;
			
				let curentLetter = this.letterTransform(id);
				uni.showToast({
					title: curentLetter,
					icon: "none",
					duration: 1000
				});
			},
			//移动结束设置字母，赋值到toIndex
			setLetter() {
				this.toIndex = this.tipsLetter;
			},
			
			//提示字母转换
			letterTransform(letter) {
				let str = "";
				if (letter == "area") {
					str = "区县";
				} else if (letter == "hot") {
					str = "热门";
				} else {
					str = letter;
				}
			
				return str;
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
