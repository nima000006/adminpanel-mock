import { useEffect, useState } from "react";

import { Col, Dropdown, Form, MenuProps, Row } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import { CustomButton, CustomSelect } from "@components/CustomInputs";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useMyDoctorSurveyAllAdvanceFilterMutation,
  useMyDoctorSurveyAllQuery,
} from "@infra/states/redux/Apis/myDoctor/genetic/geneticApis";
import { formatDateRangeForApi } from "@pages/_shared/utils/formatDateRangeForApi";
import {
  GeneticsParticipantsListAdvanceFilterFormType,
  myDoctorSurveyAllAdvanceFilterContentType,
  myDoctorSurveyAllAdvanceFilterRequest,
} from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsList/@types/@geneticsParticipantsList";
import useGeneticsParticipantsListAdvanceFilter from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsList/helper/hooks/useGeneticsParticipantsListAdvanceFilter";
import GeneticsParticipantsListTableModel from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsList/helper/models/GeneticsParticipantsListTableModel/GeneticsParticipantsListTableModel";

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

const GeneticsParticipantsList = () => {
  useTitle({ text: "شرکت کنندگان" });

  const { params: url, setSearchParams } = useQueryParams();
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [dataSource, setDataSource] =
    useState<myDoctorSurveyAllAdvanceFilterContentType[]>();
  const [totalElement, setTotalElement] = useState(0);

  const [selectedSurveyId, setSelectedSurveyId] = useState<number>(0);

  const [form] = Form.useForm<GeneticsParticipantsListAdvanceFilterFormType>();

  const { filterItemsList } = useGeneticsParticipantsListAdvanceFilter({
    form,
    advanceModalOpen: isAdvanceModalOpen,
    selectedSurveyId: selectedSurveyId?.toString(),
  });

  //? ================================  Api Calls ================================

  const { data, isFetching: isGetAllSurveyLoading } = useMyDoctorSurveyAllQuery(
    //send default 0 and 100 for this api
    {
      page: 0,
      size: 100,
    }
  );

  const [getSurveyAdvanceFilterList, { isLoading: isGetParticipateListLoading }] =
    useMyDoctorSurveyAllAdvanceFilterMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!selectedSurveyId) {
      setSearchParams({});
      form.resetFields();
      setBadgeCount("0");
    }
    const { from, to } = formatDateRangeForApi({
      from: url?.testDateDateStart,
      to: url?.testDateDateEnd,
      isPost: true, // api has post method
    });
    if (!selectedSurveyId) return;
    const bodyParams: myDoctorSurveyAllAdvanceFilterRequest["body"] = {
      surveyId: Number(selectedSurveyId),
      ...(url?.branchId && {
        branchId: url.branchId.split(",").map(Number),
      }),
      ...(url?.axisId && {
        groupId: Number(url.axisId),
      }),
      ...(url?.axisStatusId && {
        surveyStatusId: url.axisStatusId.split(",").map(Number),
      }),

      ...(from && { fromRequestedDate: from }),
      ...(to && { toRequestedDate: to }),

      //todo[nima] These parameters must be added to the API
      //column search params
      ...(url?.firstName && { firstName: url?.firstName }),
      ...(url?.lastName && { lastName: url?.lastName }),
      ...(url?.username && { username: url?.username }),
      ...(url?.mobileNumber && { mobileNumber: url?.mobileNumber }),
      ...(url?.fieldName && { fieldName: url?.fieldName }),
      ...(url?.levelName && { levelName: url?.levelName }),
    };

    const requestParams: myDoctorSurveyAllAdvanceFilterRequest["params"] = {
      page: url?.page ? Number(url.page) - 1 : 0,
      size: url?.pageSize ? Number(url.pageSize) : 8,
      // todo[nima]: uncomment when api will be implemented
      // sort: [],
    };
    // todo[nima]: uncomment when api will be implemented
    // // sortings
    // if (url?.sortings) {
    //   const sorting = JSON.parse(url?.sortings)?.[0];

    //   if (sorting?.sortBy) {
    //     requestParams.sortBy = sorting.sortBy;
    //   } else {
    //     delete requestParams.sortBy;
    //   }

    //   if (sorting?.sortOrder) {
    //     requestParams.sortDirection = sorting.sortOrder.toUpperCase();
    //   } else {
    //     delete requestParams.sortDirection;
    //   }
    // }

    getSurveyAdvanceFilterList({
      body: bodyParams,
      params: requestParams,
    })
      .unwrap()
      .then((res) => {
        setDataSource(res?.content);
        setTotalElement(res.totalElements);
      });
  }, [
    url?.testDateDateStart,
    url?.testDateDateEnd,
    selectedSurveyId,
    url.axisId,
    url.axisStatusId,
    url.branchId,
    url.degreeTitle,
    url.fieldTitle,
    url.page,
    url.pageSize,
    url?.firstName,
    url?.lastName,
    url?.username,
    url?.mobileNumber,
    setSearchParams,
    form,
    url?.fieldName,
    url?.levelName,
  ]);
  //* ================================ Util Functions ================================

  const closeAdvanceFilterHandler = () => {
    setIsAdvanceModalOpen(false);
    form.resetFields();
  };

  const examOptions =
    data?.content?.map((item) => ({
      id: item?.id,
      title: item?.title,
    })) ?? [];

  const onChangeExamHandler = (id: unknown) => {
    if (!id) {
      setSelectedSurveyId(0);

      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.delete("surveyId");

        return params;
      });

      return;
    }

    const surveyId = id as number;

    setSelectedSurveyId(surveyId);
  };

  const column = GeneticsParticipantsListTableModel();

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
      <Row>
        <Col xl={6} lg={8} md={12} xs={24}>
          <CustomSelect
            className="w-full!"
            options={examOptions}
            name="exam"
            loading={isGetAllSurveyLoading}
            placeholder="انتخاب کنید"
            label="آزمون ها"
            onChange={onChangeExamHandler}
            allowClear
          />
        </Col>
      </Row>

      {selectedSurveyId ? (
        <>
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
          <CustomTable<myDoctorSurveyAllAdvanceFilterContentType>
            className="mt-4"
            dataSource={dataSource}
            columns={column}
            rowKey="id"
            loading={isGetParticipateListLoading}
            draggableColumns
            draggableId={ExcelCodes.MY_DOCTOR_GENETICS_PARTICIPANTS_LIST}
            pagination={manualPaginationConfig({
              total: totalElement,
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
      ) : (
        <CustomEmpty description="ابتدا یک آزمون انتخاب کنید." />
      )}
    </>
  );
};
export default GeneticsParticipantsList;
