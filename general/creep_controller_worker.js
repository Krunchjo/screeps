let helper = require('helper');
let tasks = require('tasks');

module.exports = {
    manageWorkers(room, creeps) {
        let remainingCreeps = creeps;
        remainingCreeps = module.exports.manageBuilder(room, remainingCreeps);
        module.exports.manageHarvester(room, remainingCreeps);
    },
    manageBuilder(room, creeps) {
        let remainingCreeps = creeps;
        let buildingTargets = room.find(FIND_CONSTRUCTION_SITES);

        if (buildingTargets.length > 0) {
            for (let key in buildingTargets) {
                let target = buildingTargets[key];
                let neededBuilders = 1;
                let targetBuilder = remainingCreeps.split(0, neededBuilders);
                remainingCreeps = remainingCreeps.split(neededBuilders, remainingCreeps.length);

                for (key in targetBuilder) {
                    let currentTargetBuilder = targetBuilder[key];
                    currentTargetBuilder.memory.task = {
                        type: tasks.TASK_BUILD,
                        target: target
                    }
                }
            }
        }
    },
    manageHarvester(room, creeps) {
        let resources = room.find(FIND_SOURCES);
        let resNumber = resources.length;

        if (resNumber > 0) {
            let creepChunks = helper.chunkArray(creeps, creeps.length / resNumber);
            for (let i = 0; i < resNumber; i++) {
                for (let key in creepChunks[i]) {
                    creepChunks[i][key].memory.task = {
                        type: tasks.TASK_HARVEST,
                        target: resources[i]
                    };
                }
            }
        }
    }
}