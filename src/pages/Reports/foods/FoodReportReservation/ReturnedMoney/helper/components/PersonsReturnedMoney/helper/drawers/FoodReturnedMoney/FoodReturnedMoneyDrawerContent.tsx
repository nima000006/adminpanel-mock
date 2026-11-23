import { useEffect, useState } from "react";

import { Row } from "antd";
import { toast } from "react-toastify";

import { IconCalculator } from "@components/icons/icons";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useLazyGetPersonReturnMoneyDetailQuery } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";

import { GetPersonReturnMoneyDetailResponse } from "./@types/@foodReturnedMoneyDrawerContent";

const FoodReturnedMoneyDrawerContent = ({
  closeDrawerHandler,
  id,
}: {
  closeDrawerHandler: () => void;
  id: number;
}) => {
  const [detailData, setDetailData] = useState<
    GetPersonReturnMoneyDetailResponse | undefined
  >(undefined);

  const [getDetail, { isLoading: isGetDetailLoading }] =
    useLazyGetPersonReturnMoneyDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getDetail({ requestId: id }).unwrap().then(getDetailSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getDetailSuccess = async (value: GetPersonReturnMoneyDetailResponse) => {
    if (value?.status === 200) {
      setDetailData(value);
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Div className="food-returned-money-drawer-container" loading={isGetDetailLoading}>
      <CustomDrawerHeader title="مشاهده" closeDrawerHandler={closeDrawerHandler} />
      <div className="total-price-card-container">
        <IconCalculator viewBox="0 0 24 24" fill="#1890FF" />
        <span className="title">مجموع مبلغ قابل عودت</span>
        <span className="price-title">
          {dataPlaceHolder({
            data: detailData?.data?.totalAmount?.toString(),
            isPrice: true,
            isRial: true,
          })}{" "}
          تومان
        </span>
      </div>
      <div>
        <CustomDivider text="اطلاعات تراکنش عودت" />
        <div>
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              xl={12}
              lg={12}
              md={12}
              value={detailData?.data?.referenceNo?.toString()}
              label="شماره پیگیری تراکنش"
            />
            <SingleVerticalWithCol
              xl={12}
              lg={12}
              md={12}
              value={dataPlaceHolder({
                data: detailData?.data?.paymentDate,
                isDate: true,
              })}
              label="تاریخ"
            />
            <SingleVerticalWithCol
              xl={12}
              lg={12}
              md={12}
              value={detailData?.data?.fromBankPersianName}
              label="بانک عامل مبداء"
            />
            <SingleVerticalWithCol
              xl={12}
              lg={12}
              md={12}
              value={detailData?.data?.fromIBAN}
              label="شماره شبا مبداء"
            />
          </Row>
        </div>
      </div>
    </Div>
  );
};

export default FoodReturnedMoneyDrawerContent;
