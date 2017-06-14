<template>
  	<div class="morning">
    	<Wgrid>
            <Wdate @setDay="setDay" :setColor="setColor" slot="wgrid"></Wdate>
            <div slot="wgrid">
                <animated-div :value="morningAll" title="早起天数" styles="animated-number1"></animated-div>
            	<animated-div :value="morningCount" title="连续早起天数" styles="animated-number2"></animated-div>
            </div>
            <div slot="wgrid">
                <animated-div :value="longestHand" title="最长的牵手" styles="animated-longest"></animated-div>
            </div>
        </Wgrid>
  	</div>
</template>

<script>
import Wgrid from 'components/wgrid'
import Wdate from 'components/wdate'
import common from 'services/common'
import animatedDiv from 'components/animated-div'

export default {
	components : {
		Wdate,
		Wgrid,
        animatedDiv
	},
  	data () {
    	return {
            morningList: [],
            morningAll: 0,
            morningCount: 0,
            longestHand: 0
    	}
  	},
    methods:{
        setColor(day){
        	if(this.morningList.indexOf(day) > -1){
        		return 'day-morning';
        	}
        },
        setDay(day){
            if(day){
                let dates = [];
                this.morningList.forEach(item => {
                    dates.push(item);
                });
                let index = dates.indexOf(day);
                if(index == -1){
                    dates.push(day);
                }
                else{
                    dates.splice(index,1);
                }
                common.addMorning({
                    method: 'post',
                    data:{
                        dates: dates
                    }
                }).then(data => {
                    // alert('设置成功');
                    this.getMorningList();
                });
            }
        },
        getMorningList(){
            common.getMorningList({}).then(data => {
                this.morningList = this.$util.unique(data.data);
                this.morningCount = this.$util.getMorningCount(this.morningList);
                this.morningAll = this.morningList.length;
            });
        }
    },
    mounted(){
        this.getMorningList();
        this.longestHand = this.$util.getDiffDay('2015-07-01');
    }
}
</script>

<style lang="scss">
.morning{
	height:100%;
	padding:10px;
}
.animated-number1{
	background: radial-gradient( 
        rgba(255, 255, 0, 0.7),
        rgba(255, 127, 0, 0.7),
        rgba(255, 0, 0, 0.7)
        );
}
.animated-number2{
	background: radial-gradient( 
        rgba(0, 255, 255, 0.7),
        rgba(0, 126, 255, 0.7),
        rgba(139, 0, 255, 0.7)
        );
}
.animated-longest{
    background: radial-gradient( 
        rgba(249, 205, 173, 0.7),
        rgba(254, 114, 121, 0.7),
        rgba(254, 67, 101, 0.8)
        );
}

</style>
