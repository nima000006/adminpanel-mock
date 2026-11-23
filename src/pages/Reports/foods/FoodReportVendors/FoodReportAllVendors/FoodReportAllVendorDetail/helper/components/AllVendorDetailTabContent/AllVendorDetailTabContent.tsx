import { useEffect, useState } from "react";

import { Row, UploadFile } from "antd";
import { toast } from "react-toastify";

import CustomMap from "@components/CustomInputs/CustomMap/CustomMap";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomRate from "@components/Renderers/CustomRate/CustomRate";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetAllVendorByIdQuery } from "@infra/states/redux/Apis/food/vendor/vendorApi";

import { GetVendorByIdResponse } from "./@types/@allVendorDetailTabContent";
import "./_allVendorDetailTabContent.scss";

const AllVendorsDetail = () => {
  const [lat, setLat] = useState<number>(35.699739);
  const [lng, setLng] = useState<number>(51.338097);
  const [logo, setLogo] = useState<UploadFile[]>([]);
  const [banner, setBanner] = useState<UploadFile[]>([]);
  const {
    params: { id },
  } = useQueryParams();
  //? ================================  Api Calls ================================
  const [getDataById, { data: getData, isFetching: getDataLoading }] =
    useLazyGetAllVendorByIdQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getDataHandle();
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getDataHandle = () => {
    getDataById({ vendorId: id }).unwrap().then(onGetAllVendorDataByIdSuccess);
  };

  // onGetMyVendorDataByIdSuccess
  const onGetAllVendorDataByIdSuccess = async (response: GetVendorByIdResponse) => {
    if (response?.status === 200) {
      setLat(response?.data?.latitude);
      setLng(response?.data?.longitude);
      const logo = response?.data?.logoName;
      const banner = response?.data?.coverName;

      if (logo) {
        setLogo([
          {
            uid: logo,
            name: logo,
            status: "done",
            url: logo,
          },
        ]);
      } else {
        setLogo([]);
      }
      if (banner) {
        setBanner([
          {
            uid: banner,
            name: banner,
            status: "done",
            url: banner,
          },
        ]);
      } else {
        setBanner([]);
      }
    } else {
      return toast.error((response?.data || response?.msg) as any, {
        toastId: (response?.data || response?.msg) as any,
      });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div className="all-vendors-detail-tab-container" loading={getDataLoading}>
      <section className="vendor-information-container">
        <CustomDivider
          text="اطلاعات تامین کننده"
          extraContent={
            <div className="divider-btn-container">
              <CustomTag color={getData?.data?.active ? "green" : "red"}>
                {getData?.data?.active ? "فعال" : "غیرفعال"}
              </CustomTag>
            </div>
          }
        />
        <div className="banner-rate-container">
          <div className="img-container">
            <CustomUploader
              fileList={logo}
              setFileList={setLogo}
              isReadOnly={true}
              hasNullText={true}
              name="logo"
              uploaderText="لوگو"
            />
            <CustomUploader
              fileList={banner}
              setFileList={setBanner}
              isReadOnly={true}
              hasNullText={true}
              name="banner"
              uploaderText="بنر"
            />
          </div>
          <CustomRate disabled allowHalf defaultValue={getData?.data?.score} />
        </div>
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="عنوان"
            value={getData?.data?.title}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="شماره ملی حقوقی"
            value={getData?.data?.nationalNom}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="کد اقتصادی"
            value={getData?.data?.economicNom}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="شماره شبا"
            value={getData?.data?.iban}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="نام رابط"
            value={getData?.data?.managerFirstName}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="نام خانوادگی رابط"
            value={getData?.data?.managerLastName}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="کد ملی رابط"
            value={getData?.data?.managerUserName}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="شماره تلفن رابط"
            value={getData?.data?.managerMobile}
          />

          <SingleVerticalWithCol
            span={24}
            label="واحدهای دانشگاهی"
            value={getData?.data?.branches?.map((item) => item.branchName)?.join(" - ")}
          />

          <SingleVerticalWithCol
            span={24}
            label="توضیحات تامین کننده"
            value={dataPlaceHolder({
              data: getData?.data?.description,
            })}
          />
        </Row>
      </section>
      <section className="contact-information-container">
        <CustomDivider text="اطلاعات تماس" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="استان"
            value={getData?.data?.stateName}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="شهر"
            value={getData?.data?.provinceName}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="شماره تلفن یک"
            value={getData?.data?.phone1}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="شماره تلفن دو"
            value={getData?.data?.phone2}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="کد پستی"
            value={getData?.data?.postalCode}
          />

          <SingleVerticalWithCol span={24} label="آدرس" value={getData?.data?.address} />
        </Row>
        <CustomMap
          lat={lat}
          lng={lng}
          setLat={setLat}
          setLng={setLng}
          isReadOnly={true}
        />
      </section>
    </Div>
  );
};

export default AllVendorsDetail;
