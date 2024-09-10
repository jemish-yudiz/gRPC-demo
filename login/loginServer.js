const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const User = require('./User');
const messages = require('./message');
const _ = require('./helper');
const mongoose = require('mongoose');

const packageDefinition = protoLoader.loadSync('login.proto', {});
const loginProto = grpc.loadPackageDefinition(packageDefinition);

mongoose
        .connect(process.env.MONGODB_URI)
        .then(() => console.log('Database connected'))
        .catch((error) => {
            throw error;
        });

const server = new grpc.Server();
server.addService(loginProto.login.LoginService.service, { Login: login });
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('gRPC server running on port 50051');
});

async function login(call, callback) {
    const body = _.pick(call.request, ['sMobile', 'sPassword']);

    const query = {
        $or: [{ sMobile: body.sMobile }, { sEmail: body.sMobile }],
        sPassword: _.encryptPassword(body.sPassword),
    };

    const project = {
        _id: true,
        isMobileVerified: true,
        eStatus: true,
        sToken: true,
        eUserType: true,
        sMobile: true,
        sDeviceToken: true,
    };

    try {
        const user = await User.findOne(query, project);
        
        if (!user) {
            return callback(null, { success: false, message: messages.wrong_credentials() });
        }

        if (!user.isMobileVerified) {
            return callback(null, { success: false, message: messages.not_verified('Mobile number'), sMobile: user.sMobile });
        }

        if (user.eStatus === 'n') {
            return callback(null, { success: false, message: messages.custom.user_blocked });
        }

        if (user.eStatus === 'd') {
            return callback(null, { success: false, message: messages.custom.user_deleted });
        }

        const deviceData = { oDeviceInfo: call.request.oDeviceInfo };

        try {
            deviceData.oDeviceInfo = JSON.parse(deviceData.oDeviceInfo);
        } catch (e) {
            deviceData.oDeviceInfo = {};
        }

        if (user.sDeviceToken && user.sDeviceToken !== deviceData.oDeviceInfo.sDeviceId) {
            user.nOTP = _.salt(4);
            user.sVerificationToken = _.encodeToken({ nOTP: user.nOTP, sMobile: user.sMobile }, { expiresIn: '3m' });
            await user.save();

            return callback(null, {
                success: true,
                message: messages.custom.login_otp_success,
                expiresIn: 3 * 60 * 1000,
                sMobile: user.sMobile,
                verification: user.sVerificationToken
            });
        }

        user.sToken = _.encodeToken({
            _id: user._id.toString(),
            eUserType: user.eUserType,
        });
        user.sDeviceToken = deviceData.oDeviceInfo.sDeviceId;
        await user.save();

        return callback(null, {
            success: true,
            message: messages.success('Login'),
            token: user.sToken
        });

    } catch (error) {
        console.error(error);
        return callback(null, { success: false, message: messages.server_error() });
    }
}