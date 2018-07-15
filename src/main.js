// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'

Vue.filter('dollarFilter',function(value){
  if(!value) return '0.00'
  return value.split('.').length>1?value:value+'.00';
})

Vue.use(elementUI)
Vue.prototype.$axios=axios;
Vue.prototype.$echarts=echarts;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
