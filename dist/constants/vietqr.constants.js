"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_COUNTRY_CODE = exports.DEFAULT_CURRENCY = exports.TipOrConvenienceIndicatorType = exports.MerchantCategoryCode = exports.GUID = exports.ServiceCode = exports.BeneficaryOrganizationFieldID = exports.MerchantAccInfoFieldID = exports.VietQrInitiateMethod = exports.VietQrVersion = exports.LanguageTemplateFieldID = exports.AdditionalConsumerDataReq = exports.AdditionalDataFieldID = exports.VietQrFieldID = void 0;
const country_data_1 = require("country-data");
var VietQrFieldID;
(function (VietQrFieldID) {
    VietQrFieldID["VERSION"] = "00";
    VietQrFieldID["INITIAL_METHOD"] = "01";
    VietQrFieldID["MERCHANT_ACCOUNT_INFO"] = "38";
    VietQrFieldID["MERCHANT_CATEGORY_CODE"] = "52";
    VietQrFieldID["TRANSACTION_CURRENCY"] = "53";
    VietQrFieldID["TRANSACTION_AMOUNT"] = "54";
    VietQrFieldID["TIP_OR_CONVENIENCE_INDICATOR"] = "55";
    VietQrFieldID["CONVENIENCE_FEE_FIXED"] = "56";
    VietQrFieldID["CONVENIENCE_FEE_PERCENTAGE"] = "57";
    VietQrFieldID["COUNTRY_CODE"] = "58";
    VietQrFieldID["MERCHANT_NAME"] = "59";
    VietQrFieldID["MERCHANT_CITY"] = "60";
    VietQrFieldID["POSTAL_CODE"] = "61";
    VietQrFieldID["ADDITIONAL_DATA"] = "62";
    VietQrFieldID["LANGUAGE_TEMPLATE"] = "64";
    VietQrFieldID["CRC_CODE"] = "63";
})(VietQrFieldID = exports.VietQrFieldID || (exports.VietQrFieldID = {}));
var AdditionalDataFieldID;
(function (AdditionalDataFieldID) {
    AdditionalDataFieldID["BILL_NUMBER"] = "01";
    AdditionalDataFieldID["MOBILE_NUMBER"] = "02";
    AdditionalDataFieldID["STORE_LABEL"] = "03";
    AdditionalDataFieldID["LOYALTY_NUMBER"] = "04";
    AdditionalDataFieldID["REFERENCE_LABEL"] = "05";
    AdditionalDataFieldID["CUSTOMER_LABEL"] = "06";
    AdditionalDataFieldID["TERMINAL_LABEL"] = "07";
    AdditionalDataFieldID["PURPOSE_OF_TRANSACTION"] = "08";
    AdditionalDataFieldID["ADDITIONAL_CONSUMER_DATA_REQUEST"] = "09";
})(AdditionalDataFieldID = exports.AdditionalDataFieldID || (exports.AdditionalDataFieldID = {}));
var AdditionalConsumerDataReq;
(function (AdditionalConsumerDataReq) {
    AdditionalConsumerDataReq["CUSTOMER_ADDRESS"] = "A";
    AdditionalConsumerDataReq["CUSTOMER_MOBILE"] = "M";
    AdditionalConsumerDataReq["CUSTOMER_EMAIL"] = "E";
})(AdditionalConsumerDataReq = exports.AdditionalConsumerDataReq || (exports.AdditionalConsumerDataReq = {}));
var LanguageTemplateFieldID;
(function (LanguageTemplateFieldID) {
    LanguageTemplateFieldID["LANGUAGE_PREFERENCE"] = "00";
    LanguageTemplateFieldID["ALTERNATE_MERCHANT_NAME"] = "01";
    LanguageTemplateFieldID["ALTERNATE_MERCHANT_CITY"] = "02";
})(LanguageTemplateFieldID = exports.LanguageTemplateFieldID || (exports.LanguageTemplateFieldID = {}));
var VietQrVersion;
(function (VietQrVersion) {
    VietQrVersion["V1"] = "01";
})(VietQrVersion = exports.VietQrVersion || (exports.VietQrVersion = {}));
var VietQrInitiateMethod;
(function (VietQrInitiateMethod) {
    VietQrInitiateMethod["STATIC"] = "11";
    VietQrInitiateMethod["DYNAMIC"] = "12";
})(VietQrInitiateMethod = exports.VietQrInitiateMethod || (exports.VietQrInitiateMethod = {}));
var MerchantAccInfoFieldID;
(function (MerchantAccInfoFieldID) {
    MerchantAccInfoFieldID["GUID"] = "00";
    MerchantAccInfoFieldID["BENEFICIARY_ORGANIZATION"] = "01";
    MerchantAccInfoFieldID["SERVICE_CODE"] = "02";
})(MerchantAccInfoFieldID = exports.MerchantAccInfoFieldID || (exports.MerchantAccInfoFieldID = {}));
var BeneficaryOrganizationFieldID;
(function (BeneficaryOrganizationFieldID) {
    BeneficaryOrganizationFieldID["ACQUIER_ID"] = "00";
    BeneficaryOrganizationFieldID["MERCHANT_ID"] = "01";
})(BeneficaryOrganizationFieldID = exports.BeneficaryOrganizationFieldID || (exports.BeneficaryOrganizationFieldID = {}));
var ServiceCode;
(function (ServiceCode) {
    ServiceCode["BY_PRODUCT_PAYMENT_SERVICE"] = "QRPUSH";
    ServiceCode["BY_CASH_WITHDRAWL_SERVICE"] = "QRCASH";
    ServiceCode["BY_ACCOUNT_NUMBER"] = "QRIBFTTA";
    ServiceCode["BY_CARD_NUMBER"] = "QRIBFTTC";
})(ServiceCode = exports.ServiceCode || (exports.ServiceCode = {}));
var GUID;
(function (GUID) {
    GUID["NAPAS"] = "A000000727";
})(GUID = exports.GUID || (exports.GUID = {}));
var MerchantCategoryCode;
(function (MerchantCategoryCode) {
    MerchantCategoryCode["COMMERCIAL_FOOTWEAR"] = "5139";
    MerchantCategoryCode["BOOKS_PERIODICAL_NEWSPAPERS"] = "5192";
    MerchantCategoryCode["GLASS_PAINT_WALLPAPER_STORES"] = "5231";
    MerchantCategoryCode["SUPERMARKET_GROCERY_STORES"] = "5411";
    MerchantCategoryCode["MENS_CLOTHING_AND_ACCESSORIES_STORES"] = "5611";
    MerchantCategoryCode["WOMENS_READY_TO_WEAR_STORES"] = "5621";
    MerchantCategoryCode["WOMENS_ACCESSORIES_STORES"] = "5631";
    MerchantCategoryCode["CHILDREN_AND_INFANT_WEAR_STORES"] = "5641";
    MerchantCategoryCode["FAMILY_CLOTHING_STORES"] = "5651";
    MerchantCategoryCode["SHOE_STORES"] = "5661";
    MerchantCategoryCode["MEN_AND_WOMEN_CLOTHING_STORES"] = "5691";
    MerchantCategoryCode["COMPUTER_SOFTWARE_STORES"] = "5734";
    MerchantCategoryCode["EATING_PLACES_AND_RESTAURANTS"] = "5812";
    MerchantCategoryCode["DRINKING_PLACES_WITH_ALCOHOLIC_BEVERAGES"] = "5813";
    MerchantCategoryCode["FAST_FOOD_RESTAURANTS"] = "5814";
    MerchantCategoryCode["DRUG_STORES_AND_PHARMACIES"] = "5912";
    MerchantCategoryCode["PACKAGE_STORES_WITH_BEER_WINE_LIQUOR"] = "5921";
    MerchantCategoryCode["ANTIQUE_SHOPS"] = "5832";
    MerchantCategoryCode["BICYCLE_SHOPS"] = "5940";
    MerchantCategoryCode["SPORTING_GOODS_STORES"] = "5941";
    MerchantCategoryCode["BOOK_STORES"] = "5942";
    MerchantCategoryCode["STATIONERY_OFFICE_AND_SCHOOL_SUPPLY_STORES"] = "5943";
    MerchantCategoryCode["WATCH_JEWELRY_SILVERWEAR_STORES"] = "5944";
    MerchantCategoryCode["HOBBY_TOY_AND_GAME_SHOPS"] = "5945";
    MerchantCategoryCode["CAMERA_AND_PHOTOGRAPHIC_SUPPLY_STORES"] = "5946";
    MerchantCategoryCode["CARD_GIFT_NOVELTY_AND_SOUVERNIR_SHOPS"] = "5947";
    MerchantCategoryCode["COSMETIC_STORES"] = "5977";
    MerchantCategoryCode["FLORISTS"] = "5992";
    MerchantCategoryCode["PET_AND_SUPPLY_STORES"] = "5995";
    MerchantCategoryCode["FINANCIAL_INSTITUTIONS_WITH_CASH_DISBURSEMENTS"] = "6011";
    MerchantCategoryCode["LODGING_HOTEL_AND_RESORT_SERVICE"] = "7011";
    MerchantCategoryCode["LAUNDRY_SERVICE"] = "7211";
    MerchantCategoryCode["DRY_CLEANER"] = "7216";
    MerchantCategoryCode["HEALTH_AND_BEAUTY_SHOPS"] = "7298";
    MerchantCategoryCode["HOSPITALS"] = "8062";
})(MerchantCategoryCode = exports.MerchantCategoryCode || (exports.MerchantCategoryCode = {}));
var TipOrConvenienceIndicatorType;
(function (TipOrConvenienceIndicatorType) {
    TipOrConvenienceIndicatorType["INPUT_TIP"] = "01";
    TipOrConvenienceIndicatorType["FEE_FIXED"] = "02";
    TipOrConvenienceIndicatorType["FEE_PERCENTAGE"] = "03";
})(TipOrConvenienceIndicatorType = exports.TipOrConvenienceIndicatorType || (exports.TipOrConvenienceIndicatorType = {}));
exports.DEFAULT_CURRENCY = country_data_1.currencies.VND.number;
exports.DEFAULT_COUNTRY_CODE = country_data_1.countries.VN.alpha2;
//# sourceMappingURL=vietqr.constants.js.map