import SideBar from "@/components/Sidebar/sidebar";
import { NavbarMenu } from "@/components/navbar/navbar";

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background flex flex-row">
      <SideBar />
      <main className="w-full">
        <NavbarMenu />
      </main>
    </div>
  );
};
