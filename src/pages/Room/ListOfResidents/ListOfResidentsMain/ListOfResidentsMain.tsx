import { useState, useEffect } from "react";

import { Form } from "antd";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useAdminBranchCode from "@infra/hooks/useAdminBranchCode";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { ListOfDormResidents } from "@pages/Reports/dorms/DormsRequests/DormReportRequests/AllDormReportRequests/@types/@allDormReportRequests";
import { semestersOption } from "@pages/Room/_shared/lib/config";

import { MovingModalRequestType } from "./@types/@listOfResidentsMain";
import MovingRequestModal from "../../../../components/Modals/Dorm/MovingRequestModal/MovingRequestModal";
import TransferRequestModal from "../../../../components/Modals/Dorm/TransferRequestModal/TransferRequestModal";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import {
  downloadListOfResidentsInDormExcel,
  selectDefaultValueGenerator,
} from "../../../../infrastructure/helpers/utils";
import RoomResidentsModel from "../../../../infrastructure/models/tableModels/RoomTableModel/RoomResidentsModel/RoomResidentsModel";
import { useGetListOfDormResidentsMutation } from "../../../../infrastructure/states/redux/Apis/roomApi";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "../../../../infrastructure/VARS/globalToasts/globalToasts";

import "./_listOfResidentsMain.scss";

const ListOfResidentsMain = () => {
  useTitle({ text: "لیست تمام ساکنین" });

  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);
  const [semester, setSemester] = useState<
    "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8"
  >("8");

  const [movingModalRequest, setMovingModalRequest] = useState<MovingModalRequestType>({
    id: -1,
    isOpen: false,
    userInfo: {},
  });
  const [transferRequestModalData, setTransferRequestModalData] = useState({
    id: -1,
    isOpen: false,
    primaryUser: {},
  });
  const [isDataRefreshed, setIsDataRefreshed] = useState(false);
  // const [isBranchCodeValid, setIsBranchCodeValid] = useState(false);
  const [selectedUni, setSelectedUni] = useState("1111");
  const [isAdminBranchCode] = useAdminBranchCode();

  const [form] = Form.useForm();

  //? ================================  Api Calls ================================
  const [
    getListOfResident,
    { data: listOfResidents, isLoading: isListOfResidentsLoading },
  ] = useGetListOfDormResidentsMutation();

  const [getAllUniversity, { data: universityData, isLoading: isUniversityDataLoading }] =
    useLazyGetAllBranchesQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getAllUniversity();
  }, []);

  // const [
  //   downloadRequest,
  //   { data: downloadData, error: downloadError, isLoading: isDownloadLinkLoading },
  // ] = useDownloadExcelFileMutation();

  useEffect(() => {
    form.setFieldsValue({ year: selectDefaultValueGenerator({ ...semestersOption[8] }) });
  }, []);

  // Todo[saman]: old is branch admin code
  // useEffect(() => {
  //   try {
  //     const meta = JSON.parse(getFromLocalStorage("meta") ?? "");
  //     if (meta?.branchCode === "1111") {
  //       setIsBranchCodeValid(true);
  //     }
  //   } catch (_) {
  //     setIsBranchCodeValid(false);
  //   }
  // }, []);

  useEffect(() => {
    getListOfResident({
      semester,
      branchCode: isAdminBranchCode ? selectedUni?.toString() : "1111",
    });
  }, [isDataRefreshed, semester, isAdminBranchCode, selectedUni]);

  //* ================================ Util Functions ================================
  const transferClickHandler = (id: string, record: Partial<ListOfDormResidents>) => {
    setMovingModalRequest({
      isOpen: true,
      id: +id,
      userInfo: record,
    });
  };

  const onDownloadBtnClickHandler = async () => {
    try {
      setIsDownloadLinkLoading(true);
      const downloadLink = await downloadListOfResidentsInDormExcel(
        semester,
        selectedUni
      );
      if (downloadLink?.length) {
        toast.success(DOWNLOAD_LINK_SUCCESS, { toastId: DOWNLOAD_LINK_SUCCESS });
      } else {
        toast.error(DOWNLOAD_LINK_ERROR, { toastId: DOWNLOAD_LINK_ERROR });
      }
    } catch (_) {
      toast.error(DOWNLOAD_LINK_ERROR, { toastId: DOWNLOAD_LINK_ERROR });
    } finally {
      setIsDownloadLinkLoading(false);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <MovingRequestModal
        movingModalRequest={movingModalRequest}
        setMovingModalRequest={setMovingModalRequest}
        setTransferRequestModalData={setTransferRequestModalData}
        setIsDataRefreshed={setIsDataRefreshed}
        isExtraInfoDisable={false}
      />

      <TransferRequestModal
        setTransferRequestModalData={setTransferRequestModalData}
        transferRequestModalData={transferRequestModalData}
        setIsDataRefreshed={setIsDataRefreshed}
      />
      <div className="list-of-residents-main-container">
        <Form className="action-btn-container" form={form}>
          <ToolBox
            leftSide={
              <CustomSelect
                options={semestersOption}
                // defaultValue={"نیمسال دوم 1402"}
                name="year"
                form={form}
                placeholder="نیمسال تحصیلی را انتخاب فرمائید"
                onChange={(value: any) => setSemester(value)}
                className="semester-container-main"
                hasVerticalLabel={false}
              />
            }
            rightSide={
              <div className="right-side-wrapper">
                <CustomButton
                  className="download-excel-btn"
                  type="primary"
                  onClick={onDownloadBtnClickHandler}
                  loading={isDownloadLinkLoading}
                >
                  دریافت فایل اکسل
                </CustomButton>
                {isAdminBranchCode ? (
                  <CustomSelect
                    options={universityData ? universityData : []}
                    name="branchId"
                    form={form}
                    placeholder="دانشگاه مورد نظر را انتخاب کنید"
                    className="branch-selector"
                    isLoading={isUniversityDataLoading}
                    onChange={(_: any, info: any) => setSelectedUni(info?.value)}
                    hasVerticalLabel={false}
                  />
                ) : null}
              </div>
            }
          />
          {/* <div className="right-side-actions">
            <CustomButton
              className="download-excel-btn"
              type="primary"
              onClick={onDownloadBtnClickHandler}
              loading={isDownloadLinkLoading}
            >
              دریافت فایل اکسل
            </CustomButton>
            {isAdminBranchCode ? (
              <CustomSelect
                options={universityData?.data?.map((item) => {
                  return {
                    id: item.branchCode,
                    title: item.branchName,
                  };
                })}
                name="branchId"
                form={form}
                placeholder="دانشگاه مورد نظر را انتخاب کنید"
                className="branch-selector"
                isLoading={isUniversityDataLoading}
                onChange={(_: any, info: any) => setSelectedUni(info?.value)}
                hasVerticalLabel={false}
              />
            ) : null}
          </div>
          <div className="left-side"></div> */}
        </Form>

        <CustomTable
          dataSource={listOfResidents?.data}
          columns={RoomResidentsModel({
            transferClickHandler: transferClickHandler,
          })}
          rowKey="nationalnumber"
          loading={isListOfResidentsLoading}
          pagination={paginationConfig}
          {...TABLE_PROPS(listOfResidents?.data?.length || 0)}
        />
      </div>
      <CustomTotalTableItems
        totalCount={listOfResidents?.count ?? 0}
        label="تعداد کل ساکنین"
        className="mt-1"
      />
    </>
  );
};

export default ListOfResidentsMain;
