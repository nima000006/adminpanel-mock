import { useEffect, useState } from "react";

import { Row } from "antd";
import { AiOutlineExclamationCircle } from "react-icons/ai";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { useLazyGetTariffBasicInfoCopyDetailQuery } from "@infra/states/redux/Apis/dorm/planning/tariff/dormTariffApi";
import {
  dateTimeCombiner,
  dormVisibilityStatusColor,
} from "@pages/Dorm/_shared/utils/DormUtils";
import {
  GetTariffBasicInfoCopyDetailResponse,
  GetTariffBasicInfoDetailData,
} from "@pages/Dorm/Planning/Tariff/TariffDetail/TariffDetailActiveTab/helpers/TariffBasicInfoTab/@types/@tariffBasicInfoTab";

import { UsersRequestsDetailTariffDetailDrawerContentProps } from "./@types/@usersRequestsDetailTariffDetailDrawerContent";
import UsersRequestsDetailTariffDrawerTableModel from "./helper/drawers/UsersRequestsDetailTariffDrawerTableModel/UsersRequestsDetailTariffDrawerTableModel";

import "./_usersRequestsDetailTariffDetailDrawerContent.scss";

const UsersRequestsDetailTariffDetailDrawerContent = ({
  closeDrawerHandler,
  id,
  dataSource,
  admissionTariffData,
}: UsersRequestsDetailTariffDetailDrawerContentProps) => {
  const [tariffData, setTariffData] = useState<GetTariffBasicInfoDetailData | null>(null);

  //? ================================  Api Calls ================================
  const [getTariffInfo, { isFetching: isTariffInfoLoading }] =
    useLazyGetTariffBasicInfoCopyDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getTariffInfo({ id_EQ: id, firstResult: 0, maxResults: 50 }) // we should set 0 and 50 as default
        .unwrap()
        .then(getTariffInfoSuccess);
    }
  }, [id]);

  const getTariffInfoSuccess = async (value: GetTariffBasicInfoCopyDetailResponse) => {
    if (value?.status === 200) {
      setTariffData(value?.data?.[0]);
    }
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

  return (
    <Div loading={isTariffInfoLoading}>
      <CustomDrawerHeader
        title="جزئیات تعرفه"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <CustomTag color={dormVisibilityStatusColor[tariffData?.recordStatus || 0]}>
            {tariffData?.AssociationCategoryRecordStatus_title}
          </CustomTag>
        }
      />
      <div className="users-requests-detail-tariff-drawer-content-container">
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            span={24}
            label="عنوان تعرفه"
            value={tariffData?.title}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="شناسه تعرفه"
            value={tariffData?.id?.toString()}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="واحد دانشگاهی"
            value={tariffData?.AssociationBranchid_title}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="اقامتگاه"
            value={tariffData?.AssociationDormitory_title}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="واحد پول"
            value={tariffData?.AssociationCurrencyId_title}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="مالیات"
            value={`${tariffData?.tax?.toString()} %`}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="عوارض"
            value={`${tariffData?.toll?.toString()} %`}
          />
          <SingleVerticalWithCol
            span={24}
            label="توضیحات"
            value={tariffData?.description}
          />
        </Row>
        <Row
          gutter={[16, 16]}
          className="users-requests-detail-admission-time-type-container"
        >
          <SingleVerticalWithCol
            lg={6}
            md={12}
            label={
              <div className="users-requests-detail-admission-time-type-field">
                نوع زمان بندی
                <CustomTooltip title="بازه زمانی مورد نظر برای اسکان دانشجویان می‌تواند بر اساس مدت‌زمان ترم (ترمیک)، ماه (ماهیانه) یا روز (روزانه) تعیین شود.">
                  <AiOutlineExclamationCircle className="users-requests-detail-admission-time-type-icon" />
                </CustomTooltip>
              </div>
            }
            value={
              admissionTariffData?.AssociationCategoryDeliverPlan
                ?.AssociationCategorySchedulingType?.title
            }
          />
          <SingleVerticalWithCol
            lg={6}
            md={12}
            label="نیمسال"
            value={
              admissionTariffData?.AssociationCategoryDeliverPlan?.AssociationSemester
                ?.title
            }
          />
        </Row>
        <CustomTable
          dataSource={dataSource}
          rowKey="id"
          columns={UsersRequestsDetailTariffDrawerTableModel()}
          pagination={paginationConfig}
          {...TABLE_PROPS(dataSource?.length)}
        />
        <div>
          <CustomDivider text="زمانبندی" />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="ساعت شروع اعمال مؤثر"
              value={tariffData?.appliedStartTime}
              isTime
            />
            <SingleVerticalWithCol
              xl={16}
              lg={16}
              md={16}
              sm={12}
              label="تاریخ شروع اعمال مؤثر"
              value={tariffData?.appliedStartDate}
              isDate
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="ساعت پایان اعمال مؤثر"
              value={tariffData?.appliedEndTime}
              isTime
            />
            <SingleVerticalWithCol
              xl={16}
              lg={16}
              md={16}
              sm={12}
              label="تاریخ پایان اعمال مؤثر"
              value={tariffData?.appliedEndDate}
              isDate
            />
          </Row>
        </div>
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="زمان ثبت"
            value={dateTimeCombiner(tariffData?.createDate, tariffData?.createTime)}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="ایجاد کننده"
            value={tariffData?.createByUserId}
          />
        </Row>
      </div>
    </Div>
  );
};

export default UsersRequestsDetailTariffDetailDrawerContent;
