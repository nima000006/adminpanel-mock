import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { displayStatusMap } from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/_shared/utils";
import { DormitoryBasicInfoRulesAndRegulationType } from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBaseInfoRulesAndRegulationList/@types/@dormitoryBaseInfoRulesAndRegulationList";

const DormitoryBaseInfoRulesAndRegulationListTableModel = ({
  onEditHandler,
  onViewHandler,
}: {
  onEditHandler: (id: string) => void;
  onViewHandler: (id: string) => void;
}): CustomColumnType<DormitoryBasicInfoRulesAndRegulationType>[] => {
  return [
    {
      title: "عنوان قالب قانون و مقررات",
      dataIndex: "title",
      key: "title",
      width: 170,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "نوع قانون و مقررات",
      dataIndex: "kind",
      key: "kind",
      width: 170,
      render: (value: IdTitleName) => dataPlaceHolder({ data: value?.title }),
    },
    {
      title: "نوع اقامتگاه",
      dataIndex: "accommodationType",
      key: "accommodationType",
      width: 140,
      render: (value: IdTitleName) => dataPlaceHolder({ data: value?.title }),
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
      width: 150,
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
      render: (value: string) => (
        <div className="flex gap-3">
          <CustomButton type="link" onClick={() => onEditHandler(value)}>
            ویرایش
          </CustomButton>
          <CustomButton type="link" onClick={() => onViewHandler(value)}>
            مشاهده
          </CustomButton>
        </div>
      ),
    },
  ];
};
export default DormitoryBaseInfoRulesAndRegulationListTableModel;
