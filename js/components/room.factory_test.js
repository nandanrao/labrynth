 describe('RoomFactory', function (){
	var navigate,
			RoomFactory,
			$timeout,
			$q

	navigate = {}

	beforeEach(function(){
		module('maintenenceWorker', function($provide){
			$provide.value('navigate', navigate)
		})
	})

	beforeEach(inject(function (_RoomFactory_, _navigate_, _$timeout_, _$q_){
		navigate = _navigate_;
		RoomFactory = _RoomFactory_;
		$timeout = _$timeout_;
		$q = _$q_;

		navigate.exits = sinon.stub()
				.returns($q.when({
				  exits: ['north', 'south', 'east', 'west']
				}));

		navigate.doorInfo = function(id){
			var results = {
				roomId: '' + Math.floor(Math.random()*20)
			}
			return $q.when(results)
		}

		navigate.inspectWall = function(id){
			var order = Math.floor(Math.random()*20)
			var on = Math.round(Math.random())
			if (!!on){
				return $q.when({writing: 'writing', order: order})
			}
			else {
				return $q.when({writing: 'xx', order: -1})
			}	
		}
	}))


	describe(' :: Static Methods', function(){
		describe('create', function (){

			it('instantiates a room instance with door info', function(done){
				RoomFactory.create('id', 'coords').then(function(room){
					should.exist(room)
					room.doors.should.have.property('length')
					done()
				})
				$timeout.flush()
			})
		})
	})

	describe(' :: instance methods', function (){
		var room;

		beforeEach(function (done){
			RoomFactory.create('id', 'coords').then(function(_room){
				room = _room
				done()
			})
			$timeout.flush()
		})

		describe('getWriting', function (){

			it('returns a promise that resolves to an instance of itself', function(done){
				room.getWriting().then(function(_room){
					_room.should.equal(room)
					done()
				})
				$timeout.flush()
			})

			it('adds order and writing properties to itself', function (){
				should.not.exist(room.order)
				should.not.exist(room.writing)
				room.getWriting()
				$timeout.flush()
				should.exist(room.writing)
				should.exist(room.order)
			})
		})
	})

})