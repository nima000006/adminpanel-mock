import { useEffect } from "react";

import { Col, Row } from "antd";

import { CustomRangePicker, CustomSelect } from "@components/CustomInputs";
import DemandCard from "@components/Renderers/DemandCard/DemandCard";
import useQueryParams from "@infra/hooks/useQueryParams";
import HabitantsAll from "@pages/Dormitory/Habitants/HabitantsList/helper/components/HabitantsAll/HabitantsAll";
import HabitantsInResidence from "@pages/Dormitory/Habitants/HabitantsList/helper/components/HabitantsInResidence/HabitantsInResidence";
import HabitantsPendingEvacuation from "@pages/Dormitory/Habitants/HabitantsList/helper/components/HabitantsPendingEvacuation/HabitantsPendingEvacuation";
import { HabitantsStatus } from "@pages/Dormitory/Habitants/HabitantsList/helper/utils";

const HabitantsList = () => {
  const { params: url, setSearchParams } = useQueryParams();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!url?.status) {
      setSearchParams({ status: HabitantsStatus.pendingEvacuation });
    }
  }, []);

  //* ================================ Util Functions ================================
  const changeCardHandler = (status: string) => {
    setSearchParams({ status: status });
  };

  return (
    <div className="flex flex-col gap-6">
      <Row gutter={[16, 16]}>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomSelect
            name="residence"
            options={[]}
            // form={form}
            // isLoading={getProvinceListLoading}
            placeholder="انتخاب اقامتگاه"
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomSelect
            name="admission"
            options={[]}
            // form={form}
            // isLoading={getProvinceListLoading}
            placeholder="برنامه پذیرش"
          />
        </Col>
        {url?.status === HabitantsStatus.all && (
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomRangePicker
              // onChange={changeDateHandler}
              name="rangeDate"
              placeholder={["از تاریخ ایجاد", "تا تاریخ ایجاد"]}
            />
          </Col>
        )}
      </Row>

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          <DemandCard
            title="در انتظار تخلیه"
            active={url?.status === HabitantsStatus.pendingEvacuation}
            clickHandler={() => changeCardHandler(HabitantsStatus.pendingEvacuation)}
            badgeTitle={"(10)"}
            className="w-full"
          />
          <DemandCard
            title="در حال اسکان"
            active={url?.status === HabitantsStatus.inResidence}
            clickHandler={() => changeCardHandler(HabitantsStatus.inResidence)}
            badgeTitle={"(10)"}
            className="w-full"
          />
          <DemandCard
            title="همه ساکنین"
            active={url?.status === HabitantsStatus.all}
            clickHandler={() => changeCardHandler(HabitantsStatus.all)}
            badgeTitle={"(10)"}
            className="w-full"
          />
        </div>
        {url?.status === HabitantsStatus.pendingEvacuation ? (
          <HabitantsPendingEvacuation />
        ) : url?.status === HabitantsStatus.inResidence ? (
          <HabitantsInResidence />
        ) : url?.status === HabitantsStatus.all ? (
          <HabitantsAll />
        ) : null}
      </div>
    </div>
  );
};

export default HabitantsList;
