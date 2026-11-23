import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  displayStatusMap,
  reasonDeductionAndAddTypeConfig,
} from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/_shared/utils";
import { GetDormitoryBaseInfoDeductionAndAddReasonsListItemType } from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBaseInfoDeductionAndAddReasonsList/@types/@dormitoryBaseInfoDeductionAndAddReasonsList";

const DormitoryBaseInfoDeductionAndAddReasonsListTableModel = ({
  onEditHandler,
  onViewHandler,
}: {
  onEditHandler: (record: GetDormitoryBaseInfoDeductionAndAddReasonsListItemType) => void;
  onViewHandler: (record: GetDormitoryBaseInfoDeductionAndAddReasonsListItemType) => void;
}): CustomColumnType<GetDormitoryBaseInfoDeductionAndAddReasonsListItemType>[] => {
  return [
    {
      title: "عنوان دلیل",
      dataIndex: "title",
      key: "title",
      width: 170,
      ...GetServerColumnSearchProps({
        dataIndex: "title",
        label: "عنوان دلیل",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "نوع دلیل",
      dataIndex: "kind",
      key: "kind",
      width: 170,
      render: (value: IdTitleName) => {
        const config =
          reasonDeductionAndAddTypeConfig[
            value?.name as keyof typeof reasonDeductionAndAddTypeConfig
          ];

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
      render: (
        _: unknown,
        record: GetDormitoryBaseInfoDeductionAndAddReasonsListItemType
      ) => (
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
export default DormitoryBaseInfoDeductionAndAddReasonsListTableModel;
