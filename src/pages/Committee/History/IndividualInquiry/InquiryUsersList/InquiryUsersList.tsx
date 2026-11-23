import { useEffect, useState } from "react";

import { Button } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import { User, getAllUserWithFirstLastNameResponse } from "./@types/@inquiryUsersList";
import manualPaginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/manualPagination";
import { makeSearchParams } from "../../../../../infrastructure/helpers/utils";
import { CommitteeInquiryUsersListModel } from "../../../../../infrastructure/models/tableModels/CommitteeTableModel/Inquiry/InquiryUsersList/InquiryUsersList";
import {
  COMMITTEE_INQUIRY_USERS_SEARCH_PAGE_ROUTE,
  COMMITTEE_INQUIRY_USER_INFORMATION_PAGE_ROUTE,
} from "../../../../../infrastructure/router/routes/committee";
import { useGetAllUserWithFirstLastNameMutation } from "../../../../../infrastructure/states/redux/Apis/authApi";
import "./_inquiryUsersList.scss";

const InquiryUsersList = () => {
  const [tableData, setTableData] = useState([] as User[]);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const { userName, nationalCode, studentNumber, userFamily, mobileNo } =
    Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  const [getUsers, { isLoading: isGetAllUsersLoading, data: getAllUserData }] =
    useGetAllUserWithFirstLastNameMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getUsers({
      firstName: userName ? userName : null,
      lastName: userFamily ? userFamily : null,
      mobileNo: mobileNo ? mobileNo : null,
      nationalNo: nationalCode ? nationalCode : null,
      pageNumber: 0,
      pageSize: 8,
      studentNo: studentNumber ? studentNumber : null,
    })
      .unwrap()
      .then(onGetAllTableUsersBySuccess);
  }, []);

  //* ================================ Util Functions ================================
  const onGetAllTableUsersBySuccess = async (
    value: getAllUserWithFirstLastNameResponse
  ) => {
    if (value?.status === 200) {
      setTableData(value?.data?.userAdvancedFilterDtos);
    }
  };

  const onSearchHandler = () => {
    navigate({
      pathname: COMMITTEE_INQUIRY_USERS_SEARCH_PAGE_ROUTE,
    });
  };
  const onWatchClickHandler = (nationalCode: string) => {
    if (nationalCode) {
      navigate({
        pathname: COMMITTEE_INQUIRY_USER_INFORMATION_PAGE_ROUTE,
        search: makeSearchParams({ nationalCode }),
      });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <section className="inquiry-users-list-page-container">
      <div>
        <Button
          type="primary"
          icon={<AiOutlineFilter />}
          size="middle"
          ghost
          onClick={onSearchHandler}
          className="search-btn"
        >
          جستجو مجدد
        </Button>
      </div>
      <CustomTable
        dataSource={tableData as any}
        columns={CommitteeInquiryUsersListModel({
          onWatchClickHandler,
        })}
        loading={isGetAllUsersLoading}
        pagination={manualPaginationConfig({
          total: getAllUserData?.data?.totalElement,
          onChange: (page, pageSize) => {
            getUsers({
              pageSize: pageSize,
              pageNumber: page - 1,
              firstName: userName ? userName : null,
              lastName: userFamily ? userFamily : null,
              mobileNo: mobileNo ? mobileNo : null,
              nationalNo: nationalCode ? nationalCode : null,
              studentNo: studentNumber ? studentNumber : null,
            });
          },
        })}
        rowKey="id"
        {...TABLE_PROPS(tableData?.length)}
      />
    </section>
  );
};

export default InquiryUsersList;
