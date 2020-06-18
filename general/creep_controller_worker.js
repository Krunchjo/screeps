let tasks = require('tasks');

module.exports = {
    manageWorkers(room, creeps) {
        let remainingCreeps = creeps;
        remainingCreeps = module.exports.manageBuilder(room, remainingCreeps);
        remainingCreeps = module.exports.manageHarvester(room, remainingCreeps);
    },
    manageBuilder(room, creeps) {
        let remainingCreeps = creeps;
        let buildingTargets = room.find(FIND_CONSTRUCTION_SITES);

        if (buildingTargets.length > 0) {
            for (let key in buildingTargets) {
                let target = buildingTargets[key];
                let neededBuilders = 1;
                let targetBuilder = remainingCreeps.slice(0, neededBuilders);
                remainingCreeps = remainingCreeps.slice(neededBuilders + 1, remainingCreeps.length);

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
        let remainingCreeps = creeps;
        let numberOfHarvester = 2;

        let harvesters = remainingCreeps.slice(0, numberOfHarvester);
        remainingCreeps = remainingCreeps.slice(numberOfHarvester + 1, remainingCreeps.length);

        for (let key in harvesters) {
            let harvester = harvesters[key];
            harvester.memory.task = {
                type: tasks.TASK_HARVEST
            }
        }
        return remainingCreeps;
    }
}