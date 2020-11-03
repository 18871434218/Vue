const fnv1a = require('@sindresorhus/fnv1a');

class TaskObj {
    // parse one mission
    parseInformation(mission) {
        let key1 = new Date().toString();
        let key2 = Math.random().toString();
        let taskId = fnv1a(key1 + key2).toString();
        let content = mission.content;
        let repeat = mission.repeat;
        return { 
            taskId: taskId,
            content: content,
            repeat: repeat
        };
    }
    
    validate(mission) {
       const err = 'invalid Mission:';
       if (mission.repeat !== 0) {
           console.log('----', err);
           return false;
       } 
       else if (mission.content.length === 0) {
           console.log('-----', err);
           return false;
       } else {
           return true;
       }
    }
}

module.exports = { TaskObj };