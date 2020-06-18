let tasks = require('tasks');

module.exports = {
    HARVEST_STYLE: {
        fill: 'transparent',
        stroke: '#0022ff',
        lineStyle: 'dashed',
        strokeWidth: .15,
        opacity: .1
    },
    BUILD_STYLE: {
        fill: 'transparent',
        stroke: '#525145',
        lineStyle: 'dashed',
        strokeWidth: .15,
        opacity: .1
    },
    run(creep) {
        if (    creep.memory.task !== undefined
             && creep.memory.task.type === tasks.TASK_BUILD
        ) {
            if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.building = false;
                creep.say('🔄 harvest');
            }

            if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
                creep.memory.building = true;
                creep.say('🚧 build');
            }

            if (creep.memory.building) {
                let target = creep.memory.task.target;
                    creep.moveTo(target, {visualizePathStyle: module.exports.BUILD_STYLE});
            } else {
                let sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: module.exports.HARVEST_STYLE});
                }
            }
        }
    }
}