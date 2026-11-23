import { useEffect, useState } from "react";

import { Row, UploadFile } from "antd";

import CustomMap from "@components/CustomInputs/CustomMap/CustomMap";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { CateringSelfsHistoryDrawerContentProps } from "@pages/Catering/Selfs/_shared/helper/components/CateringSelfComponents/CateringSelfsHistory/helper/CateringSelfsHistoryDrawerContent/@types/@cateringSelfsHistoryDrawerContent";

const DEFAULT_LAT = 35.699739; // default latitude
const DEFAULT_LNG = 51.338097; // default longitude

const CateringSelfsHistoryDrawerContent = ({
  data,
  isLoading = false,
  onClose,
}: CateringSelfsHistoryDrawerContentProps) => {
  const [logo, setLogo] = useState<UploadFile[]>([]);
  const [banner, setBanner] = useState<UploadFile[]>([]);
  const [lat, setLat] = useState<number>(DEFAULT_LAT);
  const [lng, setLng] = useState<number>(DEFAULT_LNG);

  //? ================================ Effects ================================
  useEffect(() => {
    if (!data) {
      setLogo([]);
      setBanner([]);
      setLat(DEFAULT_LAT);
      setLng(DEFAULT_LNG);
      return;
    }

    if (data.logoName) {
      setLogo([
        {
          uid: data.logoName,
          name: data.logoName,
          status: "done",
          url: data.logoName,
        },
      ]);
    } else {
      setLogo([]);
    }

    if (data.coverName) {
      setBanner([
        {
          uid: data.coverName,
          name: data.coverName,
          status: "done",
          url: data.coverName,
        },
      ]);
    } else {
      setBanner([]);
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
          <div className="flex flex-col gap-4">
            <div className="mb-20 flex gap-4">
              <CustomUploader
                fileList={logo}
                setFileList={setLogo}
                isReadOnly={true}
                name="logo"
                label="لوگو سلف"
                hasVerticalLabel={true}
                uploaderText="لوگو سلف"
                hasNullText
              />
              <CustomUploader
                fileList={banner}
                setFileList={setBanner}
                isReadOnly={true}
                name="banner"
                label="بنر سلف"
                hasVerticalLabel={true}
                uploaderText="بنر سلف"
                hasNullText
              />
            </div>
            <Row gutter={[16, 16]}>
              <SingleVerticalWithCol
                md={8}
                sm={12}
                label="عنوان"
                value={dataPlaceHolder({ data: data?.title })}
              />
              <SingleVerticalWithCol
                md={8}
                sm={12}
                label="شعبه/واحد"
                value={dataPlaceHolder({ data: data?.ownerBranchName })}
              />
              <SingleVerticalWithCol
                md={8}
                sm={12}
                label="ظرفیت (نفر)"
                value={dataPlaceHolder({ data: data?.capacity?.toString() })}
              />
              <SingleVerticalWithCol
                md={8}
                sm={12}
                label="نام مسئول سلف"
                value={dataPlaceHolder({ data: data?.managerFirstName })}
              />
              <SingleVerticalWithCol
                md={8}
                sm={12}
                label="نام خانوادگی مسئول سلف"
                value={dataPlaceHolder({ data: data?.managerLastName })}
              />
              <SingleVerticalWithCol
                md={8}
                sm={12}
                label="شماره تلفن مسئول سلف"
                value={dataPlaceHolder({ data: data?.phone })}
              />
              <SingleVerticalWithCol
                md={8}
                sm={12}
                label="کد ملی مسئول سلف"
                value={dataPlaceHolder({ data: data?.managerUserName })}
              />
              <SingleVerticalWithCol
                span={24}
                label="توضیحات سلف"
                value={dataPlaceHolder({ data: data?.description })}
              />
              <SingleVerticalWithCol
                span={24}
                label="قوانین مقررات سلف"
                value={dataPlaceHolder({ data: data?.rules })}
              />
            </Row>
          </div>
          <section className="flex flex-col gap-6">
            <CustomDivider text="اطلاعات تماس" />
            <Row gutter={[16, 16]}>
              <SingleVerticalWithCol
                md={8}
                sm={12}
                label="شهر"
                value={dataPlaceHolder({ data: data?.cityTitle })}
              />
              <SingleVerticalWithCol
                md={8}
                sm={12}
                label="استان"
                value={dataPlaceHolder({ data: data?.provinceTitle })}
              />
              <SingleVerticalWithCol
                md={8}
                sm={12}
                label="کد پستی"
                value={dataPlaceHolder({ data: data?.postalCode })}
              />
              <SingleVerticalWithCol
                md={8}
                sm={12}
                label="شماره تلفن ۱"
                value={dataPlaceHolder({ data: data?.restaurantPhone })}
              />
              <SingleVerticalWithCol
                md={8}
                sm={12}
                label="شماره تلفن ۲"
                value={dataPlaceHolder({ data: data?.restaurantPhone2 })}
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

export default CateringSelfsHistoryDrawerContent;
