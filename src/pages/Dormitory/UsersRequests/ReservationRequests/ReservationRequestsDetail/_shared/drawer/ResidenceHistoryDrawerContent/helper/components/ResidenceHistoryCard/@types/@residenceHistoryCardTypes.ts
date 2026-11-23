export type ResidenceHistoryScheduleType = "term" | "monthly" | "daily";

export type ResidenceHistoryInstallment = {
  id: number;
  status: any;
};

export type ResidenceHistoryLocation = {
  floor: string;
  building: string;
  room: string;
  bed: string;
};

export type ResidenceHistoryItem = {
  id: number;
  title: string;
  scheduleType: ResidenceHistoryScheduleType;
  dateRange: string;
  entryDate: string;
  endDate: string;
  location?: ResidenceHistoryLocation;
  installments?: ResidenceHistoryInstallment[];
  defaultExpanded?: boolean;
};

export type ResidenceHistoryCardProps = {
  item: ResidenceHistoryItem;
};
