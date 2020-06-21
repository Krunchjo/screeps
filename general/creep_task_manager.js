let tasks = require('tasks');

let creepTaskHarvest = require('creep_task_harvest');
let creepTaskBuild = require('creep_task_build');
let creepTaskUpgrader = require('creep_task_upgrade');

module.exports = {
    run(room, creep) {
        if (creep.memory.task) {
            switch (creep.memory.task.type) {
                case tasks.TASK_BUILD :
                    creepTaskBuild.run(room, creep);
                    break;
                case tasks.TASK_HARVEST:
                    creepTaskHarvest.run(room, creep);
                    break;
                case tasks.TASK_UPGRADE:
                    creepTaskUpgrader.run(room, creep);
                    break
                default:
                    return;
            }
        }
        return;
    }
}