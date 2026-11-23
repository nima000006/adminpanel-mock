import { useEffect } from "react";

import { Row } from "antd";
import { useSearchParams } from "react-router";

import CustomCard from "@components/CustomCard/CustomCard";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { useGetSubmitterDetailRequestInformationMutation } from "@infra/states/redux/Apis/committee/history/history";
import "./_requestInfoTab.scss";

const RequestInfoTab = () => {
  const [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  const [
    getRequestInformation,
    { data: requestInformationData, isLoading: isRequestInformationLoading },
  ] = useGetSubmitterDetailRequestInformationMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (+id > 0) {
      getRequestInformation({
        _data_: {
          id,
        },
      });
    }
  }, [id]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard loading={isRequestInformationLoading}>
      <Row gutter={[10, 10]}>
        <SingleVerticalWithCol
          md={6}
          xs={12}
          label="تاریخ ثبت درخواست"
          value={requestInformationData?.data?.dateRegistration}
          isDate
        />

        <SingleVerticalWithCol
          md={6}
          xs={12}
          label="نوع اطلاعات درخواستی"
          value={requestInformationData?.data?.typeInformation}
        />

        <SingleVerticalWithCol
          md={6}
          xs={12}
          label="علت ثبت درخواست"
          value={requestInformationData?.data?.reasonRequest}
        />

        <SingleVerticalWithCol
          md={6}
          xs={12}
          label="وضعیت"
          value={requestInformationData?.data?.AssociationInquiryRequestStatus?.title}
        />

        <SingleVerticalWithCol
          md={6}
          xs={12}
          label="توضیحات"
          value={requestInformationData?.data?.descRequest}
        />
      </Row>
    </CustomCard>
  );
};

export default RequestInfoTab;
