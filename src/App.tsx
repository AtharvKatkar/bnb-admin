import { GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { AntdInferencer, } from "@refinedev/inferencer/antd";

import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { firebaseAuth, firestoreDatabase } from "./lib/firebase";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={firestoreDatabase.getDataProvider()}
                authProvider={firebaseAuth.getAuthProvider()}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                resources={[
                  {
                    name: "listing",
                    list: "/listing",
                    create: "/listing/create",
                    edit: "/listing/edit/:id",
                    show: "/listing/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "reservations",
                    list: "/reservations",
                    create: "/reservations/create",
                    edit: "/reservations/edit/:id",
                    show: "/reservations/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "YHB3ZA-83x0mh-wHGXLs",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <ThemedLayoutV2
                        Header={() => <Header sticky />}
                        Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="listing" />}
                    />
                    {/* TODO: */}
                    <Route path="/listing">
                      <Route index element={<AntdInferencer />} />
                      <Route path="create" element={<AntdInferencer />} />
                      <Route path="edit/:id" element={<AntdInferencer />} />
                      <Route path="show/:id" element={<AntdInferencer />} />
                    </Route>
                    <Route path="/reservations">
                      <Route index element={<AntdInferencer />} />
                      <Route path="create" element={<AntdInferencer />} />
                      <Route path="edit/:id" element={<AntdInferencer />} />
                      <Route path="show/:id" element={<AntdInferencer />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
