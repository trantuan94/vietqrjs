"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VietQRV1Builder = void 0;
const index_1 = require("../constants/index");
const utils_1 = require("../utils");
class VietQRV1Builder {
    constructor() {
        this.initData();
    }
    initData() {
        this.data = {
            version: index_1.VietQrVersion.V1,
            initMethod: index_1.VietQrInitiateMethod.STATIC,
            merchantAccInfo: {
                guid: index_1.GUID.NAPAS,
                beneficiaryOrg: {
                    acquierId: '',
                    merchantId: '',
                },
                serviceCode: index_1.ServiceCode.BY_ACCOUNT_NUMBER,
            },
            merchantCategoryCode: undefined,
            txnCurrency: index_1.DEFAULT_CURRENCY,
            txnAmount: undefined,
            tipConvenienceIndicator: undefined,
            convenienceFeeFixed: undefined,
            convenienceFeePercentage: undefined,
            countryCode: index_1.DEFAULT_COUNTRY_CODE,
            merchantName: undefined,
            merchantCity: undefined,
            postalCode: undefined,
            additionalData: undefined,
            languageTemplate: undefined,
            crcCode: '',
        };
        return this;
    }
    setMerchantAccountInfo(info) {
        var _a, _b;
        const { beneficiaryOrg, guid = ((_a = this.data.merchantAccInfo) === null || _a === void 0 ? void 0 : _a.guid) || index_1.GUID.NAPAS, serviceCode = ((_b = this.data.merchantAccInfo) === null || _b === void 0 ? void 0 : _b.serviceCode) || index_1.ServiceCode.BY_ACCOUNT_NUMBER, } = info;
        this.data.merchantAccInfo = {
            guid,
            beneficiaryOrg,
            serviceCode,
        };
        return this;
    }
    setMerchantName(merchantName) {
        this.data.merchantName = merchantName;
        return this;
    }
    setMerchantCity(merchantCity) {
        this.data.merchantCity = merchantCity;
        return this;
    }
    setPostalCode(postalCode) {
        this.data.postalCode = postalCode;
        return this;
    }
    setTxnAmount(amount) {
        this.data.txnAmount = amount.toString();
        this.data.initMethod = index_1.VietQrInitiateMethod.DYNAMIC;
        return this;
    }
    setTxnDescription(description) {
        this.data.additionalData = Object.assign(Object.assign({}, this.data.additionalData), { purposeOfTxn: description });
        return this;
    }
    setTxnCurrency(currencyCode = index_1.DEFAULT_CURRENCY) {
        this.data.txnCurrency = currencyCode;
        return this;
    }
    setTxnCountry(countryCode = index_1.DEFAULT_COUNTRY_CODE) {
        this.data.countryCode = countryCode;
        return this;
    }
    setAdditionalData(additionalData) {
        this.data.additionalData = Object.assign(Object.assign({}, this.data.additionalData), additionalData);
        return this;
    }
    setLanguageTemplate(languageTemplate) {
        this.data.languageTemplate = languageTemplate;
        return this;
    }
    setmerchantCategoryCode(mcc) {
        this.data.merchantCategoryCode = mcc;
        return this;
    }
    setMerchantCategoryCode(mcc) {
        this.data.merchantCategoryCode = mcc;
        return this;
    }
    refresh() {
        this.initData();
        return this;
    }
    quickBuild(input) {
        const { acquierId, merchantId, serviceCode = index_1.ServiceCode.BY_ACCOUNT_NUMBER, amount, txnDescription, } = input;
        this.setMerchantAccountInfo({
            beneficiaryOrg: {
                acquierId,
                merchantId,
            },
            serviceCode: serviceCode,
        });
        if (amount && amount > 0) {
            this.setTxnAmount(amount);
        }
        if (txnDescription && txnDescription !== '') {
            this.setTxnDescription(txnDescription);
        }
        return this.build();
    }
    build() {
        const dataStr = this.genVersion() +
            this.genInitMethod() +
            this.genMerchantAccInfo() +
            this.genCategoryCodeInfo() +
            this.genCurrencyInfo() +
            this.genAmountInfo() +
            this.genTipOrConvenienceIndicatorInfo() +
            this.genCountryCodeInfo() +
            this.genMerchantNameInfo() +
            this.genMerchantCityInfo() +
            this.genPostalCodeInfo() +
            this.genAdditionalData() +
            this.genLanguageTemplateInfo() +
            index_1.VietQrFieldID.CRC_CODE +
            '04';
        this.qrString = `${dataStr}${(0, utils_1.calcCrcCheckSum)(dataStr)}`;
        return this;
    }
    getQrCodeString() {
        return this.qrString;
    }
    getQrString() {
        return this.qrString;
    }
    async generateQR(options) {
        try {
            return await (0, utils_1.createQRCode)(this.qrString, options);
        }
        catch (err) {
            console.error(err);
        }
    }
    genBasicQrStringItem(fieldID, dt) {
        return dt ? `${fieldID}${(0, utils_1.calcQrItemDataLength)(dt)}${dt}` : '';
    }
    genVersion() {
        return this.genBasicQrStringItem(index_1.VietQrFieldID.VERSION, this.data.version);
    }
    genInitMethod() {
        return this.genBasicQrStringItem(index_1.VietQrFieldID.INITIAL_METHOD, this.data.initMethod);
    }
    genMerchantAccInfo() {
        return this.genBasicQrStringItem(index_1.VietQrFieldID.MERCHANT_ACCOUNT_INFO, this.genGUIDInfo() + this.genBeneficiaryOrg() + this.genServiceCodeInfo());
    }
    genGUIDInfo() {
        return this.genBasicQrStringItem(index_1.MerchantAccInfoFieldID.GUID, this.data.merchantAccInfo.guid);
    }
    genBeneficiaryOrg() {
        return this.genBasicQrStringItem(index_1.MerchantAccInfoFieldID.BENEFICIARY_ORGANIZATION, this.genAcquierInfo() + this.genMerchantIdInfo());
    }
    genAcquierInfo() {
        return this.genBasicQrStringItem(index_1.BeneficaryOrganizationFieldID.ACQUIER_ID, this.data.merchantAccInfo.beneficiaryOrg.acquierId);
    }
    genMerchantIdInfo() {
        return this.genBasicQrStringItem(index_1.BeneficaryOrganizationFieldID.MERCHANT_ID, this.data.merchantAccInfo.beneficiaryOrg.merchantId);
    }
    genServiceCodeInfo() {
        return this.genBasicQrStringItem(index_1.MerchantAccInfoFieldID.SERVICE_CODE, this.data.merchantAccInfo.serviceCode);
    }
    genCategoryCodeInfo() {
        return this.genBasicQrStringItem(index_1.VietQrFieldID.MERCHANT_CATEGORY_CODE, this.data.merchantCategoryCode);
    }
    genCurrencyInfo() {
        return this.genBasicQrStringItem(index_1.VietQrFieldID.TRANSACTION_CURRENCY, this.data.txnCurrency);
    }
    genAmountInfo() {
        return this.genBasicQrStringItem(index_1.VietQrFieldID.TRANSACTION_AMOUNT, this.data.txnAmount);
    }
    genTipOrConvenienceIndicatorInfo() {
        return (this.genBasicQrStringItem(index_1.VietQrFieldID.TIP_OR_CONVENIENCE_INDICATOR, this.data.tipConvenienceIndicator) +
            this.genConvenienceFeeFixed() +
            this.genConvenienceFeePercentage());
    }
    genConvenienceFeeFixed() {
        return this.data.tipConvenienceIndicator === index_1.TipOrConvenienceIndicatorType.FEE_FIXED
            ? this.genBasicQrStringItem(index_1.VietQrFieldID.CONVENIENCE_FEE_FIXED, this.data.convenienceFeeFixed)
            : '';
    }
    genConvenienceFeePercentage() {
        return this.data.tipConvenienceIndicator === index_1.TipOrConvenienceIndicatorType.FEE_PERCENTAGE
            ? this.genBasicQrStringItem(index_1.VietQrFieldID.CONVENIENCE_FEE_PERCENTAGE, this.data.convenienceFeePercentage)
            : '';
    }
    genCountryCodeInfo() {
        return this.genBasicQrStringItem(index_1.VietQrFieldID.COUNTRY_CODE, this.data.countryCode);
    }
    genMerchantNameInfo() {
        return this.genBasicQrStringItem(index_1.VietQrFieldID.MERCHANT_NAME, this.data.merchantName);
    }
    genMerchantCityInfo() {
        return this.genBasicQrStringItem(index_1.VietQrFieldID.MERCHANT_CITY, this.data.merchantCity);
    }
    genPostalCodeInfo() {
        return this.genBasicQrStringItem(index_1.VietQrFieldID.POSTAL_CODE, this.data.postalCode);
    }
    genAdditionalData() {
        return this.data.additionalData
            ? this.genBasicQrStringItem(index_1.VietQrFieldID.ADDITIONAL_DATA, this.genBillNumberInfo() +
                this.genMobileNumberInfo() +
                this.genStoreLabelInfo() +
                this.genLoyaltyNumberInfo() +
                this.genreferenceLabelInfo() +
                this.genCustomerLabelInfo() +
                this.genTerminalLabelInfo() +
                this.genPurposeOfTxnInfo() +
                this.genAdditionalConsumerDataReq())
            : '';
    }
    genBillNumberInfo() {
        var _a, _b;
        return this.genBasicQrStringItem(index_1.AdditionalDataFieldID.BILL_NUMBER, ((_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.additionalData) === null || _b === void 0 ? void 0 : _b.billNumber) || null);
    }
    genMobileNumberInfo() {
        var _a, _b;
        return this.genBasicQrStringItem(index_1.AdditionalDataFieldID.MOBILE_NUMBER, ((_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.additionalData) === null || _b === void 0 ? void 0 : _b.mobileNumber) || null);
    }
    genStoreLabelInfo() {
        var _a, _b;
        return this.genBasicQrStringItem(index_1.AdditionalDataFieldID.STORE_LABEL, ((_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.additionalData) === null || _b === void 0 ? void 0 : _b.storeLabel) || null);
    }
    genLoyaltyNumberInfo() {
        var _a, _b;
        return this.genBasicQrStringItem(index_1.AdditionalDataFieldID.LOYALTY_NUMBER, ((_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.additionalData) === null || _b === void 0 ? void 0 : _b.loyaltyNumber) || null);
    }
    genreferenceLabelInfo() {
        var _a, _b;
        return this.genBasicQrStringItem(index_1.AdditionalDataFieldID.REFERENCE_LABEL, ((_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.additionalData) === null || _b === void 0 ? void 0 : _b.referenceLabel) || null);
    }
    genCustomerLabelInfo() {
        var _a, _b;
        return this.genBasicQrStringItem(index_1.AdditionalDataFieldID.CUSTOMER_LABEL, ((_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.additionalData) === null || _b === void 0 ? void 0 : _b.customerLabel) || null);
    }
    genTerminalLabelInfo() {
        var _a, _b;
        return this.genBasicQrStringItem(index_1.AdditionalDataFieldID.TERMINAL_LABEL, ((_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.additionalData) === null || _b === void 0 ? void 0 : _b.terminalLabel) || null);
    }
    genPurposeOfTxnInfo() {
        var _a, _b;
        return this.genBasicQrStringItem(index_1.AdditionalDataFieldID.PURPOSE_OF_TRANSACTION, ((_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.additionalData) === null || _b === void 0 ? void 0 : _b.purposeOfTxn) || null);
    }
    genAdditionalConsumerDataReq() {
        var _a, _b;
        return this.genBasicQrStringItem(index_1.AdditionalDataFieldID.ADDITIONAL_CONSUMER_DATA_REQUEST, ((_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.additionalData) === null || _b === void 0 ? void 0 : _b.additionalConsumerDataReq) || null);
    }
    genLanguageTemplateInfo() {
        return this.data.languageTemplate
            ? this.genBasicQrStringItem(index_1.VietQrFieldID.LANGUAGE_TEMPLATE, this.genLanguagePreferenceInfo() +
                this.genLanguageMerchantNameInfo() +
                this.genLanguageMerchantCityInfo())
            : '';
    }
    genLanguagePreferenceInfo() {
        var _a, _b;
        return this.genBasicQrStringItem(index_1.LanguageTemplateFieldID.LANGUAGE_PREFERENCE, ((_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.languageTemplate) === null || _b === void 0 ? void 0 : _b.preference) || null);
    }
    genLanguageMerchantNameInfo() {
        var _a, _b;
        return this.genBasicQrStringItem(index_1.LanguageTemplateFieldID.ALTERNATE_MERCHANT_NAME, ((_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.languageTemplate) === null || _b === void 0 ? void 0 : _b.merchantName) || null);
    }
    genLanguageMerchantCityInfo() {
        var _a, _b;
        return this.genBasicQrStringItem(index_1.LanguageTemplateFieldID.ALTERNATE_MERCHANT_CITY, ((_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.languageTemplate) === null || _b === void 0 ? void 0 : _b.merchantCity) || null);
    }
}
exports.VietQRV1Builder = VietQRV1Builder;
//# sourceMappingURL=vietqrv1.builder.js.map