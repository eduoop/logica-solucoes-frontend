import type { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import RecordedUsers from "./index";

export function Router(): ReactElement {
  return (
    <Routes>
      <Route index element={<RecordedUsers />} />
    </Routes>
  );
}