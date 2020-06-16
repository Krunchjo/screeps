module.exports = {
    ID: 'harvester',
    HARVESTSTYLE: {
        fill: 'transparent',
        stroke: '#ffe600',
        lineStyle: 'dashed',
        strokeWidth: .15,
        opacity: .1
    },
    HOMESTYLE: {
        fill: 'transparent',
        stroke: '#525145',
        lineStyle: 'dashed',
        strokeWidth: .15,
        opacity: .1
    },
    run(creep, source) {
        if(creep.store.getFreeCapacity() > 0) {
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: module.exports.HARVESTSTYLE});
            }
        } else {
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
                creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: module.exports.HOMESTYLE});
            }
        }
    },
};