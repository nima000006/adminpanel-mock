import { useEffect, useState } from "react";

import { Button, UploadFile } from "antd";
import { useNavigate } from "react-router";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { COMMITTEE_NEW_RULES_AND_LAWS_PAGE_ROUTE } from "@infra/router/routes/committee";
import { useLazyGetRulesAndRegulationDetailQuery } from "@infra/states/redux/Apis/committee/basicInfo/basicInfoApi";
import { useLazyGetRegulationAttachmentsQuery } from "@infra/states/redux/Apis/committee/generalApis/generalApis";
import { PADDING_24 } from "@infra/VARS/globalStyles/globalStyles";
import { GetRegulationAttachmentsResponse } from "@pages/Committee/BasicInfo/RulesAndLaws/NewRulesAndLaws/@types/@newRulesAndLaws";
import "./_regulationsInfo.scss";

const RegulationsInfo = () => {
  const navigate = useNavigate();
  const id = new URLSearchParams(location.search).get("id");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  //? ================================  Api Calls ================================
  const [
    getRulesAndRegulationDetail,
    { data: rulesAndRegulationDetailData, isFetching: isRulesAndRegulationDetailLoading },
  ] = useLazyGetRulesAndRegulationDetailQuery();

  const [getAttachments, { isFetching: isGetAttachmentsDataLoading }] =
    useLazyGetRegulationAttachmentsQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getRulesAndRegulationDetail(id);
      getAttachments(id).unwrap().then(onGetAttachmentsSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const makeChangeHandler = () => {
    navigate(`${COMMITTEE_NEW_RULES_AND_LAWS_PAGE_ROUTE}?type=edit&id=${id}`);
  };

  const onGetAttachmentsSuccess = async (value: GetRegulationAttachmentsResponse) => {
    if (value?.status === 200) {
      setFileList(
        value?.data?.map((item: any) => ({
          uid: item?.uid,
          name: item?.originalName,
          status: "done",
          url: `${import.meta.env.VITE_URL_COMMITTEE}/upload?path=${item?.relativeUrl}`,
          extension: item?.extension,
          relativeUrl: item?.relativeUrl,
        }))
      );
    }
  };

  // const onImageClickHandler = async (relativeUrl: string) => {
  //   try {
  //     setIsDownloadLinkLoading(true);
  //     const downloadLink = await attachmentDownloader({
  //       name: relativeUrl,
  //       // url: `${import.meta.env.VITE_URL_COMMITTEE}/download/${relativeUrl}`, //,
  //       url: `${import.meta.env.VITE_URL_COMMITTEE}/upload?path=${relativeUrl}`, //,
  //     });

  //     if (downloadLink?.length) {
  //       toast.success(DOWNLOAD_LINK_SUCCESS, { toastId: DOWNLOAD_LINK_SUCCESS });
  //     }
  //   } catch (error) {
  //     toast.error(DOWNLOAD_LINK_ERROR, { toastId: DOWNLOAD_LINK_ERROR });
  //   } finally {
  //     setIsDownloadLinkLoading(false);
  //   }
  // };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-regulations-info">
      <Button
        type="primary"
        ghost
        className="make-change-btn"
        onClick={makeChangeHandler}
      >
        ایجاد تغییرات
      </Button>
      <CustomCard
        padding={PADDING_24}
        className="input-wrapper"
        loading={isRulesAndRegulationDetailLoading}
      >
        {rulesAndRegulationDetailData && (
          <>
            <div className="grid-cols-3">
              <SingleVerticalItem
                label="عنوان"
                value={dataPlaceHolder({
                  data: rulesAndRegulationDetailData?.data[0]?.title,
                })}
              />
              <SingleVerticalItem
                label="شماره"
                value={dataPlaceHolder({
                  data: rulesAndRegulationDetailData?.data[0]?.number,
                })}
              />
              <SingleVerticalItem
                label="تاریخ ایجاد"
                value={dataPlaceHolder({
                  data: rulesAndRegulationDetailData?.data[0]?.date,
                  isDate: true,
                })}
              />
            </div>
            <Div className="attach-row" loading={isGetAttachmentsDataLoading}>
              <CustomUploader
                fileList={fileList}
                setFileList={setFileList}
                label="پیوست ها"
                hasNullText={true}
              />
            </Div>
          </>
        )}
      </CustomCard>
    </div>
  );
};
export default RegulationsInfo;
