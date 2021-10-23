import {countries, currencies} from 'country-data';
import * as QRCode from 'qrcode';
import {createCanvas, loadImage} from 'canvas';

export function isValidCountryCode(countryCode: string): boolean {
  return !!countries[countryCode];
}

export function isValidCurrencyCode(currencyCode: string | number): boolean {
  return !!currencies[currencyCode];
}

export function convertCurrencyCode2Number(currencyCode: string): number {
  return isValidCurrencyCode(currencyCode) ? currencies[currencyCode].number : 0;
}

export function genDataLength(data: string | number): string {
  return typeof data === 'string' || typeof data === 'number'
    ? (('' + data).length + '').padStart(2, '0')
    : '';
}

export class StringUtil {
  private lastErrToken;

  public getLastErrorToken() {
    return this.lastErrToken;
  }

  public getCharacterByteArrayFromString(str) {
    let bytes = [];
    for (let i = 0; i < str.length; i++) {
      let charVal = str.charCodeAt(i);
      if (charVal < 256) {
        bytes[i] = str.charCodeAt(i);
      }
    }
    return bytes;
  }

  public getNumberAsHexStr(num: number): string {
    return '0x' + num.toString(16).toUpperCase();
  }

  public getNumberAsHexStrWidthBits(num: number, widthInBits): string {
    let tempStr = num.toString(16).toUpperCase();
    while (tempStr.length < widthInBits >> 2) {
      tempStr = '0' + tempStr;
    }

    return '0x' + tempStr;
  }

  public getNumberAsHexStr32(num: number): string {
    let valueHigh = num >>> 16;
    let valueLow = num & 0x0000ffff;
    return '0x' + valueHigh.toString(16).toUpperCase() + valueLow.toString(16).toUpperCase();
  }

  public getNumberAsHexStr32FixedWidth(num: number): string {
    let valueHigh = (num >>> 16).toString(16).toUpperCase();
    while (valueHigh.length < 4) {
      valueHigh = '0' + valueHigh;
    }

    let valueLow = (num & 0x0000ffff).toString(16).toUpperCase();
    while (valueLow.length < 4) {
      valueLow = '0' + valueLow;
    }

    return '0x' + valueHigh + valueLow;
  }

  public getCharacterByteArrayFromByteString(str: string): any[] {
    let bytes = [];
    let bytePos = 0;
    let splitStr = str.split(/\s+/);
    for (let i = 0; i < splitStr.length; i++) {
      let byteStr = splitStr[i];
      if (byteStr.substr(0, 2) === '0x') {
        byteStr = byteStr.substr(2, byteStr.length - 2);
      }

      if (byteStr === ' ' || byteStr === '') continue;

      let b = parseInt(byteStr, 16);
      if (b === NaN || b === undefined) {
        this.lastErrToken = byteStr;
        return undefined;
      } else {
        if (b < 256) {
          bytes[bytePos] = b;
          bytePos++;
        } else {
          this.lastErrToken = byteStr;
          return undefined;
        }
      }
    }

    return bytes;
  }

  static isBinaryString(s) {
    for (let i = 0; i < s.length; i++) {
      if (!(s[i] == '0' || s[i] == '1')) return false;
    }
    return true;
  }

  getCharacterByteArrayFromBinaryString(str) {
    let bytes = [];
    let parts = str.split(/\s+/);
    for (let strIdx = 0; strIdx < parts.length; strIdx++) {
      let strPart = parts[strIdx];
      while (strPart.length < 8) {
        strPart = '0' + strPart;
      }
      if (!StringUtil.isBinaryString(strPart)) {
        this.lastErrToken = strPart;
        return undefined;
      }
      let num = 0;
      for (let i = 0; i < 8; i++) {
        if (strPart[i] == '1') {
          num = num + (1 << (7 - i));
        }
      }
      bytes.push(num);
    }

    return bytes;
  }
}

export class UInt64 {
  private highVal;
  private lowVal;

  constructor(numOrUint64: number | UInt64, lowVal?: number) {
    if (typeof numOrUint64 === 'number') {
      this.highVal = numOrUint64 & 0xffffffff;
      this.lowVal = lowVal & 0xffffffff;
    } else {
      this.highVal = numOrUint64.highVal;
      this.lowVal = numOrUint64.lowVal;
    }
  }

  public clone() {
    return new UInt64(this);
  }

