//! LAYOUT
export type CreateApartmentModalProps = {
  createModalData: {
    isOpen: boolean;
  };
  setCreateModalData: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
    }>
  >;
};

export type NewApartmentTableData = {
  key: number;
  id: number;
  apartmentNumber: number;
  floorNumber: number;
};

//! APIs
