import {countries, currencies} from 'country-data';
import {BankBIN} from './banks.constants';

export enum VietQrFieldID {
  VERSION = '00', // Phiên bản dữ liệu của mã QR
  INITIAL_METHOD = '01', // Phương thức khởi tạo
  MERCHANT_ACCOUNT_INFO = '38', // Thông tin định danh ĐVCNTT
  MERCHANT_CATEGORY_CODE = '52', // Mã danh mục ĐVCNTT
  TRANSACTION_CURRENCY = '53', // Mã tiền tệ
  TRANSACTION_AMOUNT = '54', // Số tiền GD
  TIP_OR_CONVENIENCE_INDICATOR = '55', // Chỉ thị cho Tip và Phí GD
  CONVENIENCE_FEE_FIXED = '56', // Giá trị phí cố định
  CONVENIENCE_FEE_PERCENTAGE = '57', // Giá trị phí theo tỷ lệ phần trăm
  COUNTRY_CODE = '58', // Mã quốc gia
  MERCHANT_NAME = '59', // Tên đơn vị chấp nhận thanh toán (ĐVCNTT)
  MERCHANT_CITY = '60', // Thành phố của ĐVCNTT
  POSTAL_CODE = '61', // Mã bưu điện
  ADDITIONAL_DATA = '62', // Thông tin bổ sung
  LANGUAGE_TEMPLATE = '64', // Ngôn ngữ thay thế
  CRC_CODE = '63', // Mã checksum (Cyclic Redundancy Check)
  // Đăng ký bởi EMVCo (65 - 79)
  // Các thông tin bổ sung đăng ký dùng trong tương lai.(80 - 99)
}

// Các trường dữ liệu cho trường gốc ADDITIONAL_DATA (62)
export enum AdditionalDataFieldID {
  BILL_NUMBER = '01', // Số hóa đơn
  MOBILE_NUMBER = '02', // Số điện thoại đi động
  STORE_LABEL = '03', // Mã cửa hàng
  LOYALTY_NUMBER = '04', // Mã khách hàng thân thiết
  REFERENCE_LABEL = '05', // Mã tham chiếu
  CUSTOMER_LABEL = '06', // Mã khách hàng
  TERMINAL_LABEL = '07', // Mã số điểm bán hàng
  PURPOSE_OF_TRANSACTION = '08', // Mục đích giao dịch
  ADDITIONAL_CONSUMER_DATA_REQUEST = '09', // Yêu cầu dữ liệu KH bổ sung
  // RFU for EMVCo Đăng ký bởi EMVCo (10 - 49)
  // Hệ thống thanh toán cụ thể (50 - 99)
}

export enum AdditionalConsumerDataReq {
  CUSTOMER_ADDRESS = 'A',
  CUSTOMER_MOBILE = 'M',
  CUSTOMER_EMAIL = 'E',
}

// ID của các trường dữ liệu con bên trong trường dữ liệu LANGUAGE_TEMPLATE (64)
export enum LanguageTemplateFieldID {
  LANGUAGE_PREFERENCE = '00', // Ngôn ngữ thay thế
  ALTERNATE_MERCHANT_NAME = '01', // Tên ĐVCNTT dưới dạng Ngôn ngữthay thế
  ALTERNATE_MERCHANT_CITY = '02', // Thành phố dưới dạng ngôn ngữ thay thế
  // RFU for EMVCo (03 - 99)
}

export enum VietQrVersion {
  V1 = '01',
}

export enum VietQrInitiateMethod {
  STATIC = '11', // Mã QR cho nhiều lần giao dịch
  DYNAMIC = '12', // Mã QR cho 1 giao dịch cụ thể
}

export enum MerchantAccInfoFieldID {
  GUID = '00', // GUID định danh toàn cầu
  BENEFICIARY_ORGANIZATION = '01', // Tổ chức thụ hưởng(NHTV, TGTT)
  SERVICE_CODE = '02', // Mã dịch vụ (dịch vụ chuyển khoản qua thẻ / số tài khoản)
}

