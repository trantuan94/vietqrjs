import { BankBIN } from './banks.constants';
export declare enum VietQrFieldID {
    VERSION = "00",
    INITIAL_METHOD = "01",
    MERCHANT_ACCOUNT_INFO = "38",
    MERCHANT_CATEGORY_CODE = "52",
    TRANSACTION_CURRENCY = "53",
    TRANSACTION_AMOUNT = "54",
    TIP_OR_CONVENIENCE_INDICATOR = "55",
    CONVENIENCE_FEE_FIXED = "56",
    CONVENIENCE_FEE_PERCENTAGE = "57",
    COUNTRY_CODE = "58",
    MERCHANT_NAME = "59",
    MERCHANT_CITY = "60",
    POSTAL_CODE = "61",
    ADDITIONAL_DATA = "62",
    LANGUAGE_TEMPLATE = "64",
    CRC_CODE = "63"
}
export declare enum AdditionalDataFieldID {
    BILL_NUMBER = "01",
    MOBILE_NUMBER = "02",
    STORE_LABEL = "03",
    LOYALTY_NUMBER = "04",
    REFERENCE_LABEL = "05",
    CUSTOMER_LABEL = "06",
    TERMINAL_LABEL = "07",
    PURPOSE_OF_TRANSACTION = "08",
    ADDITIONAL_CONSUMER_DATA_REQUEST = "09"
}
export declare enum LanguageTemplateFieldID {
    LANGUAGE_PREFERENCE = "00",
    ALTERNATE_MERCHANT_NAME = "01",
    ALTERNATE_MERCHANT_CITY = "02"
}
export declare enum BeneficaryOrganizationFieldID {
    ACQUIER_ID = "00",
    MERCHANT_ID = "01"
}
export declare enum VietQrVersion {
    V1 = "01"
}
export declare enum VietQrInitiateMethod {
    STATIC = "11",
    DYNAMIC = "12"
}
export declare enum MerchantAccInfoFieldID {
    GUID = "00",
    BENEFICIARY_ORGANIZATION = "01",
    SERVICE_CODE = "02"
}
export declare enum AdditionalConsumerDataReq {
    CUSTOMER_ADDRESS = "A",
    CUSTOMER_MOBILE = "M",
    CUSTOMER_EMAIL = "E"
}
export declare enum ServiceCode {
    BY_PRODUCT_PAYMENT_SERVICE = "QRPUSH",
    BY_CASH_WITHDRAWL_SERVICE = "QRCASH",
    BY_ACCOUNT_NUMBER = "QRIBFTTA",
    BY_CARD_NUMBER = "QRIBFTTC"
}
export declare enum GUID {
    NAPAS = "A000000727"
}
export declare enum MerchantCategoryCode {
    COMMERCIAL_FOOTWEAR = "5139",
    BOOKS_PERIODICAL_NEWSPAPERS = "5192",
    GLASS_PAINT_WALLPAPER_STORES = "5231",
    SUPERMARKET_GROCERY_STORES = "5411",
    MENS_CLOTHING_AND_ACCESSORIES_STORES = "5611",
    WOMENS_READY_TO_WEAR_STORES = "5621",
    WOMENS_ACCESSORIES_STORES = "5631",
    CHILDREN_AND_INFANT_WEAR_STORES = "5641",
    FAMILY_CLOTHING_STORES = "5651",
    SHOE_STORES = "5661",
    MEN_AND_WOMEN_CLOTHING_STORES = "5691",
    COMPUTER_SOFTWARE_STORES = "5734",
    EATING_PLACES_AND_RESTAURANTS = "5812",
    DRINKING_PLACES_WITH_ALCOHOLIC_BEVERAGES = "5813",
    FAST_FOOD_RESTAURANTS = "5814",
    DRUG_STORES_AND_PHARMACIES = "5912",
    PACKAGE_STORES_WITH_BEER_WINE_LIQUOR = "5921",
    ANTIQUE_SHOPS = "5832",
    BICYCLE_SHOPS = "5940",
    SPORTING_GOODS_STORES = "5941",
    BOOK_STORES = "5942",
    STATIONERY_OFFICE_AND_SCHOOL_SUPPLY_STORES = "5943",
    WATCH_JEWELRY_SILVERWEAR_STORES = "5944",
    HOBBY_TOY_AND_GAME_SHOPS = "5945",
    CAMERA_AND_PHOTOGRAPHIC_SUPPLY_STORES = "5946",
    CARD_GIFT_NOVELTY_AND_SOUVERNIR_SHOPS = "5947",
    COSMETIC_STORES = "5977",
    FLORISTS = "5992",
    PET_AND_SUPPLY_STORES = "5995",
    FINANCIAL_INSTITUTIONS_WITH_CASH_DISBURSEMENTS = "6011",
    LODGING_HOTEL_AND_RESORT_SERVICE = "7011",
    LAUNDRY_SERVICE = "7211",
    DRY_CLEANER = "7216",
    HEALTH_AND_BEAUTY_SHOPS = "7298",
    HOSPITALS = "8062"
}
export declare enum TipOrConvenienceIndicatorType {
    INPUT_TIP = "01",
    FEE_FIXED = "02",
    FEE_PERCENTAGE = "03"
}
export declare const DEFAULT_CURRENCY: any;
export declare const DEFAULT_COUNTRY_CODE: any;
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
    txnAmount: string;
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
export declare enum VietQRFieldName {
    VERSION = "version",
    INITIAL_METHOD = "initial method",
    MERCHANT_ACCOUNT_INFO = "merchant account information",
    MERCHANT_CATEGORY_CODE = "merchant category code",
    TRANSACTION_CURRENCY = "currency",
    TRANSACTION_AMOUNT = "amount",
    TIP_OR_CONVENIENCE_INDICATOR = "tip or convenience indicator",
    CONVENIENCE_FEE_FIXED = "value of convenience fee fixed",
    CONVENIENCE_FEE_PERCENTAGE = "value of convenience fee percentage",
    COUNTRY_CODE = "country code",
    MERCHANT_NAME = "merchant Name",
    MERCHANT_CITY = "merchant city",
    POSTAL_CODE = "postal code",
    ADDITIONAL_DATA = "additional Data",
    LANGUAGE_TEMPLATE = "language template",
    CRC_CODE = "crc checksum"
}
export declare enum MerchantAccInfoFieldName {
    GUID = "guid",
    BENEFICIARY_ORGANIZATION = "beneficiary Organization",
    SERVICE_CODE = "service code"
}
export declare enum BeneficaryOrganizationFieldName {
    ACQUIER_ID = "acquirer ID",
    MERCHANT_ID = "merchant ID"
}
export declare enum AdditionalDataFieldName {
    BILL_NUMBER = "bill Number",
    MOBILE_NUMBER = "mobile Number",
    STORE_LABEL = "store Label",
    LOYALTY_NUMBER = "loyalty Number",
    REFERENCE_LABEL = "reference Label",
    CUSTOMER_LABEL = "customer Label",
    TERMINAL_LABEL = "terminal Label",
    PURPOSE_OF_TRANSACTION = "purpose of transaction",
    ADDITIONAL_CONSUMER_DATA_REQUEST = "additional Consumer Data Request"
}
export declare enum LanguageTemplateFieldName {
    LANGUAGE_PREFERENCE = "preference",
    ALTERNATE_MERCHANT_NAME = "merchant name",
    ALTERNATE_MERCHANT_CITY = "merchant city"
}
