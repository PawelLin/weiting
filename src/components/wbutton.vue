<template>
  	<div class="wbutton">
    	<button @click.stop="search">{{value}}</button>
  	</div>
</template>

<script>

export default {
	props:{
		value:String,
	},
  	data () {
    	return {
      		msg: 'Welcome to Your Vue.js App'
    	}
  	},
  	methods:{
  		search(){
  			this.$emit('search');
  		}
  	}
}
</script>

<style lang="scss">
.wbutton{
	display:inline-block;
}
.wbutton>button{
	min-width:50px;
	height: 30px;
	background-color:transparent;
	border:1px solid #fff;
	outline:none;
	padding: 5px;
	cursor:pointer;
}
.wbutton>button:focus{
}
.wbutton>button:active{
	transform:scale(0.9,0.9);
}
</style>
