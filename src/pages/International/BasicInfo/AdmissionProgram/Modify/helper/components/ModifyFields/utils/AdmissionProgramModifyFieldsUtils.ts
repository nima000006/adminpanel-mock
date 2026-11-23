type InitialSelectedItems = {
  category: number[];
  degree: number[];
  fieldOfStudy: number[];
  branch: number[];
};

export const createFieldsSelectedItemsReducer = (
  state: InitialSelectedItems,
  action: { type: string; value: number[] }
) => {
  switch (action.type) {
    case "category":
      return {
        category: action.value,
        degree: [],
        fieldOfStudy: [],
        branch: [],
      };
    case "degree":
      return {
        ...state,
        degree: action.value,
        fieldOfStudy: [],
        branch: [],
      };
    case "fieldOfStudy":
      return {
        ...state,
        fieldOfStudy: action.value,
        branch: [],
      };
    case "branch":
      return {
        ...state,
        branch: action.value,
      };
    default:
      return state;
  }
};

export const createFieldsInitialSelectedItems = {
  category: [],
  degree: [],
  fieldOfStudy: [],
  branch: [],
};
