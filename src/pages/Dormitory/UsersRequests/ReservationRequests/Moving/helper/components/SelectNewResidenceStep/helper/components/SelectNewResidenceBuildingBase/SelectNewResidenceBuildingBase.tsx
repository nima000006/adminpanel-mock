import { useMemo, useState } from "react";

import { AiOutlineFilter } from "react-icons/ai";
import { PiFunnelSimple } from "react-icons/pi";

import { CustomButton, CustomSearchBox } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomPagination from "@components/Renderers/CustomPagination/CustomPagination";
import { normalizeText } from "@infra/helpers/utils";
import { SelectNewResidenceBuildingBaseProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/SelectNewResidenceStep/helper/components/SelectNewResidenceBuildingBase/@types/@selectNewResidenceBuildingBaseTypes";
import {
  MOCK_SELECT_NEW_RESIDENCE_BUILDINGS,
  MOCK_SELECT_NEW_RESIDENCE_BUILDINGS_TOTAL,
} from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/SelectNewResidenceStep/helper/components/SelectNewResidenceBuildingBase/helper/mock/mockSelectNewResidenceBuildings";
import ConfirmRequestBuildingReservationCard from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/ConfirmRequestReservation/helper/components/ConfirmRequestBuildingReservation/helper/components/ConfirmRequestBuildingReservationCard/ConfirmRequestBuildingReservationCard";

const SelectNewResidenceBuildingBase = ({
  form: _form,
}: SelectNewResidenceBuildingBaseProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [selectedBuildingId, setSelectedBuildingId] = useState<number | null>(1);

  //* ================================ Util Functions ================================
  const searchChangeHandler = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  const pageChangeHandler = (page: number, size: number): void => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const selectBuildingHandler = (buildingId: number) => {
    setSelectedBuildingId(buildingId);
  };

  const filteredBuildings = useMemo(() => {
    const normalizedSearch = normalizeText(searchValue.trim().toLowerCase());

    if (!normalizedSearch) {
      return MOCK_SELECT_NEW_RESIDENCE_BUILDINGS;
    }

    return MOCK_SELECT_NEW_RESIDENCE_BUILDINGS.filter((building) => {
      const searchableText = normalizeText(
        `${building.buildingTitle} ${building.capacity} ${building.floorTitle} ${building.unitTitle}`.toLowerCase()
      );

      return searchableText.includes(normalizedSearch);
    });
  }, [searchValue]);

  const paginatedBuildings = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredBuildings.slice(startIndex, startIndex + pageSize);
  }, [currentPage, filteredBuildings, pageSize]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-6">
      <CustomDivider
        text={`ساختمان ها(${MOCK_SELECT_NEW_RESIDENCE_BUILDINGS_TOTAL})`}
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

      {paginatedBuildings.length ? (
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          {paginatedBuildings.map((item) => (
            <ConfirmRequestBuildingReservationCard
              key={item.id}
              building={item}
              selected={selectedBuildingId === item.id}
              onSelect={selectBuildingHandler}
            />
          ))}
        </div>
      ) : (
        <CustomEmpty description="ساختمانی با این مشخصات یافت نشد" />
      )}

      <div className="flex justify-end">
        <CustomPagination
          current={currentPage}
          total={filteredBuildings.length}
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

export default SelectNewResidenceBuildingBase;
