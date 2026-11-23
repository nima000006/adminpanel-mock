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

import useFollowUpAdvanceFilter from "./helper/modals/advanceFilter/useFollowUpAdvanceFilter";
import MyDoctorTestListTableModel from "../../utils/model/TestListTableModel/MyDoctorTestListTableModel";

import { convertTimezoneToStartOfDayISO } from "@infra/helpers/dateConvertor";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import "./_allTestFollowUpListTab.scss";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import {
  useGetMyDoctorTestFilterListMutation,
  useGetMyDoctorTestListMutation,
} from "@infra/states/redux/Apis/myDoctor/test/testApis";
import { MyDoctorActionTestList } from "@pages/MyDoctor/Tests/TestsList/AllTestList/helper/components/AllTestActionStatusListTab/@types/@allTestActionStatusListTab";

import {
  GetMyDoctorTestFilterListResponse,
  GetMyDoctorTestListResponse,
  MyDoctorTestList,
} from "./@types/@allTestFollowUpListTab";
import { TEST_IDS } from "../../../utils/testConstant";

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

const AllTestFollowUpListTab = () => {
  const [unitId, setUnitId] = useState<number[]>([]);
  const [data, setData] = useState<GetMyDoctorTestFilterListResponse | null>(null);

  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);

  const { params: url, setSearchParams } = useQueryParams();
  const [badgeCount, setBadgeCount] = useState(0);

  const [form] = Form.useForm();
  const [advanceFilterForm] = Form.useForm();

  const status = url.status || TEST_IDS.Immediate;
  const page = url.page;
  const pageSize = url.pageSize;

  const { filterItemsList } = useFollowUpAdvanceFilter();

  //? ================================  Api Calls ================================
  const [getAllUniversity, { data: universityData, isLoading: isUniversityDataLoading }] =
    useLazyGetAllBranchesQuery();

  const [getTestList, { isLoading: isTestListLoading }] =
    useGetMyDoctorTestListMutation();

  const [getTestFilterList, { isLoading: isTestFilterListLoading }] =
    useGetMyDoctorTestFilterListMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getAllUniversity();
    if (!url.status) {
      setSearchParams({
        status: TEST_IDS.Immediate,
      });
    }
  }, []);

  useEffect(() => {
    if (status) {
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
          body: {
            statusId: +status,
            branchCodes: unitId.length > 0 ? unitId : [],
          },
        })
          .unwrap()
          .then(onTestListSuccess)
          .catch(() => {
            setData(null);
          });
      } else {
        getTestFilterList({
          pageNo: page ? Number(page) - 1 : 0,
          pageSize: pageSize ? +pageSize : 8,
          body: {
            surveyStatusType: +status,
            branches: unitId.length > 0 ? unitId : [],
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
          .then(getTestFilterListSuccess)
          .catch(() => {
            setData(null);
          });
      }
    }
  }, [page, pageSize, status, unitId, ...FILTER_DEPENDENCIES.map((key) => url?.[key])]);

  //* ================================ Util Functions ================================

  const onTestListSuccess = (value: GetMyDoctorTestListResponse) => {
    setData(value);
  };

  const getTestFilterListSuccess = (value: GetMyDoctorTestFilterListResponse) => {
    setData(value);
  };

  const changeUnitHandler = (id: number[]) => {
    setUnitId(id);
  };

  const changeCardHandler = (status: string) => {
    setSearchParams({ status });
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
          defaultParams={{ status }}
        />
      )}
      <div className="my-doctor-test-list-all-follow-up-tab-container">
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
            title="نیازمند پیگیری فوری"
            badge={true}
            badgeColor="red"
            badgeTitle={"شدید"}
            active={status === TEST_IDS.Immediate}
            clickHandler={() => changeCardHandler(TEST_IDS.Immediate)}
          />
          <DemandCard
            title="نیازمند پیگیری"
            badge={true}
            badgeColor="orange"
            badgeTitle={"متوسط و خفیف"}
            active={status === TEST_IDS.follow}
            clickHandler={() => changeCardHandler(TEST_IDS.follow)}
          />
          <DemandCard
            title="عدم نیاز پیگیری"
            badge={true}
            badgeColor="blue"
            badgeTitle={"نرمال"}
            active={status === TEST_IDS.notFollow}
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

            <CustomTable<MyDoctorActionTestList | MyDoctorTestList>
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

export default AllTestFollowUpListTab;
