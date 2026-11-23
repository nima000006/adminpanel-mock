export type UserOption = {
  id: string;
  title: string;
  value: string;
};

export type UserSelectProps = {
  options?: UserOption[];
  loading?: boolean;
  onSearch?: (value: string) => void;
};
