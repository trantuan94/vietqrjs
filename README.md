## Overview 
  This vietqrjs library support some features to render VietQR - Napas247
   - Create QR code from data: account number, account name, bank ID, bank name, transaction amount, description ...
   - Decrypt an QR string (string read from QR code image) to get information to payment.
  VietQR supports 4 service types:
    - Cash withdrawl service (QRCASH)
    - Products payment service (QRPUSH)
    - transfer by account number (QRIBFTTA)
    - transfer by card number (QRIBFTTC)
  This library be implemented follow document from NAPAS on https://vietqr.net/.
  Note: In document from Napas, some properties in Additional Data field is required with each service code type. But field additional Data template in this library only implement with all properties is optional and not validate with service code type.
## Change Logs:
- v1.1.0
  + Add VietQrV1Decryptor to support decrypt QR string to get Merchant/Consumer information.
  + Update Unit tests for VietQRV1Builder and VietQrV1Decryptor functions
- v1.0.2
  - Add new service codes: QRPUSH and QRCASH

## Installation
```bash
npm i --save vietqrjs
```

# Usage
## VietQRV1Builder
  Generate QR string from account information
### Quick generate QR string
```ts
import {VietQRV1Builder, BankBIN, ServiceCode} from 'vietqrjs';
const builder = new VietQRV1Builder();
const qrDataString = builder.quickBuild({
    acquierId: BankBIN.VIETINBANK, // ID DVCNTT
    merchantId: '', // Tài khoản/Số thẻ thụ hưởng
    serviceCode: ServiceCode.BY_ACCOUNT_NUMBER,
  }).getQrCodeString();
```
### Build an QR string to render static QR code with account number

```ts
import {VietQRV1Builder, BankBIN, ServiceCode} from 'vietqrjs';
const builder = new VietQRV1Builder();
const qrDataStr = builder.setMerchantAccountInfo({
    beneficiaryOrg: {
      acquierId: BankBIN.VIETCOMBANK,
      merchantId: '03123445xxx', // account number
    },
    serviceCode: ServiceCode.BY_ACCOUNT_NUMBER,
  })
  .build()
  .getQrCodeString();
```

### Build an QR string to render static QR code with card number
```ts
import {VietQRV1Builder, BankBIN, ServiceCode} from 'vietqrjs';
const builder = new VietQRV1Builder();
const qrDataStr = builder.setMerchantAccountInfo({
    beneficiaryOrg: {
      acquierId: BankBIN.ACB,
      merchantId: '040812344454xxx', // card number
    },
    serviceCode: ServiceCode.BY_CARD_NUMBER,
  })
  .build()
  .getQrCodeString();
```

### Build an QR string to render QR code to cash withdrawl
```ts
import {VietQRV1Builder, BankBIN, ServiceCode} from 'vietqrjs';
const vietqr = new VietQRV1Builder();
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
console.log(qrString);
// expect
// 00020101021138500010A000000727012200069704160108123456780206QRCASH5204601153037045802VN5912NGUYEN VAN A6006HA NOI6237052120190109155714228384707080000111163049CE4
```

### Build an QR string to render dynamic QR code with account number
```ts
import {VietQRV1Builder, BankBIN, ServiceCode} from 'vietqrjs';
const builder = new VietQRV1Builder();
const qrDataStr = builder.setMerchantAccountInfo({
    beneficiaryOrg: {
      acquierId: BankBIN.MB_BANK,
      merchantId: '03123445xxx', // account number
    },
    serviceCode: ServiceCode.BY_ACCOUNT_NUMBER,
  })
  .setTxnAmount(86000)
  .setMerchantName('Cua hang tien loi') // optional
  .setMerchantCity('NANOI') // optional
  .setPostalCode('10000') // optional
  .setTxnDescription('Thanh toan hoa don') // optional
  .setAdditionalData({  // optional
    billNumber: 'B123456',
    storeLabel: 'NPS124',
  })
  .build()
  .getQrCodeString();
```

## VietQrDecryptor
### Check CRC checksum of QR string
```ts
import { VietQrV1Decryptor } from 'vietqrjs';
const decryptor = new VietQrV1Decryptor();
const isValid = decryptor.isValidChecksum('00020101021238500010A000000727012200069704030108123456780206QRCASH5204601153037045802VN5915NGUYEN HUU HUAN6005HANOI6105100006237052120190109155714228384707080000111164260002en0107shop vn0205Hanoi63047611');
console.log(isValid) // false
```

### Decrypt QR string to get merchant/consumer information
```ts
import { VietQrV1Decryptor } from 'vietqrjs';
const decryptor = new VietQrV1Decryptor();
const qrData = decryptor.decrypt('00020101021238500010A000000727012200069704030108123456780206QRCASH5204601153037045802VN5915NGUYEN HUU HUAN6005HANOI6105100006237052120190109155714228384707080000111164260002en0107shop vn0205Hanoi630476DA');
console.log(qrData);
// {
//   version: '01',
//   initMethod: '12',
//   merchantAccInfo: {
//     guid: 'A000000727',
//     beneficiaryOrg: { acquierId: '970403', merchantId: '12345678' },
//     serviceCode: 'QRCASH'
//   },
//   merchantCategoryCode: '6011',
//   txnCurrency: 704,
//   txnAmount: undefined,
//   tipConvenienceIndicator: undefined,
//   convenienceFeeFixed: undefined,
//   convenienceFeePercentage: undefined,
//   countryCode: 'VN',
//   merchantName: 'NGUYEN HUU HUAN',
//   merchantCity: 'HANOI',
//   postalCode: '10000',
//   additionalData: {
//     billNumber: undefined,
//     mobileNumber: undefined,
//     storeLabel: undefined,
//     loyaltyNumber: undefined,
//     referenceLabel: '201901091557142283847',
//     customerLabel: undefined,
//     terminalLabel: '00001111',
//     purposeOfTxn: undefined,
//     additionalConsumerDataReq: undefined
//   },
//   languageTemplate: {
//     preference: 'en',
//     merchantName: 'shop vn',
//     merchantCity: 'Hanoi',
//   },
//   crcCode: '76DA'
// }
```