angular.module('maintenenceWorker')
	.controller('LabrynthCtrl', function ($scope, $q, $window, RoomFactory, navigate){
		var vm = this;
		$scope.logBook = {};
		$window.logBook = $scope.logBook;
		$scope.$watchCollection('logBook', function(logBook){
			$scope.bustedRooms = _.filter(logBook, {order: -1})
			$scope.litRooms = _.reject(logBook, {order: -1})
		});

		function getEnteredDoor(dir, prev){
			var opposite = {
				north: 'south',
				east: 'west',
				south: 'north',
				west: 'east'
			}
			return {
				id: prev.id,
				dir: opposite[dir]
			}
		};

		function findCoords(dir, prev){ 
			if (!prev || !prev.coords) {
				return { x:2450, y:1450 }
			}
			var table = {
				north: { x: 0, y: -100 },
				east: { x: 100, y: 0 },
				south: { x: 0, y: 100},
				west: { x: -100, y: 0}
			}
			var coords = {};
			coords.x = prev.coords.x + table[dir].x
			coords.y = prev.coords.y + table[dir].y
			return coords
		};

		$window.pause = function(){
			RoomFactory = undefined;
		}

		function inspect(id, dir, prev){
			console.log('going', dir, !!$scope.logBook[id], id)
			if ($scope.logBook[id]){
				return
			}
			var coords = findCoords(dir, prev)
			return RoomFactory.create(id, coords).then(function(room){
				$scope.logBook[id] = room;
				// here the lighting noise should happen in parallel w/ getWriting...	
				return room.getWriting()
			})
			.then(function(room){
				if (prev){
					room.doors.push(getEnteredDoor(dir, prev))
				}
				// scribble noise should play before foreach.
				var series = $q.when();
				_.forEach(room.doors, function(door){
					series = series.then(function(){
						return inspect(door.id, door.dir, room)
					})
				})
				return series
			})
		}

		navigate.start().then(function(results){
			inspect(results.roomId).then(function(){
				// console.log('busted rooms', $scope.bustedRooms)
				var challengeCode = _.pluck(_.sortBy($scope.litRooms, 'order'), 'writing').join('')
				navigate.submitReport({
					roomIds: _.map(_.pluck($scope.bustedRooms, 'id')),
					challenge: challengeCode	
				})
			})
		})
	})