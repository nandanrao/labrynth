describe('RoomFactory', function (){
	var labrynth,
			RoomFactory,
			$timeout,
			$q,
			$scope,
			LabrynthCtrl

	var writing = 'writingonthewall';


	beforeEach(function(){
		module('maintenenceWorker', function($provide){
			$provide.value('RoomFactory', RoomFactory)
		})
	})

	beforeEach(inject(function ($controller, _$timeout_, _$q_, $rootScope){
		$scope = $rootScope.$new()
		$timeout = _$timeout_;
		$q = _$q_;

		RoomFactory = {}
		RoomFactory.create = function(id, coords){
			var directions = ['north', 'south', 'west', 'east'];
			var doorNumber = Math.round(Math.random()*4);
			var doors = [];
			var doorId;

			while (doorNumber--){
				doorId = Math.floor(Math.random()*21);
				doors.push({id: doorId, dir: directions[doorNumber]})
			}

			return $q.when({
				id: id,
				coords: coords,
				doors: doors,
				getWriting: function(){
					var on = Math.round(Math.random())
					if (!!on){
						this.order = Math.floor(Math.random()*20);
						this.writing = writing;
					}
					else {
						this.order = -1;
						this.writing = 'xx'
					}	
					return $q.when(this)	
				}
			})
		}

		LabrynthCtrl = $controller('LabrynthCtrl', {
			RoomFactory: RoomFactory,
			$scope: $scope
		})
	}))


	describe('inspect method', function(){

		it('creates lit rooms and busted rooms that are opposite', function(){
			LabrynthCtrl.inspect('id', 'north')
			$timeout.flush()
			var numberOfRooms = $scope.litRooms.length + $scope.bustedRooms.length 
			numberOfRooms.should.equal(_.size($scope.logBook))
		})

		it('creates a challenge code that is a string and contains writing', function(){
			LabrynthCtrl.inspect('id', 'north')
			$timeout.flush()
			$scope.challengeCode.should.be.a('string')
			$scope.challengeCode.should.contain(writing)
		})
	})
})