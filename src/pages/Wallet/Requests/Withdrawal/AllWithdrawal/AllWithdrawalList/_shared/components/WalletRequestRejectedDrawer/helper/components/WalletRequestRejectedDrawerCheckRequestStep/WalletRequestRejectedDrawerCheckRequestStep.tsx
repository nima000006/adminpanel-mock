import { useState } from "react";

import { Col, Row } from "antd";
import { PiArrowLineUpRightBold, PiHashStraightBold } from "react-icons/pi";

import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { ExcelCodes } from "@infra/config/excel-codes";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { RED_6 } from "@infra/VARS/globalColors/globalColors";
import { FONTSIZE_25 } from "@infra/VARS/globalStyles/globalStyles";

import {
  WalletRequestRejectedDrawerCheckRequestStepProps,
  WalletRequestRejectedFlattenedDataType,
} from "./@types/@walletRequestRejectedDrawerCheckRequestStep";
import WalletRequestRejectedDrawerCheckRequestLegalStepTableModel from "./helper/models/WalletRequestRejectedDrawerCheckRequestLegalStepTableModel/WalletRequestRejectedDrawerCheckRequestLegalStepTableModel";
import WalletRequestRejectedDrawerCheckRequestStepTableModel from "./helper/models/WalletRequestRejectedDrawerCheckRequestStepTableModel/WalletRequestRejectedDrawerCheckRequestStepTableModel";
import { Withdrawal } from "../../../../../@types/@walletRequestUsersList";
import "./_walletRequestRejectedDrawerCheckRequestStep.scss";

const WalletRequestRejectedDrawerCheckRequestStep = ({
  selectedUsers,
  setSelectedUsers,
}: WalletRequestRejectedDrawerCheckRequestStepProps) => {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { params } = useQueryParams();
  // ================================ Utils function ================================

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
    closeModalHandler();
  };

  const getTotalWithdrawalAmount = (users: Withdrawal[] = []): number => {
    return users.reduce((sum, item) => sum + item.amount.totalAmount, 0);
  };

  const totalAmount = getTotalWithdrawalAmount(selectedUsers);

  const flattenedData: WalletRequestRejectedFlattenedDataType[] | undefined =
    selectedUsers?.map((item) => ({
      ...item,
      firstname: item.userStaffDetail?.firstname,
      LastName: item.userStaffDetail?.LastName,
    }));

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
      <div className="wallet-request-rejected-drawer-check-request-step-container">
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
                {dataPlaceHolder({
                  data: totalAmount.toString(),
                  isPrice: true,
                  isRial: true,
                })}{" "}
                تومان
              </span>
            </div>
          </Col>
        </Row>
        <CustomDivider text="درخواست های انتخاب شده" />
        <CustomTable<WalletRequestRejectedFlattenedDataType>
          dataSource={flattenedData}
          columns={
            params?.tab === "2"
              ? WalletRequestRejectedDrawerCheckRequestLegalStepTableModel({
                  openDeleteModal,
                })
              : WalletRequestRejectedDrawerCheckRequestStepTableModel({
                  openDeleteModal,
                })
          }
          pagination={paginationConfig}
          {...TABLE_PROPS(flattenedData?.length || 0)}
          rowKey="id"
          className="wallet-request-users-drawer-model-table-container"
          draggableColumns
          draggableId={
            ExcelCodes.WALLET_WALLET_REQUEST_REJECTED_DRAWER_CHECK_REQUEST_STEP_TABLE
          }
        />
      </div>
    </>
  );
};
export default WalletRequestRejectedDrawerCheckRequestStep;
