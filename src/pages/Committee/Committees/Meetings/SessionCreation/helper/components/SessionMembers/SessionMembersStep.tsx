import { useEffect, useState } from "react";

import { Button, Form } from "antd";
import { useSearchParams } from "react-router";

import CustomRadioGroup from "@components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { dataPlaceHolder } from "@infra/helpers/utils";
import {
  SessionCreationDataSource,
  SessionCreationMembersType,
} from "@infra/models/modules/committee/committees/sessions/sessions";
import { SessionMembersStepModel } from "@infra/models/tableModels/CommitteeTableModel/SessionCreation/SessionMembersStepModal";
import {
  useGetMemberMeetingMutation,
  useLazyGetNoticesQuery,
  useLazyGetSessionMeetingMembersQuery,
  useSendSessionMeetingMembersMutation,
} from "@infra/states/redux/Apis/committee/committees/committees";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import {
  GetMemberMeetingResponse,
  GetSessionMeetingMembersResponse,
  SendSessionMeetingMembersResponse,
  SessionMembersStepProps,
} from "./@types/@sessionMembersStep";
import "./_sessionMembersStep.scss";

const SessionMembersStep = ({ setCurrent }: SessionMembersStepProps) => {
  const [dataSource, setDataSource] = useState<[] | SessionCreationDataSource[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);

  const [memberListForm] = Form.useForm();

  //? ================================  Api Calls ================================
  const [getSessionMeetingMembers, { isLoading: isSessionMeetingMembersLoading }] =
    useLazyGetSessionMeetingMembersQuery();

  // present and absent list
  const [getMemberPresentList, { isLoading: isMemberPresentListLoading }] =
    useGetMemberMeetingMutation();

  const [getNoticesType, { data: noticesTypeData, isLoading: isNoticesTypeLoading }] =
    useLazyGetNoticesQuery();

  // send
  const [sendSessionMeetingMembers, { isLoading: isSendSessionMeetingLoading }] =
    useSendSessionMeetingMembersMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getSessionMeetingMembers().unwrap().then(getSessionMeetingMembersOnSuccess);
    getNoticesType({ firstResult: 0, maxResults: 8 });
  }, []);

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
            radioType: value?.data?.AssociationNotificationType?.id,
            sendingMessage: dataPlaceHolder({ data: value?.data?.sendMessage }),
          });
        }
      });
  };

  const backBtnHandler = () => {
    setCurrent((prev) => (prev > 1 ? prev - 1 : 0));
    setSearchParams({
      id: id,
      step: "1",
    });
  };

  const sessionMembersHandler = (event: SessionCreationMembersType) => {
    if (id) {
      sendSessionMeetingMembers({
        form: "MemberMeeting",
        id: "f3766ddc5fa243d98886a8566d48edbd",
        _data_: {
          chairmanPresence: event?.boss,
          CulturalMemberPresence: event?.cultural,
          legalMemberPresence: event?.legal,
          facultyMemberPresence: event?.academic,
          studentMemberPresence: event?.student,
          secretaryPresence: event?.secretary,
          notificationType: event?.radioType,
          sendMessage: event?.sendingMessage,
          id: +id,
        },
      })
        .unwrap()
        .then(sendSessionMeetingMembersOnSuccess);
    }
  };
  const sendSessionMeetingMembersOnSuccess = (
    value: SendSessionMeetingMembersResponse
  ) => {
    if (value?.status === 200) {
      setCurrent((prev) => (prev < 3 ? prev + 1 : 3));
      setSearchParams({
        id: value?.data?.id?.toString(),
        step: "3",
      });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form
      className="committee-session-creation-session-members-step-container"
      onFinish={sessionMembersHandler}
      form={memberListForm}
    >
      <div className="border-round-box session-member-item-wrapper">
        <CustomDivider text="اعضای جلسه" />
        <CustomTable
          dataSource={dataSource}
          columns={SessionMembersStepModel({})}
          pagination={false}
          {...TABLE_PROPS(dataSource?.length)}
          loading={isSessionMeetingMembersLoading || isMemberPresentListLoading}
        />
      </div>
      <div className="border-round-box session-member-item-wrapper">
        <CustomDivider text="اطلاع رسانی" />
        <Div className="notification-inputs-container" loading={isNoticesTypeLoading}>
          <CustomRadioGroup
            name="radioType"
            label="نوع"
            options={noticesTypeData?.data.map((item: any) => {
              return {
                label: item?.title,
                value: item?.id,
              };
            })}
            rules={[REQUIRED_RULE]}
          />
          <CustomTextArea
            label="پیام ارسالی"
            placeholder="پیام ارسالی"
            name="sendingMessage"
            rules={[REQUIRED_RULE]}
            hasVerticalLabel={true}
          />
        </Div>
      </div>
      <div className="buttons-container">
        <Button className="back-btn" onClick={backBtnHandler}>
          برگشت
        </Button>
        <Button type="primary" htmlType="submit" loading={isSendSessionMeetingLoading}>
          بعدی
        </Button>
      </div>
    </Form>
  );
};

export default SessionMembersStep;
