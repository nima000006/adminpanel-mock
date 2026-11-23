import { useEffect, useState } from "react";

import { Col, Form, Modal, Row } from "antd";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetAllRestaurantsQuery } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";
import { useLazyGetAllContractsBySelfIdQuery } from "@infra/states/redux/Apis/food/self/selfApis";
import { useLazyGetAllVendorListQuery } from "@infra/states/redux/Apis/food/vendor/vendorApi";
import {
  foodNotFoundContent,
  PLEASE_SELECT_A_SELF_FIRST,
} from "@pages/Food/_shared/utils/sharedFoodUtils";
import { AllContractsListItem } from "@pages/Food/Contracts/AllContracts/AllContractList/@types/@allContractList";
import { GetAllContractsBySelfIdResponse } from "@pages/Food/FoodSchedules/AllFoodSchedules/AllFoodScheduleList/helper/drawer/AllSingleFoodScheduleListDrawerContent/@types/@allSingleFoodScheduleListDrawerContent";
import { RestaurantType } from "@pages/Food/Reservation/AllReservation/AllReservationOrderSearch/@types/@reservationOrderSearch";
import { VendorAllType } from "@pages/Food/Vendors/AllVendors/AllVendorList/@types/@allVendorList";

import { FoodsAdvanceFilterModalProps } from "../../../../@types/allFoodsList";
import "./_foodAdvancedModal.scss";

