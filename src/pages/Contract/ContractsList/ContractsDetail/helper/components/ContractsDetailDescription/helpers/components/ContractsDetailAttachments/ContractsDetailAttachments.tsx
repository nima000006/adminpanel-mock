import { useState, useMemo } from "react";

import { Row } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import { GrAttachment } from "react-icons/gr";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { NEUTRAL_07 } from "@infra/VARS/globalColors/globalColors";

import { GetContractsDetailDescriptionFile } from "../../../@types/@getContractsDetailDescriptionTypes";
import "./_contractsDetailAttachments.scss";

const ContractsDetailAttachments = ({
  data,
}: {
  data: GetContractsDetailDescriptionFile[];
}) => {
  const [searchValue, setSearchValue] = useState("");

  // ================================ Utils function ================================

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!searchValue.trim()) return data;

    const normalizedSearch = searchValue.toLowerCase().trim();
    return data?.filter((item) =>
      item?.fileName?.toLowerCase().includes(normalizedSearch)
    );
  }, [searchValue]);

  const handleDownloadAll = () => {
    // TODO[nima]: Implement download all functionality when api got ready
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <div className="contracts-detail-attachments-container">
      <ToolBox
        rightSide={
          <CustomInput
            className="w-full min-w-[400px]!"
            placeholder="جستجو عنوان فایل"
            prefix={<AiOutlineSearch size={20} />}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            allowClear
          />
        }
        leftSide={
          // todo[nima] enable when api got ready
          <CustomButton type="primary" disabled onClick={handleDownloadAll}>
            دانلود گروهی
          </CustomButton>
        }
      />

      <Row gutter={[16, 16]} className="mt-6!">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <SingleVerticalWithCol
              key={item.id}
              xl={12}
              lg={12}
              md={12}
              sm={24}
              label={item?.fileName}
              value={item?.name}
              prefix={<GrAttachment size={16} color={NEUTRAL_07} />}
              suffix={
                <Link to={item?.url} target="_blank" rel="noopener noreferrer">
                  <span className="body-regular">دانلود</span>
                </Link>
              }
              className="custom-statistic text-primary-6! flex"
            />
          ))
        ) : (
          <div className="body-regular w-full py-10 text-center text-sm text-gray-600">
            نتیجه‌ای یافت نشد
          </div>
        )}
      </Row>
    </div>
  );
};

export default ContractsDetailAttachments;
