import { useEffect, useState } from "react";

import { Descriptions, DescriptionsProps } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { PiBuildings, PiFileText } from "react-icons/pi";

import { CustomButton } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { emptyString } from "@infra/config/global.vars";
import { convertDateToPersianTextDateWithoutHours } from "@infra/helpers/dateConvertor";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetVendorContractListQuery } from "@infra/states/redux/Apis/shop/vendors/vendorsApi";
import {
  GetVendorContractListBeneficiaryType,
  ShopAllVendorsDetailContractDrawerMode,
} from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailContract/@types/@shopAllVendorsDetailContract";
import ShopAllVendorsDetailContractDrawerContent from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailContract/helper/drawer/ShopAllVendorsDetailContractDrawerContent/ShopAllVendorsDetailContractDrawerContent";
import ShopAllVendorsDetailContractBeneficiariesListTableModel from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailContract/helper/model/ShopAllVendorsDetailContractBeneficiariesListTableModel";

const ShopAllVendorsDetailContract = () => {
  const { params: url } = useQueryParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] =
    useState<ShopAllVendorsDetailContractDrawerMode>("add");

  //? ================================ Api Calls ================================
  const [
    getVendorContractList,
    { data: getVendorContractListData, isFetching: isGetVendorContractListLoading },
  ] = useLazyGetVendorContractListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getVendorContractListHandler();
  }, [url?.id]);

  //* ================================ Util Functions ================================
  const getVendorContractListHandler = () => {
    if (!url?.id) return;

    getVendorContractList({ supplierUuid: url.id });
  };

  // handler
  const openAddContractDrawerHandler = () => {
    setDrawerMode("add");
    setIsDrawerOpen(true);
  };

  const openChangeContractDrawerHandler = () => {
    setDrawerMode("change");
    setIsDrawerOpen(true);
  };

  const closeDrawerHandler = () => {
    setIsDrawerOpen(false);
  };

  const onDrawerSubmitHandler = () => {
    setIsDrawerOpen(false);
    getVendorContractListHandler();
  };

  // description items
  const contractInfoItems: DescriptionsProps["items"] = [
    {
      key: "contractTemplate",
      label: "قالب قرارداد",
      children: dataPlaceHolder({ data: emptyString }),
    },
    {
      key: "services",
      label: "خدمات",
      children: dataPlaceHolder({ data: emptyString }),
    },
    {
      key: "contractStartDate",
      label: "تاریخ شروع قرارداد",
      children: dataPlaceHolder({
        data: getVendorContractListData?.activatedDate
          ? convertDateToPersianTextDateWithoutHours(
              getVendorContractListData.activatedDate
            )
          : null,
      }),
    },
    {
      key: "contractEndDate",
      label: "تاریخ پایان قرارداد",
      children: dataPlaceHolder({
        data: getVendorContractListData?.deactivatedDate
          ? convertDateToPersianTextDateWithoutHours(
              getVendorContractListData.deactivatedDate
            )
          : null,
      }),
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* modify contract drawer */}
      {isDrawerOpen && (
        <CustomDrawer
          open={isDrawerOpen}
          onClose={closeDrawerHandler}
          closable={false}
          destroyOnHidden
          content={
            <ShopAllVendorsDetailContractDrawerContent
              mode={drawerMode}
              onCloseDrawer={closeDrawerHandler}
              onSubmit={onDrawerSubmitHandler}
            />
          }
        />
      )}

      {!isGetVendorContractListLoading && !getVendorContractListData ? (
        <div className="flex flex-col items-center gap-4 py-12">
          <CustomEmpty description="هنوز قراردادی برای این تامین‌کننده ثبت نشده است." />
          <CustomButton
            type="primary"
            icon={<AiOutlinePlus />}
            iconPlacement="start"
            onClick={openAddContractDrawerHandler}
          >
            افزودن قرارداد
          </CustomButton>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <CustomDivider
            text={
              <span className="flex items-center gap-2">
                <PiFileText size={20} />
                قرارداد جاری
              </span>
            }
            extraContent={
              <CustomButton onClick={openChangeContractDrawerHandler}>
                تغییر قرارداد
              </CustomButton>
            }
          />
          <Descriptions
            column={{ xs: 1, sm: 1, md: 2 }}
            items={contractInfoItems}
            styles={{ label: { width: "min(200px, 40%)" } }}
          />

          <CustomDivider
            text={
              <span className="flex items-center gap-2">
                <PiBuildings size={20} />
                ذینفع
              </span>
            }
          />
          <CustomTable<GetVendorContractListBeneficiaryType>
            dataSource={getVendorContractListData?.beneficiaries ?? []}
            loading={isGetVendorContractListLoading}
            rowKey="uuid"
            columns={ShopAllVendorsDetailContractBeneficiariesListTableModel()}
            pagination={false}
          />
        </div>
      )}
    </>
  );
};

export default ShopAllVendorsDetailContract;
