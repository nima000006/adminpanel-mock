import { Row } from "antd";
import moment from "jalali-moment";

import { CustomUploader } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder, nameFamilyConcat } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  FOREIGN_NATIONAL_STATUS_COLOR,
  FOREIGN_NATIONAL_STATUS_TEXT,
  FOREIGN_NATIONAL_WAITING_REVIEW,
} from "@pages/management/Requests/ForeignNationalsRegistration/_shared/utils/ForeignNationalsRegistration";

const MyForeignNationalsRegistrationDetailInfo = ({ data }: { data: any | null }) => {
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
    <div className="flex flex-col gap-10">
      <div>
        <CustomDivider
          text="اطلاعات درخواست"
          extraContent={
            <div className="flex items-center justify-center gap-4 max-[580px]:mb-4 max-[470px]:flex-col">
              <CustomTag color={FOREIGN_NATIONAL_STATUS_COLOR[+status]}>
                {FOREIGN_NATIONAL_STATUS_TEXT[+status]}
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
              data: nameFamilyConcat(data?.firstName, data?.lastName),
            })}
          />
        </Row>
      </div>

      <div>
        <CustomDivider text="اطلاعات درخواست دهنده" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="شماره همراه"
            value={dataPlaceHolder({ data: data?.user?.mobileNumber })}
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
          <SingleVerticalWithCol label="کد فراگیر" value={data?.userName} />
          <SingleVerticalWithCol label="ملیت" value={dataPlaceHolder({ data: "" })} />
          <SingleVerticalWithCol
            label="شماره دانشجویی"
            value={dataPlaceHolder({ data: "" })}
          />
          <SingleVerticalWithCol
            label="کد سائورگ"
            value={dataPlaceHolder({ data: "" })}
          />
          <SingleVerticalWithCol
            label="تاریخ تولد"
            value={dataPlaceHolder({ data: "" })}
          />
          <SingleVerticalWithCol label="جنسیت" value={dataPlaceHolder({ data: "" })} />
        </Row>
      </div>

      <div className="upload-wrapper">
        <CustomDivider text="فایل‌های بارگذاری شده" />
        <div className="flex gap-4">
          <CustomUploader
            fileList={[]}
            setFileList={() => {}}
            isReadOnly
            hasUploaderIcon={false}
            hasNullText
            uploaderText="عکس ساختمان"
          />
          <CustomUploader
            fileList={[]}
            setFileList={() => {}}
            isReadOnly
            hasUploaderIcon={false}
            hasNullText
            uploaderText="عکس ساختمان"
          />
        </div>
      </div>

      <div>
        <CustomDivider text="متن توضیحات" />
        <CustomAlert description={dataPlaceHolder({ data: data?.description })} />
      </div>
    </div>
  );
};
export default MyForeignNationalsRegistrationDetailInfo;
