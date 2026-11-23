import { useCallback, useEffect, useMemo, useState } from "react";

import { Col, Row, UploadFile } from "antd";
import { toast } from "react-toastify";

import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import {
  useLazyGetMyContractDetailQuery,
  useLazyGetMyContractFoodsQuery,
} from "@infra/states/redux/Apis/food/contract/contractApi";
import {
  AllContractListData,
  GetContractDetailResponse,
} from "@pages/Food/Contracts/AllContracts/AllContractDetail/helpers/components/AllContractDetail/@types/@allContractDetailTab";
import {
  ContractsFoodDataType,
  GetContractFoodsResponse,
} from "@pages/Food/Contracts/AllContracts/AllContractDetail/helpers/components/Foods/@types/@foodsTab";

import { MyVendorContractsContentProps } from "./@types/@contractDrawer";
import { VendorContractDrawerTableModel } from "../../models/VendorContractDrawerTableModel/VendorContractDrawerTableModel";

import "./_contractDrawer.scss";

const MyVendorContractsContent = ({
  closeDrawerHandler,
  id,
}: MyVendorContractsContentProps) => {
  const [firstFile, setFirstFile] = useState<UploadFile[]>([]);
  const [secondFile, setSecondFile] = useState<UploadFile[]>([]);
  const [ThirdFile, setThirdFile] = useState<UploadFile[]>([]);
  const [fourthFile, setFourthFile] = useState<UploadFile[]>([]);

  const [listData, setListData] = useState<AllContractListData>();
  const [data, setData] = useState<ContractsFoodDataType[] | []>([]);

  //? ================================  Api Calls ================================
  const [getContractDetail, { isFetching: isGetContractDetailLoading }] =
    useLazyGetMyContractDetailQuery();

  // get table data
  const [getContractFoods, { isFetching: isContractFoodsLoading }] =
    useLazyGetMyContractFoodsQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id > 0) {
      getContractDetail({ contractId: id?.toString() })
        .unwrap()
        .then(onGetContractDetailSuccess);
      getContractFoods({ contractId: id?.toString() })
        .unwrap()
        .then(getContractFoodsOnSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getContractFoodsOnSuccess = useCallback(
    async (value: GetContractFoodsResponse) => {
      if (value?.status === 200) {
        setData(value?.data);
      } else {
        return toast.error((value?.data || value?.msg) as any, {
          toastId: (value?.data || value?.msg) as any,
        });
      }
    },
    []
  );

  const onGetContractDetailSuccess = (info: GetContractDetailResponse) => {
    if (info?.status === 200) {
      setListData(info?.data);
      const firstImage = info?.data?.file1;
      const secondImage = info?.data?.file2;
      const thirdImage = info?.data?.file3;
      const fourthImage = info?.data?.file4;
      if (firstImage) {
        setFirstFile([
          {
            uid: info?.data?.file1,
            name: info?.data?.file1,
            status: "done",
            url: info?.data?.file1,
          },
        ]);
      } else {
        setFirstFile([]);
      }
      if (secondImage) {
        setSecondFile([
          {
            uid: info?.data?.file2,
            name: info?.data?.file2,
            status: "done",
            url: info?.data?.file2,
          },
        ]);
      } else {
        setSecondFile([]);
      }
      if (thirdImage) {
        setThirdFile([
          {
            uid: info?.data?.file3,
            name: info?.data?.file3,
            status: "done",
            url: info?.data?.file3,
          },
        ]);
      } else {
        setThirdFile([]);
      }
      if (fourthImage) {
        setFourthFile([
          {
            uid: info?.data?.file4,
            name: info?.data?.file4,
            status: "done",
            url: info?.data?.file4,
          },
        ]);
      } else {
        setFourthFile([]);
      }
    } else {
      return toast.error((info?.data || info?.msg) as any, {
        toastId: (info?.data || info?.msg) as any,
      });
    }
  };

  const columns = useMemo(() => VendorContractDrawerTableModel(), []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      className="my-detail-vendor-contract-drawer-content-container"
      loading={isGetContractDetailLoading}
    >
      <CustomDrawerHeader
        title="جزئیات قرارداد"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <CustomTag color={listData?.active ? "green" : "red"}>
            {listData?.active ? "فعال" : "غیرفعال"}
          </CustomTag>
        }
      />
      <div className="my-detail-vendor-contract-drawer-content-wrapper">
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="عنوان قرارداد"
            value={listData?.title}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="نام تأمین کننده"
            value={listData?.vendorTitle}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="نام سلف"
            value={listData?.restaurantTitle}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="شماره قرارداد"
            value={listData?.contractUUID}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="شروع قرارداد"
            value={listData?.startedDate}
            isDate
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="پایان قرارداد"
            value={listData?.endDate}
            isDate
          />
          <SingleVerticalWithCol
            span={24}
            label="توضیحات"
            value={listData?.description}
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
                  uploaderText="فایل اول"
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
                  uploaderText="فایل دوم"
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
                  uploaderText="فایل سوم"
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
                  uploaderText="فایل چهارم"
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <CustomDivider text="غذاها" />
        <CustomTable<ContractsFoodDataType>
          dataSource={data}
          columns={columns}
          pagination={paginationConfig}
          rowKey="id"
          loading={isContractFoodsLoading}
          {...TABLE_PROPS(data?.length)}
        />
      </div>
    </Div>
  );
};

export default MyVendorContractsContent;
