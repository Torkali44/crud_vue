import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import maincomponent from "./modules/mainComponent/mainComponent.vue";
import router from "./router";

createApp(maincomponent).use(router).mount("#app");
