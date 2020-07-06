<template>
	<view class="main">
		<view class="tabs">
			<view class="tab" :class="{'active':tabIndex==index}" @click="changeTabIndex(index)" v-for="(item,index) in tabList"
			 :key="index">
				{{item}}
			</view>
		</view>
		<view class="section1" v-if="tabIndex==0&&showRecommend==false">
			<view class="title">
				当前：国际儿童读书日
			</view>
			<view class="nav">
				<text>上一本：五只小猪</text>
				<text>下一本：我不想吃饭</text>
			</view>
			<swiper class="swiper" :interval="2000" :duration="500" :circular="true" @change="swiperChange" indicator-color="#fff">
				<swiper-item v-for="(item,index) in imgList" :key="index">
					<image :src="item" mode="aspectFill" class="itemImg"></image>
				</swiper-item>
			</swiper>
			<view class="dots">
				{{currentIndex+1}}/{{imgList.length}}
			</view>
		</view>
		<view class="recommend" v-if="tabIndex==0&&showRecommend">
			<view class="header">
				<image src="../../static/1.jpg" mode="aspectFill" class="img" @click="goDetail"></image>
				<view class="desc">
					<text class="t1">国际儿童读书日</text>
					<text class="t2">阅读结束</text>
					<view class="btns">
						<view class="prev">
							上一本
						</view>
						<view class="next">
							下一本
						</view>
					</view>
				</view>
			</view>
			<view class="blackBlock">

			</view>
			<view class="title">
				推荐学习
			</view>
			<view class="list">
				<course-item v-for="item in 2" :key="item"></course-item>
			</view>
		</view>
		<view class="section2" v-if="tabIndex==1">
			<view class="music-box">
				<image src="../static/img/musicBg1.png" mode="aspectFill" class="circleImg"></image>
				<image src="../static/img/musicbg-2.png" mode="aspectFill" class="roImg" :class="{'running':playState==0}"></image>
				<image src="../static/icon/bf.png" mode="aspectFit" class="bfIcon" @click="bf"></image>
			</view>
			<view class="audio-wrapper">
				<view class="audio-number">{{nowtime}}</view>
				<slider class="audio-slider" :value="currentTime" min="0" :max="duration" @change="sliderChange" block-size="15" activeColor="#FDD30F" />
				<view class="audio-number">{{alltime}}</view>
			</view>
			<text class="courseTitle">国际儿童读书日音频名称</text>
		</view>
		<view class="section3" v-if="tabIndex==2">
			<view class="title">
				一：图文解读
			</view>
			<view class="detail">
				首先，心理压力比较具体和直接，它涉及的问题比较广泛如果你想在装修过程中省心一些，那就请你费一些银子吧。省心的办法不是没有，只是看你肯不肯选罢了。找一家声誉好的大型装修公司全包。一般来说全包的价格从每平米建筑面积500元至1000元，再贵的也有，这要看你怎么设计，怎么用料。大公司就这样好，他为了保证自己的信誉不受损害，一定会认真地对待每个客户。所以在用料和做工上你完全可以放心。你所做的就是准备好付银子和验收。
			</view>
		</view>
		<view class="section3" v-if="tabIndex==3">
			<view class="detail">
				首先，心理压力比较具体和直接，它涉及的问题比较广泛如果你想在装修过程中省心一些，那就请你费一些银子吧。省心的办法不是没有，只是看你肯不肯选罢了。找一家声誉好的大型装修公司全包。一般来说全包的价格从每平米建筑面积500元至1000元，再贵的也有，这要看你怎么设计，怎么用料。大公司就这样好，他为了保证自己的信誉不受损害，一定会认真地对待每个客户。所以在用料和做工上你完全可以放心。你所做的就是准备好付银子和验收。
			</view>
		</view>
		<image src="../static/icon/download.png" mode="aspectFill" class="downIcon" v-if="tabIndex==3"></image>
	</view>
</template>

