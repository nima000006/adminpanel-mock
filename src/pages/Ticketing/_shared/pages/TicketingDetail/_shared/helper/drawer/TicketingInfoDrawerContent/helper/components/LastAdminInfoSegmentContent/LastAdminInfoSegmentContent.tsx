import { useEffect, useState } from "react";

import { Descriptions, DescriptionsProps, UploadFile } from "antd";
import { Link } from "react-router";

import { CustomUploader } from "@components/CustomInputs";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import Div from "@components/Renderers/Div/Div";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MANAGEMENT_MY_DETAIL_PAGE_ROUTE } from "@infra/router/routes/management";
import { LastAdminInfoSegmentContentProps } from "@pages/Ticketing/_shared/pages/TicketingDetail/_shared/helper/drawer/TicketingInfoDrawerContent/helper/components/LastAdminInfoSegmentContent/@types/@lastAdminInfoSegmentContent";

const LastAdminInfoSegmentContent = ({
  isDetailExpertInfoLoading,
  detailExpertInfoData,
  onDetailExpertInfo,
}: LastAdminInfoSegmentContentProps) => {
  const { params } = useQueryParams();
  const [fileList, setFileList] = useState<UploadFile<unknown>[]>([]);

  //? ================================ Effects ================================
  useEffect(() => {
    if (params?.ticketId && onDetailExpertInfo) {
      onDetailExpertInfo({ ticketId: params.ticketId });
    }
  }, [params?.ticketId, onDetailExpertInfo]);

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Div loading={isDetailExpertInfoLoading}>
      {detailExpertInfoData?.length === 0 || !detailExpertInfoData ? (
        <CustomEmpty description="دیتایی برای نمایش وجود ندارد" />
      ) : (
        detailExpertInfoData?.map((item) => {
          const lastAdminInfoItems: DescriptionsProps["items"] = [
            {
              key: "1",
              label: "شعبه / واحد",
              children: item?.assignBranchName,
            },
          ];
          return (
            <div className="border-neutral-4 bg-neutral-2 mt-5 flex items-center gap-2 rounded-lg border p-4!">
              <div className="shrink-0">
                <CustomUploader
                  fileList={fileList}
                  setFileList={setFileList}
                  isReadOnly={true}
                  hasNullText={true}
                  className="border-primary-6! mb-0! h-16! w-16! overflow-hidden rounded-full p-0! text-center"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  className="text-primary-6!"
                  to={{
                    pathname: MANAGEMENT_MY_DETAIL_PAGE_ROUTE,
                    search: makeSearchParams({
                      id: item?.assignById,
                    }),
                  }}
                >{`${item?.assignByName} (${item?.assignRole?.title})`}</Link>

                <div>
                  <Descriptions
                    column={1}
                    items={lastAdminInfoItems}
                    styles={{
                      label: {
                        fontWeight: "bold",
                        textAlign: "right",
                        width: "100px",
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })
      )}
    </Div>
  );
};
export default LastAdminInfoSegmentContent;
