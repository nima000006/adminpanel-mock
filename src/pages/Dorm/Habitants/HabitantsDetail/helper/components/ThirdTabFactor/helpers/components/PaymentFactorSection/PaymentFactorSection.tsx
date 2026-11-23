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
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetDormRequestPaymentInvoiceInfoQuery,
  useLazyGetDormRequestPaymentInvoicePaymentStatusQuery,
  useLazyGetDormRequestPaymentInvoiceTableQuery,
} from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";
import {
  dormCanDebtText,
  dormPaymentMethod,
  dormPaymentStatus,
} from "@pages/Dorm/_shared/utils/DormUtils";
import { payedStatus } from "@pages/Dorm/Habitants/HabitantsDetail/helper/utils/HabitantDetailUtils";
import {
  DormRequestPaymentInvoiceInfo,
  GetDormRequestPaymentInvoiceInfoResponse,
  GetDormRequestPaymentInvoicePaymentStatus,
  GetDormRequestPaymentInvoicePaymentStatusResponse,
  GetDormRequestPaymentInvoiceTable,
  GetDormRequestPaymentInvoiceTableResponse,
} from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/@types/@usersRequestsDetail";

import HabitantsFactorReportsMoreDetailsDrawer from "../../drawer/ReportsMoreDetailsDrawer/UsersHabitantsFactorReportsMoreDetailsDrawer";
import FactorPaymentTableModel from "../../models/FactorPaymentTableModel/FactorPaymentTableModel";
import DormFactorTimeline from "../FactorTimeline/DormFactorTimeline";

const PaymentFactorSection = () => {
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

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
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
            <HabitantsFactorReportsMoreDetailsDrawer
              onClose={closeDrawerHandler}
              data={openDrawer?.data}
            />
          }
        />
      )}

      <div className="flex flex-col gap-6">
        <CustomDivider text="فاکتور پرداخت" />
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
                value={dormPaymentMethod[paymentFactor?.AssociationRequest_paymentMethod]}
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
          className="flex flex-col gap-4"
          loading={isGetDormRequestPaymentInvoiceTableLoading}
        >
          <CustomTable
            dataSource={dataSource}
            rowKey="id"
            columns={FactorPaymentTableModel()}
            pagination={false}
            {...TABLE_PROPS(dataSource?.length)}
          />
          <Row gutter={16} className="">
            <SingleVerticalWithCol
              span={12}
              label="مبلغ پرداخت شده"
              value={dataPlaceHolder({
                data: paymentFactor?.amountPaidSoFar?.toString(),
                isPrice: true,
                isRial: true,
              })}
            />
            {/* //Todo[Atefeh]:previous logic */}
            {/* <SingleVerticalWithCol
              span={12}
              label="مبلغ پرداخت شده"
              value={dataPlaceHolder({
                data: payedInfo.payed?.toString(),
                isPrice: true,
                isRial: true,
              })}
            /> */}
            <SingleVerticalWithCol
              span={12}
              label="مبلغ قابل پرداخت"
              value={
                payedInfo.payable
                  ? dataPlaceHolder({
                      data: payedInfo.payable?.toString(),
                      isPrice: true,
                      isRial: true,
                    })
                  : ""
              }
            />
          </Row>
        </Div>
        <Div
          loading={isGetDormRequestPaymentStatusLoading}
          className="flex flex-col gap-4"
        >
          <CustomDivider text="وضعیت پرداخت" />
          {paymentFactor?.AssociationRequest_paymentMethod === dormPaymentStatus.cash ? (
            <>
              <div className="flex gap-4">
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
                  value={dataPlaceHolder({
                    data: paymentStatus?.[0]?.amount?.toString(),
                    isPrice: true,
                    isRial: true,
                  })}
                />
                <SingleVerticalWithCol
                  label="تاریخ تسویه"
                  value={paymentStatus?.[0]?.paymentDate}
                  isDate
                />
              </Row>
            </>
          ) : (
            <CustomTimeline
              items={DormFactorTimeline({ paymentStatus, paymentDetailHandler })}
            />
          )}
        </Div>
      </div>
    </>
  );
};
export default PaymentFactorSection;
