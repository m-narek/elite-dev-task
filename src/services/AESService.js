import axios from "axios";
import VueAxios from "vue-axios";

export class ApiService {
  static vueInstance;

  static init(app) {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
    ApiService.vueInstance.axios.defaults.baseURL = "https://pokeapi.co/api/v2/";
  }

  static get(resource = "", params = "") {
    return ApiService.vueInstance.axios.get(`${resource}/${params}`);
  }
}
