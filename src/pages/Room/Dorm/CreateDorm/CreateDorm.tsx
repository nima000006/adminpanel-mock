import { useEffect, useState } from "react";

import { Form, Grid, Steps } from "antd";
import { useSearchParams } from "react-router";

import { SelectInstallmentType } from "@pages/Room/Dorm/CreateDorm/helper/components/CreateDormFourthTab/@types/@createDormFourthTab";
import CreateDormFourthTab from "@pages/Room/Dorm/CreateDorm/helper/components/CreateDormFourthTab/CreateDormFourthTab";
import { installmentsInfo } from "@pages/Room/Dorm/CreateDorm/helper/components/CreateDormFourthTab/helper/utils/createDormFourthTabUtil";

import CreateDormFirstTab from "./helper/components/CreateDormFirstTab/CreateDormFirstTab";
import CreateDormSecondTab from "./helper/components/CreateDormSecondTab/CreateDormSecondTab";
import CreateDormThirdTab from "./helper/components/CreateDormThirdTab/CreateDormThirdTab";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import {
  CheckBoxFormGenerator,
  NumberDotSeparator,
  selectDefaultValueGenerator,
  stepStatusCreator,
} from "../../../../infrastructure/helpers/utils";
import { useGetDormInformationMutation } from "../../../../infrastructure/states/redux/Apis/roomApi";
import { EDIT } from "../../../../infrastructure/VARS/globalStrings/globalStrings";

import "./_createDorm.scss";

