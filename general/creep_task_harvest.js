let tasks = require('tasks');

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
    run(creep) {
        if (    creep.memory.task !== undefined
             && creep.memory.task.type === tasks.TASK_HARVEST
        ) {
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