let creepRoleHarvester = require('creep_role_havester');
let creepTaskManager = require('creep_task_manager');
let helper = require('helper');
let roles = require('roles');

module.exports = {
    run(room) {
        let creeps = room.find(FIND_MY_CREEPS);
        let harvester = [];
        for (let key in creeps) {
            let creep = creeps[key];
            switch (creep.memory.role) {
                case roles.ROLE_WORKER :
                    harvester.push(creep);
                    break
                default:
                    return;
            }
        }
        module.exports.manageWorkers(room, harvester);
        for (let key in creeps) {
            let creep = creeps[key];
            creepTaskManager.run(creep);
        }
    },
    manageWorkers(room, creeps) {
        let remainingCreeps = creeps;
        remainingCreeps = module.exports.manageBuilder(room, remainingCreeps);
        module.exports.manageHarvester(room, remainingCreeps);
    },
    manageBuilder(room, creeps) {
        let remainingCreeps = creeps;
        let buildingTargets = module.exports.findIncompleteBuildings(room);

        let builders = [];
        if (buildingTargets.length > 0) {
            for (let key in buildingTargets) {
                let target = buildingTargets[key];
                let neededBuilders = 1;
                let targetBuilder = remainingCreeps.split(0, neededBuilders);
                remainingCreeps = remainingCreeps.split(neededBuilders, remainingCreeps.length);

                for (key in targetBuilder) {
                    let currentTargetBuilder = targetBuilder[key];
                    currentTargetBuilder.memory.task = {
                        type: 'build',
                        target: target
                    }
                    builders.push(currentTargetBuilder);
                }
            }
        }
    },
    manageHarvester(room, creeps) {
        let resources = room.find(FIND_SOURCES);
        let resNumber = resources.length;

        if (resNumber > 0) {
            let chunks = helper.chunkArray(creeps, creeps.length / resNumber);
            for (let i = 0; i < resNumber; i++) {
                for (let key in chunks[i]) {
                    creepRoleHarvester.run(chunks[i][key], resources[i]);
                }
            }
        }
    },
    findIncompleteBuildings(room) {
        return room.find(FIND_CONSTRUCTION_SITES);
    }
};