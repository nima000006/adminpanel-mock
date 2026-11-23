import { Row } from "antd";

import { CustomUploader } from "@components/CustomInputs";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { GetMyResidenceDataResponse } from "@pages/Dormitory/Residence/MyResidence/MyResidenceDetail/@types/@myResidenceDetail";

const MyResidenceDetailBaseInformation = ({
  dataSource,
}: {
  dataSource: GetMyResidenceDataResponse | undefined;
}) => {
  //* ================================ Util Functions ================================
  const renderDefaultUploader = () => (
    <CustomUploader
      fileList={[]}
      setFileList={() => {}}
      isReadOnly
      hasUploaderIcon={false}
      hasNullText
      uploaderText="عکس اقامتگاه"
    />
  );

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <p className="mb-1! font-medium">عکس اقامتگاه</p>
      <div className="flex gap-4">
        {dataSource?.images?.length
          ? dataSource.images.map((item) => (
              <CustomUploader
                key={item?.uuid}
                fileList={
                  item?.url
                    ? [
                        {
                          uid: item.url,
                          name: item.url,
                          url: item.url,
                          status: "done",
                        },
                      ]
                    : []
                }
                setFileList={() => {}}
                isReadOnly
                hasUploaderIcon={false}
                hasNullText
                uploaderText="عکس اقامتگاه"
              />
            ))
          : [0, 1].map((item) => <div key={item}>{renderDefaultUploader()}</div>)}
      </div>
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          label="عنوان اقامتگاه"
          value={dataSource?.faTitle || dataSource?.title}
          lg={8}
        />
        <SingleVerticalWithCol
          label="نوع اقامتگاه"
          value={dataSource?.accommodationType?.title}
          lg={8}
        />
        <SingleVerticalWithCol
          label="درجه کیفی"
          value={dataSource?.qualityGrade?.title}
          lg={8}
        />
        <SingleVerticalWithCol
          label="ظرفیت اسمی"
          value={dataPlaceHolder({ data: dataSource?.nominalCapacity, isPrice: true })}
          extraContent={<span className="text-neutral-7">نفر</span>}
          lg={8}
        />
        <SingleVerticalWithCol
          label="کسب و کار"
          value={dataSource?.businessName}
          lg={8}
        />
        <SingleVerticalWithCol
          label="شعبه / واحد"
          value={dataSource?.branchName}
          lg={8}
        />
        <SingleVerticalWithCol
          label="مساحت کل اقامتگاه"
          value={dataSource?.areaSquareMeters?.toString()}
          isPrice
          lg={8}
          extraContent={<span className="text-neutral-7">متر مربع</span>}
        />
        <SingleVerticalWithCol
          label="مساحت فضای سبز "
          value={dataSource?.greenSpaceAreaSquareMeters?.toString()}
          isPrice
          lg={8}
          extraContent={<span className="text-neutral-7">متر مربع</span>}
        />
      </Row>
    </>
  );
};

export default MyResidenceDetailBaseInformation;
