import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import useQueryParams from "@infra/hooks/useQueryParams";

import {
  FormDataValue,
  UseAdvanceFilterOptions,
  UseAdvanceFilterReturn,
} from "../@types/@advanceFilterModalV2";
import {
  getAllFilterParamKeys,
  getPrimaryFilterKeys,
  syncFormFromUrl,
  formDataToUrlParams,
} from "../helpers/urlSync";

/**
 * Hook that manages the entire advance filter lifecycle:
 * - Modal open/close state
 * - Badge count (auto-computed from URL params)
 * - Form ↔ URL synchronization
 * - Filter submit & reset
 * - Provides `filterDeps` array for useEffect dependency spreading
 *
 * @example
 * ```tsx
 * const [form] = Form.useForm();
 * const { filterItemsList, fetchInitialData } = useMyFoodAdvanceFilter(form);
 *
 * const advanceFilter = useAdvanceFilter({
 *   filterItems: filterItemsList,
 *   form,
 *   onOpen: fetchInitialData,
 * });
 *
 * // Listen for filter changes
 * useEffect(() => {
 *   getData();
 * }, [params?.pageNo, params?.pageSize, ...advanceFilter.filterDeps.map(key => params?.[key])]);
 * ```
 */
export function useAdvanceFilter<T extends Record<string, any>>({
  filterItems,
  form,
  mode = "url",
  onOpen,
  onSubmit,
  onReset,
}: UseAdvanceFilterOptions<T>): UseAdvanceFilterReturn<T> {
  const [isOpen, setIsOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(0);
  const { params, setSearchParams } = useQueryParams();

  // ─── Computed Keys ───────────────────────────────────────────────────────

  /** All URL param keys affected by these filters (for cleanup) */
  const allFilterParamKeys = useMemo(
    () => getAllFilterParamKeys(filterItems),
    [filterItems]
  );

  /** One primary key per filter (for useEffect deps) */
  const filterDeps = useMemo(() => getPrimaryFilterKeys(filterItems), [filterItems]);

  // ─── Auto Badge Count ──────────────────────────────────────────────────

  useEffect(() => {
    if (mode !== "url") return;

    let count = 0;
    filterItems.forEach((item) => {
      const key = String(item.name);
      let hasValue = false;

      switch (item.type) {
        case "select":
          hasValue = !!params[`${key}Id`];
          break;
        case "range":
          hasValue = !!params[`${key}DateStart`];
          break;
        case "slider":
          hasValue = !!params[`${key}MinAmount`];
          break;
        default:
          hasValue = !!params[`${key}Title`];
      }
      if (hasValue) count++;
    });

    setBadgeCount(count);
  }, [params, filterItems, mode]);

  // ─── Sync Form from URL on Modal Open ──────────────────────────────────

  const hasSynced = useRef(false);

  useEffect(() => {
    if (!isOpen || mode !== "url") {
      hasSynced.current = false;
      return;
    }
    if (hasSynced.current) return;
    syncFormFromUrl(form, params, filterItems);
    hasSynced.current = true;
  }, [isOpen, mode, form, params, filterItems]);

  // ─── Actions ───────────────────────────────────────────────────────────

  const openModal = useCallback(() => {
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    form.resetFields();
  }, [form]);

  const submitFilters = useCallback(
    (formData: Record<string, FormDataValue>) => {
      if (mode === "url") {
        const { params: newParams, count } = formDataToUrlParams(formData, filterItems);

        // Start from current URL params, remove all filter-related keys
        const cleanedParams = { ...params };
        allFilterParamKeys.forEach((key) => delete cleanedParams[key]);
        delete cleanedParams.badger;

        // Reset page params (keep pageSize)
        Object.keys(cleanedParams).forEach((key) => {
          const lowerKey = key.toLowerCase();
          if (lowerKey.includes("page") && !lowerKey.includes("pagesize")) {
            delete cleanedParams[key];
          }
        });

        // Remove empty values from newParams
        const filteredNewParams = Object.fromEntries(
          Object.entries(newParams).filter(
            ([_, v]) => v !== undefined && v !== null && v !== ""
          )
        );

        const finalParams = { ...cleanedParams, ...filteredNewParams };
        if (count > 0) {
          finalParams.badger = String(count);
        }

        setSearchParams(finalParams);
        setBadgeCount(count);
      } else {
        // Local mode
        const { count } = formDataToUrlParams(formData, filterItems);
        setBadgeCount(count);
        onSubmit?.(formData, count);
      }

      setIsOpen(false);
    },
    [mode, params, allFilterParamKeys, filterItems, setSearchParams, onSubmit]
  );

  const resetFilters = useCallback(() => {
    form.resetFields();

    if (mode === "url") {
      const cleanedParams = { ...params };
      allFilterParamKeys.forEach((key) => delete cleanedParams[key]);
      delete cleanedParams.badger;

      setSearchParams(
        Object.fromEntries(
          Object.entries(cleanedParams).filter(([_, v]) => v !== undefined && v !== null)
        )
      );
    } else {
      onReset?.();
    }

    setBadgeCount(0);
    setIsOpen(false);
  }, [mode, params, allFilterParamKeys, form, setSearchParams, onReset]);

  return {
    isOpen,
    openModal,
    closeModal,
    form,
    badgeCount,
    filterDeps,
    allFilterParamKeys,
    params,
    setSearchParams,
    submitFilters,
    resetFilters,
  };
}
