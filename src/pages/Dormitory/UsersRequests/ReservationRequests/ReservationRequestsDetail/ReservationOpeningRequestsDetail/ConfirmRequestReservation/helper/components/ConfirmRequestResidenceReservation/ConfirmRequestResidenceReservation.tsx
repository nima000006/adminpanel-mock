import { useMemo, useState } from "react";

import { Col, Form, Row } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { PiFunnelSimple } from "react-icons/pi";

import { CustomButton, CustomSearchBox, CustomSelect } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomPagination from "@components/Renderers/CustomPagination/CustomPagination";
import { normalizeText } from "@infra/helpers/utils";
import { ConfirmRequestResidenceReservationFormType } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/ConfirmRequestReservation/helper/components/ConfirmRequestResidenceReservation/helper/@types/@confirmRequestResidenceReservation";
import ConfirmRequestResidenceReservationCard from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/ConfirmRequestReservation/helper/components/ConfirmRequestResidenceReservation/helper/components/ConfirmRequestResidenceReservationCard/ConfirmRequestResidenceReservationCard";

const MOCK_BUILDING_OPTIONS = [{ id: 1, title: "ساختمان اول" }];
const MOCK_FLOOR_OPTIONS = [{ id: 1, title: "همکف" }];

const mockData = [
  {
    id: 1,
    roomCode: "002",
    roomTitle: "ماه 002",
    bedPosition: "تخت پایین",
    buildingTitle: "شهید بهشتی",
    floorTitle: "طبقه 5",
    unitTitle: "002",
    roomType: "اتاق مستقل",
    depositAmount: 12_000_000,
    accommodationAmount: 2_000_000,
  },
  {
    id: 2,
    roomCode: "003",
    roomTitle: "ماه 003",
    bedPosition: "تخت پایین",
    buildingTitle: "شهید بهشتی",
    floorTitle: "طبقه 5",
    unitTitle: "002",
    roomType: "اتاق مستقل",
    depositAmount: 12_000_000,
    accommodationAmount: 2_000_000,
  },
  {
    id: 3,
    roomCode: "004",
    roomTitle: "ماه 004",
    buildingTitle: "شهید بهشتی",
    floorTitle: "طبقه 5",
    unitTitle: "002",
    roomType: "اتاق مستقل",
    depositAmount: 12_000_000,
    accommodationAmount: 2_000_000,
  },
  {
    id: 4,
    roomCode: "005",
    roomTitle: "ماه 005",
    bedPosition: "تخت بالا",
    buildingTitle: "شهید بهشتی",
    floorTitle: "طبقه 5",
    unitTitle: "002",
    roomType: "اتاق مستقل",
    depositAmount: 12_000_000,
    accommodationAmount: 2_000_000,
  },
  {
    id: 5,
    roomCode: "006",
    roomTitle: "ماه 006",
    buildingTitle: "شهید بهشتی",
    floorTitle: "طبقه 5",
    unitTitle: "002",
    roomType: "اتاق مستقل",
    accommodationAmount: 2_000_000,
  },
  {
    id: 6,
    roomCode: "007",
    roomTitle: "ماه 007",
    buildingTitle: "شهید بهشتی",
    floorTitle: "طبقه 4",
    unitTitle: "001",
    roomType: "اتاق مستقل",
    accommodationAmount: 1_800_000,
  },
  {
    id: 7,
    roomCode: "008",
    roomTitle: "ماه 008",
    bedPosition: "تخت وسط",
    buildingTitle: "شهید بهشتی",
    floorTitle: "طبقه 4",
    unitTitle: "001",
    roomType: "اتاق مستقل",
    depositAmount: 10_000_000,
    accommodationAmount: 2_200_000,
  },
  {
    id: 8,
    roomCode: "009",
    roomTitle: "ماه 009",
    bedPosition: "تخت پایین",
    buildingTitle: "شهید بهشتی",
    floorTitle: "طبقه 4",
    unitTitle: "003",
    roomType: "اتاق مستقل",
    depositAmount: 11_000_000,
    accommodationAmount: 2_100_000,
  },
  {
    id: 9,
    roomCode: "010",
    roomTitle: "ماه 010",
    buildingTitle: "شهید بهشتی",
    floorTitle: "همکف",
    unitTitle: "004",
    roomType: "اتاق مستقل",
    depositAmount: 9_000_000,
    accommodationAmount: 1_900_000,
  },
  {
    id: 10,
    roomCode: "011",
    roomTitle: "ماه 011",
    buildingTitle: "شهید بهشتی",
    floorTitle: "همکف",
    unitTitle: "004",
    roomType: "اتاق مستقل",
    accommodationAmount: 1_500_000,
  },
  {
    id: 11,
    roomCode: "011",
    roomTitle: "ماه 011",
    buildingTitle: "شهید بهشتی",
    floorTitle: "همکف",
    unitTitle: "004",
    roomType: "اتاق مستقل",
    accommodationAmount: 1_500_000,
  },
];

