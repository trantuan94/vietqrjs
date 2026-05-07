# VietQRJS — CLAUDE.md

TypeScript/JavaScript library implementing the VietQR/NAPAS 247 specification for generating and parsing Vietnamese banking QR codes (EMVCo standard).

Published to npm as `vietqrjs`. MIT license.

## Architecture

```
src/
├── index.ts                          Re-exports entire public API
├── builder/
│   ├── vietqrv1.builder.ts           VietQRV1Builder class — QR generation
│   └── vietqrv1.builder.spec.ts
├── decryptor/
│   ├── vietqrv1.decryptor.ts         VietQrV1Decryptor class — QR parsing
│   └── vietqrv1.decryptor.spec.ts
├── constants/
│   ├── vietqr.constants.ts           Field IDs, enums, defaults, NAPAS GUIDs
│   └── banks.constants.ts            59 Vietnamese banks with BIN codes
├── interfaces/
│   ├── vietqrbuilder.interface.ts    Builder input/option types
│   └── vietqrdecryptor.interface.ts  Decryptor element/result types
└── utils/
    ├── index.ts                      CRC-16, validators, QR image creation
    └── index.spec.ts
```

Compiled output goes to `dist/` (main entry: `dist/index.js`).

## Common Commands

```bash
npm run build        # Compile TS → dist/ (tsconfig.build.json)
npm test             # Run Jest tests
npm run test:cov     # Jest with coverage → coverage/
npm run lint         # ESLint --fix
npm run format       # Prettier on staged files
npm run release:patch / release:minor / release:major  # Bump version + npm publish
```

## Key Classes

### VietQRV1Builder

Generates VietQR strings and base64 QR images.

```typescript
// Quick build (minimal input)
const builder = new VietQRV1Builder();
const qrString = builder.quickBuild({
  acquierId: BankBIN.VIETCOMBANK,
  merchantId: '0123456789',
  serviceCode: ServiceCode.QRIBFTTA,
});

// Full build with chaining
const qrString = new VietQRV1Builder()
  .setMerchantAccountInfo({ ... })
  .setTxnAmount('50000')
  .setTxnDescription('Thanh toan')
  .build();

// Generate QR image (returns base64 PNG)
const base64 = await builder.generateQR({ width: 300, logo: true });
```

### VietQrV1Decryptor

Parses a VietQR string back to structured data.

```typescript
const decryptor = new VietQrV1Decryptor();
decryptor.isValidChecksum(qrString); // CRC-16 validation
const data = decryptor.decrypt(qrString, { lean: true }); // lean removes empty fields
```

## Public API Exports

All public symbols are re-exported from `src/index.ts`:

**Classes:** `VietQRV1Builder`, `VietQrV1Decryptor`

**Enums:** `VietQrFieldID`, `AdditionalDataFieldID`, `LanguageTemplateFieldID`, `BeneficaryOrganizationFieldID`, `VietQrVersion`, `VietQrInitiateMethod`, `ServiceCode`, `MerchantCategoryCode`, `TipOrConvenienceIndicatorType`, `AdditionalConsumerDataReq`, `GUID`, `BankBIN`, `SupportLevel`

**Constants:** `DEFAULT_CURRENCY` (704/VND), `DEFAULT_COUNTRY_CODE` ('VN'), `DEFAULT_VIETQR_LOGO`, `Banks` (array of 59 bank records)

**Interfaces:** `IVietQrDataV1`, `IMerchantAccountInfo`, `IBeneficiaryOrganiation`, `IAdditionalData`, `ILanguageTemplate`, `IBasicVietQrData`, `IGenerateQROptions`, `IDecryptedQrDataOptions`, `IDecryptedQrItem`, `IDecryptorElement`, `IDecryptorOptions`

**Utils are internal** — not re-exported from the package entry.

## QR String Format (EMVCo/VietQR)

Each field follows `{ID}{2-digit-length}{value}`, e.g. `000201` = field 00, length 02, value "01".

Top-level fields (IDs from `VietQrFieldID`):
- `00` — Payload format indicator (`01`)
- `01` — Initiate method: `11` static, `12` dynamic
- `38` — Merchant account info (NAPAS GUID + beneficiary org + service code)
- `52` — Merchant category code
- `53` — Currency (704 = VND)
- `54` — Transaction amount
- `58` — Country code (`VN`)
- `59` — Merchant name
- `60` — Merchant city
- `62` — Additional data (reference, description, etc.)
- `63` — CRC-16 CCITT checksum (always last, 4 hex chars)

## Testing

Framework: **Jest 30 + ts-jest** — test files are `*.spec.ts` co-located with source.

```bash
npm test             # All tests
npm run test:cov     # With coverage (outputs to coverage/)
```

Test reports also generated as JUnit XML (`jest.junit.xml`).

No mocking of external dependencies — tests use real VietQR string fixtures.

## Dependencies

| Package | Purpose |
|---------|---------|
| `canvas` | PNG rendering for QR image generation |
| `qrcode` | QR code string → canvas |
| `crc` | CRC-16 CCITT checksum |
| `country-data` | ISO country + currency code validation |
| `lodash` | Utility functions |

## TypeScript

- Target: `es2017`, module: `commonjs`
- `declaration: true` — `.d.ts` files generated alongside JS
- Strict mode via ESLint (`@typescript-eslint/recommended`)
- Decorators enabled (`emitDecoratorMetadata`, `experimentalDecorators`)

## Release Process

1. `npm run build` — ensure dist is up to date
2. `npm test` — all tests pass
3. `npm run release:patch|minor|major` — bumps version in package.json and publishes to npm public registry

Husky pre-commit hook runs `pretty-quick --staged` automatically.
