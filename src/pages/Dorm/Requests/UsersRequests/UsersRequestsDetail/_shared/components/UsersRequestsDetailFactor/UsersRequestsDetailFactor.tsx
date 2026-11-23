import { useEffect, useState } from "react";

import { Row } from "antd";
import { AiOutlineClose } from "react-icons/ai";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTimeline from "@components/Renderers/CustomTimeline/CustomTimeline";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetDormRequestPaymentInvoiceInfoQuery,
  useLazyGetDormRequestPaymentInvoicePaymentStatusQuery,
  useLazyGetDormRequestPaymentInvoiceTableQuery,
} from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";
import {
  dormPaymentMethod,
  dormCanDebtText,
  dormPaymentStatus,
} from "@pages/Dorm/_shared/utils/DormUtils";

import DormFactorTimeline from "./helper/components/FactorTimeline/DormFactorTimeline";
import UsersRequestsFactorReportsMoreDetailsDrawer from "./helper/drawers/ReportsMoreDetailsDrawer/UsersRequestsFactorReportsMoreDetailsDrawer";
import UsersRequestsDetailFactorTableModel from "./helper/models/UsersRequestsDetailFactor/UsersRequestsDetailFactorTableModel";
import {
  DormRequestPaymentInvoiceInfo,
  GetDormRequestPaymentInvoiceInfoResponse,
  GetDormRequestPaymentInvoicePaymentStatus,
  GetDormRequestPaymentInvoicePaymentStatusResponse,
  GetDormRequestPaymentInvoiceTable,
  GetDormRequestPaymentInvoiceTableResponse,
} from "../../../@types/@usersRequestsDetail";
import "./_usersRequestsDetailFactor.scss";

const payedStatus = {
  notPayed: 2,
  payed: 1,
};

