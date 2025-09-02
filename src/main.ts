import App from './App.vue'
import PrimeVue from 'primevue/config';
import ptBR from './locales/pt-BR.json';
import de from './locales/de.json';
import en from './locales/en.json';
import 'primeicons/primeicons.css';
import router from './router';
import ToastService from 'primevue/toastservice';

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n';


const i18n = createI18n({
  locale: 'pt-BR',
  fallbackLocale: 'pt-BR',
  messages: {
    'pt-BR': ptBR,
    de,
    en,
  },
  legacy: false,
  globalInjection: true,
})

const app = createApp(App)

app.use(PrimeVue, { unstyled: true });
app.use(i18n);
app.use(router)
app.use(ToastService);
app.mount('#app');
