import { ServiceCode } from '../constants';
import {
  calcCrcCheckSum,
  calcQrItemDataLength,
  getEnumKeys,
  getEnumValues,
  isAN,
  isANS,
  isFloatingPointAmount,
  isNumeric,
  isServiceCode,
  isValidChecksum,
  isValidCountryCode,
  isValidCurrencyCode,
} from './index';

describe('getEnumKeys', () => {
  it('getEnumKeys done', () => {
    const obj = {
      a: 1,
      b: 2,
    };
    const res = getEnumKeys(obj);
    expect(res).toStrictEqual(['a', 'b']);
  });
});

describe('getEnumValues', () => {
  it('getEnumValues done', () => {
    const obj = {a: 1, b: 2};
    const rs = getEnumValues(obj);
    expect(rs).toStrictEqual([1, 2]);
  });
});

describe('isValidCountryCode', () => {
  it('case valid country code should return true', () => {
    expect(isValidCountryCode('VN')).toBeTruthy();
    expect(isValidCountryCode('MY')).toBeTruthy();
  });
  it('invalid country code should return false', () => {
    expect(isValidCountryCode('a')).toBeFalsy();
    expect(isValidCountryCode('vn')).toBeFalsy();
  });
});

describe('isValidCurrencyCode', () => {
  it('should return true', () => {
    isValidCurrencyCode('704');
    isValidCurrencyCode(458);
  });
  it('should return false', () => {
    isValidCurrencyCode('74');
    isValidCurrencyCode(48);
  });
});

describe('isServiceCode', () => {
  it('should return true', () => {
    expect(isServiceCode(ServiceCode.BY_ACCOUNT_NUMBER)).toBeTruthy();
    expect(isServiceCode(ServiceCode.BY_CARD_NUMBER)).toBeTruthy();
    expect(isServiceCode(ServiceCode.BY_CASH_WITHDRAWL_SERVICE)).toBeTruthy();
    expect(isServiceCode(ServiceCode.BY_PRODUCT_PAYMENT_SERVICE)).toBeTruthy();
  });
  it('should return false', () => {
    expect(isServiceCode('FTT')).toBeFalsy();
    expect(isServiceCode('FTTA')).toBeFalsy();
  });
});

describe('isNumeric', () => {
  it('should be return true', () => {
    expect(isNumeric('122')).toBeTruthy();
  });

  it('should be return false', () => {
    expect(isNumeric('abc')).toBeFalsy();
    expect(isNumeric('12abc')).toBeFalsy();
  });
});

describe('isFloatingPointAmount', () => {
  it('should be return true', () => {
    expect(isFloatingPointAmount('12')).toBeTruthy();
    expect(isFloatingPointAmount('12.0')).toBeTruthy();
    expect(isFloatingPointAmount('12.05')).toBeTruthy();
    expect(isFloatingPointAmount('312.00')).toBeTruthy();
  });
  it('should be return false', () => {
    expect(isFloatingPointAmount('abc.de')).toBeFalsy();
    expect(isFloatingPointAmount('a2.')).toBeFalsy();
    expect(isFloatingPointAmount('a2.05')).toBeFalsy();
    expect(isFloatingPointAmount('12.0b')).toBeFalsy();
  });
});

describe('isANS', () => {
  it('valid', () => {
    expect(isANS('ABCDEFGHIKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz1234567890 ,.;:!@#&*^$&*()[]{}=+_-')).toBeTruthy();
  });

  it('is not valid', () => {
    expect(isANS('Ж')).toBeFalsy();
  });
});

describe('isAN', () => {
  it('valid', () => {
    expect(isAN('10Z')).toBeTruthy();
    expect(isAN('ABCDEFGHIKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz1234567890')).toBeTruthy();
  });

  it('is not valid', () => {
    expect(isAN('10.5.5')).toBeFalsy();
    expect(isAN('.@=+')).toBeFalsy();
    expect(isAN('ABCDEFGHIKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz1234567890 ,.;:!@#&*^$&*()[]{}=+_-')).toBeFalsy();
  });
});
describe('isValidChecksum', () => {
  it('should be return true', () => {
    expect(isValidChecksum('00020101021238500010A000000727012200069704030108123456780206QRCASH5204601153037045802VN5915NGUYEN HUU HUAN6005HANOI6237052120190109155714228384707080000111163041009')).toBeTruthy();

    expect(isValidChecksum('00020101021138570010A00000072701270006970403011200110123456780208QRIBFTTA53037045802VN6304F4E5')).toBeTruthy();

    expect(isValidChecksum('00020101021238600010A00000072701300006970403011697040311012345670208QRIBFTTC530370454061800005802VN62340107NPS68690819thanh toan don hang6304A203'))
    .toBeTruthy();
  });

  it('should be return false', () => {
    expect(isValidChecksum('00020101021238500010A000000727012200069704030108123456780206QRCASH5204601153037045802VN5915NGUYEN HUU HUAN6005HANOI623705212019010915571422838470708000011116304100A')).toBeFalsy();
    expect(isValidChecksum('00020101021238600010A00000072701300006970403011697040311012345670208QRIBFTTC530370454061800005802VN62340107NPS68690819thanh toan don hang6304A201'))
    .toBeFalsy();
  });
});

describe('calcQrItemDataLength', () => {
  it('should return valid length', () => {
    expect(calcQrItemDataLength('abc')).toEqual('03');
    expect(calcQrItemDataLength('123abc')).toEqual('06');
  });
});

describe('calcCrcCheckSum', () => {
  it('should return crc', () => {
    expect(calcCrcCheckSum('00020101021238500010A000000727012200069704030108123456780206QRCASH5204601153037045802VN5915NGUYEN HUU HUAN6005HANOI623705212019010915571422838470708000011116304')).toEqual('1009');

    expect(calcCrcCheckSum('00020101021138570010A00000072701270006970403011200110123456780208QRIBFTTA53037045802VN6304')).toEqual('F4E5')

    expect(calcCrcCheckSum('00020101021238600010A00000072701300006970403011697040311012345670208QRIBFTTC530370454061800005802VN62340107NPS68690819thanh toan don hang6304'))
    .toEqual('A203');
  });
})

