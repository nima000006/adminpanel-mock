import { useEffect, useRef, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter, AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomRangePicker from "@components/CustomInputs/CustomRangePicker/CustomRangePicker";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { makeQueryParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_HABITANTS_EVACUATION_PAGE_ROUTE } from "@infra/router/routes/dorm";
import {
  useLazyGetHabitantsListCountQuery,
  useLazyGetHabitantsListQuery,
} from "@infra/states/redux/Apis/dorm/habitants/dormHabitantsApi";
import CustomExcelDownloadButton from "@pages/Dorm/_shared/helper/CustomExcelDownloadButton/CustomExcelDownloadButton";

import { GetHabitantsListResponse, HabitantsListData } from "./@types/@habitantsList";
import { UseHabitantsAdvanceFilterFormType } from "./helpers/modals/advanceFilterModal/HabitantsAdvanceFilter/@types/@useHabitantsAdvanceFilter";
import useHabitantsAdvanceFilter from "./helpers/modals/advanceFilterModal/HabitantsAdvanceFilter/HabitantsAdvanceFilter";
import DormHabitantsTableListModel from "./helpers/model/DormHabitantsTableListModel/DormHabitantsTableListModel";

const FILTER_DEPENDENCIES = [
  "genderId",
  "userGroupId",
  "uniId",
  "dormitoryId",
  "educationDegreeId",
  "schedulingId",
  "provinceId",
  "cityId",
  "buildingId",
  "floorId",
  "roomId",
];

const TABLE_DEPENDENCIES = ["name", "sortings", "lastName", "studentNumber"];

const HabitantsList = () => {
  useTitle({ text: "ساکنین" });

  const [dataSource, setDataSource] = useState<HabitantsListData[]>([]);

  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(0);

  const { params, setSearchParams } = useQueryParams();

  const [form] = Form.useForm<UseHabitantsAdvanceFilterFormType>();

  const { filterItemsList, fetchInitialData } = useHabitantsAdvanceFilter(form);

  const excelFilesQueryRef = useRef("");

  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [getHabitantsList, { isFetching: isGetHabitantsListLoading }] =
    useLazyGetHabitantsListQuery();

  const [
    getHabitantsListCount,
    { data: habitantsListCount, isFetching: isGetHabitantsListCountLoading },
  ] = useLazyGetHabitantsListCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getHabitants();
  }, [
    params?.page,
    params?.pageSize,
    ...FILTER_DEPENDENCIES.map((key) => params?.[key]),
    ...TABLE_DEPENDENCIES.map((item) => params?.[item]),
  ]);

  useEffect(() => {
    getHabitantsCount();

    // for excel file
    const par = {
      AssociationCategoryDeliverPlan_branchId: params?.uniId,
      AssociationBed_dormitoryid_IN: params?.dormitoryId,
      AssociationCustomer_AssociationCustomerUser_genderId_IN: params?.genderId,
      AssociationCustomer_userGroupID_IN: params?.userGroupId,
      AssociationCustomer_AssociationStudent_gradeId_IN: params?.educationDegreeId,
      AssociationCategoryDeliverPlan_schedulingId_IN: params?.schedulingId,
      AssociationCategoryDeliverPlan_AssociationCategoryBranch_AssociationCategoryRegion_parentId_IN:
        params?.provinceId,
      AssociationCategoryDeliverPlan_AssociationCategoryBranch_regionId_IN:
        params?.cityId,
      AssociationBed_buildingid_IN: params?.buildingId,
      AssociationBed_floorId_IN: params?.floorId,
      AssociationBed_roomId_IN: params?.roomId,
      name: params?.name,
      lastName: params?.lastName,
      studentNumber: params?.studentNumber,
      sortings: params?.sortings,
    };

    excelFilesQueryRef.current = makeQueryParams(par);
  }, [
    ...FILTER_DEPENDENCIES.map((key) => params?.[key]),
    ...TABLE_DEPENDENCIES.map((item) => params?.[item]),
  ]);

  useEffect(
    () => {
      const activeFilters = FILTER_DEPENDENCIES.filter((key) => params?.[key]).length;
      setBadgeCount(activeFilters);
    },
    FILTER_DEPENDENCIES.map((key) => params?.[key])
  );

  useEffect(() => {
    if (advanceModalOpen) {
      fetchInitialData();
    }
  }, [advanceModalOpen]);

  //* ================================ Util Functions ================================
  //success
  const getHabitantsIsSuccess = async (value: GetHabitantsListResponse) => {
    if (value?.status === 200) {
      setDataSource(value?.data);
    }
  };

  const getHabitants = () => {
    getHabitantsList({
      firstResult: params?.page ? Number((+params.page - 1) * +params.pageSize) : 0,
      maxResults: params?.pageSize ? Number(params?.pageSize) : 8,
      AssociationCustomer_AssociationCustomerUser_genderId_IN: params?.genderId,
      AssociationCustomer_userGroupID_IN: params?.userGroupId,
      AssociationCategoryDeliverPlan_branchId: params?.uniId,
      AssociationBed_dormitoryid_IN: params?.dormitoryId,
      AssociationCustomer_AssociationStudent_gradeId_IN: params?.educationDegreeId,
      AssociationCategoryDeliverPlan_schedulingId_IN: params?.schedulingId,
      AssociationCategoryDeliverPlan_AssociationCategoryBranch_AssociationCategoryRegion_parentId_IN:
        params?.provinceId,
      AssociationCategoryDeliverPlan_AssociationCategoryBranch_regionId_IN:
        params?.cityId,
      AssociationBed_buildingid_IN: params?.buildingId,
      AssociationBed_floorId_IN: params?.floorId,
      AssociationBed_roomId_IN: params?.roomId,
      AssociationCustomer_AssociationCustomerUser_firstName_IN: params?.name,
      AssociationCustomer_AssociationCustomerUser_lastName_IN: params?.lastName,
      AssociationCustomer_AssociationStudent_studentNumber_IN: params?.studentNumber,
      sortings: params?.sortings,
    })
      .unwrap()
      .then(getHabitantsIsSuccess);
  };

  const getHabitantsCount = () => {
    getHabitantsListCount({
      AssociationCustomer_AssociationCustomerUser_genderId_IN: params?.genderId,
      AssociationCustomer_userGroupID_IN: params?.userGroupId,
      AssociationCategoryDeliverPlan_branchId: params?.uniId,
      AssociationBed_dormitoryid_IN: params?.dormitoryId,
      AssociationCustomer_AssociationStudent_gradeId_IN: params?.educationDegreeId,
      AssociationCategoryDeliverPlan_schedulingId_IN: params?.schedulingId,
      AssociationCategoryDeliverPlan_AssociationCategoryBranch_AssociationCategoryRegion_parentId_IN:
        params?.provinceId,
      AssociationCategoryDeliverPlan_AssociationCategoryBranch_regionId_IN:
        params?.cityId,
      AssociationBed_buildingid_IN: params?.buildingId,
      AssociationBed_floorId_IN: params?.floorId,
      AssociationBed_roomId_IN: params?.roomId,
      AssociationCustomer_AssociationCustomerUser_firstName_IN: params?.name,
      AssociationCustomer_AssociationCustomerUser_lastName_IN: params?.lastName,
      AssociationCustomer_AssociationStudent_studentNumber_IN: params?.studentNumber,
      sortings: params?.sortings,
    });
  };

  const openAdvanceFilterHandler = () => {
    setAdvanceModalOpen(true);
  };
  const closeAdvanceFilterHandler = () => {
    setAdvanceModalOpen(false);
    form.resetFields();
  };

  const evacuationHandler = () => {
    navigate(DORM_HABITANTS_EVACUATION_PAGE_ROUTE);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {advanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={advanceModalOpen}
          closeModalHandler={closeAdvanceFilterHandler}
          filterItemsList={filterItemsList}
          form={form}
          badgeCounter={(amount) => setBadgeCount(amount)}
          defaultParams={{ ...params }}
        />
      )}

      <div className="flex flex-col gap-[18px]">
        <ToolBox
          rightSide={<CustomRangePicker name="date" picker="date" />}
          leftSide={
            <div className="flex flex-wrap gap-2.5 sm:flex-nowrap">
              <CustomButton type="primary" ghost disabled>
                آرشیو ساکنان پیشین
              </CustomButton>
              <CustomButton type="primary" onClick={evacuationHandler}>
                تخلیه ساکنین
              </CustomButton>
            </div>
          }
        />
        <ToolBox
          rightSide={
            <div className="flex flex-wrap gap-2.5 sm:flex-nowrap">
              <CustomBadge count={badgeCount}>
                <CustomButton
                  type="primary"
                  icon={<AiOutlineFilter />}
                  onClick={openAdvanceFilterHandler}
                >
                  فیلتر پیشرفته
                </CustomButton>
              </CustomBadge>
              <CustomInput
                suffix={<AiOutlineSearch />}
                placeholder="جستجو بر اساس کد ملی / فراگیر"
                hasVerticalLabel={false}
                disabled
              />
            </div>
          }
          leftSide={
            <CustomExcelDownloadButton
              excelTitle="آرشیو ساکنان پیشین"
              restOfUrl={excelFilesQueryRef.current}
              formId="ResidentInformationList"
              type="primary"
              ghost
              className="btn-text"
              disabled
            />
          }
        />
        <CustomTable
          dataSource={dataSource}
          rowKey="id"
          columns={DormHabitantsTableListModel()}
          pagination={manualPaginationConfig({
            total: habitantsListCount?.data,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...params,
                page: page?.toString(),
                pageSize: pageSize?.toString(),
              });
            },
            pageNumber: params?.page ? Number(params?.page) : 1,
            defaultPageSize: params?.pageSize ? Number(params?.pageSize) : 8,
          })}
          loading={isGetHabitantsListLoading || isGetHabitantsListCountLoading}
          key={`table-${params?.pageSize || "8"} `}
          {...TABLE_PROPS(dataSource?.length)}
        />
      </div>
    </>
  );
};
export default HabitantsList;
