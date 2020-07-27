import Vue from 'vue'
import App from './App'

import uniRequest from 'uni-request';
uniRequest.defaults.baseURL = 'http://192.168.0.188:10000';
// uniRequest.defaults.headers.common['Authorization'] = 'Bearer ' + uni.getStorageSync('token');
uniRequest.defaults.headers.post['Content-Type'] = 'application/json';
// 请求拦截
uniRequest.interceptors.request.use(
	request => {
		request.headers['token'] = uni.getStorageSync('token');
	//配置基本信息
	return request;
	},
	err => {
		uni.showLoading({
			title: '请求超时啦',
			mask:"true"
		});
	return Promise.reject(err);
});

	//响应拦截
	uniRequest.interceptors.response.use(function(response) {
		//console.log(response)
		if(response.status==200&&response.data.code===10200){
			return Promise.resolve(response.data);
		}else if(response.status===401){
				uni.showToast({
					title:'登录过期',
					icon:"none",
					duration:500
				})
				 uni.clearStorageSync();
				 setTimeout(()=>{
					 uni.reLaunch({
					     url: '/pages/mine/mine'
					 });
					 return Promise.reject(response.data);
				 },1500)
		}
		else{
			uni.showToast({
				title:response.data.message,
				icon:"none"
			})
			return Promise.reject(response.data);
		}
	}, function(error) {
		uni.hideLoading();
		// uni.showLoading({
		// 	title: '网络故障...',
		// 	mask:"true"
		// });
	//console.log('返回进入拦截失败')
	return Promise.reject(error);
});


Vue.config.productionTip = false
Vue.prototype.$api=uniRequest; 
Vue.prototype.$rqUrl='http://192.168.0.188:10000';
Vue.prototype.$baseUrl='https://smallwx.pkbkok.com/lesson/file/view/';
Vue.prototype.$uploadUrl='https://smallwx.pkbkok.com/lesson/file/upload';
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
