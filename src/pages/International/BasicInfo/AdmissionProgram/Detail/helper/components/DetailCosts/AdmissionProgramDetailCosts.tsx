import { useEffect } from "react";

import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetInternationalAdmissionDetailCostIfoQuery } from "@infra/states/redux/Apis/international/basicInfo/internationalBasicInfo";
import "./_admissionProgramDetailCosts.scss";

const AdmissionProgramDetailCosts = () => {
  const {
    params: { id },
  } = useQueryParams();

  //? ================================  Api Calls =============================
  const [getData, { data, isFetching: isGetDataLoading }] =
    useLazyGetInternationalAdmissionDetailCostIfoQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id]);

  return (
    <div className="admission-program-detail-costs">
      <CustomDivider text="هزینه‌های این برنامه پذیرش" />
      <Div loading={isGetDataLoading} className="costs-items-container">
        {data ? (
          data?.map((item) => (
            <div key={item?.serviceTypeId}>
              <CustomDivider text={item?.serviceTypeTitle} />
              <Row gutter={[16, 16]}>
                <SingleVerticalWithCol
                  label="هزینه"
                  extraContent="دلار"
                  value={item?.cost?.toString()}
                  isPrice
                />
                <SingleVerticalWithCol
                  label="مالیات"
                  extraContent="%"
                  value={(item?.tax * 100)?.toString()}
                  isPrice
                />
                <SingleVerticalWithCol
                  label="عوارض"
                  extraContent="%"
                  value={(item?.duty * 100)?.toString()}
                  isPrice
                />
                <SingleVerticalWithCol
                  label="تخفیف"
                  extraContent={
                    item.fixDiscount === null || item.percentDiscount !== null
                      ? "%"
                      : "دلار"
                  }
                  value={
                    item.fixDiscount === null || item.percentDiscount !== null
                      ? item?.percentDiscount?.toString()
                      : item?.fixDiscount?.toString()
                  }
                />
              </Row>
            </div>
          ))
        ) : (
          <CustomEmpty />
        )}
      </Div>
    </div>
  );
};

export default AdmissionProgramDetailCosts;
