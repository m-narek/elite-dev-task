import { createStore } from "vuex";
import { ApiService } from "@/services/AESService";

export default createStore({
  state: {
    pokemon: {
      data: [],
      loading: false,
      error: false,
      pagesCount: null
    }
  },
  getters: {
    getPokemons: state => state.pokemon.data,
    getPageLoading: state => state.pokemon.loading,
    getPageError: state => state.pokemon.error,
    getPagesCount: state => state.pokemon.pagesCount
  },
  mutations: {
    setPageData(state, data) {
      state.pokemon.data.push(data)
    },
    setPageLoading(state, val) {
      state.pokemon.loading = val
    },
    setPageError(state, val) {
      state.pokemon.error = val
    },
    setPagesCount(state, val) {
      state.pokemon.pagesCount = val
    },
    clearPageData(state) {
      state.pokemon.data = []
    }
  },
  actions: {
    fetchPokemons ({dispatch, commit}, params) {
      commit("setPageLoading", true)
      commit("clearPageData")
      ApiService.get("pokemon", `?limit=${params.limit}&offset=${params.set}`)
        .then((response) => {
          commit("setPageError", false)
          let pagesCount = Math.ceil(response.data.count/params.limit)
          commit("setPagesCount", pagesCount)
          response.data.results.forEach(item => {
            dispatch("fetchPokemonsData", item.url.slice(0, -1))
          })
        })
        .catch(error => {
          commit("setPageError", true)
        })
        .finally(() => {
          commit("setPageLoading", false)
        })

    },
    fetchPokemonsData({commit}, url) {
      commit("setPageLoading", true)
      ApiService.get(url)
        .then((response) => {
          commit("setPageError", false)
          commit("setPageData", response.data)
        })
        .catch(error => {
          commit("setPageError", true)
        })
        .finally(() => {
          commit("setPageLoading", false)
        })
    }
  },
  modules: {},
});
