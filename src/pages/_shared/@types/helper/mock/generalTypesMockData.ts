/** Shared typed mocks for general option APIs. */

import type { GetAllBranchesResponse, IdTitle } from "../../@generalTypes/@generalTypes";
import {
  BRANCH_OPTIONS,
  CITY_OPTIONS,
  DEGREE_OPTIONS,
  FIELD_OPTIONS,
  PROVINCE_OPTIONS,
} from "@infra/mock/referenceMocks";

export const GET_ALL_BRANCHES_RESPONSE_MOCK: GetAllBranchesResponse = BRANCH_OPTIONS;

export const GET_ALL_BRANCHES_RESPONSE_LIST_MOCK: GetAllBranchesResponse = BRANCH_OPTIONS;

export const ID_TITLE_LIST_MOCK: IdTitle[] = BRANCH_OPTIONS;

export const PROVINCE_LIST_MOCK = PROVINCE_OPTIONS;
export const CITY_LIST_MOCK = CITY_OPTIONS;
export const DEGREE_LIST_MOCK = DEGREE_OPTIONS;
export const FIELD_LIST_MOCK = FIELD_OPTIONS;
