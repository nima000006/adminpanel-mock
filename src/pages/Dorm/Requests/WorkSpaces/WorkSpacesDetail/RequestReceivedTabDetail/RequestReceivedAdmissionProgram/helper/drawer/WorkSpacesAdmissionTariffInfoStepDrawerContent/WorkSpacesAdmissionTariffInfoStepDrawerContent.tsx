import { useEffect, useState } from "react";

import { Row } from "antd";
import { useSearchParams } from "react-router";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { dataPlaceHolder } from "@infra/helpers/utils";
import {
  useLazyGetPricingStepCountQuery,
  useLazyGetPricingStepQuery,
  useLazyGetTariffBasicInfoCopyDetailQuery,
} from "@infra/states/redux/Apis/dorm/planning/tariff/dormTariffApi";
import {
  GetPricingStepData,
  GetPricingStepResponse,
} from "@pages/Dorm/Planning/Tariff/TariffDetail/helper/components/TariffSteps/PricingStep/@types/@pricingStep";

import { TariffInfoStepDrawerContentProps } from "./@types/@workSpacesAdmissionTariffInfoStepDrawerContentProps";
import { WorkSpacesAdmissionTariffDrawerTableModel } from "../../model/WorkSpacesAdmissionTariffDrawerTableModel/WorkSpacesAdmissionTariffDrawerTableModel";

import "./_workSpacesAdmissionTariffInfoStepDrawerContent.scss";

const WorkSpacesAdmissionTariffInfoStepDrawerContent = ({
  closeDrawerHandler,
  id,
}: TariffInfoStepDrawerContentProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const url = Object.fromEntries([...searchParams]);
  const [dataSource, setDataSource] = useState<GetPricingStepData[]>();
  //? ================================  Api Calls ================================
  const [
    getDrawerTariff,
    { data: getDrawerTariffData, isFetching: isDrawerTariffLoading },
  ] = useLazyGetTariffBasicInfoCopyDetailQuery();

  const [getPricing, { isFetching: getPricingLoading }] = useLazyGetPricingStepQuery();

  const [
    getPricingStepCount,
    { data: getPricingCountData, isFetching: getPricingCountLoading },
  ] = useLazyGetPricingStepCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id !== undefined) {
      getDrawerTariff({ id_EQ: id, firstResult: 0, maxResults: 50 }); // we should set 0 and 50 as default
    }
  }, [id]);

  useEffect(() => {
    getPricing({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
      priceListId_EQ: +url?.id,
    })
      .unwrap()
      .then(getPricingIsSuccess);

    // get count
    getPricingStepCount({ priceListId_EQ: +url?.id });
  }, [url?.id, url?.pageSize, url?.page]);

  //* ================================ Util Functions ================================
  // success
  const getPricingIsSuccess = (value: GetPricingStepResponse) => {
    if (value?.status === 200) {
      setDataSource(value?.data);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      className="work-spaces-admission-tariff-drawer-content-container"
      loading={isDrawerTariffLoading}
    >
      <CustomDrawerHeader
        title="جزئیات تعرفه"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="divider-btn-container">
            <CustomTag
              color={getDrawerTariffData?.data[0]?.recordStatus === 1 ? "green" : "red"}
            >
              {getDrawerTariffData?.data[0]?.recordStatus === 1 ? "فعال" : "غیرفعال"}
            </CustomTag>
          </div>
        }
      />
      <div className="work-spaces-admission-tariff-drawer-content-wrapper">
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            span={24}
            label="عنوان تعرفه"
            value={getDrawerTariffData?.data[0]?.title}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="شناسه تعرفه"
            value={getDrawerTariffData?.data[0]?.id?.toString()}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="واحد دانشگاهی"
            value={getDrawerTariffData?.data[0]?.AssociationBranchid_title}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="اقامتگاه"
            value={getDrawerTariffData?.data[0]?.AssociationDormitory_title}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="واحد پول"
            value={getDrawerTariffData?.data[0]?.AssociationCurrencyId_title}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="مالیات"
            value={getDrawerTariffData?.data[0]?.tax?.toString()}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="عوارض"
            value={getDrawerTariffData?.data[0]?.toll?.toString()}
          />
          <SingleVerticalWithCol
            span={24}
            label="توضیحات"
            value={getDrawerTariffData?.data[0]?.description}
          />
        </Row>

        <div className="table-wrapper">
          <CustomTable
            dataSource={dataSource}
            loading={getPricingLoading || getPricingCountLoading}
            rowKey="id"
            columns={WorkSpacesAdmissionTariffDrawerTableModel}
            pagination={manualPaginationConfig({
              total: getPricingCountData?.data,
              onChange: (page, pageSize) => {
                setSearchParams({
                  ...url,
                  page: page?.toString(),
                  pageSize: pageSize?.toString(),
                });
              },
              pageNumber: url?.page ? Number(url?.page) : 1,
              defaultPageSize: url?.pageSize ? Number(url?.pageSize) : 8,
            })}
            key={`table-${url?.pageSize || "8"} `}
            {...TABLE_PROPS(dataSource?.length || 0)}
          />
        </div>

        <div>
          <CustomDivider text="زمانبندی" />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="ساعت شروع اعمال مؤثر"
              value={getDrawerTariffData?.data[0]?.appliedStartTime}
              isTime
            />
            <SingleVerticalWithCol
              xl={16}
              lg={16}
              md={16}
              label="تاریخ شروع اعمال مؤثر"
              value={getDrawerTariffData?.data[0]?.appliedStartDate}
              isDate
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="ساعت پایان اعمال مؤثر"
              value={getDrawerTariffData?.data[0]?.appliedEndTime}
              isTime
            />
            <SingleVerticalWithCol
              xl={16}
              lg={16}
              md={16}
              label="تاریخ پایان اعمال مؤثر"
              value={getDrawerTariffData?.data[0]?.appliedEndDate}
              isDate
            />
          </Row>
        </div>

        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="زمان ثبت"
            value={`${dataPlaceHolder({ data: getDrawerTariffData?.data[0]?.createDate, isDate: true })}
              , ${dataPlaceHolder({ data: getDrawerTariffData?.data[0]?.createTime, isTime: true })}`}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="ایجاد کننده"
            value={getDrawerTariffData?.data[0]?.createByUserId}
          />
        </Row>
      </div>
    </Div>
  );
};
export default WorkSpacesAdmissionTariffInfoStepDrawerContent;
