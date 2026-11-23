import { useEffect, useState } from "react";

import { Col, Form, Row, Tabs } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import {
  IconArrowsLeftRight,
  IconHourglass,
  IconListChecks,
} from "@components/icons/icons";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import DemandCard from "@components/Renderers/DemandCard/DemandCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useGetDemandListByStatusAndSemesterMutation,
  useLazyGetAllActiveSemestersQuery,
} from "@infra/states/redux/Apis/international/request/requestApi";

import {
  AllActiveSemestersType,
  GetAllActiveSemestersResponse,
  GetDemandListByStatusAndSemesterResponse,
} from "./@types/@demandsList";
import DemandArchiveList from "./helper/components/ArchiveList/DemandArchiveList";
import DemandNeedEditList from "./helper/components/NeedEditList/DemandNeedEditList";
import DemandPendingList from "./helper/components/PendingList/DemandPendingList";
import { DEMAND_IDS } from "./utils/demandConstants";
import "./_demandsList.scss";

const Demands = () => {
  const [semesterList, setSemesterList] = useState<AllActiveSemestersType[]>([]);
  const [activeSemester, setActiveSemester] = useState<number | null>(null);
  const [data, setData] = useState<GetDemandListByStatusAndSemesterResponse | null>(null);

  const {
    params: {
      status = DEMAND_IDS.pending,
      type = DEMAND_IDS.confirmArchive,
      page,
      pageSize,
    },
    setSearchParams,
  } = useQueryParams();

  const [form] = Form.useForm();

  useTitle({ text: "درخواست‌ها/تقاضا" });

  //? ================================  Api Calls ================================
  const [getActiveSemesterList, { isFetching: isActiveSemesterListLoading }] =
    useLazyGetAllActiveSemestersQuery();

  const [getDemandList, { isLoading: isDemandListLoading }] =
    useGetDemandListByStatusAndSemesterMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getActiveSemesterList().unwrap().then(onGetActiveSemesterListSuccess);
  }, []);

  useEffect(() => {
    if (activeSemester) {
      getDemandList({
        paginationRequest: {
          pageNo: page ? Number(page) - 1 : 0,
          pageSize: pageSize ? +pageSize : 8,
        },
        semesterId: activeSemester,
        statusId: +status,
      })
        .unwrap()
        .then(onGetDemandListSuccess);
    }
  }, [page, pageSize, status, activeSemester]);

  //* ================================ Util Functions ================================
  const archiveItems = [
    {
      label: "تایید شده ها",
      key: "6",
      children: (
        <DemandArchiveList data={data} loading={isDemandListLoading} status={status} />
      ),
    },
    {
      label: "رد شده ها",
      key: "1",
      children: (
        <DemandArchiveList data={data} loading={isDemandListLoading} status={status} />
      ),
    },
    // todo[Atefeh]: uncomment when api got ready
    // {
    //   label: "منقضی شده ها",
    //   key: "1",
    //   children: `Content of Tab Pane ${1}`,
    // },
  ];

  const onGetActiveSemesterListSuccess = (value: GetAllActiveSemestersResponse) => {
    setSemesterList(value);
    setActiveSemester(value?.[0]?.id);
    form.setFieldsValue({
      semester: selectDefaultValueGenerator(value?.[0]),
    });
  };

  const onGetDemandListSuccess = (value: GetDemandListByStatusAndSemesterResponse) => {
    setData(value);
  };

  const changeSemesterHandler = (semesterId: number) => {
    setActiveSemester(semesterId);
  };

  const changeCardHandler = (status: string) => {
    setSearchParams({ status: status });
  };

  const changeTabHandler = (status: string) => {
    setSearchParams({ status });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="international-demand-list-page-container">
      <Form form={form}>
        <Row>
          <Col span={12}>
            <CustomSelect
              form={form}
              options={semesterList}
              name="semester"
              label="ترم تحصیلی"
              onChange={(e) => changeSemesterHandler(e as number)}
              loading={isActiveSemesterListLoading}
            />
          </Col>
        </Row>
      </Form>
      <Row gutter={[16, 16]} className="demand-card-container">
        <Col lg={8} sm={12} xs={24}>
          <DemandCard
            title="در انتظار بررسی"
            Icon={IconHourglass}
            active={status === DEMAND_IDS.pending}
            clickHandler={() => changeCardHandler(DEMAND_IDS.pending)}
          />
        </Col>
        <Col lg={8} sm={12} xs={24}>
          <DemandCard
            title="نیازمند اصلاحات"
            Icon={IconArrowsLeftRight}
            active={status === DEMAND_IDS.needEdit}
            clickHandler={() => changeCardHandler(DEMAND_IDS.needEdit)}
          />
        </Col>
        <Col lg={8} sm={12} xs={24}>
          <DemandCard
            title="آرشیو"
            Icon={IconListChecks}
            active={
              status === DEMAND_IDS.confirmArchive || status === DEMAND_IDS.rejectArchive
            }
            clickHandler={() => changeCardHandler(DEMAND_IDS.confirmArchive)}
          />
        </Col>
      </Row>
      <div className="demand-table-container">
        <CustomDivider text="لیست درخواست‌ها" />
        {status === DEMAND_IDS.pending && (
          <DemandPendingList data={data} loading={isDemandListLoading} />
        )}
        {status === DEMAND_IDS.needEdit && (
          <DemandNeedEditList data={data} loading={isDemandListLoading} />
        )}
        {(status === DEMAND_IDS.rejectArchive ||
          status === DEMAND_IDS.confirmArchive) && (
          <Tabs
            defaultActiveKey={type === DEMAND_IDS.confirmArchive ? "0" : "1"}
            centered
            onChange={(key) => changeTabHandler(key)}
            items={archiveItems}
            className="international-demand-tabs-container"
          />
        )}
      </div>
    </div>
  );
};

export default Demands;
