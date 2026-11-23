import { useEffect, useState } from "react";

import { Form, Modal, Row } from "antd";
import moment from "jalali-moment";
import { PiPencilLine, PiSealCheck } from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import {
  dateParseToPersianDate,
  selectDefaultValueGenerator,
} from "@infra/helpers/utils";
import {
  useLazyManagementAllEstemAmoozeshyarQuery,
  useLazyManagementAllStaffInfoIdentityInfoListsQuery,
  useManagementAllUpdateEstelamMutation,
  useManagementAllUpdateStudentInfoMutation,
} from "@infra/states/redux/Apis/management/usersList/usersListApi";
import { ENTRANCE_SEMESTER_TEXT } from "@pages/management/Requests/EstelamAmozeshyar/_shared/utils/estelamAmozeshyarUtil";

import {
  ManagementAllEstemAmoozeshyarResponse,
  UpdateStudentInfoFormType,
} from "./@types/@managementAllEstemAmoozeshyar";
import { ManagementAllStaffInfoIdentityInfoListResponse } from "../ManagementAllDetailsInfoIdentityInfo/@types/@managementAllDetailsInfoIdentityInfo";
import ManagementAllDetailsEducationInfoModalContent from "./helper/components/ManagementAllDetailsEducationInfoModalContent";
import ManagementAllDetailsEducationEditModalContent from "./helper/modals/ManagementAllDetailsEducationEdit/ManagementAllDetailsEducationEditModalContent";
import "./_managementAllDetailsEducationInfo.scss";

