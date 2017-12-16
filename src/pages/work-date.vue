<template>
  	<div @click="setBorder = '';" class="work-date" :class="setBorder">
    	<Wgrid>
            <Wdate @setDay="addWork" :setColor="setColor" slot="wgrid"></Wdate>
            <div class="work-date-set" slot="wgrid">
                <div v-for="item in dayColor" class="work-date-color">
                    <span @click.stop="setDayColor(item)" :class="'day-' + item">&nbsp;</span>
                    <label>{{dayValue[item]}} {{dayType[item].length}}天</label>
                </div>
                <div class="work-date-color">
                    <Wbutton @search="submitSet" value="提交"></Wbutton>
                </div>
            </div>
        </Wgrid>
  	</div>
</template>

<script>

import Wgrid from 'components/wgrid'
import Wdate from 'components/wdate'
import Wbutton from 'components/wbutton'
import common from 'services/common'

export default {
	components : {
		Wdate,
		Wgrid,
        Wbutton
	},
  	data () {
    	return {
            dayType:{
                realx: [],
                sot: [],
                holiday: [],
                normal: [],
                leave: [],
                ot: []
            },
            dayColor:['realx', 'sot', 'normal', 'holiday', 'leave', 'ot'],
            dayValue:{
                realx: '休息',
                sot: '出差',
                normal: '正常',
                holiday: '假期',
                leave: '请假',
                ot: '加班'
            },
            setBorder: '',
            setBorderType: ''

    	}
  	},
    methods:{
        setColor(day){
            for(let type in this.dayType){
                if(this.dayType[type].indexOf(day) > -1){
                    return 'day-' + type;
                }
            }
        },
        setDayColor(type){
            this.setBorder = 'wdate-style-' + type;
            this.setBorderType = type;
        },
        getWorkList(){
            common.getWorkList({}).then(data => {
                if(!this.$util.isEmptyObject(data)){
                    for(let type in this.dayType){
                        this.dayType[type] = data.data[type];
                    } 
                }
            });
        },
        addWork(day){
            if(this.setBorderType && day){
                let isHaveIndex = this.dayType[this.setBorderType].indexOf(day);
                if(isHaveIndex > -1){
                    this.dayType[this.setBorderType].splice(isHaveIndex,1);
                }
                else{
                    for(let i in this.dayType){
                        let isHave = this.dayType[i].indexOf(day);
                        if(isHave > -1){
                            this.dayType[i].splice(isHave, 1);
                        }
                    }
                    this.dayType[this.setBorderType].push(day);
                }
                
            }
        },
        submitSet(){
            common.addWork({
                method: 'post',
                data:{
                    ot: this.dayType.ot,
                    realx: this.dayType.realx,
                    sot: this.dayType.sot,
                    holiday: this.dayType.holiday,
                    normal: this.dayType.normal,
                    leave: this.dayType.leave
                }
            }).then(data => {
                alert('设置成功');
                this.setBorder = '';
                this.setBorderType = '';
                this.getWorkList();
            });
        }
    },
    mounted(){
        this.getWorkList();
    }
}
</script>

<style lang="scss">
.work-date{
	height:100%;
	padding:10px;
}
.work-date-color{
    line-height:20px;
    margin-top:43px;
}
.work-date-color > span{
    display:inline-block;
    width:20px;
    height:20px;
    margin-right:5px;
    cursor:pointer;
}
</style>
