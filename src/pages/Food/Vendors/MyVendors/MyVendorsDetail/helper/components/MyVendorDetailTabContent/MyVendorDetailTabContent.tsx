import { useCallback, useEffect, useState } from "react";

import { Row, UploadFile } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomMap from "@components/CustomInputs/CustomMap/CustomMap";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomRate from "@components/Renderers/CustomRate/CustomRate";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetMyVendorByIdQuery } from "@infra/states/redux/Apis/food/vendor/vendorApi";

import {
  GetMyVendorByIdResponse,
  VendorByIdType,
} from "./@types/@myVendorDetailTabContent";
import MyVendorDrawerContent from "../../drawer/DrawerContent/MyVendorDrawerContent";
import "./_myVendorDetailTabContent.scss";

const MyVendorsDetailContent = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [detailFirstTabData, setDetailFirstTabData] = useState<VendorByIdType>();
  const [logo, setLogo] = useState<UploadFile[]>([]);
  const [banner, setBanner] = useState<UploadFile[]>([]);
  const [lat, setLat] = useState<number>(35.699739);
  const [lng, setLng] = useState<number>(51.338097);
  const {
    params: { id },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getMyVendorDataById, { data: getData, isFetching: getDataLoading }] =
    useLazyGetMyVendorByIdQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getDataHandler();
    }
  }, [id]);

  //* ================================ Util Functions ================================
  // onGetMyVendorDataByIdSuccess
  const onGetMyVendorDataByIdSuccess = async (response: GetMyVendorByIdResponse) => {
    if (response?.status === 200) {
      setDetailFirstTabData(response?.data);
      setLat(response?.data?.latitude);
      setLng(response?.data?.longitude);

      if (response?.data?.logoName) {
        setLogo([
          {
            uid: response?.data?.logoName,
            name: response?.data?.logoName,
            status: "done",
            url: response?.data?.logoName,
          },
        ]);
      }

      if (response?.data?.coverName) {
        setBanner([
          {
            uid: response?.data?.coverName,
            name: response?.data?.coverName,
            status: "done",
            url: response?.data?.coverName,
          },
        ]);
      }
    } else {
      return toast.error((response?.data || response?.msg) as any, {
        toastId: (response?.data || response?.msg) as any,
      });
    }
  };

  const getDataHandler = () => {
    getMyVendorDataById({ vendorId: id }).unwrap().then(onGetMyVendorDataByIdSuccess);
  };

  const openDrawerHandler = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const closeDrawerHandler = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isDrawerOpen && (
        <CustomDrawer
          onClose={closeDrawerHandler}
          open={isDrawerOpen}
          className="my-vendors-detail-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <MyVendorDrawerContent
              detailFirstTabData={detailFirstTabData}
              isDrawerOpen={isDrawerOpen}
              closeDrawerHandler={closeDrawerHandler}
              setIsDrawerOpen={setIsDrawerOpen}
              getDataHandler={getDataHandler}
            />
          }
        />
      )}

      <Div className="my-vendors-detail-tab-container" loading={getDataLoading}>
        <section className="vendor-information-container">
          <CustomDivider
            text="اطلاعات تامین کننده"
            extraContent={
              <div className="divider-btn-container">
                <CustomTag color={getData?.data?.active ? "green" : "red"}>
                  {getData?.data?.active ? "فعال" : "غیرفعال"}
                </CustomTag>
                <CustomButton
                  type="primary"
                  ghost
                  icon={<AiOutlineEdit />}
                  onClick={openDrawerHandler}
                  className="edit-btn"
                  disabled
                >
                  ویرایش
                </CustomButton>
              </div>
            }
          />
          <div className="banner-rate-container">
            <div className="img-container">
              <CustomUploader
                fileList={logo}
                setFileList={setLogo}
                isReadOnly={true}
                name="logo"
                uploaderText="لوگو"
                hasNullText={true}
              />
              <CustomUploader
                fileList={banner}
                setFileList={setBanner}
                isReadOnly={true}
                name="banner"
                uploaderText="بنر"
                hasNullText={true}
              />
            </div>
            <CustomRate disabled allowHalf defaultValue={getData?.data?.score} />
          </div>
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol label="عنوان" value={getData?.data?.title} />
            <SingleVerticalWithCol
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
              md={12}
              sm={24}
              span={24}
              label="توضیحات تامین کننده"
              value={getData?.data?.description}
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

            <SingleVerticalWithCol
              span={24}
              label="آدرس"
              value={getData?.data?.address}
            />
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
    </>
  );
};

export default MyVendorsDetailContent;
