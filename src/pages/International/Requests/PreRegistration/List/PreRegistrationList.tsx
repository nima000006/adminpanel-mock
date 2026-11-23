import { Col, Form, Row, Tabs } from "antd";
import {
  PiArrowsLeftRightLight,
  PiHourglassSimpleHigh,
  PiListChecksLight,
} from "react-icons/pi";

import CustomRangePicker from "@components/CustomInputs/CustomRangePicker/CustomRangePicker";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";

import PreRegistrationCard from "./helper/components/PreRegistrationCard/PreRegistrationCard";
import PreRegistrationConfirmArchiveList from "./helper/components/PreRegistrationConfirmArchiveList/PreRegistrationConfirmArchiveList";
import PreRegistrationEditList from "./helper/components/PreRegistrationEditList/PreRegistrationEditList";
import PreRegistrationExpireArchiveList from "./helper/components/PreRegistrationExpireArchiveList/PreRegistrationExpireArchiveList";
import PreRegistrationPendingList from "./helper/components/PreRegistrationPendingList/PreRegistrationPendingList";
import PreRegistrationRejectArchiveList from "./helper/components/PreRegistrationRejectArchiveList/PreRegistrationRejectArchiveList";
import { PRE_REGISTRATION_IDS } from "./helper/utils/preRegistrationListUtils";
import "./_preRegistrationList.scss";

const semesterList = [
  {
    id: 1,
    title: "ترم یک",
  },
  { id: 2, title: "ترم دو" },
];

const mockData = [
  {
    id: 1,
    requestNumber: "REQ-10249",
    requestDate: "1403/08/10",
    requestType: "4",
    saorgCode: "12365",
    requestField: "مهندسی کامپیوتر",
    requestDegree: "کارشناسی پیوسته",
    requestUnit: "تهران شمال",
    requestSemester: "نیم سال اول 1403 -1404",
    enFirstName: "Noah",
    enLastName: "Garcia",
    genderType: 2,
    birthDate: "1373/10/07",
    nationality: "اسپانیا",
    citizenship: "اسپانیا",
    resident: "اسپانیا",
    passportNo: "P5098342",
    identificationNumber: "12325",
  },
  {
    id: 2,
    requestNumber: "REQ-10249",
    requestDate: "1403/08/10",
    requestType: "5",
    saorgCode: "12365",
    requestField: "مهندسی کامپیوتر",
    requestDegree: "کارشناسی پیوسته",
    requestUnit: "تهران شمال",
    requestSemester: "نیم سال اول 1403 -1404",
    enFirstName: "Noah",
    enLastName: "Garcia",
    genderType: 2,
    birthDate: "1373/10/07",
    nationality: "اسپانیا",
    citizenship: "اسپانیا",
    resident: "اسپانیا",
    passportNo: "P5098342",
    identificationNumber: "12325",
  },
  {
    id: 3,
    requestNumber: "REQ-10249",
    requestDate: "1403/08/10",
    requestType: "5",
    saorgCode: "12365",
    requestField: "مهندسی کامپیوتر",
    requestDegree: "کارشناسی پیوسته",
    requestUnit: "تهران شمال",
    requestSemester: "نیم سال اول 1403 -1404",
    enFirstName: "Noah",
    enLastName: "Garcia",
    genderType: 2,
    birthDate: "1373/10/07",
    nationality: "اسپانیا",
    citizenship: "اسپانیا",
    resident: "اسپانیا",
    passportNo: "P5098342",
    identificationNumber: "12325",
  },
  {
    id: 4,
    requestNumber: "REQ-10249",
    requestDate: "1403/08/10",
    requestType: "4",
    saorgCode: "12365",
    requestField: "مهندسی کامپیوتر",
    requestDegree: "کارشناسی پیوسته",
    requestUnit: "تهران شمال",
    requestSemester: "نیم سال اول 1403 -1404",
    enFirstName: "Noah",
    enLastName: "Garcia",
    genderType: 2,
    birthDate: "1373/10/07",
    nationality: "اسپانیا",
    citizenship: "اسپانیا",
    resident: "اسپانیا",
    passportNo: "P5098342",
    identificationNumber: "12325",
  },
  {
    id: 5,
    requestNumber: "REQ-10249",
    requestDate: "1403/08/10",
    requestType: "4",
    saorgCode: "12365",
    requestField: "مهندسی کامپیوتر",
    requestDegree: "کارشناسی پیوسته",
    requestUnit: "تهران شمال",
    requestSemester: "نیم سال اول 1403 -1404",
    enFirstName: "Noah",
    enLastName: "Garcia",
    genderType: 1,
    birthDate: "1373/10/07",
    nationality: "اسپانیا",
    citizenship: "اسپانیا",
    resident: "اسپانیا",
    passportNo: "P5098342",
    identificationNumber: "12325",
  },
];

