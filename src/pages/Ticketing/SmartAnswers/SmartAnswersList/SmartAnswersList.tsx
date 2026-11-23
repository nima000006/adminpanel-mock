import { useState } from "react";

import { Dropdown, Form, MenuProps, Pagination, Row } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { PiFilePdf, PiFileXls, PiMagnifyingGlass } from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";

import SmartAnswersListCard from "./helper/components/SmartAnswersListCard/SmartAnswersListCard";
import useTicketingSmartAnswerListAdvanceFilter from "./helper/modal/advanceFilter/SmartAnswerListAdvanceFilter";
import "./_smartAnswersList.scss";

const dataSource = [
  {
    id: 1,
    date: "۱۸ مهر ۱۴۰۴ , 10:20 ",
    describe:
      "سلام! برای لغو رزرو، به حساب کاربری‌تان بروید و در بخش «رزروها» گزینه «لغو» را انتخاب کنید. اگر به اطلاعات بیشتری نیاز دارید، ما در خدمت شما هستیم!سلام! برای لغو رزرو، به حساب کاربری‌تان بروید و در بخش «رزروها» گزینه «لغو» را انتخاب کنید. اگر به اطلاعات بیشتری نیاز دارید، ما در خدمت شما هستیم!سلام! برای لغو رزرو، به حساب کاربری‌تان بروید و در بخش «رزروها» گزینه «لغو» را انتخاب کنید. اگر به اطلاعات بیشتری نیاز دارید، ما در خدمت شما هستیم!سلام! برای لغو رزرو، به حساب کاربری‌تان بروید و در بخش «رزروها» گزینه «لغو» را انتخاب کنید. اگر به اطلاعات بیشتری نیاز دارید، ما در خدمت شما هستیم!سلام! برای لغو رزرو، به حساب کاربری‌تان بروید و در بخش «رزروها» گزینه «لغو» را انتخاب کنید. اگر به اطلاعات بیشتری نیاز دارید، ما در خدمت شما هستیم!سلام! برای لغو رزرو، به حساب کاربری‌تان بروید و در بخش «رزروها» گزینه «لغو» را انتخاب کنید. اگر به اطلاعات بیشتری نیاز دارید، ما در خدمت شما هستیم!",
    user: "شیرین نجفی",
    nationalCode: "1234567890",
    status: 1,
    service: "ROOM",
    answerType: 1,
  },
  {
    id: 2,
    date: "۱۸ مهر ۱۴۰۴ , 10:20 ",
    describe:
      "سلام! برای لغو رزرو، به حساب کاربری‌تان بروید و در بخش «رزروها» گزینه «لغو» را انتخاب کنید. اگر به اطلاعات بیشتری نیاز دارید، ما در خدمت شما هستیم!سلام! برای لغو رزرو، به حساب کاربری‌تان بروید و در بخش «رزروها» گزینه «لغو» را انتخاب کنید. اگر به اطلاعات بیشتری نیاز دارید، ما در خدمت شما هستیم!سلام! برای لغو رزرو، به حساب کاربری‌تان بروید و در بخش «رزروها» گزینه «لغو» را انتخاب کنید. اگر به اطلاعات بیشتری نیاز دارید، ما در خدمت شما هستیم!سلام! برای لغو رزرو، به حساب کاربری‌تان بروید و در بخش «رزروها» گزینه «لغو» را انتخاب کنید. اگر به اطلاعات بیشتری نیاز دارید، ما در خدمت شما هستیم!سلام! برای لغو رزرو، به حساب کاربری‌تان بروید و در بخش «رزروها» گزینه «لغو» را انتخاب کنید. اگر به اطلاعات بیشتری نیاز دارید، ما در خدمت شما هستیم!سلام! برای لغو رزرو، به حساب کاربری‌تان بروید و در بخش «رزروها» گزینه «لغو» را انتخاب کنید. اگر به اطلاعات بیشتری نیاز دارید، ما در خدمت شما هستیم!",
    user: "شیرین نجفی",
    nationalCode: "1234567890",
    status: 2,
    service: "FOOD",
    answerType: 2,
  },
  {
    id: 3,
    date: "۱۸ مهر ۱۴۰۴ , 10:20 ",
    describe:
      "سلام! برای لغو رزرو، به حساب کاربری‌تان بروید و در بخش «رزروها» گزینه «لغو» را انتخاب کنید. اگر به اطلاعات بیشتری نیاز دارید، ما در خدمت شما هستیم!سلام! برای لغو رزرو، به حساب کاربری‌تان بروید و در بخش «رزروها» گزینه «لغو» را انتخاب کنید. اگر به اطلاعات بیشتری نیاز دارید، ما در خدمت شما هستیم!سلام! برای لغو رزرو، به حساب کاربری‌تان بروید و در بخش «رزروها» گزینه «لغو» را انتخاب کنید. اگر به اطلاعات بیشتری نیاز دارید، ما در خدمت شما هستیم!سلام! برای لغو رزرو، به حساب کاربری‌تان بروید و در بخش «رزروها» گزینه «لغو» را انتخاب کنید. اگر به اطلاعات بیشتری نیاز دارید، ما در خدمت شما هستیم!سلام! برای لغو رزرو، به حساب کاربری‌تان بروید و در بخش «رزروها» گزینه «لغو» را انتخاب کنید. اگر به اطلاعات بیشتری نیاز دارید، ما در خدمت شما هستیم!سلام! برای لغو رزرو، به حساب کاربری‌تان بروید و در بخش «رزروها» گزینه «لغو» را انتخاب کنید. اگر به اطلاعات بیشتری نیاز دارید، ما در خدمت شما هستیم!",
    user: "شیرین نجفی",
    nationalCode: "1234567890",
    status: 3,
    service: "FOOD",
    answerType: 2,
  },
  {
    id: 4,
    date: "۱۸ مهر ۱۴۰۴ , 10:20 ",
    describe:
      "سلام! برای لغو رزرو، به حساب کاربری‌تان بروید و در بخش «رزروها» گزینه «لغو» را انتخاب کنید. اگر به اطلاعات بیشتری نیاز دارید، ما در خدمت شما هستیم!سلام! برای لغو رزرو، به حساب کاربری‌تان بروید و در بخش «رزروها» گزینه «لغو» را انتخاب کنید. اگر به اطلاعات بیشتری نیاز دارید، ما در خدمت شما هستیم!سلام! برای لغو رزرو، به حساب کاربری‌تان بروید و در بخش «رزروها» گزینه «لغو» را انتخاب کنید. اگر به اطلاعات بیشتری نیاز دارید، ما در خدمت شما هستیم!سلام! برای لغو رزرو، به حساب کاربری‌تان بروید و در بخش «رزروها» گزینه «لغو» را انتخاب کنید. اگر به اطلاعات بیشتری نیاز دارید، ما در خدمت شما هستیم!سلام! برای لغو رزرو، به حساب کاربری‌تان بروید و در بخش «رزروها» گزینه «لغو» را انتخاب کنید. اگر به اطلاعات بیشتری نیاز دارید، ما در خدمت شما هستیم!سلام! برای لغو رزرو، به حساب کاربری‌تان بروید و در بخش «رزروها» گزینه «لغو» را انتخاب کنید. اگر به اطلاعات بیشتری نیاز دارید، ما در خدمت شما هستیم!",
    user: "شیرین نجفی",
    nationalCode: "1234567890",
    status: 4,
    service: "FOOD",
    answerType: 2,
  },
];

