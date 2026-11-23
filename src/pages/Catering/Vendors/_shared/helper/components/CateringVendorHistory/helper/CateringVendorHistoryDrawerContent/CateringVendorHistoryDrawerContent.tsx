import { useEffect, useState } from "react";

import { Row } from "antd";

import CustomMap from "@components/CustomInputs/CustomMap/CustomMap";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { CateringVendorHistoryDrawerContentProps } from "@pages/Catering/Vendors/_shared/helper/components/CateringVendorHistory/helper/CateringVendorHistoryDrawerContent/@types/@cateringVendorHistoryDrawerContent";

const DEFAULT_LAT = 35.699739;
const DEFAULT_LNG = 51.338097;

const CateringVendorHistoryDrawerContent = ({
  data,
  isLoading = false,
  onClose,
}: CateringVendorHistoryDrawerContentProps) => {
  const [lat, setLat] = useState(DEFAULT_LAT);
  const [lng, setLng] = useState(DEFAULT_LNG);

  const branchesValue = data?.branchCodes?.map((code) => code?.toString())?.join(" - ");

  //? ================================ Effects ================================
  useEffect(() => {
    if (!data) {
      setLat(DEFAULT_LAT);
      setLng(DEFAULT_LNG);
      return;
    }

    if (data.latitude != null) {
      setLat(data.latitude);
    }

    if (data.longitude != null) {
      setLng(data.longitude);
    }
  }, [data]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader
        title="جزییات ویرایش ثبت شده"
        closeDrawerHandler={onClose}
        hasLeftSide={false}
      />
      <Div loading={isLoading}>
        <section className="flex flex-col gap-10">
          <section className="flex flex-col gap-6">
            <CustomDivider text="اطلاعات تأمین کننده" />
            <Row gutter={[16, 16]}>
              <SingleVerticalWithCol
                label="عنوان"
                value={dataPlaceHolder({ data: data?.title })}
              />
              <SingleVerticalWithCol
                label="شماره ملی حقوقی"
                value={dataPlaceHolder({ data: data?.nationalNom })}
              />
              <SingleVerticalWithCol
                label="کد اقتصادی"
                value={dataPlaceHolder({ data: data?.economicNom })}
              />
              <SingleVerticalWithCol
                label="شماره تلفن رابط"
                value={dataPlaceHolder({ data: data?.managerMobile })}
              />
              <SingleVerticalWithCol
                label="نام رابط"
                value={dataPlaceHolder({ data: data?.managerFirstName })}
              />
              <SingleVerticalWithCol
                label="نام خانوادگی رابط"
                value={dataPlaceHolder({ data: data?.managerLastName })}
              />
              <SingleVerticalWithCol
                label="کد ملی رابط"
                value={dataPlaceHolder({ data: data?.managerUserName })}
              />
              <SingleVerticalWithCol
                span={24}
                label="شعبه / واحد"
                value={dataPlaceHolder({ data: branchesValue })}
              />
              <SingleVerticalWithCol
                span={24}
                label="توضیحات تأمین کننده"
                value={dataPlaceHolder({ data: data?.description })}
              />
            </Row>
          </section>
          <section className="flex flex-col gap-6">
            <CustomDivider text="اطلاعات تماس" />
            <Row gutter={[16, 16]}>
              <SingleVerticalWithCol
                label="شماره تلفن یک"
                value={dataPlaceHolder({ data: data?.phone1 })}
              />
              <SingleVerticalWithCol
                label="شماره تلفن دو"
                value={dataPlaceHolder({ data: data?.phone2 })}
              />
              <SingleVerticalWithCol
                label="استان"
                value={dataPlaceHolder({ data: data?.provinceTitle })}
              />
              <SingleVerticalWithCol
                label="شهر"
                value={dataPlaceHolder({ data: data?.cityTitle })}
              />
              <SingleVerticalWithCol
                label="کد پستی"
                value={dataPlaceHolder({ data: data?.postalCode })}
              />
              <SingleVerticalWithCol
                span={24}
                label="آدرس"
                value={dataPlaceHolder({ data: data?.address })}
              />
            </Row>
            <CustomMap
              lat={data?.latitude ?? lat}
              lng={data?.longitude ?? lng}
              setLat={setLat}
              setLng={setLng}
              isReadOnly={true}
            />
          </section>
        </section>
      </Div>
    </div>
  );
};

export default CateringVendorHistoryDrawerContent;
