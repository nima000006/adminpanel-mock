import { useEffect, useState } from "react";

import { Form } from "antd";

import Div from "@components/Renderers/Div/Div";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useMyReportDetailMutation,
  useMyReportDetailsMutation,
  useMyReportParamDetailMutation,
} from "@infra/states/redux/Apis/report/myReport";

import { ReportDetailResponse } from "../@types/@myReportTypes";
import {
  MyReportDetailsResponse,
  MyReportMainServiceDetailParamDtos,
} from "../StaticReports/MyDoctor/@types/@myDoctorStaticReport";
import FilterForm from "./helper/components/FilterForm/FilterForm";
import ReportItems from "./helper/components/ReportItems/ReportItems";
import SectionButtons from "./helper/components/SectionButtons/SectionButtons";
import "./_myReportDetail.scss";

const GeneralReportDetail = () => {
  const [activeSection, setActiveSection] = useState(1); //active first section
  const [detailData, setDetailData] = useState<ReportDetailResponse>();
  const [detailDataWithId, setDetailDataWithId] = useState<MyReportDetailsResponse[]>();
  const [selectOptions, setSelectOptions] = useState<
    Record<string, { id: number; title: string }[]>
  >({});
  const [activeReportId, setActiveReportId] = useState<number | null>(null);
  const [sectionsDisabled, setSectionsDisabled] = useState(false);
  const [loadingReportIds, setLoadingReportIds] = useState<Set<number>>(new Set());
  const [selectedReportsByType, setSelectedReportsByType] = useState<
    Record<number, number>
  >({});
  const [filterParams, setFilterParams] = useState<Record<number, string>>({});

  const {
    params: { title, id },
  } = useQueryParams();
  const [form] = Form.useForm();

  useTitle({
    breadcrumbItems: [
      { title: <span className="custom-breadcrumb">گزارشات</span> },
      { title: ` گزارشات ${title}` },
    ],
  });

  const areRequiredParamsFilled = () => {
    if (!detailData?.paramDtos?.length) return true;

    const requiredKeys = detailData.paramDtos.filter((p) => p.required).map((p) => p.key);

    if (!requiredKeys.length) return true;

    const values = form.getFieldsValue();

    return requiredKeys.every((key) => {
      const v = values[key];
      return v !== undefined && v !== null && v !== "";
    });
  };

  //? ================================  Api Calls ================================
  const [getReportsDetail, { isLoading: isGetReportsDetailLoading }] =
    useMyReportDetailMutation();
  const [getParamDetail] = useMyReportParamDetailMutation();
  const [getReportsDetailData] = useMyReportDetailsMutation();

  //? ================================  Effects ================================

  useEffect(() => {
    if (id) {
      getReportsDetail({ id: Number(id) })
        .unwrap()
        .then((data) => {
          setDetailData(data);
          setActiveReportId(data.reportDetailDtos?.[0]?.reportId || null);
        });
    }
  }, [id, getReportsDetail]);

  useEffect(() => {
    if (!detailData) return;
    if (!activeReportId) return;

    // اگر required ها پر نیست → هیچ کاری نکن
    if (!areRequiredParamsFilled()) {
      setDetailDataWithId(undefined); // مهم: باعث CustomEmpty میشه
      return;
    }

    setSectionsDisabled(true);

    const reportsByType: Record<number, number> = {};

    detailData.reportDetailDtos
      .filter((d) => d.section === activeSection)
      .forEach((d) => {
        if (!reportsByType[d.reportTypeId]) {
          reportsByType[d.reportTypeId] = d.reportId;
        }
      });

    setSelectedReportsByType(reportsByType);

    const reportIdsToFetch = Object.values(reportsByType);

    setLoadingReportIds(new Set(reportIdsToFetch));
    setDetailDataWithId([]); // loading state واقعی

    Promise.all(
      reportIdsToFetch.map((reportId) =>
        getReportsDetailData({ id: reportId, params: filterParams })
          .unwrap()
          .then((result) => {
            const normalized = Array.isArray(result) ? result : [result];

            setDetailDataWithId((prev = []) => {
              const reportTypeId = normalized[0]?.reportTypeId;
              const others = prev.filter((item) => item.reportTypeId !== reportTypeId);
              return [...others, ...normalized];
            });

            setLoadingReportIds((prev) => {
              const copy = new Set(prev);
              copy.delete(reportId);
              return copy;
            });
          })
          .catch(() => {
            setLoadingReportIds((prev) => {
              const copy = new Set(prev);
              copy.delete(reportId);
              return copy;
            });
          })
      )
    ).finally(() => {
      setSectionsDisabled(false);
    });
  }, [activeSection, activeReportId, detailData, filterParams]);

  // ================================  Event Handlers ================================

  const handleSectionClick = (sectionNumber: number) => {
    if (sectionsDisabled) return;
    setActiveSection(sectionNumber);
  };

  const handleFilterChange = () => {
    if (!detailData?.paramDtos) return;

    const requiredFields = detailData.paramDtos
      .filter((item) => item.required)
      .map((item) => item.key);

    const formData = form.getFieldsValue();

    const allRequiredFilled = requiredFields.every((key) => {
      const value = formData[key];
      return value !== undefined && value !== null && value !== "";
    });

    // اگر حتی یکی از required خالیه → دیتای قبلی پاک بشه و CustomEmpty نمایش داده بشه
    if (!allRequiredFilled) {
      setDetailDataWithId([]); // پاک کردن داده‌ها
      setSelectedReportsByType({}); // ریست انتخاب‌ها
      return; // هیچ requestی نزده میشه
    }

    // اگر همه required پر بودن → request بزن
    const params: Record<number, any> = {};
    detailData.paramDtos.forEach((item) => {
      const value = formData[item.key];
      if (value !== undefined && value !== null && value !== "") {
        if (item.paramType === 3) {
          params[item.paramId] = value;
        } else if (item.paramType === 2) {
          params[item.paramId] = value?.code || value;
        }
      }
    });

    setFilterParams(params); // این متد useEffect مربوط به fetch رو trigger میکنه
  };

  const handleReportIdChange = (reportTypeId: number, reportId: number) => {
    const isReportLoaded = detailDataWithId?.some(
      (item) => item.reportId === reportId && item.reportTypeId === reportTypeId
    );

    setSelectedReportsByType((prev) => ({
      ...prev,
      [reportTypeId]: reportId,
    }));

    if (isReportLoaded) {
      return;
    }

    setLoadingReportIds((prev) => new Set(prev).add(reportId));

    getReportsDetailData({ id: reportId, params: filterParams })
      .unwrap()
      .then((result) => {
        const normalized = Array.isArray(result) ? result : [result];

        setDetailDataWithId((prevData) => {
          if (!prevData) return normalized;

          const otherReports = prevData.filter(
            (item) => item.reportTypeId !== reportTypeId
          );

          return [...otherReports, ...normalized];
        });
      })
      .catch((error) => {
        console.error("Error fetching report:", error);
      })
      .finally(() => {
        setLoadingReportIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(reportId);
          return newSet;
        });
      });
  };

  const getParamDetailHandler = (item: MyReportMainServiceDetailParamDtos) => {
    if (Object.hasOwn({ ...selectOptions }, item.key)) return;

    getParamDetail({
      id: item?.paramId,
    })
      .unwrap()
      .then((value: { id: number; title: string }[]) => {
        setSelectOptions((prev) => ({
          ...prev,
          [item.key]: value?.map((v) => ({
            title: v.title,
            id: v.id,
          })),
        }));
      });
  };

  const onSelectChange = (key: string, value?: string) => {
    if (!detailData?.paramDtos) return;

    const parentItem = detailData.paramDtos.find((p) => p.key === key);
    if (!parentItem) return;

    const childItem = detailData.paramDtos.find(
      (p) => p.paramDto?.key === parentItem.key
    );

    if (!childItem || !childItem.key) {
      handleFilterChange();
      return;
    }

    // reset child field + options
    form.setFieldsValue({ [childItem.key]: undefined });
    setSelectOptions((prev) => {
      const copy = { ...prev };
      delete copy[childItem.key];
      return copy;
    });

    // اگر clear شده
    if (!value) {
      handleFilterChange();
      return;
    }

    // fetch child options
    if (childItem.paramDto?.paramId) {
      getParamDetail({
        id: childItem.paramId,
        params: {
          [String(childItem.paramDto.paramId)]: value,
        },
      })
        .unwrap()
        .then((res) => {
          setSelectOptions((prev) => ({
            ...prev,
            [childItem.key]: res.map((v) => ({
              id: v.id,
              title: v.title,
            })),
          }));
        })
        .catch((error) => {
          console.error("Error fetching param detail:", error);
        });
    }

    handleFilterChange();
  };

  const lastSection = Math.max(
    1,
    ...(detailData?.reportDetailDtos.map((d) => d.section) || [1])
  );

  const sectionReportsByType =
    detailData?.reportDetailDtos.reduce(
      (acc, report) => {
        if (report.section === activeSection) {
          if (!acc[report.reportTypeId]) {
            acc[report.reportTypeId] = [];
          }
          acc[report.reportTypeId].push(report);
        }
        return acc;
      },
      {} as Record<number, ReportDetailResponse["reportDetailDtos"]>
    ) || {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

  return (
    <Div loading={isGetReportsDetailLoading}>
      <FilterForm
        paramDtos={detailData?.paramDtos}
        selectOptions={selectOptions}
        form={form}
        onSelectChange={onSelectChange}
        onParamDetailLoad={getParamDetailHandler}
        onFilterChange={handleFilterChange}
      />

      <SectionButtons
        lastSection={lastSection}
        activeSection={activeSection}
        detailData={detailData}
        sectionsDisabled={sectionsDisabled}
        onSectionClick={handleSectionClick}
      />

      <ReportItems
        detailDataWithId={detailDataWithId}
        loadingReportIds={loadingReportIds}
        onReportIdChange={handleReportIdChange}
        sectionReportsByType={sectionReportsByType}
        selectedReportsByType={selectedReportsByType}
        detailDataParamsFilled={areRequiredParamsFilled()}
        filterParams={filterParams}
      />
    </Div>
  );
};

export default GeneralReportDetail;
