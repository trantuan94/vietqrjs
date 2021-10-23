export declare enum SupportLevel {
    ONLY_RECEIVE = 0,
    COMMITED = 1,
    PARTIALLY_FEATURES = 2,
    FULL_FEATURES = 3
}
export declare enum BankBIN {
    ACB = "970416",
    VP_BANK = "970432",
    MB_BANK = "970422",
    TP_BANK = "970423",
    MSB = "970426",
    NAM_A_BANK = "970428",
    LIENVIETPOST_BANK = "970449",
    VIETCOMBANK = "970436",
    VIETINBANK = "970415",
    TIMO_BANK = "970454",
    BIDV = "970418",
    SACOMBANK = "970403",
    SEA_BANK = "970440",
    VIB_BANK = "970441",
    AGRIBANK = "970405",
    TECHCOMBANK = "970407",
    SGIC_BANK = "970400",
    DONG_A_BANK = "970406",
    GP_BANK = "970408",
    BAC_A_BANK = "970409",
    SCVN_BANK = "970410",
    PVCOM_BANK = "970412",
    OCEAN_BANK = "970414",
    NCBANK = "970419",
    VRBANK = "970421",
    SHINHAN_BANK = "970424",
    ANBINH_BANK = "970425",
    VIET_A_BANK = "970427",
    SCB = "970429",
    PG_BANK = "970430",
    EXIM_BANK = "970431",
    VIET_BANK = "970433",
    INDOVINA_BANK = "970434",
    HD_BANK = "970437",
    BAOIET_BANK = "970438",
    PUBLIC_BaNK = "970439",
    SHB_BANK = "970443",
    CB_BaNK = "970444",
    PHUONGDONG_BANK = "970448",
    KIENLONG_BANK = "970452",
    CIMB_BaNK = "422589",
    HSBC_BANK = "458761",
    DBS_BANK = "796500",
    NONGHYUP_BANK = "801011",
    HONGLEONG_BANK = "970442",
    IBKHN_BANK = "970455",
    IBKHCM_BANK = "970456",
    WOORI_BANK = "970457",
    OVERSEA_BANK = "970458",
    KOOKMIN_BANK = "970462"
}
export declare const Banks: {
    name: string;
    code: string;
    bin: string;
    shortName: string;
    logo: string;
    vietqr: SupportLevel;
}[];
