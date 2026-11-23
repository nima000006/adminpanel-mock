import { useEffect, useState } from "react";

import { Row } from "antd";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { FaCaretLeft } from "react-icons/fa";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetHabitantAdmissionTabMutation } from "@infra/states/redux/Apis/dorm/habitants/dormHabitantsApi";
import { useLazyGetPricingStepQuery } from "@infra/states/redux/Apis/dorm/planning/tariff/dormTariffApi";
import { multiSelectGenerator } from "@pages/_shared/utils";
import { dormVisibilityStatusColor } from "@pages/Dorm/_shared/utils/DormUtils";
import {
  GetHabitantAdmissionTabResponse,
  HabitantAdmissionTabData,
} from "@pages/Dorm/Habitants/HabitantsDetail/helper/components/FourthTabAdmissionProgram/@types/@fourthTabAdmissionProgram";
import { admissionTabTimingCreator } from "@pages/Dorm/Habitants/HabitantsDetail/helper/utils/HabitantDetailUtils";
import {
  GetPricingStepData,
  GetPricingStepResponse,
} from "@pages/Dorm/Planning/Tariff/TariffDetail/helper/components/TariffSteps/PricingStep/@types/@pricingStep";

import UsersRequestsDetailAdmissionDetailDrawerContent from "./helper/drawers/UsersRequestsDetailAdmissionDetailDrawerContent/UsersRequestsDetailAdmissionDetailDrawerContent";
import UsersRequestsDetailTariffDetailDrawerContent from "./helper/drawers/UsersRequestsDetailTariffDetailDrawerContent/UsersRequestsDetailTariffDetailDrawerContent";
import UsersRequestsDetailAdmissionTabTableModel from "./helper/models/UsersRequestsDetailAdmissionTabTableModel/UsersRequestsDetailAdmissionTabTableModel";
import UsersRequestsDetailTariffTableModel from "./helper/models/UsersRequestsDetailTariffTableModel/UsersRequestsDetailTariffTableModel";

import "./_usersRequestsDetailAdmission.scss";
import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";

