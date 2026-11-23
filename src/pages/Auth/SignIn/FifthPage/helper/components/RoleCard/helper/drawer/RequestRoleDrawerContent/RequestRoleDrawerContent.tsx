import { useEffect, useState } from "react";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomPagination from "@components/Renderers/CustomPagination/CustomPagination";
import Div from "@components/Renderers/Div/Div";
import { emptyString } from "@infra/config/global.vars";
import { useLazyGetAdminRequestListQuery } from "@infra/states/redux/Apis/auth/signInApis";

import {
  GetAdminRequestListItem,
  GetAdminRequestListResponse,
  RequestRoleDrawerContentProps,
} from "./@types/@requestRoleDrawerContentType";
import InfoBox from "../../components/InfoBox/InfoBox";
import RequestCard from "./helper/components/RequestCard/RequestCard";

const RequestRoleDrawerContent = ({
  closeDrawer,
  title,
  personalNumber,
  branchName,
  id,
}: RequestRoleDrawerContentProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [dataSource, setDataSource] = useState<GetAdminRequestListItem[]>([]);

  //? ================================  Api Calls ================================
  const [getAdminRequestList, { isFetching: isGetAdminRequestListLoading }] =
    useLazyGetAdminRequestListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getAdminRequestList({ staffId: id }).unwrap().then(getAdminRequestLisIsSuccess);
    }
  }, []);

  //* ================================ Util Functions ================================
  const pageSize = 4;

  const startIndex = (currentPage - 1) * pageSize;

  const paginatedData = dataSource.slice(startIndex, startIndex + pageSize);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // is success
  const getAdminRequestLisIsSuccess = (response: GetAdminRequestListResponse) => {
    if (response) {
      setDataSource(response);
    }
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader
        title="درخواست‌ها"
        closeDrawerHandler={closeDrawer}
        leftSideContent={
          <CustomButton onClick={closeDrawer} className="drawer-action-btn">
            بستن
          </CustomButton>
        }
      />
      <div className="body-regular flex flex-col gap-2">
        <div className="text-neutral-10 text-center text-xl font-bold">{title}</div>
        <div className="flex justify-around">
          <InfoBox title={"شعبه / واحد"} value={branchName} />
          <InfoBox title={"دانشکده / دپارتمان"} value={emptyString} />
          <InfoBox title={"شماره پرسنلی"} value={personalNumber} />
        </div>
      </div>

      <Div loading={isGetAdminRequestListLoading} className="flex flex-col gap-4">
        {paginatedData?.map((item) => {
          return <RequestCard item={item} />;
        })}
        <CustomPagination
          className="custom-pagination"
          current={currentPage}
          total={dataSource.length}
          pageSize={pageSize}
          onChange={handlePageChange}
          showQuickJumper
        />
      </Div>
    </div>
  );
};
export default RequestRoleDrawerContent;
