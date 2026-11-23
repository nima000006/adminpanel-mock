import { createBrowserRouter } from "react-router";

import SuspenseRoute from "@infra/router/SuspenseRoute";
import PrivateLayout from "@infra/services/PrivateLayout";
import PublicRoutes from "@infra/services/PublicRoutes/PublicRoutes";
import NotFound from "@pages/NotFound/NotFound";

import { allScreens } from "./AllScreen/allScreens";
import RootLayout from "./RootLayout";
import { PublicScreens } from "./Screens/public";
import RootErrorBoundary from "../helpers/ErrorBoundary/RootBoundary";
import PrivateRoutes from "../services/PrivateRoutes";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <RootErrorBoundary />,
    children: [
      {
        element: <PublicRoutes />,
        children: [
          ...PublicScreens.map((auth) => ({
            path: auth.path,
            element: (
              <SuspenseRoute>
                <auth.component />
              </SuspenseRoute>
            ),
          })),
          {
            element: <PrivateRoutes />,
            children: [
              {
                element: <PrivateLayout />,
                children: allScreens.map((screen) => ({
                  path: screen.path,
                  handle: { isBgContentCustom: screen.isBgContentCustom },
                  element: (
                    <SuspenseRoute>
                      <screen.component />
                    </SuspenseRoute>
                  ),
                })),
              },
            ],
          },
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
]);

export default router;
