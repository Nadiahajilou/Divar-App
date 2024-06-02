import { BrowserRouter } from "react-router-dom";
import Router from "../src/router/Router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import defaultOptions from "./configs/reactQuery";
import Layout from "./layout/Layout";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: defaultOptions,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Router />
        </Layout>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
