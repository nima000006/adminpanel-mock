import { dataPlaceHolder } from "@infra/helpers/utils";

const FactorPaymentTableModel = () => {
  return [
    {
      title: "درخواست ",
      dataIndex: "id",
      key: "id",
      width: 130,
    },
    {
      title: "نوع درخواست",
      dataIndex: "AssociationCategoryRequestType_title",
      key: "AssociationCategoryRequestType_title",
      width: 150,
    },
    {
      title: "نوع اتاق",
      dataIndex: "AssociationBed_AssociationCategorRoom_AssociationRoomTypee_title",
      key: "AssociationBed_AssociationCategorRoom_AssociationRoomTypee_title",
      width: 130,
    },
    {
      title: "نوع زمان‌بندی",
      dataIndex: "AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_title",
      key: "AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_title",
      width: 150,
    },
    {
      title: "مالیات",
      dataIndex: "AssociationCategoryDeliverPlan_AssociationPriceList_tax",
      key: "AssociationCategoryDeliverPlan_AssociationPriceList_tax",
      width: 130,
      render: (value: number) => <>{value} %</>,
    },
    {
      title: "عوارض",
      dataIndex: "AssociationCategoryDeliverPlan_AssociationPriceList_toll",
      key: "AssociationCategoryDeliverPlan_AssociationPriceList_toll",
      width: 130,
      render: (value: number) => <>{value} %</>,
    },
    {
      title: "درصد تخفیف",
      dataIndex: "AssociationCategoryDeliverPlan_percentDiscount",
      key: "AssociationCategoryDeliverPlan_percentDiscount",
      width: 130,
      render: (value: number) => <>{value} %</>,
    },
    {
      title: "تخفیف ثابت",
      dataIndex: "AssociationCategoryDeliverPlan_fixedDiscount",
      key: "AssociationCategoryDeliverPlan_fixedDiscount",
      width: 130,
      render: (value: number) => <>{value} %</>,
    },
    {
      title: "مبلغ (تومان)",
      dataIndex: "amountPayable",
      key: "amountPayable",
      width: 130,
      render: (value: number) => (
        <>{dataPlaceHolder({ data: value?.toString(), isPrice: true, isRial: true })}</>
      ),
    },
  ];
};
export default FactorPaymentTableModel;
