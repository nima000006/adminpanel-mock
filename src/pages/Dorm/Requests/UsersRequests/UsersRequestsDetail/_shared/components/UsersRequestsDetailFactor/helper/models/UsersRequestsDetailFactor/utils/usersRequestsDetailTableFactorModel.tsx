import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import {
  dormRequestsTypeStatusColor,
  dormSchedulingStatusColor,
} from "@pages/Dorm/_shared/utils/DormUtils";
import { GetDormRequestPaymentInvoiceTable } from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/@types/@usersRequestsDetail";
export const requestId = {
  title: "درخواست",
  dataIndex: "id",
  key: "id",
  width: 130,
};
export const requestType = {
  title: "نوع درخواست",
  dataIndex: "AssociationCategoryRequestType_title",
  key: "AssociationCategoryRequestType_title",
  width: 150,
  render: (value: number, records: GetDormRequestPaymentInvoiceTable) => {
    if (!value) return "-";
    return (
      <CustomTag color={dormRequestsTypeStatusColor[records?.requestTypeId]}>
        {value}
      </CustomTag>
    );
  },
};
export const roomType = {
  title: "نوع اتاق",
  dataIndex: "AssociationBed_AssociationCategorRoom_AssociationRoomTypee_title",
  key: "AssociationBed_AssociationCategorRoom_AssociationRoomTypee_title",
  width: 130,
  render: (value: number, records: GetDormRequestPaymentInvoiceTable) => {
    if (!value) return "-";
    return records.AssociationBed_AssociationCategorRoom_AssociationRoomTypee_title;
  },
};
export const schedulingType = {
  title: "نوع زمان‌بندی",
  dataIndex: "AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_title",
  key: "AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_title",
  width: 150,
  render: (value: number, records: GetDormRequestPaymentInvoiceTable) => {
    if (!value) return "-";
    return (
      <CustomTag
        color={
          dormSchedulingStatusColor[records?.AssociationCategoryDeliverPlan_schedulingId]
        }
      >
        {value}
      </CustomTag>
    );
  },
};
export const priceListTax = {
  title: "مالیات",
  dataIndex: "AssociationCategoryDeliverPlan_AssociationPriceList_tax",
  key: "AssociationCategoryDeliverPlan_AssociationPriceList_tax",
  width: 130,
  render: (value: number) => {
    if (!value) return "-";
    return <>{value} %</>;
  },
};
export const priceListtoll = {
  title: "عوارض",
  dataIndex: "AssociationCategoryDeliverPlan_AssociationPriceList_toll",
  key: "AssociationCategoryDeliverPlan_AssociationPriceList_toll",
  width: 130,
  render: (value: number) => {
    if (!value) return "-";
    return <>{value} %</>;
  },
};
export const percentDiscount = {
  title: "درصد تخفیف",
  dataIndex: "AssociationCategoryDeliverPlan_percentDiscount",
  key: "AssociationCategoryDeliverPlan_percentDiscount",
  width: 130,
  render: (value: number) => {
    if (!value) return "-";
    return <>{value} %</>;
  },
};
export const fixedDiscount = {
  title: "تخفیف ثابت",
  dataIndex: "AssociationCategoryDeliverPlan_fixedDiscount",
  key: "AssociationCategoryDeliverPlan_fixedDiscount",
  width: 130,
  render: (value: number) => {
    if (!value) return "-";
    return <>{value} %</>;
  },
};
export const amountPayable = {
  title: "مبلغ (تومان)",
  dataIndex: "amountPayable",
  key: "amountPayable",
  width: 130,
  render: (value: number) => {
    if (!value) return "-";
    return <>{dataPlaceHolder({ data: value?.toString(), isPrice: true })}</>;
  },
};
