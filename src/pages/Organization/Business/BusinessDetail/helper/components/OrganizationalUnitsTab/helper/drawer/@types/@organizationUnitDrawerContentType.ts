export type ModifyOrganizationUnitDrawerContentProps = {
  closeDrawerHandler: () => void;
  isModifyDrawerOpen: {
    isOpen: boolean;
    id: number;
  };
};

export type ViewOrganizationUnitDrawerContentProps = {
  closeDrawerHandler: () => void;
};

export type ModifyOrganizationStructureDrawerContentProps = {
  closeDrawerHandler: () => void;
  isModifyDrawerOpen: {
    isOpen: boolean;
    id: number;
  };
  ModifyOrganizationMood: boolean;
};

export type ModifyTopChartDrawerContentProps = {
  closeDrawerHandler: () => void;
  isModifyDrawerOpen: {
    isOpen: boolean;
    id: number;
  };
  ModifyTopChartMood: boolean;
};

export type ViewTopChartDrawerContentProps = {
  closeDrawerHandler: () => void;
};
