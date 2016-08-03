'use strict';

/**
 * @ngdoc function
 * @name anguDexApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the anguDexApp
 */
var audio
anguDex.controller('PokemonCtrl', function ($log, $http, $location, $scope) {
	this.playScreem = function (pokemonId) {
		$log.info(pokemonId)
		let sound = `/sounds/pokemon-cries/cries/150.ogg`

		let audio = new Audio(sound)
		audio.play()
	}
	this.getPokemonInfo = function () {
		let pokemonId 	= $location.path().split('/')[2]
		let detailExist = false
		let tmpObject 	= []

		//	Find if pokemon data exist in session storage
		let pokemonDetail = JSON.parse(sessionStorage['pokemons'])
		pokemonDetail.some(function (element, index, arr) {
			if (element.pokemon === pokemonId) {
				if (element.pokemon_detail) {
					detailExist = true
					tmpObject = element
				}
				return false
			}
		})

		if (detailExist) {
			$log.info(tmpObject.pokemon_detail[0])
			$scope.pokemonDetail = tmpObject.pokemon_detail[0]
			return $scope.pokemonDetail
			//$scope.pokemon
		}
	    
	    return $http({
	      method: 'GET', url: BASEURL + pokemonId
	    })
	    .then(function (result) {
	    	$log.info(result)
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
	      
	      audio = new Audio(pokemonInfo.sound)

	      //	Saving pokemon detail in session storage object
	      pokemonDetail[(pokemonInfo.id - 1)].pokemon_detail = [pokemonInfo]
	      sessionStorage['pokemons'] = JSON.stringify(pokemonDetail)

	      $scope.pokemonDetail = pokemonInfo
	      return $scope.pokemonDetail
	    }, function (result) {
	      $log.info("Error: No data returned");
	    });
	}()
});
