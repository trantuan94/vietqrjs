import {BankBIN, MerchantCategoryCode, ServiceCode} from '../constants';
import {VietQRV1Builder} from './vietqrv1.builder';

describe('VietQRV1Builder', () => {
  const vietqr = new VietQRV1Builder();

  beforeEach(() => {
    vietqr.refresh();
  });

  describe('quickBuild', () => {
    it('render static qr string with service code account number type success', () => {
      const qrString = vietqr
        .quickBuild({
          acquierId: BankBIN.VIETINBANK, // ID DVCNTT
          merchantId: '123456789', // Tài khoản/Số thẻ thụ hưởng
          serviceCode: ServiceCode.BY_ACCOUNT_NUMBER,
        })
        .getQrString();
      expect(qrString).toEqual(
        '00020101021138530010A0000007270123000697041501091234567890208QRIBFTTA53037045802VN63046376',
      );
    });

    it('render static qr string with service code card number type success', () => {
      const qrString = vietqr
        .quickBuild({
          acquierId: BankBIN.VIETCOMBANK, // ID DVCNTT
          merchantId: '123456789012', // Tài khoản/Số thẻ thụ hưởng
          serviceCode: ServiceCode.BY_CARD_NUMBER,
          amount: 120000,
          txnDescription: 'Pay a box',
        })
        .getQrString();
      expect(qrString).toContain(ServiceCode.BY_CARD_NUMBER);
      expect(qrString).toEqual(
        '00020101021238560010A0000007270126000697043601121234567890120208QRIBFTTC530370454061200005802VN62130809Pay a box6304B8EC',
      );
    });

    it('render static qr string with service cash withdrawl', () => {
      const qrString = vietqr
        .setMerchantAccountInfo({
          beneficiaryOrg: {
            acquierId: BankBIN.ACB,
            merchantId: '12345678', // ATM ID
          },
          serviceCode: ServiceCode.BY_CASH_WITHDRAWL_SERVICE,
        })
        .setMerchantName('NGUYEN VAN A')
        .setMerchantCity('HA NOI')
        .setMerchantCategoryCode(
          MerchantCategoryCode.FINANCIAL_INSTITUTIONS_WITH_CASH_DISBURSEMENTS,
        )
        .setAdditionalData({
          referenceLabel: '201901091557142283847',
          terminalLabel: '00001111',
        })
        .build()
        .getQrString();

      expect(qrString).toEqual(
        '00020101021138500010A000000727012200069704160108123456780206QRCASH5204601153037045802VN5912NGUYEN VAN A6006HA NOI6237052120190109155714228384707080000111163049CE4',
      );
      expect(qrString).toContain('QRCASH');
    });
  });

  describe('build', () => {
    it('render static qr string with service cash withdrawl', () => {
      const qrString = vietqr
        .setMerchantAccountInfo({
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
        .setMerchantCategoryCode(
          MerchantCategoryCode.FINANCIAL_INSTITUTIONS_WITH_CASH_DISBURSEMENTS,
        )
        .setAdditionalData({
          referenceLabel: '201901091557142283847',
          terminalLabel: '00001111',
        })
        .build()
        .getQrString();

      expect(qrString).toEqual(
        '00020101021138500010A000000727012200069704160108123456780206QRCASH5204601153037045802VN5912NGUYEN VAN A6006HA NOI6237052120190109155714228384707080000111163049CE4',
      );
      expect(qrString).toContain('QRCASH');
    });

    it('render dynamic qr string with service payment product', () => {
      const qrString = vietqr
        .setMerchantAccountInfo({
          beneficiaryOrg: {
            acquierId: BankBIN.ACB,
            merchantId: '12345678', // ATM ID
          },
          serviceCode: ServiceCode.BY_PRODUCT_PAYMENT_SERVICE,
        })
        .setMerchantCategoryCode(MerchantCategoryCode.EATING_PLACES_AND_RESTAURANTS)
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
        .build()
        .getQrString();

      expect(qrString).toEqual(
        '00020101021238500010A000000727012200069704160108123456780206QRPUSH52045812530370454061200005802VN5917CUA HANG TIEN LOI6006HA NOI61051000062860107B123456021003900000010307NPS68690402100503abc0605C11230706aac1230809pay a box0901A64260002en0107Shop VN0205Hanoi63041F97',
      );
    });
  });

  describe('generateQR', () => {
    it('generate base64 png image', async () => {
      const qrBase64Image = await vietqr
        .quickBuild({
          acquierId: BankBIN.TP_BANK, // ID DVCNTT
          merchantId: '123456789', // Tài khoản/Số thẻ thụ hưởng
          serviceCode: ServiceCode.BY_ACCOUNT_NUMBER,
        })
        .generateQR({
          width: 300,
          margin: 2,
          color: '#555555',
          bgColor: '#EEEEEE',
        });
      expect(qrBase64Image).toEqual(
        'data:image/png;base64,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',
      );
    });
  });
});
