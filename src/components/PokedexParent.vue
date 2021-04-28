<template >
  <div class="w-full flex flex-col h-auto">
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
      />
    </div>

    <button
      @click="renderMorePokemon(10)"
      class="text-center rounded-lg text-white bg-green-500 px-6 py-2 mt-6 mx-auto"
    >
      Load More Pokemon
    </button>
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
      totalPokemonToRender: 10, //going up by ten
      iterator: 1, //going up by totalPokemonToRender, which is going up by ten.
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
      // Since this variable is increasing at a constant rate of 10,
      // the this.iterator value is increasing exponentially since
      // its increasing at a variable rate of totalPokemonToRender.
      this.getPokemonInfo(this.totalPokemonToRender, this.iterator);
      /**
       * If we just add 10 to the totalPokemonToRender variable and
       * pass that into the getPokemonInfo method, it'll just render all
       * pokemon from 0 to totalPokemonToRender. This means it'll do duplicates
       * every time. Instead, we have to get only the new numbers.
       *
       * alreadyRendered = this.totalPokemonToRender;
       * additionalPokemon = 10;
       *
       * if we render this.totalPokemonToRender + additionalPokemon it'll
       * call & render all pokemon from 0 to this.totalPokemonToRender + additionalPokemon.
       * That will cause many duplicates.
       *  Solution 1:
       * - Wipe the pokemonInfo array and call the function with the additonal pokemon.
       *   This will eliminate the duplicates by erasing the originals. This method doesn't duplicate
       *   entire sets of pokemon. In some versions, after the 6th-8th call, some individual duplicate pokemon
       *   can be found. This does not happen on all loads.
       * Solution 2:
       * - Preserve the original pokemonInfo array. In the template, group each group of ten pokemon
       *   into their own div. Each div will loop through 10 pokemon in the pokemonInfo array, starting
       *   from the ending indice of the div behind it. These divs will be wrapped by a parent div that
       *   loops through each index in an array.
       *
       *  What if the pokemonInfo array of objects was instead an array of arrays that each contained 10 objects?
       *  That way we could add new inner array with their own 10 objects and then loop through each inner array
       *  in the outer array to display them. But, to render the 10 objects in each array we'd need to get only the ids
       *  we need. That's all we need—-to call the additional ids needed and not the ones we called before. For that, we
       * can alter the 'i' variable in the for loop thats in the getPokemonInfo method. In order to continue using it, we'd
       * store the iterator variable in this Vue instances' data property and give it the value of the total that existed before.
       *
       * First 10:
       * i = 1
       * total=10
       * Next 10:
       * i= total
       * total = 20
       * Note how i is given the value of total before total is reassigned.
       * Next 10:
       * ...
       */
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
          name: data.name,
          image: data.sprites.front_default,
          description: description.flavor_text_entries[0].flavor_text,
        };

        this.pokemonInfo.push(singlePokemonInfo);
        // console.log(`loop has run ${i} times`);
      }
      this.iterator = this.totalPokemonToRender + 1;
      this.render = true;
      // console.log(this.pokemonInfo);
    },
  },
};
</script>
