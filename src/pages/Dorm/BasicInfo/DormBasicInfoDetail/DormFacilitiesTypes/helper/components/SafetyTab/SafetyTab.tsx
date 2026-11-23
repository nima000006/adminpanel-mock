import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlinePlus } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useCreateDormFacilitiesTypeMutation,
  useLazyGetDormResidenceFacilityListWithTypeIdQuery,
  useUpdateDormFacilitiesMutation,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  ACTIVE_SWITCH_MODAL_MESSAGE,
  INACTIVE_SWITCH_MODAL_MESSAGE,
} from "@pages/Dorm/BasicInfo/DormBasicInfoDetail/helper/utils/DormBasicInfoDetailUtils";
import {
  DormResidenceFacilityListTypes,
  GetDormResidenceFacilityListResponse,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Building/BuildingCreateAndModify/helper/components/DormResidenceFacilities/@types/@dormResidenceFacilities";

import SafetyTabModalContent from "./helper/section/SafetyTabModalContent/SafetyTabModalContent";
import {
  CreateDormFacilitiesTypeResponse,
  UpdateDormFacilitiesResponse,
} from "../../../_shared/@types/@dormFacilitiesTypes";
import DormBasicInfoFacilitiesTabTableModel from "../../../_shared/models/DormBasicInfoFacilitiesTab/DormBasicInfoFacilitiesTabTableModel";
import { facilityTypes } from "../../../_shared/utils/facilitiesUtils";
import {
  FACILITY_DOES_NOT_EXIST_IN_FLOOR,
  FACILITY_EXIST_IN_FLOOR,
} from "../../../DormFacilitiesTypes";
import "./_safetyTab.scss";

const TABLE_DEPENDENCIES = ["name"];
const SafetyTab = ({ type }: { type: number }) => {
  const [dormFacilitiesList, setDormFacilitiesList] = useState<
    DormResidenceFacilityListTypes[]
  >([]);

  const [isModifyModalOpen, setIsModifyModalOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const [isOpenSwitchModal, setIsOpenSwitchModal] = useState({
    isOpen: false,
    id: -1,
    isActive: false,
  });

  const [isFloorActive, setIsFloorActive] = useState(false);

  const active = 1;
  const inActive = 3;

  const { params } = useQueryParams();

  const [modifyForm] = Form.useForm<{
    unitTitle: string;
    SafetyTitle: string;
    existInFloor: boolean;
  }>();

  //? ================================  Api Calls ================================
  //get table list
  const [
    getFacilitiesEducationTab,
    { isFetching: isGetFacilitiesEducationTabDataLoading },
  ] = useLazyGetDormResidenceFacilityListWithTypeIdQuery();

  // create
  const [createFacilities, { isLoading: isCreateFacilitiesLoading }] =
    useCreateDormFacilitiesTypeMutation();

  // update
  const [updateFacilities, { isLoading: isUpdateFacilitiesLoading }] =
    useUpdateDormFacilitiesMutation();

  //? ================================ Effects ================================
  useEffect(
    () => getFacilitiesEducationList(),
    [...TABLE_DEPENDENCIES.map((item) => params?.[item])]
  );

  //* ================================ Util Functions ================================
  // get list
  const getFacilitiesEducationList = () => {
    getFacilitiesEducationTab({
      maxResults: 2000,
      firstResult: 0,
      facilityTypeId_EQ: type?.toString(),
      title_LIKE: params.name,
    })
      .unwrap()
      .then(getFacilitiesEducationTabSuccess);
  };

  const getFacilitiesEducationTabSuccess = (
    value: GetDormResidenceFacilityListResponse
  ) => {
    if (value?.status === 200) {
      setDormFacilitiesList(value?.data);
    }
  };

  // modify handler
  const addFacilitiesTypeHandler = () => {
    setIsModifyModalOpen({ isOpen: true, id: -1 });
  };

  const editRulesTypesHandler = (value: DormResidenceFacilityListTypes) => {
    setIsModifyModalOpen({ isOpen: true, id: value?.id });
    modifyForm.setFieldsValue({
      SafetyTitle: value?.title,
      unitTitle: value?.unit,
      existInFloor: value?.IsOptional === FACILITY_DOES_NOT_EXIST_IN_FLOOR ? false : true,
    });
    setIsFloorActive(() => (value?.IsOptional === 1 ? false : true));
  };

  const closeModifyModalHandler = () => {
    setIsModifyModalOpen({ isOpen: false, id: -1 });
    modifyForm.resetFields();
    setIsFloorActive(false);
  };
  const confirmModifyModalHandler = () => {
    modifyForm?.submit();
    modifyForm?.validateFields().then(() => {
      const { SafetyTitle, unitTitle, existInFloor } = modifyForm.getFieldsValue();

      if (isModifyModalOpen?.id === -1) {
        createFacilities({
          form: "FacilityList",
          data: {
            title: SafetyTitle,
            facilityTypeId: facilityTypes["safety"],
            recordStatus: 1, // Backend said to be 1 by default
            unit: unitTitle,
            IsOptional: existInFloor
              ? FACILITY_EXIST_IN_FLOOR
              : FACILITY_DOES_NOT_EXIST_IN_FLOOR,
          },
        })
          .unwrap()
          .then(createFacilitiesSuccess);
      } else {
        updateFacilities({
          form: "FacilityList",
          id: "500905ef63174e7d8f54ff4c3ea7c526",
          data: {
            title: SafetyTitle,
            unit: unitTitle,
            facilityTypeId: facilityTypes["safety"],
            id: isModifyModalOpen?.id,
            IsOptional: existInFloor
              ? FACILITY_EXIST_IN_FLOOR
              : FACILITY_DOES_NOT_EXIST_IN_FLOOR,
          },
        })
          .unwrap()
          .then(updateFacilitiesSuccess);
      }
    });
  };

  // create success
  const createFacilitiesSuccess = async (value: CreateDormFacilitiesTypeResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  // update success
  const updateFacilitiesSuccess = async (value: UpdateDormFacilitiesResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const modifyHandler = () => {
    getFacilitiesEducationList();
    closeModifyModalHandler();
    modifyForm.resetFields();
  };

  // active and inactive
  const openSwitchModalHandler = (id: number, status: boolean) => {
    setIsOpenSwitchModal({ isOpen: true, id, isActive: status });
  };

  const closeSwitchModalHandler = () => {
    setIsOpenSwitchModal({ isOpen: false, id: -1, isActive: false });
  };

  const confirmSwitchModalHandler = () => {
    const recordStatus = isOpenSwitchModal?.isActive ? inActive : active;
    updateFacilities({
      form: "FacilityList",
      id: "500905ef63174e7d8f54ff4c3ea7c526",
      data: {
        recordStatus: recordStatus,
        facilityTypeId: facilityTypes["safety"],
        id: isOpenSwitchModal?.id,
      },
    })
      .unwrap()
      .then(changeStatusSuccess);
  };

  const changeStatusSuccess = async (value: UpdateDormFacilitiesResponse) => {
    if (value?.status === 200) {
      getFacilitiesEducationList();
      closeSwitchModalHandler();
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* ADD AND EDIT MODAL   */}
      {isModifyModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          isModalOpen={isModifyModalOpen?.isOpen}
          title={
            isModifyModalOpen?.id !== -1 ? "ویرایش امکانات ایمنی" : "افزودن امکانات ایمنی"
          }
          confirmBtnText={isModifyModalOpen?.id !== -1 ? "ثبت تغییرات" : "افزودن"}
          backBtnText="انصراف"
          isConfirmButtonLoading={isCreateFacilitiesLoading || isUpdateFacilitiesLoading}
          content={
            <SafetyTabModalContent
              form={modifyForm}
              isFloorActive={isFloorActive}
              setIsFloorActive={setIsFloorActive}
            />
          }
          closeModalHandler={closeModifyModalHandler}
          onConfirmClickHandler={confirmModifyModalHandler}
          showIcon={false}
        />
      )}
      {/* SWITCH INACTIVE MODAL */}
      {isOpenSwitchModal?.isOpen && (
        <ConfirmationModalWithContent
          isModalOpen={isOpenSwitchModal?.isOpen}
          title={!isOpenSwitchModal?.isActive ? "فعال کردن" : "غیر فعال کردن"}
          confirmBtnText={!isOpenSwitchModal?.isActive ? "فعال کن" : "غیر فعال "}
          backBtnText="انصراف"
          isDangerous={!isOpenSwitchModal?.isActive ? false : true}
          isConfirmButtonLoading={isUpdateFacilitiesLoading}
          content={
            !isOpenSwitchModal?.isActive
              ? ACTIVE_SWITCH_MODAL_MESSAGE
              : INACTIVE_SWITCH_MODAL_MESSAGE
          }
          closeModalHandler={closeSwitchModalHandler}
          onConfirmClickHandler={() => confirmSwitchModalHandler()}
          customClass="dorm-basic-info-switch-modal"
        />
      )}

      <div className="dorm-facilities-safety-tab-container">
        <CustomTable
          dataSource={dormFacilitiesList}
          columns={DormBasicInfoFacilitiesTabTableModel({
            onEditClickHandler: editRulesTypesHandler,
            switchHandler: openSwitchModalHandler,
          })}
          loading={isGetFacilitiesEducationTabDataLoading}
          pagination={paginationConfig}
          className="dorm-facilities-table-container"
          {...TABLE_PROPS(dormFacilitiesList?.length)}
        />
        <CustomButton
          icon={<AiOutlinePlus />}
          iconPlacement="end"
          onClick={addFacilitiesTypeHandler}
        >
          افزودن امکانات ایمنی
        </CustomButton>
      </div>
    </>
  );
};

export default SafetyTab;
