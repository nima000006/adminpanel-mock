import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { basicInfoRecordStatus } from "@pages/Dorm/BasicInfo/_shared/utils/DormBasicInfoListUtils";

import { DormBasicInfoSemesterTypesTableModelProps } from "./@types/@dormBasicInfoSemesterTypesTableModelProps";
import { DormSemesterData } from "../../@types/@dormSemesterTypes";

const DormSemesterTableModel = ({
  switchHandler,
  onEditClickHandler,
}: DormBasicInfoSemesterTypesTableModelProps) => {
  return [
    {
      title: "عنوان نیمسال",
      dataIndex: "title",
      width: 250,
      ...GetServerColumnSearchProps({
        dataIndex: "name",
        label: "عنوان نیمسال",
        type: "text",
      }),
    },
    {
      title: "تاریخ شروع",
      dataIndex: "fromDate",
      width: 180,
      ...GetServerColumnSearchProps({
        dataIndex: "fromDate",
        label: "تاریخ شروع",
        type: "sort",
      }),
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "YYYY-MM-DD",
        }),
    },
    {
      title: "تاریخ پایان",
      dataIndex: "toDate",
      width: 180,
      ...GetServerColumnSearchProps({
        dataIndex: "toDate",
        label: "تاریخ پایان",
        type: "sort",
      }),
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "YYYY-MM-DD",
        }),
    },
    {
      title: "وضعیت",
      dataIndex: "recordStatus",
      key: "recordStatus",
      width: 70,
      render: (status: keyof typeof basicInfoRecordStatus, record: DormSemesterData) => {
        const isActive = basicInfoRecordStatus[status] === "فعال";
        return (
          <CustomSwitch
            checkedChildren="فعال"
            unCheckedChildren="غیرفعال"
            valuePropName="status"
            checked={isActive}
            onChange={() => switchHandler(record?.id, isActive)}
          />
        );
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 70,
      className: "tables-sticky-column-left",
      render: (_: number, record: DormSemesterData) => {
        return (
          <CustomButton type="link" onClick={() => onEditClickHandler(record)}>
            ویرایش
          </CustomButton>
        );
      },
    },
  ];
};

export default DormSemesterTableModel;
