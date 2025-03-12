import type { App } from 'vue';
import SuperWelcome from './components/SuperWelcome.vue';
const setup = {
  install: (app: App<Element>, options) => {
    app.component('SuperWelcome', SuperWelcome);

    app.directive('focus', {
      mounted(el: HTMLElement) {
        console.log('vFocus mounted');
        el.focus();
      },
    });

    const demoCallback = (toto: string) => {
      console.log(toto);
    };

    app.provide('super', {
      demo: demoCallback,
    });
  },
};

export default setup;
