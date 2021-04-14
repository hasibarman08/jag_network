import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import firebase from 'firebase/app'
import store from "./store";
import './assets/app.scss'
Vue.config.productionTip = false

const configOptions = {
  apiKey: "AIzaSyDhBin0Dq89xUhLmFWhuI7mxXrl6RxaF9o",
  authDomain: "jagindustrials1.firebaseapp.com",
  databaseURL: "https://jagindustrials1.firebaseio.com",
  projectId: "jagindustrials1",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

firebase.initializeApp(configOptions);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
