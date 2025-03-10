import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import DefaultLayout from './components/layouts/DefaultLayout.vue';
import LoggedLayout from './components/layouts/LoggedLayout.vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component('DefaultLayout', DefaultLayout);
app.component('LoggedLayout', LoggedLayout);

app.mount('#app');
