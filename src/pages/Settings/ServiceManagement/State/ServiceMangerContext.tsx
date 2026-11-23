import { createContext, ReactNode, useMemo, useReducer } from "react";

import { BranchActiveServicesRecordType } from "../@types/@servicesManagement";

type Service = {
  id: number;
  name: string;
  image: string;
};
type ActiveAppsProps = {
  activeApps: Service;
  selectedBranches: BranchActiveServicesRecordType[];
  isDataRefreshed: boolean;
};
type ServiceAction = {
  type: "ADD_APP" | "REMOVE_APP";
  payload: Service;
};
type BranchAction = {
  type: "SET_SELECTED_BRANCHES";
  payload: BranchActiveServicesRecordType[];
};

type DrawerUpdateAction = {
  type: "DRAWER_UPDATED";
  payload: boolean;
};

type Action = ServiceAction | BranchAction | DrawerUpdateAction;

type State = ActiveAppsProps;
type ContextValue = {
  state: State;
  removeService: (id: number, name: string, image: string) => void;
  addService: (id: number, name: string, image: string) => void;
  setSelectedBranches: (branches: BranchActiveServicesRecordType[]) => void;
  drawerUpdated: () => void;
};

export const ServiceManagerContext = createContext<ContextValue>({} as ContextValue);

const serviceManagerReducer = (state: State, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_APP":
      return {
        ...state,
        activeApps: payload,
      };
    case "REMOVE_APP":
      return {
        ...state,
        activeApps: initialState?.activeApps,
      };
    case "SET_SELECTED_BRANCHES":
      return {
        ...state,
        selectedBranches: payload,
      };
    case "DRAWER_UPDATED":
      return {
        ...state,
        isDataRefreshed: !state.isDataRefreshed,
      };
    default:
      return state;
  }
};
const initialState: ActiveAppsProps = {
  activeApps: {
    id: 0,
    name: "",
    image: "",
  },
  selectedBranches: [],
  isDataRefreshed: false,
};

const ServiceManagerProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(serviceManagerReducer, initialState);

  // add service
  const addService = (id: number, name: string, image: string) => {
    dispatch({ type: "ADD_APP", payload: { id, name, image } });
  };

  // remove service
  const removeService = (id: number, name: string, image: string) => {
    dispatch({ type: "REMOVE_APP", payload: { id, name, image } });
  };

  // set selected branches
  const setSelectedBranches = (branches: BranchActiveServicesRecordType[]) => {
    dispatch({ type: "SET_SELECTED_BRANCHES", payload: branches });
  };

  // drawer updated
  const drawerUpdated = () => {
    dispatch({ type: "DRAWER_UPDATED", payload: true });
  };

  const value = useMemo(
    () => ({
      state,
      addService,
      removeService,
      setSelectedBranches,
      drawerUpdated,
    }),
    [state]
  );

  return (
    <ServiceManagerContext.Provider value={value}>
      {children}
    </ServiceManagerContext.Provider>
  );
};

export default ServiceManagerProvider;
