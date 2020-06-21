let tasks = require('tasks');

module.exports = {
    manageWorkers(room, creeps) {
        creeps.forEach((creep) => {
            module.exports.clearTaskMemory(creep);
        });
        if (creeps.length < 5) {
            module.exports.manageHarvester(room, creeps);
        } else {
            module.exports.manageBuilder(room, creeps);
            module.exports.manageUpgrader(room, creeps);
            module.exports.manageHarvester(room, creeps);
        }

    },
    manageBuilder(room, creeps) {
        let remainingCreeps = creeps;
        let buildingTargets = room.find(FIND_CONSTRUCTION_SITES);

        if (buildingTargets.length > 0) {
            for (let key in buildingTargets) {
                let target = buildingTargets[key];
                let neededBuilders = 1;
                let counter = 0;
                creeps.forEach((creep) => {
                    if (
                        !creep.memory.task
                        && counter < neededBuilders
                    ) {
                        creep.memory.task = {
                            type: tasks.TASK_BUILD,
                            target: target
                        }
                        counter++;
                    }
                })
            }
        }
        return remainingCreeps;
    },
    manageHarvester(room, creeps) {
        creeps.forEach((creep) => {
            if (
                !creep.memory.task
            ) {
                creep.memory.task = {
                    type: tasks.TASK_HARVEST
                }
            }
        })
    },
    manageUpgrader(room, creeps) {
        let numberOfUpgrader = 2;
        let counter = 0;
        creeps.forEach((creep) => {
            if (
                !creep.memory.task
                && counter < numberOfUpgrader
            ) {
                creep.memory.task = {
                    type: tasks.TASK_UPGRADE
                }
                counter++;
            }
        })
    },
    clearTaskMemory(creep) {
        creep.memory.task = null;
    }
}