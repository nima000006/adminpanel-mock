import { Row } from "antd";
import moment from "jalali-moment";
import { IoIosArrowRoundDown } from "react-icons/io";
import { IoImageOutline } from "react-icons/io5";
import { Link } from "react-router";

import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  FOREIGN_NATIONAL_STATUS_COLOR,
  FOREIGN_NATIONAL_STATUS_TEXT,
  FOREIGN_NATIONAL_WAITING_REVIEW,
} from "@pages/management/Requests/ForeignNationalsRegistration/_shared/utils/ForeignNationalsRegistration";
import { AllForeignDetailResponse } from "@pages/management/Requests/ForeignNationalsRegistration/AllForeignNationalsRegistration/AllForeignNationalsRegistrationDetail/@types/@allForeignNationalsRegistrationDetailTypes";
import "./_allForeignNationalsRegistrationDetailInfo.scss";

const AllForeignNationalsRegistrationDetailInfo = ({
  data,
}: {
  data: AllForeignDetailResponse | null;
}) => {
  const {
    params: { status },
  } = useQueryParams();

  const diffTime = moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
    moment(data?.createdDate ?? new Date()),
    "days"
  );

  const colorGenerator =
    +diffTime < 3 ? "green" : +diffTime > 2 && +diffTime < 5 ? "yellow" : "red";

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="all-foreign-nationals-registration-detail-info-wrapper flex flex-col gap-10">
      <div>
        <CustomDivider
          text="اطلاعات درخواست"
          extraContent={
            <div className="flex items-center justify-center gap-4 max-[580px]:mb-4 max-[470px]:flex-col">
              <CustomTag color={FOREIGN_NATIONAL_STATUS_COLOR[status]}>
                {FOREIGN_NATIONAL_STATUS_TEXT[status]}
              </CustomTag>
              {status === FOREIGN_NATIONAL_WAITING_REVIEW ? (
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
              data: data?.modifiedBy,
            })}
          />
        </Row>
      </div>

      <div>
        <CustomDivider text="اطلاعات درخواست دهنده" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="شماره همراه"
            value={dataPlaceHolder({ data: data?.mobileNumber })}
          />
        </Row>
      </div>

      <div>
        <CustomDivider text="اطلاعات ثبت شده" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="نام"
            value={dataPlaceHolder({ data: data?.firstName })}
          />
          <SingleVerticalWithCol
            label="نام خانوادگی"
            value={dataPlaceHolder({ data: data?.lastName })}
          />
          <SingleVerticalWithCol
            label="نام پدر"
            value={dataPlaceHolder({ data: data?.fatherName })}
          />
          <SingleVerticalWithCol label="کد فراگیر" value={data?.internationalCode} />
          <SingleVerticalWithCol
            label="ملیت"
            value={dataPlaceHolder({ data: data?.regionTitle })}
          />
          <SingleVerticalWithCol
            label="شماره دانشجویی"
            value={dataPlaceHolder({ data: data?.studentNumber })}
          />
          <SingleVerticalWithCol
            label="کد سائورگ"
            value={dataPlaceHolder({ data: data?.saorgCode })}
          />
          <SingleVerticalWithCol
            label="تاریخ تولد"
            value={dataPlaceHolder({ data: data?.birthDate, isDate: true })}
          />
          <SingleVerticalWithCol
            label="جنسیت"
            value={dataPlaceHolder({ data: data?.gender?.title })}
          />
        </Row>
      </div>

      <div className="upload-wrapper">
        <CustomDivider text="فایل‌های بارگذاری شده" />
        <Row gutter={[24, 24]}>
          {data?.uploadFiles.map((item) => (
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
  );
};
export default AllForeignNationalsRegistrationDetailInfo;
