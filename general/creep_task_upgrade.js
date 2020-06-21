let tasks = require('tasks');
let roomManagerEnergySources = require('room_manager_energy_sources');

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

            if (creep.memory.collecting === 'undefined') {
                creep.memory.collecting = true;
            }

            if (creep.memory.collecting && creep.store.getFreeCapacity() === 0) {
                creep.memory.collecting = false;
            }
            if (creep.memory.collecting) {
                if (!creep.memory.sourceId) {
                    let source = roomManagerEnergySources.findEnergy(room);
                    creep.memory.sourceId = source.id;
                }
                let source = Game.getObjectById(creep.memory.sourceId);
                if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: module.exports.HARVEST_STYLE});
                }
            }
            else {
                if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: module.exports.UPGRADE_STYLE});
                }
                if (creep.store[RESOURCE_ENERGY] === 0) {
                    creep.memory.collecting = true;
                }
            }
        }
    },
};