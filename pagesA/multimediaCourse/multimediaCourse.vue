<template>
	<view class="main">
		<template v-if="type==1">
			<video id="myVideo" :src="video" class="video" @error="videoErrorCallback" :danmu-list="danmuList" enable-danmu
			 danmu-btn controls></video>
			<text class="title">儿童行为习惯培养</text>
			<view class="desc">
				首先，提现中的时候可按照分佣接，它涉及的问题比较广泛如果你想在装修过程中省心一些，那就请你费一些银子吧。省心的办法不是没有，只是看你肯不肯选罢了。找一家声誉好的大型装修公司全包。
			</view>
		</template>
		<template v-if="type==2">
			eeeee
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 1,
				video: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4'
			};
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
