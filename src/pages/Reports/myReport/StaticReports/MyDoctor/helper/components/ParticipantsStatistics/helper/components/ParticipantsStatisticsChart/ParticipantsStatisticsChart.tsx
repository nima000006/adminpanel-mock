import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import moment from "jalali-moment";
import { PiInfoThin } from "react-icons/pi";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import { CustomChart } from "@components/Renderers/CustomChart";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import Div from "@components/Renderers/Div/Div";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useMyReportDetailsMutation } from "@infra/states/redux/Apis/report/myReport";
import {
  ParticipantsStatisticsChartDataItem,
  ParticipantsStatisticsSeriesItem,
  MyReportDetailsResponse,
} from "@pages/Reports/myReport/StaticReports/MyDoctor/@types/@myDoctorStaticReport";

import { ParticipantsStatisticsChartProps } from "./@types/@participantsStatisticsChart";

export const ParticipantsStatisticsChart = ({
  createBodyParams,
  serviceDetailData,
  triggerItems,
  isFormValid,
  validateData,
}: ParticipantsStatisticsChartProps) => {
  const [participantsStatisticsOptions, setParticipantsStatisticsOptions] = useState<
    { id: number; title: string }[]
  >([]);
  const [isDataValid, setIsDataValid] = useState<boolean | null>(null);

  //آمار شرکت کنندگان
  const [participantsStatistics, setParticipantsStatistics] = useState<{
    data: ParticipantsStatisticsChartDataItem[];
    series: ParticipantsStatisticsSeriesItem[];
  }>({
    data: [],
    series: [],
  });

  const {
    params: { card },
  } = useQueryParams();

  const [participantForm] = Form.useForm();
  //? ================================  Api Calls ================================
  const [getReportDetail, { isLoading: isReportDetailLoading }] =
    useMyReportDetailsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if ((card === "1" && serviceDetailData) || !card) {
      if (!isFormValid) {
        return;
      }
      // create statistics options
      const participantsItems = serviceDetailData?.reportDetailDtos?.filter(
        (item) => item.reportTypeTitle === "LINE_CHART"
      );

      setParticipantsStatisticsOptions(
        participantsItems?.map((item) => ({
          id: item?.reportId,
          title: item?.reportTitle,
        })) || []
      );

      if (participantsItems && participantsItems.length > 0 && participantsItems[0]) {
        getParticipantsStatisticsDetailHandler(participantsItems[0].reportId);

        participantForm.setFieldsValue({
          participant: selectDefaultValueGenerator({
            id: participantsItems[0].reportId,
            title: participantsItems[0].reportTitle,
          }),
        });
      }
    }
  }, [card, triggerItems, serviceDetailData, isFormValid]);

  //* ================================ Util Functions ================================

  // آمار شرکت کنندگان
  const getParticipantsStatisticsDetailHandler = (id: number) => {
    getReportDetail({
      id: id,
      params: createBodyParams() || {},
    })
      .unwrap()
      .then((value: MyReportDetailsResponse) => {
        // Validate data
        const isValid = validateData(value?.data, "LINE_CHART");
        setIsDataValid(isValid);

        if (!isValid) {
          setParticipantsStatistics({ data: [], series: [] });
          return;
        }

        const dataArray = Array.isArray(value?.data) ? value.data : [];
        const tempData: ParticipantsStatisticsChartDataItem[] = dataArray.map((item) => {
          const itemRecord = item as Record<string, unknown>;
          return {
            ...itemRecord,
            date: moment(itemRecord?.date as string, "YYYY-MM-DD").format(
              "jYYYY/jMM/jDD"
            ),
          } as ParticipantsStatisticsChartDataItem;
        });

        const oneItem = tempData[0];
        if (!oneItem) {
          setParticipantsStatistics({ data: [], series: [] });
          return;
        }

        const keys = Object.keys(oneItem);

        // Filter p1, p2, p3 ...
        const pKeys = keys.filter((k) => /^p\d+$/.test(k));

        const series: ParticipantsStatisticsSeriesItem[] = pKeys.map((key) => ({
          dataKey: key,
          label: (oneItem[`${key}_title`] as string) || key,
        }));

        setParticipantsStatistics({ data: tempData, series: series });
      })
      .catch(() => {
        setIsDataValid(false);
        setParticipantsStatistics({ data: [], series: [] });
      });
  };

  return (
    <div className="direction-rtl border-neutral-4 flex flex-col gap-8 rounded-lg border pb-10!">
      <div className="p-6!">
        <CustomDivider
          text="آمار شرکت کنندگان"
          extraContent={
            <div className="flex items-center gap-2">
              <PiInfoThin size={16} className="text-neutral-4" />
            </div>
          }
        />
        <Form form={participantForm}>
          <Row>
            <Col span={24}>
              <CustomSelect
                label=""
                name="participant"
                options={participantsStatisticsOptions}
                form={participantForm}
                onChange={(e) => getParticipantsStatisticsDetailHandler(e as number)}
              />
            </Col>
          </Row>
        </Form>
      </div>
      <Div loading={isReportDetailLoading}>
        {isDataValid === false ? (
          <CustomCard>
            <div className="report-info-not-found">دیتا پشتیبانی نمیشود</div>
          </CustomCard>
        ) : isDataValid === null || !participantsStatistics.data.length ? (
          <CustomEmpty />
        ) : (
          <CustomChart
            type="line"
            data={{
              dataset: participantsStatistics.data,
              series: participantsStatistics.series.map((s) => ({
                data: participantsStatistics.data.map(
                  (item) => (item[s.dataKey] as number) || 0
                ),
                label: s.label,
                showMark: false,
              })),
              yAxis: [
                {
                  tickLabelStyle: {
                    textAnchor: "end",
                    direction: "ltr",
                  },
                },
              ],
              xAxis: [
                {
                  scaleType: "point",
                  dataKey: "date",
                },
              ],
            }}
            config={{
              height: 300,
              grid: { horizontal: true },
              loading: isReportDetailLoading,
            }}
          />
        )}
      </Div>
    </div>
  );
};

export default ParticipantsStatisticsChart;
