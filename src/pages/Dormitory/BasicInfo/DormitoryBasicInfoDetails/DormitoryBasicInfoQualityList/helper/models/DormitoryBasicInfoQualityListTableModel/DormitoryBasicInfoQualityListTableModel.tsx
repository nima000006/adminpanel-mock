import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { displayStatusMap } from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/_shared/utils";
import { DormitoryBasicInfoQualityGradeType } from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBasicInfoQualityList/@types/@dormitoryBasicInfoQualityList";

const DormitoryBasicInfoQualityListTableModel = ({
  onEditHandler,
}: {
  onEditHandler: (record: DormitoryBasicInfoQualityGradeType) => void;
}): CustomColumnType<DormitoryBasicInfoQualityGradeType>[] => {
  return [
    {
      title: "درجه کیفی",
      dataIndex: "title",
      key: "title",
      width: 250,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "ترتیب نمایش در لیست",
      dataIndex: "displayOrder",
      key: "displayOrder",
      width: 150,
      render: (value: number) => dataPlaceHolder({ data: value }),
    },
    {
      title: "وضعیت نمایش",
      dataIndex: "visible",
      key: "visible",
      width: 150,
      render: (value: boolean) => {
        const status = displayStatusMap[String(value) as "true" | "false"];

        return (
          <CustomTag className="w-fit" color={status.color}>
            {status.title}
          </CustomTag>
        );
      },
    },
    {
      title: "ایجاد کننده",
      dataIndex: "createdBy",
      key: "createdBy",
      width: 140,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "تاریخ ایجاد",
      dataIndex: "createdDate",
      key: "createdDate",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "createdDate",
        label: "تاریخ ایجاد",
        type: "sort",
      }),
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm، YYYY-MM-DD",
        }),
    },
    {
      title: "آخرین اقدام کننده",
      dataIndex: "modifiedBy",
      key: "modifiedBy",
      width: 140,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "تاریخ آخرین اقدام",
      dataIndex: "modifiedDate",
      key: "modifiedDate",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "modifiedDate",
        label: "تاریخ آخرین اقدام",
        type: "sort",
      }),
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm، YYYY-MM-DD",
        }),
    },
    {
      title: "",
      dataIndex: "uuid",
      key: "uuid",
      fixed: "right" as FixedType,
      width: 100,
      className: "tables-sticky-column-left",
      render: (_: unknown, record: DormitoryBasicInfoQualityGradeType) => (
        <div>
          <CustomButton type="link" onClick={() => onEditHandler(record)}>
            ویرایش
          </CustomButton>
        </div>
      ),
    },
  ];
};

export default DormitoryBasicInfoQualityListTableModel;
