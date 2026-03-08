import SideBar from "@/components/sidebar/sidebar";
import { NavbarMenu } from "@/components/navbar/navbar";

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-row">
      <SideBar />
      <main className="w-full">
        <NavbarMenu />
      </main>
    </div>
  );
};
