<template >
  <div class="w-full flex flex-col h-auto">
    <h1 class="text-center">Pokemon Index</h1>
    <!-- 
  This Pokemon component will be rendered n times, where n is the 
  number of pokedex entries (pokemon) we want rendered on the page
  at any given time. It'll be like 5-8 or something. 

  n is important. We're going to use it to fetch the data for each pokemon 
  component. The data will be stored in the Pokedex component, not the top level 
  app.vue component, because there's no need for it. Search might require that,
  and if it does, I'll emit the data and then pass it back through props
  if need be. 
 -->

    <!-- <div v-if="render" :for="pokemon in pokemonInfo" :key="pokemon.id">
      <Pokemon
        :pokemon="pokemon.name"
        :pokemonImage="pokemon.sprites.front_default"
      />
    </div> -->
    <div v-for="pokemon in pokemonInfo" :key="pokemon.id">
      <Pokemon
        v-if="render"
        :pokemon="pokemon.name"
        :pokemonImage="pokemon.image"
        :pokemonInfo="pokemon.description"
      />
    </div>

    <button
      @click="testMethod"
      class="text-center rounded-lg bg-green-500 px-6 py-2 mt-6 mx-auto"
    >
      Click me
    </button>
  </div>
</template>

<script>
import Pokemon from "./Pokemon";

export default {
  name: "Pokedex",
  data() {
    return {
      pokemonInfo: [],
      render: false,
      totalPokemonToRender: 10,
    };
  },
  components: {
    Pokemon,
  },
  created() {
    this.getPokemonInfo(this.totalPokemonToRender);
  },
  methods: {
    testMethod() {
      console.log(this.pokemonInfo[0].name);
    },
    // getPokemonInfo: async function (total) {
    //   let endpoint = "https://pokeapi.co/api/v2";
    //   let pokemonToFetch = total; //get this from user input?

    //   for (let i = 1; i <= total; i++) {
    //     fetch(`${endpoint}/pokemon/${i}`)
    //       .then((res) => res.json())
    //       .then((pokemonData) => {
    //         this.pokemonInfo.push(pokemonData);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //     this.render = true;
    //   }
    // },
    async getPokemonInfo(total) {
      console.log(total);

      for (let i = 1; i <= total; i++) {
        let endpoint = "https://pokeapi.co/api/v2";

        let dataResponse = await fetch(`${endpoint}/pokemon/${i}`); // for id, name and image
        let descriptionResponse = await fetch(
          `${endpoint}/pokemon-species/${i}`
        ); // for description

        let data = await dataResponse.json();
        let description = await descriptionResponse.json();

        let singlePokemonInfo = {
          id: data.id,
          name: data.name,
          image: data.sprites.front_default,
          description: description.flavor_text_entries[0].flavor_text,
        };

        this.pokemonInfo.push(singlePokemonInfo);
      }
      this.render = true;
      console.log(this.pokemonInfo);
    },
  },
};
</script>
