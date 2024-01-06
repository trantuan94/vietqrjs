import {countries, currencies} from 'country-data';
import {crc16ccitt} from 'crc';
import * as QRCode from 'qrcode';
import {createCanvas, loadImage} from 'canvas';
import {DEFAULT_VIETQR_LOGO, ServiceCode, TipOrConvenienceIndicatorType} from '../constants';
import * as _ from 'lodash';
import {IGenerateQROptions} from '../interfaces/index';

export function getEnumKeys<T extends string | number>(e: Record<string, T>): string[] {
  return _.difference(_.keys(e), _.map(_.filter(_.values(e), _.isNumber), _.toString));
}

export function getEnumValues<T extends string | number>(e: Record<string, T>): T[] {
  return _.values(_.pick(e, getEnumKeys(e)));
}

export function isValidCountryCode(countryCode: string): boolean {
  return !!countries[countryCode];
}

export function isValidCurrencyCode(currencyCode: string | number): boolean {
  return !!currencies[currencyCode];
}

export function isServiceCode(serviceCode: string): boolean {
  return (getEnumValues(ServiceCode) as string[]).includes(serviceCode);
}

export function isNumeric(value: string): boolean {
  return /^(\d)*$/.test(value);
}

// only support check value with max 2 gigits after decimal separator(currency code: 458 - MYR of Malaysia)
export function isFloatingPointAmount(value: string): boolean {
  return /^(0\.[1-9]|0\.\d[1-9]|[1-9](\d+)?(\.\d{0,2})?)$/.test(value);
}

export function isANS(value: string): boolean {
  return /^[\x20-\x7E\xA0-\xA3\xA5\xA7\xA9-\xB3\xB5-\xB7\xB9-\xBB\xBF-\xFF\u20AC\u0160\u0161\u017D\u017E\u0152\u0153\u0178]*$/.test(
    value,
  );
}

export function isAN(value: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(value);
}

export function isValidChecksum(rawValue: string): boolean {
  const calculateString = rawValue.substring(0, rawValue.length - 4);
  const checkSumValue = rawValue.substring(rawValue.length - 4);
  return parseInt(calcCrcCheckSum(calculateString), 16) === parseInt(checkSumValue, 16);
}

export function calcQrItemDataLength(data: string | number): string {
  return typeof data === 'string' || typeof data === 'number'
    ? (('' + data).length + '').padStart(2, '0')
    : '';
}

export function calcCrcCheckSum(value: string): string {
  return crc16ccitt(value).toString(16).toUpperCase();
}

export function isTipOrConvenienceIndicator(value: string): boolean {
  return (getEnumValues(TipOrConvenienceIndicatorType) as string[]).includes(value);
}

export async function createQRCode(
  qrString: string,
  options?: IGenerateQROptions,
): Promise<string> {
  const {
    logo = DEFAULT_VIETQR_LOGO,
    width = 200,
    margin = 4,
    bgColor = '#ffffff',
    color = '#000000',
    errorCorrectionLevel = 'H',
  } = options || {};
  console.log('qr code width', width);
  const canvas = createCanvas(width, width);
  QRCode.toCanvas(canvas, qrString, {
    errorCorrectionLevel,
    margin,
    color: {
      dark: color,
      light: bgColor,
    },
  });
  const ctx = canvas.getContext('2d');
  const img = await loadImage(logo);
  const logoWidth = canvas.width / 5;
  const logoHeight = canvas.height / 5;
  const centerX = canvas.width / 2 - logoWidth / 2;
  const centerY = canvas.height / 2 - logoHeight / 2;
  ctx.drawImage(img, centerX, centerY, logoWidth, logoHeight);
  return canvas.toDataURL('image/png');
}
