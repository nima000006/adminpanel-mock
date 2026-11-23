import { useCallback, useEffect, useState } from "react";

import { Row, UploadFile } from "antd";
import { toast } from "react-toastify";

import CustomMap from "@components/CustomInputs/CustomMap/CustomMap";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomRate from "@components/Renderers/CustomRate/CustomRate";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetMySelfDetailQuery } from "@infra/states/redux/Apis/food/self/selfApis";

import { GetMySelfDetailResponse } from "./@types/@selfDetailTab";

import "./_mySelfDetailTab.scss";

const MySelfDetailTab = () => {
  const [lat, setLat] = useState<number>(35.699739);
  const [lng, setLng] = useState<number>(51.338097);

  const [logo, setLogo] = useState<UploadFile[]>([]);
  const [banner, setBanner] = useState<UploadFile[]>([]);
  const {
    params: { selfId },
  } = useQueryParams<{ selfId: string }>();

  //? ================================  Api Calls ================================
  const [getSelfDetail, { data: selfDetailData, isFetching: isSelfDetailLoading }] =
    useLazyGetMySelfDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (selfId) {
      getSelfDetail({ restaurantId: selfId }).unwrap().then(getSelfDetailOnSuccess);
    }
  }, [selfId]);

  //* ================================ Util Functions ================================
  const getSelfDetailOnSuccess = useCallback(async (value: GetMySelfDetailResponse) => {
    if (value?.status === 200) {
      setLogo([
        {
          uid: value?.data?.logoName,
          name: value?.data?.logoName,
          status: "done",
          url: value?.data?.logoName,
        },
      ]);
      setBanner([
        {
          uid: value?.data?.coverName,
          name: value?.data?.coverName,
          status: "done",
          url: value?.data?.coverName,
        },
      ]);

      setLat(value?.data?.latitude);
      setLng(value?.data?.longitude);
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div className="my-contract-self-detail-tab-container" loading={isSelfDetailLoading}>
      <section className="self-information-container">
        <CustomDivider
          text="اطلاعات سلف"
          extraContent={
            <div className="divider-btn-container">
              <CustomTag color={selfDetailData?.data?.active ? "green" : "red"}>
                {selfDetailData?.data?.active ? "فعال" : "غیرفعال"}
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
              name="logo"
              uploaderText="لوگو"
            />
            <CustomUploader
              fileList={banner}
              setFileList={setBanner}
              isReadOnly={true}
              name="banner"
              uploaderText="بنر"
            />
          </div>
          <CustomRate allowHalf defaultValue={selfDetailData?.data?.score} disabled />
        </div>
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="عنوان"
            value={selfDetailData?.data?.title}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="واحد دانشگاهی"
            value={selfDetailData?.data?.ownerBranchCodeBranchName}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="جنسیت"
            value={
              selfDetailData?.data?.genderType === 0
                ? "پسرانه"
                : selfDetailData?.data?.genderType === 1
                  ? "دخترانه"
                  : "مختلط"
            }
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="ظرفیت (نفر)"
            value={selfDetailData?.data?.capacity?.toString()}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="نام مسئول سلف"
            value={selfDetailData?.data?.managerFirstName}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="نام خانوادگی مسئول سلف"
            value={selfDetailData?.data?.managerLastName}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="کد ملی مسئول سلف"
            value={selfDetailData?.data?.managerUserName}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="شماره تلفن مسئول سلف"
            value={selfDetailData?.data?.phone}
          />

          <SingleVerticalWithCol
            span={24}
            label="توضیحات سلف"
            value={selfDetailData?.data?.description}
          />

          <SingleVerticalWithCol
            span={24}
            label="قوانین و مقررات سلف"
            value={selfDetailData?.data?.rules}
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
            value={selfDetailData?.data?.provinceStateName}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="شهر"
            value={selfDetailData?.data?.provinceName}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="شماره تلفن "
            value={selfDetailData?.data?.restaurantPhone}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="کد پستی"
            value={selfDetailData?.data?.postalCode}
          />

          <SingleVerticalWithCol
            span={24}
            label="آدرس"
            value={selfDetailData?.data?.address}
          />
        </Row>
        <CustomMap
          lat={selfDetailData?.data?.latitude ? selfDetailData?.data?.latitude : lat}
          lng={selfDetailData?.data?.longitude ? selfDetailData?.data?.longitude : lng}
          setLat={setLat}
          setLng={setLng}
          isReadOnly={true}
        />
      </section>
    </Div>
  );
};

export default MySelfDetailTab;