const ConfirmRequestResidenceReservation = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [selectedResidenceId, setSelectedResidenceId] = useState<number | null>(7);

  const [form] = Form.useForm<ConfirmRequestResidenceReservationFormType>();

  //* ================================ Util Functions ================================
  const searchChangeHandler = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  const selectResidenceHandler = (residenceId: number) => {
    setSelectedResidenceId(residenceId);
  };

  const pageChangeHandler = (page: number, size: number): void => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const filteredResidence = useMemo(() => {
    const normalizedSearch = normalizeText(searchValue.trim().toLowerCase());

    if (!normalizedSearch) {
      return mockData;
    }

    return mockData.filter((item) => {
      const searchableText = normalizeText(
        `${item.roomCode} ${item.roomTitle} ${item.bedPosition ?? ""}`.toLowerCase()
      );

      return searchableText.includes(normalizedSearch);
    });
  }, [searchValue]);

  const paginatedResidence = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredResidence.slice(startIndex, startIndex + pageSize);
  }, [currentPage, filteredResidence, pageSize]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-[#262626]">
          <AiOutlineFilter size={16} />
          <span>فیلتر بر اساس موقعیت واحد اقامتی</span>
        </div>

        <Form form={form}>
          <Row gutter={[8, 8]}>
            <Col xs={24} sm={12} md={8}>
              <CustomSelect
                name="building"
                placeholder="ساختمان"
                options={MOCK_BUILDING_OPTIONS}
                form={form}
                hasVerticalLabel={false}
                isLoading={false}
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <CustomSelect
                name="floor"
                placeholder="طبقه"
                options={MOCK_FLOOR_OPTIONS}
                form={form}
                hasVerticalLabel={false}
                isLoading={false}
              />
            </Col>
          </Row>
        </Form>
      </div>

      <div className="flex flex-col gap-6">
        <CustomDivider
          text={`واحد های اقامتی(${90})`}
          extraContent={
            <div className="flex flex-wrap items-center gap-2">
              <CustomButton
                iconPlacement="start"
                loading={false}
                icon={<PiFunnelSimple />}
              >
                مرتب سازی قیمت
              </CustomButton>
              <CustomButton
                iconPlacement="start"
                loading={false}
                icon={<AiOutlineFilter />}
              >
                فیلتر پیشرفته
              </CustomButton>
            </div>
          }
        />

        <CustomSearchBox
          mode="client"
          hasUrlSync={false}
          placeholder="جستجو کد یا نام تخت"
          onChange={searchChangeHandler}
          inputClassName="!rounded-xl !min-h-10"
        />

        {paginatedResidence.length ? (
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            {paginatedResidence.map((item) => (
              <ConfirmRequestResidenceReservationCard
                key={item.id}
                residence={item}
                selected={selectedResidenceId === item.id}
                onSelect={selectResidenceHandler}
              />
            ))}
          </div>
        ) : (
          <CustomEmpty description="واحدی با این مشخصات یافت نشد" />
        )}

        <div className="flex justify-end">
          <CustomPagination
            current={currentPage}
            total={filteredResidence.length}
            pageSize={pageSize}
            onChange={pageChangeHandler}
            showSizeChanger
            showQuickJumper
            pageSizeOptions={["8", "10", "20", "50"]}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmRequestResidenceReservation;
