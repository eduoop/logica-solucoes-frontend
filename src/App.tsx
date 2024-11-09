import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes";
import { queryClient } from "./shared/services/query-client";
import { QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
