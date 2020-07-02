<template>
	<view class="main">
		<view class="header">
			<image src="../static/img/teamBg.png" mode="aspectFill"></image>
			<text>10</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				top:24
			};
		},
		onLoad() {
			this.top=uni.getMenuButtonBoundingClientRect().top
		}
	}
</script>

<style lang="scss">
@import  './index.scss'
</style>
