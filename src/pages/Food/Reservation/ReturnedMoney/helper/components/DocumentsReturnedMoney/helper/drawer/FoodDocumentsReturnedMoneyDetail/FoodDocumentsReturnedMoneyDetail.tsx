import { useEffect, useState } from "react";

import { Form, Tabs, UploadFile } from "antd";
import { toast } from "react-toastify";

import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { useLazyGetPendingPaymentDetailQuery } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";

import { FoodDocumentsReturnedMoneyDetailProps } from "./@types/@foodDocumentsReturnedMoneyDetailType";
import ReturnTransactionInfo from "./helper/components/ReturnTransactionInfo/ReturnTransactionInfo";
import TransactionReturnedMoneyTab from "./helper/components/TransactionReturnedMoneyTab/TransactionReturnedMoneyTab";
import {
  GetPendingPaymentDetailResponse,
  GetPendingPaymentDetailType,
  requestDtos,
} from "../../../../PendingPayment/helper/drawers/FoodPendingPaymentDetail/@types/@foodPendingPaymentDetail";
import "./_foodDocumentsReturnedMoneyDetail.scss";

const FoodDocumentsReturnedMoneyDetail = ({
  id,
  closeDrawer,
}: FoodDocumentsReturnedMoneyDetailProps) => {
  const [total, setTotal] = useState<number>();
  const [secondTabData, setSecondTabData] = useState<GetPendingPaymentDetailType>();
  const [returnTransactionFileImage, setReturnTransactionFileImage] = useState<
    UploadFile[]
  >([]);

  const [dataSourceFirstTabDetail, setDataSourceFirstTabDetail] = useState<requestDtos[]>(
    []
  );
  const [form] = Form.useForm();

  //? ================================  Api Calls ================================
  //get detail list
  const [getPendingPaymentDetail, { isFetching: isGetPendingPaymentDetailLoading }] =
    useLazyGetPendingPaymentDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getDetailData(id);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getDetailData = (id: number) => {
    getPendingPaymentDetail({ documentId: id })
      .unwrap()
      .then(PendingPaymentDetailIsSuccess);
  };

  //success
  const PendingPaymentDetailIsSuccess = (values: GetPendingPaymentDetailResponse) => {
    if (values?.status === 200) {
      setDataSourceFirstTabDetail(values?.data?.requestDtos);
      setTotal(values?.data?.totalAmount);
      setSecondTabData(values?.data);
      if (values?.data?.documentUrl?.startsWith("http")) {
        setReturnTransactionFileImage([
          {
            uid: values?.data?.documentUrl,
            name: values?.data?.documentUrl,
            status: "done",
            url: values?.data?.documentUrl,
          },
        ]);
      }
      // form?.setFieldsValue({
      //   transactionNumber: values?.data?.trackNo,
      //   date: dataPlaceHolder({ data: values?.data?.paymentDate, isDate: true }),
      //   bankName: values?.data?.fromBankPersianName,
      //   iban: values?.data?.fromIBAN,
      //   file: values?.data?.documentUrl,
      // });
    } else {
      return toast.error((values?.data || values?.msg) as any, {
        toastId: (values?.data || values?.msg) as any,
      });
    }
  };

  const FoodDocumentsReturnedMoneyDetailTabs = [
    {
      label: " تراکنش‌های عودت وجه شده",
      children: (
        <TransactionReturnedMoneyTab
          data={dataSourceFirstTabDetail}
          loading={isGetPendingPaymentDetailLoading}
        />
      ),
      key: "1",
    },
    {
      label: "اطلاعات تراکنش عودت",
      children: (
        <ReturnTransactionInfo
          total={total}
          loading={isGetPendingPaymentDetailLoading}
          form={form}
          setReturnTransactionFileImage={setReturnTransactionFileImage}
          returnTransactionFileImage={returnTransactionFileImage}
          data={secondTabData}
        />
      ),
      key: "2",
    },
  ];

  return (
    <div>
      <CustomDrawerHeader title="مشاهده" closeDrawerHandler={closeDrawer} />
      <Tabs
        items={FoodDocumentsReturnedMoneyDetailTabs}
        className="food-documents-returned-money-detail-container"
        type="line"
      />
    </div>
  );
};
export default FoodDocumentsReturnedMoneyDetail;
