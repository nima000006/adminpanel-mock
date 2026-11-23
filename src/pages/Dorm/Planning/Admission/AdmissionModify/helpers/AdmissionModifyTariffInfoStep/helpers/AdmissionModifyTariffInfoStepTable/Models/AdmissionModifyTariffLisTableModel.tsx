import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

import { GetApplicableTariffsData } from "../../../@types/@admissionModifyTariffInfoStep";

const AdmissionModifyTariffLisTableModel = ({
  viewTableClickHandler,
}: {
  viewTableClickHandler: (value: number) => void;
}) => {
  return [
    {
      title: "عنوان تعرفه",
      dataIndex: "title",
      key: "title",
      width: 130,
    },
    {
      title: "اقامتگاه",
      dataIndex: "AssociationDormitory_title",
      key: "AssociationDormitory_title",
      width: 130,
    },
    {
      title: "تاریخ شروع اعمال مؤثر",
      dataIndex: "appliedStartDate",
      key: "appliedStartDate",
      width: 200,
      render: (value: string, records: any) => {
        return (
          <>
            {dataPlaceHolder({ data: records?.appliedStartTime, isTime: true })},{" "}
            {dataPlaceHolder({ data: value, isDate: true })}
          </>
        );
      },
    },
    {
      title: "تاریخ پایان اعمال مؤثر",
      dataIndex: "appliedEndDate",
      key: "appliedEndDate",
      width: 200,
      render: (value: string, records: GetApplicableTariffsData) => {
        return (
          <>
            {dataPlaceHolder({ data: records?.appliedEndTime, isTime: true })},{" "}
            {dataPlaceHolder({ data: value, isDate: true })}
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      width: 75,
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      render: (value: string) => {
        return (
          <CustomButton type="link" onClick={() => viewTableClickHandler(+value)}>
            مشاهده
          </CustomButton>
        );
      },
    },
  ];
};

export default AdmissionModifyTariffLisTableModel;
