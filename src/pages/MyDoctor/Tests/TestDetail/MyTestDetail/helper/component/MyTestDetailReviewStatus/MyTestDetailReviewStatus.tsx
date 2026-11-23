import { useEffect, useState } from "react";

import { Dropdown, Form, MenuProps } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineFilter } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useCreateMyDoctorTestFollowUpManagerMutation,
  useLazyGetMyDoctorTestReviewDetailListManagerQuery,
} from "@infra/states/redux/Apis/myDoctor/test/testApis";

import {
  GetMyDoctorTestReviewDetailListManagerResponse,
  MyDoctorTestReviewDetailListManagerType,
  RegisterActionFormDataType,
} from "./@types/@myTestDetailReviewStatus";
import MyTestRegisterActionDrawerContent from "./helper/drawers/MyTestRegisterAction/MyTestRegisterActionDrawerContent";
import MyTestRegisterActionModalContent from "./helper/modals/MyTestRegisterAction/MyTestRegisterActionModalContent";
import MyTestDetailReviewStatusTableModel from "./helper/models/MyTestDetailReviewStatusTable/MyTestDetailReviewStatusTableModel";
import "./_myTestDetailReviewStatus.scss";

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

const MyTestDetailReviewStatus = () => {
  const [dataSource, setDataSource] = useState<MyDoctorTestReviewDetailListManagerType[]>(
    []
  );

  //Empty
  const [isRegisterActionModalOpen, setIsRegisterActionModalOpen] = useState(false);

  const [emptyRegisterActionForm] = Form.useForm<RegisterActionFormDataType>();

  // Table
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState({ isOpen: false, id: -1 });
  const [isRegisterReActionModalOpen, setIsRegisterReActionModalOpen] = useState({
    isOpen: false,
    id: -1,
  });
  const [tableRegisterReActionForm] = Form.useForm<RegisterActionFormDataType>();

  const {
    params: { id },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getListData, { isFetching: isListDataLoading }] =
    useLazyGetMyDoctorTestReviewDetailListManagerQuery();

  const [createFollowUp, { isLoading: isFollowUpLoading }] =
    useCreateMyDoctorTestFollowUpManagerMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getList();
  }, []);

  //* ================================ Util Functions ================================
  const getList = () => {
    if (id) {
      getListData(id).unwrap().then(getListDataSuccess);
    }
  };

  const getListDataSuccess = async (
    value: GetMyDoctorTestReviewDetailListManagerResponse
  ) => {
    if (value) {
      setDataSource(value);
    }
  };

  //Empty
  const openRegisterActionModalHandler = () => {
    setIsRegisterActionModalOpen(true);
  };

  const closeRegisterActionModalHandler = () => {
    setIsRegisterActionModalOpen(false);
    emptyRegisterActionForm.resetFields();
  };

  const submitResultHandler = () => {
    emptyRegisterActionForm?.submit();
    emptyRegisterActionForm?.validateFields().then((value) => {
      const registerResult = {
        description: value?.description,
        followUpActionId: value?.actionResult?.code,
        followerFirstName: value?.actionsName,
        followerLastName: value?.actionsFamily,
        surveyCycleId: +id,
        ...(value?.date ? { nextFollowUpDate: value?.date } : {}),
        ...(value?.reactionType?.code
          ? { nextActionType: value?.reactionType?.code }
          : {}),
      };

      createFollowUp(registerResult).unwrap().then(submitResultHandlerSuccess);
    });
  };

  const submitResultHandlerSuccess = async () => {
    closeRegisterActionModalHandler();
    getList();
  };

  // Table
  const viewClickHandler = (id: number) => {
    setIsDetailDrawerOpen({ isOpen: true, id });
  };

  const closeDetailDrawerHandler = () => {
    setIsDetailDrawerOpen({ isOpen: false, id: -1 });
  };

  const registerResultHandler = (id: number) => {
    setIsRegisterReActionModalOpen({ isOpen: true, id });
  };

  const closeRegisterResultModalHandler = () => {
    setIsRegisterReActionModalOpen({ isOpen: false, id: -1 });
    tableRegisterReActionForm.resetFields();
  };

  const submitReActionResultHandler = () => {
    tableRegisterReActionForm?.submit();
    tableRegisterReActionForm?.validateFields().then((value) => {
      const registerResult = {
        description: value?.description,
        followUpActionId: value?.actionResult?.code,
        followerFirstName: value?.actionsName,
        followerLastName: value?.actionsFamily,
        surveyCycleId: +id,
        ...(value?.date ? { nextFollowUpDate: value?.date } : {}),
        ...(value?.reactionType?.code
          ? { nextActionType: value?.reactionType?.code }
          : {}),
      };

      createFollowUp(registerResult).unwrap().then(submitReActionResultHandlerSuccess);
    });
  };

  const submitReActionResultHandlerSuccess = async () => {
    closeRegisterResultModalHandler();
    getList();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <div className="my-test-detail-review-status-container">
      {/*  EMPTY MODE */}
      {isRegisterActionModalOpen && (
        <ConfirmationModalWithContent
          title="ثبت نتیجه اقدام"
          isModalOpen={isRegisterActionModalOpen}
          isConfirmButtonLoading={isFollowUpLoading}
          confirmBtnText="ثبت نتیجه"
          backBtnText="انصراف"
          closeModalHandler={closeRegisterActionModalHandler}
          onConfirmClickHandler={() => submitResultHandler()}
          width={700}
          content={<MyTestRegisterActionModalContent form={emptyRegisterActionForm} />}
        />
      )}

      {/* TABLE MODE */}
      {isRegisterReActionModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="ثبت نتیجه اقدام مجدد"
          isModalOpen={isRegisterReActionModalOpen?.isOpen}
          isConfirmButtonLoading={isFollowUpLoading}
          confirmBtnText="ثبت نتیجه"
          backBtnText="انصراف"
          closeModalHandler={closeRegisterResultModalHandler}
          onConfirmClickHandler={() => submitReActionResultHandler()}
          width={700}
          content={<MyTestRegisterActionModalContent form={tableRegisterReActionForm} />}
        />
      )}

      {isDetailDrawerOpen?.isOpen && (
        <CustomDrawer
          open={isDetailDrawerOpen?.isOpen}
          onClose={closeDetailDrawerHandler}
          closeIcon={<AiOutlineClose />}
          content={
            <MyTestRegisterActionDrawerContent
              followUpId={isDetailDrawerOpen?.id?.toString()}
              closeDrawerHandler={closeDetailDrawerHandler}
            />
          }
        />
      )}

      <Div loading={isListDataLoading}>
        {dataSource.length === 0 ? (
          <CustomEmpty
            description={
              <div className="empty-content-container">
                <p>در حال حاضر هیچ اقدامی جهت بررسی وضعیت دانشجو ثبت نگردیده است.</p>
                <CustomButton type="primary" onClick={openRegisterActionModalHandler}>
                  ثبت نتیجه اقدام
                </CustomButton>
              </div>
            }
          />
        ) : (
          <div className="table-container">
            <CustomDivider
              text="لیست اقدامات صورت گرفته"
              extraContent={
                <CustomButton
                  type="primary"
                  icon={<AiOutlinePlus />}
                  iconPlacement="end"
                  onClick={openRegisterActionModalHandler}
                >
                  ثبت اقدام جدید
                </CustomButton>
              }
            />
            <div className="filter-excel-btns-container">
              <CustomButton icon={<AiOutlineFilter />} iconPlacement="end" disabled>
                فیلتر پیشرفته
              </CustomButton>
              <Dropdown menu={exportMenu} trigger={["click"]} disabled>
                <CustomButton icon={<IoIosArrowDown />} iconPlacement="end">
                  خروجی
                </CustomButton>
              </Dropdown>
            </div>
            <CustomTable<MyDoctorTestReviewDetailListManagerType>
              dataSource={dataSource}
              pagination={paginationConfig}
              rowKey="followUpId"
              columns={MyTestDetailReviewStatusTableModel({
                viewClickHandler,
                registerResultHandler,
              })}
              {...TABLE_PROPS([]?.length)}
            />
          </div>
        )}
      </Div>
    </div>
  );
};

export default MyTestDetailReviewStatus;
