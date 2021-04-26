<template>
  <h1 class="text-center text-4xl font-bold">PokeDex</h1>
  <Pokedex />
</template>

<script>
import Pokedex from "./components/Pokedex";

/**
 * TODO
 * [] Fetch data from API to populate top level components' database
 * [] Loop through data. For each data object, produce one pokedex instance.
 *    Pass in relevant data through props.
 */
export default {
  name: "App",
  components: {
    Pokedex,
  },
};
</script>