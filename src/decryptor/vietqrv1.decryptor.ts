import {
  AdditionalDataFieldID,
  AdditionalDataFieldName,
  BeneficaryOrganizationFieldID,
  BeneficaryOrganizationFieldName,
  IAdditionalData,
  IBeneficiaryOrganiation,
  ILanguageTemplate,
  IMerchantAccountInfo,
  IVietQrDataV1,
  LanguageTemplateFieldID,
  LanguageTemplateFieldName,
  MerchantAccInfoFieldID,
  MerchantAccInfoFieldName,
  MerchantCategoryCode,
  ServiceCode,
  TipOrConvenienceIndicatorType,
  VietQRFieldName,
  VietQrFieldID,
  VietQrInitiateMethod,
  VietQrVersion,
} from '../constants';
import { IDecryptedQrItem, IDecryptorElement, IDecryptorOptions } from './decryptor.interfaces';
import {
  isANS,
  isFloatingPointAmount,
  isNumeric,
  isServiceCode,
  isTipOrConvenienceIndicator,
  isValidChecksum,
} from '../utils';

export class VietQrV1Decryptor {
  readQrItem({
    fieldId,
    fieldName,
    rawValue,
    required = false,
  }: IDecryptorElement): IDecryptedQrItem {
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

  public validateQrItem(
    value: string,
    length: number,
    fieldName: string,
    options: IDecryptorOptions,
  ) {
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

  decryptQrItem(
    rawValue: string,
    fieldId: string,
    fieldName: string,
    options: IDecryptorOptions,
  ): IDecryptedQrItem {
    const { required = true } = options;
    const {
      value,
      length,
      nextRawValue,
    } = this.readQrItem({
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
    this.validateQrItem(
      value as string,
      length as number,
      fieldName,
      options,
    );
  
    return {
      fieldId,
      fieldName,
      length,
      value,
      nextRawValue,
    };
  }

  isValidChecksum(qrString: string): boolean {
    return isValidChecksum(qrString);
  }

  decrypt(qrString: string): IVietQrDataV1 {
    // validate checksum first
    if (!isValidChecksum(qrString)) {
      throw new Error('QR string has invalid Cyclic Redundency checksum.');
    }
    const version = this.decryptQrItem(
      qrString.substring(0, 6),
      VietQrFieldID.VERSION,
      VietQRFieldName.VERSION,
      {
        fixedLength: 2,
        customValidate: isNumeric,
      },
    );
    let nextRawStr = qrString.substring(6, qrString.length);
    let initialMethod: IDecryptedQrItem | undefined;
    let merchantAccountInfo: IDecryptedQrItem | undefined;
    let mcc: IDecryptedQrItem | undefined;
    let currencyCode: IDecryptedQrItem | undefined;
    let transactionAmount: IDecryptedQrItem | undefined;
    let tipOrConvenienceIndicator: IDecryptedQrItem | undefined;
    let convenienceFeeFixed: IDecryptedQrItem | undefined;
    let convenienceFeePercentage: IDecryptedQrItem | undefined;
    let countryCode: IDecryptedQrItem | undefined;
    let merchantName: IDecryptedQrItem | undefined;
    let merchantCity: IDecryptedQrItem | undefined;
    let postalCode: IDecryptedQrItem | undefined;
    let additionalData: IDecryptedQrItem | undefined;
    let languageTemplate: IDecryptedQrItem | undefined;
    let crcChecksum: IDecryptedQrItem;

    while (nextRawStr && nextRawStr !== '') {
      const fieldId = nextRawStr.substring(0, 2);
      if (!fieldId || fieldId.length < 2) break;
      switch (fieldId) {
        case VietQrFieldID.INITIAL_METHOD:
          initialMethod = this.decryptQrItem(
            nextRawStr,
            VietQrFieldID.INITIAL_METHOD,
            VietQRFieldName.INITIAL_METHOD,
            {
              fixedLength: 2,
              customValidate: isNumeric,
            },
          );
          nextRawStr = initialMethod.nextRawValue;
          break;
        case VietQrFieldID.MERCHANT_ACCOUNT_INFO:
          merchantAccountInfo = this.decryptQrItem(
            nextRawStr,
            VietQrFieldID.MERCHANT_ACCOUNT_INFO,
            VietQRFieldName.MERCHANT_ACCOUNT_INFO,
            {
              maxLength: 99,
            }
          );
          nextRawStr = merchantAccountInfo.nextRawValue;
          break;
        case VietQrFieldID.MERCHANT_CATEGORY_CODE:
          mcc = this.decryptQrItem(
            nextRawStr,
            VietQrFieldID.MERCHANT_CATEGORY_CODE,
            VietQRFieldName.MERCHANT_CATEGORY_CODE,
            {
              fixedLength: 4,
              required: false,
              customValidate: isNumeric,
            }
          );
          nextRawStr = mcc.nextRawValue;
          break;
        case VietQrFieldID.TRANSACTION_CURRENCY:
          currencyCode = this.decryptQrItem(
            nextRawStr,
            VietQrFieldID.TRANSACTION_CURRENCY,
            VietQRFieldName.TRANSACTION_CURRENCY,
            {
              fixedLength: 3,
              customValidate: isNumeric,
            }
          );
          nextRawStr = currencyCode.nextRawValue;
          break;
        case VietQrFieldID.TRANSACTION_AMOUNT:
          transactionAmount = this.decryptQrItem(
            nextRawStr,
            VietQrFieldID.TRANSACTION_AMOUNT,
            VietQRFieldName.TRANSACTION_AMOUNT,
            {
              maxLength: 13,
              customValidate: isFloatingPointAmount,
            },
          );
          nextRawStr = transactionAmount.nextRawValue;
          break;
        case VietQrFieldID.TIP_OR_CONVENIENCE_INDICATOR:
          tipOrConvenienceIndicator = this.decryptQrItem(
            nextRawStr,
            VietQrFieldID.TIP_OR_CONVENIENCE_INDICATOR,
            VietQRFieldName.TIP_OR_CONVENIENCE_INDICATOR,
            {
              fixedLength: 2,
              required: false,
              customValidate: isTipOrConvenienceIndicator,
            },
          );
          nextRawStr = tipOrConvenienceIndicator.nextRawValue;
          break;
        case VietQrFieldID.CONVENIENCE_FEE_FIXED:
          convenienceFeeFixed = this.decryptQrItem(
            nextRawStr,
            VietQrFieldID.CONVENIENCE_FEE_FIXED,
            VietQRFieldName.CONVENIENCE_FEE_FIXED,
            {
              maxLength: 13,
              required: false,
              customValidate: isFloatingPointAmount,
            },
          );
          nextRawStr = convenienceFeeFixed.nextRawValue;
          break;
        case VietQrFieldID.CONVENIENCE_FEE_PERCENTAGE:
          convenienceFeePercentage = this.decryptQrItem(
            nextRawStr,
            VietQrFieldID.CONVENIENCE_FEE_PERCENTAGE,
            VietQRFieldName.CONVENIENCE_FEE_PERCENTAGE,
            {
              maxLength: 5,
              required: false,
            },
          );
          nextRawStr = convenienceFeePercentage.nextRawValue;
          break;
        case VietQrFieldID.COUNTRY_CODE:
          countryCode = this.decryptQrItem(
            nextRawStr,
            VietQrFieldID.COUNTRY_CODE,
            VietQRFieldName.COUNTRY_CODE,
            {
              fixedLength: 2,
            },
          );
          nextRawStr = countryCode.nextRawValue;
          break;
        case VietQrFieldID.MERCHANT_NAME:
          merchantName = this.decryptQrItem(
            nextRawStr,
            VietQrFieldID.MERCHANT_NAME,
            VietQRFieldName.MERCHANT_NAME,
            {
              maxLength: 30,
              customValidate: isANS,
            },
          );
          nextRawStr = merchantName.nextRawValue;
          break;
        case VietQrFieldID.MERCHANT_CITY:
          merchantCity = this.decryptQrItem(
            nextRawStr,
            VietQrFieldID.MERCHANT_CITY,
            VietQRFieldName.MERCHANT_CITY,
            {
              maxLength: 15,
              customValidate: isANS,
            },
          );
          nextRawStr = merchantCity.nextRawValue;
          break;
        case VietQrFieldID.POSTAL_CODE:
          postalCode = this.decryptQrItem(
            nextRawStr,
            VietQrFieldID.POSTAL_CODE,
            VietQRFieldName.POSTAL_CODE,
            {
              maxLength: 15,
              customValidate: isANS,
            },
          );
          nextRawStr = postalCode.nextRawValue;
          break;
        case VietQrFieldID.LANGUAGE_TEMPLATE:
          languageTemplate = this.decryptQrItem(
            nextRawStr,
            VietQrFieldID.LANGUAGE_TEMPLATE,
            VietQRFieldName.LANGUAGE_TEMPLATE,
            {
              maxLength: 99,
              customValidate: isANS,
            },
          );
          nextRawStr = languageTemplate.nextRawValue;
          break;
        case VietQrFieldID.ADDITIONAL_DATA:
          additionalData = this.decryptQrItem(
            nextRawStr,
            VietQrFieldID.ADDITIONAL_DATA,
            VietQRFieldName.ADDITIONAL_DATA,
            {
              maxLength: 99,
              customValidate: isANS,
            },
          );
          nextRawStr = additionalData.nextRawValue;
          break;
        case VietQrFieldID.CRC_CODE:
          crcChecksum = this.decryptQrItem(
            nextRawStr,
            VietQrFieldID.CRC_CODE,
            VietQRFieldName.CRC_CODE,
            {
              fixedLength: 4,
            },
          );
          nextRawStr = crcChecksum.nextRawValue;
          break;
        default:
          nextRawStr = this.ignoreUnknownQrItem(nextRawStr, '');
          break;
      }
    }
    if (!initialMethod?.value) {
      throw new Error(`Field ${VietQRFieldName.INITIAL_METHOD} in QR is required.`);
    }
    if (!merchantAccountInfo?.value) {
      throw new Error(`Field ${VietQRFieldName.MERCHANT_ACCOUNT_INFO} in QR is required.`);
    }
    if (!currencyCode?.value) {
      throw new Error(`Field ${VietQRFieldName.TRANSACTION_CURRENCY} in QR is required.`);
    }
    if (!countryCode?.value) {
      throw new Error(`Field ${VietQRFieldName.COUNTRY_CODE} in QR is required.`);
    }
    if (tipOrConvenienceIndicator?.value === TipOrConvenienceIndicatorType.FEE_PERCENTAGE &&
      !convenienceFeePercentage?.value) {
      throw new Error(`${VietQRFieldName.CONVENIENCE_FEE_PERCENTAGE} in QR is required.`);
    }
    if (tipOrConvenienceIndicator?.value === TipOrConvenienceIndicatorType.FEE_FIXED &&
      !convenienceFeeFixed?.value) {
      throw new Error(`${VietQRFieldName.CONVENIENCE_FEE_FIXED} in QR is required.`);
    }
  
    const decryptedMerchantAccInfo = this.decryptMerchantAccInfo(merchantAccountInfo.value);
  
    const decryptedLanguageTemplate: ILanguageTemplate | undefined =
      languageTemplate?.value
        ? this.decryptLanguageTemplate(languageTemplate?.value)
        : undefined;
  
    const decryptedAdditionalData: IAdditionalData | undefined = additionalData?.value
      ? this.decryptAdditionalData(additionalData.value)
      : undefined;
    return {
      version: version?.value as VietQrVersion,
      initMethod: initialMethod?.value as VietQrInitiateMethod,
      merchantAccInfo: decryptedMerchantAccInfo,
      merchantCategoryCode: mcc?.value as MerchantCategoryCode,
      txnCurrency: Number(currencyCode?.value),
      txnAmount: transactionAmount?.value,
      tipConvenienceIndicator: tipOrConvenienceIndicator?.value,
      convenienceFeeFixed: convenienceFeeFixed?.value,
      convenienceFeePercentage: convenienceFeePercentage?.value,
      countryCode: countryCode?.value,
      merchantName: merchantName?.value,
      merchantCity: merchantCity?.value,
      postalCode: postalCode?.value,
      additionalData: decryptedAdditionalData,
      languageTemplate: decryptedLanguageTemplate,
      crcCode: crcChecksum?.value,
    }
  }

  decryptMerchantAccInfo(rawStr: string): IMerchantAccountInfo {
    let nextRawStr = rawStr;
    let decryptedGUID: IDecryptedQrItem | undefined;
    let beneficiaryOrg: IDecryptedQrItem | undefined;
    let decryptedServiceCode: IDecryptedQrItem | undefined;
    while (nextRawStr && nextRawStr !== '') {
      const fieldId = nextRawStr.substring(0, 2);
      if (!fieldId || fieldId.length < 2) {
        break;
      }
      switch (fieldId) {
        case MerchantAccInfoFieldID.GUID:
          decryptedGUID = this.decryptQrItem(
            nextRawStr,
            MerchantAccInfoFieldID.GUID,
            MerchantAccInfoFieldName.GUID,
            {
              maxLength: 32,
              customValidate: isANS,
            },
          );
          nextRawStr = decryptedGUID.nextRawValue;
          break;
        case MerchantAccInfoFieldID.BENEFICIARY_ORGANIZATION:
          beneficiaryOrg = this.decryptQrItem(
            nextRawStr,
            MerchantAccInfoFieldID.BENEFICIARY_ORGANIZATION,
            MerchantAccInfoFieldName.BENEFICIARY_ORGANIZATION,
            {
              maxLength: 99,
              customValidate: isANS,
            },
          );
          nextRawStr = beneficiaryOrg.nextRawValue;
          break;
        case MerchantAccInfoFieldID.SERVICE_CODE:
          decryptedServiceCode = this.decryptQrItem(
            nextRawStr,
            MerchantAccInfoFieldID.SERVICE_CODE,
            MerchantAccInfoFieldName.SERVICE_CODE,
            {
              maxLength: 10,
              customValidate: isServiceCode,
            },
          );
          nextRawStr = decryptedServiceCode.nextRawValue;
          break;
        default:
          nextRawStr = this.ignoreUnknownQrItem(nextRawStr, 'Merchant Account Information');
          break;
      }
    }
  
    if (!decryptedGUID?.value) {
      throw new Error(`${MerchantAccInfoFieldName.GUID} in Merchant Account Information is required.`);
    }
    if (!beneficiaryOrg?.value) {
      throw new Error(`${MerchantAccInfoFieldName.BENEFICIARY_ORGANIZATION} in Merchant Account Information is required.`);
    }
    const decryptedBeneficiaryOrg = this.decryptBeneficiaryOrg(beneficiaryOrg?.value);
    return {
      guid: decryptedGUID?.value,
      beneficiaryOrg: decryptedBeneficiaryOrg,
      serviceCode: decryptedServiceCode?.value as ServiceCode,
    };
  }

  decryptBeneficiaryOrg(rawStr: string): IBeneficiaryOrganiation {
    let nextRawStr = rawStr;
    let acquirerId: IDecryptedQrItem | undefined;
    let merchantId: IDecryptedQrItem | undefined;
    while (nextRawStr) {
      const fieldId = nextRawStr.substring(0, 2);
      if (!fieldId || fieldId.length < 2) {
        break;
      }
      switch (fieldId) {
        case BeneficaryOrganizationFieldID.ACQUIER_ID:
          acquirerId = this.decryptQrItem(
            nextRawStr,
            BeneficaryOrganizationFieldID.ACQUIER_ID,
            BeneficaryOrganizationFieldName.ACQUIER_ID,
            {
              fixedLength: 6,
            },
          );
          nextRawStr = acquirerId.nextRawValue;
          break;
        case BeneficaryOrganizationFieldID.MERCHANT_ID:
          merchantId = this.decryptQrItem(
            nextRawStr,
            BeneficaryOrganizationFieldID.MERCHANT_ID,
            BeneficaryOrganizationFieldName.MERCHANT_ID,
            {
              maxLength: 19,
            },
          );
          nextRawStr = merchantId.nextRawValue;
          break;
        default:
          nextRawStr = this.ignoreUnknownQrItem(nextRawStr, 'Benificiary Organization');
          break;
      }
    }
    if (!acquirerId?.value) {
      throw new Error(`Field ${BeneficaryOrganizationFieldName.ACQUIER_ID} in Benificiary Organization is required.`);
    }
    if (!merchantId?.value) {
      throw new Error(`Field ${BeneficaryOrganizationFieldName.MERCHANT_ID} in Benificiary Organization is required.`);
    }
    return {
      acquierId: acquirerId.value,
      merchantId: merchantId.value,
    };
  }

  decryptLanguageTemplate(rawStr: string): ILanguageTemplate {
    let nextRawStr = rawStr;
    let decryptedPreference: IDecryptedQrItem;
    let decryptedMerchantName: IDecryptedQrItem;
    let decryptedMerchantCity: IDecryptedQrItem;

    while (nextRawStr && nextRawStr !== '') {
      const fieldId = nextRawStr.substring(0, 2);
      if (!fieldId || fieldId.length < 2) {
        break;
      }
      switch (fieldId) {
        case LanguageTemplateFieldID.LANGUAGE_PREFERENCE:
          decryptedPreference = this.decryptQrItem(
            nextRawStr,
            LanguageTemplateFieldID.LANGUAGE_PREFERENCE,
            LanguageTemplateFieldName.LANGUAGE_PREFERENCE,
            {
              fixedLength: 2,
              customValidate: isANS,
            }
          );
          nextRawStr = decryptedPreference.nextRawValue;
          break;
        case LanguageTemplateFieldID.ALTERNATE_MERCHANT_NAME:
          decryptedMerchantName = this.decryptQrItem(
            nextRawStr,
            LanguageTemplateFieldID.ALTERNATE_MERCHANT_NAME,
            LanguageTemplateFieldName.ALTERNATE_MERCHANT_CITY,
            {
              maxLength: 30,
              customValidate: isANS,
            },
          );
          nextRawStr = decryptedMerchantName.nextRawValue;
          break;
        case LanguageTemplateFieldID.ALTERNATE_MERCHANT_CITY:
          decryptedMerchantCity = this.decryptQrItem(
            nextRawStr,
            LanguageTemplateFieldID.ALTERNATE_MERCHANT_CITY,
            LanguageTemplateFieldName.ALTERNATE_MERCHANT_CITY,
            {
              maxLength: 15,
              required: false,
            },
          );
          nextRawStr = decryptedMerchantCity.nextRawValue;
          break;
        default:
          nextRawStr = this.ignoreUnknownQrItem(nextRawStr, 'Merchant Information Language Template');
          break;
      }
    }
    if (!decryptedPreference?.value) {
      throw new Error(`${LanguageTemplateFieldName.LANGUAGE_PREFERENCE} in Language Template is required.`);
    }
    if (!decryptedMerchantName?.value) {
      throw new Error(`${LanguageTemplateFieldName.ALTERNATE_MERCHANT_NAME} in Language Template is required.`);
    }
  
    return {
      preference: decryptedPreference.value,
      merchantName: decryptedMerchantName.value,
      merchantCity: decryptedMerchantCity?.value,
    };
  }

  decryptAdditionalData(rawStr: string): IAdditionalData {
    let nextRawStr = rawStr;
    let billNumber: IDecryptedQrItem;
    let mobileNumber: IDecryptedQrItem;
    let storeLabel: IDecryptedQrItem;
    let referenceLabel: IDecryptedQrItem;
    let loyaltyNumber: IDecryptedQrItem;
    let customerLabel: IDecryptedQrItem;
    let terminalLabel: IDecryptedQrItem;
    let purposeOfTxn: IDecryptedQrItem;
    let additionalConsumerDataReq: IDecryptedQrItem;

    while (nextRawStr && nextRawStr !== '') {
      const fieldId = nextRawStr.substring(0, 2);
      if (!fieldId || fieldId.length < 2) {
        break;
      }
      switch (fieldId) {
        case AdditionalDataFieldID.BILL_NUMBER:
          billNumber = this.decryptQrItem(
            nextRawStr,
            AdditionalDataFieldID.BILL_NUMBER,
            AdditionalDataFieldName.BILL_NUMBER,
            {
              maxLength: 25,
              required: false,
              customValidate: isANS,
            },
          )
          nextRawStr = billNumber.nextRawValue;
          break;
        case AdditionalDataFieldID.MOBILE_NUMBER:
          mobileNumber = this.decryptQrItem(
            nextRawStr,
            AdditionalDataFieldID.MOBILE_NUMBER,
            AdditionalDataFieldName.MOBILE_NUMBER,
            {
              required: false,
              maxLength: 25,
              customValidate: isANS,
            },
          );
          nextRawStr = mobileNumber.nextRawValue;
          break;
        case AdditionalDataFieldID.STORE_LABEL:
          storeLabel = this.decryptQrItem(
            nextRawStr,
            AdditionalDataFieldID.STORE_LABEL,
            AdditionalDataFieldName.STORE_LABEL,
            {
              required: false,
              maxLength: 25,
              customValidate: isANS,
            },
          );
          nextRawStr = storeLabel.nextRawValue;
          break;
        case AdditionalDataFieldID.LOYALTY_NUMBER:
          loyaltyNumber = this.decryptQrItem(
            nextRawStr,
            AdditionalDataFieldID.LOYALTY_NUMBER,
            AdditionalDataFieldName.LOYALTY_NUMBER,
            {
              required: false,
              maxLength: 25,
              customValidate: isANS,
            },
          );
          nextRawStr = loyaltyNumber.nextRawValue;
          break;
        case AdditionalDataFieldID.REFERENCE_LABEL:
          referenceLabel = this.decryptQrItem(
            nextRawStr,
            AdditionalDataFieldID.REFERENCE_LABEL,
            AdditionalDataFieldName.REFERENCE_LABEL,
            {
              required: false,
              maxLength: 25,
              customValidate: isANS,
            },
          );
          nextRawStr = referenceLabel.nextRawValue;
          break;
        case AdditionalDataFieldID.CUSTOMER_LABEL:
          customerLabel = this.decryptQrItem(
            nextRawStr,
            AdditionalDataFieldID.CUSTOMER_LABEL,
            AdditionalDataFieldName.CUSTOMER_LABEL,
            {
              required: false,
              maxLength: 25,
              customValidate: isANS,
            },
          );
          nextRawStr = customerLabel.nextRawValue;
          break;
        case AdditionalDataFieldID.TERMINAL_LABEL:
          terminalLabel = this.decryptQrItem(
            nextRawStr,
            AdditionalDataFieldID.TERMINAL_LABEL,
            AdditionalDataFieldName.TERMINAL_LABEL,
            {
              required: false,
              maxLength: 25,
              customValidate: isANS,
            },
          );
          nextRawStr = terminalLabel.nextRawValue;
          break;
        case AdditionalDataFieldID.PURPOSE_OF_TRANSACTION:
          purposeOfTxn = this.decryptQrItem(
            nextRawStr,
            AdditionalDataFieldID.PURPOSE_OF_TRANSACTION,
            AdditionalDataFieldName.PURPOSE_OF_TRANSACTION,
            {
              required: false,
              maxLength: 25,
              customValidate: isANS,
            },
          );
          nextRawStr = purposeOfTxn.nextRawValue;
          break;
        case AdditionalDataFieldID.ADDITIONAL_CONSUMER_DATA_REQUEST:
          additionalConsumerDataReq = this.decryptQrItem(
            nextRawStr,
            AdditionalDataFieldID.ADDITIONAL_CONSUMER_DATA_REQUEST,
            AdditionalDataFieldName.ADDITIONAL_CONSUMER_DATA_REQUEST,
            {
              required: false,
              maxLength: 25,
              customValidate: isANS,
            },
          );
          nextRawStr = additionalConsumerDataReq.nextRawValue;
          break;
        default:
          nextRawStr = this.ignoreUnknownQrItem(nextRawStr, 'Additional Data');
          break;
      }
    }

    return {
      billNumber: billNumber?.value,
      mobileNumber: mobileNumber?.value,
      storeLabel: storeLabel?.value,
      loyaltyNumber: loyaltyNumber?.value,
      referenceLabel: referenceLabel?.value,
      customerLabel: customerLabel?.value,
      terminalLabel: terminalLabel?.value,
      purposeOfTxn: purposeOfTxn?.value,
      additionalConsumerDataReq: additionalConsumerDataReq?.value,
    };
  }

  ignoreUnknownQrItem(rawValue: string, nestedFieldName: string): string {
    const fieldId = rawValue.substring(0, 2);
    const length = Number(rawValue.substring(2, 4));
    if (Number.isNaN(length) || length <= 0) {
      throw new Error(`Length of unknown field ID ${fieldId}${nestedFieldName ? ' in ' + nestedFieldName + ' field' : ''} of QR is invalid.`);
    }
    const nextRawValue = rawValue.substring(4 + length);
    return nextRawValue;
  }
}