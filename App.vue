<script>
	import QQMapWX from './common/qqmap-wx-jssdk.min.js';
	let qqmapsdk;
	let addressData={};
	export default {
		globalData:{
			activeData:{},
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
			qqmapsdk = new QQMapWX({
				key: 'ZHVBZ-ZM36S-O3JOX-63CPR-EYOX6-EOFGR' // 必填
			});
			wx.getLocation({
				type: 'wgs84',
				success:(res)=>{
					console.log(res);
					addressData.lat = res.latitude
					addressData.lng = res.longitude
					//2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
					qqmapsdk.reverseGeocoder({
						location: {
							latitude: res.latitude,
							longitude: res.longitude
						},
						success:(addressRes) =>{
							//console.log(addressRes);
							//var address = addressRes.result.formatted_addresses.recommend;
							addressData.city = addressRes.result.address_component.city + addressRes.result.address_component.district
							getApp().globalData.addressData=addressData
							try {
							    uni.setStorageSync('address', addressData);
							} catch (e) {
							    // error
							}
						}
					})
				}
			})
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
