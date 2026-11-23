import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { AdmissionCapacityUnitItem } from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";
import DormitoryQualityGrade from "@pages/Dormitory/Admission/_shared/helper/components/QualityGrade/DormitoryQualityGrade";

const AdmissionStepsSettingsRenewalCapacityUnitTableModel =
  (): CustomColumnType<AdmissionCapacityUnitItem>[] => [
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
      title: "واحد اقامتی",
      dataIndex: "unitTitle",
      key: "unitTitle",
      width: 200,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "نوع واحد اقامتی",
      dataIndex: "unitType",
      key: "unitType",
      width: 140,
      render: (value: string) => (
        <CustomTag className="w-fit">{dataPlaceHolder({ data: value })}</CustomTag>
      ),
    },
    {
      title: "درجه کیفی واحد اقامتی",
      dataIndex: "qualityGrade",
      key: "qualityGrade",
      width: 170,
      render: (value: string | null) => <DormitoryQualityGrade value={value} />,
    },
    {
      title: "طبقه",
      dataIndex: "floor",
      key: "floor",
      width: 120,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "ساختمان",
      dataIndex: "building",
      key: "building",
      width: 130,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
  ];

export default AdmissionStepsSettingsRenewalCapacityUnitTableModel;
