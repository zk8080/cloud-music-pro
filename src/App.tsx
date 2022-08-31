import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "@/router/index";
import { Suspense, lazy } from "react";
import { Spin } from "@douyinfe/semi-ui";

const NotFountPage = lazy(() => import("./pages/404/index"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => {
          const { path, children } = route;
          if (children?.length > 0) {
            return (
              <Route
                key={path}
                path={path}
                element={
                  <Suspense fallback={<Spin />}>
                    <route.component />
                  </Suspense>
                }
              >
                {children.map((childRoute) => {
                  const { path } = childRoute;
                  return (
                    <Route
                      key={path}
                      path={path}
                      element={
                        <Suspense fallback={<Spin />}>
                          <childRoute.component />
                        </Suspense>
                      }
                    />
                  );
                })}
              </Route>
            );
          }
          return (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback={<Spin />}>
                  <route.component />
                </Suspense>
              }
            />
          );
        })}
        <Route
          path="*"
          element={
            <Suspense fallback={<Spin />}>
              <NotFountPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
