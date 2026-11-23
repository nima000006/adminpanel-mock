import { Row } from "antd";

import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { GetAllSelfDetailResponse } from "@pages/Food/Contracts/AllContracts/AllContractDetail/helpers/components/SelfDetail/@types/@selfDetailTab";

const FoodAllSelfDetailsInfo = ({
  selfDetailData,
}: {
  selfDetailData: GetAllSelfDetailResponse | undefined;
}) => {
  return (
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
        value={dataPlaceHolder({
          data: selfDetailData?.data?.rules,
        })}
      />
    </Row>
  );
};
export default FoodAllSelfDetailsInfo;
