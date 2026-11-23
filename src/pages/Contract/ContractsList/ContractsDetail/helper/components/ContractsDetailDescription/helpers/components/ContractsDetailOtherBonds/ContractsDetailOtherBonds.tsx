import { useState, useMemo, useRef } from "react";

import { AiOutlineSearch } from "react-icons/ai";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import { dataPlaceHolder } from "@infra/helpers/utils";

import { GetContractsDetailDescriptionCommitment } from "../../../@types/@getContractsDetailDescriptionTypes";

const ContractsDetailOtherBonds = ({
  data,
}: {
  data: GetContractsDetailDescriptionCommitment[];
}) => {
  const [searchValue, setSearchValue] = useState("");
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const firstResultRef = useRef<HTMLDivElement>(null);

  // ================================ Util function  ================================

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!searchValue.trim()) return data;

    const normalizedSearch = searchValue.toLowerCase().trim();
    return data?.filter((item) => item?.title?.toLowerCase().includes(normalizedSearch));
  }, [searchValue]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <div className="py-5">
      <CustomInput
        className="w-full max-w-[400px]!"
        placeholder="جستجو عنوان بند"
        prefix={<AiOutlineSearch size={20} />}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        allowClear
      />

      <div className="body-regular">
        <h3 className="mt-4!">سایر بندها</h3>
        <div
          className="bg-neutral-2 mt-4! flex flex-col gap-4 rounded-lg p-4!"
          ref={resultsContainerRef}
        >
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <div key={item.id} ref={index === 0 ? firstResultRef : null}>
                <h4 className="text-gray-600">
                  {dataPlaceHolder({ data: item?.title })}
                </h4>
                <p className="m-0 text-justify text-sm leading-relaxed">
                  {dataPlaceHolder({ data: item?.clause })}
                </p>
              </div>
            ))
          ) : (
            <div className="py-10 text-center text-sm text-gray-600">
              نتیجه‌ای یافت نشد
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractsDetailOtherBonds;
