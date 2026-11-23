import { useEffect, useState } from "react";

import { Row } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { FaCaretLeft } from "react-icons/fa";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { useLazyGetPricingStepQuery } from "@infra/states/redux/Apis/dorm/planning/tariff/dormTariffApi";
import DetailTariffDrawerContent from "@pages/Dorm/Planning/Admission/AdmissionModify/helpers/AdmissionModifyTariffInfoStep/helpers/drawer/DetailTariffDrawerContent/DetailTariffDrawerContent";
import {
  GetPricingStepData,
  GetPricingStepResponse,
} from "@pages/Dorm/Planning/Tariff/TariffDetail/helper/components/TariffSteps/PricingStep/@types/@pricingStep";

import { GeneralInfoTariffProps } from "./@types/@generalInfoTariff";
import { GeneralInfoTariffTableModel } from "../../models/GeneralInfoTariffTableModel/GeneralInfoTariffTableModel";

const GeneralInfoTariff = ({ data }: GeneralInfoTariffProps) => {
  const [dataSource, setDataSource] = useState<GetPricingStepData[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  //? ================================  Api Calls ================================
  const [getPricing, { isFetching: getPricingLoading }] = useLazyGetPricingStepQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    const priceListId = data?.AssociationCategoryDeliverPlan?.AssociationPriceList?.id;
    if (!priceListId) return;

    getPricing({
      firstResult: 0,
      maxResults: 1000,
      priceListId_EQ: priceListId,
    })
      .unwrap()
      .then(getPricingIsSuccess);
  }, [data]);

  //* ================================ Util Functions ================================
  // success
  const getPricingIsSuccess = async (value: GetPricingStepResponse) => {
    if (value?.status === 200) {
      setDataSource(value?.data);
    }
  };

  const generalInfoTariffDetailHandler = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawerHandler = () => {
    setIsDrawerOpen(false);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* general info drawer */}
      {isDrawerOpen && (
        <CustomDrawer
          onClose={closeDrawerHandler}
          open={isDrawerOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <DetailTariffDrawerContent
              closeDrawerHandler={closeDrawerHandler}
              id={data?.AssociationCategoryDeliverPlan?.AssociationPriceList?.id}
            />
          }
        />
      )}

      <div className="residents-general-info-tariff-container">
        <CustomDivider
          text="اطلاعات کلی تعرفه"
          extraContent={
            <div className="flex items-center gap-2 max-[500px]:flex-col">
              <div>
                <CustomTag
                  color={
                    data?.AssociationCategoryDeliverPlan?.AssociationPriceList
                      ?.AssociationCategoryRecordStatus?.id === 1
                      ? "green"
                      : "red"
                  }
                >
                  {
                    data?.AssociationCategoryDeliverPlan?.AssociationPriceList
                      ?.AssociationCategoryRecordStatus?.title
                  }
                </CustomTag>
              </div>
              <CustomButton
                className="text-primary-6! border-0! shadow-none!"
                onClick={generalInfoTariffDetailHandler}
              >
                جزئیات بیشتر
                <FaCaretLeft />
              </CustomButton>
            </div>
          }
        />

        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            sm={24}
            label="عنوان"
            value={data?.AssociationCategoryDeliverPlan?.AssociationPriceList?.title}
          />
          <SingleVerticalWithCol
            md={12}
            label="شناسه تعرفه"
            value={data?.AssociationCategoryDeliverPlan?.AssociationPriceList?.id?.toString()}
          />
        </Row>
        <div className="mt-10!">
          <CustomTable
            dataSource={dataSource}
            rowKey="id"
            columns={GeneralInfoTariffTableModel}
            pagination={paginationConfig}
            loading={getPricingLoading}
            {...TABLE_PROPS(dataSource?.length)}
          />
        </div>
      </div>
    </>
  );
};
export default GeneralInfoTariff;