const ManagementAllDetailsEducationInfo = ({
  staffId,
}: {
  staffId: number | undefined;
}) => {
  const [isOpenEstelam, setIsOpenEstelam] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [refundData, setRefundData] = useState<
    ManagementAllEstemAmoozeshyarResponse | undefined
  >(undefined);

  const [updateForm] = Form.useForm<UpdateStudentInfoFormType>();

  //? ================================ API ================================
  const [getUsersCustomersInfo, { data, isLoading: isGetUsersCustomersInfoLoading }] =
    useLazyManagementAllStaffInfoIdentityInfoListsQuery();
  const userData: ManagementAllStaffInfoIdentityInfoListResponse | undefined = data;

  const [
    getUsersEstemAmoozeshyarInfo,
    { isFetching: isGetUsersEstemAmoozeshyarInfoLoading },
  ] = useLazyManagementAllEstemAmoozeshyarQuery();

  const [
    updateManagementAllUpdateEstelam,
    { isLoading: isUpdateManagementAllUpdateEstelamLoading },
  ] = useManagementAllUpdateEstelamMutation();

  const [updateStudentInfo, { isLoading: isUpdateStudentInfoLoading }] =
    useManagementAllUpdateStudentInfoMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (staffId) {
      getUsersCustomersInfo({ staffId });
    }
  }, [staffId]);

  // ================================ Utils function ================================
  const openModalEstelamHandler = () => {
    setIsOpenEstelam(true);
    const studentNumber = userData?.staff?.student?.studentNumber;
    if (studentNumber) {
      getUsersEstemAmoozeshyarInfo({ studentNumber })
        .unwrap()
        .then((value) => {
          if (value) {
            setRefundData(value);
          }
        })
        .catch(() => {
          setRefundData(undefined);
        });
    }
  };

  const closeModalEstelamHandler = () => {
    setIsOpenEstelam(false);
    setRefundData(undefined);
  };

  const onSubmitEstelamHandler = () => {
    if (staffId) {
      updateManagementAllUpdateEstelam({
        staffId: staffId.toString(),
      })
        .unwrap()
        .then(updateManagementAllUpdateEstelamIsSuccess);
    }
  };

  const updateManagementAllUpdateEstelamIsSuccess = () => {
    closeModalEstelamHandler();
  };

  // Edit
  const openEditModalHandler = () => {
    setIsEditModalOpen(true);
    updateForm.setFieldsValue({
      studentNumber: userData?.staff?.student?.studentNumber,
      branch: selectDefaultValueGenerator({
        title: userData?.staff?.student?.branchName,
      }),
      degree: userData?.staff?.student?.degreeName,
      entranceYear: selectDefaultValueGenerator({
        id: userData?.staff?.student?.admissionYear,
        title: dateParseToPersianDate(userData?.staff?.student?.admissionYear)?.split(
          "/"
        )[0],
      }),
      entranceSemester: selectDefaultValueGenerator({
        id: userData?.staff?.student?.admissionTermCode,
        title: ENTRANCE_SEMESTER_TEXT[userData?.staff?.student?.admissionTermName ?? ""],
      }),
      faculty: userData?.staff?.student?.facultyName,
      // Todo[Atefeh]: uncomment when api got ready
      // levelName: "تهران",
      field: userData?.staff?.student?.studyFieldName,
    });
  };

  const closeEditModalHandler = () => {
    setIsEditModalOpen(false);
  };

  const updateInfoHandler = () => {
    const formData = updateForm.getFieldsValue();
    const year = moment(formData?.entranceYear?.label).format("YYYY");
    const semester = formData?.entranceSemester?.item?.title;

    const jalaliDate = semester === "نیمسال اول" ? `${year}-07-01` : `${year}-11-01`;

    const gregorianDate = moment(jalaliDate, "jYYYY-jMM-jDD").format("YYYY-MM-DD");

    const reqBody = {
      studentNumber: formData?.studentNumber,
      branchId: formData?.branch?.item?.id,
      facultyName: formData?.faculty,
      degreeTitle: formData?.degree,
      studyFieldName: formData?.field,
      // Todo[Atefeh]: uncomment when api got ready
      // levelName: "تهران",
      entranceYear: gregorianDate,
      entranceSemester: formData?.entranceSemester?.item?.value,
    };
    if (userData?.staff?.student?.id) {
      updateStudentInfo({
        studentId: userData?.staff?.student?.id,
        reqBody,
      })
        .unwrap()
        .then(() => {
          setIsEditModalOpen(false);
        });
    }
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isOpenEstelam && (
        <Modal
          title="استعلام مجدد آموزشیار"
          open={isOpenEstelam}
          onCancel={() => setIsOpenEstelam(false)}
          cancelText="انصراف"
          okText="ثبت نتیجه استعلام"
          onOk={onSubmitEstelamHandler}
          className="management-all-detail-education-estelam-modal"
          confirmLoading={isUpdateManagementAllUpdateEstelamLoading}
          width={980}
        >
          <ManagementAllDetailsEducationInfoModalContent
            dataEstemAmoozeshyar={refundData}
            isGetUsersEstemAmoozeshyarInfoLoading={isGetUsersEstemAmoozeshyarInfoLoading}
          />
        </Modal>
      )}
      {isEditModalOpen && (
        <ConfirmationModalWithContent
          title="ویرایش اطلاعات تحصیلی"
          isModalOpen={isEditModalOpen}
          confirmBtnText="ثبت اطلاعات"
          closeModalHandler={closeEditModalHandler}
          onConfirmClickHandler={updateInfoHandler}
          content={<ManagementAllDetailsEducationEditModalContent form={updateForm} />}
          isConfirmButtonLoading={isUpdateStudentInfoLoading}
          showIcon={false}
        />
      )}
      <Div
        loading={isGetUsersCustomersInfoLoading}
        className="management-all-detail-education-container"
      >
        <CustomDivider text="اطلاعات تحصیلی" />
        <CustomDivider
          className="custom-divider"
          text={
            <span>
              {userData?.staff?.student?.studyFieldName} (
              {userData?.staff?.student?.degreeName})
            </span>
          }
          extraContent={
            <div className="button-container">
              <CustomButton
                icon={<PiPencilLine />}
                onClick={openEditModalHandler}
                disabled={userData?.staff?.student?.manuallyCreated ? false : true}
              >
                ویرایش
              </CustomButton>
              <CustomButton
                onClick={openModalEstelamHandler}
                type="primary"
                icon={<PiSealCheck />}
              >
                استعلام
              </CustomButton>
            </div>
          }
        />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            value={userData?.staff?.student?.studentNumber}
            label="شماره دانشجویی"
          />
          <SingleVerticalWithCol
            value={userData?.staff?.student?.branchName}
            label="واحد دانشگاهی"
          />
          {/* //Todo[Atefeh]: uncomment when api got ready */}
          {/* <SingleVerticalWithCol value="-" label="نام دانشکده" /> */}
          <SingleVerticalWithCol
            value={userData?.staff?.student?.degreeName}
            label="مقطع تحصیلی"
          />
          <SingleVerticalWithCol
            value={userData?.staff?.student?.studyFieldName}
            label="رشته تحصیلی"
          />
          <SingleVerticalWithCol
            value={userData?.staff?.student?.admissionYear}
            label="سال ورود"
          />
          <SingleVerticalWithCol
            value={userData?.staff?.student?.admissionTermName}
            label="نیمسال ورود"
          />
          {/* //Todo[Atefeh]: uncomment when api got ready */}
          {/* <SingleVerticalWithCol value="-" label="وضعیت تحصیلی" /> */}
        </Row>
      </Div>
    </>
  );
};

export default ManagementAllDetailsEducationInfo;
