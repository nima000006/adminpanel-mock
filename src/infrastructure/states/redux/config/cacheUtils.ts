/**
 * RTK Query Cache Utilities
 * Provides consistent cache tag management across all APIs
 */

// ==================== TAG TYPE CONSTANTS ====================
export const DORM_TAGS = {
  // Main entities
  DORM: "Dorm",
  BUILDING: "Building",
  FLOOR: "Floor",
  ROOM: "Room",
  BED: "Bed",

  // Planning
  TARIFF: "Tariff",
  ADMISSION: "Admission",
  SEMESTER: "Semester",
  PRICING: "Pricing",

  // Basic Info
  BASIC_INFO: "BasicInfo",

  // Basic Info Types
  MANAGEMENT_TYPE: "ManagementType",
  RESERVATION_TYPE: "ReservationType",
  PAYMENT_TYPE: "PaymentType",
  PAYMENT_METHOD: "PaymentMethod",
  SCHEDULING_TYPE: "SchedulingType",
  GENDER_TYPE: "GenderType",
  QUALITY_TYPE: "QualityType",
  ROOM_TYPE: "RoomType",
  BED_TYPE: "BedType",
  BED_STATUS_TYPE: "BedStatusType",
  STATUS_TYPE: "StatusType",
  SCHEDULE_TYPE: "ScheduleType",
  REQUEST_TYPE: "RequestType",
  SPECIAL_CONDITIONS_TYPE: "SpecialConditionsType",
  STATUS_ENTITY_TYPE: "StatusEntityType",
  ASSIGNMENT_TYPE: "AssignmentType",
  RULE_TYPE: "RuleType",
  USER_GROUP_TYPE: "UserGroupType",
  PRESENCE_ABSENCE_TYPE: "PresenceAbsenceType",
  FEEDBACK_TYPE: "FeedbackType",
  RESIDENCE_TYPE: "ResidenceType",
  RELATION_TYPE: "RelationType",
  MARITAL_STATUS: "MaritalStatus",

  // Facilities and Rules
  NEARBY_PLACES: "NearbyPlaces",
  SUBSET_RULES: "SubsetRules",
  FACILITY: "Facility",

  // Operations - Habitants
  HABITANTS: "Habitants",
  HABITANTS_ROOM: "HabitantsRoom",
  PRESENCE_ABSENCE: "PresenceAbsence",
  NOTIFICATION: "Notification",
  FINANCIAL: "Financial",
  EVACUATION: "Evacuation",
  DISPLACEMENT: "Displacement",

  // Operations - Requests
  REQUESTS: "Requests",
  REQUEST_ROOM: "RequestRoom",
  REQUEST_BED: "RequestBed",
  INVOICE: "Invoice",
  WORKSPACE_DORM: "WorkspaceDorm",
  WORKSPACE_TARIFF: "WorkspaceTariff",
  WORKSPACE_ADMISSION: "WorkspaceAdmission",

  // Operations - Residence
  RESIDENCE: "Residence",
  RESIDENCE_BUILDING: "ResidenceBuilding",
  RESIDENCE_FLOOR: "ResidenceFloor",
  RESIDENCE_ROOM: "ResidenceRoom",
  RESIDENCE_BED: "ResidenceBed",
  CAPACITY: "Capacity",
  PROVINCE: "Province",
  CITY: "City",

  // Lookups
  CURRENCY: "Currency",
  DORMITORY: "Dormitory",
  NATIONALITY: "Nationality",
  EDUCATION_GRADE: "EducationGrade",
  SPECIAL_STATUS: "SpecialStatus",
  USER_GROUP: "UserGroup",
  NUMBER_INSTALLMENTS: "NumberInstallments",
  FEASIBILITY: "Feasibility",
} as const;

// Type for all dorm tags
export type DormTagType = (typeof DORM_TAGS)[keyof typeof DORM_TAGS];

// All dorm tag types as array (for API definition)
export const ALL_DORM_TAG_TYPES: DormTagType[] = Object.values(DORM_TAGS);

// ==================== GENERIC CACHE TAG HELPERS ====================

/**
 * Creates providesTags for a list query
 * Provides both individual item tags and a LIST tag
 *
 * @example
 * providesTags: (result) => providesList(result?.data, DORM_TAGS.DORM)
 */
export function providesList<R extends { id: string | number }[], T extends string>(
  resultsWithIds: R | undefined,
  tagType: T
) {
  return resultsWithIds
    ? [
        { type: tagType, id: "LIST" } as const,
        ...resultsWithIds.map(({ id }) => ({ type: tagType, id }) as const),
      ]
    : [{ type: tagType, id: "LIST" } as const];
}

