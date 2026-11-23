import { useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";

import { PendingHoldProps } from "./@types/@pendingHold";
import InterviewDetailEditModalContent from "./helper/modals/InterviewDetailEditModalContent/InterviewDetailEditModalContent";
import InternationalInterviewPendingHoldTableModel from "./helper/models/InternationalInterviewPendingHoldTableModel/InternationalInterviewPendingHoldTableModel";

const PendingHold = ({ data, loading }: PendingHoldProps) => {
  const { params: url, setSearchParams } = useQueryParams();
  const [isEditModalOpen, setIsEditModalOpen] = useState({
    isOpen: false,
    id: -1,
  });
  const [editForm] = Form.useForm();

  //* ================================ Util Functions ================================
  // close modal handler
  const closeEditModalHandler = () => {
    setIsEditModalOpen({ isOpen: false, id: -1 });
  };

  // todo[shirin]: api not ready.
  // submit modal
  const editRequestHandler = () => {};

  //edit modal opener
  const editClickHandler = (value: string) => {
    setIsEditModalOpen({ isOpen: true, id: +value });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* EDIT MODAL */}
      {isEditModalOpen && (
        <ConfirmationModalWithContent
          title="ویرایش مصاحبه"
          width={900}
          backBtnText="انصراف"
          confirmBtnText="اعمال تغییرات"
          showIcon={false}
          isModalOpen={isEditModalOpen?.isOpen}
          onConfirmClickHandler={editRequestHandler}
          closeModalHandler={closeEditModalHandler}
          // isConfirmButtonLoading={}
          content={
            <InterviewDetailEditModalContent form={editForm} id={isEditModalOpen?.id} />
          }
        />
      )}
      <div className="flex flex-col gap-4">
        <CustomDivider text="لیست درخواست‌های نیازمند مصاحبه‌" />

        <ToolBox
          rightSide={
            <CustomButton
              icon={<AiOutlineFilter />}
              // onClick={onFilterModalClickHandler}
            >
              فیلتر پیشرفته
            </CustomButton>
          }
          leftSide={<CustomButton>خروجی</CustomButton>}
        />

        <CustomTable
          dataSource={data?.content?.[0] || []}
          columns={InternationalInterviewPendingHoldTableModel({
            editClickHandler: editClickHandler,
          })}
          pagination={manualPaginationConfig({
            total: data?.totalElements,
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
          loading={loading}
          rowKey="id"
          className="pending-hold-list-table-container"
          key={`table-${url?.pageSize || "8"} `}
          {...TABLE_PROPS(data?.content?.[0]?.length || 0)}
        />
      </div>
    </>
  );
};
export default PendingHold;
