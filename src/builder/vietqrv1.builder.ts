import {
  GUID,
  IVietQrDataV1,
  VietQrVersion,
  VietQrInitiateMethod,
  VietQrFieldID,
  MerchantAccInfoFieldID,
  BeneficaryOrganizationFieldID,
  AdditionalDataFieldID,
  LanguageTemplateFieldID,
  ServiceCode,
  IBasicVietQrData,
  TipOrConvenienceIndicatorType,
  IMerchantAccountInfo,
  DEFAULT_CURRENCY,
  DEFAULT_COUNTRY_CODE,
} from '../constants/index';
import {genDataLength, StringUtil, createQRCode} from '../utils';
import {Crc, CrcType} from '../crc.helper';

export class VietQRV1Builder {
  private data: IVietQrDataV1;
  private qrCodeString: string;

  constructor() {
    this.initData();
  }

  private initData() {
    this.data = {
      version: VietQrVersion.V1, // ID 00
      initMethod: VietQrInitiateMethod.STATIC, // ID 01
      merchantAccInfo: {
        // ID = 38
        guid: GUID.NAPAS, // ID 38 - 00 (Required Field)
        beneficiaryOrg: {
          // ID 38 - 01 (Required Field)
          acquierId: '',
          merchantId: '',
        },
        serviceCode: ServiceCode.BY_ACCOUNT_NUMBER, // ID 38 - 02 (Conditional Field)
      },
      merchantCategoryCode: undefined, // ID 52
      txnCurrency: DEFAULT_CURRENCY, // ID 53
      txnAmount: undefined, // ID 54
      tipConvenienceIndicator: undefined, // ID 55
      convenienceFeeFixed: undefined, // ID 56
      convenienceFeePercentage: undefined, // ID 57
      countryCode: DEFAULT_COUNTRY_CODE, // ID 58
      merchantName: undefined, // ID 59
      merchantCity: undefined, // ID 60
      postalCode: undefined, // ID 61
      additionalData: undefined, // ID 62
      languageTemplate: undefined, // ID 64
      crcCode: '', // ID 63
    };

    return this;
  }

  public setMerchantAccountInfo(info: IMerchantAccountInfo) {
    const {
      beneficiaryOrg,
      guid = this.data.merchantAccInfo?.guid || GUID.NAPAS,
      serviceCode = this.data.merchantAccInfo?.serviceCode || ServiceCode.BY_ACCOUNT_NUMBER,
    } = info;
    this.data.merchantAccInfo = {
      guid,
      beneficiaryOrg,
      serviceCode,
    };

    return this;
  }

  public setTxnAmount(amount: number) {
    this.data.txnAmount = amount.toString();
    this.data.initMethod = VietQrInitiateMethod.DYNAMIC;

    return this;
  }

  public setTxnDescription(description: string) {
    this.data.additionalData = {
      ...this.data.additionalData,
      purposeOfTxn: description,
    };
  }

  public setTxnCurrency(currencyCode = DEFAULT_CURRENCY) {
    this.data.txnCurrency = currencyCode;

    return this;
  }

  public setTxnCountry(countryCode = DEFAULT_COUNTRY_CODE) {
    this.data.countryCode = countryCode;

    return this;
  }

  public refresh() {
    this.initData();
  }

