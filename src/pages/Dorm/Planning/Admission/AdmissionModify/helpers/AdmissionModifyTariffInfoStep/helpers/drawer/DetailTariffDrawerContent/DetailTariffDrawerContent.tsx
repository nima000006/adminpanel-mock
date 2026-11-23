import { useEffect, useState } from "react";

import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import {
  useLazyGetPricingStepQuery,
  useLazyGetTariffBasicInfoCopyDetailQuery,
} from "@infra/states/redux/Apis/dorm/planning/tariff/dormTariffApi";
import { dateTimeCombiner } from "@pages/Dorm/_shared/utils/DormUtils";
import {
  GetPricingStepData,
  GetPricingStepResponse,
} from "@pages/Dorm/Planning/Tariff/TariffDetail/helper/components/TariffSteps/PricingStep/@types/@pricingStep";

import { DetailTariffDrawerContentProps } from "../../../@types/@admissionModifyTariffInfoStep";
import { tariffDrawerTableModel } from "../../AdmissionModifyTariffInfoStepTable/Models/tariffDrawerTableModel/tariffDrawerTableModel";
import "./_detailTariffDrawerContent.scss";

const DetailTariffDrawerContent = ({
  closeDrawerHandler,
  id,
}: DetailTariffDrawerContentProps) => {
  const [dataSource, setDataSource] = useState<GetPricingStepData[]>();
  //? ================================  Api Calls ================================
  const [
    getDrawerTariff,
    { data: getDrawerTariffData, isFetching: isDrawerTariffLoading },
  ] = useLazyGetTariffBasicInfoCopyDetailQuery();

  const [getPricing, { isFetching: getPricingLoading }] = useLazyGetPricingStepQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id !== undefined) {
      getDrawerTariff({ id_EQ: id, firstResult: 0, maxResults: 50 }); // we should set 0 and 50 as default
    }
  }, [id]);

  useEffect(() => {
    getPricing({
      firstResult: 0,
      maxResults: 1000,
      priceListId_EQ: +id!,
    })
      .unwrap()
      .then(getPricingIsSuccess);
  }, [id]);

  //* ================================ Util Functions ================================
  const getPricingIsSuccess = async (value: GetPricingStepResponse) => {
    if (value?.status === 200) {
      setDataSource(value?.data);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      className="residents-general-info-tariff-drawer-content-container"
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
      <div className="residents-general-info-tariff-drawer-content-wrapper">
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
            value={getDrawerTariffData?.data[0]?.tax?.toString() + "%"}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="عوارض"
            value={getDrawerTariffData?.data[0]?.toll?.toString() + "%"}
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
            loading={getPricingLoading}
            rowKey="id"
            columns={tariffDrawerTableModel}
            pagination={paginationConfig}
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
            value={dateTimeCombiner(
              getDrawerTariffData?.data[0]?.createDate,
              getDrawerTariffData?.data[0]?.createTime
            )}
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
export default DetailTariffDrawerContent;
