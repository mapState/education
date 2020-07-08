<template>
	<view class="main">
		<view class="tabs">
			<view class="tab" :class="{'active':tabIndex==index}" @click="changeTabIndex(index)" v-for="(item,index) in tabList"
			 :key="index">
				{{item}}
			</view>
		</view>
		<view class="form" v-if="tabIndex==0">
			<text class="title">填写信息</text>
			<view class="row">
				<text class="span">孩子姓名</text>
				<input type="text" value="" placeholder="请输入孩子名称" placeholder-class="plClass" class="input" />
			</view>
			<view class="row">
				<text class="span">出生年月</text>
				<view class="input">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="plClass" v-if="dateTip">
							请选择孩子出生年月
						</view>
						<view class="" v-else>{{date}}</view>
					</picker>
				</view>
			</view>
			<view class="row">
				<text class="span">孩子性别</text>
				<view class="input">
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="plClass" v-if="sexTip">
							请选择孩子性别
						</view>
						<view class="" v-else>{{array[index]}}</view>
					</picker>
				</view>
			</view>
			<view class="row">
				<text class="span">家庭住址</text>
				<input type="text" value="" placeholder="请输入家庭住址" placeholder-class="plClass" class="input" />
			</view>
		</view>
		<view class="main" v-if="tabIndex==1">
			<view class="child" v-for="item in 2" :key="item">
				<view class="delBtn">
					删除
				</view>
				<view class="row">
					<text class="span">孩子姓名</text>
					<text class="ctx">陈七</text>
				</view>
				<view class="row">
					<text class="span">出生年月</text>
					<text class="ctx">陈七</text>
				</view>
				<view class="row">
					<text class="span">孩子性别</text>
					<text class="ctx">陈七</text>
				</view>
				<view class="row">
					<text class="span">家庭住址</text>
					<text class="ctx">陈七</text>
				</view>
			</view>
		</view>
		<view class="saveBtn">
			保 存
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				tabIndex: 0,
				tabList: ['新增孩子', '我的孩子'],
				date: currentDate,
				dateTip: true,
				sexTip: true,
				array: ['男', '女'],
				index: 0,
			};
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			changeTabIndex(index) {
				this.tabIndex = index
			},
			bindDateChange(e) {
				this.date = e.target.value
				this.dateTip = false
			},
			bindPickerChange(e) {
				this.sexTip=false
				this.index = e.target.value
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
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss'
</style>
