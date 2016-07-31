'use strict';

/**
 * @ngdoc overview
 * @name anguDexApp
 * @description
 * # anguDexApp
 *
 * Main module of the application.
 */
const BASEURL = 'http://pokeapi.co/api/v2/pokemon/'
let dependencies = [
  'ngAnimate', 
  'ngAria', 
  //'ngCookies', 
  'ngMessages', 
  'ngResource', 
  'ngRoute', 
  'ngSanitize', 
  'ngMaterial'
  //'ngTouch'
]
let anguDex = angular.module('anguDexApp', dependencies)

anguDex.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/pokemons.html',
        controller: 'PokemonsCtrl',
        controllerAs: 'pokemons'
      })
      .when('/pokemons/:id', {
        templateUrl: 'views/pokemon.html',
        controller: 'PokemonCtrl',
        controllerAs: 'pokemon'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
