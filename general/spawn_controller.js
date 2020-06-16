let helper = require('helper')

module.exports = {
    MAX_NUMBER: 8,
    run(room) {
        for (let key in Game.spawns) {
            const spawn = Game.spawns[key];
            if (spawn.store[RESOURCE_ENERGY] > 100) {
                if (helper.countObjectProps(Game.creeps) < module.exports.MAX_NUMBER) {
                    spawn.spawnCreep([WORK, CARRY, MOVE], 'creep' + Game.time, {
                        memory: {role: 'harvester'}
                    });
                }
            }
        }
    }
};