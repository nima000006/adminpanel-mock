import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { BeneficiaryBannerItem } from "@pages/Contract/ContractsTemplateList/ContractsTemplateDetail/@types/@contractsTemplateDetail";

const TemplateServiceTableListTableModel = ({
  switchHandler,
  deleteHandler,
  isArchive,
}: {
  switchHandler: (id: number, checked: boolean) => void;
  deleteHandler: (id: number) => void;
  isArchive: boolean | undefined;
}): CustomColumnType<BeneficiaryBannerItem>[] => {
  return [
    {
      title: "خدمت",
      dataIndex: "categoryTitle",
      key: "categoryTitle",
      width: 400,
      render: (value: string) => dataPlaceHolder({ data: value.toString() }),
    },
    {
      title: "فروشنده",
      dataIndex: "supplierName", // به درخواست اقای جماعتی این کلید برای فروشنده اختصاص داده شد.
      key: "supplierName",
      width: 100,
      render: (value: string) => {
        return dataPlaceHolder({ data: value });
      },
    },
    // به درخواست اقای جماعتی حذف شده است
    // {
    //   title: "تامین کننده",
    //   dataIndex: "",
    //   key: "",
    //   width: 100,
    //   render: () => {
    //     return emptyString;
    //   },
    // },
    {
      title: "ذینفعان",
      dataIndex: "ruleBeneficiaries",
      key: "ruleBeneficiaries",
      width: 100,
      render: (value: number) => dataPlaceHolder({ data: value.toString() }),
    },
    {
      title: "ارزش افزوده",
      dataIndex: "hasTax",
      key: "hasTax",
      width: 100,
      render: (value: boolean) => {
        return value ? "دارد" : "ندارد";
      },
    },
    {
      title: "",
      dataIndex: "ruleBeneficiaryStatus",
      key: "ruleBeneficiaryStatus",
      width: 100,
      render: (_: boolean, record: BeneficiaryBannerItem) => {
        const statusId = record?.ruleBeneficiaryStatus?.id;

        // شرط ۱: اگر وضعیت 0 هست، دکمه‌ها نشون داده میشن
        if (!isArchive) {
          if (statusId === 0) {
            return (
              <div className="flex gap-2">
                <CustomButton type="link">
                  <Link
                    to={{
                      pathname: "",
                      search: makeSearchParams({ id: record?.categoryId }),
                    }}
                  >
                    تکمیل فرآیند
                  </Link>
                </CustomButton>
                <CustomButton
                  type="link"
                  danger={true}
                  onClick={() => deleteHandler(record?.categoryId)}
                >
                  حذف
                </CustomButton>
              </div>
            );
          }

          // شرط ۲: اگر وضعیت 1 هست، سوئیچ فعال نشون داده میشه
          if (statusId === 1) {
            return (
              <CustomSwitch
                checked={true}
                checkedChildren="فعال"
                unCheckedChildren="غیرفعال"
                valuePropName="ruleBeneficiaryStatus"
                onChange={(checked: boolean) =>
                  switchHandler(record?.categoryId, checked)
                }
              />
            );
          }

          // شرط ۳: اگر وضعیت 2 هست، سوئیچ غیرفعال نشون داده بشه
          if (statusId === 2) {
            return (
              <CustomSwitch
                checked={false}
                checkedChildren="فعال"
                unCheckedChildren="غیرفعال"
                valuePropName="ruleBeneficiaryStatus"
                onChange={(checked: boolean) =>
                  switchHandler(record?.categoryId, checked)
                }
                disabled={isArchive}
              />
            );
          }
        } else {
          return (
            <CustomSwitch
              checked={false}
              checkedChildren="فعال"
              unCheckedChildren="غیرفعال"
              valuePropName="ruleBeneficiaryStatus"
              onChange={(checked: boolean) => switchHandler(record?.categoryId, checked)}
              disabled={isArchive}
            />
          );
        }
      },
    },
  ];
};
export default TemplateServiceTableListTableModel;
