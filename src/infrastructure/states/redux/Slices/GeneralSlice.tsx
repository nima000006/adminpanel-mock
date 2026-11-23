import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { BreadcrumbItems } from "@infra/models/general.model";

interface TitleState {
  isTitleUnique: boolean;
  title: string | null;
  breadcrumbItems?: BreadcrumbItems;
}

const initialState: TitleState = {
  isTitleUnique: false,
  title: "",
  breadcrumbItems: undefined,
};

const GeneralSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setTitle: (
      state,
      action: PayloadAction<{
        text?: string;
        breadcrumbItems?: BreadcrumbItems;
      }>
    ) => {
      state.isTitleUnique = true;
      state.title = action?.payload?.text || null;
      // Redux Toolkit's Immer integration conflicts with Ant Design's readonly Menu types in BreadcrumbItems.
      // Using any cast to bypass this known TypeScript/Immer limitation.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state.breadcrumbItems = action?.payload?.breadcrumbItems as any;
    },
  },
});

export default GeneralSlice.reducer;
export const { setTitle } = GeneralSlice.actions;
