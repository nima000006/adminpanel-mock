import { useEffect, useState } from "react";

import { Col, Row, UploadFile } from "antd";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetMyContractDetailQuery } from "@infra/states/redux/Apis/food/contract/contractApi";

import { GetMyContractDetailResponse } from "./@types/@myContractDetailTab";

import "./_myContractDetailTab.scss";

const MyContractDetailTab = () => {
  const [firstFile, setFirstFile] = useState<UploadFile[]>([]);
  const [secondFile, setSecondFile] = useState<UploadFile[]>([]);
  const [ThirdFile, setThirdFile] = useState<UploadFile[]>([]);
  const [fourthFile, setFourthFile] = useState<UploadFile[]>([]);
  const {
    params: { contractId },
  } = useQueryParams<{ contractId: string }>();

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
  // getting data successful function
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
      className="my-contracts-detail-tab-container"
    >
      <CustomDivider
        text="اطلاعات قرارداد"
        extraContent={
          <div className="divider-btn-container">
            <CustomSwitch
              defaultChecked={getContractDetailData?.data?.active}
              checkedChildren="فعال"
              unCheckedChildren="غیرفعال"
              valuePropName="active"
              disabled
            />
            <CustomButton type="primary" disabled danger>
              حذف
            </CustomButton>
          </div>
        }
      />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="عنوان قرارداد"
          value={getContractDetailData?.data?.title}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="نام تأمین کننده"
          value={getContractDetailData?.data?.vendorTitle}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="نام سلف"
          value={getContractDetailData?.data?.restaurantTitle}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="شماره قرارداد"
          value={getContractDetailData?.data?.contractUUID}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="شروع قرارداد"
          value={getContractDetailData?.data?.startedDate}
          isDate
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="پایان قرارداد"
          value={getContractDetailData?.data?.endDate}
          isDate
        />
        {/* //Todo[Atefeh]: uncomment if needed in future */}
        {/* <SingleVerticalWithCol md={12} sm={24}
          label="درصد دانشجویار"
          value={` % ${getContractDetailData?.data?.providerPercentage}`}
        />
        <SingleVerticalWithCol md={12} sm={24}
          label="درصد دانشگاه"
          value={` % ${getContractDetailData?.data?.restaurantPercentage}`}
        />
        <SingleVerticalWithCol md={12} sm={24}
          label="درصد تأمین کننده"
          value={` % ${getContractDetailData?.data?.vendorPercentage}`}
        /> */}

        <SingleVerticalWithCol
          span={24}
          label="توضیحات"
          value={getContractDetailData?.data?.description}
        />

        <Col span={24}>
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
        </Col>
      </Row>
    </Div>
  );
};

export default MyContractDetailTab;
