import { useState } from "react";

import { Form, Steps } from "antd";
import { UploadFile } from "antd/es/upload";

import { stepStatusCreator } from "@infra/helpers/utils";

import { RoomDeliverModalContentProps } from "./@types/@roomDeliverModalContent";
import AdmissionFormStep from "./helper/components/AdmissionFormStep/AdmissionFormStep";
import UploadDocumentStep from "./helper/components/UploadDocumentStep/UploadDocumentStep";
import "./_roomDeliverModalContent.scss";

const RoomDeliverModalContent = ({
  form,
  current,
  setFirstImageName,
  setSecondImageName,
}: RoomDeliverModalContentProps) => {
  const [firstImageList, setFirstImageList] = useState<UploadFile[]>([]);
  const [secondImageList, setSecondImageList] = useState<UploadFile[]>([]);

  const stepsItem = [
    {
      id: "1",
      children: (
        <UploadDocumentStep
          setFirstImageName={setFirstImageName}
          setSecondImageName={setSecondImageName}
          firstImageList={firstImageList}
          setFirstImageList={setFirstImageList}
          secondImageList={secondImageList}
          setSecondImageList={setSecondImageList}
        />
      ),
    },
    {
      id: "2",
      children: <AdmissionFormStep form={form} />,
    },
  ];

  return (
    <Form className="room-delivered-modal-content-container" form={form}>
      <Steps
        type="navigation"
        current={current}
        className="site-navigation-steps"
        items={[
          {
            status: stepStatusCreator(current, 0),
            title: "بارگذاری مدارک",
          },
          {
            status: stepStatusCreator(current, 1),
            title: "فرم پذیرش",
          },
        ]}
      />
      {stepsItem[current].children}
    </Form>
  );
};

export default RoomDeliverModalContent;
