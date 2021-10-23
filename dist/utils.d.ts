export declare function isValidCountryCode(countryCode: string): boolean;
export declare function isValidCurrencyCode(currencyCode: string | number): boolean;
export declare function convertCurrencyCode2Number(currencyCode: string): number;
export declare function genDataLength(data: string | number): string;
export declare class StringUtil {
    private lastErrToken;
    getLastErrorToken(): any;
    getCharacterByteArrayFromString(str: any): any[];
    getNumberAsHexStr(num: number): string;
    getNumberAsHexStrWidthBits(num: number, widthInBits: any): string;
    getNumberAsHexStr32(num: number): string;
    getNumberAsHexStr32FixedWidth(num: number): string;
    getCharacterByteArrayFromByteString(str: string): any[];
    static isBinaryString(s: any): boolean;
    getCharacterByteArrayFromBinaryString(str: any): any[];
}
export declare class UInt64 {
    private highVal;
    private lowVal;
    constructor(numOrUint64: number | UInt64, lowVal?: number);
    clone(): UInt64;
    static fromString(strHigh: string, strLow?: string): UInt64;
    and(otherUInt64OrNumber: any): this;
    shl(dist: any): this;
    shr(dist: any): this;
    isZero(): boolean;
    xor(otherUInt64: any): this;
    reflect(): this;
    toHexString: () => string;
    asNumber(): number;
}
export declare function createQRCode(dataForQRcode: any, center_image: any, width: any, cwidth: any): Promise<string>;
