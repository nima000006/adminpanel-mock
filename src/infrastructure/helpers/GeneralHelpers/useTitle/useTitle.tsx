import { useEffect, useRef } from "react";

import isEqual from "react-fast-compare";
import { useDispatch } from "react-redux";

import { BreadcrumbItems } from "@infra/models/general.model";
import { setTitle } from "@infra/states/redux/Slices/GeneralSlice";

interface TitleOptions {
  text?: string;
  breadcrumbItems?: BreadcrumbItems;
}

const useTitle = ({ text = "پنل", breadcrumbItems }: TitleOptions) => {
  const dispatch = useDispatch();

  const previous = useRef<TitleOptions | undefined>(undefined);

  useEffect(() => {
    const hasChanged =
      !previous.current ||
      previous.current.text !== text ||
      !isEqual(previous.current.breadcrumbItems, breadcrumbItems);

    if (!hasChanged) {
      return;
    }

    const current = {
      text,
      breadcrumbItems,
    };

    previous.current = current;

    dispatch(setTitle(current));
  }, [dispatch, text, breadcrumbItems]);
};

export default useTitle;
