<template>
	<div class="wselect">
	    <select ref="select" :value="value" @input="updateValue($event.target.value)">
	    	<option v-for="item in options" :value="item.value">{{item.desc}}</option>
	    </select>
	</div>
</template>

<script>

export default {
	props:{
		title:String,
		value:String,
		options:Array
	},
  	methods:{
  		updateValue(value){
  			this.$refs.select.value = value;
  			this.$emit('input', value);
  		}
  	}
}
</script>

<style>
.wselect{
	display: inline-block;
}
.wselect>select{
	height: 30px;
	background-color:transparent;
	border:1px solid #fff;
	outline:none;
	padding: 5px;
}
.wselect>select:focus{
	background-color: #fff;
}
</style>
