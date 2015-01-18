angular.module('maintenenceWorker', [
	'ngTemplates', 
	'ui.router'
	])
	.config(function ($urlRouterProvider, $stateProvider) {
	  $urlRouterProvider
	    .otherwise('/');
	  $stateProvider
	    .state('home', {
	      url: '/',
	      controller: 'LabrynthCtrl as labrynth',
	      templateUrl: 'labrynth.html',
	    })
  })