import { useEffect, useState } from "react";

import { UploadFile } from "antd";
import { AiOutlineEdit } from "react-icons/ai";

import { CustomButton } from "@components/CustomInputs";
import CustomMap from "@components/CustomInputs/CustomMap/CustomMap";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import { CateringSelfsDetailProps } from "@pages/Catering/Selfs/_shared/helper/components/CateringSelfComponents/CateringSelfsDetail/@types/@cateringSelfsDetail";
import { getCateringSelfStatusTypeTagConfig } from "@pages/Catering/Selfs/_shared/utils";
import TicketRate from "@pages/Ticketing/_shared/components/TicketRate/TicketRate";

import CateringSelfsDetailsInfo from "./helpers/components/CateringSelfsDetailsInfo/CateringSelfsDetailsInfo";
import CateringSelfsDetailsInfoContact from "./helpers/components/CateringSelfsDetailsInfoContact/CateringSelfsDetailsInfoContact";

const DEFAULT_LAT = 35.699739; // default lat
const DEFAULT_LNG = 51.338097; // default lng

const CateringSelfsDetail = ({
  data,
  isLoading = false,
  onEdit,
}: CateringSelfsDetailProps) => {
  const [lat, setLat] = useState<number>(DEFAULT_LAT);
  const [lng, setLng] = useState<number>(DEFAULT_LNG);
  const [logo, setLogo] = useState<UploadFile[]>([]);
  const [banner, setBanner] = useState<UploadFile[]>([]);

  const statusTagConfig = getCateringSelfStatusTypeTagConfig(data?.statusType);

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
      setLat(data?.latitude);
    }
    if (data.longitude != null) {
      setLng(data?.longitude);
    }
  }, [data]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isLoading}>
      <section>
        <CustomDivider
          text="اطلاعات سلف"
          extraContent={
            <div className="flex gap-2">
              {statusTagConfig ? (
                <CustomTag color={statusTagConfig.color}>
                  {statusTagConfig.label}
                </CustomTag>
              ) : null}
              <CustomButton icon={<AiOutlineEdit />} onClick={onEdit}>
                ویرایش
              </CustomButton>
            </div>
          }
        />
        <div className="flex justify-between">
          <div className="flex gap-2">
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
          <TicketRate key={data?.id} value={data?.score} allowHalf disabled />
        </div>
        <CateringSelfsDetailsInfo selfDetailData={data} />
      </section>
      <section>
        <CustomDivider text="اطلاعات تماس" />
        <CateringSelfsDetailsInfoContact selfDetailData={data} />
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

export default CateringSelfsDetail;
