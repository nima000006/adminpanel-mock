import { useState } from "react";

import { Modal, Row } from "antd";
import moment from "jalali-moment";
import { IoIosArrowRoundDown } from "react-icons/io";
import { IoImageOutline } from "react-icons/io5";
import { Link } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useEstelamSajedModalMutation } from "@infra/states/redux/Apis/management/requests/requestApi";
import {
  ESTELAM_SAJED_STATUS_COLOR,
  ESTELAM_SAJED_STATUS_TEXT,
  ESTELAM_SAJED_WAITING_REVIEW,
} from "@pages/management/Requests/EstelamSajed/_shared/utils/estelamSajedUtils";
import { EstelamSajedDetailResponse } from "@pages/management/Requests/EstelamSajed/AllEstelamSajed/EstelamSajedDetail/@types/@estelamSajedDetailTypes";
import EstelamSajedModalContent from "@pages/management/Requests/EstelamSajed/AllEstelamSajed/EstelamSajedDetail/helper/components/EstelamSajedDetailInfo/helper/modal/EstelamSajedModalContent/EstelamSajedModalContent";
import OtherRolesModalContent from "@pages/management/Requests/EstelamSajed/AllEstelamSajed/EstelamSajedDetail/helper/components/EstelamSajedDetailInfo/helper/modal/EstelamSajedModalContent/OtherRolesModalContent";

import "./_estelamSajedDetailInfo.scss";

