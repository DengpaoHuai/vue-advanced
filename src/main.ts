import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import DefaultLayout from './components/layouts/DefaultLayout.vue';
import LoggedLayout from './components/layouts/LoggedLayout.vue';
import { QueryClient, VueQueryPlugin, type VueQueryPluginOptions } from '@tanstack/vue-query';
import router from './app/router';
import MaSuperBibli from './plugins/ma-superbe-bibli/index';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(MaSuperBibli, { message: 'Hello from the plugin!' });

export const myClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 0, refetchOnWindowFocus: true } },
});
const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClient: myClient,
};
app.use(VueQueryPlugin, vueQueryPluginOptions);

app.component('DefaultLayout', DefaultLayout);
app.component('LoggedLayout', LoggedLayout);

app.mount('#app');
