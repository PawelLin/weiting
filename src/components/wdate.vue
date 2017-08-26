<template>
  	<div class="wdate">
    	<table class="wdate-table">
            <thead>
                <th colspan="7">
                    {{dateDatas.year + '年' + (dateDatas.month + 1) + '月'}}
                </th>
            </thead>
            <tbody>
                <tr>
                    <td>日</td>
                    <td>一</td>
                    <td>二</td>
                    <td>三</td>
                    <td>四</td>
                    <td>五</td>
                    <td>六</td>
                </tr>
                <tr v-for="days in dateDatas.days">
                    <td @click.stop="setDay(day)" :class="setColor(day)" v-for="day in days">
                        <span>{{day.split('-')[2]}}</span>
                        <span v-if="day == today" class="day-today"></span>
                    </td>
                </tr>
                <tr class="text-center btn-date">
                    <td @click="prePage" colspan="2">&lt;&lt;</td>
                    <td @click="nowPage" colspan="3">今天</td>
                    <td @click="nextPage" colspan="2">&gt;&gt;</td>
                </tr>
            </tbody>
        </table>
  	</div>
</template>

<script>
import creaetDate from '../util/create-date.js'
import common from 'services/common'

export default {
	props:{
        setColor:Function,
        setBorder:String
	},
  	data () {
    	return {
            dateDatas: {},
            today:new Date().Format('yyyy-MM-dd')
    	}
  	},
    computed:{
    },
    methods:{
        prePage(){
            this.dateDatas = creaetDate.prePage(this.dateDatas);
        },
        nowPage(){
            this.dateDatas = creaetDate.nowPage();
        },
        nextPage(){
            this.dateDatas = creaetDate.nextPage(this.dateDatas);
        },
        setDay(day){
            this.$emit('setDay',day);
        }
    },
    mounted(){
        var NOW = new Date();
        var NOW_YEAR = NOW.getFullYear();
        var NOW_MONTH = NOW.getMonth();
        this.dateDatas = creaetDate.createMonth(NOW_YEAR, NOW_MONTH);
    }
}
</script>

<style lang="scss">
.wdate{
    display:flex;
    justify-content:center;
    padding-bottom:10px;
}
.wdate-table{
    border-collapse:collapse;
}
.wdate-table th{
    padding:10px;
    border:1px solid #fff;
    transition: border 1s;
}
.wdate-table td{
    height:40px;
    padding:10px 12px;
    border:1px solid #fff;
    transition: border 1s;
    position:relative;
}
.wdate-table td:hover{
    cursor:pointer;
    background-color:#fff;
}
.day-realx{
    background-color:#b6ecde;
}
.day-sot{
    background-color:#ffd75d;
}
.day-normal{
    background-color:#79fd7e;
}
.day-holiday{
    background-color:#f07746;
}
.day-leave{
    background-color:#ffeb3b;
}
.day-ot{
    background-color: #F9C;
}
.day-today{
    width: 25px;
    height: 25px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border: 1px solid red;
    border-radius: 50%;
}
.day-morning{
    background: linear-gradient(90deg, 
        rgba(255, 0, 0, 0.7), 
        rgba(255, 127, 0, 0.7),
        rgba(255, 255, 0, 0.7),
        rgba(0, 255, 0, 0.7),
        rgba(0, 255, 255, 0.7),
        rgba(0, 0, 255, 0.7),
        rgba(139, 0, 255, 0.7));
    color: #fff;
}
.btn-date>td:hover{
    background-color:#fff;
    cursor:pointer;
    user-select: none;
}
.btn-date>td:active{
    transform:scale(0.9);
}

.wdate-style-realx{
    th{
        border:1px solid #b6ecde;
        transition: border 1s;
    }
    td{
        border:1px solid #b6ecde;
        transition: border 1s;
    }
    td:hover{
        background-color:#b6ecde;
    }
}
.wdate-style-sot{
    th{
        border:1px solid #ffd75d;
        transition: border 1s;
    }
    td{
        border:1px solid #ffd75d;
        transition: border 1s;
    }
    td:hover{
        background-color:#ffd75d;
    }
}
.wdate-style-normal{
    th{
        border:1px solid #79fd7e;
        transition: border 1s;
    }
    td{
        border:1px solid #79fd7e;
        transition: border 1s;
    }
    td:hover{
        background-color:#79fd7e;
    }
}
.wdate-style-holiday{
    th{
        border:1px solid #f07746;
        transition: border 1s;
    }
    td{
        border:1px solid #f07746;
        transition: border 1s;
    }
    td:hover{
        background-color:#f07746;
    }
}
.wdate-style-leave{
    th{
        border:1px solid #ffeb3b;
        transition: border 1s;
    }
    td{
        border:1px solid #ffeb3b;
        transition: border 1s;
    }
    td:hover{
        background-color:#ffeb3b;
    }
}
.wdate-style-ot{
    th{
        border:1px solid #f9c;
        transition: border 1s;
    }
    td{
        border:1px solid #f9c;
        transition: border 1s;
    }
    td:hover{
        background-color:#f9c;
    }
}
</style>

<!-- .wdate-table>tbody>tr:not(:first-child):not(:last-child):hover{
    background-color:#fff;
} -->