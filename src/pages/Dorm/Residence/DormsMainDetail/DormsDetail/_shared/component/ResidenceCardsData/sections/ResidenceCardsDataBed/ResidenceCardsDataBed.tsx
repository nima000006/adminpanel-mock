import { useEffect, useState } from "react";

import { Col, Row } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_MODIFY_BED_PAGE_ROUTE } from "@infra/router/routes/dorm";
import {
  useLazyGetDormResidenceBedListQuery,
  useLazyGetRoomCapacityQuery,
} from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";

import {
  GetDormResidenceBedListResponse,
  GetDormResidenceBedListTypes,
  GetRoomCapacityResponse,
} from "./@types/@residenceCardsDataBed";
import DormBedSingleCard from "../../../SingleCards/DormBedSingleCard/DormBedSingleCard";

const BED_TYPE = { main: 0, excessive: 1 };

const ResidenceCardsDataBed = () => {
  const [bedList, setBedList] = useState<GetDormResidenceBedListTypes[]>([]);
  const [isBedExcessive, setIsBedExcessive] = useState<boolean | undefined>(undefined);

  const { params: url } = useQueryParams();
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [getBedList, { isFetching: isBedListLoading }] =
    useLazyGetDormResidenceBedListQuery();

  const [getRoomCapacity, { isFetching: isRoomCapacityLoading }] =
    useLazyGetRoomCapacityQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (url?.roomId) {
      getBedList({ roomId_EQ: +url?.roomId, firstResult: 0, maxResults: 2000 }) //we should set 0 and 2000 to get data
        .unwrap()
        .then(getBedListSuccess);
    } else {
      //when building or floor change because the roomId removes so the page does not update
      setBedList([]);
    }
  }, [url?.roomId]);

  //* ================================ Util Functions ================================
  const getBedListSuccess = (value: GetDormResidenceBedListResponse) => {
    if (value?.status === 200) {
      setBedList(value?.data);
    }
  };

  const createBedHandler = () => {
    if (url?.roomId) {
      getRoomCapacity({ id_EQ: +url?.roomId, firstResult: 0, maxResults: 2000 }) //we should set 0 and 2000 to get data
        .unwrap()
        .then(getRoomCapacitySuccess);
    }
  };

  const getRoomCapacitySuccess = async (value: GetRoomCapacityResponse) => {
    if (value?.status === 200) {
      if (value?.data?.[0]?.mainOrExtra === BED_TYPE.main) {
        navigateToBedCreatePageHandler();
      } else {
        setIsBedExcessive(true);
      }
    }
  };

  const closeExcessiveBedHandler = () => {
    setIsBedExcessive(false);
  };

  const navigateToBedCreatePageHandler = () => {
    navigate({
      pathname: DORM_MODIFY_BED_PAGE_ROUTE,
      search: makeSearchParams({ ...url }),
    });
  };
  return (
    <>
      <ConfirmationModalWithContent
        isModalOpen={isBedExcessive}
        title="افزودن تخت اضافه!"
        confirmBtnText="افزودن تخت جدید"
        backBtnText="انصراف"
        content={
          <p className="excessive-bed-in-room-warn-text">
            تعداد تخت‌های تعریف شده در این اتاق بیشتر از ظرفیت استاندارد تخت در اتاق
            می‌باشد. در صورتی که تخت جدیدی اضافه کنید تخت شما مازاد بر ظرفیت خواهد بود.
          </p>
        }
        closeModalHandler={closeExcessiveBedHandler}
        onConfirmClickHandler={navigateToBedCreatePageHandler}
      />
      <Div loading={isBedListLoading} className="bed-section-container">
        <CustomDivider
          text="تخت‌ها"
          extraContent={
            bedList?.length !== 0 && (
              <div className="action-count-container">
                <CustomTag>
                  # ظرفیت استاندارد اتاق:{" "}
                  {bedList?.[0]?.AssociationCategorRoom_numberStandardBedInRoom}
                </CustomTag>
                <CustomTag># تعداد: {bedList?.length}</CustomTag>
                <CustomButton
                  type="primary"
                  icon={<AiOutlinePlus />}
                  iconPlacement="end"
                  onClick={createBedHandler}
                >
                  افزودن تخت
                </CustomButton>
              </div>
            )
          }
        />
        {bedList?.length === 0 ? (
          <CustomEmpty
            description={
              url?.roomId ? (
                <div className="text-btn-container">
                  <p className="bold-text">
                    هنوز تختی در این اتاق از طبقه‌ی ساختمان ایجاد نکرده‌اید!
                  </p>
                  <CustomButton
                    type="primary"
                    icon={<AiOutlinePlus />}
                    onClick={createBedHandler}
                    iconPlacement="end"
                    loading={isRoomCapacityLoading}
                  >
                    ایجاد تخت
                  </CustomButton>
                </div>
              ) : (
                <p className="dim-text">
                  تختی برای نمایش وجود ندارد! <br /> لطفاً ساختمان، طبقه و اتاق را مشخص
                  بفرمایید.
                </p>
              )
            }
          />
        ) : (
          <Row gutter={[24, 16]}>
            {bedList?.map((item) => (
              <Col lg={6} md={8} sm={12} xs={24} key={item?.id}>
                <DormBedSingleCard data={item} />
              </Col>
            ))}
          </Row>
        )}
      </Div>
    </>
  );
};

export default ResidenceCardsDataBed;
