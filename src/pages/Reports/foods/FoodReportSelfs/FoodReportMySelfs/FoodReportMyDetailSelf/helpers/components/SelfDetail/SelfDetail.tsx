import { useEffect, useState } from "react";

import { UploadFile } from "antd";
import { toast } from "react-toastify";

import CustomMap from "@components/CustomInputs/CustomMap/CustomMap";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetMySelfDetailQuery } from "@infra/states/redux/Apis/food/self/selfApis";
import { GetMySelfDetailResponse } from "@pages/Food/Contracts/MyContracts/MyContractDetail/helpers/components/SelfDetail/@types/@selfDetailTab";

import SelfDetailsInfo from "./helpers/components/SelfDetailsInfo/SelfDetailsInfo";
import SelfDetailsInfoContact from "./helpers/components/SelfDetailsInfoContact/SelfDetailsInfoContact";

import "./_selfDetail.scss";

const SelfDetail = () => {
  const [lat, setLat] = useState<number>(35.699739);
  const [lng, setLng] = useState<number>(51.338097);

  const [logo, setLogo] = useState<UploadFile[]>([]);
  const [banner, setBanner] = useState<UploadFile[]>([]);

  const { params } = useQueryParams<{ id: string }>();
  const { id } = params;

  //? ================================  Api Calls ================================
  const [getSelfDetail, { data: selfDetailData, isFetching: isSelfDetailLoading }] =
    useLazyGetMySelfDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getSelfData(id);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getSelfDetailOnSuccess = async (value: GetMySelfDetailResponse) => {
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

  // get detail data
  const getSelfData = (selfId?: string) => {
    if (selfId) {
      getSelfDetail({ restaurantId: selfId }).unwrap().then(getSelfDetailOnSuccess);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div className="my-self-detail-tab-container" loading={isSelfDetailLoading}>
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
        <SelfDetailsInfo
          logo={logo}
          setLogo={setLogo}
          banner={banner}
          setBanner={setBanner}
          selfDetailData={selfDetailData}
        />
      </section>
      <section className="contact-information-container">
        <CustomDivider text="اطلاعات تماس" />
        <SelfDetailsInfoContact selfDetailData={selfDetailData} />
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

export default SelfDetail;
