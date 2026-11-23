import { useEffect, useState } from "react";

import { Form, Steps } from "antd";
import { useSearchParams } from "react-router";

import { GetBuildingInformationResponse } from "./@types/@createApartment";
import CreateApartmentFirstTab from "./helper/components/CreateApartmentFirstTab/CreateApartmentFirstTab";
import CreateApartmentSecondTab from "./helper/components/CreateApartmentSecondTab/CreateApartmentSecondTab";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { stepStatusCreator } from "../../../../infrastructure/helpers/utils";
import { useGetBuildingInformationMutation } from "../../../../infrastructure/states/redux/Apis/roomApi";
import { EDIT } from "../../../../infrastructure/VARS/globalStrings/globalStrings";
import "./_createApartments.scss";

const CreateApartment = () => {
  const [current, setCurrent] = useState(0);
  const [firstTabForm] = Form.useForm();
  const [secondTabForm] = Form.useForm();
  const [searchParams] = useSearchParams();
  const { mode, buildingId } = Object.fromEntries([...searchParams]); //dormId, id

  useTitle({ text: mode === EDIT ? "ویرایش ساختمان" : "ایجاد ساختمان جدید" });

  //? ================================  Api Calls ================================
  const [getBuildingInfo, { isLoading: isBuildingDataLoading }] =
    useGetBuildingInformationMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (buildingId && mode === EDIT) {
      getBuildingInfo(buildingId).unwrap().then(onGetBuildingInfoSuccess);
    }
  }, [buildingId, current, mode]);

  //* ================================ Util Functions ================================
  const onGetBuildingInfoSuccess = async (value: GetBuildingInformationResponse) => {
    if (mode !== EDIT) return;
    if (value.status === 200 && value.data) {
      firstTabForm.setFieldsValue({
        Name: value?.data?.name,
        Address: value?.data?.adress,
        PostalCode: value?.data?.postalcode,
        PhoneNumber: value?.data?.phone,
      });
      secondTabForm.setFieldsValue({
        About: value?.data?.about,
        Policies: value?.data?.policy,
      });
    }
  };

  //step item
  const stepsItem = [
    {
      id: "1",
      children: (
        <CreateApartmentFirstTab
          setCurrent={setCurrent}
          form={firstTabForm}
          isLoading={isBuildingDataLoading}
        />
      ),
    },
    {
      id: "2",
      children: (
        <CreateApartmentSecondTab
          setCurrent={setCurrent}
          form={secondTabForm}
          isLoading={isBuildingDataLoading}
        />
      ),
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <Steps
        type="navigation"
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
        ]}
      />
      {stepsItem[current].children}
    </>
  );
  //todo next gen wire frame, dont delete
  // return (
  //   <Form className="create-apartment-main-container" form={form}>
  //     <CustomCard>
  // <CustomDivider  text="اطلاعات پایه ساختمان" />
  //       <div className="apartment-info-inputs-container">
  //         <div className="first-row">
  //           <CustomInput
  //             name="title"
  //             type="text"
  //             label="عنوان"
  //           />
  //           <CustomSelect name="owner" options={[]} label="مالک" />
  //           <CustomSelect name="rank" options={[]} label="متصدی" />
  //         </div>
  //         <div className="second-row">
  //           <CustomInput
  //             name="phone"
  //             type="text"
  //             label="تلفن"
  //           />
  //           <CustomCheckboxGroup
  //             containerClassName="apartment-info-checkboxes apartment-checkbox"
  //             label="وضعیت ها"
  //             name="status"
  //             options={[
  //               { label: "نمایش", value: "visibleStatus" },
  //               { label: "فعال", value: "isStatusActive" },
  //               { label: "ساختمان مرکزی", value: "centralApartment" },
  //             ]}
  //           />
  //           <CustomCheckboxGroup
  //             containerClassName="apartment-info-checkboxes apartment-checkbox"
  //             name="features"
  //             label="امکانات"
  //             options={[
  //               { label: "زمین ورزشی", value: "hasPitch" },
  //               { label: "نمازخانه", value: "prayerRoom" },
  //               { label: "پذیرش مهمان", value: "guestReception" },
  //               { label: "نظافت روزانه", value: "dailyCleaning" },
  //             ]}
  //           />
  //         </div>
  //       </div>
  //     </CustomCard>
  //     <CustomCard>
  // <CustomDivider  text="اطلاعات توضیحی" />
  //       <div className="apartment-info-inputs-container">
  //         <CustomTextArea name="about" label="درباره" />
  //       </div>
  //     </CustomCard>
  //     <CustomCard>
  // <CustomDivider  text=" اطلاعات آدرس" />
  //       <div className="apartment-address-inputs-container">
  //         <div className="first-row">
  //           <CustomSelect name="province" options={[]} label="استان" />
  //           <CustomSelect name="city" options={[]} label="شهر" />
  //         </div>

  //         <CustomInput
  //           name="postalCode"
  //           type="text"
  //           label="کد پستی"
  //         />
  //         <CustomTextArea name="address" label="آدرس" />
  //       </div>
  //     </CustomCard>
  //     <CustomCard>
  // <CustomDivider  text=" سایر مشخصات" />;
  //       <div className="apartment-info-inputs-container">
  //         <CustomSelect name="typeOfManagement" options={[]} label="نوع مدیریت" />
  //         <CustomSelect name="roomGrade" options={[]} label="درجه کیفی" />
  //       </div>
  //     </CustomCard>
  //     <div className="btn-container">
  //       {mode === EDIT ? (
  //         <SubmitButton label="ویرایش" form={form} type="primary" />
  //       ) : (
  //         <SubmitButton label="ایجاد" form={form} type="primary" />
  //       )}
  //       <Button className="cancel-btn">انصراف</Button>
  //     </div>
  //   </Form>
  // );
};

export default CreateApartment;
