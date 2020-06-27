module.exports = {
    findEnergy(room) {
        let sources = room.find(FIND_SOURCES);
        if (sources.length <= 0) {
            return null;
        }

        let creeps = room.find(FIND_CREEPS);
        let creepsOnResources = [];

        for (let key in creeps) {
            let creep = creeps[key];
            if (creep.memory && creep.memory.sourceId) {
                let sourceId = creep.memory.sourceId;
                if (creepsOnResources[sourceId]) {
                    let value = creepsOnResources[sourceId];
                    value += 1;
                    creepsOnResources[sourceId] = value;
                } else {
                    creepsOnResources[sourceId] = 1;
                }
            }
        }

        let leastCreepResource = null;

        for (let key in sources) {
            let source = sources[key];

            if (!creepsOnResources[source.id]) {
                leastCreepResource = source;
                break;
            }

            if (!leastCreepResource) {
                leastCreepResource = source;
            }

            if (creepsOnResources[source.id] <= creepsOnResources[leastCreepResource.id]) {
                leastCreepResource = source;
            }
        }

        return Game.getObjectById(leastCreepResource.id);
    }
}