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

### Buy me a coffee
If you feel my lib is useful, buy me a coffee, thanks!
MoMo Wallet transfer QR code:
<p align="left">
  <img src="./donate-account.jpg" width="200" />
</p>

## Change Logs:
### <b>v1.1.3</b>
  - Update donation information :)
### <b>v1.1.2</b>
  - Add the 2nd parameter for VietQrV1Decryptor decrypt function to support return lean|full decrypted QR data object
  - Set the setmerchantCategoryCode and getQrCodeString function in VietQRV1Builder class is deprecated, instead by setMerchantCategoryCode and getQrString function
  - Update function generateQR of VietQRV1Builder class
  - Update docs on README
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
## Interfaces
### interface IVietQrDataV1
```ts
interface IVietQrDataV1 {
  version: VietQrVersion; // ID 00
  initMethod: VietQrInitiateMethod; // ID 01
  merchantAccInfo: IMerchantAccountInfo; // ID = 38
  merchantCategoryCode?: MerchantCategoryCode | string | null | undefined; // ID 52
  txnCurrency: number; // ID 53
  txnAmount?: string; // ID 54
  tipConvenienceIndicator?: TipOrConvenienceIndicatorType | string | null | undefined; // ID 55
  convenienceFeeFixed?: StringOrNot; // ID 56
  convenienceFeePercentage?: StringOrNot; // ID 57
  countryCode: string; // ID 58
  merchantName?: StringOrNot; // ID 59
  merchantCity?: StringOrNot; // ID 60
  postalCode?: StringOrNot; // ID 61
  additionalData?: IAdditionalData | null | undefined; // ID 62
  languageTemplate?: ILanguageTemplate | null | undefined; // ID 64
  crcCode: string; // ID 63
}
```
### interface IBasicVietQrData
```ts
interface IBasicVietQrData {
  acquierId: BankBIN; // ID DVCNTT
  merchantId: string; // Tài khoản/Số thẻ thụ hưởng
  serviceCode?: ServiceCode;
  amount?: number;
  txnDescription?: string;
}
```
### interface IMerchantAccountInfo
```ts
interface IMerchantAccountInfo {
  guid?: GUID | string; // ID 38 - 00 (Required Field)
  beneficiaryOrg: IBeneficiaryOrganiation; // ID 38 - 01 (Required Field)
  serviceCode?: ServiceCode; // ID 38 - 02 (Conditional Field)
}
```
### interface IBeneficiaryOrganiation
```ts
interface IBeneficiaryOrganiation {
  acquierId: BankBIN | string; // ID 38 - 01 - 00 (Required Field)
  merchantId: string; // ID 38 - 01 - 01 (Required Field)
}
```
### interface IAdditionalData
```ts
interface IAdditionalData {
  billNumber?: StringOrNot; // ID 62 - 01 (Conditional Field)
  mobileNumber?: StringOrNot; // ID 62 - 02 (Conditional Field)
  storeLabel?: StringOrNot; // ID 62 - 03 (Optional Field)
  loyaltyNumber?: StringOrNot; // ID 62 - 04 (Optional Field)
  referenceLabel?: StringOrNot; // ID 62 - 05 (Conditional Field)
  customerLabel?: StringOrNot; // ID 62 - 06 (Conditional Field)
  terminalLabel?: StringOrNot; // ID 62 - 07 (Optional Field)
  purposeOfTxn?: StringOrNot; // ID 62 - 08 (Conditional Field)
  additionalConsumerDataReq?: StringOrNot; // ID 62 - 09 (Optional Field)
}
```
### interface ILanguageTemplate
```ts
interface ILanguageTemplate {
  preference: string; // ID 64 - 00 (Required Field)
  merchantName: string; // ID 64 - 01 (Required Field)
  merchantCity?: StringOrNot; // ID 64 - 02 (Optional Field)
}
```
### interface IDecryptedQrDataOptions
```ts
interface IDecryptedQrDataOptions {
  /**
   * Remove all decrypted data object fields is optional and have value is empty or undefined
   * @default true
   */
  lean?: boolean;
}
```
### interface 
```ts
interface IGenerateQROptions {
  logo?: string; // path to image file or base64 image string, if null will be render vietQR logo
  margin?: number; // margin of QR code and image frame. default is 4
  width?: number; // width of canvas object to draw QR code // default is 250
  bgColor?: string; // background color of QR code - default is '#ffffff'
  color?: string; // color of QR code - default is '#000000'
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'; // default is 'H'
}
```

# Usage

## VietQRV1Builder
### Functions:
- quickBuild(data; IBasicVietQrData): VietQRV1Builder; // quick build QR string from minimum required VietQR data
- getQrString(): string; // Get the result of quickbuild or build function from builder
- build(): VietQRV1Builder; // build the QR string after set some VietQR data
- refresh(): VietQRV1Builder; // Refresh VietQR data of builder to initialization 
- getQrCodeString(): string; // (deprecated) // Get the result of quickbuild or build function from builder
- generateQR(options?: IGenerateQROptions): string; // generate base64 QR image
- setMerchantAccountInfo(data: IMerchantAccountInfo): VietQRV1Builder;
- setMerchantName(merchantName: string): VietQRV1Builder;
- setMerchantCity(merchantCity: string): VietQRV1Builder;
- setTxnCurrency(currencyCode: number): VietQRV1Builder;
- setTxnCountry(countryCode: string): VietQRV1Builder;
- setMerchantCategoryCode(mcc: string): VietQRV1Builder;
- setAdditionalData(data: IAdditionalData): VietQRV1Builder;
- setLanguageTemplate(template: ILanguageTemplate): VietQRV1Builder;
- setTxnDescription(description: string): VietQRV1Builder;
- setTxnAmount(amount: number): VietQRV1Builder;
- setPostalCode(postalCode: string): VietQRV1Builder;
### Quick generate QR string

