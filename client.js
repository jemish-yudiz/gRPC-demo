// * This is Client File

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('todo.proto', {});
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const todoPackage = grpcObject.todoPackage;

const client = new todoPackage.Todo("127.0.0.1:4000", grpc.credentials.createInsecure());

client.createTodo({
    id: -1,
    text: "Hello"
}, (err, response) => {
    console.log("Recieves Response createTodo::", response);
})

client.readTodos({}, (err, response) => {
    console.log("Recieves Response readTodos::", response);
});

const call = client.readTodosStream();
call.on("data", (response) => {
    console.log("Recieves Response readTodosStream::", response);
});
call.on("end", e => console.log("readTodosStream done!"));