import { useCallback, useEffect, useMemo, useState } from "react";

import { UploadFile } from "antd";
import { toast } from "react-toastify";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
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
  GetMyContractFoodsResponse,
} from "@pages/Food/Contracts/MyContracts/MyContractDetail/helpers/components/Foods/@types/@foodsTab";
import SelfContractDrawerTableModel from "@pages/Food/Selfs/helpers/models/SelfContractDrawerTableModel/SelfContractDrawerTableModel";

import { ContractsContentProps } from "./@types/contractsContent";
import FoodMySelfContractsDrawerInfo from "./helpers/components/FoodMySelfContractsDrawerInfo/FoodMySelfContractsDrawerInfo";
import "./_contractsContent.scss";

const ContractsContent = ({ contractId, closeDrawerHandler }: ContractsContentProps) => {
  const [firstFile, setFirstFile] = useState<UploadFile[]>([]);
  const [secondFile, setSecondFile] = useState<UploadFile[]>([]);
  const [thirdFile, setThirdFile] = useState<UploadFile[]>([]);
  const [fourthFile, setFourthFile] = useState<UploadFile[]>([]);
  const [data, setData] = useState<ContractsFoodDataType[] | []>([]);
  const [listData, setListData] = useState<AllContractListData>();

  //? ================================  Api Calls ================================
  const [getContractDetail, { isFetching: isGetContractDetailLoading }] =
    useLazyGetMyContractDetailQuery();

  const [getContractFoods, { isFetching: isContractFoodsLoading }] =
    useLazyGetMyContractFoodsQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (contractId > 0) {
      getContractDetail({ contractId: contractId.toString() })
        .unwrap()
        .then(onGetContractDetailSuccess);
      getContractFoods({ contractId: contractId.toString() })
        .unwrap()
        .then(getContractFoodsOnSuccess);
    }
  }, [contractId]);

  //* ================================ Util Functions ================================
  const getContractFoodsOnSuccess = useCallback(
    async (value: GetMyContractFoodsResponse) => {
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

  const columns = useMemo(() => SelfContractDrawerTableModel(), []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isGetContractDetailLoading}>
      <CustomDrawerHeader
        title="جزئیات قرارداد"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <CustomTag className="status" color={listData?.active ? "green" : "red"}>
            {listData?.active ? "فعال" : "غیر فعال"}
          </CustomTag>
        }
      />
      <div className="my-detail-self-contract-drawer-content-container">
        <FoodMySelfContractsDrawerInfo
          firstFile={firstFile}
          secondFile={secondFile}
          thirdFile={thirdFile}
          fourthFile={fourthFile}
          listData={listData}
          setFirstFile={setFirstFile}
          setSecondFile={setSecondFile}
          setThirdFile={setThirdFile}
          setFourthFile={setFourthFile}
        />
        <CustomDivider text="غذاها" />
        <CustomTable<ContractsFoodDataType>
          dataSource={data}
          columns={columns}
          pagination={false}
          rowKey="id"
          loading={isContractFoodsLoading}
          className="self-contract-table-model-container"
          {...TABLE_PROPS(data?.length)}
        />
      </div>
    </Div>
  );
};

export default ContractsContent;
