//! GENERAL
//! LAYOUT

import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

// admission drawer
export type AdmissionProgramDrawerPropsType = {
  closeDrawerHandler: () => void;
};

// tariff drawer
export type GeneralInfoTariffDrawerPropsType = {
  closeDrawerHandler: () => void;
};

//! API
type IDTitle = {
  title: string;
  id: number;
};

export type HabitantAdmissionTabData = {
  title?: string;
  showTitle?: string;
  AssociationCategoryDeliverPlan?: {
    reservationEndDate: string;
    AssociationCategorySchedulingType: IDTitle;
    AssociationPriceList: {
      title: string;
      AssociationCategoryRecordStatus: IDTitle;
      id: number;
    };
    AssociationSemester: IDTitle;
    residenceEndDate: string;
    reservationStartTime: string;
    residenceEndTime: string;
    residenceStartTime: string;
    reservationEndTime: string;
    AssociationDeliverPlanSpecialStatus: IDTitle[];

    reservationStartDate: string;
    AssociationRecordStatus: IDTitle;
    id: number;
    title: string;
    residenceStartDate: string;
    AssociationSpecialStatus: {
      title: string;
      id: number;
    }[];
  };
  id: number;
};

export type GetHabitantAdmissionTabResponse = BPMS_API_RESPONSE<HabitantAdmissionTabData>;
export type GetHabitantAdmissionTabRequest = {
  _data_: {
    id: string;
  };
};
