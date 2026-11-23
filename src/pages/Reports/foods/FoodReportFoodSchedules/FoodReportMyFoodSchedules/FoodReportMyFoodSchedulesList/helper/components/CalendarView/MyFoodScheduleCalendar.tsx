import { useEffect, useState } from "react";

import { BadgeProps, CalendarProps, Form } from "antd";
import dayjs, { Dayjs } from "dayjs";
import moment from "moment";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomCalendar from "@components/CustomInputs/CustomCalendar/CustomCalendar";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomSingleBadge from "@components/Renderers/CustomSingleBadge/CustomSingleBadge";
import { makeSearchParams } from "@infra/helpers/utils";
import { REPORT_FOOD_MY_FOOD_SCHEDULE_DETAILS_PAGE_ROUTE } from "@infra/router/routes/reports";
import { useLazyGetCalendarDataForMyFoodSchedulesQuery } from "@infra/states/redux/Apis/food/foodSchedule/foodScheduleApis";
import { useGetMealAllQuery } from "@infra/states/redux/Apis/food/general/GeneralFoodApis";
import { useLazyGetMyRestaurantsQuery } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";
import {
  GetMyRestaurantsResponse,
  MyRestaurantType,
} from "@pages/Food/Reservation/MyReservation/MyReservationOrderSearch/@types/@myReservationOrderSearch";

import { CalendarFoodSimplePlanDto } from "../../../@types/@myFoodSchedulesList";
import {
  CalendarMyFoods,
  GetCalendarDataForMyFoodSchedulesResponse,
} from "../../../@types/@myFoodSchedulesList";
import "./_myFoodScheduleCalendar.scss";

const mapCalendarData = (calendarData: CalendarMyFoods[]) => {
  const mappedData: Record<string, CalendarFoodSimplePlanDto[]> = {};

  calendarData.forEach(({ date, simplePlanDtos }) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    mappedData[formattedDate] = simplePlanDtos; // Store the list of food plans by date
  });

  return mappedData;
};

// Utility to get the list of events for a specific day
const getListDataFromApi = (
  value: Dayjs,
  mappedData: Record<string, CalendarFoodSimplePlanDto[]>
) => {
  const formattedDate = value.format("YYYY-MM-DD");
  return mappedData[formattedDate] || []; // Return the list of food plans for the selected date
};

