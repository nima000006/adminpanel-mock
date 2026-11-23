import { useEffect, useState } from "react";

import { Row } from "antd";

import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetAdmissionDetailBaseInfoMutation } from "@infra/states/redux/Apis/dorm/planning/admission/admissionApi";
import { multiSelectGenerator } from "@pages/_shared/utils";

import { AdmissionDetailLevelsOfActionInfoProps } from "./@types/@admissionDetailLevelsOfActionInfo";
import {
  AdmissionDetailBaseInfo,
  GetAdmissionDetailBaseInfoResponse,
} from "../../AdmissionDetailActive/helpers/AdmissionDetailActiveBaseInfoTab/@types/@admissionDetailActiveBaseInfoTab";

const AdmissionDetailLevelsOfActionInfo = ({
  setApplicationLevelData,
}: AdmissionDetailLevelsOfActionInfoProps) => {
  const [dataSource, setDataSource] = useState<AdmissionDetailBaseInfo | null>(null);

  const {
    params: { id },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getAdmissionDetailBaseInfo, { isLoading: isAdmissionDetailBaseInfoLoading }] =
    useGetAdmissionDetailBaseInfoMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) getDetailData(id);
  }, [id]);

  //* ================================ Util Functions ================================
  // Success
  const getAdmissionDetailBaseInfoSuccess = async (
    values: GetAdmissionDetailBaseInfoResponse
  ) => {
    if (values?.status === 200) {
      setDataSource(values?.data);

      setApplicationLevelData({
        residenceId: values?.data?.AssociationDormitory?.id,
        residenceTitle: values?.data?.AssociationDormitory?.title,
        selectedIds: values?.data?.AssociationRoom?.map((item) => item?.id?.toString()),
      });
    }
  };

  const getDetailData = (id: string) => {
    getAdmissionDetailBaseInfo({
      _data_: {
        id: id,
      },
    })
      .unwrap()
      .then(getAdmissionDetailBaseInfoSuccess);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isAdmissionDetailBaseInfoLoading}>
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="اقامتگاه"
          value={dataSource?.AssociationDormitory.title}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="درصد تخفیف"
          value={`${dataSource?.percentDiscount}%`}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="تخفیف ثابت (ریال)"
          value={dataSource?.fixedDiscount.toString()}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="تعداد اقساط"
          value={dataSource?.installmentNumber.toString()}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="جریمه دیرکرد درصدی (%)"
          value={dataSource?.latePercentagepenalty.toString()}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="جریمه دیرکرد ثابت (ریال)"
          value={dataSource?.fixedLatePenalty.toString()}
        />
        <SingleVerticalWithCol
          span={24}
          label="ارائه به واحدهای"
          value={dataPlaceHolder({
            data: dataSource?.AssociationBranch,
            callBack: multiSelectGenerator,
          })}
        />
      </Row>
    </Div>
  );
};

export default AdmissionDetailLevelsOfActionInfo;
