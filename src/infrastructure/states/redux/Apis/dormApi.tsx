/**
 * Dorm API - Base Configuration
 *
 * This API uses code-splitting with injectEndpoints pattern.
 * All dorm-related endpoints are injected from separate files in the /dorm folder.
 *
 * Endpoints are organized as:
 * - /dorm/base/dormBaseApi.tsx - Core dorm operations (CRUD for dorms, buildings, floors, rooms, beds)
 * - /dorm/basicInfo/dormBasicInfo.tsx - Basic info types (management, reservation, payment types, etc.)
 * - /dorm/planning/admission/admissionApi.tsx - Admission management
 * - /dorm/planning/tariff/dormTariffApi.tsx - Tariff management
 * - /dorm/requests/dormRequestsApi.tsx - Request handling
 * - /dorm/residence/dormResidenceApi.tsx - Residence management
 * - /dorm/habitants/dormHabitantsApi.tsx - Habitant management
 */

import { createApi } from "@reduxjs/toolkit/query/react";

import customBaseQuery from "@infra/helpers/customBaseQuery/customBaseQuery";

import { ALL_DORM_TAG_TYPES } from "../config";

export const dormApi = createApi({
  reducerPath: "api/dorm",
  tagTypes: ALL_DORM_TAG_TYPES,
  baseQuery: customBaseQuery({
    baseUrl: import.meta.env.VITE_URL_DORM,
  }),
  keepUnusedDataFor: 300, // 5 minutes
  refetchOnMountOrArgChange: false, // Use cached data, invalidate via tags
  refetchOnFocus: false,
  refetchOnReconnect: true,
  endpoints: () => ({}),
});
