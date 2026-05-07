import {
  AdditionalDataFieldID,
  AdditionalDataFieldName,
  BeneficaryOrganizationFieldID,
  BeneficaryOrganizationFieldName,
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
import {
  IAdditionalData,
  IBeneficiaryOrganiation,
  ILanguageTemplate,
  IMerchantAccountInfo,
  IVietQrDataV1,
  IDecryptedQrDataOptions,
  IDecryptedQrItem,
  IDecryptorElement,
  IDecryptorOptions,
} from '../interfaces';
import {
  isANS,
  isFloatingPointAmount,
  isNumeric,
  isServiceCode,
  isTipOrConvenienceIndicator,
  isValidChecksum,
} from '../utils';

type FieldConfig = {
  fieldName: string;
  fixedLength?: number;
  maxLength?: number;
  required?: boolean;
  customValidate?: (v: string) => boolean;
};

const TOP_LEVEL_FIELD_CONFIG: Record<string, FieldConfig> = {
  [VietQrFieldID.INITIAL_METHOD]: {
    fieldName: VietQRFieldName.INITIAL_METHOD,
    fixedLength: 2,
    customValidate: isNumeric,
  },
  [VietQrFieldID.MERCHANT_ACCOUNT_INFO]: {
    fieldName: VietQRFieldName.MERCHANT_ACCOUNT_INFO,
    maxLength: 99,
  },
  [VietQrFieldID.MERCHANT_CATEGORY_CODE]: {
    fieldName: VietQRFieldName.MERCHANT_CATEGORY_CODE,
    fixedLength: 4,
    required: false,
    customValidate: isNumeric,
  },
  [VietQrFieldID.TRANSACTION_CURRENCY]: {
    fieldName: VietQRFieldName.TRANSACTION_CURRENCY,
    fixedLength: 3,
    customValidate: isNumeric,
  },
  [VietQrFieldID.TRANSACTION_AMOUNT]: {
    fieldName: VietQRFieldName.TRANSACTION_AMOUNT,
    maxLength: 13,
    customValidate: isFloatingPointAmount,
  },
  [VietQrFieldID.TIP_OR_CONVENIENCE_INDICATOR]: {
    fieldName: VietQRFieldName.TIP_OR_CONVENIENCE_INDICATOR,
    fixedLength: 2,
    required: false,
    customValidate: isTipOrConvenienceIndicator,
  },
  [VietQrFieldID.CONVENIENCE_FEE_FIXED]: {
    fieldName: VietQRFieldName.CONVENIENCE_FEE_FIXED,
    maxLength: 13,
    required: false,
    customValidate: isFloatingPointAmount,
  },
  [VietQrFieldID.CONVENIENCE_FEE_PERCENTAGE]: {
    fieldName: VietQRFieldName.CONVENIENCE_FEE_PERCENTAGE,
    maxLength: 5,
    required: false,
  },
  [VietQrFieldID.COUNTRY_CODE]: {
    fieldName: VietQRFieldName.COUNTRY_CODE,
    fixedLength: 2,
  },
  [VietQrFieldID.MERCHANT_NAME]: {
    fieldName: VietQRFieldName.MERCHANT_NAME,
    maxLength: 30,
    customValidate: isANS,
  },
  [VietQrFieldID.MERCHANT_CITY]: {
    fieldName: VietQRFieldName.MERCHANT_CITY,
    maxLength: 15,
    customValidate: isANS,
  },
  [VietQrFieldID.POSTAL_CODE]: {
    fieldName: VietQRFieldName.POSTAL_CODE,
    maxLength: 15,
    customValidate: isANS,
  },
  [VietQrFieldID.LANGUAGE_TEMPLATE]: {
    fieldName: VietQRFieldName.LANGUAGE_TEMPLATE,
    maxLength: 99,
    customValidate: isANS,
  },
  [VietQrFieldID.ADDITIONAL_DATA]: {
    fieldName: VietQRFieldName.ADDITIONAL_DATA,
    maxLength: 99,
    customValidate: isANS,
  },
  [VietQrFieldID.CRC_CODE]: {
    fieldName: VietQRFieldName.CRC_CODE,
    fixedLength: 4,
  },
};

const MERCHANT_ACC_INFO_FIELD_CONFIG: Record<string, FieldConfig> = {
  [MerchantAccInfoFieldID.GUID]: {
    fieldName: MerchantAccInfoFieldName.GUID,
    maxLength: 32,
    customValidate: isANS,
  },
  [MerchantAccInfoFieldID.BENEFICIARY_ORGANIZATION]: {
    fieldName: MerchantAccInfoFieldName.BENEFICIARY_ORGANIZATION,
    maxLength: 99,
    customValidate: isANS,
  },
  [MerchantAccInfoFieldID.SERVICE_CODE]: {
    fieldName: MerchantAccInfoFieldName.SERVICE_CODE,
    maxLength: 10,
    customValidate: isServiceCode,
  },
};

const BENEFICIARY_ORG_FIELD_CONFIG: Record<string, FieldConfig> = {
  [BeneficaryOrganizationFieldID.ACQUIER_ID]: {
    fieldName: BeneficaryOrganizationFieldName.ACQUIER_ID,
    fixedLength: 6,
  },
  [BeneficaryOrganizationFieldID.MERCHANT_ID]: {
    fieldName: BeneficaryOrganizationFieldName.MERCHANT_ID,
    maxLength: 19,
  },
};

const LANGUAGE_TEMPLATE_FIELD_CONFIG: Record<string, FieldConfig> = {
  [LanguageTemplateFieldID.LANGUAGE_PREFERENCE]: {
    fieldName: LanguageTemplateFieldName.LANGUAGE_PREFERENCE,
    fixedLength: 2,
    customValidate: isANS,
  },
  [LanguageTemplateFieldID.ALTERNATE_MERCHANT_NAME]: {
    fieldName: LanguageTemplateFieldName.ALTERNATE_MERCHANT_NAME,
    maxLength: 30,
    customValidate: isANS,
  },
  [LanguageTemplateFieldID.ALTERNATE_MERCHANT_CITY]: {
    fieldName: LanguageTemplateFieldName.ALTERNATE_MERCHANT_CITY,
    maxLength: 15,
    required: false,
  },
};

const additionalDataField = (fieldName: string): FieldConfig => ({
  fieldName,
  maxLength: 25,
  required: false,
  customValidate: isANS,
});

const ADDITIONAL_DATA_FIELD_CONFIG: Record<string, FieldConfig> = {
  [AdditionalDataFieldID.BILL_NUMBER]: additionalDataField(AdditionalDataFieldName.BILL_NUMBER),
  [AdditionalDataFieldID.MOBILE_NUMBER]: additionalDataField(AdditionalDataFieldName.MOBILE_NUMBER),
  [AdditionalDataFieldID.STORE_LABEL]: additionalDataField(AdditionalDataFieldName.STORE_LABEL),
  [AdditionalDataFieldID.LOYALTY_NUMBER]: additionalDataField(
    AdditionalDataFieldName.LOYALTY_NUMBER,
  ),
  [AdditionalDataFieldID.REFERENCE_LABEL]: additionalDataField(
    AdditionalDataFieldName.REFERENCE_LABEL,
  ),
  [AdditionalDataFieldID.CUSTOMER_LABEL]: additionalDataField(
    AdditionalDataFieldName.CUSTOMER_LABEL,
  ),
  [AdditionalDataFieldID.TERMINAL_LABEL]: additionalDataField(
    AdditionalDataFieldName.TERMINAL_LABEL,
  ),
  [AdditionalDataFieldID.PURPOSE_OF_TRANSACTION]: additionalDataField(
    AdditionalDataFieldName.PURPOSE_OF_TRANSACTION,
  ),
  [AdditionalDataFieldID.ADDITIONAL_CONSUMER_DATA_REQUEST]: additionalDataField(
    AdditionalDataFieldName.ADDITIONAL_CONSUMER_DATA_REQUEST,
  ),
};

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
    const {required = true, maxLength, fixedLength, customValidate} = options;
    if (!value && required) {
      throw new Error(`Field ${fieldName} in QR string is required.`);
    }
    if (value && value.length !== length) {
      throw new Error(`Length of ${fieldName} is not equal to defined length in QR string.`);
    }
    if (maxLength && maxLength < length) {
      throw new Error(
        `Length of ${fieldName} in QR string must be less than or equal to ${maxLength}.`,
      );
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
    const {required = true} = options;
    const {value, length, nextRawValue} = this.readQrItem({
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
    this.validateQrItem(value as string, length as number, fieldName, options);

    return {
      fieldId,
      fieldName,
      length,
      value,
      nextRawValue,
    };
  }

  private decryptFieldByConfig(
    rawValue: string,
    fieldId: string,
    config: FieldConfig,
  ): IDecryptedQrItem {
    return this.decryptQrItem(rawValue, fieldId, config.fieldName, {
      fixedLength: config.fixedLength,
      maxLength: config.maxLength,
      required: config.required,
      customValidate: config.customValidate,
    });
  }

  private parseFields(
    rawStr: string,
    fieldConfig: Record<string, FieldConfig>,
    contextName: string,
  ): Record<string, IDecryptedQrItem> {
    const result: Record<string, IDecryptedQrItem> = {};
    let nextRawStr = rawStr;
    while (nextRawStr) {
      const fieldId = nextRawStr.substring(0, 2);
      if (fieldId.length < 2) break;
      const config = fieldConfig[fieldId];
      if (config) {
        const item = this.decryptFieldByConfig(nextRawStr, fieldId, config);
        result[fieldId] = item;
        nextRawStr = item.nextRawValue;
      } else {
        nextRawStr = this.ignoreUnknownQrItem(nextRawStr, contextName);
      }
    }
    return result;
  }

  isValidChecksum(qrString: string): boolean {
    if (!/6304[0-9A-Fa-f]{4}$/.test(qrString)) {
      return false;
    }
    return isValidChecksum(qrString);
  }

  /**
   * Function to decrypt the QR string scanned from QR code
   * @param qrString - the qr string you want to decrypt
   * @param options - the output options of decrypted qr data
   * @returns IVietQrDataV1
   */
  decrypt(qrString: string, options?: IDecryptedQrDataOptions): IVietQrDataV1 {
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
    const fields = this.parseFields(qrString.substring(6), TOP_LEVEL_FIELD_CONFIG, '');

    const initialMethod = fields[VietQrFieldID.INITIAL_METHOD];
    const merchantAccountInfo = fields[VietQrFieldID.MERCHANT_ACCOUNT_INFO];
    const mcc = fields[VietQrFieldID.MERCHANT_CATEGORY_CODE];
    const currencyCode = fields[VietQrFieldID.TRANSACTION_CURRENCY];
    const transactionAmount = fields[VietQrFieldID.TRANSACTION_AMOUNT];
    const tipOrConvenienceIndicator = fields[VietQrFieldID.TIP_OR_CONVENIENCE_INDICATOR];
    const convenienceFeeFixed = fields[VietQrFieldID.CONVENIENCE_FEE_FIXED];
    const convenienceFeePercentage = fields[VietQrFieldID.CONVENIENCE_FEE_PERCENTAGE];
    const countryCode = fields[VietQrFieldID.COUNTRY_CODE];
    const merchantName = fields[VietQrFieldID.MERCHANT_NAME];
    const merchantCity = fields[VietQrFieldID.MERCHANT_CITY];
    const postalCode = fields[VietQrFieldID.POSTAL_CODE];
    const additionalData = fields[VietQrFieldID.ADDITIONAL_DATA];
    const languageTemplate = fields[VietQrFieldID.LANGUAGE_TEMPLATE];
    const crcChecksum = fields[VietQrFieldID.CRC_CODE];

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
    if (
      tipOrConvenienceIndicator?.value === TipOrConvenienceIndicatorType.FEE_PERCENTAGE &&
      !convenienceFeePercentage?.value
    ) {
      throw new Error(`${VietQRFieldName.CONVENIENCE_FEE_PERCENTAGE} in QR is required.`);
    }
    if (
      tipOrConvenienceIndicator?.value === TipOrConvenienceIndicatorType.FEE_FIXED &&
      !convenienceFeeFixed?.value
    ) {
      throw new Error(`${VietQRFieldName.CONVENIENCE_FEE_FIXED} in QR is required.`);
    }

    const decryptedMerchantAccInfo = this.decryptMerchantAccInfo(merchantAccountInfo.value);

    const decryptedLanguageTemplate: ILanguageTemplate | undefined = languageTemplate?.value
      ? this.decryptLanguageTemplate(languageTemplate.value, options)
      : undefined;

    const decryptedAdditionalData: IAdditionalData | undefined = additionalData?.value
      ? this.decryptAdditionalData(additionalData.value, options)
      : undefined;
    const {lean = true} = options || {};

    return {
      version: version?.value as VietQrVersion,
      initMethod: initialMethod?.value as VietQrInitiateMethod,
      merchantAccInfo: decryptedMerchantAccInfo,
      merchantCategoryCode: mcc?.value as MerchantCategoryCode,
      txnCurrency: Number(currencyCode?.value),
      ...((!lean || (transactionAmount?.value && lean)) && {
        txnAmount: transactionAmount?.value,
      }),
      ...((!lean || (tipOrConvenienceIndicator?.value && lean)) && {
        tipConvenienceIndicator: tipOrConvenienceIndicator?.value,
      }),
      ...((!lean || (convenienceFeeFixed?.value && lean)) && {
        convenienceFeeFixed: convenienceFeeFixed?.value,
      }),
      ...((!lean || (convenienceFeePercentage?.value && lean)) && {
        convenienceFeePercentage: convenienceFeePercentage?.value,
      }),
      countryCode: countryCode?.value,
      ...((!lean || (merchantName?.value && lean)) && {
        merchantName: merchantName?.value,
      }),
      ...((!lean || (merchantCity?.value && lean)) && {
        merchantCity: merchantCity?.value,
      }),
      ...((!lean || (postalCode?.value && lean)) && {
        postalCode: postalCode?.value,
      }),
      ...((!lean || (decryptedAdditionalData && lean)) && {
        additionalData: decryptedAdditionalData,
      }),
      ...((!lean || (decryptedLanguageTemplate && lean)) && {
        languageTemplate: decryptedLanguageTemplate,
      }),
      crcCode: crcChecksum?.value,
    };
  }

  decryptMerchantAccInfo(rawStr: string): IMerchantAccountInfo {
    const fields = this.parseFields(
      rawStr,
      MERCHANT_ACC_INFO_FIELD_CONFIG,
      'Merchant Account Information',
    );
    const decryptedGUID = fields[MerchantAccInfoFieldID.GUID];
    const beneficiaryOrg = fields[MerchantAccInfoFieldID.BENEFICIARY_ORGANIZATION];
    const decryptedServiceCode = fields[MerchantAccInfoFieldID.SERVICE_CODE];

    if (!decryptedGUID?.value) {
      throw new Error(
        `${MerchantAccInfoFieldName.GUID} in Merchant Account Information is required.`,
      );
    }
    if (!beneficiaryOrg?.value) {
      throw new Error(
        `${MerchantAccInfoFieldName.BENEFICIARY_ORGANIZATION} in Merchant Account Information is required.`,
      );
    }
    const decryptedBeneficiaryOrg = this.decryptBeneficiaryOrg(beneficiaryOrg.value);
    return {
      guid: decryptedGUID.value,
      beneficiaryOrg: decryptedBeneficiaryOrg,
      serviceCode: decryptedServiceCode?.value as ServiceCode,
    };
  }

  decryptBeneficiaryOrg(rawStr: string): IBeneficiaryOrganiation {
    const fields = this.parseFields(
      rawStr,
      BENEFICIARY_ORG_FIELD_CONFIG,
      'Benificiary Organization',
    );
    const acquirerId = fields[BeneficaryOrganizationFieldID.ACQUIER_ID];
    const merchantId = fields[BeneficaryOrganizationFieldID.MERCHANT_ID];

    if (!acquirerId?.value) {
      throw new Error(
        `Field ${BeneficaryOrganizationFieldName.ACQUIER_ID} in Benificiary Organization is required.`,
      );
    }
    if (!merchantId?.value) {
      throw new Error(
        `Field ${BeneficaryOrganizationFieldName.MERCHANT_ID} in Benificiary Organization is required.`,
      );
    }
    return {
      acquierId: acquirerId.value,
      merchantId: merchantId.value,
    };
  }

  decryptLanguageTemplate(rawStr: string, options?: IDecryptedQrDataOptions): ILanguageTemplate {
    const fields = this.parseFields(
      rawStr,
      LANGUAGE_TEMPLATE_FIELD_CONFIG,
      'Merchant Information Language Template',
    );
    const decryptedPreference = fields[LanguageTemplateFieldID.LANGUAGE_PREFERENCE];
    const decryptedMerchantName = fields[LanguageTemplateFieldID.ALTERNATE_MERCHANT_NAME];
    const decryptedMerchantCity = fields[LanguageTemplateFieldID.ALTERNATE_MERCHANT_CITY];

    if (!decryptedPreference?.value) {
      throw new Error(
        `${LanguageTemplateFieldName.LANGUAGE_PREFERENCE} in Language Template is required.`,
      );
    }
    if (!decryptedMerchantName?.value) {
      throw new Error(
        `${LanguageTemplateFieldName.ALTERNATE_MERCHANT_NAME} in Language Template is required.`,
      );
    }
    const {lean = true} = options || {};

    return {
      preference: decryptedPreference.value,
      merchantName: decryptedMerchantName.value,
      ...((!lean || (decryptedMerchantCity?.value && lean)) && {
        merchantCity: decryptedMerchantCity?.value,
      }),
    };
  }

  decryptAdditionalData(rawStr: string, options?: IDecryptedQrDataOptions): IAdditionalData {
    const fields = this.parseFields(rawStr, ADDITIONAL_DATA_FIELD_CONFIG, 'Additional Data');
    const billNumber = fields[AdditionalDataFieldID.BILL_NUMBER];
    const mobileNumber = fields[AdditionalDataFieldID.MOBILE_NUMBER];
    const storeLabel = fields[AdditionalDataFieldID.STORE_LABEL];
    const loyaltyNumber = fields[AdditionalDataFieldID.LOYALTY_NUMBER];
    const referenceLabel = fields[AdditionalDataFieldID.REFERENCE_LABEL];
    const customerLabel = fields[AdditionalDataFieldID.CUSTOMER_LABEL];
    const terminalLabel = fields[AdditionalDataFieldID.TERMINAL_LABEL];
    const purposeOfTxn = fields[AdditionalDataFieldID.PURPOSE_OF_TRANSACTION];
    const additionalConsumerDataReq =
      fields[AdditionalDataFieldID.ADDITIONAL_CONSUMER_DATA_REQUEST];
    const {lean = true} = options || {};

    return {
      ...((!lean || (billNumber?.value && lean)) && {
        billNumber: billNumber?.value,
      }),
      ...((!lean || (mobileNumber?.value && lean)) && {
        mobileNumber: mobileNumber?.value,
      }),
      ...((!lean || (storeLabel?.value && lean)) && {
        storeLabel: storeLabel?.value,
      }),
      ...((!lean || (loyaltyNumber?.value && lean)) && {
        loyaltyNumber: loyaltyNumber?.value,
      }),
      ...((!lean || (referenceLabel?.value && lean)) && {
        referenceLabel: referenceLabel?.value,
      }),
      ...((!lean || (customerLabel?.value && lean)) && {
        customerLabel: customerLabel?.value,
      }),
      ...((!lean || (terminalLabel?.value && lean)) && {
        terminalLabel: terminalLabel?.value,
      }),
      ...((!lean || (purposeOfTxn?.value && lean)) && {
        purposeOfTxn: purposeOfTxn?.value,
      }),
      ...((!lean || (additionalConsumerDataReq?.value && lean)) && {
        additionalConsumerDataReq: additionalConsumerDataReq?.value,
      }),
    };
  }

  ignoreUnknownQrItem(rawValue: string, nestedFieldName: string): string {
    const fieldId = rawValue.substring(0, 2);
    const length = Number(rawValue.substring(2, 4));
    if (Number.isNaN(length) || length <= 0) {
      throw new Error(
        `Length of unknown field ID ${fieldId}${
          nestedFieldName ? ' in ' + nestedFieldName + ' field' : ''
        } of QR is invalid.`,
      );
    }
    return rawValue.substring(4 + length);
  }
}
