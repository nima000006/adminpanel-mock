export type OrganizationUnitSegmentContentTableModelProps = {
  deleteHandler: (id: number) => void;
  viewHandler: (id: number) => void;
  editHandler: (id: number) => void;
};

export type OrganizationStructureSegmentContentTableModelProps = {
  deleteHandler: (id: number) => void;
  viewHandler: (id: number) => void;
  editHandler: (id: number) => void;
  subSetHandler: (id: number) => void;
};

export type TopChartSegmentContentTableModelProps = {
  viewHandler: (id: number) => void;
  editHandler: (id: number) => void;
  subSetHandler: (id: number) => void;
};
