let tasks = require('tasks');
let creepTaskHarvest = require('creep_task_harvest');
let creepTaskBuild = require('creep_task_build')

module.exports = {
    run(room, creep) {
        switch (creep.memory.task.type) {
            case tasks.TASK_BUILD :
                creepTaskBuild.run(room, creep);
                break
            case tasks.TASK_HARVEST:
                creepTaskHarvest.run(room, creep);
            default:
                return;
        }
    }
}