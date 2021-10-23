export declare class CrcModel {
    width: any;
    name: any;
    polynomial: any;
    initial: any;
    finalXor: any;
    inputReflected: any;
    resultReflected: any;
    constructor(width: any, name: any, polynomial: any, initial: any, finalXor: any, inputReflected: any, resultReflected: any);
}
export declare enum CrcType {
    CRC8 = "CRC8",
    CRC8_SAE_J1850 = "CRC8_SAE_J1850",
    CRC8_SAE_J1850_ZERO = "CRC8_SAE_J1850_ZERO",
    CRC8_8H2F = "CRC8_8H2F",
    CRC8_CDMA2000 = "CRC8_CDMA2000",
    CRC8_DARC = "CRC8_DARC",
    CRC8_DVB_S2 = "CRC8_DVB_S2",
    CRC8_EBU = "CRC8_EBU",
    CRC8_ICODE = "CRC8_ICODE",
    CRC8_ITU = "CRC8_ITU",
    CRC8_MAXIM = "CRC8_MAXIM",
    CRC8_ROHC = "CRC8_ROHC",
    CRC8_WCDMA = "CRC8_WCDMA",
    CRC16_CCIT_ZERO = "CRC16_CCIT_ZERO",
    CRC16_ARC = "CRC16_ARC",
    CRC16_AUG_CCITT = "CRC16_AUG_CCITT",
    CRC16_BUYPASS = "CRC16_BUYPASS",
    CRC16_CCITT_FALSE = "CRC16_CCITT_FALSE",
    CRC16_CDMA2000 = "CRC16_CDMA2000",
    CRC16_DDS_110 = "CRC16_DDS_110",
    CRC16_DECT_R = "CRC16_DECT_R",
    CRC16_DECT_X = "CRC16_DECT_X",
    CRC16_DNP = "CRC16_DNP",
    CRC16_EN_13757 = "CRC16_EN_13757",
    CRC16_GENIBUS = "CRC16_GENIBUS",
    CRC16_MAXIM = "CRC16_MAXIM",
    CRC16_MCRF4XX = "CRC16_MCRF4XX",
    CRC16_RIELLO = "CRC16_RIELLO",
    CRC16_T10_DIF = "CRC16_T10_DIF",
    CRC16_TELEDISK = "CRC16_TELEDISK",
    CRC16_TMS37157 = "CRC16_TMS37157",
    CRC16_USB = "CRC16_USB",
    CRC16_A = "CRC16_A",
    CRC16_KERMIT = "CRC16_KERMIT",
    CRC16_MODBUS = "CRC16_MODBUS",
    CRC16_X_25 = "CRC16_X_25",
    CRC16_XMODEM = "CRC16_XMODEM",
    CRC32 = "CRC32",
    CRC32_BZIP2 = "CRC32_BZIP2",
    CRC32_C = "CRC32_C",
    CRC32_D = "CRC32_D",
    CRC32_MPEG2 = "CRC32_MPEG2",
    CRC32_POSIX = "CRC32_POSIX",
    CRC32_Q = "CRC32_Q",
    CRC32_JAMCRC = "CRC32_JAMCRC",
    CRC32_XFER = "CRC32_XFER",
    CRC64_ECMA_182 = "CRC64_ECMA_182",
    CRC64_GO_ISO = "CRC64_GO_ISO",
    CRC64_WE = "CRC64_WE",
    CRC64_XZ = "CRC64_XZ"
}
export interface CrcOptions {
    width: number;
    polynomial?: number;
    initialVal?: number;
    finalXorVal?: number;
    inputReflected?: boolean;
    resultReflected?: boolean;
}
export declare class Crc {
    private width;
    private polynomial;
    private initialVal;
    private finalXorVal;
    private inputReflected;
    private resultReflected;
    private crcTable;
    private castMask;
    private msbMask;
    private _crcValue;
    constructor(options?: CrcModel | CrcType);
    calcCrcTable(): void;
    calcCrcTableReversed(): void;
    compute(bytes: any): this;
    getLookupTable(): any;
    toHexString(): string;
}
export declare class CrcUtil {
    static reflect8(val: any): number;
    static reflect16(val: any): number;
    static reflect32(val: any): number;
    static reflectGeneric(val: any, width: any): number;
}
export declare function getDataBaseEntryFromEntry(width: any, indexToFind: any): CrcModel;
