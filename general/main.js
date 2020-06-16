let creepController = require('creep_controller');
let spawnController = require('spawn_controller');

module.exports.loop = function () {
    for (room in Game.rooms) {
        creepController.run(Game.rooms[room]);
        spawnController.run(Game.rooms[room]);
    }
}