  static fromString(strHigh: string, strLow?: string) {
    let numHigh = 0,
      numLow = 0;
    if (strLow == undefined) {
      /* the first parameter string contains the whole number */
      /* remove preceeding '0x' prefix */
      if (strHigh.substr(0, 2) === '0x') {
        strHigh = strHigh.substr(2, strHigh.length - 2);
      }
      /* pad to full 16 digits */
      while (strHigh.length < 16) {
        strHigh = '0' + strHigh;
      }
      numHigh = parseInt(strHigh.substr(0, 8), 16);
      numLow = parseInt(strHigh.substr(8, 15), 16);
    } else {
      /* two 32bit numbers are provided */
      /* handle high part */
      /* remove preceeding '0x' prefix */
      if (strHigh.substr(0, 2) === '0x') {
        strHigh = strHigh.substr(2, strHigh.length - 2);
      }
      /* pad to full 8 digits */
      while (strHigh.length < 8) {
        strHigh = '0' + strHigh;
      }
      numHigh = parseInt(strHigh, 16);
      /* handle low part */
      /* remove preceeding '0x' prefix */
      if (strLow.substr(0, 2) === '0x') {
        strLow = strLow.substr(2, strLow.length - 2);
      }
      /* pad to full 8 digits */
      while (strLow.length < 8) {
        strLow = '0' + strLow;
      }
      numLow = parseInt(strLow, 16);
    }
    return new UInt64(numHigh, numLow);
  }

  public and(otherUInt64OrNumber) {
    if (typeof otherUInt64OrNumber === 'number') {
      this.highVal = 0;
      this.lowVal = this.lowVal & otherUInt64OrNumber;
    } else {
      this.highVal = this.highVal & otherUInt64OrNumber.highVal;
      this.lowVal = this.lowVal & otherUInt64OrNumber.lowVal;
    }
    return this;
  }

  public shl(dist) {
    for (let i = 0; i < dist; i++) {
      this.highVal = this.highVal << 1;
      if ((this.lowVal & 0x80000000) != 0) {
        this.highVal |= 0x01;
      }
      this.lowVal = this.lowVal << 1;
    }
    return this;
  }

  public shr(dist) {
    for (let i = 0; i < dist; i++) {
      this.lowVal = this.lowVal >>> 1;
      if ((this.highVal & 0x00000001) != 0) {
        this.lowVal |= 0x80000000;
      }
      this.highVal = this.highVal >>> 1;
    }
    return this;
  }

  public isZero() {
    return this.highVal == 0 && this.lowVal == 0;
  }

  public xor(otherUInt64) {
    this.highVal = this.highVal ^ otherUInt64.highVal;
    this.lowVal = this.lowVal ^ otherUInt64.lowVal;
    return this;
  }

  public reflect() {
    let newHighVal = 0,
      newLowVal = 0;
    for (let i = 0; i < 32; i++) {
      if ((this.highVal & (1 << (31 - i))) != 0) {
        newLowVal |= 1 << i;
      }
      if ((this.lowVal & (1 << i)) != 0) {
        newHighVal |= 1 << (31 - i);
      }
    }
    this.lowVal = newLowVal;
    this.highVal = newHighVal;
    return this;
  }

  public toHexString = function () {
    let str = '';
    let stringUtil = new StringUtil();
    str += stringUtil.getNumberAsHexStr32FixedWidth(this.highVal);
    str += stringUtil.getNumberAsHexStr32FixedWidth(this.lowVal).substring(2, 10);
    return str;
  };

  public asNumber() {
    return (this.highVal << 32) | this.lowVal;
  }
}

export async function createQRCode(dataForQRcode, center_image, width, cwidth) {
  if (!center_image) {
    center_image =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABJCAIAAAD+EZyLAAAAiXpUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjadY7LDcMwDEPvmiIj6GfKGqcIEqAbdPzIsYu2h74DSQkCITpez5O2gbCTt+hIgAtPT31U6DwxZlGW4aWT5SaVtMY1k+kMyB7sn0N3/qEZOs7wCDTs2LXa9TC7VUzovhpl45X8Ksr3V3/2C7oA9oEs7lnXZZMAAAoCaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA0LjQuMC1FeGl2MiI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iNzMiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSI3MyIKICAgdGlmZjpJbWFnZVdpZHRoPSI3MyIKICAgdGlmZjpJbWFnZUhlaWdodD0iNzMiCiAgIHRpZmY6T3JpZW50YXRpb249IjEiLz4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg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';
  }
  const canvas = createCanvas(width, width);
  QRCode.toCanvas(canvas, dataForQRcode, {
    errorCorrectionLevel: 'H',
    margin: 1,
    color: {
      dark: '#000000',
      light: '#ffffff',
    },
  });

  const ctx = canvas.getContext('2d');
  const img = await loadImage(center_image);
  const center = (width - cwidth) / 2;
  ctx.drawImage(img, center, center, cwidth, cwidth);
  return canvas.toDataURL('image/png');
}
