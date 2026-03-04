import Sidebar from "@/components/sidebar";
import { NavbarMenu } from "@/components/navbar";

const App = () => {
  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-row"
    >
      <Sidebar />
      <main className="w-full">
        <NavbarMenu />
      </main>
    </div>
  );
};

export default App;
