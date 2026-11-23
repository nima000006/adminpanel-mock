import { useEffect, useState } from "react";

import { Button, Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { ExcelCodes } from "@infra/config/excel-codes";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import {
  ChangeUserInquiryStateToFalseResponse,
  DeleteModal,
  DeleteUserPhoneResponse,
  InquiryModal,
  UpdateModal,
  UpdateUserResponse,
} from "./@types/@usersList";
import { UpdateUserInfoForm } from "./userListsUtils/@types/@userListsUtils";
import {
  DeleteModalContent,
  InquiryModalContent,
  UpdateModalContent,
} from "./userListsUtils/userListsUtils";
import ConfirmationModalWithContent from "../../../components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import useTitle from "../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { BusinessUsersListModel } from "../../../infrastructure/models/tableModels/BusinessTableModel/BusinessUsersList/BusinessUsersListModel";
import {
  useChangeUserInquiryStateToFalseMutation,
  useGetAllUserByUserInfoMutation,
  useGetAllUserMutation,
  useLazyDeleteUserPhoneQuery,
  useUpdateUserMutation,
} from "../../../infrastructure/states/redux/Apis/authApi";
import {
  INQUIRY_STATUS_CHANGED_SUCCESSFULLY,
  USER_INFO_CHANGED_SUCCESSFULLY,
  USER_MOBILE_REMOVED_SUCCESSFULLY,
} from "../../../infrastructure/VARS/globalToasts/globalToasts";
import {
  GetAllUserResponse,
  SingleUserInUserList,
} from "../../Notification/NotificationUniversitySelector/helper/components/NotificationSingle/@types/@notificationSingle";

import "./usersList.scss";

const NO_FIRST_LAST_NATIONAL =
  "یکی از موارد نام، نام خانوادگی یا کد ملی در لیست کاربران وجود ندارد";

const UsersList = () => {
  useTitle({ text: "لیست کاربران" });

  const [tableData, setTableData] = useState<SingleUserInUserList[]>([]);
  const [deleteModal, setDeleteModal] = useState<DeleteModal>({
    isOpen: false,
    userName: "",
  });
  const [updateUserModal, setUpdateUserModal] = useState<UpdateModal>({
    isOpen: false,
    rowData: {},
  });
  const [inquiryUserModal, setInquiryUserModal] = useState<InquiryModal>({
    isOpen: false,
    record: {},
  });
  const [searchParams] = useSearchParams();
  const { id, key, nationalCode, studentNumber, phoneNumber } = Object.fromEntries([
    ...searchParams,
  ]);
  const [updateUserForm] = Form.useForm<UpdateUserInfoForm>();

  //? ================================  Api Calls ================================
  const [getAllUsersList, { isLoading: isUsersListLoading }] = useGetAllUserMutation();
  //
  const [deleteUserPhone, { isLoading: isDeletingUserPhoneLoading }] =
    useLazyDeleteUserPhoneQuery();

  //
  const [updateUser, { isLoading: isUpdateUserLoading }] = useUpdateUserMutation();

  //!
  const [getAllUserByUserInfo, { isLoading: isGetAllUserByUserInfoLoading }] =
    useGetAllUserByUserInfoMutation();

  //
  const [changeUserInquiry, { isLoading: isChangeUserInquiryLoading }] =
    useChangeUserInquiryStateToFalseMutation();

  //* ================================ Util Functions ================================

  // get ALL USER by university
  const getAllTableUsers = () => {
    if (id) {
      getAllUsersList({
        branchCode: id,
        fieldCode: 0,
        levelCode: 0,
        pageNumber: 0,
        pageSize: 100000,
      })
        .unwrap()
        .then(onGetUsersSuccess);
    } else {
      getAllUserByUserInfo({
        pageNumber: 0,
        pageSize: 100000,
        nationalCode,
        phoneNumber,
        studentNumber,
      })
        .unwrap()
        .then(onGetAllTableUsersBySuccess);
    }
  };

  // get ALL USER by user
  // const getAllTableUsersBy = () => {
  //   getAllUserByUserInfo({
  //     pageNumber: 0,
  //     pageSize: 100000,
  //     nationalCode,
  //     phoneNumber,
  //     studentNumber,
  //   })
  //     .unwrap()
  //     .then(onGetAllTableUsersBySuccess);
  // };

  // get university data based on branch code and etc
  useEffect(() => {
    getAllTableUsers();
    // if (key === UNIVERSITY && id) {
    // }
  }, [id, key]);

  // get user data based on national code student number or phone number
  // useEffect(() => {
  //   if (key === USER && (studentNumber || phoneNumber || nationalCode)) {
  //     getAllTableUsersBy();
  //   }
  // }, [key]);

  //* ================================ On Request Success ================================
  const onGetAllTableUsersBySuccess = async (value: GetAllUserResponse) => {
    if (value?.status === 200) {
      setTableData(value?.data?.userList);
    }
  };

  //* ================================ On Request Success ================================
  // onGetUsersSuccess
  const onGetUsersSuccess = async (allUsersData: GetAllUserResponse) => {
    if (allUsersData?.status === 200) {
      setTableData(allUsersData?.data?.userList);
    }
  };

  //! تغییر وضعیت صفحه از جستجو به لیست کاربران
  // const onChangePageSuccess = (values: GetAllUserResponse) => {
  //   if (values?.status === 200) {
  //     setTableData(values?.data);
  //   }
  // };

  //! تغییر شماره صفحه جدول
  // const OnChangePage = (page: number, pageSize: number) => {
  //   if (!universityBranchRef?.current?.id) {
  //     return toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
  //   }
  //   setSearchParams({ pageNumber: page?.toString() });
  //   getAllUsersList({
  //     branchCode: universityBranchRef?.current?.id?.toString(),
  //     fieldCode: 0,
  //     levelCode: 0,
  //     pageNumber: page,
  //     pageSize: pageSize,
  //   })
  //     .unwrap()
  //     .then(onChangePageSuccess);
  // };

  //* ================================ On Request Success ================================
  const onDeleteSuccess = async (deleteRes: DeleteUserPhoneResponse) => {
    if (deleteRes?.status === 200) {
      // setIsRefreshed(!isRefreshed);
      getAllTableUsers();
      setDeleteModal({ isOpen: false, userName: "" });
      toast.success(USER_MOBILE_REMOVED_SUCCESSFULLY, {
        toastId: USER_MOBILE_REMOVED_SUCCESSFULLY,
      });
    }
  };

  //! مودال حذف کاربر
  const onRemoveMobileClickHandler = (userName: string) => {
    setDeleteModal({ isOpen: true, userName });
  };

  //! مودال تغییر وضعیت
  const onChangeStatusClickHandler = (rowData: SingleUserInUserList) => {
    setUpdateUserModal({ isOpen: true, rowData });
  };

  //! حذف کاربر
  const OnConfirmDeleteModalHandler = () => {
    if (deleteModal?.isOpen && deleteModal?.userName) {
      deleteUserPhone(deleteModal?.userName).unwrap().then(onDeleteSuccess);
    }
  };

  // on update user success
  const OnUpdateUserSuccess = async (value: UpdateUserResponse) => {
    if (value?.status === 200) {
      // setIsRefreshed(!isRefreshed);
      getAllTableUsers();
      setUpdateUserModal({ isOpen: false, rowData: {} });
      toast.success(USER_INFO_CHANGED_SUCCESSFULLY, {
        toastId: USER_INFO_CHANGED_SUCCESSFULLY,
      });
    }
  };

  //! آپدیت یورز
  const OnConfirmUpdateModalHandler = () => {
    updateUserForm.submit();
    updateUserForm?.validateFields().then((values) => {
      if (
        updateUserModal?.rowData?.firstName &&
        updateUserModal?.rowData?.lastName &&
        updateUserModal?.rowData?.nationalCode
      ) {
        updateUser({
          branchCode: values?.branchName?.value,
          branchName: values?.branchName?.label,
          fieldCode: "0",
          fieldName: values?.fieldName ?? null,
          firstName: values?.name ?? null,
          gender: values?.gender?.label ?? null,
          lastName: values?.family,
          levelCode: "0",
          levelName: values?.levelName ?? null,
          nationalCode: values?.nationalCode ?? null,
          studentNumber: values?.studentNumber ?? null,
        })
          .unwrap()
          .then(OnUpdateUserSuccess);
      } else {
        toast.warn(NO_FIRST_LAST_NATIONAL, { toastId: NO_FIRST_LAST_NATIONAL });
      }
    });
  };

  //! کلیک روی دکمه استعلام در جدول
  const onInquiryClickHandler = (record: SingleUserInUserList) => {
    setInquiryUserModal({ isOpen: true, record });
  };

  //!onInquiryChangeSuccess
  const onInquiryChangeSuccess = async (
    changeInquiryRes: ChangeUserInquiryStateToFalseResponse
  ) => {
    if (changeInquiryRes?.status === 200) {
      setInquiryUserModal({ isOpen: false, record: {} });
      toast.success(INQUIRY_STATUS_CHANGED_SUCCESSFULLY, {
        toastId: INQUIRY_STATUS_CHANGED_SUCCESSFULLY,
      });
    }
  };

  //! تایید استعلام
  const OnConfirmInquiryModalHandler = () => {
    if (inquiryUserModal?.record?.nationalCode && inquiryUserModal?.record?.mobile) {
      changeUserInquiry({
        mobileNo: inquiryUserModal?.record?.mobile,
        nationalCode: inquiryUserModal?.record?.nationalCode,
      })
        .unwrap()
        .then(onInquiryChangeSuccess);
    }
  };

  return (
    <>
      {/* Remove Phone حذف شماره موبایل */}
      {deleteModal?.isOpen && (
        <ConfirmationModalWithContent
          backBtnText="انصراف"
          confirmBtnText="حذف شود"
          isModalOpen={deleteModal?.isOpen}
          onConfirmClickHandler={OnConfirmDeleteModalHandler}
          closeModalHandler={() => setDeleteModal({ isOpen: false, userName: "" })}
          content={<DeleteModalContent />}
          title="حذف"
          isDangerous={true}
          key={1}
          showIcon={false}
        />
      )}

      {/* Update User تغییر مشخصات */}
      {updateUserModal?.isOpen && (
        <ConfirmationModalWithContent
          title="بروزرسانی مشخصات دانشجو"
          backBtnText="انصراف"
          confirmBtnText="تایید"
          isModalOpen={updateUserModal?.isOpen}
          onConfirmClickHandler={OnConfirmUpdateModalHandler}
          closeModalHandler={() => setUpdateUserModal({ isOpen: false, rowData: {} })}
          content={
            <UpdateModalContent
              userData={updateUserModal?.rowData}
              form={updateUserForm}
            />
          }
          width={1000}
          key={2}
          showIcon={false}
        />
      )}

      {/* User Inquiry استعلام مجدد */}
      {inquiryUserModal?.isOpen && (
        <ConfirmationModalWithContent
          title="استعلام مجدد"
          backBtnText="انصراف"
          confirmBtnText="تایید"
          isModalOpen={inquiryUserModal?.isOpen}
          onConfirmClickHandler={OnConfirmInquiryModalHandler}
          closeModalHandler={() => setInquiryUserModal({ isOpen: false, record: {} })}
          content={<InquiryModalContent />}
          key={3}
          showIcon={false}
        />
      )}

      {/* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */}
      <div className="business-users-list-container">
        <section className="table-container">
          <div>
            <Button
              type="primary"
              icon={<AiOutlineFilter />}
              size="middle"
              // onClick={showTableHandler}
              className="advance-filter-btn"
            >
              فیلتر پیشرفته
            </Button>
          </div>
          <CustomTable
            dataSource={tableData}
            columns={BusinessUsersListModel({
              onRemoveMobileClickHandler,
              onChangeStatusClickHandler,
              onInquiryClickHandler,
            })}
            loading={
              isUsersListLoading ||
              isDeletingUserPhoneLoading ||
              isUpdateUserLoading ||
              isChangeUserInquiryLoading ||
              isGetAllUserByUserInfoLoading
            }
            pagination={paginationConfig}
            rowKey="id"
            {...TABLE_PROPS(tableData?.length)}
            draggableColumns
            draggableId={ExcelCodes.BUSINESS_USERS_LIST_TABLE}
          />
        </section>
      </div>
    </>
  );
};

export default UsersList;
