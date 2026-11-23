import { useEffect, useState } from "react";

import { Button, Collapse, Row } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import CustomCard from "../../../../../../../components/CustomCard/CustomCard";
import CustomDivider from "../../../../../../../components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalItem from "../../../../../../../components/Renderers/SingleVerticalItem/SingleVerticalItem";
import useTitle from "../../../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import {
  dataPlaceHolder,
  makeSearchParams,
} from "../../../../../../../infrastructure/helpers/utils";
import { CommitteeInformationInquiryTableModel } from "../../../../../../../infrastructure/models/tableModels/CommitteeTableModel/CommitteeInformationInquiryTableModel/CommitteeInformationInquiryTableModel";
import { COMMITTEE_HISTORY_REQUESTS_CONFIRMER_DETAIL_Reporting_PAGE_ROUTE } from "../../../../../../../infrastructure/router/routes/committee";
import { useGetAllUserWithFirstLastNameMutation } from "../../../../../../../infrastructure/states/redux/Apis/authApi";
import {
  useGetConfirmerDetailCheckInquiryMutation,
  useLazyGetViolationsInquiryRequestQuery,
} from "../../../../../../../infrastructure/states/redux/Apis/committee/history/history";
import { PADDING_20 } from "../../../../../../../infrastructure/VARS/globalStyles/globalStyles";
import {
  User,
  getAllUserWithFirstLastNameResponse,
} from "../../../../IndividualInquiry/InquiryUsersList/@types/@inquiryUsersList";

import "./_information.scss";

const infoHandler = (data: User | undefined) => {
  return [
    {
      label: (
        <div className="accused-info-items-container">
          <SingleVerticalItem
            label="نام"
            value={dataPlaceHolder({ data: data?.firstName })}
          />
          <SingleVerticalItem
            label="نام خانوادگی"
            value={dataPlaceHolder({ data: data?.lastName })}
          />
          <SingleVerticalItem
            label="شماره ملی"
            value={dataPlaceHolder({ data: data?.nationalCode })}
          />
          <SingleVerticalItem
            label="شماره دانشجویی"
            value={dataPlaceHolder({ data: data?.studentNumber })}
          />
        </div>
      ),
      children: (
        <div className="accused-info-items-container">
          {/* <SingleVerticalItem label="دپارتمان" value={dataPlaceHolder({ data: "_" })} />
          <SingleVerticalItem label="سمت" value={dataPlaceHolder({ data: "_" })} />
          <SingleVerticalItem label="سن" value={dataPlaceHolder({ data: "_" })} />
          <SingleVerticalItem label="سال ورود" value={dataPlaceHolder({ data: "_" })} /> */}
          <SingleVerticalItem
            label="رشته"
            value={dataPlaceHolder({ data: data?.fieldName })}
          />
          <SingleVerticalItem
            label="مقطع"
            value={dataPlaceHolder({ data: data?.levelName })}
          />
          {/* <SingleVerticalItem label="معدل" value={dataPlaceHolder({ data: "_" })} />
          <SingleVerticalItem
            label="تعداد واحدهای گذرانده"
            value={dataPlaceHolder({ data: "_" })}
          />
          <SingleVerticalItem
            label="تعداد گزارشات دوره"
            value={dataPlaceHolder({ data: "_" })}
          />
          <SingleVerticalItem
            label="تعداد اتهامات دوره"
            value={dataPlaceHolder({ data: "_" })}
          />
          <SingleVerticalItem
            label="بومی/ غیربومی"
            value={dataPlaceHolder({ data: "_" })}
          /> */}
          <SingleVerticalItem
            label="شماره موبایل"
            value={dataPlaceHolder({ data: data?.mobile })}
          />
        </div>
      ),
    },
  ];
};

