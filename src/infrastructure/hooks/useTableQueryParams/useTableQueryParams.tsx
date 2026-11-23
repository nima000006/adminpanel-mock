import { useSearchParams, useNavigate } from "react-router";

const reversedSortOrder = (order?: string) => {
  return order === "asc" ? "desc" : "asc";
};

export function useTableQueryParams({
  pageName,
  pageSizeName,
}: {
  pageName: string;
  pageSizeName: string;
}) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const getParam = (key: string) => {
    return searchParams.get(key) ?? "";
  };

  const setParams = (params: Record<string, string | undefined>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (newParams?.get(pageName)) {
      newParams.delete(pageName);
    }
    if (newParams?.get(pageSizeName)) {
      newParams.delete(pageSizeName);
    }

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    navigate({ search: newParams.toString() }, { replace: true });
  };

  const getSorting = (): { sortBy: string; sortOrder: string | undefined }[] => {
    const raw = searchParams.get("sortings");
    try {
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const setSorting = (
    columnKey: string,
    sortOrder: string | undefined,
    isReverseOrder?: boolean,
    isSingle = true // 👈 default
  ) => {
    let updated: { sortBy: string; sortOrder: string | undefined }[] = [];

    if (isSingle) {
      // 👇 فقط همون یکی بمونه (replace کامل)
      if (sortOrder) {
        updated = [
          {
            sortBy: columnKey,
            sortOrder: isReverseOrder ? reversedSortOrder(sortOrder) : sortOrder,
          },
        ];
      } else {
        updated = []; // یعنی کل sorting پاک شه
      }
    } else {
      // 👇 رفتار فعلی (multi sort)
      const currentSortings = getSorting();

      updated = currentSortings.filter((s) => s.sortBy !== columnKey);

      if (sortOrder) {
        updated.push({
          sortBy: columnKey,
          sortOrder: isReverseOrder ? reversedSortOrder(sortOrder) : sortOrder,
        });
      }
    }

    const newParams = new URLSearchParams(searchParams.toString());

    if (newParams.get(pageName)) newParams.delete(pageName);
    if (newParams.get(pageSizeName)) newParams.delete(pageSizeName);

    if (updated.length > 0) {
      newParams.set("sortings", JSON.stringify(updated));
    } else {
      newParams.delete("sortings");
    }

    navigate({ search: newParams.toString() }, { replace: true });
  };

  return { getParam, setParams, getSorting, setSorting };
}
