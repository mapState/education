<template>
	<view class="main">
			<view class="tabs">
				<view class="tab" :class="{'active':tabIndex==0}" @click="tabIndex=0">
					活动收藏
				</view>
				<view class="tab" :class="{'active':tabIndex==1}" @click="tabIndex=1">
					课程收藏
				</view>
			</view>
			<view class="list" v-if="tabIndex==0">
				<block v-for="(item,index) in 4" :key="index">
					<Activity :type="index"></Activity>
				</block>
			</view>
			<view class="list" v-if="tabIndex==1">
				<course-item v-for="item in 2" :key="item"></course-item>
			</view>
	</view>
</template>

<script>
	import Activity from '@/components/Activity.vue';
	import CourseItem from '@/components/CourseItem.vue';
	export default {
		components: {
			Activity,
			CourseItem
		},
		data() {
			return {
				tabIndex:0
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
@import './index.scss'
</style>