const FoodAdvancedModal = ({
  isModalOpen,
  onSubmit,
  closeModalHandler,
  title = "فیلتر پیشرفته",
  confirmBtnText = "اعمال فیلترها",
  isDangerous = false,
  isConfirmButtonDisable = false,
  customClass,
  width = 900,
  htmlType = "submit",
  form,
  isConfirmButtonLoading,
  centered = true,
  titleIcon,
}: FoodsAdvanceFilterModalProps) => {
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [contractData, setContractData] = useState<AllContractsListItem[] | []>([]);
  const [selfs, setSelfs] = useState<RestaurantType[]>([]);
  const [vendorData, setVendorData] = useState<VendorAllType[] | []>([]);
  const { params } = useQueryParams();
  const {
    contractId,
    contractName,
    vendorId,
    VendorName,
    selfId,
    selfName,
    minUrlValue,
    maxUrlValue,
  } = params;

  //? ================================  Api Calls ================================

  const [getAllVendorList, { isFetching: isAllVendorListListLoading }] =
    useLazyGetAllVendorListQuery();

  const [
    getAllRestaurants,
    { isFetching: isAllRestaurantDataLoading, isSuccess: isAllSelfsFetched },
  ] = useLazyGetAllRestaurantsQuery();

  const [
    getAllContractsBySelfId,
    { isFetching: isAllContractsBySelfIdLoading, isSuccess: isContractsFetched },
  ] = useLazyGetAllContractsBySelfIdQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    getAllVendorList({ isDeleted: false })
      .unwrap()
      .then((res) => {
        if (res?.status === 200) {
          setVendorData(res?.data);
        } else {
          return toast.error((res?.data || res?.msg) as any, {
            toastId: (res?.data || res?.msg) as any,
          });
        }
      });
  }, []);

  // set init values
  useEffect(() => {
    if (selfId) {
      setRestaurantId(selfId);
    }

    const fields: Record<string, any> = {};

    if (selfId) {
      fields.self = selectDefaultValueGenerator({
        id: +selfId,
        title: selfName,
      });
    } else {
      fields.self = undefined;
    }

    if (vendorId) {
      fields.vendor = selectDefaultValueGenerator({
        id: +vendorId,
        title: VendorName,
      });
    } else {
      fields.vendor = undefined;
    }

    if (contractId) {
      fields.contract = selectDefaultValueGenerator({
        id: +contractId,
        title: contractName,
      });
    } else {
      fields.contract = undefined;
    }

    form.setFieldsValue(fields);
  }, [
    contractId,
    contractName,
    vendorId,
    VendorName,
    selfId,
    selfName,
    minUrlValue,
    maxUrlValue,
  ]);

  //* ================================ Util Functions ================================

  // opening contracts select
  const onOpenContractsSelectClickHandler = () => {
    if (!restaurantId) {
      return toast.warning(PLEASE_SELECT_A_SELF_FIRST, {
        toastId: PLEASE_SELECT_A_SELF_FIRST,
      });
    }
    return getAllContractsBySelfId({ restaurantId })
      .unwrap()
      .then((res: GetAllContractsBySelfIdResponse) => {
        if (res?.status === 200) {
          setContractData(res?.data?.contractDtoList);
        } else {
          return toast.error((res?.data || res?.msg) as any, {
            toastId: (res?.data || res?.msg) as any,
          });
        }
      });
  };

  // clicking selfs select
  const onClickSelfsSelect = () => {
    if (!isAllSelfsFetched) {
      return getAllRestaurants({ isDeleted: false })
        .unwrap()
        .then((res) => {
          if (res?.status === 200) {
            setSelfs(res?.data);
          } else {
            return toast.error((res?.data || res?.msg) as any, {
              toastId: (res?.data || res?.msg) as any,
            });
          }
        });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="food-all-foods-advance-filter-container">
      {isModalOpen && (
        <Modal
          title={
            titleIcon ? (
              <div className="title-with-icon">
                {titleIcon}
                <span>{title}</span>
              </div>
            ) : (
              <span>{title}</span>
            )
          }
          open={isModalOpen}
          onCancel={() => closeModalHandler()}
          footer={null}
          width={width}
          className={`food-reserve-advanced-modal-container ${customClass}`}
          centered={centered}
        >
          <CustomAlert
            showIcon
            description="فیلتر کردن اطلاعات بر اساس فیلدهای زیر، نتایج جستجوی شما را شخصی‌سازی می‌کند."
            closable
          />
          <Form className="main-content" form={form} onFinish={onSubmit}>
            <CustomDivider text="اطلاعات مرتبط با غذا" />
            <Row gutter={[16, 16]}>
              <Col md={6} xs={24}>
                <CustomSelect
                  name="self"
                  label="سلف"
                  placeholder="انتخاب کنید"
                  allowClear
                  options={selfs}
                  loading={isAllRestaurantDataLoading}
                  onClick={onClickSelfsSelect}
                  form={form}
                  notFoundContent={!isAllSelfsFetched ? foodNotFoundContent : undefined}
                  onChange={(value) => {
                    setRestaurantId(value as string);
                    form.setFieldsValue({
                      contract: undefined,
                      food: undefined,
                    });
                  }}
                />
              </Col>

              <Col md={6} xs={24}>
                <CustomSelect
                  name="contract"
                  label="قراداد"
                  placeholder="انتخاب کنید"
                  options={contractData}
                  form={form}
                  allowClear
                  loading={isAllContractsBySelfIdLoading}
                  notFoundContent={
                    !isContractsFetched && restaurantId ? foodNotFoundContent : undefined
                  }
                  onClick={onOpenContractsSelectClickHandler}
                />
              </Col>
              <Col md={6} xs={24}>
                <CustomSelect
                  options={vendorData}
                  name="vendor"
                  label="تأمین کننده"
                  placeholder="انتخاب کنید"
                  isLoading={isAllVendorListListLoading}
                  form={form}
                />
              </Col>
            </Row>
            <Row className="apply-btn">
              <Col span={24}>
                <CustomButton
                  danger={isDangerous}
                  htmlType={htmlType}
                  loading={isConfirmButtonLoading || isConfirmButtonDisable}
                  type="primary"
                  className="food-filter-submit-btn"
                >
                  {confirmBtnText}
                </CustomButton>
              </Col>
            </Row>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default FoodAdvancedModal;
