import { useEffect } from "react";

import { Modal } from "antd";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import { useStudentListByAdvanceFilterMutation } from "@infra/states/redux/Apis/management/usersList/usersListApi";
import { AllOtherStudentNumberListModalProps } from "@pages/management/Requests/EstelamAmozeshyar/AllEstelamAmozeshyar/AllEstelamAmozeshyarDetail/helper/components/EstelamAmozeshyarDetailInfo/helper/Modals/AllOtherStudentNumberListModal/@types/@allOtherStudentNumberListModal";
import OtherStudentNumberTableModel from "@pages/management/Requests/EstelamAmozeshyar/MyEstelamAmozeshyar/MyEstelamAmozeshyarDetail/helper/components/EstelamAmozeshyarDetailInfo/helper/Modals/OtherStudentNumberListModal/helper/Models/OtherStudentNumber/OtherStudentNumberTableModel";
import { ManagementUserWithStudentInfo } from "@pages/management/StudentList/MyStudentList/@types/@managementMyStudentsListTypes";

const AllOtherStudentNumberListModal = ({
  open,
  close,
  nationalCode,
}: AllOtherStudentNumberListModalProps) => {
  //? ================================  Api Calls ================================
  const [advanceFilter, { data, isLoading: isAdvanceFilterLoading }] =
    useStudentListByAdvanceFilterMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (open) {
      advanceFilter({
        pageNumber: 0,
        pageSize: 100,
        username: nationalCode,
      });
    }
  }, [nationalCode]);

  return (
    <Modal
      title="لیست شماره‌های دانشجویی دیگر"
      centered
      open={open}
      onCancel={close}
      width={700}
      footer={null}
    >
      <CustomTable<ManagementUserWithStudentInfo>
        className="management-student-list-table-container"
        dataSource={data?.content || []}
        columns={OtherStudentNumberTableModel()}
        loading={isAdvanceFilterLoading}
        pagination={paginationConfig}
        rowKey="userStaffId"
      />
    </Modal>
  );
};

export default AllOtherStudentNumberListModal;
