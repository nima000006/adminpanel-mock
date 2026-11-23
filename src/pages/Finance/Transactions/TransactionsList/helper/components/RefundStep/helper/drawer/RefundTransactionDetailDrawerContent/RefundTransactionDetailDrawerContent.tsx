import { useEffect, useState } from "react";

import { Descriptions, DescriptionsProps, Row, Modal } from "antd";
import { LuArrowLeftRight } from "react-icons/lu";
import { PiReceipt, PiUserLight } from "react-icons/pi";
import { Link } from "react-router";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { emptyString } from "@infra/config/global.vars";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useLazyGetTransactionDetailQuery } from "@infra/states/redux/Apis/finance/transactionsApi";
import { TransactionBeneficiariesItem } from "@pages/Finance/Transactions/TransactionsList/@types/@transactionsList";
import TransactionsRefundedFactorModalContent from "@pages/Finance/Transactions/TransactionsList/helper/components/RefundStep/helper/modal/TransactionsRefundedFactorModalContent/TransactionsRefundedFactorModalContent";

import BeneficiarySharesDivisionListTableModel from "../../models/BeneficiarySharesDivisionListTableModel/BeneficiarySharesDivisionListTableModel";
import { RefundTransactionDetailDrawerContentProps } from "../@type/@refundTransactionDetailDrawerContentType";

