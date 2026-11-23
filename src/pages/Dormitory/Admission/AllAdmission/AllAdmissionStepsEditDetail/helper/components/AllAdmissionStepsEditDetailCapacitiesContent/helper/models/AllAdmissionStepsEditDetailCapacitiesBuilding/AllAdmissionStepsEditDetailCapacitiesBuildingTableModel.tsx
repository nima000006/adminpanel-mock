import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { AdmissionCapacityBuildingItem } from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";
import DormitoryQualityGrade from "@pages/Dormitory/Admission/_shared/helper/components/QualityGrade/DormitoryQualityGrade";

const AllAdmissionStepsEditDetailCapacitiesBuildingTableModel = ({
  onEditPrice,
  onDelete,
}: {
  onEditPrice: (record: AdmissionCapacityBuildingItem) => void;
  onDelete: (record: AdmissionCapacityBuildingItem) => void;
}): CustomColumnType<AdmissionCapacityBuildingItem>[] => [
  {
    title: "قیمت",
    dataIndex: "price",
    key: "price",
    width: 150,
    sortable: true,
    render: (value: number) =>
      dataPlaceHolder({
        data: value,
        isPrice: true,
        currency: { isAvailable: true, type: "تومان" },
      }),
  },
  {
    title: "مبلغ ودیعه",
    dataIndex: "deposit",
    key: "deposit",
    width: 150,
    sortable: true,
    render: (value: number | null) =>
      dataPlaceHolder({
        data: value,
        isPrice: true,
        currency: { isAvailable: true, type: "تومان" },
      }),
  },
  {
    title: "ساختمان",
    dataIndex: "building",
    key: "building",
    width: 120,
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "درجه کیفی ساختمان",
    dataIndex: "qualityGrade",
    key: "qualityGrade",
    width: 170,
    render: (value: string | null) => <DormitoryQualityGrade value={value} />,
  },
  {
    title: "",
    key: "actions",
    fixed: "left" as FixedType,
    className: "tables-sticky-column-left",
    width: 220,
    render: (_: unknown, record: AdmissionCapacityBuildingItem) => (
      <div className="flex items-center gap-2">
        <CustomButton type="link" className="px-0!" onClick={() => onEditPrice(record)}>
          ویرایش قیمت
        </CustomButton>
        <CustomButton
          type="link"
          danger
          className="px-0!"
          onClick={() => onDelete(record)}
        >
          حذف از برنامه
        </CustomButton>
      </div>
    ),
  },
];

export default AllAdmissionStepsEditDetailCapacitiesBuildingTableModel;
