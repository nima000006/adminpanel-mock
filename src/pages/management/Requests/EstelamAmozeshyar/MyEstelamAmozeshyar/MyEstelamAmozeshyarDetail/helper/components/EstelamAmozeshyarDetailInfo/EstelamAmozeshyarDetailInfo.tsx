import { useEffect, useState } from "react";

import { Col, Row, UploadFile } from "antd";
import moment from "jalali-moment";

import { CustomButton } from "@components/CustomInputs";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  ENTRANCE_SEMESTER_TEXT,
  ESTELAM_AMOZESHYAR_STATUS_COLOR,
  ESTELAM_AMOZESHYAR_STATUS_TEXT,
  ESTELAM_AMOZESHYAR_WAITING_REVIEW,
} from "@pages/management/Requests/EstelamAmozeshyar/_shared/utils/estelamAmozeshyarUtil";
import EstelamAmozeshyarModal from "@pages/management/Requests/EstelamAmozeshyar/MyEstelamAmozeshyar/MyEstelamAmozeshyarDetail/helper/components/EstelamAmozeshyarDetailInfo/helper/Modals/EstelamAmozeshyarModal/EstelamAmozeshyarModal";
import OtherStudentNumberListModal from "@pages/management/Requests/EstelamAmozeshyar/MyEstelamAmozeshyar/MyEstelamAmozeshyarDetail/helper/components/EstelamAmozeshyarDetailInfo/helper/Modals/OtherStudentNumberListModal/OtherStudentNumberListModal";

import { MyEstelamAmozeshyarDetailResponse } from "../../../@types/@myEstelamAmozeshyarDetail";

import "./_estelamAmozeshyarDetailInfo.scss";

const EstelamAmozeshyarDetailInfo = ({
  data,
}: {
  data: MyEstelamAmozeshyarDetailResponse | null;
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [estelamModalOpen, setEstelamModalOpen] = useState<boolean>(false);
  const [otherStudentNumbersModalOpen, setOtherStudentNumbersModalOpen] =
    useState<boolean>(false);

  const {
    params: { status },
  } = useQueryParams();

  const diffTime = moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
    moment(data?.createdDate ?? new Date()),
    "days"
  );

  const colorGenerator =
    +diffTime < 3 ? "green" : +diffTime > 2 && +diffTime < 5 ? "yellow" : "red";

  //? ================================ Effects ================================
  useEffect(() => {
    if (!data) return;
    const info = data;

    setFileList(
      info?.fileUrl
        ? [
            {
              uid: info?.fileUrl,
              name: info?.fileUrl,
              status: "done",
              url: info?.fileUrl,
            },
          ]
        : []
    );
  }, [data]);

  //* ================================ Util Functions ================================
  const estelamAmozeshyarOpenHandler = () => {
    setEstelamModalOpen(true);
  };
  const estelamAmozeshyarCloseHandler = () => {
    setEstelamModalOpen(false);
  };

  const otherStudentNumbersOpenHandler = () => {
    setOtherStudentNumbersModalOpen(true);
  };
  const otherStudentNumbersCloseHandler = () => {
    setOtherStudentNumbersModalOpen(false);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {estelamModalOpen && (
        <EstelamAmozeshyarModal
          close={estelamAmozeshyarCloseHandler}
          open={estelamModalOpen}
          nationalCode={data?.username}
          studentCode={data?.studentNumber}
        />
      )}
      {otherStudentNumbersModalOpen && (
        <OtherStudentNumberListModal
          open={otherStudentNumbersModalOpen}
          close={otherStudentNumbersCloseHandler}
          nationalCode={data?.username}
        />
      )}

      <div className="management-requests-estelam-amozeshyar-detail-info-container">
        <div>
          <CustomDivider
            text="اطلاعات درخواست"
            extraContent={
              <div className="extra-content-class">
                <CustomTag color={ESTELAM_AMOZESHYAR_STATUS_COLOR[+status]}>
                  {ESTELAM_AMOZESHYAR_STATUS_TEXT[+status]}
                </CustomTag>
                {+status === ESTELAM_AMOZESHYAR_WAITING_REVIEW ? (
                  <div className="ant-tag-container">
                    <CustomTag color={colorGenerator}>{diffTime} روز</CustomTag>
                  </div>
                ) : null}
              </div>
            }
          />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol label="شماره درخواست" value={data?.id?.toString()} />
            <SingleVerticalWithCol label="ثبت درخواست" value={data?.createdDate} isDate />
            <SingleVerticalWithCol
              label="آخرین اقدام"
              value={data?.modifiedDate}
              isDate
            />
            <SingleVerticalWithCol
              label="آخرین اقدام کننده"
              value={
                data?.modifierFirstname && data?.modifierLastname
                  ? `${data.modifierFirstname} ${data.modifierLastname}`
                  : "-"
              }
            />
          </Row>
        </div>
        <div>
          <CustomDivider text="اطلاعات درخواست دهنده" />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol label="نام" value={data?.firstName} />
            <SingleVerticalWithCol label="نام خانوادگی" value={data?.lastName} />
            <SingleVerticalWithCol label="کد ملی" value={data?.username} />
            <SingleVerticalWithCol label="شماره همراه" value={data?.mobileNumber} />
          </Row>
        </div>
        <div>
          <CustomDivider
            text="اطلاعات ثبت شده"
            extraContent={
              +status === ESTELAM_AMOZESHYAR_WAITING_REVIEW ? (
                <div className="flex gap-4">
                  <CustomButton onClick={otherStudentNumbersOpenHandler}>
                    شماره‌های دانشجویی دیگر
                  </CustomButton>
                  {/* به دلیل نبود api این قسمت غیرفعال شده است */}
                  <CustomButton onClick={estelamAmozeshyarOpenHandler} disabled>
                    استعلام آموزشیار
                  </CustomButton>
                </div>
              ) : (
                <></>
              )
            }
          />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol label="شماره دانشجویی" value={data?.studentNumber} />
            <SingleVerticalWithCol label="نام واحد دانشگاهی" value={data?.branchName} />
            <SingleVerticalWithCol label="مقطع تحصیلی" value={data?.degreeTitle} />
            <SingleVerticalWithCol label="رشته تحصیلی" value={data?.studyField} />
            <SingleVerticalWithCol label="نام دانشکده" value={data?.facultyName} />
            <SingleVerticalWithCol label="سال ورود" value={data?.entranceYear} isDate />
            <SingleVerticalWithCol
              label="نیم‌سال ورود"
              value={
                data?.entranceSemester
                  ? ENTRANCE_SEMESTER_TEXT[data?.entranceSemester]
                  : "-"
              }
            />
            <SingleVerticalWithCol label="استان" value={data?.user?.region} />
          </Row>
        </div>
        <div>
          <CustomDivider text="فایل‌های بارگذاری شده" />
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} md={8} lg={8} xl={4}>
              <div className="management-all-detail-info-uploader-container">
                <CustomUploader
                  hasNullText
                  uploaderText="عکس "
                  fileList={fileList}
                  setFileList={setFileList}
                />
              </div>
            </Col>
          </Row>
        </div>
        <div>
          <CustomDivider text="متن توضیحات" />
          <CustomAlert description={data?.description} />
        </div>
      </div>
    </>
  );
};

export default EstelamAmozeshyarDetailInfo;
