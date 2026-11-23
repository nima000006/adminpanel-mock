import { Link } from "react-router";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MY_DOCTOR_ALL_TESTS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/myDoctor";
import {
  actionStatus,
  branchName,
  dayCount,
  fieldName,
  firstName,
  lastName,
  startDate,
  statusLastActionDate,
  statusType,
  studentMobileNumber,
  studentNumber,
  suicideStatus,
  TableModelId,
  timerTimeMinute,
  timerTimeSecond,
  totalScore,
  username,
} from "@pages/MyDoctor/Tests/TestsList/AllTestList/utils/testListTableModel";

import { TEST_ACTION_IDS } from "../../../../utils/testConstant";
import { MyDoctorActionTestList } from "../../../components/AllTestActionStatusListTab/@types/@allTestActionStatusListTab";

const MyDoctorActionTestListTableModel = ({
  type,
}: {
  type: string;
}): CustomColumnType<MyDoctorActionTestList>[] => {
  const { params } = useQueryParams();
  return [
    ...(type === TEST_ACTION_IDS?.needReAction ? [dayCount] : []),
    ...(type === TEST_ACTION_IDS?.noNeedAction ? [actionStatus] : []),
    firstName,
    lastName,
    statusType,
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
    statusLastActionDate,
    {
      title: "آخرین بررسی کننده",
      dataIndex: "modifiedByFirstName",
      key: "modifiedByFirstName",
      width: 150,
      render: (value: string, records: MyDoctorActionTestList) => {
        return (
          <>
            {dataPlaceHolder({
              data: value,
            })}{" "}
            {dataPlaceHolder({
              data: records?.modifiedByLastName,
            })}
          </>
        );
      },
    },
    {
      ...TableModelId,
      render: (value: string, records: MyDoctorActionTestList) => {
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
export default MyDoctorActionTestListTableModel;