const UsersRequestsDetailFactor = ({ from }: { from?: string }) => {
  const [paymentFactor, setPaymentFactor] =
    useState<DormRequestPaymentInvoiceInfo | null>(null);

  const [dataSource, setDataSource] = useState<GetDormRequestPaymentInvoiceTable[]>([]);
  const [payedInfo, setPayedInfo] = useState({
    payed: 0,
    payable: 0,
  });

  const [paymentStatus, setPaymentStatus] = useState<
    GetDormRequestPaymentInvoicePaymentStatus[]
  >([]);

  const [openDrawer, setOpenDrawer] = useState<{
    isOpen: boolean;
    data: (GetDormRequestPaymentInvoicePaymentStatus & { title: string }) | null;
  }>({ isOpen: false, data: null });

  const { params } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getPaymentInvoiceData, { isFetching: isPaymentInvoiceDataLoading }] =
    useLazyGetDormRequestPaymentInvoiceInfoQuery();

  const [
    getDormRequestPaymentInvoiceTable,
    { isFetching: isGetDormRequestPaymentInvoiceTableLoading },
  ] = useLazyGetDormRequestPaymentInvoiceTableQuery();

  const [
    getDormRequestPaymentStatus,
    { isFetching: isGetDormRequestPaymentStatusLoading },
  ] = useLazyGetDormRequestPaymentInvoicePaymentStatusQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    if (params?.id) {
      getPaymentInvoiceData(params.id).unwrap().then(getPaymentInvoiceDataSuccess);
      getDormRequestPaymentInvoiceTable(params.id)
        .unwrap()
        .then(getDormRequestPaymentInvoiceTableSuccess);

      getDormRequestPaymentStatus(params?.id)
        .unwrap()
        .then(getDormRequestPaymentStatusSuccess);
    }
  }, [params?.id]);

  //* ================================ Util Functions ================================
  const getPaymentInvoiceDataSuccess = async (
    value: GetDormRequestPaymentInvoiceInfoResponse
  ) => {
    if (value?.status === 200) {
      setPaymentFactor(value?.data?.[0]);
    }
  };

  const getDormRequestPaymentInvoiceTableSuccess = async (
    value: GetDormRequestPaymentInvoiceTableResponse
  ) => {
    if (value?.status === 200) {
      setDataSource(value?.data);

      value?.data?.forEach((item) => {
        if (item?.paymentStatus === payedStatus.payed) {
          setPayedInfo((prev) => ({
            ...prev,
            payed: prev.payed + item?.amountPayable,
          }));
        } else {
          setPayedInfo((prev) => ({
            ...prev,
            payable: prev.payable + item?.amountPayable,
          }));
        }
      });
    }
  };

  const getDormRequestPaymentStatusSuccess = async (
    value: GetDormRequestPaymentInvoicePaymentStatusResponse
  ) => {
    if (value?.status === 200) {
      setPaymentStatus(value?.data);
    }
  };

  const paymentDetailHandler = (
    data: GetDormRequestPaymentInvoicePaymentStatus,
    title: string
  ) => {
    setOpenDrawer({ isOpen: true, data: { ...data, title } });
  };

  const closeDrawerHandler = () => {
    setOpenDrawer({ isOpen: false, data: null });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      {/* PAYMENT DETAIL DRAWER IN FACTOR */}
      {openDrawer?.isOpen && (
        <CustomDrawer
          title="جزئیات پرداخت"
          open={openDrawer?.isOpen}
          onClose={closeDrawerHandler}
          closeIcon={<AiOutlineClose />}
          content={
            <UsersRequestsFactorReportsMoreDetailsDrawer
              onClose={closeDrawerHandler}
              data={openDrawer?.data}
            />
          }
        />
      )}

      <div className="user-requests-detail-factor-container">
        <div>
          <CustomDivider text="فاکتور پرداخت" />
          <div className="payment-factor">
            <Div loading={isPaymentInvoiceDataLoading}>
              {paymentFactor && (
                <Row gutter={[16, 16]}>
                  <SingleVerticalWithCol
                    label="تاریخ صدور فاکتور"
                    value={paymentFactor?.createDate}
                    isDate
                  />
                  <SingleVerticalWithCol
                    label="شماره فاکتور"
                    value={paymentFactor?.invoiceId}
                  />
                  <SingleVerticalWithCol
                    label="نوع پرداخت"
                    value={
                      dormPaymentMethod[paymentFactor?.AssociationRequest_paymentMethod]
                    }
                  />
                  <SingleVerticalWithCol
                    label="امکان بدهی"
                    value={
                      dormCanDebtText[
                        paymentFactor
                          ?.AssociationRequest_AssociationCategoryDeliverPlan_canDebt
                      ]
                    }
                  />
                  {/* اقساطی */}
                  {paymentFactor?.AssociationRequest_paymentMethod ===
                    dormPaymentStatus.installment && (
                    <>
                      <SingleVerticalWithCol
                        label="سقف بدهی (ریال)"
                        value={paymentFactor?.AssociationRequest_AssociationCategoryDeliverPlan_maxDebt?.toString()}
                        isPrice
                      />
                      <SingleVerticalWithCol
                        label="حداکثر تعداد اقساط جهت بدهی"
                        value={paymentFactor?.AssociationRequest_AssociationCategoryDeliverPlan_maxNumberInstallmentForDebt?.toString()}
                      />
                    </>
                  )}
                </Row>
              )}
            </Div>
            <Div
              className="table-container"
              loading={isGetDormRequestPaymentInvoiceTableLoading}
            >
              <CustomTable
                dataSource={dataSource}
                columns={UsersRequestsDetailFactorTableModel()}
                pagination={false}
                {...TABLE_PROPS(dataSource?.length)}
                rowKey="id"
                className="factor-table-model-container"
              />

              <Row gutter={16}>
                <SingleVerticalWithCol
                  span={12}
                  label="مبلغ پرداخت شده"
                  value={payedInfo.payed?.toString()}
                />
                <SingleVerticalWithCol
                  span={12}
                  label="مبلغ قابل پرداخت"
                  value={payedInfo.payable?.toString()}
                />
              </Row>
            </Div>

            {from === "cancellation" && (
              <>
                {/* //todo[Atefeh]: uncomment when api got ready */}
                {/* <div>
                <CustomDivider text="اطلاعات حساب بانکی کاربر" />
                <Row gutter={[16, 16]}>
                  <SingleVerticalWithCol
                    label="شماره حساب"
                    value={"data?.price?.toString()"}
                  />
                  <SingleVerticalWithCol
                    label="شماره کارت"
                    value={"data?.price?.toString()"}
                  />
                  <SingleVerticalWithCol
                    label="شماره شبا"
                    value={"data?.price?.toString()"}
                  />
                </Row>
              </div> */}
              </>
            )}
          </div>
        </div>
        <Div loading={isGetDormRequestPaymentStatusLoading} className="payment-status">
          {paymentFactor?.AssociationRequest_paymentMethod === dormPaymentStatus.cash ? ( // نقدی
            <>
              <CustomDivider text="وضعیت پرداخت" />
              <div className="tag-container">
                <span>پرداخت نقدی</span>
                <CustomTag
                  color={`${paymentStatus?.[0]?.statusNumber === payedStatus.payed ? "green" : "gold"}`}
                >
                  {paymentStatus?.[0]?.statusNumber === payedStatus.payed
                    ? "پرداخت شده"
                    : "در انتظار پرداخت"}
                </CustomTag>
              </div>
              <Row gutter={[16, 16]}>
                <SingleVerticalWithCol
                  label="مبلغ (تومان)"
                  value={paymentStatus?.[0]?.amount?.toString()}
                />
                <SingleVerticalWithCol
                  label="تاریخ تسویه"
                  value={paymentStatus?.[0]?.paymentDate}
                  isDate
                />
              </Row>
            </>
          ) : (
            // اقساطی
            <CustomTimeline
              items={DormFactorTimeline({ paymentStatus, paymentDetailHandler })}
            />
          )}
        </Div>
      </div>
    </>
  );
};

export default UsersRequestsDetailFactor;
