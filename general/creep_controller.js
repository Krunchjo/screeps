let creepTaskManager = require('creep_task_manager');
let roles = require('roles');
let creepControllerWorker = require('creep_controller_worker')

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

        if (harvester.length > 0) {
            creepControllerWorker.manageWorkers(room, harvester);
        }

        for (let key in creeps) {
            creepTaskManager.run(creeps[key], room);
        }
    },
};