import { useEffect, useState } from "react";

import { Dropdown, Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

import { CustomButton } from "@components/CustomInputs";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import { jalaliToGregorianWithoutZ } from "@infra/helpers/DatePickerFix/utils/jalaliToGregorianWithoutZ";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyMyDoctorLabsListAdvanceFilterQuery } from "@infra/states/redux/Apis/myDoctor/genetic/geneticApis";
import { exportMenu } from "@pages/Finance/Transactions/TransactionsList/utils/transactionUtils";
import {
  ListLabsAdvanceFilterFormType,
  myDoctorLabsListAdvanceFilterContentItems,
  myDoctorLabsListAdvanceFilterRequest,
  myDoctorLabsListAdvanceFilterResponse,
} from "@pages/MyDoctor/Genetics/Labs/LabsList/@types/@labsList";
import LabsModifyDrawerContent from "@pages/MyDoctor/Genetics/Labs/LabsList/helper/drawer/LabsModifyDrawerContent/LabsModifyDrawerContent";
import LabsViewDrawerContent from "@pages/MyDoctor/Genetics/Labs/LabsList/helper/drawer/LabsViewDrawerContent/LabsViewDrawerContent";
import useLabsListTableModeAdvanceFilter from "@pages/MyDoctor/Genetics/Labs/LabsList/helper/model/advancedFilter/useLabsListTableModeAdvanceFilter";
import LabsListTableModel from "@pages/MyDoctor/Genetics/Labs/LabsList/helper/model/LabsListTableModel/LabsListTableModel";

const advanceFilterItems = [
  "dateDateStart",
  "dateDateEnd",
  "provinceId",
  "cityId",
  "statusId",
  //search
  "title",
  "phone",
  "employee",
];

const LabsList = () => {
  useTitle({ text: "آزمایشگاه ها" });
  const { params, setSearchParams } = useQueryParams();
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => {
    return params?.badger ?? 0;
  });
  const [dataSource, setDataSource] =
    useState<myDoctorLabsListAdvanceFilterContentItems[]>();
  const [totalElement, setTotalElement] = useState(0);

  const [modifyData, setModifyData] = useState({ isOpen: false, id: -1 });
  const [viewData, setViewData] = useState({ isOpen: false, id: -1 });

  const [form] = Form.useForm<ListLabsAdvanceFilterFormType>();

  const { filterItemsList } = useLabsListTableModeAdvanceFilter({
    isAdvanceModalOpen,
    form,
  });

  //? ================================  Api Calls ================================
  const [getLabsList, { isLoading: isGetLabsListLoading }] =
    useLazyMyDoctorLabsListAdvanceFilterQuery();

  //? ================================ Effects ================================
  const fetchLabsList = () => {
    const requestParams: myDoctorLabsListAdvanceFilterRequest["params"] = {
      page: params?.page ? Number(params.page) - 1 : 0,
      size: params?.pageSize ? Number(params.pageSize) : 8,
      // todo[shirin]: uncomment when api will be implemented
      // sort: [],
    };

    const filters: myDoctorLabsListAdvanceFilterRequest["body"] = {
      ...(params?.provinceId && {
        provinceId: +params.provinceId,
      }),
      ...(params?.cityId && {
        cityId: +params.cityId,
      }),
      ...(params?.statusId && {
        recordStatus: +params.statusId,
      }),
      ...(params?.dateDateStart && {
        fromCreatedDate: jalaliToGregorianWithoutZ(params.dateDateStart),
      }),
      ...(params?.dateDateEnd && {
        toCreatedDate: jalaliToGregorianWithoutZ(params.dateDateEnd),
      }),
      ...(params?.title && {
        title: params.title,
      }),
      ...(params?.phone && {
        mobile: params.phone,
      }),
      ...(params?.employee && {
        employee: params.employee,
      }),
    };

    return getLabsList({
      params: requestParams,
      body: filters,
    })
      .unwrap()
      .then(getListSuccess);
  };

  useEffect(() => {
    fetchLabsList();
  }, [params?.page, params?.pageSize, ...advanceFilterItems.map((key) => params?.[key])]);

  //* ================================ Util Functions ================================
  // success
  const getListSuccess = (res: myDoctorLabsListAdvanceFilterResponse) => {
    setDataSource(res?.content);
    setTotalElement(res?.totalElements);
  };

  // handlers
  const closeAdvanceFilterModalHandler = () => {
    form?.resetFields();
    setIsAdvanceModalOpen(false);
  };

  const addLabsHandler = () => {
    setModifyData({ isOpen: true, id: -1 });
  };

  const editClickHandler = (id: number) => {
    setModifyData({ isOpen: true, id });
  };

  const closeModifyHandler = () => {
    setModifyData({ isOpen: false, id: -1 });
  };

  const viewClickHandler = (id: number) => {
    setViewData({ isOpen: true, id });
  };
  const closeViewHandler = () => {
    setViewData({ isOpen: false, id: -1 });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* ADVANCE FILTER */}
      {isAdvanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={isAdvanceModalOpen}
          closeModalHandler={closeAdvanceFilterModalHandler}
          filterItemsList={filterItemsList}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          form={form}
          defaultParams={params}
        />
      )}

      {/* MODIFY AND ADD DRAWER */}
      {modifyData?.isOpen && (
        <CustomDrawer
          onClose={closeModifyHandler}
          open={modifyData?.isOpen}
          content={
            <LabsModifyDrawerContent
              closeDrawerHandler={closeModifyHandler}
              modifyData={modifyData}
              fetchLabsList={fetchLabsList}
            />
          }
        />
      )}

      {/* VIEW DRAWER */}
      {viewData?.isOpen && (
        <CustomDrawer
          onClose={closeViewHandler}
          open={viewData?.isOpen}
          content={
            <LabsViewDrawerContent
              closeDrawerHandler={closeViewHandler}
              id={viewData?.id}
            />
          }
        />
      )}

      <div className="flex flex-col gap-4">
        <ToolBox
          className="mt-4"
          rightSide={
            <div className="flex gap-2">
              <CustomBadge count={badgeCount}>
                <CustomButton
                  icon={<AiOutlineFilter />}
                  onClick={() => setIsAdvanceModalOpen(true)}
                >
                  فیلتر پیشرفته
                </CustomButton>
              </CustomBadge>
            </div>
          }
          leftSide={
            <div className="flex flex-wrap gap-2">
              <CustomButton
                type="primary"
                icon={<FaPlus />}
                iconPlacement="start"
                onClick={addLabsHandler}
              >
                افزودن آزمایشگاه
              </CustomButton>
              <Dropdown menu={exportMenu} trigger={["click"]}>
                <CustomButton disabled icon={<IoIosArrowDown />} iconPlacement="end">
                  خروجی
                </CustomButton>
              </Dropdown>
            </div>
          }
        />

        <CustomTable<myDoctorLabsListAdvanceFilterContentItems>
          dataSource={dataSource}
          loading={isGetLabsListLoading}
          columns={LabsListTableModel({ editClickHandler, viewClickHandler })}
          rowKey="uuid"
          pagination={manualPaginationConfig({
            total: totalElement ?? 0,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...params,
                page: page?.toString(),
                pageSize: pageSize?.toString(),
              });
            },
            pageNumber: params?.page ? Number(params?.page) : 1,
            defaultPageSize: params?.pageSize ? Number(params?.pageSize) : 8,
          })}
          draggableColumns
          draggableId={ExcelCodes.MY_DOCTOR_GENETICS_LABS_TABLE}
          key={`table-${params?.pageSize || "8"}`}
        />
      </div>
    </>
  );
};
export default LabsList;
