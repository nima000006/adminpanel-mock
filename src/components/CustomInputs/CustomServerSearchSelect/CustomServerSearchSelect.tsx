import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
  type UIEvent,
} from "react";

import { GetRef, Select, Spin } from "antd";

import { debounce } from "../../../infrastructure/helpers/utils";
import CustomButton from "../CustomButton/CustomButton";
import CustomSelect from "../CustomSelect/CustomSelect";
import {
  CustomServerSearchSelectOption,
  CustomServerSearchSelectProps,
} from "./@types/@customServerSearchSelect";
import "./_customServerSearchSelect.scss";

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_DEBOUNCE_TIMEOUT = 300;
const SCROLL_THRESHOLD_PX = 24;
const POPUP_LIST_HOLDER_SELECTOR = '[class*="-dropdown-list-holder"]';

type LoadError = "initial" | "more" | null;

const mergeOptionsById = (
  previous: CustomServerSearchSelectOption[],
  next: CustomServerSearchSelectOption[]
): CustomServerSearchSelectOption[] => {
  const merged = new Map<string, CustomServerSearchSelectOption>();

  [...previous, ...next].forEach((option) => {
    if (option?.id == null) return;
    merged.set(String(option.id), option);
  });

  return Array.from(merged.values());
};

const CustomServerSearchSelect = forwardRef<
  GetRef<typeof Select>,
  CustomServerSearchSelectProps
