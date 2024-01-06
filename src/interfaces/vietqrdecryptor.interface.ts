export interface IDecryptorElement {
  fieldId: string;
  fieldName: string;
  rawValue: string;
  required?: boolean;
}

export interface IDecryptorOptions {
  required?: boolean;
  maxLength?: number;
  fixedLength?: number;
  customValidate?: (value: string) => boolean;
  defaultValue?: string;
}

export interface IDecryptedQrItem {
  fieldId: string;
  nextRawValue: string;
  fieldName?: string;
  value?: string;
  length?: number;
}

export interface IDecryptedQrDataOptions {
  /**
   * Remove all decrypted data object fields is optional and have value is empty or undefined
   * @default true
   */
  lean?: boolean;
}
