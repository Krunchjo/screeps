let creepController = require('creep_controller');
let spawnController = require('spawn_controller');
let roomManagerEnergySource = require('room_manager_energy_sources');

module.exports.loop = function () {
    for (let room in Game.rooms) {
        roomManagerEnergySource.manageRoomEnergy(room);
        creepController.run(Game.rooms[room]);
        spawnController.run(Game.rooms[room]);
    }
}