import { useEffect } from "react";

import { Row, Spin } from "antd";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useLazyDormitoryRulesAndRegulationDetailQuery } from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
import { displayStatusMap } from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/_shared/utils";

const DormitoryBasicInfoRulesAndRegulationViewContent = ({ id }: { id: string }) => {
  //? ================================  Api Calls ================================
  const [
    dormitoryRulesAndRegulationDetail,
    {
      data: dormitoryRulesAndRegulationDetailData,
      isFetching: isDormitoryRulesAndRegulationDetailLoading,
    },
  ] = useLazyDormitoryRulesAndRegulationDetailQuery();

  useEffect(() => {
    if (id) {
      dormitoryRulesAndRegulationDetail(id);
    }
  }, [id]);

  const status =
    displayStatusMap[
      String(dormitoryRulesAndRegulationDetailData?.visible) as "true" | "false"
    ];

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Spin spinning={isDormitoryRulesAndRegulationDetailLoading}>
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          label="عنوان قالب قانون و مقررات"
          value={dataPlaceHolder({ data: dormitoryRulesAndRegulationDetailData?.title })}
          span={24}
        />
        <SingleVerticalWithCol
          value={dataPlaceHolder({
            data: dormitoryRulesAndRegulationDetailData?.kind?.title,
          })}
          label="نوع قانون و مقررات"
          span={24}
        />
        <SingleVerticalWithCol
          value={dataPlaceHolder({
            data: dormitoryRulesAndRegulationDetailData?.accommodationType?.title,
          })}
          label="نوع اقامتگاه"
          span={24}
        />
        <SingleVerticalWithCol
          value={dataPlaceHolder({
            data: dormitoryRulesAndRegulationDetailData?.description,
          })}
          label="توضیحات"
          span={24}
        />
        <div className="p-2">
          <p className="mb-2!">وضعیت نمایش</p>
          <CustomTag color={status?.color}>{status?.title}</CustomTag>
        </div>
      </Row>
    </Spin>
  );
};
export default DormitoryBasicInfoRulesAndRegulationViewContent;
