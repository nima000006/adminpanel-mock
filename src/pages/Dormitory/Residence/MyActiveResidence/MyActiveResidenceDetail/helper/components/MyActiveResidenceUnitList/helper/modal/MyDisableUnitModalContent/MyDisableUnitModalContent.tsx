import { Col, Form, Row } from "antd";

import { CustomSelect } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetBasicInfoDeactivationReasonsQuery } from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { MyDisableUnitModalContentProps } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceUnitList/helper/modal/MyDisableUnitModalContent/@types/@myDisableUnitModalContentTypes";

const MyDisableUnitModalContent = ({
  disableUnit,
  data,
  form,
}: MyDisableUnitModalContentProps) => {
  const { params: url } = useQueryParams();

  //? ================================  Api Calls ================================
  // reason
  const [
    getDeactivationReasons,
    { data: deactivationReasonsData, isFetching: isDeactivationReasonsLoading },
  ] = useLazyGetBasicInfoDeactivationReasonsQuery();

  //* ================================ Util Functions ================================
  const deactivationReasonsHandler = () => {
    getDeactivationReasons({
      pageNumber: url?.page ? Number(url.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url.pageSize) : 8,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="mt-5! flex flex-col gap-5">
      {disableUnit ? (
        <CustomAlert
          type="warning"
          title="توجه!"
          description="با غیرفعال کردن این واحد اقامتی، تمامی تخت‌های آن نیز غیرفعال شده و از برنامه‌های پذیرش مرتبط حذف می‌شوند."
          showIcon
        />
      ) : (
        <CustomAlert
          type="warning"
          title="غیر فعالسازی امکان پذیر نمی‌باشد."
          description="به‌دلیل وجود حداقل یک ساکن و یا درخواست باز در این واحد اقامتی، در حال حاضر امکان غیرفعال‌سازی آن وجود ندارد. این عملیات تنها زمانی امکان‌پذیر است که واحد اقامتی هیچ ساکن و یا درخواست بازی نداشته باشد."
          showIcon
        />
      )}

      <div>
        <CustomDivider
          text="واحد اقامتی انتخاب شده"
          extraContent={
            <CustomTag>
              {dataPlaceHolder({ data: data?.roomType?.title ?? undefined })}
            </CustomTag>
          }
        />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            md={12}
            xl={12}
            lg={12}
            label="کد واحد اقامتی"
            value={dataPlaceHolder({
              data: data?.roomNumber ?? undefined,
            })}
          />
          <SingleVerticalWithCol
            md={12}
            xl={12}
            lg={12}
            label="عنوان واحد اقامتی"
            value={dataPlaceHolder({
              data: data?.title ?? undefined,
            })}
          />
        </Row>
      </div>
      {disableUnit ? (
        <Form form={form} className="flex flex-col gap-5">
          <Row>
            <Col span={24}>
              <CustomSelect
                name="reason"
                label="دلیل غیر فعالسازی"
                placeholder="انتخاب کنید"
                options={deactivationReasonsData?.content?.map((item) => ({
                  id: item.uuid,
                  title: item.title,
                }))}
                loading={isDeactivationReasonsLoading}
                rules={[REQUIRED_RULE]}
                onClick={deactivationReasonsHandler}
                form={form}
              />
            </Col>
          </Row>
        </Form>
      ) : null}
    </div>
  );
};
export default MyDisableUnitModalContent;
