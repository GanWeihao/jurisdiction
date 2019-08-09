import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import store from './store'

Vue.use(ElementUI, {size: 'small', zIndex: 3000});
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
}).$mount('#app')
