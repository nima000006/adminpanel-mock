import { useEffect, useState } from "react";

import { Row } from "antd";
import { AiOutlineEdit } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomMap from "@components/CustomInputs/CustomMap/CustomMap";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { CateringVendorDetailTabContentProps } from "@pages/Catering/Vendors/_shared/helper/components/CateringVendorDetailTabContent/@types/@cateringVendorDetailTabContent";
import { getCateringVendorStatusTypeTagConfig } from "@pages/Catering/Vendors/_shared/utils";

const DEFAULT_LAT = 35.699739; // default map latitude (Tehran)
const DEFAULT_LNG = 51.338097; // default map longitude (Tehran)

const CateringVendorDetailTabContent = ({
  data,
  isLoading = false,
  onEdit,
}: CateringVendorDetailTabContentProps) => {
  const [lat, setLat] = useState(DEFAULT_LAT);
  const [lng, setLng] = useState(DEFAULT_LNG);

  const statusTagConfig = getCateringVendorStatusTypeTagConfig(data?.statusType);
  const branchesValue = data?.branches?.map((item) => item.branchName)?.join(" - ");

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
    <Div className="flex flex-col gap-10" loading={isLoading}>
      <section className="flex flex-col gap-6">
        <CustomDivider
          text="اطلاعات تأمین کننده"
          extraContent={
            <div className="flex items-center gap-2">
              {statusTagConfig ? (
                <CustomTag color={statusTagConfig.color}>
                  {statusTagConfig.label}
                </CustomTag>
              ) : null}
              <CustomButton
                type="primary"
                ghost
                icon={<AiOutlineEdit />}
                onClick={onEdit}
              >
                ویرایش
              </CustomButton>
            </div>
          }
        />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol label="عنوان" value={data?.title} />
          <SingleVerticalWithCol label="شماره ملی حقوقی" value={data?.nationalNom} />
          <SingleVerticalWithCol label="کد اقتصادی" value={data?.economicNom} />
          <SingleVerticalWithCol label="شماره تلفن رابط" value={data?.managerMobile} />
          <SingleVerticalWithCol label="نام رابط" value={data?.managerFirstName} />
          <SingleVerticalWithCol
            label="نام خانوادگی رابط"
            value={data?.managerLastName}
          />
          <SingleVerticalWithCol label="کد ملی رابط" value={data?.managerUserName} />
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
          <SingleVerticalWithCol label="استان" value={data?.provinceTitle} />
          <SingleVerticalWithCol label="شهر" value={data?.cityTitle} />
          <SingleVerticalWithCol label="شماره تلفن یک" value={data?.phone1} />
          <SingleVerticalWithCol label="شماره تلفن دو" value={data?.phone2} />
          <SingleVerticalWithCol label="کد پستی" value={data?.postalCode} />
          <SingleVerticalWithCol span={24} label="آدرس" value={data?.address} />
        </Row>
        <CustomMap
          lat={data?.latitude ?? lat}
          lng={data?.longitude ?? lng}
          setLat={setLat}
          setLng={setLng}
          isReadOnly={true}
        />
      </section>
    </Div>
  );
};

export default CateringVendorDetailTabContent;
