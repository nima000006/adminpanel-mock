import { useEffect, useState } from "react";

import { AiOutlineArrowRight, AiOutlineClose, AiOutlineMinus } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { PiListChecks } from "react-icons/pi";
import { useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { INTERNATIONAL_BASIC_INFO_ADMISSION_PROGRAM_ROUTE } from "@infra/router/routes/international";
import {
  useCreateInternationalAdmissionBranchInformationMutation,
  useLazyGetInternationalAdmissionDetailFieldsIfoQuery,
} from "@infra/states/redux/Apis/international/basicInfo/internationalBasicInfo";
import {
  GetInternationalAdmissionDetailFieldsInfoResponse,
  InternationalAdmissionDetailFieldsInfoType,
} from "@pages/International/BasicInfo/AdmissionProgram/Detail/helper/components/DetailFields/@types/@admissionProgramDetailFields";
import AdmissionProgramDetailFieldsTableModel from "@pages/International/BasicInfo/AdmissionProgram/Detail/helper/components/DetailFields/helper/models/AdmissionProgramDetailFields/AdmissionProgramDetailFieldsTableModel";

import { AdmissionProgramEditFieldProps } from "./@types/@admissionProgramEditFieldProps";
import AdmissionEditFieldsAddDrawerContent from "./helper/drawers/AdmissionEditFieldsAdd/AdmissionEditFieldsAddDrawerContent";
import AdmissionEditFieldsDeleteDrawerContent from "./helper/drawers/AdmissionEditFieldsDelete/AdmissionEditFieldsDeleteDrawerContent";

import "./_admissionProgramEditField.scss";

const AdmissionProgramEditField = ({ setCurrent }: AdmissionProgramEditFieldProps) => {
  const [dataSource, setDatasource] = useState<
    InternationalAdmissionDetailFieldsInfoType[]
  >([]);
  const {
    params: { id, copiedId },
  } = useQueryParams();

  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [getData, { isFetching: isAdmissionListLoading }] =
    useLazyGetInternationalAdmissionDetailFieldsIfoQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (copiedId) {
      getData(copiedId).unwrap().then(getDataSuccess);
    }
  }, [copiedId]);

  //? ================================  Api Calls ================================
  const [createBranchInfo, { isLoading: isCreateBranchInfoLoading }] =
    useCreateInternationalAdmissionBranchInformationMutation();

  //* ================================ Util Functions ================================
  const getDataSuccess = async (
    value: GetInternationalAdmissionDetailFieldsInfoResponse
  ) => {
    setDatasource(value);
  };

  // add modal
  const openAddModalHandler = () => {
    setAddModal(true);
  };
  const closeAddModalHandler = () => {
    setAddModal(false);
  };

  // delete modal
  const openDeleteModalHandler = () => {
    setDeleteModal(true);
  };
  const closeDeleteModalHandler = () => {
    setDeleteModal(false);
  };

  const createBranchHandler = () => {
    createBranchInfo({
      branchFieldIds: dataSource?.map((item) => item.branchFieldId),
      id: +id,
    })
      .unwrap()
      .then(() => {
        navigate({ pathname: INTERNATIONAL_BASIC_INFO_ADMISSION_PROGRAM_ROUTE });
      });
  };
  const prevBtnClickHandler = () => {
    setCurrent(0);
  };

  return (
    <>
      {addModal && (
        <CustomDrawer
          onClose={closeAddModalHandler}
          open={addModal}
          closeIcon={<AiOutlineClose />}
          content={
            <AdmissionEditFieldsAddDrawerContent
              closeDrawerHandler={closeAddModalHandler}
              studyGroupData={{
                title: dataSource?.[0]?.studyGroupTitle,
                id: dataSource?.[0]?.studyGroupId,
              }}
              degreeData={{
                id: dataSource?.[0]?.degreeId,
                title: dataSource?.[0]?.degreeTitle,
              }}
              defaultSelectedRows={dataSource?.map((item) => item?.branchFieldId)}
              setDatasource={setDatasource}
              dataSource={dataSource}
            />
          }
        />
      )}
      {deleteModal && (
        <CustomDrawer
          onClose={closeDeleteModalHandler}
          open={deleteModal}
          closeIcon={<AiOutlineClose />}
          content={
            <AdmissionEditFieldsDeleteDrawerContent
              closeDrawerHandler={closeDeleteModalHandler}
              setDatasource={setDatasource}
              dataSource={dataSource}
            />
          }
        />
      )}
      <div className="admission-program-edit-field-container">
        <CustomDivider
          text="لیست رشته‌های این برنامه پذیرش"
          extraContent={
            <div className="divider-extra-content">
              <CustomButton
                className="cursor-default! border-transparent! text-[#1f1f1f]!"
                disabled
                icon={<PiListChecks />}
              >
                تعداد انتخاب شده‌ها :{dataSource.length}
              </CustomButton>
              <CustomButton
                type="primary"
                danger
                icon={<AiOutlineMinus />}
                iconPlacement="end"
                onClick={openDeleteModalHandler}
              >
                حذف از لیست
              </CustomButton>
              <CustomButton
                type="primary"
                icon={<AiOutlinePlus />}
                iconPlacement="end"
                onClick={openAddModalHandler}
              >
                افزودن به لیست
              </CustomButton>
            </div>
          }
        />
        <CustomTable
          dataSource={dataSource}
          columns={AdmissionProgramDetailFieldsTableModel()}
          pagination={paginationConfig}
          loading={isAdmissionListLoading}
          {...TABLE_PROPS(dataSource?.length)}
          rowKey="branchFieldId"
          className="admission-program-detail-fields-table"
        />
        <div className="action-btns-container">
          <CustomButton icon={<AiOutlineArrowRight />} onClick={prevBtnClickHandler}>
            بازگشت
          </CustomButton>
          <CustomButton
            icon={<AiOutlineArrowLeft />}
            iconPlacement="end"
            type="primary"
            loading={isCreateBranchInfoLoading}
            onClick={createBranchHandler}
          >
            ثبت و ادامه
          </CustomButton>
        </div>
      </div>
    </>
  );
};

export default AdmissionProgramEditField;
