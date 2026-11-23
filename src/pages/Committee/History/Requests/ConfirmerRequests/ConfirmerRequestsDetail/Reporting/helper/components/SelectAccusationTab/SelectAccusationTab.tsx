import { useEffect, useState } from "react";

import { Button } from "antd";
import { Key } from "antd/es/table/interface";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { makeSearchParams } from "@infra/helpers/utils";
import { CommitteeReportingAccusationTableModel } from "@infra/models/tableModels/CommitteeTableModel/ReportingAccusation/CommitteeReportingAccusationTableModel";
import { COMMITTEE_HISTORY_REQUESTS_CONFIRMER_DETAIL_Information_PAGE_ROUTE } from "@infra/router/routes/committee";
import {
  useLazyGetViolationsInquiryRequestQuery,
  useLazyGetViolationsInquirySelectedListQuery,
  useSendViolationsInquirySelectedListMutation,
} from "@infra/states/redux/Apis/committee/history/history";
import { REQUEST_INQUIRY_WARN_MSG } from "@infra/VARS/globalToasts/globalToasts";

import {
  GetViolationsInquirySelectedListResponse,
  SelectAccusationTabProps,
  SendViolationsInquirySelectedListResponse,
} from "./@types/@selectAccusationTab";
import "./_selectAccusationTab.scss";

const SelectAccusationTab = ({ setCurrent }: SelectAccusationTabProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[] | []>([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { id, nationalNo } = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  const [
    getViolationsInquiryRequest,
    { data: violationsInquiryRequestData, isLoading: isViolationsInquiryRequestLoading },
  ] = useLazyGetViolationsInquiryRequestQuery();

  const [
    getViolationsInquirySelectedList,
    { isLoading: isViolationsInquirySelectedListLoading },
  ] = useLazyGetViolationsInquirySelectedListQuery();

  const [
    sendViolationsInquirySelectedList,
    { isLoading: isSendViolationsInquirySelectedListLoading },
  ] = useSendViolationsInquirySelectedListMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (nationalNo) {
      getViolationsInquiryRequest(nationalNo);
    }
  }, [nationalNo]);

  useEffect(() => {
    if (id) {
      getViolationsInquirySelectedList(id)
        .unwrap()
        .then(getViolationsInquirySelectedListOnSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getViolationsInquirySelectedListOnSuccess = async (
    value: GetViolationsInquirySelectedListResponse
  ) => {
    if (value?.status === 200) {
      const rowKey = value?.data?.map((item: any) => item.FixedFinesId);
      setSelectedRowKeys(rowKey);
    }
  };

  // On row check box selection change
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const backBtnHandler = () => {
    navigate({
      pathname: COMMITTEE_HISTORY_REQUESTS_CONFIRMER_DETAIL_Information_PAGE_ROUTE,
      search: makeSearchParams({ id: id, nationalNo: nationalNo }),
    });
  };

  const sendViolationsInquirySelectedListOnsuccess = (
    value: SendViolationsInquirySelectedListResponse
  ) => {
    if (value?.status === 200) {
      setCurrent((prev) => prev + 1);
    }
  };

  const nextBtnHandler = () => {
    const requestInquiry = selectedRowKeys.map((item: Key) => ({
      AssociationFixedFines: {
        id: Number(item),
      },
      FixedFinesId: Number(item),
      RequestInquiryId: +id,
    }));
    if (requestInquiry.length === 0) {
      toast.warn(REQUEST_INQUIRY_WARN_MSG, { toastId: REQUEST_INQUIRY_WARN_MSG });
    } else {
      sendViolationsInquirySelectedList({
        form: "InquiryRequestViolation",
        id: "646edbfe3f2040e39d55d8847e834e5a",
        _data_: {
          AssociationRequestInquiry: requestInquiry,
          status: null,
        },
      })
        .unwrap()
        .then(sendViolationsInquirySelectedListOnsuccess);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-confirmer-request-detail-reporting-select-accusation-tab">
      <CustomTable
        dataSource={violationsInquiryRequestData?.data}
        columns={CommitteeReportingAccusationTableModel()}
        rowKey="id"
        loading={
          isViolationsInquiryRequestLoading || isViolationsInquirySelectedListLoading
        }
        pagination={false}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        {...TABLE_PROPS(violationsInquiryRequestData?.data?.length || 0)}
      />
      <div className="btns-container">
        <Button type="default" onClick={backBtnHandler}>
          برگشت
        </Button>
        <Button
          type="primary"
          onClick={nextBtnHandler}
          loading={isSendViolationsInquirySelectedListLoading}
        >
          بعدی
        </Button>
      </div>
    </div>
  );
};

export default SelectAccusationTab;
