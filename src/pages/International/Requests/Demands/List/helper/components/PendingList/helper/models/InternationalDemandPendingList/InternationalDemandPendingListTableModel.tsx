import { Link } from "react-router";

import { makeSearchParams } from "@infra/helpers/utils";
import { INTERNATIONAL_REQUESTS_DEMANDS_DETAIL_ROUTE } from "@infra/router/routes/international";
import { DEMAND_IDS } from "@pages/International/Requests/Demands/List/utils/demandConstants";
import {
  requestNumber,
  waiting,
  birthDate,
  citizenship,
  diplomaAverage,
  enFirstName,
  enLastName,
  identificationNumber,
  issuingUnit,
  lastDegree,
  lastField,
  nationality,
  overallGPA,
  passportNo,
  requestDate,
  requestDegree,
  requestField,
  requestSemester,
  requestUnit,
  residenceRegion,
  resident,
  TableModelId,
  type,
  genderType,
} from "@pages/International/Requests/Demands/List/utils/demandListTableModels";

const InternationalDemandPendingListTableModel = () => {
  return [
    {
      title: "مشخصات درخواست",
      children: [
        waiting,
        requestNumber,
        type,
        requestField,
        requestDegree,
        requestUnit,
        requestSemester,
        requestDate,
      ],
    },
    {
      title: "اطلاعات هویتی متقاضی",
      children: [
        enFirstName,
        enLastName,
        genderType,
        birthDate,
        nationality,
        citizenship,
        resident,
        passportNo,
        identificationNumber,
      ],
    },
    {
      title: "اطلاعات تحصیلی پیشین متقاضی",
      children: [
        lastDegree,
        lastField,
        residenceRegion,
        issuingUnit,
        diplomaAverage,
        overallGPA,
      ],
    },
    {
      ...TableModelId,
      render: (value: string) => {
        return (
          <Link
            to={{
              pathname: INTERNATIONAL_REQUESTS_DEMANDS_DETAIL_ROUTE,
              search: makeSearchParams({
                id: value,
                status: DEMAND_IDS.pending,
              }),
            }}
            className="text-link"
          >
            بررسی درخواست
          </Link>
        );
      },
    },
  ];
};

export default InternationalDemandPendingListTableModel;
