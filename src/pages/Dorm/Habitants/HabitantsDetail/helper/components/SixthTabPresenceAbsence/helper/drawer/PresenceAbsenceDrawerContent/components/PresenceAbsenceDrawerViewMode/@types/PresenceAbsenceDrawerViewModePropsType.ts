export type PresenceAbsenceDrawerViewModePropsType = {
  onClose: () => void;
  data: {
    date?: string;
    AssociationPresenceAbsence?: { title?: string };
    description?: string;
  };
  cellDate?: string;
  drawerLoading: boolean;
};
