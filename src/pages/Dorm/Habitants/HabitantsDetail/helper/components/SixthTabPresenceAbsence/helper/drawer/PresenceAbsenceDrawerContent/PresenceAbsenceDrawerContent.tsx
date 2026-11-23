import { useEffect, useState } from "react";

import { Form } from "antd";
import dayjs from "dayjs";
import momentj from "jalali-moment";
import { toast } from "react-toastify";

import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetDormPresenceAndAbsenceQuery } from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  useGetPresenceAbsenceDrawerDataMutation,
  useSendAbsencePresenceDrawerMutation,
} from "@infra/states/redux/Apis/dorm/habitants/dormHabitantsApi";
import {
  DormPresenceAndAbsence,
  GetDormPresenceAndAbsenceTypesResponse,
} from "@pages/Dorm/BasicInfo/DormBasicInfoDetail/DormPresenceAndAbsenceTypes/@types/@dormPresenceAndAbsenceTypes";
import { SEND_ABSENCE_PRESENCE_SUCCESS_MSG } from "@pages/Dorm/Habitants/HabitantsDetail/helper/utils/HabitantDetailUtils";

import {
  GetPresenceAbsenceDrawerDataResponseTypes,
  PresenceAbsenceDrawerContentProps,
  PresenceAbsenceDrawerData,
  PresenceAbsenceDrawerFormType,
} from "./@types/@presenceAbsenceDrawerContent";
import PresenceAbsenceDrawerEditMode from "./components/PresenceAbsenceDrawerEditMode/PresenceAbsenceDrawerEditMode";
import PresenceAbsenceDrawerViewMode from "./components/PresenceAbsenceDrawerViewMode/PresenceAbsenceDrawerViewMode";
import { SendAbsencePresenceDrawerResponse } from "../../../@types/@sixthTabPresenceAbsence";
import "./_presenceAbsenceDrawerContent.scss";

const PresenceAbsenceDrawerContent = ({
  closeDrawerHandler,
  cellId,
  cellDate,
  getCalendarInitData,
}: PresenceAbsenceDrawerContentProps) => {
  const [type, setIsType] = useState<DormPresenceAndAbsence[]>([]);
  const [data, setData] = useState<PresenceAbsenceDrawerData>();

  const [form] = Form.useForm<PresenceAbsenceDrawerFormType>();

  const {
    params: { userNationalCode, id },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [
    getPresenceAndAbsenceTypes,
    { isFetching: isPresenceAndAbsenceTypesDataLoading },
  ] = useLazyGetDormPresenceAndAbsenceQuery();

  const [
    getPresenceAbsenceDrawerData,
    { isLoading: getPresenceAbsenceDrawerDataIsLoading },
  ] = useGetPresenceAbsenceDrawerDataMutation();

  //send drawer
  const [sendAbsencePresenceDrawer, { isLoading: sendAbsencePresenceDrawerIsLoading }] =
    useSendAbsencePresenceDrawerMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (cellId) {
      getData(cellId?.toString());
    }
  }, [cellId]);

  //* ================================ Util Functions ================================
  // success select
  const getPresenceAndAbsenceTypesIsSuccess = async (
    value: GetDormPresenceAndAbsenceTypesResponse
  ) => {
    if (value?.status === 200) {
      setIsType(value?.data);
    }
  };

  // get drawer data
  const getData = async (cellId: string) => {
    const res = await getPresenceAbsenceDrawerData({
      data: { id: cellId },
    }).unwrap();

    getPresenceAbsenceDrawerDataIsSuccess(res);

    return res;
  };

  // success
  const getPresenceAbsenceDrawerDataIsSuccess = (
    value: GetPresenceAbsenceDrawerDataResponseTypes
  ) => {
    if (value?.status === 200) {
      setData(value?.data);

      const date = momentj.from(cellDate, "fa", "YYYY-MM-DD").format("YYYY-MM-DD");

      const isNeedPresenceStatus = date && isWithinLast24Hours(date);

      form?.setFieldsValue({
        type: selectDefaultValueGenerator(value?.data?.AssociationPresenceAbsence),
        description: value?.data?.description,
        date,
      });

      if (isNeedPresenceStatus) {
        getPresenceAndAbsenceTypes({
          maxResults: 2000,
          firstResult: 0,
          recordStatus_EQ: "1",
        })
          .unwrap()
          .then(getPresenceAndAbsenceTypesIsSuccess);
      }
    }
  };

  // send drawer data
  const submitPresenceAbsenceHandler = () => {
    form.submit();
    form?.validateFields().then((value) => {
      sendAbsencePresenceDrawer({
        form: "EnterAttendance",
        data: {
          PresenceAbsenceId: value?.type?.value,
          description: value?.description,
          userNationalcode: userNationalCode,
          requestDormitoryId: id,
          date: momentj.from(cellDate, "fa", "YYYY-MM-DD").format("YYYY-MM-DD"),
          id: cellId,
        },
      })
        .unwrap()
        .then(submitPresenceAbsenceIsSuccess);
    });
  };

  const submitPresenceAbsenceIsSuccess = async (
    value: SendAbsencePresenceDrawerResponse
  ) => {
    if (value?.status === 204) {
      closeDrawerHandler();

      toast.success(SEND_ABSENCE_PRESENCE_SUCCESS_MSG, {
        toastId: SEND_ABSENCE_PRESENCE_SUCCESS_MSG,
      });

      getData(cellId?.toString());
      getCalendarInitData?.(cellDate);
    }
  };

  const onCloseDrawerHandler = () => {
    closeDrawerHandler();
  };

  // Check if the date is within the last 24 hours using Day.js
  const isWithinLast24Hours = (dateString: string | undefined) => {
    if (!dateString) return false;
    const inputDate = dayjs(dateString);
    const now = dayjs();
    return inputDate.diff(now, "hour") >= -24;
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="presence-absence-drawer-container">
      {/* MAIN DRAWER CONTENT */}
      <Form form={form} className="p-0!">
        {data?.date && isWithinLast24Hours(data.date) ? (
          <PresenceAbsenceDrawerEditMode
            form={form}
            onClose={onCloseDrawerHandler}
            onSubmit={submitPresenceAbsenceHandler}
            data={data}
            type={type}
            isLoading={sendAbsencePresenceDrawerIsLoading}
            isFetching={isPresenceAndAbsenceTypesDataLoading}
            cellDate={cellDate}
            drawerLoading={getPresenceAbsenceDrawerDataIsLoading}
          />
        ) : (
          data && (
            <PresenceAbsenceDrawerViewMode
              data={data}
              cellDate={cellDate}
              onClose={onCloseDrawerHandler}
              drawerLoading={getPresenceAbsenceDrawerDataIsLoading}
            />
          )
        )}
      </Form>
    </div>
  );
};
export default PresenceAbsenceDrawerContent;
