import { useEffect, useState } from "react";

import { Col, Form, Row, Tabs } from "antd";
import moment from "jalali-moment";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomRangePicker from "@components/CustomInputs/CustomRangePicker/CustomRangePicker";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import {
  IconHourglass,
  IconListChecks,
  IconMicrophoneStage,
} from "@components/icons/icons";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useGetInterviewListByStatusMutation,
  useLazyGetAllActiveSemestersQuery,
} from "@infra/states/redux/Apis/international/request/requestApi";

import {
  AllActiveSemestersType,
  GetAllActiveSemestersResponse,
  GetInterviewListByStatusResponse,
} from "./@types/@interviewList";
import InterviewArchiveList from "./helper/components/ArchiveList/InterviewArchiveList";
import InterviewCard from "./helper/components/InterviewCard/InterviewCard";
import PendingHold from "./helper/components/PendingHold/PendingHold";
import PendingResult from "./helper/components/PendingResult/PendingResult";
import { INTERVIEW_IDS } from "./utils/interviewConstants";
import "./_interviewList.scss";

const InterviewList = () => {
  const [semesterList, setSemesterList] = useState<AllActiveSemestersType[]>([]);
  const [activeSemester, setActiveSemester] = useState<number | null>(null);

  const [pendingHoldData, setPendingHoldData] =
    useState<GetInterviewListByStatusResponse | null>(null);
  const [pendingResultData, setPendingResultData] =
    useState<GetInterviewListByStatusResponse | null>(null);
  const [archiveConfirmData, setArchiveConfirmData] =
    useState<GetInterviewListByStatusResponse | null>(null);
  const [archiveRejectData, setArchiveRejectData] =
    useState<GetInterviewListByStatusResponse | null>(null);

  const [interviewDate, setInterviewDate] = useState<null | string>(null);
  const [range, setRange] = useState<{ from: string | null; to: string | null }>({
    from: null,
    to: null,
  });

  const [form] = Form.useForm();

  const {
    params: {
      status = INTERVIEW_IDS.pendingHold,
      type = INTERVIEW_IDS.confirmArchive,
      page,
      pageSize,
    },
    setSearchParams,
  } = useQueryParams();

  useTitle({ text: "درخواست‌ها/مصاحبه" });

  //? ================================  Api Calls ================================
  const [getActiveSemesterList, { isFetching: isActiveSemesterListLoading }] =
    useLazyGetAllActiveSemestersQuery();

  const [getInterviewList, { isLoading: isInterviewListLoading }] =
    useGetInterviewListByStatusMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getActiveSemesterList().unwrap().then(onGetActiveSemesterListSuccess);
  }, []);

  useEffect(() => {
    if (activeSemester) {
      getInterviewList({
        interviewDate: interviewDate ? interviewDate : null,
        from: range.from ? range.from : null,
        pageNo: page ? Number(page) - 1 : 0,
        pageSize: pageSize ? +pageSize : 8,
        semesterId: activeSemester,
        status: +status,
        to: range.to ? range.to : null,
      })
        .unwrap()
        .then(onGetInterviewListSuccess);
    }
  }, [page, pageSize, status, activeSemester, interviewDate, range]);

  //* ================================ Util Functions ================================
  const archiveItems = [
    {
      label: `تایید شده ها (${archiveConfirmData?.totalElements})`,
      key: "2",
      children: (
        <InterviewArchiveList
          data={archiveConfirmData}
          loading={isInterviewListLoading}
          status={status}
        />
      ),
    },
    {
      label: `رد شده ها (${archiveRejectData?.totalElements})`,
      key: "3",
      children: (
        <InterviewArchiveList
          data={archiveRejectData}
          loading={isInterviewListLoading}
          status={status}
        />
      ),
    },
  ];

  //success
  const onGetActiveSemesterListSuccess = (value: GetAllActiveSemestersResponse) => {
    setSemesterList(value);
    setActiveSemester(value?.[0]?.id);
    form.setFieldsValue({
      semester: selectDefaultValueGenerator(value?.[0]),
    });
  };

  const onGetInterviewListSuccess = (value: GetInterviewListByStatusResponse) => {
    if (+status === 0) {
      setPendingHoldData(value);
    }
    if (+status === 1) {
      setPendingResultData(value);
    }
    if (+status === 2) {
      setArchiveConfirmData(value);
    }
    if (+status === 3) {
      setArchiveRejectData(value);
    }
  };

  const changeSemesterHandler = (semesterId: number) => {
    setActiveSemester(semesterId);
  };

  const changeCardHandler = (status: string) => {
    setSearchParams({ status: status });
    setInterviewDate(null);
    setRange({
      from: null,
      to: null,
    });
  };

  const changeTabHandler = (status: string) => {
    setSearchParams({ status });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="interview-list-container flex flex-col gap-10">
      <div className="grid grid-cols-3 gap-4 max-[630px]:grid-cols-1">
        <InterviewCard
          title="در انتظار برگزاری"
          Icon={IconMicrophoneStage}
          count
          countTitle={pendingHoldData?.totalElements}
          active={status === INTERVIEW_IDS.pendingHold}
          clickHandler={() => changeCardHandler(INTERVIEW_IDS.pendingHold)}
        />
        <InterviewCard
          title="در انتظار اعلام نتیجه"
          Icon={IconHourglass}
          count
          countTitle={pendingResultData?.totalElements}
          active={status === INTERVIEW_IDS.pendingResult}
          clickHandler={() => changeCardHandler(INTERVIEW_IDS.pendingResult)}
        />
        <InterviewCard
          title="آرشیو"
          Icon={IconListChecks}
          count
          countTitle={
            (archiveConfirmData?.totalElements ?? 0) +
            (archiveRejectData?.totalElements ?? 0)
          }
          active={
            status === INTERVIEW_IDS.confirmArchive ||
            status === INTERVIEW_IDS.rejectArchive
          }
          clickHandler={() => changeCardHandler(INTERVIEW_IDS.confirmArchive)}
        />
      </div>

      <Form form={form}>
        <Row gutter={16}>
          <Col lg={12} sm={12} xs={24}>
            <CustomSelect
              options={semesterList}
              name="semester"
              label="ترم تحصیلی"
              loading={isActiveSemesterListLoading}
              onChange={(e) => changeSemesterHandler(e as number)}
            />
          </Col>
          <Col lg={12} sm={12} xs={24}>
            {status === INTERVIEW_IDS.pendingHold ? (
              <CustomDatePicker
                label="تاریخ "
                placeholder="انتخاب کنید"
                name="datePicker"
                onChange={(_, dateString: any) => {
                  if (!dateString) {
                    setInterviewDate(null);
                    return;
                  }
                  const momentDate = moment
                    .from(dateString, "fa", "YYYY-MM-DD")
                    .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
                  setInterviewDate(momentDate);
                }}
              />
            ) : (
              <CustomRangePicker
                label="تاریخ"
                name="rangePicker"
                picker="date"
                onChange={(_: any, dates: any) => {
                  if (dates) {
                    const [fromDate, toDate] = dates;
                    const formattedFromDate = moment
                      .from(fromDate, "fa", "YYYY-MM-DD")
                      .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
                    const formattedToDate = moment
                      .from(toDate, "fa", "YYYY-MM-DD")
                      .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

                    setRange({
                      from: formattedFromDate,
                      to: formattedToDate,
                    });
                  }
                }}
              />
            )}
          </Col>
        </Row>
      </Form>

      <div className="flex flex-col gap-4">
        {status === INTERVIEW_IDS.pendingHold && (
          <PendingHold data={pendingHoldData} loading={isInterviewListLoading} />
        )}
        {status === INTERVIEW_IDS.pendingResult && (
          <PendingResult data={pendingResultData} loading={isInterviewListLoading} />
        )}
        {(status === INTERVIEW_IDS.rejectArchive ||
          status === INTERVIEW_IDS.confirmArchive) && (
          <div>
            <CustomDivider text="آرشیو مصاحبه‌ها" />
            <Tabs
              defaultActiveKey={type === INTERVIEW_IDS.confirmArchive ? "0" : "1"}
              centered
              onChange={(key) => changeTabHandler(key)}
              items={archiveItems}
              className="font-[DanaFaNum]"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewList;
