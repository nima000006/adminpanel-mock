import { useEffect, useState } from "react";

import { Button } from "antd";
import { Key } from "antd/es/table/interface";
import { useNavigate, useSearchParams } from "react-router";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import {
  EditInquiryAccusationListResponse,
  GetInquiryAccusationListResponse,
  SelectAccusationStepProps,
} from "./@types/@selectAccusationStep";
import { makeSearchParams } from "../../../../../../../infrastructure/helpers/utils";
import { InquiryUserReportListModel } from "../../../../../../../infrastructure/models/tableModels/CommitteeTableModel/Inquiry/InquiryUserReportList/InquiryUserReportList";
import { COMMITTEE_INQUIRY_USER_INFORMATION_PAGE_ROUTE } from "../../../../../../../infrastructure/router/routes/committee";
import "./_selectAccusationStep.scss";

import {
  useEditInquiryAccusationListMutation,
  useLazyGetInquiryAccusationListQuery,
} from "../../../../../../../infrastructure/states/redux/Apis/committee/inquiry/inquiry";

export const SelectAccusationStep = ({ setCurrent }: SelectAccusationStepProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const [searchParams] = useSearchParams();
  const { nationalCode } = Object.fromEntries([...searchParams]);

  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [
    getInquiryAccusationList,
    { data: inquiryAccusationListData, isLoading: isInquiryAccusationListLoading },
  ] = useLazyGetInquiryAccusationListQuery();

  const [editInquiryAccusationList, { isLoading: isEditInquiryAccusationListLoading }] =
    useEditInquiryAccusationListMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getInquiryAccusationList(nationalCode)
      .unwrap()
      .then(getInquiryAccusationListOnSuccess);
  }, [nationalCode]);

  //* ================================ Util Functions ================================
  const getInquiryAccusationListOnSuccess = async (
    value: GetInquiryAccusationListResponse
  ) => {
    if (value?.status === 200) {
      const selectedRaws = value?.data?.filter((item) => item?.inquiry === true);
      setSelectedRowKeys([...selectedRaws].map((item) => item?.id));
    }
  };

  // On row check box selection change
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const editInquiryAccusationListOnSuccess = (
    value: EditInquiryAccusationListResponse
  ) => {
    if (value?.status === 204) {
      setCurrent((prev) => prev + 1);
    }
  };

  const nextBtnHandler = () => {
    editInquiryAccusationList({
      form: "QuerySelection",
      data: {
        inquiry: true,
      },
      query: {
        filters: [
          {
            key: "id",
            operator: "IN",
            value: selectedRowKeys.join(),
          },
        ],
      },
      // id_IN: selectedRowKeys.join(),
    })
      .unwrap()
      .then(editInquiryAccusationListOnSuccess);
  };

  const backBtnHandler = () => {
    navigate({
      pathname: COMMITTEE_INQUIRY_USER_INFORMATION_PAGE_ROUTE,
      search: makeSearchParams({ nationalCode }),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-individual-inquiry-select-accusation-step">
      <CustomTable
        dataSource={inquiryAccusationListData?.data}
        columns={InquiryUserReportListModel()}
        loading={isInquiryAccusationListLoading}
        pagination={false}
        rowKey="id"
        {...TABLE_PROPS(inquiryAccusationListData?.data?.length || 0)}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
      />
      <div className="buttons-container">
        <Button className="back-btn" onClick={backBtnHandler}>
          برگشت
        </Button>
        <Button
          type="primary"
          onClick={nextBtnHandler}
          loading={isEditInquiryAccusationListLoading}
        >
          بعدی
        </Button>
      </div>
    </div>
  );
};
