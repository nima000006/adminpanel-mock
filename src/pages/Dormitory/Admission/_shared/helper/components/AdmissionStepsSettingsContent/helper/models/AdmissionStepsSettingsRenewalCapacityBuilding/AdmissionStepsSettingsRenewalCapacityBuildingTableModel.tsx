import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { AdmissionCapacityBuildingItem } from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";
import DormitoryQualityGrade from "@pages/Dormitory/Admission/_shared/helper/components/QualityGrade/DormitoryQualityGrade";

const AdmissionStepsSettingsRenewalCapacityBuildingTableModel =
  (): CustomColumnType<AdmissionCapacityBuildingItem>[] => [
    {
      title: "قیمت",
      dataIndex: "price",
      key: "price",
      width: 150,
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
  ];

export default AdmissionStepsSettingsRenewalCapacityBuildingTableModel;
