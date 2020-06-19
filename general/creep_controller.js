let creepTaskManager = require('creep_task_manager');
let roles = require('roles');
let creepControllerWorker = require('creep_controller_worker')

module.exports = {
    run(room) {
        let creeps = room.find(FIND_MY_CREEPS);
        let worker = [];
        for (let key in creeps) {
            let creep = creeps[key];
            switch (creep.memory.role) {
                case roles.ROLE_WORKER :
                    worker.push(creep);
                    break
                default:
                    return;
            }
        }

        if (worker.length > 0) {
            creepControllerWorker.manageWorkers(room, worker);
        }

        for (let key in creeps) {
            creepTaskManager.run(room, creeps[key]);
        }
    }
};