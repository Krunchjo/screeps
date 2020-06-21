let tasks = require('tasks');
let roomManagerEnergySource = require('room_manager_energy_sources');

module.exports = {
    HARVEST_STYLE: {
        fill: 'transparent',
        stroke: '#44ff00',
        lineStyle: 'dashed',
        strokeWidth: .15,
        opacity: .1
    },
    UPGRADE_STYLE: {
        fill: 'transparent',
        stroke: '#44ff00',
        lineStyle: 'dotted',
        strokeWidth: .1,
        opacity: .2
    },
    run(room, creep) {
        if (    creep.memory.task !== null
             && creep.memory.task.type === tasks.TASK_UPGRADE
        ) {
            creep.say(creep.memory.task.type);
            if(creep.store[RESOURCE_ENERGY] === 0) {
                let source = roomManagerEnergySource.findEnergy(room);
                if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: module.exports.HARVEST_STYLE});
                }
            }
            else {
                if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: module.exports.UPGRADE_STYLE});
                }
            }
        }
    },
};