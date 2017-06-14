export default{
	install(Vue){
		let util = {};
		util.getLocalStorage = (item) => {
			return localStorage.getItem(item);
		}
		util.setLocalStorage = (item, val) => {
			return localStorage.setItem(item, val);
		}
		util.trim = (str) => {
			return str.replace(/(^\s*)|(\s*$)/g, "");
		}
		util.isEmptyObject = (obj) => {
			for(let key in obj){
				return false;
			}
			return true;
		}
		util.getMonthDays = (day) => {
			let year = day.split('-')[0];
			let month = day.split('-')[1];
	    	let temp = new Date(year, month, 0);
	    	return temp.getDate();
		}
		util.compare = (value1, value2) => {
			if (value1 < value2) {
				return 1;
			} else if (value1 > value2) {
				return -1;
			} else {
				return 0;
			}
		}
		util.unique = (arr) => {
            let theArr = [];
            for(let i = 0; i < arr.length; i++){
                if(theArr.indexOf(arr[i]) === -1){
                    theArr.push(arr[i]);
                }
            }
            return theArr;
        }
		util.getMorningCount = (arr, now) => {
			arr = arr.sort(util.compare);
			let arrLength = arr.length;
			if(arrLength <= 1){
				return arrLength;
			}
			else{
				let count = 1;
				for(let i = 0; i < (arrLength - 1); i++){
					let [year1, month1, day1] = arr[i].split('-');
					let [year2, month2, day2] = arr[i+1].split('-');
					if(year1 === year2){
						if(month1 === month2){
							if(day1 - day2 === 1){
								count += 1;
							}
							else{
								return count;
							}
						}
						else if((month1 - month2) === 1){
							let month2Day = util.getMonthDays(arr[i+1]);
							if(day2 == month2Day && day1 == 1){
								count += 1;
							}
							else{
								return count;
							}
						}
						else{
							return arr[0] === now ? 1 : 0;
						}
					}
					else{
						return arr[0] === now ? 1 : 0;
					}
				}
				return count;
			}
		}
		util.getDiffDay = (day) => {
			let ONEDAY = 24*60*60*1000;
            let start = new Date(day).getTime();
            let now = new Date().getTime();
            return Math.ceil((now - start) / ONEDAY);
		}
		Vue.prototype.$util = util;
	}
}