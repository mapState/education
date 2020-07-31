<script>
	// import QQMapWX from './common/qqmap-wx-jssdk.min.js';
	// let qqmapsdk;
	// let addressData={};
	export default {
		globalData:{
			activeData:{},
			oldActiveData:{},//往期活动
			activityTeamList:{},
			addressData:{
				lat:'',
				lng:'',
				city:''
			},
			learnDetail:{},
			level:[]
		},
		onLaunch: function() {
			console.log('App Launch')
			this.getLevel()
		},
		onShow: function() {
			//this.getUserInfo()
			
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			getUserInfo(){
				this.$api.get('/api/user/getUserInfo').then((res)=>{
					console.log(res)
				})
			},
			getLevel(){
				this.$api.get('/api/static/userLevel').then((res)=>{
					if(res.data.length>0){
						getApp().globalData.level=res.data
					}
				})
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	.main{
		width:100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