const Information = () => {
  useTitle({ text: "مشاهده اطلاعات" });

  const [studentInformation, setStudentInformation] = useState<User | undefined>(
    undefined
  );
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { id, nationalNo } = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  const [getUsers, { isLoading: isGetAllUserLoading }] =
    useGetAllUserWithFirstLastNameMutation();

  const [
    getConfirmerDetailCheckInquiry,
    { data: checkInquiryData, isLoading: isCheckInquiryLoading },
  ] = useGetConfirmerDetailCheckInquiryMutation();

  const [
    getViolationsWithInquiryRequest,
    { data: violationsInquiryRequestData, isLoading: isViolationsInquiryRequestLoading },
  ] = useLazyGetViolationsInquiryRequestQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (nationalNo) {
      getUsers({
        firstName: null,
        lastName: null,
        mobileNo: null,
        nationalNo: nationalNo ? nationalNo : null,
        pageNumber: 0,
        pageSize: 8,
        studentNo: null,
      })
        .unwrap()
        .then(getUserInfoOnSuccess);
      getViolationsWithInquiryRequest(nationalNo);
    }
  }, [nationalNo]);

  useEffect(() => {
    if (id) {
      getConfirmerDetailCheckInquiry({
        _data_: {
          id: id,
        },
      });
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getUserInfoOnSuccess = async (value: getAllUserWithFirstLastNameResponse) => {
    if (value?.status === 200) {
      setStudentInformation(value?.data?.userAdvancedFilterDtos[0]);
    }
  };

  const reportBtnHandler = () => {
    navigate({
      pathname: COMMITTEE_HISTORY_REQUESTS_CONFIRMER_DETAIL_Reporting_PAGE_ROUTE,
      search: makeSearchParams({ id: id, nationalNo: nationalNo }),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-confirmer-request-detail-information">
      <CustomCard
        padding={PADDING_20}
        className="information-request"
        loading={isGetAllUserLoading}
      >
        <CustomDivider text="اطلاعات" />
        <Collapse
          expandIcon={({ isActive }) => (
            <IoIosArrowDown rotate={isActive ? 0 : 180} className="collapse-icon" />
          )}
          ghost
          items={infoHandler(studentInformation)}
        />
      </CustomCard>
      <CustomCard
        padding={PADDING_20}
        className="information-request"
        loading={isCheckInquiryLoading}
      >
        <CustomDivider text="اطلاعات درخواست" />
        <Row gutter={10}>
          <SingleVerticalWithCol
            span={6}
            label="تاریخ ثبت درخواست"
            value={checkInquiryData?.data?.dateRegistration}
            isDate
          />

          <SingleVerticalWithCol
            span={6}
            label="نوع اطلاعات درخواستی"
            value={dataPlaceHolder({
              data: checkInquiryData?.data?.AssociationTypeInformation?.title,
            })}
          />

          <SingleVerticalWithCol
            span={6}
            label="علت ثبت درخواست"
            value={dataPlaceHolder({
              data: checkInquiryData?.data?.AssociationReasoneRequest?.title,
            })}
          />

          <SingleVerticalWithCol
            span={6}
            label="وضعیت"
            value={dataPlaceHolder({
              data: checkInquiryData?.data?.AssociationInquiryRequestStatus?.title,
            })}
          />
        </Row>
        <Row gutter={10}>
          <SingleVerticalWithCol
            span={6}
            label="توضیحات"
            value={dataPlaceHolder({ data: checkInquiryData?.data?.descRequest })}
          />
        </Row>
      </CustomCard>
      <CustomCard
        padding={PADDING_20}
        className="information-request"
        loading={isViolationsInquiryRequestLoading}
      >
        <CustomDivider text="لیست اتهامات" />
        <div>
          <Button
            type="primary"
            ghost
            className="report-btn"
            onClick={reportBtnHandler}
            icon={<AiOutlinePlus />}
          >
            گزارش گیری
          </Button>
        </div>
        <CustomTable
          dataSource={violationsInquiryRequestData?.data}
          columns={CommitteeInformationInquiryTableModel()}
          rowKey="id"
          pagination={false}
          {...TABLE_PROPS(violationsInquiryRequestData?.data?.length || 0)}
        />
      </CustomCard>
    </div>
  );
};

export default Information;
