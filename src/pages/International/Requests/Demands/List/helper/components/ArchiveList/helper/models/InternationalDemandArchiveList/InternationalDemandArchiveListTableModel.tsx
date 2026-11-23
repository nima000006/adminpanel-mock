import { Link } from "react-router";

import { makeSearchParams } from "@infra/helpers/utils";
import { INTERNATIONAL_REQUESTS_DEMANDS_DETAIL_ROUTE } from "@infra/router/routes/international";
import {
  birthDate,
  citizenship,
  enFirstName,
  enLastName,
  identificationNumber,
  nationality,
  passportNo,
  requestDegree,
  requestField,
  requestNumber,
  requestSemester,
  requestUnit,
  resident,
  genderType,
  TableModelId,
  requestDate,
  lastModifiedDate,
} from "@pages/International/Requests/Demands/List/utils/demandListTableModels";

const InternationalDemandArchiveListTableModel = ({ status }: { status: string }) => {
  return [
    {
      title: "مشخصات درخواست",
      children: [
        requestNumber,
        requestField,
        requestDegree,
        requestUnit,
        requestSemester,
        requestDate,
        lastModifiedDate,
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
      ...TableModelId,
      width: 100,
      render: (value: string) => {
        return (
          <Link
            to={{
              pathname: INTERNATIONAL_REQUESTS_DEMANDS_DETAIL_ROUTE,
              search: makeSearchParams({
                id: value,
                status: status,
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

export default InternationalDemandArchiveListTableModel;
