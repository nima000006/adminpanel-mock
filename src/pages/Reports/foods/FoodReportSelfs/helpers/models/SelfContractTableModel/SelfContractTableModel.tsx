import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

import { SelfContractTableModelType } from "./@types/selfContractTableModel";

export const SelfContractTableModel = ({
  viewClickHandler,
}: SelfContractTableModelType) => {
  return [
    {
      title: "عنوان",
      dataIndex: "title",
      id: "title",
      width: 120,
    },
    {
      title: "شماره قرارداد",
      dataIndex: "contractUUID",
      id: "contractUUID",
      width: 120,
    },
    {
      title: "نام تأمین کننده",
      dataIndex: "vendorTitle",
      id: "vendorTitle",
      width: 120,
    },
    {
      title: "شروع قرارداد",
      dataIndex: "startedDate",
      id: "startedDate",
      width: 120,
      render: (value: string) => {
        return (
          <>
            {dataPlaceHolder({
              data: value,
              isDate: true,
            })}
          </>
        );
      },
    },
    {
      title: "پایان قرارداد",
      dataIndex: "endDate",
      id: "endDate",
      width: 120,
      render: (value: string) => {
        return (
          <>
            {dataPlaceHolder({
              data: value,
              isDate: true,
            })}
          </>
        );
      },
    },
    {
      title: "وضعیت",
      dataIndex: "active",
      id: "active",
      width: 120,
      render: (value: string) => {
        return (
          <CustomTag color={value ? "green" : "red"}>
            {value ? "فعال" : "غیرفعال"}
          </CustomTag>
        );
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      className: "tables-sticky-column-left",
      fixed: "right" as FixedType,
      width: 75,
      render: (value: number) => {
        return (
          <CustomButton
            type="text"
            onClick={() => viewClickHandler(value)}
            className="view-btn"
          >
            مشاهده
          </CustomButton>
        );
      },
    },
  ];
};
