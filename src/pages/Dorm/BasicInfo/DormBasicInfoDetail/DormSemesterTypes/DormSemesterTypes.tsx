import { useEffect, useState } from "react";

import { Form } from "antd";
import dayjs from "dayjs";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_BASIC_INFO_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";
import {
  useCreateDormSemesterTypesMutation,
  useLazyGetSemesterCountQuery,
  useLazyGetSemesterQuery,
  useUpdateDormSemesterTypesMutation,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";

import {
  CreateDormSemesterTypesRequest,
  CreateDormSemesterTypesResponse,
  DormSemesterData,
  DormSemesterResponse,
  UpdateDormSemesterTypesResponse,
} from "./@types/@dormSemesterTypes";
import DormBasicInfoSemesterTableModel from "./helper/models/DormSemesterTableModel";
import {
  ACTIVE_SWITCH_MODAL_MESSAGE,
  INACTIVE_SWITCH_MODAL_MESSAGE,
} from "../helper/utils/DormBasicInfoDetailUtils";
import DormSemesterTypeModalContent from "./helper/components/DormSemesterTypeModalContent";

import "./_dormSemesterTypes.scss";

const TABLE_DEPENDENCIES = ["name", "sortings"];

const DormSemesterTypes = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه اقامتگاه</Link>,
      },
      { title: "نیمسال" },
    ],
  });

  const { params: url, setSearchParams } = useQueryParams();
  const [semesterList, setSemesterList] = useState<DormSemesterData[]>([]);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const [isOpenSwitchModal, setIsOpenSwitchModal] = useState({
    isOpen: false,
    id: -1,
    isActive: false,
  });
  const [modifyForm] = Form.useForm<{
    title: string;
    dateRange: [dayjs.Dayjs, dayjs.Dayjs];
  }>();

  const { params } = useQueryParams();

  //* ================================ API Calls ================================
  const [getSemesterTypes, { isFetching: isSemesterLoading }] = useLazyGetSemesterQuery();
  const [getSemesterTypesCount, { data: SemesterCountData }] =
    useLazyGetSemesterCountQuery();

  const [createSemesterTypes, { isLoading: isCreateSemesterTypesLoading }] =
    useCreateDormSemesterTypesMutation();

  const [updateSemesterTypes, { isLoading: isUpdateSemesterTypesLoading }] =
    useUpdateDormSemesterTypesMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getSemesterTypes({
      maxResults: url?.page ? Number(url.page) - 1 : 0,
      firstResult: url?.pageSize ? Number(url.pageSize) : 8,
      title_LIKE: params?.name,
      sortings: params?.sortings,
    })
      .unwrap()
      .then(handleSemesterSuccess);
  }, [...TABLE_DEPENDENCIES.map((item) => params?.[item]), url?.page, url?.pageSize]);

  useEffect(() => {
    getSemesterTypesCount({
      title_LIKE: params?.name,
      sortings: params?.sortings,
    });
  }, [...TABLE_DEPENDENCIES.map((item) => params?.[item])]);

  //* ================================ Util Functions ================================

  const handleSemesterSuccess = (res: DormSemesterResponse) => {
    if (res?.status === 200) {
      setSemesterList(res.data || []);
    }
  };

  // create and update
  const editSemesterTypeHandler = (value: DormSemesterData) => {
    setIsModifyModalOpen({ isOpen: true, id: value?.id });
    modifyForm.setFieldsValue({
      title: value?.title,
    });
  };
  const addManagementTypeHandler = () => {
    setIsModifyModalOpen({ isOpen: true, id: -1 });
  };

  const closeModifyModalHandler = () => {
    setIsModifyModalOpen({ isOpen: false, id: -1 });
    modifyForm.resetFields();
  };

  const confirmModifyModalHandler = () => {
    modifyForm.validateFields().then(() => {
      const { title, dateRange } = modifyForm.getFieldsValue();

      if (!Array.isArray(dateRange) || dateRange.length !== 2) return;

      const [from, to] = dateRange;
      const fromDate = from?.toISOString?.();
      const toDate = to?.toISOString?.();

      const payload: CreateDormSemesterTypesRequest = {
        form: "semesterRegistration",
        data: {
          title,
          fromDate,
          toDate,
          recordStatus: "1",
          ...(isModifyModalOpen.id !== -1 && { id: isModifyModalOpen.id.toString() }),
        },
      };

      createSemesterTypes(payload)
        .unwrap()
        .then(
          isModifyModalOpen.id === -1
            ? createSemesterTypesSuccess
            : updateSemesterTypesSuccess
        );
    });
  };

  const createSemesterTypesSuccess = async (value: CreateDormSemesterTypesResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const updateSemesterTypesSuccess = async (value: CreateDormSemesterTypesResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const modifyHandler = () => {
    getSemesterTypes({
      title_LIKE: params?.name,
      maxResults: url?.page ? Number(url.page) - 1 : 0,
      firstResult: url?.pageSize ? Number(url.pageSize) : 8,
      sortings: params?.sortings,
    })
      .unwrap()
      .then(handleSemesterSuccess);
    closeModifyModalHandler();
    modifyForm.resetFields();
  };
  const openSwitchModalHandler = (id: number, status: boolean) => {
    setIsOpenSwitchModal({ isOpen: true, id, isActive: status });
  };
  const closeSwitchModalHandler = () => {
    setIsOpenSwitchModal({ isOpen: false, id: -1, isActive: false });
  };
  const confirmSwitchModalHandler = () => {
    const recordStatus = isOpenSwitchModal?.isActive ? "3" : "1";

    updateSemesterTypes({
      form: "semester",
      id: "c3d0ba0e7539440db3b09e0a845cb7d4",
      data: {
        recordStatus: recordStatus,
        id: isOpenSwitchModal?.id,
      },
    })
      .unwrap()
      .then(changeStatusSuccess);
  };

  const changeStatusSuccess = async (value: UpdateDormSemesterTypesResponse) => {
    if (value?.status === 200) {
      getSemesterTypes({
        title_LIKE: params?.name,
        maxResults: url?.page ? Number(url.page) - 1 : 0,
        firstResult: url?.pageSize ? Number(url.pageSize) : 8,
        sortings: params?.sortings,
      })
        .unwrap()
        .then(handleSemesterSuccess);
      closeSwitchModalHandler();
    }
  };

  //* ================================ Render ================================
  return (
    <>
      {/* ADD AND EDIT MODAL   */}
      {isModifyModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          isModalOpen={isModifyModalOpen?.isOpen}
          title={isModifyModalOpen?.id !== -1 ? "ویرایش نوع نیمسال" : "افزودن نوع نیمسال"}
          confirmBtnText={isModifyModalOpen?.id !== -1 ? "ثبت تغییرات" : "افزودن"}
          backBtnText="انصراف"
          isConfirmButtonLoading={
            isCreateSemesterTypesLoading || isUpdateSemesterTypesLoading
          }
          content={<DormSemesterTypeModalContent form={modifyForm} />}
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
          isConfirmButtonLoading={
            isCreateSemesterTypesLoading || isUpdateSemesterTypesLoading
          }
          content={
            !isOpenSwitchModal?.isActive
              ? ACTIVE_SWITCH_MODAL_MESSAGE
              : INACTIVE_SWITCH_MODAL_MESSAGE
          }
          closeModalHandler={closeSwitchModalHandler}
          onConfirmClickHandler={confirmSwitchModalHandler}
          customClass="dorm-basic-info-switch-modal"
        />
      )}
      <div className="dorm-basic-info-semester-container">
        <CustomTable
          dataSource={semesterList}
          columns={DormBasicInfoSemesterTableModel({
            onEditClickHandler: editSemesterTypeHandler,
            switchHandler: openSwitchModalHandler,
          })}
          loading={isSemesterLoading}
          rowKey="id"
          className="dorm-management-type-table-container"
          pagination={manualPaginationConfig({
            total: SemesterCountData?.count,
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
          {...TABLE_PROPS(semesterList?.length)}
        />
        <CustomButton
          icon={<AiOutlinePlus />}
          iconPlacement="end"
          onClick={addManagementTypeHandler}
        >
          افزودن نیمسال
        </CustomButton>
      </div>
    </>
  );
};

export default DormSemesterTypes;