const MyFoodScheduleCalendar = () => {
  const [isFormEmpty, setIsFormEmpty] = useState(true);
  const [selfId, setSelfId] = useState("");
  const [mealId, setMealId] = useState("");
  const [date, setDate] = useState<string>(moment().format("YYYY-MM-DD"));
  const [myRestaurants, setMyRestaurants] = useState<MyRestaurantType[]>([]);

  const [mappedData, setMappedData] = useState<
    Record<string, CalendarFoodSimplePlanDto[]>
  >({});

  const [form] = Form.useForm<{
    self: string;
    meal: string;
  }>();

  //? ================================  Api Calls ================================
  const [getMyRestaurants, { isFetching: isMyRestaurantDataLoading }] =
    useLazyGetMyRestaurantsQuery();

  const [getMyCalendarInfo, { isFetching: isGetMyCalendarInfoLoading }] =
    useLazyGetCalendarDataForMyFoodSchedulesQuery();

  const { data: mealData, isLoading: isMealDataLoading } = useGetMealAllQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getMyRestaurants().unwrap().then(getMyRestaurantsSuccess);
  }, []);

  // get calendar data based on meal id, self id and date
  useEffect(() => {
    if (selfId && mealId && date) {
      getMyCalendarInfo({
        mealId,
        restaurantId: selfId,
        fromDate: moment(date).subtract(41, "days").format("YYYY-MM-DD"),
        toDate: moment(date).add(41, "days").format("YYYY-MM-DD"),
      })
        .unwrap()
        .then((res: GetCalendarDataForMyFoodSchedulesResponse) => {
          if (res?.status === 200) {
            const mapped = mapCalendarData(res?.data);
            setMappedData(mapped);
          } else {
            return toast.error((res?.data || res?.msg) as any, {
              toastId: (res?.data || res?.msg) as any,
            });
          }
        });
    }
  }, [selfId, mealId, date]);

  //* ================================ Util Functions ================================
  const getMyRestaurantsSuccess = async (value: GetMyRestaurantsResponse) => {
    if (value?.status === 200) {
      setMyRestaurants(value?.data);
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
  };

  // Todo[saman]: month cells are not needed on project yet!
  // const monthCellRender = (value: Dayjs) => {
  //   const num = getMonthData(value);
  //   return num ? (
  //     <div className="notes-month">
  //       <section>{num}</section>
  //       <span>Backlog number</span>
  //     </div>
  //   ) : null;
  // };
  //!
  // const groupedData = groupDataByDate(calendarData?.data);

  //* ================================ Util Functions ================================
  const dateCellRender = (value: Dayjs) => {
    const listData = getListDataFromApi(value, mappedData);

    const onEachItemClick = (info: CalendarFoodSimplePlanDto) => {
      const params = makeSearchParams({
        id: info?.id,
        date: info?.reserveDate,
        contractId: info?.productContractId?.toString() as string,
        productId: info?.productId,
        title: info?.productTitle,
      });
      window.open(
        REPORT_FOOD_MY_FOOD_SCHEDULE_DETAILS_PAGE_ROUTE + params,
        "_blank",
        "noopener,noreferrer"
      );
    };

    return (
      // <CustomTooltip title={<CalendarTooltip info={listData} />} trigger={["hover"]}>
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index} onClick={() => onEachItemClick(item)}>
            <div>
              <CustomSingleBadge
                status={
                  item?.mealId === 0
                    ? "warning"
                    : item?.mealId === 1
                      ? "success"
                      : ("error" as BadgeProps["status"])
                }
                text={item?.productTitle}
              />
              <div className="cell-count-container">
                <span>{item?.reservationsCount}</span>
                <span>:تعداد</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      // </CustomTooltip>
    );
  };

  //
  Form.useWatch(({ self, meal }) => {
    if (self && meal) {
      setIsFormEmpty(false);
    } else {
      setIsFormEmpty(true);
    }
  }, form);

  //
  const cellRenderer: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    // Todo[saman]: month cells are not needed on project yet!
    // if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };
  return (
    <Form form={form}>
      <div className="inputs-container">
        <CustomSelect
          name="self"
          options={myRestaurants}
          placeholder="سلف مورد نظر را انتخاب کنید"
          loading={isMyRestaurantDataLoading}
          onChange={(id: any) => setSelfId(id)}
        />
        <CustomSelect
          name="meal"
          options={mealData?.data?.map((item) => {
            return {
              id: item.id,
              title: item.name,
            };
          })}
          loading={isMealDataLoading}
          placeholder="وعده مورد نظر را انتخاب کنید"
          onChange={(id: any) => setMealId(id)}
        />
      </div>
      <CustomCalendar
        name="calendar"
        mode="month"
        isYearSelectorDisabled={true}
        cellRender={cellRenderer}
        className="my-food-schedule-calendar"
        isEmpty={isFormEmpty}
        isLoading={isGetMyCalendarInfoLoading}
        onChange={(value) => {
          setDate(moment(value).format("YYYY-MM-DD"));
        }}
        // value={date}
        EmptyNodeHandler={
          <div className="custom-calendar-empty">
            <div className="icon">
              <AiOutlineInfoCircle />
            </div>
            <div className="text">
              جهت مشاهده تقویم برنامه غذایی سلف و وعده مورد نظر خود را انتخاب نمایید
            </div>
          </div>
        }
      />
      <div className="guidance-badge-container">
        <CustomSingleBadge status="warning" text="صبحانه" />
        <CustomSingleBadge status="success" text="ناهار" />
        <CustomSingleBadge status="error" text="شام" />
      </div>
    </Form>
  );
};

export default MyFoodScheduleCalendar;
