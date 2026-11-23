import { useEffect, useState } from "react";

import { Button, Row } from "antd";
import { useSearchParams } from "react-router";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useGetViolationInfoMutation } from "@infra/states/redux/Apis/committee/committees/committees";
import { PADDING_24 } from "@infra/VARS/globalStyles/globalStyles";

import {
  GetViolationInfoResponse,
  ReadOnlyInfringementInformationStepProps,
  ViolationDetailType,
  ViolationInfoType,
} from "./@types/@readOnlyInfringementInformationStep";
import "./_readOnlyInfringementInformationStep.scss";

const violationDetailItem = (data: ViolationDetailType[]) => {
  if (data?.length === 0) return "-";
  return data?.map(
    (item, index) =>
      item?.title && (
        <div key={item?.id} className="custom-supplementary-container">
          <span>{index + 1}- </span>
          <span>{item?.title}</span>
        </div>
      )
  );
};

const ReadOnlyInfringementInformationStep = ({
  setCurrentStep,
  deleteRequestStatus,
}: ReadOnlyInfringementInformationStepProps) => {
  const [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);
  const [infringementInformation, setInfringementInformation] =
    useState<ViolationInfoType | null>(null);

  //? ================================  Api Calls ================================
  const [getViolationInfo, { isLoading: isViolationInfoLoading }] =
    useGetViolationInfoMutation();

  //* ================================ Util Functions ================================
  const getViolationInfoOnSuccess = async (value: GetViolationInfoResponse) => {
    if (value?.status === 200) {
      setInfringementInformation(value?.data);
    }
  };

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getViolationInfo({
        _data_: {
          id,
        },
      })
        .unwrap()
        .then(getViolationInfoOnSuccess);
    }
  }, [id]);

  const nextBtnHandler = () => {
    setCurrentStep(2);
  };
  const backBtnHandler = () => {
    setCurrentStep(0);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      loading={isViolationInfoLoading}
      className="committee-records-detail-read-only-infringement-information-step-container"
    >
      {deleteRequestStatus && (
        <div className="delete-request-status-container">
          <p className="status-text">
            برای این سابقه، درخواست حذف ثبت شده و در انتظار تأیید مسئول مربوطه است.
          </p>
        </div>
      )}
      <CustomCard padding={PADDING_24}>
        <CustomDivider text="اطلاعات تخلف" />
        {infringementInformation && (
          <Row gutter={[12, 12]}>
            <SingleVerticalWithCol
              span={12}
              label="نوع تخلف"
              value={infringementInformation?.AssociationInfractionType?.title}
            />
            <SingleVerticalWithCol
              span={12}
              label="تخلف"
              value={infringementInformation?.AssociationInfractions?.title}
            />

            <SingleVerticalWithCol
              span={24}
              label="جزئیات تخلف"
              value={dataPlaceHolder({
                data: infringementInformation?.AssociationPivotRecordsDetails,
                callBack: violationDetailItem,
              })}
            />

            {infringementInformation?.AssociationInfractions?.id === 11 && (
              <>
                <SingleVerticalWithCol
                  span={8}
                  label="سال وقوع"
                  value={infringementInformation?.characteristicCode}
                  customDateFormat="YYYY"
                  isDate
                />

                <SingleVerticalWithCol
                  span={8}
                  label="ترم نمونه"
                  value={infringementInformation?.term}
                />

                <SingleVerticalWithCol
                  span={8}
                  label="کد درس"
                  value={infringementInformation?.lessonCode}
                />

                <SingleVerticalWithCol
                  span={8}
                  label="نام مراقب"
                  value={infringementInformation?.caregiverName}
                />

                <SingleVerticalWithCol
                  span={8}
                  label="کد مراقب"
                  value={infringementInformation?.caregiverCode}
                />

                <SingleVerticalWithCol
                  span={8}
                  label="محل تخلف"
                  value={infringementInformation?.placeViolation}
                />

                <SingleVerticalWithCol
                  span={8}
                  label="مرجع کسب اطلاعات"
                  value={infringementInformation?.informationSource}
                />
              </>
            )}

            <SingleVerticalWithCol
              span={24}
              label="توضیحات تخلف"
              value={infringementInformation?.descViolation}
            />
          </Row>
        )}
      </CustomCard>
      <div className="button-wrapper">
        <div className="buttons-container">
          <Button className="back-btn" onClick={backBtnHandler}>
            برگشت
          </Button>
          <Button type="primary" onClick={nextBtnHandler}>
            بعدی
          </Button>
        </div>
      </div>
    </Div>
  );
};

export default ReadOnlyInfringementInformationStep;
