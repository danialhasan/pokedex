<template>
  <div
    @click="pokemonClicked(pokemonId)"
    :id="pokemonId"
    class="transition-height mx-auto w-pokemon md:w-pokemonmd border flex flew-row items-center"
  >
    <img
      class="flex-grow-0 w-24 h-24"
      :src="pokemonImage"
      alt="This is an image of {{pokemon}}"
    />
    <div class="w-full flex flex-col justify-center flex-grow">
      <h1>{{ pokemonId }}. {{ pokemon }}</h1>
      <h1>{{ pokemonInfo }}</h1>
    </div>
    <div v-if="pokemonExpanded" class="w-full">
      <ul>
        <li>Type: {{ pokemonType }}</li>
        <li>Weight: {{ pokemonWeight }} hectograms</li>
        <li>Height: {{ pokemonHeight }} decimeters</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "PokemonChild",
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
    pokemonId: {
      type: Number,
      default: 0,
    },
    pokemonWeight: {
      type: Number,
      default: 0,
    },
    pokemonHeight: {
      type: Number,
      default: 0,
    },
    pokemonType: {
      type: String,
      default: "Type Not Found",
    },
  },
  data() {
    return {
      pokemonExpanded: false,
    };
  },
  methods: {
    pokemonClicked(pokemonId) {
      /**
       * NOTE: Include the added CSS classes in a hidden element
       * in app.vue. It must be a regular HTML element, not a component.
       * This is done so that Tailwind treats them as used styles and doesn't
       * purge them in production. Otherwise, no styles would apply.
       */
      console.log(`Pokemon Id Selected: ${pokemonId}`);
      // this.$emit("pokemon-clicked", pokemonId);

      const container = document.getElementById(pokemonId);

      container.classList.toggle("h-96");
      this.pokemonExpanded = !this.pokemonExpanded;
    },
  },
  emits: [
    /*"pokemon-clicked"*/
  ],
};
</script>