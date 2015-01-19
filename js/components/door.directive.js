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