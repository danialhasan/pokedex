<template>
  <div class="outline-black">
    <img :src="pokemonImage" alt="This is an image of {{pokemon}}" />
    <h1>{{ pokemon }}</h1>
    <h1>{{ pokemonInfo }}</h1>
  </div>
</template>

<script>
export default {
  name: "Pokemon",
  props: {
    pokemon: {
      type: String,
      default: "Pokemon Not Given",
    },
    pokemonImage: {
      type: String,
      default: "Image not found",
    },
    pokemonInfo: {
      type: String,
      default: "No Pokemon Description Given",
    },
  },
};
</script>