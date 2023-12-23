import { VietQRFieldName, VietQrFieldID } from '../constants';
import { isANS, isNumeric } from '../utils';
import { VietQrV1Decryptor } from './vietqrv1.decryptor';

describe('VietQrV1Decryptor', () => {
  let decryptor = new VietQrV1Decryptor();
  describe('decrypt', () => {
    it('decrypt qrpush payment product', () => {
      const qrString = '00020101021238580010A00000072701300006970403011621129950446040250206QRPUSH52045812530370454061800005802VN5910PHUONG CAC6005HANOI62110307NPS686963047C1B';
      const qrData = decryptor.decrypt(qrString);

      expect(qrData).toEqual({
        version: '01',
        initMethod: '12',
        merchantAccInfo: {
          guid: 'A000000727',
          beneficiaryOrg: { acquierId: '970403', merchantId: '2112995044604025' },
          serviceCode: 'QRPUSH'
        },
        merchantCategoryCode: '5812',
        txnCurrency: 704,
        txnAmount: '180000',
        countryCode: 'VN',
        merchantName: 'PHUONG CAC',
        merchantCity: 'HANOI',
        additionalData: {
          storeLabel: 'NPS6869',
        },
        crcCode: '7C1B'
      });
    });

    it('decrypt qrpush payment product with RFU EMVCo field ', () => {
      const qrString = '00020101021238580010A00000072701300006970403011621129950446040250206QRPUSH52045812530370454061800005802VN5910PHUONG CAC6005HANOI62110307NPS68697003abc63046D58';
      const qrData = decryptor.decrypt(qrString);

      expect(qrData).toEqual({
        version: '01',
        initMethod: '12',
        merchantAccInfo: {
          guid: 'A000000727',
          beneficiaryOrg: { acquierId: '970403', merchantId: '2112995044604025' },
          serviceCode: 'QRPUSH'
        },
        merchantCategoryCode: '5812',
        txnCurrency: 704,
        txnAmount: '180000',
        countryCode: 'VN',
        merchantName: 'PHUONG CAC',
        merchantCity: 'HANOI',
        additionalData: {
          storeLabel: 'NPS6869',
        },
        crcCode: '6D58'
      });
    });
    it('decrypt cash withdrawl service', () => {
      const qrData = decryptor.decrypt('00020101021238500010A000000727012200069704030108123456780206QRCASH5204601153037045802VN5915NGUYEN HUU HUAN6005HANOI6105100006237052120190109155714228384707080000111164260002en0107shop vn0205Hanoi630476DA');

      expect(qrData).toEqual({
        version: '01',
        initMethod: '12',
        merchantAccInfo: {
          guid: 'A000000727',
          beneficiaryOrg: { acquierId: '970403', merchantId: '12345678' },
          serviceCode: 'QRCASH'
        },
        merchantCategoryCode: '6011',
        txnCurrency: 704,
        txnAmount: undefined,
        tipConvenienceIndicator: undefined,
        convenienceFeeFixed: undefined,
        convenienceFeePercentage: undefined,
        countryCode: 'VN',
        merchantName: 'NGUYEN HUU HUAN',
        merchantCity: 'HANOI',
        postalCode: '10000',
        additionalData: {
          billNumber: undefined,
          mobileNumber: undefined,
          storeLabel: undefined,
          loyaltyNumber: undefined,
          referenceLabel: '201901091557142283847',
          customerLabel: undefined,
          terminalLabel: '00001111',
          purposeOfTxn: undefined,
          additionalConsumerDataReq: undefined
        },
        languageTemplate: {
          preference: 'en',
          merchantName: 'shop vn',
          merchantCity: 'Hanoi',
        },
        crcCode: '76DA'
      });
    });
    it('should throw error by invalid checksum', () => {
      try {
        decryptor.decrypt('00020101021238500010A000000727012200069704030108123456780206QRCASH5204601153037045802VN5915NGUYEN HUU HUAN6005HANOI6105100006237052120190109155714228384707080000111164260002en0107shop vn0205Hanoi630476CD');
      } catch (err) {
        expect(err.message).toEqual('QR string has invalid Cyclic Redundency checksum.');
      }
    });
    it('should throw error by validate required fields', () => {
      try {
        decryptor.decrypt('01021238500010A000000727012200069704030108123456780206QRCASH5204601153037045802VN5915NGUYEN HUU HUAN6005HANOI6237052120190109155714228384707080000111163044C99');
      } catch (err) {
        expect(err.message).toEqual('Field version in QR string must be start with 00.');
      }
      try {
        decryptor.decrypt('00020138500010A000000727012200069704030108123456780206QRCASH5204601153037045802VN5915NGUYEN HUU HUAN6005HANOI6237052120190109155714228384707080000111163046EF0');
      } catch (err) {
        expect(err.message).toEqual('Field initial method in QR is required.')
      }
      try {
        decryptor.decrypt('00020101021253037045802VN5915NGUYEN HUU HUAN6005HANOI62370521201901091557142283847070800001111630447BE');
      } catch (err) {
        expect(err.message).toEqual('Field merchant account information in QR is required.');
      }
      try {
        decryptor.decrypt('00020101021238500010A000000727012200069704030108123456780206QRCASH520460115802VN5915NGUYEN HUU HUAN6005HANOI623705212019010915571422838470708000011116304FDB8');
      } catch (err) {
        expect(err.message).toEqual('Field currency in QR is required.');
      }
      try {
        decryptor.decrypt('00020101021238500010A000000727012200069704030108123456780206QRCASH5204601153037045915NGUYEN HUU HUAN6005HANOI6237052120190109155714228384707080000111163041028');
      } catch (err) {
        expect(err.message).toEqual('Field country code in QR is required.');
      }
    });
    it('should throw error by tip or convenience', () => {
      try {
        decryptor.decrypt('00020101021238580010A00000072701300006970403011621129950446040250206QRPUSH52045812530370454061800005502045802VN5910PHUONG CAC6005HANOI62110307NPS68696304A6A4');
      } catch (err) {
        expect(err.message).toEqual('Value of tip or convenience indicator is invalid');
      }

      try {
        decryptor.decrypt('00020101021238580010A00000072701300006970403011621129950446040250206QRPUSH520458125303704540618000055020257035.05802VN5910PHUONG CAC6005HANOI62110307NPS686963047EA0');
      } catch (err) {
        expect(err.message).toEqual('value of convenience fee fixed in QR is required.');
      }

      try {
        decryptor.decrypt('00020101021238580010A00000072701300006970403011621129950446040250206QRPUSH52045812530370454061800005502035605100005802VN5910PHUONG CAC6005HANOI62110307NPS6869630497BE');
      } catch (err) {
        expect(err.message).toEqual('value of convenience fee percentage in QR is required.');
      }
    });
  });

  describe('decryptBeneficiaryOrg', () => {
    it('should return acquier info', () => {
      expect(decryptor.decryptBeneficiaryOrg('00069704030116970403110123456702031114')).toEqual({
        acquierId: '970403',
        merchantId: '9704031101234567',
      });
    });
    it('should be throw an Error by required field not found', () => {
      try {
        decryptor.decryptBeneficiaryOrg('01169704031101234567');
      } catch (err) {
        expect(err.message).toEqual('Field acquirer ID in Benificiary Organization is required.');
      }

      try {
        decryptor.decryptBeneficiaryOrg('0006970403');
      } catch (err) {
        expect(err.message).toEqual('Field merchant ID in Benificiary Organization is required.');
      }
    });
  });
  describe('decryptMerchantAccInfo', () => {
    it('should return value', () => {
      expect(decryptor.decryptMerchantAccInfo('0010A00000072701300006970403011697040311012345670208QRIBFTTC0303abc0')).toEqual({
        guid: 'A000000727',
        beneficiaryOrg: {
          acquierId: '970403',
          merchantId: '9704031101234567',
        },
        serviceCode: 'QRIBFTTC',
      });
    });
    it('should throw error by do not have guid field', () => {
      try {
        decryptor.decryptMerchantAccInfo('01300006970403011697040311012345670208QRIBFTTC')
      } catch (err) {
        expect(err.message).toEqual('guid in Merchant Account Information is required.');
      }
    });
    it('should throw error by do not have beneficiary organization field', () => {
      try {
        decryptor.decryptMerchantAccInfo('0010A0000007270208QRIBFTTC')
      } catch (err) {
        expect(err.message).toEqual('beneficiary Organization in Merchant Account Information is required.');
      }
    });
  });

  describe('decryptLanguageTemplate', () => {
    it('should return language template', () => {
      expect(decryptor.decryptLanguageTemplate('0002en0107shop vn0205Hanoi3')).toEqual({
        preference: 'en',
        merchantName: 'shop vn',
        merchantCity: 'Hanoi',
      });

      expect(decryptor.decryptLanguageTemplate('0002en0107shop vn0305Hanoi')).toEqual({
        preference: 'en',
        merchantName: 'shop vn',
      });
    });
    it('should throw error', () => {
      try {
        decryptor.decryptLanguageTemplate('0107shop vn0205Hanoi');
      } catch (err) {
        expect(err.message).toEqual('preference in Language Template is required.');
      }

      try {
        decryptor.decryptLanguageTemplate('0002en0305Hanoi');
      } catch (err) {
        expect(err.message).toEqual('merchant name in Language Template is required.');
      }
    });
  });
  
  describe('decryptAdditionalData', () => {
    it('should return value', () => {
      expect(decryptor.decryptAdditionalData('0106B12345021003900000010307NPS68690402100506123456060312307060011220809pay a box0901A1003abc1')).toEqual({
        billNumber: 'B12345',
        mobileNumber: '0390000001',
        storeLabel: 'NPS6869',
        loyaltyNumber: '10',
        referenceLabel: '123456',
        customerLabel: '123',
        terminalLabel: '001122',
        purposeOfTxn: 'pay a box',
        additionalConsumerDataReq: 'A',
      });
    });
  });

  describe('validateQrItem', () => {
    it('should be throw by invalid length of value', () => {
      try {
        decryptor.validateQrItem(
          'hanoi',
          10,
          'merchant city',
          {
            required: false,
            maxLength: 15,
            customValidate: isANS,
          }
        );
      } catch (err) {
        expect(err.message).toEqual('Length of merchant city is not equal to defined length in QR string.');
      }
    });
    it('should be throw error by value is empty and field is required', () => {
      try {
        decryptor.validateQrItem(
          '',
          10,
          'merchant ID',
          {
            required: true,
            maxLength: 19,
            customValidate: isANS,
          }
        );
      } catch (err) {
        expect(err.message).toEqual('Field merchant ID in QR string is required.');
      }
    });

    it('should be throw error by value length greater than max length', () => {
      try {
        decryptor.validateQrItem(
          '123435564453323423423',
          21,
          'merchant ID',
          {
            required: true,
            maxLength: 19,
            customValidate: isANS,
          }
        );
      } catch (err) {
        expect(err.message).toEqual('Length of merchant ID in QR string must be less than or equal to 19.');
      }
    });
    it('should be throw error by value length not equals to fixed length', () => {
      try {
        decryptor.validateQrItem(
          '70',
          2,
          'currency code',
          {
            required: true,
            fixedLength: 3,
            customValidate: isNumeric,
          }
        );
      } catch (err) {
        expect(err.message).toEqual('Length of currency code in QR string must be equal to 3.');
      }
    });
    it('should be throw error by value not passed custom validator', () => {
      try {
        decryptor.validateQrItem(
          'VN0',
          3,
          'currency code',
          {
            required: true,
            fixedLength: 3,
            customValidate: isNumeric,
          }
        );
      } catch (err) {
        expect(err.message).toEqual('Value of currency code is invalid');
      }
    });
  });

  describe('readQrItem', () => {
    it('should throw error by string not start with id', () => {
      try {
        decryptor.readQrItem({
          fieldId: VietQrFieldID.VERSION,
          fieldName: VietQRFieldName.VERSION,
          rawValue: '010201',
          required: true,
        });
      } catch (err) {
        expect(err.message).toEqual('Field version in QR string must be start with 00.');
      }
    })
    it('should return object without value', () => {
      const qrItem = decryptor.readQrItem({
        fieldId: VietQrFieldID.POSTAL_CODE,
        fieldName: VietQRFieldName.POSTAL_CODE,
        rawValue: '010501112',
        required: false,
      });
      expect(qrItem).toEqual({
        fieldId: VietQrFieldID.POSTAL_CODE,
        nextRawValue: '010501112',
      });
    });
    it('should throw error by wrong length', () => {
      try {
        decryptor.readQrItem({
          fieldId: VietQrFieldID.POSTAL_CODE,
          fieldName: VietQRFieldName.POSTAL_CODE,
          rawValue: '61a501112',
          required: false,
        });
      } catch (err) {
        expect(err.message).toEqual('Length of postal code in QR string is invalid.');
      }
    });
  });
  describe('ignoreUnknownQrItem', () => {
    it('should throw error by defined length of field is invalid', () => {
      try {
        decryptor.ignoreUnknownQrItem('781a00', '');
      } catch (err) {
        expect(err.message).toEqual('Length of unknown field ID 78 of QR is invalid.');
      }
    });
  });

  describe('decryptQrItem', () => {
    it('should return object without value field', () => {
      const qrItem = decryptor.decryptQrItem(
        '010501234',
        VietQrFieldID.POSTAL_CODE,
        VietQRFieldName.POSTAL_CODE,
        {
          required: false,
          customValidate: isANS,
        },
      );
      expect(qrItem).toEqual({
        fieldId: VietQrFieldID.POSTAL_CODE,
        nextRawValue: '010501234',
      })
    });
  });
});