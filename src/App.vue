<template>
  <div class="hidden h-96">
    <!--
    This div contains all the styles added with Javascript.
    They're here so TailwindCSS preserves them during the purge.
     -->
  </div>
  <h1 class="text-center text-4xl font-bold">PokeDex</h1>
  <h1 class="text-center">Pokemon Index</h1>

  <PokedexParent />
</template>

<script>
import PokedexParent from "./components/PokedexParent";

export default {
  name: "App",
  components: {
    PokedexParent,
  },
};
</script>