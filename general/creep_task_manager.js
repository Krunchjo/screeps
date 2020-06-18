let tasks = require('tasks');
let creepTaskHarvest = require('creep_task_harvest');
let creepTaskBuild = require('creep_task_build')

module.exports = {
    run(creep, room) {
        switch (creep.memory.task.type) {
            case tasks.TASK_BUILD :
                creepTaskBuild.run(creep, room);
                break
            case tasks.TASK_HARVEST:
                creepTaskHarvest.run(creep, room);
            default:
                return;
        }
    }
}