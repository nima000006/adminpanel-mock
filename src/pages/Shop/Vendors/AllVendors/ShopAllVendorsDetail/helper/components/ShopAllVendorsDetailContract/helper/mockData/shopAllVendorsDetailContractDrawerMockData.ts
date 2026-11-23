import { ShopAllVendorsDetailContractTemplateOption } from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailContract/@types/@shopAllVendorsDetailContract";

export const SHOP_VENDOR_CONTRACT_TEMPLATE_OPTIONS: ShopAllVendorsDetailContractTemplateOption[] =
  [
    {
      id: "1",
      title: "قالب قرارداد فروش عمومی",
      service: {
        id: "service-1",
        title: "فروش کتاب",
      },
      beneficiaries: [
        {
          id: "1",
          business: "دانشگاه آزاد اسلامی",
          branch: "شعبه مرکزی",
          isSeller: false,
          sharePercent: 10,
        },
        {
          id: "2",
          business: "صمیم",
          branch: "شعبه مرکزی",
          isSeller: false,
          sharePercent: 10,
        },
        {
          id: "3",
          business: "دانشگاه آزاد اسلامی",
          branch: "تهران جنوب",
          isSeller: true,
          sharePercent: 50,
        },
        {
          id: "4",
          business: null,
          branch: null,
          isSeller: false,
          sharePercent: 30,
        },
      ],
    },
    {
      id: "2",
      title: "قالب قرارداد ناشران",
      service: {
        id: "service-1",
        title: "فروش کتاب",
      },
      beneficiaries: [
        {
          id: "1",
          business: null,
          branch: null,
          isSeller: false,
          sharePercent: 100,
        },
      ],
    },
    {
      id: "3",
      title: "قالب قرارداد دانشگاهی",
      service: {
        id: "service-1",
        title: "فروش کتاب",
      },
      beneficiaries: [
        {
          id: "1",
          business: null,
          branch: null,
          isSeller: false,
          sharePercent: 100,
        },
      ],
    },
  ];
