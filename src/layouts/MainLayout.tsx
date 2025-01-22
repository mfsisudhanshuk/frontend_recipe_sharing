import { FC, lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import  Footer  from "../components/Footer";

// const Header = lazy(() => import("../components/Header"));
// const Footer = lazy(() => import("../components/Footer"));

const MainLayout: FC = () => (
  <div className="min-h-screen flex flex-col">
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
    </Suspense>
    <main className="flex-grow">
      <Outlet />
    </main>
    <Suspense fallback={<div>Loading...</div>}>
      <Footer />
    </Suspense>
  </div>
);

export default MainLayout;
