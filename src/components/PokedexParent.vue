<template >
  <div class="w-full flex flex-col h-auto">
    <div
      v-for="pokemon in pokemonInfo"
      :key="pokemon.id"
      class="w-full h-auto flex flex-col justify-center"
    >
      <PokemonChild
        v-if="render"
        :pokemon="pokemon.name"
        :pokemonImage="pokemon.image"
        :pokemonInfo="pokemon.description"
        :pokemonId="pokemon.id"
        :pokemonWeight="pokemon.weight / 10"
        :pokemonHeight="pokemon.height / 10"
        :pokemonType="pokemon.type"
        :pokemonAttack="pokemon.attack"
        :pokemonDefence="pokemon.defence"
        :pokemonSpeed="pokemon.speed"
      />
    </div>
    <button
      @click="renderMorePokemon(10)"
      class="text-center rounded-lg text-white bg-green-500 px-6 py-2 mt-6 mx-auto"
    >
      Load More Pokemon
    </button>
    <!-- Note: Disable the button after one click until all new pokemon are fetched. Otherwise,
    it will show duplicates in the pokemon list. If you don't want to do that, you can collect the clicks 
    into a variable and then call the renderNewPokemon method that many times, each after it has rendered 
    all pokemon that were requested last time. -->
  </div>
</template>

<script>
import PokemonChild from "./PokemonChild";

export default {
  name: "PokedexParent",
  data() {
    return {
      pokemonInfo: [],
      render: false,
      totalPokemonToRender: 10,
      iterator: 1, // Used for rendering new pokemon without rerendering old ones.
      renderFinished: true,
    };
  },
  components: {
    PokemonChild,
  },
  created() {
    this.getPokemonInfo(this.totalPokemonToRender, this.iterator);
    // this.iterator = 1;
  },
  methods: {
    renderMorePokemon(additionalPokemon) {
      this.totalPokemonToRender += additionalPokemon;

      this.getPokemonInfo(this.totalPokemonToRender, this.iterator);
    },
    async getPokemonInfo(total, iterator) {
      // this.pokemonInfo = [];

      for (let i = iterator; i <= total; i++) {
        // console.log(
        //   `iterator value: ${iterator}, this.iterator value: ${this.iterator}`
        // );
        let endpoint = "https://pokeapi.co/api/v2";

        try {
          var dataResponse = await fetch(`${endpoint}/pokemon/${i}`); // for id, name and image
          var descriptionResponse = await fetch(
            `${endpoint}/pokemon-species/${i}`
          ); // for description

          var data = await dataResponse.json();
          var description = await descriptionResponse.json();
        } catch (error) {
          console.log(error);
        }

        let singlePokemonInfo = {
          id: data.id,
          name: data.name, // TODO: Capitalize first letter of word.
          image: data.sprites.front_default,
          description: description.flavor_text_entries[0].flavor_text,
          type: data.types[0].type.name,
          weight: data.weight, // TODO: Convert to kilograms.
          height: data.height, // TODO: Convert to meters.
          hitpoints: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defence: data.stats[2].base_stat,
          speed: data.stats[5].base_stat, // TODO: Convert to km/h.
          /**
           * Need:
           * - CP
           * - Special Attacks
           * - Weaknesses
           */
        };

        this.pokemonInfo.push(singlePokemonInfo);
        // console.log(`loop has run ${i} times`);
      }
      this.iterator = this.totalPokemonToRender + 1;
      this.render = true;
      // console.log(this.pokemonInfo);
    },
    childPokemonClicked(arg) {
      console.log(arg);
      // return;
    },
  },
};
</script>
