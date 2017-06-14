<template>
  	<span>{{ animatedNumber }}</span>
</template>

<script>

export default {
  	props: {
    	value: {
      		type: Number,
      		required: true
    	}
  	},
  	data: function () {
    	return {
      		animatedNumber: 0
    	}
  	},
  	watch: {
    	value: function (newValue, oldValue) {
      		this.animated(oldValue, newValue)
    	}
  	},
  	mounted: function () {
    	this.animated(0, this.value);
  	},
  	methods: {
    	animated: function (startValue, endValue) {
      		var vm = this;
      		var seed = 1;
            animate();
            function animate(){
                if(vm.animatedNumber != endValue){
                    if(vm.animatedNumber > endValue){
                		// seed = (vm.animatedNumber - endValue) > 150 ? 11 : 1;
                        vm.animatedNumber -= seed;
                    }
                    else{
                    	// seed = (endValue - vm.animatedNumber) > 150 ? 11 : 1;
                        vm.animatedNumber += seed;
                    }
                    requestAnimationFrame(animate);
                }
                else if((vm.animatedNumber + 1) == endValue){
                    vm.animatedNumber = endValue;
                }
            }
    	}
  	}
}
</script>

<style lang="scss">
</style>
