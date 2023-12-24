  <h1 align="center">VietQR JS</h1>
<p align="center">
  <a href="http://vietqr.net/" target="blank">
    <img src="https://minisiteb.qltns.mediacdn.vn/minisite/aa12f4ae83b041e3a4a6e97a5cd8875f-chuyentiennhanh247/assets/image/vietqr.png" width="150" alt="VietQR Logo" />
  </a> &nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://napas.com.vn/dich-vu-chuyen-tien-nhanh-napas-247-182220815095336979.htm" target="blank">
    <img src="https://minisiteb.qltns.mediacdn.vn/minisite/19f78f16d6574c6e9cbe500e822c0aac-chuyentiennhanh/assets/image/ctn-napas-logo.png" width="150" alt="Napas 247 logo">
  </a>
</p>

# Overview 
### This library be implemented follow the VietQR specified document from NAPAS on <a href="https://vietqr.net/" target="blank">vietqr.net</a>
<b>Vietqrjs</b> library supports some features:
   - Create QR string|code from data: account number, account name, bank ID, bank name, transaction amount, description ...
   - Decrypt an QR string (string read from QR code image) to get information for payment.(from v1.1.0)

<b>Vietqrjs</b> supports 4 service types:
  - Cash withdraw service (<b>QRCASH</b>)
  - Products payment service (<b>QRPUSH</b>)
  - transfer by account number (<b>QRIBFTTA</b>)
  - transfer by card number (<b>QRIBFTTC</b>)

  
<h3><b>Note:</b></h3> In document from Napas, each service code type required some properties in Additional Data field. But in this library, all properties in Additional Data field is optional and not validate it with service code type. You can write validate in your source-code if you need.

## Change Logs:
### <b>v1.1.1</b>
  - Fixed some bugs related to function check valid CRC code of QR string in Decryptor class
### <b>v1.1.0</b>
  - Add VietQrV1Decryptor to support decrypt QR string to get Merchant/Consumer information.
  - Update Unit tests for VietQRV1Builder and VietQrV1Decryptor functions
### <b>v1.0.2</b>
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
    merchantId: '', // Account number
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

## VietQrV1Decryptor (supported from v1.1.0)
  Decrypt QR string to get information for payment.
### Check CRC checksum of QR string
```ts
import { VietQrV1Decryptor } from 'vietqrjs';
const decryptor = new VietQrV1Decryptor();
const isValid = decryptor.isValidChecksum('00020101021238500010A000000727012200069704030108123456780206QRCASH5204601153037045802VN5915NGUYEN HUU HUAN6005HANOI6105100006237052120190109155714228384707080000111164260002en0107shop vn0205Hanoi63047611');
console.log(isValid) // false
```

### Decrypt QR string to get information for payment
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