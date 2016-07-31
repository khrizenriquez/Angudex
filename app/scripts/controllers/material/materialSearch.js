'use strict'
//function SearchCtrl ($q, $log) {

//}
anguDex.controller('DemoCtrl', function ($timeout, $q, $log, $http) {
  var self = this;
  self.simulateQuery = false;
  self.isDisabled    = false;
  // list of `state` value/display objects
  //self.states        = loadAll();
  self.states        = loadAll().then(function(data) { 
    $log.info(data)
    return data;
  });
  self.querySearch   = querySearch;
  self.selectedItemChange = selectedItemChange;
  self.searchTextChange   = searchTextChange;
  self.newState = newState;
  function newState(state) {
    alert("Sorry! You'll need to create a Constituion for " + state + " first!");
  }
  // ******************************
  // Internal methods
  // ******************************
  /**
   * Search for states... use $timeout to simulate
   * remote dataservice call.
   */
  function querySearch (query) {
    var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
        deferred;
    if (self.simulateQuery) {
      deferred = $q.defer();
      $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
      return deferred.promise;
    } else {
      return results;
    }
  }
  function searchTextChange(text) {
    $log.info('Text changed to ' + text);
  }
  function selectedItemChange(item) {
    $log.info('Item changed to ' + JSON.stringify(item));
  }
  /**
   * Build `states` list of key/value pairs
   */
  function loadAll() {
    let getAll = '?limit=151'
    return $http({
      method: 'GET', url: BASEURL + getAll
    })
    .then(function (result) {
      return result.data.results.map(function (pokemon) {
        //$log.info(pokemon)
        let pokeNumber = pokemon.url.split('/')
        return {
          pokemon:          pokemon.name,
          pokedex_national: pokeNumber[pokeNumber.length - 2]
        };
      });
    }, function (result) {
      $log.info("Error: No data returned");
    });
    // var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
    //         Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
    //         Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
    //         Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
    //         North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
    //         South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
    //         Wisconsin, Wyoming';
    // return allStates.split(/, +/g).map( function (state) {
    //   return {
    //     value: state.toLowerCase(),
    //     display: state
    //   };
    // });
  }
})
