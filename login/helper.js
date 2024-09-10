const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const _ = {};
_.clone = function (data = {}) {
    const originalData = data.toObject ? data.toObject() : data; // for mongodb result operations
    const eType = originalData ? originalData.constructor : 'normal';
    if (eType === Object) return { ...originalData };
    if (eType === Array) return [...originalData];
    return data;
};

_.pick = function (obj, array) {
    const clonedObj = this.clone(obj);
    return array.reduce((acc, elem) => {
        if (elem in clonedObj) acc[elem] = clonedObj[elem];
        return acc;
    }, {});
};

_.encryptPassword = function (password) {
    return crypto.createHmac('sha256', "ESeries-yudiz-Rummy").update(password).digest('hex');
};

_.salt = function (length, type) {
    if (process.env.NODE_ENV !== 'prod') return 1234;
    if (type === 'string') {
        return crypto
            .randomBytes(Math.ceil(length / 2))
            .toString('hex')
            .slice(0, length);
    }

    let min = 1;
    let max = 9;
    for (let i = 1; i < length; i += 1) {
        min += '0';
        max += '9';
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

_.encodeToken = function (body, expTime) {
    try {
        return expTime ? jwt.sign(this.clone(body), "ESeries-yudiz-Rummy", expTime) : jwt.sign(this.clone(body), "ESeries-yudiz-Rummy");
    } catch (error) {
        return undefined;
    }
};

module.exports = _;
