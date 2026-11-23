import { useEffect, useReducer, useState } from "react";

import { Col, Form, Row } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { PiHash } from "react-icons/pi";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { INTERNATIONAL_BASIC_INFO_ROUTE } from "@infra/router/routes/international";
import {
  useGetAllCoursesByAdvanceFilterMutation,
  useGetAllFieldsWithDegreesAndGroupIdMutation,
  useGetBranchStudyGroupWithDegreesAndFieldsMutation,
  useLazyGetInternationalDegreesByGroupIdQuery,
} from "@infra/states/redux/Apis/international/basicInfo/internationalBasicInfo";
import { fieldsOfStudiesGroupList } from "@pages/International/utils/internationalUtils";

import { HasAdmissionFieldsSearchFormType } from "./@types/@internationalHasAdmissionFieldsTab";
import InternationalHasAdmissionFieldTableModel from "./helper/models/InternationalHasAdmissionField/InternationalHasAdmissionFieldTableModel";
import {
  initialSelectedItems,
  selectedItemsReducer,
} from "./utils/InternationalHasAdmissionFieldsUtils";
import "./_internationalHasAdmissionFieldsTab.scss";

const InternationalHasAdmissionFieldsTab = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={INTERNATIONAL_BASIC_INFO_ROUTE}>اطلاعات پایه</Link>,
      },

      {
        title: " برنامه پذیرش",
      },
    ],
  });
  const [hasSearched, setHasSearched] = useState(false);

  const [selectedItems, selectedItemsDispatch] = useReducer(
    selectedItemsReducer,
    initialSelectedItems
  );

  const { params: url, setSearchParams } = useQueryParams();

  const [searchForm] = Form.useForm<HasAdmissionFieldsSearchFormType>();

  //? ================================  Api Calls ================================
  const [getDegreeData, { data: degreeData, isFetching: isDegreeDataLoading }] =
    useLazyGetInternationalDegreesByGroupIdQuery();

  const [getFieldsData, { data: fieldsData, isLoading: isFieldsDataLoading }] =
    useGetAllFieldsWithDegreesAndGroupIdMutation();

  const [getBranchesData, { data: branchData, isLoading: isBranchesDataLoading }] =
    useGetBranchStudyGroupWithDegreesAndFieldsMutation();

  const [
    getAllCoursesData,
    { data: allCoursesData, isLoading: isAllCoursesDataLoading },
  ] = useGetAllCoursesByAdvanceFilterMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (url?.page && url?.page) {
      searchStudyFinderByPageHandler();
    }
  }, [url?.page, url?.page]);

  //* ================================ Util Functions ================================
  // filed group
  const filedGroupChangeHandler = (e: string) => {
    selectedItemsDispatch({ type: "category", value: [+e] });

    getDegreeData(e);

    searchForm.setFieldsValue({
      degree: undefined,
      fieldOfStudy: undefined,
      branch: undefined,
    });
  };

  // degree
  const degreeChangeHandler = (e: string) => {
    if (selectedItems.category.length > 0) {
      getFieldsData({
        degreeIds: [e],
        groupId: +selectedItems.category?.[0],
      });
    }
    selectedItemsDispatch({ type: "degree", value: [+e] });

    searchForm.setFieldsValue({
      fieldOfStudy: undefined,
      branch: undefined,
    });
  };

  // field
  const fieldOfStudyChangeHandler = (e: string) => {
    if (selectedItems.category) {
      getBranchesData({
        degrees: selectedItems.degree,
        fields: [+e],
        studyGroupId: +selectedItems.category?.[0],
      });
    }
    searchForm.setFieldsValue({
      branch: undefined,
    });
    selectedItemsDispatch({ type: "fieldOfStudy", value: [+e] });
  };

  // branch
  const branchChangeHandler = (e: string[]) => {
    selectedItemsDispatch({ type: "branch", value: e.map((item) => +item) });
  };

  const searchStudyFinderHandler = () => {
    setHasSearched(true);
    setSearchParams({
      ...url,
      page: "1",
      pageSize: "8",
    });

    getAllCoursesData({
      groupId: +selectedItems.category?.[0],
      degreeIds: selectedItems.degree,
      fieldId: selectedItems.fieldOfStudy,
      branchIds: selectedItems.branch,
      pageNumber: 0,
      pageSize: 8,
    });
  };

  const isFormEmpty =
    !selectedItems.category.length &&
    !selectedItems.degree.length &&
    !selectedItems.fieldOfStudy.length &&
    !selectedItems.branch.length;

  // when click another page
  const searchStudyFinderByPageHandler = () => {
    if (selectedItems.category?.[0]) {
      getAllCoursesData({
        groupId: +selectedItems.category?.[0],
        degreeIds: selectedItems.degree,
        fieldId: selectedItems.fieldOfStudy,
        branchIds: selectedItems.branch,
        pageNumber: url?.page ? Number(url?.page) - 1 : 0,
        pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
      });
    }
  };

  return (
    <div className="international-has-admission-fields-tab-container">
      <Form form={searchForm}>
        <Row gutter={[16, 16]}>
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomSelect
              name="fieldGroup"
              options={fieldsOfStudiesGroupList}
              label="گروه رشته"
              onChange={(e) => filedGroupChangeHandler(e as string)}
              placeholder="انتخاب کنید"
              form={searchForm}
            />
          </Col>
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomSelect
              name="degree"
              options={degreeData ? degreeData : []}
              label="مقطع"
              onChange={(e) => degreeChangeHandler(e as string)}
              disabled={selectedItems?.category?.length === 0}
              loading={isDegreeDataLoading}
              placeholder="انتخاب کنید"
              form={searchForm}
            />
          </Col>
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomSelect
              name="fieldOfStudy"
              options={fieldsData ? fieldsData : []}
              label="رشته‌ تحصیلی"
              onChange={(e) => fieldOfStudyChangeHandler(e as string)}
              disabled={selectedItems?.degree?.length === 0}
              loading={isFieldsDataLoading}
              placeholder="انتخاب کنید"
              form={searchForm}
            />
          </Col>
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomSelect
              name="branch"
              options={branchData ? branchData : []}
              label="واحد‌"
              onChange={(e) => branchChangeHandler(e as string[])}
              loading={isBranchesDataLoading}
              disabled={selectedItems?.fieldOfStudy?.length === 0}
              placeholder="انتخاب کنید"
              mode="multiple"
              form={searchForm}
            />
          </Col>
          <Col span={24}>
            <CustomButton
              type="primary"
              icon={<AiOutlineSearch />}
              className="search-btn"
              onClick={searchStudyFinderHandler}
              disabled={selectedItems?.category?.length === 0}
            >
              جستجو
            </CustomButton>
          </Col>
        </Row>
      </Form>
      {!isFormEmpty && hasSearched && (
        <div className="table-container">
          <CustomDivider
            text="برنامه پذیرش‌های موجود"
            extraContent={
              <CustomButton
                className="cursor-default! border-transparent! text-[#1f1f1f]!"
                disabled
                icon={<PiHash />}
              >
                تعداد :{allCoursesData?.totalElements ? allCoursesData?.totalElements : 0}
              </CustomButton>
            }
          />
          <div className="filter-excel-btn-container">
            <CustomButton iconPlacement="end" icon={<AiOutlineFilter />}>
              فیلتر پیشرفته
            </CustomButton>
            <CustomButton>خروجی</CustomButton>
          </div>
          <CustomTable
            dataSource={allCoursesData?.content?.[0] ? allCoursesData?.content?.[0] : []}
            columns={InternationalHasAdmissionFieldTableModel()}
            pagination={manualPaginationConfig({
              total: allCoursesData?.totalElements,
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
            loading={isAllCoursesDataLoading}
            key={`table-${url?.pageSize || "8"} `}
            {...TABLE_PROPS(allCoursesData?.content?.[0]?.length || 0)}
            rowKey="courseId"
            className="international-admission-table"
          />
        </div>
      )}
    </div>
  );
};

export default InternationalHasAdmissionFieldsTab;