>(
  (
    {
      fetchOptions,
      debounceTimeout = DEFAULT_DEBOUNCE_TIMEOUT,
      pageSize = DEFAULT_PAGE_SIZE,
      initialOptions,
      emptyText = "گزینه‌ای یافت نشد",
      errorText = "خطا در دریافت اطلاعات",
      notFoundContent,
      onOpenChange,
      onDropdownVisibleChange,
      onSelect,
      dropdownRender,
      popupRender,
      labelRender,
      mode,
      ...customSelectProps
    },
    ref
  ) => {
    const [options, setOptions] = useState<CustomServerSearchSelectOption[]>([]);
    const [fetching, setFetching] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadError, setLoadError] = useState<LoadError>(null);
    // Controlled so Ant Design cannot clear it on blur / outside click.
    const [searchText, setSearchText] = useState("");

    const isMountedRef = useRef(true);
    const fetchOptionsRef = useRef(fetchOptions);
    // Responses from an older generation (previous search / previous fetchOptions / unmount) are dropped.
    const generationRef = useRef(0);
    const searchRef = useRef("");
    const pageNoRef = useRef(0);
    const hasMoreRef = useRef(true);
    const loadingMoreRef = useRef(false);
    const fetchingRef = useRef(false);
    const openRef = useRef(false);
    const needsReloadRef = useRef(false);
    const optionsRef = useRef<CustomServerSearchSelectOption[]>([]);
    // Keeps labels of every option seen, so selected values outside the current page still show a title.
    const labelCacheRef = useRef(new Map<string, string>());
    const popupRef = useRef<HTMLDivElement>(null);

    const initialLabelMap = useMemo(
      () =>
        new Map(
          (initialOptions ?? [])
            .filter((option) => option?.id != null)
            .map((option) => [String(option.id), option.title])
        ),
      [initialOptions]
    );

    const resetState = useCallback(() => {
      generationRef.current += 1;
      pageNoRef.current = 0;
      hasMoreRef.current = true;
      loadingMoreRef.current = false;
      fetchingRef.current = false;
      optionsRef.current = [];
      setOptions([]);
      setLoadingMore(false);
      setFetching(false);
      setLoadError(null);
    }, []);

    const loadPage = useCallback(
      async (nextPageNo: number, append: boolean) => {
        if (append) {
          if (loadingMoreRef.current || fetchingRef.current || !hasMoreRef.current) {
            return;
          }
          loadingMoreRef.current = true;
          setLoadingMore(true);
        } else {
          generationRef.current += 1;
          fetchingRef.current = true;
          setFetching(true);
        }

        setLoadError(null);

        const generation = generationRef.current;
        const search = searchRef.current;

        try {
          const result = await fetchOptionsRef.current({
            search,
            pageNo: nextPageNo,
            pageSize,
          });

          if (generation !== generationRef.current) return;

          const nextOptions = Array.isArray(result.options) ? result.options : [];
          const total = Number.isFinite(result.total) ? result.total : 0;
          const mergedOptions = append
            ? mergeOptionsById(optionsRef.current, nextOptions)
            : nextOptions;

          nextOptions.forEach((option) => {
            if (option?.id == null) return;
            labelCacheRef.current.set(String(option.id), option.title);
          });

          pageNoRef.current = nextPageNo;
          hasMoreRef.current =
            result.hasMore ??
            (nextOptions.length >= pageSize && mergedOptions.length < total);
          optionsRef.current = mergedOptions;
          setOptions(mergedOptions);
        } catch {
          if (generation !== generationRef.current) return;

          // Stop auto-retrying on every scroll event; the user retries explicitly.
          hasMoreRef.current = false;
          setLoadError(append ? "more" : "initial");

          if (!append) {
            optionsRef.current = [];
            setOptions([]);
          }
        } finally {
          if (generation === generationRef.current) {
            if (append) {
              loadingMoreRef.current = false;
              setLoadingMore(false);
            } else {
              fetchingRef.current = false;
              setFetching(false);
            }
          }
        }
      },
      [pageSize]
    );

    useEffect(() => {
      isMountedRef.current = true;

      return () => {
        isMountedRef.current = false;
        generationRef.current += 1;
        openRef.current = false;
      };
    }, []);

    useEffect(() => {
      if (fetchOptionsRef.current === fetchOptions) return;

      fetchOptionsRef.current = fetchOptions;
      needsReloadRef.current = false;
      resetState();

      if (openRef.current) {
        void loadPage(0, false);
      }
    }, [fetchOptions, loadPage, resetState]);

    // When a page does not fill the popup there is no scrollbar, so scroll can never trigger load-more.
    useEffect(() => {
      if (!openRef.current || fetching || loadingMore || loadError) return;
      if (!hasMoreRef.current || options.length === 0) return;

      const frameId = requestAnimationFrame(() => {
        const holder = popupRef.current?.querySelector<HTMLElement>(
          POPUP_LIST_HOLDER_SELECTOR
        );

        if (holder && holder.scrollHeight <= holder.clientHeight) {
          void loadPage(pageNoRef.current + 1, true);
        }
      });

      return () => cancelAnimationFrame(frameId);
    }, [options, fetching, loadingMore, loadError, loadPage]);

    const debounceFetcher = useMemo(() => {
      const handleSearch = (value: string) => {
        if (!isMountedRef.current) return;

        const search = value ?? "";

        // Same search re-fired by Ant Design after options update — do not reset list.
        if (search === searchRef.current) return;

        searchRef.current = search;
        resetState();
        void loadPage(0, false);
      };

      return debounce(handleSearch, debounceTimeout);
    }, [debounceTimeout, loadPage, resetState]);

    const handleSearchChange = (value: string) => {
      setSearchText(value);
      debounceFetcher(value);
    };

    const handlePopupScroll = (event: UIEvent<HTMLDivElement>) => {
      const target = event.target as HTMLDivElement;
      const reachedBottom =
        target.scrollTop + target.offsetHeight >=
        target.scrollHeight - SCROLL_THRESHOLD_PX;

      if (!reachedBottom) return;

      void loadPage(pageNoRef.current + 1, true);
    };

    const handleOpenChange = (open: boolean) => {
      openRef.current = open;

      if (open) {
        if (needsReloadRef.current || loadError) {
          needsReloadRef.current = false;
          resetState();
          void loadPage(0, false);
        } else if (optionsRef.current.length === 0 && !fetchingRef.current) {
          void loadPage(0, false);
        }
      }

      onOpenChange?.(open);
      onDropdownVisibleChange?.(open);
    };

    const handleSelect: CustomServerSearchSelectProps["onSelect"] = (value, option) => {
      // Single mode: a leftover search text would hide the selected label, so clear it
      // and load the unfiltered list on the next open. Multiple mode keeps the search
      // so several items can be picked from the same results.
      const isMultiple = mode === "multiple" || mode === "tags";

      if (!isMultiple && searchRef.current) {
        setSearchText("");
        searchRef.current = "";
        needsReloadRef.current = true;
      }

      onSelect?.(value, option);
    };

    const handleRetry = () => {
      if (loadError === "more") {
        hasMoreRef.current = true;
        void loadPage(pageNoRef.current + 1, true);
        return;
      }

      resetState();
      void loadPage(0, false);
    };

    const handleSelectedLabelRender: CustomServerSearchSelectProps["labelRender"] = (
      props
    ) => {
      const key = String(props.value);
      const resolvedLabel =
        labelCacheRef.current.get(key) ?? initialLabelMap.get(key) ?? props.label;

      return labelRender
        ? labelRender({ ...props, label: resolvedLabel })
        : resolvedLabel;
    };

    const retryButton = (
      <CustomButton
        type="link"
        size="small"
        // Keep the popup open; a mousedown inside it would otherwise blur the select.
        onMouseDown={(event) => event.preventDefault()}
        onClick={handleRetry}
      >
        تلاش مجدد
      </CustomButton>
    );

    const resolvedNotFoundContent = (() => {
      if (notFoundContent !== undefined) return notFoundContent;
      if (fetching) return <Spin size="small" />;
      if (loadError === "initial") {
        return (
          <div className="custom-server-search-select__error" role="alert">
            <span>{errorText}</span>
            {retryButton}
          </div>
        );
      }
      return emptyText;
    })();

    const renderPopup = (menu: ReactElement) => {
      const content = (
        <div ref={popupRef}>
          {menu}
          {loadingMore ? (
            <div className="custom-server-search-select__loading-more">
              <Spin size="small" />
            </div>
          ) : null}
          {loadError === "more" ? (
            <div className="custom-server-search-select__error" role="alert">
              <span>{errorText}</span>
              {retryButton}
            </div>
          ) : null}
        </div>
      );

      if (popupRender) return popupRender(content);
      if (dropdownRender) return dropdownRender(content);
      return content;
    };

    return (
      <CustomSelect
        {...customSelectProps}
        ref={ref}
        mode={mode}
        options={options}
        isLoading={fetching && options.length === 0}
        filterOption={false}
        showSearch={{
          filterOption: false,
          searchValue: searchText,
          autoClearSearchValue: false,
          onSearch: handleSearchChange,
        }}
        onPopupScroll={handlePopupScroll}
        onOpenChange={handleOpenChange}
        onSelect={handleSelect}
        labelRender={handleSelectedLabelRender}
        notFoundContent={resolvedNotFoundContent}
        popupRender={renderPopup}
      />
    );
  }
);

CustomServerSearchSelect.displayName = "CustomServerSearchSelect";

export default CustomServerSearchSelect;
