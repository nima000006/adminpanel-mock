import { useState } from "react";

import { Button, Upload } from "antd";
import { AiOutlineUpload } from "react-icons/ai";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import StudentSearchModal from "@components/Modals/Committee/ReportSubmit/StudentSearchModal/StudentSearchModal";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { REPORTER_ID } from "@pages/Committee/HandleProcessing/Reports/ReportSubmit/reportSubmitUtils/reportSubmitUtils";

import { BasicReportDetailProps } from "./@types/basicReportDetail";
import "./_basicReportDetail.scss";

const BasicReportDetail = ({
  setAccusedDataHandler,
  isEditable,
}: BasicReportDetailProps) => {
  const [isAccusedSearchModalOpen, setIsAccusedSearchModalOpen] = useState(false);
  const closeAccusedSearchModalHandler = () => setIsAccusedSearchModalOpen(false);
  const openAccusedSearchModalHandler = () => setIsAccusedSearchModalOpen(true);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="basic-report-detail-container">
      <section className="individual-report-detail">
        <div className="around-box">
          <div className="divider-btn-container">
            <div>
              <CustomDivider
                text="اطلاعات هویتی متهم"
                extraContent={
                  <div className="btn-container">
                    <Button
                      className="search-student-btn"
                      type="primary"
                      ghost
                      onClick={openAccusedSearchModalHandler}
                      disabled={!isEditable}
                    >
                      جستجوی دانشجو
                    </Button>
                  </div>
                }
              />
            </div>
          </div>
          <div className="grid-cols-3">
            <CustomInput
              type="text"
              label="نام"
              name="accusedName"
              placeholder="نام"
              disabled={!isEditable}
            />
            <CustomInput
              type="text"
              label="نام خانوادگی"
              name="accusedFamilyName"
              placeholder="نام خانوادگی"
              disabled={!isEditable}
            />
            <CustomInput
              type="text"
              label="شماره ملی"
              name="accusedNationalNumber"
              placeholder="شماره ملی"
              disabled={!isEditable}
            />
            <CustomInput
              type="text"
              label="شماره دانشجویی/پرسنلی"
              name="accusedStudentNumber"
              placeholder="شماره دانشجویی/پرسنلی"
              disabled={!isEditable}
            />
            <CustomInput
              type="text"
              label="شماره تماس"
              name="accusedPhoneNumber"
              placeholder="شماره تماس"
              disabled={!isEditable}
            />
          </div>
        </div>
        <div className="around-box">
          <CustomDivider text="جزئیات گزارش" />
          <div className="report-detail-inputs-container">
            <CustomTextArea
              label="توضیحات"
              placeholder="توضیحات"
              name="reportDesc"
              disabled={!isEditable}
            />
            <div className="grid-cols-2">
              <CustomTextArea
                label="محل وقوع"
                placeholder="توضیحات"
                name="occurPlace"
                disabled={!isEditable}
              />
              <CustomInput
                type="text"
                label="تاریخ وقوع"
                name="occurDate"
                placeholder="تاریخ"
                disabled={!isEditable}
              />
            </div>
          </div>
        </div>
        <div className="around-box">
          <CustomDivider text="پیوست ها" />
          <Upload className="upload-container" listType="picture" multiple>
            <Button
              icon={<AiOutlineUpload />}
              className="custom-btn"
              disabled={!isEditable}
            >
              بارگذاری تصاویر
            </Button>
          </Upload>
        </div>
      </section>
      <StudentSearchModal
        isModalOpen={isAccusedSearchModalOpen}
        closeModalHandler={closeAccusedSearchModalHandler}
        setAccusedDataHandler={setAccusedDataHandler}
        from={REPORTER_ID}
      />
    </div>
  );
};

export default BasicReportDetail;
