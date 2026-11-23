import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  displayStatusMap,
  reasonTypeConfig,
} from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/_shared/utils";
import { GetDormitoryReasonReturnAndRefuseListItemType } from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryReasonReturnAndRefuseList/@types/@dormitoryReasonReturnAndRefuseList";

const DormitoryBaseInfoReasonReturnAndRefuseListTableModel = ({
  onEditHandler,
  onViewHandler,
}: {
  onEditHandler: (record: GetDormitoryReasonReturnAndRefuseListItemType) => void;
  onViewHandler: (record: GetDormitoryReasonReturnAndRefuseListItemType) => void;
}): CustomColumnType<GetDormitoryReasonReturnAndRefuseListItemType>[] => {
  return [
    {
      title: "عنوان دلیل",
      dataIndex: "title",
      key: "title",
      width: 170,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "ماژول",
      dataIndex: "module",
      key: "module",
      width: 170,
      render: (value: IdTitleName) => dataPlaceHolder({ data: value?.title }),
    },
    {
      title: "نوع دلیل",
      dataIndex: "kind",
      key: "kind",
      width: 170,
      render: (value: IdTitleName) => {
        const config = reasonTypeConfig[value?.name as keyof typeof reasonTypeConfig];

        if (!config) {
          return dataPlaceHolder({ data: value?.title });
        }

        return (
          <CustomTag color={config.color} className="w-fit">
            {config.title}
          </CustomTag>
        );
      },
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
      title: "آخرین اقدام کننده",
      dataIndex: "modifiedBy",
      key: "modifiedBy",
      width: 150,
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
      render: (_: unknown, record: GetDormitoryReasonReturnAndRefuseListItemType) => (
        <div className="flex gap-3">
          <CustomButton type="link" onClick={() => onEditHandler(record)}>
            ویرایش
          </CustomButton>
          <CustomButton type="link" onClick={() => onViewHandler(record)}>
            مشاهده
          </CustomButton>
        </div>
      ),
    },
  ];
};
export default DormitoryBaseInfoReasonReturnAndRefuseListTableModel;
