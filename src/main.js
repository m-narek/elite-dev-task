import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { ApiService } from "@/services/AESService";
import 'bootstrap/dist/css/bootstrap.css'

const app = createApp(App);

app.use(store);
app.use(router);
ApiService.init(app);

app.mount("#app");
