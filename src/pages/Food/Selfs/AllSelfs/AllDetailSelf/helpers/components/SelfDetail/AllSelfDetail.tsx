import { useCallback, useEffect, useState } from "react";

import { UploadFile } from "antd";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomMap from "@components/CustomInputs/CustomMap/CustomMap";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomRate from "@components/Renderers/CustomRate/CustomRate";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetAllSelfDetailQuery } from "@infra/states/redux/Apis/food/self/selfApis";
import { GetAllSelfDetailResponse } from "@pages/Food/Contracts/AllContracts/AllContractDetail/helpers/components/SelfDetail/@types/@selfDetailTab";

import SelfDetailDrawerContent from "./helpers/components/DrawerContent/DrawerContent";
import FoodAllSelfDetailsInfo from "./helpers/components/FoodAllSelfDetailsInfo/FoodAllSelfDetailsInfo";
import FoodAllSelfDetailsInfoContact from "./helpers/components/FoodAllSelfDetailsInfoContact/FoodAllSelfDetailsInfoContact";
import "./_allSelfDetail.scss";

const AllSelfsDetail = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [lat, setLat] = useState<number>(35.699739);
  const [lng, setLng] = useState<number>(51.338097);

  const [logo, setLogo] = useState<UploadFile[]>([]);
  const [banner, setBanner] = useState<UploadFile[]>([]);

  const {
    params: { id },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getSelfDetail, { data: selfDetailData, isFetching: isSelfDetailLoading }] =
    useLazyGetAllSelfDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getSelfData(id);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getSelfData = (selfId?: string) => {
    if (selfId) {
      getSelfDetail({ restaurantId: selfId }).unwrap().then(getSelfDetailOnSuccess);
    }
  };

  const getSelfDetailOnSuccess = async (value: GetAllSelfDetailResponse) => {
    if (value?.status === 200) {
      const logoValue = value?.data?.logoName;
      const coverValue = value?.data?.coverName;
      if (logoValue) {
        setLogo([
          {
            uid: logoValue,
            name: logoValue,
            status: "done",
            url: logoValue,
          },
        ]);
      } else {
        setLogo([]);
      }
      if (coverValue) {
        setBanner([
          {
            uid: coverValue,
            name: coverValue,
            status: "done",
            url: coverValue,
          },
        ]);
      } else {
        setBanner([]);
      }

      setLat(value?.data?.latitude);
      setLng(value?.data?.longitude);
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
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
          title="ویرایش سلف"
          onClose={closeDrawerHandler}
          open={isDrawerOpen}
          className="all-selfs-detail-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <SelfDetailDrawerContent
              isDrawerOpen={isDrawerOpen}
              closeDrawerHandler={closeDrawerHandler}
              selfDetailData={selfDetailData?.data}
              getSelfData={getSelfData}
            />
          }
        />
      )}
      <Div className="all-selfs-detail-tab-container" loading={isSelfDetailLoading}>
        <section className="self-information-container">
          <CustomDivider
            text="اطلاعات سلف"
            extraContent={
              <div className="divider-btn-container">
                <CustomTag color={selfDetailData?.data?.active ? "green" : "red"}>
                  {selfDetailData?.data?.active ? "فعال" : "غیرفعال"}
                </CustomTag>
                <CustomButton
                  type="primary"
                  ghost
                  icon={<AiOutlineEdit />}
                  onClick={openDrawerHandler}
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
                hasNullText
              />
              <CustomUploader
                fileList={banner}
                setFileList={setBanner}
                isReadOnly={true}
                name="banner"
                uploaderText="بنر"
                hasNullText
              />
            </div>
            <CustomRate allowHalf defaultValue={selfDetailData?.data?.score} disabled />
          </div>
          <FoodAllSelfDetailsInfo selfDetailData={selfDetailData} />
        </section>
        <section className="contact-information-container">
          <CustomDivider text="اطلاعات تماس" />
          <FoodAllSelfDetailsInfoContact selfDetailData={selfDetailData} />
          <CustomMap
            lat={selfDetailData?.data?.latitude ? selfDetailData?.data?.latitude : lat}
            lng={selfDetailData?.data?.longitude ? selfDetailData?.data?.longitude : lng}
            setLat={setLat}
            setLng={setLng}
            isReadOnly={true}
          />
        </section>
      </Div>
    </>
  );
};

export default AllSelfsDetail;
