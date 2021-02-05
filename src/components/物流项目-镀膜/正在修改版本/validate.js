// 检查 对象中某字段是否存在以字段数据类型是否正确
// input:
//      array: [[Object1, field1, type1], [Object2, field2, type2], ...]
// output:
//      true: 数据正确时返回 true
//      errors: 数据错误时返回错误信息
async function checkField(array) {
    const errors = [];
    array.forEach(a => {
        // eslint-disable-next-line no-prototype-builtins
        if (!a[0].hasOwnProperty(a[1])) { errors.push(`缺少'${a[1]}'字段`); } else if (typeof (a[0][a[1]]) !== a[2]) {
            errors.push(`'${a[1]}'的数据类型不对`);
        }
    });

    if (errors.length === 0) { return true; } else { return errors; }
};

// 检查 roadNodes
// input:
//      roadNodes: 传入roadNodes的属性
// output:
//      true: 数据正确时返回 true
//      errors: 数据错误时返回错误信息
async function checkRoadNodes(roadNodes = {}) {
    const roadNodesLength = roadNodes.length;
    if (roadNodesLength === 0) { return ['roadNodes为空']; }

    const errors = [];
    for (let i = 0; i < roadNodesLength; i++) {
        const r = roadNodes[i];
        var str = `roadNodes[${i}]中`;

        // node, todo
        const cn = await checkField([
            [r, 'node', 'number'],
            [r, 'todo', 'object']]);
        if (cn !== true) {
            cn.forEach(element => {
                errors.push(str + element);
            });
        } else {
            // action, target, direction, endLevel
            const cta = await checkField([
                [r.todo, 'action', 'number'],
                [r.todo, 'target', 'number']
            ]);
            if (cta !== true) {
                cta.forEach(element => {
                    errors.push(str + "'todo'中的" + element);
                });
            }
        }
    }
    if (errors.length === 0) { return true; } else { return errors; }
};

// 检查 content
// input:
//      content: 传入content的属性
// output:
//      true: 数据正确时返回 true
//      errors: 数据错误时返回错误信息
async function checkContent(content = {}) {
    const contentLength = content.length;
    if (contentLength === 0) { return ['content为空']; }

    const errors = [];
    for (let i = 0; i < contentLength; i++) {
        const c = content[i];
        var str = `content[${i}]中`;

        // area, repeat
        const ca = await checkField([
            [c, 'roadMap', 'string']
        ]);
        if (ca !== true) {
            ca.forEach(element => {
                errors.push(str + element);
            });
        }

        // roadNodes
        const cr = await checkField([[c, 'roadNodes', 'object']]);
        if (cr !== true) errors.push(str + cr);
        else {
            const roadNodesValid = await checkRoadNodes(c.roadNodes);
            if (roadNodesValid !== true) {
                roadNodesValid.forEach(element => {
                    errors.push(str + `的${element}`);
                });
            }
        }
    }
    if (errors.length === 0) { return true; } else { return errors; }
};

// 检查 tasklist
// input:
//      tasklist: 任务清单
// output:
//      true: 数据正确时返回 true
//      errors: 数据错误时返回错误信息
async function checkTasklist(tasklist = {}) {
    const tasklistLength = tasklist.length;
    if (tasklistLength === 0) { return ['ctasklist为空']; }

    const errors = [];
    for (let i = 0; i < tasklistLength; i++) {
        const d = tasklist[i];
        const str = `Tasklist[${i}]中`;

        // taskId, taskType, boxId
        const ci = await checkField([
            [d, 'taskType', 'string'],
            [d, 'repeat', 'number']
        ]);
        if (ci !== true) {
            ci.forEach(element => {
                errors.push(str + element);
            });
        }

        // content
        const cc = await checkField([[d, 'content', 'object']]);
        if (cc !== true) errors.push(str + cc);
        else {
            const contentValid = await checkContent(d.content);
            if (contentValid !== true) {
                contentValid.forEach(element => {
                    errors.push(str + `的${element}`);
                });
            }
        }
    }
    if (errors.length === 0) { return true; } else { return errors; }
};

async function checkTask(mission) {
    const cc = await checkField([
        [mission, 'taskType', 'string'],
        [mission, 'repeat', 'number'],
        [mission, 'content', 'object']
    ]);

    if (cc === true) {
        const ee = await checkContent(mission.content);
        if (ee === true) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

async function checkHandCheckField(fieldObject) {
    if (!fieldObject.hasOwnProperty('taskId') || !fieldObject.hasOwnProperty('currentNode') || !fieldObject.hasOwnProperty('status')) {
        return 1;
    } else if (typeof fieldObject.taskId !== 'string' || typeof fieldObject.currentNode !== 'number' || typeof fieldObject.status !== 'number') {
        return 2;
    } else {
        return 3;
    }
}

module.exports = { checkTasklist, checkTask, checkHandCheckField };
