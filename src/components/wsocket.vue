<template>
  	<div class="wsocket" :class="{'wsocket-show' : !digHide, 'ws-show-full' : isFullScreen}">
  		<div class="ws-header">
  			<label>对话框</label>
  		</div>
  		<div class="ws-contain">
            <div class="ws-msg" v-for="item in msgs">
                <div class="ws-msg-name">
                    {{item.username}}：
                </div>
                <div class="ws-msg-contain" v-html="item.message">
                    
                </div>
                <div class="ws-msg-clear"></div>
            </div>
  		</div>
  		<div class="ws-footer">
  			<Winput v-if="!isArea" @transArea="transArea" @send="sendMsg" v-model="msg"></Winput>
            <Wtextarea v-if="isArea" @send="sendMsg" v-model="msg"></Wtextarea>
            <div class="ws-button">
    	    	<Wbutton @search="sendMsg" value="发送"></Wbutton>
                <Wbutton @search="clearMsg" value="清空"></Wbutton>
                <Wbutton @search="fullScreen" :value="isFullScreen ? '退出全屏' : '全屏'"></Wbutton>
            </div>
  		</div>
        <div v-show="!isFullScreen" class="ws-show" :class="{'ws-show-down' : !digHide}">
            <Wbutton @search="showDig" :value="digMsg"></Wbutton>
        </div>
  	</div>
</template>

<script>

import Winput from 'components/winput'
import Wtextarea from 'components/wtextarea'
import Wbutton from 'components/wbutton'

export default {
	components:{
		Winput,
        Wbutton,
        Wtextarea
	},
  	data () {
    	return {
      		msg: '',
            msgs: [],
            digHide: true,
            digMsg: '对话框',
            isArea: false,
            isFullScreen: false
    	}
  	},   
  	methods:{
  		sendMsg(){
            if(this.msg){
                let theMsg = this.toHtml(this.msg);
                this.$socket.emit('sendMsg',theMsg);
                this.msg = '';
                this.isArea = false;
                this.firstFocus('.winput');
            }
  		},
        clearMsg(){
            this.msgs = [];
            this.isArea = false;
            this.firstFocus('.winput');
        },
        transArea(){
            this.isArea = !this.isArea;
            this.firstFocus('.wtextarea');
            this.msg = this.msg + '\n';
        },
        showDig(){
            this.digHide = !this.digHide;
            this.digMsg = this.digHide ? '对话框' : '收起';
        },
        firstFocus(name){
            this.$nextTick(function () {
                document.querySelector(name).children[0].focus();
            });
        },
        toHtml(str){
            let content = str.split('\n');
            let contents = '';
            for(let i = 0; i < content.length; i++){
                contents = contents + content[i] + '<br/>';
            }
            return contents;
        },
        fullScreen(){
            this.isFullScreen = !this.isFullScreen;
        }
  	},
  	socket: {
  		events: {
	  		message(msg){
                let send = {
                    username: this.$util.getLocalStorage('username'),
                    message: msg
                };
	  			this.msgs.push(send);
                this.isArea = false;
                this.firstFocus('.winput');
	  		}	
  		}
  	}
}
</script>

<style lang="scss">
.wsocket{
	position:fixed;
	padding:8px;
	width:200px;
	height:360px;
	font-size:12px;
    bottom:-360px;
	background-color:#ddd;
	box-shadow:1px 1px 5px;
    transition: all .5s;
    z-index:99;
}
.wsocket-show{
    bottom:0;
}
.ws-header{
    height:20px;
}
.ws-contain{
    margin:10px 0px;
    padding:5px;
    height:calc(100% - 130px);
    border:1px solid #fff;
    overflow:auto;
}
.ws-footer{
    height:90px;
}
.ws-msg{
    padding-bottom:5px;
}
.ws-msg-clear{
    clear:both;
}
.ws-msg-name{
    float:left;
    width:50px;
}
.ws-msg-contain{
    float:right;
    width:calc(100% - 51px);
}
.ws-show{
    position:absolute;
    top:-30px;
    left:0px;
    box-shadow:1px 1px 5px;
    transition: all .5s;
}
.ws-show-down{
    top: 3px;
    left: 140px;
    box-shadow: none;
}
.ws-show-full{
    width:100%;
    height:100%;
}
.ws-button{
    position:absolute;
    bottom:10px;
}
</style>
