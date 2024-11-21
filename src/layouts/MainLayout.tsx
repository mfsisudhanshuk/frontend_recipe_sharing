import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const MainLayout: FC = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default MainLayout;