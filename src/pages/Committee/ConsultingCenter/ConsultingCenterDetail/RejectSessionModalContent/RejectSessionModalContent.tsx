import { useEffect } from "react";

import { Form, FormInstance } from "antd";

import CustomCard from "../../../../../components/CustomCard/CustomCard";
import CustomSelect from "../../../../../components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import { useLazyGetReasonRejectSessionQuery } from "../../../../../infrastructure/states/redux/Apis/committee/consultingCenter/consultingCenterApi";
import { PADDING_20 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import "./_rejectSessionModalContent.scss";

const RejectSessionModalContent = ({
  rejectForm,
}: {
  id: number;
  rejectForm: FormInstance<any>;
}) => {
  //? ================================  Api Calls ================================
  // get the reason filed data
  const [
    getReasonRejectSession,
    { data: ReasonRejectSessionData, isLoading: isReasonRejectSession },
  ] = useLazyGetReasonRejectSessionQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getReasonRejectSession({ firstResult: 0, maxResults: 8 });
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard padding={PADDING_20} className="committee-reject-session-modal-container">
      <Form form={rejectForm}>
        <div className="reject-session-modal-content">
          <CustomSelect
            label="دلیل"
            name="reason"
            options={ReasonRejectSessionData?.data}
            isLoading={isReasonRejectSession}
            form={rejectForm}
          />
          <CustomTextArea label="توضیحات" name="description" placeholder="توضیحات" />
        </div>
      </Form>
    </CustomCard>
  );
};
export default RejectSessionModalContent;
