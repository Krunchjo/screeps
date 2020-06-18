let creepTaskHarvester = require('general/creep_task_harvest');

module.exports = {
    run(creep) {
        switch (creep.memory.task.type) {
            case 'build' :
                console.log('build stuff');
                break
            case 'harvest':
                creepTaskHarvester.run(creep);
            default:
                return;
        }
    }
}