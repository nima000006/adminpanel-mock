import { MENU_ITEMS_MOCK } from "@components/Layout/SideBar/helper/mock/menuMockData";

import {
  createMockLoginResponse,
  createMockRefreshResponse,
  createMockSignInFirstResponse,
  createMockSignInSecondResponse,
  MOCK_ADMIN_STAFF_LIST,
  MOCK_AUTH_CREDENTIALS,
  MOCK_USER_INFO,
} from "./mockAuth";
import {
  BRANCH_OPTIONS,
  BUSINESS_OPTIONS,
  CITY_OPTIONS,
  COUNTRY_OPTIONS,
  createMockCollection,
  createMockDetail,
  createMockListRow,
  DEGREE_OPTIONS,
  FIELD_OPTIONS,
  GENDER_OPTIONS,
  ID_TITLE_OPTIONS,
  MARITAL_OPTIONS,
  PROVINCE_OPTIONS,
  RELIGION_OPTIONS,
  SEMESTER_OPTIONS,
  STATUS_OPTIONS,
} from "./referenceMocks";

import type { FetchArgs } from "@reduxjs/toolkit/query";

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

const getUrl = (args: string | FetchArgs): string => {
  if (typeof args === "string") return args;
  return args.url || "";
};

const getMethod = (args: string | FetchArgs): string => {
  if (typeof args === "string") return "GET";
  return (args.method || "GET").toUpperCase();
};

const getBody = (args: string | FetchArgs): Record<string, unknown> | undefined => {
  if (typeof args === "string") return undefined;
  const body = args.body;
  if (body && typeof body === "object" && !(body instanceof FormData)) {
    return body as Record<string, unknown>;
  }
  return undefined;
};

const includesAny = (url: string, needles: string[]): boolean =>
  needles.some((n) => url.toLowerCase().includes(n.toLowerCase()));

const isOptionListUrl = (url: string): boolean =>
  includesAny(url, [
    "/enums/",
    "enum",
    "alldegrees",
    "alldegree",
    "degrees",
    "allfields",
    "fieldofstudy",
    "fields",
    "provinces",
    "cities",
    "countries",
    "citizen",
    "nationalit",
    "religions",
    "marital",
    "gender",
    "branches",
    "getallbranch",
    "allbranches",
    "getbranch",
    "business",
    "semester",
    "status",
    "reasons",
    "reject",
    "category",
    "dropdown",
    "select",
    "options",
    "lookup",
    "basicinformation",
    "basic-info",
    "basicinfo",
  ]);

const resolveOptionList = (url: string): unknown => {
  const u = url.toLowerCase();
  if (u.includes("gender")) return GENDER_OPTIONS;
  if (u.includes("marital")) return MARITAL_OPTIONS;
  if (u.includes("religion")) return RELIGION_OPTIONS;
  if (u.includes("province")) return PROVINCE_OPTIONS;
  if (u.includes("cities") || u.includes("city")) return CITY_OPTIONS;
  if (u.includes("countries") || u.includes("country") || u.includes("citizen"))
    return COUNTRY_OPTIONS;
  if (u.includes("branch")) return BRANCH_OPTIONS;
  if (u.includes("business")) return BUSINESS_OPTIONS;
  if (u.includes("degree")) return DEGREE_OPTIONS;
  if (u.includes("field")) return FIELD_OPTIONS;
  if (u.includes("semester")) return SEMESTER_OPTIONS;
  if (u.includes("status")) return STATUS_OPTIONS;
  return ID_TITLE_OPTIONS;
};

const resolveAuth = (url: string, method: string, body?: Record<string, unknown>) => {
  const u = url.toLowerCase();

  if (u.includes("send-otp") || u.includes("admin-login/send")) {
    const userName = String(body?.userName ?? body?.username ?? "");
    const password = String(body?.password ?? "");
    if (
      userName &&
      userName !== MOCK_AUTH_CREDENTIALS.userName &&
      password &&
      password !== MOCK_AUTH_CREDENTIALS.password
    ) {
      // Still allow any credentials in mock mode for easier browsing
    }
    return createMockSignInFirstResponse();
  }

  if (u.includes("check-otp") || u.includes("admin-login/check")) {
    return createMockSignInSecondResponse();
  }

  if (u.includes("refresh-token")) {
    return createMockRefreshResponse();
  }

  if (u.includes("user-info") || u.includes("userinfo") || u.includes("/user/info")) {
    return MOCK_USER_INFO;
  }

  if (u.includes("roles/menu") || u.includes("/menu")) {
    return MENU_ITEMS_MOCK;
  }

  if (u.includes("admin-staffs")) {
    return MOCK_ADMIN_STAFF_LIST;
  }

  if (
    u.includes("/user/staff/admin/login") ||
    (u.includes("staff") && u.includes("login"))
  ) {
    return createMockLoginResponse();
  }

  if (
    method !== "GET" &&
    (u.includes("/auth/") || u.includes("/otp/") || u.includes("/user/email"))
  ) {
    if (u.includes("email")) {
      return { success: true };
    }
    return createMockSignInFirstResponse();
  }

  return undefined;
};

