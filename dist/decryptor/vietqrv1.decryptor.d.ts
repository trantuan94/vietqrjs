import { IAdditionalData, IBeneficiaryOrganiation, ILanguageTemplate, IMerchantAccountInfo, IVietQrDataV1, IDecryptedQrDataOptions, IDecryptedQrItem, IDecryptorElement, IDecryptorOptions } from '../interfaces';
export declare class VietQrV1Decryptor {
    readQrItem({ fieldId, fieldName, rawValue, required, }: IDecryptorElement): IDecryptedQrItem;
    validateQrItem(value: string, length: number, fieldName: string, options: IDecryptorOptions): void;
    decryptQrItem(rawValue: string, fieldId: string, fieldName: string, options: IDecryptorOptions): IDecryptedQrItem;
    isValidChecksum(qrString: string): boolean;
    decrypt(qrString: string, options?: IDecryptedQrDataOptions): IVietQrDataV1;
    decryptMerchantAccInfo(rawStr: string): IMerchantAccountInfo;
    decryptBeneficiaryOrg(rawStr: string): IBeneficiaryOrganiation;
    decryptLanguageTemplate(rawStr: string, options?: IDecryptedQrDataOptions): ILanguageTemplate;
    decryptAdditionalData(rawStr: string, options?: IDecryptedQrDataOptions): IAdditionalData;
    ignoreUnknownQrItem(rawValue: string, nestedFieldName: string): string;
}
