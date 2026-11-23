import { useEffect, useState } from "react";

import { Row, UploadFile } from "antd";
import { useSearchParams } from "react-router";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { useGetSubmitterDetailRequestLetterMutation } from "@infra/states/redux/Apis/committee/history/history";
import "./_packetInformationTab.scss";

const PacketInformationTab = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  const [
    getPacketInformation,
    { data: requestPacketData, isLoading: isRequestPacketLoading },
  ] = useGetSubmitterDetailRequestLetterMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (+id > 0) {
      getPacketInformation({
        _data_: {
          id,
        },
      });
    }
  }, [id]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div className="packet-info-container" loading={isRequestPacketLoading}>
      {/* ---------------------------------- 1 ---------------------------------- */}
      <CustomCard>
        <CustomDivider text="اطلاعات استعلام‌ کننده" />
        <Row gutter={[10, 10]}>
          <SingleVerticalWithCol
            md={6}
            xs={12}
            label="نام"
            value={requestPacketData?.data?.inquirerFirstName}
          />

          <SingleVerticalWithCol
            md={6}
            xs={12}
            label="نام خانوادگی"
            value={requestPacketData?.data?.inquirerLastName}
          />

          <SingleVerticalWithCol
            md={6}
            xs={12}
            label="سمت"
            value={requestPacketData?.data?.inquirerPost}
          />

          <SingleVerticalWithCol
            md={6}
            xs={12}
            label="سازمان"
            value={requestPacketData?.data?.inquirerOrganization}
          />

          <SingleVerticalWithCol
            md={6}
            xs={12}
            label="شماره"
            value={requestPacketData?.data?.inquirerNumber}
          />

          <SingleVerticalWithCol
            md={6}
            xs={12}
            label="تاریخ درخواست"
            value={requestPacketData?.data?.inquirerDateRequest}
            isDate
          />
        </Row>
      </CustomCard>

      {/* ---------------------------------- 2 ---------------------------------- */}
      <CustomCard>
        <CustomDivider text="پیوست‌ها" />
        <CustomUploader
          fileList={fileList}
          setFileList={setFileList}
          hasNullText={true}
          classNameOuterDiv="custom-upload-packet"
        />
      </CustomCard>
      {/* ---------------------------------- 3 ---------------------------------- */}
      <CustomCard>
        <CustomDivider text="اطلاعات امضاء‌کننده نامه" />
        <Row gutter={[10, 10]}>
          <SingleVerticalWithCol
            md={6}
            xs={12}
            label="نام"
            value={requestPacketData?.data?.signatoryFirstName}
          />

          <SingleVerticalWithCol
            md={6}
            xs={12}
            label="نام خانوادگی"
            value={requestPacketData?.data?.signatoryLastName}
          />

          <SingleVerticalWithCol
            md={6}
            xs={12}
            label="سمت"
            value={requestPacketData?.data?.signatoryPost}
          />

          <SingleVerticalWithCol
            md={6}
            xs={12}
            label="سازمان"
            value={requestPacketData?.data?.signatoryOrganization}
          />
        </Row>
      </CustomCard>
      {/* ---------------------------------- 4 ---------------------------------- */}
      <CustomCard>
        <CustomDivider text="اطلاعات متهم" />
        <Row gutter={[10, 10]}>
          <SingleVerticalWithCol
            md={6}
            xs={12}
            label="نام"
            value={requestPacketData?.data?.nameOffender}
          />

          <SingleVerticalWithCol
            md={6}
            xs={12}
            label="نام خانوادگی"
            value={requestPacketData?.data?.familyOffender}
          />

          <SingleVerticalWithCol
            md={6}
            xs={12}
            label="شماره دانشجویی"
            value={requestPacketData?.data?.studentNumberOffender}
          />

          <SingleVerticalWithCol
            md={6}
            xs={12}
            label="شماره ملی"
            value={requestPacketData?.data?.nationalCodeOffender}
          />
        </Row>
      </CustomCard>
    </Div>
  );
};
export default PacketInformationTab;
