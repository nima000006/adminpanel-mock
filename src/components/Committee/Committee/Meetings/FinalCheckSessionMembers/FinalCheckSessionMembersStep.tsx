import { useEffect, useState } from "react";

import { Form } from "antd";
import { useSearchParams } from "react-router";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import {
  GetMemberMeetingResponse,
  GetSessionMeetingMembersResponse,
} from "@pages/Committee/Committees/Meetings/SessionCreation/helper/components/SessionMembers/@types/@sessionMembersStep";

import { DataSource } from "./@types/@finalCheckSessionMembersStep";
import { dataPlaceHolder } from "../../../../../infrastructure/helpers/utils";
import { SessionMembersStepModel } from "../../../../../infrastructure/models/tableModels/CommitteeTableModel/SessionCreation/SessionMembersStepModal";
import {
  useGetMemberMeetingMutation,
  useLazyGetNoticesQuery,
  useLazyGetSessionMeetingMembersQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import CustomRadioGroup from "../../../../CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomTextArea from "../../../../CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "../../../../Renderers/CustomDivider/CustomDivider";
import Div from "../../../../Renderers/Div/Div";

import "./_finalCheckSessionMembersStep.scss";

const FinalCheckSessionMembersStep = () => {
  const [dataSource, setDataSource] = useState<[] | DataSource[]>([]);
  const [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);

  const [memberListForm] = Form.useForm();

  //? ================================  Api Calls ================================
  //meeting member
  const [getSessionMeetingMembers, { isLoading: isSessionMeetingMembersLoading }] =
    useLazyGetSessionMeetingMembersQuery();

  //present and absent list
  const [getMemberPresentList, { isLoading: isMemberPresentListLoading }] =
    useGetMemberMeetingMutation();

  const [getNoticesType, { data: noticesTypeData, isLoading: isNoticesTypeLoading }] =
    useLazyGetNoticesQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getSessionMeetingMembers().unwrap().then(getSessionMeetingMembersOnSuccess);
    getNoticesType({ firstResult: 0, maxResults: 8 });
  }, [id]);

  //* ================================ Util Functions ================================
  const getSessionMeetingMembersOnSuccess = (value: GetSessionMeetingMembersResponse) => {
    setDataSource(value?.data);

    getMemberPresentList({
      _data_: {
        id: id,
      },
    })
      .unwrap()
      .then((value: GetMemberMeetingResponse) => {
        if (value.status === 200) {
          memberListForm.setFieldsValue({
            boss: value?.data?.chairmanPresence,
            cultural: value?.data?.CulturalMemberPresence,
            legal: value?.data?.legalMemberPresence,
            academic: value?.data?.facultyMemberPresence,
            student: value?.data?.studentMemberPresence,
            secretary: value?.data?.secretaryPresence,
            notificationSendingType: value?.data?.AssociationNotificationType?.id,
            sendingMessage: dataPlaceHolder({ data: value?.data?.sendMessage }),
          });
        }
      });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form
      className="committee-session-creation-final-check-session-members-step-container"
      form={memberListForm}
    >
      <div className="border-round-box session-member-item-wrapper">
        <CustomDivider text="اعضای جلسه" />
        <CustomTable
          dataSource={dataSource}
          columns={SessionMembersStepModel({
            from: "finalCheck",
          })}
          loading={isSessionMeetingMembersLoading || isMemberPresentListLoading}
          pagination={false}
          {...TABLE_PROPS(dataSource?.length)}
        />
      </div>
      <div className="border-round-box session-member-item-wrapper">
        <CustomDivider text="اطلاع رسانی" />
        <Div className="notification-inputs-container" loading={isNoticesTypeLoading}>
          <CustomRadioGroup
            name="notificationSendingType"
            label="نوع"
            options={noticesTypeData?.data.map((item) => {
              return {
                label: item?.title,
                value: item?.id,
              };
            })}
            disabled={true}
            hasVerticalLabel={true}
          />
          <CustomTextArea label="پیام ارسالی" name="sendingMessage" disabled={true} />
        </Div>
      </div>
    </Form>
  );
};

export default FinalCheckSessionMembersStep;
