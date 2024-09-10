const mongoose = require('mongoose');
// const KYC = require('./childSchema/KYC');
// const Bank = require('./childSchema/Bank');
// const Address = require('./childSchema/Address');

const User = mongoose.Schema(
    {
        sEmail: { type: String, default: '' },
        sMobile: { type: String, default: '' },
        sUserName: { type: String, default: '' },
        sFullName: { type: String, default: '' },
        sPassword: { type: String },
        sFacebookId: String,
        sGoogleId: String,
        sAppleUserId: String,
        sLoginType: {
            type: String,
            enum: ["google", "facebook", "apple", "mobile"]
        },
        oGoogleLogin: {
            sGoogleId: String,
            sEmail: String,
            sUserName: String,
            sAvatar: String,
        },
        oFacebookLogin: {
            sFacebookId: String,
            sEmail: String,
            sUserName: String,
            sAvatar: String,
        },
        oAppleLogin: {
            sAppleId: String,
            sEmail: String,
            sUserName: String,
            sAvatar: String,
        },
        sAvatar: String,
        sAgentId: String,
        sPushToken: String,
        sDeviceToken: String,
        sReferralCode: String,
        sReferralLink: String,
        dDob: Date,
        sToken: String,
        sVerificationToken: String,
        sRootSocket: String,
        nOTP: Number,
        nBotLevel: Number,
        nChips: { type: Number, default: 0 },
        nWithdrawable: { type: Number, default: 0 },
        nPracticeChips: { type: Number, default: 5000 },
        isEmailVerified: { type: Boolean, default: false },
        isMobileVerified: { type: Boolean, default: false },
        bUserNameChanged: { type: Boolean, default: false },
        bSoundEnabled: { type: Boolean, default: true },
        bVibrationEnabled: { type: Boolean, default: true },
        bPushEnabled: { type: Boolean, default: true },
        aRummyTable: [mongoose.Schema.Types.ObjectId],
        aAllowedBot: {
            type: [Number],
            default: [1, 2],
        }, // defined at admin
        // oKYC: KYC,
        // oBanking: Bank,
        // oAddress: Address,
        // oClubInfo: {
        //     iClubId: mongoose.Schema.Types.ObjectId,
        //     nRemainingChips: {
        //         // this value store remaining chips to achieve 1 loyalty point.
        //         type: Number,
        //         default: 0,
        //     },
        //     nLP: {
        //         type: Number,
        //         default: 0,
        //     },
        // },
        eOpponent: {
            type: String,
            enum: ['bot', 'user', 'any'],
            default: 'any',
        },
        eGender: {
            type: String,
            enum: ['male', 'female', 'unspecified'],
            default: 'unspecified',
        },
        eUserType: {
            type: String,
            enum: ['user', 'admin', 'bot', 'ubot'],
            default: 'user',
        },
        eStatus: {
            type: String,
            enum: ['y', 'n', 'd'],
            default: 'y',
        },
    },
    { timestamps: { createdAt: 'dCreatedDate', updatedAt: 'dUpdatedDate' } }
);

module.exports = mongoose.model('users', User);
