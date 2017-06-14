<template>
  	<div class="flex">
    	<div class="flexDirection">
	        <div v-for="item in flexList">
	            <span :title="item.title">{{item.type}}</span>
	            <button class="flex-button" :class="{'flex-select':flexSelect[item.type] == ite.type}" v-for="ite in item.children" :title="ite.title" @click="changeFlex(item.type, ite.type)">{{ite.type}}</button>
	        </div>
	        <div id="selfFlex">
	            <div>
	                <span>order</span>
	                <input v-model="selfFlex['order']" type="number">
                    <button class="flex-button" @click="setSelfFlex">提交</button>
	            </div>
	            <div>
	                <span>flex-grow</span>
	                <input v-model="selfFlex['flex-grow']" type="number">
	            </div>
	            <div>
	                <span>flex-shrink</span>
	                <input v-model="selfFlex['flex-shrink']" type="number">
	            </div>
	            <div>
	                <span>flex-basis</span>
	                <input v-model="selfFlex['flex-basis']" type="number">
	            </div>
	            <div>
	                <span>align-self</span>
	                <input v-model="selfFlex['align-self']" type="number">
	            </div>
	        </div>
	        <div>
	            <button class="flex-button" @click="addOrRemovePip(true)">添加项目</button>
	        </div>
	        <div>
	            <button class="flex-button" @click="addOrRemovePip(false)">删除项目</button>
	        </div>
	    </div>
	    <div id="flex-container" :style="{'flex-direction' : flexDirection}">
	        <div @click="getItemStyle($event.target, item)" v-for="item in pipList" class="first-face" :style="{'backgroundColor':pipSelect === item ? '#36efd5' : '#f9c'}">
	            <div class="pip">{{item}}</div>
	        </div>
	    </div>
  	</div>
</template>

<script>
import common from 'services/common'

export default {
  	data () {
    	return {
    		flexList:[],
    		flexDirection:'',
      		pipList:[1,2,3,4,5,6,7],
            flexSelect:{
                'flex-direction':'',
                'flex-wrap':'',
                'justify-content':'',
                'align-items':''
            },
            pipSelect:'',
            selfFlex:{
                'order':'',
                'flex-grow':'',
                'flex-shrink':'',
                'flex-basis':'',
                'align-self':''
            },
            elSelect:''
    	}
  	},
  	methods: {
  		changeFlex(type,value){
            let flexDirection = document.getElementById('flex-container');
            flexDirection.style[type] = value;
            this.flexSelect[type] = value;
  		},
  		getFlex(){
  			common.getFlex({

  			}).then(data => {
  				this.flexList = data.data;
  			});
  		},
  		addOrRemovePip(type){
  			let pipLength = this.pipList.length;
  			if(type){
  				if(pipLength == 0){
  					this.pipList.push(1);
  				}
  				else{
  					this.pipList.push(this.pipList[pipLength - 1] + 1);
  				}
  			}
  			else{
  				if(pipLength != 0){
  					this.pipList.splice(pipLength - 1, 1);
  				}
  			}
  		},
        getItemStyle(el, value){
            if(el.className === 'pip'){
                el = el.parentNode;
            }
            if(this.pipSelect === value){
                this.pipSelect = '';
            }
            else{
                this.pipSelect = value;
                for(var i in this.selfFlex){
                    this.selfFlex[i] = el.style[i];
                }
            }
            this.elSelect = el;
        },
        setSelfFlex(){
            for(var i in this.selfFlex){
                this.elSelect.style[i] = this.selfFlex[i];
            }
        }
  	},
  	mounted(){
  		this.getFlex();
  	}
}
</script>

<style>
.flex{
	height:100%;
	position:relative;
}
.flex > #flex-container{
    width:40%;
    height: 100%;
    display: flex;
    transition: all 2s;
    border-right:1px solid #fff;
}
.first-face{
    width:90px;
    height: 90px;
    background-color: #f9c;
    cursor: pointer;
}
.first-face:hover{
    background-color: #36efd5!important;
}
.pip{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    text-align: center;
    line-height: 90px;
    background-color:yellow;
    font-size: 24px;
    font-weight: bold;
}

.flexDirection{
    position: absolute;
    left: 40%;
    width: 60%;
    padding: 0 10px;
    height:100%;
    overflow-y:auto;
}
.flexDirection>div{
    margin-top: 10px;
}
.flex span{
    display: inline-block;
    background-color:rgba(54,239,213,1);
    border:1px solid #fff;
    padding: 10px 5px;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    width: 153px;
    text-align: center;
}
.flex-button{
    background-color:rgba(54,239,213,0.3);
    border:1px solid #fff;
    padding: 10px 5px;
    border-radius: 10px;
    font-size: 16px;
    outline:none;
    cursor: pointer;
}
.flex-button:hover{
    background-color:rgba(54,239,213,1);
}
.flex-select{
    background-color:rgba(54,239,213,1);
}
.flex input{
    height: 30px;
}
</style>
