import Axios from 'axios'

Axios.defaults.baseURL = 'http://localhost:8080/api';
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Axios.defaults.headers.common['Authorization'] = '1111111';

export function http(url, options){
	var promise = '';
	var config = {};
	if(!options.method || options.method.toLowerCase() == 'get'){
		config.params = options.data;
		promise = Axios.get(url, config.params);
	}
	else if(options.method.toLowerCase() == 'post'){
		promise = Axios.post(url, options.data, config);
	}

	return new Promise((resolve, reject) => {
		promise.then(response => {
			resolve(response.data);
		}, error => {
			reject(error);
		}).catch(error => {
			console.log(reject(error));
		});
	});
}

export default {
	getMenu(params){
		return http('/menu', params);
	},
	addMenu(params){
		return http('/menu/add', params);
	},
	removeMenu(params){
		return http('/menu/delete', params);
	},
	updateMenu(params){
		return http('/menu/update', params);
	},
	getFlex(params){
		return http('/flex', params);
	},
	getList(params){
		return http('/list', params);
	},
	getCssList(params){
		return http('/css', params);
	},
	getWorkList(params){
		return http('/work', params);
	},
	addWork(params){
		return http('/work/add', params);
	},
	getMorningList(params){
		return http('/morning', params);
	},
	addMorning(params){
		return http('/morning/add', params);
	}
}