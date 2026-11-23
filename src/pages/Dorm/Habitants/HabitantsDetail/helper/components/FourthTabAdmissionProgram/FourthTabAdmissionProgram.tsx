import { useEffect, useState } from "react";

import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetHabitantAdmissionTabMutation } from "@infra/states/redux/Apis/dorm/habitants/dormHabitantsApi";

import {
  GetHabitantAdmissionTabResponse,
  HabitantAdmissionTabData,
} from "./@types/@fourthTabAdmissionProgram";
import GeneralInfoAdmissionProgram from "./helper/components/GeneralInfoAdmissionProgram/GeneralInfoAdmissionProgram";
import GeneralInfoTariff from "./helper/components/GeneralInfoTariff/GeneralInfoTariff";

const FourthTabAdmissionProgram = () => {
  const [data, setData] = useState<HabitantAdmissionTabData | null>(null);

  const {
    params: { id },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getHabitantAdmission, { isLoading: isGetHabitantAdmissionLoading }] =
    useGetHabitantAdmissionTabMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  // success
  const getHabitantAdmissionIsSuccess = (value: GetHabitantAdmissionTabResponse) => {
    if (value?.status === 200) {
      setData(value?.data);
    }
  };

  const getData = (id: string) => {
    getHabitantAdmission({
      _data_: {
        id: id,
      },
    })
      .unwrap()
      .then(getHabitantAdmissionIsSuccess);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div className="flex flex-col gap-5" loading={isGetHabitantAdmissionLoading}>
      {/* ------------------------------- اطلاعات کلی برنامه پذیرش ----------------------------- */}
      <GeneralInfoAdmissionProgram data={data} />

      {/* -------------------------------- اطلاعات کلی تعرفه --------------------------------- */}
      <GeneralInfoTariff data={data} />
    </Div>
  );
};
export default FourthTabAdmissionProgram;
