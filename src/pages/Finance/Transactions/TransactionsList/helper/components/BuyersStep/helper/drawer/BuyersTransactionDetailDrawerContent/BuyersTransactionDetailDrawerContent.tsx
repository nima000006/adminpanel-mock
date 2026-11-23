import { useEffect, useState } from "react";

import { Descriptions, DescriptionsProps, Modal, Row } from "antd";
import { PiReceipt, PiUserLight } from "react-icons/pi";
import { Link } from "react-router";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { emptyString } from "@infra/config/global.vars";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useLazyGetTransactionDetailQuery } from "@infra/states/redux/Apis/finance/transactionsApi";
import { TransactionBeneficiariesItem } from "@pages/Finance/Transactions/TransactionsList/@types/@transactionsList";
import TransactionsFactorModalContent from "@pages/Finance/Transactions/TransactionsList/helper/components/BuyersStep/helper/drawer/BuyersTransactionDetailDrawerContent/helper/modal/TransactionsFactorModalContent/TransactionsFactorModalContent";

import { BuyersTransactionDetailDrawerContentProps } from "./@types/@buyersTransactionDetailDrawerContentTypes";
import TransactionBeneficiariesListTableModel from "../../models/TransactionBeneficiariesListTableModel";

const BuyersTransactionDetailDrawerContent = ({
  closeDrawer,
  uuid,
  hasRefundedTab,
}: BuyersTransactionDetailDrawerContentProps) => {
  const [openFactorModal, setIsOpenFactorModal] = useState<{
    isOpen: boolean;
    uuid: string;
  }>({
    isOpen: false,
    uuid: "-1",
  });
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
      label: "شعبه / واحد",
      children: dataPlaceHolder({ data: transactionData?.customerBranchName }),
    },
    {
      key: "10",
      label: "نام دانشکده",
      children: emptyString,
    },
  ];

  const closeFactorModalHandler = () => {
    setIsOpenFactorModal({ isOpen: false, uuid: "-1" });
  };

  const factorsClickHandler = (uuid: string) => {
    setIsOpenFactorModal({ isOpen: true, uuid });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {openFactorModal.isOpen && (
        <Modal
          title="فاکتور‌های تراکنش"
          open={openFactorModal.isOpen}
          onCancel={closeFactorModalHandler}
          width={1000}
          footer={null}
          className="finance-transaction-detail-history-modal body-regular"
        >
          <TransactionsFactorModalContent uuid={openFactorModal?.uuid} />
        </Modal>
      )}

      <Div
        className="buyer-transaction-drawer-content-container"
        loading={isGetTransactionDetailsLoading}
      >
        <CustomDrawerHeader
          title={!hasRefundedTab ? "جزئیات بیشتر تراکنش" : "تراکنش اصلی"}
          closeDrawerHandler={closeDrawer}
        />

        <div>
          <CustomDivider
            text="اطلاعات تراکنش"
            extraContent={
              <p
                className="text-primary-6! flex cursor-pointer items-center gap-1"
                onClick={() => {
                  if (!transactionData?.uuid) return;
                  factorsClickHandler(transactionData.uuid);
                }}
              >
                <PiReceipt size={16} /> فاکتورها
              </p>
            }
          />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              label="شناسه تراکنش"
              value={transactionData?.uuid}
              lg={12}
              md={12}
              xl={12}
            />
            <SingleVerticalWithCol
              label="مبلغ کل تراکنش (تومان)"
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
              customDateFormat="YYYY/M/D ، HH:mm"
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
            <SingleVerticalWithCol
              label="نام و نام خانوادگی خریدار"
              value={transactionData?.customerFullName}
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
          </Row>
        </div>
        <div>
          <CustomDivider text="لیست ذینفعان تراکنش" />
          <CustomTable<TransactionBeneficiariesItem>
            dataSource={transactionData?.beneficiaries}
            rowKey={uuid}
            columns={TransactionBeneficiariesListTableModel()}
            className="financial-transaction-buyer-step-Table"
          />
        </div>

        <div>
          <CustomDivider
            text="اطلاعات کاربری خریدار"
            extraContent={
              <Link
                to="/"
                className="text-neutral-6! pointer-events-none flex cursor-not-allowed! items-center gap-1 opacity-50"
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
export default BuyersTransactionDetailDrawerContent;
