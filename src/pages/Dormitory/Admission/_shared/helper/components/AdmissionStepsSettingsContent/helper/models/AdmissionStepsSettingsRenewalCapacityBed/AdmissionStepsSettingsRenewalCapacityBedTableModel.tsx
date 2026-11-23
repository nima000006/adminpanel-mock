import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { AdmissionCapacityBedItem } from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";
import DormitoryQualityGrade from "@pages/Dormitory/Admission/_shared/helper/components/QualityGrade/DormitoryQualityGrade";
import { BED_TYPE } from "@pages/Dormitory/Residence/ActiveResidence/_shared/util";

const AdmissionStepsSettingsRenewalCapacityBedTableModel =
  (): CustomColumnType<AdmissionCapacityBedItem>[] => [
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
      title: "کد تخت",
      dataIndex: "bedCode",
      key: "bedCode",
      width: 110,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "عنوان تخت",
      dataIndex: "bedTitle",
      key: "bedTitle",
      width: 120,
      render: (value: string | null) => dataPlaceHolder({ data: value }),
    },
    {
      title: "نوع تخت",
      dataIndex: "bedType",
      key: "bedType",
      width: 140,
      render: (value?: string) => {
        const bedType = BED_TYPE[value as keyof typeof BED_TYPE];
        if (!bedType) return dataPlaceHolder({ data: value });

        const Icon = bedType.icon;
        return (
          <CustomTag className="w-fit" color={bedType.color}>
            <Icon size={16} />
            {bedType.label}
          </CustomTag>
        );
      },
    },
    {
      title: "موقعیت تخت",
      dataIndex: "bedPosition",
      key: "bedPosition",
      width: 120,
      render: (value: string | null) => dataPlaceHolder({ data: value }),
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

export default AdmissionStepsSettingsRenewalCapacityBedTableModel;
