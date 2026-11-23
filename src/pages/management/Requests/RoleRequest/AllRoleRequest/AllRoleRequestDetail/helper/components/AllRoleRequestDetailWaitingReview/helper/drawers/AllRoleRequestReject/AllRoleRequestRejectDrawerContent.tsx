import { useEffect } from "react";

import { Form } from "antd";
import { useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MANAGEMENT_REQUESTS_ROLE_REQUEST_LIST_PAGE_ROUTE } from "@infra/router/routes/management";
import {
  useGetEstelamAmozeshyarRejectReasonsQuery,
  useManagementRoleAccessRequestMutation,
} from "@infra/states/redux/Apis/management/requests/requestApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { ROLE_REQUEST_REJECTED } from "@pages/management/Requests/RoleRequest/_shared/utils/roleRequestUtil";

import {
  AllRoleRequestRejectDrawerContentProps,
  AllRoleRequestRejectDrawerFormDataType,
} from "./@types/@allRoleRequestRejectDrawerContent";
import { ManagementRoleAccessRequestBody } from "../AllRoleRequestConfirmed/@types/@allRoleRequestConfirmedDrawerContent";
import "./_allRoleRequestRejectDrawerContent.scss";

const AllRoleRequestRejectDrawerContent = ({
  closeDrawerHandler,
}: AllRoleRequestRejectDrawerContentProps) => {
  const [rejectForm] = Form.useForm<AllRoleRequestRejectDrawerFormDataType>();

  const navigate = useNavigate();
  const {
    params: { id },
  } = useQueryParams();
  const reason = Form.useWatch("rejectReason", rejectForm);

  //? ================================ Api ================================
  const [sendRoleAccessRequest, { isLoading: isSending }] =
    useManagementRoleAccessRequestMutation();

  const { data: reasonList, isLoading: isGetRejectReasonsLoading } =
    useGetEstelamAmozeshyarRejectReasonsQuery();

  // ================================ Clear validation errors when switching away from OTHER ================================
  useEffect(() => {
    if (reason?.item?.name !== "OTHER") {
      rejectForm.setFields([
        {
          name: "description",
          errors: [],
        },
      ]);
    }
  }, [reason?.item?.name, rejectForm]);

  // ================================ Util Functions ================================
  const rejectRequestHandler = () => {
    rejectForm.validateFields().then((value) => {
      const trimmedDescription = (value?.description ?? "").trim();
      const requestBody = {
        statusId: ROLE_REQUEST_REJECTED,
        requestId: +id,
        rejectReason: value?.rejectReason?.item?.name ?? "",
        ...(trimmedDescription && { description: trimmedDescription }),
      } as ManagementRoleAccessRequestBody;

      sendRoleAccessRequest(requestBody)
        .unwrap()
        .then(() => {
          closeDrawerHandler();
          navigate({
            pathname: MANAGEMENT_REQUESTS_ROLE_REQUEST_LIST_PAGE_ROUTE,
          });
        });
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="all-role-request-reject-drawer-content-container">
      <CustomDrawerHeader
        title="رد درخواست"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="action-btn-container">
            <CustomButton onClick={closeDrawerHandler}>انصراف</CustomButton>
            <CustomButton
              loading={isSending}
              type="primary"
              danger
              onClick={rejectRequestHandler}
            >
              ثبت دلیل رد درخواست
            </CustomButton>
          </div>
        }
      />
      <Form form={rejectForm}>
        <CustomSelect
          name="rejectReason"
          options={
            reasonList?.map((item) => ({
              id: item.id,
              title: item.reason,
              name: item.name,
            })) || []
          }
          label="دلیل رد"
          rules={[REQUIRED_RULE]}
          placeholder="انتخاب کنید"
          form={rejectForm}
          loading={isGetRejectReasonsLoading}
        />
        <CustomTextArea
          rules={reason?.item?.name === "OTHER" ? [REQUIRED_RULE] : []}
          label={reason?.item?.name === "OTHER" ? "توضیحات" : "توضیحات (اختیاری)"}
          name="description"
          placeholder="توضیحات رد درخواست را در صورت تمایل وارد نمایید."
        />
      </Form>
    </div>
  );
};

export default AllRoleRequestRejectDrawerContent;
