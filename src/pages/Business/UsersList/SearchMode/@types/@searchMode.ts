//! GENERAL
//! LAYOUT
export type UniversitySearchType = {
  university: {
    key: string;
    value: string;
    label: string;
    name: string;
    code: number;
    item: {
      id: number;
      title: string;
    };
  };
};

export type SearchModeState = "INDIVIDUAL_SEARCH" | "UNIVERSITY_SEARCH";

//! API
