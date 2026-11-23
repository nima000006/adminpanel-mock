import { useEffect, useState } from "react";

import { Dropdown, Form, MenuProps } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import DemandCard from "@components/Renderers/DemandCard/DemandCard";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { convertTimezoneToStartOfDayISO } from "@infra/helpers/dateConvertor";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useGetMyDoctorTestActionListForManagerMutation,
  useGetMyDoctorTestFilterListForManagerMutation,
} from "@infra/states/redux/Apis/myDoctor/test/testApis";
import { TEST_ACTION_IDS } from "@pages/MyDoctor/Tests/TestsList/AllTestList/utils/testConstant";

import {
  GetMyDoctorTestActionListResponseForManager,
  MyDoctorTestActionListResponseForManager,
} from "./@types/@myTestActionStatusListTab";
import { GetMyDoctorTestFilterListForManagerResponse } from "../MyTestFollowUpListTab/@types/@myTestFollowUpListTab";
import useActionStatusAdvanceFilterForManager from "./helper/modals/advanceFilter/useActionStatusAdvanceFilterForManager";
import MyDoctorActionTestListTableModel from "../../utils/model/MyDoctorActionTestList/MyDoctorActionTestListTableModel";

import "./_myTestActionStatusListTab.scss";

const exportMenu: MenuProps = {
  items: [
    {
      label: "خروجی Excel",
      key: "excel",
    },
    {
      label: "خروجی PDF",
      key: "pdf",
    },
  ],
};

const FILTER_DEPENDENCIES = [
  "actionStatusNameTitle",
  "actionStatusFamilyTitle",
  "actionStatusNationalNumberTitle",
  "actionStatusStudentNumberTitle",
  "actionStatusSuicideStatusId",
  "actionStatusFollowUpId",
  "actionStatusDateDateStart",
  "actionStatusDateDateEnd",
];

