import { useEffect, useState } from "react";

import { Col, Dropdown, Form, MenuProps, Row } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
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
  useGetMyDoctorActionTestListMutation,
  useGetMyDoctorTestFilterListMutation,
} from "@infra/states/redux/Apis/myDoctor/test/testApis";

import {
  GetMyDoctorActionTestListResponse,
  MyDoctorActionTestList,
} from "./@types/@allTestActionStatusListTab";
import { TEST_ACTION_IDS } from "../../../utils/testConstant";
import MyDoctorActionTestListTableModel from "../../utils/model/MyDoctorActionTestList/MyDoctorActionTestListTableModel";
import { GetMyDoctorTestFilterListResponse } from "../AllTestFollowUpListTab/@types/@allTestFollowUpListTab";
import useActionStatusAdvanceFilter from "./helper/modals/advanceFilter/useActionStatusAdvanceFilter";

import "./_allTestActionStatusListTab.scss";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";

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

const AllTestActionStatusListTab = () => {
  const [unitId, setUnitId] = useState<number[]>([]);
  const [data, setData] = useState<GetMyDoctorActionTestListResponse | null>(null);

  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const { params: url, setSearchParams } = useQueryParams();
  const [badgeCount, setBadgeCount] = useState(0);

  const [form] = Form.useForm();
  const [advanceFilterForm] = Form.useForm();

  const actionStatus = url.actionStatus || TEST_ACTION_IDS.needAction;
  const page = url.page;
  const pageSize = url.pageSize;

  const { filterItemsList } = useActionStatusAdvanceFilter();

  //? ================================  Api Calls ================================
  const [getAllUniversity, { data: universityData, isLoading: isUniversityDataLoading }] =
    useLazyGetAllBranchesQuery();

  const [getTestList, { isLoading: isTestListLoading }] =
    useGetMyDoctorActionTestListMutation();

  const [getTestFilterList, { isLoading: isTestFilterListLoading }] =
    useGetMyDoctorTestFilterListMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getAllUniversity();
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
          body: {
            statusId: +actionStatus,
            branchCodes: unitId.length > 0 ? unitId : [],
          },
        })
          .unwrap()
          .then(onTestListSuccess);
      } else {
        getTestFilterList({
          pageNo: page ? Number(page) - 1 : 0,
          pageSize: pageSize ? +pageSize : 8,
          body: {
            followUpStatusType: +actionStatus,
            branches: unitId.length > 0 ? unitId : [],
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
  }, [
    page,
    pageSize,
    actionStatus,
    unitId,
    ...FILTER_DEPENDENCIES.map((key) => url?.[key]),
  ]);

  //* ================================ Util Functions ================================

  const onTestListSuccess = (value: GetMyDoctorActionTestListResponse) => {
    setData(value);
  };

  const getTestFilterListSuccess = (
    value: GetMyDoctorTestFilterListResponse | GetMyDoctorActionTestListResponse
  ) => {
    setData(value as GetMyDoctorActionTestListResponse);
  };

  const changeUnitHandler = (id: number[]) => {
    setUnitId(id);
  };

  const changeCardHandler = (actionStatus: string) => {
    setSearchParams({ actionStatus });
  };

  const openAdvanceFilterHandler = () => {
    setAdvanceModalOpen(true);
  };
  const closeAdvanceFilterHandler = () => {
    setAdvanceModalOpen(false);
    advanceFilterForm.resetFields();
  };

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
      <div className="my-doctor-test-list-all-action-status-tab-container">
        <Form form={form}>
          <Row>
            <Col span={12}>
              <CustomSelect
                form={form}
                options={universityData ? universityData : []}
                name="unit"
                label="واحد"
                onChange={(e) => changeUnitHandler(e as number[])}
                loading={isUniversityDataLoading}
                mode="multiple"
                placeholder={"لطفا واحد مورد نظر را انتخاب کنید"}
              />
            </Col>
          </Row>
        </Form>
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

            <CustomTable<MyDoctorActionTestList>
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

export default AllTestActionStatusListTab;
