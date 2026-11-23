import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { GetContractDetailResponse } from "@pages/Food/Contracts/AllContracts/AllContractDetail/helpers/components/AllContractDetail/@types/@allContractDetailTab";

const AllFoodScheduleContractInfo = ({
  getContractDetailData,
}: {
  getContractDetailData: GetContractDetailResponse | undefined;
}) => {
  return (
    <>
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="عنوان قرارداد"
        value={getContractDetailData?.data?.title}
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="نام تأمین کننده"
        value={getContractDetailData?.data?.vendorTitle}
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="نام سلف"
        value={getContractDetailData?.data?.restaurantTitle}
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="شماره قرارداد"
        value={getContractDetailData?.data?.contractUUID}
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="شروع قرارداد"
        value={getContractDetailData?.data?.startedDate}
        isDate
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="پایان قرارداد"
        value={getContractDetailData?.data?.endDate}
        isDate
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="درصد دانشجویار"
        value={` % ${getContractDetailData?.data?.providerPercentage}`}
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="درصد دانشگاه"
        value={` % ${getContractDetailData?.data?.restaurantPercentage}`}
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="درصد تأمین کننده"
        value={` % ${getContractDetailData?.data?.vendorPercentage}`}
      />

      <SingleVerticalWithCol
        span={24}
        label="توضیحات"
        value={getContractDetailData?.data?.description}
      />
    </>
  );
};
export default AllFoodScheduleContractInfo;
