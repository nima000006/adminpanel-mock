import { useEffect, useReducer, useState } from "react";

import { Col, Form, Row } from "antd";
import { Key } from "antd/es/table/interface";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { PiListChecks } from "react-icons/pi";
import { useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { INTERNATIONAL_BASIC_INFO_ADMISSION_PROGRAM_ROUTE } from "@infra/router/routes/international";
import {
  useCreateInternationalAdmissionBranchInformationMutation,
  useGetAllBranchesByAdvanceFilterMutation,
  useGetAllFieldsWithDegreesAndGroupIdMutation,
  useGetBranchStudyGroupWithDegreesAndFieldsMutation,
  useLazyGetInternationalDegreesByGroupIdQuery,
} from "@infra/states/redux/Apis/international/basicInfo/internationalBasicInfo";
import { fieldsOfStudiesGroupList } from "@pages/International/utils/internationalUtils";

import {
  AdmissionProgramCreateFieldProps,
  CreateFieldSearchFormType,
} from "./@types/@admissionProgramCreateField";
import {
  createFieldsInitialSelectedItems,
  createFieldsSelectedItemsReducer,
} from "../../../utils/AdmissionProgramModifyFieldsUtils";
import InternationalAdmissionCreateFieldTableModel from "./helper/models/InternationalAdmissionCreateField/InternationalAdmissionCreateFieldTableModel";
import "./_admissionProgramCreateField.scss";

const AdmissionProgramCreateField = ({
  setCurrent,
}: AdmissionProgramCreateFieldProps) => {
  const [selectedItems, selectedItemsDispatch] = useReducer(
    createFieldsSelectedItemsReducer,
    createFieldsInitialSelectedItems
  );

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[] | []>([]);

  const [searchForm] = Form.useForm<CreateFieldSearchFormType>();

  const {
    params: { id },
  } = useQueryParams();

  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [getDegreeData, { data: degreeData, isFetching: isDegreeDataLoading }] =
    useLazyGetInternationalDegreesByGroupIdQuery();

  const [getFieldsData, { data: fieldsData, isLoading: isFieldsDataLoading }] =
    useGetAllFieldsWithDegreesAndGroupIdMutation();

  const [getBranchesData, { data: branchData, isLoading: isBranchesDataLoading }] =
    useGetBranchStudyGroupWithDegreesAndFieldsMutation();

  const [
    getBranchesListData,
    { data: branchListData, isLoading: isBranchesListDataLoading },
  ] = useGetAllBranchesByAdvanceFilterMutation();

  const [createBranchInfo, { isLoading: isCreateBranchInfoLoading }] =
    useCreateInternationalAdmissionBranchInformationMutation();

  //? ================================ effects  ================================
  useEffect(() => {
    if (
      selectedItems.category.length > 0 ||
      selectedItems.degree.length > 0 ||
      selectedItems.fieldOfStudy.length > 0 ||
      selectedItems.branch.length > 0
    ) {
      searchBranchListHandler();
    }
  }, [selectedItems]);
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

  const searchBranchListHandler = () => {
    getBranchesListData({
      branchIds: selectedItems.branch,
      degreeIds: selectedItems.degree,
      fieldIds: selectedItems.fieldOfStudy,
      studyGroupId: +selectedItems.category?.[0],
    });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const prevBtnClickHandler = () => {
    setCurrent(0);
  };

  const nextBtnClickHandler = () => {
    createBranchInfo({
      branchFieldIds: selectedRowKeys,
      id: +id,
    })
      .unwrap()
      .then(() => {
        navigate({ pathname: INTERNATIONAL_BASIC_INFO_ADMISSION_PROGRAM_ROUTE });
        setCurrent(2);
      });
    setCurrent(2);
  };

  return (
    <div className="admission-program-create-field-container">
      <CustomAlert
        type="info"
        message="راهنما!"
        closable
        showIcon
        description="رشته مقطع واحد‌هایی که میخواهید برای آن‌ها یک برنامه پذیرش بسازید را انتخاب کنید."
      />
      <div>
        <CustomDivider text="فیلتر‌ها" />
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
                mode="multiple"
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
          </Row>
        </Form>
      </div>
      <div>
        <CustomDivider
          text="لیست رشته‌ها"
          extraContent={
            <CustomButton
              className="text-neutral-11! cursor-default! border-transparent!"
              disabled
              icon={<PiListChecks />}
            >
              تعداد انتخاب شده‌ها: :{selectedRowKeys?.length}
            </CustomButton>
          }
        />
        <CustomTable
          dataSource={branchListData ? branchListData : []}
          columns={InternationalAdmissionCreateFieldTableModel()}
          pagination={paginationConfig}
          rowSelection={{
            type: "checkbox",
            columnWidth: "20px",
            ...rowSelection,
          }}
          loading={isBranchesListDataLoading}
          {...TABLE_PROPS(branchListData?.length || 0)}
          rowKey="branchFieldId"
          className="international-admission-table"
        />
      </div>
      <div className="action-btns-container">
        <CustomButton icon={<AiOutlineArrowRight />} onClick={prevBtnClickHandler}>
          بازگشت
        </CustomButton>
        <CustomButton
          icon={<AiOutlineArrowLeft />}
          iconPlacement="end"
          type="primary"
          disabled={selectedRowKeys.length === 0}
          loading={isCreateBranchInfoLoading}
          onClick={nextBtnClickHandler}
        >
          ثبت و ادامه
        </CustomButton>
      </div>
    </div>
  );
};

export default AdmissionProgramCreateField;
