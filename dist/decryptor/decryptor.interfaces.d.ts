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
