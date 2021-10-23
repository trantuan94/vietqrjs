import {UInt64, StringUtil} from './utils';

export class CrcModel {
  public width;
  public name;
  public polynomial;
  public initial;
  public finalXor;
  public inputReflected;
  public resultReflected;

  constructor(width, name, polynomial, initial, finalXor, inputReflected, resultReflected) {
    this.width = width;
    this.name = name;

    if (width == 64) {
      this.polynomial = UInt64.fromString(polynomial);
      this.initial = UInt64.fromString(initial);
      this.finalXor = UInt64.fromString(finalXor);
    } else {
      this.polynomial = polynomial;
      this.initial = initial;
      this.finalXor = finalXor;
    }
    this.inputReflected = inputReflected;
    this.resultReflected = resultReflected;
  }
}
export enum CrcType {
  // 8
  CRC8 = 'CRC8',
  CRC8_SAE_J1850 = 'CRC8_SAE_J1850',
  CRC8_SAE_J1850_ZERO = 'CRC8_SAE_J1850_ZERO',
  CRC8_8H2F = 'CRC8_8H2F',
  CRC8_CDMA2000 = 'CRC8_CDMA2000',
  CRC8_DARC = 'CRC8_DARC',
  CRC8_DVB_S2 = 'CRC8_DVB_S2',
  CRC8_EBU = 'CRC8_EBU',
  CRC8_ICODE = 'CRC8_ICODE',
  CRC8_ITU = 'CRC8_ITU',
  CRC8_MAXIM = 'CRC8_MAXIM',
  CRC8_ROHC = 'CRC8_ROHC',
  CRC8_WCDMA = 'CRC8_WCDMA',
  // 16
  CRC16_CCIT_ZERO = 'CRC16_CCIT_ZERO',
  CRC16_ARC = 'CRC16_ARC',
  CRC16_AUG_CCITT = 'CRC16_AUG_CCITT',
  CRC16_BUYPASS = 'CRC16_BUYPASS',
  CRC16_CCITT_FALSE = 'CRC16_CCITT_FALSE',
  CRC16_CDMA2000 = 'CRC16_CDMA2000',
  CRC16_DDS_110 = 'CRC16_DDS_110',
  CRC16_DECT_R = 'CRC16_DECT_R',
  CRC16_DECT_X = 'CRC16_DECT_X',
  CRC16_DNP = 'CRC16_DNP',
  CRC16_EN_13757 = 'CRC16_EN_13757',
  CRC16_GENIBUS = 'CRC16_GENIBUS',
  CRC16_MAXIM = 'CRC16_MAXIM',
  CRC16_MCRF4XX = 'CRC16_MCRF4XX',
  CRC16_RIELLO = 'CRC16_RIELLO',
  CRC16_T10_DIF = 'CRC16_T10_DIF',
  CRC16_TELEDISK = 'CRC16_TELEDISK',
  CRC16_TMS37157 = 'CRC16_TMS37157',
  CRC16_USB = 'CRC16_USB',
  CRC16_A = 'CRC16_A',
  CRC16_KERMIT = 'CRC16_KERMIT',
  CRC16_MODBUS = 'CRC16_MODBUS',
  CRC16_X_25 = 'CRC16_X_25',
  CRC16_XMODEM = 'CRC16_XMODEM',
  // 32
  CRC32 = 'CRC32',
  CRC32_BZIP2 = 'CRC32_BZIP2',
  CRC32_C = 'CRC32_C',
  CRC32_D = 'CRC32_D',
  CRC32_MPEG2 = 'CRC32_MPEG2',
  CRC32_POSIX = 'CRC32_POSIX',
  CRC32_Q = 'CRC32_Q',
  CRC32_JAMCRC = 'CRC32_JAMCRC',
  CRC32_XFER = 'CRC32_XFER',
  // 64
  CRC64_ECMA_182 = 'CRC64_ECMA_182',
  CRC64_GO_ISO = 'CRC64_GO_ISO',
  CRC64_WE = 'CRC64_WE',
  CRC64_XZ = 'CRC64_XZ',
}

