import dashboardImg from "../../../assets/Dashboard.png";

export const LoginFooter = () => {
  return (
    <div
      aria-label="footer-container"
      className="bg-blue h-[96%] w-[98%] rounded-lg flex flex-col items-center justify-center gap-6 text-center p-20"
    >
      <h2 className="text-6xl text-white">
        Track Inventory Stock <br /> In Real Time
      </h2>
      <p className="text-white">
        Improve the way you manage your inventory with our real-time tracking
        solution.
      </p>
      <div aria-label="image-container" className="w-[35rem]">
        <img src={dashboardImg} alt="Dashboard" className="w-full rounded-md" />
      </div>
    </div>
  );
};
