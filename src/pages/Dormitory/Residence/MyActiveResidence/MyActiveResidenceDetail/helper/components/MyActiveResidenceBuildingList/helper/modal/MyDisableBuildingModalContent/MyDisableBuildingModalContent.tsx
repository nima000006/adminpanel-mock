import { Col, Form, Row } from "antd";

import { CustomSelect } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetBasicInfoDeactivationReasonsQuery } from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { MyDisableBuildingModalContentProps } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBuildingList/helper/modal/MyDisableBuildingModalContent/@types/@myDisableBuildingModalContentTypes";

const MyDisableBuildingModalContent = ({
  disableBuilding,
  data,
  form,
}: MyDisableBuildingModalContentProps) => {
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
      {disableBuilding ? (
        <CustomAlert
          type="warning"
          title="توجه!"
          description="با غیرفعال کردن این ساختمان، تمامی طبقات، واحدهای اقامتی و تخت‌های آن نیز غیرفعال شده و از برنامه‌های پذیرش مرتبط حذف می‌شوند."
          showIcon
        />
      ) : (
        <CustomAlert
          type="warning"
          title="غیر فعالسازی امکان پذیر نمی‌باشد."
          description="به‌دلیل وجود حداقل یک ساکن یا درخواست باز در یکی از واحدهای اقامتی این ساختمان، در حال حاضر امکان غیرفعال‌سازی آن وجود ندارد. این ساختمان زمانی قابل غیرفعال‌سازی خواهد بود که تمامی واحدهای اقامتی آن بدون ساکن و یا درخواست باز نداشته باشند."
          showIcon
        />
      )}

      <div>
        <CustomDivider text="ساختمان انتخاب شده" />
        <SingleVerticalWithCol
          md={12}
          xl={12}
          lg={12}
          label="عنوان ساختمان"
          value={dataPlaceHolder({
            data: data?.title ?? undefined,
          })}
        />
      </div>
      {disableBuilding ? (
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
export default MyDisableBuildingModalContent;
