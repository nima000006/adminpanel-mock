export type CateringAllFoodListDefaultImageOption = {
  key: string;
  title: string;
  imageName: string;
  imageUrl: string;
};

export type CateringAllFoodListDefaultImagesModalFormType = {
  defaultImagesSearch?: string;
};

export type CateringAllFoodListDefaultImagesModalProps = {
  open: boolean;
  productBaseId?: number;
  onCancel: () => void;
  onConfirm: (image: CateringAllFoodListDefaultImageOption) => void;
};
