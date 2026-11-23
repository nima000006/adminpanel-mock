import { useState } from "react";

import { Form } from "antd";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSteps from "@components/Renderers/CustomSteps/CustomSteps";
import { stepStatusCreator } from "@infra/helpers/utils";
import { useWithdrawalRejectRequestMutation } from "@infra/states/redux/Apis/wallet/requests/requestsWithDrawalApi";

import { Withdrawal } from "../../@types/@walletRequestUsersList";
import { FormTypeWalletRequestRejectedDrawer } from "./helper/@types/@formTypeWalletRequestRejectedDrawer";
import WalletRequestRejectedDrawerCheckReasonStep from "./helper/components/WalletRequestRejectedDrawerCheckReasonStep/WalletRequestRejectedDrawerCheckReasonStep";
import WalletRequestRejectedDrawerCheckRequestStep from "./helper/components/WalletRequestRejectedDrawerCheckRequestStep/WalletRequestRejectedDrawerCheckRequestStep";

import "./_walletRequestRejectedDrawer.scss";

const SEND_REJECT_SUCCESS_MSG = "درخواست با موفقیت رد شد";
const WalletRequestRejectedDrawer = ({
  onClose,
  selectedUsers: initialUsers,
  refreshData,
  getStats,
}: {
  onClose: () => void;
  selectedUsers?: Withdrawal[] | undefined;
  refreshData: () => void;
  getStats: () => void;
}) => {
  const [current, setCurrent] = useState(0);
  const [selectedUsers, setSelectedUsers] = useState<Withdrawal[]>(initialUsers || []);

  const [form] = Form.useForm<FormTypeWalletRequestRejectedDrawer>();

  //? ================================ Api =============================================
  const [withdrawalRejectRequest, { isLoading }] = useWithdrawalRejectRequestMutation();

  //* ================================ Util functions ================================

  // btn handler
  const nextBtnHandler = () => {
    setCurrent(1);
  };
  const backBtnHandler = () => {
    setCurrent(0);
  };

  const confirmBtnHandler = () => {
    const values = form.getFieldsValue(["reason", "description"]);
    const requestData = {
      ids: selectedUsers.map((user) => user.id),
      reason: values?.reason?.item?.name,
      description: values.description || "",
    };

    withdrawalRejectRequest(requestData)
      .unwrap()
      .then(() => {
        refreshData();
        getStats();
        toast.success(SEND_REJECT_SUCCESS_MSG, {
          toastId: SEND_REJECT_SUCCESS_MSG,
        });
        onClose();
      });
  };

  //* ================================ Steps ================================
  const stepsItem = [
    {
      id: "0",
      children: (
        <WalletRequestRejectedDrawerCheckRequestStep
          setSelectedUsers={setSelectedUsers}
          selectedUsers={selectedUsers}
        />
      ),
    },
    {
      id: "1",
      children: (
        <Form form={form} onFinish={confirmBtnHandler}>
          <WalletRequestRejectedDrawerCheckReasonStep form={form} />
        </Form>
      ),
    },
  ];
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <div className="wallet-request-rejected-drawer-container">
      <CustomDrawerHeader
        closeDrawerHandler={onClose}
        title="رد گروهی درخواست"
        leftSideContent={
          current === 0 ? (
            <>
              <CustomButton onClick={onClose}>انصراف</CustomButton>
              <CustomButton
                type="primary"
                disabled={selectedUsers.length === 0}
                onClick={nextBtnHandler}
              >
                تایید و ادامه
              </CustomButton>
            </>
          ) : (
            <>
              <CustomButton onClick={backBtnHandler}>بازگشت</CustomButton>
              <CustomButton
                loading={isLoading}
                type="primary"
                htmlType="submit"
                onClick={() => form.submit()}
              >
                تایید و تسویه
              </CustomButton>
            </>
          )
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
export default WalletRequestRejectedDrawer;
