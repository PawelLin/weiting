<template>
	<div class="wtextarea">
	    <textarea :value="value" @input="updateValue" :placeholder="title" @keyup.space.shift="up">
	    </textarea>
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
  		up(event){
  			this.$emit('send');
  		}
  	}
}
</script>

<style>
.wtextarea{
	display: inline-block;
}
.wtextarea>textarea{
	height: 50px;
	background-color:transparent;
	border:1px solid #fff;
	outline:none;
	padding: 5px;
	resize: none;
}
.wtextarea>textarea:focus{
	background-color: #fff;
}
</style>
