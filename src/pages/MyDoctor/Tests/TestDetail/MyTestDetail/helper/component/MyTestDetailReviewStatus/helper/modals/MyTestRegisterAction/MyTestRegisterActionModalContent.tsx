import { useEffect, useState } from "react";

import { Col, Form, RadioChangeEvent, Row } from "antd";
import moment from "jalali-moment";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomRadioGroup from "@components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import {
  useLazyGetMyDoctorTestReviewDetailActionTypeListManagerQuery,
  useLazyGetMyDoctorTestReviewDetailFollowUpActionTypeListManagerQuery,
} from "@infra/states/redux/Apis/myDoctor/test/testApis";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { selectNotFoundContent } from "@pages/_shared/utils";

import {
  MyDoctorTestReviewDetailActionTypeListManagerType,
  MyDoctorTestReviewDetailFollowUpActionTypeListManager,
  MyTestRegisterActionModalContentProps,
} from "./@types/@myTestRegisterActionModalContent";

const NO_NEED_ACTION_CODE = 1;
const NEED_ACTION_CODE = 2;

const MyTestRegisterActionModalContent = ({
  form,
}: MyTestRegisterActionModalContentProps) => {
  const [actionTypeList, setActionTypeList] = useState<
    MyDoctorTestReviewDetailActionTypeListManagerType[]
  >([]);

  const [followUpActionTypeList, setFollowUpActionTypeList] = useState<
    MyDoctorTestReviewDetailFollowUpActionTypeListManager[]
  >([]);

  const [necessaryToAction, setNecessaryToAction] = useState(false);

  //? ================================  Api Calls ================================
  const [
    getActionTypeList,
    { isFetching: isActionTypeListLoading, isSuccess: isActionTypeListSuccess },
  ] = useLazyGetMyDoctorTestReviewDetailActionTypeListManagerQuery();

  const [
    getFollowUpActionTypeList,
    {
      isFetching: isFollowUpActionTypeListLoading,
      isSuccess: isFollowUpActionTypeListSuccess,
    },
  ] = useLazyGetMyDoctorTestReviewDetailFollowUpActionTypeListManagerQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getActionTypeList()
      .unwrap()
      .then((value) => {
        if (value) {
          setActionTypeList(value);
        }
      });
  }, []);

  //* ================================ Util Functions ================================
  const changeActionTypeHandler = (e: string) => {
    form.setFieldsValue({ actionResult: undefined });

    if (e) {
      getFollowUpActionTypeList(e)
        .unwrap()
        .then((value) => {
          if (value) {
            setFollowUpActionTypeList(value);
          }
        });
    }
  };

  const necessaryItemHandler = (e: RadioChangeEvent) => {
    if (e?.target?.value === NO_NEED_ACTION_CODE) {
      setNecessaryToAction(false);
    } else {
      setNecessaryToAction(true);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Form form={form}>
      <Row gutter={[16, 16]} className="my-test-register-action-modal-content-container">
        <Col lg={12} md={12} sm={24} xs={24}>
          <CustomSelect
            name="actionType"
            label="نوع اقدام"
            options={actionTypeList}
            placeholder="نوع اقدام را مشخص کنید"
            form={form}
            rules={[REQUIRED_RULE]}
            isLoading={isActionTypeListLoading}
            notFoundContent={!isActionTypeListSuccess ? selectNotFoundContent : undefined}
            onChange={(e) => changeActionTypeHandler(e as string)}
          />
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <CustomSelect
            name="actionResult"
            label="نتیجه اقدام"
            options={followUpActionTypeList}
            placeholder="نتیجه اقدام را مشخص کنید"
            form={form}
            rules={[REQUIRED_RULE]}
            isLoading={isFollowUpActionTypeListLoading}
            notFoundContent={
              !isFollowUpActionTypeListSuccess ? selectNotFoundContent : undefined
            }
            disabled={followUpActionTypeList?.length === 0}
          />
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <CustomInput
            name="actionsName"
            label="نام اقدام کننده"
            placeholder="نام اقدام کننده را وارد نمایید"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <CustomInput
            name="actionsFamily"
            label="نام خانوادگی اقدام کننده"
            placeholder="نام خانوادگی اقدام کننده را وارد نمایید"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col span={24}>
          <CustomTextArea
            label="توضیحات (اختیاری)"
            name="description"
            placeholder="توضیحات لازم را در صورت صلاحدید خود وارد نمایید..."
          />
        </Col>
        <Col span={24}>
          <CustomRadioGroup
            name="necessary"
            options={[
              {
                label: "عدم نیاز به اقدام مجدد",
                value: NO_NEED_ACTION_CODE,
              },
              { label: "نیازمند اقدام مجدد", value: NEED_ACTION_CODE },
            ]}
            defaultValue={NO_NEED_ACTION_CODE}
            onChange={necessaryItemHandler}
          />
        </Col>
        {necessaryToAction && (
          <>
            <Col lg={12} md={12} sm={24} xs={24}>
              <CustomSelect
                name="reactionType"
                label="نوع اقدام مجدد"
                options={actionTypeList}
                placeholder="نوع اقدام مجدد را مشخص کنید"
                form={form}
                rules={[REQUIRED_RULE]}
                notFoundContent={
                  !isActionTypeListSuccess ? selectNotFoundContent : undefined
                }
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <CustomDatePicker
                name="date"
                label="تاریخ و زمان اقدام مجدد"
                form={form}
                placeholder="تاریخ و زمان اقدام مجدد را تعیین نمایید."
                showHour
                showTime
                showSecond
                onChange={(_, dateString) => {
                  // حالت clear
                  if (
                    !dateString ||
                    (Array.isArray(dateString) && dateString.length === 0)
                  ) {
                    form.setFieldsValue({ date: undefined });
                    return;
                  }

                  const value = Array.isArray(dateString) ? dateString[0] : dateString;

                  const formattedDate = moment
                    .from(value, "fa", "YYYY-MM-DD HH:mm:ss")
                    .format("YYYY-MM-DDTHH:mm:ss");

                  form.setFieldsValue({ date: formattedDate });
                }}
                rules={[REQUIRED_RULE]}
              />
            </Col>
          </>
        )}
      </Row>
    </Form>
  );
};

export default MyTestRegisterActionModalContent;
