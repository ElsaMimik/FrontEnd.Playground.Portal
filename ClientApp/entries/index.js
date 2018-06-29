import Vue from 'vue';
import App from '../components/home/Welcome.vue'

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  render: h => h(App)
});
