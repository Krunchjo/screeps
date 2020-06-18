let tasks = require('tasks');
let creepTaskHarvest = require('general/creep_task_harvest');
let creepTaskBuild = require('creep_task_build')

module.exports = {
    run(creep) {
        switch (creep.memory.task.type) {
            case tasks.TASK_BUILD :
                creepTaskBuild.run(creep);
                break
            case tasks.TASK_HARVEST:
                creepTaskHarvest.run(creep);
            default:
                return;
        }
    }
}