import { useState } from "react";

import { Col, Row } from "antd";
import { PiHashStraightBold, PiArrowLineUpRightBold } from "react-icons/pi";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useWithdrawalRevertToRequestedRequestMutation } from "@infra/states/redux/Apis/wallet/requests/requestsWithDrawalApi";
import { RED_6 } from "@infra/VARS/globalColors/globalColors";
import { FONTSIZE_25 } from "@infra/VARS/globalStyles/globalStyles";
import { Withdrawal } from "@pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalList/_shared/@types/@walletRequestUsersList";
import { WalletRequestAcceptFlattenedDataType } from "@pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalList/_shared/components/WalletRequestDrawer/@types/@withdrawalAcceptRequest";
import WalletRequestDrawerTableModel from "@pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalList/_shared/components/WalletRequestDrawer/models/WalletRequestDrawerTableModel/WalletRequestDrawerTableModel";
import WalletRequestLegalDrawerTableModel from "@pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalList/_shared/components/WalletRequestDrawer/models/WalletRequestLegalDrawerTableModel/WalletRequestLegalDrawerTableModel";
import { WalletRequestReturnToRequestedDrawerProps } from "@pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalList/helper/components/WalletRequestUsers/helper/components/WalletRequestSentToBank/helper/drawers/WalletRequestReturnToRequested/@types/@walletRequestReturnToRequestedDrawer";

const RETURN_TO_REQUESTED_SUCCESS_MSG =
  "درخواست با موفقیت به در انتظار بررسی بازگشت داده شد";

const REMOVE_FROM_LIST_SUCCESS_MSG = "درخواست با موفقیت از لیست حذف شد";

const WalletRequestReturnToRequestedDrawer = ({
  onClose,
  selectedUsers: initialUsers,
  refreshData,
  getStats,
}: WalletRequestReturnToRequestedDrawerProps) => {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<Withdrawal[]>(initialUsers || []);
  const { params } = useQueryParams();

  //? ================================  api ================================
  const [withdrawalRevertToRequestedRequest, { isLoading }] =
    useWithdrawalRevertToRequestedRequestMutation();

  // ================================ Utils function ================================

  const onSubmitHandler = () => {
    const ids = selectedUsers.map((user) => user.id);
    withdrawalRevertToRequestedRequest({ ids: ids.join(",") })
      .unwrap()
      .then(() => {
        refreshData();
        getStats();
        onClose();
        toast.success(RETURN_TO_REQUESTED_SUCCESS_MSG, {
          toastId: RETURN_TO_REQUESTED_SUCCESS_MSG,
        });
      });
  };
  const closeModalHandler = () => {
    setDeleteId(null);
  };
  const openDeleteModal = (id: number) => {
    setDeleteId(id);
  };
  const onConfirmClickHandler = () => {
    if (deleteId !== null) {
      setSelectedUsers((prev) => prev.filter((item) => item.id !== deleteId));
    }
    toast.success(REMOVE_FROM_LIST_SUCCESS_MSG, {
      toastId: REMOVE_FROM_LIST_SUCCESS_MSG,
    });
    closeModalHandler();
  };

  const getTotalWithdrawalAmount = (users: Withdrawal[] = []): number => {
    return users.reduce((sum, item) => sum + item.amount.totalAmount, 0);
  };

  const totalAmount = getTotalWithdrawalAmount(selectedUsers);
  const flattenedData: WalletRequestAcceptFlattenedDataType[] = selectedUsers?.map(
    (item) => ({
      ...item,
      firstname: item.userStaffDetail?.firstname,
      LastName: item.userStaffDetail?.LastName,
    })
  );

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <ConfirmationModalWithContent
        isModalOpen={deleteId !== null}
        backBtnText="انصراف"
        confirmBtnText="حذف کن"
        title="حذف از لیست"
        content="آیا از حذف درخواست انتخاب شده از لیست تایید گروهی اطمینان دارید؟"
        closeModalHandler={closeModalHandler}
        onConfirmClickHandler={onConfirmClickHandler}
      />
      <div className="wallet-request-users-drawer-container">
        <CustomDrawerHeader
          closeDrawerHandler={onClose}
          title="بازگشت گروهی درخواست به درانتظار بررسی"
          leftSideContent={
            <>
              <CustomButton onClick={onClose}>انصراف</CustomButton>
              <CustomButton
                type="primary"
                disabled={selectedUsers.length === 0}
                onClick={onSubmitHandler}
                loading={isLoading}
              >
                تایید و ثبت وضعیت
              </CustomButton>
            </>
          }
        />
        <Row gutter={[16, 16]}>
          <Col xl={12} lg={12} md={24} xs={24}>
            <div className="custom-info-box">
              <span>
                <PiHashStraightBold width={FONTSIZE_25} />
                <span>تعداد درخواست‌های انتخاب شده</span>
              </span>
              <span>{dataPlaceHolder({ data: selectedUsers?.length?.toString() })}</span>
            </div>
          </Col>
          <Col xl={12} lg={12} md={24} xs={24}>
            <div className="custom-info-box">
              <span>
                <PiArrowLineUpRightBold color={RED_6} />
                <span>مجموع مبالغ درخواستی</span>
              </span>
              <span>
                {" "}
                {dataPlaceHolder({
                  data: totalAmount.toString(),
                  isRial: true,
                  isPrice: true,
                })}{" "}
                تومان
              </span>
            </div>
          </Col>
        </Row>
        <CustomDivider text="درخواست های انتخاب شده" />
        <CustomTable<WalletRequestAcceptFlattenedDataType>
          dataSource={flattenedData}
          columns={
            params?.tab === "2"
              ? WalletRequestLegalDrawerTableModel({
                  openDeleteModal,
                })
              : WalletRequestDrawerTableModel({
                  openDeleteModal,
                })
          }
          pagination={paginationConfig}
          {...TABLE_PROPS(flattenedData?.length || 0)}
          rowKey="id"
        />
      </div>
    </>
  );
};

export default WalletRequestReturnToRequestedDrawer;