/* Known CRC algorihtms */
const CrcDatabase = [
  new CrcModel(8, CrcType.CRC8, 0x07, 0x00, 0x00, false, false),
  new CrcModel(8, CrcType.CRC8_SAE_J1850, 0x1d, 0xff, 0xff, false, false),
  new CrcModel(8, CrcType.CRC8_SAE_J1850_ZERO, 0x1d, 0x00, 0x00, false, false),
  new CrcModel(8, CrcType.CRC8_8H2F, 0x2f, 0xff, 0xff, false, false),
  new CrcModel(8, CrcType.CRC8_CDMA2000, 0x9b, 0xff, 0x00, false, false),
  new CrcModel(8, CrcType.CRC8_DARC, 0x39, 0x00, 0x00, true, true),
  new CrcModel(8, CrcType.CRC8_DVB_S2, 0xd5, 0x00, 0x00, false, false),
  new CrcModel(8, CrcType.CRC8_EBU, 0x1d, 0xff, 0x00, true, true),
  new CrcModel(8, CrcType.CRC8_ICODE, 0x1d, 0xfd, 0x00, false, false),
  new CrcModel(8, CrcType.CRC8_ITU, 0x07, 0x00, 0x55, false, false),
  new CrcModel(8, CrcType.CRC8_MAXIM, 0x31, 0x00, 0x00, true, true),
  new CrcModel(8, CrcType.CRC8_ROHC, 0x07, 0xff, 0x00, true, true),
  new CrcModel(8, CrcType.CRC8_WCDMA, 0x9b, 0x00, 0x00, true, true),

  new CrcModel(16, CrcType.CRC16_CCIT_ZERO, 0x1021, 0x0000, 0x0000, false, false),
  new CrcModel(16, CrcType.CRC16_ARC, 0x8005, 0x0000, 0x0000, true, true),
  new CrcModel(16, CrcType.CRC16_AUG_CCITT, 0x1021, 0x1d0f, 0x0000, false, false),
  new CrcModel(16, CrcType.CRC16_BUYPASS, 0x8005, 0x0000, 0x0000, false, false),
  new CrcModel(16, CrcType.CRC16_CCITT_FALSE, 0x1021, 0xffff, 0x0000, false, false),
  new CrcModel(16, CrcType.CRC16_CDMA2000, 0xc867, 0xffff, 0x0000, false, false),
  new CrcModel(16, CrcType.CRC16_DDS_110, 0x8005, 0x800d, 0x0000, false, false),
  new CrcModel(16, CrcType.CRC16_DECT_R, 0x0589, 0x0000, 0x0001, false, false),
  new CrcModel(16, CrcType.CRC16_DECT_X, 0x0589, 0x0000, 0x0000, false, false),
  new CrcModel(16, CrcType.CRC16_DNP, 0x3d65, 0x0000, 0xffff, true, true),
  new CrcModel(16, CrcType.CRC16_EN_13757, 0x3d65, 0x0000, 0xffff, false, false),
  new CrcModel(16, CrcType.CRC16_GENIBUS, 0x1021, 0xffff, 0xffff, false, false),
  new CrcModel(16, CrcType.CRC16_MAXIM, 0x8005, 0x0000, 0xffff, true, true),
  new CrcModel(16, CrcType.CRC16_MCRF4XX, 0x1021, 0xffff, 0x0000, true, true),
  new CrcModel(16, CrcType.CRC16_RIELLO, 0x1021, 0xb2aa, 0x0000, true, true),
  new CrcModel(16, CrcType.CRC16_T10_DIF, 0x8bb7, 0x0000, 0x0000, false, false),
  new CrcModel(16, CrcType.CRC16_TELEDISK, 0xa097, 0x0000, 0x0000, false, false),
  new CrcModel(16, CrcType.CRC16_TMS37157, 0x1021, 0x89ec, 0x0000, true, true),
  new CrcModel(16, CrcType.CRC16_USB, 0x8005, 0xffff, 0xffff, true, true),
  new CrcModel(16, CrcType.CRC16_A, 0x1021, 0xc6c6, 0x0000, true, true),
  new CrcModel(16, CrcType.CRC16_KERMIT, 0x1021, 0x0000, 0x0000, true, true),
  new CrcModel(16, CrcType.CRC16_MODBUS, 0x8005, 0xffff, 0x0000, true, true),
  new CrcModel(16, CrcType.CRC16_X_25, 0x1021, 0xffff, 0xffff, true, true),
  new CrcModel(16, CrcType.CRC16_XMODEM, 0x1021, 0x0000, 0x0000, false, false),

  new CrcModel(32, CrcType.CRC32, 0x04c11db7, 0xffffffff, 0xffffffff, true, true),
  new CrcModel(32, CrcType.CRC32_BZIP2, 0x04c11db7, 0xffffffff, 0xffffffff, false, false),
  new CrcModel(32, CrcType.CRC32_C, 0x1edc6f41, 0xffffffff, 0xffffffff, true, true),
  new CrcModel(32, CrcType.CRC32_D, 0xa833982b, 0xffffffff, 0xffffffff, true, true),
  new CrcModel(32, CrcType.CRC32_MPEG2, 0x04c11db7, 0xffffffff, 0x00000000, false, false),
  new CrcModel(32, CrcType.CRC32_POSIX, 0x04c11db7, 0x00000000, 0xffffffff, false, false),
  new CrcModel(32, CrcType.CRC32_Q, 0x814141ab, 0x00000000, 0x00000000, false, false),
  new CrcModel(32, CrcType.CRC32_JAMCRC, 0x04c11db7, 0xffffffff, 0x00000000, true, true),
  new CrcModel(32, CrcType.CRC32_XFER, 0x000000af, 0x00000000, 0x00000000, false, false),

  new CrcModel(
    64,
    CrcType.CRC64_ECMA_182,
    '0x42f0e1eba9ea3693',
    '0x0000000000000000',
    '0x0000000000000000',
    false,
    false,
  ),
  new CrcModel(
    64,
    CrcType.CRC64_GO_ISO,
    '0x000000000000001B',
    '0xFFFFFFFFFFFFFFFF',
    '0xFFFFFFFFFFFFFFFF',
    true,
    true,
  ),
  new CrcModel(
    64,
    CrcType.CRC64_WE,
    '0x42f0e1eba9ea3693',
    '0xFFFFFFFFFFFFFFFF',
    '0xFFFFFFFFFFFFFFFF',
    false,
    false,
  ),
  new CrcModel(
    64,
    CrcType.CRC64_XZ,
    '0x42f0e1eba9ea3693',
    '0xFFFFFFFFFFFFFFFF',
    '0xFFFFFFFFFFFFFFFF',
    true,
    true,
  ),
];

