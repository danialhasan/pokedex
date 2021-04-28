<template>
  <h1 class="text-center text-4xl font-bold">PokeDex</h1>
  <h1 class="text-center">Pokemon Index</h1>

  <PokedexParent />
  
</template>

<script>
import PokedexParent from "./components/PokedexParent";

/**
 * TODO
 * [] Fetch data from API to populate top level components' database
 * [] Loop through data. For each data object, produce one pokedex instance.
 *    Pass in relevant data through props.
 */
export default {
  name: "App",
  components: {
    PokedexParent,
  },
};
</script>