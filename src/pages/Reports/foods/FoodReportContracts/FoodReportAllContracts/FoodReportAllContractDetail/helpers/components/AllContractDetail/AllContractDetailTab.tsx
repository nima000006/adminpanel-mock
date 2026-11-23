import { useEffect, useState } from "react";

import { Col, Row, UploadFile } from "antd";
import { toast } from "react-toastify";

import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetContractDetailQuery } from "@infra/states/redux/Apis/food/contract/contractApi";

import {
  AllContractListData,
  GetContractDetailResponse,
} from "./@types/@allContractDetailTab";
import "./_allContractDetailTab.scss";

const AllContractDetailTab = () => {
  const [firstFile, setFirstFile] = useState<UploadFile[]>([]);
  const [secondFile, setSecondFile] = useState<UploadFile[]>([]);
  const [ThirdFile, setThirdFile] = useState<UploadFile[]>([]);
  const [fourthFile, setFourthFile] = useState<UploadFile[]>([]);
  const [listData, setListData] = useState<AllContractListData>();
  const {
    params: { contractId },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [
    getContractDetail,
    { data: getContractDetailData, isFetching: isGetContractDetailLoading },
  ] = useLazyGetContractDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (contractId) {
      getInitData();
    }
  }, [contractId]);

  //* ================================ Util Functions ================================
  const getInitData = () => {
    getContractDetail({ contractId }).unwrap().then(onGetContactDetailSuccess);
  };
  // Get Contact Detail Success
  const onGetContactDetailSuccess = async (response: GetContractDetailResponse) => {
    if (response?.status === 200) {
      setListData(response?.data);
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
      className="all-contracts-detail-tab-container"
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
          </div>
        }
      />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="عنوان قرارداد"
          value={listData?.title}
        />

        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="نام تأمین کننده"
          value={listData?.vendorTitle}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="نام سلف"
          value={listData?.restaurantTitle}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="شماره قرارداد"
          value={listData?.contractUUID}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="شروع قرارداد"
          value={listData?.startedDate}
          isDate
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="پایان قرارداد"
          value={listData?.endDate}
          isDate
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="درصد دانشجویار"
          value={` % ${listData?.providerPercentage}`}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="درصد دانشگاه"
          value={` % ${listData?.restaurantPercentage}`}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="درصد تأمین کننده"
          value={` % ${listData?.vendorPercentage}`}
        />

        <SingleVerticalWithCol span={24} label="توضیحات" value={listData?.description} />

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

export default AllContractDetailTab;