export interface CrcOptions {
  width: number;
  polynomial?: number;
  initialVal?: number;
  finalXorVal?: number;
  inputReflected?: boolean;
  resultReflected?: boolean;
}

export class Crc {
  private width;
  private polynomial;
  private initialVal;
  private finalXorVal;
  private inputReflected;
  private resultReflected;

  private crcTable; // lookup table
  private castMask;
  private msbMask;

  private _crcValue;

  constructor(options?: CrcModel | CrcType) {
    /* 'constructor' */
    if (typeof options === 'string') {
      const crcParam = CrcDatabase.find((item) => item.name === options);
      if (!crcParam) throw new Error('Not found CrcModel');
      this.width = crcParam.width;
      this.polynomial = crcParam?.polynomial;
      this.initialVal = crcParam?.initial;
      this.finalXorVal = crcParam?.finalXor;
      this.inputReflected = crcParam?.inputReflected;
      this.resultReflected = crcParam?.resultReflected;
    } else if (typeof options === 'object') {
      this.width = options.width;
      this.polynomial = options?.polynomial;
      this.initialVal = options?.initial;
      this.finalXorVal = options?.finalXor;
      this.inputReflected = options?.inputReflected;
      this.resultReflected = options?.resultReflected;
    } else {
      throw new Error('Invalid arguments');
    }

    switch (this.width) {
      case 8:
        this.castMask = 0xff;
        break;
      case 16:
        this.castMask = 0xffff;
        break;
      case 32:
        this.castMask = 0xffffffff;
        break;
      case 64:
        this.castMask = new UInt64(0xffffffff, 0xffffffff);
        break;
      default:
        throw 'Invalid CRC width';
        break;
    }
    if (this.width == 64) {
      this.msbMask = new UInt64(0x80000000, 0x00000000);
    } else {
      this.msbMask = 0x01 << (this.width - 1);
    }
    /* 'constructor' END */

    if (!this.crcTable) {
      this.calcCrcTable();
    }
  }

  public calcCrcTable() {
    this.crcTable = new Array(256);

    if (this.width == 64) {
      for (let divident = 0; divident < 256; divident++) {
        let currByte = new UInt64(0, divident);
        currByte.shl(56).and(this.castMask);
        for (let bit = 0; bit < 8; bit++) {
          if (!new UInt64(currByte).and(this.msbMask).isZero()) {
            currByte.shl(1);
            currByte.xor(this.polynomial);
          } else {
            currByte.shl(1);
          }
        }
        this.crcTable[divident] = currByte.and(this.castMask);
      }
    } else {
      for (let divident = 0; divident < 256; divident++) {
        let currByte = (divident << (this.width - 8)) & this.castMask;
        for (let bit = 0; bit < 8; bit++) {
          if ((currByte & this.msbMask) != 0) {
            currByte <<= 1;
            currByte ^= this.polynomial;
          } else {
            currByte <<= 1;
          }
        }
        this.crcTable[divident] = currByte & this.castMask;
      }
    }
  }

