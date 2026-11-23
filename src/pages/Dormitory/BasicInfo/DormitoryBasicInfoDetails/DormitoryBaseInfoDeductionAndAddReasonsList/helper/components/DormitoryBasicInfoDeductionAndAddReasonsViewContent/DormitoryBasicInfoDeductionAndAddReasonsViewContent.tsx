import { useEffect } from "react";

import { Row, Spin } from "antd";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useLazyGetViewDormitoryReasonReturnAndRefuseListQuery } from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
import {
  displayStatusMap,
  reasonDeductionAndAddTypeConfig,
} from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/_shared/utils";

const DormitoryBasicInfoDeductionAndAddReasonsViewContent = ({
  uuid,
  visibility,
}: {
  uuid: string;
  visibility: boolean;
}) => {
  //? ================================  Api Calls ================================
  const [
    getViewDormitoryReasonReturnAndRefuseList,
    {
      data: viewDormitoryReasonReturnAndRefuseData,
      isFetching: isGetViewDormitoryReasonReturnAndRefuseListLoading,
    },
  ] = useLazyGetViewDormitoryReasonReturnAndRefuseListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (uuid) {
      getViewDormitoryReasonReturnAndRefuseList({ uuid, visibility });
    }
  }, [uuid, visibility]);

  const kindConfig =
    reasonDeductionAndAddTypeConfig[
      viewDormitoryReasonReturnAndRefuseData?.kind
        ?.name as keyof typeof reasonDeductionAndAddTypeConfig
    ];

  const status =
    displayStatusMap[
      String(viewDormitoryReasonReturnAndRefuseData?.visible) as "true" | "false"
    ];

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Spin spinning={isGetViewDormitoryReasonReturnAndRefuseListLoading}>
      <Row gutter={[16, 16]} className="flex-col!">
        <div className="flex gap-2">
          <span>نوع دلیل</span>
          {kindConfig ? (
            <CustomTag color={kindConfig.color} className="w-fit">
              {kindConfig.title}
            </CustomTag>
          ) : (
            dataPlaceHolder({
              data: viewDormitoryReasonReturnAndRefuseData?.kind?.title,
            })
          )}
        </div>
        <SingleVerticalWithCol
          span={24}
          label="عنوان دلیل"
          value={dataPlaceHolder({
            data: viewDormitoryReasonReturnAndRefuseData?.title,
          })}
        />
        <SingleVerticalWithCol
          span={24}
          label="توضیحات"
          value={dataPlaceHolder({
            data: viewDormitoryReasonReturnAndRefuseData?.description,
          })}
        />
        <div className="p-2">
          <p className="mb-2!">وضعیت نمایش</p>
          <CustomTag className="w-fit" color={status?.color}>
            {status?.title}
          </CustomTag>
        </div>
      </Row>
    </Spin>
  );
};

export default DormitoryBasicInfoDeductionAndAddReasonsViewContent;
