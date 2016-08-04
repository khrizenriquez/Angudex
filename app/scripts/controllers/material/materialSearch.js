'use strict'

let SearchCtrl = function ($timeout, $q, $log, $http, $scope, $location) {
  let self            = this
  self.simulateQuery  = false
  self.isDisabled     = false
  // list of `state` value/display objects
  self.pokemons       = (sessionStorage['pokemons'] !== undefined) ? 
                        JSON.parse(sessionStorage['pokemons']) : 
                        loadAll().then(function(data) {
                          //  Session storage
                          $log.info(data)
                          sessionStorage['pokemons'] = JSON.stringify(data)
                          return data
                        })
  self.redirectToPokemonInfo = function (pokemonId) {
    $location.path(`/pokemons/${pokemonId}`)
  }
  self.fillPokemonCards   = function () {
    var p = self.pokemons,
                  deferred
    
    return (p.$$state) ? 
            p.$$state.value : 
            p;
  }
  // ******************************
  // Internal methods
  // ******************************
  /**
   * Build `pokemons` list of key/value pairs
   */
  function loadAll() {
    let getAll = '?limit=151'

    return $http({
      method: 'GET', url: BASEURL + getAll
    })
    .then(function (result) {
      return result.data.results.map(function (pokemon) {
        let pokeNumber = pokemon.url.split('/')
        return {
          pokemon:          pokemon.name,
          pokedex_national: pokeNumber[pokeNumber.length - 2]
        };
      });
    }, function (result) {
      $log.info("Error: No data returned");
    });
  }
}
anguDex.controller('SearchCtrl', SearchCtrl)
