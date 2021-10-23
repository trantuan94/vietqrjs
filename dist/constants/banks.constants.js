"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banks = exports.BankBIN = exports.SupportLevel = void 0;
var SupportLevel;
(function (SupportLevel) {
    SupportLevel[SupportLevel["ONLY_RECEIVE"] = 0] = "ONLY_RECEIVE";
    SupportLevel[SupportLevel["COMMITED"] = 1] = "COMMITED";
    SupportLevel[SupportLevel["PARTIALLY_FEATURES"] = 2] = "PARTIALLY_FEATURES";
    SupportLevel[SupportLevel["FULL_FEATURES"] = 3] = "FULL_FEATURES";
})(SupportLevel = exports.SupportLevel || (exports.SupportLevel = {}));
var BankBIN;
(function (BankBIN) {
    BankBIN["ACB"] = "970416";
    BankBIN["VP_BANK"] = "970432";
    BankBIN["MB_BANK"] = "970422";
    BankBIN["TP_BANK"] = "970423";
    BankBIN["MSB"] = "970426";
    BankBIN["NAM_A_BANK"] = "970428";
    BankBIN["LIENVIETPOST_BANK"] = "970449";
    BankBIN["VIETCOMBANK"] = "970436";
    BankBIN["VIETINBANK"] = "970415";
    BankBIN["TIMO_BANK"] = "970454";
    BankBIN["BIDV"] = "970418";
    BankBIN["SACOMBANK"] = "970403";
    BankBIN["SEA_BANK"] = "970440";
    BankBIN["VIB_BANK"] = "970441";
    BankBIN["AGRIBANK"] = "970405";
    BankBIN["TECHCOMBANK"] = "970407";
    BankBIN["SGIC_BANK"] = "970400";
    BankBIN["DONG_A_BANK"] = "970406";
    BankBIN["GP_BANK"] = "970408";
    BankBIN["BAC_A_BANK"] = "970409";
    BankBIN["SCVN_BANK"] = "970410";
    BankBIN["PVCOM_BANK"] = "970412";
    BankBIN["OCEAN_BANK"] = "970414";
    BankBIN["NCBANK"] = "970419";
    BankBIN["VRBANK"] = "970421";
    BankBIN["SHINHAN_BANK"] = "970424";
    BankBIN["ANBINH_BANK"] = "970425";
    BankBIN["VIET_A_BANK"] = "970427";
    BankBIN["SCB"] = "970429";
    BankBIN["PG_BANK"] = "970430";
    BankBIN["EXIM_BANK"] = "970431";
    BankBIN["VIET_BANK"] = "970433";
    BankBIN["INDOVINA_BANK"] = "970434";
    BankBIN["HD_BANK"] = "970437";
    BankBIN["BAOIET_BANK"] = "970438";
    BankBIN["PUBLIC_BaNK"] = "970439";
    BankBIN["SHB_BANK"] = "970443";
    BankBIN["CB_BaNK"] = "970444";
    BankBIN["PHUONGDONG_BANK"] = "970448";
    BankBIN["KIENLONG_BANK"] = "970452";
    BankBIN["CIMB_BaNK"] = "422589";
    BankBIN["HSBC_BANK"] = "458761";
    BankBIN["DBS_BANK"] = "796500";
    BankBIN["NONGHYUP_BANK"] = "801011";
    BankBIN["HONGLEONG_BANK"] = "970442";
    BankBIN["IBKHN_BANK"] = "970455";
    BankBIN["IBKHCM_BANK"] = "970456";
    BankBIN["WOORI_BANK"] = "970457";
    BankBIN["OVERSEA_BANK"] = "970458";
    BankBIN["KOOKMIN_BANK"] = "970462";
})(BankBIN = exports.BankBIN || (exports.BankBIN = {}));
exports.Banks = [
    {
        name: 'Ngân hàng TMCP Á Châu',
        code: 'ACB',
        bin: '970416',
        shortName: 'ACB',
        logo: 'https://vietqr.net/img/ACB.6e7fe025.png',
        vietqr: SupportLevel.FULL_FEATURES,
    },
    {
        name: 'Ngân hàng TMCP Việt Nam Thịnh Vượng',
        code: 'VPB',
        bin: '970432',
        shortName: 'VPBank',
        logo: 'https://vietqr.net/img/VPB.ca2e7350.png',
        vietqr: SupportLevel.FULL_FEATURES,
    },
    {
        name: 'Ngân hàng TMCP Quân đội',
        code: 'MB',
        bin: '970422',
        shortName: 'MBBank',
        logo: 'https://vietqr.net/img/MB.f9740319.png',
        vietqr: SupportLevel.FULL_FEATURES,
    },
    {
        name: 'Ngân hàng TMCP Tiên Phong',
        code: 'TPB',
        bin: '970423',
        shortName: 'TPBank',
        logo: 'https://vietqr.net/img/TPB.883b6135.png',
        vietqr: SupportLevel.FULL_FEATURES,
    },
    {
        name: 'Ngân hàng TMCP Hàng Hải',
        code: 'MSB',
        bin: '970426',
        shortName: 'MSB',
        logo: 'https://vietqr.net/img/MSB.1b076e2a.png',
        vietqr: SupportLevel.FULL_FEATURES,
    },
    {
        name: 'Ngân hàng TMCP Nam Á',
        code: 'NAB',
        bin: '970428',
        shortName: 'NamABank',
        logo: 'https://vietqr.net/img/NAB.f74b0fa8.png',
        vietqr: SupportLevel.FULL_FEATURES,
    },
    {
        name: 'Ngân hàng TMCP Bưu Điện Liên Việt',
        code: 'LPB',
        bin: '970449',
        shortName: 'LienVietPostBank',
        logo: 'https://vietqr.net/img/LPB.07a7c83b.png',
        vietqr: SupportLevel.FULL_FEATURES,
    },
    {
        name: 'Ngân hàng TMCP Ngoại Thương Việt Nam',
        code: 'VCB',
        bin: '970436',
        shortName: 'Vietcombank',
        logo: 'https://vietqr.net/img/VCB.237d4924.png',
        vietqr: SupportLevel.FULL_FEATURES,
    },
    {
        name: 'Ngân hàng TMCP Công thương Việt Nam',
        code: 'ICB',
        bin: '970415',
        shortName: 'VietinBank',
        logo: 'https://vietqr.net/img/ICB.3d4d6760.png',
        vietqr: SupportLevel.FULL_FEATURES,
    },
    {
        name: 'Ngân hàng TMCP Bản Việt',
        code: 'VCCB',
        bin: '970454',
        shortName: 'Timo',
        logo: 'https://vietqr.net/img/VCCB.654a3506.png',
        vietqr: SupportLevel.FULL_FEATURES,
    },
    {
        name: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam',
        code: 'BIDV',
        bin: '970418',
        shortName: 'BIDV',
        logo: 'https://vietqr.net/img/BIDV.862fd58b.png',
        vietqr: SupportLevel.FULL_FEATURES,
    },
    {
        name: 'Ngân hàng TMCP Sài Gòn Thương Tín',
        code: 'STB',
        bin: '970403',
        shortName: 'Sacombank',
        logo: 'https://vietqr.net/img/STB.a03fef2c.png',
        vietqr: SupportLevel.FULL_FEATURES,
    },
    {
        name: 'Ngân hàng TMCP Đông Nam Á',
        code: 'SEAB',
        bin: '970440',
        shortName: 'SeABank',
        logo: 'https://vietqr.net/img/SEAB.1864a665.png',
        vietqr: SupportLevel.FULL_FEATURES,
    },
    {
        name: 'Ngân hàng TMCP Quốc tế Việt Nam',
        code: 'VIB',
        bin: '970441',
        shortName: 'VIB',
        logo: 'https://vietqr.net/img/VIB.4ecb28e6.png',
        vietqr: SupportLevel.FULL_FEATURES,
    },
    {
        name: 'Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam',
        code: 'VBA',
        bin: '970405',
        shortName: 'Agribank',
        logo: 'https://vietqr.net/img/VBA.d72a0e06.png',
        vietqr: SupportLevel.ONLY_RECEIVE,
    },
    {
        name: 'Ngân hàng TMCP Kỹ thương Việt Nam',
        code: 'TCB',
        bin: '970407',
        shortName: 'Techcombank',
        logo: 'https://vietqr.net/img/TCB.b2828982.png',
        vietqr: SupportLevel.ONLY_RECEIVE,
    },
    {
        name: 'Ngân hàng TMCP Sài Gòn Công Thương',
        code: 'SGICB',
        bin: '970400',
        shortName: 'SaigonBank',
        logo: 'https://vietqr.net/img/SGICB.5886546f.png',
        vietqr: SupportLevel.ONLY_RECEIVE,
    },
    {
        name: 'Ngân hàng TMCP Đông Á',
        code: 'DOB',
        bin: '970406',
        shortName: 'DongABank',
        logo: 'https://vietqr.net/img/DOB.92bbf6f4.png',
        vietqr: SupportLevel.ONLY_RECEIVE,
    },
    {
        name: 'Ngân hàng Thương mại TNHH MTV Dầu Khí Toàn Cầu',
        code: 'GPB',
        bin: '970408',
        shortName: 'GPBank',
        logo: 'https://vietqr.net/img/GPB.29bd127d.png',
        vietqr: SupportLevel.ONLY_RECEIVE,
    },
    {
        name: 'Ngân hàng TMCP Bắc Á',
        code: 'BAB',
        bin: '970409',
        shortName: 'BacABank',
        logo: 'https://vietqr.net/img/BAB.75c3a8c2.png',
        vietqr: SupportLevel.ONLY_RECEIVE,
    },
    {
        name: 'Ngân hàng TNHH MTV Standard Chartered Bank Việt Nam',
        code: 'SCVN',
        bin: '970410',
        shortName: 'StandardChartered',
        logo: 'https://vietqr.net/img/SCVN.a53976be.png',
        vietqr: SupportLevel.ONLY_RECEIVE,
    },
    {
        name: 'Ngân hàng TMCP Đại Chúng Việt Nam',
        code: 'PVCB',
        bin: '970412',
        shortName: 'PVcomBank',
        logo: 'https://vietqr.net/img/PVCB.6129f342.png',
        vietqr: SupportLevel.FULL_FEATURES,
    },
    {
        name: 'Ngân hàng Thương mại TNHH MTV Đại Dương',
        code: 'OCNB',
        bin: '970414',
        shortName: 'Oceanbank',
        logo: 'https://vietqr.net/img/OCEANBANK.f84c3119.png',
        vietqr: SupportLevel.ONLY_RECEIVE,
    },
    {
        name: 'Ngân hàng TMCP Quốc Dân',
        code: 'NCB',
        bin: '970419',
        shortName: 'NCB',
        logo: 'https://vietqr.net/img/NCB.7d8af057.png',
        vietqr: SupportLevel.FULL_FEATURES,
    },
    {
        name: 'Ngân hàng Liên doanh Việt - Nga',
        code: 'VRB',
        bin: '970421',
        shortName: 'VRB',
        logo: 'https://vietqr.net/img/VRB.9d6d40f3.png',
        vietqr: SupportLevel.ONLY_RECEIVE,
    },
    {
        name: 'Ngân hàng TNHH MTV Shinhan Việt Nam',
        code: 'SHBVN',
        bin: '970424',
        shortName: 'ShinhanBank',
        logo: 'https://vietqr.net/img/SHBVN.b6c0e806.png',
        vietqr: SupportLevel.ONLY_RECEIVE,
    },
    {
        name: 'Ngân hàng TMCP An Bình',
        code: 'ABB',
        bin: '970425',
        shortName: 'ABBANK',
        logo: 'https://vietqr.net/img/ABB.9defb03d.png',
        vietqr: SupportLevel.ONLY_RECEIVE,
    },
    {
        name: 'Ngân hàng TMCP Việt Á',
        code: 'VAB',
        bin: '970427',
        shortName: 'VietABank',
        logo: 'https://vietqr.net/img/VAB.9bf85d8e.png',
        vietqr: SupportLevel.ONLY_RECEIVE,
    },
    {
        name: 'Ngân hàng TMCP Sài Gòn',
        code: 'SCB',
        bin: '970429',
        shortName: 'SCB',
        logo: 'https://vietqr.net/img/SCB.5ca4bec4.png',
        vietqr: SupportLevel.FULL_FEATURES,
    },
    {
        name: 'Ngân hàng TMCP Xăng dầu Petrolimex',
        code: 'PGB',
        bin: '970430',
        shortName: 'PGBank',
        logo: 'https://vietqr.net/img/PGB.825cbbda.png',
        vietqr: SupportLevel.FULL_FEATURES,
    },
    {
        name: 'Ngân hàng TMCP Xuất Nhập khẩu Việt Nam',
        code: 'EIB',
        bin: '970431',
        shortName: 'Eximbank',
        logo: 'https://vietqr.net/img/EIB.ae2f0252.png',
        vietqr: SupportLevel.ONLY_RECEIVE,
    },
    {
        name: 'Ngân hàng TMCP Việt Nam Thương Tín',
        code: 'VIETBANK',
        bin: '970433',
        shortName: 'VietBank',
        logo: 'https://vietqr.net/img/VIETBANK.bb702d50.png',
        vietqr: SupportLevel.ONLY_RECEIVE,
    },
    {
        name: 'Ngân hàng TNHH Indovina',
        code: 'IVB',
        bin: '970434',
        shortName: 'IndovinaBank',
        logo: 'https://vietqr.net/img/IVB.ee79782c.png',
        vietqr: SupportLevel.ONLY_RECEIVE,
    },
    {
        name: 'Ngân hàng TMCP Phát triển Thành phố Hồ Chí Minh',
        code: 'HDB',
        bin: '970437',
        shortName: 'HDBank',
        logo: 'https://vietqr.net/img/HDB.4256e826.png',
        vietqr: SupportLevel.FULL_FEATURES,
    },
    {
        name: 'Ngân hàng TMCP Bảo Việt',
        code: 'BVB',
        bin: '970438',
        shortName: 'BaoVietBank',
        logo: 'https://vietqr.net/img/BVB.2b7aab15.png',
        vietqr: SupportLevel.ONLY_RECEIVE,
    },
    {
        name: 'Ngân hàng TNHH MTV Public Việt Nam',
        code: 'PBVN',
        bin: '970439',
        shortName: 'PublicBank',
        logo: 'https://vietqr.net/img/PBVN.67dbc9af.png',
        vietqr: SupportLevel.ONLY_RECEIVE,
    },
    {
        name: 'Ngân hàng TMCP Sài Gòn - Hà Nội',
        code: 'SHB',
        bin: '970443',
        shortName: 'SHB',
        logo: 'https://vietqr.net/img/SHB.665daa27.png',
        vietqr: SupportLevel.FULL_FEATURES,
    },
    {
        name: 'Ngân hàng Thương mại TNHH MTV Xây dựng Việt Nam',
        code: 'CBB',
        bin: '970444',
        shortName: 'CBBank',
        logo: 'https://vietqr.net/img/CBB.5b47e56f.png',
        vietqr: SupportLevel.ONLY_RECEIVE,
    },
    {
        name: 'Ngân hàng TMCP Phương Đông',
        code: 'OCB',
        bin: '970448',
        shortName: 'OCB',
        logo: 'https://vietqr.net/img/OCB.84d922d1.png',
        vietqr: SupportLevel.ONLY_RECEIVE,
    },
    {
        name: 'Ngân hàng TMCP Kiên Long',
        code: 'KLB',
        bin: '970452',
        shortName: 'KienLongBank',
        logo: 'https://vietqr.net/img/KLB.23902895.png',
        vietqr: SupportLevel.ONLY_RECEIVE,
    },
    {
        name: 'Ngân hàng TNHH MTV CIMB Việt Nam',
        code: 'CIMB',
        bin: '422589',
        shortName: 'CIMB',
        logo: 'https://vietqr.net/img/CIMB.70b35f80.png',
        vietqr: SupportLevel.ONLY_RECEIVE,
    },
    {
        name: 'Ngân hàng TNHH MTV HSBC (Việt Nam)',
        code: 'HSBC',
        bin: '458761',
        shortName: 'HSBC',
        logo: 'https://vietqr.net/img/HSBC.6fa79196.png',
        vietqr: SupportLevel.ONLY_RECEIVE,
    },
    {
        name: 'DBS Bank Ltd - Chi nhánh Thành phố Hồ Chí Minh',
        code: 'DBS',
        bin: '796500',
        shortName: 'DBSBank',
        logo: 'https://vietqr.net/img/DBS.83742b1e.png',
        vietqr: SupportLevel.ONLY_RECEIVE,
    },
    {
        name: 'Ngân hàng Nonghyup - Chi nhánh Hà Nội',
        code: 'NHB HN',
        bin: '801011',
        shortName: 'Nonghyup',
        logo: 'https://vietqr.net/img/NHB%20HN.6a3f7952.png',
        vietqr: SupportLevel.ONLY_RECEIVE,
    },
    {
        name: 'Ngân hàng TNHH MTV Hong Leong Việt Nam',
        code: 'HLBVN',
        bin: '970442',
        shortName: 'HongLeong',
        logo: 'https://vietqr.net/img/HLBVN.4a284a9a.png',
        vietqr: SupportLevel.ONLY_RECEIVE,
    },
    {
        name: 'Ngân hàng Công nghiệp Hàn Quốc - Chi nhánh Hà Nội',
        code: 'IBK - HN',
        bin: '970455',
        shortName: 'IBK Bank',
        logo: 'https://vietqr.net/img/IBK%20-%20HN.eee4e569.png',
        vietqr: SupportLevel.ONLY_RECEIVE,
    },
    {
        name: 'Ngân hàng Công nghiệp Hàn Quốc - Chi nhánh TP. Hồ Chí Minh',
        code: 'IBK - HCM',
        bin: '970456',
        shortName: 'IBK Bank',
        logo: 'https://vietqr.net/img/IBK%20-%20HN.eee4e569.png',
        vietqr: SupportLevel.ONLY_RECEIVE,
    },
    {
        name: 'Ngân hàng TNHH MTV Woori Việt Nam',
        code: 'WVN',
        bin: '970457',
        shortName: 'Woori',
        logo: 'https://vietqr.net/img/WVN.45451999.png',
        vietqr: SupportLevel.ONLY_RECEIVE,
    },
    {
        name: 'Ngân hàng United Overseas - Chi nhánh TP. Hồ Chí Minh',
        code: 'UOB',
        bin: '970458',
        shortName: 'United Overseas',
        logo: 'https://vietqr.net/img/UOB.e6a847d2.png',
        vietqr: SupportLevel.ONLY_RECEIVE,
    },
    {
        name: 'Ngân hàng Kookmin – Chi nhánh Hà Nội',
        code: 'KBHN',
        bin: '970462',
        shortName: 'Kookmin',
        logo: 'https://vietqr.net/img/KBHN.5126abce.png',
        vietqr: SupportLevel.ONLY_RECEIVE,
    },
];
//# sourceMappingURL=banks.constants.js.map