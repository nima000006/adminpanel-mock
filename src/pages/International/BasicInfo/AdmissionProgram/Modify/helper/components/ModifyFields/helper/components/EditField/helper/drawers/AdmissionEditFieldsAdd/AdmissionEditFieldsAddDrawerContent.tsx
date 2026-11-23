import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import { Key } from "antd/es/table/interface";
import { AiOutlineSearch } from "react-icons/ai";
import { PiListChecks } from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import {
  useGetAllBranchesByAdvanceFilterMutation,
  useGetAllFieldsWithDegreesAndGroupIdMutation,
  useGetBranchStudyGroupWithDegreesAndFieldsMutation,
} from "@infra/states/redux/Apis/international/basicInfo/internationalBasicInfo";

import {
  AdmissionEditFieldsAddDrawerContentProps,
  SearchFormType,
} from "./@types/@admissionEditFieldsAddDrawerContent";
import { GetAllBranchesByAdvanceFilterResponse } from "../../../../../../@types/@admissionProgramModifyFields";
import InternationalAdmissionCreateFieldTableModel from "../../../../CreateField/helper/models/InternationalAdmissionCreateField/InternationalAdmissionCreateFieldTableModel";

const AdmissionEditFieldsAddDrawerContent = ({
  closeDrawerHandler,
  studyGroupData,
  degreeData,
  defaultSelectedRows,
  setDatasource,
  dataSource,
}: AdmissionEditFieldsAddDrawerContentProps) => {
  const [_, setSelectedFields] = useState<string[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[] | []>(defaultSelectedRows);
  const [selectedRow, setSelectedRow] = useState<
    GetAllBranchesByAdvanceFilterResponse | []
  >(
    dataSource?.map((item) => ({
      ...item,
      filedId: item?.fieldId,
      filedTitle: item?.fieldTitle,
      branchId: item?.branchId,
    }))
  );

  const [searchForm] = Form.useForm<SearchFormType>();
  //? ================================  Api Calls ================================

  const [getFieldsData, { data: fieldsData, isLoading: isFieldsDataLoading }] =
    useGetAllFieldsWithDegreesAndGroupIdMutation();

  const [getBranchesData, { data: branchData, isLoading: isBranchesDataLoading }] =
    useGetBranchStudyGroupWithDegreesAndFieldsMutation();

  const [
    getBranchesListData,
    { data: branchListData, isLoading: isBranchesListDataLoading },
  ] = useGetAllBranchesByAdvanceFilterMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getFieldsData({
      degreeIds: [degreeData?.id?.toString()],
      groupId: studyGroupData?.id,
    });

    getBranchesListData({
      degreeIds: [degreeData?.id],
      studyGroupId: +studyGroupData?.id,
    });
  }, []);

  //* ================================ Util Functions ================================
  // field
  const fieldOfStudyChangeHandler = (e: string[]) => {
    getBranchesData({
      degrees: [degreeData?.id],
      fields: e?.map((item) => +item),
      studyGroupId: +studyGroupData?.id,
    });

    searchForm.setFieldsValue({
      branch: undefined,
    });

    setSelectedFields(e);
  };

  const searchStudyFinderHandler = () => {
    const formData = searchForm.getFieldsValue();
    getBranchesListData({
      branchIds: formData?.branch?.map((item) => item?.code),
      degreeIds: [degreeData?.id],
      fieldIds: formData?.fieldOfStudy?.map((item) => item?.code),
      studyGroupId: +studyGroupData?.id,
    });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (
      selectedRowKeys: Key[],
      selectedRow: GetAllBranchesByAdvanceFilterResponse
    ) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRow(selectedRow);
    },
  };

  const addToListHandler = () => {
    const tempData = selectedRow?.map((item) => ({
      ...item,
      fieldTitle: item?.filedTitle,
      fieldId: item?.filedId,
    }));
    setDatasource(tempData);
    closeDrawerHandler();
  };

  return (
    <div className="admission-edit-fields-add-drawer-container">
      <CustomDrawerHeader
        title="افزودن رشته مقطع واحدهای جدید به لیست"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="action-btns-container">
            <CustomButton onClick={closeDrawerHandler}>انصراف</CustomButton>
            <CustomButton type="primary" onClick={addToListHandler} htmlType="submit">
              افزودن به لیست
            </CustomButton>
          </div>
        }
      />
      <div>
        <CustomDivider text="فیلتر‌ها" />
        <Form form={searchForm}>
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              xl={12}
              lg={12}
              md={12}
              value={studyGroupData?.title}
              label="گروه رشته"
            />
            <SingleVerticalWithCol
              xl={12}
              lg={12}
              md={12}
              value={degreeData?.title}
              label="مقطع"
            />

            <Col lg={12} md={12} sm={12} xs={24}>
              <CustomSelect
                name="fieldOfStudy"
                options={fieldsData ? fieldsData : []}
                label="رشته‌ تحصیلی"
                onChange={(e) => fieldOfStudyChangeHandler(e as string[])}
                loading={isFieldsDataLoading}
                placeholder="انتخاب کنید"
                mode="multiple"
                maxTagCount="responsive"
                form={searchForm}
              />
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <CustomSelect
                name="branch"
                options={branchData ? branchData : []}
                label="واحد‌"
                loading={isBranchesDataLoading}
                placeholder="انتخاب کنید"
                mode="multiple"
                form={searchForm}
                maxTagCount="responsive"
              />
            </Col>
            <Col span={24}>
              <CustomButton
                type="primary"
                icon={<AiOutlineSearch />}
                className="search-btn"
                onClick={searchStudyFinderHandler}
              >
                جستجو
              </CustomButton>
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
              تعداد انتخاب شده‌ها: :{selectedRowKeys.length}
            </CustomButton>
          }
        />
        <CustomTable
          dataSource={branchListData ? branchListData : []}
          columns={InternationalAdmissionCreateFieldTableModel()}
          pagination={paginationConfig}
          loading={isBranchesListDataLoading}
          rowSelection={{
            type: "checkbox",
            columnWidth: "30px",
            ...rowSelection,
          }}
          {...TABLE_PROPS(branchListData?.length || 0)}
          rowKey="branchFieldId"
          className="international-admission-table"
        />
      </div>
    </div>
  );
};

export default AdmissionEditFieldsAddDrawerContent;
