<template>
  	<div class="css">
    	<Wtable :table-title="cssTitle" :table-data="cssList" :table-type="cssType"></Wtable>
  	</div>
</template>

<script>

import common from 'services/common'
import Wtable from 'components/wtable'

export default {
	components:{
		Wtable
	},
  	data () {
    	return {
      		cssList: [],
      		cssTitle:['用途','css'],
      		cssType:['desc','value']

    	}
  	},
  	methods:{
  		getCssList(params){
  			common.getCssList({

  			}).then(data => {
  				this.cssList = data.data;
  			});
  		}
  	},
  	mounted(){
  		this.getCssList();
  	}
}
</script>

<style lang="scss">
.css{
	padding:10px;
	height:100%;
}
</style>
