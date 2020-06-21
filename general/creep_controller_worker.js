let tasks = require('tasks');

module.exports = {
    manageWorkers(room, creeps) {
        let [maxNumberBuilder, maxNumberUpgrader, maxNumberHarvester] = module.exports.calculateMaxNumbers();
        creeps.forEach((creep) => {
            module.exports.clearTaskMemory(creep);
        });
        if (creeps.length < 5) {
            module.exports.manageHarvester(room, creeps, maxNumberHarvester);
        } else {
            module.exports.manageBuilder(room, creeps, maxNumberBuilder);
            module.exports.manageUpgrader(room, creeps, maxNumberUpgrader);
            module.exports.manageHarvester(room, creeps, maxNumberHarvester);
        }

    },
    manageBuilder(room, creeps, maxNumber) {
        let remainingCreeps = creeps;
        let buildingTargets = room.find(FIND_CONSTRUCTION_SITES);

        if (buildingTargets.length > 0) {
            let maxCounter = 0;
            for (let key in buildingTargets) {
                let target = buildingTargets[key];
                let neededBuilders = 1;
                let counter = 0;
                creeps.forEach((creep) => {
                    if (maxNumber && maxCounter >= maxNumber) {
                        return;
                    }
                    if (
                        !creep.memory.task
                        && counter < neededBuilders
                    ) {
                        creep.memory.task = {
                            type: tasks.TASK_BUILD,
                            target: target
                        }
                        counter++;
                        maxCounter++;
                    }
                })
            }
        }
        return remainingCreeps;
    },
    manageHarvester(room, creeps, maxNumber) {
        let maxCounter = 0;
        creeps.forEach((creep) => {
            if (maxNumber && maxCounter >= maxNumber) {
                return;
            }

            if (
                !creep.memory.task
            ) {
                creep.memory.task = {
                    type: tasks.TASK_HARVEST
                }
                maxCounter++;
            }
        })
    },
    manageUpgrader(room, creeps, maxNumber) {
        let maxCounter = 0;
        creeps.forEach((creep) => {
            if (maxNumber && maxCounter >= maxNumber) {
                return;
            }

            if (!creep.memory.task) {
                creep.memory.task = {
                    type: tasks.TASK_UPGRADE
                }
                maxCounter++;
            }
        })
    },
    calculateMaxNumbers() {
        let maxNumberBuilder = 3;
        let maxNumberUpgrader = 4;
        let maxNumberHarvester = null;
        return [maxNumberBuilder, maxNumberUpgrader, maxNumberHarvester]
    },
    clearTaskMemory(creep) {
        creep.memory.task = null;
    }
}