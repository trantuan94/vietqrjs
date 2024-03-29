import {countries, currencies} from 'country-data';

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

// ID của các trường dữ liệu con bên trong trường dữ liệu LANGUAGE_TEMPLATE (64)
export enum LanguageTemplateFieldID {
  LANGUAGE_PREFERENCE = '00', // Ngôn ngữ thay thế
  ALTERNATE_MERCHANT_NAME = '01', // Tên ĐVCNTT dưới dạng Ngôn ngữthay thế
  ALTERNATE_MERCHANT_CITY = '02', // Thành phố dưới dạng ngôn ngữ thay thế
  // RFU for EMVCo (03 - 99)
}

export enum BeneficaryOrganizationFieldID {
  ACQUIER_ID = '00', // ID Tổ chức thụ hưởng
  MERCHANT_ID = '01', // Tài khoản thụ hưởng
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

export enum AdditionalConsumerDataReq {
  CUSTOMER_ADDRESS = 'A',
  CUSTOMER_MOBILE = 'M',
  CUSTOMER_EMAIL = 'E',
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

// Define field name for decrypt qr string

export enum VietQRFieldName {
  VERSION = 'version', // Phiên bản dữ liệu của mã QR
  INITIAL_METHOD = 'initial method', // Phương thức khởi tạo
  MERCHANT_ACCOUNT_INFO = 'merchant account information', // Thông tin định danh ĐVCNTT
  MERCHANT_CATEGORY_CODE = 'merchant category code', // Mã danh mục ĐVCNTT
  TRANSACTION_CURRENCY = 'currency', // Mã tiền tệ
  TRANSACTION_AMOUNT = 'amount', // Số tiền GD
  TIP_OR_CONVENIENCE_INDICATOR = 'tip or convenience indicator', // Chỉ thị cho Tip và Phí GD
  CONVENIENCE_FEE_FIXED = 'value of convenience fee fixed', // Giá trị phí cố định
  CONVENIENCE_FEE_PERCENTAGE = 'value of convenience fee percentage', // Giá trị phí theo tỷ lệ phần trăm
  COUNTRY_CODE = 'country code', // Mã quốc gia
  MERCHANT_NAME = 'merchant Name', // Tên đơn vị chấp nhận thanh toán (ĐVCNTT)
  MERCHANT_CITY = 'merchant city', // Thành phố của ĐVCNTT
  POSTAL_CODE = 'postal code', // Mã bưu điện
  ADDITIONAL_DATA = 'additional Data', // Thông tin bổ sung
  LANGUAGE_TEMPLATE = 'language template', // Ngôn ngữ thay thế
  CRC_CODE = 'crc checksum', // Mã checksum (Cyclic Redundancy Check)
}

export enum MerchantAccInfoFieldName {
  GUID = 'guid', // GUID định danh toàn cầu
  BENEFICIARY_ORGANIZATION = 'beneficiary Organization', // Tổ chức thụ hưởng(NHTV, TGTT)
  SERVICE_CODE = 'service code', // Mã dịch vụ (dịch vụ chuyển khoản qua thẻ / số tài khoản)
}

export enum BeneficaryOrganizationFieldName {
  ACQUIER_ID = 'acquirer ID', // ID Tổ chức thụ hưởng
  MERCHANT_ID = 'merchant ID', // Tài khoản thụ hưởng
}

export enum AdditionalDataFieldName {
  BILL_NUMBER = 'bill Number', // Số hóa đơn
  MOBILE_NUMBER = 'mobile Number', // Số điện thoại đi động
  STORE_LABEL = 'store Label', // Mã cửa hàng
  LOYALTY_NUMBER = 'loyalty Number', // Mã khách hàng thân thiết
  REFERENCE_LABEL = 'reference Label', // Mã tham chiếu
  CUSTOMER_LABEL = 'customer Label', // Mã khách hàng
  TERMINAL_LABEL = 'terminal Label', // Mã số điểm bán hàng
  PURPOSE_OF_TRANSACTION = 'purpose of transaction', // Mục đích giao dịch
  ADDITIONAL_CONSUMER_DATA_REQUEST = 'additional Consumer Data Request', // Yêu cầu dữ liệu KH bổ sung
  // RFU for EMVCo Đăng ký bởi EMVCo (10 - 49)
  // Hệ thống thanh toán cụ thể (50 - 99)
}

export enum LanguageTemplateFieldName {
  LANGUAGE_PREFERENCE = 'preference', // Ngôn ngữ thay thế
  ALTERNATE_MERCHANT_NAME = 'merchant name', // Tên ĐVCNTT dưới dạng Ngôn ngữthay thế
  ALTERNATE_MERCHANT_CITY = 'merchant city', // Thành phố dưới dạng ngôn ngữ thay thế
  // RFU for EMVCo (03 - 99)
}

export const DEFAULT_VIETQR_LOGO =
  'data:image/png;base64,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';