export enum BeneficaryOrganizationFieldID {
  ACQUIER_ID = '00', // ID Tổ chức thụ hưởng
  MERCHANT_ID = '01', // Tài khoản thụ hưởng
}

export enum ServiceCode {
  BY_PRODUCT_PAYMENT_SERVICE = 'QRPUSH', // dịch vụ thanh toán mua hàng
  BY_CASH_WITHDRAWL_SERVICE = 'QRCASH', // dịch vụ rút tiền mặt tại cây ATM bằng QR code
  BY_ACCOUNT_NUMBER = 'QRIBFTTA', // dịch vụ chuyển nhanh NAPAS247 bằng mã QR đến Tài khoản
  BY_CARD_NUMBER = 'QRIBFTTC', // dịch vụ chuyển nhanh NAPAS247 bằng mã QR đến thẻ
}

export enum GUID {
  NAPAS = 'A000000727',
}

export enum MerchantCategoryCode {
  COMMERCIAL_FOOTWEAR = '5139', // Giày dép
  BOOKS_PERIODICAL_NEWSPAPERS = '5192', // Sách, ấn phẩm định kỳ và báo chí
  GLASS_PAINT_WALLPAPER_STORES = '5231', // Kính, sơn và giấy dán tường
  SUPERMARKET_GROCERY_STORES = '5411', // Siêu thị và Tạp hóa
  MENS_CLOTHING_AND_ACCESSORIES_STORES = '5611', // Quần áo và và phụ kiện cho Nam
  WOMENS_READY_TO_WEAR_STORES = '5621', // Hàng hiệu trang phục cho Nữ
  WOMENS_ACCESSORIES_STORES = '5631', // Phụ kiện cho Nữ
  CHILDREN_AND_INFANT_WEAR_STORES = '5641', // Quần áo trẻ em và trẻ sơ sinh
  FAMILY_CLOTHING_STORES = '5651', // Quần áo gia đình
  SHOE_STORES = '5661', // Giầy
  MEN_AND_WOMEN_CLOTHING_STORES = '5691', // Quần áo nam và nữ
  COMPUTER_SOFTWARE_STORES = '5734', // Cửa hàng kinh doanh phần mềm máy tính
  EATING_PLACES_AND_RESTAURANTS = '5812', // Địa điểm ăn uống và nhà hàng
  DRINKING_PLACES_WITH_ALCOHOLIC_BEVERAGES = '5813', // Địa điểm uống (đồ uống có cồn) quán bar, quán rượu, câu lạc bộ đêm & vũ trường
  FAST_FOOD_RESTAURANTS = '5814', // Cửa hàng bán đồ ăn nhanh
  DRUG_STORES_AND_PHARMACIES = '5912', // Cửa hàng thuốc và nhà thuốc
  PACKAGE_STORES_WITH_BEER_WINE_LIQUOR = '5921', // Cửa hàng bia, rượu và đồ uống có cồn
  ANTIQUE_SHOPS = '5832', // Đồ cổ, dịch vụ sửa chữa và phục hồi
  BICYCLE_SHOPS = '5940', // Cửa hàng xe đạp
  SPORTING_GOODS_STORES = '5941', // Đồ thể thao
  BOOK_STORES = '5942', // Cửa hàng sách
  STATIONERY_OFFICE_AND_SCHOOL_SUPPLY_STORES = '5943', // Văn phòng phẩm và đồ đùng học tập
  WATCH_JEWELRY_SILVERWEAR_STORES = '5944', // Đồng hồ, trang sức và đá quý
  HOBBY_TOY_AND_GAME_SHOPS = '5945', // Đồ chơi và trò chơi điện tử
  CAMERA_AND_PHOTOGRAPHIC_SUPPLY_STORES = '5946', // Máy ảnh và phục kiện nhiếp ảnh
  CARD_GIFT_NOVELTY_AND_SOUVERNIR_SHOPS = '5947', // Quà tặng và đồ lưu niệm
  COSMETIC_STORES = '5977', // Mỹ phẩm
  FLORISTS = '5992', // Cửa hàng Hoa
  PET_AND_SUPPLY_STORES = '5995', // Thú cưng và thực phẩm thú cưng
  FINANCIAL_INSTITUTIONS_WITH_CASH_DISBURSEMENTS = '6011', // Tổ chức tài chính – rút tiền mặt
  LODGING_HOTEL_AND_RESORT_SERVICE = '7011', // Nhà nghỉ - khách sạn, khu nghỉ mát
  LAUNDRY_SERVICE = '7211', // Dịch vụ giặt ủi
  DRY_CLEANER = '7216', // Giặt khô
  HEALTH_AND_BEAUTY_SHOPS = '7298', // Cửa hàng chăm sóc sức khỏe và làm đẹp
  HOSPITALS = '8062', // Bệnh viện
}

