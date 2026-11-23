import { Row } from "antd";

import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomRate from "@components/Renderers/CustomRate/CustomRate";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { SelfDetailsInfoProps } from "./@types/SelfDetailsInfoProps";

const SelfDetailsInfo = ({
  selfDetailData,
  logo,
  setLogo,
  banner,
  setBanner,
}: SelfDetailsInfoProps) => {
  return (
    <>
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
              ? "آقایان"
              : selfDetailData?.data?.genderType === 1
                ? "بانوان"
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
    </>
  );
};
export default SelfDetailsInfo;
