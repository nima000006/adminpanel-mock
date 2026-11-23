export type AdmissionDetailRegisterInfoProps = {
  registerDate: string | null | undefined;
  registerTime: string | null | undefined;
  creator?: {
    firstName: string;
    lastName: string;
    id: number;
  };
};