const EstelamSajedDetailInfo = ({
  data,
}: {
  data: EstelamSajedDetailResponse | null;
}) => {
  const [isEstelamModalOpen, setIsEstelamModalOpen] = useState(false);
  const [isOtherRolesModalOpen, setIsOtherRolesModalOpen] = useState(false);
  const {
    params: { status },
  } = useQueryParams();

  const diffTime = moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
    moment(data?.createdDate ?? new Date()),
    "days"
  );

  const colorGenerator =
    +diffTime < 3 ? "green" : +diffTime > 2 && +diffTime < 5 ? "yellow" : "red";

  //? ================================  Api Calls ================================
  // estelam sajed modal
  const [estelamSajed, { isLoading: isEstelamSajedLoading }] =
    useEstelamSajedModalMutation();

  //* ================================ Util Functions ================================
  // handlers
  const otherRolesHandler = () => {
    setIsOtherRolesModalOpen(true);
  };

  const closeOtherRolesModalHandler = () => {
    setIsOtherRolesModalOpen(false);
  };

  const estelamSajedHandler = () => {
    setIsEstelamModalOpen(true);
  };

  const closeEstelamModalHandler = () => {
    setIsEstelamModalOpen(false);
  };

  const confirmationClickHandler = () => {
    estelamSajed({ nationalCode: data?.user?.username ?? "" })
      .unwrap()
      .then(() => {
        closeEstelamModalHandler();
      });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* ESTELAM SAJED */}
      {isEstelamModalOpen && (
        <ConfirmationModalWithContent
          isModalOpen={isEstelamModalOpen}
          closeModalHandler={closeEstelamModalHandler}
          onConfirmClickHandler={confirmationClickHandler}
          confirmBtnText="درخواست استعلام ساجد"
          backBtnText="انصراف"
          title="استعلام ساجد"
          isConfirmButtonLoading={isEstelamSajedLoading}
          content={
            <EstelamSajedModalContent
              firstName={data?.user?.firstName}
              lastName={data?.user?.lastName}
              nationalCode={data?.user?.username}
            />
          }
        />
      )}

      {/* OTHER ROLES */}
      {isOtherRolesModalOpen && (
        <Modal
          title="لیست سایر سمت‌های کاربر"
          open={isOtherRolesModalOpen}
          onCancel={closeOtherRolesModalHandler}
          footer={null}
          width={800}
        >
          <OtherRolesModalContent nationalCode={data?.user?.username} />
        </Modal>
      )}

      <div className="management-requests-estelam-sajed-detail-info-container">
        <div>
          <CustomDivider
            text="اطلاعات درخواست"
            extraContent={
              <div className="flex items-center justify-center gap-4 max-[580px]:mb-4 max-[470px]:flex-col">
                <CustomTag color={ESTELAM_SAJED_STATUS_COLOR[+status]}>
                  {ESTELAM_SAJED_STATUS_TEXT[+status]}
                </CustomTag>
                {+status === ESTELAM_SAJED_WAITING_REVIEW ? (
                  <div className="ant-tag-container">
                    <CustomTag color={colorGenerator}>{diffTime} روز</CustomTag>
                  </div>
                ) : null}
              </div>
            }
          />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              label="شماره درخواست"
              value={dataPlaceHolder({ data: data?.id?.toString() })}
            />
            <SingleVerticalWithCol
              label="ثبت درخواست"
              value={dataPlaceHolder({
                data: data?.createdDate,
                isDate: true,
                customDateFormat: "HH:mm، YYYY-MM-DD",
              })}
              customDateFormat="HH:mm، YYYY-MM-DD"
            />
            <SingleVerticalWithCol
              label="آخرین اقدام"
              value={dataPlaceHolder({
                data: data?.modifiedDate,
                isDate: true,
                customDateFormat: "HH:mm، YYYY-MM-DD",
              })}
            />
            <SingleVerticalWithCol
              label="آخرین اقدام کننده"
              value={dataPlaceHolder({
                data:
                  data?.modifierFirstname && data?.modifierLastname
                    ? `${data.modifierFirstname} ${data.modifierLastname}`
                    : "-",
              })}
            />
          </Row>
        </div>
        <div>
          <CustomDivider text="اطلاعات درخواست دهنده" />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              label="نام"
              value={dataPlaceHolder({ data: data?.user?.firstName })}
            />
            <SingleVerticalWithCol
              label="نام خانوادگی"
              value={dataPlaceHolder({ data: data?.user?.lastName })}
            />
            <SingleVerticalWithCol
              label="کد ملی"
              value={dataPlaceHolder({ data: data?.user?.username })}
            />
            <SingleVerticalWithCol
              label="شماره همراه"
              value={dataPlaceHolder({ data: data?.user?.mobileNumber })}
            />
          </Row>
        </div>
        <div>
          <CustomDivider
            text="اطلاعات ثبت شده"
            extraContent={
              +status === ESTELAM_SAJED_WAITING_REVIEW && (
                <div className="flex gap-2 max-[600px]:flex-col max-[577px]:mb-4">
                  <CustomButton type="default" onClick={otherRolesHandler}>
                    سایر سمت‌ها
                  </CustomButton>
                  <CustomButton type="default" onClick={estelamSajedHandler}>
                    استعلام ساجد
                  </CustomButton>
                </div>
              )
            }
          />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol label="کد پرسنلی" value={data?.employeeCode} />
            <SingleVerticalWithCol
              label="سازمان / واحد محل خدمت"
              value={dataPlaceHolder({ data: data?.branchName })}
            />
            <SingleVerticalWithCol
              label="عنوان محل خدمت"
              value={dataPlaceHolder({ data: data?.organizationTitle })}
            />
            <SingleVerticalWithCol
              label="سمت"
              value={dataPlaceHolder({ data: data?.positionTitle })}
            />
          </Row>
        </div>
        <div className="upload-wrapper">
          <CustomDivider text="فایل‌های بارگذاری شده" />
          <Row gutter={[24, 24]}>
            {data?.files.map((item) => (
              <SingleVerticalWithCol
                xl={8}
                lg={12}
                md={12}
                sm={24}
                prefix={<IoImageOutline size={16} />}
                suffix={
                  <Link
                    to={item?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-6! flex gap-2"
                  >
                    <IoIosArrowRoundDown color="blue-primary" />
                    <span className="body-regular">دانلود</span>
                  </Link>
                }
                className="custom-statistic text-primary-6! flex overflow-hidden!"
                valueClassName="truncate"
              />
            ))}
          </Row>
        </div>
        <div>
          <CustomDivider text="متن توضیحات" />
          <CustomAlert description={dataPlaceHolder({ data: data?.description })} />
        </div>
      </div>
    </>
  );
};

export default EstelamSajedDetailInfo;
