import { useEffect, useState } from "react";

import { Form, Row } from "antd";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";

import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import {
  useCreateInActiveTariffMutation,
  useLazyGetConnectionWithTariffQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import { GENERAL_REQUEST_SUCCESS } from "@infra/VARS/globalToasts/globalToasts";

import {
  CreateInActiveTariffFormData,
  CreateInActiveTariffResponse,
  GetConnectionWithTariffResponse,
} from "./@types/basicInfoSection";
import { GetTariffBasicInfoCopyDetailResponse } from "../../TariffDetailActiveTab/helpers/TariffBasicInfoTab/@types/@tariffBasicInfoTab";
import InactiveTariffModalContent from "../modals/InactiveTariffModalContent/InactiveTariffModalContent";

import "./_basicInfoSection.scss";

const WARNING_MSG =
  "برای غیر فعال کردن این تعرفه، می‌بایست ابتدا اتصال این تعرفه به برنامه پذیرش‌ها را تغییر دهید.";

const BasicInfoSection = ({
  infoData,
  hasSwitch,
}: {
  infoData: GetTariffBasicInfoCopyDetailResponse | undefined;
  hasSwitch: boolean;
}) => {
  const [isActive, setIsActive] = useState(true);
  const [openInactiveModal, setIsOpenInactiveModal] = useState({
    isOpen: false,
    id: -1,
  });
  const [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);
  const [form] = Form.useForm();

  //? ================================  Api Calls ================================
  const [getConnectionWithTariff, { isFetching: getConnectionWithTariffDataLoading }] =
    useLazyGetConnectionWithTariffQuery();

  // post inactive modal
  const [createInActiveTariff, { isLoading: isCreateInActiveTariffLoading }] =
    useCreateInActiveTariffMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (infoData?.data?.[0]?.recordStatus !== undefined) {
      setIsActive(infoData?.data?.[0]?.recordStatus === 1 ? true : false);
    }
  }, [infoData?.data?.[0]?.recordStatus]);

  //* ================================ Util Functions ================================
  const getConnectionWithTariffIsSuccess = async (
    value: GetConnectionWithTariffResponse
  ) => {
    if (value?.data?.length !== 0) {
      toast.warning(WARNING_MSG, {
        toastId: WARNING_MSG,
      });

      setIsActive(true);
    } else {
      setIsOpenInactiveModal({
        isOpen: true,
        id: +id,
      });
    }
  };

  const createInActiveTariffIsSuccess = async (value: CreateInActiveTariffResponse) => {
    if (value?.status === 204) {
      setIsOpenInactiveModal({
        isOpen: false,
        id: -1,
      });
      toast.success(GENERAL_REQUEST_SUCCESS, { toastId: GENERAL_REQUEST_SUCCESS });
    }
  };

  // switch handler
  const switchOnChangeHandler = (e: boolean) => {
    if (!e) {
      getConnectionWithTariff({
        maxResults: 2000,
        firstResult: 0,
        priceListId_EQ: id,
      })
        .unwrap()
        .then(getConnectionWithTariffIsSuccess);
    }
  };

  // modal handler
  const closeModalHandler = () => {
    setIsOpenInactiveModal({
      isOpen: false,
      id: -1,
    });
  };

  const submitInactiveModalHandler = () => {
    form?.submit();
    form?.validateFields().then((value: CreateInActiveTariffFormData) =>
      createInActiveTariff({
        form: "DisablePriceList",
        data: {
          id: id,
          descDeactivateRequest: value?.description,
        },
      })
        .unwrap()
        .then(createInActiveTariffIsSuccess)
    );
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {openInactiveModal?.isOpen && (
        <ConfirmationModalWithContent
          title="غیر فعال کردن تعرفه"
          isModalOpen={openInactiveModal?.isOpen}
          isConfirmButtonLoading={isCreateInActiveTariffLoading}
          confirmBtnText="ثبت درخواست"
          customClass="dorm-basic-info-section-modal-title"
          backBtnText="انصراف"
          isDangerous={true}
          closeModalHandler={closeModalHandler}
          onConfirmClickHandler={submitInactiveModalHandler}
          content={<InactiveTariffModalContent form={form} />}
        />
      )}
      <section className="dorm-basic-info-section-container">
        <CustomDivider
          text="اطلاعات اولیه"
          extraContent={
            <div className="divider-btn-container">
              {hasSwitch ? (
                <CustomSwitch
                  defaultChecked={isActive}
                  checkedChildren="فعال"
                  unCheckedChildren="غیرفعال"
                  valuePropName="activeMode"
                  checked={isActive}
                  onChange={switchOnChangeHandler}
                  loading={getConnectionWithTariffDataLoading}
                />
              ) : null}
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
            value={infoData?.data[0]?.title}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="شناسه تعرفه"
            value={infoData?.data[0]?.id?.toString()}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="واحد دانشگاهی"
            value={infoData?.data[0]?.AssociationBranchid_title}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="اقامتگاه"
            value={infoData?.data[0]?.AssociationDormitory_title}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="واحد پول"
            value={infoData?.data[0]?.AssociationCurrencyId_title}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="مالیات"
            value={infoData?.data[0]?.tax?.toString()}
            symbol="%"
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="عوارض"
            value={infoData?.data[0]?.toll?.toString()}
            symbol="%"
          />
          <SingleVerticalWithCol
            span={24}
            label="توضیحات "
            value={infoData?.data[0]?.description}
          />
        </Row>
      </section>
    </>
  );
};
export default BasicInfoSection;