  public quickBuild(input: IBasicVietQrData) {
    const {
      acquierId, // ID DVCNTT
      merchantId, // Tài khoản/Số thẻ thụ hưởng
      serviceCode = ServiceCode.BY_ACCOUNT_NUMBER, // Loại merchantId (thẻ/ số tk)
      amount,
      txnDescription,
    } = input;
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

  public build() {
    let dataStr =
      this.genVersion() +
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
      VietQrFieldID.CRC_CODE +
      '04';

    this.qrCodeString = `${dataStr}${this.calcCRCCode(dataStr)}`;

    return this;
  }

  public getQrCodeString() {
    return this.qrCodeString;
  }

  public async generateQR() {
    try {
      return await createQRCode(this.qrCodeString, null, 150, 50);
    } catch (err) {
      console.error(err);
    }
  }

  private genBasicDataStructure(fieldID: string, dt: any): string {
    return dt ? `${fieldID}${genDataLength(dt)}${dt}` : '';
  }

  private genVersion() {
    return this.genBasicDataStructure(VietQrFieldID.VERSION, this.data.version);
  }

  private genInitMethod() {
    return this.genBasicDataStructure(VietQrFieldID.INITIAL_METHOD, this.data.initMethod);
  }

  private genMerchantAccInfo() {
    return this.genBasicDataStructure(
      VietQrFieldID.MERCHANT_ACCOUNT_INFO,
      this.genGUIDInfo() + this.genBeneficiaryOrg() + this.genServiceCodeInfo(),
    );
  }

  private genGUIDInfo(): string {
    return this.genBasicDataStructure(MerchantAccInfoFieldID.GUID, this.data.merchantAccInfo.guid);
  }

  private genBeneficiaryOrg(): string {
    return this.genBasicDataStructure(
      MerchantAccInfoFieldID.BENEFICIARY_ORGANIZATION,
      this.genAcquierInfo() + this.genMerchantIdInfo(),
    );
  }

  private genAcquierInfo(): string {
    return this.genBasicDataStructure(
      BeneficaryOrganizationFieldID.ACQUIER_ID,
      this.data.merchantAccInfo.beneficiaryOrg.acquierId,
    );
  }

  private genMerchantIdInfo(): string {
    return this.genBasicDataStructure(
      BeneficaryOrganizationFieldID.MERCHANT_ID,
      this.data.merchantAccInfo.beneficiaryOrg.merchantId,
    );
  }

  private genServiceCodeInfo(): string {
    return this.genBasicDataStructure(
      MerchantAccInfoFieldID.SERVICE_CODE,
      this.data.merchantAccInfo.serviceCode,
    );
  }

  private genCategoryCodeInfo(): string {
    return this.genBasicDataStructure(
      VietQrFieldID.MERCHANT_CATEGORY_CODE,
      this.data.merchantCategoryCode,
    );
  }

  private genCurrencyInfo(): string {
    return this.genBasicDataStructure(VietQrFieldID.TRANSACTION_CURRENCY, this.data.txnCurrency);
  }

  private genAmountInfo(): string {
    return this.genBasicDataStructure(VietQrFieldID.TRANSACTION_AMOUNT, this.data.txnAmount);
  }

  private genTipOrConvenienceIndicatorInfo(): string {
    return (
      this.genBasicDataStructure(
        VietQrFieldID.TIP_OR_CONVENIENCE_INDICATOR,
        this.data.tipConvenienceIndicator,
      ) +
      this.genConvenienceFeeFixed() +
      this.genConvenienceFeePercentage()
    );
  }

  private genConvenienceFeeFixed(): string {
    return this.data.tipConvenienceIndicator === TipOrConvenienceIndicatorType.FEE_FIXED
      ? this.genBasicDataStructure(
          VietQrFieldID.CONVENIENCE_FEE_FIXED,
          this.data.convenienceFeeFixed,
        )
      : '';
  }

  private genConvenienceFeePercentage(): string {
    return this.data.tipConvenienceIndicator === TipOrConvenienceIndicatorType.FEE_PERCENTAGE
      ? this.genBasicDataStructure(
          VietQrFieldID.CONVENIENCE_FEE_PERCENTAGE,
          this.data.convenienceFeePercentage,
        )
      : '';
  }

  private genCountryCodeInfo(): string {
    return this.genBasicDataStructure(VietQrFieldID.COUNTRY_CODE, this.data.countryCode);
  }

  private genMerchantNameInfo(): string {
    return this.genBasicDataStructure(VietQrFieldID.MERCHANT_NAME, this.data.merchantName);
  }

  private genMerchantCityInfo(): string {
    return this.genBasicDataStructure(VietQrFieldID.MERCHANT_CITY, this.data.merchantCity);
  }

  private genPostalCodeInfo(): string {
    return this.genBasicDataStructure(VietQrFieldID.POSTAL_CODE, this.data.postalCode);
  }

  private genAdditionalData(): string {
    return this.data.additionalData
      ? this.genBasicDataStructure(
          VietQrFieldID.ADDITIONAL_DATA,
          this.genBillNumberInfo() +
            this.genMobileNumberInfo() +
            this.genStoreLabelInfo() +
            this.genLoyaltyNumberInfo() +
            this.genreferenceLabelInfo() +
            this.genCustomerLabelInfo() +
            this.genTerminalLabelInfo() +
            this.genPurposeOfTxnInfo() +
            this.genAdditionalConsumerDataReq(),
        )
      : '';
  }

  private genBillNumberInfo() {
    return this.genBasicDataStructure(
      AdditionalDataFieldID.BILL_NUMBER,
      this.data?.additionalData?.billNumber || null,
    );
  }

  private genMobileNumberInfo(): string {
    return this.genBasicDataStructure(
      AdditionalDataFieldID.MOBILE_NUMBER,
      this.data?.additionalData?.mobileNumber || null,
    );
  }

  private genStoreLabelInfo(): string {
    return this.genBasicDataStructure(
      AdditionalDataFieldID.STORE_LABEL,
      this.data?.additionalData?.storeLabel || null,
    );
  }

  private genLoyaltyNumberInfo(): string {
    return this.genBasicDataStructure(
      AdditionalDataFieldID.LOYALTY_NUMBER,
      this.data?.additionalData?.loyaltyNumber || null,
    );
  }

  private genreferenceLabelInfo(): string {
    return this.genBasicDataStructure(
      AdditionalDataFieldID.REFERENCE_LABEL,
      this.data?.additionalData?.referenceLabel || null,
    );
  }

  private genCustomerLabelInfo(): string {
    return this.genBasicDataStructure(
      AdditionalDataFieldID.CUSTOMER_LABEL,
      this.data?.additionalData?.customerLabel || null,
    );
  }

  private genTerminalLabelInfo(): string {
    return this.genBasicDataStructure(
      AdditionalDataFieldID.TERMINAL_LABEL,
      this.data?.additionalData?.terminalLabel || null,
    );
  }

  private genPurposeOfTxnInfo(): string {
    return this.genBasicDataStructure(
      AdditionalDataFieldID.PURPOSE_OF_TRANSACTION,
      this.data?.additionalData?.purposeOfTxn || null,
    );
  }

  private genAdditionalConsumerDataReq(): string {
    return this.genBasicDataStructure(
      AdditionalDataFieldID.ADDITIONAL_CONSUMER_DATA_REQUEST,
      this.data?.additionalData?.additionalConsumerDataReq || null,
    );
  }

  private genLanguageTemplateInfo(): string {
    return this.data.languageTemplate
      ? this.genBasicDataStructure(
          VietQrFieldID.LANGUAGE_TEMPLATE,
          this.genLanguagePreferenceInfo() +
            this.genLanguageMerchantNameInfo() +
            this.genLanguageMerchantCityInfo(),
        )
      : '';
  }

  private genLanguagePreferenceInfo(): string {
    return this.genBasicDataStructure(
      LanguageTemplateFieldID.LANGUAGE_PREFERENCE,
      this.data?.languageTemplate?.preference || null,
    );
  }

  private genLanguageMerchantNameInfo(): string {
    return this.genBasicDataStructure(
      LanguageTemplateFieldID.ALTERNATE_MERCHANT_NAME,
      this.data?.languageTemplate?.merchantName || null,
    );
  }

  private genLanguageMerchantCityInfo(): string {
    return this.genBasicDataStructure(
      LanguageTemplateFieldID.ALTERNATE_MERCHANT_CITY,
      this.data?.languageTemplate?.merchantCity || null,
    );
  }

  private calcCRCCode(value: string): string {
    const stringUtil = new StringUtil();
    const crc = new Crc(CrcType.CRC16_CCITT_FALSE);
    const bytes = stringUtil.getCharacterByteArrayFromString(value);
    return crc.compute(bytes).toHexString().substr(2);
  }
}
