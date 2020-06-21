module.exports = {
    findEnergy(room) {
        let sources = room.find(FIND_SOURCES);
        let sourceWithLessCreeps = null;
        if (sources.length > 0) {
            for (let key in sources) {
                let source = sources[key];
                if (!source.memory) {
                    source.memory = {
                        creepCounter: 1
                    };
                    return source;
                }

                if (!sourceWithLessCreeps) {
                    sourceWithLessCreeps = source;
                }

                if (sourceWithLessCreeps.memory.creepCounter > source.memory.creepCounter) {
                    sourceWithLessCreeps = source;
                }
            }
        }
        sourceWithLessCreeps.memory.creepCounter++;
        return sourceWithLessCreeps;
    }
}