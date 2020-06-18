module.exports = {
    run(creep) {
        switch (creep.memory.task) {
            case 'build' :
                console.log('build stuff');
                break
            case 'harvest':
                console.log('harvest stuff');
            default:
                return;
        }
    }
}