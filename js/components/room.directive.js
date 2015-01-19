angular.module('maintenenceWorker')
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