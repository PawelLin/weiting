<template>
  	<div class="page">
    	<h3>登录</h3>
    	<form>
	    	<div>
	    		<label>用户名：</label>
	    		<input v-model="username" type="text" name="">
	    	</div>
	    	<div>
	    		<label>密码：</label>
	    		<input v-model="password" type="password" name="">
	    	</div>
	    	<div>
	    		<input @click="submit" type="button" name="" value="登录">
	    		<router-link to="/home">home</router-link>
	    	</div>
    	</form>
  	</div>
</template>

<script>

export default {
  	data () {
    	return {
      		msg: 'Welcome to Your Vue.js App',
      		username: '',
      		password: ''
    	}
  	},
  	methods:{
  		submit(){
  			this.$router.push('/home');
            localStorage.setItem('username',this.username);
  		}
  	}
}
</script>

<style lang="scss">
</style>
