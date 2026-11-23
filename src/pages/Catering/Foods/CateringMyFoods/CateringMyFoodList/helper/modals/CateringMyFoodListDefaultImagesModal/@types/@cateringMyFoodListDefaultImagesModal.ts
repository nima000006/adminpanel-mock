export type CateringMyFoodListDefaultImageOption = {
  key: string;
  title: string;
  imageName: string;
  imageUrl: string;
};

export type CateringMyFoodListDefaultImagesModalFormType = {
  defaultImagesSearch?: string;
};

export type CateringMyFoodListDefaultImagesModalProps = {
  open: boolean;
  productBaseId?: number;
  onCancel: () => void;
  onConfirm: (image: CateringMyFoodListDefaultImageOption) => void;
};
