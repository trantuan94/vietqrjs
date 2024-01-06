import { BankBIN, GUID, MerchantCategoryCode, ServiceCode, TipOrConvenienceIndicatorType, VietQrInitiateMethod, VietQrVersion } from '../constants';
export type StringOrNot = string | null | undefined;
export type NumberOrNot = number | null | undefined;
export interface IBeneficiaryOrganiation {
    acquierId: BankBIN | string;
    merchantId: string;
}
export interface IMerchantAccountInfo {
    guid?: GUID | string;
    beneficiaryOrg: IBeneficiaryOrganiation;
    serviceCode?: ServiceCode;
}
export interface IAdditionalData {
    billNumber?: StringOrNot;
    mobileNumber?: StringOrNot;
    storeLabel?: StringOrNot;
    loyaltyNumber?: StringOrNot;
    referenceLabel?: StringOrNot;
    customerLabel?: StringOrNot;
    terminalLabel?: StringOrNot;
    purposeOfTxn?: StringOrNot;
    additionalConsumerDataReq?: StringOrNot;
}
export interface ILanguageTemplate {
    preference: string;
    merchantName: string;
    merchantCity?: StringOrNot;
}
export interface IVietQrDataV1 {
    version: VietQrVersion;
    initMethod: VietQrInitiateMethod;
    merchantAccInfo: IMerchantAccountInfo;
    merchantCategoryCode?: MerchantCategoryCode | string | null | undefined;
    txnCurrency: number;
    txnAmount?: string;
    tipConvenienceIndicator?: TipOrConvenienceIndicatorType | string | null | undefined;
    convenienceFeeFixed?: StringOrNot;
    convenienceFeePercentage?: StringOrNot;
    countryCode: string;
    merchantName?: StringOrNot;
    merchantCity?: StringOrNot;
    postalCode?: StringOrNot;
    additionalData?: IAdditionalData | null | undefined;
    languageTemplate?: ILanguageTemplate | null | undefined;
    crcCode: string;
}
export interface IBasicVietQrData {
    acquierId: BankBIN;
    merchantId: string;
    serviceCode?: ServiceCode;
    amount?: number;
    txnDescription?: string;
}
export interface IGenerateQROptions {
    logo?: string;
    margin?: number;
    width?: number;
    bgColor?: string;
    color?: string;
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
}
