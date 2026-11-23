export type ViewOrganizationPositionInfoProps = {
  closeDrawerHandler: () => void;
};

export type ModifyOrganizationPositionInfoDrawerContentProps = {
  closeDrawerHandler: () => void;
  isModifyDrawerOpen: {
    isOpen: boolean;
    id: number;
  };
};