const { useBreakpoint } = Grid;
const CreateDorm = () => {
  const [current, setCurrent] = useState(0);
  const [lat, setLat] = useState<number>(35.69947719509053);
  const [lng, setLng] = useState<number>(51.336965560913086);
  const [firstTabForm] = Form.useForm();
  const [secondTabForm] = Form.useForm();
  const [thirdTabForm] = Form.useForm();
  const [fourthTabForm] = Form.useForm();
  const [searchParams] = useSearchParams();
  const { mode, id } = Object.fromEntries([...searchParams]);

  const [installmentType, setInstallmentType] = useState<SelectInstallmentType>(
    installmentsInfo[0]
  );

  useTitle({ text: mode === EDIT ? "ویرایش خوابگاه" : "ایجاد خوابگاه جدید" });

  //? ================================  Api Calls ================================
  const [getDormData, { data: dormData, isLoading: isDormDataLoading }] =
    useGetDormInformationMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id && mode === EDIT) {
      getDormData(id);
    }
  }, [id, current]);

  useEffect(() => {
    if (dormData?.status === 200 && mode === EDIT) {
      setLat(+dormData?.data?.lat);
      setLng(+dormData?.data?.lng);
      firstTabForm.setFieldsValue({
        Name: dormData?.data?.name,
        Address: dormData?.data?.address,
        PhoneNumber: dormData?.data?.phone,
        PostalCode: dormData?.data?.postalcode,
        statusData: [CheckBoxFormGenerator(Boolean(dormData?.data?.active), "active")],
        fromprice: dormData?.data?.fromprice
          ? NumberDotSeparator(dormData?.data?.fromprice)
          : "",
        toprice: dormData?.data?.toprice
          ? NumberDotSeparator(dormData?.data?.toprice)
          : "",
        copacity: dormData?.data?.copacity,
      });
      secondTabForm.setFieldsValue({
        About: dormData?.data?.about,
        Policies: dormData?.data?.policy,
        Description: dormData?.data?.rules,
      });
      thirdTabForm.setFieldsValue({
        universities: selectDefaultValueGenerator({
          id: dormData?.data?.b_id,
          title: dormData?.data?.b_Name,
        }),
        branchIds: selectDefaultValueGenerator(
          dormData?.data?.branches?.map((item) => {
            return {
              id: item?.id,
              title: item?.name,
            };
          })
        ),
      });
      setInstallmentType(
        installmentsInfo.find(
          (item) => item?.id === dormData?.data?.dormitoryPolicyCount
        ) || installmentsInfo[0]
      );
      fourthTabForm?.setFieldsValue({
        installment: selectDefaultValueGenerator(
          installmentsInfo.find(
            (item) => item?.id === dormData?.data?.dormitoryPolicyCount
          )
        ),
        firstInstallment: dormData?.data?.dormitoryPolicies[0]?.persentfee,
        installmentFirstDate: dormData?.data?.dormitoryPolicies[0]?.todate,
        secondInstallment: dormData?.data?.dormitoryPolicies[1]?.persentfee,
        installmentSecondDate: dormData?.data?.dormitoryPolicies[1]?.todate,
        thirdInstallment: dormData?.data?.dormitoryPolicies[2]?.persentfee,
        installmentThirdDate: dormData?.data?.dormitoryPolicies[2]?.todate,
      });
      //
      setInstallmentType(
        installmentsInfo.find(
          (item) => item?.id === dormData?.data?.dormitoryPolicyCount
        ) || installmentsInfo[0]
      );
    }
  }, [dormData?.status, current]);

  // step item
  const stepsItem = [
    {
      id: "1",
      children: (
        <CreateDormFirstTab
          isActive={Boolean(dormData?.data?.active)}
          setCurrent={setCurrent}
          form={firstTabForm}
          isLoading={isDormDataLoading}
          setLat={setLat}
          lat={lat}
          setLng={setLng}
          lng={lng}
        />
      ),
    },
    {
      id: "2",
      children: (
        <CreateDormSecondTab
          setCurrent={setCurrent}
          form={secondTabForm}
          isLoading={isDormDataLoading}
        />
      ),
    },
    {
      id: "3",
      children: (
        <CreateDormThirdTab
          form={thirdTabForm}
          isLoading={isDormDataLoading}
          setCurrent={setCurrent}
        />
      ),
    },
    {
      id: "4",
      children: (
        <CreateDormFourthTab
          form={fourthTabForm}
          isLoading={isDormDataLoading}
          setCurrent={setCurrent}
          setInstallmentType={setInstallmentType}
          installmentType={installmentType}
        />
      ),
    },
  ];
  // const onChange = (value: number) => {
  //   setCurrent(value);
  // };
  // ================================ Util function ================================
  const screens = useBreakpoint();
  const isVertical = !screens.lg; // less than lg break point
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <Steps
        type="navigation"
        orientation={isVertical ? "vertical" : "horizontal"}
        current={current}
        className="stepper-container"
        // onChange={onChange}
        items={[
          {
            status: stepStatusCreator(current, 0),
            title: "اطلاعات پایه",
          },
          {
            status: stepStatusCreator(current, 1),
            title: "توضیحات",
          },
          {
            status: stepStatusCreator(current, 2),
            title: "پارامتر ها",
          },
          {
            status: stepStatusCreator(current, 3),
            title: "نحوه پرداخت",
          },
        ]}
      />
      {stepsItem[current].children}
    </>
    //todo [saman]: next ui wireFrame
    // <Form className="create-dorm-main-container" form={form}>
    //   <CustomCard>
    // <CustomDivider  text=" اطلاعات پایه خوابگاه" />
    //     <div className="dorm-info-inputs-container">
    //       <div className="row">
    //         <CustomInput
    //           name="title"
    //           type="text"
    //           label="عنوان"
    //         />
    //         <CustomSelect name="owner" options={[]} label="مالک" />
    //       </div>

    //       <CustomSelect name="rank" options={[]} label="جایگاه سازمانی" />
    //       <CustomCheckboxGroup
    //         containerClassName="dorm-info-checkboxes"
    //         name="status"
    //         options={[
    //           { label: "نمایش", value: "visibleStatus" },
    //           { label: "فعال", value: "isStatusActive" },
    //           { label: "امکان استثنا قیمت", value: "exceptionStatus" },
    //         ]}
    //       />
    //     </div>
    //   </CustomCard>
    //   <CustomCard>
    //   <CustomDivider  text="اطلاعات توضیحی" />
    //     <div className="dorm-info-inputs-container">
    //       <CustomTextArea name="about" label="درباره"  />
    //       <CustomTextArea
    //         name="rules"
    //         label="قوانین و مقررات"
    //       />
    //     </div>
    //   </CustomCard>
    //   <CustomCard>
    //   <CustomDivider  text=" سایر مشخصات" />
    //     <div className="dorm-info-inputs-container">
    //       <CustomSelect name="typeOfManagement" options={[]} label="نوع مدیریت" />
    //       <CustomSelect name="roomGrade" options={[]} label="درجه کیفی" />
    //     </div>
    //   </CustomCard>
    //   <div className="btn-container">
    //     {mode === EDIT ? (
    //       <SubmitButton label="ویرایش" form={form} type="primary" />
    //     ) : (
    //       <SubmitButton label="ایجاد" form={form} type="primary" />
    //     )}
    //     <Button className="cancel-btn">انصراف</Button>
    //   </div>
    // </Form>
  );
};

export default CreateDorm;
