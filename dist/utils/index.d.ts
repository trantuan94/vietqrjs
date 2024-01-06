import { IGenerateQROptions } from '../interfaces/index';
export declare function getEnumKeys<T extends string | number>(e: Record<string, T>): string[];
export declare function getEnumValues<T extends string | number>(e: Record<string, T>): T[];
export declare function isValidCountryCode(countryCode: string): boolean;
export declare function isValidCurrencyCode(currencyCode: string | number): boolean;
export declare function isServiceCode(serviceCode: string): boolean;
export declare function isNumeric(value: string): boolean;
export declare function isFloatingPointAmount(value: string): boolean;
export declare function isANS(value: string): boolean;
export declare function isAN(value: string): boolean;
export declare function isValidChecksum(rawValue: string): boolean;
export declare function calcQrItemDataLength(data: string | number): string;
export declare function calcCrcCheckSum(value: string): string;
export declare function isTipOrConvenienceIndicator(value: string): boolean;
export declare function createQRCode(qrString: string, options?: IGenerateQROptions): Promise<string>;
