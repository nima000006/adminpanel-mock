import { useEffect, useState } from "react";

import { Col, Row, UploadFile } from "antd";
import { toast } from "react-toastify";

import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetMyContractDetailQuery } from "@infra/states/redux/Apis/food/contract/contractApi";
import { GetMyContractDetailResponse } from "@pages/Food/Contracts/MyContracts/MyContractDetail/helpers/components/MyContractDetail/@types/@myContractDetailTab";

import MyFoodScheduleContractInfo from "./helper/components/MyFoodScheduleContractInfo/MyFoodScheduleContractInfo";

import "./_contractsTab.scss";

const MyContractTab = () => {
  const [firstFile, setFirstFile] = useState<UploadFile[]>([]);
  const [secondFile, setSecondFile] = useState<UploadFile[]>([]);
  const [ThirdFile, setThirdFile] = useState<UploadFile[]>([]);
  const [fourthFile, setFourthFile] = useState<UploadFile[]>([]);

  const {
    params: { contractId },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [
    getContractDetail,
    { data: getContractDetailData, isFetching: isGetContractDetailLoading },
  ] = useLazyGetMyContractDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (contractId) {
      getContractDetail({ contractId }).unwrap().then(onGetContactDetailSuccess);
    }
  }, [contractId]);

  //* ================================ Util Functions ================================
  const onGetContactDetailSuccess = async (response: GetMyContractDetailResponse) => {
    if (response?.status === 200) {
      const firstImage = response?.data?.file1;
      const secondImage = response?.data?.file2;
      const thirdImage = response?.data?.file3;
      const fourthImage = response?.data?.file4;
      if (firstImage) {
        setFirstFile([
          {
            uid: response?.data?.file1,
            name: response?.data?.file1,
            status: "done",
            url: response?.data?.file1,
          },
        ]);
      } else {
        setFirstFile([]);
      }
      if (secondImage) {
        setSecondFile([
          {
            uid: response?.data?.file2,
            name: response?.data?.file2,
            status: "done",
            url: response?.data?.file2,
          },
        ]);
      } else {
        setSecondFile([]);
      }
      if (thirdImage) {
        setThirdFile([
          {
            uid: response?.data?.file3,
            name: response?.data?.file3,
            status: "done",
            url: response?.data?.file3,
          },
        ]);
      } else {
        setThirdFile([]);
      }
      if (fourthImage) {
        setFourthFile([
          {
            uid: response?.data?.file4,
            name: response?.data?.file4,
            status: "done",
            url: response?.data?.file4,
          },
        ]);
      } else {
        setFourthFile([]);
      }
    } else {
      return toast.error((response?.data || response?.msg) as any, {
        toastId: (response?.data || response?.msg) as any,
      });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      loading={isGetContractDetailLoading}
      className="my-food-schedule-contracts-detail-tab-container"
    >
      <CustomDivider
        text="اطلاعات قرارداد"
        extraContent={
          <CustomTag
            className="status"
            color={getContractDetailData?.data?.active ? "green" : "red"}
          >
            {getContractDetailData?.data?.active ? "فعال" : "غیر فعال"}
          </CustomTag>
        }
      />
      <Row gutter={[16, 16]}>
        <MyFoodScheduleContractInfo getContractDetailData={getContractDetailData} />
      </Row>
      <Row>
        <Col lg={6} md={6} sm={8} xs={12}>
          <CustomUploader
            fileList={firstFile}
            setFileList={setFirstFile}
            isReadOnly={true}
            maxCount={3}
            name="upload"
            hasNullText
            uploaderText="بارگذاری تصاویر"
          />
        </Col>
        <Col lg={6} md={6} sm={8} xs={12}>
          <CustomUploader
            fileList={secondFile}
            setFileList={setSecondFile}
            isReadOnly={true}
            maxCount={3}
            name="upload"
            hasNullText
            uploaderText="بارگذاری تصاویر"
          />
        </Col>
        <Col lg={6} md={6} sm={8} xs={12}>
          <CustomUploader
            fileList={ThirdFile}
            setFileList={setThirdFile}
            isReadOnly={true}
            maxCount={3}
            name="upload"
            hasNullText
            uploaderText="بارگذاری تصاویر"
          />
        </Col>
        <Col lg={6} md={6} sm={8} xs={12}>
          <CustomUploader
            fileList={fourthFile}
            setFileList={setFourthFile}
            isReadOnly={true}
            maxCount={3}
            name="upload"
            hasNullText
            uploaderText="بارگذاری تصاویر"
          />
        </Col>
      </Row>
    </Div>
  );
};

export default MyContractTab;
