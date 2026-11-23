import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { displayStatusMap } from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/_shared/utils";
import { DormitoryDeactivationReasonType } from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBaseInfoDeActivationReasonsList/@types/@dormitoryBaseInfoDeActivationReasonsList";

const DormitoryBasicInfoDeActivationReasonsListTableModel = ({
  onEditHandler,
}: {
  onEditHandler: (record: DormitoryDeactivationReasonType) => void;
}): CustomColumnType<DormitoryDeactivationReasonType>[] => {
  return [
    {
      title: "عنوان دلیل",
      dataIndex: "title",
      key: "title",
      width: 150,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "ماژول",
      dataIndex: "module",
      key: "module",
      width: 70,
      render: (value: IdTitleName) => dataPlaceHolder({ data: value?.title }),
    },
    {
      title: "وضعیت نمایش",
      dataIndex: "visible",
      key: "visible",
      width: 150,
      render: (value: boolean) => {
        const status = displayStatusMap[String(value)];

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
      width: 100,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "تاریخ آخرین اقدام",
      dataIndex: "modifiedDate",
      key: "modifiedDate",
      width: 100,
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
      render: (_: unknown, record: DormitoryDeactivationReasonType) => (
        <div>
          <CustomButton type="link" onClick={() => onEditHandler(record)}>
            ویرایش
          </CustomButton>
        </div>
      ),
    },
  ];
};

export default DormitoryBasicInfoDeActivationReasonsListTableModel;