const resolveListOrDetail = (url: string, method: string): unknown => {
  if (method !== "GET") {
    return 1;
  }

  if (url.toLowerCase().includes("/admin/dashboard/all")) {
    return [
      {
        id: 1,
        title: "گزارش خوابگاه",
        key: "room-dashboard",
        description: "نمای کلی آمار خوابگاه",
        type: "DASHBOARD",
        typeFaTitle: "داشبورد",
        typeId: 1,
        service: "ROOM",
        serviceFaTitle: "خوابگاه",
        serviceId: 3,
        counts: 24,
      },
      {
        id: 2,
        title: "گزارش تغذیه",
        key: "food-dashboard",
        description: "نمای کلی آمار تغذیه",
        type: "DASHBOARD",
        typeFaTitle: "داشبورد",
        typeId: 1,
        service: "FOOD",
        serviceFaTitle: "تغذیه",
        serviceId: 4,
        counts: 18,
      },
      {
        id: 3,
        title: "گزارش پرسشنامه",
        key: "survey-dashboard",
        description: "نمای کلی آمار پرسشنامه",
        type: "DASHBOARD",
        typeFaTitle: "داشبورد",
        typeId: 1,
        service: "SURVEY",
        serviceFaTitle: "پرسشنامه",
        serviceId: 10,
        counts: 12,
      },
    ];
  }

  if (isOptionListUrl(url)) {
    return resolveOptionList(url);
  }

  if (url.toLowerCase().includes("shortcut/all")) {
    return [];
  }

  // Detail-ish single resource
  if (/\/\d+(\?|$)/.test(url) || url.toLowerCase().includes("detail")) {
    return {
      ...createMockDetail(),
      ...MOCK_USER_INFO,
      branchTitle: "شعبه تهران",
      amount: 100000,
      currency: "IRR",
    };
  }

  // Default list/page payload — covers most table screens
  const rows = [1, 2, 3, 4, 5].map((id) => createMockListRow(id));
  if (
    includesAny(url, [
      "page",
      "advance",
      "filter",
      "search",
      "list",
      "all",
      "getall",
      "transactions",
      "orders",
      "requests",
      "tickets",
      "wallets",
      "residents",
      "admission",
      "reservation",
    ])
  ) {
    return createMockCollection(rows);
  }

  return createMockCollection(rows);
};

/**
 * Resolve a mock payload for an RTK Query request.
 * Returns `undefined` only if mock mode should still fall through (never in practice).
 */
export async function resolveMockResponse(args: string | FetchArgs): Promise<unknown> {
  await delay();
  const url = getUrl(args);
  const method = getMethod(args);
  const body = getBody(args);

  const authResult = resolveAuth(url, method, body);
  if (authResult !== undefined) {
    return authResult;
  }

  if (method === "DELETE") {
    return true;
  }

  if (method === "POST" || method === "PUT" || method === "PATCH") {
    if (isOptionListUrl(url)) {
      return resolveOptionList(url);
    }
    // Many list endpoints are POST with filter body
    const hasPaginationBody = Boolean(
      body &&
      [
        "page",
        "pageNo",
        "pageNumber",
        "pageSize",
        "size",
        "offset",
        "limit",
        "filter",
        "filters",
        "search",
        "sort",
      ].some((key) => key in body)
    );

    if (
      hasPaginationBody ||
      includesAny(url, [
        "filter",
        "advance",
        "search",
        "list",
        "getall",
        "page",
        "report",
      ])
    ) {
      return createMockCollection([1, 2, 3, 4, 5].map((id) => createMockListRow(id)));
    }
    return 1;
  }

  return resolveListOrDetail(url, method);
}
