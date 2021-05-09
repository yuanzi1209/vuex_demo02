import Vue from 'vue'
import App from './App.vue'
import store from './store'

// 导入 ant-design-vue
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd) 

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
