import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { GetMyContractDetailResponse } from "@pages/Food/Contracts/MyContracts/MyContractDetail/helpers/components/MyContractDetail/@types/@myContractDetailTab";

const MyFoodScheduleContractInfo = ({
  getContractDetailData,
}: {
  getContractDetailData: GetMyContractDetailResponse | undefined;
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
      {/* //Todo[Atefeh]: uncomment if needed in future */}
      {/* <SingleVerticalWithCol md={12} sm={24}
                  label="درصد دانشجویار"
                  value={` % ${getContractDetailData?.data?.providerPercentage}`}
                />
                <SingleVerticalWithCol md={12} sm={24}
                  label="درصد دانشگاه"
                  value={` % ${getContractDetailData?.data?.restaurantPercentage}`}
                />
                <SingleVerticalWithCol md={12} sm={24} 
                  label="درصد تأمین کننده"
                  value={` % ${getContractDetailData?.data?.vendorPercentage}`}
                /> */}

      <SingleVerticalWithCol
        span={24}
        label="توضیحات"
        value={getContractDetailData?.data?.description}
      />
    </>
  );
};
export default MyFoodScheduleContractInfo;
