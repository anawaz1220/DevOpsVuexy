import App from "@/app.vue";
import { registerPlugins } from '@core/utils/plugins';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import VueCookies from "vue-cookies";
import VueSweetalert2 from "vue-sweetalert2";
// Styles
import '@core/scss/template/index.scss';
import '@styles/styles.scss';

// Create vue app
const app = createApp(App)


// Register plugins
registerPlugins(app)
const pinia = createPinia();
app.use(pinia);
app.use(VueSweetalert2);
app.use(VueCookies, { expires: "1d" });

  router.beforeEach(async (to, from, next) => {
    if (!lStore.authToken && !lStore.isAuthenticated && to.path !== '/') {
      await lStore.fetchLoggedInUser();
      if (!lStore.authToken && lStore.isAuthenticated ==false) {
        next('/');
      } else {
        next();
      }
    } else {
      next();
    }
  });
// Mount vue app
app.mount('#app')
