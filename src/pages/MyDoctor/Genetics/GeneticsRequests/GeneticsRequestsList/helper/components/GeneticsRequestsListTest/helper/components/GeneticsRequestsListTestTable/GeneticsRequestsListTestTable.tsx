import { useEffect, useMemo, useRef, useState } from "react";

import { Dropdown, Form, MenuProps } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import { CustomButton } from "@components/CustomInputs";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useMyDoctorSurveyDetailFourthTabQuery } from "@infra/states/redux/Apis/myDoctor/genetic/geneticApis";
import { formatDateRangeForApi } from "@pages/_shared/utils/formatDateRangeForApi";
import {
  myDoctorSurveyDetailFourthTabContentType,
  myDoctorSurveyDetailFourthTabRequest,
} from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/@types/@geneticsParticipantsDetailReviewStatus";
import {
  GeneticsRequestsListTestTableAdvanceFilterFormType,
  GeneticsRequestsListTestTableProps,
} from "@pages/MyDoctor/Genetics/GeneticsRequests/GeneticsRequestsList/helper/components/GeneticsRequestsListTest/helper/components/GeneticsRequestsListTestTable/@types/@geneticsRequestsListTestTable";
import useGeneticsRequestsListTestTableAdvanceFilter from "@pages/MyDoctor/Genetics/GeneticsRequests/GeneticsRequestsList/helper/components/GeneticsRequestsListTest/helper/components/GeneticsRequestsListTestTable/helper/hooks/useGeneticsRequestsListTestTableAdvanceFilter";
import GeneticsRequestsListTestTableModel from "@pages/MyDoctor/Genetics/GeneticsRequests/GeneticsRequestsList/helper/components/GeneticsRequestsListTest/helper/components/GeneticsRequestsListTestTable/helper/models/GeneticsRequestsListTestTableModel/GeneticsRequestsListTestTableModel";

const exportMenu: MenuProps = {
  items: [
    {
      label: "خروجی Excel",
      key: "excel",
    },
    {
      label: "خروجی PDF",
      key: "pdf",
    },
  ],
};

const GeneticsRequestsListTestTable = ({
  surveyId,
  testId,
  statusId,
}: GeneticsRequestsListTestTableProps) => {
  const { params: url, setSearchParams } = useQueryParams();

  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const prevStatus = useRef(url?.status);

  const [form] = Form.useForm<GeneticsRequestsListTestTableAdvanceFilterFormType>();

  const { filterItemsList } = useGeneticsRequestsListTestTableAdvanceFilter({
    advanceModalOpen: isAdvanceModalOpen,
    form,
    testId,
  });

  //* ================================ Util Functions ================================
  const requestParams = useMemo(
    () => ({
      page: url?.page ? Number(url.page) - 1 : 0,
      size: url?.pageSize ? Number(url.pageSize) : 8,
    }),
    [url?.page, url?.pageSize]
  );

  const bodyParams = useMemo((): myDoctorSurveyDetailFourthTabRequest["body"] => {
    const { from: testRequestFromDate, to: testRequestToDate } = formatDateRangeForApi({
      from: url?.createDateDateStart,
      to: url?.createDateDateEnd,
      isPost: true,
    });

    const { from: fromDate, to: toDate } = formatDateRangeForApi({
      from: url?.participantDateDateStart,
      to: url?.participantDateDateEnd,
      isPost: true,
    });
    return {
      surveyId: Number(surveyId),
      testId: Number(testId),
      testTypeIds: [1], // 1: تست
      ...(statusId !== undefined ? { testStatusId: statusId } : {}),
      ...(url?.branchId && {
        branchIds: url.branchId.split(",").map(Number),
      }),
      ...(url?.cityId && {
        cityIds: url.cityId.split(",").map(Number),
      }),
      ...(url?.provinceId && {
        provinceIds: url.provinceId.split(",").map(Number),
      }),
      ...(testRequestFromDate && { testRequestFromDate }),
      ...(testRequestToDate && { testRequestToDate }),
      ...(fromDate && { fromDate }),
      ...(toDate && { toDate }),
      ...(url?.firstName && { firstName: url.firstName }),
      ...(url?.lastName && { lastName: url.lastName }),
      ...(url?.username && { username: url.username }),
      ...(url?.labId && { centerId: Number(url.labId) }),
    };
  }, [
    surveyId,
    testId,
    statusId,
    url?.branchId,
    url?.cityId,
    url?.provinceId,
    url?.createDateDateStart,
    url?.createDateDateEnd,
    url?.participantDateDateStart,
    url?.participantDateDateEnd,
    url?.firstName,
    url?.lastName,
    url?.username,
    url?.labId,
  ]);

  //? ================================  Api Calls ================================
  const { data, isFetching } = useMyDoctorSurveyDetailFourthTabQuery(
    {
      params: requestParams,
      body: bodyParams,
    },
    { skip: !surveyId || !testId }
  );

  //? ================================ Effects ================================
  useEffect(() => {
    if (prevStatus.current !== url?.status) {
      setBadgeCount("0");
      form.resetFields();
    }

    prevStatus.current = url?.status;
  }, [url?.status, form]);

  //* ================================ Util Functions ================================
  const closeAdvanceFilterHandler = () => {
    setIsAdvanceModalOpen(false);
    form.resetFields();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isAdvanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={isAdvanceModalOpen}
          closeModalHandler={closeAdvanceFilterHandler}
          filterItemsList={filterItemsList}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          form={form}
          defaultParams={url}
        />
      )}
      <ToolBox
        rightSide={
          <CustomBadge count={badgeCount}>
            <CustomButton
              icon={<AiOutlineFilter />}
              onClick={() => setIsAdvanceModalOpen(true)}
            >
              فیلتر پیشرفته
            </CustomButton>
          </CustomBadge>
        }
        leftSide={
          <Dropdown menu={exportMenu} trigger={["click"]}>
            <CustomButton icon={<IoIosArrowDown />} disabled iconPlacement="end">
              خروجی
            </CustomButton>
          </Dropdown>
        }
      />
      <CustomTable<myDoctorSurveyDetailFourthTabContentType>
        className="mt-4"
        dataSource={data?.content ?? []}
        columns={GeneticsRequestsListTestTableModel()}
        rowKey="id"
        loading={isFetching}
        draggableColumns
        draggableId={ExcelCodes.MY_DOCTOR_GENETICS_REQUESTS_TEST_LIST}
        pagination={manualPaginationConfig({
          total: data?.totalElements ?? 0,
          onChange: (page, pageSize) => {
            setSearchParams({
              ...url,
              page: page?.toString(),
              pageSize: pageSize?.toString(),
            });
          },
          pageNumber: url?.page ? Number(url?.page) : 1,
          defaultPageSize: url?.pageSize ? Number(url?.pageSize) : 8,
        })}
      />
    </>
  );
};

export default GeneticsRequestsListTestTable;
