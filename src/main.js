import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Mowgli from "./Mowgli/index";
import MoComponentManager from "./Mowgli/components/modules/MoCommon";

new Mowgli();
new MoComponentManager();

const app = createApp(App);

app.use(router);

app.mount("#app");
