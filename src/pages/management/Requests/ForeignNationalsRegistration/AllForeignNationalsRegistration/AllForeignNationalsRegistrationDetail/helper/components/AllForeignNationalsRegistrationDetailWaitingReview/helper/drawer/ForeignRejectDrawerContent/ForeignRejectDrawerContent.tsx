import { Col, Form, Row } from "antd";
import { useNavigate } from "react-router";

import { CustomButton, CustomSelect, CustomTextArea } from "@components/CustomInputs";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MANAGEMENT_REQUESTS_ALL_FOREIGN_NATIONALS_REGISTRATION_LIST_PAGE_ROUTE } from "@infra/router/routes/management";
import {
  useGetEstelamAmozeshyarRejectReasonsQuery,
  useRejectAllForeignRequestsMutation,
} from "@infra/states/redux/Apis/management/requests/requestApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { ForeignRejectDrawerContentProps } from "@pages/management/Requests/ForeignNationalsRegistration/AllForeignNationalsRegistration/AllForeignNationalsRegistrationDetail/helper/components/AllForeignNationalsRegistrationDetailWaitingReview/@types/@allForeignNationalsRegistrationDetailWaitingReviewTypes";

const ForeignRejectDrawerContent = ({
  closeDrawerHandler,
  form,
}: ForeignRejectDrawerContentProps) => {
  const {
    params: { id },
  } = useQueryParams();

  const reason = Form.useWatch("rejectReason", form);
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  // reject reason
  const { data: reasonList, isLoading: isGetRejectReasonsLoading } =
    useGetEstelamAmozeshyarRejectReasonsQuery();

  // reject request
  const [rejectAllForeignRequest, { isLoading: isRejectAllForeignRequestLoading }] =
    useRejectAllForeignRequestsMutation();

  //* ================================ Util Functions ================================
  const rejectRequestHandler = () => {
    if (id) {
      form?.validateFields().then((value) => {
        const trimmedDescription = (value?.description ?? "").trim();

        rejectAllForeignRequest({
          id,
          params: {
            rejectReason: value?.rejectReason?.item?.name,
            reason: trimmedDescription,
          },
        })
          .unwrap()
          .then(() => {
            closeDrawerHandler();
            navigate({
              pathname:
                MANAGEMENT_REQUESTS_ALL_FOREIGN_NATIONALS_REGISTRATION_LIST_PAGE_ROUTE,
            });
          });
      });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader
        title="رد درخواست"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="flex gap-3">
            <CustomButton onClick={closeDrawerHandler}>انصراف</CustomButton>
            <CustomButton
              type="primary"
              danger
              onClick={rejectRequestHandler}
              loading={isRejectAllForeignRequestLoading}
            >
              ثبت دلیل رد درخواست
            </CustomButton>
          </div>
        }
      />
      <Form form={form}>
        <Row gutter={[16, 16]}>
          <Col lg={12} xs={24}>
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
              form={form}
              loading={isGetRejectReasonsLoading}
            />
          </Col>
        </Row>
        <CustomTextArea
          label="توضیحات"
          name="description"
          placeholder="توضیحات رد درخواست را در صورت تمایل وارد نمایید."
          rules={[REQUIRED_RULE]}
          disabled={!reason?.item}
        />
      </Form>
    </div>
  );
};

export default ForeignRejectDrawerContent;
