<template>
  	<div class="animated-div">
        <div class="animated-number" :class="styles">
            <animated-integer :value="value"></animated-integer>
		    </div>
		<div class="animated-message">
			{{title}}
		</div>
	</div>
</template>

<script>

import animatedInteger from 'components/animated-integer'

export default {
	props: {
    	title: {
      		type: String,
      		required: true
    	},
    	value: {
    		type: Number,
    		required: true
    	},
    	styles: {
    		type: String,
    		required: true
    	}
  	},
  	components:{
  		animatedInteger
  	},
  	data () {
    	return {
    	}
  	}
}
</script>

<style lang="scss">
.animated-div{
	height:100px;
	margin-top:40px;
    user-select: none;
}
.animated-div > div{
	float:left;
}
.animated-number{
	width:100px;
	height:100%;
	border-radius:50%;
	color:#fff;
	text-align:center;
	line-height:100px;
	font-size:50px;
	box-shadow: 5px 5px 5px #888;
}
.animated-message{
	height:100%;
	line-height:100px;
	padding-left:20px;
}
</style>
