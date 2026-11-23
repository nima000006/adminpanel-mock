import { useEffect, useState } from "react";

import { AiOutlineFilter } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { PiHash } from "react-icons/pi";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { INTERNATIONAL_BASIC_INFO_ADMISSION_PROGRAM_MODIFY_ROUTE } from "@infra/router/routes/international";
import {
  useInternationalAdmissionActiveStatusMutation,
  useLazyGetInternationalAdmissionListQuery,
} from "@infra/states/redux/Apis/international/basicInfo/internationalBasicInfo";
import { INTERNATIONAL_ADMISSION_LIST_STATUS } from "@pages/International/BasicInfo/AdmissionProgram/utils/admissionProgramUtils";

import InternationalAdmissionTableModel from "./helper/models/InternationalAdmission/InternationalAdmissionTableModel";

import "./_internationalAdmissionTab.scss";

const InternationalAdmissionTab = () => {
  const [isArchiveActive, setIsArchiveActive] = useState(false);

  const [inactiveModalOpen, setInactiveModalOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const [activeModalOpen, setActiveModalOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const { params: url, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getAdmissionList, { data: admissionData, isFetching: isAdmissionListLoading }] =
    useLazyGetInternationalAdmissionListQuery();

  const [activeStatus, { isLoading: isActiveStatusLoading }] =
    useInternationalAdmissionActiveStatusMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getAdmissionList({
      pageNumber: url?.page ? Number(url?.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
      requestStatus: isArchiveActive
        ? `${INTERNATIONAL_ADMISSION_LIST_STATUS.archive}`
        : `${INTERNATIONAL_ADMISSION_LIST_STATUS.inactive},${INTERNATIONAL_ADMISSION_LIST_STATUS.active}`,
    });
  }, [url?.page, url?.page, isArchiveActive]);

  //* ================================ Util Functions ================================
  const closeInactiveModalHandler = () => {
    setInactiveModalOpen({ isOpen: false, id: -1 });
  };

  const closeActiveModalHandler = () => {
    setActiveModalOpen({ isOpen: false, id: -1 });
  };

  const activeInactiveHandler = (isActive: boolean, id: number) => {
    if (isActive) {
      setInactiveModalOpen({ isOpen: true, id });
    } else {
      setActiveModalOpen({ isOpen: true, id });
    }
  };

  const switchHandler = (e: boolean) => {
    setIsArchiveActive(e);
    setSearchParams({
      ...url,
      page: "1",
      pageSize: "8",
    });
  };

  const activeStatusHandler = () => {
    if (activeModalOpen.id > 0) {
      activeStatus(activeModalOpen.id).unwrap().then(activeSuccessHandler);
    }
  };

  const activeSuccessHandler = async () => {
    closeActiveModalHandler();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      {inactiveModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="توجه بفرمایید!"
          isModalOpen={inactiveModalOpen?.isOpen}
          // isConfirmButtonLoading={isUpdateFoodScheduleLoading}
          confirmBtnText="انتقال به آرشیو"
          backBtnText="انصراف"
          closeModalHandler={closeInactiveModalHandler}
          onConfirmClickHandler={() => {}}
          content={
            <div className="interNational-admission-list-inactive-modal-container">
              <p className="desc">
                در صورت غیر فعال کردن برنامه پذیرش این برنامه به آرشیو انتقال داده می‌شود
                و شما نمی‌تواند دیگر از این برنامه پذیرش استفاده بفرمایید.
              </p>
              <p className="desc">
                در صورتی که میخواهید بر روی برنامه پذیرش ویرایشی انجام دهید از “کپی برنامه
                پذیرش” استفاده بفرمایید و سپس برنامه موجود را غیر فعال بفرمایید.
              </p>
            </div>
          }
        />
      )}
      {activeModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="توجه!"
          isModalOpen={activeModalOpen?.isOpen}
          isConfirmButtonLoading={isActiveStatusLoading}
          confirmBtnText="فعال کن"
          backBtnText="انصراف"
          closeModalHandler={closeActiveModalHandler}
          onConfirmClickHandler={activeStatusHandler}
          content={
            <div className="interNational-admission-list-active-modal-container">
              <p className="desc">
                با فعال کردن این برنامه، رشته‌های تحصیلی مورد نظر شما در سایت نمایش داده
                می‌شود و متقاضیان می‌توانند برای آن‌ها درخواست خود را ثبت نمایند.
              </p>
            </div>
          }
        />
      )}
      <div className="international-admission-tab-container">
        <div className="switch-container">
          <CustomSwitch
            valuePropName="archiveSwitch"
            onChange={(e: boolean) => switchHandler(e)}
            defaultChecked={false}
            label="نمایش آرشیو:"
            className="international-admission-tab-switch"
          />
        </div>
        <div className="table-container">
          <CustomDivider
            text={
              isArchiveActive
                ? "لیست برنامه‌های پذیرش آرشیو شده"
                : " لیست برنامه‌های پذیرش"
            }
            extraContent={
              <div className="extra-content-container">
                <CustomButton
                  className="text-neutral-11! cursor-default! border-transparent!"
                  disabled
                  icon={<PiHash />}
                >
                  تعداد : {admissionData?.content?.[0]?.length}
                </CustomButton>
                {!isArchiveActive && (
                  <Link
                    to={{
                      pathname: INTERNATIONAL_BASIC_INFO_ADMISSION_PROGRAM_MODIFY_ROUTE,
                    }}
                    className="text-link"
                  >
                    <CustomButton
                      icon={<AiOutlinePlus />}
                      iconPlacement="end"
                      type="primary"
                    >
                      افزودن برنامه پذیرش
                    </CustomButton>
                  </Link>
                )}
              </div>
            }
          />
          <div className="filter-excel-btn-container">
            <CustomButton iconPlacement="end" icon={<AiOutlineFilter />}>
              فیلتر پیشرفته
            </CustomButton>
            <CustomButton className="btn-text">خروجی</CustomButton>
          </div>
          <CustomTable
            dataSource={admissionData?.content?.[0] || []}
            columns={InternationalAdmissionTableModel({
              activeInactiveHandler,
              isArchiveActive,
            })}
            pagination={manualPaginationConfig({
              total: admissionData?.totalElements,
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
            loading={isAdmissionListLoading}
            key={`table-${url?.pageSize || "8"} `}
            {...TABLE_PROPS(admissionData?.content?.[0]?.length || 0)}
            rowKey="id"
            className="international-admission-table"
          />
        </div>
      </div>
    </>
  );
};

export default InternationalAdmissionTab;
