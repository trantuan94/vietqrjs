"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VietQrV1Decryptor = void 0;
const constants_1 = require("../constants");
const utils_1 = require("../utils");
class VietQrV1Decryptor {
    readQrItem({ fieldId, fieldName, rawValue, required = false, }) {
        const isStartWithId = rawValue.startsWith(fieldId);
        if (!isStartWithId && required) {
            throw new Error(`Field ${fieldName} in QR string must be start with ${fieldId}.`);
        }
        if (!isStartWithId) {
            return {
                fieldId,
                nextRawValue: rawValue,
            };
        }
        const length = Number(rawValue.substring(2, 4));
        if (Number.isNaN(length) || length <= 0) {
            throw new Error(`Length of ${fieldName} in QR string is invalid.`);
        }
        const value = rawValue.substring(4, 4 + length);
        return {
            fieldId,
            fieldName,
            value,
            length,
            nextRawValue: rawValue.substring(4 + length),
        };
    }
    validateQrItem(value, length, fieldName, options) {
        const { required = true, maxLength, fixedLength, customValidate } = options;
        if (!value && required) {
            throw new Error(`Field ${fieldName} in QR string is required.`);
        }
        if (value && value.length !== length) {
            throw new Error(`Length of ${fieldName} is not equal to defined length in QR string.`);
        }
        if (maxLength && maxLength < length) {
            throw new Error(`Length of ${fieldName} in QR string must be less than or equal to ${maxLength}.`);
        }
        if (fixedLength && fixedLength !== length) {
            throw new Error(`Length of ${fieldName} in QR string must be equal to ${fixedLength}.`);
        }
        if (customValidate && !customValidate(value)) {
            throw new Error(`Value of ${fieldName} is invalid`);
        }
    }
    decryptQrItem(rawValue, fieldId, fieldName, options) {
        const { required = true } = options;
        const { value, length, nextRawValue, } = this.readQrItem({
            fieldId,
            fieldName,
            rawValue,
            required,
        });
        if (nextRawValue === rawValue) {
            return {
                fieldId,
                nextRawValue,
            };
        }
        this.validateQrItem(value, length, fieldName, options);
        return {
            fieldId,
            fieldName,
            length,
            value,
            nextRawValue,
        };
    }
    isValidChecksum(qrString) {
        if (!/6304[0-9A-Fa-f]{4}$/gm.test(qrString)) {
            return false;
        }
        return (0, utils_1.isValidChecksum)(qrString);
    }
    decrypt(qrString) {
        if (!(0, utils_1.isValidChecksum)(qrString)) {
            throw new Error('QR string has invalid Cyclic Redundency checksum.');
        }
        const version = this.decryptQrItem(qrString.substring(0, 6), constants_1.VietQrFieldID.VERSION, constants_1.VietQRFieldName.VERSION, {
            fixedLength: 2,
            customValidate: utils_1.isNumeric,
        });
        let nextRawStr = qrString.substring(6, qrString.length);
        let initialMethod;
        let merchantAccountInfo;
        let mcc;
        let currencyCode;
        let transactionAmount;
        let tipOrConvenienceIndicator;
        let convenienceFeeFixed;
        let convenienceFeePercentage;
        let countryCode;
        let merchantName;
        let merchantCity;
        let postalCode;
        let additionalData;
        let languageTemplate;
        let crcChecksum;
        while (nextRawStr && nextRawStr !== '') {
            const fieldId = nextRawStr.substring(0, 2);
            if (!fieldId || fieldId.length < 2)
                break;
            switch (fieldId) {
                case constants_1.VietQrFieldID.INITIAL_METHOD:
                    initialMethod = this.decryptQrItem(nextRawStr, constants_1.VietQrFieldID.INITIAL_METHOD, constants_1.VietQRFieldName.INITIAL_METHOD, {
                        fixedLength: 2,
                        customValidate: utils_1.isNumeric,
                    });
                    nextRawStr = initialMethod.nextRawValue;
                    break;
                case constants_1.VietQrFieldID.MERCHANT_ACCOUNT_INFO:
                    merchantAccountInfo = this.decryptQrItem(nextRawStr, constants_1.VietQrFieldID.MERCHANT_ACCOUNT_INFO, constants_1.VietQRFieldName.MERCHANT_ACCOUNT_INFO, {
                        maxLength: 99,
                    });
                    nextRawStr = merchantAccountInfo.nextRawValue;
                    break;
                case constants_1.VietQrFieldID.MERCHANT_CATEGORY_CODE:
                    mcc = this.decryptQrItem(nextRawStr, constants_1.VietQrFieldID.MERCHANT_CATEGORY_CODE, constants_1.VietQRFieldName.MERCHANT_CATEGORY_CODE, {
                        fixedLength: 4,
                        required: false,
                        customValidate: utils_1.isNumeric,
                    });
                    nextRawStr = mcc.nextRawValue;
                    break;
                case constants_1.VietQrFieldID.TRANSACTION_CURRENCY:
                    currencyCode = this.decryptQrItem(nextRawStr, constants_1.VietQrFieldID.TRANSACTION_CURRENCY, constants_1.VietQRFieldName.TRANSACTION_CURRENCY, {
                        fixedLength: 3,
                        customValidate: utils_1.isNumeric,
                    });
                    nextRawStr = currencyCode.nextRawValue;
                    break;
                case constants_1.VietQrFieldID.TRANSACTION_AMOUNT:
                    transactionAmount = this.decryptQrItem(nextRawStr, constants_1.VietQrFieldID.TRANSACTION_AMOUNT, constants_1.VietQRFieldName.TRANSACTION_AMOUNT, {
                        maxLength: 13,
                        customValidate: utils_1.isFloatingPointAmount,
                    });
                    nextRawStr = transactionAmount.nextRawValue;
                    break;
                case constants_1.VietQrFieldID.TIP_OR_CONVENIENCE_INDICATOR:
                    tipOrConvenienceIndicator = this.decryptQrItem(nextRawStr, constants_1.VietQrFieldID.TIP_OR_CONVENIENCE_INDICATOR, constants_1.VietQRFieldName.TIP_OR_CONVENIENCE_INDICATOR, {
                        fixedLength: 2,
                        required: false,
                        customValidate: utils_1.isTipOrConvenienceIndicator,
                    });
                    nextRawStr = tipOrConvenienceIndicator.nextRawValue;
                    break;
                case constants_1.VietQrFieldID.CONVENIENCE_FEE_FIXED:
                    convenienceFeeFixed = this.decryptQrItem(nextRawStr, constants_1.VietQrFieldID.CONVENIENCE_FEE_FIXED, constants_1.VietQRFieldName.CONVENIENCE_FEE_FIXED, {
                        maxLength: 13,
                        required: false,
                        customValidate: utils_1.isFloatingPointAmount,
                    });
                    nextRawStr = convenienceFeeFixed.nextRawValue;
                    break;
                case constants_1.VietQrFieldID.CONVENIENCE_FEE_PERCENTAGE:
                    convenienceFeePercentage = this.decryptQrItem(nextRawStr, constants_1.VietQrFieldID.CONVENIENCE_FEE_PERCENTAGE, constants_1.VietQRFieldName.CONVENIENCE_FEE_PERCENTAGE, {
                        maxLength: 5,
                        required: false,
                    });
                    nextRawStr = convenienceFeePercentage.nextRawValue;
                    break;
                case constants_1.VietQrFieldID.COUNTRY_CODE:
                    countryCode = this.decryptQrItem(nextRawStr, constants_1.VietQrFieldID.COUNTRY_CODE, constants_1.VietQRFieldName.COUNTRY_CODE, {
                        fixedLength: 2,
                    });
                    nextRawStr = countryCode.nextRawValue;
                    break;
                case constants_1.VietQrFieldID.MERCHANT_NAME:
                    merchantName = this.decryptQrItem(nextRawStr, constants_1.VietQrFieldID.MERCHANT_NAME, constants_1.VietQRFieldName.MERCHANT_NAME, {
                        maxLength: 30,
                        customValidate: utils_1.isANS,
                    });
                    nextRawStr = merchantName.nextRawValue;
                    break;
                case constants_1.VietQrFieldID.MERCHANT_CITY:
                    merchantCity = this.decryptQrItem(nextRawStr, constants_1.VietQrFieldID.MERCHANT_CITY, constants_1.VietQRFieldName.MERCHANT_CITY, {
                        maxLength: 15,
                        customValidate: utils_1.isANS,
                    });
                    nextRawStr = merchantCity.nextRawValue;
                    break;
                case constants_1.VietQrFieldID.POSTAL_CODE:
                    postalCode = this.decryptQrItem(nextRawStr, constants_1.VietQrFieldID.POSTAL_CODE, constants_1.VietQRFieldName.POSTAL_CODE, {
                        maxLength: 15,
                        customValidate: utils_1.isANS,
                    });
                    nextRawStr = postalCode.nextRawValue;
                    break;
                case constants_1.VietQrFieldID.LANGUAGE_TEMPLATE:
                    languageTemplate = this.decryptQrItem(nextRawStr, constants_1.VietQrFieldID.LANGUAGE_TEMPLATE, constants_1.VietQRFieldName.LANGUAGE_TEMPLATE, {
                        maxLength: 99,
                        customValidate: utils_1.isANS,
                    });
                    nextRawStr = languageTemplate.nextRawValue;
                    break;
                case constants_1.VietQrFieldID.ADDITIONAL_DATA:
                    additionalData = this.decryptQrItem(nextRawStr, constants_1.VietQrFieldID.ADDITIONAL_DATA, constants_1.VietQRFieldName.ADDITIONAL_DATA, {
                        maxLength: 99,
                        customValidate: utils_1.isANS,
                    });
                    nextRawStr = additionalData.nextRawValue;
                    break;
                case constants_1.VietQrFieldID.CRC_CODE:
                    crcChecksum = this.decryptQrItem(nextRawStr, constants_1.VietQrFieldID.CRC_CODE, constants_1.VietQRFieldName.CRC_CODE, {
                        fixedLength: 4,
                    });
                    nextRawStr = crcChecksum.nextRawValue;
                    break;
                default:
                    nextRawStr = this.ignoreUnknownQrItem(nextRawStr, '');
                    break;
            }
        }
        if (!(initialMethod === null || initialMethod === void 0 ? void 0 : initialMethod.value)) {
            throw new Error(`Field ${constants_1.VietQRFieldName.INITIAL_METHOD} in QR is required.`);
        }
        if (!(merchantAccountInfo === null || merchantAccountInfo === void 0 ? void 0 : merchantAccountInfo.value)) {
            throw new Error(`Field ${constants_1.VietQRFieldName.MERCHANT_ACCOUNT_INFO} in QR is required.`);
        }
        if (!(currencyCode === null || currencyCode === void 0 ? void 0 : currencyCode.value)) {
            throw new Error(`Field ${constants_1.VietQRFieldName.TRANSACTION_CURRENCY} in QR is required.`);
        }
        if (!(countryCode === null || countryCode === void 0 ? void 0 : countryCode.value)) {
            throw new Error(`Field ${constants_1.VietQRFieldName.COUNTRY_CODE} in QR is required.`);
        }
        if ((tipOrConvenienceIndicator === null || tipOrConvenienceIndicator === void 0 ? void 0 : tipOrConvenienceIndicator.value) === constants_1.TipOrConvenienceIndicatorType.FEE_PERCENTAGE &&
            !(convenienceFeePercentage === null || convenienceFeePercentage === void 0 ? void 0 : convenienceFeePercentage.value)) {
            throw new Error(`${constants_1.VietQRFieldName.CONVENIENCE_FEE_PERCENTAGE} in QR is required.`);
        }
        if ((tipOrConvenienceIndicator === null || tipOrConvenienceIndicator === void 0 ? void 0 : tipOrConvenienceIndicator.value) === constants_1.TipOrConvenienceIndicatorType.FEE_FIXED &&
            !(convenienceFeeFixed === null || convenienceFeeFixed === void 0 ? void 0 : convenienceFeeFixed.value)) {
            throw new Error(`${constants_1.VietQRFieldName.CONVENIENCE_FEE_FIXED} in QR is required.`);
        }
        const decryptedMerchantAccInfo = this.decryptMerchantAccInfo(merchantAccountInfo.value);
        const decryptedLanguageTemplate = (languageTemplate === null || languageTemplate === void 0 ? void 0 : languageTemplate.value)
            ? this.decryptLanguageTemplate(languageTemplate === null || languageTemplate === void 0 ? void 0 : languageTemplate.value)
            : undefined;
        const decryptedAdditionalData = (additionalData === null || additionalData === void 0 ? void 0 : additionalData.value)
            ? this.decryptAdditionalData(additionalData.value)
            : undefined;
        return {
            version: version === null || version === void 0 ? void 0 : version.value,
            initMethod: initialMethod === null || initialMethod === void 0 ? void 0 : initialMethod.value,
            merchantAccInfo: decryptedMerchantAccInfo,
            merchantCategoryCode: mcc === null || mcc === void 0 ? void 0 : mcc.value,
            txnCurrency: Number(currencyCode === null || currencyCode === void 0 ? void 0 : currencyCode.value),
            txnAmount: transactionAmount === null || transactionAmount === void 0 ? void 0 : transactionAmount.value,
            tipConvenienceIndicator: tipOrConvenienceIndicator === null || tipOrConvenienceIndicator === void 0 ? void 0 : tipOrConvenienceIndicator.value,
            convenienceFeeFixed: convenienceFeeFixed === null || convenienceFeeFixed === void 0 ? void 0 : convenienceFeeFixed.value,
            convenienceFeePercentage: convenienceFeePercentage === null || convenienceFeePercentage === void 0 ? void 0 : convenienceFeePercentage.value,
            countryCode: countryCode === null || countryCode === void 0 ? void 0 : countryCode.value,
            merchantName: merchantName === null || merchantName === void 0 ? void 0 : merchantName.value,
            merchantCity: merchantCity === null || merchantCity === void 0 ? void 0 : merchantCity.value,
            postalCode: postalCode === null || postalCode === void 0 ? void 0 : postalCode.value,
            additionalData: decryptedAdditionalData,
            languageTemplate: decryptedLanguageTemplate,
            crcCode: crcChecksum === null || crcChecksum === void 0 ? void 0 : crcChecksum.value,
        };
    }
    decryptMerchantAccInfo(rawStr) {
        let nextRawStr = rawStr;
        let decryptedGUID;
        let beneficiaryOrg;
        let decryptedServiceCode;
        while (nextRawStr && nextRawStr !== '') {
            const fieldId = nextRawStr.substring(0, 2);
            if (!fieldId || fieldId.length < 2) {
                break;
            }
            switch (fieldId) {
                case constants_1.MerchantAccInfoFieldID.GUID:
                    decryptedGUID = this.decryptQrItem(nextRawStr, constants_1.MerchantAccInfoFieldID.GUID, constants_1.MerchantAccInfoFieldName.GUID, {
                        maxLength: 32,
                        customValidate: utils_1.isANS,
                    });
                    nextRawStr = decryptedGUID.nextRawValue;
                    break;
                case constants_1.MerchantAccInfoFieldID.BENEFICIARY_ORGANIZATION:
                    beneficiaryOrg = this.decryptQrItem(nextRawStr, constants_1.MerchantAccInfoFieldID.BENEFICIARY_ORGANIZATION, constants_1.MerchantAccInfoFieldName.BENEFICIARY_ORGANIZATION, {
                        maxLength: 99,
                        customValidate: utils_1.isANS,
                    });
                    nextRawStr = beneficiaryOrg.nextRawValue;
                    break;
                case constants_1.MerchantAccInfoFieldID.SERVICE_CODE:
                    decryptedServiceCode = this.decryptQrItem(nextRawStr, constants_1.MerchantAccInfoFieldID.SERVICE_CODE, constants_1.MerchantAccInfoFieldName.SERVICE_CODE, {
                        maxLength: 10,
                        customValidate: utils_1.isServiceCode,
                    });
                    nextRawStr = decryptedServiceCode.nextRawValue;
                    break;
                default:
                    nextRawStr = this.ignoreUnknownQrItem(nextRawStr, 'Merchant Account Information');
                    break;
            }
        }
        if (!(decryptedGUID === null || decryptedGUID === void 0 ? void 0 : decryptedGUID.value)) {
            throw new Error(`${constants_1.MerchantAccInfoFieldName.GUID} in Merchant Account Information is required.`);
        }
        if (!(beneficiaryOrg === null || beneficiaryOrg === void 0 ? void 0 : beneficiaryOrg.value)) {
            throw new Error(`${constants_1.MerchantAccInfoFieldName.BENEFICIARY_ORGANIZATION} in Merchant Account Information is required.`);
        }
        const decryptedBeneficiaryOrg = this.decryptBeneficiaryOrg(beneficiaryOrg === null || beneficiaryOrg === void 0 ? void 0 : beneficiaryOrg.value);
        return {
            guid: decryptedGUID === null || decryptedGUID === void 0 ? void 0 : decryptedGUID.value,
            beneficiaryOrg: decryptedBeneficiaryOrg,
            serviceCode: decryptedServiceCode === null || decryptedServiceCode === void 0 ? void 0 : decryptedServiceCode.value,
        };
    }
    decryptBeneficiaryOrg(rawStr) {
        let nextRawStr = rawStr;
        let acquirerId;
        let merchantId;
        while (nextRawStr) {
            const fieldId = nextRawStr.substring(0, 2);
            if (!fieldId || fieldId.length < 2) {
                break;
            }
            switch (fieldId) {
                case constants_1.BeneficaryOrganizationFieldID.ACQUIER_ID:
                    acquirerId = this.decryptQrItem(nextRawStr, constants_1.BeneficaryOrganizationFieldID.ACQUIER_ID, constants_1.BeneficaryOrganizationFieldName.ACQUIER_ID, {
                        fixedLength: 6,
                    });
                    nextRawStr = acquirerId.nextRawValue;
                    break;
                case constants_1.BeneficaryOrganizationFieldID.MERCHANT_ID:
                    merchantId = this.decryptQrItem(nextRawStr, constants_1.BeneficaryOrganizationFieldID.MERCHANT_ID, constants_1.BeneficaryOrganizationFieldName.MERCHANT_ID, {
                        maxLength: 19,
                    });
                    nextRawStr = merchantId.nextRawValue;
                    break;
                default:
                    nextRawStr = this.ignoreUnknownQrItem(nextRawStr, 'Benificiary Organization');
                    break;
            }
        }
        if (!(acquirerId === null || acquirerId === void 0 ? void 0 : acquirerId.value)) {
            throw new Error(`Field ${constants_1.BeneficaryOrganizationFieldName.ACQUIER_ID} in Benificiary Organization is required.`);
        }
        if (!(merchantId === null || merchantId === void 0 ? void 0 : merchantId.value)) {
            throw new Error(`Field ${constants_1.BeneficaryOrganizationFieldName.MERCHANT_ID} in Benificiary Organization is required.`);
        }
        return {
            acquierId: acquirerId.value,
            merchantId: merchantId.value,
        };
    }
    decryptLanguageTemplate(rawStr) {
        let nextRawStr = rawStr;
        let decryptedPreference;
        let decryptedMerchantName;
        let decryptedMerchantCity;
        while (nextRawStr && nextRawStr !== '') {
            const fieldId = nextRawStr.substring(0, 2);
            if (!fieldId || fieldId.length < 2) {
                break;
            }
            switch (fieldId) {
                case constants_1.LanguageTemplateFieldID.LANGUAGE_PREFERENCE:
                    decryptedPreference = this.decryptQrItem(nextRawStr, constants_1.LanguageTemplateFieldID.LANGUAGE_PREFERENCE, constants_1.LanguageTemplateFieldName.LANGUAGE_PREFERENCE, {
                        fixedLength: 2,
                        customValidate: utils_1.isANS,
                    });
                    nextRawStr = decryptedPreference.nextRawValue;
                    break;
                case constants_1.LanguageTemplateFieldID.ALTERNATE_MERCHANT_NAME:
                    decryptedMerchantName = this.decryptQrItem(nextRawStr, constants_1.LanguageTemplateFieldID.ALTERNATE_MERCHANT_NAME, constants_1.LanguageTemplateFieldName.ALTERNATE_MERCHANT_CITY, {
                        maxLength: 30,
                        customValidate: utils_1.isANS,
                    });
                    nextRawStr = decryptedMerchantName.nextRawValue;
                    break;
                case constants_1.LanguageTemplateFieldID.ALTERNATE_MERCHANT_CITY:
                    decryptedMerchantCity = this.decryptQrItem(nextRawStr, constants_1.LanguageTemplateFieldID.ALTERNATE_MERCHANT_CITY, constants_1.LanguageTemplateFieldName.ALTERNATE_MERCHANT_CITY, {
                        maxLength: 15,
                        required: false,
                    });
                    nextRawStr = decryptedMerchantCity.nextRawValue;
                    break;
                default:
                    nextRawStr = this.ignoreUnknownQrItem(nextRawStr, 'Merchant Information Language Template');
                    break;
            }
        }
        if (!(decryptedPreference === null || decryptedPreference === void 0 ? void 0 : decryptedPreference.value)) {
            throw new Error(`${constants_1.LanguageTemplateFieldName.LANGUAGE_PREFERENCE} in Language Template is required.`);
        }
        if (!(decryptedMerchantName === null || decryptedMerchantName === void 0 ? void 0 : decryptedMerchantName.value)) {
            throw new Error(`${constants_1.LanguageTemplateFieldName.ALTERNATE_MERCHANT_NAME} in Language Template is required.`);
        }
        return {
            preference: decryptedPreference.value,
            merchantName: decryptedMerchantName.value,
            merchantCity: decryptedMerchantCity === null || decryptedMerchantCity === void 0 ? void 0 : decryptedMerchantCity.value,
        };
    }
    decryptAdditionalData(rawStr) {
        let nextRawStr = rawStr;
        let billNumber;
        let mobileNumber;
        let storeLabel;
        let referenceLabel;
        let loyaltyNumber;
        let customerLabel;
        let terminalLabel;
        let purposeOfTxn;
        let additionalConsumerDataReq;
        while (nextRawStr && nextRawStr !== '') {
            const fieldId = nextRawStr.substring(0, 2);
            if (!fieldId || fieldId.length < 2) {
                break;
            }
            switch (fieldId) {
                case constants_1.AdditionalDataFieldID.BILL_NUMBER:
                    billNumber = this.decryptQrItem(nextRawStr, constants_1.AdditionalDataFieldID.BILL_NUMBER, constants_1.AdditionalDataFieldName.BILL_NUMBER, {
                        maxLength: 25,
                        required: false,
                        customValidate: utils_1.isANS,
                    });
                    nextRawStr = billNumber.nextRawValue;
                    break;
                case constants_1.AdditionalDataFieldID.MOBILE_NUMBER:
                    mobileNumber = this.decryptQrItem(nextRawStr, constants_1.AdditionalDataFieldID.MOBILE_NUMBER, constants_1.AdditionalDataFieldName.MOBILE_NUMBER, {
                        required: false,
                        maxLength: 25,
                        customValidate: utils_1.isANS,
                    });
                    nextRawStr = mobileNumber.nextRawValue;
                    break;
                case constants_1.AdditionalDataFieldID.STORE_LABEL:
                    storeLabel = this.decryptQrItem(nextRawStr, constants_1.AdditionalDataFieldID.STORE_LABEL, constants_1.AdditionalDataFieldName.STORE_LABEL, {
                        required: false,
                        maxLength: 25,
                        customValidate: utils_1.isANS,
                    });
                    nextRawStr = storeLabel.nextRawValue;
                    break;
                case constants_1.AdditionalDataFieldID.LOYALTY_NUMBER:
                    loyaltyNumber = this.decryptQrItem(nextRawStr, constants_1.AdditionalDataFieldID.LOYALTY_NUMBER, constants_1.AdditionalDataFieldName.LOYALTY_NUMBER, {
                        required: false,
                        maxLength: 25,
                        customValidate: utils_1.isANS,
                    });
                    nextRawStr = loyaltyNumber.nextRawValue;
                    break;
                case constants_1.AdditionalDataFieldID.REFERENCE_LABEL:
                    referenceLabel = this.decryptQrItem(nextRawStr, constants_1.AdditionalDataFieldID.REFERENCE_LABEL, constants_1.AdditionalDataFieldName.REFERENCE_LABEL, {
                        required: false,
                        maxLength: 25,
                        customValidate: utils_1.isANS,
                    });
                    nextRawStr = referenceLabel.nextRawValue;
                    break;
                case constants_1.AdditionalDataFieldID.CUSTOMER_LABEL:
                    customerLabel = this.decryptQrItem(nextRawStr, constants_1.AdditionalDataFieldID.CUSTOMER_LABEL, constants_1.AdditionalDataFieldName.CUSTOMER_LABEL, {
                        required: false,
                        maxLength: 25,
                        customValidate: utils_1.isANS,
                    });
                    nextRawStr = customerLabel.nextRawValue;
                    break;
                case constants_1.AdditionalDataFieldID.TERMINAL_LABEL:
                    terminalLabel = this.decryptQrItem(nextRawStr, constants_1.AdditionalDataFieldID.TERMINAL_LABEL, constants_1.AdditionalDataFieldName.TERMINAL_LABEL, {
                        required: false,
                        maxLength: 25,
                        customValidate: utils_1.isANS,
                    });
                    nextRawStr = terminalLabel.nextRawValue;
                    break;
                case constants_1.AdditionalDataFieldID.PURPOSE_OF_TRANSACTION:
                    purposeOfTxn = this.decryptQrItem(nextRawStr, constants_1.AdditionalDataFieldID.PURPOSE_OF_TRANSACTION, constants_1.AdditionalDataFieldName.PURPOSE_OF_TRANSACTION, {
                        required: false,
                        maxLength: 25,
                        customValidate: utils_1.isANS,
                    });
                    nextRawStr = purposeOfTxn.nextRawValue;
                    break;
                case constants_1.AdditionalDataFieldID.ADDITIONAL_CONSUMER_DATA_REQUEST:
                    additionalConsumerDataReq = this.decryptQrItem(nextRawStr, constants_1.AdditionalDataFieldID.ADDITIONAL_CONSUMER_DATA_REQUEST, constants_1.AdditionalDataFieldName.ADDITIONAL_CONSUMER_DATA_REQUEST, {
                        required: false,
                        maxLength: 25,
                        customValidate: utils_1.isANS,
                    });
                    nextRawStr = additionalConsumerDataReq.nextRawValue;
                    break;
                default:
                    nextRawStr = this.ignoreUnknownQrItem(nextRawStr, 'Additional Data');
                    break;
            }
        }
        return {
            billNumber: billNumber === null || billNumber === void 0 ? void 0 : billNumber.value,
            mobileNumber: mobileNumber === null || mobileNumber === void 0 ? void 0 : mobileNumber.value,
            storeLabel: storeLabel === null || storeLabel === void 0 ? void 0 : storeLabel.value,
            loyaltyNumber: loyaltyNumber === null || loyaltyNumber === void 0 ? void 0 : loyaltyNumber.value,
            referenceLabel: referenceLabel === null || referenceLabel === void 0 ? void 0 : referenceLabel.value,
            customerLabel: customerLabel === null || customerLabel === void 0 ? void 0 : customerLabel.value,
            terminalLabel: terminalLabel === null || terminalLabel === void 0 ? void 0 : terminalLabel.value,
            purposeOfTxn: purposeOfTxn === null || purposeOfTxn === void 0 ? void 0 : purposeOfTxn.value,
            additionalConsumerDataReq: additionalConsumerDataReq === null || additionalConsumerDataReq === void 0 ? void 0 : additionalConsumerDataReq.value,
        };
    }
    ignoreUnknownQrItem(rawValue, nestedFieldName) {
        const fieldId = rawValue.substring(0, 2);
        const length = Number(rawValue.substring(2, 4));
        if (Number.isNaN(length) || length <= 0) {
            throw new Error(`Length of unknown field ID ${fieldId}${nestedFieldName ? ' in ' + nestedFieldName + ' field' : ''} of QR is invalid.`);
        }
        const nextRawValue = rawValue.substring(4 + length);
        return nextRawValue;
    }
}
exports.VietQrV1Decryptor = VietQrV1Decryptor;
//# sourceMappingURL=vietqrv1.decryptor.js.map