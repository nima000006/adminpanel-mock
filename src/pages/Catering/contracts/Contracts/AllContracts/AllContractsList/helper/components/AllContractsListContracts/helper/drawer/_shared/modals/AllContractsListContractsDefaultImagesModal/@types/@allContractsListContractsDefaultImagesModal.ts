export type AllContractsListContractsDefaultImageOption = {
  key: string;
  title: string;
  imageName: string;
  imageUrl: string;
};

export type AllContractsListContractsDefaultImagesModalFormType = {
  defaultImagesSearch?: string;
};

export type AllContractsListContractsDefaultImagesModalProps = {
  open: boolean;
  productBaseId?: number;
  onCancel: () => void;
  onConfirm: (image: AllContractsListContractsDefaultImageOption) => void;
};