<script>
	let bgAudioMannager = '';
	import CourseItem from '@/components/CourseItem.vue';
	export default {
		components: {
			CourseItem
		},
		data() {
			return {
				showRecommend: false,
				tabIndex: 0,
				tabList: ['绘本图', '听音频', '阅读指导', '游戏介绍'],
				currentIndex: 0,
				imgList: ['https://hbimg.huabanimg.com/56f72932c7d3ad052b3de13a6bf9630207873c73bf8e3-8VztuL_fw658/format/webp',
					'https://hbimg.huabanimg.com/34e18c2c70065b9cde1f5f031610bf1652a37c88b47a2-qP9HpD_fw658/format/webp',
					'https://hbimg.huabanimg.com/f36b1e4adcf4a7ef21570aba62fbb887e737d8b4bcee7-v4LYHM_fw658/format/webp'
				],
				currentIndex: 0,
				songList: [{
						"name": "走歌人",
						"author": "暗杠",
						"src": "http://music.163.com/song/media/outer/url?id=418990139.mp3",
						"img": "http://p2.music.126.net/_UOTSqLC8qHRivyuUBC9OQ==/18200215974944920.jpg"				
					},
					{
						"name": "走歌人原版无损伴奏",
						"author": "暗杠",
						"src": "http://music.163.com/song/media/outer/url?id=430685718.mp3",
						"img": "http://p2.music.126.net/_UOTSqLC8qHRivyuUBC9OQ==/18200215974944920.jpg"
					}
				],
				duration: 0,
				currentTime: 0,
				playWay: 1,//循环or列表
				playState: 1,//播放状态 0播放1暂停
				nowIndex: 0,
			};
		},
		computed: {
			'nowtime': function() {
				var that = this
				var s = that.currentTime
				//计算分钟
				//算法：将秒数除以60，然后下舍入，既得到分钟数
				var h;
				h = Math.floor(s / 60);
				//计算秒
				//算法：取得秒%60的余数，既得到秒数
				s = s % 60;
				//将变量转换为字符串
				h += '';
				s += '';
				//如果只有一位数，前面增加一个0
				h = (h.length == 1) ? '0' + h : h;
				s = (s.length == 1) ? '0' + s : s;
				return h + ':' + s;
			},
			'alltime': function() {
				var that = this
				var s = that.duration
				//计算分钟
				//算法：将秒数除以60，然后下舍入，既得到分钟数
				var h;
				h = Math.floor(s / 60);
				//计算秒
				//算法：取得秒%60的余数，既得到秒数
				s = s % 60;
				//将变量转换为字符串
				h += '';
				s += '';
				//如果只有一位数，前面增加一个0
				h = (h.length == 1) ? '0' + h : h;
				s = (s.length == 1) ? '0' + s : s;
				return h + ':' + s;
			}		
		},
		onLoad() {
			bgAudioMannager = uni.getBackgroundAudioManager();
			//如果要默认播放的话，把以下注释取消
			//this.bgAudioInnit();
		},
		methods: {
			goDetail(){
				uni.navigateTo({
					url:"/pages/courseDetails/courseDetails?type=1"
				})
			},
			bf(){
				if(this.playState==1){
					this.play()
				}else{
					this.pause()
				}
				
			},
			changeTabIndex(index) {
				this.tabIndex = index
			},
			swiperChange(e) {
				this.currentIndex = e.detail.current
				if (this.currentIndex == (this.imgList.length - 1)) {
					this.showRecommend = true
				}
			},
			sliderChange(e) {
				this.currentTime = e.detail.value
				bgAudioMannager.seek(this.currentTime)
			},
			bgAudioInnit() {
				var that = this
				bgAudioMannager.title = that.songList[that.nowIndex].name;
				bgAudioMannager.singer = that.songList[that.nowIndex].author;
				bgAudioMannager.coverImgUrl = that.songList[that.nowIndex].img;
				bgAudioMannager.src = that.songList[that.nowIndex].src;
			
				bgAudioMannager.onPlay(() => {
					that.playFunc()
				})
				bgAudioMannager.onPause(() => {
					that.pauseFunc()
				})
				bgAudioMannager.onEnded(() => {
					that.next()
				})
				bgAudioMannager.onTimeUpdate(() => {
					this.currentTime = Math.floor(bgAudioMannager.currentTime);
				})
				bgAudioMannager.onPrev(function() {
					that.last()
				})
				bgAudioMannager.onNext(function() {
					that.next()
				})
			
				bgAudioMannager.onError(function() {
					that.error()
				})
				bgAudioMannager.onWaiting(function() {
					that.playState = 0
				})
			
				bgAudioMannager.onCanplay(function() {
					// that.duration = Math.floor(bgAudioMannager.duration)
				})
			
			},
			error() {
				this.playState = 0
			},
			play() {
				var that = this
				if (bgAudioMannager.src == undefined) {
					this.bgAudioInnit()
				}
				bgAudioMannager.play()
			
			},
			pause() {
				var that = this
			
				bgAudioMannager.pause()
			},
			playFunc() {
				var that = this
				that.playState = 0
				that.duration = Math.floor(bgAudioMannager.duration)
			},
			pauseFunc() {
				var that = this
				that.playState = 1
			},
			last(){
				
			},
			next(){
				
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
