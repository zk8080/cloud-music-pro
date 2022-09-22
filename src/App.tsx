import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "@/router/index";
import { Button, Empty } from "@douyinfe/semi-ui";
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import { IllustrationConstruction, IllustrationConstructionDark } from "@douyinfe/semi-illustrations";
import NotFountPage from "@/pages/404/index";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary, error }) => (
              <Empty
                image={<IllustrationConstruction style={{ width: 150, height: 150 }} />}
                darkModeImage={<IllustrationConstructionDark style={{ width: 150, height: 150 }} />}
                title={"页面发生错误"}
                description={error.message}
              >
                <div className="w-full flex items-center justify-center">
                  <Button theme="solid" type="primary" onClick={resetErrorBoundary}>
                    重新加载
                  </Button>
                </div>
              </Empty>
            )}
          >
            <BrowserRouter>
              <Routes>
                {routes.map((route) => {
                  const { path, children } = route;
                  if (children?.length > 0) {
                    return (
                      <Route key={path} path={path} element={<route.component />}>
                        {children.map((childRoute) => {
                          const { path } = childRoute;
                          return <Route key={path} path={path} element={<childRoute.component />} />;
                        })}
                      </Route>
                    );
                  }
                  return <Route key={path} path={path} element={<route.component />} />;
                })}
                <Route path="*" element={<NotFountPage />} />
              </Routes>
            </BrowserRouter>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