export enum TipOrConvenienceIndicatorType {
  INPUT_TIP = '01', // Khách hàng nhập số tiền tip
  FEE_FIXED = '02', // ĐVCNTT thu phí cố định quy định tại ID 56
  FEE_PERCENTAGE = '03', // ĐVCNTT thu phí theo tỉ lệ % giao dịch quy định tại ID 57
}

export const DEFAULT_CURRENCY = currencies.VND.number;
export const DEFAULT_COUNTRY_CODE = countries.VN.alpha2;

export type StringOrNot = string | null | undefined;

export type NumberOrNot = number | null | undefined;

export interface IBeneficiaryOrganiation {
  acquierId: string; // ID 38 - 01 - 00 (Required Field)
  merchantId: string; // ID 38 - 01 - 01 (Required Field)
}

export interface IMerchantAccountInfo {
  guid?: GUID; // ID 38 - 00 (Required Field)
  beneficiaryOrg: IBeneficiaryOrganiation; // ID 38 - 01 (Required Field)
  serviceCode?: ServiceCode; // ID 38 - 02 (Conditional Field)
}

export interface IAdditionalData {
  billNumber?: StringOrNot; // ID 62 - 01 (Conditional Field)
  mobileNumber?: StringOrNot; // ID 62 - 02 (Conditional Field)
  storeLabel?: StringOrNot; // ID 62 - 03 (Optional Field)
  loyaltyNumber?: StringOrNot; // ID 62 - 04 (Optional Field)
  referenceLabel?: StringOrNot; // ID 62 - 05 (Conditional Field)
  customerLabel?: StringOrNot; // ID 62 - 06 (Conditional Field)
  terminalLabel?: StringOrNot; // ID 62 - 07 (Optional Field)
  purposeOfTxn?: StringOrNot; // ID 62 - 08 (Conditional Field)
  additionalConsumerDataReq?: StringOrNot; // ID 62 - 09 (Optional Field)
}

export interface ILanguageTemplate {
  preference: string; // ID 64 - 00 (Required Field)
  merchantName: string; // ID 64 - 01 (Required Field)
  merchantCity?: StringOrNot; // ID 64 - 02 (Optional Field)
}

export interface IVietQrDataV1 {
  version: VietQrVersion; // ID 00
  initMethod: VietQrInitiateMethod; // ID 01
  merchantAccInfo: IMerchantAccountInfo; // ID = 38
  merchantCategoryCode?: MerchantCategoryCode | null | undefined; // ID 52
  txnCurrency: number; // ID 53
  txnAmount: string; // ID 54
  tipConvenienceIndicator?: TipOrConvenienceIndicatorType | null | undefined; // ID 55
  convenienceFeeFixed?: StringOrNot; // ID 56
  convenienceFeePercentage?: StringOrNot; // ID 57
  countryCode: string; // ID 58
  merchantName?: StringOrNot; // ID 59
  merchantCity?: StringOrNot; // ID 60
  postalCode?: StringOrNot; // ID 61
  additionalData?: IAdditionalData | null | undefined; // ID 62
  languageTemplate?: ILanguageTemplate | null | undefined; // ID 64
  crcCode: string; // ID 63
}

export interface IBasicVietQrData {
  acquierId: BankBIN; // ID DVCNTT
  merchantId: string; // Tài khoản/Số thẻ thụ hưởng
  serviceCode?: ServiceCode;
  amount?: number;
  txnDescription?: string;
}
