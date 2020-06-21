let tasks = require('tasks');
let roomManagerEnergySources = require('room_manager_energy_sources');

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
        stroke: '#ffe600',
        lineStyle: 'dotted',
        strokeWidth: .1,
        opacity: .2
    },
    run(room, creep) {
        if (    creep.memory.task !== null
             && creep.memory.task.type === tasks.TASK_HARVEST
        ) {
            creep.say(creep.memory.task.type);
            if (!creep.memory.sourceId) {
                let source = roomManagerEnergySources.findEnergy(room);
                creep.memory.sourceId = source.id;
            }
            let source = Game.getObjectById(creep.memory.sourceId);
            if(creep.store.getFreeCapacity() > 0) {
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: module.exports.HARVEST_STYLE});
                }
            } else {
                if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
                    creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: module.exports.HOME_STYLE});
                }
            }
        }
    },
};