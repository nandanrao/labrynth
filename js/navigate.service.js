angular.module('maintenenceWorker')  
	.factory('navigate', function ($http){
		var navigate = {};
		var root = 'navigate/';

		navigate.start = function(){
			var path = root + 'start'
			return $http.get(path).then(function(results){
				return JSON.parse(results.data)
			})
		}

		navigate.exits = function(id){
			var path = root + 'exits?roomId=' + id;
			return $http.get(path).then(function(results){
				return JSON.parse(results.data)
			})
		}

		navigate.doorInfo = function(id, dir){
			var path = root + 'move?roomId=' + id + '&exit=' + dir;
			return $http.get(path).then(function(results){
				return JSON.parse(results.data)
			})
		}

		navigate.inspectWall = function(id){
			var path = root + 'wall?roomId=' + id
			return $http.get(path).then(function(results){
				return JSON.parse(results.data)
			})
		}

		navigate.submitReport = function(report){
			var path = root + 'report'
			console.log('report:', report)
			$http.post(path, report)
		}

		return navigate
	})