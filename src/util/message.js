import $ from 'jquery'
export default{
	install(Vue){
		var defaultDiv = '<div id="w-message">\
							<div id="w-message-contain">\
							</div>\
						  </div>'
		// $('body').append(defaultDiv);
		let message = {};
		message.success = (message = '成功',duration = 1.5) => {
			$('#w-message-contain').html(message);
		}
		Vue.prototype.$Message = message;
	},

}