const exportMenu: MenuProps = {
  items: [
    {
      label: (
        <span className="flex items-center gap-2">
          <PiFilePdf />
          خروجی PDF
        </span>
      ),
      key: "pdf",
    },
    {
      label: (
        <span className="flex items-center gap-2">
          <PiFileXls />
          خروجی Excel
        </span>
      ),
      key: "excel",
    },
  ],
};

const SmartAnswersList = () => {
  const { params } = useQueryParams();
  const [form] = Form.useForm();

  const [badgeCount, setBadgeCount] = useState(() => {
    return params?.badger ?? 0;
  });

  const [currentPage, setCurrentPage] = useState(1);

  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);

  const { filterItemsList } = useTicketingSmartAnswerListAdvanceFilter();

  useTitle({ text: "پاسخ‌های هوشمند" });
  //* ================================ Util Functions ================================
  const openAdvanceFilter = () => setIsAdvanceModalOpen(true);
  const closeAdvanceFilter = () => {
    setIsAdvanceModalOpen(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const pageSize = 9;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = dataSource.slice(startIndex, startIndex + pageSize);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isAdvanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={isAdvanceModalOpen}
          closeModalHandler={closeAdvanceFilter}
          filterItemsList={filterItemsList}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          defaultParams={{ ...params }}
          form={form}
        />
      )}
      <div className="ticketing-smart-answers-list-container flex flex-col gap-4">
        <ToolBox
          className="mb-4!"
          rightSide={
            <div className="flex gap-4 max-[500px]:flex-col">
              <CustomBadge count={badgeCount}>
                <CustomButton icon={<AiOutlineFilter />} onClick={openAdvanceFilter}>
                  فیلتر پیشرفته
                </CustomButton>
              </CustomBadge>
              <CustomInput
                suffix={<PiMagnifyingGlass />}
                placeholder="جستجو بر اساس کد ملی "
                hasVerticalLabel={false}
                type="search"
              />
            </div>
          }
          leftSide={
            <div className="flex gap-4 max-[500px]:flex-col">
              <div className="border-neutral-5 bg-neutral-3 flex gap-2 rounded-lg border px-2 py-1">
                <span className="text-neutral-7">تعداد</span>
                <span>{dataPlaceHolder({ data: 10000, isPrice: true })}</span>
              </div>
              <Dropdown menu={exportMenu} trigger={["click"]}>
                <CustomButton disabled>
                  خروجی <IoIosArrowDown />
                </CustomButton>
              </Dropdown>
            </div>
          }
        />
        <Row gutter={[16, 16]}>
          {paginatedData?.map((item) => (
            <SmartAnswersListCard item={item} />
          ))}
        </Row>
        <Pagination
          current={currentPage}
          total={dataSource.length}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default SmartAnswersList;
