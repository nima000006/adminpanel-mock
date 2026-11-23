import { useEffect, useState } from "react";

import { Col, Row, UploadFile } from "antd";
import { PiBellRinging, PiPassword, PiWallet } from "react-icons/pi";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { emptyString } from "@infra/config/global.vars";
import { dataPlaceHolder } from "@infra/helpers/utils";
import {
  useAdminChangePasswordMutation,
  useReInquiryEmployeeMutation,
  useReInquiryStudentMutation,
} from "@infra/states/redux/Apis/authApi";
import { ManagementAllStaffInfoListResponse } from "@pages/management/_shared/UserDetails/ManagementAllInfoDetails/@types/@managementUserAllCustomerDetails";

import UserWalletsListModal from "./helper/modals/UserWalletsList/UserWalletsListModal";

import "./_managementAllDetailsUserInfo.scss";

const STUDENT_INQUIRY_SUCCESS = "استعلام دانشجو با موفقیت انجام شد.";
const EMPLOYEE_INQUIRY_SUCCESS = "استعلام کارمند با موفقیت انجام شد.";
const ManagementAllDetailsUserInfo = ({
  data,
  setReInquiryToggle,
  from,
}: {
  data: ManagementAllStaffInfoListResponse | undefined;
  setReInquiryToggle?: React.Dispatch<React.SetStateAction<boolean>>;
  from?: string;
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [walletModalOpen, setWalletModalOpen] = useState(false);

  const [changePasswordModal, setChangePasswordModal] = useState(false);

  //? ================================  Api Calls ================================
  const [changePassword, { isLoading: isChangePasswordLoading }] =
    useAdminChangePasswordMutation();

  const [reInquiryStudent, { isLoading: isReInquiryStudentLoading }] =
    useReInquiryStudentMutation();

  const [reInquiryEmployee, { isLoading: isReInquiryEmployeeLoading }] =
    useReInquiryEmployeeMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!data) return;
    const info = data as ManagementAllStaffInfoListResponse;

    setFileList(
      info?.personalPhoto
        ? [
            {
              uid: info.personalPhoto,
              name: info.personalPhoto,
              status: "done",
              url: info.personalPhoto,
            },
          ]
        : []
    );
  }, [data]);

  //* ================================ Util Functions ================================
  const openWalletModalHandler = () => {
    setWalletModalOpen(true);
  };

  const closeWalletModalHandler = () => {
    setWalletModalOpen(false);
  };

  // change password
  const openChangePasswordHandler = () => {
    setChangePasswordModal(true);
  };

  const closeChangePasswordHandler = () => {
    setChangePasswordModal(false);
  };

  const changePasswordHandler = () => {
    if (data?.nationalCode) {
      changePassword({ username: data?.nationalCode })
        .unwrap()
        .then(() => closeChangePasswordHandler());
    }
  };

  const reInquiryStudentHandler = () => {
    const nationalCode = data?.nationalCode || data?.username;
    if (!nationalCode) return;

    reInquiryStudent(nationalCode)
      .unwrap()
      .then(() => {
        toast.success(STUDENT_INQUIRY_SUCCESS, {
          toastId: STUDENT_INQUIRY_SUCCESS,
        });
        setReInquiryToggle?.((prev) => !prev);
      });
  };

  const reInquiryEmployeeHandler = () => {
    const nationalCode = data?.nationalCode || data?.username;
    if (!nationalCode) return;

    reInquiryEmployee({ nationalCode })
      .unwrap()
      .then(() => {
        toast.success(EMPLOYEE_INQUIRY_SUCCESS, {
          toastId: EMPLOYEE_INQUIRY_SUCCESS,
        });
        setReInquiryToggle?.((prev) => !prev);
      });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {walletModalOpen && (
        <UserWalletsListModal
          walletModalOpen={walletModalOpen}
          closeWalletModalHandler={closeWalletModalHandler}
          nationalCode={data?.username}
        />
      )}
      {changePasswordModal && (
        <ConfirmationModalWithContent
          title="آیا از تغییر رمز عبور کاربر اطمینان دارید؟"
          isModalOpen={changePasswordModal}
          confirmBtnText="تغییر رمز عبور"
          closeModalHandler={closeChangePasswordHandler}
          onConfirmClickHandler={changePasswordHandler}
          content={<p>رمز عبور جدید برای کاربر پیامک خواهد شد.</p>}
          isConfirmButtonLoading={isChangePasswordLoading}
          backBtnText="انصراف"
          isDangerous={true}
        />
      )}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={8} lg={8} xl={4}>
          <div className="management-all-detail-info-uploader-container">
            <CustomUploader
              hasNullText
              uploaderText="عکس پرسنلی"
              fileList={fileList}
              setFileList={setFileList}
            />
          </div>
        </Col>
        <Col xs={24} sm={12} md={16} lg={16} xl={20}>
          <Row className="management-all-detail-info-detail-container" gutter={[24, 24]}>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={12}
              xl={12}
              className="management-all-detail-info-detail-info"
            >
              <h3>
                {dataPlaceHolder({ data: data?.firstName })}{" "}
                {dataPlaceHolder({ data: data?.lastName })}
              </h3>
              <div>
                <span>کدملی / کد فراگیر</span>
                <span> {dataPlaceHolder({ data: data?.username })}</span>
              </div>
              <div>
                <span>ایجاد حساب</span>
                <span>
                  {dataPlaceHolder({
                    data: data?.createdDate,
                    isDate: true,
                    customDateFormat: "HH:mm - YYYY/MM/DD",
                  })}
                </span>
              </div>
              <div>
                <span>آخرین ورود</span>
                <span>{emptyString}</span>
              </div>
              <div>
                <span>گروه کاربری</span>
                <div className="custom-tag-container">
                  {data?.staffTypes?.map((type) => {
                    let color = "";
                    switch (type.id) {
                      case 1:
                        color = "blue";
                        break;
                      case 2:
                        color = "volcano";
                        break;
                      case 3:
                        color = "warning";
                        break;
                      default:
                        color = "default";
                    }
                    return (
                      <CustomTag className="custom-tag" color={color} key={type.id}>
                        {dataPlaceHolder({ data: type.title })}
                      </CustomTag>
                    );
                  })}
                </div>
              </div>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={12}
              xl={12}
              className="management-all-detail-info-detail-buttons"
            >
              <CustomButton disabled icon={<PiBellRinging />}>
                ارسال اعلان
              </CustomButton>
              <CustomButton icon={<PiWallet />} onClick={openWalletModalHandler}>
                کیف پول
              </CustomButton>
              <CustomButton
                danger
                icon={<PiPassword />}
                onClick={openChangePasswordHandler}
              >
                تغییر رمز عبور
              </CustomButton>
              {from === "user-info-tab" && (
                <>
                  <CustomButton
                    onClick={reInquiryStudentHandler}
                    loading={isReInquiryStudentLoading}
                  >
                    استعلام دانشجویی
                  </CustomButton>
                  <CustomButton
                    onClick={reInquiryEmployeeHandler}
                    loading={isReInquiryEmployeeLoading}
                  >
                    استعلام کارمندی
                  </CustomButton>
                </>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
export default ManagementAllDetailsUserInfo;
