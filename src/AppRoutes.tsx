import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import Loading from "./components/Loading";

const Home = lazy(() => import("./pages/Home"));
const MyURLs = lazy(() => import("./pages/MyURLs"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-urls" element={<MyURLs />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
