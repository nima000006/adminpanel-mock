import { useMemo, useState } from "react";

import { AiOutlineFilter } from "react-icons/ai";
import { PiFunnelSimple } from "react-icons/pi";

import { CustomButton, CustomSearchBox } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomPagination from "@components/Renderers/CustomPagination/CustomPagination";
import { normalizeText } from "@infra/helpers/utils";
import ConfirmRequestBuildingReservationCard from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/ConfirmRequestReservation/helper/components/ConfirmRequestBuildingReservation/helper/components/ConfirmRequestBuildingReservationCard/ConfirmRequestBuildingReservationCard";

const mockData = [
  {
    id: 1,
    buildingTitle: "آپارتمان نسترن، خیابان ولیعصر، پلاک 120",
    capacity: "9 ظرفیت",
    floorTitle: "طبقه 5",
    unitTitle: "002",
    depositAmount: 12_000_000,
    accommodationAmount: 2_000_000,
  },
  {
    id: 2,
    buildingTitle: "آپارتمان نسترن، خیابان ولیعصر، پلاک 120",
    capacity: "9 ظرفیت",
    floorTitle: "طبقه 5",
    unitTitle: "002",
    depositAmount: 12_000_000,
    accommodationAmount: 2_000_000,
  },
  {
    id: 3,
    buildingTitle: "آپارتمان نسترن، خیابان ولیعصر، پلاک 120",
    capacity: "9 ظرفیت",
    floorTitle: "طبقه 5",
    unitTitle: "002",
    depositAmount: 12_000_000,
    accommodationAmount: 2_000_000,
  },
  {
    id: 4,
    buildingTitle: "آپارتمان نسترن، خیابان ولیعصر، پلاک 120",
    capacity: "9 ظرفیت",
    floorTitle: "طبقه 5",
    unitTitle: "002",
    depositAmount: 12_000_000,
    accommodationAmount: 2_000_000,
  },
  {
    id: 5,
    buildingTitle: "آپارتمان نسترن، خیابان ولیعصر، پلاک 120",
    capacity: "9 ظرفیت",
    floorTitle: "طبقه 5",
    unitTitle: "002",
    depositAmount: 12_000_000,
    accommodationAmount: 2_000_000,
  },
  {
    id: 6,
    buildingTitle: "آپارتمان نسترن، خیابان ولیعصر، پلاک 120",
    capacity: "9 ظرفیت",
    floorTitle: "طبقه 5",
    unitTitle: "002",
    depositAmount: 12_000_000,
    accommodationAmount: 2_000_000,
  },
  {
    id: 7,
    buildingTitle: "آپارتمان نسترن، خیابان ولیعصر، پلاک 120",
    capacity: "9 ظرفیت",
    floorTitle: "طبقه 5",
    unitTitle: "002",
    depositAmount: 12_000_000,
    accommodationAmount: 2_000_000,
  },
  {
    id: 8,
    buildingTitle: "آپارتمان نسترن، خیابان ولیعصر، پلاک 120",
    capacity: "9 ظرفیت",
    floorTitle: "طبقه 5",
    unitTitle: "002",
    depositAmount: 12_000_000,
    accommodationAmount: 2_000_000,
  },
  {
    id: 9,
    buildingTitle: "آپارتمان نسترن، خیابان ولیعصر، پلاک 120",
    capacity: "9 ظرفیت",
    floorTitle: "طبقه 5",
    unitTitle: "002",
    depositAmount: 12_000_000,
    accommodationAmount: 2_000_000,
  },
  {
    id: 10,
    buildingTitle: "آپارتمان نسترن، خیابان ولیعصر، پلاک 120",
    capacity: "9 ظرفیت",
    floorTitle: "طبقه 5",
    unitTitle: "002",
    depositAmount: 12_000_000,
    accommodationAmount: 2_000_000,
  },
  {
    id: 11,
    buildingTitle: "آپارتمان نسترن، خیابان ولیعصر، پلاک 120",
    capacity: "9 ظرفیت",
    floorTitle: "طبقه 5",
    unitTitle: "002",
    depositAmount: 12_000_000,
    accommodationAmount: 2_000_000,
  },
];

const ConfirmRequestBuildingReservation = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [selectedBuildingId, setSelectedBuildingId] = useState<number | null>(7);

  //* ================================ Util Functions ================================
  const searchChangeHandler = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  const selectBuildingHandler = (buildingId: number) => {
    setSelectedBuildingId(buildingId);
  };

  const pageChangeHandler = (page: number, size: number): void => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const filteredBuilding = useMemo(() => {
    const normalizedSearch = normalizeText(searchValue.trim().toLowerCase());

    if (!normalizedSearch) {
      return mockData;
    }

    return mockData.filter((item) => {
      const searchableText = normalizeText(
        `${item.floorTitle} ${item.unitTitle} `.toLowerCase()
      );

      return searchableText.includes(normalizedSearch);
    });
  }, [searchValue]);

  const paginatedBuilding = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredBuilding.slice(startIndex, startIndex + pageSize);
  }, [currentPage, filteredBuilding, pageSize]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-6">
      <CustomDivider
        text={` ساختمان ها (${90})`}
        extraContent={
          <div className="flex flex-wrap items-center gap-2">
            <CustomButton iconPlacement="start" loading={false} icon={<PiFunnelSimple />}>
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
        placeholder="جستجو"
        onChange={searchChangeHandler}
        inputClassName="!rounded-xl !min-h-10"
      />

      {paginatedBuilding.length ? (
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          {paginatedBuilding.map((item) => (
            <ConfirmRequestBuildingReservationCard
              key={item.id}
              building={item}
              selected={selectedBuildingId === item.id}
              onSelect={selectBuildingHandler}
            />
          ))}
        </div>
      ) : (
        <CustomEmpty description="واحدی با این مشخصات یافت نشد" />
      )}

      <div className="flex justify-end">
        <CustomPagination
          current={currentPage}
          total={filteredBuilding.length}
          pageSize={pageSize}
          onChange={pageChangeHandler}
          showSizeChanger
          showQuickJumper
          pageSizeOptions={["8", "10", "20", "50"]}
        />
      </div>
    </div>
  );
};

export default ConfirmRequestBuildingReservation;
