import React, { useEffect, useState } from "react";

import { AiOutlineFilter } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import StatusHistoryModal from "@components/Modals/StudentModule/StatusHistory/StatusHistoryModal";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { StudentCardProps } from "@infra/models/general.model";
import { PHYSICAL, POSTAL, READY_TO_PRINT_CODE } from "@infra/models/studentStatus";
import ReportGeneralStudentTableModel from "@infra/models/tableModels/Reports/student/General/ReportGeneralStudentTableModel";
import { useGetAllStudentCardMutation } from "@infra/states/redux/Apis/studentApi";
import { GENERAL_ERROR_MESSAGE } from "@infra/VARS/globalToasts/globalToasts";
import "./_readyToPrintRequests.scss";

const ReportStudentReadyToPrintRequests = () => {
  const [dataSource, setDataSource] = useState<StudentCardProps[]>([]);
  const [cardRequestType, setCardRequestType] = useState<number>(POSTAL);
  const [historyModal, setHistoryModal] = useState({ id: -1, isOpen: false });

  //!
  const [
    getAllStudents,
    { data: getAllStudentData, isLoading: isGetAllStudentsLoading },
  ] = useGetAllStudentCardMutation();

  // //! Request UPDATE STUDENT STATUS
  // const [
  //   bulkStudentUpdate,
  //   {
  //     data: bulkStudentUpdateData,
  //     isLoading: isBulkUpdateLoading,
  //     error: bulkStudentUpdateError,
  //   },
  // ] = useBulkStudentUpdateMutation();

  //!
  useEffect(() => {
    getAllStudents({
      status: READY_TO_PRINT_CODE,
      requestType: cardRequestType,
    });
  }, []);

  //! On student get all request status change below things 👇 happens
  useEffect(() => {
    // it has to change to to if getAllStudentData's status is equal to 200
    setDataSource(getAllStudentData?.data?.studentCardDtoList ?? []);
    //todo [saman]: Add error handling in the case of request status other than 200
    // else {
    //   toast.error(GETTING_DATA_ERROR_MESSAGE, { toastId: GETTING_DATA_ERROR_MESSAGE });
    // }
  }, [getAllStudentData?.status]);

  //!
  const onChangePostalType = (
    e: React.ChangeEvent<HTMLSelectElement>,
    status: number
  ) => {
    getAllStudents({ status, requestType: +(e.target as HTMLSelectElement).value });
  };

  //! modal requests for bulk update
  // const onConfirmClickHandler = () => {
  //   if (!selectedUsers) {
  //     return toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
  //   }
  //   if (selectedUsers.some((item) => !item.key)) {
  //     return toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
  //   }
  //   bulkStudentUpdate({
  //     statusId: PRINT_SUCCESS_CODE,
  //     studentCardIds: selectedUsers.map((item) => item?.key),
  //   });
  // };

  //!
  const onStatusHistoryClickHandler = (key: number) => {
    if (key > 0) {
      setHistoryModal({ isOpen: true, id: key });
    } else {
      toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
    }
  };

  return (
    <>
      <StatusHistoryModal historyModal={historyModal} setHistoryModal={setHistoryModal} />

      <div className="ready-to-print-actions-container">
        <div className="select-type-container">
          <CustomSelect
            name="postalCardType"
            className="select"
            placeholder="انتخاب کنید"
            options={[
              { title: "کارت (حضوری)", id: PHYSICAL },
              { title: "کارت (پستی)", id: POSTAL },
            ]}
            onChange={(value) => {
              const numericValue = Number(value);
              setCardRequestType(numericValue);

              // شبیه‌سازی رفتار event مثل select عادی
              const fakeEvent = {
                target: { value: numericValue },
              } as unknown as React.ChangeEvent<HTMLSelectElement>;

              onChangePostalType(fakeEvent, READY_TO_PRINT_CODE);
            }}
          />
        </div>
        <div className="action-bar-container">
          <CustomButton
            type="primary"
            icon={<AiOutlineFilter />}
            size="middle"
            className="advanced-filter-btn"
            // onClick={onClickHomeActionBarFilter}
          >
            فیلتر پیشرفته
          </CustomButton>
        </div>
      </div>
      <CustomTable
        loading={isGetAllStudentsLoading}
        dataSource={dataSource}
        columns={ReportGeneralStudentTableModel({
          onStatusHistoryClickHandler,
        })}
        pagination={paginationConfig}
        {...TABLE_PROPS(dataSource?.length)}
      />
    </>
  );
};

export default ReportStudentReadyToPrintRequests;
