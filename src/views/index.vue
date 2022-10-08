<template>
  <div class="container">
    <div class="loading-wrapper d-flex align-items-center justify-content-center" v-if="loading">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else-if="!loading && error" class="">
      <div class="alert alert-danger mt-5" role="alert">
        Something went wrong. <a href="" @click.prevent="getData" class="text-danger">Please try again</a>
      </div>
    </div>
    <template v-else>
      <div class="row">
        <div class="col-md-3 mb-2 mt-4" v-for="(pokemon, index) in pokemons" :key="`pokemon_${pokemon.id}`">
          <PokemonCard :name="pokemon.name" :img="pokemon.sprites.back_default" :id="pokemon.id"/>
        </div>
      </div>
      <div class="d-flex mt-3 justify-content-center mb-5">
        <v-pagination
          v-model="pageNumber"
          :pages="pagesCount"
          :range-size="1"
          active-color="#DCEDFF"
          @update:modelValue="updateHandler"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import PokemonCard from "@/components/PokemonCard.vue";
import { computed, onMounted, ref } from "vue";
import { useStore } from 'vuex';
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

const store = useStore()
const data = ref([])
const limit = ref(16)
const set = ref(0)
const pageNumber = ref(1)

const pokemons = computed(() => {
  return store.getters.getPokemons
})
const loading = computed(() => {
  return store.getters.getPageLoading
})
const error = computed(() => {
  return store.getters.getPageError
})
const pagesCount = computed(() => {
  return store.getters.getPagesCount
})

function updateHandler (page) {
  pageNumber.value = page
  set.value = (page-1)*limit.value
  store.dispatch("fetchPokemons", {limit: limit.value, set: set.value})
}

function getData () {
  store.dispatch("fetchPokemons", {limit: limit.value, set: set.value})
}

onMounted(() => {
  getData()
});
</script>
<style>
.loading-wrapper {
  width: 100%;
  height: 400px;
}
</style>
