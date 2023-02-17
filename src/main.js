import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './mock'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
//路由全局守卫
router.beforeEach((to,from,next)=>{
	let token=store.state.token
	// 过滤登录页，因为去登录页不需要token（防止死循环）
	if(!token && to.name!=='login'){
		next({name:'login'})
	}
	else{
		next()
	}
})

Vue.use(ElementUI);
new Vue({
	router,
	store,
  render: h => h(App),
  created(){store.commit('addMenu',router)}
}).$mount('#app')


