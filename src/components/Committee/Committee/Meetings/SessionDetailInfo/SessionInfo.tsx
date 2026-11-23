import { useEffect } from "react";

import { useSearchParams } from "react-router";

import { dataPlaceHolder } from "../../../../../infrastructure/helpers/utils";
import { useGetSessionInformationMutation } from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import Div from "../../../../Renderers/Div/Div";
import SingleVerticalItem from "../../../../Renderers/SingleVerticalItem/SingleVerticalItem";
import "./_sessionInfo.scss";

const SessionInfo = () => {
  const [searchParams] = useSearchParams();
  const { session } = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  const [getSessionInfo, { data: sessionInfoData, isLoading: isSessionInfoLoading }] =
    useGetSessionInformationMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (+session > 0) {
      getSessionInfo({
        _data_: {
          id: session,
        },
      });
    }
  }, [session]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      className="committee-session-creation-session-info-tab-container"
      loading={isSessionInfoLoading}
    >
      <SingleVerticalItem
        label="عنوان جلسه"
        value={dataPlaceHolder({
          data: sessionInfoData?.data?.topicMeeting,
        })}
      />
      <SingleVerticalItem
        label="تاریخ جلسه"
        value={dataPlaceHolder({
          data: sessionInfoData?.data?.meetingDate,
          isDate: true,
        })}
      />
      <SingleVerticalItem
        label="ساعت شروع"
        value={dataPlaceHolder({
          data: sessionInfoData?.data?.meetingTime,
          isTime: true,
        })}
      />
      <SingleVerticalItem
        label="ساعت پایان"
        value={dataPlaceHolder({
          data: sessionInfoData?.data?.meetingEndTime,
          isTime: true,
        })}
      />
      <SingleVerticalItem
        label="مکان جلسه"
        value={dataPlaceHolder({
          data: sessionInfoData?.data?.AssociationMeetingPlace?.title,
        })}
      />
      <SingleVerticalItem
        label="دبیر جلسه"
        value={dataPlaceHolder({
          data: sessionInfoData?.data?.AssociationPersonnel?.title,
        })}
      />
      <div className="desc-wrapper">
        <SingleVerticalItem
          label="توضیحات"
          value={dataPlaceHolder({
            data: sessionInfoData?.data?.desc,
          })}
        />
      </div>
    </Div>
  );
};
export default SessionInfo;
