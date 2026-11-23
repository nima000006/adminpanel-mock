import { dormScheduleTitleCreator } from "@pages/Dorm/Planning/Tariff/_shared/utils/TariffUtils";

import { AdmissionDetailBaseInfo } from "../AdmissionDetailActive/helpers/AdmissionDetailActiveBaseInfoTab/@types/@admissionDetailActiveBaseInfoTab";

export const admissionDetailTableDataCreator = (data: AdmissionDetailBaseInfo | null) => {
  if (!data) return [];
  return [
    {
      title: dormScheduleTitleCreator("زمان اعمال مؤثر"),
      startDate: data?.appliedStartDate,
      startTime: data?.appliedStartTime,
      endDate: data?.appliedEndDate,
      endTime: data?.appliedEndTime,
      id: 1,
    },
    {
      title: dormScheduleTitleCreator("زمان رزرو"),
      startDate: data?.reservationStartDate,
      startTime: data?.reservationStartTime,
      endDate: data?.reservationEndDate,
      endTime: data?.reservationEndTime,
      id: 2,
    },
    {
      title: dormScheduleTitleCreator("زمان اسکان"),
      startDate: data?.residenceStartDate,
      startTime: data?.residenceStartTime,
      endDate: data?.residenceEndDate,
      endTime: data?.residenceEndTime,
      id: 3,
    },
    {
      title: dormScheduleTitleCreator("زمان تمدید"),
      startDate: data?.extensionStartDate,
      startTime: data?.extensionStartTime,
      endDate: data?.extensionEndDate,
      endTime: data?.extensionEndTime,
      id: 4,
    },
  ];
};
