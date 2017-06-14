<template>
  	<div class="wflex">
    	<slot name="wflexItem">1</slot>
  	</div>
</template>

<script>

export default {
  	data () {
    	return {
      		msg: 'Welcome to Your Vue.js App'
    	}
  	}
}
</script>

<style lang="scss">
.wflex{
	display: flex;
	width:100%;
	justify-content:space-around;
}
.wflex-item{
	width:20%;
}
</style>
