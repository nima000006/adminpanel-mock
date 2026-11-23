import { Link } from "react-router";

import { makeSearchParams } from "@infra/helpers/utils";
import { INTERNATIONAL_REQUESTS_DEMANDS_DETAIL_ROUTE } from "@infra/router/routes/international";
import { DEMAND_IDS } from "@pages/International/Requests/Demands/List/utils/demandConstants";
import {
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
  requestDegree,
  requestField,
  requestNumber,
  requestSemester,
  requestUnit,
  residenceRegion,
  resident,
  genderType,
  TableModelId,
  requestEditDate,
} from "@pages/International/Requests/Demands/List/utils/demandListTableModels";

const InternationalDemandNeedEditListTableModel = () => {
  return [
    {
      title: "مشخصات درخواست",
      children: [
        requestNumber,
        requestField,
        requestDegree,
        requestUnit,
        requestSemester,
        requestEditDate,
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
      width: 100,
      render: (value: string) => {
        return (
          <Link
            to={{
              pathname: INTERNATIONAL_REQUESTS_DEMANDS_DETAIL_ROUTE,
              search: makeSearchParams({
                id: value,
                status: DEMAND_IDS.needEdit,
              }),
            }}
            className="text-link"
          >
            مشاهده
          </Link>
        );
      },
    },
  ];
};

export default InternationalDemandNeedEditListTableModel;
