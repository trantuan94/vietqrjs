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
  IAdditionalData,
  ILanguageTemplate,
} from '../constants/index';
import { calcQrItemDataLength, createQRCode, calcCrcCheckSum } from '../utils';

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

  public setMerchantName(merchantName: string) {
    this.data.merchantName = merchantName;

    return this;
  }

  public setMerchantCity(merchantCity: string) {
    this.data.merchantCity = merchantCity;

    return this;
  }

  public setPostalCode(postalCode: string) {
    this.data.postalCode = postalCode;

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

    return this;
  }

  public setTxnCurrency(currencyCode = DEFAULT_CURRENCY) {
    this.data.txnCurrency = currencyCode;

    return this;
  }

  public setTxnCountry(countryCode = DEFAULT_COUNTRY_CODE) {
    this.data.countryCode = countryCode;

    return this;
  }

  public setAdditionalData(additionalData: IAdditionalData) {
    this.data.additionalData = {
      ...this.data.additionalData,
      ...additionalData,
    };

    return this;
  }

  public setLanguageTemplate(languageTemplate: ILanguageTemplate) {
    this.data.languageTemplate = languageTemplate;

    return this;
  }

  public setmerchantCategoryCode(mcc: string) {
    this.data.merchantCategoryCode = mcc;

    return this;
  }

  public refresh() {
    this.initData();

    return this;
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

    this.qrCodeString = `${dataStr}${calcCrcCheckSum(dataStr)}`;

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

  private genBasicQrStringItem(fieldID: string, dt: any): string {
    return dt ? `${fieldID}${calcQrItemDataLength(dt)}${dt}` : '';
  }

  private genVersion() {
    return this.genBasicQrStringItem(VietQrFieldID.VERSION, this.data.version);
  }

  private genInitMethod() {
    return this.genBasicQrStringItem(VietQrFieldID.INITIAL_METHOD, this.data.initMethod);
  }

  private genMerchantAccInfo() {
    return this.genBasicQrStringItem(
      VietQrFieldID.MERCHANT_ACCOUNT_INFO,
      this.genGUIDInfo() + this.genBeneficiaryOrg() + this.genServiceCodeInfo(),
    );
  }

  private genGUIDInfo(): string {
    return this.genBasicQrStringItem(MerchantAccInfoFieldID.GUID, this.data.merchantAccInfo.guid);
  }

  private genBeneficiaryOrg(): string {
    return this.genBasicQrStringItem(
      MerchantAccInfoFieldID.BENEFICIARY_ORGANIZATION,
      this.genAcquierInfo() + this.genMerchantIdInfo(),
    );
  }

  private genAcquierInfo(): string {
    return this.genBasicQrStringItem(
      BeneficaryOrganizationFieldID.ACQUIER_ID,
      this.data.merchantAccInfo.beneficiaryOrg.acquierId,
    );
  }

  private genMerchantIdInfo(): string {
    return this.genBasicQrStringItem(
      BeneficaryOrganizationFieldID.MERCHANT_ID,
      this.data.merchantAccInfo.beneficiaryOrg.merchantId,
    );
  }

  private genServiceCodeInfo(): string {
    return this.genBasicQrStringItem(
      MerchantAccInfoFieldID.SERVICE_CODE,
      this.data.merchantAccInfo.serviceCode,
    );
  }

  private genCategoryCodeInfo(): string {
    return this.genBasicQrStringItem(
      VietQrFieldID.MERCHANT_CATEGORY_CODE,
      this.data.merchantCategoryCode,
    );
  }

  private genCurrencyInfo(): string {
    return this.genBasicQrStringItem(VietQrFieldID.TRANSACTION_CURRENCY, this.data.txnCurrency);
  }

  private genAmountInfo(): string {
    return this.genBasicQrStringItem(VietQrFieldID.TRANSACTION_AMOUNT, this.data.txnAmount);
  }

  private genTipOrConvenienceIndicatorInfo(): string {
    return (
      this.genBasicQrStringItem(
        VietQrFieldID.TIP_OR_CONVENIENCE_INDICATOR,
        this.data.tipConvenienceIndicator,
      ) +
      this.genConvenienceFeeFixed() +
      this.genConvenienceFeePercentage()
    );
  }

  private genConvenienceFeeFixed(): string {
    return this.data.tipConvenienceIndicator === TipOrConvenienceIndicatorType.FEE_FIXED
      ? this.genBasicQrStringItem(
          VietQrFieldID.CONVENIENCE_FEE_FIXED,
          this.data.convenienceFeeFixed,
        )
      : '';
  }

  private genConvenienceFeePercentage(): string {
    return this.data.tipConvenienceIndicator === TipOrConvenienceIndicatorType.FEE_PERCENTAGE
      ? this.genBasicQrStringItem(
          VietQrFieldID.CONVENIENCE_FEE_PERCENTAGE,
          this.data.convenienceFeePercentage,
        )
      : '';
  }

  private genCountryCodeInfo(): string {
    return this.genBasicQrStringItem(VietQrFieldID.COUNTRY_CODE, this.data.countryCode);
  }

  private genMerchantNameInfo(): string {
    return this.genBasicQrStringItem(VietQrFieldID.MERCHANT_NAME, this.data.merchantName);
  }

  private genMerchantCityInfo(): string {
    return this.genBasicQrStringItem(VietQrFieldID.MERCHANT_CITY, this.data.merchantCity);
  }

  private genPostalCodeInfo(): string {
    return this.genBasicQrStringItem(VietQrFieldID.POSTAL_CODE, this.data.postalCode);
  }

  private genAdditionalData(): string {
    return this.data.additionalData
      ? this.genBasicQrStringItem(
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
    return this.genBasicQrStringItem(
      AdditionalDataFieldID.BILL_NUMBER,
      this.data?.additionalData?.billNumber || null,
    );
  }

  private genMobileNumberInfo(): string {
    return this.genBasicQrStringItem(
      AdditionalDataFieldID.MOBILE_NUMBER,
      this.data?.additionalData?.mobileNumber || null,
    );
  }

  private genStoreLabelInfo(): string {
    return this.genBasicQrStringItem(
      AdditionalDataFieldID.STORE_LABEL,
      this.data?.additionalData?.storeLabel || null,
    );
  }

  private genLoyaltyNumberInfo(): string {
    return this.genBasicQrStringItem(
      AdditionalDataFieldID.LOYALTY_NUMBER,
      this.data?.additionalData?.loyaltyNumber || null,
    );
  }

  private genreferenceLabelInfo(): string {
    return this.genBasicQrStringItem(
      AdditionalDataFieldID.REFERENCE_LABEL,
      this.data?.additionalData?.referenceLabel || null,
    );
  }

  private genCustomerLabelInfo(): string {
    return this.genBasicQrStringItem(
      AdditionalDataFieldID.CUSTOMER_LABEL,
      this.data?.additionalData?.customerLabel || null,
    );
  }

  private genTerminalLabelInfo(): string {
    return this.genBasicQrStringItem(
      AdditionalDataFieldID.TERMINAL_LABEL,
      this.data?.additionalData?.terminalLabel || null,
    );
  }

  private genPurposeOfTxnInfo(): string {
    return this.genBasicQrStringItem(
      AdditionalDataFieldID.PURPOSE_OF_TRANSACTION,
      this.data?.additionalData?.purposeOfTxn || null,
    );
  }

  private genAdditionalConsumerDataReq(): string {
    return this.genBasicQrStringItem(
      AdditionalDataFieldID.ADDITIONAL_CONSUMER_DATA_REQUEST,
      this.data?.additionalData?.additionalConsumerDataReq || null,
    );
  }

  private genLanguageTemplateInfo(): string {
    return this.data.languageTemplate
      ? this.genBasicQrStringItem(
          VietQrFieldID.LANGUAGE_TEMPLATE,
          this.genLanguagePreferenceInfo() +
            this.genLanguageMerchantNameInfo() +
            this.genLanguageMerchantCityInfo(),
        )
      : '';
  }

  private genLanguagePreferenceInfo(): string {
    return this.genBasicQrStringItem(
      LanguageTemplateFieldID.LANGUAGE_PREFERENCE,
      this.data?.languageTemplate?.preference || null,
    );
  }

  private genLanguageMerchantNameInfo(): string {
    return this.genBasicQrStringItem(
      LanguageTemplateFieldID.ALTERNATE_MERCHANT_NAME,
      this.data?.languageTemplate?.merchantName || null,
    );
  }

  private genLanguageMerchantCityInfo(): string {
    return this.genBasicQrStringItem(
      LanguageTemplateFieldID.ALTERNATE_MERCHANT_CITY,
      this.data?.languageTemplate?.merchantCity || null,
    );
  }
}
