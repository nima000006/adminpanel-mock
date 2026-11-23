import { useEffect, useState } from "react";

import { Button, Collapse } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import CustomCard from "../../../../../components/CustomCard/CustomCard";
import CustomDivider from "../../../../../components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalItem from "../../../../../components/Renderers/SingleVerticalItem/SingleVerticalItem";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import {
  makeSearchParams,
  dataPlaceHolder,
} from "../../../../../infrastructure/helpers/utils";
import { InquiryUserInformationListModel } from "../../../../../infrastructure/models/tableModels/CommitteeTableModel/Inquiry/InquiryUserInformationList/InquiryUserInformationList";
import { COMMITTEE_INQUIRY_USER_REPORT_PAGE_ROUTE } from "../../../../../infrastructure/router/routes/committee";
import { useGetAllUserWithFirstLastNameMutation } from "../../../../../infrastructure/states/redux/Apis/authApi";
import { useLazyGetInquiryAccusationListQuery } from "../../../../../infrastructure/states/redux/Apis/committee/inquiry/inquiry";
import {
  User,
  getAllUserWithFirstLastNameResponse,
} from "../InquiryUsersList/@types/@inquiryUsersList";
import "./_inquiryUserInformation.scss";

//! Component to show plaintiff and accused information
const infoHandler = (data: User | null) => {
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

const InquiryUserInformation = () => {
  const [complainantInformation, setComplainantInformation] = useState<User | null>(null);
  useTitle({ text: "مشاهده اطلاعات" });
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const { nationalCode } = Object.fromEntries([...searchParams]);

  const [getUsers] = useGetAllUserWithFirstLastNameMutation();

  //? ================================  Api Calls ================================
  const [
    getInquiryAccusationList,
    { data: inquiryAccusationListData, isLoading: isInquiryAccusationListLoading },
  ] = useLazyGetInquiryAccusationListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (nationalCode) {
      getUsers({
        firstName: null,
        lastName: null,
        mobileNo: null,
        nationalNo: nationalCode ? nationalCode : null,
        pageNumber: 0,
        pageSize: 8,
        studentNo: null,
      })
        .unwrap()
        .then(getUserInfoOnSuccess);
      getInquiryAccusationList(nationalCode);
    }
  }, [nationalCode]);

  //* ================================ Util Functions ================================
  const getUserInfoOnSuccess = async (value: getAllUserWithFirstLastNameResponse) => {
    if (value?.status === 200) {
      setComplainantInformation(value?.data?.userAdvancedFilterDtos[0]);
    }
  };
  // todo[atefeh]:use id to go to "committee-accusation-case" page if the admin has access
  const onCheckClickHandler = () => {};

  const getReport = () => {
    if (nationalCode) {
      navigate({
        pathname: COMMITTEE_INQUIRY_USER_REPORT_PAGE_ROUTE,
        search: makeSearchParams({ nationalCode }),
      });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="inquiry-user-information-page-container">
      <CustomCard>
        <CustomDivider text="اطلاعات" />
        <Collapse
          expandIcon={({ isActive }) => (
            <IoIosArrowDown rotate={isActive ? 0 : 180} className="collapse-icon" />
          )}
          ghost
          items={infoHandler(complainantInformation)}
        />
      </CustomCard>
      <CustomCard className="list-container">
        <CustomDivider
          text="لیست اتهامات"
          extraContent={
            <Button
              type="primary"
              className="return-to-report-btn"
              icon={<AiOutlinePlus />}
              ghost
              onClick={getReport}
            >
              گزارش گیری
            </Button>
          }
        />
        <CustomTable
          dataSource={inquiryAccusationListData?.data}
          columns={InquiryUserInformationListModel({
            onCheckClickHandler,
          })}
          loading={isInquiryAccusationListLoading}
          pagination={false}
          rowKey="id"
          {...TABLE_PROPS(inquiryAccusationListData?.data.length || 0)}
        />
      </CustomCard>
    </div>
  );
};

export default InquiryUserInformation;
