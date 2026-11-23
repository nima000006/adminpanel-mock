import { useEffect, useState } from "react";

import { UploadFile } from "antd";

import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";

import { InsuranceRequestStatus } from "../StatusGenerator/StatusGenerator";
import { InsuranceCardProps } from "./@types/@insuranceCard";

import "./_insuranceCard.scss";
import { dataPlaceHolder } from "@infra/helpers/utils";

const InsuranceCard = ({
  img,
  title,
  role,
  period,
  price,
  status,
}: InsuranceCardProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  //? ================================ Effects ================================
  useEffect(() => {
    if (img) {
      setFileList([
        {
          uid: img,
          size: 0,
          name: img,
          fileName: img,
          lastModified: 0,
          url: img,
        },
      ]);
    }
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="insurance-card-container">
      <CustomUploader
        fileList={fileList}
        setFileList={setFileList}
        isReadOnly={true}
        name="insured"
        uploaderText="مدرک"
        hasNullText
      />
      <div className="info-container">
        <div className="title-status-container">
          <h3 className="title">{title}</h3>
          <InsuranceRequestStatus status={status} />
        </div>
        <span className="role">{role}</span>
        <span className="period">{period}</span>
        <div className="price-container">
          <span className="price">
            {dataPlaceHolder({
              data: price?.toString(),
              isPrice: true,
            })}{" "}
          </span>
          <div className="currency">تومان</div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceCard;
