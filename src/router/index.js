import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  	routes: [
    	{
      		path: '/',
      		name: 'login',
      		component: resolve => require(['../pages/login.vue'], resolve)
    	},
    	{
      		path: '/home',
      		component: resolve => require(['../pages/home.vue'], resolve),
    		children: [
    			{
				    path: '',
				    component: resolve => require(['../pages/welcome.vue'], resolve)
		    	},
                {
                    path: '/morning',
                    component: resolve => require(['../pages/morning.vue'], resolve)
                },
		    	{
		    		path: '/flex',
		    		component: resolve => require(['../pages/flex.vue'], resolve)
		    	},
                {
                    path: '/css',
                    component: resolve => require(['../pages/css.vue'], resolve)
                },
                {
                    path: '/grid',
                    component: resolve => require(['../pages/grid.vue'], resolve)
                },
                {
                    path: '/work-date',
                    component: resolve => require(['../pages/work-date.vue'], resolve)
                }

		    ]
    	},
    	{
    		path: '*',
    		component: resolve => require(['../pages/login.vue'], resolve)
    	}
  ]
})