const UsersRequestsDetailAdmission = () => {
  const [admissionTariffData, setAdmissionTariffData] =
    useState<HabitantAdmissionTabData | null>(null);

  const [dataSource, setDataSource] = useState<GetPricingStepData[]>([]);

  const [isAdmissionDetailOpen, setIsAdmissionDetailOpen] = useState(false);

  const [isTariffDetailOpen, setIsTariffDetailOpen] = useState(false);

  const {
    params: { id },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getHabitantAdmission, { isLoading: isGetHabitantAdmissionLoading }] =
    useGetHabitantAdmissionTabMutation();

  const [getPricing, { isFetching: isPricingLoading }] = useLazyGetPricingStepQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getData = (id: string) => {
    getHabitantAdmission({
      _data_: {
        id: id,
      },
    })
      .unwrap()
      .then(getHabitantAdmissionIsSuccess);
  };

  const getHabitantAdmissionIsSuccess = async (
    value: GetHabitantAdmissionTabResponse
  ) => {
    if (value?.status === 200) {
      setAdmissionTariffData(value?.data);
      getPricing({
        firstResult: 0,
        maxResults: 1000,
        priceListId_EQ:
          value?.data?.AssociationCategoryDeliverPlan?.AssociationPriceList?.id,
      })
        .unwrap()
        .then(getPricingIsSuccess);
    }
  };

  const getPricingIsSuccess = (value: GetPricingStepResponse) => {
    if (value?.status === 200) {
      setDataSource(value?.data);
    }
  };

  //modal
  const openAdmissionDetailHandler = () => {
    setIsAdmissionDetailOpen(true);
  };

  const closeAdmissionDetailHandler = () => {
    setIsAdmissionDetailOpen(false);
  };

  const openTariffDetailHandler = () => {
    setIsTariffDetailOpen(true);
  };

  const closeTariffDetailHandler = () => {
    setIsTariffDetailOpen(false);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      {/* ADMISSION DETAIL DRAWER */}
      {isAdmissionDetailOpen && (
        <CustomDrawer
          onClose={closeAdmissionDetailHandler}
          open={isAdmissionDetailOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <UsersRequestsDetailAdmissionDetailDrawerContent
              closeDrawerHandler={closeAdmissionDetailHandler}
              id={admissionTariffData?.AssociationCategoryDeliverPlan?.id}
              admissionTariffData={admissionTariffData}
            />
          }
        />
      )}

      {/* TARIFF DETAIL DRAWER */}
      {isTariffDetailOpen && (
        <CustomDrawer
          onClose={closeTariffDetailHandler}
          open={isTariffDetailOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <UsersRequestsDetailTariffDetailDrawerContent
              closeDrawerHandler={closeTariffDetailHandler}
              id={
                admissionTariffData?.AssociationCategoryDeliverPlan?.AssociationPriceList
                  ?.id
              }
              admissionTariffData={admissionTariffData}
              dataSource={dataSource}
            />
          }
        />
      )}

      <Div
        loading={isGetHabitantAdmissionLoading}
        className="user-requests-detail-admission-container"
      >
        <div>
          <CustomDivider
            text="اطلاعات کلی برنامه پذیرش"
            extraContent={
              <div className="divider-content-container">
                <CustomTag
                  color={
                    dormVisibilityStatusColor[
                      admissionTariffData?.AssociationCategoryDeliverPlan
                        ?.AssociationRecordStatus?.id || 0
                    ]
                  }
                >
                  {
                    admissionTariffData?.AssociationCategoryDeliverPlan
                      ?.AssociationRecordStatus?.title
                  }
                </CustomTag>
                <CustomButton
                  type="link"
                  className="more-detail-btn"
                  onClick={openAdmissionDetailHandler}
                  icon={<FaCaretLeft />}
                  iconPlacement="end"
                >
                  جزئیات بیشتر
                </CustomButton>
              </div>
            }
          />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              lg={6}
              md={12}
              label="عنوان"
              value={admissionTariffData?.AssociationCategoryDeliverPlan?.title}
            />
            <SingleVerticalWithCol
              lg={6}
              md={12}
              value={admissionTariffData?.showTitle}
              label="عنوان نمایشی در اپلیکیشن"
            />
            <SingleVerticalWithCol
              lg={6}
              md={12}
              label="شناسه برنامه پذیرش"
              value={admissionTariffData?.AssociationCategoryDeliverPlan?.id?.toString()}
            />
            <SingleVerticalWithCol
              lg={6}
              md={12}
              label="نوع زمان‌بندی"
              value={
                admissionTariffData?.AssociationCategoryDeliverPlan
                  ?.AssociationCategorySchedulingType?.title
              }
            />
            <SingleVerticalWithCol
              xl={12}
              lg={12}
              md={12}
              label="شرایط خاص"
              value={dataPlaceHolder({
                data: admissionTariffData?.AssociationCategoryDeliverPlan
                  ?.AssociationSpecialStatus,
                callBack: multiSelectGenerator,
              })}
            />
          </Row>
        </div>
        <CustomTable
          dataSource={admissionTabTimingCreator(admissionTariffData) || []}
          rowKey="id"
          columns={UsersRequestsDetailAdmissionTabTableModel()}
          pagination={false}
          className="users-requests-detail-admission-list-table"
          {...TABLE_PROPS(admissionTabTimingCreator(admissionTariffData)?.length)}
        />
        <div>
          <CustomDivider
            text="اطلاعات کلی تعرفه"
            extraContent={
              <div className="divider-content-container">
                <CustomTag
                  color={
                    dormVisibilityStatusColor[
                      admissionTariffData?.AssociationCategoryDeliverPlan
                        ?.AssociationPriceList?.AssociationCategoryRecordStatus?.id || 0
                    ]
                  }
                >
                  {
                    admissionTariffData?.AssociationCategoryDeliverPlan
                      ?.AssociationPriceList?.AssociationCategoryRecordStatus?.title
                  }
                </CustomTag>
                <CustomButton
                  type="link"
                  className="more-detail-btn"
                  onClick={openTariffDetailHandler}
                  icon={<FaCaretLeft />}
                  iconPlacement="end"
                >
                  جزئیات بیشتر
                </CustomButton>
              </div>
            }
          />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              xl={12}
              lg={12}
              md={12}
              label="عنوان"
              value={
                admissionTariffData?.AssociationCategoryDeliverPlan?.AssociationPriceList
                  ?.title
              }
            />
            <SingleVerticalWithCol
              md={12}
              label="شناسه تعرفه"
              value={admissionTariffData?.AssociationCategoryDeliverPlan?.AssociationPriceList?.id?.toString()}
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
        </div>
        <CustomTable
          dataSource={dataSource}
          rowKey="id"
          columns={UsersRequestsDetailTariffTableModel}
          pagination={paginationConfig}
          loading={isPricingLoading}
          className="users-requests-detail-tariff-list-table"
          {...TABLE_PROPS(dataSource?.length)}
        />
      </Div>
    </>
  );
};

export default UsersRequestsDetailAdmission;
