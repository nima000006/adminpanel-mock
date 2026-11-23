import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { emptyString } from "@infra/config/global.vars";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { ProductResponse } from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsDocuments/@types/@factorsAndDocsDebtDocuments";

const FactorsAndDocsFactorDetailsTableModel = (): CustomColumnType<ProductResponse>[] => {
  return [
    {
      title: "شناسه کالا / خدمت",
      dataIndex: "id",
      key: "id",
      width: 130,
    },
    {
      title: "شرح کالا / خدمت",
      dataIndex: "productName",
      key: "productName",
      width: 250,
      render: (value: string, records: ProductResponse) => (
        <> {`${value}  /  ${records?.productDescription}`} </>
      ),
    },
    {
      title: "تعداد / مقدار",
      dataIndex: "quantity",
      key: "quantity",
      width: 120,
    },
    {
      title: "مبلغ واحد",
      dataIndex: "price",
      key: "price",
      width: 110,
      render: (value: number) =>
        `${dataPlaceHolder({ data: value?.toString() ?? "", isPrice: true, isRial: true })} تومان`,
    },
    {
      title: "مبلغ تخفیف",
      dataIndex: "totalDiscount",
      key: "totalDiscount",
      width: 115,
      render: (value: number) =>
        `${dataPlaceHolder({ data: value?.toString() ?? "", isPrice: true, isRial: true })} تومان`,
    },
    {
      title: "مبلغ قبل از تخفیف",
      key: "",
      width: 150,
      render: () => {
        return dataPlaceHolder({ data: emptyString });
      },
    },
    {
      title: "نرخ مالیات بر ارزش افزوده",
      dataIndex: "taxRate",
      key: "taxRate",
      width: 165,
      render: (value: number) =>
        dataPlaceHolder({ data: value?.toString() ?? "", isPrice: true, isRial: true }) +
        " تومان",
    },
    {
      title: "مبلغ مالیات بر ارزش افزوده",
      dataIndex: "itemTaxAndDuty",
      key: "itemTaxAndDuty",
      width: 165,
      render: (value: number) =>
        dataPlaceHolder({ data: value?.toString() ?? "", isPrice: true, isRial: true }) +
        " تومان",
    },
    {
      title: "مبلغ کل کالا / خدمت",
      dataIndex: "itemTotalAmount",
      key: "itemTotalAmount",
      width: 165,
      render: (value: number) =>
        dataPlaceHolder({ data: value?.toString() ?? "", isPrice: true, isRial: true }) +
        " تومان",
    },
  ];
};

export default FactorsAndDocsFactorDetailsTableModel;
