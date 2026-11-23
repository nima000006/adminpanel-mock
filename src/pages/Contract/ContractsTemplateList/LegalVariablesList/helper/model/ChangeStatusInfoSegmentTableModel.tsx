import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";

const ChangeStatusInfoSegmentTableModel = ({
  ReasonDisableClickHandler,
}: {
  ReasonDisableClickHandler: (id: number) => void;
}) => {
  return [
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      width: 70,
      render: (value: boolean) => {
        return (
          <CustomTag color={value ? "green" : "red"}>
            {value ? "فعال" : "غیرفعال"}
          </CustomTag>
        );
      },
    },
    {
      title: "تاریخ شروع",
      dataIndex: "startDate",
      key: "startDate",
      width: 100,
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
        }),
    },
    {
      title: "تاریخ پایان",
      dataIndex: "endDate",
      key: "endDate",
      width: 100,
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
        }),
    },
    {
      title: "آخرین ویرایش کننده",
      dataIndex: "lastModifier",
      key: "lastModifier",
      width: 150,
    },
    {
      title: "آخرین تغییر وضعیت",
      dataIndex: "lastModifiedDate",
      key: "lastModifiedDate",
      width: 150,
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "YYYY-MM-DD",
        }),
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      width: 70,
      render: (value: number, record: any) =>
        record?.status === false ? (
          <CustomButton type="link" onClick={() => ReasonDisableClickHandler(value)}>
            علت غیرفعالسازی
          </CustomButton>
        ) : null,
    },
  ];
};
export default ChangeStatusInfoSegmentTableModel;
