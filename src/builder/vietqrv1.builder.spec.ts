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
