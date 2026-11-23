import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

const AdmissionDetailActiveTariffLisTableModel = () => {
  return [
    {
      title: "عنوان تعرفه",
      dataIndex: "title",
      key: "title",
      width: 130,
    },
    {
      title: "تاریخ شروع اعمال مؤثر",
      dataIndex: "startDate",
      key: "startDate",
      width: 100,
      render: (value: string, records: any) => {
        return (
          <>
            {dataPlaceHolder({ data: records?.startTime, isTime: true })},{" "}
            {dataPlaceHolder({ data: value, isDate: true })}
          </>
        );
      },
    },
    {
      title: "تاریخ پایان اعمال مؤثر",
      dataIndex: "endDate",
      key: "endDate",
      width: 100,
      render: (value: string, records: any) => {
        return (
          <>
            {dataPlaceHolder({ data: records?.endTime, isTime: true })},{" "}
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
      render: () => {
        return <CustomButton type="link">مشاهده</CustomButton>;
      },
    },
  ];
};

export default AdmissionDetailActiveTariffLisTableModel;
