import { useEffect, useState } from "react";

import { Col, Row } from "antd";

import CustomCard from "@components/Renderers/CustomCard/CustomCard";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useLazyGetSettlementBeneficiariesDetailDocumentsQuery } from "@infra/states/redux/Apis/finance/financeApi";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";
import {
  AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentProps,
  getSettlementBeneficiariesDetailDocumentsResponse,
} from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/_shared/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent/@types/@accountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent";
import AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentCreditTable from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/_shared/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentCreditTable/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentCreditTable";
import AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentDebitTable from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/_shared/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentDebitTable/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentDebitTable";

const AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent = ({
  onClose,
  uuid,
}: AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentProps) => {
  const [data, setData] = useState<getSettlementBeneficiariesDetailDocumentsResponse>();

  const [view, setView] = useState("0"); //default on credit mode

  //? ================================  Api Calls ================================
  const [
    GetSettlementBeneficiariesDetailDocuments,
    { isFetching: GetSettlementBeneficiariesDetailDocumentsLoading },
  ] = useLazyGetSettlementBeneficiariesDetailDocumentsQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    GetSettlementBeneficiariesDetailDocuments({ uuid })
      .unwrap()
      .then((res) => setData(res));
  }, [uuid]);

  //* ================================ Util Functions ================================
  const segmentItems = [
    {
      id: "1",
      children: (
        <AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentCreditTable
          uuid={uuid}
          view={view}
        />
      ),
    },
    {
      id: "2",
      children: (
        <AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentDebitTable
          uuid={uuid}
          view={view}
        />
      ),
    },
  ];
  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <div>
      <CustomDrawerHeader title="مشاهده اسناد ذینفع" closeDrawerHandler={onClose} />
      <Div loading={GetSettlementBeneficiariesDetailDocumentsLoading}>
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            xs={12}
            label="سرویس"
            value={
              serviceOptions.find((item) => item.value === data?.samimService?.name)
                ?.title ?? "-"
            }
          />
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            xs={12}
            label="کسب و کار"
            value={data?.businessName}
          />
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            xs={12}
            label="ذینفع"
            value={data?.branchName}
          />
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            xs={12}
            label="تعداد اسناد"
            value={data?.documentCount?.toString()}
          />
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            xs={12}
            label="تاریخ ایجاد"
            value={data?.aggregationDate}
            isDate
          />
        </Row>
        <Row gutter={[16, 16]} className="mt-5">
          <Col xl={12} lg={12}>
            <CustomCard>
              <p>مجموع مطالبات ذینفع (بدهکاری)</p>
              <h3 className="mt-2! font-bold!">
                {dataPlaceHolder({
                  data: data?.debitAmount,
                  isPrice: true,
                  isRial: true,
                  currency: { isAvailable: true, type: "تومان" },
                })}
              </h3>
            </CustomCard>
          </Col>
          <Col xl={12} lg={12}>
            <CustomCard>
              <p>مجموع تعهدات ذینفع (بستانکاری)</p>
              <h3 className="mt-2! font-bold!">
                {dataPlaceHolder({
                  data: data?.creditAmount,
                  isPrice: true,
                  isRial: true,
                  currency: { isAvailable: true, type: "تومان" },
                })}
              </h3>
            </CustomCard>
          </Col>
          <Col xl={24} lg={24}>
            <CustomCard>
              <p>مجموع قابل پرداخت</p>
              <h3 className="mt-2! font-bold!">
                {dataPlaceHolder({
                  data: data?.payableAmount,
                  isPrice: true,
                  isRial: true,
                  currency: { isAvailable: true, type: "تومان" },
                })}
              </h3>
            </CustomCard>
          </Col>
        </Row>
      </Div>

      <CustomDivider
        text="اسناد"
        extraContent={
          <CustomSegmented
            options={[
              { value: "0", label: "بستانکاری" },
              { value: "1", label: "بدهکاری" },
            ]}
            onChange={(value) => setView(value as "0" | "1")}
            value={view}
          />
        }
      />
      {segmentItems[+view]?.children}
    </div>
  );
};

export default AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent;
