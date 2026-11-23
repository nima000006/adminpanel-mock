import { useEffect, useState } from "react";

import { Col, Row, UploadFile } from "antd";
import { PiBellRinging, PiPassword, PiWallet } from "react-icons/pi";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { emptyString } from "@infra/config/global.vars";
import { dataPlaceHolder } from "@infra/helpers/utils";
import {
  useMyReInquiryEmployeeMutation,
  useMyReInquiryStudentMutation,
} from "@infra/states/redux/Apis/authApi";
import { ManagementMyStaffInfoListResponse } from "@pages/management/_shared/UserDetails/ManagementMyInfoDetails/@types/@managementUserMyCustomerDetails";
import "./_managementMyDetailsUserInfo.scss";

const STUDENT_INQUIRY_SUCCESS = "استعلام دانشجو با موفقیت انجام شد.";
const EMPLOYEE_INQUIRY_SUCCESS = "استعلام کارمند با موفقیت انجام شد.";
const ManagementMyDetailsUserInfo = ({
  data,
  setReInquiryToggle,
  from,
}: {
  data: ManagementMyStaffInfoListResponse | undefined;
  setReInquiryToggle?: React.Dispatch<React.SetStateAction<boolean>>;
  from?: string;
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  //? ================================  Api Calls ================================

  const [reInquiryStudent, { isLoading: isReInquiryStudentLoading }] =
    useMyReInquiryStudentMutation();

  const [reInquiryEmployee, { isLoading: isReInquiryEmployeeLoading }] =
    useMyReInquiryEmployeeMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (data) {
      const info = data as ManagementMyStaffInfoListResponse;

      setFileList(
        info?.personalPhoto
          ? [
              {
                uid: info?.personalPhoto,
                name: info?.personalPhoto,
                status: "done",
                url: info?.personalPhoto,
              },
            ]
          : []
      );
    }
  }, [data]);

  //* ================================ Util Functions ================================
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
    <Row gutter={[24, 24]}>
      <Col xs={24} sm={12} md={8} lg={8} xl={4}>
        <div className="management-my-detail-info-uploader-container">
          <CustomUploader
            hasNullText
            uploaderText="عکس پرسنلی"
            fileList={fileList}
            setFileList={setFileList}
          />
        </div>
      </Col>
      <Col xs={24} sm={12} md={16} lg={16} xl={20}>
        <Row className="management-my-detail-info-detail-container" gutter={[24, 24]}>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={12}
            xl={12}
            className="management-my-detail-info-detail-info"
          >
            <h3>
              {data?.firstName} {data?.lastName}
            </h3>
            <div>
              <span>کدملی / کد فراگیر</span>
              <span> {data?.username}</span>
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
                      {type.title}
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
            className="management-my-detail-info-detail-buttons"
          >
            <CustomButton disabled icon={<PiBellRinging />}>
              ارسال اعلان
            </CustomButton>
            <CustomButton disabled icon={<PiWallet />}>
              کیف پول
            </CustomButton>
            <CustomButton disabled danger icon={<PiPassword />}>
              اجبار تغییر رمز
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
  );
};
export default ManagementMyDetailsUserInfo;
