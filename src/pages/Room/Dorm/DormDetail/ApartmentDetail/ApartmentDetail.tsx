import React, { useState } from "react";

import { Tabs } from "antd";
import { AiOutlinePlusSquare } from "react-icons/ai";

import { FONTSIZE_17 } from "@infra/VARS/globalStyles/globalStyles";

import CustomCard from "../../../../../components/CustomCard/CustomCard";
import CreateFloorModal from "../../../../../components/Modals/Dorm/CreateFloorModal/CreateFloorModal";
import CreateNewRoomModal from "../../../../../components/Modals/Dorm/CreateNewRoomModal/CreateNewRoomModal";
import { BLUE_02 } from "../../../../../infrastructure/VARS/globalColors/globalColors";
import "./_apartmentDetail.scss";

const ApartmentDetail = () => {
  // const searchInput = useRef<InputRef | null>(null);
  // const [searchText, setSearchText] = useState("");
  // const [searchedColumn, setSearchedColumn] = useState("");
  const [createFloorModal, setCreateFloorModal] = useState({ isOpen: false });
  const [newRoomModal, setNewRoomModal] = useState({ isOpen: false });

  // const navigate = useNavigate();
  const onFloorEdit = (
    _: React.MouseEvent | React.KeyboardEvent | string,
    action: "add" | "remove"
  ) => {
    if (action === "add") {
      //! open modal
      setCreateFloorModal({ isOpen: true });
    }
  };
  // const onClickRoomDetailHandler = (id: string) => {
  //   navigate(`${DORM_ALLOCATION_PAGE_ROUTE}?id=${id}`);
  // };
  // const onClickRoomAssignHandler = (id: string) => {
  //   navigate(`${DORM_ALLOCATION_PAGE_ROUTE}?id=${id}`);
  // };
  // const dataSource = [
  //   {
  //     id: 1,
  //     key: 1,
  //     roomNumber: 140,
  //     name: "اتاق 2",
  //     type: "مستقل",
  //     grade: 1,
  //     capacity: 600,
  //     remainingCapacity: "53",
  //     basePrice: "899,000",
  //     timeType: "4011790338",
  //   },
  //   {
  //     id: 2,
  //     key: 2,
  //     roomNumber: 141,
  //     name: "اتاق 3",
  //     type: "مستقل",
  //     grade: 2,
  //     capacity: 600,
  //     remainingCapacity: "202",
  //     basePrice: "899,000",
  //     timeType: "4011790338",
  //   },
  //   {
  //     id: 3,
  //     key: 3,
  //     roomNumber: 142,
  //     name: "اتاق 4",
  //     type: "زیر مجموعه‌ی 146",
  //     grade: 3,
  //     capacity: 600,
  //     remainingCapacity: "550",
  //     basePrice: "899,000",
  //     timeType: "4011790338",
  //   },
  // ];
  // const floorItems = [
  //   {
  //     label: "طبقه 1",
  //     children: (
  //       <>
  //         <Button
  //           type="default"
  //           className="new-room-btn"
  //           onClick={() => setNewRoomModal({ isOpen: true })}
  //         >
  //           اتاق جدید
  //           <AiOutlinePlusSquare  style={{ fontSize: "1rem" }} />
  //         </Button>
  //         <CustomTable
  //           columns={DormDetailFloorModel({
  //             searchInput,
  //             searchedColumn,
  //             setSearchedColumn,
  //             searchText,
  //             setSearchText,
  //             onClickRoomAssignHandler: onClickRoomAssignHandler,
  //             onClickRoomDetailHandler: onClickRoomDetailHandler,
  //           })}
  //           dataSource={dataSource}
  //           rowSelection={{
  //             type: "checkbox",
  //             //   ...rowSelection,
  //           }}
  //           pagination={paginationConfig}
  //           {...TABLE_PROPS(dataSource?.length)}
  //         />
  //       </>
  //     ),
  //     key: "1234",
  //   },
  //   { label: "طبقه 2", children: "asdas", key: "1232" },
  //   { label: "طبقه 3", children: "asd123", key: "3123" },
  //   { label: "طبقه 4", children: "4123", key: "4123" },
  //   { label: "طبقه 5", children: "512312", key: "5123" },
  // ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <CreateFloorModal
        createFloorModal={createFloorModal}
        setCreateFloorModal={setCreateFloorModal}
      />
      <CreateNewRoomModal newRoomModal={newRoomModal} setNewRoomModal={setNewRoomModal} />
      <div className="apartment-detail-container">
        <div className="floor-stat-container">
          <CustomCard>
            <div className="floor-stat-renderer-container">
              <div className="total-floor-count">
                <span>تعداد کل اتاقها</span>
                <span>48</span>
              </div>
              <div className="total-floor-cap">
                <span>ظرفیت کل خوابگاه‌</span>
                <span>589</span>
              </div>
              <div className="floor-remaining">
                <span>ظرفیت باقیمانده</span>
                <span>256</span>
              </div>
              <div className="floor-with-cap">
                <span>اتاق‌های دارای ظرفیت</span>
                <span>256</span>
              </div>
            </div>
          </CustomCard>
        </div>
        <div className="floors-list-container">
          <Tabs
            type="editable-card"
            //   onChange={onFloorChange}
            // activeKey={"1"}
            onEdit={onFloorEdit}
            // items={floorItems}
            items={[]}
            className="floors-tabs-container"
            addIcon={
              <div className="add-apartment-btn">
                <span className="add-apartment-btn-label">ایجاد طبقه</span>
                <span>
                  <AiOutlinePlusSquare
                    style={{ color: BLUE_02, fontSize: FONTSIZE_17 }}
                  />
                </span>
              </div>
            }
          />
        </div>
      </div>
    </>
  );
};

export default ApartmentDetail;
