module.exports = {
    chunkArray(myArray, chunk_size){
        let index = 0;
        let arrayLength = myArray.length;
        let tempArray = [];

        for (index = 0; index < arrayLength; index += chunk_size) {
            let myChunk = myArray.slice(index, index+chunk_size);
            // Do something if you want with the group
            tempArray.push(myChunk);
        }

        return tempArray;
    },
    countObjectProps(obj) {
        var count = 0;
        for (k in obj) if (obj.hasOwnProperty(k)) count++;
        return count;
    },
    clearCache() {
        for (let key in Game.rooms) {
            let room = Game.rooms[key];
            let spawns = room.find(FIND_MY_SPAWNS);
            for (let key in spawns) {
                let spawn = spawns[key];
                spawn.memory = {};
            }
            let creeps = room.find(FIND_MY_CREEPS);
            for (let key in creeps) {
                let creep = creeps[key];
                creep.memory = {
                    role: creep.memory.role
                };
            }
            let sources = room.find(FIND_SOURCES);
            for (let key in sources) {
                let source = sources[key]
                source.memory = {};
            }
        }
    }
}