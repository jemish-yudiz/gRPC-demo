const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('login.proto', {});
const loginProto = grpc.loadPackageDefinition(packageDefinition);

const client = new loginProto.login.LoginService('localhost:50051', grpc.credentials.createInsecure());

function login(sMobile = '+919988776655', sPassword = '1234qweR#') {
    client.Login({ sMobile, sPassword }, (error, response) => {
        if (error) {
            console.error('Login failed:', error);
            return;
        }
        console.log('Login response:', response);
    });
}

login('+919988776655', '1234qweR#');
