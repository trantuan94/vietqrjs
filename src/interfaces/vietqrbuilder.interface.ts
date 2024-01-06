import {
  BankBIN,
  GUID,
  MerchantCategoryCode,
  ServiceCode,
  TipOrConvenienceIndicatorType,
  VietQrInitiateMethod,
  VietQrVersion,
} from '../constants';

export type StringOrNot = string | null | undefined;

export type NumberOrNot = number | null | undefined;

export interface IBeneficiaryOrganiation {
  acquierId: BankBIN | string; // ID 38 - 01 - 00 (Required Field)
  merchantId: string; // ID 38 - 01 - 01 (Required Field)
}

export interface IMerchantAccountInfo {
  guid?: GUID | string; // ID 38 - 00 (Required Field)
  beneficiaryOrg: IBeneficiaryOrganiation; // ID 38 - 01 (Required Field)
  serviceCode?: ServiceCode; // ID 38 - 02 (Conditional Field)
}

export interface IAdditionalData {
  billNumber?: StringOrNot; // ID 62 - 01 (Conditional Field)
  mobileNumber?: StringOrNot; // ID 62 - 02 (Conditional Field)
  storeLabel?: StringOrNot; // ID 62 - 03 (Optional Field)
  loyaltyNumber?: StringOrNot; // ID 62 - 04 (Optional Field)
  referenceLabel?: StringOrNot; // ID 62 - 05 (Conditional Field)
  customerLabel?: StringOrNot; // ID 62 - 06 (Conditional Field)
  terminalLabel?: StringOrNot; // ID 62 - 07 (Optional Field)
  purposeOfTxn?: StringOrNot; // ID 62 - 08 (Conditional Field)
  additionalConsumerDataReq?: StringOrNot; // ID 62 - 09 (Optional Field)
}

export interface ILanguageTemplate {
  preference: string; // ID 64 - 00 (Required Field)
  merchantName: string; // ID 64 - 01 (Required Field)
  merchantCity?: StringOrNot; // ID 64 - 02 (Optional Field)
}

export interface IVietQrDataV1 {
  version: VietQrVersion; // ID 00
  initMethod: VietQrInitiateMethod; // ID 01
  merchantAccInfo: IMerchantAccountInfo; // ID = 38
  merchantCategoryCode?: MerchantCategoryCode | string | null | undefined; // ID 52
  txnCurrency: number; // ID 53
  txnAmount?: string; // ID 54
  tipConvenienceIndicator?: TipOrConvenienceIndicatorType | string | null | undefined; // ID 55
  convenienceFeeFixed?: StringOrNot; // ID 56
  convenienceFeePercentage?: StringOrNot; // ID 57
  countryCode: string; // ID 58
  merchantName?: StringOrNot; // ID 59
  merchantCity?: StringOrNot; // ID 60
  postalCode?: StringOrNot; // ID 61
  additionalData?: IAdditionalData | null | undefined; // ID 62
  languageTemplate?: ILanguageTemplate | null | undefined; // ID 64
  crcCode: string; // ID 63
}

export interface IBasicVietQrData {
  acquierId: BankBIN; // ID DVCNTT
  merchantId: string; // Tài khoản/Số thẻ thụ hưởng
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
