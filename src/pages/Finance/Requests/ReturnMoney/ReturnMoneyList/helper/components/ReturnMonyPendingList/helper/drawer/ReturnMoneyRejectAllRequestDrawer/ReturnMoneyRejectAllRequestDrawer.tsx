import { useEffect, useState } from "react";

import { Form } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSteps from "@components/Renderers/CustomSteps/CustomSteps";
import { stepStatusCreator } from "@infra/helpers/utils";
import {
  useLazyGetRejectReasonSelectListQuery,
  useSendAllRejectMutation,
} from "@infra/states/redux/Apis/wallet/requests/requestsApi";

import {
  reasonRejectFormType,
  ReturnMoneyRejectAllRequestDrawerProps,
} from "./@types/@rejectAllRequestDrawerContent";
import ReasonRejectRequest from "./helper/components/ReasonRejectRequest/ReasonRejectRequest";
import ReviewOptionalRequest from "./helper/components/ReviewOptionalRequest/ReviewOptionalRequest";
import "./_returnMoneyRejectAllRequestDrawer.scss";
const ReturnMoneyRejectAllRequestDrawer = ({
  closeDrawerHandler,
  data,
  rowSelection,
  setRowSelection,
}: ReturnMoneyRejectAllRequestDrawerProps) => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm<reasonRejectFormType>();

  //? ================================  Api Calls ================================
  // reject reason
  const [
    getRejectReason,
    { data: rejectReasonData, isFetching: rejectReasonDataIsLoading },
  ] = useLazyGetRejectReasonSelectListQuery();

  // send all reject
  const [sendAllReject, { isLoading: isSendAllRejectLoading }] =
    useSendAllRejectMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getRejectReason();
  }, []);

  useEffect(() => {
    if (rowSelection.length <= 0) {
      closeDrawerHandler();
    }
  }, [rowSelection.length]);

  //* ================================ Util Functions ================================
  // step item
  const stepsItem = [
    {
      id: "1",
      children: (
        <ReviewOptionalRequest
          data={data}
          setRowSelection={setRowSelection}
          rowSelection={rowSelection}
        />
      ),
    },
    {
      id: "2",
      children: (
        <ReasonRejectRequest
          form={form}
          data={rejectReasonData}
          loading={rejectReasonDataIsLoading}
        />
      ),
    },
  ];
  // DRAWER HANDLER
  const closeDrawer = () => {
    closeDrawerHandler();
  };

  const confirmAndContinueHandler = () => {
    const reason = form?.getFieldValue("reasonReject");
    const desc = form?.getFieldValue("description");
    if (current === 0) {
      setCurrent(1);
    } else {
      sendAllReject({
        body: {
          bankAccountIds: rowSelection as number[],
          reason: reason?.item?.name,
          description: desc,
        },
        params: {
          bankAccountIds: rowSelection as number[],
          reason: reason?.item?.name,
        },
      })
        .unwrap()
        .then(sendAllRejectIsSuccess);
    }
  };

  const sendAllRejectIsSuccess = () => {
    closeDrawerHandler();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="finance-return-money-reject-all-request-drawer-container">
      <CustomDrawerHeader
        title="رد گروهی درخواست"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <>
            <CustomButton type="default" onClick={closeDrawer}>
              انصراف
            </CustomButton>
            <CustomButton
              type="primary"
              onClick={confirmAndContinueHandler}
              loading={isSendAllRejectLoading}
              disabled={rowSelection.length <= 0}
            >
              {current === 0 ? "تایید و ادامه " : "رد درخواست‌ها"}
            </CustomButton>
          </>
        }
      />

      <CustomSteps
        current={current}
        items={[
          {
            status: stepStatusCreator(current, 0),
            title: "بررسی درخواست‌های انتخاب شده",
          },
          {
            status: stepStatusCreator(current, 1),
            title: "دلیل رد درخواست",
          },
        ]}
      />
      {stepsItem[current].children}
    </div>
  );
};
export default ReturnMoneyRejectAllRequestDrawer;
