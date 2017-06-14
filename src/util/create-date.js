
export default {
    list:1,
	//月份数据生成
    createMonth(year,month){
    	var dates = [];
    	var NOW = new Date();
        var NOW_YEAR = NOW.getFullYear();
        var NOW_MONTH = NOW.getMonth();
        var now_year = year;
        var next_year = year;
        var now_month = month;
        for(var i = 1; i <= this.list; i++){
            if(now_month < 12 && now_year == next_year){
                var _days = this.getFullDays(now_year, now_month);
                dates.push({year:now_year,month:now_month,days:_days});
                now_month = now_month + 1;
                if(now_month > 11){
                    next_year += 1;
                    now_month = 0;
                }
            }
            else{
                var _days = this.getFullDays(next_year, now_month);
                dates.push({year:next_year,month:now_month,days:_days});
                now_month = now_month + 1;
            }
        }
        return dates[0];
    },
	//拼接月份的天数
    getFullDays(year,month){
        var days = [];
        var DAYS = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
        var _days = DAYS.slice(0,this.getCountDays(year,month));
        for(var i = 0; i < _days.length; i++){
            if((month + 1) < 10){
                if(_days[i] < 10){
                    _days[i] = year + '-0' + (month + 1) + '-0' + _days[i];
                }
                else{
                    _days[i] = year + '-0' + (month + 1) + '-' + _days[i];
                }
            }
            else{
                if(_days[i] < 10){
                    _days[i] = year + '-' + (month + 1) + '-0' + _days[i];
                }
                else{
                    _days[i] = year + '-' + (month + 1) + '-' + _days[i];
                }
            }
        }
        var day = new Date(year,month,1).getDay();
        for(var i = 0; i < day; i++){
            _days.unshift('');
        }
        var _other = 7 - _days.length % 7;
        for(var i = 0; i < _other; i++){
            _days.push('');
        }
        if(_days.length != 42){
            for(var i = 0; i < 7; i++){
                _days.push('');
            }
        }
        var daysLength = _days.length / 7;
        for(var i = 0; i < daysLength; i++){
            days.push(_days.slice(i * 7, (i + 1) * 7));
        }
        return days;
    },
	//获取月份的天数
	getCountDays(year,month){
	    month = parseInt(month, 10) + 1;
	    var temp = new Date(year, month, 0);
	    return temp.getDate();
	},
	prePage(datas){
    	var firstMonth = datas.month - this.list;
    	var firstYear = datas.year;
    	if(firstMonth < 0){
    		firstMonth += 12;
    		firstYear -= 1;
    	}
    	return this.createMonth(firstYear,firstMonth);
    },
    nowPage(){
    	var NOW = new Date();
        var NOW_YEAR = NOW.getFullYear();
        var NOW_MONTH = NOW.getMonth();
    	return this.createMonth(NOW_YEAR, NOW_MONTH);
    },
	nextPage(datas){
    	var lastData = datas;
        lastData.month += 1;
        if(lastData.month > 11){
            lastData.year += 1;
            lastData.month = 0;
        }
    	return this.createMonth(lastData.year,lastData.month);
    }
}

