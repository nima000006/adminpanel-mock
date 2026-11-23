import { useEffect, useState } from "react";

import { Form, Modal, Row, Tabs } from "antd";
import { AiOutlineSearch } from "react-icons/ai";

import { CustomButton, CustomRadioGroup, CustomSelect } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import {
  useLazyUserInquiryNationalCodeQuery,
  useLazyUserInquiryStudentNumberQuery,
} from "@infra/states/redux/Apis/authApi";
import {
  UserInquiryNationalCodeRecordType,
  UserInquiryStudentNumberResponse,
} from "@infra/states/redux/Apis/models/authApi.model";
import { AllEstelamAmozeshyarModalProps } from "@pages/management/Requests/EstelamAmozeshyar/AllEstelamAmozeshyar/AllEstelamAmozeshyarDetail/helper/components/EstelamAmozeshyarDetailInfo/helper/Modals/AllEstelamAmozeshyarModal/@types/@allEstelamAmozeshyarModal";

const AllEstelamAmozeshyarModal = ({
  close,
  open,
  nationalCode,
  studentCode,
}: AllEstelamAmozeshyarModalProps) => {
  const [selectedStudentInfo, setSelectedStudentInfo] = useState<
    UserInquiryStudentNumberResponse | UserInquiryNationalCodeRecordType | null
  >(null);

  const [nationalNumberSelected, setNationalNumberSelected] = useState(true);

  const [studentNumber, setStudentNumber] = useState<
    UserInquiryStudentNumberResponse[] | UserInquiryNationalCodeRecordType[] | null
  >(null);

  const [studentInquiryForm] = Form.useForm();

  //? ================================  Api Calls ================================
  // student by national code
  const [getUsersByNationalCode, { isFetching: isGetAllUsersByNationalCodeLoading }] =
    useLazyUserInquiryNationalCodeQuery();

  // student by student code
  const [getUsersByStudentNumber, { isFetching: isGetAllUsersByStudentNumberLoading }] =
    useLazyUserInquiryStudentNumberQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    studentInquiryForm.setFieldsValue({
      estelam: "nationalCode",
    });
  }, []);

  //* ================================ Util Functions ================================
  const getStudentInquiriesHandler = (values: {
    estelam: "nationalCode" | "studentNumber";
  }) => {
    if (values?.estelam === "nationalCode" && nationalCode) {
      getUsersByNationalCode({ nationalCode: nationalCode })
        .unwrap()
        .then((res) => {
          if (res) {
            setStudentNumber(res);
            studentInquiryForm.setFieldsValue({
              selectStudentNumber: selectDefaultValueGenerator({
                id: res?.[0]?.studentNumber,
                title: res?.[0]?.studentNumber?.toString(),
              }),
            });
            setSelectedStudentInfo(res?.[0]);
          } else {
            setStudentNumber([]);
          }
        });
    }

    if (values?.estelam === "studentNumber" && studentCode) {
      getUsersByStudentNumber({ studentNumber: studentCode })
        .unwrap()
        .then((res) => {
          if (res) {
            setStudentNumber([res]);
            setSelectedStudentInfo(res);
          } else {
            setStudentNumber([]);
          }
        });
    }
  };

  const changeStudentCodeHandler = (value: string) => {
    const selectedInfo = studentNumber?.find((item) => item?.studentNumber === value);

    setSelectedStudentInfo(selectedInfo ?? null);
  };

  const studentInquiryItems = [
    {
      label: "اطلاعات هویتی",
      children: (
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="نام"
            value={selectedStudentInfo?.firstName}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="نام خانوادگی"
            value={selectedStudentInfo?.lastName}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="کد ملی"
            value={selectedStudentInfo?.nationalCode}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="نام پدر"
            value={selectedStudentInfo?.fatherName}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="تاریخ تولد"
            value={selectedStudentInfo?.birthDate}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="جنسیت"
            value={selectedStudentInfo?.genderName}
            xl={8}
            lg={8}
          />
        </Row>
      ),
      key: "1",
    },
    {
      label: "اطلاعات تحصیلی",
      children: (
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="شماره دانشجویی"
            value={selectedStudentInfo?.studentNumber}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="واحد دانشگاهی"
            value={selectedStudentInfo?.branchName}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="مقطع تحصیلی"
            value={selectedStudentInfo?.levelName}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="رشته تحصیلی"
            value={selectedStudentInfo?.fieldName}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="سال ورود"
            value={selectedStudentInfo?.eduStartDate}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="نیمسال ورود"
            value={
              "-"
              // با صحبت با اقای جماعتی و با توجه به تغییر api از سمت اموزشیار، این قسمت به صورت خط تیره نمایش داده می شود
              // selectedStudentInfo?.eduStartCode?.toString()?.slice(-1) === "1"
              //   ? "نیمسال اول"
              //   : "نیمسال دوم"
            }
            xl={8}
            lg={8}
          />
        </Row>
      ),
      key: "2",
    },
    {
      label: "اطلاعات تماسی",
      children: (
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="شماره همراه"
            value={selectedStudentInfo?.mobile}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="ایمیل"
            value={selectedStudentInfo?.email}
            xl={8}
            lg={8}
          />
        </Row>
      ),
      key: "3",
    },
    {
      label: "عملکرد تحصیلی",
      children: (
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="معدل کل"
            value={selectedStudentInfo?.totalAverage}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="تعداد واحدهای پاس‌شده"
            value={selectedStudentInfo?.totalPassedUnits}
            xl={8}
            lg={8}
          />
        </Row>
      ),
      key: "4",
    },
  ];

  return (
    <Modal
      title="استعلام دانشجو (آموزشیار)"
      centered
      open={open}
      onCancel={close}
      width={700}
      footer={null}
    >
      <div className="flex flex-col gap-5">
        <Form
          form={studentInquiryForm}
          onFinish={getStudentInquiriesHandler}
          layout="horizontal"
        >
          <div>
            <CustomRadioGroup
              name="estelam"
              label="استعلام بر اساس:"
              options={[
                {
                  value: "nationalCode",
                  label: "کد ملی دانشجو",
                },
                {
                  value: "studentNumber",
                  label: "شماره دانشجویی وارد شده",
                },
              ]}
              onChange={(e) => {
                setSelectedStudentInfo(null);
                setStudentNumber(null);

                if (e.target.value === "nationalCode") {
                  setNationalNumberSelected(true);
                } else {
                  setNationalNumberSelected(false);
                }
              }}
              defaultValue={nationalNumberSelected ? "nationalCode" : "studentNumber"}
            />

            <div className="flex flex-col gap-4">
              {nationalNumberSelected ? (
                <SingleVerticalWithCol label="کد ملی" span={24} value={nationalCode} />
              ) : (
                <SingleVerticalWithCol
                  label="شماره دانشجویی وارد شده"
                  span={24}
                  value={studentCode}
                />
              )}

              <CustomButton
                type="primary"
                htmlType="submit"
                icon={<AiOutlineSearch />}
                iconPlacement="end"
                className="w-full"
              >
                جستجو
              </CustomButton>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <CustomDivider text="نتیجه استعلام" />
            <Div
              loading={
                isGetAllUsersByNationalCodeLoading || isGetAllUsersByStudentNumberLoading
              }
            >
              {!studentNumber ? (
                <CustomEmpty description="بر روی دکمه جستجو کلیک نمایید..." />
              ) : studentNumber?.length === 0 ? (
                <CustomEmpty description="استعلامی جهت نمایش یافت نشد!" />
              ) : (
                <div className="flex flex-col gap-4">
                  {nationalNumberSelected && (
                    <CustomSelect
                      name="selectStudentNumber"
                      label="شماره دانشجویی"
                      options={studentNumber?.map((item) => ({
                        id: item?.studentNumber,
                        title: item?.studentNumber?.toString(),
                      }))}
                      form={studentInquiryForm}
                      onChange={(value) => changeStudentCodeHandler(value as string)}
                      placeholder="انتخاب کنید"
                    />
                  )}
                  <Tabs type="line" items={studentInquiryItems} />
                </div>
              )}
            </Div>
          </div>
        </Form>

        <div className="flex justify-end">
          <CustomButton onClick={close}>انصراف</CustomButton>
        </div>
      </div>
    </Modal>
  );
};

export default AllEstelamAmozeshyarModal;
