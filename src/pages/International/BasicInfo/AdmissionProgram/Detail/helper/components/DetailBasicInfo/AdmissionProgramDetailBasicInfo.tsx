import { useEffect } from "react";

import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetInternationalAdmissionDetailBasicInfoQuery } from "@infra/states/redux/Apis/international/basicInfo/internationalBasicInfo";
import { multiSelectGenerator } from "@pages/_shared/utils";

const AdmissionProgramDetailBasicInfo = () => {
  const {
    params: { id },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getData, { data, isFetching: isGetDataLoading }] =
    useLazyGetInternationalAdmissionDetailBasicInfoQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Div loading={isGetDataLoading}>
      <CustomDivider text="اطلاعات اولیه برنامه پذیرش" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          label="عنوان برنامه پذیرش"
          xl={8}
          lg={8}
          value={data?.ruleTitle}
        />
        <SingleVerticalWithCol
          label="ترم تحصیلی"
          xl={8}
          lg={8}
          value={data?.semesterTitle}
        />
        <SingleVerticalWithCol
          label="نوع سیستم آموزشی"
          xl={8}
          lg={8}
          value={data?.trainingTitle}
        />
        <SingleVerticalWithCol
          label="نوع اقامت"
          xl={8}
          lg={8}
          value={data?.residenceTitle}
        />
        <SingleVerticalWithCol
          label="شیوه آموزش"
          xl={8}
          lg={8}
          value={data?.trainingType}
        />
        <SingleVerticalWithCol label="جنسیت" xl={8} lg={8} value={data?.genderTitle} />
        <SingleVerticalWithCol
          label="ملیت (ها)"
          span={24}
          value={dataPlaceHolder({
            data: data?.regions,
            callBack: multiSelectGenerator,
          })}
        />
      </Row>
    </Div>
  );
};

export default AdmissionProgramDetailBasicInfo;
