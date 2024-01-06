"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQRCode = exports.isTipOrConvenienceIndicator = exports.calcCrcCheckSum = exports.calcQrItemDataLength = exports.isValidChecksum = exports.isAN = exports.isANS = exports.isFloatingPointAmount = exports.isNumeric = exports.isServiceCode = exports.isValidCurrencyCode = exports.isValidCountryCode = exports.getEnumValues = exports.getEnumKeys = void 0;
const country_data_1 = require("country-data");
const crc_1 = require("crc");
const QRCode = require("qrcode");
const canvas_1 = require("canvas");
const constants_1 = require("../constants");
const _ = require("lodash");
function getEnumKeys(e) {
    return _.difference(_.keys(e), _.map(_.filter(_.values(e), _.isNumber), _.toString));
}
exports.getEnumKeys = getEnumKeys;
function getEnumValues(e) {
    return _.values(_.pick(e, getEnumKeys(e)));
}
exports.getEnumValues = getEnumValues;
function isValidCountryCode(countryCode) {
    return !!country_data_1.countries[countryCode];
}
exports.isValidCountryCode = isValidCountryCode;
function isValidCurrencyCode(currencyCode) {
    return !!country_data_1.currencies[currencyCode];
}
exports.isValidCurrencyCode = isValidCurrencyCode;
function isServiceCode(serviceCode) {
    return getEnumValues(constants_1.ServiceCode).includes(serviceCode);
}
exports.isServiceCode = isServiceCode;
function isNumeric(value) {
    return /^(\d)*$/.test(value);
}
exports.isNumeric = isNumeric;
function isFloatingPointAmount(value) {
    return /^(0\.[1-9]|0\.\d[1-9]|[1-9](\d+)?(\.\d{0,2})?)$/.test(value);
}
exports.isFloatingPointAmount = isFloatingPointAmount;
function isANS(value) {
    return /^[\x20-\x7E\xA0-\xA3\xA5\xA7\xA9-\xB3\xB5-\xB7\xB9-\xBB\xBF-\xFF\u20AC\u0160\u0161\u017D\u017E\u0152\u0153\u0178]*$/.test(value);
}
exports.isANS = isANS;
function isAN(value) {
    return /^[a-zA-Z0-9]+$/.test(value);
}
exports.isAN = isAN;
function isValidChecksum(rawValue) {
    const calculateString = rawValue.substring(0, rawValue.length - 4);
    const checkSumValue = rawValue.substring(rawValue.length - 4);
    return parseInt(calcCrcCheckSum(calculateString), 16) === parseInt(checkSumValue, 16);
}
exports.isValidChecksum = isValidChecksum;
function calcQrItemDataLength(data) {
    return typeof data === 'string' || typeof data === 'number'
        ? (('' + data).length + '').padStart(2, '0')
        : '';
}
exports.calcQrItemDataLength = calcQrItemDataLength;
function calcCrcCheckSum(value) {
    return (0, crc_1.crc16ccitt)(value).toString(16).toUpperCase();
}
exports.calcCrcCheckSum = calcCrcCheckSum;
function isTipOrConvenienceIndicator(value) {
    return getEnumValues(constants_1.TipOrConvenienceIndicatorType).includes(value);
}
exports.isTipOrConvenienceIndicator = isTipOrConvenienceIndicator;
async function createQRCode(qrString, options) {
    const { logo = constants_1.DEFAULT_VIETQR_LOGO, width = 200, margin = 4, bgColor = '#ffffff', color = '#000000', errorCorrectionLevel = 'H', } = options || {};
    console.log('qr code width', width);
    const canvas = (0, canvas_1.createCanvas)(width, width);
    QRCode.toCanvas(canvas, qrString, {
        errorCorrectionLevel,
        margin,
        color: {
            dark: color,
            light: bgColor,
        },
    });
    const ctx = canvas.getContext('2d');
    const img = await (0, canvas_1.loadImage)(logo);
    const logoWidth = canvas.width / 5;
    const logoHeight = canvas.height / 5;
    const centerX = canvas.width / 2 - logoWidth / 2;
    const centerY = canvas.height / 2 - logoHeight / 2;
    ctx.drawImage(img, centerX, centerY, logoWidth, logoHeight);
    return canvas.toDataURL('image/png');
}
exports.createQRCode = createQRCode;
//# sourceMappingURL=index.js.map