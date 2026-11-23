export type MyContractsListContractsDefaultImageOption = {
  key: string;
  title: string;
  imageName: string;
  imageUrl: string;
};

export type MyContractsListContractsDefaultImagesModalFormType = {
  defaultImagesSearch?: string;
};

export type MyContractsListContractsDefaultImagesModalProps = {
  open: boolean;
  productBaseId?: number;
  onCancel: () => void;
  onConfirm: (image: MyContractsListContractsDefaultImageOption) => void;
};
