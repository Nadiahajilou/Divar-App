import { BrowserRouter } from "react-router-dom";
import Router from "../src/router/Router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import defaultOptions from "./configs/reactQuery";


function App() {
  const queryClient = new QueryClient({
    defaultOptions: defaultOptions,
  });


  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
