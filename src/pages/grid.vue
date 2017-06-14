<template>
  	<div class="grid">
    	<div class="wrapper">
    		<div class="letter">
                A
    		</div>
    		<div class="letter">
    			B
    		</div>
    		<div class="letter">
    			C
    		</div>
    		<div class="letter">
    			D
    		</div>
    	</div>
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
.grid{
	height:100%;
}
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  /*grid-column-gap: 1px;*/
  /*grid-row-gap: 1px;*/
  background-color: black;
  
  @media screen and (min-width: 500px){
    grid-template-columns: 1fr 1fr 1fr;
  }
  
  @media screen and (min-width: 800px){
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

.letter {
  background-color: #0069b3;
  display: flex;
  padding:30px;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  transition: all .3s ease;
}
.letter:nth-child(1){
	background-color: blue;
}
.letter:nth-child(2){
	background-color: red;
}
.letter:nth-child(3){
	background-color: green;
}
.letter:nth-child(4){
	background-color: yellow;
}
</style>
