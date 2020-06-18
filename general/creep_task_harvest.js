let tasks = require('tasks');
let roomManagerEnergySource = require('room_manager_energy_sources');

module.exports = {
    HARVEST_STYLE: {
        fill: 'transparent',
        stroke: '#ffe600',
        lineStyle: 'dashed',
        strokeWidth: .15,
        opacity: .1
    },
    HOME_STYLE: {
        fill: 'transparent',
        stroke: '#525145',
        lineStyle: 'dashed',
        strokeWidth: .15,
        opacity: .1
    },
    run(creep, room) {
        if (    creep.memory.task !== undefined
             && creep.memory.task.type === tasks.TASK_HARVEST
        ) {
            let source = roomManagerEnergySource.findEnergy(room);
            if(creep.store.getFreeCapacity() > 0) {
                if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: module.exports.HARVEST_STYLE});
                }
            } else {
                if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE ) {
                    creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: module.exports.HOME_STYLE});
                }
            }
        }
    },
};