const MyTestActionStatusListTab = () => {
  const [data, setData] = useState<GetMyDoctorTestActionListResponseForManager | null>(
    null
  );

  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);

  const { params: url, setSearchParams } = useQueryParams();
  const [badgeCount, setBadgeCount] = useState(0);

  const [advanceFilterForm] = Form.useForm();

  const actionStatus = url.actionStatus || TEST_ACTION_IDS.needAction;
  const page = url.page;
  const pageSize = url.pageSize;

  const { filterItemsList } = useActionStatusAdvanceFilterForManager();

  //? ================================  Api Calls ================================

  const [getTestList, { isLoading: isTestListLoading }] =
    useGetMyDoctorTestActionListForManagerMutation();

  const [getTestFilterList, { isLoading: isTestFilterListLoading }] =
    useGetMyDoctorTestFilterListForManagerMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!url.actionStatus) {
      setSearchParams({
        actionStatus: TEST_ACTION_IDS.needAction,
      });
    }
  }, []);

  useEffect(() => {
    if (actionStatus) {
      if (
        !url?.actionStatusNameTitle &&
        !url?.actionStatusFamilyTitle &&
        !url?.actionStatusNationalNumberTitle &&
        !url?.actionStatusStudentNumberTitle &&
        !url?.actionStatusSuicideStatusId &&
        !url?.actionStatusFollowUpId &&
        !url?.actionStatusDateDateStart &&
        !url?.actionStatusDateDateEnd
      ) {
        getTestList({
          pageNo: page ? Number(page) - 1 : 0,
          pageSize: pageSize ? +pageSize : 8,
          statusId: +actionStatus,
        })
          .unwrap()
          .then(onTestListSuccess);
      } else {
        getTestFilterList({
          pageNo: page ? Number(page) - 1 : 0,
          pageSize: pageSize ? +pageSize : 8,
          body: {
            surveyStatusType: +actionStatus,
            ...(url?.actionStatusNameTitle
              ? { firstName: url?.actionStatusNameTitle }
              : {}),
            ...(url?.actionStatusFamilyTitle
              ? { lastName: url?.actionStatusFamilyTitle }
              : {}),
            ...(url?.actionStatusNationalNumberTitle
              ? { username: url?.actionStatusNationalNumberTitle }
              : {}),
            ...(url?.actionStatusStudentNumberTitle
              ? { studentNumber: url?.actionStatusStudentNumberTitle }
              : {}),
            ...(url?.actionStatusSuicideStatusId
              ? { suicideRisk: +url?.actionStatusSuicideStatusId }
              : {}),
            ...(url?.actionStatusFollowUpId
              ? { surveyStatusType: +url?.actionStatusFollowUpId }
              : {}),
            ...(url?.actionStatusDateDateStart
              ? {
                  from: convertTimezoneToStartOfDayISO(url?.actionStatusDateDateStart),
                }
              : {}),
            ...(url?.actionStatusDateDateEnd
              ? { to: convertTimezoneToStartOfDayISO(url?.actionStatusDateDateEnd) }
              : {}),
          },
        })
          .unwrap()
          .then(getTestFilterListSuccess);
      }
    }
  }, [page, pageSize, actionStatus, ...FILTER_DEPENDENCIES.map((key) => url?.[key])]);

  //* ================================ Util Functions ================================

  const onTestListSuccess = (value: GetMyDoctorTestActionListResponseForManager) => {
    setData(value);
  };

  const getTestFilterListSuccess = (
    value:
      | GetMyDoctorTestFilterListForManagerResponse
      | GetMyDoctorTestActionListResponseForManager
  ) => {
    setData(value as GetMyDoctorTestActionListResponseForManager);
  };

  const changeCardHandler = (actionStatus: string) => {
    setSearchParams({ actionStatus });
    setBadgeCount(0);
  };

  const openAdvanceFilterHandler = () => {
    setAdvanceModalOpen(true);
  };
  const closeAdvanceFilterHandler = () => {
    setAdvanceModalOpen(false);
    advanceFilterForm.resetFields();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {advanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={advanceModalOpen}
          closeModalHandler={closeAdvanceFilterHandler}
          filterItemsList={filterItemsList}
          form={advanceFilterForm}
          badgeCounter={(amount) => setBadgeCount(amount)}
          defaultParams={{ actionStatus }}
        />
      )}
      <div className="my-doctor-test-list-my-action-status-tab-container">
        <div className="test-card-container">
          <DemandCard
            title="نیازمند اقدام"
            active={actionStatus === TEST_ACTION_IDS.needAction}
            clickHandler={() => changeCardHandler(TEST_ACTION_IDS.needAction)}
          />
          <DemandCard
            title="نیازمند اقدام مجدد"
            active={actionStatus === TEST_ACTION_IDS.needReAction}
            clickHandler={() => changeCardHandler(TEST_ACTION_IDS.needReAction)}
          />
          <DemandCard
            title="عدم نیاز به اقدام"
            active={actionStatus === TEST_ACTION_IDS.noNeedAction}
            clickHandler={() => changeCardHandler(TEST_ACTION_IDS.noNeedAction)}
          />
        </div>
        <div className="test-table-container">
          <CustomDivider text="لیست شرکت کنندگان آزمون" />

          <div className="test-list-container">
            <ToolBox
              className="custom-toolbox"
              rightSide={
                <CustomBadge count={badgeCount}>
                  <CustomButton
                    type="primary"
                    icon={<AiOutlineFilter />}
                    onClick={openAdvanceFilterHandler}
                  >
                    فیلتر پیشرفته
                  </CustomButton>
                </CustomBadge>
              }
              leftSide={
                <Dropdown menu={exportMenu} trigger={["click"]}>
                  <CustomButton disabled>
                    خروجی <IoIosArrowDown />
                  </CustomButton>
                </Dropdown>
              }
            />
            <CustomTable<MyDoctorTestActionListResponseForManager>
              dataSource={data?.content}
              columns={MyDoctorActionTestListTableModel({ type: actionStatus })}
              loading={isTestListLoading || isTestFilterListLoading}
              pagination={manualPaginationConfig({
                total: data?.totalElements,
                onChange: (page, pageSize) => {
                  setSearchParams({
                    ...url,
                    page: page?.toString(),
                    pageSize: pageSize?.toString(),
                  });
                },
                pageNumber: url?.page ? Number(url?.page) : 1,
                defaultPageSize: url?.pageSize ? Number(url?.pageSize) : 8,
              })}
              key={`table-${url?.pageSize || "8"} `}
              {...TABLE_PROPS(data?.content?.length ?? 0)}
              rowKey="id"
            />
            <CustomTotalTableItems
              totalCount={data?.totalElements ?? 0}
              label="تعداد کل شرکت کنندگان"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyTestActionStatusListTab;
