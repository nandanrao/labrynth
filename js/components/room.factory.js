angular.module('maintenenceWorker')
	.factory('RoomFactory', function ($q, navigate){
		var RoomFactory = {}

		function Room (id, coords){
			this.id = id;
			this.coords = coords;
		}

		Room.prototype.getWriting = function(){
			var self = this;
			return navigate.inspectWall(self.id).then(function(results){
				_.merge(self, results)
				return self;
			})
		}

		Room.prototype.getDoors = function(){
			var self = this;
			return navigate.exits(self.id).then(function(results){
				var promises = []
				// How do some rooms have zero exits and one has 4????
				if (_.size(results.exits) === 4){
					console.log('four exit room', results, self)
				}
				_.forEach(results.exits, function(dir){
					var promise = navigate.doorInfo(self.id, dir).then(function(results){
						var door = {};
						door.dir = dir;
						door.id = results.roomId;
						return door
					})
					promises.push(promise)
				})
				return $q.all(promises).then(function(doors){
					self.doors = doors
					return self
				})
			})
		}

		RoomFactory.create = function(id, coords){
			var room = new Room(id, coords);
			return room.getDoors()
		}

		return RoomFactory
	})

