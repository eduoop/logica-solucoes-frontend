import type { ReactElement } from "react";
import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CgSpinnerTwo } from "react-icons/cg";

import { Default } from "@/layout";

const HomeRouter = lazy(() =>
  import("@/pages/AllUsers/router").then((module) => ({
    default: module.Router,
  })), 
);

const RecordedUsersRouter = lazy(() =>
  import("@/pages/RecordedUsers/router").then((module) => ({
    default: module.Router,
  })),
);

export function Router(): ReactElement {
  return (
    <Suspense
      fallback={
        <div className="flex h-[100vh] w-full items-center justify-center bg-gray-900/10">
          <CgSpinnerTwo className="animate-spin text-6xl" />
        </div>
      }
    >
      <Routes>
        <Route element={<Default />}>
          <Route element={<Navigate to="/" />} />
          <Route path="/" element={<HomeRouter />} />
          <Route path="recorded-users/*" element={<RecordedUsersRouter />} />
        </Route>
      </Routes>
    </Suspense>
  );
}