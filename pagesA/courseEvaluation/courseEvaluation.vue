<template>
	<view class="main">
		<view class="list">
			<course-item></course-item>
		</view>
		<view class="block">
			
		</view>
		<view class="titleBox">
			<text></text>
			<view class="">
				全部评价
			</view>
		</view>
		<view class="textarea">
			<textarea placeholder-class="plClass" placeholder="这一刻的想法~" :maxlength="-1"/>
		</view>
		<view class="addBtn">
			<view class="item">
				<image src="../../static/img/addImg.png" mode="aspectFill" class="addImg"></image>
			</view>
		</view>
		<view class="post">
			发 布
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
				
			};
		}
	}
</script>

<style lang="scss">
@import './index.scss'
</style>
