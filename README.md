## Installation
```bash
npm i --save vietqrjs
```

## Quickstart
```ts
import {VietQRV1Builder, BankBIN, ServiceCode} from 'vietqrjs';
const builder = new VietQRV1Builder();
const qrDataString = builder.quickBuild({
  acquierId: BankBIN.VIETINBANK, // ID DVCNTT
  merchantId: '', // Tài khoản/Số thẻ thụ hưởng
  serviceCode: ServiceCode.BY_ACCOUNT_NUMBER,
}).getQrCodeString();

```