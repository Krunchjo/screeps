let helper = require('helper');
let roles = require('roles');

module.exports = {
    MAX_NUMBER_WORKERS: 8,
    run(room) {
        let spawns = room.find(FIND_MY_SPAWNS);
        for (let key in spawns) {
            const spawn = spawns[key];
            if (spawn.store[RESOURCE_ENERGY] > 100) {
                if (helper.countObjectProps(Game.creeps) < module.exports.MAX_NUMBER_WORKERS) {
                    let result = spawn.spawnCreep(
                        [WORK, CARRY, MOVE],
                        'creep' + Game.time,
                        { dryRun: true }
                    );
                    if (result === OK) {
                        spawn.spawnCreep([WORK, CARRY, MOVE], 'creep' + Game.time, {
                            memory: {role: roles.ROLE_WORKER}
                        });
                    }
                }
            }
        }
    }
};