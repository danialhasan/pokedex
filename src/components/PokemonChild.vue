<template>
  <!--
  To make the switch between expanded/compressed easier, I will make the classes for each 
  state and put them in their own "expanded"/"compressed" classes to add and remove with javascript. 
 -->
  <!-- EXPANDED VERSION -->
  <div
    @click="pokemonClicked(pokemonId)"
    :id="pokemonId"
    class="transition-height mx-auto w-pokemon md:w-pokemonmd h-auto border flex flex-col items-center"
  >
    <img
      class="mx-auto w-24 h-24"
      :src="pokemonImage"
      alt="This is an image of {{pokemon}}"
    />
    <div class="text-center w-2/3 flex flex-col justify-center flex-grow">
      <h1 class="font-bold pb-2">{{ pokemon }}</h1>
      <h1>{{ pokemonInfo }}</h1>
    </div>
    <div v-if="pokemonExpanded" class="w-full">
      <!-- There are 2 tables to keep it consistent with mobile and desktop designs. -->
      <div class="mt-4 mb-2">
        <table class="table-fixed w-full border-t border-gray-200">
          <tr>
            <th class="pt-3">Type</th>
            <th class="pt-3">Weight</th>
            <th class="pt-3">Height</th>
          </tr>
          <tr class="text-center">
            <td class="pb-3">{{ pokemonType }}</td>
            <td class="pb-3">{{ pokemonWeight }} kg</td>
            <td class="pb-3">{{ pokemonHeight }} m</td>
          </tr>
        </table>
        <table class="table-fixed w-full border-t border-gray-200">
          <tr class="">
            <th class="pt-3">Attack</th>
            <th class="pt-3">Defence</th>
            <th class="pt-3">Speed</th>
          </tr>
          <tr class="text-center">
            <td class="pb-3">{{ pokemonAttack }}</td>
            <td class="pb-3">{{ pokemonDefence }}</td>
            <td class="pb-3">{{ pokemonSpeed }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
  <!-- 
    COLLAPSED VERSION

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
        <li>Attack: {{ pokemonAttack }} [unit]</li>
        <li>Defence: {{ pokemonDefence }} [unit]</li>
        <li>Speed: {{ pokemonSpeed }} [unit]</li>
      </ul>
    </div>
  </div>
   -->
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
    pokemonHp: {
      type: Number,
      default: 0,
    },
    pokemonCp: {
      type: Number,
      default: 0,
    },
    pokemonAttack: {
      type: Number,
      default: 0,
    },
    pokemonDefence: {
      type: Number,
      default: 0,
    },
    pokemonSpeed: {
      type: Number,
      default: 0,
    },
    pokemonWeaknesses: {
      type: Array,
      default: () => [],
    },
    /**
     * Need:
     * - HP
     * - CP
     * - Attack
     * - Defence
     * - Special Attacks
     * - Weaknesses
     */
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