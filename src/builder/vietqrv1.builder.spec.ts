import { BankBIN, MerchantCategoryCode, ServiceCode } from '../constants';
import { VietQRV1Builder } from './vietqrv1.builder';

describe('VietQRV1Builder', () => {
  let vietqr = new VietQRV1Builder();

  beforeEach(() => {
    vietqr.refresh();
  });

  describe('quickBuild', () => {
    it('render static qr string with service code account number type success', () => {
      const qrString = vietqr.quickBuild({
        acquierId: BankBIN.VIETINBANK, // ID DVCNTT
        merchantId: '123456789', // Tài khoản/Số thẻ thụ hưởng
        serviceCode: ServiceCode.BY_ACCOUNT_NUMBER,
      }).getQrCodeString();
      expect(qrString).toEqual('00020101021138530010A0000007270123000697041501091234567890208QRIBFTTA53037045802VN63046376');
    });

    it('render static qr string with service code card number type success', () => {
      const qrString = vietqr.quickBuild({
        acquierId: BankBIN.VIETCOMBANK, // ID DVCNTT
        merchantId: '123456789012', // Tài khoản/Số thẻ thụ hưởng
        serviceCode: ServiceCode.BY_CARD_NUMBER,
        amount: 120000,
        txnDescription: 'Pay a box',
      }).getQrCodeString();
      expect(qrString).toContain(ServiceCode.BY_CARD_NUMBER);
      expect(qrString).toEqual('00020101021238560010A0000007270126000697043601121234567890120208QRIBFTTC530370454061200005802VN62130809Pay a box6304B8EC');
    });

    it('render static qr string with service cash withdrawl', () => {
      const qrString = vietqr.setMerchantAccountInfo({
        beneficiaryOrg: {
          acquierId: BankBIN.ACB,
          merchantId: '12345678', // ATM ID
        },
        serviceCode: ServiceCode.BY_CASH_WITHDRAWL_SERVICE,
      })
      .setMerchantName('NGUYEN VAN A')
      .setMerchantCity('HA NOI')
      .setmerchantCategoryCode(MerchantCategoryCode.FINANCIAL_INSTITUTIONS_WITH_CASH_DISBURSEMENTS)
      .setAdditionalData({
        referenceLabel: '201901091557142283847',
        terminalLabel: '00001111',
      }).build()
      .getQrCodeString();

      expect(qrString).toEqual('00020101021138500010A000000727012200069704160108123456780206QRCASH5204601153037045802VN5912NGUYEN VAN A6006HA NOI6237052120190109155714228384707080000111163049CE4');
      expect(qrString).toContain('QRCASH');
    });
  });
  
  describe('build', () => {
    it('render static qr string with service cash withdrawl', () => {
      const qrString = vietqr.setMerchantAccountInfo({
        beneficiaryOrg: {
          acquierId: BankBIN.ACB,
          merchantId: '12345678', // ATM ID
        },
        serviceCode: ServiceCode.BY_CASH_WITHDRAWL_SERVICE,
      })
      .setMerchantName('NGUYEN VAN A')
      .setMerchantCity('HA NOI')
      .setTxnCurrency()
      .setTxnCountry()
      .setmerchantCategoryCode(MerchantCategoryCode.FINANCIAL_INSTITUTIONS_WITH_CASH_DISBURSEMENTS)
      .setAdditionalData({
        referenceLabel: '201901091557142283847',
        terminalLabel: '00001111',
      }).build()
      .getQrCodeString();

      expect(qrString).toEqual('00020101021138500010A000000727012200069704160108123456780206QRCASH5204601153037045802VN5912NGUYEN VAN A6006HA NOI6237052120190109155714228384707080000111163049CE4');
      expect(qrString).toContain('QRCASH');
    });

    it('render dynamic qr string with service payment product', () => {
      const qrString = vietqr.setMerchantAccountInfo({
        beneficiaryOrg: {
          acquierId: BankBIN.ACB,
          merchantId: '12345678', // ATM ID
        },
        serviceCode: ServiceCode.BY_PRODUCT_PAYMENT_SERVICE,
      })
      .setmerchantCategoryCode(MerchantCategoryCode.EATING_PLACES_AND_RESTAURANTS)
      .setTxnAmount(120000)
      .setMerchantName('CUA HANG TIEN LOI')
      .setMerchantCity('HA NOI')
      .setPostalCode('10000')
      .setAdditionalData({
        billNumber: 'B123456',
        mobileNumber: '0390000001',
        storeLabel: 'NPS6869',
        loyaltyNumber: '10',
        referenceLabel: 'abc',
        customerLabel: 'C1123',
        terminalLabel: 'aac123',
        purposeOfTxn: 'pay a box',
        additionalConsumerDataReq: 'A',
      })
      .setLanguageTemplate({
        preference: 'en',
        merchantName: 'Shop VN',
        merchantCity: 'Hanoi',
      })
      .build().getQrCodeString();

      expect(qrString).toEqual('00020101021238500010A000000727012200069704160108123456780206QRPUSH52045812530370454061200005802VN5917CUA HANG TIEN LOI6006HA NOI61051000062860107B123456021003900000010307NPS68690402100503abc0605C11230706aac1230809pay a box0901A64260002en0107Shop VN0205Hanoi63041F97');
    });
  });
});