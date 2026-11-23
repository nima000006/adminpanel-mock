import { useEffect } from "react";

import { Row } from "antd";

import { CustomButton } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import {
  useDeleteFaqMutation,
  useLazyGetFaqDetailQuery,
} from "@infra/states/redux/Apis/business/serviceManagementService/serviceManagementService";
import { useFaqManagerContext } from "@pages/Settings/FaqManagement/State/useFaqManagerContext";

type AddToListDrawerContentProps = {
  closeDrawerHandler: () => void;
  id: number;
};

const VisitFaqContent = ({ closeDrawerHandler, id }: AddToListDrawerContentProps) => {
  const { drawerUpdated } = useFaqManagerContext();

  //? ================================  Api Calls ================================
  const [getFaqDetail, { data: faqsData, isLoading: isFaqDataLoading }] =
    useLazyGetFaqDetailQuery();

  const [deleteFaq, { isLoading: isDeleteFaqLoading }] = useDeleteFaqMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id > 0) {
      getFaqDetail(id);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  // drawerCloseHandler
  const drawerCloseHandler = () => {
    closeDrawerHandler();
  };

  const deleteFaqHandler = () => {
    if (id > 0) {
      deleteFaq(id)
        .unwrap()
        .then(() => {
          drawerUpdated();
          drawerCloseHandler();
        });
    }
  };

  return (
    <Div loading={isFaqDataLoading}>
      {/* ---------------------------------- Drawer Header ---------------------------------- */}
      <CustomDrawerHeader
        hasLeftSide
        leftSideContent={
          <CustomButton
            danger
            onClick={deleteFaqHandler}
            type="primary"
            loading={isDeleteFaqLoading}
          >
            حذف سوال
          </CustomButton>
        }
        title="مشاهده سوال"
        closeDrawerHandler={drawerCloseHandler}
      />

      <CustomDivider text="اطلاعات اولیه" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          label="شماره سوال"
          value={faqsData?.orderId?.toString()}
          span={24}
        />
        <SingleVerticalWithCol
          label="عنوان فارسی سوال"
          value={faqsData?.faQuestion}
          span={12}
        />
        <SingleVerticalWithCol
          label="عنوان فارسی جواب"
          value={faqsData?.faAnswer}
          span={12}
        />
        <SingleVerticalWithCol
          label="عنوان انگلیسی سوال"
          value={faqsData?.enQuestion}
          span={12}
        />
        <SingleVerticalWithCol
          label="عنوان انگلیسی جواب"
          value={faqsData?.enAnswer}
          span={12}
        />
        <SingleVerticalWithCol
          label="عنوان عربی سوال"
          value={faqsData?.arQuestion}
          span={12}
        />
        <SingleVerticalWithCol
          label="عنوان عربی جواب"
          value={faqsData?.arAnswer}
          span={12}
        />
      </Row>
    </Div>
  );
};

export default VisitFaqContent;
