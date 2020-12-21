import Vue from 'vue'
import App from './App.vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles

Vue.use(Vuesax);

export const eventBus = new Vue();

new Vue({
  el: '#app',
  render: h => h(App)
})