  public calcCrcTableReversed() {
    this.crcTable = new Array(256);

    if (this.width == 64) {
      for (let divident = 0; divident < 256; divident++) {
        let reflectedDivident = CrcUtil.reflect8(divident);

        let currByte = new UInt64(0, reflectedDivident);
        currByte.shl(56).and(this.castMask);

        for (let bit = 0; bit < 8; bit++) {
          if (!new UInt64(currByte).and(this.msbMask).isZero()) {
            currByte.shl(1);
            currByte.xor(this.polynomial);
          } else {
            currByte.shl(1);
          }
        }

        currByte = currByte.reflect();
        this.crcTable[divident] = currByte.and(this.castMask);
      }
    } else {
      for (let divident = 0; divident < 256; divident++) {
        let reflectedDivident = CrcUtil.reflect8(divident);
        let currByte = (reflectedDivident << (this.width - 8)) & this.castMask;

        for (let bit = 0; bit < 8; bit++) {
          if ((currByte & this.msbMask) != 0) {
            currByte <<= 1;
            currByte ^= this.polynomial;
          } else {
            currByte <<= 1;
          }
        }
        currByte = CrcUtil.reflectGeneric(currByte, this.width);

        this.crcTable[divident] = currByte & this.castMask;
      }
    }
  }

  public compute(bytes) {
    if (this.width == 64) {
      let crc = this.initialVal.clone();
      for (let i = 0; i < bytes.length; i++) {
        let curByte = bytes[i] & 0xff;
        if (this.inputReflected) {
          curByte = CrcUtil.reflect8(curByte);
        }

        /* update the MSB of crc value with next input byte */
        let curByteShifted56 = new UInt64(0, curByte).shl(56);
        crc.xor(curByteShifted56).and(this.castMask);

        /* this MSB byte value is the index into the lookup table */
        let pos = crc.clone().shr(56).and(0xff).asNumber();
        /* shift out this index */
        crc.shl(8).and(this.castMask);
        /* XOR-in remainder from lookup table using the calculated index */
        crc.xor(this.crcTable[pos]).and(this.castMask);
      }

      if (this.resultReflected) {
        crc.reflect();
      }
      this._crcValue = crc.xor(this.finalXorVal).and(this.castMask);
      return this;
    } else {
      let crc = this.initialVal;
      for (let i = 0; i < bytes.length; i++) {
        let curByte = bytes[i] & 0xff;

        if (this.inputReflected) {
          curByte = CrcUtil.reflect8(curByte);
        }

        /* update the MSB of crc value with next input byte */
        crc = (crc ^ (curByte << (this.width - 8))) & this.castMask;
        /* this MSB byte value is the index into the lookup table */
        let pos = (crc >> (this.width - 8)) & 0xff;
        /* shift out this index */
        crc = (crc << 8) & this.castMask;
        /* XOR-in remainder from lookup table using the calculated index */
        crc = (crc ^ this.crcTable[pos]) & this.castMask;
      }

      if (this.resultReflected) {
        crc = CrcUtil.reflectGeneric(crc, this.width);
      }
      this._crcValue = (crc ^ this.finalXorVal) & this.castMask;

      return this;
    }
  }

  public getLookupTable() {
    return this.crcTable;
  }

  public toHexString(): string {
    if (this.width === 64) {
      return this._crcValue.toHexString();
    } else if (this.width === 32) {
      return new StringUtil().getNumberAsHexStr32FixedWidth(this._crcValue);
    } else {
      return new StringUtil().getNumberAsHexStr(this._crcValue);
    }
  }
}

export class CrcUtil {
  static reflect8(val) {
    let resByte = 0;
    for (let i = 0; i < 8; i++) {
      if ((val & (1 << i)) != 0) {
        resByte |= (1 << (7 - i)) & 0xff;
      }
    }

    return resByte;
  }

  static reflect16(val) {
    let resByte = 0;
    for (let i = 0; i < 16; i++) {
      if ((val & (1 << i)) != 0) {
        resByte |= (1 << (15 - i)) & 0xffff;
      }
    }

    return resByte;
  }

  static reflect32(val) {
    let resByte = 0;
    for (let i = 0; i < 32; i++) {
      if ((val & (1 << i)) != 0) {
        resByte |= (1 << (31 - i)) & 0xffffffff;
      }
    }

    return resByte;
  }

  static reflectGeneric(val, width) {
    let resByte = 0;
    for (let i = 0; i < width; i++) {
      if ((val & (1 << i)) != 0) {
        resByte |= 1 << (width - 1 - i);
      }
    }

    return resByte;
  }
}

export function getDataBaseEntryFromEntry(width, indexToFind) {
  let curIndex = 0;
  for (let i = 0; i < CrcDatabase.length; i++) {
    if (width != CrcDatabase[i].width) continue;
    if (curIndex == indexToFind) {
      return CrcDatabase[i];
    } else {
      curIndex++;
    }
  }
  throw 'Invalid selected index into CRC database';
}
