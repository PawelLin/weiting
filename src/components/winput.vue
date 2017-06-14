<template>
	<div class="winput">
	    <input ref="input" :value="value" @input="updateValue" @focus="selectAll" type="text" :placeholder="title" @keyup.space.shift="up" @keyup.enter="enter">
	</div>
</template>

<script>

export default {
	props:{
		title:String,
		value:String
	},
  	methods:{
  		updateValue(event){
  			let value = event.target.value;
            this.$emit('input', value);
  		},
  		selectAll(event){
  			setTimeout(function(){
  				event.target.select();
  			}, 0);
  		},
  		up(event){
  			this.$emit('send');
  		},
  		enter(event){
  			this.$emit('transArea');
  		}
  	}
}
</script>

<style>
.winput{
	display: inline-block;
}
.winput>input{
	height: 30px;
	background-color:transparent;
	border:1px solid #fff;
	outline:none;
	padding: 5px;
}
.winput>input:focus{
	background-color: #fff;
}
</style>
