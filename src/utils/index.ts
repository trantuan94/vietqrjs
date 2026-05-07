import {crc16ccitt} from 'crc';
import * as QRCode from 'qrcode';
import {createCanvas, loadImage} from 'canvas';
import {DEFAULT_VIETQR_LOGO, ServiceCode, TipOrConvenienceIndicatorType} from '../constants';
import {ISO_3166_1_ALPHA2, ISO_4217_NUMERIC} from '../constants/iso.constants';
import {IGenerateQROptions} from '../interfaces/index';

const NUMERIC_REGEX = /^\d*$/;
const AN_REGEX = /^[a-zA-Z0-9]+$/;
const ANS_REGEX = /^[\x20-\x7E\xA0-\xA3\xA5\xA7\xA9-\xB3\xB5-\xB7\xB9-\xBB\xBF-\xFF€ŠšŽžŒœŸ]*$/;
const FLOAT_AMOUNT_REGEX = /^(0\.[1-9]|0\.\d[1-9]|[1-9](\d+)?(\.\d{0,2})?)$/;

export function getEnumKeys<T extends string | number>(e: Record<string, T>): string[] {
  const numericValues = new Set(
    Object.values(e)
      .filter((v) => typeof v === 'number')
      .map(String),
  );
  return Object.keys(e).filter((k) => !numericValues.has(k));
}

export function getEnumValues<T extends string | number>(e: Record<string, T>): T[] {
  return getEnumKeys(e).map((k) => e[k]);
}

export function isValidCountryCode(countryCode: string): boolean {
  return ISO_3166_1_ALPHA2.has(countryCode);
}

export function isValidCurrencyCode(currencyCode: string | number): boolean {
  return ISO_4217_NUMERIC.has(Number(currencyCode));
}

export function isServiceCode(serviceCode: string): boolean {
  return (getEnumValues(ServiceCode) as string[]).includes(serviceCode);
}

export function isNumeric(value: string): boolean {
  return NUMERIC_REGEX.test(value);
}

// only support check value with max 2 digits after decimal separator (currency code: 458 - MYR of Malaysia)
export function isFloatingPointAmount(value: string): boolean {
  return FLOAT_AMOUNT_REGEX.test(value);
}

export function isANS(value: string): boolean {
  return ANS_REGEX.test(value);
}

export function isAN(value: string): boolean {
  return AN_REGEX.test(value);
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
  return crc16ccitt(value).toString(16).toUpperCase().padStart(4, '0');
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
