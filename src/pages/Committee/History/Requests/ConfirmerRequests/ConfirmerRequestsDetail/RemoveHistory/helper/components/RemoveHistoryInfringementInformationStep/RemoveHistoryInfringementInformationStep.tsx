import { useEffect } from "react";

import { Row } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useGetViolationInfoMutation } from "@infra/states/redux/Apis/committee/committees/committees";

import { PartiesInformationStepProps } from "./@types/@removeHistoryInfringementInformationStep";

import "./_removeHistoryInfringementInformationStep.scss";

const callbackDetailInfringement = (
  data: {
    id: number;
    title: string;
  }[]
) => {
  if (data?.length === 0) return "-";
  return data?.map(
    (item, index) =>
      item?.title && (
        <div key={item?.id}>
          <span>{index + 1}- </span>
          <span>{item?.title}</span>
        </div>
      )
  );
};

const RemoveHistoryInfringementInformationStep = ({
  setCurrent,
  violationId,
}: PartiesInformationStepProps) => {
  //? ================================  Api Calls ================================
  // دریافت اطلاعات تخلف
  const [
    getInfringementInfo,
    { data: infringementInfoData, isLoading: isInfringementInfoLoading },
  ] = useGetViolationInfoMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (violationId) {
      getInfringementInfo({
        _data_: {
          id: violationId.toString(),
        },
      });
    }
  }, [violationId]);

  //* ================================ Util Functions ================================
  const nextStepHandler = () => {
    setCurrent((prev) => (prev < 3 ? prev + 1 : 3));
  };

  // دکمه قبلی
  const prevStepHandler = () => {
    // setSearchParams({ id: createInfoData?.data?.id?.toString() });
    setCurrent((prev) => (prev < 3 ? prev - 1 : 3));
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      className="remove-history-infringement-info-step-container"
      loading={isInfringementInfoLoading}
    >
      <div className="remove-history-infringement-info-step-wrapper">
        <CustomDivider text="اطلاعات تخلف" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            sm={24}
            label="نوع تخلف"
            value={infringementInfoData?.data?.AssociationInfractionType?.title}
          />

          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            sm={24}
            label="تخلف"
            value={infringementInfoData?.data?.AssociationInfractions?.title}
          />

          <SingleVerticalWithCol
            span={24}
            label="جزئیات تخلف"
            value={dataPlaceHolder({
              data: infringementInfoData?.data?.AssociationPivotRecordsDetails,
              callBack: callbackDetailInfringement,
            })}
          />

          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            sm={24}
            label="سال وقوع"
            value={infringementInfoData?.data?.characteristicCode}
          />

          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            sm={24}
            label="ترم نمونه"
            value={infringementInfoData?.data?.term}
          />

          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            sm={24}
            label="کد درس"
            value={infringementInfoData?.data?.lessonCode}
          />

          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            sm={24}
            label="نام مراقب"
            value={infringementInfoData?.data?.caregiverName}
          />

          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            sm={24}
            label="کد مراقب"
            value={infringementInfoData?.data?.caregiverCode}
          />

          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            sm={24}
            label="محل تخلف"
            value={infringementInfoData?.data?.placeViolation}
          />

          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            sm={24}
            label="مرجع کسب اطلاعات"
            value={infringementInfoData?.data?.informationSource}
          />

          <SingleVerticalWithCol
            span={24}
            label="توضیحات تخلف"
            value={infringementInfoData?.data?.descViolation}
          />
        </Row>
      </div>
      <div className="btn-wrapper">
        <CustomButton onClick={prevStepHandler}>قبلی</CustomButton>
        <CustomButton type="primary" onClick={nextStepHandler}>
          بعدی
        </CustomButton>
      </div>
    </Div>
  );
};
export default RemoveHistoryInfringementInformationStep;
