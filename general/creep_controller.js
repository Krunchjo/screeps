let creepRoleHarvester = require('creep_role_havester');
let helper = require('helper');
module.exports = {
    run(room) {
        let harvester = [];
        for (let key in Game.creeps) {
            let creep = Game.creeps[key];
            if (creep.room === room) {
                switch (creep.memory.role) {
                    case creepRoleHarvester.ID :
                        harvester.push(creep);
                        break
                    default:
                        return;
                }
            }
        }

        module.exports.manageHarvester(room, harvester);
    },
    manageHarvester(room, creeps) {
        let resources = room.find(FIND_SOURCES);
        let resNumber = resources.length;

        if (resNumber > 0) {
            let chunks = helper.chunkArray(creeps, creeps.length / resNumber);
            for (let i = 0; i < resNumber; i++) {
                for (key in chunks[i]) {
                    creepRoleHarvester.run(chunks[i][key], resources[i]);
                }
            }
        }
    }
};