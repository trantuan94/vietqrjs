"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataBaseEntryFromEntry = exports.CrcUtil = exports.Crc = exports.CrcType = exports.CrcModel = void 0;
const utils_1 = require("./utils");
class CrcModel {
    constructor(width, name, polynomial, initial, finalXor, inputReflected, resultReflected) {
        this.width = width;
        this.name = name;
        if (width == 64) {
            this.polynomial = utils_1.UInt64.fromString(polynomial);
            this.initial = utils_1.UInt64.fromString(initial);
            this.finalXor = utils_1.UInt64.fromString(finalXor);
        }
        else {
            this.polynomial = polynomial;
            this.initial = initial;
            this.finalXor = finalXor;
        }
        this.inputReflected = inputReflected;
        this.resultReflected = resultReflected;
    }
}
exports.CrcModel = CrcModel;
var CrcType;
(function (CrcType) {
    CrcType["CRC8"] = "CRC8";
    CrcType["CRC8_SAE_J1850"] = "CRC8_SAE_J1850";
    CrcType["CRC8_SAE_J1850_ZERO"] = "CRC8_SAE_J1850_ZERO";
    CrcType["CRC8_8H2F"] = "CRC8_8H2F";
    CrcType["CRC8_CDMA2000"] = "CRC8_CDMA2000";
    CrcType["CRC8_DARC"] = "CRC8_DARC";
    CrcType["CRC8_DVB_S2"] = "CRC8_DVB_S2";
    CrcType["CRC8_EBU"] = "CRC8_EBU";
    CrcType["CRC8_ICODE"] = "CRC8_ICODE";
    CrcType["CRC8_ITU"] = "CRC8_ITU";
    CrcType["CRC8_MAXIM"] = "CRC8_MAXIM";
    CrcType["CRC8_ROHC"] = "CRC8_ROHC";
    CrcType["CRC8_WCDMA"] = "CRC8_WCDMA";
    CrcType["CRC16_CCIT_ZERO"] = "CRC16_CCIT_ZERO";
    CrcType["CRC16_ARC"] = "CRC16_ARC";
    CrcType["CRC16_AUG_CCITT"] = "CRC16_AUG_CCITT";
    CrcType["CRC16_BUYPASS"] = "CRC16_BUYPASS";
    CrcType["CRC16_CCITT_FALSE"] = "CRC16_CCITT_FALSE";
    CrcType["CRC16_CDMA2000"] = "CRC16_CDMA2000";
    CrcType["CRC16_DDS_110"] = "CRC16_DDS_110";
    CrcType["CRC16_DECT_R"] = "CRC16_DECT_R";
    CrcType["CRC16_DECT_X"] = "CRC16_DECT_X";
    CrcType["CRC16_DNP"] = "CRC16_DNP";
    CrcType["CRC16_EN_13757"] = "CRC16_EN_13757";
    CrcType["CRC16_GENIBUS"] = "CRC16_GENIBUS";
    CrcType["CRC16_MAXIM"] = "CRC16_MAXIM";
    CrcType["CRC16_MCRF4XX"] = "CRC16_MCRF4XX";
    CrcType["CRC16_RIELLO"] = "CRC16_RIELLO";
    CrcType["CRC16_T10_DIF"] = "CRC16_T10_DIF";
    CrcType["CRC16_TELEDISK"] = "CRC16_TELEDISK";
    CrcType["CRC16_TMS37157"] = "CRC16_TMS37157";
    CrcType["CRC16_USB"] = "CRC16_USB";
    CrcType["CRC16_A"] = "CRC16_A";
    CrcType["CRC16_KERMIT"] = "CRC16_KERMIT";
    CrcType["CRC16_MODBUS"] = "CRC16_MODBUS";
    CrcType["CRC16_X_25"] = "CRC16_X_25";
    CrcType["CRC16_XMODEM"] = "CRC16_XMODEM";
    CrcType["CRC32"] = "CRC32";
    CrcType["CRC32_BZIP2"] = "CRC32_BZIP2";
    CrcType["CRC32_C"] = "CRC32_C";
    CrcType["CRC32_D"] = "CRC32_D";
    CrcType["CRC32_MPEG2"] = "CRC32_MPEG2";
    CrcType["CRC32_POSIX"] = "CRC32_POSIX";
    CrcType["CRC32_Q"] = "CRC32_Q";
    CrcType["CRC32_JAMCRC"] = "CRC32_JAMCRC";
    CrcType["CRC32_XFER"] = "CRC32_XFER";
    CrcType["CRC64_ECMA_182"] = "CRC64_ECMA_182";
    CrcType["CRC64_GO_ISO"] = "CRC64_GO_ISO";
    CrcType["CRC64_WE"] = "CRC64_WE";
    CrcType["CRC64_XZ"] = "CRC64_XZ";
})(CrcType = exports.CrcType || (exports.CrcType = {}));
const CrcDatabase = [
    new CrcModel(8, CrcType.CRC8, 0x07, 0x00, 0x00, false, false),
    new CrcModel(8, CrcType.CRC8_SAE_J1850, 0x1d, 0xff, 0xff, false, false),
    new CrcModel(8, CrcType.CRC8_SAE_J1850_ZERO, 0x1d, 0x00, 0x00, false, false),
    new CrcModel(8, CrcType.CRC8_8H2F, 0x2f, 0xff, 0xff, false, false),
    new CrcModel(8, CrcType.CRC8_CDMA2000, 0x9b, 0xff, 0x00, false, false),
    new CrcModel(8, CrcType.CRC8_DARC, 0x39, 0x00, 0x00, true, true),
    new CrcModel(8, CrcType.CRC8_DVB_S2, 0xd5, 0x00, 0x00, false, false),
    new CrcModel(8, CrcType.CRC8_EBU, 0x1d, 0xff, 0x00, true, true),
    new CrcModel(8, CrcType.CRC8_ICODE, 0x1d, 0xfd, 0x00, false, false),
    new CrcModel(8, CrcType.CRC8_ITU, 0x07, 0x00, 0x55, false, false),
    new CrcModel(8, CrcType.CRC8_MAXIM, 0x31, 0x00, 0x00, true, true),
    new CrcModel(8, CrcType.CRC8_ROHC, 0x07, 0xff, 0x00, true, true),
    new CrcModel(8, CrcType.CRC8_WCDMA, 0x9b, 0x00, 0x00, true, true),
    new CrcModel(16, CrcType.CRC16_CCIT_ZERO, 0x1021, 0x0000, 0x0000, false, false),
    new CrcModel(16, CrcType.CRC16_ARC, 0x8005, 0x0000, 0x0000, true, true),
    new CrcModel(16, CrcType.CRC16_AUG_CCITT, 0x1021, 0x1d0f, 0x0000, false, false),
    new CrcModel(16, CrcType.CRC16_BUYPASS, 0x8005, 0x0000, 0x0000, false, false),
    new CrcModel(16, CrcType.CRC16_CCITT_FALSE, 0x1021, 0xffff, 0x0000, false, false),
    new CrcModel(16, CrcType.CRC16_CDMA2000, 0xc867, 0xffff, 0x0000, false, false),
    new CrcModel(16, CrcType.CRC16_DDS_110, 0x8005, 0x800d, 0x0000, false, false),
    new CrcModel(16, CrcType.CRC16_DECT_R, 0x0589, 0x0000, 0x0001, false, false),
    new CrcModel(16, CrcType.CRC16_DECT_X, 0x0589, 0x0000, 0x0000, false, false),
    new CrcModel(16, CrcType.CRC16_DNP, 0x3d65, 0x0000, 0xffff, true, true),
    new CrcModel(16, CrcType.CRC16_EN_13757, 0x3d65, 0x0000, 0xffff, false, false),
    new CrcModel(16, CrcType.CRC16_GENIBUS, 0x1021, 0xffff, 0xffff, false, false),
    new CrcModel(16, CrcType.CRC16_MAXIM, 0x8005, 0x0000, 0xffff, true, true),
    new CrcModel(16, CrcType.CRC16_MCRF4XX, 0x1021, 0xffff, 0x0000, true, true),
    new CrcModel(16, CrcType.CRC16_RIELLO, 0x1021, 0xb2aa, 0x0000, true, true),
    new CrcModel(16, CrcType.CRC16_T10_DIF, 0x8bb7, 0x0000, 0x0000, false, false),
    new CrcModel(16, CrcType.CRC16_TELEDISK, 0xa097, 0x0000, 0x0000, false, false),
    new CrcModel(16, CrcType.CRC16_TMS37157, 0x1021, 0x89ec, 0x0000, true, true),
    new CrcModel(16, CrcType.CRC16_USB, 0x8005, 0xffff, 0xffff, true, true),
    new CrcModel(16, CrcType.CRC16_A, 0x1021, 0xc6c6, 0x0000, true, true),
    new CrcModel(16, CrcType.CRC16_KERMIT, 0x1021, 0x0000, 0x0000, true, true),
    new CrcModel(16, CrcType.CRC16_MODBUS, 0x8005, 0xffff, 0x0000, true, true),
    new CrcModel(16, CrcType.CRC16_X_25, 0x1021, 0xffff, 0xffff, true, true),
    new CrcModel(16, CrcType.CRC16_XMODEM, 0x1021, 0x0000, 0x0000, false, false),
    new CrcModel(32, CrcType.CRC32, 0x04c11db7, 0xffffffff, 0xffffffff, true, true),
    new CrcModel(32, CrcType.CRC32_BZIP2, 0x04c11db7, 0xffffffff, 0xffffffff, false, false),
    new CrcModel(32, CrcType.CRC32_C, 0x1edc6f41, 0xffffffff, 0xffffffff, true, true),
    new CrcModel(32, CrcType.CRC32_D, 0xa833982b, 0xffffffff, 0xffffffff, true, true),
    new CrcModel(32, CrcType.CRC32_MPEG2, 0x04c11db7, 0xffffffff, 0x00000000, false, false),
    new CrcModel(32, CrcType.CRC32_POSIX, 0x04c11db7, 0x00000000, 0xffffffff, false, false),
    new CrcModel(32, CrcType.CRC32_Q, 0x814141ab, 0x00000000, 0x00000000, false, false),
    new CrcModel(32, CrcType.CRC32_JAMCRC, 0x04c11db7, 0xffffffff, 0x00000000, true, true),
    new CrcModel(32, CrcType.CRC32_XFER, 0x000000af, 0x00000000, 0x00000000, false, false),
    new CrcModel(64, CrcType.CRC64_ECMA_182, '0x42f0e1eba9ea3693', '0x0000000000000000', '0x0000000000000000', false, false),
    new CrcModel(64, CrcType.CRC64_GO_ISO, '0x000000000000001B', '0xFFFFFFFFFFFFFFFF', '0xFFFFFFFFFFFFFFFF', true, true),
    new CrcModel(64, CrcType.CRC64_WE, '0x42f0e1eba9ea3693', '0xFFFFFFFFFFFFFFFF', '0xFFFFFFFFFFFFFFFF', false, false),
    new CrcModel(64, CrcType.CRC64_XZ, '0x42f0e1eba9ea3693', '0xFFFFFFFFFFFFFFFF', '0xFFFFFFFFFFFFFFFF', true, true),
];
class Crc {
    constructor(options) {
        if (typeof options === 'string') {
            const crcParam = CrcDatabase.find((item) => item.name === options);
            if (!crcParam)
                throw new Error('Not found CrcModel');
            this.width = crcParam.width;
            this.polynomial = crcParam === null || crcParam === void 0 ? void 0 : crcParam.polynomial;
            this.initialVal = crcParam === null || crcParam === void 0 ? void 0 : crcParam.initial;
            this.finalXorVal = crcParam === null || crcParam === void 0 ? void 0 : crcParam.finalXor;
            this.inputReflected = crcParam === null || crcParam === void 0 ? void 0 : crcParam.inputReflected;
            this.resultReflected = crcParam === null || crcParam === void 0 ? void 0 : crcParam.resultReflected;
        }
        else if (typeof options === 'object') {
            this.width = options.width;
            this.polynomial = options === null || options === void 0 ? void 0 : options.polynomial;
            this.initialVal = options === null || options === void 0 ? void 0 : options.initial;
            this.finalXorVal = options === null || options === void 0 ? void 0 : options.finalXor;
            this.inputReflected = options === null || options === void 0 ? void 0 : options.inputReflected;
            this.resultReflected = options === null || options === void 0 ? void 0 : options.resultReflected;
        }
        else {
            throw new Error('Invalid arguments');
        }
        switch (this.width) {
            case 8:
                this.castMask = 0xff;
                break;
            case 16:
                this.castMask = 0xffff;
                break;
            case 32:
                this.castMask = 0xffffffff;
                break;
            case 64:
                this.castMask = new utils_1.UInt64(0xffffffff, 0xffffffff);
                break;
            default:
                throw 'Invalid CRC width';
                break;
        }
        if (this.width == 64) {
            this.msbMask = new utils_1.UInt64(0x80000000, 0x00000000);
        }
        else {
            this.msbMask = 0x01 << (this.width - 1);
        }
        if (!this.crcTable) {
            this.calcCrcTable();
        }
    }
    calcCrcTable() {
        this.crcTable = new Array(256);
        if (this.width == 64) {
            for (let divident = 0; divident < 256; divident++) {
                let currByte = new utils_1.UInt64(0, divident);
                currByte.shl(56).and(this.castMask);
                for (let bit = 0; bit < 8; bit++) {
                    if (!new utils_1.UInt64(currByte).and(this.msbMask).isZero()) {
                        currByte.shl(1);
                        currByte.xor(this.polynomial);
                    }
                    else {
                        currByte.shl(1);
                    }
                }
                this.crcTable[divident] = currByte.and(this.castMask);
            }
        }
        else {
            for (let divident = 0; divident < 256; divident++) {
                let currByte = (divident << (this.width - 8)) & this.castMask;
                for (let bit = 0; bit < 8; bit++) {
                    if ((currByte & this.msbMask) != 0) {
                        currByte <<= 1;
                        currByte ^= this.polynomial;
                    }
                    else {
                        currByte <<= 1;
                    }
                }
                this.crcTable[divident] = currByte & this.castMask;
            }
        }
    }
    calcCrcTableReversed() {
        this.crcTable = new Array(256);
        if (this.width == 64) {
            for (let divident = 0; divident < 256; divident++) {
                let reflectedDivident = CrcUtil.reflect8(divident);
                let currByte = new utils_1.UInt64(0, reflectedDivident);
                currByte.shl(56).and(this.castMask);
                for (let bit = 0; bit < 8; bit++) {
                    if (!new utils_1.UInt64(currByte).and(this.msbMask).isZero()) {
                        currByte.shl(1);
                        currByte.xor(this.polynomial);
                    }
                    else {
                        currByte.shl(1);
                    }
                }
                currByte = currByte.reflect();
                this.crcTable[divident] = currByte.and(this.castMask);
            }
        }
        else {
            for (let divident = 0; divident < 256; divident++) {
                let reflectedDivident = CrcUtil.reflect8(divident);
                let currByte = (reflectedDivident << (this.width - 8)) & this.castMask;
                for (let bit = 0; bit < 8; bit++) {
                    if ((currByte & this.msbMask) != 0) {
                        currByte <<= 1;
                        currByte ^= this.polynomial;
                    }
                    else {
                        currByte <<= 1;
                    }
                }
                currByte = CrcUtil.reflectGeneric(currByte, this.width);
                this.crcTable[divident] = currByte & this.castMask;
            }
        }
    }
    compute(bytes) {
        if (this.width == 64) {
            let crc = this.initialVal.clone();
            for (let i = 0; i < bytes.length; i++) {
                let curByte = bytes[i] & 0xff;
                if (this.inputReflected) {
                    curByte = CrcUtil.reflect8(curByte);
                }
                let curByteShifted56 = new utils_1.UInt64(0, curByte).shl(56);
                crc.xor(curByteShifted56).and(this.castMask);
                let pos = crc.clone().shr(56).and(0xff).asNumber();
                crc.shl(8).and(this.castMask);
                crc.xor(this.crcTable[pos]).and(this.castMask);
            }
            if (this.resultReflected) {
                crc.reflect();
            }
            this._crcValue = crc.xor(this.finalXorVal).and(this.castMask);
            return this;
        }
        else {
            let crc = this.initialVal;
            for (let i = 0; i < bytes.length; i++) {
                let curByte = bytes[i] & 0xff;
                if (this.inputReflected) {
                    curByte = CrcUtil.reflect8(curByte);
                }
                crc = (crc ^ (curByte << (this.width - 8))) & this.castMask;
                let pos = (crc >> (this.width - 8)) & 0xff;
                crc = (crc << 8) & this.castMask;
                crc = (crc ^ this.crcTable[pos]) & this.castMask;
            }
            if (this.resultReflected) {
                crc = CrcUtil.reflectGeneric(crc, this.width);
            }
            this._crcValue = (crc ^ this.finalXorVal) & this.castMask;
            return this;
        }
    }
    getLookupTable() {
        return this.crcTable;
    }
    toHexString() {
        if (this.width === 64) {
            return this._crcValue.toHexString();
        }
        else if (this.width === 32) {
            return new utils_1.StringUtil().getNumberAsHexStr32FixedWidth(this._crcValue);
        }
        else {
            return new utils_1.StringUtil().getNumberAsHexStr(this._crcValue);
        }
    }
}
exports.Crc = Crc;
class CrcUtil {
    static reflect8(val) {
        let resByte = 0;
        for (let i = 0; i < 8; i++) {
            if ((val & (1 << i)) != 0) {
                resByte |= (1 << (7 - i)) & 0xff;
            }
        }
        return resByte;
    }
    static reflect16(val) {
        let resByte = 0;
        for (let i = 0; i < 16; i++) {
            if ((val & (1 << i)) != 0) {
                resByte |= (1 << (15 - i)) & 0xffff;
            }
        }
        return resByte;
    }
    static reflect32(val) {
        let resByte = 0;
        for (let i = 0; i < 32; i++) {
            if ((val & (1 << i)) != 0) {
                resByte |= (1 << (31 - i)) & 0xffffffff;
            }
        }
        return resByte;
    }
    static reflectGeneric(val, width) {
        let resByte = 0;
        for (let i = 0; i < width; i++) {
            if ((val & (1 << i)) != 0) {
                resByte |= 1 << (width - 1 - i);
            }
        }
        return resByte;
    }
}
exports.CrcUtil = CrcUtil;
function getDataBaseEntryFromEntry(width, indexToFind) {
    let curIndex = 0;
    for (let i = 0; i < CrcDatabase.length; i++) {
        if (width != CrcDatabase[i].width)
            continue;
        if (curIndex == indexToFind) {
            return CrcDatabase[i];
        }
        else {
            curIndex++;
        }
    }
    throw 'Invalid selected index into CRC database';
}
exports.getDataBaseEntryFromEntry = getDataBaseEntryFromEntry;
//# sourceMappingURL=crc.helper.js.map