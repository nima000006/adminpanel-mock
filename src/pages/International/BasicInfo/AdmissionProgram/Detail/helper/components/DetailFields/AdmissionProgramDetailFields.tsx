import { useEffect, useState } from "react";

import { PiHash } from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetInternationalAdmissionDetailFieldsIfoQuery } from "@infra/states/redux/Apis/international/basicInfo/internationalBasicInfo";

import {
  GetInternationalAdmissionDetailFieldsInfoResponse,
  InternationalAdmissionDetailFieldsInfoType,
} from "./@types/@admissionProgramDetailFields";
import AdmissionProgramDetailFieldsTableModel from "./helper/models/AdmissionProgramDetailFields/AdmissionProgramDetailFieldsTableModel";

const AdmissionProgramDetailFields = () => {
  const [dataSource, setDatasource] = useState<
    InternationalAdmissionDetailFieldsInfoType[]
  >([]);

  const { params: url } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getData, { isFetching: isAdmissionListLoading }] =
    useLazyGetInternationalAdmissionDetailFieldsIfoQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (url?.id) {
      getData(url?.id).unwrap().then(getDataSuccess);
    }
  }, [url?.id]);

  //* ================================ Util Functions ================================
  const getDataSuccess = async (
    value: GetInternationalAdmissionDetailFieldsInfoResponse
  ) => {
    setDatasource(value);
  };

  return (
    <div>
      <CustomDivider
        text="لیست رشته‌های متصل به این برنامه پذیرش"
        extraContent={
          <CustomButton
            className="cursor-default! border-transparent! text-[#1f1f1f]!"
            disabled
            icon={<PiHash />}
          >
            تعداد :{dataSource?.length}
          </CustomButton>
        }
      />
      <CustomTable
        dataSource={dataSource}
        columns={AdmissionProgramDetailFieldsTableModel()}
        pagination={paginationConfig}
        loading={isAdmissionListLoading}
        {...TABLE_PROPS(dataSource?.length)}
        rowKey="branchFieldId"
        className="admission-program-detail-fields-table"
      />
    </div>
  );
};

export default AdmissionProgramDetailFields;
