import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder, nameFamilyConcat } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { myDoctorLabsListAdvanceFilterContentItems } from "@pages/MyDoctor/Genetics/Labs/LabsList/@types/@labsList";

const LABS_RECORD_STATUS_CONFIG = {
  1: { title: "فعال", color: "green" },
  2: { title: "غیر فعال", color: "red" },
} as const;

const LabsListTableModel = ({
  editClickHandler,
  viewClickHandler,
}: {
  editClickHandler: (id: number) => void;
  viewClickHandler: (id: number) => void;
}): CustomColumnType<myDoctorLabsListAdvanceFilterContentItems>[] => {
  return [
    {
      title: "آزمایشگاه",
      dataIndex: "title",
      key: "title",
      width: 200,
      ...GetServerColumnSearchProps({
        dataIndex: "title",
        label: "آزمایشگاه",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "وضعیت",
      dataIndex: "recordStatus",
      key: "recordStatus",
      width: 100,
      render: (value: number) => {
        const statusConfig =
          LABS_RECORD_STATUS_CONFIG[value as keyof typeof LABS_RECORD_STATUS_CONFIG];

        if (!statusConfig) return "-";

        return (
          <CustomTag className="w-fit" color={statusConfig.color}>
            {statusConfig.title}
          </CustomTag>
        );
      },
    },

    {
      title: "استان",
      dataIndex: "provinceTitle",
      key: "provinceTitle",
      width: 150,

      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "شهر",
      dataIndex: "cityTitle",
      key: "cityTitle",
      width: 150,

      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "شماره تماس آزمایشگاه",
      dataIndex: "phone",
      key: "phone",
      width: 200,
      ...GetServerColumnSearchProps({
        dataIndex: "phone",
        label: "شماره تماس آزمایشگاه",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "مسئول آزمایشگاه",
      dataIndex: "employee",
      key: "employee",
      width: 200,
      ...GetServerColumnSearchProps({
        dataIndex: "employee",
        label: "مسئول آزمایشگاه",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "تاریخ ایجاد",
      dataIndex: "createdDate",
      key: "createdDate",
      width: 170,
      // todo[nima]: uncomment when api become ready
      // ...GetServerColumnSearchProps({
      //   dataIndex: "createdDate",
      //   label: "تاریخ ایجاد",
      //   type: "sort",
      // }),
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm، YYYY-MM-DD",
        }),
    },
    {
      title: "تاریخ آخرین ویرایش",
      dataIndex: "modifiedDate",
      key: "modifiedDate",
      width: 170,
      // todo[nima]: uncomment when api become ready
      // ...GetServerColumnSearchProps({
      //   dataIndex: "modifiedDate",
      //   label: "تاریخ آخرین ویرایش",
      //   type: "sort",
      // }),
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm، YYYY-MM-DD",
        }),
    },
    {
      title: "آخرین ویرایش کننده",
      dataIndex: "modifiedByFirstName",
      key: "modifiedByFirstName",
      width: 170,
      render: (_: string, record: myDoctorLabsListAdvanceFilterContentItems) =>
        nameFamilyConcat(record?.modifiedByFirstName, record?.modifiedByLastName),
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      className: "tables-sticky-column-left",
      fixed: "right" as FixedType | undefined,
      width: 200,
      render: (value: number) => {
        return (
          <div className="flex">
            <CustomButton type="link" onClick={() => editClickHandler(value)}>
              ویرایش
            </CustomButton>
            <CustomButton type="link" onClick={() => viewClickHandler(value)}>
              مشاهده
            </CustomButton>
          </div>
        );
      },
    },
  ];
};
export default LabsListTableModel;
