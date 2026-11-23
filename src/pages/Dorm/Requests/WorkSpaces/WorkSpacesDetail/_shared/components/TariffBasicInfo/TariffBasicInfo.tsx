import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";

import { TariffBasicInfoProps } from "./@types/@tariffBasicInfo";
import "./_tariffBasicInfo.scss";

const TariffBasicInfo = ({ data, loading }: TariffBasicInfoProps) => {
  return (
    <Div loading={loading} className="work-spaces-tariff-basic-info-container">
      <section>
        <CustomDivider className="divider" text="اطلاعات اولیه" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            label="عنوان"
            value={data?.data[0]?.title}
          />
          <SingleVerticalWithCol
            md={12}
            label="شناسه تعرفه"
            value={data?.data[0]?.id?.toString()}
          />
          <SingleVerticalWithCol
            md={12}
            label="واحد دانشگاهی"
            value={data?.data[0]?.AssociationBranchid_title}
          />
          <SingleVerticalWithCol
            md={12}
            label="اقامتگاه"
            value={data?.data[0]?.AssociationDormitory_title}
          />
          <SingleVerticalWithCol
            md={12}
            label="واحد پول"
            value={data?.data[0]?.AssociationCurrencyId_title}
          />
          <SingleVerticalWithCol
            md={12}
            label="مالیات"
            value={`${data?.data[0]?.tax?.toString()} %`}
          />
          <SingleVerticalWithCol
            md={12}
            label="عوارض"
            value={`${data?.data[0]?.toll?.toString()} %`}
          />
          <SingleVerticalWithCol
            md={12}
            span={24}
            label="توضیحات"
            value={data?.data[0]?.description}
          />
        </Row>
      </section>
      <section>
        <CustomDivider text="زمان بندی" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            md={12}
            label="تاریخ شروع اعمال مؤثر"
            value={dataPlaceHolder({
              data: data?.data[0]?.appliedStartDate,
              isDate: true,
            })}
          />
          <SingleVerticalWithCol
            md={12}
            label="ساعت شروع اعمال مؤثر"
            value={dataPlaceHolder({
              data: data?.data[0]?.appliedStartTime,
              isTime: true,
            })}
          />
          <SingleVerticalWithCol
            md={12}
            label="تاریخ پایان اعمال مؤثر"
            value={dataPlaceHolder({
              data: data?.data[0]?.appliedEndDate,
              isDate: true,
            })}
          />
          <SingleVerticalWithCol
            md={12}
            label="ساعت پایان اعمال مؤثر"
            value={dataPlaceHolder({
              data: data?.data[0]?.appliedEndTime,
              isTime: true,
            })}
          />
        </Row>
      </section>
    </Div>
  );
};
export default TariffBasicInfo;
