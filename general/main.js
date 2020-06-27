let creepController = require('creep_controller');
let spawnController = require('spawn_controller');
let helper = require('helper');

module.exports.loop = function () {
    // helper.clearCache();

    for (let room in Game.rooms) {
        creepController.run(Game.rooms[room]);
        spawnController.run(Game.rooms[room]);
    }
    // helper.debugMemory();
}