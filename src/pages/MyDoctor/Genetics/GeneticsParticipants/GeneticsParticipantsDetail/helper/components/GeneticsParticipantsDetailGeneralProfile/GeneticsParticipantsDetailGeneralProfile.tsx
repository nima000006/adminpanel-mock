import "@components/Renderers/CustomChartWrapper/util/chartSetup";

import { Col, Row } from "antd";
import { PiFlag } from "react-icons/pi";

import { CustomUploader } from "@components/CustomInputs";
import CustomCard from "@components/Renderers/CustomCard/CustomCard";
import CustomChartWrapper from "@components/Renderers/CustomChartWrapper/CustomChartWrapper";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useMyDoctorSurveyDetailFirstTabQuery } from "@infra/states/redux/Apis/myDoctor/genetic/geneticApis";
import { statusClasses } from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailGeneralProfile/helper/utils";

import type { TooltipItem } from "chart.js";

const GeneticsParticipantsDetailGeneralProfile = () => {
  const { params } = useQueryParams();

  //? ================================  Api Calls ================================

  const { data, isFetching: isDataLoading } = useMyDoctorSurveyDetailFirstTabQuery({
    "survey-cycle-id": params?.id,
  });

  //* ================================ Util Functions ================================
  const masterGroups = data?.masterGroupsResult ?? [];
  const minScore = masterGroups.length
    ? Math.min(...masterGroups.map(({ minScore }) => minScore))
    : 0;
  const maxScore = masterGroups.length
    ? Math.max(...masterGroups.map(({ maxScore }) => maxScore))
    : 100;
  const stepSize = (maxScore - minScore) / 5;

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <Div className="border-neutral-5 rounded-xl border p-3" loading={isDataLoading}>
        {data?.mainGroupsResult && data.mainGroupsResult.length !== 0 ? (
          data.mainGroupsResult.map((item) => (
            <div key={item.id}>
              <CustomCard className="bg-neutral-2! flex flex-col! items-center! justify-center! border-none!">
                <h3 className="text-neutral-10 mb-3! text-center">تیپ شخصیت ژنتیک</h3>
                <div className="flex items-center justify-center gap-2">
                  <div className="shrink-0">
                    <CustomUploader
                      fileList={
                        item.imageUrl
                          ? [
                              {
                                uid: item.imageUrl,
                                name: item.imageUrl,
                                status: "done",
                                url: item.imageUrl,
                              },
                            ]
                          : []
                      }
                      setFileList={() => {}}
                      isReadOnly={true}
                      hasNullText={true}
                      uploaderText=""
                      className="border-primary-6! mb-0! h-16! w-16! overflow-hidden rounded-full p-0! text-center"
                    />
                  </div>
                  <h1 className="text-neutral-13! text-center text-xl font-semibold">
                    {item?.statusTitle}
                  </h1>
                </div>
              </CustomCard>
            </div>
          ))
        ) : (
          <div className="my-10 flex items-center justify-center">
            <CustomEmpty />
          </div>
        )}
        <div className="mx-auto h-100 w-full max-w-155">
          {masterGroups && masterGroups?.length !== 0 ? (
            <CustomChartWrapper
              type="radar"
              className="body-regular"
              data={{
                labels: masterGroups.map(({ groupTitle }) => groupTitle),
                datasets: [
                  {
                    label: "امتیاز",
                    data: masterGroups.map(({ score }) => score),
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 1,
                  },
                  {
                    label: "حداکثر امتیاز",
                    data: masterGroups.map(({ maxScore }) => maxScore),
                    borderWidth: 1,
                  },
                  {
                    label: "حداقل امتیاز",
                    data: masterGroups.map(({ minScore }) => minScore),
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  r: {
                    min: minScore,
                    max: maxScore,
                    ticks: { stepSize, font: { family: "DanaFaNum", size: 12 } },
                    pointLabels: { font: { family: "DanaFaNum", size: 12 } },
                  },
                },
                plugins: {
                  tooltip: {
                    callbacks: {
                      title: () => "",
                      label: (context: TooltipItem<"radar">) => {
                        const axisLabel =
                          context.chart.data.labels?.[context.dataIndex] ??
                          context.label ??
                          "";
                        const datasetLabel = context.dataset.label ?? "";
                        const value = context.formattedValue;

                        return axisLabel
                          ? `${String(axisLabel)} - ${datasetLabel}: ${value}`
                          : `${datasetLabel}: ${value}`;
                      },
                    },
                  },
                },
              }}
            />
          ) : (
            <div className="mt-10 flex items-center justify-center">
              <CustomEmpty />
            </div>
          )}
        </div>
        <Row gutter={[16, 16]} className="mt-5!">
          {data?.masterGroupsResult && data?.masterGroupsResult.length !== 0 ? (
            data.masterGroupsResult.map((item) => {
              const classes = statusClasses[
                item.statusEmergencyType.toLocaleLowerCase()
              ] ?? {
                bg: "bg-neutral-2!",
                text: "text-neutral-10!",
              };

              return (
                <Col key={item.groupTitle} xs={24} md={12} lg={12} xl={12}>
                  <CustomCard>
                    <h3 className="text-neutral-10 mb-2! text-center">
                      {item.groupTitle}
                    </h3>

                    <CustomCard
                      className={`${classes.bg} flex w-full flex-col! items-center! justify-center! border-none!`}
                    >
                      <p className="text-center">وضعیت</p>
                      <p className={`${classes.text} text-center`}>{item.statusTitle}</p>
                    </CustomCard>
                  </CustomCard>
                </Col>
              );
            })
          ) : (
            <Col span={24} className="mt-10 flex items-center justify-center">
              <CustomEmpty />
            </Col>
          )}
        </Row>
      </Div>
      <div className="border-neutral-5 mt-3 rounded-xl border p-3">
        <div className="bg-neutral-2! flex! items-center! justify-center! gap-2! rounded-xl border-none! p-2!">
          <span className="bg-dustred-1 text-dustred-6! inline-flex items-center justify-center rounded-md p-2">
            <PiFlag />
          </span>
          <h3 className="text-neutral-10 text-center">
            علائم هشدار ({data?.alarmsGroupsResult?.length || 0})
          </h3>
        </div>
        {!data?.alarmsGroupsResult && data?.alarmsGroupsResult?.length === 0 ? (
          <div className="mt-10 flex items-center justify-center">
            <CustomEmpty description="دیتایی برای نمایش وجود ندارد" />
          </div>
        ) : (
          data?.alarmsGroupsResult?.map((item) => (
            <div
              key={item.id}
              className="border-neutral-5 mt-5 flex! gap-2! rounded-xl border p-4!"
            >
              <span className="bg-dustred-1 text-dustred-6! inline-flex items-center justify-center rounded-md p-2">
                <PiFlag />
              </span>
              <p className="text-neutral-10 mb-0! flex items-center justify-center font-black">
                {item?.groupTitle}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default GeneticsParticipantsDetailGeneralProfile;
