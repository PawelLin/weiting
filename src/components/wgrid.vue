<template>
  	<div class="wgrid">
		<slot name="wgrid"></slot>
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
.wgrid {
  	display: grid;
  	grid-template-columns: 1fr 1fr;
  
  	@media screen and (min-width: 500px){
    	grid-template-columns: 1fr 1fr 1fr;
  	}
  
  	@media screen and (min-width: 800px){
    	grid-template-columns: 1fr 1fr 1fr;
  	}
}
</style>