const RefundTransactionDetailDrawerContent = ({
  closeDrawer,
  uuid,
  setIsOpenMainTransactionDetailDrawer,
  setIsOpenDetailDrawer,
}: RefundTransactionDetailDrawerContentProps) => {
  const [openFactorModal, setIsOpenFactorModal] = useState<{
    isOpen: boolean;
    uuid: string;
  }>({ isOpen: false, uuid: "-1" });

  //? ================================  Api Calls ================================
  const [
    getTransactionDetails,
    { data: transactionData, isLoading: isGetTransactionDetailsLoading },
  ] = useLazyGetTransactionDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!uuid) return;
    getTransactionDetails(uuid);
  }, [uuid]);

  //* ================================ Util Functions ================================
  const userInfoItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "نام ",
      children: dataPlaceHolder({ data: transactionData?.customerFirstname }),
    },
    {
      key: "2",
      label: "نام خانوادگی",
      children: dataPlaceHolder({ data: transactionData?.customerLastname }),
    },
    {
      key: "3",
      label: "کد ملی / کد فراگیر",
      children: dataPlaceHolder({ data: transactionData?.customerUsername }),
    },
    {
      key: "4",
      label: "شماره دانشجویی",
      children: dataPlaceHolder({ data: transactionData?.customerPersonalCode }),
    },
    {
      key: "5",
      label: "شماره همراه",
      children: dataPlaceHolder({ data: transactionData?.customerPhoneNumber }),
    },
    {
      key: "6",
      label: "مقطع تحصیلی",
      children: dataPlaceHolder({ data: transactionData?.customerDegreeName }),
    },
    {
      key: "7",
      label: "رشته تحصیلی",
      children: dataPlaceHolder({ data: transactionData?.customerFieldName }),
    },
    {
      key: "8",
      label: "کسب و کار",
      children: dataPlaceHolder({ data: transactionData?.customerBusinessName }),
    },
    {
      key: "9",
      label: "واحد / شعبه",
      children: dataPlaceHolder({ data: transactionData?.customerBranchName }),
    },
    {
      key: "10",
      label: "نام دانشکده",
      children: emptyString,
    },
  ];

  // btn handler
  const mainTransactionHandler = (id: string | undefined) => {
    setIsOpenMainTransactionDetailDrawer({ isOpen: true, id });
    setIsOpenDetailDrawer({ isOpen: false, id: "-1" });
  };

  const factorsClickHandler = (uuid: string) => {
    setIsOpenFactorModal({ isOpen: true, uuid });
  };

  // modal handler
  const closeFactorModalHandler = () => {
    setIsOpenFactorModal({ isOpen: false, uuid: "-1" });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* REFUNDED FACTORS */}
      {openFactorModal?.isOpen && (
        <Modal
          title="فاکتور‌های تراکنش"
          open={openFactorModal?.isOpen}
          onCancel={closeFactorModalHandler}
          width={1000}
          footer={null}
          className="finance-transaction-detail-history-modal body-regular"
        >
          <TransactionsRefundedFactorModalContent uuid={openFactorModal?.uuid} />
        </Modal>
      )}

      <Div
        loading={isGetTransactionDetailsLoading}
        className="refund-transaction-drawer-content-container"
      >
        <CustomDrawerHeader
          title="جزئیات بیشتر تراکنش"
          closeDrawerHandler={closeDrawer}
        />

        <div>
          <CustomDivider
            text="اطلاعات تراکنش"
            extraContent={
              <div className="flex gap-4">
                <p
                  className="text-primary-6! flex cursor-pointer items-center gap-1"
                  onClick={() => mainTransactionHandler(transactionData?.uuid)}
                >
                  <LuArrowLeftRight size={16} /> تراکنش اصلی
                </p>
                <p
                  className="text-primary-6! flex cursor-pointer items-center gap-1"
                  onClick={() => {
                    if (!transactionData?.uuid) return;
                    factorsClickHandler(transactionData.uuid);
                  }}
                >
                  <PiReceipt size={16} /> فاکتورها
                </p>
              </div>
            }
          />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              label="مبلغ عودت داده شده (تومان)"
              value={dataPlaceHolder({
                data: emptyString,
                isPrice: true,
                isRial: true,
              })}
              lg={12}
              md={12}
              xl={12}
            />
            <SingleVerticalWithCol
              label="کل مبلغ تراکنش اصلی (تومان)"
              isPrice={true}
              isRial={true}
              value={transactionData?.transactionAmount?.toString()}
              lg={12}
              md={12}
              xl={12}
            />
            <SingleVerticalWithCol
              label="تاریخ و ساعت تراکنش"
              value={transactionData?.transactionDate}
              isDate={true}
              customDateFormat="HH:mm, YYYY-MM-DD"
              lg={12}
              md={12}
              xl={12}
            />
            <SingleVerticalWithCol
              label="شناسه تراکنش"
              value={transactionData?.uuid}
              lg={12}
              md={12}
              xl={12}
            />
            <SingleVerticalWithCol
              label="تعداد ذینفعان"
              value={transactionData?.beneficiaryCount?.toString()}
              lg={12}
              md={12}
              xl={12}
            />
            <SingleVerticalWithCol
              label="عودت شده به"
              value={transactionData?.customerFullName}
              lg={12}
              md={12}
              xl={12}
            />
            <SingleVerticalWithCol
              label="سرویس"
              value={transactionData?.samimService?.title}
              lg={12}
              md={12}
              xl={12}
            />
          </Row>
        </div>
        <div>
          <CustomDivider text="سهم ذینفعان به تفکیک" />
          <CustomTable<TransactionBeneficiariesItem>
            dataSource={transactionData?.beneficiaries}
            rowKey={uuid}
            columns={BeneficiarySharesDivisionListTableModel()}
            pagination={paginationConfig}
            className="financial-transaction-buyer-step-Table"
          />
        </div>

        <div>
          <CustomDivider
            text="کاربر دریافت کننده وجه عودت شده"
            extraContent={
              <Link
                to="/"
                className="text-primary-6! pointer-events-none flex cursor-not-allowed! items-center gap-1 opacity-50"
                aria-disabled="true"
                tabIndex={-1}
              >
                <PiUserLight size={16} />
                پروفایل کاربر
              </Link>
            }
          />
          <Descriptions
            className="body-regular"
            column={1}
            items={userInfoItems}
            styles={{
              label: {
                fontWeight: "bold",
                textAlign: "right",
                width: "180px",
              },
            }}
          />
        </div>
      </Div>
    </>
  );
};
export default RefundTransactionDetailDrawerContent;
