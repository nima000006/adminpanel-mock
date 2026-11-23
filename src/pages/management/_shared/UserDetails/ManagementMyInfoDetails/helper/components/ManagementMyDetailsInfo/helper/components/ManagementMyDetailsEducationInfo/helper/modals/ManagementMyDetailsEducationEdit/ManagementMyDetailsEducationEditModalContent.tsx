import { useEffect } from "react";

import { Col, Form, FormInstance, Row } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { ENTRANCE_YEARS_OPTIONS } from "@pages/management/_shared/utils";
import { ENTRANCE_SEMESTER_OPTIONS } from "@pages/management/Requests/EstelamAmozeshyar/_shared/utils/estelamAmozeshyarUtil";

import { UpdateMyStudentInfoFormType } from "../../../@types/@managementMyEstemAmoozeshyar";

const ManagementMyDetailsEducationEditModalContent = ({
  form,
}: {
  form: FormInstance<UpdateMyStudentInfoFormType>;
}) => {
  //? ================================  Api Calls ================================
  const [getAllUniversity, { data: universityData, isLoading: isUniversityDataLoading }] =
    useLazyGetAllBranchesQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getAllUniversity();
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <div className="flex flex-col gap-4">
      <CustomAlert
        title="توجه!"
        description="دقت بفرمایید شما فقط می‌توانید اطلاعاتی را که توسط خود کاربر در سیستم ثبت شده است را ویرایش نمایید و امکان ویرایش اطلاعاتی که بابت آن استعلام گرفته شده است وجود ندارد."
        showIcon
        type="warning"
      />
      <Form form={form}>
        <Row gutter={[16, 16]}>
          <Col sm={24} md={12}>
            <CustomInput label="شماره دانشجویی" name="studentNumber" />
          </Col>
          <Col sm={24} md={12}>
            <CustomSelect
              form={form}
              label="واحد دانشگاهی"
              name="branch"
              options={universityData ? universityData : []}
              placeholder="انتخاب کنید"
              isLoading={isUniversityDataLoading}
              disabled
            />
          </Col>
          <Col sm={24} md={12}>
            <CustomInput label="مقطع تحصیلی" name="degree" />
          </Col>
          <Col sm={24} md={12}>
            <CustomInput label="نام دانشکده" name="faculty" />
          </Col>
          <Col sm={24} md={12}>
            <CustomInput label="رشته تحصیلی" name="field" />
          </Col>
          <Col sm={24} md={12}>
            <CustomSelect
              label="سال ورود"
              name="entranceYear"
              form={form}
              options={ENTRANCE_YEARS_OPTIONS}
            />
          </Col>
          <Col sm={24} md={12}>
            <CustomSelect
              label="نیمسال ورود"
              name="entranceSemester"
              form={form}
              options={ENTRANCE_SEMESTER_OPTIONS}
            />
          </Col>
          {/* //Todo[Atefeh]: uncomment when api got ready */}
          {/* <Col sm={24} md={12}>
        <CustomInput label="وضعیت تحصیلی" />
      </Col> */}
        </Row>
      </Form>
    </div>
  );
};

export default ManagementMyDetailsEducationEditModalContent;
