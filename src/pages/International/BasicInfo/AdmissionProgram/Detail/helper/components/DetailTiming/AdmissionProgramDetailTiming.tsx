import { useEffect } from "react";

import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetInternationalAdmissionDetailTimingIfoQuery } from "@infra/states/redux/Apis/international/basicInfo/internationalBasicInfo";
import "./_admissionProgramDetailTiming.scss";

const AdmissionProgramDetailTiming = () => {
  const {
    params: { id },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getData, { data, isFetching: isGetDataLoading }] =
    useLazyGetInternationalAdmissionDetailTimingIfoQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id]);

  return (
    <Div loading={isGetDataLoading} className="admission-program-detail-timing-container">
      <div>
        <CustomDivider text="تاریخ شروع و پایان ترم اول" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="تاریخ شروع ترم اول"
            value={data?.semesterStartDate}
            isDate
          />
          <SingleVerticalWithCol
            label="تاریخ پایان ترم اول"
            value={data?.semesterEndDate}
            isDate
          />
        </Row>
      </div>
      <div>
        <CustomDivider text="تاریخ و زمان شروع و پایان نمایش (تقاضا)" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="تاریخ شروع نمایش"
            value={data?.displayStartDate}
            isDate
          />
          <SingleVerticalWithCol
            label="زمان شروع نمایش"
            value={data?.displayStartDate}
            isDate
            customDateFormat="HH:mm"
          />
          <SingleVerticalWithCol
            label="تاریخ پایان نمایش"
            value={data?.displayEndDate}
            isDate
          />
          <SingleVerticalWithCol
            label="زمان پایان نمایش"
            value={data?.displayEndDate}
            isDate
            customDateFormat="HH:mm"
          />
        </Row>
      </div>
      <div>
        <CustomDivider text="تاریخ و زمان شروع و پایان بررسی" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="تاریخ شروع بررسی"
            value={data?.applicationStartDate}
            isDate
          />
          <SingleVerticalWithCol
            label="زمان شروع بررسی"
            value={data?.applicationStartDate}
            isDate
            customDateFormat="HH:mm"
          />
          <SingleVerticalWithCol
            label="تاریخ پایان بررسی"
            value={data?.applicationEndDate}
            isDate
          />
          <SingleVerticalWithCol
            label="زمان پایان بررسی"
            value={data?.applicationEndDate}
            isDate
            customDateFormat="HH:mm"
          />
        </Row>
      </div>
      <div>
        <CustomDivider text="تاریخ و زمان شروع و پایان پیش ثبت نام" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="تاریخ شروع پیش ثبت نام"
            value={data?.preRegistrationStartDate}
            isDate
          />
          <SingleVerticalWithCol
            label="زمان شروع پیش ثبت نام"
            value={data?.preRegistrationStartDate}
            isDate
            customDateFormat="HH:mm"
          />
          <SingleVerticalWithCol
            label="تاریخ پایان پیش ثبت نام"
            value={data?.preRegistrationEndDate}
            isDate
          />
          <SingleVerticalWithCol
            label="زمان پایان پیش ثبت نام"
            value={data?.preRegistrationEndDate}
            isDate
            customDateFormat="HH:mm"
          />
        </Row>
      </div>
      <div>
        <CustomDivider text="تاریخ و زمان شروع و پایان ثبت نام" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="تاریخ شروع ثبت نام"
            value={data?.registrationStartDate}
            isDate
          />
          <SingleVerticalWithCol
            label="زمان شروع ثبت نام"
            value={data?.registrationStartDate}
            isDate
            customDateFormat="HH:mm"
          />
          <SingleVerticalWithCol
            label="تاریخ پایان ثبت نام"
            value={data?.registrationEndDate}
            isDate
          />
          <SingleVerticalWithCol
            label="زمان پایان ثبت نام"
            value={data?.registrationEndDate}
            isDate
            customDateFormat="HH:mm"
          />
        </Row>
      </div>
    </Div>
  );
};

export default AdmissionProgramDetailTiming;