/**
 * Creates providesTags for a single item query
 *
 * @example
 * providesTags: (result, error, id) => providesItem(id, DORM_TAGS.DORM)
 */
export function providesItem<T extends string>(
  id: string | number | undefined,
  tagType: T
) {
  return id ? [{ type: tagType, id } as const] : [{ type: tagType, id: "LIST" } as const];
}

/**
 * Creates invalidatesTags for LIST only (used after create operations)
 *
 * @example
 * invalidatesTags: invalidatesList(DORM_TAGS.DORM)
 */
export function invalidatesList<T extends string>(tagType: T) {
  return [{ type: tagType, id: "LIST" }] as const;
}

/**
 * Creates invalidatesTags for a specific item and LIST (used after update operations)
 *
 * @example
 * invalidatesTags: (result, error, arg) => invalidatesItem(arg.id, DORM_TAGS.DORM)
 */
export function invalidatesItem<T extends string>(
  id: string | number | undefined,
  tagType: T
) {
  return id
    ? ([
        { type: tagType, id },
        { type: tagType, id: "LIST" },
      ] as const)
    : ([{ type: tagType, id: "LIST" }] as const);
}

/**
 * Creates invalidatesTags for multiple tag types (used when mutation affects multiple entities)
 *
 * @example
 * invalidatesTags: invalidatesMultiple([DORM_TAGS.DORM, DORM_TAGS.BUILDING])
 */
export function invalidatesMultiple<T extends string>(tagTypes: T[]) {
  return tagTypes.map((type) => ({ type, id: "LIST" }) as const);
}

// ==================== SPECIALIZED HELPERS FOR COMMON PATTERNS ====================

/**
 * Creates providesTags for paginated list queries
 * Includes page info in the tag for more granular cache control
 *
 * @example
 * providesTags: (result, error, arg) =>
 *   providesPaginatedList(result?.data, DORM_TAGS.DORM, arg.page, arg.pageSize)
 */
export function providesPaginatedList<
  R extends { id: string | number }[],
  T extends string,
>(resultsWithIds: R | undefined, tagType: T, page?: number, pageSize?: number) {
  const pageTag =
    page !== undefined && pageSize !== undefined ? `PAGE-${page}-${pageSize}` : "LIST";

  return resultsWithIds
    ? [
        { type: tagType, id: "LIST" } as const,
        { type: tagType, id: pageTag } as const,
        ...resultsWithIds.map(({ id }) => ({ type: tagType, id }) as const),
      ]
    : [{ type: tagType, id: "LIST" } as const, { type: tagType, id: pageTag } as const];
}

/**
 * Creates providesTags for count queries
 * Uses a COUNT tag that gets invalidated with LIST
 *
 * @example
 * providesTags: providesCount(DORM_TAGS.DORM)
 */
export function providesCount<T extends string>(tagType: T) {
  return [
    { type: tagType, id: "COUNT" } as const,
    { type: tagType, id: "LIST" } as const,
  ];
}

/**
 * Creates invalidatesTags that also invalidates count
 *
 * @example
 * invalidatesTags: invalidatesListAndCount(DORM_TAGS.DORM)
 */
export function invalidatesListAndCount<T extends string>(tagType: T) {
  return [
    { type: tagType, id: "LIST" } as const,
    { type: tagType, id: "COUNT" } as const,
  ];
}

// ==================== CONDITIONAL TAG HELPERS ====================

/**
 * Creates providesTags based on query result success
 * Only provides tags if the request was successful
 *
 * @example
 * providesTags: (result) => providesOnSuccess(result, DORM_TAGS.DORM, result?.data)
 */
export function providesOnSuccess<R extends { id: string | number }[], T extends string>(
  result: { status?: number } | undefined,
  tagType: T,
  items: R | undefined
) {
  if (result?.status === 200 && items) {
    return providesList(items, tagType);
  }
  return [{ type: tagType, id: "LIST" } as const];
}

/**
 * Creates invalidatesTags only on mutation success
 *
 * @example
 * invalidatesTags: (result) => invalidatesOnSuccess(result, DORM_TAGS.DORM)
 */
export function invalidatesOnSuccess<T extends string>(
  result: { status?: number } | undefined,
  tagType: T
) {
  if (result?.status === 200) {
    return [{ type: tagType, id: "LIST" } as const];
  }
  return [];
}