Example:
```ts
import {VietQRV1Builder, BankBIN, ServiceCode} from 'vietqrjs';
const builder = new VietQRV1Builder();
const qrDataString = builder.quickBuild({ // IBasicVietQrData
    acquierId: BankBIN.VIETINBANK, // ID DVCNTT
    merchantId: '', // Account number
    serviceCode: ServiceCode.BY_ACCOUNT_NUMBER,
  }).getQrString();
```

### Build an QR string to render static QR code with account number

 Example:
```ts
import {VietQRV1Builder, BankBIN, ServiceCode} from 'vietqrjs';
const builder = new VietQRV1Builder();
const qrDataStr = builder.setMerchantAccountInfo({
  // IMerchantAccountInfo
    beneficiaryOrg: { // IBeneficiaryOrganiation
      acquierId: BankBIN.VIETCOMBANK,
      merchantId: '03123445xxx', // account number
    },
    serviceCode: ServiceCode.BY_ACCOUNT_NUMBER,
  })
  .build()
  .getQrString();
```

### Build an QR string to render static QR code with card number
 Example:
```ts
import {VietQRV1Builder, BankBIN, ServiceCode} from 'vietqrjs';
const builder = new VietQRV1Builder();
const qrString = builder.setMerchantAccountInfo({
    beneficiaryOrg: {
      acquierId: BankBIN.ACB,
      merchantId: '040812344454xxx', // card number
    },
    serviceCode: ServiceCode.BY_CARD_NUMBER,
  })
  .build()
  .getQrString();
```

### Build an QR string to render QR code to cash withdrawl
 Example:
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
  .setMerchantCategoryCode(MerchantCategoryCode.FINANCIAL_INSTITUTIONS_WITH_CASH_DISBURSEMENTS)
  .setAdditionalData({
    referenceLabel: '201901091557142283847',
    terminalLabel: '00001111',
  }).build()
  .getQrString(); 
console.log(qrString);
// expect
// 00020101021138500010A000000727012200069704160108123456780206QRCASH5204601153037045802VN5912NGUYEN VAN A6006HA NOI6237052120190109155714228384707080000111163049CE4
```

### Build an QR string to render dynamic QR code with account number
 Example:
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
  .getQrString();
```
### Build QR code from payment account information
 Example:
 ```ts
 import {VietQRV1Builder, BankBIN, ServiceCode} from 'vietqrjs';
const builder = new VietQRV1Builder();
 const qrBase64Image = await builder
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
console.log(qrBase64Image);
// data:image/png;base64,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
 ```

<img src="data:image/png;base64,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" width="250" />

## VietQrV1Decryptor (supported from v1.1.0)
  Decrypt QR string to get information for payment.
### Check CRC checksum of QR string
  isValidChecksum(qrString: string): boolean;

 Example:
```ts
import { VietQrV1Decryptor } from 'vietqrjs';
const decryptor = new VietQrV1Decryptor();
const isValid = decryptor.isValidChecksum('00020101021238500010A000000727012200069704030108123456780206QRCASH5204601153037045802VN5915NGUYEN HUU HUAN6005HANOI6105100006237052120190109155714228384707080000111164260002en0107shop vn0205Hanoi63047611');
console.log(isValid) // false
```

### Decrypt QR string to get information for payment
decrypt(qrString: string, options?: IDecryptedQrDataOptions): IVietQrDataV1

 Example:
```ts
import { VietQrV1Decryptor } from 'vietqrjs';
const decryptor = new VietQrV1Decryptor();
// decrypt QR string and get full fields QR data 
const qrData = decryptor.decrypt(
  '00020101021238500010A000000727012200069704030108123456780206QRCASH5204601153037045802VN5915NGUYEN HUU HUAN6005HANOI6105100006237052120190109155714228384707080000111164260002en0107shop vn0205Hanoi630476DA',
  { lean: false },
);
console.log(qrData);
// {
//   version: '01',
//   initMethod: '12',
//   merchantAccInfo: {
//     guid: 'A000000727',
//     beneficiaryOrg: {
//       acquierId: '970403',
//       merchantId: '12345678'
//     },
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
const leanQrData = decryptor.decrypt(
  '00020101021238500010A000000727012200069704030108123456780206QRCASH5204601153037045802VN5915NGUYEN HUU HUAN6005HANOI6105100006237052120190109155714228384707080000111164260002en0107shop vn0205Hanoi630476DA',
);
console.log(leanQrData);
// {
//   version: '01',
//   initMethod: '12',
//   merchantAccInfo: {
//     guid: 'A000000727',
//     beneficiaryOrg: {
//       acquierId: '970403',
//       merchantId: '12345678'
//     },
//     serviceCode: 'QRCASH'
//   },
//   merchantCategoryCode: '6011',
//   txnCurrency: 704,
//   countryCode: 'VN',
//   merchantName: 'NGUYEN HUU HUAN',
//   merchantCity: 'HANOI',
//   postalCode: '10000',
//   additionalData: {
//     referenceLabel: '201901091557142283847',
//     terminalLabel: '00001111',
//   },
//   languageTemplate: {
//     preference: 'en',
//     merchantName: 'shop vn',
//     merchantCity: 'Hanoi',
//   },
//   crcCode: '76DA'
// }
```
