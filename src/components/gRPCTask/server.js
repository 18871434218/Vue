let PROTO_PATH = __dirname + '/arrangeTask.proto';

let grpc = require('grpc');
let protoLoader = require('@grpc/proto-loader');
let packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
let hello_proto = grpc.loadPackageDefinition(packageDefinition).arrangeTask;

// function add6661(call) {
//         let packageDefinition1 = protoLoader.loadSync(
//             __dirname + '/pythonPart.proto',
//             {
//                 keepCase: true,
//                 longs: String,
//                 enums: String,
//                 defaults: true,
//                 oneofs: true
//             });
//         let hello_proto1 = grpc.loadPackageDefinition(packageDefinition1).pythonPart;
//         let client = new hello_proto1.jiajia7777('localhost:50053',
//             grpc.credentials.createInsecure());
//         let call1 = client.add7777({ input: call.request.name });
//         call1.on('data',function(response){
//             call.write({message: response.message});
//           }); 
//         call1.on('end',function(){
//         call.end();
//   });
        

// }
function GetCar1(call, callback) {
    console.log('car locked');
    if (Math.random()>0.3){
        callback(null, {id: '1'}),200;
    }else{
        callback(null, {id: '-1'}),200;
    }
    
    // callback(null, {id: '1'}),200;
    
}

function GetTask1(call, callback) {
    console.log('task locked');
    if (Math.random()>0.3){
        callback(null, {id:'1',datas: ['aaaaa','bbbbb']});
    }else{
        callback(null, {id: '-1' ,datas: ['?????','?????']});
    }
    
    // callback(null, {id:'1',datas: ['aaaaa','bbbbb']});
    
}

// async function LockTask1(call, callback) {
//     // if (Math.random()>0.5){
//     //     setTimeout( callback(null, {word: 'success'}),500)
//     // }else{
//     //     setTimeout( callback(null, {word: 'failed'}),500)
//     // }
//     setTimeout( callback(null, {word: 'success'}),200)
    
// }

function UnlockTask1(call, callback) {
    // if (Math.random()>0.5){
    //     callback(null, {word: 'success'});
    // }else{
    //     callback(null, {word: 'failed'});
    // }
    console.log('task unlocked');
    callback(null, {word: 'success'});
    
}

// async function LockCar1(call, callback) {
//     // if (Math.random()>0.5){
//     //     setTimeout( callback(null, {word: 'success'}),500)
//     // }else{
//     //     setTimeout( callback(null, {word: 'failed'}),500)
//     // }
//     setTimeout( callback(null, {word: 'success'}),200);
    
// }

function UnlockCar1(call, callback) {
    // if (Math.random()>0.5){
    //     callback(null, {word: 'success'});
    // }else{
    //     callback(null, {word: 'failed'});
    // }
    console.log('car unlocked');
    callback(null, {word: 'success'});
    
}
function GetTaskIdQR1(call, callback) {
    // if (Math.random()>0.5){
    //     callback(null, {id:'1'});
    // }else{
    //     callback(null, {id:'-1'});
    // }
    callback(null, {id:'1'});
    
}

function GetTaskDataWithId1(call, callback) {
    // if (Math.random()>0.5){
    //      callback(null, {id:'1',datas: ['aaaaa','bbbbb']});
    // }else{
    //      callback(null, {id:'-1',datas: ['?????','?????']});
    // }
    callback(null, {id:'1',datas: ['aaaaa','bbbbb']});
    
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
    let server = new grpc.Server();
    server.addService(hello_proto.MyTest.service, { getCar: GetCar1, getTask: GetTask1, unlockTask: UnlockTask1, unlockCar: UnlockCar1, getTaskIdQR:GetTaskIdQR1, getTaskDataWithId: GetTaskDataWithId1});
    server.bind('0.0.0.0:50052', grpc.ServerCredentials.createInsecure());
    server.start();
    console.log('node server mid start!')
}

main();