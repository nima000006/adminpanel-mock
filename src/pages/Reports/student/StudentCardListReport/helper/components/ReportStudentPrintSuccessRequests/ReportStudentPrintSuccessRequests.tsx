import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import StatusHistoryModal from "@components/Modals/StudentModule/StatusHistory/StatusHistoryModal";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { StudentCardProps } from "@infra/models/general.model";
import { PHYSICAL, POSTAL, PRINT_SUCCESS_CODE } from "@infra/models/studentStatus";
import ReportGeneralStudentTableModel from "@infra/models/tableModels/Reports/student/General/ReportGeneralStudentTableModel";
import { useGetAllStudentCardMutation } from "@infra/states/redux/Apis/studentApi";
import { GENERAL_ERROR_MESSAGE } from "@infra/VARS/globalToasts/globalToasts";
import "./_printSuccessRequests.scss";

const ReportStudentPrintSuccessRequests = () => {
  const [dataSource, setDataSource] = useState<StudentCardProps[]>([]);
  const [historyModal, setHistoryModal] = useState({ id: -1, isOpen: false });

  const [cardRequestType, setCardRequestType] = useState<number>(POSTAL);

  //!
  const [
    getAllStudents,
    { data: getAllStudentData, isLoading: isGetAllStudentsLoading },
  ] = useGetAllStudentCardMutation();

  //!
  useEffect(() => {
    getAllStudents({
      status: PRINT_SUCCESS_CODE,
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

      <div className="print-success-screen-container">
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

              onChangePostalType(fakeEvent, PRINT_SUCCESS_CODE);
            }}
          />
        </div>

        <CustomTable
          loading={isGetAllStudentsLoading}
          dataSource={dataSource}
          columns={ReportGeneralStudentTableModel({
            onStatusHistoryClickHandler: onStatusHistoryClickHandler,
          })}
          pagination={paginationConfig}
          {...TABLE_PROPS(dataSource?.length)}
        />
      </div>
    </>
  );
};

export default ReportStudentPrintSuccessRequests;
