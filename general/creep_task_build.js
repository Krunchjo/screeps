let tasks = require('tasks');
let roomManagerEnergySources = require('room_manager_energy_sources');

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
        stroke: '#0022ff',
        lineStyle: 'dotted',
        strokeWidth: .15,
        opacity: .1
    },
    run(room, creep) {
        if (    creep.memory.task !== undefined
             && creep.memory.task.type === tasks.TASK_BUILD
        ) {
            creep.say(creep.memory.task.type);
            if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.building = false;
            }

            if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
                creep.memory.building = true;
            }

            if (creep.memory.building) {
                let target = creep.memory.task.target;
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: module.exports.BUILD_STYLE});
                }
            } else {
                let source = roomManagerEnergySources.findEnergy(room);
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: module.exports.HARVEST_STYLE});
                }
            }
        }
    }
}