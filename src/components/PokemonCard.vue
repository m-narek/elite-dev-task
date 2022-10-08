<template>
  <div class="card">
    <img class="card-img-top" :src="img || defaultImg" alt="Pokemon" >
    <div class="card-body">
      <h5 class="card-title">{{name}}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "PokemonCard",
  props: {
    img: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    return {
      img: props.img,
      name: props.name,
      id: props.id
    }
  },
  data() {
    return {
      defaultImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo5r6Uuhse-OzLFOffhGpR6r5NrNoi7IMEI8nWJY-qtA&s"
    }
  },
};
</script>
