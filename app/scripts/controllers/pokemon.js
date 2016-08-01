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
