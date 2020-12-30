// async function checkField (template) {
//    if (template instanceof Object) {
        
//    }
// };

// async function checkConetnt (content) {};

// module.exports = { checkField, checkConetnt }
// async function validateTask(ctx, next) {
//    console.log(typeof ctx.request.body);
//    await checkConetnt(ctx.request.body);
// }

// async function checkConetnt(tasklist = {}) {
//    console.log('------', tasklist);
//    console.log('type---', typeof tasklist);
//    console.log('-----length', tasklist.length);
// }

// module.exports = {
//    'POST /api/test/validate': validateTask
// }

// var _ = require('lodash');
// console.log('-----------', _.sortedUniq([1, 1, 2, 3, 3, 5, 5, 9, 9, 4, 4]));

{
	"boxId": "boxid1",
	"taskId": "20DFDFJYW1",
	"content": [
		{
			"carId": "id004",
			"repeat": 1,
			"roadMap": "A",
			"roadNodes": [
				{
					"node": 2,
					"todo": {
						"type": "LIFT",
						"action": 12,
						"target": 1,
						"endLevel": 0,
						"direction": 1
					},
					"error": [
						false
					],
					"goods": {
						"type": 0,
						"weight": 0
					},
					"message": [
						"success"
					],
					"nodeCheckTime": [
						""
					],
					"nodeFinishTime": [
						"Tue Dec 22 2020 07:00:55 GMT+0000 (Coordinated Universal Time)"
					]
				},
				{
					"node": 3,
					"todo": {
						"type": "ctu",
						"action": 1,
						"target": 1,
						"endLevel": 0,
						"direction": 1
					},
					"error": [
						false
					],
					"goods": {
						"type": 0,
						"weight": 10
					},
					"message": [
						"success"
					],
					"nodeCheckTime": [
						""
					],
					"nodeFinishTime": [
						"Tue Dec 22 2020 07:01:14 GMT+0000 (Coordinated Universal Time)"
					]
				}
			],
			"nodesIndex": 1,
			"repeatIndex": 1
		},
		{
			"carId": "id004",
			"repeat": 1,
			"roadMap": "A",
			"roadNodes": [
				{
					"node": 4,
					"todo": {
						"type": "ctu",
						"action": 2,
						"target": 1,
						"endLevel": 0,
						"direction": 1
					},
					"error": [
						false
					],
					"goods": {
						"type": 0,
						"weight": 10
					},
					"message": [
						"success"
					],
					"nodeCheckTime": [
						""
					],
					"nodeFinishTime": [
						"Tue Dec 22 2020 07:01:36 GMT+0000 (Coordinated Universal Time)"
					]
				},
				{
					"node": 1,
					"todo": {
						"type": "LIFT",
						"action": 13,
						"target": 1,
						"endLevel": 0,
						"direction": 1
					},
					"goods": {
						"type": 0,
						"weight": 0
					}
				}
			],
			"nodesIndex": 0,
			"repeatIndex": 0
		}
	],
	"taskType": "coating",
	"preTaskId": "0",
	"stepIndex": 1,
	"taskPublishTime": "Tue Dec 22 2020 07:00:34 GMT+0000 (Coordinated Universal Time)"
}
