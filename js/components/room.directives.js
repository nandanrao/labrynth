angular.module('maintenenceWorker')
	.directive('door', function (){
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'components/door.html',
			link: function (scope, el, attrs){
				var table = {
					north: { x:41, y:0, w: 25, h: 7 },
					east: { x:100, y:41, w: 7, h: 25 },
					south: { x:41, y:100, w: 25, h: 7 },
					west: { x:0, y:41, w: 7, h: 25}
				}
				_.merge(scope, table[attrs.direction])
			}
		}
	})
	.directive('room', function (){
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'components/room.html',
			controllerAs: 'RoomCtrl',
			controller: function ($scope){
				this.getColor = function(){
					return this.isLit() ? '#FFF' : '#000'
				}
				this.isLit = function(){
					return $scope.room.order ? $scope.room.order !== -1 : false
				}
			},
			link: function (scope){
				scope.x = scope.room.coords.x;
				scope.y = scope.room.coords.y;
			}
		}
	})