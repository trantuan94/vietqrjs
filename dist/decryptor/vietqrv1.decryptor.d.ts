import { IAdditionalData, IBeneficiaryOrganiation, ILanguageTemplate, IMerchantAccountInfo, IVietQrDataV1 } from '../constants';
import { IDecryptedQrItem, IDecryptorElement, IDecryptorOptions } from './decryptor.interfaces';
export declare class VietQrV1Decryptor {
    readQrItem({ fieldId, fieldName, rawValue, required, }: IDecryptorElement): IDecryptedQrItem;
    validateQrItem(value: string, length: number, fieldName: string, options: IDecryptorOptions): void;
    decryptQrItem(rawValue: string, fieldId: string, fieldName: string, options: IDecryptorOptions): IDecryptedQrItem;
    decrypt(qrString: string): IVietQrDataV1;
    decryptMerchantAccInfo(rawStr: string): IMerchantAccountInfo;
    decryptBenificiaryOrg(rawStr: string): IBeneficiaryOrganiation;
    decryptLanguageTemplate(rawStr: string): ILanguageTemplate;
    decryptAdditionalData(rawStr: string): IAdditionalData;
    ignoreUnknownQrItem(rawValue: string, nestedFieldName: string): string;
}
