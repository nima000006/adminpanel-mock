import { useEffect } from "react";

import { Form, FormInstance } from "antd";

import CustomCard from "../../../../../components/CustomCard/CustomCard";
import CustomSelect from "../../../../../components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import { useLazyGetRejectSessionQuery } from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import { PADDING_20 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import "./_sessionCancelModalContent.scss";

const SessionCancelModalContent = ({
  form,
}: {
  id?: number;
  form?: FormInstance<any>;
}) => {
  //? ================================  Api Calls ================================
  const [
    getRejectSession,
    { data: rejectSessionData, isLoading: isRejectSessionLoading },
  ] = useLazyGetRejectSessionQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getRejectSession({ firstResult: 0, maxResults: 8 });
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard
      padding={PADDING_20}
      className="realization-detail-cancel-session-modal-container"
    >
      <Form className="inputs-container" form={form}>
        <CustomSelect
          label="دلیل"
          name="understandingCommitteCancellingReason"
          isLoading={isRejectSessionLoading}
          options={rejectSessionData?.data}
        />
        <CustomTextArea
          label="توضیحات"
          name="understandingCommitteCancellingDescription"
          placeholder="توضیحات"
        />
      </Form>
    </CustomCard>
  );
};

export default SessionCancelModalContent;
