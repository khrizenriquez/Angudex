'use strict';

/**
 * @ngdoc function
 * @name anguDexApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the anguDexApp
 */
anguDex.controller('PokemonCtrl', function ($log, $http, $location, $scope) {
	$log.info($location.path().split('/')[2])
	this.getPokemonInfo = function () {
    //$log.info(pokemonId)
    let pokemonId = $location.path().split('/')[2]
    let getInfo = `${pokemonId}`
    return $http({
      method: 'GET', url: BASEURL + getInfo
    })
    .then(function (result) {
      let pokemonInfo = result.data
      //	Image path
      pokemonInfo.image = `/images/pokemons/pokemon-svg/dream-world/${pokemonInfo.id}.svg`
      //	Sound path
      pokemonInfo.sound = `/sounds/pokemon-cries/cries/${pokemonInfo.id}.ogg`

      //	Pokémon stats
      let pokemonStats 	= []
      const MAXBASE 	= 200
      let secuense = ['hp', 
  					'attack', 
  					'defense', 
  					'special-attack', 
  					'special-defense', 
  					'speed']
  	  let readableSequence = ['HP', 
  	  						'Ataque', 
  	  						'Defensa', 
  	  						'Ataque especial', 
  	  						'Defensa especial', 
  	  						'Velocidad']
  	  secuense.some(function (element, index, arr) {
  	  	pokemonInfo.stats.some(function (ele, ind, ar) {
	      	if (element == ele.stat.name) {
	      		pokemonStats.push({
		      		'name': 		ele.stat.name, 
		      		'stat': 		(100 * parseInt(ele.base_stat)) / MAXBASE, 
		      		'readable_name': readableSequence[index]
		      	})
		      	return false
	      	}
	      })
  	  })
      pokemonInfo.pokemon_stats = pokemonStats
      
      $scope.pokemon = pokemonInfo
      return {
        pokemonInfo
      }
      // return result.data.results.map(function (pokemon) {
      //   let pokeNumber = pokemon.url.split('/')
      //   return {
      //     pokemon:          pokemon.name,
      //     pokedex_national: pokeNumber[pokeNumber.length - 2]
      //   };
      // });
    }, function (result) {
      $log.info("Error: No data returned");
    });
  }()
});
