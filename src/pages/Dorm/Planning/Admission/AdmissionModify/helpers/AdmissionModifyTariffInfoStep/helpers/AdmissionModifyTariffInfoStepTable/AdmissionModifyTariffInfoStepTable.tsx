import { useEffect, useState } from "react";

import { Key } from "antd/es/table/interface";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetApplicableTariffsCountQuery,
  useLazyGetApplicableTariffsQuery,
} from "@infra/states/redux/Apis/dorm/planning/admission/admissionApi";

import AdmissionModifyTariffLisTableModel from "./Models/AdmissionModifyTariffLisTableModel";
import {
  AdmissionModifyTariffInfoStepTableProps,
  GetApplicableTariffsData,
  GetApplicableTariffsResponse,
} from "../../@types/@admissionModifyTariffInfoStep";
import DetailTariffDrawerContent from "../drawer/DetailTariffDrawerContent/DetailTariffDrawerContent";
import "./_admissionModifyTariffInfoStepTable.scss";

const AdmissionModifyTariffInfoStepTable = ({
  isDrawerOpen,
  setIsDrawerOpen,
  onSelectionChange,
  form,
}: AdmissionModifyTariffInfoStepTableProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [dataSource, setDataSource] = useState<GetApplicableTariffsData[]>();
  const { params: url, setSearchParams } = useQueryParams();

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: Key[]) => {
      setIsDrawerOpen({ isOpen: false, id: selectedRowKeys[0] as number });
      setSelectedRowKeys(selectedRowKeys);
      onSelectionChange?.(selectedRowKeys);
    },
  };

  //? ================================  Api Calls ================================
  const [getApplicableTariffs, { isFetching: getApplicableTariffsLoading }] =
    useLazyGetApplicableTariffsQuery();

  const [
    getApplicableTariffsCount,
    { data: getApplicableTariffsCountData, isFetching: getApplicableTariffsCountLoading },
  ] = useLazyGetApplicableTariffsCountQuery();

  //? ================================ Effects ================================
  const dormitoryId = form.getFieldValue("residence")?.code;
  const schedulingId = form.getFieldValue("timingType")?.code;

  useEffect(() => {
    if (dormitoryId && schedulingId) {
      getApplicableTariffs({
        firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
        maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
        dormitoryId,
        schedulingId,
      })
        .unwrap()
        .then(getApplicableTariffsIsSuccess);
    }
  }, [dormitoryId, schedulingId, url?.pageSize, url?.page]);

  useEffect(() => {
    if (dormitoryId && schedulingId) {
      getApplicableTariffsCount({ dormitoryId, schedulingId });
    }
  }, [dormitoryId, schedulingId]);

  //* ================================ Util Functions ================================
  // success
  const getApplicableTariffsIsSuccess = (value: GetApplicableTariffsResponse) => {
    if (value?.status === 200) {
      setDataSource(value?.data);
    }
  };
  const viewTableClickHandler = (id: number) => {
    setIsDrawerOpen({ isOpen: true, id });
  };
  const closeDrawerHandler = () => {
    setIsDrawerOpen({ isOpen: false, id: -1 });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={closeDrawerHandler}
          open={isDrawerOpen?.isOpen}
          className="all-contracts-detail-page-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <DetailTariffDrawerContent
              closeDrawerHandler={closeDrawerHandler}
              id={isDrawerOpen?.id}
            />
          }
        />
      )}

      <div className="admission-modify-tariff-list-table-container">
        <CustomDivider text="تعرفه‌های فعال قابل استفاده" />
        <ToolBox
          rightSide={
            <CustomInput
              suffix={<AiOutlineSearch />}
              placeholder="جستجو"
              hasVerticalLabel={false}
              disabled
            />
          }
          leftSide={
            <div className="btn-wrapper">
              <CustomButton type="primary" ghost className="btn-text" disabled>
                خروجی اکسل
              </CustomButton>
            </div>
          }
        />
        <CustomTable
          dataSource={dataSource}
          rowKey="id"
          loading={getApplicableTariffsLoading || getApplicableTariffsCountLoading}
          columns={AdmissionModifyTariffLisTableModel({
            viewTableClickHandler,
          })}
          pagination={manualPaginationConfig({
            total: getApplicableTariffsCountData?.data,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                page: page?.toString(),
                pageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.page ? Number(url?.page) : 1,
            defaultPageSize: url?.pageSize ? Number(url?.pageSize) : 8,
          })}
          rowSelection={{
            type: "radio",
            ...rowSelection,
          }}
          className="admission-modify-tariff-list-table"
          key={`table-${url?.pageSize || "8"} `}
          {...TABLE_PROPS(dataSource?.length || 0)}
        />
      </div>
    </>
  );
};

export default AdmissionModifyTariffInfoStepTable;