const PreRegistrationList = () => {
  const {
    params: {
      status = PRE_REGISTRATION_IDS.pending,
      type = PRE_REGISTRATION_IDS.confirmArchive,
    },
    setSearchParams,
  } = useQueryParams();

  const [form] = Form.useForm();
  useTitle({ text: "درخواست‌ها/پیش ثبت نام" });

  //* ================================ Util Functions ================================
  const archiveItems = [
    {
      label: `تایید شده ها (${mockData.length})`,
      key: PRE_REGISTRATION_IDS.confirmArchive,
      children: <PreRegistrationConfirmArchiveList data={mockData} />,
    },
    {
      label: `رد شده ها (${mockData.length})`,
      key: PRE_REGISTRATION_IDS.rejectArchive,
      children: <PreRegistrationRejectArchiveList data={mockData} />,
    },
    {
      label: `منقضی شده ها (${mockData.length})`,
      key: PRE_REGISTRATION_IDS.expiredArchive,
      children: <PreRegistrationExpireArchiveList data={mockData} />,
    },
  ];

  const changeSemesterHandler = () => {};
  const handleDateChange = () => {};

  const changeCardHandler = (status: string) => {
    setSearchParams({ status: status });
  };

  const changeTabHandler = (status: string) => {
    setSearchParams({ status });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="international-pre-registration-list-container">
      <Form form={form}>
        <Row gutter={[12, 12]}>
          <Col lg={12} sm={12} xs={24}>
            <CustomSelect
              form={form}
              options={semesterList}
              name="semester"
              label="ترم تحصیلی"
              onChange={() => changeSemesterHandler()}
              // loading={}
            />
          </Col>
          <Col lg={12} sm={12} xs={24}>
            <CustomRangePicker
              className="custom-range-picker"
              name="dateOfJoin"
              picker="date"
              label="تاریخ"
              onChange={handleDateChange}
            />
          </Col>
        </Row>
      </Form>
      <div className="pre-registration-card-container">
        <PreRegistrationCard
          title="در انتظار بررسی"
          Icon={PiHourglassSimpleHigh}
          active={status === PRE_REGISTRATION_IDS.pending}
          clickHandler={() => changeCardHandler(PRE_REGISTRATION_IDS.pending)}
        />
        <PreRegistrationCard
          title="نیازمند اصلاحات"
          Icon={PiArrowsLeftRightLight}
          active={status === PRE_REGISTRATION_IDS.needEdit}
          clickHandler={() => changeCardHandler(PRE_REGISTRATION_IDS.needEdit)}
        />
        <PreRegistrationCard
          title="آرشیو"
          Icon={PiListChecksLight}
          active={
            status === PRE_REGISTRATION_IDS.confirmArchive ||
            status === PRE_REGISTRATION_IDS.rejectArchive ||
            status === PRE_REGISTRATION_IDS.expiredArchive
          }
          clickHandler={() => changeCardHandler(PRE_REGISTRATION_IDS.confirmArchive)}
        />
      </div>
      <div className="pre-registration-table-container">
        <CustomDivider text="لیست درخواست‌ها" />
        {status === PRE_REGISTRATION_IDS.pending && (
          <PreRegistrationPendingList data={mockData} />
        )}
        {status === PRE_REGISTRATION_IDS.needEdit && (
          <PreRegistrationEditList data={mockData} />
        )}
        {(status === PRE_REGISTRATION_IDS.rejectArchive ||
          status === PRE_REGISTRATION_IDS.confirmArchive ||
          status === PRE_REGISTRATION_IDS.expiredArchive) && (
          <Tabs
            defaultActiveKey={
              type === PRE_REGISTRATION_IDS.confirmArchive
                ? "0"
                : type === PRE_REGISTRATION_IDS.rejectArchive
                  ? "1"
                  : "3"
            }
            centered
            onChange={(key) => changeTabHandler(key)}
            items={archiveItems}
            className="international-pre-registration-tabs-container"
          />
        )}
      </div>
    </div>
  );
};

export default PreRegistrationList;
