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
  useGetMyDoctorTestFilterListForManagerMutation,
  useGetMyDoctorTestListForManagerMutation,
} from "@infra/states/redux/Apis/myDoctor/test/testApis";

import useFollowUpAdvanceFilterForManager from "./helper/modals/advanceFilter/useFollowUpAdvanceFilterForManager";
import { TEST_IDS } from "../../../utils/testConstant";
import MyDoctorTestListTableModel from "../../utils/model/TestListTableModel/MyDoctorTestListTableModel";
import {
  GetMyDoctorTestFilterListForManagerResponse,
  GetMyDoctorTestListResponseForManager,
  MyDoctorTestList,
} from "../MyTestFollowUpListTab/@types/@myTestFollowUpListTab";
import "./_myTestFollowUpListTab.scss";

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
  "followUpNameTitle",
  "followUpFamilyTitle",
  "followUpNationalNumberTitle",
  "followUpStudentNumberTitle",
  "followUpSuicideStatusId",
  "followUpActionStatusId",
  "followUpDateDateStart",
  "followUpDateDateEnd",
];

const MyTestFollowUpListTab = () => {
  const [data, setData] = useState<GetMyDoctorTestListResponseForManager | null>(null);

  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);

  const { params: url, setSearchParams } = useQueryParams();
  const [badgeCount, setBadgeCount] = useState(0);

  const [advanceFilterForm] = Form.useForm();

  const testStatus = url.testStatus || TEST_IDS.Immediate;
  const page = url.page;
  const pageSize = url.pageSize;

  const { filterItemsList } = useFollowUpAdvanceFilterForManager();

  //? ================================  Api Calls ================================

  const [getTestList, { isLoading: isTestListLoading }] =
    useGetMyDoctorTestListForManagerMutation();

  const [getTestFilterList, { isLoading: isTestFilterListLoading }] =
    useGetMyDoctorTestFilterListForManagerMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!url.testStatus) {
      setSearchParams({
        testStatus: TEST_IDS.Immediate,
      });
    }
  }, []);

  useEffect(() => {
    if (testStatus) {
      if (
        !url?.followUpNameTitle &&
        !url?.followUpFamilyTitle &&
        !url?.followUpNationalNumberTitle &&
        !url?.followUpStudentNumberTitle &&
        !url?.followUpSuicideStatusId &&
        !url?.followUpActionStatusId &&
        !url?.followUpDateDateStart &&
        !url?.followUpDateDateEnd
      ) {
        getTestList({
          pageNo: page ? Number(page) - 1 : 0,
          pageSize: pageSize ? +pageSize : 8,
          statusId: testStatus,
        })
          .unwrap()
          .then(onTestListSuccess);
      } else {
        getTestFilterList({
          pageNo: page ? Number(page) - 1 : 0,
          pageSize: pageSize ? +pageSize : 8,
          body: {
            surveyStatusType: +testStatus,
            ...(url?.followUpNameTitle ? { firstName: url?.followUpNameTitle } : {}),
            ...(url?.followUpFamilyTitle ? { lastName: url?.followUpFamilyTitle } : {}),
            ...(url?.followUpNationalNumberTitle
              ? { username: url?.followUpNationalNumberTitle }
              : {}),
            ...(url?.followUpStudentNumberTitle
              ? { studentNumber: url?.followUpStudentNumberTitle }
              : {}),
            ...(url?.followUpSuicideStatusId
              ? { suicideRisk: +url?.followUpSuicideStatusId }
              : {}),
            ...(url?.followUpActionStatusId
              ? { followUpStatusType: +url?.followUpActionStatusId }
              : {}),
            ...(url?.followUpDateDateStart
              ? { from: convertTimezoneToStartOfDayISO(url?.followUpDateDateStart) }
              : {}),
            ...(url?.followUpDateDateEnd
              ? { to: convertTimezoneToStartOfDayISO(url?.followUpDateDateEnd) }
              : {}),
          },
        })
          .unwrap()
          .then(getTestFilterListSuccess);
      }
    }
  }, [page, pageSize, testStatus, ...FILTER_DEPENDENCIES.map((key) => url?.[key])]);

  //* ================================ Util Functions ================================

  const onTestListSuccess = (value: GetMyDoctorTestListResponseForManager) => {
    setData(value);
  };

  const getTestFilterListSuccess = (
    value: GetMyDoctorTestFilterListForManagerResponse
  ) => {
    setData(value);
  };

  const changeCardHandler = (status: string) => {
    setSearchParams({ testStatus: status });
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
          badgeCounter={(amount) => setBadgeCount(amount)}
          defaultParams={{ testStatus }}
          form={advanceFilterForm}
        />
      )}
      <div className="my-doctor-test-list-my-follow-up-tab-container">
        <div className="test-card-container">
          <DemandCard
            title="نیازمند پیگیری فوری"
            badge={true}
            badgeColor="red"
            badgeTitle={"شدید"}
            active={testStatus === TEST_IDS.Immediate}
            clickHandler={() => changeCardHandler(TEST_IDS.Immediate)}
          />
          <DemandCard
            title="نیازمند پیگیری"
            badge={true}
            badgeColor="orange"
            badgeTitle={"متوسط و خفیف"}
            active={testStatus === TEST_IDS.follow}
            clickHandler={() => changeCardHandler(TEST_IDS.follow)}
          />
          <DemandCard
            title="عدم نیاز پیگیری"
            badge={true}
            badgeColor="blue"
            badgeTitle={"نرمال"}
            active={testStatus === TEST_IDS.notFollow}
            clickHandler={() => changeCardHandler(TEST_IDS.notFollow)}
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

            <CustomTable<MyDoctorTestList>
              dataSource={data?.content}
              columns={MyDoctorTestListTableModel()}
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

export default MyTestFollowUpListTab;
