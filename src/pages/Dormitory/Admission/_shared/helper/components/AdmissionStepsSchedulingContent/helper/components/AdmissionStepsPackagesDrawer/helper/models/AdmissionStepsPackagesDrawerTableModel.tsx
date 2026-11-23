import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { convertDateToPersianTextDateWithoutHours } from "@infra/helpers/dateConvertor";
import { GetAllAdmissionSchedulingPackage } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSchedulingContent/@types/@admissionStepsSchedulingContent";

const AdmissionStepsPackagesDrawerTableModel =
  (): CustomColumnType<GetAllAdmissionSchedulingPackage>[] => [
    {
      title: "تاریخ شروع بسته",
      dataIndex: "startDate",
      key: "startDate",
      render: (value: string) => convertDateToPersianTextDateWithoutHours(value),
    },
    {
      title: "تاریخ پایان بسته",
      dataIndex: "endDate",
      key: "endDate",
      render: (value: string) => convertDateToPersianTextDateWithoutHours(value),
    },
    {
      title: "مدت هر بسته",
      dataIndex: "days",
      key: "days",
      render: (value: string) => `${value} روز`,
    },
  ];

export default AdmissionStepsPackagesDrawerTableModel;
