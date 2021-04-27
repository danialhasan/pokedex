<template>
  <div class="mx-auto w-pokemon md:w-pokemonmd h-auto border flex flew-row">
    <img
      class="flex-grow-0"
      :src="pokemonImage"
      alt="This is an image of {{pokemon}}"
    />
    <div class="w-full flex flex-col justify-center flex-grow">
      <h1>{{ pokemon }}</h1>
      <h1>{{ pokemonInfo }}</h1>
    </div>
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