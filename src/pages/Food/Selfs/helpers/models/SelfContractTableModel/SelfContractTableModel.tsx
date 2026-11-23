import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { AllContractsListItem } from "@pages/Food/Contracts/AllContracts/AllContractList/@types/@allContractList";
import { MyContractsListItem } from "@pages/Food/Contracts/MyContracts/MyContractsList/@types/@myContractsList";

import { SelfContractTableModelType } from "./@types/selfContractTableModel";
import CustomTag from "../../../../../../components/Renderers/CustomTag/CustomTag";

export const SelfContractTableModel = ({
  viewClickHandler,
}: SelfContractTableModelType): CustomColumnType<
  AllContractsListItem | MyContractsListItem
>[] => {
  return [
    {
      title: "عنوان",
      dataIndex: "title",
      width: 120,
    },
    {
      title: "شماره قرارداد",
      dataIndex: "contractUUID",
      width: 120,
    },
    {
      title: "نام تأمین کننده",
      dataIndex: "vendorTitle",
      width: 120,
    },
    {
      title: "شروع قرارداد",
      dataIndex: "startedDate",
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
