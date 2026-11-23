import { Link } from "react-router";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MY_DOCTOR_ALL_TESTS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/myDoctor";
import {
  branchName,
  fieldName,
  firstName,
  lastName,
  lastReviewer,
  startDate,
  statusLastAction,
  statusLastActionDate,
  studentMobileNumber,
  studentNumber,
  suicideStatus,
  TableModelId,
  timerTimeMinute,
  timerTimeSecond,
  totalScore,
  username,
} from "@pages/MyDoctor/Tests/TestsList/AllTestList/utils/testListTableModel";
import { MyDoctorTestList } from "@pages/MyDoctor/Tests/TestsList/MyTestList/@types/@testList";

import { MyDoctorActionTestList } from "../../../components/AllTestActionStatusListTab/@types/@allTestActionStatusListTab";

const MyDoctorTestListTableModel = (): CustomColumnType<
  MyDoctorActionTestList | MyDoctorTestList
>[] => {
  const { params } = useQueryParams();
  return [
    firstName,
    lastName,
    suicideStatus,
    username,
    studentMobileNumber,
    studentNumber,
    totalScore,
    fieldName,
    branchName,
    timerTimeMinute,
    timerTimeSecond,
    startDate,
    statusLastAction,
    statusLastActionDate,
    lastReviewer,
    {
      ...TableModelId,
      render: (value: string, records: MyDoctorTestList | MyDoctorActionTestList) => {
        return (
          <Link
            to={{
              pathname: MY_DOCTOR_ALL_TESTS_DETAIL_PAGE_ROUTE,
              search: makeSearchParams({
                ...params,
                id: value,
                firstName: records?.firstName,
                lastName: records?.lastName,
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
export default MyDoctorTestListTableModel;
