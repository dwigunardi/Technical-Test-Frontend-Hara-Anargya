import { createApp } from "vue/dist/vue.esm-bundler";
import "./style.css";
import "../src/assets/css/index.css";
import App from "./App.vue";
import { Icon } from "@iconify/vue";
import router from "./router";

createApp(App).use(router).component("Icon", Icon).mount("#app");
