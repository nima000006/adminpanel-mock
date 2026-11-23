import { useEffect, useState } from "react";

import { Form } from "antd";
import { useSearchParams } from "react-router";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import {
  GetMemberMeetingResponse,
  GetSessionMeetingMembersResponse,
} from "@pages/Committee/Committees/Meetings/SessionCreation/helper/components/SessionMembers/@types/@sessionMembersStep";

import { DataSource } from "./@types/@members";
import paginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { SessionMembersModel } from "../../../../../infrastructure/models/tableModels/CommitteeTableModel/SessionDetails/SessionMembers/SessionMembersModel";
import {
  useGetMemberMeetingMutation,
  useLazyGetSessionMeetingMembersQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import CustomDivider from "../../../../Renderers/CustomDivider/CustomDivider";
import "./_members.scss";

const Members = () => {
  const [dataSource, setDataSource] = useState<[] | DataSource[]>([]);
  const [searchParams] = useSearchParams();
  const { session } = Object.fromEntries([...searchParams]);

  const [memberListForm] = Form.useForm();

  //? ================================  Api Calls ================================
  // meeting member
  const [getSessionMeetingMembers, { isLoading: isSessionMeetingMembersLoading }] =
    useLazyGetSessionMeetingMembersQuery();

  // present and absent list
  const [getMemberPresentList, { isLoading: isMemberPresentListLoading }] =
    useGetMemberMeetingMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getSessionMeetingMembers().unwrap().then(getSessionMeetingMembersOnSuccess);
  }, [session]);

  //* ================================ Util Functions ================================
  const getSessionMeetingMembersOnSuccess = async (
    value: GetSessionMeetingMembersResponse
  ) => {
    setDataSource(value?.data);

    getMemberPresentList({
      _data_: {
        id: session,
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
          });
        }
      });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="session-details-members-container">
      <CustomDivider text="اعضای اصلی جلسه" />
      <Form form={memberListForm}>
        <CustomTable
          dataSource={dataSource}
          columns={SessionMembersModel}
          pagination={paginationConfig}
          {...TABLE_PROPS(dataSource?.length)}
          loading={isSessionMeetingMembersLoading || isMemberPresentListLoading}
          className="committee-members-table"
        />
      </Form>
    </div>
  );
};
export default Members;
